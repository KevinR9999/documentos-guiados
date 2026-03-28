import { Link } from 'react-router-dom';

type IconProps = {
  className?: string;
};

function AstuciaLightningIcon({ className = 'h-10 w-10' }: IconProps) {
  return (
    <div className={`relative ${className} astucia-logo-float`} aria-hidden="true">
      <div className="astucia-logo-glow absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,_rgba(214,255,0,0.62)_0%,_rgba(152,255,0,0.28)_28%,_rgba(0,255,204,0.16)_48%,_rgba(0,0,0,0)_76%)]" />

      <div className="relative flex h-full w-full items-center justify-center">
        <img
          src="/icono-rayo.png"
          alt=""
          className="astucia-logo-pulse relative z-10 h-full w-full object-contain"
        />

        <span className="astucia-logo-flicker absolute right-[8%] top-[10%] h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_16px_rgba(210,255,0,0.8)] blur-[1px]" />
        <span className="astucia-logo-flicker absolute left-[10%] bottom-[16%] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(52,255,182,0.65)] blur-[1px]" />
      </div>
    </div>
  );
}

function StrategicIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 19V7.5C4 6.12 5.12 5 6.5 5H17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 9H18.5C19.33 9 20 9.67 20 10.5V17.5C20 18.33 19.33 19 18.5 19H8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.5 12.5H17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.5 15.5H14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClientIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4.5 18C5.2 15.4 7.27 14 10 14C12.73 14 14.8 15.4 15.5 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="17.5" cy="15.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M17.5 13.5V17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15.5 15.5H19.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InventoryIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4C8.13 4 5 7.13 5 11C5 15.5 8.1 19.24 12 20C15.9 19.24 19 15.5 19 11C19 7.13 15.87 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 10.5C10 9.57 10.85 9 12 9C13.15 9 14 9.57 14.5 10.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.5 13.5C10.3 14.4 11.03 14.8 12 14.8C12.97 14.8 13.7 14.4 14.5 13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReelsIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 6L10.5 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 6L15.5 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M10.5 11.5L14.5 14L10.5 16.5V11.5Z" fill="currentColor" className="text-white/90" />
    </svg>
  );
}

const flows = [
  {
    id: 'strategic_manifesto',
    title: 'Manifiesto Estrategico',
    subtitle: 'Define la direccion y el enfoque de tu marca',
    Icon: StrategicIcon,
    glow: 'from-violet-500/20 to-fuchsia-500/10',
  },
  {
    id: 'ideal_client_manifesto',
    title: 'Cliente Ideal',
    subtitle: 'Construye el perfil profundo de tu cliente',
    Icon: ClientIcon,
    glow: 'from-cyan-400/20 to-sky-500/10',
  },
  {
    id: 'inventory_of_self',
    title: 'Inventario del Ser',
    subtitle: 'Ordena identidad, fortalezas y narrativa',
    Icon: InventoryIcon,
    glow: 'from-emerald-400/20 to-teal-500/10',
  },
  {
    id: 'reels_scripts',
    title: 'Guiones para Reels',
    subtitle: 'Crea guiones claros y listos para grabar',
    Icon: ReelsIcon,
    glow: 'from-amber-400/20 to-orange-500/10',
  },
];

export default function DocumentsHomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-lime-300/15 bg-[radial-gradient(circle_at_30%_30%,rgba(220,255,0,0.18),transparent_38%),radial-gradient(circle_at_75%_70%,rgba(0,255,200,0.12),transparent_42%),linear-gradient(180deg,rgba(7,17,32,0.92)_0%,rgba(4,12,22,0.98)_100%)] shadow-[0_0_60px_rgba(190,255,0,0.16)] sm:h-32 sm:w-32">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.2rem] border border-lime-300/10 bg-white/[0.05] backdrop-blur-md sm:h-20 sm:w-20">
      <AstuciaLightningIcon className="h-12 w-12 sm:h-14 sm:w-14" />
  </div>
</div>

            <h1 className="mt-8 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              ASTUC.IA
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-3 text-white/65 sm:text-base lg:text-lg">
              Centro oficial de inteligencia artificial.
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-3 text-white/65 sm:text-base lg:text-lg">
              Para miembros exclusivos de ASTUCIA.
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-3 text-white/65 sm:text-base lg:text-lg">
              Creada y desarrollada por ASTUCIA LLC.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:mt-12 sm:p-6 lg:p-7">
            <div className="mb-5 flex items-center justify-center gap-2 text-center">
              <span className="text-base text-yellow-300 sm:text-lg">✦</span>
              <h2 className="text-base font-semibold text-white/90 sm:text-lg lg:text-xl">
                Que quieres crear hoy?
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {flows.map((flow) => {
                const Icon = flow.Icon;

                return (
                  <Link
                    key={flow.id}
                    to={`/documents/${flow.id}`}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(139,92,246,0.16)] sm:p-6"
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${flow.glow} opacity-70 blur-2xl`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/85 backdrop-blur-md">
                          <Icon className="h-6 w-6" />
                        </div>

                        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium tracking-wide text-white/55">
                          Documento
                        </div>
                      </div>

                      <h3 className="mt-5 text-left text-lg font-semibold text-white sm:text-xl">
                        {flow.title}
                      </h3>

                      <p className="mt-2 max-w-sm text-left text-sm leading-6 text-white/55">
                        {flow.subtitle}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-violet-300">
                        <span>Iniciar flujo</span>
                        <span className="transition group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <footer className="mt-10 px-4 text-center text-xs leading-6 text-white/40 sm:text-sm">
            © 2026 Guionista de Astucia. Todos los derechos reservados.
          </footer>
        </div>
      </main>
    </div>
  );
}