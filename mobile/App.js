import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { submitMobilePortraitEnquiry } from './backend';
import {
  Alert, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet,
  Text, TextInput, TouchableOpacity, View, Image, Platform
} from 'react-native';

const INK = '#171613';
const PANEL = '#24221e';
const CREAM = '#f2eee5';
const MUTED = '#aaa397';
const ORANGE = '#d58a4b';
const CHANNEL = 'https://www.youtube.com/@ForgottenPromises123';
const CONTACT_NAME = 'Sonu Kumar';
const CONTACT_EMAIL = 'parassonu953@gmail.com';
const CONTACT_PHONE = '9508000288';
const CONTACT_ADDRESSES = ['Bokaro Steel City, Jharkhand – 827001', 'Jharia, Dhanbad, Jharkhand – 828111'];

const artworks = [
  { title: 'Quiet Conversations', type: 'Portrait', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85' },
  { title: 'The Golden Hour', type: 'Landscape', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85' },
  { title: 'A Study in Blue', type: 'Abstract', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85' },
  { title: 'Heritage in Lines', type: 'Portrait', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=85' }
];

const films = [
  {
    title: 'REALITY OF BOKARO STEEL CITY / BROKEN QUARTERS OF BKSC WHERE WORKERS LIVE',
    id: 'VlchH6x1DmA',
    image: 'https://img.youtube.com/vi/VlchH6x1DmA/hqdefault.jpg'
  },
  {
    title: 'Dhanbad’s Burning Land 🔥 Abandoned Mines That Are Still Alive / Ghar Chhod Kar Bhaag Rahe Log😳',
    id: 'pp-Jw_C3Cio',
    image: 'https://img.youtube.com/vi/pp-Jw_C3Cio/hqdefault.jpg'
  }
];

function Eyebrow({ children }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

function Action({ title, onPress, secondary = false }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.action, secondary && styles.actionSecondary]}>
      <Text style={[styles.actionText, secondary && styles.actionTextSecondary]}>{title}</Text>
    </TouchableOpacity>
  );
}

function Home({ setTab }) {
  return (
    <>
      <View style={styles.hero}>
        <Eyebrow>INDEPENDENT ART & STORYTELLING</Eyebrow>
        <Text style={styles.heroTitle}>Art that feels.{"\n"}<Text style={styles.italic}>Stories that stay.</Text></Text>
        <Text style={styles.body}>A creative space where imagination becomes art, faces become portraits, and everyday moments become films.</Text>
        <Action title="EXPLORE THE GALLERY  ↗" onPress={() => setTab('Gallery')} />
        <Image source={{ uri: artworks[0].image }} style={styles.heroImage} />
        <Text style={styles.imageCaption}>01 / SELECTED WORK · THE HUMAN CANVAS</Text>
      </View>
      <View style={styles.section}>
        <Eyebrow>MADE JUST FOR YOU</Eyebrow>
        <Text style={styles.sectionTitle}>A portrait is more than a <Text style={styles.italic}>picture.</Text></Text>
        <Text style={styles.body}>Turn your favourite photograph into a one-of-a-kind artwork, thoughtfully made by hand.</Text>
        <Action title="COMMISSION A PORTRAIT  ↗" onPress={() => setTab('Portrait')} secondary />
      </View>
      <View style={styles.section}>
        <Eyebrow>BEYOND THE FRAME</Eyebrow>
        <Text style={styles.sectionTitle}>Stories worth <Text style={styles.italic}>watching.</Text></Text>
        <Text style={styles.body}>Documentaries and visual stories from the Forgotten Promises channel.</Text>
        <Action title="WATCH DOCUMENTARIES  ↗" onPress={() => setTab('Films')} />
      </View>
    </>
  );
}

function Gallery() {
  return (
    <View style={styles.section}>
      <Eyebrow>01 / THE ARTWORK</Eyebrow>
      <Text style={styles.sectionTitle}>A world in <Text style={styles.italic}>colour.</Text></Text>
      <Text style={styles.body}>Original works, experiments and little discoveries from the studio.</Text>
      <View style={styles.artGrid}>
        {artworks.map((art) => (
          <View key={art.title} style={styles.artCard}>
            <Image source={{ uri: art.image }} style={styles.artImage} />
            <Text style={styles.cardTitle}>{art.title}</Text>
            <Text style={styles.muted}>{art.type}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.smallNote}>Gallery images are sample placeholders. Replace them with your original artwork before launch.</Text>
    </View>
  );
}

function Films() {
  return (
    <View style={styles.section}>
      <Eyebrow>02 / DOCUMENTARIES</Eyebrow>
      <Text style={styles.sectionTitle}>Stories worth <Text style={styles.italic}>remembering.</Text></Text>
      {films.map((film, index) => (
        <TouchableOpacity key={film.id} style={styles.filmCard} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + film.id)}>
          <Image source={{ uri: film.image }} style={styles.filmImage} />
          <Text style={styles.eyebrow}>FILM 0{index + 1} · TAP TO WATCH ↗</Text>
          <Text style={styles.cardTitle}>{film.title}</Text>
        </TouchableOpacity>
      ))}
      <Action title="OPEN FORGOTTEN PROMISES CHANNEL ↗" onPress={() => Linking.openURL(CHANNEL)} secondary />
    </View>
  );
}

function Field({ label, value, onChangeText, placeholder, multiline = false, keyboardType = 'default' }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#827b70"
        multiline={multiline}
        keyboardType={keyboardType}
        style={[styles.input, multiline && styles.textArea]}
        selectionColor={ORANGE}
      />
    </View>
  );
}

function Portrait() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [style, setStyle] = useState('Graphite portrait');
  const [size, setSize] = useState('A4');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [sending, setSending] = useState(false);

  const chooseImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo permission needed', 'Allow photo library access to attach a reference image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled && result.assets?.[0]) setImage(result.assets[0]);
  };

  const send = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('A little more detail', 'Please enter your name and email address.');
      return;
    }
    setSending(true);
    try {
      await submitMobilePortraitEnquiry({ form: { name, email, style, size, details, people: '1' }, image });
      Alert.alert('Enquiry received', 'Thank you! Your portrait enquiry has been saved. We will contact you by email.');
      setName(''); setEmail(''); setDetails(''); setImage(null);
    } catch (error) {
      Alert.alert('Could not send enquiry', error?.message || 'Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.section}>
      <Eyebrow>03 / MADE JUST FOR YOU</Eyebrow>
      <Text style={styles.sectionTitle}>Your memory,{"\n"}<Text style={styles.italic}>our canvas.</Text></Text>
      <Text style={styles.body}>Tell us about the portrait you have in mind. We'll reply with availability, pricing and next steps.</Text>
      <Field label="YOUR NAME" value={name} onChangeText={setName} placeholder="Your full name" />
      <Field label="EMAIL ADDRESS" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
      <Field label="PREFERRED STYLE" value={style} onChangeText={setStyle} placeholder="Graphite, watercolour, digital..." />
      <Field label="ARTWORK SIZE" value={size} onChangeText={setSize} placeholder="A4, A3 or custom" />
      <Field label="TELL US ABOUT YOUR IDEA" value={details} onChangeText={setDetails} placeholder="A birthday gift, a family memory..." multiline />
      <TouchableOpacity onPress={chooseImage} style={styles.photoPicker}>
        <Text style={styles.actionTextSecondary}>{image ? 'REFERENCE PHOTO SELECTED' : 'ADD REFERENCE PHOTO  +'}</Text>
        {image && <Image source={{ uri: image.uri }} style={styles.selectedPhoto} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={send} disabled={sending} style={styles.action}>
        <Text style={styles.actionText}>{sending ? 'SENDING ENQUIRY…' : 'SEND PORTRAIT ENQUIRY  ↗'}</Text>
      </TouchableOpacity>
      <Text style={styles.smallNote}>Your enquiry and optional reference photo are submitted securely. Photos must be JPG, PNG or WEBP, up to 10 MB.</Text>
    </View>
  );
}

function About() {
  return (
    <View style={styles.section}>
      <Eyebrow>04 / A NOTE FROM THE STUDIO</Eyebrow>
      <Text style={styles.sectionTitle}>Curious minds.{"\n"}<Text style={styles.italic}>Creative hands.</Text>{"\n"}Open stories.</Text>
      <Text style={styles.body}>Creative Duffers is an independent creative space built around the joy of making things. From a pencil sketch to a personal portrait, from a canvas to a documentary frame — every creative work has a story worth sharing.</Text>
      <Action title="VISIT YOUTUBE CHANNEL ↗" onPress={() => Linking.openURL(CHANNEL)} secondary />
      <Text style={styles.contactText}>Founder: {CONTACT_NAME}{'\n'}Email: {CONTACT_EMAIL}{'\n'}Phone: {CONTACT_PHONE}{'\n'}Public addresses:{'\n'}{CONTACT_ADDRESSES.join('\n')}</Text>
    </View>
  );
}

export default function App() {
  const [tab, setTab] = useState('Home');
  const tabs = ['Home', 'Gallery', 'Portrait', 'Films', 'About'];
  const screens = {
    Home: <Home setTab={setTab} />,
    Gallery: <Gallery />,
    Portrait: <Portrait />,
    Films: <Films />,
    About: <About />
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={INK} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setTab('Home')}>
          <Text style={styles.brand}>CD<Text style={{ color: ORANGE }}>✳</Text></Text>
          <Text style={styles.brandSub}>CREATIVE DUFFERS</Text>
        </TouchableOpacity>
        <Text style={styles.headerTag}>ART · PORTRAITS · FILMS</Text>
      </View>
      <ScrollView key={tab} style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {screens[tab]}
        <View style={styles.footer}>
          <Text style={styles.brand}>CD<Text style={{ color: ORANGE }}>✳</Text></Text>
          <Text style={styles.muted}>© 2026 CREATIVE DUFFERS</Text>
          <Text style={styles.muted}>MADE WITH CURIOSITY · INDIA</Text>
        </View>
      </ScrollView>
      <View style={styles.tabBar}>
        {tabs.map((item) => (
          <TouchableOpacity key={item} onPress={() => setTab(item)} style={styles.tab}>
            <Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text>
            {tab === item && <View style={styles.tabDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: INK, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#38352f', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: CREAM, fontSize: 25, fontWeight: '900', letterSpacing: -1 },
  brandSub: { color: MUTED, fontSize: 8, letterSpacing: 2, marginTop: -2 },
  headerTag: { color: MUTED, fontSize: 8, letterSpacing: 1.5 },
  scroll: { flex: 1 },
  content: { paddingBottom: 26 },
  hero: { padding: 24, paddingTop: 38 },
  eyebrow: { color: ORANGE, fontSize: 9, fontWeight: '700', letterSpacing: 2, lineHeight: 16, marginBottom: 13 },
  heroTitle: { color: CREAM, fontSize: 43, lineHeight: 48, fontWeight: '800', letterSpacing: -1.5, marginBottom: 17 },
  italic: { color: ORANGE, fontStyle: 'italic' },
  body: { color: MUTED, fontSize: 14, lineHeight: 23, marginBottom: 22 },
  action: { backgroundColor: ORANGE, paddingVertical: 15, paddingHorizontal: 18, alignSelf: 'flex-start', marginBottom: 20, borderRadius: 2 },
  actionSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#71685c' },
  photoPicker: { borderWidth: 1, borderStyle: 'dashed', borderColor: '#71685c', padding: 15, marginBottom: 18, alignItems: 'center' },
  selectedPhoto: { width: 90, height: 90, marginTop: 12, borderRadius: 3 },
  actionText: { color: INK, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  actionTextSecondary: { color: CREAM },
  heroImage: { width: '100%', height: 330, marginTop: 15, borderRadius: 3, backgroundColor: PANEL },
  imageCaption: { color: MUTED, fontSize: 8, letterSpacing: 1.5, marginTop: 10 },
  section: { padding: 24, paddingTop: 36, borderTopWidth: 1, borderTopColor: '#38352f' },
  sectionTitle: { color: CREAM, fontSize: 32, lineHeight: 38, fontWeight: '800', letterSpacing: -1, marginBottom: 15 },
  artGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  artCard: { width: '48%', marginBottom: 23 },
  artImage: { width: '100%', height: 190, borderRadius: 3, backgroundColor: PANEL, marginBottom: 9 },
  cardTitle: { color: CREAM, fontSize: 14, fontWeight: '700', lineHeight: 20, marginBottom: 4 },
  muted: { color: MUTED, fontSize: 10, letterSpacing: 1 },
  smallNote: { color: '#8e877b', fontSize: 10, lineHeight: 16, marginTop: 10 },
  filmCard: { marginBottom: 27, backgroundColor: PANEL, paddingBottom: 15 },
  filmImage: { width: '100%', height: 190, marginBottom: 15, backgroundColor: '#35312b' },
  fieldWrap: { marginBottom: 17 },
  fieldLabel: { color: CREAM, fontSize: 9, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  input: { color: CREAM, borderWidth: 1, borderColor: '#504a40', paddingHorizontal: 13, paddingVertical: 12, borderRadius: 2, fontSize: 13, backgroundColor: PANEL },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  contactText: { color: CREAM, fontSize: 13, lineHeight: 23, marginTop: 15 },
  footer: { borderTopWidth: 1, borderTopColor: '#38352f', padding: 24, alignItems: 'center', gap: 9 },
  tabBar: { flexDirection: 'row', backgroundColor: '#211f1b', borderTopWidth: 1, borderTopColor: '#494238', paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 18 : 10 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  tabText: { color: '#8d867a', fontSize: 9, fontWeight: '700' },
  tabTextActive: { color: CREAM },
  tabDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: ORANGE, marginTop: 5 }
});