import {
  Exhibition,
  EventItem,
  CollectionItem,
  StaffMember,
  OfficialDoc,
  NewsItem,
  MenuItem,
  AuditLogItem,
  ContourSyncState
} from '../types';

export const SITE_NAVIGATION: MenuItem[] = [
  {
    id: 'museum',
    title: 'Музей',
    titleEn: 'Museum',
    path: '/museum',
    children: [
      { id: 'history', title: 'История музея', titleEn: 'Museum History', path: '/museum/history', desc: 'Основан в 1988 году — единственный в России музей хлеба' },
      { id: 'building', title: 'История здания', titleEn: 'Building History', path: '/museum/building', desc: 'Деревянный особняк купца И. А. Пастухова XIX века' },
      { id: 'exposition', title: 'Экспозиция', titleEn: 'Permanent Exposition', path: '/museum/exposition', desc: '14 залов: от древних жерновов до блокадного хлеба' },
      { id: 'team', title: 'Команда', titleEn: 'Staff & Team', path: '/museum/team', desc: 'Руководство, хранители фондов, научные сотрудники' },
      { id: 'friends', title: 'Друзья музея', titleEn: 'Friends & Partners', path: '/museum/friends', desc: 'Партнеры, гильдии пекарей, благотворители' },
      { id: 'documents', title: 'Официальные документы', titleEn: 'Official Documents', path: '/museum/documents', desc: 'Устав, госзакупки, доступность по ГОСТ Р 70176-2022' },
      { id: 'news', title: 'Новости', titleEn: 'News & Press', path: '/museum/news', desc: 'События, открытия выставок, жизнь музея' },
      { id: 'media', title: 'Медиа', titleEn: 'Media Gallery', path: '/museum/media', desc: 'Фотолетопись, виртуальные экскурсии, видео' },
      { id: 'vacancies', title: 'Вакансии', titleEn: 'Vacancies', path: '/museum/vacancies', desc: 'Работа в главном музейном институте хлеба' },
      { id: 'contacts', title: 'Контакты', titleEn: 'Contacts', path: '/museum/contacts', desc: 'Адрес, телефон, режим работы, схема проезда' }
    ]
  },
  {
    id: 'visitors',
    title: 'Посетителям',
    titleEn: 'Visitors',
    path: '/visitors',
    children: [
      { id: 'plan', title: 'Спланировать визит', titleEn: 'Plan Your Visit', path: '/visitors/plan', desc: 'Часы работы, как добраться от м. Площадь Ленина' },
      { id: 'tickets-info', title: 'Билеты и льготы', titleEn: 'Tickets & Benefits', path: '/visitors/tickets-info', desc: 'Прейскурант, категории льготников, правила возврата' },
      { id: 'pushkin-card', title: 'Пушкинская карта', titleEn: 'Pushkin Card', path: '/visitors/pushkin-card', desc: 'Посещение выставок и лекций по молодежной карте' },
      { id: 'accessible', title: 'Доступная среда', titleEn: 'Accessibility', path: '/visitors/accessible', desc: 'Пандусы, тактильные экспонаты, тифлокомментарии' },
      { id: 'shop', title: 'Магазин', titleEn: 'Museum Shop', path: '/visitors/shop', desc: 'Книги по хлебопечению, памятные сувениры и реплики' },
      { id: 'faq', title: 'Частые вопросы', titleEn: 'FAQ', path: '/visitors/faq', desc: 'Ответы на популярные вопросы о посещении' }
    ]
  },
  {
    id: 'events',
    title: 'Афиша',
    titleEn: 'Afisha',
    path: '/events',
    children: [
      { id: 'all-events', title: 'Все события', titleEn: 'All Events', path: '/events/all', desc: 'Полный календарь программ на текущий сезон' },
      { id: 'events-excursions', title: 'Экскурсии в афише', titleEn: 'Guided Tours', path: '/events/excursions', desc: 'Расписание обзорных и интерактивных экскурсий' },
      { id: 'events-kids', title: 'Детям', titleEn: 'For Children', path: '/events/kids', desc: 'Игровые маршруты и детские праздники' },
      { id: 'events-exhibitions', title: 'Выставки', titleEn: 'Exhibitions', path: '/events/exhibitions', desc: 'Временные и тематические экспозиции' },
      { id: 'events-meetings', title: 'Встречи и лекции', titleEn: 'Lectures & Talks', path: '/events/meetings', desc: 'Встречи с историками кулинарии и ремесленниками' },
      { id: 'events-festivals', title: 'Фестивали', titleEn: 'Festivals', path: '/events/festivals', desc: 'Ежегодный Праздник Хлеба и ярмарки ремесел' },
      { id: 'events-workshops', title: 'Мастер-классы', titleEn: 'Workshops', path: '/events/workshops', desc: 'Роспись пряников и основы заквасочного хлеба' },
      { id: 'events-archive', title: 'Архив событий', titleEn: 'Archive', path: '/events/archive', desc: 'Прошедшие мероприятия музея' }
    ]
  },
  {
    id: 'tours',
    title: 'Экскурсии',
    titleEn: 'Excursions',
    path: '/tours',
    children: [
      { id: 'tours-general', title: 'Обзорная экскурсия', titleEn: 'General Tour', path: '/tours/general', desc: '«История хлеба от неолита до наших дней»' },
      { id: 'tours-interactive', title: 'Интерактивные экскурсии', titleEn: 'Interactive Tours', path: '/tours/interactive', desc: 'С элементами традиционного крестьянского быта' },
      { id: 'tours-thematic', title: 'Тематические экскурсии', titleEn: 'Thematic Tours', path: '/tours/thematic', desc: '«Блокадная пайка», «Петербургские пекарни XIX века»' },
      { id: 'tours-adult-workshops', title: 'Мастер-классы для взрослых', titleEn: 'Adult Workshops', path: '/tours/adult-workshops', desc: 'Практические занятия по выпечке и старинным рецептам' },
      { id: 'tours-booking', title: 'Заявка на экскурсию', titleEn: 'Book a Tour', path: '/tours/booking', desc: 'Онлайн-бронирование для организованных групп' }
    ]
  },
  {
    id: 'kids',
    title: 'Детям',
    titleEn: 'For Kids',
    path: '/kids',
    children: [
      { id: 'kids-interactive', title: 'Интерактивные детские экскурсии', titleEn: 'Kids Interactive', path: '/kids/interactive', desc: '«Колобок и русская печь», «Сказка о хлебном колоске»' },
      { id: 'kids-thematic', title: 'Тематические экскурсии', titleEn: 'Kids Thematic', path: '/kids/thematic', desc: 'Познавательные квесты для школьников всех возрастов' },
      { id: 'kids-workshops', title: 'Мастер-классы для детей', titleEn: 'Kids Workshops', path: '/kids/workshops', desc: 'Лепка из соленого теста и роспись архангельских козуль' },
      { id: 'kids-pushkin', title: 'Пушкинская карта для школьников', titleEn: 'Pushkin Card', path: '/kids/pushkin', desc: 'Бесплатные билеты для молодежи от 14 лет' }
    ]
  },
  {
    id: 'exhibitions',
    title: 'Выставки',
    titleEn: 'Exhibitions',
    path: '/exhibitions',
    children: [
      { id: 'exh-current', title: 'Текущие выставки', titleEn: 'Current Exhibitions', path: '/exhibitions/current', desc: 'Действующие временные экспозиции' },
      { id: 'exh-upcoming', title: 'Будущие выставки', titleEn: 'Upcoming Exhibitions', path: '/exhibitions/upcoming', desc: 'Анонсы готовящихся проектов музея' },
      { id: 'exh-traveling', title: 'Передвижные выставки', titleEn: 'Traveling Exhibitions', path: '/exhibitions/traveling', desc: 'Выставки музея в городах России и Ленобласти' },
      { id: 'exh-pushkin', title: 'По Пушкинской карте', titleEn: 'Pushkin Card Access', path: '/exhibitions/pushkin', desc: 'Выставочные проекты, доступные по программе' }
    ]
  },
  {
    id: 'science',
    title: 'Наука',
    titleEn: 'Science & Research',
    path: '/science',
    children: [
      { id: 'sci-seminars', title: 'Семинары и конференции', titleEn: 'Conferences', path: '/science/seminars', desc: 'Ежегодные научные чтения по истории материальной культуры' },
      { id: 'sci-publications', title: 'Публикации', titleEn: 'Publications', path: '/science/publications', desc: 'Монографии, научные сборники и каталоги коллекций' },
      { id: 'sci-collection', title: 'Коллекция музея', titleEn: 'Museum Collection', path: '/science/collection', desc: 'Каталог избранных экспонатов и ссылка на Госкаталог РФ' },
      { id: 'sci-researchers', title: 'Исследователям', titleEn: 'For Researchers', path: '/science/researchers', desc: 'Порядок работы в фондах, архивах и библиотеке музея' },
      { id: 'sci-materials', title: 'Материалы по теме', titleEn: 'Historical Materials', path: '/science/materials', desc: 'Исторические документы, рецептуры и библиография' }
    ]
  }
];

