import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  MessageCircle, Instagram, ArrowRight, X, Menu,
  ShieldCheck, Leaf, Zap, Award,
  MapPin, ChevronLeft, ChevronRight, Search, ShoppingBag
} from 'lucide-react'
import './index.css'
import titanWheyImg from './assets/Agym Products New All 2025/2.png'
import titanMassImg from './assets/Agym Products New All 2025/3.png'
import bcaaImg from './assets/Agym Products New All 2025/9.png'
import creatineImg from './assets/Agym Products New All 2025/10.png'

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  ru: {
    // Nav
    navProducts: 'Товары',
    navAbout: 'О нас',
    navContacts: 'Контакты',
    navOrder: 'Заказать',

    // Announcement
    announce: [
      'Новинка: Titan Whey Black Edition',
      'Скидка 20% при заказе от 3 позиций',
      'Официальный поставщик Gold\'s Gym',
      'Работаем по всему Казахстану',
    ],

    // Hero
    heroTag: 'Казахстан',
    heroSub: 'Премиальное спортивное питание — RED EDITION 2.0. Топливо для тех, кто идёт до конца в каждом сете.',
    heroCta: 'Смотреть каталог',
    heroCtaContact: 'Контакты',
    stat1: 'лет на рынке',
    stat2: 'магазина в Шымкенте',
    stat3: 'продуктов',
    stat4: 'довольных клиентов',

    // Scroller section
    scrollerTag: 'Весь ассортимент',
    scrollerTitle1: 'ПОЛНАЯ',
    scrollerTitle2: 'ЛИНЕЙКА',
    scrollHint: 'Листайте →',

    // Certificates
    certTag: 'Документы',
    certTitle1: 'НАШИ',
    certTitle2: 'СЕРТИФИКАТЫ',
    certItems: [
      { title: 'Сертификат', accent: 'QUALITY', text: 'Подтвержденная система менеджмента качества.' },
      { title: 'Сертификат', accent: 'CONTROL', text: 'Международный стандарт контроля качества.' },
      { title: 'Сертификат', accent: 'SAFETY', text: 'Гарантия безопасности пищевой продукции.' },
      { title: 'Сертификат', accent: 'HACCP', text: 'Анализ рисков и критические контрольные точки.' },
      { title: 'Сертификат', accent: 'ISO 22000', text: 'Система менеджмента безопасности пищепродуктов.' },
      { title: 'Сертификат', accent: 'STANDARD', text: 'Соответствие мировым отраслевым стандартам.' },
      { title: 'Сертификат', accent: 'ANTI-DOPING', text: 'Протестировано лабораторией QABL, Qatar. Запрещённые вещества WADA не обнаружены.' },
    ],

    // Catalog
    catalogTag: 'Хиты продаж',
    catalogTitle1: 'НАШ',
    catalogTitle2: 'КАТАЛОГ',
    buyNow: 'Купить сейчас',
    protein: 'Белок',
    calories: 'Калории',
    unitServ: 'порц.',
    unitKcalServ: 'ккал/порц.',
    // SVG Labels
    svgProtein: 'БЕЛОК',
    svgEnergy: 'ЭНЕРГИЯ',
    svgCarbs: 'УГЛЕВОДЫ',
    svgServings: 'ПОРЦИЙ',
    svgMassGainer: 'ГЕЙНЕР ДЛЯ МАССЫ',
    svgPremiumWhey: 'ПРЕМИУМ ПРОТЕИН',
    svgMuscleGrowth: 'РОСТ МЫШЦ',
    svgPerformance: 'СИЛА И МОЩЬ',
    svgRecovery: 'ВОССТАНОВЛЕНИЕ',

    // Products
    products: [
      {
        type: 'ГЕЙНЕР',
        subtitle: 'Протеиновый напиток на основе молока и сывороточного белка',
        benefits: ['Увеличение мышечной массы', 'Быстрый набор веса', 'Богат белком и углеводами', 'Улучшение мышечной силы'],
      },
      {
        type: 'СУХАЯ МАССА',
        subtitle: 'Протеиновый напиток на основе сыворотки, горохового и соевого протеина',
        benefits: ['Оптимальный рост мышц', 'Увеличение размера и силы', 'Улучшение спортивных результатов', 'Анаболическое восстановление'],
      },
      {
        type: 'ВОССТАНОВЛЕНИЕ',
        subtitle: 'Порошок аминокислот с разветвлённой цепью (BCAA)',
        benefits: ['L-Лейцин, L-Изолейцин, L-Валин', 'Снижение боли в мышцах', 'Стимуляция синтеза белка', 'Поддержка роста мышц'],
      },
      {
        type: 'СИЛА И МОЩЬ',
        subtitle: 'Порошок моногидрата креатина',
        benefits: ['До, во время и после тренировки', 'Улучшение силы и мощи', 'Повышение фокуса и энергии', 'Улучшение спортивных показателей'],
      },
    ],

    // Partners
    partnersTitle: 'НАШИ ПАРТНЁРЫ',

    // Footer
    footerDesc: 'Премиальное спортивное питание для атлетов Казахстана. Качество, проверенное временем.',
    footerEmailPlaceholder: 'Ваш email',
    footerSubscribe: 'Подписаться',
    footerStores: 'Магазины',
    footerAlmaty: 'Алматы — ул. Абая, 150',
    footerHelp: 'Помощь',
    footerHelpLinks: ['Каталог', 'О компании'],
    footerContacts: 'Контакты',
    footerWorkdays: 'Пн–Пт: 9:00 – 21:00',
    footerWeekend: 'Сб–Вс: 10:00 – 20:00',
    footerLegal: 'Юридический адрес',
    legalAddress: 'ТОО BEREKET MEAT GROUP\nг. Жанаозен, пр. Мангистау 3\n130200',
    footerCopy: '© 2026 Agym Nutrition Kazakhstan. Все права защищены.',

    // Modal
    modalTag: 'Оформление',
    modalTitle: 'ОФОРМИТЬ',
    modalTitleAccent: 'ЗАКАЗ',
    modalName: 'Ваше имя',
    modalNamePlaceholder: 'Александр',
    modalPhone: 'Номер телефона',
    modalSubmit: 'Заказать через WhatsApp',
    modalWhatsappMsg: (product, name, phone) =>
      `Привет! Хочу заказать "${product}".\nИмя: ${name}\nТелефон: ${phone}`,

    // Contact button
    contactBtn: 'Написать нам',

    // Stores
    stores: [
      { address: 'ул. Тауке хана, 112 (ТЦ Аль-Фараби)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Тауке+хана+112' },
      { address: 'пр. Кунаева, 21/1 (напротив Mega Planet)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Кунаева+21/1' },
      { address: 'ул. Рыскулова, 45 (мкр. Север)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Рыскулова+45' },
    ],
  },

  kz: {
    navProducts: 'Тауарлар',
    navAbout: 'Біз туралы',
    navContacts: 'Байланыс',
    navOrder: 'Тапсырыс',

    announce: [
      'Жаңалық: Titan Whey Black Edition',
      '3 тауардан тапсырыс берсеңіз — 20% жеңілдік',
      'Gold\'s Gym ресми жеткізушісі',
      'Қазақстан бойынша жұмыс істейміз',
    ],

    heroTag: 'Қазақстан',
    heroSub: 'Спортшыларға арналған премиум тамақтану — RED EDITION 2.0. Әр серияда аяғына дейін баратындарға арналған отын.',
    heroCta: 'Каталогты көру',
    heroCtaContact: 'Байланыс',
    stat1: 'жыл нарықта',
    stat2: 'Шымкенттегі дүкен',
    stat3: 'өнім',
    stat4: 'қанағаттанған тұтынушы',

    benefit1Title: 'Сапа кепілдігі',
    benefit1Desc: 'ISO 22000 сертификатталған өнімдер',
    benefit2Title: 'Жылдам нәтиже',
    benefit2Desc: 'Клиникалық тексерілген формулалар',
    benefit3Title: 'Табиғи құрам',
    benefit3Desc: 'Зиянды қоспалар мен ГМО жоқ',
    benefit4Title: 'Үздік бренд',
    benefit4Desc: 'Кәсіби спортшылардың таңдауы',

    scrollerTag: 'Барлық ассортимент',
    scrollerTitle1: 'ТОЛЫҚ',
    scrollerTitle2: 'ЖЕЛІ',
    scrollHint: 'Свайп →',

    certTag: 'Құжаттар',
    certTitle1: 'БІЗДІҢ',
    certTitle2: 'СЕРТИФИКАТТАР',
    certItems: [
      { title: 'Сертификат', accent: 'QUALITY', text: 'Сапа менеджменті жүйесі расталған.' },
      { title: 'Сертификат', accent: 'CONTROL', text: 'Халықаралық сапа бақылау стандарты.' },
      { title: 'Сертификат', accent: 'SAFETY', text: 'Азық-түлік өнімінің қауіпсіздік кепілдігі.' },
      { title: 'Сертификат', accent: 'HACCP', text: 'Тәуекелдерді талдау және бақылау нүктелері.' },
      { title: 'Сертификат', accent: 'ISO 22000', text: 'Азық-түлік қауіпсіздігін басқару жүйесі.' },
      { title: 'Сертификат', accent: 'STANDARD', text: 'Әлемдік салалық стандарттарға сәйкестік.' },
      { title: 'Сертификат', accent: 'ANTI-DOPING', text: 'QABL зертханасы тексерген, Qatar. WADA тыйым салған заттар табылмады.' },
    ],

    catalogTag: 'Хит өнімдер',
    catalogTitle1: 'БІЗДІҢ',
    catalogTitle2: 'КАТАЛОГ',
    buyNow: 'Қазір сатып алу',
    protein: 'Белок',
    calories: 'Калория',
    unitServ: 'порц.',
    unitKcalServ: 'ккал/порц.',
    // SVG Labels
    svgProtein: 'БЕЛОК',
    svgEnergy: 'ЭНЕРГИЯ',
    svgCarbs: 'КӨМІРСУЛАР',
    svgServings: 'ПОРЦИЯ',
    svgMassGainer: 'МАССА ГЕЙНЕРІ',
    svgPremiumWhey: 'ПРЕМИУМ ПРОТЕИН',
    svgMuscleGrowth: 'БҰЛШЫҚЕТ ӨСУІ',
    svgPerformance: 'КҮШ ПЕН ҚУАТ',
    svgRecovery: 'ҚАЛПЫНА КЕЛУ',

    products: [
      {
        type: 'МАССА ГЕЙНЕР',
        subtitle: 'Сүт және сарысу белогынан жасалған ароматты протеинді сусын',
        benefits: ['Бұлшықет массасын арттыру', 'Салмақты жылдам жинау', 'Белок пен көмірсу молшылығы', 'Бұлшықет күшін арттыру'],
      },
      {
        type: 'ТАЗА МАССА',
        subtitle: 'Сарысу, бұршақ және соя протеинінен жасалған ароматты сусын',
        benefits: ['Бұлшықеттің оптималды өсуі', 'Көлем мен күшті арттыру', 'Спорттық нәтижені жақсарту', 'Анаболикалық қалпына келу'],
      },
      {
        type: 'ҚАЛПЫНА КЕЛУ',
        subtitle: 'Тармақталған тізбекті амин қышқылдары ұнтағы',
        benefits: ['L-Лейцин, L-Изолейцин, L-Валин', 'Бұлшықет ауруын азайту', 'Белок синтезін ынталандыру', 'Бұлшықет өсуіне қолдау'],
      },
      {
        type: 'КҮШ ЖӘНЕ ҚУА',
        subtitle: 'Креатин моногидраты ұнтағы',
        benefits: ['Жаттығудың алдында, кезінде және одан кейін', 'Күш пен қуатты арттыру', 'Фокус пен энергияны жақсарту', 'Спорттық көрсеткіштерді арттыру'],
      },
    ],

    partnersTitle: 'БІЗДІҢ СЕРІКТЕСТЕР',

    footerDesc: 'Қазақстандық спортшыларға арналған премиум спорттық тамақтану. Уақыт сынаған сапа.',
    footerEmailPlaceholder: 'Email-іңіз',
    footerSubscribe: 'Жазылу',
    footerStores: 'Дүкендер',
    footerAlmaty: 'Алматы — Абай к-сі, 150',
    footerHelp: 'Көмек',
    footerHelpLinks: ['Каталог', 'Компания туралы'],
    footerContacts: 'Байланыс',
    footerWorkdays: 'Дс–Жм: 9:00 – 21:00',
    footerWeekend: 'Сс–Жс: 10:00 – 20:00',
    footerLegal: 'Заңды мекенжай',
    legalAddress: 'ТОО BEREKET MEAT GROUP\nЖаңаөзен қ., Маңғыстау даңғылы 3\n130200',
    footerCopy: '© 2026 Agym Nutrition Kazakhstan. Барлық құқықтар қорғалған.',

    modalTag: 'Тапсырыс рәсімдеу',
    modalTitle: 'ТАПСЫРЫС',
    modalTitleAccent: 'РӘСІМДЕУ',
    modalName: 'Атыңыз',
    modalNamePlaceholder: 'Алмас',
    modalPhone: 'Телефон нөміріңіз',
    modalSubmit: 'WhatsApp арқылы тапсырыс беру',
    modalWhatsappMsg: (product, name, phone) =>
      `Сәлем! "${product}" тапсырыс бергім келеді.\nАты: ${name}\nТелефон: ${phone}`,

    contactBtn: 'Бізге жазыңыз',

    stores: [
      { address: 'Тәуке хан к-сі, 112 (Әл-Фараби СО)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Тауке+хана+112' },
      { address: 'Қонаев д-лы, 21/1 (Mega Planet-тің қарсысында)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Кунаева+21/1' },
      { address: 'Рысқұлов к-сі, 45 (Солтүстік шағынауданы)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Рыскулова+45' },
    ],
  },

  en: {
    navProducts: 'Products',
    navAbout: 'About',
    navContacts: 'Contacts',
    navOrder: 'Order',

    announce: [
      'New: Titan Whey Black Edition',
      '20% off when ordering 3+ items',
      'Official Gold\'s Gym supplier',
      'Delivery across Kazakhstan',
    ],

    heroTag: 'Kazakhstan',
    heroSub: 'Premium sports nutrition — RED EDITION 2.0. Fuel for those who go all the way in every set.',
    heroCta: 'View catalog',
    heroCtaContact: 'Contacts',
    stat1: 'years on market',
    stat2: 'stores in Shymkent',
    stat3: 'products',
    stat4: 'happy customers',

    benefit1Title: 'Quality Guarantee',
    benefit1Desc: 'ISO 22000 certified products',
    benefit2Title: 'Fast Results',
    benefit2Desc: 'Clinically proven formulas',
    benefit3Title: 'Natural Ingredients',
    benefit3Desc: 'No harmful additives or GMO',
    benefit4Title: 'Top Brand',
    benefit4Desc: 'Choice of professional athletes',

    scrollerTag: 'Full range',
    scrollerTitle1: 'COMPLETE',
    scrollerTitle2: 'LINEUP',
    scrollHint: 'Swipe →',

    certTag: 'Documents',
    certTitle1: 'OUR',
    certTitle2: 'CERTIFICATES',
    certItems: [
      { title: 'Certificate', accent: 'QUALITY', text: 'Certified quality management system.' },
      { title: 'Certificate', accent: 'CONTROL', text: 'International quality control standard.' },
      { title: 'Certificate', accent: 'SAFETY', text: 'Food safety guarantee.' },
      { title: 'Certificate', accent: 'HACCP', text: 'Hazard analysis and critical control points.' },
      { title: 'Certificate', accent: 'ISO 22000', text: 'Food safety management system.' },
      { title: 'Certificate', accent: 'STANDARD', text: 'Compliance with global industry standards.' },
      { title: 'Certificate', accent: 'ANTI-DOPING', text: 'Tested by QABL Laboratory, Qatar. No WADA prohibited substances detected.' },
    ],

    catalogTag: 'Best sellers',
    catalogTitle1: 'OUR',
    catalogTitle2: 'CATALOG',
    buyNow: 'Buy now',
    protein: 'Protein',
    calories: 'Calories',
    unitServ: 'servings',
    unitKcalServ: 'kcal/serv',
    // SVG Labels
    svgProtein: 'PROTEIN',
    svgEnergy: 'ENERGY',
    svgCarbs: 'CARBS',
    svgServings: 'SERVINGS',
    svgMassGainer: 'MASS GAINER',
    svgPremiumWhey: 'PREMIUM PROTEIN',
    svgMuscleGrowth: 'MUSCLE GROWTH',
    svgPerformance: 'PERFORMANCE',
    svgRecovery: 'RECOVERY',

    products: [
      {
        type: 'MASS GAINER',
        subtitle: 'Mixed Protein Flavoured Drink derived from Milk and Whey',
        benefits: ['Increase Muscle Mass', 'Rapid Weight Gain', 'Rich Protein And Carbs', 'Improve Muscle Strength'],
      },
      {
        type: 'LEAN MUSCLE',
        subtitle: 'Mixed Protein Flavoured Drink derived from Whey, Pea and Soy',
        benefits: ['Optimum Muscle Growth', 'Increase Size & Strength', 'Improve Athletic Performance', 'Boost Anabolic Muscle Recovery'],
      },
      {
        type: 'MUSCLE RECOVERY',
        subtitle: 'Branched Chain Amino Acid Powder',
        benefits: ['L-Leucine, L-Isoleucine, L-Valine', 'Reduce Muscle Soreness', 'Stimulate Muscle Protein Synthesis', 'Support Muscle Growth'],
      },
      {
        type: 'MUSCLE PERFORMANCE',
        subtitle: 'Creatine Monohydrate Powder',
        benefits: ['Pre-Intra-Post Workout', 'Improve Muscle Strength and Power', 'Improve Focus and Energy', 'Enhance Athletic Performance'],
      },
    ],

    partnersTitle: 'OUR PARTNERS',

    footerDesc: 'Premium sports nutrition for athletes in Kazakhstan. Quality proven by time.',
    footerEmailPlaceholder: 'Your email',
    footerSubscribe: 'Subscribe',
    footerStores: 'Stores',
    footerAlmaty: 'Almaty — Abay St., 150',
    footerHelp: 'Help',
    footerHelpLinks: ['Catalog', 'About company'],
    footerContacts: 'Contacts',
    footerWorkdays: 'Mon–Fri: 9:00 – 21:00',
    footerWeekend: 'Sat–Sun: 10:00 – 20:00',
    footerLegal: 'Legal Address',
    legalAddress: 'TOO BEREKET MEAT GROUP\nZhanaozen, Mangistau Ave 3\n130200',
    footerCopy: '© 2026 Agym Nutrition Kazakhstan. All rights reserved.',

    modalTag: 'Checkout',
    modalTitle: 'PLACE',
    modalTitleAccent: 'ORDER',
    modalName: 'Your name',
    modalNamePlaceholder: 'Alexander',
    modalPhone: 'Phone number',
    modalSubmit: 'Order via WhatsApp',
    modalWhatsappMsg: (product, name, phone) =>
      `Hello! I'd like to order "${product}".\nName: ${name}\nPhone: ${phone}`,

    contactBtn: 'Contact us',

    stores: [
      { address: '112 Tauke Khan St. (Al-Farabi Mall)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Тауке+хана+112' },
      { address: '21/1 Kunayev Ave. (opposite Mega Planet)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Кунаева+21/1' },
      { address: '45 Ryskulov St. (North district)', map: 'https://www.google.com/maps/search/?api=1&query=Шымкент+Рыскулова+45' },
    ],
  },
}

