import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  LayoutDashboard,
  FileEdit,
  Calendar,
  Layers,
  Inbox,
  ShieldCheck,
  RefreshCw,
  FolderOpen,
  Search,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  AlertTriangle,
  Upload,
  Globe,
  Sliders,
  Code2,
  Eye
} from 'lucide-react';
import { NewsItem, EventItem, Exhibition } from '../../types';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    role,
    setRole,
    news,
    saveNews,
    deleteNews,
    events,
    saveEvent,
    deleteEvent,
    exhibitions,
    saveExhibition,
    tourRequests,
    moderateTour,
    feedbackList,
    auditLogs,
    contourSync,
    syncContour
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'news' | 'events' | 'tours' | 'sync' | 'seo' | 'files' | 'logs'
  >('dashboard');

  const [syncingLoading, setSyncingLoading] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState('');

  // Editing state for News
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  // Editing state for Events
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // SEO page editor simulation
  const [seoPages, setSeoPages] = useState([
    { path: '/', title: 'Музей Хлеба — Официальный сайт | Санкт-Петербург', desc: 'Официальный сайт музея: экспозиции, билеты, Пушкинская карта.', h1: 'Санкт-Петербургский Музей Хлеба' },
    { path: '/visitors/plan', title: 'Спланировать визит — Режим работы и адрес', desc: 'Часы работы, адрес на ул. Михайлова, правила посещения.', h1: 'Спланировать визит в Музей Хлеба' },
    { path: '/visitors/pushkin-card', title: 'Пушкинская карта в Музее Хлеба', desc: 'Оплата входных билетов и мастер-классов по Пушкинской карте.', h1: 'Программа «Пушкинская карта»' },
    { path: '/museum/exposition', title: 'Постоянная экспозиция — Музей Хлеба', desc: '14 залов: традиционное хлебопечение, блокадный хлеб, пекарни.', h1: 'Постоянная музейная экспозиция' }
  ]);

  // Uploaded media files simulation
  const [mediaFiles, setMediaFiles] = useState([
    { name: 'blokada_bread_1941.webp', size: '420 KB', date: '2026-10-10', type: 'image/webp' },
    { name: 'pastukhov_manor_facade.jpg', size: '1.2 MB', date: '2026-10-08', type: 'image/jpeg' },
    { name: 'kozulya_gingerbread_master.png', size: '890 KB', date: '2026-10-05', type: 'image/png' },
    { name: 'passport_dostupnosti_2026.pdf', size: '1.8 MB', date: '2026-10-01', type: 'application/pdf' }
  ]);

  if (!isAdminPanelOpen) return null;

  const handleSyncContour = async () => {
    setSyncingLoading(true);
    const checksum = await syncContour();
    setSyncingLoading(false);
    setSyncSuccessMsg(`Успешно выгружено на публичный сервер Nginx. SHA256: ${checksum.substring(0, 12)}...`);
    setTimeout(() => setSyncSuccessMsg(''), 5000);
  };

  const handleSaveNewsForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      saveNews(editingNews);
      setEditingNews(null);
    }
  };

  const handleSaveEventForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      saveEvent(editingEvent);
      setEditingEvent(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Панель управления сайтом Laravel MoonShine"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md overflow-hidden"
    >
      <div className="bg-[#1E1E2D] text-[#ECECF1] w-full max-w-6xl h-[92vh] rounded-2xl shadow-2xl border border-[#323248] flex flex-col overflow-hidden animate-fadeIn">
        {/* Top Bar of CMS */}
        <div className="bg-[#151521] border-b border-[#2B2B40] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#6366F1] flex items-center justify-center font-bold text-white shadow">
              MS
            </div>
            <div>
              <div className="font-semibold text-base flex items-center gap-2">
                <span>Панель управления MoonShine CMS</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 font-mono border border-indigo-700/50">
                  Laravel 12 · Изолированный контур
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Пользователь: <span className="text-amber-400 font-medium">{role === 'admin' ? 'Администратор (Полный доступ)' : 'Редактор (Контент и заявки)'}</span> · Сервер: <code className="text-emerald-400">cms.internal.musbread.ru</code>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick role toggle inside panel */}
            <div className="flex items-center gap-1 bg-[#252538] p-1 rounded border border-[#3A3A54] text-xs">
              <button
                onClick={() => setRole('editor')}
                className={`px-2 py-1 rounded transition ${role === 'editor' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400'}`}
              >
                Редактор
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2 py-1 rounded transition ${role === 'admin' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-400'}`}
              >
                Администратор
              </button>
            </div>

            <button
              onClick={() => setIsAdminPanelOpen(false)}
              className="p-1.5 rounded-lg bg-[#252538] hover:bg-[#34344E] text-gray-400 hover:text-white transition"
              title="Закрыть панель управления"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-60 bg-[#151521] border-r border-[#2B2B40] p-3 space-y-1 overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-3 py-2">
              Управление контентом
            </div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'dashboard' ? 'bg-[#6366F1] text-white shadow' : 'text-gray-400 hover:bg-[#202030] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Сводка & KPI</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'news' ? 'bg-[#6366F1] text-white shadow' : 'text-gray-400 hover:bg-[#202030] hover:text-white'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>Новости & Статьи ({news.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'events' ? 'bg-[#6366F1] text-white shadow' : 'text-gray-400 hover:bg-[#202030] hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Афиша событий ({events.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('tours')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'tours' ? 'bg-[#6366F1] text-white shadow' : 'text-gray-400 hover:bg-[#202030] hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Заявки на экскурсии ({tourRequests.filter(t => t.status === 'pending').length})</span>
            </button>

            {/* Admin-only navigation items */}
            {role === 'admin' && (
              <>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-3 pt-4 pb-2">
                  Система и Безопасность
                </div>
                <button
                  onClick={() => setActiveTab('sync')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'sync' ? 'bg-[#6366F1] text-white shadow' : 'text-gray-400 hover:bg-[#202030] hover:text-white'
                  }`}
                >
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <span>Межконтурный шлюз</span>
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'seo' ? 'bg-[#6366F1] text-white shadow' : 'text-gray-400 hover:bg-[#202030] hover:text-white'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>SEO & Метатеги</span>
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'files' ? 'bg-[#6366F1] text-white shadow' : 'text-gray-400 hover:bg-[#202030] hover:text-white'
                  }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Менеджер медиафайлов</span>
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'logs' ? 'bg-[#6366F1] text-white shadow' : 'text-gray-400 hover:bg-[#202030] hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Журнал аудита ({auditLogs.length})</span>
                </button>
              </>
            )}
          </aside>

          {/* Content Area */}
          <main className="flex-1 p-6 overflow-y-auto bg-[#1E1E2D]">
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Сводная статистика музея</h2>
                    <p className="text-xs text-gray-400">
                      Мониторинг активности посетителей, билетов и синхронизации
                    </p>
                  </div>
                  {role === 'admin' && (
                    <button
                      onClick={handleSyncContour}
                      disabled={syncingLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white transition disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${syncingLoading ? 'animate-spin' : ''}`} />
                      <span>{syncingLoading ? 'Выгрузка...' : 'Опубликовать на публичный сервер'}</span>
                    </button>
                  )}
                </div>

                {syncSuccessMsg && (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{syncSuccessMsg}</span>
                  </div>
                )}

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#27273A] rounded-xl border border-[#323248]">
                    <div className="text-xs text-gray-400">Продано билетов</div>
                    <div className="text-2xl font-bold text-white mt-1">1 420</div>
                    <div className="text-[11px] text-emerald-400 mt-1">↑ +14% к прошлому месяцу</div>
                  </div>
                  <div className="p-4 bg-[#27273A] rounded-xl border border-[#323248]">
                    <div className="text-xs text-gray-400">Заявок на экскурсии</div>
                    <div className="text-2xl font-bold text-amber-300 mt-1">{tourRequests.length}</div>
                    <div className="text-[11px] text-gray-400 mt-1">Школьные и групповые</div>
                  </div>
                  <div className="p-4 bg-[#27273A] rounded-xl border border-[#323248]">
                    <div className="text-xs text-gray-400">Действующих выставок</div>
                    <div className="text-2xl font-bold text-indigo-400 mt-1">{exhibitions.length}</div>
                    <div className="text-[11px] text-gray-400 mt-1">Включая передвижные</div>
                  </div>
                  <div className="p-4 bg-[#27273A] rounded-xl border border-[#323248]">
                    <div className="text-xs text-gray-400">Межконтурный статус</div>
                    <div className="text-base font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Синхронизировано</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono mt-1">
                      Check: {contourSync.lastSyncChecksum.substring(0, 10)}...
                    </div>
                  </div>
                </div>

                {/* Dual-contour architecture info per ТЗ 2.2.3.4 */}
                <div className="p-5 bg-[#252538] rounded-xl border border-[#383852] space-y-3">
                  <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Двухконтурная архитектура безопасности (ТЗ 2.2.3.4)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-[#1A1A28] rounded border border-gray-700/50 space-y-1">
                      <div className="font-bold text-gray-200">1. Контур управления (Бэкенд)</div>
                      <div className="text-gray-400">
                        Изолированный сервер в защищенном сегменте сети музея (Laravel 12, PostgreSQL). Доступ разрешен только с доверенных IP-адресов сотрудников.
                      </div>
                    </div>
                    <div className="p-3 bg-[#1A1A28] rounded border border-gray-700/50 space-y-1">
                      <div className="font-bold text-gray-200">2. Публичный контур (Фронтенд)</div>
                      <div className="text-gray-400">
                        Сервер musbread.ru (Nginx Reverse Proxy + React SPA). Работает в строгом режиме «только для чтения» (read-only), исключая прямые атаки на CMS.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: NEWS & ARTICLES */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Управление публикациями и новостями</h2>
                    <p className="text-xs text-gray-400">
                      Создание, форматирование, визуальный редактор (WYSIWYG) и публикация
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingNews({
                        id: 'news-' + Date.now(),
                        title: '',
                        titleEn: '',
                        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
                        summary: '',
                        contentHtml: '<p>Текст новой публикации...</p>',
                        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
                        imageAlt: 'Описание изображения',
                        published: true,
                        metaTitle: 'Заголовок страницы для поисковиков',
                        metaDesc: 'Краткое описание страницы',
                        h1: 'Основной заголовок H1'
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold text-white transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить новость</span>
                  </button>
                </div>

                {editingNews ? (
                  <form onSubmit={handleSaveNewsForm} className="p-5 bg-[#252538] rounded-xl border border-[#3A3A54] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                      <h3 className="font-bold text-sm text-white">Редактирование материала</h3>
                      <button
                        type="button"
                        onClick={() => setEditingNews(null)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Отмена
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Заголовок публикации *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingNews.title}
                          onChange={e => setEditingNews({ ...editingNews, title: e.target.value })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Дата публикации *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingNews.date}
                          onChange={e => setEditingNews({ ...editingNews, date: e.target.value })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Краткий анонс (лид) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={editingNews.summary}
                        onChange={e => setEditingNews({ ...editingNews, summary: e.target.value })}
                        className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                      />
                    </div>

                    {/* WYSIWYG & HTML Mode Toggle per ТЗ 2.2.3.7.2 */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-gray-300">
                          Текст статьи (WYSIWYG / HTML-редактор):
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsHtmlMode(!isHtmlMode)}
                          className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>{isHtmlMode ? 'Визуальный режим' : 'HTML-код'}</span>
                        </button>
                      </div>
                      <textarea
                        rows={6}
                        required
                        value={editingNews.contentHtml}
                        onChange={e => setEditingNews({ ...editingNews, contentHtml: e.target.value })}
                        className="w-full p-2.5 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white font-mono"
                      />
                    </div>

                    {/* Image URL & ALT text */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          URL изображения *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingNews.image}
                          onChange={e => setEditingNews({ ...editingNews, image: e.target.value })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Alt-текст изображения (по ТЗ 2.2.3.6.3) *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingNews.imageAlt}
                          onChange={e => setEditingNews({ ...editingNews, imageAlt: e.target.value })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* SEO fields */}
                    <div className="p-3 bg-[#1A1A28] rounded border border-gray-700/70 space-y-2">
                      <div className="text-xs font-bold text-gray-300">SEO-параметры статьи:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <input
                          type="text"
                          placeholder="Meta Title"
                          value={editingNews.metaTitle}
                          onChange={e => setEditingNews({ ...editingNews, metaTitle: e.target.value })}
                          className="p-1.5 bg-[#12121C] border border-gray-700 rounded text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Meta Description"
                          value={editingNews.metaDesc}
                          onChange={e => setEditingNews({ ...editingNews, metaDesc: e.target.value })}
                          className="p-1.5 bg-[#12121C] border border-gray-700 rounded text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Заголовок H1"
                          value={editingNews.h1}
                          onChange={e => setEditingNews({ ...editingNews, h1: e.target.value })}
                          className="p-1.5 bg-[#12121C] border border-gray-700 rounded text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingNews(null)}
                        className="px-4 py-2 rounded text-xs text-gray-400 hover:text-white"
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-xs font-semibold text-white transition"
                      >
                        Сохранить материал
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {news.map(item => (
                      <div
                        key={item.id}
                        className="p-4 bg-[#252538] rounded-xl border border-[#323248] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.imageAlt}
                            className="w-14 h-14 rounded object-cover flex-shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-sm text-white">{item.title}</div>
                            <div className="text-xs text-gray-400 line-clamp-1">{item.summary}</div>
                            <div className="text-[11px] text-gray-500 mt-1">
                              {item.date} · {item.published ? 'Опубликовано' : 'Черновик'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingNews(item)}
                            className="p-2 rounded bg-[#323248] hover:bg-[#40405C] text-gray-300 hover:text-white transition"
                            title="Редактировать"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteNews(item.id)}
                            className="p-2 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: EVENTS & TOURS */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">События, экскурсии и мастер-классы</h2>
                    <p className="text-xs text-gray-400">
                      Управление афишей, датами, стоимостью и Пушкинской картой
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingEvent({
                        id: 'ev-' + Date.now(),
                        title: '',
                        titleEn: '',
                        category: 'excursion',
                        date: 'Каждую субботу',
                        time: '12:00',
                        price: 350,
                        ageLimit: '6+',
                        pushkinCard: true,
                        description: '',
                        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
                        imageAlt: 'Новое событие музея',
                        spotsLeft: 20
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold text-white transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить событие</span>
                  </button>
                </div>

                {editingEvent ? (
                  <form onSubmit={handleSaveEventForm} className="p-5 bg-[#252538] rounded-xl border border-[#3A3A54] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                      <h3 className="font-bold text-sm text-white">Редактирование события афиши</h3>
                      <button
                        type="button"
                        onClick={() => setEditingEvent(null)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Отмена
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Название программы *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingEvent.title}
                          onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Категория события *
                        </label>
                        <select
                          value={editingEvent.category}
                          onChange={e => setEditingEvent({ ...editingEvent, category: e.target.value as any })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        >
                          <option value="excursion">Экскурсия</option>
                          <option value="kids">Детям</option>
                          <option value="exhibition">Выставка</option>
                          <option value="lecture">Встреча / Лекция</option>
                          <option value="workshop">Мастер-класс</option>
                          <option value="festival">Фестиваль</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Даты *</label>
                        <input
                          type="text"
                          required
                          value={editingEvent.date}
                          onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Время *</label>
                        <input
                          type="text"
                          required
                          value={editingEvent.time}
                          onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Цена (₽) *</label>
                        <input
                          type="number"
                          required
                          value={editingEvent.price}
                          onChange={e => setEditingEvent({ ...editingEvent, price: Number(e.target.value) })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Возраст *</label>
                        <input
                          type="text"
                          required
                          value={editingEvent.ageLimit}
                          onChange={e => setEditingEvent({ ...editingEvent, ageLimit: e.target.value })}
                          className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Описание *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingEvent.description}
                        onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })}
                        className="w-full p-2 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-amber-300 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={editingEvent.pushkinCard}
                        onChange={e => setEditingEvent({ ...editingEvent, pushkinCard: e.target.checked })}
                      />
                      <span>Доступно по Пушкинской карте</span>
                    </label>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingEvent(null)}
                        className="px-4 py-2 rounded text-xs text-gray-400 hover:text-white"
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-xs font-semibold text-white transition"
                      >
                        Сохранить событие
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {events.map(ev => (
                      <div
                        key={ev.id}
                        className="p-4 bg-[#252538] rounded-xl border border-[#323248] flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="font-semibold text-sm text-white">{ev.title}</div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {ev.date} · {ev.time} · {ev.price} ₽ · {ev.ageLimit}
                            {ev.pushkinCard && <span className="text-amber-400 font-bold ml-2">✓ Пушкинская карта</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingEvent(ev)}
                            className="p-2 rounded bg-[#323248] hover:bg-[#40405C] text-gray-300 hover:text-white transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteEvent(ev.id)}
                            className="p-2 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: TOUR REQUESTS & MODERATION */}
            {activeTab === 'tours' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Модерация заявок на экскурсии</h2>
                  <p className="text-xs text-gray-400">
                    Обработка входящих запросов от школ и туристических групп
                  </p>
                </div>

                {tourRequests.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-xs">
                    Нет активных заявок
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tourRequests.map(req => (
                      <div
                        key={req.id}
                        className="p-4 bg-[#252538] rounded-xl border border-[#323248] space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-700 pb-2">
                          <div>
                            <div className="font-bold text-sm text-white">{req.tourTitle}</div>
                            <div className="text-xs text-gray-400">
                              Дата: <span className="text-amber-300 font-semibold">{req.preferredDate}</span> ({req.preferredTime}) · Группа: {req.peopleCount} чел.
                            </div>
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded text-xs font-bold ${
                              req.status === 'approved'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                : req.status === 'declined'
                                ? 'bg-rose-950 text-rose-300 border border-rose-700'
                                : 'bg-amber-950 text-amber-300 border border-amber-700'
                            }`}
                          >
                            {req.status === 'approved' ? 'Одобрена' : req.status === 'declined' ? 'Отклонена' : 'Ожидает модерации'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-300">
                          <div><span className="text-gray-500">Заявитель:</span> {req.contactName}</div>
                          <div><span className="text-gray-500">Телефон:</span> {req.contactPhone}</div>
                          <div><span className="text-gray-500">Email:</span> {req.contactEmail || 'Не указан'}</div>
                        </div>

                        {req.notes && (
                          <div className="text-xs bg-[#1A1A28] p-2.5 rounded text-gray-300 italic">
                            Примечание: {req.notes}
                          </div>
                        )}

                        {req.status === 'pending' && (
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => moderateTour(req.id, 'declined')}
                              className="px-3 py-1.5 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 text-xs font-semibold"
                            >
                              Отклонить
                            </button>
                            <button
                              onClick={() => moderateTour(req.id, 'approved')}
                              className="px-4 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold"
                            >
                              Одобрить и назначить гида
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: TWO-CONTOUR SYNC GATEWAY (Admin only) */}
            {activeTab === 'sync' && role === 'admin' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Межконтурная синхронизация (ТЗ 2.2.3.4)</h2>
                  <p className="text-xs text-gray-400">
                    Управление защищенным шлюзом передачи данных на публичный веб-сервер
                  </p>
                </div>

                <div className="p-6 bg-[#252538] rounded-xl border border-[#383852] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase">Последняя синхронизация</div>
                      <div className="text-base font-bold text-white mt-0.5">{contourSync.lastSyncTimestamp}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-400 uppercase">Статус контура</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5 justify-end">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>{contourSync.contourStatus === 'syncing' ? 'Выгрузка...' : 'Готов к работе'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1A1A28] rounded border border-gray-700/60 font-mono text-xs space-y-1">
                    <div className="text-gray-400">Контрольная сумма пакета (SHA-256 Checksum):</div>
                    <div className="text-emerald-300 break-all">{contourSync.lastSyncChecksum}</div>
                  </div>

                  <div className="text-xs text-gray-400 leading-relaxed">
                    Нажатие кнопки выполняет экспорт статического контента (HTML, CSS, JSON) и кэшей из изолированного контура управления CMS на фронтенд-сервер Nginx через закрытый VPN-канал с автоматической сверкой контрольных сумм.
                  </div>

                  <button
                    onClick={handleSyncContour}
                    disabled={syncingLoading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-bold text-white transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <RefreshCw className={`w-4 h-4 ${syncingLoading ? 'animate-spin' : ''}`} />
                    <span>{syncingLoading ? 'Выполняется синхронизация...' : 'Опубликовать на публичный сервер сейчас'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: SEO & METATAGS (Admin only) */}
            {activeTab === 'seo' && role === 'admin' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">SEO-оптимизация и метаданные (ТЗ 2.2.3.6.3)</h2>
                  <p className="text-xs text-gray-400">
                    Управление Meta-Title, Meta-Description, заголовками H1 и картой сайта
                  </p>
                </div>

                <div className="space-y-4">
                  {seoPages.map((page, idx) => (
                    <div key={idx} className="p-4 bg-[#252538] rounded-xl border border-[#323248] space-y-3">
                      <div className="font-mono text-xs text-indigo-400 font-bold">{page.path}</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Meta Title</label>
                          <input
                            type="text"
                            value={page.title}
                            onChange={e => {
                              const copy = [...seoPages];
                              copy[idx].title = e.target.value;
                              setSeoPages(copy);
                            }}
                            className="w-full p-1.5 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Meta Description</label>
                          <input
                            type="text"
                            value={page.desc}
                            onChange={e => {
                              const copy = [...seoPages];
                              copy[idx].desc = e.target.value;
                              setSeoPages(copy);
                            }}
                            className="w-full p-1.5 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Заголовок H1</label>
                          <input
                            type="text"
                            value={page.h1}
                            onChange={e => {
                              const copy = [...seoPages];
                              copy[idx].h1 = e.target.value;
                              setSeoPages(copy);
                            }}
                            className="w-full p-1.5 bg-[#1A1A28] border border-gray-700 rounded text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: FILES (Admin only) */}
            {activeTab === 'files' && role === 'admin' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Менеджер медиафайлов (Drag-and-Drop)</h2>
                    <p className="text-xs text-gray-400">
                      Хранилище документов, изображений и афиш
                    </p>
                  </div>
                  <label className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold text-white transition cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Загрузить файл</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setMediaFiles(prev => [
                            {
                              name: file.name,
                              size: `${(file.size / 1024).toFixed(0)} KB`,
                              date: new Date().toISOString().split('T')[0],
                              type: file.type || 'file'
                            },
                            ...prev
                          ]);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Dropzone simulation */}
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center bg-[#1A1A28]/50">
                  <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <div className="text-xs text-gray-300 font-medium">
                    Перетащите файлы сюда для загрузки (JPG, PNG, WebP, PDF)
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1">
                    Автоматическая оптимизация WebP и сжатие по стандартам ТЗ
                  </div>
                </div>

                <div className="space-y-2">
                  {mediaFiles.map((f, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#252538] rounded-lg border border-[#323248] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 font-mono">
                        <FolderOpen className="w-4 h-4 text-amber-400" />
                        <span className="text-white font-medium">{f.name}</span>
                        <span className="text-gray-500">({f.size})</span>
                      </div>
                      <div className="text-gray-400">{f.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: AUDIT LOGS (Admin only) */}
            {activeTab === 'logs' && role === 'admin' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Журнал аудита действий (ТЗ 2.2.3.2)</h2>
                  <p className="text-xs text-gray-400">
                    Логирование действий редакторов, синхронизаций и безопасности
                  </p>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {auditLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-3 bg-[#1A1A28] rounded border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              log.status === 'success' ? 'bg-emerald-400' : log.status === 'warn' ? 'bg-amber-400' : 'bg-rose-400'
                            }`}
                          />
                          <span className="text-gray-400 text-[11px]">{log.timestamp}</span>
                          <span className="font-bold text-indigo-300">[{log.user}]</span>
                          <span className="text-white">{log.action}</span>
                        </div>
                        <div className="text-gray-400 text-[11px] mt-0.5 pl-4">
                          Цель: {log.target}
                        </div>
                      </div>
                      <div className="text-[11px] text-gray-500 pl-4 sm:pl-0">
                        {log.ipAddress}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
