import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { idealClientManifestoFlow } from '../../features/documents/config';
import { getLatestDraftSession } from '../../features/documents/services/documentSessions';

function ProfileIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.5 18C6.3 15.15 8.57 13.7 12 13.7C15.43 13.7 17.7 15.15 18.5 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const totalQuestions = idealClientManifestoFlow.steps.reduce(
  (acc, step) => acc + step.fields.length,
  0
);

export default function IdealClientIntroPage() {
  const [isCheckingDraft, setIsCheckingDraft] = useState(true);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    async function checkDraft() {
      try {
        const draft = await getLatestDraftSession('ideal_client_manifesto');
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
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_60px_rgba(139,92,246,0.35)] sm:h-28 sm:w-28">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-white/10 text-white backdrop-blur-md sm:h-16 sm:w-16">
                <ProfileIcon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
              Modulo 1
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Manifiesto de
              <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Cliente Ideal
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base lg:text-lg">
              Vas a construir un perfil profundo, estrategico y accionable de tu
              cliente ideal para entender como piensa, que desea, que teme, como
              decide y que lo convence de comprar.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:mt-12 sm:p-6 lg:p-7">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Bloques
                </p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {idealClientManifestoFlow.steps.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  El cuestionario esta dividido en bloques para que sea mas facil de responder.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Preguntas
                </p>
                <p className="mt-3 text-3xl font-bold text-white">{totalQuestions}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Cubren perfil, lenguaje, dolores, deseos, consumo y decisiones de compra.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Tiempo estimado
                </p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {idealClientManifestoFlow.estimatedMinutes} min
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Puedes completarlo en una sola sesion o continuar luego.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Que va a incluir este modulo
              </h2>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/65">
                  Perfil general, identidad profesional y contexto financiero.
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/65">
                  Lenguaje, palabras, codigos y manera de pensar del cliente.
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/65">
                  Errores, bloqueos, tensiones emocionales y miedos actuales.
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/65">
                  Deseos, transformacion buscada, objeciones y proceso de compra.
                </div>
              </div>
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
                    to="/documents/ideal_client_manifesto/wizard"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition hover:scale-[1.02]"
                  >
                    Continuar borrador
                  </Link>
                ) : (
                  <Link
                    to="/documents/ideal_client_manifesto/wizard"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition hover:scale-[1.02]"
                  >
                    Comenzar modulo
                  </Link>
                )}
              </div>
            </div>

            <p className="mt-4 text-xs leading-6 text-white/35">
              Ahora esta pantalla ya revisa si existe un borrador guardado en Supabase.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}