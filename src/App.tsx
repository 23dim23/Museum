import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AccessibilityBar } from './components/AccessibilityBar';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';

// Modals
import { TicketModal } from './components/TicketModal';
import { TourBookingModal } from './components/TourBookingModal';
import { QualitySurveyModal } from './components/QualitySurveyModal';
import { FeedbackModal } from './components/FeedbackModal';
import { SearchModal } from './components/SearchModal';
import { AdminPanelModal } from './components/AdminPanel/AdminPanelModal';

// Views
import { HomeView } from './views/HomeView';
import { MuseumView } from './views/MuseumView';
import { VisitorsView } from './views/VisitorsView';
import { EventsView } from './views/EventsView';
import { ToursView } from './views/ToursView';
import { KidsView } from './views/KidsView';
import { ExhibitionsView } from './views/ExhibitionsView';
import { ScienceView } from './views/ScienceView';

const MainRouter: React.FC = () => {
  const { currentPath } = useApp();

  if (currentPath === '/' || !currentPath) {
    return <HomeView />;
  }

  if (currentPath.startsWith('/museum')) {
    return <MuseumView />;
  }

  if (currentPath.startsWith('/visitors')) {
    return <VisitorsView />;
  }

  if (currentPath.startsWith('/events')) {
    return <EventsView />;
  }

  if (currentPath.startsWith('/tours')) {
    return <ToursView />;
  }

  if (currentPath.startsWith('/kids')) {
    return <KidsView />;
  }

  if (currentPath.startsWith('/exhibitions')) {
    return <ExhibitionsView />;
  }

  if (currentPath.startsWith('/science')) {
    return <ScienceView />;
  }

  return <HomeView />;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241E] selection:bg-[#D4A373] selection:text-white">
      {/* Visual Impairment Accessibility Bar (ГОСТ Р 70176-2022) */}
      <AccessibilityBar />

      {/* Main Museum Header & Mega-Menu */}
      <Header />

      {/* Breadcrumbs for subpages per ТЗ 2.2.3.6.2 */}
      <Breadcrumbs />

      {/* Page Content */}
      <main id="main-content" className="flex-1">
        <MainRouter />
      </main>

      {/* Official Museum Footer per ТЗ 2.2.3.6.1 */}
      <Footer />

      {/* Interactive Service Modals */}
      <TicketModal />
      <TourBookingModal />
      <QualitySurveyModal />
      <FeedbackModal />
      <SearchModal />
      <AdminPanelModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
