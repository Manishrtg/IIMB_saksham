import { RouterProvider, Route } from './utils/router';
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutStoryPage from './pages/AboutStoryPage';
import AboutTeamPage from './pages/AboutTeamPage';
import SchoolsListPage from './pages/SchoolsListPage';
import SchoolDetailPage from './pages/SchoolDetailPage';
import SchoolsMapPage from './pages/SchoolsMapPage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import PartnerNGOPage from './pages/PartnerNGOPage';
import PartnerCSRPage from './pages/PartnerCSRPage';
import ImpactPage from './pages/ImpactPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1">
          <Route path="/" component={<HomePage />} />
          <Route path="/about/story" component={<AboutStoryPage />} />
          <Route path="/about/team" component={<AboutTeamPage />} />
          <Route path="/schools/completed" component={<SchoolsListPage status="completed" />} />
          <Route path="/schools/ongoing" component={<SchoolsListPage status="ongoing" />} />
          <Route path="/schools/pipeline" component={<SchoolsListPage status="pipeline" />} />
          <Route path="/school/:projectCode" component={<SchoolDetailPage />} />
          <Route path="/schools/map" component={<SchoolsMapPage />} />
          <Route path="/dashboard" component={<DashboardPage />} />
          <Route path="/events" component={<EventsPage />} />
          <Route path="/partner/ngo" component={<PartnerNGOPage />} />
          <Route path="/partner/csr" component={<PartnerCSRPage />} />
          <Route path="/impact" component={<ImpactPage />} />
          <Route path="/donate" component={<DonatePage />} />
          <Route path="/contact" component={<ContactPage />} />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
}

export default App;
