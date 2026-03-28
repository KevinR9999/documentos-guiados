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
  positioning_recommendations?: string[];
  message_recommendations?: string[];
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

function textToParagraphs(text?: string) {
  if (!text) return [];

  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map(
      (part) =>
        new Paragraph({
          children: [new TextRun({ text: part })],
          spacing: {
            after: 180,
          },
        })
    );
}

function bulletParagraphs(items?: string[]) {
  if (!items?.length) return [];

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

export async function exportStrategicManifestoDocx(
  generatedContent: GeneratedContent
) {
  const title = generatedContent.title ?? 'Manifiesto Estratégico';
  const fileName = sanitizeFileName(title || 'manifiesto-estrategico');

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
      ...bulletParagraphs(generatedContent.key_insights)
    );
  }

  if ((generatedContent.positioning_recommendations ?? []).length > 0) {
    children.push(
      new Paragraph({
        text: 'Recomendaciones de posicionamiento',
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 180,
          after: 160,
        },
      }),
      ...bulletParagraphs(generatedContent.positioning_recommendations)
    );
  }

  if ((generatedContent.message_recommendations ?? []).length > 0) {
    children.push(
      new Paragraph({
        text: 'Recomendaciones de mensaje',
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 180,
          after: 160,
        },
      }),
      ...bulletParagraphs(generatedContent.message_recommendations)
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