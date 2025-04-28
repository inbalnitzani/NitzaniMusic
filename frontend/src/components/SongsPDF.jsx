// components/SongsPDF.jsx
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

Font.register({
    family: 'Varela',
    src: '/fonts/Varela Round Regular.ttf',
});


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
        fontSize: 14,
        direction: 'rtl',
        fontFamily: 'Varela',
        textAlign: 'right'
    },
    section: {
        marginBottom: 10,
        padding: 10,
        border: '1px solid #eee',
        borderRadius: 5,
        direction: 'rtl',

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

const SongsPDF = ({ songs }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {songs.map(song => (
                <View key={song.id} style={styles.section}>
                    <Text style={styles.title}>שם: {song.title}</Text>
                    <Text>מבצע: {song.artist}</Text>
                    <Text>יוצרים: {Array.isArray(song.authors) ? song.authors.join(', ') : song.authors}</Text>
                    {song.track && (
                        <Text>
                            <Link src={song.track}>קישור</Link>
                        </Text>
                    )}
                </View>
            ))}
        </Page>
    </Document>
);

export default SongsPDF;
