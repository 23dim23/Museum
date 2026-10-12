import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, MessageSquare, CheckCircle } from 'lucide-react';
import { FeedbackSubmission } from '../types';

export const FeedbackModal: React.FC = () => {
  const { isFeedbackModalOpen, setIsFeedbackModalOpen, sendFeedback } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<FeedbackSubmission['category']>('question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    sendFeedback({
      fullName,
      email,
      category,
      message
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsFeedbackModalOpen(false);
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Электронная приемная / Форма обратной связи"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[#FAF7F2] text-[#2C241E] w-full max-w-lg rounded-xl shadow-2xl border border-[#D5C6B0] overflow-hidden my-6 animate-fadeIn">
        <div className="bg-[#2C241E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <div>
              <div className="font-serif text-lg font-bold">Электронная приемная</div>
              <div className="text-[11px] text-amber-200/80">
                Обращение граждан в администрацию Музея Хлеба
              </div>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold">Ваше обращение зарегистрировано!</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              В соответствии с Федеральным законом № 59-ФЗ ответ будет направлен на адрес <span className="font-semibold text-black">{email}</span> в установленные законодательством сроки.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 rounded bg-[#8C4A1D] text-white text-xs font-semibold"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                ФИО заявителя *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Иванова Светлана Петровна"
                className="w-full p-2 bg-white border border-[#D5C6B0] rounded focus:ring-2 focus:ring-[#8C4A1D]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                E-mail для ответа *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="svetlana@mail.ru"
                className="w-full p-2 bg-white border border-[#D5C6B0] rounded focus:ring-2 focus:ring-[#8C4A1D]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Тематика обращения
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full p-2 bg-white border border-[#D5C6B0] rounded focus:ring-2 focus:ring-[#8C4A1D]"
              >
                <option value="question">Вопрос по экскурсиям и экспозициям</option>
                <option value="accessibility">Вопрос по доступной среде для инвалидов</option>
                <option value="gratitude">Благодарность сотрудникам</option>
                <option value="complaint">Замечание / претензия</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Текст обращения *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Изложите суть вашего вопроса или предложения..."
                className="w-full p-2 bg-white border border-[#D5C6B0] rounded focus:ring-2 focus:ring-[#8C4A1D]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 font-semibold text-gray-500 hover:text-black"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-[#8C4A1D] hover:bg-[#733B15] text-white font-semibold transition"
              >
                Отправить обращение
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
