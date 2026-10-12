import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Users, Clock, Ticket, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ToursView: React.FC = () => {
  const { currentPath, navigate, setIsTourModalOpen, setIsTicketModalOpen } = useApp();
  const subRoute = currentPath.split('/')[2] || 'general';

  const tours = [
    {
      id: 'general',
      title: 'Обзорная экскурсия: «Хлеб — всему голова»',
      duration: '45 минут',
      groupSize: 'до 25 человек',
      price: '350 ₽ / чел.',
      desc: 'Классическое путешествие по залам музея в сопровождении научного сотрудника. История от неолитического серпа до современной булочной промышленности Петербурга.',
      target: 'Для взрослых, студентов и школьников (от 7 лет)',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'interactive',
      title: 'Интерактивная экскурсия: «В гостях у пекаря и мельника»',
      duration: '60 минут',
      groupSize: 'до 20 человек',
      price: '400 ₽ / чел.',
      desc: 'Посетители пробуют вращать каменные ручные жернова, узнают секреты закваски, пробуют ухват и деревянную хлебную лопату у русской печи.',
      target: 'Для семейных групп и организованных школьных классов',
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'thematic',
      title: 'Тематическая экскурсия: «125 граммов жизни — Блокадный Ленинград»',
      duration: '60 минут',
      groupSize: 'до 20 человек',
      price: '350 ₽ / чел.',
      desc: 'Глубокий мемориальный маршрут: рецептуры блокадного хлеба, работа пекарей под артиллерийскими обстрелами, Дорога Жизни и подвиг сотрудников лаборатории ВИР.',
      target: 'Школьники старших классов, студенты, взрослые',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'adult-workshops',
      title: 'Мастер-класс для взрослых: «Искусство заквасочного хлебопечения»',
      duration: '120 минут',
      groupSize: 'до 12 человек',
      price: '850 ₽ / чел.',
      desc: 'Практическое занятие: выведение ржаной закваски, замес старинного подового хлеба, формование каравая и выпечка в музейной пекарне с дегустацией.',
      target: 'Взрослая аудитория (18+)',
      image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
            Раздел «Экскурсии»
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
            Экскурсионные программы музея
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Для индивидуальных посетителей и организованных групп
          </p>
        </div>

        <button
          onClick={() => setIsTourModalOpen(true)}
          className="px-6 py-3 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold shadow transition flex items-center gap-2 self-start md:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Забронировать экскурсию для группы</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tours.map(t => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <img src={t.image} alt={t.title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-3">
                <h2 className="font-serif text-xl font-bold text-[#2C241E]">
                  {t.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {t.desc}
                </p>
                <div className="pt-2 text-xs text-[#8C4A1D] font-medium">
                  {t.target}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E8DFC8] flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-500 block">{t.duration} · {t.groupSize}</span>
                <span className="font-bold text-sm text-[#8C4A1D]">{t.price}</span>
              </div>
              <button
                onClick={() => setIsTourModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#3D2C1D] text-white hover:bg-[#523C27] font-semibold transition"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
