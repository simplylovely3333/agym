import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { MessageCircle, Instagram, ArrowRight, X, Menu, ShieldCheck, Leaf, History, MapPin, Users, Clock } from 'lucide-react'
import './index.css'

// --- Data ---
const PRODUCTS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: [`Titan Whey`, `Titan Mass`, `Black Energy`, `Pure Creatine`, `Titan Burn`][i % 5] + ` PRO v${Math.floor(i/5 + 1)}`,
  type: [`WHEY`, `MASS`, `PRE`, `CREA`, `BURN`][i % 5],
  desc: "Максимальная концентрация для взрывного роста и восстановления.",
  color: i % 2 === 0 ? "#000" : "#e62117",
  isTop: i < 5
}))

const PARTNERS = [
  "Gold's Gym", "World Class", "Invictus", "FitNation", "Olympic"
]

const SHYMKENT_STORES = [
  { address: "ул. Тауке хана, 112 (ТЦ Аль-Фараби)", map: "https://www.google.com/maps/search/?api=1&query=Шымкент+Тауке+хана+112" },
  { address: "пр. Кунаева, 21/1 (напротив Mega Planet)", map: "https://www.google.com/maps/search/?api=1&query=Шымкент+Кунаева+21/1" },
  { address: "ул. Рыскулова, 45 (мкр. Север)", map: "https://www.google.com/maps/search/?api=1&query=Шымкент+Рыскулова+45" }
]

// --- Components ---

const Header = ({ isMenuOpen, setIsMenuOpen, isScrolled }) => (
  <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
    <nav className="container nav">
      <div className="logo">AGYM<span className="accent-text">POWER</span></div>
      
      {/* Desktop Links */}
      <div className="header-links desktop-only">
        <a href="#catalog" className="nav-link-simple">Товары</a>
        <a href="#about" className="nav-link-simple">О нас</a>
        <a href="#contacts" className="nav-link-simple">Контакты</a>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-links">
              <a href="#catalog" onClick={() => setIsMenuOpen(false)}>Товары</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>О нас</a>
              <a href="#contacts" onClick={() => setIsMenuOpen(false)}>Контакты</a>
              <a href="https://wa.me/77001112233" className="btn" style={{ marginTop: '2rem' }}>Заказать</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  </header>
)

const Hero = () => (
  <section className="hero">
    <div className="hero-bg-text">AGYM</div>
    <motion.div 
      className="container hero-content"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-text-wrap">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          СТАНЬ <br className="mobile-only" /> <span className="accent-text">СИЛЬНЕЕ</span>
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          №1 Малайзийский бренд спортивного питания в Казахстане. Алматы и Шымкент. Доставка за 24 часа.
        </motion.p>
        <motion.a 
          href="#catalog" 
          className="btn hero-btn"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Смотреть каталог <ArrowRight size={20} />
        </motion.a>
      </div>
    </motion.div>
  </section>
)

