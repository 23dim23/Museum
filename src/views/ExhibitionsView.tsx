import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Calendar, CreditCard, MapPin, ArrowRight } from 'lucide-react';

export const ExhibitionsView: React.FC = () => {
  const { currentPath, navigate, exhibitions, setIsTicketModalOpen } = useApp();
  const subRoute = currentPath.split('/')[2] || 'current';

  const [activeTab, setActiveTab] = useState<'current' | 'upcoming' | 'traveling'>(() => {
    if (subRoute === 'upcoming') return 'upcoming';
    if (subRoute === 'traveling') return 'traveling';
    return 'current';
  });

  const filtered = exhibitions.filter(ex => ex.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
            Раздел «Выставки»
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
            Выставочные проекты музея
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Временные, будущие и передвижные экспозиции Санкт-Петербургского Музея Хлеба
          </p>
        </div>

        {/* Pushkin Card link per ТЗ 2.2.3.6.1 */}
        <button
          onClick={() => navigate('/visitors/pushkin-card')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow transition self-start md:self-auto"
        >
          <CreditCard className="w-4 h-4" />
          <span>Посетить по Пушкинской карте</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E0D5C1] pb-3 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'current'
              ? 'bg-[#8C4A1D] text-white shadow-sm'
              : 'bg-[#FAF6EE] text-[#5C4A3E] hover:bg-[#EFE8DC]'
          }`}
        >
          Текущие выставки
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'upcoming'
              ? 'bg-[#8C4A1D] text-white shadow-sm'
              : 'bg-[#FAF6EE] text-[#5C4A3E] hover:bg-[#EFE8DC]'
          }`}
        >
          Будущие выставки
        </button>
        <button
          onClick={() => setActiveTab('traveling')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'traveling'
              ? 'bg-[#8C4A1D] text-white shadow-sm'
              : 'bg-[#FAF6EE] text-[#5C4A3E] hover:bg-[#EFE8DC]'
          }`}
        >
          Передвижные выставки
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map(ex => (
          <div
            key={ex.id}
            className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative h-64 bg-gray-100">
                <img src={ex.image} alt={ex.imageAlt} className="w-full h-full object-cover" />
                {ex.pushkinCard && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-amber-500 text-black text-[11px] font-bold shadow">
                    Пушкинская карта
                  </span>
                )}
              </div>
              <div className="p-6 space-y-3">
                <div className="text-xs font-bold text-[#8C4A1D] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ex.dates}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#2C241E] leading-snug">
                  {ex.title}
                </h2>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8C4A1D]" />
                  <span>{ex.hall}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                  {ex.description}
                </p>
                {ex.curator && (
                  <div className="text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                    Куратор: {ex.curator}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E8DFC8] flex items-center justify-between">
              <span className="text-xs text-gray-500">Вход по билету в музей</span>
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="px-4 py-2 bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold rounded-lg transition"
              >
                Купить билет
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
