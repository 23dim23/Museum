import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CreditCard, ArrowRight, Compass } from 'lucide-react';

export const KidsView: React.FC = () => {
  const { navigate, setIsTourModalOpen } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#8C4A1D] mb-1">
            Раздел «Детям»
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
            Музейные программы для детей и школьников
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Увлекательные интерактивные квесты, сказочные экскурсии и мастер-классы
          </p>
        </div>

        {/* Pushkin Card link per ТЗ 2.2.3.6.1 */}
        <button
          onClick={() => navigate('/visitors/pushkin-card')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow transition self-start md:self-auto"
        >
          <CreditCard className="w-4 h-4" />
          <span>Оплата по Пушкинской карте</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Интерактивная программа: «Колобок и русская печь»',
            age: 'Для детей 5–9 лет (дошкольники и 1–3 классы)',
            desc: 'В игровой форме ребята изучают устройство крестьянской избы, разгадывают старинные загадки кота Баюна, узнают, из чего замешивают тесто и как сажают хлеб в печь на лопате.',
            img: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80'
          },
          {
            title: 'Тематический квест: «В поисках потерянного рецепта»',
            age: 'Для школьников 10–14 лет (4–8 классы)',
            desc: 'Командное расследование по залам старого Петербурга: дети ищут подсказки на старинных вывесках, расшифровывают рецептуру купеческого кренделя и получают памятные грамоты.',
            img: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80'
          },
          {
            title: 'Детский мастер-класс: «Роспись поморских козуль»',
            age: 'Для детей от 6 лет и семейных групп',
            desc: 'Увлекательное творческое занятие: знакомство с традицией архангельских пряников-козуль и самостоятельная роспись фигурок оленей и птиц цветной сахарной глазурью.',
            img: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=800&q=80'
          }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-2">
                <span className="text-xs font-semibold text-[#8C4A1D] block">{item.age}</span>
                <h2 className="font-serif text-lg font-bold text-[#2C241E] leading-snug">{item.title}</h2>
                <p className="text-xs text-gray-600 leading-relaxed mt-2">{item.desc}</p>
              </div>
            </div>
            <div className="p-5 bg-[#FAF7F2] border-t border-[#E8DFC8] flex items-center justify-between">
              <button
                onClick={() => setIsTourModalOpen(true)}
                className="w-full py-2 bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold rounded-lg transition"
              >
                Забронировать для класса
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
