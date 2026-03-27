import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TextRun,
} from 'docx';

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

export async function exportReelsShortDocx(
  generatedContent: GeneratedContent
) {
  const title = generatedContent.title ?? 'Guion para Reel';
  const fileName = sanitizeFileName(title || 'guion-para-reel');

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

  if (generatedContent.objective) {
    children.push(
      new Paragraph({
        text: `Objetivo: ${generatedContent.objective}`,
        spacing: { after: 140 },
      })
    );
  }

  if (generatedContent.angle) {
    children.push(
      new Paragraph({
        text: `Angulo: ${generatedContent.angle}`,
        spacing: { after: 140 },
      })
    );
  }

  if (generatedContent.format_recommendation) {
    children.push(
      new Paragraph({
        text: 'Formato recomendado',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 160, after: 160 },
      }),
      ...textToParagraphs(generatedContent.format_recommendation)
    );
  }

  if (generatedContent.hook) {
    children.push(
      new Paragraph({
        text: 'Hook',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 160, after: 160 },
      }),
      ...textToParagraphs(generatedContent.hook)
    );
  }

  if (generatedContent.script) {
    children.push(
      new Paragraph({
        text: 'Guion',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 160, after: 160 },
      }),
      ...textToParagraphs(generatedContent.script)
    );
  }

  if (generatedContent.caption) {
    children.push(
      new Paragraph({
        text: 'Caption',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 160, after: 160 },
      }),
      ...textToParagraphs(generatedContent.caption)
    );
  }

  if (generatedContent.cta) {
    children.push(
      new Paragraph({
        text: 'CTA',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 160, after: 160 },
      }),
      ...textToParagraphs(generatedContent.cta)
    );
  }

  if (generatedContent.reward) {
    children.push(
      new Paragraph({
        text: 'Recompensa',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 160, after: 160 },
      }),
      ...textToParagraphs(generatedContent.reward)
    );
  }

  if ((generatedContent.recording_notes ?? []).length > 0) {
    children.push(
      new Paragraph({
        text: 'Notas de grabacion',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 160, after: 160 },
      }),
      ...bulletParagraphs(generatedContent.recording_notes)
    );
  }

  if ((generatedContent.visual_beats ?? []).length > 0) {
    children.push(
      new Paragraph({
        text: 'Ritmo visual sugerido',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 160, after: 160 },
      }),
      ...bulletParagraphs(generatedContent.visual_beats)
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