import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Calendar,
  Award,
  ExternalLink,
  FileText,
  Search,
  CheckCircle,
  FileCheck
} from 'lucide-react';

export const ScienceView: React.FC = () => {
  const { currentPath, navigate, collection } = useApp();
  const subRoute = currentPath.split('/')[2] || 'collection';

  const subNavItems = [
    { id: 'collection', title: 'Коллекция музея' },
    { id: 'seminars', title: 'Семинары и конференции' },
    { id: 'publications', title: 'Публикации' },
    { id: 'researchers', title: 'Исследователям' },
    { id: 'materials', title: 'Материалы по теме' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
          Раздел «Наука»
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
          Научно-исследовательская деятельность
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Фондовые коллекции, академические издания, конференции и работа с исследователями
        </p>
      </div>

      {/* Subnavigation */}
      <div className="border-b border-[#E0D5C1] pb-3 flex items-center gap-2 overflow-x-auto">
        {subNavItems.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(`/science/${item.id}`)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              subRoute === item.id
                ? 'bg-[#8C4A1D] text-white shadow-sm'
                : 'bg-[#FAF6EE] text-[#5C4A3E] hover:bg-[#EFE8DC]'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* TAB: COLLECTION WITH GOSKATALOG BUTTON (ТЗ 2.2.3.6.1) */}
      {subRoute === 'collection' && (
        <div className="space-y-6">
          {/* Goskatalog Official Banner */}
          <div className="p-5 bg-[#2C241E] text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#4D3A29]">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-300 flex-shrink-0" />
              <div>
                <div className="font-serif font-bold text-base sm:text-lg">
                  Государственный каталог Музейного Фонда РФ
                </div>
                <div className="text-xs text-[#C8BCAB]">
                  Все зарегистрированные музейные предметы СПб ГБУК «Санкт-Петербургский Музей Хлеба»
                </div>
              </div>
            </div>
            <a
              href="https://goskatalog.ru/portal/#/collections?museumId=2636"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow"
            >
              <span>Открыть страницу музея в Госкаталоге</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collection.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-sm p-5 flex flex-col sm:flex-row gap-5"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full sm:w-44 h-44 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#8C4A1D] block">
                      {item.invNumber}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#2C241E] mt-1">
                      {item.title}
                    </h3>
                    <div className="text-[11px] text-gray-500 mt-1">
                      {item.era} · {item.material}
                    </div>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <a
                    href={item.goskatalogUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#8C4A1D] hover:underline font-bold flex items-center gap-1 pt-2 border-t border-gray-100"
                  >
                    <span>Карточка в Госкаталоге РФ</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SEMINARS & CONFERENCES */}
      {subRoute === 'seminars' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Ежегодные научные конференции и семинары
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Всероссийские Пастуховские чтения: «Культура хлеба в истории России»',
                date: '14–15 ноября 2026 г.',
                desc: 'Пленарные заседания, секции по этнографии восточнославянского земледелия, истории промышленного хлебопечения и вопросам атрибуции музейных предметов.'
              },
              {
                title: 'Научно-практический круглый стол: «Блокадный хлеб: новые архивные открытия»',
                date: '26 января 2026 г.',
                desc: 'Обсуждение рассекреченных документов Государственного комитета обороны и дневников сотрудников ленинградских хлебозаводов № 12, 14 и 16.'
              }
            ].map((sem, i) => (
              <div key={i} className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-2">
                <span className="text-xs font-bold text-[#8C4A1D]">{sem.date}</span>
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">{sem.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{sem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: PUBLICATIONS */}
      {subRoute === 'publications' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Научные публикации и монографии сотрудников
          </h2>
          <div className="space-y-4">
            {[
              {
                title: '«Трудовой подвиг ленинградских пекарей в 1941–1944 гг.»',
                author: 'Чернецова М. В., Иванов А. П.',
                year: 'СПб.: Музей Хлеба, 2025. — 240 с.',
                desc: 'Фундаментальное монографическое исследование на основе неопубликованных фондовых материалов.'
              },
              {
                title: '«Каталог резных пряничных досок из собрания Музея Хлеба XVIII — нач. XX вв.»',
                author: 'Соколова М. В., Дмитриева Е. С.',
                year: 'СПб.: Аврора, 2024. — 184 с.',
                desc: 'Полный научный каталог 120 резных досок с описанием иконографии и региональных техник резьбы.'
              }
            ].map((pub, i) => (
              <div key={i} className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-1.5">
                <h3 className="font-serif font-bold text-base text-[#2C241E]">{pub.title}</h3>
                <div className="text-xs text-[#8C4A1D] font-medium">{pub.author} ({pub.year})</div>
                <p className="text-xs text-gray-600">{pub.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: RESEARCHERS */}
      {subRoute === 'researchers' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Информация для исследователей
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Научный архив и фонды Музея Хлеба открыты для работы историков, аспирантов, реставраторов и краеведов. Работа в читальном зале архива осуществляется по предварительной заявке на имя директора музея.
          </p>
          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-2 text-xs">
            <div className="font-bold text-[#2C241E]">Порядок направления запроса:</div>
            <ol className="list-decimal pl-4 space-y-1 text-gray-600">
              <li>Официальное отношение от направляющей организации (университета, НИИ или издательства).</li>
              <li>Указание темы исследования, хронологических рамок и требуемых групп источников.</li>
              <li>Срок рассмотрения заявки — не более 5 рабочих дней.</li>
            </ol>
            <div className="pt-2 text-gray-500">
              Запросы направлять на адрес: <code className="text-[#8C4A1D]">science@musbread.ru</code>
            </div>
          </div>
        </div>
      )}

      {/* TAB: HISTORICAL MATERIALS */}
      {subRoute === 'materials' && (
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            Материалы по истории хлебопечения
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Электронные копии дореволюционных прейскурантов, ГОСТов советского периода и кулинарных книг из библиотеки музея.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
              <div className="font-bold text-[#2C241E] mb-1">Прейскурант булочной Филиппова (1898 г.)</div>
              <div className="text-gray-500">Электронная копия архивного буклета с сортами сайки и калачей.</div>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
              <div className="font-bold text-[#2C241E] mb-1">Рецептура хлеба Бородинского ГОСТ 2077-84</div>
              <div className="text-gray-500">Технологическая инструкция и рецептура со ржаным ферментированным солодом.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
