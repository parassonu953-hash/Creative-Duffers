import { useMemo, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Play, Menu, X, Instagram,
  Youtube, Mail, Palette, Clock3, CheckCircle2, Upload, ImagePlus,
  Sparkles, Heart, Film, Brush, Send, ChevronDown
} from 'lucide-react';

const artworks = [
  { title: 'Quiet Conversations', type: 'Portrait', year: '2026', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85', size: 'tall' },
  { title: 'The Golden Hour', type: 'Landscape', year: '2026', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85', size: 'wide' },
  { title: 'A Study in Blue', type: 'Abstract', year: '2025', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85', size: 'normal' },
  { title: 'Heritage in Lines', type: 'Portrait', year: '2025', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=85', size: 'normal' },
  { title: 'Wildflower Dreams', type: 'Illustration', year: '2025', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85', size: 'tall' },
  { title: 'Fragments of Us', type: 'Abstract', year: '2024', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85', size: 'normal' }
];

const films = [
  { title: 'Stories Between the Frames', category: 'People & Culture', duration: '12 min', year: '2026', videoId: 'ScMzIvxBSi4', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=85', description: 'A visual journey into the people, places and little moments that make a story worth telling.' },
  { title: 'The Art of Looking Closer', category: 'Creative Process', duration: '08 min', year: '2025', videoId: 'ysz5S6PUM-U', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1000&q=85', description: 'Behind the scenes of finding inspiration in ordinary details and turning them into art.' },
  { title: 'Voices of the Everyday', category: 'Documentary', duration: '16 min', year: '2025', videoId: 'aqz-KE-bpKQ', image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1000&q=85', description: 'An intimate collection of voices, memories and perspectives from everyday life.' }
];

const categories = ['All', 'Portrait', 'Landscape', 'Abstract', 'Illustration'];

function SectionHeading({ eyebrow, title, note, light = false }) {
  return <div className={`section-heading ${light ? 'light' : ''}`}>
    <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
    {note && <p>{note}</p>}
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', style: 'Graphite portrait', size: 'A4', people: '1', details: '' });

  const visibleArtworks = useMemo(() => filter === 'All' ? artworks : artworks.filter(a => a.type === filter), [filter]);

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const chooseFile = (event) => {
    const picked = event.target.files?.[0];
    if (!picked) return;
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  };
  const sendOrder = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent('Custom portrait enquiry — Creative Duffers');
    const body = encodeURIComponent(
      `Hello Creative Duffers!\n\nI'd like to enquire about a custom portrait.\n\nName: ${form.name}\nEmail: ${form.email}\nStyle: ${form.style}\nSize: ${form.size}\nPeople: ${form.people}\nDetails: ${form.details}\n\nReference image selected: ${file ? file.name : 'No image attached'}\n\nPlease let me know the next steps and pricing.`
    );
    window.location.href = `mailto:hello@creativeduffers.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const closeMenu = () => setMenuOpen(false);
  return <>
    <header className="site-header">
      <a href="#home" className="brand" onClick={closeMenu}><span className="brand-mark">CD<span>✳</span></span><span>CREATIVE<br/>DUFFERS</span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#work" onClick={closeMenu}>The Gallery</a><a href="#portraits" onClick={closeMenu}>Commission a Portrait</a><a href="#films" onClick={closeMenu}>Documentaries</a><a href="#about" onClick={closeMenu}>Our Story</a>
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grain"></div>
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot"></span> INDEPENDENT ART & STORYTELLING</span>
          <h1>Art that feels.<br/><em>Stories that stay.</em></h1>
          <p className="hero-intro">A little corner of the world where imagination becomes art, faces become portraits, and everyday moments become films.</p>
          <div className="hero-actions"><a className="button button-light" href="#work">Explore the work <ArrowDown size={16}/></a><a className="text-link" href="#portraits">Create something personal <ArrowUpRight size={16}/></a></div>
          <div className="hero-footnote"><span>ART · PORTRAITS · DOCUMENTARIES</span><span>EST. WITH CURIOSITY — 2026</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=90" alt="Expressive classical portrait painting" /><div className="image-caption"><span>01 / SELECTED WORK</span><span>THE HUMAN CANVAS</span></div></div>
          <div className="hero-stamp"><span>MADE WITH</span><strong>♥</strong><span>MEANING</span></div>
          <span className="hero-side-note">A CREATIVE PRACTICE IN PROGRESS — INDIA</span>
        </div>
        <div className="hero-index">01 <span></span> 04</div>
      </section>

      <section className="ticker" aria-label="Creative disciplines"><div className="ticker-track">{Array.from({length:2}).map((_,i)=><span key={i}>PAINTINGS <b>✳</b> CUSTOM PORTRAITS <b>✳</b> DOCUMENTARY FILMS <b>✳</b> CREATIVE EXPERIMENTS <b>✳</b></span>)}</div></section>

      <section className="gallery section-pad" id="work">
        <SectionHeading eyebrow="01 / THE ARTWORK" title={<>A world in <em>colour.</em></>} note="Every piece begins with a feeling. Explore original works, experiments and little discoveries from the studio."/>
        <div className="filter-row">{categories.map(c=><button key={c} className={filter===c?'filter active':'filter'} onClick={()=>setFilter(c)}>{c}</button>)}<span className="work-count">{visibleArtworks.length.toString().padStart(2,'0')} WORKS</span></div>
        <div className="art-grid">{visibleArtworks.map((art,i)=><article className={`art-card ${art.size}`} key={art.title}><div className="art-image"><img src={art.image} alt={art.title} loading="lazy"/><span className="art-number">0{i+1}</span><button className="art-open" aria-label={`View ${art.title}`} onClick={()=>document.getElementById('portraits').scrollIntoView({behavior:'smooth'})}><ArrowUpRight/></button></div><div className="art-meta"><div><h3>{art.title}</h3><p>{art.type} · {art.year}</p></div><span>↗</span></div></article>)}</div>
        <div className="gallery-bottom"><span>MORE IDEAS ARE ALWAYS TAKING SHAPE.</span><a href="#contact" className="text-link dark">Have a project in mind? <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="commission" id="portraits">
        <div className="commission-image"><img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1100&q=85" alt="Artist painting in a studio"/><div className="commission-image-note">FROM YOUR MOMENT<br/>TO A PIECE OF ART.</div></div>
        <div className="commission-content">
          <span className="eyebrow">02 / MADE JUST FOR YOU</span><h2>A portrait is<br/>more than a <em>picture.</em></h2>
          <p className="commission-lead">It's a memory you can hold. Turn your favourite photograph into a one-of-a-kind artwork, thoughtfully made by hand.</p>
          <div className="process-list"><div><span>01</span><div><h4>Share your photograph</h4><p>Choose a clear photo and tell us the story behind it.</p></div></div><div><span>02</span><div><h4>Choose your style</h4><p>Pick a medium, size and the little details that matter.</p></div></div><div><span>03</span><div><h4>Made with care</h4><p>We confirm the quote and timeline before creating your piece.</p></div></div></div>
          <a className="button button-dark" href="#order-form">Commission your portrait <ArrowUpRight size={16}/></a>
        </div>
      </section>

      <section className="order-section section-pad" id="order-form">
        <div className="order-intro"><span className="eyebrow">LET'S MAKE IT PERSONAL</span><h2>Your memory,<br/><em>our canvas.</em></h2><p>Tell us a little about the portrait you have in mind. We'll get back to you with availability, pricing and the next steps.</p><div className="order-promise"><Sparkles size={18}/><span>No payment now. We'll discuss every detail with you first.</span></div></div>
        <form className="order-form" onSubmit={sendOrder}>
          <div className="form-top"><span>PORTRAIT ENQUIRY FORM</span><span>01 — 04</span></div>
          {submitted && <div className="success-note"><CheckCircle2 size={18}/> Your email app should open with your enquiry. Attach your reference photo before sending.</div>}
          <div className="form-grid"><label>Your name<input required name="name" value={form.name} onChange={updateForm} placeholder="Your full name"/></label><label>Email address<input required type="email" name="email" value={form.email} onChange={updateForm} placeholder="you@example.com"/></label>
          <label>Preferred style<select name="style" value={form.style} onChange={updateForm}><option>Graphite portrait</option><option>Colour pencil</option><option>Watercolour</option><option>Digital illustration</option><option>Oil / acrylic painting</option><option>Not sure — guide me</option></select><ChevronDown className="select-icon" size={15}/></label>
          <label>Artwork size<select name="size" value={form.size} onChange={updateForm}><option>A5</option><option>A4</option><option>A3</option><option>Custom size</option></select><ChevronDown className="select-icon" size={15}/></label>
          <label>Number of people<select name="people" value={form.people} onChange={updateForm}><option value="1">1 person</option><option value="2">2 people</option><option value="3">3 people</option><option value="4+">4 or more</option><option>Pet portrait</option></select><ChevronDown className="select-icon" size={15}/></label>
          <label className="full">Tell us about your idea<textarea name="details" value={form.details} onChange={updateForm} rows="3" placeholder="A birthday gift, a family memory, a portrait of someone special..."/></label>
          <label className="full upload-label"><span>REFERENCE PHOTOGRAPH <small>(JPG, PNG or WEBP)</small></span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={chooseFile}/><span className="upload-box">{preview ? <><img src={preview} alt="Selected reference preview"/><span>{file?.name}</span></> : <><ImagePlus size={22}/><strong>Choose a photograph</strong><small>Click to browse your files</small></>}</span></label></div>
          <button type="submit" className="button button-dark submit-button">Send portrait enquiry <Send size={16}/></button>
          <p className="form-disclaimer">Your photograph is used only to discuss your commission. Please don't upload sensitive images.</p>
        </form>
      </section>

      <section className="film-section" id="films">
        <div className="film-top section-pad"><SectionHeading eyebrow="03 / BEYOND THE FRAME" title={<>Stories worth <em>watching.</em></>} note="Documentaries, visual essays and stories from behind the lens. Press play and stay a while." light/><a href="https://www.youtube.com/@ForgottenPromises123" target="_blank" rel="noreferrer" className="youtube-link"><Youtube size={18}/> FIND US ON YOUTUBE <ArrowUpRight size={15}/></a></div>
        <div className="film-grid section-pad">{films.map((film,i)=><article className="film-card" key={film.title}><button className="film-thumb" onClick={()=>setSelectedFilm(film)} aria-label={`Play ${film.title}`}><img src={film.image} alt={film.title} loading="lazy"/><span className="play-button"><Play fill="currentColor" size={18}/></span><span className="film-duration">{film.duration}</span><span className="film-index">FILM 0{i+1}</span></button><div className="film-meta"><div><span>{film.category} · {film.year}</span><h3>{film.title}</h3><p>{film.description}</p></div><button onClick={()=>setSelectedFilm(film)} className="film-arrow" aria-label="Watch film"><ArrowUpRight/></button></div></article>)}</div>
        <div className="film-footer section-pad"><span>MORE FILMS. MORE POINTS OF VIEW.</span><a href="https://www.youtube.com/@ForgottenPromises123" target="_blank" rel="noreferrer" className="text-link light-link">Explore the YouTube channel <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="about section-pad" id="about"><div className="about-label"><span className="eyebrow">04 / A NOTE FROM THE STUDIO</span><span className="about-symbol">✳</span></div><div className="about-main"><h2>Curious minds.<br/><em>Creative hands.</em><br/>Open stories.</h2><div className="about-copy"><p>Creative Duffers is an independent creative space built around the joy of making things. From a pencil sketch to a personal portrait, from a canvas to a documentary frame — we believe every creative work has a story worth sharing.</p><p>This is a growing portfolio. New work, new films and new experiments will find their home here.</p><a className="text-link dark" href="#contact">Get to know us <ArrowUpRight size={16}/></a></div></div><div className="about-bottom"><span>MADE IN INDIA</span><span>ART IS A WAY OF PAYING ATTENTION.</span><span>✳</span></div></section>

      <section className="contact" id="contact"><div className="contact-inner"><span className="eyebrow">HAVE A GOOD IDEA?</span><h2>Let's make<br/><em>something matter.</em></h2><p>For portrait commissions, collaborations, film projects or just to say hello — we'd love to hear from you.</p><a href="mailto:hello@creativeduffers.com" className="button button-light">Start a conversation <Mail size={16}/></a><div className="contact-social"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={17}/> INSTAGRAM <ArrowUpRight size={13}/></a><a href="https://www.youtube.com/@ForgottenPromises123" target="_blank" rel="noreferrer"><Youtube size={17}/> YOUTUBE <ArrowUpRight size={13}/></a></div></div><div className="contact-decoration">CD✳</div></section>
    </main>

    <footer className="footer"><a href="#home" className="brand footer-brand"><span className="brand-mark">CD<span>✳</span></span><span>CREATIVE<br/>DUFFERS</span></a><span>© 2026 CREATIVE DUFFERS. MADE WITH CURIOSITY.</span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>

    {selectedFilm && <div className="video-modal" role="dialog" aria-modal="true" aria-label={selectedFilm.title} onClick={()=>setSelectedFilm(null)}><button className="modal-close" onClick={()=>setSelectedFilm(null)} aria-label="Close video"><X/></button><div className="video-frame" onClick={e=>e.stopPropagation()}><iframe src={`https://www.youtube-nocookie.com/embed/${selectedFilm.videoId}?autoplay=1&rel=0`} title={selectedFilm.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/><div className="video-caption"><span>{selectedFilm.category} · {selectedFilm.year}</span><h3>{selectedFilm.title}</h3><p>{selectedFilm.description}</p></div></div></div>}
  </>;
}

export default App;