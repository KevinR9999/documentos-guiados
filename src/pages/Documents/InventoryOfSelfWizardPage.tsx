import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import QuestionField from '../../features/documents/components/QuestionField';
import { inventoryOfSelfFlow } from '../../features/documents/config';
import {
    getOrCreateDraftSession,
    saveDraftSession,
} from '../../features/documents/services/documentSessions';

type FormValues = Record<string, string>;

export default function InventoryOfSelfWizardPage() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {},
    mode: 'onTouched',
  });

  const {
    register,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = form;

  const steps = inventoryOfSelfFlow.steps;
  const currentStep = steps[currentStepIndex];

  const progress = useMemo(() => {
    return Math.round(((currentStepIndex + 1) / steps.length) * 100);
  }, [currentStepIndex, steps.length]);

  useEffect(() => {
    async function bootstrap() {
      try {
        const draftSession = await getOrCreateDraftSession(
          'inventory_of_self',
          inventoryOfSelfFlow.title
        );

        setSessionId(draftSession.id);
        reset((draftSession.answers ?? {}) as FormValues);
        setCurrentStepIndex(
          Math.min(draftSession.current_step ?? 0, steps.length - 1)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrap();
  }, [reset, steps.length]);

  async function persistDraft(nextStep: number) {
    if (!sessionId) return;

    setIsSaving(true);
    try {
      await saveDraftSession(sessionId, {
        currentStep: nextStep,
        answers: getValues(),
        status: 'draft',
      });
    } finally {
      setIsSaving(false);
    }
  }

  const handleNext = async () => {
    const currentFieldIds = currentStep.fields.map((field) => field.id);
    const isValid = await trigger(currentFieldIds);

    if (!isValid) return;

    if (currentStepIndex < steps.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      await persistDraft(nextStepIndex);
      setCurrentStepIndex(nextStepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    await persistDraft(currentStepIndex);

    navigate('/documents/inventory_of_self/review', {
      state: { answers: getValues(), sessionId },
    });
  };

  const handleBack = async () => {
    if (currentStepIndex === 0) {
      await persistDraft(0);
      navigate('/documents/inventory_of_self');
      return;
    }

    const prevStepIndex = currentStepIndex - 1;
    await persistDraft(prevStepIndex);
    setCurrentStepIndex(prevStepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAndExit = async () => {
    await persistDraft(currentStepIndex);
    navigate('/documents/inventory_of_self');
  };

  if (isBootstrapping) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
        <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-8 py-6 text-center backdrop-blur-xl">
            <p className="text-sm text-white/65">Cargando tu borrador...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <main className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                  Inventario del Ser
                </p>
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {currentStep.title}
                </h1>
                {currentStep.description ? (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                    {currentStep.description}
                  </p>
                ) : null}
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/65">
                Paso {currentStepIndex + 1} de {steps.length}
              </div>
            </div>

            <div className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-violet-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-white/40">{progress}% completado</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
            <div className="mb-5 rounded-[1.25rem] border border-emerald-400/10 bg-emerald-400/5 p-4 text-sm leading-7 text-white/60">
              Responde con honestidad. Si una pregunta te incomoda, puedes dejarla
              en blanco o responder “aun no”.
            </div>

            <div className="grid gap-4">
              {currentStep.fields.map((field) => (
                <QuestionField
                  key={field.id}
                  field={field}
                  register={register}
                  errors={errors}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
              >
                {currentStepIndex === 0 ? 'Volver' : 'Anterior'}
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleSaveAndExit}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Guardar y salir'}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(16,185,129,0.22)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {currentStepIndex === steps.length - 1 ? 'Ir a revision' : 'Siguiente'}
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs leading-6 text-white/35">
              Tu progreso ya se guarda en Supabase cada vez que avanzas, retrocedes o sales del modulo.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}