export const INITIAL_EXHIBITIONS: Exhibition[] = [
  {
    id: 'exh-1',
    title: 'Золотое зерно: От серпа до первого комбайна',
    titleEn: 'Golden Grain: From Sickle to Combine',
    status: 'current',
    dates: '15 января 2026 — 25 мая 2026',
    hall: 'Выставочный зал № 1 (Особняк Пастухова)',
    description: 'Масштабная экспозиция о развитии земледелия на Руси, орудиях труда крестьян Северо-Запада и сакральном отношении к хлебу в народной культуре.',
    descriptionEn: 'An extensive exhibition on agriculture in ancient Russia, peasant tools and folklore bread rituals.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Экспозиция старинных серпов, снопов пшеницы и деревянных жерновов в музейном зале',
    pushkinCard: true,
    curator: 'Соколова М. В., ведущий научный сотрудник',
    featured: true
  },
  {
    id: 'exh-2',
    title: '125 граммов жизни: Блокадный хлеб Ленинграда',
    titleEn: '125 Grams of Life: Siege of Leningrad Bread',
    status: 'current',
    dates: 'Постоянная мемориальная экспозиция',
    hall: 'Зал боевой славы и блокадной памяти',
    description: 'Подлинные образцы блокадного хлеба, хлебные карточки зимы 1941–1942 годов, весы из булочной на Васильевском острове и рецептуры ЦНИЛ хлебопечения.',
    descriptionEn: 'Authentic 125g bread rations, ration cards of winter 1941-1942, scales and recipes from the besieged city.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Мемориальная витрина с весами, карточками и блокадной пайкой хлеба',
    pushkinCard: true,
    curator: 'Иванов А. П., кандидат исторических наук',
    featured: true
  },
  {
    id: 'exh-3',
    title: 'Аромат старого Петербурга: Пекарни и кондитерские рубежа XIX–XX веков',
    titleEn: 'Fragrance of Old Petersburg: Bakeries of 19th-20th Century',
    status: 'current',
    dates: '10 февраля 2026 — 30 ноября 2026',
    hall: 'Зал купеческого быта',
    description: 'Реконструкция интерьера немецкой булочной и русской крендельной мастерской в Санкт-Петербурге. Формы для выпечки, рекламные вывески и упаковки кондитерских товариществ.',
    descriptionEn: 'Reconstruction of a historic bakery shop, copper cake molds, antique packaging and posters.',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Интерьер старинной пекарни с медными формочками и витриной выпечки',
    pushkinCard: true,
    curator: 'Дмитриева Е. С., главный хранитель',
    featured: false
  },
  {
    id: 'exh-4',
    title: 'Пряничные чудеса: Традиции Городца, Вязьмы и Архангельска',
    titleEn: 'Gingerbread Wonders: Traditional Russian Craft',
    status: 'upcoming',
    dates: '1 июня 2026 — 15 сентября 2026',
    hall: 'Малый выставочный зал',
    description: 'Уникальные резные пряничные доски XVIII–XX веков из липы и березы, коллекция печатных пряников и секреты старинных пряничных артелей.',
    descriptionEn: 'Carved wooden gingerbread printing boards from 18th to 20th centuries.',
    image: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Резная деревянная доска для формования традиционного печатного пряника',
    pushkinCard: true,
    curator: 'Кузнецов В. Н.',
    featured: false
  },
  {
    id: 'exh-5',
    title: 'Хлеб на берегах Невы: Передвижная экспозиция',
    titleEn: 'Bread on Neva Banks: Traveling Exhibition',
    status: 'traveling',
    dates: 'Март — Октябрь 2026',
    hall: 'Маршрут: Выборг — Гатчина — Тихвин — Сосновый Бор',
    description: 'Мобильный просветительский проект музея для жителей и школьников Ленинградской области с интерактивными репликами и архивными фотодокументами.',
    descriptionEn: 'Mobile educational exhibition for the Leningrad region.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Мобильная экспозиция стендов и артефактов хлебной культуры',
    pushkinCard: false,
    curator: 'Научно-просветительский отдел',
    featured: false
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Обзорная экскурсия: «Хлеб — всему голова: Путь зерна через эпохи»',
    titleEn: 'General Tour: Grain Through the Ages',
    category: 'excursion',
    date: 'Каждый вторник, четверг и субботу',
    time: '12:00, 15:00',
    price: 350,
    ageLimit: '6+',
    pushkinCard: true,
    description: 'Классическая экскурсия по всем залам музея: от неолитической зернотерки и русской глинобитной печи до ленинградской блокадной пайки и космического хлеба.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Экскурсовод рассказывает группе посетителей у витрины с макетом русской печи',
    spotsLeft: 12
  },
  {
    id: 'ev-2',
    title: 'Мастер-класс: «Секреты Архангельской козули: Роспись обрядового пряника»',
    titleEn: 'Workshop: Traditional Decorated Gingerbread Kozulya',
    category: 'workshop',
    date: 'Суббота, 18 октября 2026',
    time: '14:00',
    price: 550,
    ageLimit: '8+',
    pushkinCard: true,
    description: 'Погружение в поморские традиции: история пряников-козуль, приготовление карамельного жженого сахара и роспись разноцветной сахарной глазурью.',
    image: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Расписные пряники-козули с белой и розовой глазурью на столе',
    spotsLeft: 6
  },
  {
    id: 'ev-3',
    title: 'Интерактивная программа для детей: «В гостях у мельника и пекаря»',
    titleEn: 'Interactive Tour for Kids: At the Mill',
    category: 'kids',
    date: 'Воскресенье, 19 октября 2026',
    time: '11:30',
    price: 300,
    ageLimit: '5+',
    pushkinCard: false,
    description: 'Сказочное путешествие: ребята пробуют смолоть муку на настоящих ручных жерновах, разгадывают старинные загадки и узнают, как рождается каравай.',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Дети с восторгом крутят деревянный ручной жернов в интерактивном зале',
    spotsLeft: 8
  },
  {
    id: 'ev-4',
    title: 'Лекция историка: «Хлебная торговля и гильдии купцов Санкт-Петербурга XIX века»',
    titleEn: 'Public Lecture: Grain Trade and Guilds in 19th Century St. Petersburg',
    category: 'lecture',
    date: 'Четверг, 22 октября 2026',
    time: '18:30',
    price: 250,
    ageLimit: '12+',
    pushkinCard: true,
    description: 'Как снабжалась хлебом столица Российской империи, где находились главные мучные склады на Выборгской стороне и кто контролировал цены на ржаную муку.',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Лекционный зал музея с экраном и историческими иллюстрациями',
    spotsLeft: 24
  },
  {
    id: 'ev-5',
    title: 'Осенний фестиваль: «Дни Хлеба и Ремесла на Михайлова, 2»',
    titleEn: 'Autumn Bread & Craft Festival',
    category: 'festival',
    date: '25–26 октября 2026',
    time: '11:00 – 18:00',
    price: 400,
    ageLimit: '0+',
    pushkinCard: true,
    description: 'Большой ежегодный праздник: ремесленные пекарни Петербурга, дегустации старинных бездрожжевых сортов, мастер-классы гончаров и концерт народной музыки во внутреннем дворе.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Праздничный стол с караваями, калачами и баранками на ярмарке',
    spotsLeft: 50
  }
];

