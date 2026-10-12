import React from 'react';
import { useApp } from '../context/AppContext';
import { Eye, Volume2, VolumeX, X, Type, Palette, ImageOff, Image as ImageIcon } from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const { accessibility, updateAccessibility, toggleAccessibility, speakText, stopSpeaking } = useApp();

  if (!accessibility.enabled) return null;

  return (
    <div
      role="region"
      aria-label="Панель настроек доступности для людей с нарушениями зрения"
      className="bg-[#1F2937] text-white border-b-2 border-[#D4A373] px-4 py-2.5 text-xs sm:text-sm select-none z-50 sticky top-0 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Title */}
        <div className="flex items-center gap-2 font-medium">
          <Eye className="w-5 h-5 text-[#EAB308]" aria-hidden="true" />
          <span className="font-semibold tracking-wide uppercase text-xs">
            Версия для слабовидящих (ГОСТ Р 70176-2022)
          </span>
        </div>

        {/* Font size */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-300 mr-1 flex items-center gap-1">
            <Type className="w-4 h-4" /> Размер:
          </span>
          <button
            onClick={() => updateAccessibility({ fontSize: '100' })}
            className={`px-2.5 py-1 rounded text-xs font-bold border ${
              accessibility.fontSize === '100' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-200 border-gray-600 hover:border-gray-400'
            }`}
            aria-label="Обычный размер шрифта 100%"
          >
            A (100%)
          </button>
          <button
            onClick={() => updateAccessibility({ fontSize: '150' })}
            className={`px-2.5 py-1 rounded text-xs font-bold border ${
              accessibility.fontSize === '150' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-200 border-gray-600 hover:border-gray-400'
            }`}
            aria-label="Увеличенный размер шрифта 150%"
          >
            A+ (150%)
          </button>
          <button
            onClick={() => updateAccessibility({ fontSize: '200' })}
            className={`px-2.5 py-1 rounded text-xs font-bold border ${
              accessibility.fontSize === '200' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-200 border-gray-600 hover:border-gray-400'
            }`}
            aria-label="Максимальный размер шрифта 200%"
          >
            A++ (200%)
          </button>
        </div>

        {/* Color schemes */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-300 mr-1 flex items-center gap-1">
            <Palette className="w-4 h-4" /> Цвета:
          </span>
          <button
            onClick={() => updateAccessibility({ colorScheme: 'default' })}
            className={`px-2 py-1 rounded text-xs border ${
              accessibility.colorScheme === 'default' ? 'ring-2 ring-yellow-400 font-bold' : 'border-gray-600'
            } bg-[#FAF7F2] text-black`}
            title="Обычная цветовая схема"
          >
            Цветная
          </button>
          <button
            onClick={() => updateAccessibility({ colorScheme: 'bw' })}
            className={`px-2 py-1 rounded text-xs border ${
              accessibility.colorScheme === 'bw' ? 'ring-2 ring-yellow-400 font-bold' : 'border-gray-600'
            } bg-white text-black font-semibold`}
            title="Черным по белому"
          >
            Ч/Б
          </button>
          <button
            onClick={() => updateAccessibility({ colorScheme: 'wb' })}
            className={`px-2 py-1 rounded text-xs border ${
              accessibility.colorScheme === 'wb' ? 'ring-2 ring-yellow-400 font-bold' : 'border-gray-600'
            } bg-black text-white font-semibold`}
            title="Белым по черному (инверсия)"
          >
            Б/Ч
          </button>
          <button
            onClick={() => updateAccessibility({ colorScheme: 'blue' })}
            className={`px-2 py-1 rounded text-xs border ${
              accessibility.colorScheme === 'blue' ? 'ring-2 ring-yellow-400 font-bold' : 'border-gray-600'
            } bg-[#cce7ff] text-[#063970] font-semibold`}
            title="Синим по голубому"
          >
            Синий
          </button>
          <button
            onClick={() => updateAccessibility({ colorScheme: 'yellow' })}
            className={`px-2 py-1 rounded text-xs border ${
              accessibility.colorScheme === 'yellow' ? 'ring-2 ring-yellow-400 font-bold' : 'border-gray-600'
            } bg-black text-[#ffff00] font-semibold`}
            title="Желтым по черному"
          >
            Желтый
          </button>
        </div>

        {/* Kerning / Spacing */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-300 text-xs">Интервал:</span>
          <button
            onClick={() => updateAccessibility({ letterSpacing: 'normal' })}
            className={`px-2 py-0.5 rounded text-xs border ${
              accessibility.letterSpacing === 'normal' ? 'bg-gray-100 text-black' : 'border-gray-600'
            }`}
          >
            Стандарт
          </button>
          <button
            onClick={() => updateAccessibility({ letterSpacing: 'medium' })}
            className={`px-2 py-0.5 rounded text-xs border tracking-wider ${
              accessibility.letterSpacing === 'medium' ? 'bg-gray-100 text-black' : 'border-gray-600'
            }`}
          >
            С р е д н и й
          </button>
        </div>

        {/* Images Toggle */}
        <button
          onClick={() => updateAccessibility({ hideImages: !accessibility.hideImages })}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs border ${
            accessibility.hideImages ? 'bg-amber-600 text-white border-amber-500' : 'border-gray-600 hover:border-gray-400'
          }`}
          aria-pressed={accessibility.hideImages}
        >
          {accessibility.hideImages ? (
            <>
              <ImageOff className="w-3.5 h-3.5" />
              <span>Картинки скрыты (текст)</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Картинки включены</span>
            </>
          )}
        </button>

        {/* Screen Reader Voice */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              const mainContent = document.querySelector('main')?.innerText || document.body.innerText;
              speakText(mainContent.substring(0, 1500));
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-medium"
            title="Озвучить содержимое страницы голосом"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Озвучить</span>
          </button>
          <button
            onClick={stopSpeaking}
            className="p-1 rounded text-xs bg-gray-700 hover:bg-gray-600 text-gray-200"
            title="Остановить речь"
            aria-label="Остановить синтез речи"
          >
            <VolumeX className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Close accessibility bar */}
        <button
          onClick={toggleAccessibility}
          className="p-1 text-gray-400 hover:text-white rounded hover:bg-gray-700 transition"
          aria-label="Закрыть панель для слабовидящих"
          title="Вернуться к стандартному виду сайта"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
