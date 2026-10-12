import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, Ticket, Filter, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';

export const EventsView: React.FC = () => {
  const { currentPath, navigate, events, setIsTicketModalOpen, setSelectedEventForTicket } = useApp();

  const subRoute = currentPath.split('/')[2] || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (subRoute === 'excursions') return 'excursion';
    if (subRoute === 'kids') return 'kids';
    if (subRoute === 'exhibitions') return 'exhibition';
    if (subRoute === 'meetings') return 'lecture';
    if (subRoute === 'festivals') return 'festival';
    if (subRoute === 'workshops') return 'workshop';
    if (subRoute === 'archive') return 'archive';
    return 'all';
  });

  const categories = [
    { id: 'all', title: 'Все события' },
    { id: 'excursion', title: 'Экскурсии' },
    { id: 'kids', title: 'Детям' },
    { id: 'exhibition', title: 'Выставки' },
    { id: 'lecture', title: 'Встречи и лекции' },
    { id: 'festival', title: 'Фестивали' },
    { id: 'workshop', title: 'Мастер-классы' }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
          Раздел «Афиша»
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
          Афиша событий и программ
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Расписание обзорных экскурсий, интерактивных занятий, лекций и фестивалей
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-[#E0D5C1] pb-3 flex items-center gap-2 overflow-x-auto">
        <Filter className="w-4 h-4 text-[#8C4A1D] flex-shrink-0" />
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-[#8C4A1D] text-white shadow-sm'
                : 'bg-[#FAF6EE] text-[#5C4A3E] hover:bg-[#EFE8DC]'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(ev => (
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
                <div className="text-[11px] font-semibold text-[#8C4A1D] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ev.date} · {ev.time}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2C241E] mt-1 group-hover:text-[#8C4A1D] transition-colors leading-snug">
                  {ev.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 mt-2 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-400 block">Билет:</span>
                  <span className="font-bold text-[#8C4A1D] text-sm">{ev.price} ₽</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedEventForTicket(ev);
                    setIsTicketModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold transition"
                >
                  Купить билет
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