export const INITIAL_COLLECTION: CollectionItem[] = [
  {
    id: 'col-1',
    invNumber: 'КП МХ-1249/1',
    title: 'Форма для выпечки пасхального кулича с гравировкой «Христос Воскресе»',
    era: 'Конец XIX века, Российская империя',
    material: 'Медь, лужение, ковка',
    description: 'Массивная медная форма цилиндрической формы с тиснением орнамента и букв ХВ. Использовалась в пекарне купца 2-й гильдии в Санкт-Петербурге.',
    goskatalogUrl: 'https://goskatalog.ru/portal/#/collections?id=44921024',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Старинная медная форма для кулича с чеканным орнаментом'
  },
  {
    id: 'col-2',
    invNumber: 'КП МХ-892/3',
    title: 'Весы настольные циферблатные торговые фабрики братьев Вебер',
    era: '1905 год, Санкт-Петербург',
    material: 'Чугун, латунь, эмаль',
    description: 'Весы с круговым циферблатом и чашами для взвешивания муки и хлебобулочных изделий. Поступили из булочной на Литейном проспекте.',
    goskatalogUrl: 'https://goskatalog.ru/portal/#/collections?id=44921088',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Чугунные антикварные торговые весы с латунными чашами'
  },
  {
    id: 'col-3',
    invNumber: 'КП МХ-412/1',
    title: 'Доска пряничная составная «Конь-огонь и птица Сирин»',
    era: 'Вторая половина XIX века, Вологодская губерния',
    material: 'Липа, глубокая выемчатая резьба',
    description: 'Двусторонняя пряничная доска с тонким растительным узором и мифологическими образами. Использовалась для создания свадебных печатных пряников.',
    goskatalogUrl: 'https://goskatalog.ru/portal/#/collections?id=44921155',
    image: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Деревянная резная доска из липы со сложным узором птицы'
  },
  {
    id: 'col-4',
    invNumber: 'КП МХ-1804/2',
    title: 'Подлинная карточка на хлеб гражданина Ленинграда (ноябрь 1941 г.)',
    era: '1941 год, Великая Отечественная война',
    material: 'Бумага, типографская печать, штамп 47-й булочной',
    description: 'Хлебная карточка служащего со следами отрезанных талонов за первую декаду блокадного ноября. Бесценное свидетельство стойкости ленинградцев.',
    goskatalogUrl: 'https://goskatalog.ru/portal/#/collections?id=44921200',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Архивный документ: подлинная карточка на хлеб ноябрь 1941 года'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Чернецова Марина Васильевна',
    role: 'Директор музея',
    department: 'Руководство',
    email: 'director@musbread.ru',
    phone: '+7 (812) 294-50-90 (доб. 101)',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    photoAlt: 'Чернецова Марина Васильевна, директор музея'
  },
  {
    id: 'staff-2',
    name: 'Дмитриева Елена Сергеевна',
    role: 'Главный хранитель музейных предметов',
    department: 'Отдел фондов и учета',
    email: 'funds@musbread.ru',
    phone: '+7 (812) 294-50-90 (доб. 104)',
    photo: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
    photoAlt: 'Дмитриева Елена Сергеевна, главный хранитель фондов'
  },
  {
    id: 'staff-3',
    name: 'Соколова Мария Владимировна',
    role: 'Ведущий научный сотрудник',
    department: 'Научно-исследовательский отдел',
    email: 'science@musbread.ru',
    phone: '+7 (812) 294-50-90 (доб. 108)',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    photoAlt: 'Соколова Мария Владимировна, ведущий научный сотрудник'
  },
  {
    id: 'staff-4',
    name: 'Ковалев Артем Николаевич',
    role: 'Руководитель экскурсионного бюро',
    department: 'Научно-просветительский отдел',
    email: 'excursions@musbread.ru',
    phone: '+7 (812) 294-50-91',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    photoAlt: 'Ковалев Артем Николаевич, руководитель экскурсионного бюро'
  }
];