// ============================================================
// BASE PRODUCT DATA (language-independent)
// ============================================================
const PRODUCTS_BASE = [
  {
    id: 1,
    name: 'TITAN MASS-Z',
    shortType: 'MASS',
    protein: '11g', carbs: '80.3g', fat: '1.1g', calories: '375 kcal',
    servings: '20',
    bgColor: '#c0000a', bagColor: '#d32f2f', labelBg: '#8b0000',
    priceOld: 12500, price: 9900,
    packageType: 'bag',
  },
  {
    id: 2,
    name: 'TITAN WHEY-Z',
    shortType: 'WHEY',
    protein: '22g', carbs: '7g', fat: '0.3g', calories: '118 kcal',
    servings: '60',
    bgColor: '#0d1b2e', bagColor: '#1a2f4a', labelBg: '#0a1520',
    priceOld: 10900, price: 8500,
    packageType: 'bag+tub',
  },
  {
    id: 3,
    name: '2:1:1 BCAA',
    shortType: 'BCAA',
    protein: '0.7g', carbs: '8.3g', fat: '0g', calories: '36 kcal',
    servings: '20',
    bgColor: '#2d0057', bagColor: '#6a0dad', labelBg: '#4a0080',
    priceOld: 6900, price: 4900,
    packageType: 'tub',
  },
  {
    id: 4,
    name: 'CREATINE MONOHYDRATE',
    shortType: 'CREA',
    protein: '7g', carbs: '0g', fat: '0g', calories: '28 kcal',
    servings: '40',
    bgColor: '#1a1400', bagColor: '#333', labelBg: '#222',
    accentGold: '#c9a84c',
    priceOld: 5900, price: 3900,
    packageType: 'tub',
  },
]

