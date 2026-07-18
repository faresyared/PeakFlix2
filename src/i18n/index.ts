import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: {
    home: 'Home', movies: 'Movies', series: 'Series', anime: 'Anime', turkishSeries: 'Turkish Series', turkishDrama: 'Turkish Drama',
    search: 'Search movies, series, anime…', trendingMovies: 'Trending Movies', trendingSeries: 'Trending Series', trendingAnime: 'Trending Anime',
    continueWatching: 'Continue Watching', play: 'Play now', trailer: 'Watch trailer', details: 'View details', login: 'Sign in', logout: 'Sign out',
    welcomeBack: 'Welcome back', username: 'Username', password: 'Password', signIn: 'Sign in', demo: 'Demo account: admin / admin',
    noResults: 'No titles found', browse: 'Browse collection', rating: 'Rating', episodes: 'Episodes', resume: 'Resume', guest: 'Guest',
    allRights: 'Only properly licensed or public-domain media should be published.'
  }},
  ar: { translation: {
    home: 'الرئيسية', movies: 'أفلام', series: 'مسلسلات', anime: 'أنمي', turkishSeries: 'مسلسلات تركية', turkishDrama: 'دراما تركية',
    search: 'ابحث عن فيلم أو مسلسل أو أنمي…', trendingMovies: 'أفلام ترند', trendingSeries: 'مسلسلات ترند', trendingAnime: 'أنميات ترند',
    continueWatching: 'أكمل المشاهدة', play: 'شاهد الآن', trailer: 'شاهد الإعلان', details: 'عرض التفاصيل', login: 'تسجيل الدخول', logout: 'تسجيل الخروج',
    welcomeBack: 'أهلاً بعودتك', username: 'اسم المستخدم', password: 'كلمة المرور', signIn: 'دخول', demo: 'الحساب التجريبي: admin / admin',
    noResults: 'لم يتم العثور على نتائج', browse: 'تصفح المحتوى', rating: 'التقييم', episodes: 'الحلقات', resume: 'متابعة', guest: 'زائر',
    allRights: 'يجب نشر الوسائط المرخصة أو الموجودة ضمن الملكية العامة فقط.'
  }}
};

const saved = localStorage.getItem('cinevault-language') || 'en';
i18n.use(initReactI18next).init({ resources, lng: saved, fallbackLng: 'en', interpolation: { escapeValue: false } });

export default i18n;
