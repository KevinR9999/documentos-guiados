import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reelsScriptsModes } from '../../features/documents/config';
import { getLatestDraftSession } from '../../features/documents/services/documentSessions';

function ReelsIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 6L10.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6L15.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.5 11.5L14.5 14L10.5 16.5V11.5Z" fill="currentColor" />
    </svg>
  );
}

const shortMode = reelsScriptsModes.find((mode) => mode.mode === 'short');
const advancedMode = reelsScriptsModes.find((mode) => mode.mode === 'advanced');

export default function ReelsScriptsIntroPage() {
  const [isCheckingDrafts, setIsCheckingDrafts] = useState(true);
  const [hasShortDraft, setHasShortDraft] = useState(false);
  const [hasAdvancedDraft, setHasAdvancedDraft] = useState(false);

  useEffect(() => {
    async function checkDrafts() {
      try {
        const [shortDraft, advancedDraft] = await Promise.all([
          getLatestDraftSession('reels_scripts_short'),
          getLatestDraftSession('reels_scripts_advanced'),
        ]);

        setHasShortDraft(Boolean(shortDraft));
        setHasAdvancedDraft(Boolean(advancedDraft));
      } catch (error) {
        console.error(error);
      } finally {
        setIsCheckingDrafts(false);
      }
    }

    checkDrafts();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-400 via-orange-400 to-violet-500 shadow-[0_0_60px_rgba(251,146,60,0.28)] sm:h-28 sm:w-28">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-white/10 text-white backdrop-blur-md sm:h-16 sm:w-16">
                <ReelsIcon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300/90">
              Modulo 4
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Guiones para
              <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Reels
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base lg:text-lg">
              Aqui vas a construir guiones listos para grabar, con estructura,
              angulo, hook, prueba y CTA claros para que el reel salga util y no generico.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:mt-12 sm:p-6 lg:p-7">
            <div className="mb-5 text-center">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Elige como quieres construir tu reel
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/55">
                Puedes ir por una version rapida con preguntas minimas o una version avanzada
                con mas control sobre el angulo, el formato, la prueba y el tono.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/85">
                      Opcion 1
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {shortMode?.title ?? 'Version corta'}
                    </h3>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60">
                    {shortMode?.estimatedMinutes ?? 4} min
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {shortMode?.description ??
                    'Ideal para generar un reel rapido con las preguntas minimas necesarias.'}
                </p>

                <div className="mt-5 space-y-2 text-sm text-white/60">
                  <p>• Objetivo del reel</p>
                  <p>• Avatar exacto</p>
                  <p>• Resultado principal</p>
                  <p>• Tema especifico</p>
                  <p>• Angulo</p>
                  <p>• Dolor real</p>
                  <p>• Prueba</p>
                  <p>• Vehiculo</p>
                  <p>• Recompensa / CTA</p>
                </div>

                <div className="mt-6">
                  {isCheckingDrafts ? (
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/35"
                    >
                      Verificando borrador...
                    </button>
                  ) : (
                    <Link
                      to="/documents/reels_scripts/short/wizard"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(251,146,60,0.22)] transition hover:scale-[1.02]"
                    >
                      {hasShortDraft ? 'Continuar version corta' : 'Elegir version corta'}
                    </Link>
                  )}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/85">
                      Opcion 2
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {advancedMode?.title ?? 'Version avanzada'}
                    </h3>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60">
                    {advancedMode?.estimatedMinutes ?? 10} min
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {advancedMode?.description ??
                    'Ideal si quieres controlar mejor el angulo, el formato, el hook, la prueba y el CTA.'}
                </p>

                <div className="mt-5 space-y-2 text-sm text-white/60">
                  <p>• Objetivo + idea central</p>
                  <p>• Avatar + problema actual</p>
                  <p>• Angulo y palanca mental</p>
                  <p>• Hook y scroll stop</p>
                  <p>• Formato visual</p>
                  <p>• Dolor, deseo y objecion</p>
                  <p>• Prueba y autoridad</p>
                  <p>• CTA y tono final</p>
                </div>

                <div className="mt-6">
                  {isCheckingDrafts ? (
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/35"
                    >
                      Verificando borrador...
                    </button>
                  ) : (
                    <Link
                      to="/documents/reels_scripts/advanced/wizard"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(251,146,60,0.22)] transition hover:scale-[1.02]"
                    >
                      {hasAdvancedDraft ? 'Continuar version avanzada' : 'Elegir version avanzada'}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-amber-400/15 bg-amber-400/5 p-5 sm:p-6">
              <h3 className="text-base font-semibold text-white sm:text-lg">
                Recomendacion
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                Si quieres rapidez, usa la version corta. Si quieres mas control
                sobre el hook, el formato y el angulo del reel, usa la version avanzada.
              </p>
            </div>

            <div className="mt-5 flex justify-start">
              <Link
                to="/documents"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
              >
                Volver
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}