const CERT_IMGS = [
  '/assets/certificates/file-001.png',
  '/assets/certificates/file-001 copy.png',
  '/assets/certificates/file-001 copy 2.png',
  '/assets/certificates/file-001 copy 3.png',
  '/assets/certificates/file-001 copy 4.png',
  '/assets/certificates/file-001 copy 5.png',
  '/assets/certificates/anti-doping.jpeg',
]

const PARTNERS = ["Gold's Gym", 'World Class', 'Invictus', 'FitNation', 'Olympic']

const PRODUCT_IMAGES = {
  1: titanMassImg,
  2: titanWheyImg,
  3: bcaaImg,
  4: creatineImg,
}

// ============================================================
// LANGUAGE CONTEXT
// ============================================================
const LangContext = React.createContext('ru')
const useLang = () => React.useContext(LangContext)

// ============================================================
// LANGUAGE SWITCHER — shown inside header
// ============================================================
const LangSwitcher = ({ lang, setLang }) => (
  <div className="lang-switcher">
    {['ru', 'kz', 'en'].map(l => (
      <button
        key={l}
        className={`lang-btn${lang === l ? ' active' : ''}`}
        onClick={() => setLang(l)}
        aria-label={l.toUpperCase()}
      >
        {l.toUpperCase()}
      </button>
    ))}
  </div>
)

