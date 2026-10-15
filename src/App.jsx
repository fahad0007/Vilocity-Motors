import { useMemo, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Gauge,
  Heart, Menu, Search, ShieldCheck, SlidersHorizontal, Sparkles, X,
  Zap, CarFront, Fuel, Users, CalendarDays
} from 'lucide-react'

const cars = [
  { id: 1, name: 'Lamborghini Huracán', brand: 'Lamborghini', category: 'Supercars', year: 2024, price: 42000000, power: '630 hp', speed: '325 km/h', zero: '3.2 sec', fuel: 'Petrol', seats: 2, tag: 'Pure adrenaline', image: 'photo-1544636331-e26879cd4d9b', color: 'Giallo' },
  { id: 2, name: 'Ferrari 296 GTB', brand: 'Ferrari', category: 'Supercars', year: 2024, price: 54000000, power: '819 hp', speed: '330 km/h', zero: '2.9 sec', fuel: 'Hybrid', seats: 2, tag: 'Italian masterpiece', image: 'photo-1592198084033-aado892c8e9e', color: 'Rosso' },
  { id: 3, name: 'Porsche 911 Carrera', brand: 'Porsche', category: 'Sports Cars', year: 2025, price: 19500000, power: '388 hp', speed: '294 km/h', zero: '4.1 sec', fuel: 'Petrol', seats: 4, tag: 'Everyday icon', image: 'photo-1503376780353-7e6692767b70', color: 'Arctic Grey' },
  { id: 4, name: 'Toyota Fortuner Legender', brand: 'Toyota', category: 'SUVs', year: 2025, price: 4650000, power: '204 hp', speed: '190 km/h', zero: '10.8 sec', fuel: 'Diesel', seats: 7, tag: 'Command every road', image: 'photo-1519641471654-76ce0107ad1b', color: 'Attitude Black' },
  { id: 5, name: 'Land Rover Defender 110', brand: 'Land Rover', category: 'SUVs', year: 2025, price: 12000000, power: '296 hp', speed: '191 km/h', zero: '7.0 sec', fuel: 'Petrol', seats: 5, tag: 'Built for the wild', image: 'photo-151 SUV', color: 'Santorini Black' },
  { id: 6, name: 'Mercedes-AMG G 63', brand: 'Mercedes-Benz', category: 'Luxury SUVs', year: 2024, price: 33500000, power: '577 hp', speed: '220 km/h', zero: '4.5 sec', fuel: 'Petrol', seats: 5, tag: 'Icon status', image: 'photo-1520031441872-2659bc4c8e4d', color: 'Obsidian Black' },
  { id: 7, name: 'McLaren 750S', brand: 'McLaren', category: 'Supercars', year: 2024, price: 55000000, power: '740 hp', speed: '332 km/h', zero: '2.8 sec', fuel: 'Petrol', seats: 2, tag: 'Lightweight legend', image: 'photo-1621135802920-133df287f89c', color: 'Papaya Spark' },
  { id: 8, name: 'BMW X7 xDrive40i', brand: 'BMW', category: 'Luxury SUVs', year: 2025, price: 12500000, power: '375 hp', speed: '245 km/h', zero: '5.8 sec', fuel: 'Petrol', seats: 7, tag: 'First-class comfort', image: 'photo-1606664515524-ed2f786a0bd6', color: 'Mineral White' },
  { id: 9, name: 'Audi RS e-tron GT', brand: 'Audi', category: 'Electric', year: 2025, price: 17000000, power: '637 hp', speed: '250 km/h', zero: '3.4 sec', fuel: 'Electric', seats: 5, tag: 'Electric soul', image: 'photo-1614200187524-dc4b892acf16', color: 'Daytona Grey' },
  { id: 10, name: 'Ford Mustang GT', brand: 'Ford', category: 'Sports Cars', year: 2024, price: 7500000, power: '486 hp', speed: '250 km/h', zero: '4.4 sec', fuel: 'Petrol', seats: 4, tag: 'American muscle', image: 'photo-1584345604476-8ec5e12e42dd', color: 'Race Red' },
  { id: 11, name: 'Jeep Wrangler Rubicon', brand: 'Jeep', category: 'SUVs', year: 2024, price: 6700000, power: '268 hp', speed: '180 km/h', zero: '7.6 sec', fuel: 'Petrol', seats: 5, tag: 'Adventure starts here', image: 'photo-1533473359331-0135ef1b58bf', color: 'Firecracker Red' },
  { id: 12, name: 'Aston Martin Vantage', brand: 'Aston Martin', category: 'Sports Cars', year: 2025, price: 36500000, power: '656 hp', speed: '325 km/h', zero: '3.5 sec', fuel: 'Petrol', seats: 2, tag: 'Understated power', image: 'photo-1617814076367-b759c7d7e738', color: 'Racing Green' },
  { id: 13, name: 'Bugatti Chiron', brand: 'Bugatti', category: 'Supercars', year: 2024, price: 250000000, power: '1500 hp', speed: '420 km/h', zero: '2.4 sec', fuel: 'Petrol', seats: 2, tag: 'Engineering without limits', image: 'photo-1503736334956-4c8f8e92946d', color: 'Atlantic Blue' },
  { id: 14, name: 'Koenigsegg Jesko', brand: 'Koenigsegg', category: 'Supercars', year: 2025, price: 300000000, power: '1600 hp', speed: '480 km/h', zero: '2.5 sec', fuel: 'Petrol', seats: 2, tag: 'Born to break records', image: 'photo-1492144534655-ae79c964c9d7', color: 'Pearl White' },
  { id: 15, name: 'Lamborghini Revuelto', brand: 'Lamborghini', category: 'Supercars', year: 2025, price: 89000000, power: '1001 hp', speed: '350 km/h', zero: '2.5 sec', fuel: 'Hybrid', seats: 2, tag: 'The new raging bull', image: 'photo-1544829099-b9a0c07fad1a', color: 'Arancio' },
  { id: 16, name: 'Ferrari SF90 Stradale', brand: 'Ferrari', category: 'Supercars', year: 2024, price: 75000000, power: '986 hp', speed: '340 km/h', zero: '2.5 sec', fuel: 'Hybrid', seats: 2, tag: 'Racing DNA, reimagined', image: 'photo-1592198084033-aade902c8e9e', color: 'Rosso Corsa' },
  { id: 17, name: 'McLaren 765LT', brand: 'McLaren', category: 'Supercars', year: 2023, price: 65000000, power: '755 hp', speed: '330 km/h', zero: '2.8 sec', fuel: 'Petrol', seats: 2, tag: 'Precision in motion', image: 'photo-1621135802920-133df287f89c', color: 'Papaya Orange' },
  { id: 18, name: 'Porsche 911 GT3 RS', brand: 'Porsche', category: 'Supercars', year: 2024, price: 39000000, power: '518 hp', speed: '296 km/h', zero: '3.2 sec', fuel: 'Petrol', seats: 2, tag: 'Track-bred obsession', image: 'photo-1503376780353-7e6692767b70', color: 'Shark Blue' },
  { id: 19, name: 'Mercedes-AMG GT Black Series', brand: 'Mercedes-Benz', category: 'Supercars', year: 2023, price: 55000000, power: '720 hp', speed: '325 km/h', zero: '3.2 sec', fuel: 'Petrol', seats: 2, tag: 'Dark side of performance', image: 'photo-1618843479313-40f8afb4b4d8', color: 'Obsidian Black' },
  { id: 20, name: 'Aston Martin Valkyrie', brand: 'Aston Martin', category: 'Supercars', year: 2025, price: 280000000, power: '1160 hp', speed: '350 km/h', zero: '2.5 sec', fuel: 'Hybrid', seats: 2, tag: 'Formula One for the road', image: 'photo-1614200187524-dc4b892acf16', color: 'Aston Martin Green' },
  { id: 21, name: 'Pagani Huayra', brand: 'Pagani', category: 'Supercars', year: 2023, price: 230000000, power: '720 hp', speed: '383 km/h', zero: '3.0 sec', fuel: 'Petrol', seats: 2, tag: 'Handcrafted theatre', image: 'photo-1503376780353-7e6692767b70', color: 'Carbon Silver' },
]

