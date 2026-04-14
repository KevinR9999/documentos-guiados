import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import IdealClientPdfDocument from '../../features/documents/pdf/IdealClientPdfDocument';
import { getDocumentSessionById } from '../../features/documents/services/documentSessions';
import { exportIdealClientDocx } from '../../features/documents/utils/exportIdealClient';
import { supabase } from '../../lib/supabase';

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

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function IdealClientResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('sessionId');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [scriptId, setScriptId] = useState<string | null>(null);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const [favoriteSaved, setFavoriteSaved] = useState(false);

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

        const { data: savedScripts, error: scriptLookupError } = await supabase
          .from('generated_scripts')
          .select('id')
          .eq('module', 'ideal_client_manifesto')
          .eq('script_type', 'ideal_client_document')
          .contains('input_context', { sessionId })
          .order('created_at', { ascending: false })
          .limit(1);

        if (scriptLookupError) {
          console.error('No se pudo localizar el script guardado:', scriptLookupError);
        } else if (savedScripts?.length) {
          setScriptId(savedScripts[0].id);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('No se pudo cargar el documento generado.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDocument();
  }, [sessionId]);

  async function trackFeedback(feedback: {
    is_favorite?: boolean;
    exported_pdf?: boolean;
    exported_docx?: boolean;
    reused?: boolean;
    rating?: number;
  }) {
    try {
      if (!scriptId) {
        console.warn('No hay scriptId disponible para guardar feedback.');
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('No se pudo obtener el usuario actual para guardar feedback:', userError);
        return;
      }

      const { error: feedbackError } = await supabase.from('script_feedback').insert({
        script_id: scriptId,
        user_id: user.id,
        rating: feedback.rating ?? null,
        is_favorite: feedback.is_favorite ?? false,
        exported_pdf: feedback.exported_pdf ?? false,
        exported_docx: feedback.exported_docx ?? false,
        reused: feedback.reused ?? false,
      });

      if (feedbackError) {
        console.error('No se pudo guardar el feedback del documento:', feedbackError);
        return;
      }

      const { error: promoteError } = await supabase.functions.invoke(
        'promote-script-to-global',
        {
          body: { scriptId },
        }
      );

      if (promoteError) {
        console.error('No se pudo reprocesar el documento para aprendizaje global:', promoteError);
      }
    } catch (error) {
      console.error('Error inesperado guardando feedback:', error);
    }
  }

  async function handleFavorite() {
    if (!scriptId || favoriteSaved) {
      return;
    }

    try {
      setIsSavingFavorite(true);
      await trackFeedback({ is_favorite: true, rating: 5 });
      setFavoriteSaved(true);
    } catch (error) {
      console.error(error);
      alert('No se pudo marcar el documento como favorito.');
    } finally {
      setIsSavingFavorite(false);
    }
  }

  async function handleExportDocx() {
    try {
      setIsExportingDocx(true);
      await exportIdealClientDocx(generatedContent);
      await trackFeedback({ exported_docx: true });
    } catch (error) {
      console.error(error);
      alert('No se pudo exportar el archivo DOCX.');
    } finally {
      setIsExportingDocx(false);
    }
  }

  async function handlePdfDownload() {
    await trackFeedback({ exported_pdf: true });
  }

  const pdfFileName = `${sanitizeFileName(
    generatedContent.title ?? 'manifiesto-de-cliente-ideal'
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

              <div className="mt-6 space-y-4">
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
                    onClick={handleFavorite}
                    disabled={isSavingFavorite || favoriteSaved || !scriptId}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {favoriteSaved
                      ? 'Guardado como favorito'
                      : isSavingFavorite
                        ? 'Guardando favorito...'
                        : 'Marcar favorito'}
                  </button>

                  <button
                    type="button"
                    onClick={handleExportDocx}
                    disabled={isExportingDocx}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isExportingDocx ? 'Exportando DOCX...' : 'Descargar DOCX'}
                  </button>

                  <PDFDownloadLink
                    document={<IdealClientPdfDocument data={generatedContent} />}
                    fileName={pdfFileName}
                    onClick={handlePdfDownload}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition hover:scale-[1.02]"
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