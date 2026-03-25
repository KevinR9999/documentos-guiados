import { useParams } from 'react-router-dom';

const titles: Record<string, string> = {
  strategic_manifesto: 'Manifiesto Estrategico',
  ideal_client_manifesto: 'Manifiesto de Cliente Ideal',
  inventory_of_self: 'Inventario del Ser',
  reels_scripts: 'Guiones para Reels',
};

export default function DocumentFlowPlaceholderPage() {
  const { flowId } = useParams();
  const title = flowId ? titles[flowId] ?? flowId : 'Documento';

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Paso 1 completado
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-4 text-slate-600">
          Esta es una pantalla temporal. En el siguiente paso construiremos la
          pantalla de introduccion del flujo y luego el cuestionario guiado.
        </p>
      </div>
    </div>
  );
}