const categories = ['All Cars', 'Supercars', 'SUVs', 'Luxury SUVs', 'Sports Cars', 'Electric']
const money = n => '₹' + new Intl.NumberFormat('en-IN').format(n)
const imageUrl = (id, w=1000) => id === 'photo-151 SUV'
  ? 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w='+w+'&q=85'
  : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

function App() {
  const [activeCategory, setActiveCategory] = useState('All Cars')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [sort, setSort] = useState('featured')
  const [selected, setSelected] = useState(null)
  const [inquiry, setInquiry] = useState(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const filteredCars = useMemo(() => {
    let list = cars.filter(car =>
      (activeCategory === 'All Cars' || car.category === activeCategory) &&
      `${car.name} ${car.brand} ${car.category}`.toLowerCase().includes(search.toLowerCase()) &&
      (!onlyFavorites || favorites.includes(car.id))
    )
    if (sort === 'low') list = [...list].sort((a,b) => a.price-b.price)
    if (sort === 'high') list = [...list].sort((a,b) => b.price-a.price)
    if (sort === 'power') list = [...list].sort((a,b) => parseInt(b.power)-parseInt(a.power))
    return list
  }, [activeCategory, search, sort, onlyFavorites, favorites])

  const toggleFavorite = id => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const jumpToInventory = () => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })

  return <div className="site-shell">
    <div className="announcement"><span><Sparkles size={13}/> THE ART OF DRIVING, REDEFINED</span><span>Curated machines. Unforgettable journeys. <ArrowUpRight size={13}/></span></div>
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Velocity Motors home"><span className="brand-mark"><Gauge size={22}/></span><span>VELOCITY<span className="brand-light"> MOTORS</span><small>DRIVE YOUR DESIRE</small></span></a>
      <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
        <a href="#inventory" onClick={() => setMobileMenu(false)}>The collection</a>
        <a href="#car-show" onClick={() => setMobileMenu(false)}>Car show</a>
        <a href="#experience" onClick={() => setMobileMenu(false)}>Our difference</a>
        <a href="#process" onClick={() => setMobileMenu(false)}>How it works</a>
      </nav>
      <div className="nav-actions"><button className="icon-button fav-nav" onClick={() => {setOnlyFavorites(!onlyFavorites); jumpToInventory()}} aria-label="Show saved cars"><Heart size={18} fill={onlyFavorites ? 'currentColor' : 'none'}/><span>{favorites.length}</span></button><button className="button button-dark nav-cta" onClick={() => setInquiry({name:'General enquiry'})}>Talk to an expert <ArrowUpRight size={15}/></button><button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button></div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image"></div><div className="hero-shade"></div>
        <div className="hero-content">
          <div className="eyebrow light"><span className="eyebrow-line"></span> NOT JUST A CAR. YOUR KIND OF EXTRAORDINARY.</div>
          <h1>Find your<br/><em>kind of fast.</em></h1>
          <p>From untamed supercars to commanding SUVs, discover a collection built around the way you want to feel behind the wheel.</p>
          <div className="hero-buttons"><button className="button button-accent" onClick={jumpToInventory}>Explore the collection <ArrowUpRight size={16}/></button><a className="text-link light-link" href="#experience">Discover Velocity <ArrowDownRight size={16}/></a></div>
          <div className="hero-stats"><div><strong>120<span>+</span></strong><small>Dream machines</small></div><div><strong>18</strong><small>Premium brands</small></div><div><strong>1:1</strong><small>Personal service</small></div></div>
        </div>
        <div className="hero-caption"><span>01 / 03</span><span>THE OPEN ROAD IS CALLING</span><span className="caption-line"></span></div>
      </section>

      <section className="intro section-wrap" id="experience">
        <div className="eyebrow"><span className="eyebrow-line"></span> A BETTER WAY TO FIND YOUR DRIVE</div>
        <div className="intro-grid"><h2>For the ones who<br/>never <em>settle.</em></h2><div className="intro-copy"><p>Some cars get you there. The right one changes how the journey feels. We bring extraordinary performance, considered luxury and everyday capability into one carefully selected collection.</p><a className="text-link" href="#process">The Velocity promise <ArrowUpRight size={16}/></a></div></div>
        <div className="value-grid">
          <div className="value-card"><span className="value-icon"><ShieldCheck/></span><span className="value-num">01</span><h3>Confidence, built in.</h3><p>Every listing is curated with clarity, so you can make your next move with confidence.</p></div>
          <div className="value-card"><span className="value-icon"><Sparkles/></span><span className="value-num">02</span><h3>Only the exceptional.</h3><p>From iconic badges to hidden gems, every machine has a reason to be here.</p></div>
          <div className="value-card"><span className="value-icon"><Users/></span><span className="value-num">03</span><h3>People over pressure.</h3><p>Real conversations, tailored recommendations and a buying experience on your terms.</p></div>
        </div>
      </section>

      <section className="inventory-section" id="inventory">
        <div className="section-wrap">
          <div className="inventory-heading"><div><div className="eyebrow"><span className="eyebrow-line"></span> THE COLLECTION</div><h2>Meet your <em>match.</em></h2><p className="section-subtitle">A little bit of everything. Nothing ordinary.</p></div><div className="inventory-count"><strong>{filteredCars.length.toString().padStart(2,'0')}</strong><span>vehicles to explore</span></div></div>
          <div className="filter-toolbar">
            <div className="category-tabs">{categories.map(cat => <button key={cat} className={activeCategory === cat ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(cat)}>{cat}</button>)}</div>
            <div className="filter-tools"><label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your next car..." aria-label="Search cars"/>{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14}/></button>}</label><label className="sort-box"><SlidersHorizontal size={15}/><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort cars"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="power">Most powerful</option></select><ChevronDown size={14}/></label></div>
          </div>
          {onlyFavorites && <div className="saved-notice">Showing your saved cars <button onClick={() => setOnlyFavorites(false)}>View all cars <ArrowRight size={14}/></button></div>}
          {filteredCars.length ? <div className="car-grid">{filteredCars.map((car, i) => <article className="car-card" key={car.id}>
            <div className="car-image-wrap" onClick={() => setSelected(car)} role="button" tabIndex="0" onKeyDown={e => e.key === 'Enter' && setSelected(car)} aria-label={`View ${car.name}`}><img src={imageUrl(car.image, 900)} alt={car.name} loading={i > 2 ? 'lazy' : 'eager'} onError={e => {e.currentTarget.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80'}}/><span className="car-tag">{car.tag}</span><button className={'heart-button '+(favorites.includes(car.id) ? 'hearted' : '')} onClick={e => {e.stopPropagation(); toggleFavorite(car.id)}} aria-label={favorites.includes(car.id) ? 'Remove from saved' : 'Save car'}><Heart size={17} fill={favorites.includes(car.id) ? 'currentColor' : 'none'}/></button><span className="image-arrow"><ArrowUpRight size={18}/></span></div>
            <div className="car-card-content"><div className="car-meta"><span>{car.brand}</span><span>{car.year}</span></div><h3>{car.name}</h3><div className="car-specs"><span><Zap size={14}/>{car.power}</span><span><Gauge size={14}/>{car.speed}</span><span><Fuel size={14}/>{car.fuel}</span></div><div className="car-card-bottom"><div><small>Starting from</small><strong>{money(car.price)}</strong></div><button className="details-link" onClick={() => setSelected(car)}>View details <ArrowUpRight size={15}/></button></div></div>
          </article>)}</div> : <div className="empty-state"><CarFront size={36}/><h3>No cars found just yet.</h3><p>Try a different search or category to find your match.</p><button className="button button-dark" onClick={() => {setSearch('');setActiveCategory('All Cars');setOnlyFavorites(false)}}>Reset filters <ArrowRight size={15}/></button></div>}
          <div className="collection-bottom"><span>GOOD TASTE. GREAT MACHINES.</span><span>Showing {filteredCars.length} of {cars.length} curated vehicles</span></div>
        </div>
      </section>

      <section className="car-show-section" id="car-show">
        <div className="section-wrap">
          <div className="car-show-heading">
            <div><div className="eyebrow"><span className="eyebrow-line"></span> THE VELOCITY SHOWROOM</div><h2>Machines made<br/>to <em>make an entrance.</em></h2></div>
            <div className="car-show-intro"><p>A dedicated look at extraordinary performance. Explore the icons, the engineering marvels and the supercars that turn every arrival into an occasion.</p><button className="text-link" onClick={() => {setActiveCategory('Supercars');setOnlyFavorites(false);setSearch('');jumpToInventory()}}>Explore all supercars <ArrowUpRight size={16}/></button></div>
          </div>
          <div className="showcase-grid">
            {[
              { id: 13, label: 'THE HYPERCAR ICON', name: 'Bugatti Chiron', image: 'photo-1503736334956-4c8f8e92946d', stat: '1,500 HP' },
              { id: 15, label: 'THE NEW-ERA BULL', name: 'Lamborghini Revuelto', image: 'photo-1544829099-b9a0c07fad1a', stat: '1,001 HP' },
              { id: 14, label: 'ENGINEERED TO BREAK LIMITS', name: 'Koenigsegg Jesko', image: 'photo-1492144534655-ae79c964c9d7', stat: '1,600 HP' },
              { id: 16, label: 'ITALIAN RACING SOUL', name: 'Ferrari SF90 Stradale', image: 'photo-1592198084033-aade902c8e9e', stat: '986 HP' }
            ].map((car, index) => <button className={'showcase-card showcase-card-'+(index+1)} key={car.id} onClick={() => setSelected(cars.find(item => item.id === car.id))}>
              <img src={imageUrl(car.image, 1100)} alt={car.name} loading="lazy" onError={e => {e.currentTarget.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=85'}} />
              <span className="showcase-overlay"></span><span className="showcase-label">{car.label}</span><span className="showcase-info"><span><strong>{car.name}</strong><small>{car.stat} <i>·</i> SUPERCAR COLLECTION</small></span><span className="showcase-arrow"><ArrowUpRight size={20}/></span></span>
            </button>)}
          </div>
          <div className="showcase-foot"><span>DESIGNED TO BE SEEN. BUILT TO BE FELT.</span><span>01 — 04 <span className="showcase-rule"></span> VELOCITY MOTOR SHOW</span></div>
        </div>
      </section>

      <section className="feature-banner">
        <div className="feature-image"></div><div className="feature-content"><div className="eyebrow light"><span className="eyebrow-line"></span> THE SUV EDIT</div><h2>Big presence.<br/><em>Bigger possibility.</em></h2><p>Weekend escapes, city streets, family plans. Meet SUVs that make every destination feel closer.</p><button className="button button-accent" onClick={() => {setActiveCategory('SUVs');jumpToInventory()}}>Explore SUVs <ArrowUpRight size={16}/></button></div><div className="feature-side-label">MADE FOR THE WAY OUT THERE</div>
      </section>

      <section className="process-section section-wrap" id="process"><div className="process-heading"><div><div className="eyebrow"><span className="eyebrow-line"></span> YOUR JOURNEY, YOUR WAY</div><h2>Good things happen<br/>when it's <em>personal.</em></h2></div><p>Finding the right car should feel as good as driving it. Here's how we make every step simpler.</p></div><div className="process-grid"><div className="process-step"><span>01</span><div className="process-icon"><Search/></div><h3>Explore your options</h3><p>Browse the collection, save your favourites and compare the details that matter to you.</p></div><div className="process-step"><span>02</span><div className="process-icon"><Users/></div><h3>Talk it through</h3><p>Tell us what you're looking for. Our team will help you narrow down the possibilities.</p></div><div className="process-step"><span>03</span><div className="process-icon"><CarFront/></div><h3>Make it yours</h3><p>Arrange a viewing, ask questions and take the next step when you're ready.</p></div></div></section>

      <section className="cta-section"><div className="cta-orb"></div><div className="eyebrow light"><span className="eyebrow-line"></span> YOUR NEXT CHAPTER STARTS HERE</div><h2>Have a car in <em>mind?</em></h2><p>Let's find the one that feels like it was made for you.</p><button className="button button-accent" onClick={() => setInquiry({name:'Personal car consultation'})}>Let's talk cars <ArrowUpRight size={16}/></button><span className="cta-watermark">VELOCITY</span></section>
    </main>

    <footer className="footer"><div className="footer-top"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Gauge size={22}/></span><span>VELOCITY<span className="brand-light"> MOTORS</span><small>DRIVE YOUR DESIRE</small></span></a><p>For every road you're ready to take.</p><a href="#home" className="back-top">Back to top <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© 2025 Velocity Motors. Concept website.</span><span>Designed for the love of driving.</span><div><a href="#inventory">Collection</a><a href="#experience">Our difference</a><a href="#process">The process</a></div></div></footer>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="detail-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details"><X/></button><div className="detail-image"><img src={imageUrl(selected.image, 1200)} alt={selected.name}/><span className="car-tag">{selected.tag}</span></div><div className="detail-body"><div className="eyebrow"><span className="eyebrow-line"></span>{selected.brand} · {selected.year}</div><h2>{selected.name}</h2><p className="detail-price">{money(selected.price)} <small>indicative starting price</small></p><div className="detail-spec-grid"><div><Zap/><span>Power</span><strong>{selected.power}</strong></div><div><Gauge/><span>Top speed</span><strong>{selected.speed}</strong></div><div><Fuel/><span>Powertrain</span><strong>{selected.fuel}</strong></div><div><Users/><span>Seats</span><strong>{selected.seats} people</strong></div></div><p className="detail-note">Specifications and prices are indicative for this concept website and may vary by variant, location and availability.</p><button className="button button-dark full-button" onClick={() => {setInquiry(selected);setSelected(null);setSubmitted(false)}}>Enquire about this car <ArrowUpRight size={16}/></button></div></div></div>}

    {inquiry && <div className="modal-backdrop" onClick={() => {setInquiry(null);setSubmitted(false)}}><div className="inquiry-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => {setInquiry(null);setSubmitted(false)}} aria-label="Close enquiry"><X/></button>{submitted ? <div className="success-state"><span className="success-icon"><Check/></span><h2>You're on our radar.</h2><p>Thanks for your interest. This demo form doesn't send data to a server, but your enquiry flow is ready to connect to your preferred backend.</p><button className="button button-dark" onClick={() => {setInquiry(null);setSubmitted(false)}}>Back to exploring</button></div> : <><div className="eyebrow"><span className="eyebrow-line"></span> LET'S START A CONVERSATION</div><h2>Let's talk <em>cars.</em></h2><p className="modal-intro">Tell us a little about yourself and we'll take it from there.</p><form onSubmit={e => {e.preventDefault();setSubmitted(true)}}><label>Your name<input required placeholder="e.g. Alex Sharma"/></label><label>Email address<input required type="email" placeholder="you@example.com"/></label><label>Phone number <span className="optional">(optional)</span><input type="tel" placeholder="+91 98765 43210"/></label><label>Interested in<input value={inquiry.name || inquiry.brand || ''} onChange={e => setInquiry({...inquiry,name:e.target.value})} placeholder="Which car has caught your eye?"/></label><label>Anything else? <textarea placeholder="Tell us what you're looking for..." rows="3"/></label><button className="button button-dark full-button" type="submit">Send enquiry <ArrowUpRight size={16}/></button><small className="form-disclaimer">Demo form · No information is sent or stored.</small></form></>}</div></div>}
  </div>
}

export default App
