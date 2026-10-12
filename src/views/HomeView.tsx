import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Ticket,
  Calendar,
  Compass,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    navigate,
    events,
    exhibitions,
    news,
    setIsTicketModalOpen,
    setIsTourModalOpen,
    setSelectedEventForTicket,
    language
  } = useApp();

  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
      title: 'Зал традиционного крестьянского хлебопечения',
      desc: 'Русская печь, деревянные квашни, ухваты, лопаты для посадки хлеба и вековые зернотерки',
      alt: 'Экспозиционный зал традиционной русской избы с печью, лопатой для хлеба и старинной утварью'
    },
    {
      url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1200&q=80',
      title: 'Мемориальный зал: «Блокадный хлеб Ленинграда»',
      desc: 'Подлинные 125 граммов хлебной пайки, хлебные карточки зимы 1941–1942 гг., дневники пекарей',
      alt: 'Витрина с памятным куском блокадного хлеба весом 125 граммов на весах'
    },
    {
      url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80',
      title: 'Петербургская кондитерская и булочная XIX века',
      desc: 'Атмосфера столичной кондитерской: медные формы, изящные коробки товариществ «Жорж Борман» и «Эйнем»',
      alt: 'Интерьер старинной кондитерской лавки с латунными весами и кондитерскими формами'
    },
    {
      url: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=1200&q=80',
      title: 'Коллекция резных пряничных досок',
      desc: 'Шедевры городецких, вяземских и вологодских резчиков по дереву XVIII–XX веков',
      alt: 'Резная деревянная доска с изображением птицы для формования печатного пряника'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section
        className="relative bg-[#261C14] text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden border-b-4 border-[#8C4A1D]"
        aria-label="Главный баннер музея"
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3D2C1D] border border-[#6E5035] text-amber-300 text-xs tracking-wider uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Единственный в России музей хлеба · Основан в 1988 г.</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">
              {language === 'ru'
                ? 'История хлеба — от древнего зерна до символа жизни'
                : 'History of Bread — From Ancient Grain to Symbol of Life'}
            </h1>

            <p className="text-sm sm:text-base text-[#D4C6B4] max-w-2xl leading-relaxed">
              Погрузитесь в историю великого ремесла: 14 залов постоянной экспозиции в историческом особняке купца Пастухова на Выборгской стороне, уникальная мемориальная коллекция блокадного Ленинграда и интерактивные мастер-классы.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#8C4A1D] hover:bg-[#A35622] text-white font-semibold text-sm shadow-lg transition-transform active:scale-95"
              >
                <Ticket className="w-4 h-4 text-amber-200" />
                <span>Купить входной билет</span>
              </button>

              <button
                onClick={() => setIsTourModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-[#3D2C1D] hover:bg-[#4E3925] text-white border border-[#6E5035] text-sm font-medium transition"
              >
                <Compass className="w-4 h-4 text-[#D4A373]" />
                <span>Записаться на экскурсию</span>
              </button>

              <button
                onClick={() => navigate('/visitors/pushkin-card')}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline font-medium px-2 py-1"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Пушкинская карта</span>
              </button>
            </div>

            {/* Key Visit Info Strip */}
            <div className="pt-6 border-t border-[#4A3728] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#C2B29D]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">Вт–Вс 10:00–18:00</div>
                  <div>Касса до 17:00 (Пн — вых.)</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">ул. Михайлова, 2</div>
                  <div>м. «Площадь Ленина»</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Ticket className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">Билеты от 150 ₽</div>
                  <div>Льготы и бесплатный вход</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Featured Exhibition Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#1C140E] border border-[#523B28] rounded-2xl p-5 shadow-2xl relative">
              <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <img
                  src={exhibitions[0]?.image || galleryImages[0].url}
                  alt={exhibitions[0]?.imageAlt || 'Экспозиция'}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {exhibitions[0]?.pushkinCard && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-amber-500 text-black text-[11px] font-bold shadow">
                    Пушкинская карта
                  </span>
                )}
              </div>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                Главная выставка сезона
              </div>
              <h2 className="font-serif text-xl font-bold text-white mb-2">
                {exhibitions[0]?.title}
              </h2>
              <p className="text-xs text-[#B8A995] line-clamp-2 mb-4 leading-relaxed">
                {exhibitions[0]?.description}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[#3D2C1D]">
                <span className="text-xs text-gray-400">{exhibitions[0]?.dates}</span>
                <button
                  onClick={() => navigate('/exhibitions/current')}
                  className="text-xs text-amber-300 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Подробнее</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Gallery of Exposition Halls (ТЗ 2.2.3.6.1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" aria-labelledby="gallery-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
              Экспозиционные залы
            </div>
            <h2 id="gallery-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#2C241E]">
              Фотогалерея музейной экспозиции
            </h2>
          </div>
          <button
            onClick={() => navigate('/museum/exposition')}
            className="text-xs font-bold text-[#8C4A1D] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Все 14 залов музея</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Big featured gallery stage */}
        <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 relative h-72 sm:h-96 lg:h-[420px] bg-black">
              <img
                src={galleryImages[galleryActiveIndex].url}
                alt={galleryImages[galleryActiveIndex].alt}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="image-accessible-alt hidden">
                {galleryImages[galleryActiveIndex].alt}
              </div>
            </div>
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF6EE]">
              <div>
                <span className="text-xs font-mono text-[#8C4A1D] font-bold">
                  Зал {galleryActiveIndex + 1} из {galleryImages.length}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241E] mt-2 mb-3">
                  {galleryImages[galleryActiveIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
                  {galleryImages[galleryActiveIndex].desc}
                </p>
              </div>

              {/* Thumbnails switcher */}
              <div className="pt-6 border-t border-[#E8DFC8] space-y-2">
                <div className="text-xs font-semibold text-[#705D50]">Выберите зал:</div>
                <div className="grid grid-cols-4 gap-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryActiveIndex(idx)}
                      className={`h-14 rounded-lg overflow-hidden border-2 transition ${
                        galleryActiveIndex === idx
                          ? 'border-[#8C4A1D] ring-2 ring-[#8C4A1D]/20 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Переключить на ${img.title}`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiled Afisha Section (ТЗ 2.2.3.6.1 & 2.2.3.8.2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" aria-labelledby="afisha-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
              Ближайшие программы
            </div>
            <h2 id="afisha-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#2C241E]">
              Афиша событий и экскурсий
            </h2>
          </div>
          <button
            onClick={() => navigate('/events/all')}
            className="text-xs font-bold text-[#8C4A1D] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Смотреть всю афишу</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tiled Grid per Section 2.2.3.8.2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map(ev => (
            <div
              key={ev.id}
              className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={ev.image}
                  alt={ev.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="image-accessible-alt hidden">{ev.imageAlt}</div>

                {ev.pushkinCard && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-amber-500 text-black text-[10px] font-bold shadow">
                    Пушкинская карта
                  </span>
                )}
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 text-white text-[11px] font-mono">
                  {ev.ageLimit}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] font-semibold text-[#8C4A1D] uppercase tracking-wider">
                    {ev.date} · {ev.time}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2C241E] mt-1 group-hover:text-[#8C4A1D] transition-colors leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">Стоимость:</span>
                    <span className="font-bold text-[#8C4A1D] text-sm">{ev.price} ₽</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEventForTicket(ev);
                      setIsTicketModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold transition"
                  >
                    Купить билет
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Building & History Highlight */}
      <section className="bg-[#FAF3E8] border-y border-[#E8DFC8] py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md border border-[#D5C6B0]">
            <img
              src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1000&q=80"
              alt="Исторический фасад деревянного особняка купца Пастухова"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D]">
              Памятник деревянного зодчества Санкт-Петербурга
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C241E]">
              Особняк купца И. А. Пастухова на Выборгской стороне
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
              Музей располагается в уникальном отреставрированном деревянном особняке второй половины XIX века по адресу ул. Михайлова, дом 2. Здание сохранило подлинную атмосферу купеческого Петербурга, парадную лестницу и исторические своды.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>14 тематических залов с мультимедийными гидами</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>Полная безбарьерная среда (пандусы, подъемники, ГОСТ)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>Интерактивная русская печь и мастерская пекаря</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>Мемориальная коллекция блокадных хлебных карточек</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => navigate('/museum/building')}
                className="px-5 py-2.5 rounded-lg bg-[#3D2C1D] text-white hover:bg-[#523C27] text-xs font-semibold transition flex items-center gap-2"
              >
                <span>Узнать историю здания</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Museum News (ТЗ 2.2.3.6.1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" aria-labelledby="news-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
              Жизнь музея
            </div>
            <h2 id="news-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#2C241E]">
              Новости и публикации
            </h2>
          </div>
          <button
            onClick={() => navigate('/museum/news')}
            className="text-xs font-bold text-[#8C4A1D] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Все новости</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map(item => (
            <article
              key={item.id}
              className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group cursor-pointer"
              onClick={() => navigate('/museum/news')}
            >
              <div className="h-44 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="image-accessible-alt hidden">{item.imageAlt}</div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 block mb-1">
                    {item.date}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#2C241E] group-hover:text-[#8C4A1D] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#8C4A1D] font-bold">
                  <span>Читать полностью</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
