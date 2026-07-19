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
  }},
  es: { translation: {
    home: 'Inicio', movies: 'Películas', series: 'Series', anime: 'Anime', turkishSeries: 'Series Turcas', turkishDrama: 'Drama Turco',
    search: 'Buscar películas, series, anime…', trendingMovies: 'Películas Tendencia', trendingSeries: 'Series Tendencia', trendingAnime: 'Anime Tendencia',
    continueWatching: 'Continuar viendo', play: 'Ver ahora', trailer: 'Ver tráiler', details: 'Ver detalles', login: 'Iniciar sesión', logout: 'Cerrar sesión',
    welcomeBack: 'Bienvenido de nuevo', username: 'Usuario', password: 'Contraseña', signIn: 'Entrar', demo: 'Cuenta demo: admin / admin',
    noResults: 'No se encontraron resultados', browse: 'Explorar colección', rating: 'Valoración', episodes: 'Episodios', resume: 'Reanudar', guest: 'Invitado',
    allRights: 'Solo se deben publicar medios con licencia o de dominio público.'
  }},
  ja: { translation: {
    home: 'ホーム', movies: '映画', series: 'シリーズ', anime: 'アニメ', turkishSeries: 'トルコドラマ', turkishDrama: 'トルコドラマ',
    search: '映画、シリーズ、アニメを検索…', trendingMovies: '人気の映画', trendingSeries: '人気のシリーズ', trendingAnime: '人気のアニメ',
    continueWatching: '視聴を続ける', play: '今すぐ再生', trailer: '予告編を見る', details: '詳細を見る', login: 'ログイン', logout: 'ログアウト',
    welcomeBack: 'おかえりなさい', username: 'ユーザー名', password: 'パスワード', signIn: 'ログイン', demo: 'デモアカウント: admin / admin',
    noResults: '結果が見つかりません', browse: 'コレクションを閲覧', rating: '評価', episodes: 'エピソード', resume: '再開', guest: 'ゲスト',
    allRights: 'ライセンス供与されたメディアまたはパブリックドメインのメディアのみを公開する必要があります。'
  }},
  fr: { translation: {
    home: 'Accueil', movies: 'Films', series: 'Séries', anime: 'Anime', turkishSeries: 'Séries Turques', turkishDrama: 'Drame Turc',
    search: 'Rechercher films, séries, anime…', trendingMovies: 'Films tendances', trendingSeries: 'Séries tendances', trendingAnime: 'Animes tendances',
    continueWatching: 'Continuer la lecture', play: 'Lire maintenant', trailer: 'Voir la bande-annonce', details: 'Voir les détails', login: 'Connexion', logout: 'Déconnexion',
    welcomeBack: 'Bienvenue', username: 'Nom d\'utilisateur', password: 'Mot de passe', signIn: 'Entrer', demo: 'Compte démo: admin / admin',
    noResults: 'Aucun résultat trouvé', browse: 'Parcourir la collection', rating: 'Note', episodes: 'Épisodes', resume: 'Reprendre', guest: 'Invité',
    allRights: 'Seuls les médias sous licence ou du domaine public doivent être publiés.'
  }},
  it: { translation: {
    home: 'Home', movies: 'Film', series: 'Serie TV', anime: 'Anime', turkishSeries: 'Serie Turche', turkishDrama: 'Drammi Turchi',
    search: 'Cerca film, serie, anime…', trendingMovies: 'Film di tendenza', trendingSeries: 'Serie di tendenza', trendingAnime: 'Anime di tendenza',
    continueWatching: 'Continua a guardare', play: 'Riproduci', trailer: 'Guarda il trailer', details: 'Dettagli', login: 'Accedi', logout: 'Esci',
    welcomeBack: 'Bentornato', username: 'Nome utente', password: 'Password', signIn: 'Entra', demo: 'Account demo: admin / admin',
    noResults: 'Nessun risultato', browse: 'Esplora', rating: 'Valutazione', episodes: 'Episodi', resume: 'Riprendi', guest: 'Ospite',
    allRights: 'È consentito pubblicare solo media con licenza o di pubblico dominio.'
  }},
  de: { translation: {
    home: 'Startseite', movies: 'Filme', series: 'Serien', anime: 'Anime', turkishSeries: 'Türkische Serien', turkishDrama: 'Türkisches Drama',
    search: 'Filme, Serien, Anime suchen…', trendingMovies: 'Beliebte Filme', trendingSeries: 'Beliebte Serien', trendingAnime: 'Beliebte Anime',
    continueWatching: 'Weiter schauen', play: 'Jetzt abspielen', trailer: 'Trailer ansehen', details: 'Details ansehen', login: 'Anmelden', logout: 'Abmelden',
    welcomeBack: 'Willkommen zurück', username: 'Benutzername', password: 'Passwort', signIn: 'Einloggen', demo: 'Demo-Konto: admin / admin',
    noResults: 'Keine Ergebnisse gefunden', browse: 'Sammlung durchsuchen', rating: 'Bewertung', episodes: 'Episoden', resume: 'Fortsetzen', guest: 'Gast',
    allRights: 'Es sollten nur lizenzierte oder gemeinfreie Medien veröffentlicht werden.'
  }}
};

const saved = localStorage.getItem('cinevault-language') || 'en';
i18n.use(initReactI18next).init({ 
  resources, 
  lng: saved, 
  fallbackLng: 'en', 
  interpolation: { escapeValue: false },
  supportedLngs: ['en', 'ar', 'es', 'ja', 'fr', 'it', 'de']
});

export default i18n;