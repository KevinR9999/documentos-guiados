import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

type Section = {
  title: string;
  content: string;
};

export type IdealClientPdfData = {
  title?: string;
  executive_summary?: string;
  sections?: Section[];
  key_insights?: string[];
  messaging_recommendations?: string[];
  exact_language_phrases?: string[];
  sales_triggers?: string[];
  content_angle_seeds?: string[];
};

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    paddingTop: 52,
    paddingBottom: 42,
    paddingHorizontal: 54,
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontSize: 11,
    lineHeight: 1.65,
    fontFamily: 'Times-Roman',
  },

  header: {
    marginBottom: 26,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },

  eyebrow: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 10,
  },

  summary: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
    color: '#374151',
    lineHeight: 1.7,
  },

  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 7,
  },

  sectionDivider: {
    width: 42,
    height: 1,
    backgroundColor: '#D1D5DB',
    marginBottom: 10,
  },

  paragraph: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
    color: '#374151',
    lineHeight: 1.75,
    marginBottom: 7,
  },

  listBlock: {
    marginTop: 8,
    marginBottom: 16,
  },

  listTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 8,
  },

  listItem: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
    color: '#374151',
    lineHeight: 1.7,
    marginBottom: 4,
    paddingLeft: 10,
  },

  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

function insertBreaksInLongTokens(text: string, maxChunk = 24) {
  return text.replace(/\S{30,}/g, (token) => {
    const parts: string[] = [];
    for (let i = 0; i < token.length; i += maxChunk) {
      parts.push(token.slice(i, i + maxChunk));
    }
    return parts.join('\u200B');
  });
}

function sanitizePdfText(input?: string) {
  if (!input) return '';

  const cleaned = input
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();

  return insertBreaksInLongTokens(cleaned);
}

function isNonEmpty(text?: string) {
  return sanitizePdfText(text).length > 0;
}

function sanitizeList(items?: string[]) {
  if (!items?.length) return [];
  return items
    .map((item) => sanitizePdfText(item))
    .filter((item) => item.length > 0);
}

function sanitizeSections(sections?: Section[]) {
  if (!sections?.length) return [];
  return sections
    .map((section) => ({
      title: sanitizePdfText(section.title),
      content: sanitizePdfText(section.content),
    }))
    .filter((section) => section.title.length > 0 && section.content.length > 0);
}

function renderParagraphs(text?: string) {
  const safeText = sanitizePdfText(text);
  if (!safeText) return null;

  return safeText
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, index) => (
      <Text key={index} style={styles.paragraph}>
        {part}
      </Text>
    ));
}

function renderBulletList(items?: string[]) {
  const safeItems = sanitizeList(items);
  if (!safeItems.length) return null;

  return safeItems.map((item, index) => (
    <Text key={index} style={styles.listItem}>
      • {item}
    </Text>
  ));
}

export default function IdealClientPdfDocument({
  data,
}: {
  data: IdealClientPdfData;
}) {
  const safeTitle =
    sanitizePdfText(data.title) || 'Manifiesto de Cliente Ideal';
  const safeSummary = sanitizePdfText(data.executive_summary);
  const safeSections = sanitizeSections(data.sections);
  const safeInsights = sanitizeList(data.key_insights);
  const safeMessaging = sanitizeList(data.messaging_recommendations);
  const safeLanguage = sanitizeList(data.exact_language_phrases);
  const safeSalesTriggers = sanitizeList(data.sales_triggers);
  const safeAngles = sanitizeList(data.content_angle_seeds);

  return (
    <Document
      title={safeTitle}
      author="Guionista de Astucia"
      subject="Manifiesto de Cliente Ideal"
      creator="Guionista de Astucia"
      producer="Guionista de Astucia"
      language="es-CO"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} wrap={false}>
          <Text style={styles.eyebrow}>Documento generado</Text>
          <Text style={styles.title}>{safeTitle}</Text>

          {isNonEmpty(safeSummary) ? (
            <Text style={styles.summary}>{safeSummary}</Text>
          ) : null}
        </View>

        {safeSections.map((section, index) => (
          <View key={`${section.title}-${index}`} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionDivider} />
            <View>{renderParagraphs(section.content)}</View>
          </View>
        ))}

        {safeInsights.length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Insights clave</Text>
            <View>{renderBulletList(safeInsights)}</View>
          </View>
        ) : null}

        {safeMessaging.length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Recomendaciones de mensaje</Text>
            <View>{renderBulletList(safeMessaging)}</View>
          </View>
        ) : null}

        {safeLanguage.length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Lenguaje literal del avatar</Text>
            <View>{renderBulletList(safeLanguage)}</View>
          </View>
        ) : null}

        {safeSalesTriggers.length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Disparadores de compra</Text>
            <View>{renderBulletList(safeSalesTriggers)}</View>
          </View>
        ) : null}

        {safeAngles.length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Semillas de contenido</Text>
            <View>{renderBulletList(safeAngles)}</View>
          </View>
        ) : null}

        <Text style={styles.footer}>
          Manifiesto de Cliente Ideal
        </Text>
      </Page>
    </Document>
  );
}