// ============================================================
// ANNOUNCEMENT BAR
// ============================================================
const AnnouncementBar = () => {
  const lang = useLang()
  const items = T[lang].announce
  const content = [...items, ...items].map((text, i) => (
    <React.Fragment key={i}>
      <span>{text}</span>
      <span className="marquee-sep">•</span>
    </React.Fragment>
  ))
  return (
    <div className="announcement-bar">
      <div className="marquee-track">
        <div className="marquee-content">{content}</div>
        <div className="marquee-content" aria-hidden="true">{content}</div>
      </div>
    </div>
  )
}

// ============================================================
// HEADER
// ============================================================
const Header = ({ isMenuOpen, setIsMenuOpen, isScrolled, lang, setLang }) => {
  const t = T[lang]
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="container nav">
        {/* Left Nav */}
        <div className="header-links desktop-only">
          <a href="#catalog" className="nav-link-simple">{t.navProducts}</a>
          <a href="#contacts" className="nav-link-simple">{t.navContacts}</a>
        </div>

        {/* Center Logo */}
        <div className="logo">AGYM<span className="accent-text">POWER</span></div>

        {/* Right Icons */}
        <div className="header-icons">
          <LangSwitcher lang={lang} setLang={setLang} />
          <button className="icon-btn desktop-only" aria-label="Search"><Search size={18} /></button>
          <button className="icon-btn desktop-only" aria-label="Cart"><ShoppingBag size={18} /></button>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            >
              <div className="mobile-menu-links">
                <a href="#catalog" onClick={() => setIsMenuOpen(false)}>{t.navProducts}</a>
                <a href="#contacts" onClick={() => setIsMenuOpen(false)}>{t.navContacts}</a>
                <a href="https://wa.me/77016644344" className="btn" style={{ marginTop: '1.5rem' }}>
                  {t.navOrder}
                </a>
                <div style={{ marginTop: '2rem' }}>
                  <LangSwitcher lang={lang} setLang={setLang} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

// ============================================================
// HERO
// ============================================================
const Hero = () => {
  const lang = useLang()
  const t = T[lang]
  return (
    <section className="hero">
      <div className="hero-bg-text">AGYM</div>
      <motion.div
        className="container hero-content"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-title-sm">{t.heroTag}</span>
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AGYM<br /><span className="accent-text">POWER</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.heroSub}
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#catalog" className="btn">{t.heroCta} <ArrowRight size={18} /></a>
          <a href="#contacts" className="btn btn-outline">{t.heroCtaContact}</a>
        </motion.div>

      </motion.div>
    </section>
  )
}