const ProductScroller = ({ onOrder }) => {
  const containerRef = React.useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <section id="new" className="scroller-section">
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="section-title">ПОЛНАЯ <span className="accent-text">ЛИНЕЙКА</span></h2>
        <div style={{ position: 'relative' }}>
          <div className="scroll-hint">Листайте вправо →</div>
          <div 
            className="scroller-container" 
            ref={containerRef}
          >
            {PRODUCTS.map(item => (
              <motion.div 
                key={item.id} 
                className="scroller-card"
                whileHover={{ y: -10 }}
                onClick={() => onOrder(item.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-img" style={{ background: item.color }}>{item.type}</div>
                <h3>{item.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Доступно к заказу</p>
                <button className="btn" style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}>Заказать</button>
              </motion.div>
            ))}
          </div>
          
          <div className="scroll-dots">
            {[0, 0.5, 1].map((target, i) => (
              <Dot key={i} progress={scrollXProgress} target={target} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const Dot = ({ progress, target }) => {
  const width = useTransform(progress, [target - 0.25, target, target + 0.25], [8, 24, 8])
  const opacity = useTransform(progress, [target - 0.25, target, target + 0.25], [0.2, 1, 0.2])
  const backgroundColor = useTransform(progress, [target - 0.25, target, target + 0.25], ["#eee", "var(--primary)", "#eee"])

  return (
    <motion.span 
      style={{ width, opacity, backgroundColor, borderRadius: 10, height: 8 }}
    />
  )
}

const Benefits = ({ onViewCertificate }) => {
  const containerRef = React.useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <section className="benefits-section">
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>НАШИ <span className="accent-text">СЕРТИФИКАТЫ</span></h2>
        
        <div style={{ position: 'relative' }}>
          <div className="scroll-hint">Листайте вправо →</div>
          <div 
            className="scroller-container certificates-scroller" 
            ref={containerRef}
          >
            {[
              { img: "/assets/certificates/file-001.png", title: "Сертификат", accent: "QUALITY", text: "Подтвержденная система менеджмента качества." },
              { img: "/assets/certificates/file-001 copy.png", title: "Сертификат", accent: "CONTROL", text: "Международный стандарт контроля качества." },
              { img: "/assets/certificates/file-001 copy 2.png", title: "Сертификат", accent: "SAFETY", text: "Гарантия безопасности пищевой продукции." },
              { img: "/assets/certificates/file-001 copy 3.png", title: "Сертификат", accent: "HACCP", text: "Анализ рисков и критические контрольные точки." },
              { img: "/assets/certificates/file-001 copy 4.png", title: "Сертификат", accent: "ISO 22000", text: "Система менеджмента безопасности пищепродуктов." },
              { img: "/assets/certificates/file-001 copy 5.png", title: "Сертификат", accent: "STANDARD", text: "Соответствие мировым отраслевым стандартам." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="scroller-card certificate-item"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onViewCertificate(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="certificate-img-container">
                  <img src={item.img} alt={item.title} className="certificate-img" />
                </div>
                <h3>{item.title} <br/><span className="accent-text" style={{ fontSize: '0.8rem' }}>{item.accent}</span></h3>
                <p style={{ fontSize: '0.85rem' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="scroll-dots">
            {[0, 0.5, 1].map((target, i) => (
              <Dot key={i} progress={scrollXProgress} target={target} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const WhyUs = () => null // Removed text as requested

const TopPicks = ({ onOrder }) => {
  const topFive = PRODUCTS.slice(0, 5)

  return (
    <section id="catalog" className="catalog-section">
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">ТОП <span className="accent-text">ВЫБОР</span></h2>
        <div className="catalog-grid">
          {topFive.map((p, idx) => (
            <motion.div 
              key={p.id} 
              className="product-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onOrder(p.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-img" style={{ background: p.color, height: '200px' }}>{p.type}</div>
              <h3 className="product-title">{p.name}</h3>
              <p className="product-desc">Премиальное качество.</p>
              <button className="btn" style={{ width: '100%', marginTop: '1rem' }}>Заказать</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

const Partners = () => (
  <section className="partners-section">
    <div className="container">
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>НАШИ <span className="accent-text">ПАРТНЕРЫ</span></h2>
      <div className="partners-grid">
        {PARTNERS.map((p, i) => (
          <div key={i} className="partner-logo">{p}</div>
        ))}
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer id="contacts" style={{ padding: '5rem 0 2rem', borderTop: '1px solid #eee' }}>
    <div className="container footer-grid">
      <div id="stores">
        <div className="logo" style={{ marginBottom: '1.5rem' }}>AGYM<span className="accent-text">POWER</span></div>
        <h4 style={{ textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} className="accent-text" /> Шымкент</h4>
        <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', lineHeight: '2.2' }}>
          {SHYMKENT_STORES.map((s, i) => (
            <li key={i}>
              <a href={s.map} target="_blank" rel="noopener noreferrer" className="map-link">
                {s.address}
              </a>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>Алматы, ул. Абая, 150</p>
        <p style={{ color: '#000', fontSize: '1rem', fontWeight: 700, marginTop: '0.5rem' }}>+7 700 111 2233</p>
      </div>
    </div>
    <div className="container" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
      &copy; 2026 Agym Nutrition Kazakhstan. Все права защищены.
    </div>
  </footer>
)

const OrderModal = ({ product, isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('87001112233')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `Привет! Хочу заказать "${product}".\nИмя: ${name}\nТелефон: ${phone}`
    window.open(`https://wa.me/77001112233?text=${encodeURIComponent(msg)}`, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
          <h2 style={{ marginBottom: '1rem' }}>Оформить <span className="accent-text">Заказ</span></h2>
          <p style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '2rem' }}>{product}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Ваше имя</label>
              <input type="text" placeholder="Александр" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Номер телефона</label>
              <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
              Заказать через WhatsApp
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  if (!isOpen || !certificate) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay certificate-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal certificate-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}><X size={32} /></button>
          <div className="certificate-full-img-container">
            <img src={certificate.img} alt={certificate.title} className="certificate-full-img" />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{certificate.title}</h2>
            <p className="accent-text">{certificate.accent}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Header scroll effect & close menu on resize
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false)
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleOrder = (product) => {
    setSelectedProduct(product)
    setIsOrderModalOpen(true)
  }

  const handleViewCertificate = (cert) => {
    setSelectedCertificate(cert)
    setIsCertModalOpen(true)
  }

  return (
    <div className={`page-wrapper ${isMenuOpen ? 'menu-open' : ''}`}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
      <Hero />
      <ProductScroller onOrder={handleOrder} />
      <Benefits onViewCertificate={handleViewCertificate} />
      <WhyUs />
      <TopPicks onOrder={handleOrder} />
      
      {/* Vision Section */}
      <section id="about" style={{ padding: '8rem 0', background: '#000', color: '#fff' }}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            НАША <span className="accent-text">МИССИЯ</span>
          </motion.h2>
          <motion.p 
            style={{ fontSize: '1.5rem', lineHeight: '1.4', maxWidth: '800px', opacity: 0.8 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Мы не просто продаем спортивное питание. Мы создаем культуру победы. Agym Nutrition — это топливо для тех, кто готов идти до конца в каждом сете, в каждом повторении.
          </motion.p>
        </div>
      </section>

      <Partners />
      <Footer />

      <OrderModal 
        product={selectedProduct} 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />

      <CertificateModal 
        certificate={selectedCertificate} 
        isOpen={isCertModalOpen} 
        onClose={() => setIsCertModalOpen(false)} 
      />
    </div>
  )
}

export default App
