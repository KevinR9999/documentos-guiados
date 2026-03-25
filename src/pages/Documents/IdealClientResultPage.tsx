import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDocumentSessionById } from '../../features/documents/services/documentSessions';
import {
    exportIdealClientDocx,
    exportIdealClientPdf,
} from '../../features/documents/utils/exportIdealClient';

type Section = {
  title: string;
  content: string;
};

type GeneratedContent = {
  title?: string;
  executive_summary?: string;
  sections?: Section[];
  key_insights?: string[];
  messaging_recommendations?: string[];
  exact_language_phrases?: string[];
  content_angle_seeds?: string[];
};

export default function IdealClientResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const documentRef = useRef<HTMLDivElement | null>(null);

  const sessionId = searchParams.get('sessionId');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

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
        setErrorMessage('No se pudo cargar el documento generado.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDocument();
  }, [sessionId]);

  async function handleExportDocx() {
    try {
      setIsExportingDocx(true);
      await exportIdealClientDocx(generatedContent);
    } catch (error) {
      console.error(error);
      alert('No se pudo exportar el archivo DOCX.');
    } finally {
      setIsExportingDocx(false);
    }
  }

  async function handleExportPdf() {
    if (!documentRef.current) {
      alert('No se encontro el contenido del documento para exportar.');
      return;
    }

    try {
      setIsExportingPdf(true);
      await exportIdealClientPdf(
        documentRef.current,
        generatedContent.title ?? 'Manifiesto de Cliente Ideal'
      );
    } catch (error) {
      console.error(error);
      alert('No se pudo exportar el archivo PDF.');
    } finally {
      setIsExportingPdf(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071120] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#08111f_0%,_#071120_45%,_#050b16_100%)]" />
      </div>

      <main className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {isLoading ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl">
              <p className="text-sm text-white/65">Cargando documento generado...</p>
            </div>
          ) : errorMessage ? (
            <div className="rounded-[1.75rem] border border-rose-400/20 bg-rose-400/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-rose-200">{errorMessage}</p>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/documents')}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                ref={documentRef}
                className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6"
              >
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                    Documento generado
                  </p>
                  <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    {generatedContent.title ?? 'Manifiesto de Cliente Ideal'}
                  </h1>
                  {generatedContent.executive_summary ? (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/65 sm:text-base">
                      {generatedContent.executive_summary}
                    </p>
                  ) : null}
                </div>

                {(generatedContent.sections ?? []).map((section) => (
                  <div
                    key={section.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                  >
                    <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60 sm:text-base">
                      {section.content}
                    </p>
                  </div>
                ))}

                {(generatedContent.key_insights ?? []).length > 0 ? (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                    <h2 className="text-lg font-semibold text-white">Insights clave</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60 sm:text-base">
                      {generatedContent.key_insights?.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {(generatedContent.messaging_recommendations ?? []).length > 0 ? (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                    <h2 className="text-lg font-semibold text-white">
                      Recomendaciones de mensaje
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60 sm:text-base">
                      {generatedContent.messaging_recommendations?.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {(generatedContent.exact_language_phrases ?? []).length > 0 ? (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                    <h2 className="text-lg font-semibold text-white">
                      Lenguaje literal del cliente
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60 sm:text-base">
                      {generatedContent.exact_language_phrases?.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {(generatedContent.content_angle_seeds ?? []).length > 0 ? (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                    <h2 className="text-lg font-semibold text-white">
                      Semillas de angulo para contenido
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60 sm:text-base">
                      {generatedContent.content_angle_seeds?.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/documents')}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
                >
                  Volver al inicio
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleExportDocx}
                    disabled={isExportingDocx || isExportingPdf}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isExportingDocx ? 'Exportando DOCX...' : 'Descargar DOCX'}
                  </button>

                  <button
                    type="button"
                    onClick={handleExportPdf}
                    disabled={isExportingPdf || isExportingDocx}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isExportingPdf ? 'Exportando PDF...' : 'Descargar PDF'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}