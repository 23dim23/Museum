import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Send,
  Shield,
  FileText,
  ExternalLink,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setIsQualitySurveyModalOpen, setIsFeedbackModalOpen, language } = useApp();
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubSuccess(true);
      setTimeout(() => {
        setSubSuccess(false);
        setEmailSub('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#241C16] text-[#E0D5C1] border-t-4 border-[#8C4A1D] mt-16">
      {/* Top Footer Banner: Quality Assessment & Survey */}
      <div className="bg-[#2E241D] border-b border-[#3D3227] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded bg-[#8C4A1D] text-white flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg text-white">
                Оценка качества работы музея
              </div>
              <div className="text-xs text-[#B8A995]">
                Независимая оценка качества условий оказания услуг организациями культуры (Минкультуры РФ)
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsQualitySurveyModalOpen(true)}
              className="px-4 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm tracking-wide shadow transition"
            >
              Пройти опрос качества
            </button>
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-4 py-2.5 rounded bg-[#3D3227] hover:bg-[#4E3F33] text-[#E0D5C1] border border-[#5E4E3F] text-xs sm:text-sm transition"
            >
              Направить обращение
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Identity & Legal Title */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#3D2C1D] text-[#E8DFC8] flex items-center justify-center border border-[#D4A373]">
                <span className="font-serif text-lg font-bold text-[#E4C59E]">МХ</span>
              </div>
              <div>
                <div className="font-serif font-bold text-base text-white">
                  Музей Хлеба
                </div>
                <div className="text-[10px] text-[#A89884] uppercase tracking-wider">
                  СПб ГБУК «Санкт-Петербургский Музей Хлеба»
                </div>
              </div>
            </div>
            <p className="text-xs text-[#B8A995] leading-relaxed mb-4">
              Единственный в России государственный музей, посвященный истории развития хлебопечения,
              традициям зернового хозяйства, подвигу блокадного Ленинграда и кондитерскому искусству.
            </p>
            <div className="text-[11px] text-[#8C7A68]">
              ОГРН 1037804005820 · ИНН 7802058490
            </div>
          </div>

          {/* Col 2: General Museum Info & Hours */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300 mb-4 pb-1 border-b border-[#3D3227]">
              Контакты и Режим работы
            </h3>
            <ul className="space-y-3 text-xs text-[#D0C4B0]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                <span>195009, г. Санкт-Петербург, ул. Михайлова, дом 2 (ст. метро «Площадь Ленина»)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                <span>Вт–Вс: 10:00–18:00 (касса до 17:00). Пн — выходной</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                <a href="tel:+78122945090" className="hover:text-white transition">
                  +7 (812) 294-50-90
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                <a href="mailto:info@musbread.ru" className="hover:text-white transition">
                  info@musbread.ru
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300 mb-4 pb-1 border-b border-[#3D3227]">
              Разделы сайта
            </h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-[#C8BCAB]">
              <li>
                <button onClick={() => navigate('/museum/history')} className="hover:text-amber-200 transition">
                  История музея
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/museum/exposition')} className="hover:text-amber-200 transition">
                  Экспозиция
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/visitors/plan')} className="hover:text-amber-200 transition">
                  Спланировать визит
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/visitors/tickets-info')} className="hover:text-amber-200 transition">
                  Билеты и льготы
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/events/all')} className="hover:text-amber-200 transition">
                  Афиша событий
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tours/general')} className="hover:text-amber-200 transition">
                  Экскурсии
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/kids/interactive')} className="hover:text-amber-200 transition">
                  Программы детям
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/visitors/pushkin-card')} className="hover:text-amber-200 transition font-semibold text-amber-300">
                  Пушкинская карта
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/visitors/accessible')} className="hover:text-amber-200 transition">
                  Доступная среда
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/museum/documents')} className="hover:text-amber-200 transition">
                  Документы
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription & Protection */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300 mb-4 pb-1 border-b border-[#3D3227]">
              Подписка на новости
            </h3>
            <p className="text-xs text-[#B8A995] mb-3">
              Получайте расписание мастер-классов и анонсы новых выставок первыми:
            </p>
            {subSuccess ? (
              <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs rounded">
                ✓ Вы успешно подписаны на дайджест Музея Хлеба!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Ваш e-mail"
                    value={emailSub}
                    onChange={e => setEmailSub(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#1A1410] border border-[#4D3F33] rounded-l text-white focus:outline-none focus:border-amber-400 placeholder:text-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#8C4A1D] hover:bg-[#703A16] text-white text-xs font-semibold rounded-r transition flex items-center justify-center"
                    aria-label="Подписаться"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10px] text-[#8C7A68]">
                  Нажимая «Подписаться», вы соглашаетесь с Политикой обработки персональных данных (152-ФЗ).
                </div>
              </form>
            )}

            {/* Official RF Cultural Badges */}
            <div className="mt-5 pt-4 border-t border-[#3D3227] flex items-center gap-3">
              <a
                href="https://goskatalog.ru"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-[#A89884] hover:text-white transition"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Госкаталог РФ</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
              <span className="text-[#3D3227]">|</span>
              <a
                href="https://culture.ru"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-[#A89884] hover:text-white transition"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Культура.РФ</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Compliance Section */}
        <div className="pt-8 border-t border-[#3D3227] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8C7A68]">
          <div className="text-center md:text-left">
            <div>© 1988–2026 Санкт-Петербургский Музей Хлеба (musbread.ru). Все права защищены.</div>
            <div className="text-[11px] mt-0.5">
              Сайт соответствует требованиям Постановления Правительства РФ № 102 от 07.02.2026 и ГОСТ Р 70176-2022.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => navigate('/museum/documents')}
              className="hover:text-[#D0C4B0] transition underline"
            >
              Политика конфиденциальности и 152-ФЗ
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/visitors/plan')}
              className="hover:text-[#D0C4B0] transition underline"
            >
              Правила посещения музея
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/visitors/tickets-info')}
              className="hover:text-[#D0C4B0] transition underline"
            >
              Порядок возврата билетов
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
