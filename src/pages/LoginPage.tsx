import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ensureAnonymousSession } from '../features/auth/ensureAnonymousSession';
import { hasValidSharedAccess, saveSharedAccess } from '../features/auth/sharedAccess';
import AstuciaLightningIcon from '../features/documents/components/AstuciaLightningIcon';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from ?? '/documents';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (hasValidSharedAccess()) {
      navigate('/documents', { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Debes ingresar usuario y contraseña.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        'verify-shared-access',
        {
          body: {
            username: username.trim(),
            password,
          },
        }
      );

      if (error) {
        throw error;
      }

      if (!data?.success) {
        throw new Error('No se pudo validar el acceso.');
      }

      saveSharedAccess({
        username: data.username,
        expiresAt: data.expiresAt,
      });

      await ensureAnonymousSession();

      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Error en login compartido:', error);

      if (error?.context) {
        try {
          const details = await error.context.json();
          console.error('Detalles de la función:', details);
        } catch {
          // ignore
        }
      }

      setErrorMessage('Usuario o contraseña incorrectos.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="w-full max-w-md">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7">
            <div className="text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-lime-300/15 bg-[radial-gradient(circle_at_30%_30%,rgba(220,255,0,0.18),transparent_38%),radial-gradient(circle_at_75%_70%,rgba(0,255,200,0.12),transparent_42%),linear-gradient(180deg,rgba(7,17,32,0.92)_0%,rgba(4,12,22,0.98)_100%)] shadow-[0_0_60px_rgba(190,255,0,0.16)] sm:h-32 sm:w-32">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.2rem] border border-lime-300/10 bg-white/[0.05] backdrop-blur-md sm:h-20 sm:w-20">
                  <AstuciaLightningIcon className="h-12 w-12 sm:h-14 sm:w-14" />
                </div>
              </div>

              <h1 className="mt-7 text-3xl font-bold text-white sm:text-4xl">
                ASTUC.IA
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/60 sm:text-base">
                Acceso privado para ingresar al centro oficial de inteligencia artificial.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/40 focus:bg-white/[0.06]"
                  placeholder="Ingresa tu usuario"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-14 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/40 focus:bg-white/[0.06]"
                    placeholder="Ingresa tu contraseña"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 my-auto h-9 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/65 transition hover:bg-white/[0.08]"
                  >
                    {showPassword ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.22)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-6 text-white/35">
              El acceso a la web requiere credenciales compartidas. Luego de ingresar,
              cada visitante continúa con su propia sesión interna para guardar progreso.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}