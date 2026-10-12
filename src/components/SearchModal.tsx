import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Calendar, BookOpen, Layers, Newspaper, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    navigate,
    events,
    exhibitions,
    news,
    collection
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchModalOpen]);

  // Autocomplete matching
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { events: [], exhibitions: [], news: [], collection: [] };

    return {
      events: events.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)),
      exhibitions: exhibitions.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)),
      news: news.filter(n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)),
      collection: collection.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.invNumber.toLowerCase().includes(q))
    };
  }, [query, events, exhibitions, news, collection]);

  const totalResults =
    results.events.length +
    results.exhibitions.length +
    results.news.length +
    results.collection.length;

  if (!isSearchModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Поиск по сайту Музея Хлеба"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="bg-[#FAF7F2] text-[#2C241E] w-full max-w-2xl rounded-xl shadow-2xl border border-[#D5C6B0] overflow-hidden animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFC8] flex items-center gap-3 bg-white">
          <Search className="w-6 h-6 text-[#8C4A1D] flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск по экспозициям, событиям, новостям, экспонатам..."
            className="w-full text-base sm:text-lg bg-transparent focus:outline-none placeholder:text-gray-400 text-[#2C241E]"
            onKeyDown={e => {
              if (e.key === 'Escape') setIsSearchModalOpen(false);
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-700"
              title="Очистить"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query.trim() ? (
            <div className="text-center py-8 text-gray-500 text-xs sm:text-sm">
              <p className="mb-2 font-medium">Попробуйте найти:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Блокадный хлеб', 'Печь', 'Пряничная доска', 'Пушкинская карта', 'Экскурсии', 'Расписание'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded bg-[#EFE8DC] text-[#4A3D34] hover:bg-[#E2D8C7] transition text-xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              По запросу <span className="font-semibold text-black">«{query}»</span> ничего не найдено.
              <div className="text-xs text-gray-400 mt-1">Попробуйте изменить формулировку или проверьте опечатки.</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Exhibitions */}
              {results.exhibitions.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-2.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Выставки ({results.exhibitions.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.exhibitions.map(ex => (
                      <button
                        key={ex.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          navigate('/exhibitions/current');
                        }}
                        className="w-full text-left p-3 rounded-lg bg-white hover:bg-[#FAF6EE] border border-[#E8DFC8] transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-[#2C241E] group-hover:text-[#8C4A1D]">
                            {ex.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {ex.description}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#8C4A1D] flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {results.events.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-2.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>События и экскурсии ({results.events.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.events.map(ev => (
                      <button
                        key={ev.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          navigate('/events/all');
                        }}
                        className="w-full text-left p-3 rounded-lg bg-white hover:bg-[#FAF6EE] border border-[#E8DFC8] transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-[#2C241E] group-hover:text-[#8C4A1D]">
                            {ev.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {ev.date} · {ev.time} · {ev.price} ₽
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#8C4A1D] flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Collection Items */}
              {results.collection.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-2.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Фондовые коллекции музея ({results.collection.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.collection.map(c => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          navigate('/science/collection');
                        }}
                        className="w-full text-left p-3 rounded-lg bg-white hover:bg-[#FAF6EE] border border-[#E8DFC8] transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-[#2C241E] group-hover:text-[#8C4A1D]">
                            {c.title}
                          </div>
                          <div className="text-xs text-amber-800 font-mono mt-0.5">
                            {c.invNumber} · {c.era}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#8C4A1D] flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {results.news.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-2.5">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>Новости ({results.news.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.news.map(n => (
                      <button
                        key={n.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          navigate('/museum/news');
                        }}
                        className="w-full text-left p-3 rounded-lg bg-white hover:bg-[#FAF6EE] border border-[#E8DFC8] transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-[#2C241E] group-hover:text-[#8C4A1D]">
                            {n.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {n.date}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#8C4A1D] flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#EFE8DC] border-t border-[#E8DFC8] text-right text-xs text-gray-500">
          Нажмите <span className="font-bold">ESC</span> для закрытия поиска
        </div>
      </div>
    </div>
  );
};