// ============================================================
// DOT
// ============================================================
const Dot = ({ progress, target }) => {
  const width = useTransform(progress, [target - 0.25, target, target + 0.25], [8, 24, 8])
  const opacity = useTransform(progress, [target - 0.25, target, target + 0.25], [0.3, 1, 0.3])
  return (
    <motion.span style={{ width, opacity, backgroundColor: '#d32f2f', borderRadius: 10, height: 8, display: 'inline-block' }} />
  )
}

// ============================================================
// HELPERS
// ============================================================
const formatUnit = (val, lang) => {
  if (!val) return ''
  if (lang === 'en') return val
  return val.replace('g', 'г').replace('kcal', 'ккал')
}

// ============================================================
// PRODUCT VISUAL SVG
// ============================================================
const ProductVisual = ({ product }) => {
  const lang = useLang()
  const t = T[lang]
  const isBag = product.packageType === 'bag' || product.packageType === 'bag+tub'
  const isTub = product.packageType === 'tub' || product.packageType === 'bag+tub'

  if (isBag && !isTub) {
    return (
      <svg viewBox="0 0 200 280" style={{ width: '100%', height: '100%', maxHeight: '220px' }}>
        <defs>
          <linearGradient id={`bagGrad${product.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={product.bagColor} />
            <stop offset="100%" stopColor={product.labelBg} />
          </linearGradient>
        </defs>
        <rect x="20" y="30" width="160" height="230" rx="12" fill={`url(#bagGrad${product.id})`} />
        <rect x="20" y="20" width="160" height="20" rx="4" fill="#111" />
        <rect x="60" y="22" width="80" height="4" rx="2" fill="#333" />
        <rect x="28" y="70" width="144" height="150" rx="6" fill={product.labelBg} opacity="0.7" />
        <text x="100" y="98" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial" letterSpacing="2">▲ AGYM</text>
        <text x="100" y="128" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="Arial" letterSpacing="1">TITAN</text>
        <text x="100" y="155" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="900" fontFamily="Arial">MASS-Z</text>
        <text x="100" y="174" textAnchor="middle" fill="#ffaaaa" fontSize="7" fontFamily="Arial" letterSpacing="1">{t.svgMassGainer}</text>
        <rect x="40" y="182" width="120" height="2" fill="#ff0000" />
        <text x="65" y="200" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Arial" fontWeight="bold">{formatUnit(product.protein, lang)}</text>
        <text x="65" y="210" textAnchor="middle" fill="#aaa" fontSize="6" fontFamily="Arial">{t.svgProtein}</text>
        <text x="100" y="200" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Arial" fontWeight="bold">{formatUnit(product.calories, lang)}</text>
        <text x="100" y="210" textAnchor="middle" fill="#aaa" fontSize="6" fontFamily="Arial">{t.svgEnergy}</text>
        <text x="138" y="200" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="Arial" fontWeight="bold">{product.servings}</text>
        <text x="138" y="210" textAnchor="middle" fill="#aaa" fontSize="6" fontFamily="Arial">{t.svgServings}</text>
      </svg>
    )
  }

  if (product.packageType === 'bag+tub') {
    return (
      <svg viewBox="0 0 240 260" style={{ width: '100%', height: '100%', maxHeight: '220px' }}>
        <defs>
          <linearGradient id={`wheyGrad${product.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={product.bagColor} />
            <stop offset="100%" stopColor="#060e1a" />
          </linearGradient>
        </defs>
        <rect x="10" y="20" width="130" height="210" rx="10" fill={`url(#wheyGrad${product.id})`} />
        <rect x="10" y="12" width="130" height="16" rx="4" fill="#080f1c" />
        <rect x="10" y="82" width="130" height="130" rx="4" fill="#0a1828" opacity="0.7" />
        <text x="75" y="108" textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="Arial" letterSpacing="2">▲ AGYM</text>
        <text x="75" y="134" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900" fontFamily="Arial">TITAN</text>
        <text x="75" y="156" textAnchor="middle" fill="#e87722" fontSize="16" fontWeight="900" fontFamily="Arial">WHEY-Z</text>
        <text x="75" y="170" textAnchor="middle" fill="#999" fontSize="6" fontFamily="Arial">{t.svgPremiumWhey}</text>
        <rect x="30" y="178" width="90" height="1.5" fill="#e87722" />
        <text x="55" y="192" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="Arial">{formatUnit(product.protein, lang)}</text>
        <text x="55" y="200" textAnchor="middle" fill="#888" fontSize="5" fontFamily="Arial">{t.svgProtein}</text>
        <text x="80" y="192" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="Arial">{formatUnit(product.carbs, lang)}</text>
        <text x="80" y="200" textAnchor="middle" fill="#888" fontSize="5" fontFamily="Arial">{t.svgCarbs}</text>
        <text x="105" y="192" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="Arial">{product.servings}</text>
        <text x="105" y="200" textAnchor="middle" fill="#888" fontSize="5" fontFamily="Arial">{t.svgServings}</text>
        <ellipse cx="185" cy="85" rx="42" ry="12" fill="#0a2040" />
        <rect x="143" y="85" width="84" height="120" fill="#0d2444" />
        <ellipse cx="185" cy="205" rx="42" ry="12" fill="#091c38" />
        <rect x="143" y="100" width="84" height="80" fill="#0d264e" />
        <text x="185" y="128" textAnchor="middle" fill="#ccc" fontSize="6" fontFamily="Arial" letterSpacing="1">▲ AGYM</text>
        <text x="185" y="148" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900" fontFamily="Arial">TITAN</text>
        <text x="185" y="164" textAnchor="middle" fill="#e87722" fontSize="10" fontWeight="900" fontFamily="Arial">WHEY-Z</text>
        <rect x="155" y="170" width="60" height="1" fill="#e87722" />
        <text x="185" y="180" textAnchor="middle" fill="#888" fontSize="5" fontFamily="Arial">MUSCLE GROWTH</text>
      </svg>
    )
  }

  // Tub (BCAA or Creatine)
  const isCreatine = product.id === 4
  const tubColor = isCreatine ? '#1c1c1c' : '#3d1a6e'
  const lidColor = isCreatine ? '#111' : '#2d1050'
  const labelColor = isCreatine ? '#c9a84c' : '#a855f7'
  return (
    <svg viewBox="0 0 200 260" style={{ width: '100%', height: '100%', maxHeight: '220px' }}>
      <defs>
        <linearGradient id={`tubGrad${product.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={tubColor} />
          <stop offset="50%" stopColor={isCreatine ? '#2a2a2a' : '#5a1a9e'} />
          <stop offset="100%" stopColor={tubColor} />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="55" rx="72" ry="18" fill={lidColor} />
      <ellipse cx="100" cy="48" rx="70" ry="14" fill={isCreatine ? '#1a1a1a' : '#38106a'} />
      <rect x="28" y="55" width="144" height="160" fill={`url(#tubGrad${product.id})`} />
      <ellipse cx="100" cy="215" rx="72" ry="18" fill={tubColor} />
      <rect x="35" y="72" width="130" height="130" rx="4" fill="#f5f5f5" />
      <text x="100" y="100" textAnchor="middle" fill={isCreatine ? '#111' : '#3d008a'} fontSize="10" fontWeight="bold" fontFamily="Arial" letterSpacing="2">▲ AGYM</text>
      <rect x="40" y="104" width="120" height="2" fill={labelColor} />
      {isCreatine ? (
        <>
          <text x="100" y="130" textAnchor="middle" fill="#111" fontSize="16" fontWeight="900" fontFamily="Arial">CREATINE</text>
          <text x="100" y="150" textAnchor="middle" fill="#111" fontSize="14" fontWeight="900" fontFamily="Arial">MONOHYDRATE</text>
          <rect x="40" y="158" width="120" height="2" fill={labelColor} />
          <text x="100" y="170" textAnchor="middle" fill={labelColor} fontSize="7" fontFamily="Arial" letterSpacing="1">{t.svgPerformance}</text>
          <text x="100" y="184" textAnchor="middle" fill="#555" fontSize="6" fontFamily="Arial">{formatUnit(product.protein, lang)} {t.svgProtein} • {product.servings} {t.svgServings}</text>
        </>
      ) : (
        <>
          <text x="100" y="122" textAnchor="middle" fill="#111" fontSize="26" fontWeight="900" fontFamily="Arial">2:1:1</text>
          <text x="100" y="152" textAnchor="middle" fill="#3d008a" fontSize="24" fontWeight="900" fontFamily="Arial">BCAA</text>
          <text x="100" y="166" textAnchor="middle" fill="#555" fontSize="7" fontFamily="Arial">BRANCHED CHAIN AMINO ACIDS</text>
          <rect x="40" y="172" width="120" height="1.5" fill={labelColor} />
          <text x="100" y="182" textAnchor="middle" fill="#555" fontSize="6" fontFamily="Arial">{product.servings} {t.svgServings}</text>
          <text x="100" y="194" textAnchor="middle" fill="#333" fontSize="6" fontFamily="Arial">{t.svgRecovery} • {t.svgMuscleGrowth}</text>
        </>
      )}
      <text x="70" y="240" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="Arial" fontWeight="bold">{formatUnit(product.calories, lang)}</text>
      <text x="100" y="240" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="Arial" fontWeight="bold">{formatUnit(product.protein, lang)}</text>
      <text x="130" y="240" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="Arial" fontWeight="bold">{product.servings}</text>
    </svg>
  )
}

// ============================================================
// PRODUCT SCROLLER
// ============================================================
const ProductScroller = ({ onOrder, onView }) => {
  const lang = useLang()
  const t = T[lang]
  const containerRef = React.useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  const scroll = (dir) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' })
    }
  }

  const products = PRODUCTS_BASE.map((p, i) => ({ ...p, ...T[lang].products[i] }))

  return (
    <section id="new" className="scroller-section">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
      >
        <span className="section-title-sm">{t.scrollerTag}</span>
        <h2 className="section-title">
          {t.scrollerTitle1}<br /><span className="accent-text">{t.scrollerTitle2}</span>
        </h2>

        <div className="scroller-wrapper">
          <button className="scroll-btn prev" onClick={() => scroll('left')} aria-label="Previous"><ChevronLeft size={22} /></button>
          <button className="scroll-btn next" onClick={() => scroll('right')} aria-label="Next"><ChevronRight size={22} /></button>

          <div className="scroll-hint">{t.scrollHint}</div>
          <div className="scroller-container" ref={containerRef}>
            {products.map(item => (
              <motion.div
                key={item.id}
                className="scroller-card"
                whileHover={{ y: -8 }}
                style={{ cursor: 'pointer', minWidth: '300px' }}
              >
                <div className="card-badge">Sale!</div>
                <div
                  className="product-img"
                  style={{ background: `linear-gradient(160deg, ${item.bgColor} 0%, #0a0a0a 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                  onClick={() => onView(item)}
                >
                  <img
                    src={PRODUCT_IMAGES[item.id]}
                    alt={item.name}
                    className="product-photo"
                    loading="lazy"
                  />
                </div>
                <div className="card-type" onClick={() => onView(item)}>{item.type}</div>
                <h3 onClick={() => onView(item)}>{item.name}</h3>
                <p style={{ fontSize: '0.75rem', color: '#777', marginBottom: '0.6rem', lineHeight: 1.4 }} onClick={() => onView(item)}>{item.subtitle}</p>
                <button className="btn" style={{ width: '100%', padding: '10px', fontSize: '0.78rem' }} onClick={() => onOrder(item.name)}>{t.buyNow}</button>
              </motion.div>
            ))}
          </div>

          <div className="scroll-dots">
            {[0, 0.25, 0.75, 1].map((target, i) => (
              <Dot key={i} progress={scrollXProgress} target={target} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================
// CERTIFICATES
// ============================================================
const Certificates = ({ onViewCertificate }) => {
  const lang = useLang()
  const t = T[lang]
  const containerRef = React.useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  const scroll = (dir) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' })
    }
  }

  const certs = t.certItems.map((item, i) => ({ ...item, img: CERT_IMGS[i] }))

  return (
    <section className="benefits-section">
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ position: 'relative' }}
      >
        <span className="section-title-sm">{t.certTag}</span>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          {t.certTitle1}<br /><span className="accent-text">{t.certTitle2}</span>
        </h2>

        <div className="scroller-wrapper">
          <button className="scroll-btn prev" onClick={() => scroll('left')} aria-label="Previous"><ChevronLeft size={22} /></button>
          <button className="scroll-btn next" onClick={() => scroll('right')} aria-label="Next"><ChevronRight size={22} /></button>

          <div className="scroll-hint">{t.scrollHint}</div>
          <div className="scroller-container certificates-scroller" ref={containerRef}>
            {certs.map((item, i) => (
              <motion.div
                key={i}
                className="scroller-card certificate-item"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onViewCertificate(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="certificate-img-container">
                  <img src={item.img} alt={item.title} className="certificate-img" />
                </div>
                <h3>{item.title}<br /><span className="accent-text" style={{ fontSize: '0.8rem' }}>{item.accent}</span></h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="scroll-dots">
          {[0, 0.5, 1].map((target, i) => (
            <Dot key={i} progress={scrollXProgress} target={target} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================
// CATALOG / TOP PICKS
// ============================================================
const TopPicks = ({ onOrder, onView }) => {
  const lang = useLang()
  const t = T[lang]
  const products = PRODUCTS_BASE.map((p, i) => ({ ...p, ...T[lang].products[i] }))

  return (
    <section id="catalog" className="catalog-section">
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="section-title-sm">{t.catalogTag}</span>
        <h2 className="section-title">
          {t.catalogTitle1}<br /><span className="accent-text">{t.catalogTitle2}</span>
        </h2>
        <div className="catalog-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {products.map((p, idx) => (
            <motion.div
              key={p.id}
              className="product-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-badge">Sale!</div>
              <div
                className="product-img"
                style={{ background: `linear-gradient(160deg, ${p.bgColor} 0%, #0a0a0a 100%)`, height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.2rem' }}
                onClick={() => onView(p)}
              >
                <img
                  src={PRODUCT_IMAGES[p.id]}
                  alt={p.name}
                  className="product-photo"
                  loading="lazy"
                />
              </div>
              <div className="card-type" style={{ marginTop: '1rem' }} onClick={() => onView(p)}>{p.type}</div>
              <h3 className="product-title" onClick={() => onView(p)}>{p.name}</h3>
              <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem', lineHeight: 1.5 }} onClick={() => onView(p)}>{p.subtitle}</p>
              <ul style={{ listStyle: 'none', marginBottom: '1rem' }} onClick={() => onView(p)}>
                {p.benefits.slice(0, 3).map((b, bi) => (
                  <li key={bi} style={{ fontSize: '0.75rem', color: '#999', display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#d32f2f', fontWeight: 700, flexShrink: 0 }}>—</span> {b}
                  </li>
                ))}
              </ul>
              <button className="btn" style={{ width: '100%' }} onClick={() => onOrder(p.name)}>{t.buyNow}</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================
// PARTNERS
// ============================================================
const Partners = () => {
  const lang = useLang()
  const t = T[lang]
  return (
    <section className="partners-section">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {t.partnersTitle.split(' ').map((word, i, arr) =>
            i === arr.length - 1
              ? <span key={i} className="accent-text"> {word}</span>
              : <React.Fragment key={i}>{word} </React.Fragment>
          )}
        </h2>
        <div className="partners-grid">
          {PARTNERS.map((p, i) => <div key={i} className="partner-logo">{p}</div>)}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// INTERACTIVE ADDRESS WITH MINI-MAP
// ============================================================
const InteractiveAddress = ({ address }) => {
  const [isOpen, setIsOpen] = useState(false)
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address.replace(/\n/g, ' '))}&output=embed`

  return (
    <div className="interactive-address-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="address-text">
        {address.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}<br />
          </React.Fragment>
        ))}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="map-mini-popover"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="map-iframe-wrapper">
              <iframe
                title="Mini Map"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <div className="map-popover-arrow" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================
// FOOTER
// ============================================================
const Footer = ({ lang }) => {
  const t = T[lang]
  return (
    <footer id="contacts" className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Col 1 — Brand + Subscribe */}
          <div>
            <div className="footer-logo">AGYM<span className="accent-text">POWER</span></div>
            <p className="footer-desc">{t.footerDesc}</p>
            <div className="footer-social" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <a href="https://www.instagram.com/agym.kz?igsh=dWNqbHd5cjVhMHZp" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <Instagram size={22} /> Instagram
              </a>
              <a href="https://wa.me/77016644344" target="_blank" rel="noopener noreferrer" className="social-btn social-btn-wa" aria-label="WhatsApp">
                <MessageCircle size={22} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Col 3 — Help */}
          <div className="footer-col">
            <h4>{t.footerHelp}</h4>
            <ul>
              {t.footerHelpLinks.map((link, i) => (
                <li key={i}><a href={i === 0 ? '#catalog' : '#contacts'}>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacts */}
          <div className="footer-col">
            <h4>{t.footerContacts}</h4>
            <ul>
              <li><a href="tel:+77016644344" className="footer-phone">+7 701 664 4344</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <span>{t.footerCopy}</span>
          <div className="developer-signature">
            Сделано <span className="accent-text">Fintech</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================================
// PRODUCT DETAIL MODAL
// ============================================================
const ProductDetailModal = ({ product, isOpen, onClose, onOrder, lang }) => {
  const t = T[lang]
  if (!isOpen || !product) return null

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal product-detail-modal"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          style={{ maxWidth: '520px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}
        >
          <button className="modal-close" onClick={onClose}><X size={22} /></button>

          <div style={{ background: `linear-gradient(160deg, ${product.bgColor} 0%, #0a0a0a 100%)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', marginBottom: '1.5rem', minHeight: '200px' }}>
            <img src={PRODUCT_IMAGES[product.id]} alt={product.name} style={{ maxHeight: '180px', objectFit: 'contain' }} />
          </div>

          <div className="card-type">{product.type}</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '2px', margin: '0.3rem 0 0.5rem' }}>{product.name}</h2>
          <p style={{ color: '#999', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>{product.subtitle}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.2rem' }}>
            {[
              { label: t.svgProtein, val: product.protein },
              { label: t.svgCarbs, val: product.carbs },
              { label: t.svgEnergy, val: product.calories },
            ].map(({ label, val }) => (
              <div key={label} style={{ background: '#111', borderRadius: '8px', padding: '0.8rem', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', color: '#fff' }}>{val}</div>
                <div style={{ fontSize: '0.65rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
              </div>
            ))}
          </div>

          <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
            {product.benefits.map((b, i) => (
              <li key={i} style={{ fontSize: '0.85rem', color: '#ccc', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#d32f2f', fontWeight: 700, flexShrink: 0 }}>—</span> {b}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              className="btn"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => { onClose(); onOrder(product.name) }}
            >
              <MessageCircle size={18} /> {t.buyNow}
            </button>
            <a
              href="https://wa.me/77016644344"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {t.contactBtn}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================
// ORDER MODAL
// ============================================================
const OrderModal = ({ product, isOpen, onClose, lang }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('87016644344')
  const t = T[lang]

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = t.modalWhatsappMsg(product, name, phone)
    window.open(`https://wa.me/77016644344?text=${encodeURIComponent(msg)}`, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}><X size={22} /></button>
          <span className="section-title-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>{t.modalTag}</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>
            {t.modalTitle} <span className="accent-text">{t.modalTitleAccent}</span>
          </h2>
          <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '2rem', color: '#aaa' }}>{product}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t.modalName}</label>
              <input type="text" placeholder={t.modalNamePlaceholder} required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t.modalPhone}</label>
              <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
              <MessageCircle size={18} /> {t.modalSubmit}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================
// CERTIFICATE MODAL
// ============================================================
const CertificateModal = ({ certificate, isOpen, onClose }) => {
  if (!isOpen || !certificate) return null
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay certificate-modal-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal certificate-modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={32} />
          </button>
          
          <div className="certificate-full-img-container">
            <img src={certificate.img} alt={certificate.title} className="certificate-full-img" />
          </div>
          
          <h2>{certificate.title}</h2>
          <p className="accent-text">{certificate.accent}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================
// BACKGROUND SHAPES
// ============================================================
const BackgroundShapes = () => (
  <div className="bg-shapes">
    <div className="bg-shape" style={{ width: '500px', height: '500px', top: '-150px', right: '-100px' }} />
    <div className="bg-shape" style={{ width: '400px', height: '400px', bottom: '15%', left: '-80px', animationDelay: '-7s' }} />
  </div>
)

// ============================================================
// APP
// ============================================================
function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('agym-lang') || 'ru')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)
  const [viewProduct, setViewProduct] = useState(null)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('agym-lang', lang)
  }, [lang])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    const handleResize = () => { if (window.innerWidth > 768) setIsMenuOpen(false) }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleOrder = (product) => { setSelectedProduct(product); setIsOrderModalOpen(true) }
  const handleViewProduct = (product) => { setViewProduct(product); setIsProductDetailOpen(true) }
  const handleViewCertificate = (cert) => { setSelectedCertificate(cert); setIsCertModalOpen(true) }

  return (
    <LangContext.Provider value={lang}>
      <div className={`page-wrapper ${isMenuOpen ? 'menu-open' : ''}`}>
        <BackgroundShapes />
        <Header
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isScrolled={isScrolled}
          lang={lang}
          setLang={setLang}
        />
        <Hero />
        <ProductScroller onOrder={handleOrder} onView={handleViewProduct} />
        <Certificates onViewCertificate={handleViewCertificate} />
        <TopPicks onOrder={handleOrder} onView={handleViewProduct} />
        <Footer lang={lang} />

        <OrderModal
          product={selectedProduct}
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          lang={lang}
        />
        <CertificateModal
          certificate={selectedCertificate}
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
        />
        <ProductDetailModal
          product={viewProduct}
          isOpen={isProductDetailOpen}
          onClose={() => setIsProductDetailOpen(false)}
          onOrder={handleOrder}
          lang={lang}
        />
      </div>
    </LangContext.Provider>
  )
}

export default App
