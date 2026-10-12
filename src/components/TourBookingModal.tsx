import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Users, Calendar, Clock, Phone, Mail, CheckCircle, Compass } from 'lucide-react';
import { TourRequest } from '../types';

export const TourBookingModal: React.FC = () => {
  const { isTourModalOpen, setIsTourModalOpen, requestTour } = useApp();

  const [tourTitle, setTourTitle] = useState('Обзорная экскурсия: История хлеба от неолита до наших дней');
  const [groupType, setGroupType] = useState<TourRequest['groupType']>('school');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00');
  const [peopleCount, setPeopleCount] = useState(15);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isTourModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    requestTour({
      tourTitle,
      groupType,
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime,
      peopleCount: Number(peopleCount),
      contactName,
      contactPhone,
      contactEmail,
      notes
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setIsTourModalOpen(false);
    setSubmitted(false);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setNotes('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Заявка на экскурсионное обслуживание"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[#FAF7F2] text-[#2C241E] w-full max-w-xl rounded-xl shadow-2xl border border-[#D5C6B0] overflow-hidden my-6 animate-fadeIn">
        {/* Header */}
        <div className="bg-[#2C241E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8C4A1D] flex items-center justify-center text-amber-200">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold">
                Заявка на экскурсионное обслуживание
              </div>
              <div className="text-xs text-amber-200/80">
                Экскурсионное бюро Музея Хлеба
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded text-gray-400 hover:text-white"
            aria-label="Закрыть окно"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2C241E]">
              Заявка успешно принята!
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              Наш методист экскурсионного отдела свяжется с вами по указанному телефону в течение 1 рабочего дня для согласования деталей и назначения экскурсовода.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-lg bg-[#8C4A1D] text-white text-xs font-semibold hover:bg-[#733B15] transition"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Tour program */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                Выберите программу экскурсии *
              </label>
              <select
                value={tourTitle}
                onChange={e => setTourTitle(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
              >
                <option value="Обзорная экскурсия: История хлеба от неолита до наших дней">
                  Обзорная экскурсия: «История хлеба от неолита до наших дней» (45 мин)
                </option>
                <option value="Интерактивная детская программа «В гостях у мельника»">
                  Интерактивная программа «В гостях у мельника» (для детей 6–11 лет)
                </option>
                <option value="Тематическая экскурсия: «125 граммов жизни — Блокада»">
                  Тематическая: «125 граммов жизни — Блокадный хлеб Ленинграда» (60 мин)
                </option>
                <option value="Мастер-класс по росписи традиционной Архангельской козули">
                  Мастер-класс: «Секреты росписи Архангельской козули» (90 мин)
                </option>
                <option value="Тематическая: «Петербургские булочные и кондитерские XIX века»">
                  Тематическая: «Петербургские булочные и кондитерские XIX века»
                </option>
              </select>
            </div>

            {/* Group type & count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                  Категория группы
                </label>
                <select
                  value={groupType}
                  onChange={e => setGroupType(e.target.value as any)}
                  className="w-full p-2.5 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
                >
                  <option value="school">Школьная / учащиеся (с сопровождающим)</option>
                  <option value="adult_group">Организованная группа взрослых</option>
                  <option value="individual">Индивидуальная / семейная (до 5 чел)</option>
                  <option value="foreign">Иностранные гости / туристы</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                  Количество человек в группе
                </label>
                <input
                  type="number"
                  min="1"
                  max="45"
                  value={peopleCount}
                  onChange={e => setPeopleCount(Number(e.target.value))}
                  className="w-full p-2 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                  Желаемая дата визита
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setPreferredDate(e.target.value)}
                  className="w-full p-2 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                  Желаемое время
                </label>
                <select
                  value={preferredTime}
                  onChange={e => setPreferredTime(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
                >
                  <option value="10:30">10:30</option>
                  <option value="11:30">11:30</option>
                  <option value="13:00">13:00</option>
                  <option value="14:30">14:30</option>
                  <option value="16:00">16:00</option>
                </select>
              </div>
            </div>

            {/* Contact Person */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                  Контактное лицо (ФИО) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Петрова Елена Сергеевна"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  className="w-full p-2 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                  Телефон для связи *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (911) 123-45-67"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  className="w-full p-2 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                E-mail (необязательно)
              </label>
              <input
                type="email"
                placeholder="school@spb.ru"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                Пожелания или особенности группы (класс, наличие МГН и др.)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Укажите возраст детей, номер школы или особые пожелания..."
                className="w-full p-2 text-xs bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs text-gray-600 hover:text-black font-semibold"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold transition"
              >
                Отправить заявку методисту
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
