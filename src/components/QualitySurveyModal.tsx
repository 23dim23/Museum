import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Award, CheckCircle } from 'lucide-react';

export const QualitySurveyModal: React.FC = () => {
  const { isQualitySurveyModalOpen, setIsQualitySurveyModalOpen, sendSurvey } = useApp();

  const [overallRating, setOverallRating] = useState(5);
  const [cleanliness, setCleanliness] = useState(5);
  const [politeness, setPoliteness] = useState(5);
  const [accessibility, setAccessibilityRating] = useState(5);
  const [expositionInterest, setExpositionInterest] = useState(5);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isQualitySurveyModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendSurvey({
      overallRating,
      cleanliness,
      politeness,
      accessibility,
      expositionInterest,
      comments
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsQualitySurveyModalOpen(false);
    setSubmitted(false);
    setComments('');
  };

  const renderStars = (value: number, setValue: (val: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => setValue(star)}
          className="p-1 text-amber-400 hover:scale-110 transition"
          aria-label={`Оценка ${star} из 5`}
        >
          <Star className={`w-5 h-5 ${star <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
        </button>
      ))}
      <span className="text-xs font-bold text-gray-700 ml-2">{value} / 5</span>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Анкета независимой оценки качества условий оказания услуг"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[#FAF7F2] text-[#2C241E] w-full max-w-lg rounded-xl shadow-2xl border border-[#D5C6B0] overflow-hidden my-6 animate-fadeIn">
        <div className="bg-[#2C241E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <div className="font-serif text-lg font-bold">Оценка работы музея</div>
              <div className="text-[11px] text-amber-200/80">
                Независимая оценка качества (НОК Минкультуры РФ)
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
            <h3 className="font-serif text-xl font-bold">Благодарим за ваше мнение!</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Ваша оценка помогает нам делать Санкт-Петербургский Музей Хлеба еще более гостеприимным и познавательным. Данные учитываются в статистике Комитета по культуре Санкт-Петербурга.
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
            <div className="p-3 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900">
              Пожалуйста, оцените ваш опыт визита по шкале от 1 (плохо) до 5 (отлично). Опрос анонимен.
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-800">Общее впечатление от визита:</span>
                {renderStars(overallRating, setOverallRating)}
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-800">Интерес и оформление экспозиций:</span>
                {renderStars(expositionInterest, setExpositionInterest)}
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-800">Доброжелательность и компетентность персонала:</span>
                {renderStars(politeness, setPoliteness)}
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-800">Чистота и комфорт помещений музея:</span>
                {renderStars(cleanliness, setCleanliness)}
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-800">Доступность для маломобильных граждан:</span>
                {renderStars(accessibility, setAccessibilityRating)}
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Ваши предложения или отзыв (необязательно):
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={e => setComments(e.target.value)}
                placeholder="Что вам особенно понравилось или что мы можем улучшить?"
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
                Отправить оценку
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
