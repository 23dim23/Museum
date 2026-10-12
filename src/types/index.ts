export type UserRole = 'visitor' | 'editor' | 'admin';

export type Language = 'ru' | 'en';

export interface AccessibilitySettings {
  enabled: boolean;
  fontSize: '100' | '150' | '200';
  colorScheme: 'default' | 'bw' | 'wb' | 'blue' | 'yellow';
  letterSpacing: 'normal' | 'medium' | 'large';
  hideImages: boolean;
  speechEnabled: boolean;
}

export interface MenuItem {
  id: string;
  title: string;
  titleEn: string;
  path: string;
  children?: {
    id: string;
    title: string;
    titleEn: string;
    path: string;
    desc?: string;
  }[];
}

export interface Exhibition {
  id: string;
  title: string;
  titleEn: string;
  status: 'current' | 'upcoming' | 'traveling' | 'archive';
  dates: string;
  hall: string;
  description: string;
  descriptionEn: string;
  image: string;
  imageAlt: string;
  pushkinCard: boolean;
  curator?: string;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'excursion' | 'kids' | 'exhibition' | 'lecture' | 'festival' | 'workshop' | 'archive';
  date: string;
  time: string;
  price: number;
  ageLimit: string;
  pushkinCard: boolean;
  description: string;
  image: string;
  imageAlt: string;
  spotsLeft: number;
}

export interface CollectionItem {
  id: string;
  invNumber: string;
  title: string;
  era: string;
  material: string;
  description: string;
  goskatalogUrl: string;
  image: string;
  imageAlt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo: string;
  photoAlt: string;
}

export interface OfficialDoc {
  id: string;
  title: string;
  number: string;
  date: string;
  category: 'charter' | 'accessibility' | 'safety' | 'procurement' | 'financial';
  fileSize: string;
  pdfUrl: string;
  htmlAlternativeText: string; // Required by Decree № 102 and GOST R 70176-2022
}

export interface NewsItem {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  summary: string;
  contentHtml: string;
  image: string;
  imageAlt: string;
  published: boolean;
  scheduledDate?: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
}

export interface TicketBooking {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  visitDate: string;
  timeSlot: string;
  items: {
    category: string;
    count: number;
    price: number;
  }[];
  totalPrice: number;
  usePushkinCard: boolean;
  qrCodeToken: string;
  status: 'paid' | 'refunded' | 'used';
  createdAt: string;
}

export interface TourRequest {
  id: string;
  groupType: 'individual' | 'school' | 'adult_group' | 'foreign';
  tourTitle: string;
  preferredDate: string;
  preferredTime: string;
  peopleCount: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes: string;
  status: 'pending' | 'approved' | 'declined';
  createdAt: string;
}

export interface FeedbackSubmission {
  id: string;
  fullName: string;
  email: string;
  category: 'question' | 'complaint' | 'gratitude' | 'accessibility';
  message: string;
  createdAt: string;
  resolved: boolean;
}

export interface QualitySurvey {
  id: string;
  overallRating: number;
  cleanliness: number;
  politeness: number;
  accessibility: number;
  expositionInterest: number;
  comments: string;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  status: 'success' | 'warn' | 'error';
}

export interface ContourSyncState {
  lastSyncTimestamp: string;
  lastSyncChecksum: string;
  pendingChangesCount: number;
  contourStatus: 'synchronized' | 'pending_sync' | 'syncing';
  serverEnvironment: 'isolated_internal' | 'public_frontend';
}
