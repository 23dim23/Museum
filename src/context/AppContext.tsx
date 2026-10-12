import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  AccessibilitySettings,
  Exhibition,
  EventItem,
  CollectionItem,
  StaffMember,
  OfficialDoc,
  NewsItem,
  TicketBooking,
  TourRequest,
  FeedbackSubmission,
  QualitySurvey,
  AuditLogItem,
  ContourSyncState
} from '../types';
import {
  INITIAL_EXHIBITIONS,
  INITIAL_EVENTS,
  INITIAL_COLLECTION,
  INITIAL_STAFF,
  INITIAL_DOCUMENTS,
  INITIAL_NEWS,
  INITIAL_AUDIT_LOGS,
  INITIAL_CONTOUR_SYNC
} from '../data/initialData';

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Accessibility
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  toggleAccessibility: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;

  // Modals
  isTicketModalOpen: boolean;
  setIsTicketModalOpen: (open: boolean) => void;
  selectedEventForTicket: EventItem | null;
  setSelectedEventForTicket: (ev: EventItem | null) => void;
  isTourModalOpen: boolean;
  setIsTourModalOpen: (open: boolean) => void;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
  isQualitySurveyModalOpen: boolean;
  setIsQualitySurveyModalOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;

  // Data
  news: NewsItem[];
  events: EventItem[];
  exhibitions: Exhibition[];
  collection: CollectionItem[];
  staff: StaffMember[];
  officialDocs: OfficialDoc[];
  tickets: TicketBooking[];
  tourRequests: TourRequest[];
  feedbackList: FeedbackSubmission[];
  qualitySurveys: QualitySurvey[];
  auditLogs: AuditLogItem[];
  contourSync: ContourSyncState;

  // User submissions
  purchaseTicket: (booking: Omit<TicketBooking, 'id' | 'ticketNumber' | 'createdAt' | 'status' | 'qrCodeToken'>) => TicketBooking;
  requestTour: (req: Omit<TourRequest, 'id' | 'createdAt' | 'status'>) => void;
  sendFeedback: (fb: Omit<FeedbackSubmission, 'id' | 'createdAt' | 'resolved'>) => void;
  sendSurvey: (survey: Omit<QualitySurvey, 'id' | 'createdAt'>) => void;

  // CMS functions
  saveNews: (item: NewsItem) => void;
  deleteNews: (id: string) => void;
  saveEvent: (item: EventItem) => void;
  deleteEvent: (id: string) => void;
  saveExhibition: (item: Exhibition) => void;
  deleteExhibition: (id: string) => void;
  moderateTour: (id: string, status: 'approved' | 'declined') => void;
  syncContour: () => Promise<string>;
}

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  enabled: false,
  fontSize: '100',
  colorScheme: 'default',
  letterSpacing: 'normal',
  hideImages: false,
  speechEnabled: false
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [role, setRole] = useState<UserRole>('visitor');
  const [language, setLanguage] = useState<Language>('ru');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('mb_accessibility');
      return saved ? JSON.parse(saved) : DEFAULT_ACCESSIBILITY;
    } catch {
      return DEFAULT_ACCESSIBILITY;
    }
  });

  // Modals
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedEventForTicket, setSelectedEventForTicket] = useState<EventItem | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isQualitySurveyModalOpen, setIsQualitySurveyModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Museum Data
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(INITIAL_EXHIBITIONS);
  const [collection] = useState<CollectionItem[]>(INITIAL_COLLECTION);
  const [staff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [officialDocs] = useState<OfficialDoc[]>(INITIAL_DOCUMENTS);
  const [tickets, setTickets] = useState<TicketBooking[]>([]);
  const [tourRequests, setTourRequests] = useState<TourRequest[]>([
    {
      id: 'tour-init-1',
      groupType: 'school',
      tourTitle: 'Обзорная экскурсия «Хлеб — всему голова»',
      preferredDate: '2026-10-25',
      preferredTime: '11:00',
      peopleCount: 24,
      contactName: 'Смирнова Анна (Гимназия № 67)',
      contactPhone: '+7 (911) 222-33-44',
      contactEmail: 'school67@spb.edu',
      notes: '5-й класс, требуется экскурсовод с опытом работы с подростками',
      status: 'pending',
      createdAt: '2026-10-11 14:20'
    }
  ]);
  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>([]);
  const [qualitySurveys, setQualitySurveys] = useState<QualitySurvey[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [contourSync, setContourSync] = useState<ContourSyncState>(INITIAL_CONTOUR_SYNC);

  // Persist accessibility & apply CSS classes to body
  useEffect(() => {
    localStorage.setItem('mb_accessibility', JSON.stringify(accessibility));

    const body = document.body;
    // Clear scheme classes
    body.classList.remove(
      'access-scheme-bw',
      'access-scheme-wb',
      'access-scheme-blue',
      'access-scheme-yellow',
      'font-scale-100',
      'font-scale-150',
      'font-scale-200',
      'spacing-normal',
      'spacing-medium',
      'spacing-large',
      'hide-visual-images'
    );

    if (accessibility.enabled) {
      if (accessibility.colorScheme === 'bw') body.classList.add('access-scheme-bw');
      if (accessibility.colorScheme === 'wb') body.classList.add('access-scheme-wb');
      if (accessibility.colorScheme === 'blue') body.classList.add('access-scheme-blue');
      if (accessibility.colorScheme === 'yellow') body.classList.add('access-scheme-yellow');

      body.classList.add(`font-scale-${accessibility.fontSize}`);
      body.classList.add(`spacing-${accessibility.letterSpacing}`);
      if (accessibility.hideImages) body.classList.add('hide-visual-images');
    }
  }, [accessibility]);

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => ({ ...prev, ...settings }));
  };

  const toggleAccessibility = () => {
    setAccessibility(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
  };

  // Text-to-Speech function for visually impaired users
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ru' ? 'ru-RU' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    stopSpeaking();
  };

  // Ticket booking
  const purchaseTicket = (booking: Omit<TicketBooking, 'id' | 'ticketNumber' | 'createdAt' | 'status' | 'qrCodeToken'>): TicketBooking => {
    const newBooking: TicketBooking = {
      ...booking,
      id: 'tb-' + Date.now(),
      ticketNumber: 'MB-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleString('ru-RU'),
      status: 'paid',
      qrCodeToken: 'MUSBREAD-AUTH-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    };
    setTickets(prev => [newBooking, ...prev]);

    // Audit log
    const logItem: AuditLogItem = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleString('ru-RU'),
      user: booking.customerName,
      role: 'visitor',
      action: 'Покупка билетов онлайн',
      target: `Билет № ${newBooking.ticketNumber} (${booking.visitDate})`,
      ipAddress: '178.62.204.12',
      status: 'success'
    };
    setAuditLogs(prev => [logItem, ...prev]);
    return newBooking;
  };

  const requestTour = (req: Omit<TourRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: TourRequest = {
      ...req,
      id: 'tour-' + Date.now(),
      createdAt: new Date().toLocaleString('ru-RU'),
      status: 'pending'
    };
    setTourRequests(prev => [newReq, ...prev]);

    const logItem: AuditLogItem = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleString('ru-RU'),
      user: req.contactName,
      role: 'visitor',
      action: 'Подача заявки на экскурсию',
      target: `${req.tourTitle} (${req.peopleCount} чел.)`,
      ipAddress: '178.62.204.12',
      status: 'success'
    };
    setAuditLogs(prev => [logItem, ...prev]);
  };

  const sendFeedback = (fb: Omit<FeedbackSubmission, 'id' | 'createdAt' | 'resolved'>) => {
    const newFb: FeedbackSubmission = {
      ...fb,
      id: 'fb-' + Date.now(),
      createdAt: new Date().toLocaleString('ru-RU'),
      resolved: false
    };
    setFeedbackList(prev => [newFb, ...prev]);
  };

  const sendSurvey = (survey: Omit<QualitySurvey, 'id' | 'createdAt'>) => {
    const newSurv: QualitySurvey = {
      ...survey,
      id: 'survey-' + Date.now(),
      createdAt: new Date().toLocaleString('ru-RU')
    };
    setQualitySurveys(prev => [newSurv, ...prev]);
  };

  // CMS handlers
  const saveNews = (item: NewsItem) => {
    setNews(prev => {
      const idx = prev.findIndex(n => n.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [item, ...prev];
    });
    setContourSync(c => ({ ...c, pendingChangesCount: c.pendingChangesCount + 1, contourStatus: 'pending_sync' }));
    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        timestamp: new Date().toLocaleString('ru-RU'),
        user: role,
        role: role,
        action: 'Сохранение материала',
        target: `Новость: ${item.title}`,
        ipAddress: '192.168.10.42 (CMS MoonShine)',
        status: 'success'
      },
      ...prev
    ]);
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    setContourSync(c => ({ ...c, pendingChangesCount: c.pendingChangesCount + 1, contourStatus: 'pending_sync' }));
  };

  const saveEvent = (item: EventItem) => {
    setEvents(prev => {
      const idx = prev.findIndex(e => e.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [item, ...prev];
    });
    setContourSync(c => ({ ...c, pendingChangesCount: c.pendingChangesCount + 1, contourStatus: 'pending_sync' }));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setContourSync(c => ({ ...c, pendingChangesCount: c.pendingChangesCount + 1, contourStatus: 'pending_sync' }));
  };

  const saveExhibition = (item: Exhibition) => {
    setExhibitions(prev => {
      const idx = prev.findIndex(e => e.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [item, ...prev];
    });
    setContourSync(c => ({ ...c, pendingChangesCount: c.pendingChangesCount + 1, contourStatus: 'pending_sync' }));
  };

  const deleteExhibition = (id: string) => {
    setExhibitions(prev => prev.filter(e => e.id !== id));
    setContourSync(c => ({ ...c, pendingChangesCount: c.pendingChangesCount + 1, contourStatus: 'pending_sync' }));
  };

  const moderateTour = (id: string, status: 'approved' | 'declined') => {
    setTourRequests(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        timestamp: new Date().toLocaleString('ru-RU'),
        user: role,
        role: role,
        action: `Модерация заявки на экскурсию (${status === 'approved' ? 'Одобрена' : 'Отклонена'})`,
        target: `Заявка #${id}`,
        ipAddress: '192.168.10.42 (CMS MoonShine)',
        status: status === 'approved' ? 'success' : 'warn'
      },
      ...prev
    ]);
  };

  // Two-contour synchronization simulator
  const syncContour = async (): Promise<string> => {
    setContourSync(c => ({ ...c, contourStatus: 'syncing' }));
    
    // Simulate checksum computation & secure transfer
    await new Promise(r => setTimeout(r, 1200));
    const randomHex = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const nowStr = new Date().toLocaleString('ru-RU') + ' MSK';

    setContourSync({
      lastSyncTimestamp: nowStr,
      lastSyncChecksum: randomHex,
      pendingChangesCount: 0,
      contourStatus: 'synchronized',
      serverEnvironment: 'isolated_internal'
    });

    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        timestamp: new Date().toLocaleString('ru-RU'),
        user: role,
        role: 'admin',
        action: 'Межконтурная синхронизация (MoonShine -> Nginx)',
        target: `SHA256: ${randomHex.substring(0, 16)}... Целостность подтверждена`,
        ipAddress: '192.168.10.1 (Выделенный канал)',
        status: 'success'
      },
      ...prev
    ]);

    return randomHex;
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        role,
        setRole,
        language,
        setLanguage,
        accessibility,
        updateAccessibility,
        toggleAccessibility,
        speakText,
        stopSpeaking,
        isTicketModalOpen,
        setIsTicketModalOpen,
        selectedEventForTicket,
        setSelectedEventForTicket,
        isTourModalOpen,
        setIsTourModalOpen,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        isQualitySurveyModalOpen,
        setIsQualitySurveyModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        news,
        events,
        exhibitions,
        collection,
        staff,
        officialDocs,
        tickets,
        tourRequests,
        feedbackList,
        qualitySurveys,
        auditLogs,
        contourSync,
        purchaseTicket,
        requestTour,
        sendFeedback,
        sendSurvey,
        saveNews,
        deleteNews,
        saveEvent,
        deleteEvent,
        saveExhibition,
        deleteExhibition,
        moderateTour,
        syncContour
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
