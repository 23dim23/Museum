import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SITE_NAVIGATION } from '../data/initialData';
import {
  Eye,
  Search,
  Ticket,
  ChevronDown,
  Menu,
  X,
  Phone,
  Clock,
  ShieldCheck,
  Globe,
  SlidersHorizontal,
  Compass,
  ArrowRight
} from 'lucide-react';
import { UserRole } from '../types';

export const Header: React.FC = () => {
  const {
    currentPath,
    navigate,
    role,
    setRole,
    language,
    setLanguage,
    accessibility,
    toggleAccessibility,
    setIsSearchModalOpen,
    setIsTicketModalOpen,
    setIsAdminPanelOpen
  } = useApp();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-shadow duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#2C241E] text-[#D8CEBE] text-xs py-1.5 px-4 sm:px-6 border-b border-[#3D322B]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Working hours & location */}
          <div className="flex items-center gap-4 text-xs font-normal">
            <span className="flex items-center gap-1.5 hidden md:inline-flex">
              <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Вт–Вс 10:00–18:00 (касса до 17:00), Пн — выходной</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
              <a href="tel:+78122945090" className="hover:text-white transition">
                +7 (812) 294-50-90
              </a>
            </span>
            <span className="hidden lg:inline text-[#A89884]">
              ул. Михайлова, 2 (м. Площадь Ленина)
            </span>
          </div>

          {/* Accessibility, Language, Social, Role Switcher */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Quick Access Environment */}
            <button
              onClick={() => handleNavClick('/visitors/accessible')}
              className="text-[#D8CEBE] hover:text-white transition text-xs font-medium hidden sm:flex items-center gap-1"
              title="Информация о доступной среде для маломобильных граждан"
            >
              <Compass className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Доступная среда</span>
            </button>

            <span className="text-[#4E3F35] hidden sm:inline">|</span>

            {/* Accessibility Mode Toggle (ГОСТ Р 70176-2022) */}
            <button
              onClick={toggleAccessibility}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition text-xs font-medium ${
                accessibility.enabled
                  ? 'bg-amber-500 text-black border-amber-400 font-bold'
                  : 'bg-[#3D322B] text-gray-200 border-[#5A493D] hover:bg-[#4E3F35]'
              }`}
              title="Режим для слабовидящих по ГОСТ Р 70176-2022"
              aria-label="Включить версию для слабовидящих"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>{accessibility.enabled ? 'Слабовидящим (ВКЛ)' : 'Для слабовидящих'}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-[#D8CEBE] hover:text-white border border-[#4E3F35] hover:border-[#6B5749]"
              title="Переключить язык (RU/EN)"
            >
              <Globe className="w-3 h-3 text-[#D4A373]" />
              <span className="font-semibold uppercase">{language}</span>
            </button>

            {/* Social media links */}
            <div className="flex items-center gap-1.5 text-xs">
              <a
                href="https://vk.com/spb_musbread"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 flex items-center justify-center rounded bg-[#3D322B] hover:bg-[#0077FF] hover:text-white transition"
                title="Мы ВКонтакте"
              >
                В
              </a>
              <a
                href="https://t.me/spb_musbread"
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 flex items-center justify-center rounded bg-[#3D322B] hover:bg-[#229ED9] hover:text-white transition"
                title="Наш Telegram-канал"
              >
                Т
              </a>
            </div>

            <span className="text-[#4E3F35]">|</span>

            {/* Role Switcher (Visitor / Editor / Admin simulation for requirement 2.2.3.2) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium border ${
                  role === 'admin'
                    ? 'bg-rose-950 text-rose-200 border-rose-700'
                    : role === 'editor'
                    ? 'bg-amber-950 text-amber-200 border-amber-700'
                    : 'bg-[#251E19] text-[#C4B7A6] border-[#4A3B31]'
                }`}
                title="Переключение ролей в демонстрационной системе музея"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                <span className="capitalize">
                  {role === 'visitor' ? 'Посетитель' : role === 'editor' ? 'Редактор' : 'Администратор'}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-[#251E19] border border-[#5A493D] rounded shadow-xl py-1 z-50 text-xs">
                  <div className="px-3 py-1.5 text-gray-400 border-b border-[#3D322B] text-[11px]">
                    Ролевая модель доступа (ТЗ 2.2.3.2):
                  </div>
                  <button
                    onClick={() => {
                      setRole('visitor');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#3D322B] flex items-center justify-between ${
                      role === 'visitor' ? 'text-amber-400 font-bold' : 'text-gray-200'
                    }`}
                  >
                    <span>Посетитель (Публичный контур)</span>
                    {role === 'visitor' && '✓'}
                  </button>
                  <button
                    onClick={() => {
                      setRole('editor');
                      setRoleDropdownOpen(false);
                      setIsAdminPanelOpen(true);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#3D322B] flex items-center justify-between ${
                      role === 'editor' ? 'text-amber-400 font-bold' : 'text-gray-200'
                    }`}
                  >
                    <span>Редактор контента (CMS)</span>
                    {role === 'editor' && '✓'}
                  </button>
                  <button
                    onClick={() => {
                      setRole('admin');
                      setRoleDropdownOpen(false);
                      setIsAdminPanelOpen(true);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#3D322B] flex items-center justify-between ${
                      role === 'admin' ? 'text-amber-400 font-bold' : 'text-gray-200'
                    }`}
                  >
                    <span>Администратор системы</span>
                    {role === 'admin' && '✓'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`bg-[#FAF7F2] text-[#2C241E] border-b border-[#E8DFC8] ${
          isScrolled ? 'shadow-md' : ''
        } transition-shadow`}
        aria-label="Основная навигация сайта"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
            aria-label="Музей Хлеба — На главную страницу"
          >
            <div className="w-12 h-12 rounded-full bg-[#3D2C1D] text-[#E8DFC8] flex items-center justify-center shadow-inner border border-[#D4A373] group-hover:scale-105 transition-transform flex-shrink-0">
              {/* Stylized Sheaf / Loaf emblem */}
              <span className="font-serif text-2xl font-bold tracking-tighter text-[#E4C59E]">
                МХ
              </span>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C241E] leading-tight">
                {language === 'ru' ? 'Музей Хлеба' : 'Bread Museum'}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#735A45] font-medium">
                {language === 'ru' ? 'Санкт-Петербург · Осн. 1988' : 'St. Petersburg · Est. 1988'}
              </div>
            </div>
          </button>

          {/* Desktop Mega-Menu Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {SITE_NAVIGATION.map(item => {
              const isActive = currentPath.startsWith(item.path);
              const isDropdownOpen = activeDropdown === item.id;

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.children?.[0]?.path || item.path)}
                    className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition ${
                      isActive
                        ? 'text-[#8C4A1D] font-bold border-b-2 border-[#8C4A1D]'
                        : 'text-[#4A3D34] hover:text-[#2C241E] hover:bg-[#F2ECE1]'
                    }`}
                    aria-expanded={isDropdownOpen}
                  >
                    <span>{language === 'ru' ? item.title : item.titleEn}</span>
                    {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  </button>

                  {/* Mega-menu dropdown panel */}
                  {item.children && isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-0 w-80 bg-white border border-[#E0D5C1] rounded-b-lg shadow-xl py-2 z-50 animate-fadeIn">
                      <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C4A1D] border-b border-[#F0E8DC] mb-1">
                        {language === 'ru' ? item.title : item.titleEn}
                      </div>
                      <div className="max-h-[380px] overflow-y-auto">
                        {item.children.map(child => (
                          <button
                            key={child.id}
                            onClick={() => handleNavClick(child.path)}
                            className="w-full text-left px-3.5 py-2 hover:bg-[#FAF6EE] text-[#3D322B] text-xs transition flex flex-col group border-l-2 border-transparent hover:border-[#8C4A1D]"
                          >
                            <span className="font-semibold group-hover:text-[#8C4A1D] flex items-center justify-between">
                              <span>{language === 'ru' ? child.title : child.titleEn}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#8C4A1D]" />
                            </span>
                            {child.desc && (
                              <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {child.desc}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2.5 rounded-full text-[#4A3D34] hover:text-[#2C241E] hover:bg-[#EFE8DC] transition"
              title="Поиск по сайту и коллекциям"
              aria-label="Открыть окно поиска по сайту"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Editor/Admin CMS shortcut button */}
            {(role === 'editor' || role === 'admin') && (
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-[#2C241E] text-amber-300 hover:bg-[#3D322B] transition border border-amber-500/40"
                title="Панель управления сайтом (CMS MoonShine)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>CMS ({role === 'admin' ? 'Админ' : 'Редактор'})</span>
              </button>
            )}

            {/* Primary CTA: Ticket Button */}
            <button
              onClick={() => setIsTicketModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#8C4A1D] hover:bg-[#733B15] text-white font-medium text-xs sm:text-sm tracking-wide shadow transition-transform active:scale-95"
              aria-label="Купить билет онлайн"
            >
              <Ticket className="w-4 h-4 text-amber-200" />
              <span>{language === 'ru' ? 'Купить билет' : 'Buy Tickets'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-[#2C241E] hover:bg-[#EFE8DC]"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E0D5C1] px-4 py-4 max-h-[80vh] overflow-y-auto">
            {/* Direct CMS access if staff */}
            {(role === 'editor' || role === 'admin') && (
              <button
                onClick={() => {
                  setIsAdminPanelOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mb-3 flex items-center justify-center gap-2 p-2.5 rounded bg-[#2C241E] text-amber-300 text-xs font-bold"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Открыть панель CMS (Laravel MoonShine)</span>
              </button>
            )}

            <div className="space-y-4">
              {SITE_NAVIGATION.map(item => (
                <div key={item.id} className="border-b border-gray-100 pb-3">
                  <div className="font-serif font-bold text-base text-[#8C4A1D] mb-1">
                    {language === 'ru' ? item.title : item.titleEn}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                    {item.children?.map(child => (
                      <button
                        key={child.id}
                        onClick={() => handleNavClick(child.path)}
                        className="text-left py-1.5 text-xs text-gray-700 hover:text-[#8C4A1D] transition flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></span>
                        <span>{language === 'ru' ? child.title : child.titleEn}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  handleNavClick('/visitors/accessible');
                }}
                className="text-left text-xs text-gray-600 hover:text-black py-1"
              >
                ♿ Доступная среда для инвалидов (ГОСТ Р 70176-2022)
              </button>
              <button
                onClick={() => {
                  handleNavClick('/visitors/pushkin-card');
                }}
                className="text-left text-xs text-amber-800 font-semibold py-1"
              >
                💳 Оплата Пушкинской картой
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
