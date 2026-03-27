import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReelsAdvancedPdfDocument from '../../features/documents/pdf/ReelsAdvancedPdfDocument';
import { getDocumentSessionById } from '../../features/documents/services/documentSessions';
import { exportReelsAdvancedDocx } from '../../features/documents/utils/exportReelsAdvanced';

type GeneratedContent = {
  title?: string;
  objective?: string;
  angle?: string;
  format_recommendation?: string;
  hook?: string;
  script?: string;
  caption?: string;
  cta?: string;
  reward?: string;
  persuasion_strategy?: string;
  recording_notes?: string[];
  visual_beats?: string[];
};

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function ReelsAdvancedResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('sessionId');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [isExportingDocx, setIsExportingDocx] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (!sessionId) {
        setErrorMessage('No se encontro el sessionId del documento.');
        setIsLoading(false);
        return;
      }

      try {
        const session = await getDocumentSessionById(sessionId);

        if (!session.generated_content) {
          setErrorMessage('La sesion existe, pero aun no tiene contenido generado.');
          setIsLoading(false);
          return;
        }

        setGeneratedContent(session.generated_content as GeneratedContent);
      } catch (error) {
        console.error(error);
        setErrorMessage('No se pudo cargar el resultado generado.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDocument();
  }, [sessionId]);

  async function handleExportDocx() {
    try {
      setIsExportingDocx(true);
      await exportReelsAdvancedDocx(generatedContent);
    } catch (error) {
      console.error(error);
      alert('No se pudo exportar el archivo DOCX.');
    } finally {
      setIsExportingDocx(false);
    }
  }

  const pdfFileName = `${sanitizeFileName(
    generatedContent.title ?? 'guion-para-reel'
  )}.pdf`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
      </div>

      <main className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {isLoading ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl">
              <p className="text-sm text-white/65">Cargando guion generado...</p>
            </div>
          ) : errorMessage ? (
            <div className="rounded-[1.75rem] border border-rose-400/20 bg-rose-400/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-rose-200">{errorMessage}</p>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/documents/reels_scripts')}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/80">
                  Guion generado
                </p>
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {generatedContent.title ?? 'Guion para Reel'}
                </h1>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {generatedContent.objective ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
                      <span className="font-semibold text-white/90">Objetivo:</span>{' '}
                      {generatedContent.objective}
                    </div>
                  ) : null}

                  {generatedContent.angle ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
                      <span className="font-semibold text-white/90">Angulo:</span>{' '}
                      {generatedContent.angle}
                    </div>
                  ) : null}
                </div>
              </div>

              {generatedContent.format_recommendation ? (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white">Formato recomendado</h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60 sm:text-base">
                    {generatedContent.format_recommendation}
                  </p>
                </div>
              ) : null}

              {generatedContent.hook ? (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white">Hook</h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60 sm:text-base">
                    {generatedContent.hook}
                  </p>
                </div>
              ) : null}

              {generatedContent.script ? (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white">Guion</h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60 sm:text-base">
                    {generatedContent.script}
                  </p>
                </div>
              ) : null}

              {generatedContent.caption ? (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white">Caption</h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60 sm:text-base">
                    {generatedContent.caption}
                  </p>
                </div>
              ) : null}

              {(generatedContent.cta || generatedContent.reward) ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {generatedContent.cta ? (
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                      <h2 className="text-lg font-semibold text-white">CTA</h2>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60 sm:text-base">
                        {generatedContent.cta}
                      </p>
                    </div>
                  ) : null}

                  {generatedContent.reward ? (
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                      <h2 className="text-lg font-semibold text-white">Recompensa</h2>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60 sm:text-base">
                        {generatedContent.reward}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {generatedContent.persuasion_strategy ? (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white">Estrategia de persuasion</h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60 sm:text-base">
                    {generatedContent.persuasion_strategy}
                  </p>
                </div>
              ) : null}

              {(generatedContent.recording_notes ?? []).length > 0 ? (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white">Notas de grabacion</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60 sm:text-base">
                    {generatedContent.recording_notes?.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {(generatedContent.visual_beats ?? []).length > 0 ? (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white">Ritmo visual sugerido</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60 sm:text-base">
                    {generatedContent.visual_beats?.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/documents/reels_scripts')}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
                >
                  Volver al inicio
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleExportDocx}
                    disabled={isExportingDocx}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(251,146,60,0.22)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isExportingDocx ? 'Exportando DOCX...' : 'Descargar DOCX'}
                  </button>

                  <PDFDownloadLink
                    document={<ReelsAdvancedPdfDocument data={generatedContent} />}
                    fileName={pdfFileName}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(251,146,60,0.22)] transition hover:scale-[1.02]"
                  >
                    {({ loading }) =>
                      loading ? 'Preparando PDF...' : 'Descargar PDF'
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}