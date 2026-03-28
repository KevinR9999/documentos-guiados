import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { strategicManifestoFlow } from '../../features/documents/config';
import { getLatestDraftSession } from '../../features/documents/services/documentSessions';

function StrategyIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 18.5V7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 8C8.2 5.7 10.8 10.3 14 8C16.6 6.2 18.4 7 19 7.5V15C18.4 14.5 16.6 13.7 14 15.5C10.8 17.8 8.2 13.2 5 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const totalQuestions = strategicManifestoFlow.steps.reduce(
  (acc, step) => acc + step.fields.length,
  0
);

export default function StrategicManifestoIntroPage() {
  const [isCheckingDraft, setIsCheckingDraft] = useState(true);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    async function checkDraft() {
      try {
        const draft = await getLatestDraftSession('strategic_manifesto');
        setHasDraft(Boolean(draft));
      } catch (error) {
        console.error(error);
      } finally {
        setIsCheckingDraft(false);
      }
    }

    checkDraft();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-cyan-400 via-sky-400 to-violet-500 shadow-[0_0_60px_rgba(56,189,248,0.28)] sm:h-28 sm:w-28">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-white/10 text-white backdrop-blur-md sm:h-16 sm:w-16">
                <StrategyIcon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
              Modulo 1
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Manifiesto
              <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Estratégico
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base lg:text-lg">
              Aquí vas a construir el documento estratégico central de tu oferta:
              avatar, dolor, promesa, diferenciadores, metodología, mecanismo,
              entregables, precio y mensaje.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:mt-12 sm:p-6 lg:p-7">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Bloques
                </p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {strategicManifestoFlow.steps.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  El módulo está dividido por capas estratégicas para ayudarte a
                  construir una oferta clara, defendible y comunicable.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Preguntas
                </p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {totalQuestions}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Cubren persona objetivo, dolor, promesa, diferenciadores,
                  metodología, mecanismo, entregables, precio y mensaje.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Tiempo estimado
                </p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {strategicManifestoFlow.estimatedMinutes} min
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Lo ideal es responderlo con calma y con criterio, porque este
                  documento luego alimentará ventas, contenido y posicionamiento.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Qué va a incluir este módulo
              </h2>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/65">
                  Persona objetivo, señales de compra, dolor central, deseo
                  urgente y promesa única.
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/65">
                  Diferenciadores, contraste con el mercado y razones por las
                  que tu oferta se percibe distinta.
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/65">
                  Customer journey, metodología, mecanismo único y estructura
                  estratégica de la transformación.
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/65">
                  Entregables, precio, garantía, pitch y ángulos de mensaje para
                  comunicar la oferta.
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-cyan-400/15 bg-cyan-400/5 p-5 sm:p-6">
              <h3 className="text-base font-semibold text-white sm:text-lg">
                Recomendación antes de comenzar
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                Responde como si estuvieras construyendo el documento interno más
                importante de tu oferta. Entre más concreta y estratégica sea tu
                respuesta, mejor quedará el manifiesto final.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/documents"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
              >
                Volver
              </Link>

              <div className="flex flex-col gap-3 sm:flex-row">
                {isCheckingDraft ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/35"
                  >
                    Verificando borrador...
                  </button>
                ) : hasDraft ? (
                  <Link
                    to="/documents/strategic_manifesto/wizard"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.22)] transition hover:scale-[1.02]"
                  >
                    Continuar borrador
                  </Link>
                ) : (
                  <Link
                    to="/documents/strategic_manifesto/wizard"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.22)] transition hover:scale-[1.02]"
                  >
                    Comenzar modulo
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}