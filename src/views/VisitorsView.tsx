import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  MapPin,
  Ticket,
  CreditCard,
  Compass,
  ShoppingBag,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ExternalLink,
  Volume2
} from 'lucide-react';

export const VisitorsView: React.FC = () => {
  const { currentPath, navigate, setIsTicketModalOpen } = useApp();
  const subRoute = currentPath.split('/')[2] || 'plan';

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const subNavItems = [
    { id: 'plan', title: 'Спланировать визит', icon: Clock },
    { id: 'tickets-info', title: 'Билеты и льготы', icon: Ticket },
    { id: 'pushkin-card', title: 'Пушкинская карта', icon: CreditCard },
    { id: 'accessible', title: 'Доступная среда', icon: Compass },
    { id: 'shop', title: 'Магазин музея', icon: ShoppingBag },
    { id: 'faq', title: 'Частые вопросы', icon: HelpCircle }
  ];

  const faqs = [
    {
      q: 'Нужно ли покупать билет заранее онлайн или можно в кассе?',
      a: 'Билеты можно приобрести как онлайн на нашем сайте (рекомендуется для избежания очередей и гарантии сеанса), так и в кассе музея в день посещения до 17:00.'
    },
    {
      q: 'Можно ли посетить музей с детской коляской?',
      a: 'Да! В музее оборудован пологий пандус при входе, просторные коридоры и современный лифт-подъемник на второй этаж. Для удобства родителей предусмотрено место для парковки колясок в гардеробе.'
    },
    {
      q: 'Как работает Пушкинская карта?',
      a: 'Граждане РФ в возрасте от 14 до 22 лет могут оформить входной билет на постоянную экспозицию, временные выставки и мастер-классы за счет средств государственной субсидии Пушкинской карты.'
    },
    {
      q: 'Разрешена ли фотосъемка в залах?',
      a: 'Любительская фото- и видеосъемка на смартфоны и фотоаппараты без использования вспышки и штативов разрешена бесплатно во всех залах постоянной экспозиции.'
    },
    {
      q: 'Как заказать экскурсию для школьного класса?',
      a: 'Вы можете заполнить онлайн-форму «Заявка на экскурсию» в разделе «Экскурсии» или позвонить в наше экскурсионное бюро по телефону +7 (812) 294-50-91.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
          Раздел «Посетителям»
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
          {subNavItems.find(s => s.id === subRoute)?.title || 'Посетителям'}
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
                onClick={() => navigate(`/visitors/${item.id}`)}
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

      {/* TAB: PLAN YOUR VISIT */}
      {subRoute === 'plan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-[#E8DFC8] space-y-2">
              <Clock className="w-6 h-6 text-[#8C4A1D]" />
              <h3 className="font-serif font-bold text-base text-[#2C241E]">Часы работы</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Вторник — Воскресенье: с 10:00 до 18:00.<br />
                Касса и вход в залы закрываются в 17:00.<br />
                <span className="text-rose-700 font-bold">Понедельник — выходной день.</span>
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8DFC8] space-y-2">
              <MapPin className="w-6 h-6 text-[#8C4A1D]" />
              <h3 className="font-serif font-bold text-base text-[#2C241E]">Адрес и метро</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                195009, Санкт-Петербург, ул. Михайлова, д. 2.<br />
                7 минут пешком от ст. метро «Площадь Ленина» и Финляндского вокзала.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8DFC8] space-y-2">
              <Ticket className="w-6 h-6 text-[#8C4A1D]" />
              <h3 className="font-serif font-bold text-base text-[#2C241E]">Билеты</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Входной взрослый: 300 ₽.<br />
                Школьный, студенческий, пенсионеры: 150 ₽.<br />
                Дети до 7 лет и ветераны: бесплатно.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#2C241E]">
              Правила посещения Санкт-Петербургского Музея Хлеба
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 leading-relaxed">
              <div className="space-y-2">
                <div className="font-bold text-gray-900">Посетители обязаны:</div>
                <ul className="space-y-1.5 list-disc pl-4 text-gray-600">
                  <li>Сдавать в гардероб верхнюю одежду, зонты, рюкзаки и крупногабаритные сумки.</li>
                  <li>Сохранять входной билет или электронный QR-код до окончания осмотра.</li>
                  <li>Соблюдать тишину и общественный порядок в экспозиционных залах.</li>
                  <li>Бережно относиться к музейным предметам и элементам интерьера.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-gray-900">В музее запрещается:</div>
                <ul className="space-y-1.5 list-disc pl-4 text-gray-600">
                  <li>Прикасаться к экспонатам (за исключением интерактивных зон с пометкой).</li>
                  <li>Проносить продукты питания и напитки (кроме питьевой воды в закрытой таре).</li>
                  <li>Использовать фотовспышку и моноподы для селфи.</li>
                  <li>Проводить экскурсии лицам, не являющимся сотрудниками музея.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: TICKETS & BENEFITS */}
      {subRoute === 'tickets-info' && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E8DFC8] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#2C241E]">
                  Прейскурант цен на входные билеты
                </h2>
                <div className="text-xs text-gray-500">
                  Утвержден Приказом директора СПб ГБУК «Санкт-Петербургский Музей Хлеба»
                </div>
              </div>
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="px-6 py-2.5 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold shadow transition"
              >
                Купить билет онлайн
              </button>
            </div>

            <div className="space-y-3">
              {[
                { cat: 'Взрослые граждане РФ и ЕАЭС', price: '300 ₽', note: 'Полный входной билет на постоянную экспозицию' },
                { cat: 'Пенсионеры РФ', price: '150 ₽', note: 'При предъявлении пенсионного удостоверения' },
                { cat: 'Студенты вузов дневной формы обучения', price: '150 ₽', note: 'При предъявлении студенческого билета' },
                { cat: 'Школьники (от 7 до 17 лет)', price: '150 ₽', note: 'Учащиеся общеобразовательных учреждений РФ' },
                { cat: 'Дети до 7 лет', price: 'Бесплатно', note: 'В сопровождении взрослых' },
                { cat: 'Инвалиды I и II групп + 1 сопровождающий', price: 'Бесплатно', note: 'Внеочередное обслуживание, справка МСЭ' },
                { cat: 'Герои РФ, Ветераны ВОВ, участники СВО', price: 'Бесплатно', note: 'При предъявлении удостоверения' }
              ].map((row, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-[#FAF7F2] rounded-lg border border-[#E8DFC8] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#2C241E] block">{row.cat}</span>
                    <span className="text-gray-500 text-[11px]">{row.note}</span>
                  </div>
                  <span className="font-bold text-sm text-[#8C4A1D] flex-shrink-0 ml-4">
                    {row.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Refund rules note (ТЗ 2.2.3.6.1) */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Порядок возврата билетов (Федеральный закон № 193-ФЗ):</span>
              </div>
              <p className="leading-relaxed">
                Возврат билетов осуществляется по письменному заявлению либо через форму на сайте:
                не позднее 10 дней до даты посещения — 100% стоимости; от 10 до 5 дней — 50%;
                от 5 до 3 дней — 30%. В день посещения возврат не производится (за исключением документально подтвержденных форс-мажорных обстоятельств).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PUSHKIN CARD */}
      {subRoute === 'pushkin-card' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold text-xl shadow">
              💳
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
                Всероссийская программа «Пушкинская карта»
              </h2>
              <div className="text-xs text-amber-800 font-semibold">
                Для граждан России от 14 до 22 лет
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            Санкт-Петербургский Музей Хлеба является официальным участником программы популяризации культурных мероприятий «Пушкинская карта». Вы можете бесплатно посетить экспозицию, тематические выставки и научные лекции за счет средств государственного баланса карты.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-1.5 text-xs">
              <div className="font-bold text-[#8C4A1D]">1. Оформите карту</div>
              <div className="text-gray-600">
                Зарегистрируйтесь на портале «Госуслуги» и выпустите виртуальную карту в приложении «Госуслуги Культура».
              </div>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-1.5 text-xs">
              <div className="font-bold text-[#8C4A1D]">2. Выберите событие</div>
              <div className="text-gray-600">
                В нашей афише все программы, доступные по программе, отмечены специальным золотым знаком.
              </div>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-1.5 text-xs">
              <div className="font-bold text-[#8C4A1D]">3. Оплатите онлайн</div>
              <div className="text-gray-600">
                При покупке билета на сайте выберите пункт «Оплата Пушкинской картой» и введите реквизиты карты.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-start">
            <button
              onClick={() => setIsTicketModalOpen(true)}
              className="px-6 py-3 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold shadow transition"
            >
              Купить билет по Пушкинской карте
            </button>
          </div>
        </div>
      )}

      {/* TAB: ACCESSIBLE ENVIRONMENT (ГОСТ Р 70176-2022) */}
      {subRoute === 'accessible' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow">
              ♿
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
                Доступная среда и инклюзивность
              </h2>
              <div className="text-xs text-emerald-800 font-semibold">
                Соответствие ГОСТ Р 70176-2022 и Постановлению Правительства РФ № 102
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            Музей Хлеба стремится быть максимально открытым и комфортным для каждого гостя. Пространство особняка Пастухова адаптировано для посетителей с инвалидностью и маломобильных граждан.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-2">
              <div className="font-bold text-[#2C241E] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Для посетителей на инвалидных колясках</span>
              </div>
              <ul className="space-y-1 list-disc pl-4 text-gray-600">
                <li>Пандус с пологим уклоном у главного входа с кнопкой вызова сотрудника.</li>
                <li>Автоматический вертикальный подъемник на второй этаж.</li>
                <li>Широкие дверные проемы (более 100 см) без порогов.</li>
                <li>Специально оборудованная санитарная комната с поручнями и кнопкой вызова помощи.</li>
              </ul>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-2">
              <div className="font-bold text-[#2C241E] flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Для незрячих и слабовидящих посетителей</span>
              </div>
              <ul className="space-y-1 list-disc pl-4 text-gray-600">
                <li>Тактильная мнемосхема музейного пространства на входе.</li>
                <li>12 тактильных моделей экспонатов (жернова, русская печь, формы куличей, пряничные доски).</li>
                <li>Аудиогиды со специализированными тифлокомментариями.</li>
                <li>Официальные документы доступны в машиночитаемом формате HTML на сайте.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB: MUSEUM SHOP (Without online sales, showroom only per ТЗ 2.2.3.6.1) */}
      {subRoute === 'shop' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            Примечание (ТЗ 2.2.3.6.1): Витрина сувенирной продукции без функции онлайн-продажи. Все товары можно приобрести в музейном киоске при входе.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Книга «Хлебная летопись Санкт-Петербурга»',
                price: '950 ₽',
                desc: 'Иллюстрированная монография научных сотрудников музея с уникальными архивными фотографиями пекарен.',
                img: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Реплика резной пряничной доски «Птица Сирин»',
                price: '1 600 ₽',
                desc: 'Точная деревянная копия экспоната XIX века из массива липы для домашней выпечки печатных пряников.',
                img: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Набор памятных открыток «Блокадный хлеб»',
                price: '350 ₽',
                desc: '12 архивных открыток с документами, фотографиями сотрудников хлебозаводов и карточками 1941–1944 гг.',
                img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80'
              }
            ].map((prod, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-sm p-4 space-y-3">
                <img src={prod.img} alt={prod.title} className="w-full h-44 rounded-lg object-cover" />
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2C241E]">{prod.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{prod.desc}</p>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-bold text-[#8C4A1D] text-sm">{prod.price}</span>
                  <span className="text-[11px] text-gray-400">В наличии в кассе</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: FAQ */}
      {subRoute === 'faq' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#2C241E] mb-4">
            Часто задаваемые вопросы (FAQ)
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="border border-[#E8DFC8] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-serif font-bold text-base text-[#2C241E] flex items-center justify-between bg-[#FAF7F2] hover:bg-[#F2ECE1] transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-[#E8DFC8]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
