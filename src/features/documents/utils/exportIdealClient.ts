import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';

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

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function textToParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map(
      (part) =>
        new Paragraph({
          children: [
            new TextRun({
              text: part,
            }),
          ],
          spacing: {
            after: 180,
          },
        })
    );
}

function bulletParagraphs(items: string[]) {
  return items
    .map((item) => item.trim())
    .filter(Boolean)
    .map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: {
            level: 0,
          },
          spacing: {
            after: 120,
          },
        })
    );
}

export async function exportIdealClientDocx(
  generatedContent: GeneratedContent
) {
  const title = generatedContent.title ?? 'Manifiesto de Cliente Ideal';
  const fileName = sanitizeFileName(title || 'manifiesto-cliente-ideal');

  const children: Paragraph[] = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 280,
      },
    }),
  ];

  if (generatedContent.executive_summary) {
    children.push(
      new Paragraph({
        text: 'Resumen ejecutivo',
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 120,
          after: 160,
        },
      }),
      ...textToParagraphs(generatedContent.executive_summary)
    );
  }

  for (const section of generatedContent.sections ?? []) {
    children.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 180,
          after: 160,
        },
      }),
      ...textToParagraphs(section.content)
    );
  }

  if ((generatedContent.key_insights ?? []).length > 0) {
    children.push(
      new Paragraph({
        text: 'Insights clave',
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 180,
          after: 160,
        },
      }),
      ...bulletParagraphs(generatedContent.key_insights ?? [])
    );
  }

  if ((generatedContent.messaging_recommendations ?? []).length > 0) {
    children.push(
      new Paragraph({
        text: 'Recomendaciones de mensaje',
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 180,
          after: 160,
        },
      }),
      ...bulletParagraphs(generatedContent.messaging_recommendations ?? [])
    );
  }

  if ((generatedContent.exact_language_phrases ?? []).length > 0) {
    children.push(
      new Paragraph({
        text: 'Lenguaje literal del cliente',
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 180,
          after: 160,
        },
      }),
      ...bulletParagraphs(generatedContent.exact_language_phrases ?? [])
    );
  }

  if ((generatedContent.content_angle_seeds ?? []).length > 0) {
    children.push(
      new Paragraph({
        text: 'Semillas de angulo para contenido',
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 180,
          after: 160,
        },
      }),
      ...bulletParagraphs(generatedContent.content_angle_seeds ?? [])
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `${fileName}.docx`);
}