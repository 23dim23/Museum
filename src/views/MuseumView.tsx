import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  Building,
  Layers,
  Users,
  HeartHandshake,
  FileText,
  Newspaper,
  Video,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Clock,
  Download,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Eye,
  Info
} from 'lucide-react';

export const MuseumView: React.FC = () => {
  const { currentPath, navigate, staff, officialDocs, news } = useApp();

  // Selected document for accessible modal/HTML view per Decree №102
  const [selectedDocHtml, setSelectedDocHtml] = useState<string | null>(null);
  const [selectedDocTitle, setSelectedDocTitle] = useState<string>('');

  // Extract sub-route from path
  const subRoute = currentPath.split('/')[2] || 'history';

  const subNavItems = [
    { id: 'history', title: 'История музея', icon: History },
    { id: 'building', title: 'История здания', icon: Building },
    { id: 'exposition', title: 'Экспозиция', icon: Layers },
    { id: 'team', title: 'Команда', icon: Users },
    { id: 'friends', title: 'Друзья музея', icon: HeartHandshake },
    { id: 'documents', title: 'Официальные документы', icon: FileText },
    { id: 'news', title: 'Новости', icon: Newspaper },
    { id: 'media', title: 'Медиа', icon: Video },
    { id: 'vacancies', title: 'Вакансии', icon: Briefcase },
    { id: 'contacts', title: 'Контакты', icon: MapPin }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Title & Breadcrumbs header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
          Раздел «Музей»
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
          {subNavItems.find(s => s.id === subRoute)?.title || 'О Музее'}
        </h1>
      </div>

      {/* Subnavigation Bar */}
      <div className="border-b border-[#E0D5C1] overflow-x-auto pb-2">
        <div className="flex items-center gap-1 min-w-max">
          {subNavItems.map(item => {
            const isActive = subRoute === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/museum/${item.id}`)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#8C4A1D] text-white shadow-sm'
                    : 'text-[#5C4A3E] hover:bg-[#F2ECE1] hover:text-[#2C241E]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT: HISTORY */}
      {subRoute === 'history' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <div className="prose max-w-none text-[#3D322B] text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-serif text-xl sm:text-2xl text-[#8C4A1D] font-bold leading-snug">
              Санкт-Петербургский Музей Хлеба — первый и единственный в России государственный музей, посвященный истории хлебопекарного дела и культуре потребления хлеба.
            </p>
            <p>
              Музей был основан в 1988 году как ведомственный музей объединения «Ленхлебпром». Инициаторами создания выступили ветераны хлебопекарной промышленности Ленинграда, стремившиеся увековечить трудовой подвиг ленинградских пекарей в тяжелейшие годы блокады и сохранить редчайшие образцы старинной утвари, рецептурных сборников и профессионального инструментария.
            </p>
            <p>
              В 1993 году музей получил статус государственного учреждения культуры Санкт-Петербурга. С этого момента началась масштабная собирательская и научно-исследовательская деятельность: фонды пополнились этнографическими коллекциями крестьянского земледелия Русского Севера, архивами дореволюционных кондитерских фабрик, коллекциями пряничных досок и торговых весов.
            </p>
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] my-6">
              <h3 className="font-serif font-bold text-lg text-[#2C241E] mb-2">Хроника ключевых дат музея:</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5C4A3E]">
                <li><strong className="text-[#8C4A1D]">1988 г.</strong> — Открытие первой постоянной экспозиции при объединении «Ленхлебпром» на Лиговском проспекте.</li>
                <li><strong className="text-[#8C4A1D]">1993 г.</strong> — Присвоение статуса Санкт-Петербургского государственного музея.</li>
                <li><strong className="text-[#8C4A1D]">2015 г.</strong> — Переезд музея в отреставрированный исторический особняк купца И. А. Пастухова на ул. Михайлова, 2.</li>
                <li><strong className="text-[#8C4A1D]">2026 г.</strong> — Модернизация экспозиции, открытие обновленного интерактивного пекарного зала и внедрение стандартов инклюзивности по ГОСТ Р 70176-2022.</li>
              </ul>
            </div>
            <p>
              Сегодня в собрании музея насчитывается более 14 000 единиц хранения. Экспозиция охватывает период от позднего неолита и зарождения земледелия до космического питания и современного ремесленного хлебопечения.
            </p>
          </div>
        </div>
      )}

      {/* CONTENT: BUILDING */}
      {subRoute === 'building' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed text-[#3D322B]">
              <h2 className="font-serif text-2xl font-bold text-[#8C4A1D]">
                Деревянный особняк купца И. А. Пастухова (XIX в.)
              </h2>
              <p>
                Здание музея на улице Михайлова, дом 2 (исторический угол Тихвинской улицы и Михайловского переулка) представляет собой редчайший сохранившийся образец деревянной городской застройки Санкт-Петербурга второй половины XIX века.
              </p>
              <p>
                Особняк был возведен в 1829 году и перестроен в 1860-е годы для потомственного купца 2-й гильдии Ивана Андреевича Пастухова, занимавшегося торговлей железом, хлебными поставками и мучной коммерцией на Выборгской стороне.
              </p>
              <p>
                В архитектуре особняка гармонично переплелись черты русского классицизма и эклектики: резные наличники, строгий деревянный портик, парадная анфилада комнат второго этажа с лепными плафонами и аутентичные изразцовые печи.
              </p>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-xs">
                <div className="font-bold text-[#2C241E] mb-1">Статус объекта культурного наследия:</div>
                <div className="text-gray-600">
                  Объект культурного наследия регионального значения (Распоряжение КГИОП Правительства Санкт-Петербурга № 10-184). Отреставрирован с применением историко-архитектурных методов сохранения сруба.
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <img
                src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80"
                alt="Архитектурный вид особняка Пастухова"
                className="w-full rounded-xl shadow-md border border-[#D5C6B0]"
              />
              <div className="text-[11px] text-gray-500 italic text-center">
                Исторический фасад особняка Пастухова после научной реставрации
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT: EXPOSITION */}
      {subRoute === 'exposition' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-xs sm:text-sm text-[#4A3D34]">
            Постоянная экспозиция Музея Хлеба размещена в 14 залах и построена по хронологическому и тематическому принципам. Ниже представлены ключевые экспозиционные пространства.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: 'Залы 1–3',
                title: 'От зерна к караваю: Традиционное крестьянское земледелие',
                desc: 'Обработка земли, сев, жатва, сушка снопов в овинах, помол на водяных и ветряных мельницах. Действующий макет русской печи с устьем, подпечьем и полатями.'
              },
              {
                num: 'Залы 4–6',
                title: 'Хлеб Санкт-Петербурга XVIII — начала XX века',
                desc: 'Указ Петра I о качестве хлеба и надзоре за выпечкой. Петербургские гильдии булочников: немецкие пекарни («булочники выборгские»), калашные ряды, французские бриоши и крендели.'
              },
              {
                num: 'Залы 7–8',
                title: 'Кондитерское искусство Российской империи',
                desc: 'Шоколадные и карамельные коробочки товарищества «Эйнем», «Блигкен и Робинсон», «Жорж Борман». Медные формы для шоколада и пасхальных куличей, сахарные головы.'
              },
              {
                num: 'Залы 9–10',
                title: 'Священный хлеб осажденного Ленинграда',
                desc: 'Мемориальная экспозиция. 125 блокадных граммов. Работа хлебозаводов под бомбежками, рецептуры Центральной лаборатории хлебопечения (ЦНИЛ), хлебные карточки.'
              },
              {
                num: 'Залы 11–12',
                title: 'Хлебопекарная промышленность советской эпохи',
                desc: 'Механизация процесса, знаменитые круглые хлебозаводы инженера Марсакова, сорта хлеба советского ГОСТа: «Бородинский», «Дарницкий», «Нарезной батон».'
              },
              {
                num: 'Залы 13–14',
                title: 'Космический хлеб и современное ремесленное хлебопечение',
                desc: 'Миниатюрные буханочки в герметичной упаковке для космонавтов на МКС, современные заквасочные технологии, коллекция пряничных шедевров регионов России.'
              }
            ].map((hall, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl border border-[#E8DFC8] shadow-sm hover:border-[#8C4A1D] transition space-y-2"
              >
                <span className="text-xs font-mono font-bold text-[#8C4A1D]">{hall.num}</span>
                <h3 className="font-serif text-lg font-bold text-[#2C241E]">{hall.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{hall.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: TEAM */}
      {subRoute === 'team' && (
        <div className="space-y-6">
          <div className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            Коллектив музея объединяет исследователей, хранителей фондов, реставраторов и методистов, преданных сохранению исторической памяти.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map(person => (
              <div
                key={person.id}
                className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-sm p-5 flex flex-col items-center text-center space-y-3"
              >
                <img
                  src={person.photo}
                  alt={person.photoAlt}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#D4A373] shadow-inner"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2C241E] leading-snug">
                    {person.name}
                  </h3>
                  <div className="text-xs text-[#8C4A1D] font-semibold mt-1">
                    {person.role}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    {person.department}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 w-full text-xs text-gray-600 space-y-1">
                  <div>{person.phone}</div>
                  <a href={`mailto:${person.email}`} className="text-[#8C4A1D] hover:underline block truncate">
                    {person.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: FRIENDS & PARTNERS */}
      {subRoute === 'friends' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Друзья и партнеры Музея Хлеба
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Музей активно сотрудничает с ведущими профессиональными объединениями, научно-исследовательскими институтами, высшими учебными заведениями и ремесленными гильдиями.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {[
              { title: 'Российский союз пекарей (РСП)', desc: 'Совместные просветительские программы и поддержка молодых специалистов' },
              { title: 'Санкт-Петербургский политехнический университет', desc: 'Научные исследования исторических технологий брожения и мукомолья' },
              { title: 'Государственный музей истории Санкт-Петербурга', desc: 'Межмузейные выставочные проекты к памятным датам блокады' },
              { title: 'Гильдия пекарей и кондитеров Северо-Запада', desc: 'Ежегодный осенний Праздник Хлеба и конкурсы мастерства' },
              { title: 'Центральная городская публичная библиотека им. В. В. Маяковского', desc: 'Литературно-исторический лекторий по кулинарной культуре' },
              { title: 'Государственный мемориальный музей обороны и блокады Ленинграда', desc: 'Научное сотрудничество по мемориализации подвига пекарей' }
            ].map((partner, idx) => (
              <div key={idx} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                <div className="font-serif font-bold text-sm text-[#2C241E] mb-1">{partner.title}</div>
                <div className="text-xs text-gray-600">{partner.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: OFFICIAL DOCUMENTS (ТЗ 2.2.3.6.5, Decree №102, GOST R 70176-2022) */}
      {subRoute === 'documents' && (
        <div className="space-y-6">
          <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-1">
                Требования доступности документов для инвалидов по зрению (Постановление Правительства РФ № 102 от 07.02.2026 и ГОСТ Р 70176-2022):
              </div>
              <div>
                Все размещенные официальные PDF-файлы снабжены эквивалентной по содержанию альтернативной текстовой версией в формате машиночитаемого HTML, доступной для скринридеров и программ экранного доступа.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {officialDocs.map(doc => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-[#E8DFC8] p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-[#8C4A1D] font-bold">
                    {doc.number} · {doc.date} · {doc.fileSize}
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#2C241E]">
                    {doc.title}
                  </h3>
                  <div className="text-xs text-gray-500">
                    Категория: {doc.category === 'charter' ? 'Уставные документы' : doc.category === 'accessibility' ? 'Доступная среда' : 'Финансовая отчетность'}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* HTML accessible reader button per requirement */}
                  <button
                    onClick={() => {
                      setSelectedDocTitle(doc.title);
                      setSelectedDocHtml(doc.htmlAlternativeText);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF6EE] hover:bg-[#F2ECE1] text-[#8C4A1D] border border-[#E0D5C1] text-xs font-semibold transition"
                    title="Открыть машиночитаемый текст документа (HTML-альтернатива)"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Текстовая версия (HTML)</span>
                  </button>

                  <a
                    href={doc.pdfUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Accessible HTML Document Reader Modal */}
          {selectedDocHtml && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Машиночитаемый текст документа"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <div className="bg-[#FAF7F2] text-[#2C241E] w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl border border-[#D5C6B0] flex flex-col overflow-hidden">
                <div className="p-5 bg-[#2C241E] text-white flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-amber-300 font-bold uppercase">
                      Альтернативная текстовая версия (ГОСТ Р 70176-2022)
                    </div>
                    <div className="font-serif text-lg font-bold">{selectedDocTitle}</div>
                  </div>
                  <button
                    onClick={() => setSelectedDocHtml(null)}
                    className="p-1 rounded text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 font-sans text-sm leading-relaxed whitespace-pre-line bg-white">
                  {selectedDocHtml}
                </div>
                <div className="p-4 bg-[#F2ECE1] border-t border-[#E0D5C1] flex justify-end">
                  <button
                    onClick={() => setSelectedDocHtml(null)}
                    className="px-5 py-2 rounded bg-[#8C4A1D] text-white text-xs font-semibold"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONTENT: NEWS */}
      {subRoute === 'news' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map(item => (
              <article
                key={item.id}
                className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-sm p-6 space-y-4"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-48 rounded-lg object-cover"
                />
                <div>
                  <span className="text-xs font-bold text-[#8C4A1D] block mb-1">{item.date}</span>
                  <h2 className="font-serif text-xl font-bold text-[#2C241E] leading-snug">{item.title}</h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">{item.summary}</p>
                </div>
                <div
                  className="prose prose-sm text-xs text-gray-700 pt-3 border-t border-gray-100"
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                />
              </article>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: MEDIA */}
      {subRoute === 'media' && (
        <div className="space-y-6">
          <div className="text-xs sm:text-sm text-gray-600">
            Фотолетопись, виртуальные экскурсии и видеоматериалы о жизни Санкт-Петербургского Музея Хлеба.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Видеоэкскурсия: Секреты помола зерна',
                duration: '14:20',
                img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Фильм: 125 граммов жизни — Хлебозаводы блокады',
                duration: '26:45',
                img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Мастер-класс онлайн: Традиционный ржаной хлеб',
                duration: '18:10',
                img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80'
              }
            ].map((media, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-sm group">
                <div className="relative h-44 bg-black">
                  <img src={media.img} alt="" className="w-full h-full object-cover opacity-85" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#8C4A1D]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      ▶
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                    {media.duration}
                  </span>
                </div>
                <div className="p-4 font-serif font-bold text-sm text-[#2C241E]">
                  {media.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: VACANCIES */}
      {subRoute === 'vacancies' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Вакансии в Музее Хлеба
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Мы приглашаем в команду увлеченных специалистов, готовых развивать музейное дело, работать с посетителями и сохранять культурное наследие Санкт-Петербурга.
          </p>
          <div className="space-y-4 pt-2">
            {[
              {
                title: 'Экскурсовод научно-просветительского отдела',
                salary: 'от 55 000 ₽',
                req: 'Высшее гуманитарное образование (история, культурология, музейное дело), грамотная речь, опыт работы с детскими и взрослыми группами.'
              },
              {
                title: 'Младший научный сотрудник (фонд вещественных источников)',
                salary: 'от 50 000 ₽',
                req: 'Опыт работы с КАМИС или Госкаталогом Музейного Фонда РФ, навыки атрибуции предметов быта XVIII–XX веков.'
              }
            ].map((vac, i) => (
              <div key={i} className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-serif font-bold text-base text-[#2C241E]">{vac.title}</h3>
                  <span className="text-xs font-bold text-[#8C4A1D]">{vac.salary}</span>
                </div>
                <p className="text-xs text-gray-600">{vac.req}</p>
                <div className="pt-2 text-xs text-gray-500">
                  Резюме направлять на адрес: <a href="mailto:kadry@musbread.ru" className="text-[#8C4A1D] underline">kadry@musbread.ru</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: CONTACTS */}
      {subRoute === 'contacts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8DFC8] p-6 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
                Контакты музея
              </h2>

              <ul className="space-y-4 text-xs sm:text-sm text-[#3D322B]">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8C4A1D] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Адрес:</strong>
                    <div>195009, г. Санкт-Петербург, ул. Михайлова, дом 2</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      (в 7 минутах пешком от ст. метро «Площадь Ленина» и Финляндского вокзала)
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#8C4A1D] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Режим работы:</strong>
                    <div>Вторник — Воскресенье: 10:00 – 18:00</div>
                    <div>Касса и вход в музей закрываются в 17:00</div>
                    <div className="text-xs text-rose-700 font-semibold mt-0.5">
                      Понедельник — выходной день
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#8C4A1D] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Телефоны:</strong>
                    <div>Касса и справки: <a href="tel:+78122945090" className="hover:text-[#8C4A1D] font-semibold">+7 (812) 294-50-90</a></div>
                    <div>Заказ экскурсий: <a href="tel:+78122945091" className="hover:text-[#8C4A1D] font-semibold">+7 (812) 294-50-91</a></div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#8C4A1D] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Электронная почта:</strong>
                    <div><a href="mailto:info@musbread.ru" className="text-[#8C4A1D] hover:underline">info@musbread.ru</a></div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Interactive Map & Route Scheme */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8DFC8] p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2C241E]">
                Как добраться на общественном транспорте
              </h3>
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFC8] text-xs leading-relaxed space-y-2">
                <p>
                  <strong>От станции метро «Площадь Ленина» (выход на Боткинскую ул.):</strong>
                  <br />Пешком 500 метров прямо по улице Михайлова в сторону Арсенальной набережной. Особняк Пастухова находится по левой стороне (зеленовато-бежевый деревянный фасад).
                </p>
                <p>
                  <strong>Наземным транспортом:</strong>
                  <br />Автобусы № 28, 37, 106, 107 до остановки «Финляндский вокзал / ул. Комсомола».
                </p>
                <p>
                  <strong>Парковка для инвалидов:</strong>
                  <br />Оборудовано выделенное парковочное место с разметкой непосредственно у входа в музей (со стороны Михайловского переулка).
                </p>
              </div>

              {/* Map Illustration / Visual schema */}
              <div className="h-64 rounded-xl bg-[#EFE8DC] border border-[#D5C6B0] flex flex-col items-center justify-center p-6 text-center text-gray-700">
                <MapPin className="w-10 h-10 text-[#8C4A1D] mb-2 animate-bounce" />
                <div className="font-serif font-bold text-base text-[#2C241E]">
                  Санкт-Петербург, ул. Михайлова, д. 2
                </div>
                <div className="text-xs text-gray-500 max-w-sm mt-1">
                  Координаты GPS: 59.957582, 30.360184 · Остановка «Улица Михайлова»
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
