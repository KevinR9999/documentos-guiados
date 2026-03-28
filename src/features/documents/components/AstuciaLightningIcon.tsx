type AstuciaLightningIconProps = {
  className?: string;
};

export default function AstuciaLightningIcon({
  className = 'h-10 w-10',
}: AstuciaLightningIconProps) {
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