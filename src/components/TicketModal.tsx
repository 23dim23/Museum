import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Ticket,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  HelpCircle,
  QrCode,
  Printer,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { TicketBooking } from '../types';

interface TicketCategoryCount {
  name: string;
  desc: string;
  price: number;
  count: number;
}

export const TicketModal: React.FC = () => {
  const {
    isTicketModalOpen,
    setIsTicketModalOpen,
    selectedEventForTicket,
    setSelectedEventForTicket,
    purchaseTicket,
    navigate
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('12:00');
  const [usePushkinCard, setUsePushkinCard] = useState<boolean>(false);

  // Categories
  const [categories, setCategories] = useState<TicketCategoryCount[]>([
    { name: 'Взрослый', desc: 'Граждане РФ и ЕАЭС без льгот', price: 300, count: 1 },
    { name: 'Льготный (Пенсионеры / Студенты)', desc: 'При предъявлении удостоверения', price: 150, count: 0 },
    { name: 'Школьный (7–17 лет)', desc: 'Учащиеся средних школ РФ', price: 150, count: 0 },
    { name: 'Дети до 7 лет', desc: 'Бесплатный вход в сопровождении взрослых', price: 0, count: 0 },
    { name: 'Льготный 100% (Инвалиды I-II гр., Ветераны ВОВ/СВО)', desc: 'Бесплатный билет с подтверждающим документом', price: 0, count: 0 }
  ]);

  // Buyer information
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Purchased Ticket result
  const [completedBooking, setCompletedBooking] = useState<TicketBooking | null>(null);

  if (!isTicketModalOpen) return null;

  const handleCountChange = (index: number, delta: number) => {
    setCategories(prev => {
      const next = [...prev];
      const newCount = Math.max(0, next[index].count + delta);
      next[index] = { ...next[index], count: newCount };
      return next;
    });
  };

  const totalTickets = categories.reduce((sum, c) => sum + c.count, 0);
  const baseTotal = categories.reduce((sum, c) => sum + c.count * c.price, 0);

  // Event override price if booking for a specific event
  const totalPrice = selectedEventForTicket
    ? selectedEventForTicket.price * totalTickets
    : baseTotal;

  const handleClose = () => {
    setIsTicketModalOpen(false);
    setSelectedEventForTicket(null);
    setStep(1);
    setCompletedBooking(null);
  };

  const handleFinishPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;

    const bookingItems = categories
      .filter(c => c.count > 0)
      .map(c => ({
        category: selectedEventForTicket ? `${selectedEventForTicket.title} (${c.name})` : c.name,
        count: c.count,
        price: selectedEventForTicket ? selectedEventForTicket.price : c.price
      }));

    const result = purchaseTicket({
      customerName,
      customerEmail,
      customerPhone,
      visitDate: selectedDate,
      timeSlot,
      items: bookingItems,
      totalPrice,
      usePushkinCard
    });

    setCompletedBooking(result);
    setStep(4);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Электронная билетная система Санкт-Петербургского Музея Хлеба"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[#FAF7F2] text-[#2C241E] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#D5C6B0] overflow-hidden my-8 animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-[#2C241E] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8C4A1D] flex items-center justify-center text-amber-200">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold">
                {selectedEventForTicket
                  ? `Билет: ${selectedEventForTicket.title}`
                  : 'Покупка входных билетов в Музей Хлеба'}
              </div>
              <div className="text-xs text-amber-200/80">
                Официальная онлайн-касса · musbread.ru
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition"
            aria-label="Закрыть окно покупки"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#F0E8DC] px-6 py-2.5 border-b border-[#E0D5C1] flex items-center justify-between text-xs text-gray-600">
          <span className={`font-semibold ${step === 1 ? 'text-[#8C4A1D]' : ''}`}>
            1. Дата и сеанс
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className={`font-semibold ${step === 2 ? 'text-[#8C4A1D]' : ''}`}>
            2. Категории и льготы
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className={`font-semibold ${step === 3 ? 'text-[#8C4A1D]' : ''}`}>
            3. Контакты
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className={`font-semibold ${step === 4 ? 'text-emerald-700' : ''}`}>
            4. Электронный билет
          </span>
        </div>

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#735A45] mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#8C4A1D]" />
                Выберите дату визита
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full sm:w-72 p-3 bg-white border border-[#D5C6B0] rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#8C4A1D] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Музей открыт Вт–Вс с 10:00 до 18:00 (понедельник — выходной).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#735A45] mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8C4A1D]" />
                Выберите сеанс входа
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['10:30', '12:00', '13:30', '15:00', '16:00', '17:00'].map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                      timeSlot === slot
                        ? 'bg-[#8C4A1D] text-white border-[#8C4A1D] shadow'
                        : 'bg-white text-gray-800 border-[#D5C6B0] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Pushkin Card Notice */}
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-amber-900 mb-0.5">
                  Действует программа «Пушкинская карта»
                </div>
                <div className="text-amber-800">
                  Молодые люди от 14 до 22 лет могут оплатить билет за счет государственной субсидии.
                </div>
                <label className="flex items-center gap-2 mt-2 cursor-pointer font-semibold text-amber-950">
                  <input
                    type="checkbox"
                    checked={usePushkinCard}
                    onChange={e => setUsePushkinCard(e.target.checked)}
                    className="rounded text-amber-700"
                  />
                  <span>Оплатить Пушкинской картой</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E8DFC8]">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-sm font-semibold transition"
              >
                Далее к выбору билетов →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Ticket Categories */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              {categories.map((cat, idx) => (
                <div
                  key={cat.name}
                  className="p-3.5 bg-white rounded-lg border border-[#E0D5C1] flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold text-sm text-[#2C241E]">{cat.name}</div>
                    <div className="text-xs text-gray-500">{cat.desc}</div>
                    <div className="text-xs font-bold text-[#8C4A1D] mt-0.5">
                      {cat.price === 0 ? 'Бесплатно' : `${cat.price} ₽`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCountChange(idx, -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                      disabled={cat.count === 0}
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{cat.count}</span>
                    <button
                      type="button"
                      onClick={() => handleCountChange(idx, 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total summary */}
            <div className="p-4 bg-[#F2ECE1] rounded-lg border border-[#D5C6B0] flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600">
                  Выбрано билетов: <span className="font-bold text-black">{totalTickets}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Дата: {selectedDate} · Сеанс: {timeSlot}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Итого к оплате:</div>
                <div className="font-serif text-2xl font-bold text-[#8C4A1D]">
                  {totalPrice} ₽
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8DFC8]">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black"
              >
                ← Назад
              </button>
              <button
                disabled={totalTickets === 0}
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-lg bg-[#8C4A1D] hover:bg-[#733B15] text-white text-sm font-semibold transition disabled:opacity-40"
              >
                Далее к оформлению →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contacts & Checkout */}
        {step === 3 && (
          <form onSubmit={handleFinishPurchase} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                ФИО посетителя (для персонализации билета) *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Иванов Иван Иванович"
                className="w-full p-2.5 text-sm bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                  Электронная почта (куда отправить билет) *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder="ivan@example.ru"
                  className="w-full p-2.5 text-sm bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#735A45] mb-1">
                  Номер телефона для связи *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="+7 (911) 000-00-00"
                  className="w-full p-2.5 text-sm bg-white border border-[#D5C6B0] rounded-lg focus:ring-2 focus:ring-[#8C4A1D] focus:outline-none"
                />
              </div>
            </div>

            {/* Refund & Legal Notice */}
            <div className="p-3.5 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-gray-700 space-y-1.5">
              <div className="flex items-center gap-1 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Правила возврата билетов (Приказ Минкульта РФ № 340):</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Возврат 100% стоимости производится не позднее чем за 10 дней до даты посещения; 50% — не менее чем за 5 дней; 30% — не менее чем за 3 дня. При отмене визита по болезни возврат 100% по заявлению.
              </p>
            </div>

            <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-700">
              <input
                type="checkbox"
                required
                checked={agreedTerms}
                onChange={e => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#8C4A1D]"
              />
              <span>
                Согласен с правилами посещения музея и даю согласие на обработку персональных данных (ФЗ № 152-ФЗ).
              </span>
            </label>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8DFC8]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black"
              >
                ← Назад
              </button>
              <button
                type="submit"
                disabled={!agreedTerms}
                className="px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold transition flex items-center gap-2 shadow"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Подтвердить и выписать билет ({totalPrice} ₽)</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Electronic Ticket Ready */}
        {step === 4 && completedBooking && (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2C241E]">
                Билет успешно оформлен!
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Электронный ваучер отправлен на почту{' '}
                <span className="font-bold text-black">{completedBooking.customerEmail}</span>
              </p>
            </div>

            {/* Visual Museum Ticket Voucher */}
            <div className="bg-white border-2 border-dashed border-[#8C4A1D] rounded-xl p-5 relative overflow-hidden shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-4 mb-4 gap-4">
                <div>
                  <div className="text-xs text-amber-800 uppercase font-bold tracking-wider">
                    Санкт-Петербургский Музей Хлеба
                  </div>
                  <div className="font-serif text-xl font-bold text-gray-900">
                    Электронный входной билет
                  </div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5">
                    № {completedBooking.ticketNumber} · {completedBooking.createdAt}
                  </div>
                </div>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
                  <QrCode className="w-12 h-12 text-[#2C241E]" />
                  <div className="text-[10px] font-mono text-gray-500 max-w-[100px] break-all">
                    {completedBooking.qrCodeToken}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div>
                  <span className="text-gray-400 block text-[11px]">Посетитель:</span>
                  <span className="font-semibold">{completedBooking.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Дата визита:</span>
                  <span className="font-bold text-[#8C4A1D]">{completedBooking.visitDate}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Сеанс входа:</span>
                  <span className="font-bold">{completedBooking.timeSlot}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Сумма:</span>
                  <span className="font-bold text-emerald-700">{completedBooking.totalPrice} ₽</span>
                </div>
              </div>

              <div className="text-xs bg-[#FAF7F2] p-2.5 rounded border border-[#E8DFC8]">
                <div className="font-semibold text-gray-700 mb-1">Состав заказа:</div>
                {completedBooking.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-gray-600 text-[11px]">
                    <span>{it.category} × {it.count}</span>
                    <span>{it.price * it.count} ₽</span>
                  </div>
                ))}
              </div>

              {completedBooking.usePushkinCard && (
                <div className="mt-2 text-[11px] text-amber-800 font-bold">
                  ✓ Оплачено по программе «Пушкинская карта»
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition"
              >
                <Printer className="w-4 h-4" />
                <span>Распечатать билет</span>
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded bg-[#8C4A1D] hover:bg-[#733B15] text-white text-xs font-semibold transition"
              >
                Завершить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
