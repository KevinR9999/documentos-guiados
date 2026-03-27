import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import QuestionField from '../../features/documents/components/QuestionField';
import { reelsScriptsModes } from '../../features/documents/config';
import {
  getOrCreateDraftSession,
  saveDraftSession,
} from '../../features/documents/services/documentSessions';

type FormValues = Record<string, string>;

export default function ReelsShortWizardPage() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const shortMode = reelsScriptsModes.find((mode) => mode.mode === 'short');

  if (!shortMode) {
    return (
      <div className="min-h-screen bg-[#071120] text-white flex items-center justify-center px-6">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-center">
          <p className="text-sm text-white/70">
            No se encontro la configuracion de la version corta de Reels.
          </p>
        </div>
      </div>
    );
  }

  const form = useForm<FormValues>({
    defaultValues: {},
    mode: 'onTouched',
  });

  const {
    register,
    trigger,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = form;

  const step = shortMode.steps[0];
  const values = watch();

  const totalQuestions = step.fields.length;

  const answeredQuestions = useMemo(() => {
    return step.fields.filter((field) => {
      const value = values[field.id];
      return typeof value === 'string' && value.trim() !== '';
    }).length;
  }, [step.fields, values]);

  const progress = useMemo(() => {
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }, [answeredQuestions, totalQuestions]);

  useEffect(() => {
    async function bootstrap() {
      try {
        const draftSession = await getOrCreateDraftSession(
          'reels_scripts_short',
          'Guiones para Reels · Version corta'
        );

        setSessionId(draftSession.id);
        reset((draftSession.answers ?? {}) as FormValues);
      } catch (error) {
        console.error(error);
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrap();
  }, [reset]);

  async function persistDraft() {
    if (!sessionId) return;

    setIsSaving(true);
    try {
      await saveDraftSession(sessionId, {
        currentStep: 0,
        answers: getValues(),
        status: 'draft',
      });
    } finally {
      setIsSaving(false);
    }
  }

  const handleNext = async () => {
    const currentFieldIds = step.fields.map((field) => field.id);
    const isValid = await trigger(currentFieldIds);

    if (!isValid) return;

    await persistDraft();

    navigate('/documents/reels_scripts/short/review', {
      state: {
        answers: getValues(),
        mode: 'short',
        sessionId,
      },
    });
  };

  const handleBack = async () => {
    await persistDraft();
    navigate('/documents/reels_scripts');
  };

  const handleSaveAndExit = async () => {
    await persistDraft();
    navigate('/documents/reels_scripts');
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
          <div
            key={step.id}
            className="mb-6 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/80">
                  Reels · Version corta
                </p>
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {step.title}
                </h1>
                {step.description ? (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                    {step.description}
                  </p>
                ) : null}
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/65">
                {answeredQuestions} de {totalQuestions} respondidas
              </div>
            </div>

            <div key={`progress-${step.id}`} className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-violet-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-white/40">{progress}% completado</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
            <div className="mb-5 rounded-[1.25rem] border border-amber-400/10 bg-amber-400/5 p-4 text-sm leading-7 text-white/60">
              Esta version hace solo las preguntas minimas para construir un guion funcional
              sin adivinar el avatar, el dolor, la prueba, el vehiculo ni la recompensa.
            </div>

            <div className="grid gap-4">
              {step.fields.map((field) => (
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
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Volver
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
  type="button"
  onClick={handleSaveAndExit}
  disabled={isSaving}
  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(251,146,60,0.22)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSaving ? 'Guardando...' : 'Guardar y salir'}
</button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(251,146,60,0.22)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Ir a revision
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}