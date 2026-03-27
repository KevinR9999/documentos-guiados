import {
    Document,
    Page,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer';

export type ReelsShortPdfData = {
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

  meta: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
    color: '#374151',
    lineHeight: 1.7,
    marginBottom: 4,
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

export default function ReelsShortPdfDocument({
  data,
}: {
  data: ReelsShortPdfData;
}) {
  return (
    <Document
      title={data.title ?? 'Guion para Reel'}
      author="Guionista de Astucia"
      subject="Guion para Reel"
      creator="Guionista de Astucia"
      producer="Guionista de Astucia"
      language="es-CO"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header} wrap={false}>
          <Text style={styles.eyebrow}>Documento generado</Text>
          <Text style={styles.title}>{data.title ?? 'Guion para Reel'}</Text>

          {data.objective ? (
            <Text style={styles.meta}>Objetivo: {data.objective}</Text>
          ) : null}

          {data.angle ? (
            <Text style={styles.meta}>Angulo: {data.angle}</Text>
          ) : null}
        </View>

        {data.format_recommendation ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formato recomendado</Text>
            <View style={styles.sectionDivider} />
            <View>{renderParagraphs(data.format_recommendation)}</View>
          </View>
        ) : null}

        {data.hook ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hook</Text>
            <View style={styles.sectionDivider} />
            <View>{renderParagraphs(data.hook)}</View>
          </View>
        ) : null}

        {data.script ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Guion</Text>
            <View style={styles.sectionDivider} />
            <View>{renderParagraphs(data.script)}</View>
          </View>
        ) : null}

        {data.caption ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Caption</Text>
            <View style={styles.sectionDivider} />
            <View>{renderParagraphs(data.caption)}</View>
          </View>
        ) : null}

        {data.cta ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CTA</Text>
            <View style={styles.sectionDivider} />
            <View>{renderParagraphs(data.cta)}</View>
          </View>
        ) : null}

        {data.reward ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recompensa</Text>
            <View style={styles.sectionDivider} />
            <View>{renderParagraphs(data.reward)}</View>
          </View>
        ) : null}

        {(data.recording_notes ?? []).length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Notas de grabacion</Text>
            <View>{renderBulletList(data.recording_notes)}</View>
          </View>
        ) : null}

        {(data.visual_beats ?? []).length > 0 ? (
          <View style={styles.listBlock}>
            <Text style={styles.listTitle}>Ritmo visual sugerido</Text>
            <View>{renderBulletList(data.visual_beats)}</View>
          </View>
        ) : null}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Guion para Reel • Pagina ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}