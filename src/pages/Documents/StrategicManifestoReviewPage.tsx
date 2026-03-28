import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { strategicManifestoFlow } from '../../features/documents/config';
import { generateStrategicManifestoDocument } from '../../features/documents/services/documentGeneration';

type Answers = Record<string, string>;

export default function StrategicManifestoReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const answers = (location.state?.answers ?? {}) as Answers;
  const sessionId = location.state?.sessionId as string | undefined;

  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sections = strategicManifestoFlow.steps
    .map((step) => ({
      ...step,
      fields: step.fields.filter((field) => answers[field.id]),
    }))
    .filter((step) => step.fields.length > 0);

  async function handleGenerate() {
    if (!sessionId) {
      setErrorMessage('No se encontro la sesion del documento.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');

    try {
      await generateStrategicManifestoDocument(sessionId);
      navigate(`/documents/strategic_manifesto/result?sessionId=${sessionId}`);
    } catch (error: any) {
      console.error('Error al generar manifiesto estratégico:', error);

      if (error?.context) {
        try {
          const details = await error.context.json();
          console.error('Detalles de la funcion:', details);
        } catch (parseError) {
          console.error('No se pudieron leer los detalles del error:', parseError);
        }
      }

      setErrorMessage('No se pudo generar el manifiesto con Gemini.');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
      </div>

      <main className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
              Revisión
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Revisa tus respuestas antes de generar
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Cuando generes, Gemini convertirá estas respuestas en un manifiesto
              estratégico largo y estructurado.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
              >
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>

                <div className="mt-4 space-y-4">
                  {section.fields.map((field) => (
                    <div
                      key={field.id}
                      className="rounded-2xl border border-white/8 bg-white/[0.025] p-4"
                    >
                      <p className="text-sm font-medium text-white/80">{field.label}</p>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/55">
                        {answers[field.id]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {errorMessage ? (
            <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => navigate('/documents/strategic_manifesto/wizard')}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
            >
              Volver al wizard
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !sessionId}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.22)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? 'Generando...' : 'Generar manifiesto con IA'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}