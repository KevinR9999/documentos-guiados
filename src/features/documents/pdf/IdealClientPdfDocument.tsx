import {
    Document,
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
  content_angle_seeds?: string[];
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 52,
    paddingBottom: 52,
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
    textAlign: 'justify',
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
    textAlign: 'justify',
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
    position: 'absolute',
    bottom: 18,
    left: 54,
    right: 54,
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#9CA3AF',
  },
});

function renderParagraphs(text?: string) {
  if (!text) return null;

  return text
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
  if (!items?.length) return null;

  return items
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item, index) => (
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
  return (
    <Document
      title={data.title ?? 'Manifiesto de Cliente Ideal'}
      author="Guionista de Astucia"
      subject="Manifiesto de Cliente Ideal"
      creator="Guionista de Astucia"
      producer="Guionista de Astucia"
      language="es-CO"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header} wrap={false}>
          <Text style={styles.eyebrow}>Documento generado</Text>
          <Text style={styles.title}>
            {data.title ?? 'Manifiesto de Cliente Ideal'}
          </Text>

          {data.executive_summary ? (
            <Text style={styles.summary}>{data.executive_summary}</Text>
          ) : null}
        </View>

        {(data.sections ?? []).map((section, index) => (
          <View key={`${section.title}-${index}`} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionDivider} />
            <View>{renderParagraphs(section.content)}</View>
          </View>
        ))}

        {(data.key_insights ?? []).length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Insights clave</Text>
            <View>{renderBulletList(data.key_insights)}</View>
          </View>
        ) : null}

        {(data.messaging_recommendations ?? []).length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Recomendaciones de mensaje</Text>
            <View>{renderBulletList(data.messaging_recommendations)}</View>
          </View>
        ) : null}

        {(data.exact_language_phrases ?? []).length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Lenguaje literal del cliente</Text>
            <View>{renderBulletList(data.exact_language_phrases)}</View>
          </View>
        ) : null}

        {(data.content_angle_seeds ?? []).length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Semillas de angulo para contenido</Text>
            <View>{renderBulletList(data.content_angle_seeds)}</View>
          </View>
        ) : null}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Manifiesto de Cliente Ideal • Pagina ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}