export const INITIAL_DOCUMENTS: OfficialDoc[] = [
  {
    id: 'doc-1',
    title: 'Устав Санкт-Петербургского государственного бюджетного учреждения культуры «Санкт-Петербургский Музей Хлеба»',
    number: 'Приказ КК № 412-р',
    date: '14.03.2024',
    category: 'charter',
    fileSize: '2.4 МБ',
    pdfUrl: '/docs/charter-musbread.pdf',
    htmlAlternativeText: `УСТАВ СПб ГБУК «Санкт-Петербургский Музей Хлеба».
1. ОБЩИЕ ПОЛОЖЕНИЯ. 
1.1. Музей является некоммерческой организацией культуры Санкт-Петербурга.
1.2. Учредителем является город Санкт-Петербург в лице Комитета по культуре Санкт-Петербурга.
1.3. Основная цель деятельности: осуществление просветительской, научно-исследовательской и образовательной деятельности, выявление, собирание, хранение и публикация музейных предметов по истории хлебопечения, зернового хозяйства и кулинарной культуры.
1.4. Место нахождения: 195009, Санкт-Петербург, ул. Михайлова, дом 2.`
  },
  {
    id: 'doc-2',
    title: 'Паспорт доступности для инвалидов и других маломобильных групп населения объекта социальной инфраструктуры',
    number: 'ПД-2026/02',
    date: '15.01.2026',
    category: 'accessibility',
    fileSize: '1.8 МБ',
    pdfUrl: '/docs/accessibility-passport.pdf',
    htmlAlternativeText: `ПАСПОРТ ДОСТУПНОСТИ ОБЪЕКТА ДЛЯ ИНВАЛИДОВ (в соответствии с ГОСТ Р 70176-2022 и Постановлением Правительства РФ от 07.02.2026 № 102).
1. Адрес объекта: Санкт-Петербург, ул. Михайлова, д. 2.
2. Состояние доступности основных структурно-функциональных зон:
- Вход в здание (входная группа): оборудован пандусом с уклоном 1:20, поручнями, кнопкой вызова дежурного персонала со шрифтом Брайля.
- Пути движения внутри здания: беспороговые переходы, ширина коридоров от 1.5м, лифтовой подъемник на 2-й этаж.
- Санитарно-гигиенические помещения: оборудованы поручнями, тактильными знаками и системой тревожного вызова.
- Экспозиционные залы: тактильные реплики 12 ключевых экспонатов, аудиогиды с тифлокомментариями на русском языке, индукционные петли для слабослышащих.`
  },
  {
    id: 'doc-3',
    title: 'План финансово-хозяйственной деятельности учреждения на 2026 год и плановый период 2027–2028 гг.',
    number: 'ПФХД-2026',
    date: '10.01.2026',
    category: 'financial',
    fileSize: '3.1 МБ',
    pdfUrl: '/docs/finance-plan-2026.pdf',
    htmlAlternativeText: `ПЛАН ФИНАНСОВО-ХОЗЯЙСТВЕННОЙ ДЕЯТЕЛЬНОСТИ НА 2026 ГОД.
Утвержден Комитетом по культуре Санкт-Петербурга.
Субсидии на выполнение государственного задания: 48 500 000 руб.
Поступления от оказания платных услуг (билеты, экскурсии, лекторий): 14 200 000 руб.
Расходы на сохранение музейного фонда и научную работу: 18 100 000 руб.`
  },
  {
    id: 'doc-4',
    title: 'Положение о порядке льготного посещения и возврата билетов в СПб ГБУК «Санкт-Петербургский Музей Хлеба»',
    number: 'Приказ директора № 12/од',
    date: '02.02.2026',
    category: 'charter',
    fileSize: '1.1 МБ',
    pdfUrl: '/docs/ticket-rules-2026.pdf',
    htmlAlternativeText: `ПРАВИЛА ЛЬГОТНОГО ПОСЕЩЕНИЯ И ВОЗВРАТА БИЛЕТОВ.
1. Право бесплатного посещения имеют: Герои РФ, участники ВОВ и СВО, инвалиды I и II групп с одним сопровождающим, дети до 7 лет, сотрудники музеев РФ.
2. Льготный билет со скидкой 50%: школьники, студенты дневных отделений ВУЗов РФ, пенсионеры.
3. Порядок возврата билетов:
- Не позднее чем за 10 дней до даты визита: возврат 100% стоимости;
- Менее чем за 10 дней, но не позднее 5 дней: возврат 50% стоимости;
- Менее чем за 5 дней, но не позднее 3 дней: возврат 30% стоимости;
- Менее чем за 3 дня: возврат не производится (кроме случаев документально подтвержденной болезни).`
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'В Музее Хлеба открылась обновленная экспозиция «Блокадный хлеб Ленинграда»',
    titleEn: 'Updated Siege Bread Exhibition Opened',
    date: '10 октября 2026',
    summary: 'В зале представлены отреставрированные архивные дневники сотрудников ленинградских хлебозаводов и интерактивная карта поставок муки по Дороге Жизни.',
    contentHtml: `<p>10 октября 2026 года в Санкт-Петербургском Музее Хлеба состоялась торжественная презентация обновленного зала мемориальной экспозиции, посвященной подвигу ленинградских хлебопеков в годы Великой Отечественной войны.</p><p>Благодаря кропотливой исследовательской работе научных сотрудников экспозиция пополнилась подлинными образцами компонентов знаменитого блокадного рецепта: дефростированной соевой муки, жмыха, целлюлозы и обойной пыли. Посетители могут ознакомиться с документальными воспоминаниями жителей осажденного города.</p>`,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Витрина обновленной мемориальной экспозиции блокадного хлеба',
    published: true,
    metaTitle: 'Открытие обновленной экспозиции Блокадный хлеб — Музей Хлеба',
    metaDesc: 'В Санкт-Петербургском Музее Хлеба открылась обновленная мемориальная экспозиция к подвигу хлебопеков.',
    h1: 'В Музее Хлеба открылась обновленная экспозиция «Блокадный хлеб Ленинграда»'
  },
  {
    id: 'news-2',
    title: 'Музей присоединился к всероссийской акции «Ночь Искусств 2026»',
    titleEn: 'Museum Joins All-Russian Night of the Arts 2026',
    date: '03 октября 2026',
    summary: 'Специальная вечерняя программа с театрализованными экскурсиями, запахом свежевыпеченного ржаного хлеба и чаепитием по купеческим традициям.',
    contentHtml: `<p>В первую субботу ноября Музей Хлеба распахнет свои двери до 23:00. Гостей ждут ночные экскурсии при свете старинных керосиновых фонарей, мастер-классы по выпечке печатных пряников и акустический концерт романсов в залах исторического особняка Пастухова.</p>`,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Особняк музея в вечерней художественной подсветке',
    published: true,
    metaTitle: 'Ночь искусств 2026 в Музее Хлеба СПб',
    metaDesc: 'Специальная вечерняя программа в Музее Хлеба Санкт-Петербурга в рамках Ночи Искусств.',
    h1: 'Музей присоединился к всероссийской акции «Ночь Искусств 2026»'
  },
  {
    id: 'news-3',
    title: 'Выставка старинных пряничных досок отправляется в Выборг',
    titleEn: 'Gingerbread Carved Boards Traveling to Vyborg',
    date: '28 сентября 2026',
    summary: 'Передвижной проект познакомит жителей Выборгского замка с коллекцией резных досок мастеров Русского Севера из фондов Музея Хлеба.',
    contentHtml: `<p>Передвижная выставка Музея Хлеба продолжает свое путешествие по памятным городам Северо-Запада России. В Выборгском замке будут выставлены 40 уникальных деревянных досок, использовавшихся для выпечки подарочных пряников в XVII–XIX веках.</p>`,
    image: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Старинные пряничные доски, упакованные для передвижной выставки',
    published: true,
    metaTitle: 'Передвижная выставка Музея Хлеба в Выборге',
    metaDesc: 'Экспонаты Музея Хлеба Санкт-Петербурга представлены в Выборгском государственном музее-заповеднике.',
    h1: 'Выставка старинных пряничных досок отправляется в Выборг'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-12 11:24:10',
    user: 'editor_sokolova',
    role: 'editor',
    action: 'Отредактирована статья афиши',
    target: 'ev-1: Обзорная экскурсия',
    ipAddress: '192.168.10.42 (Доверенный контур)',
    status: 'success'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-12 10:15:02',
    user: 'admin_sys',
    role: 'admin',
    action: 'Синхронизация с публичным сервером',
    target: 'SHA256: 7f83b1657ff1... (Успешно)',
    ipAddress: '192.168.10.1 (Шлюз CMS MoonShine)',
    status: 'success'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-12 09:30:18',
    user: 'editor_dmitrieva',
    role: 'editor',
    action: 'Создан документ для публикации',
    target: 'doc-2: Паспорт доступности ГОСТ Р 70176-2022',
    ipAddress: '192.168.10.35 (Доверенный контур)',
    status: 'success'
  },
  {
    id: 'log-4',
    timestamp: '2026-10-11 18:02:44',
    user: 'unknown_scanner',
    role: 'guest',
    action: 'Заблокирована попытка прямого POST к /admin/cms',
    target: 'Внешний контур — Защищено Nginx WAF',
    ipAddress: '185.220.101.5',
    status: 'warn'
  }
];

export const INITIAL_CONTOUR_SYNC: ContourSyncState = {
  lastSyncTimestamp: '2026-10-12 10:15:02 MSK',
  lastSyncChecksum: '9a3f8b0e77d2c1f938b0021e89bca74e2d0912fa',
  pendingChangesCount: 0,
  contourStatus: 'synchronized',
  serverEnvironment: 'isolated_internal'
};
