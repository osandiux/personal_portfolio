import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RootShell } from './components/chrome/RootShell';
import { SiteShell } from './components/chrome/SiteShell';
import { StudioShell } from './studio/StudioShell';
import { IndexPage } from './pages/IndexPage';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectPage } from './pages/ProjectPage';
import { AboutPage } from './pages/AboutPage';
import { BuildPage } from './pages/BuildPage';
import { HomePage as StudioHomePage } from './studio/pages/HomePage';
import { WorkPage as StudioWorkPage } from './studio/pages/WorkPage';
import { ServicesPage as StudioServicesPage } from './studio/pages/ServicesPage';
import { AgencyPage as StudioAgencyPage } from './studio/pages/AgencyPage';
import { CulturePage as StudioCulturePage } from './studio/pages/CulturePage';
import { CraftShell } from './craft/CraftShell';
import { HomePage as CraftHomePage } from './craft/pages/HomePage';
import { BcpPage as CraftBcpPage } from './craft/pages/BcpPage';
import { SapShell } from './1sap/SapShell';
import { HomePage as SapHomePage } from './1sap/pages/HomePage';
import { Os1Shell } from './os1/Os1Shell';
import { HomePage as Os1HomePage } from './os1/pages/HomePage';
import { ObsShell } from './obs/ObsShell';
import { HomePage as ObsHomePage } from './obs/pages/HomePage';
import { AboutPage as ObsAboutPage } from './obs/pages/AboutPage';
import { WorkPage as ObsWorkPage } from './obs/pages/WorkPage';
import { Mix1Shell } from './mix1/Mix1Shell';
import { HomePage as Mix1HomePage } from './mix1/pages/HomePage';
import { WorkPage as Mix1WorkPage } from './mix1/pages/WorkPage';
import { AboutPage as Mix1AboutPage } from './mix1/pages/AboutPage';
import { POISED_BASE } from './content/site';
import { MediaBlocksProvider } from './media-blocks/MediaBlocks';
import { WireframeProvider } from './wireframe/Wireframe';
import { usePageFade } from './hooks/usePageFade';
import './components/chrome/page-fade.css';

function AppRoutes() {
  const { location, visible } = usePageFade();
  return (
    <div className={`page-fade${visible ? ' is-in' : ''}`}>
      <Routes location={location}>
        <Route element={<RootShell />}>
          <Route index element={<IndexPage />} />
          <Route element={<SiteShell />}>
            <Route path="poised1" element={<HomePage />} />
            <Route path="poised1/work" element={<WorkPage />} />
            <Route path="poised1/project" element={<ProjectPage />} />
            <Route path="poised1/about" element={<AboutPage />} />
            <Route path="poised1/build" element={<BuildPage />} />
          </Route>
          <Route path="work" element={<Navigate to={`${POISED_BASE}/work`} replace />} />
          <Route path="project" element={<Navigate to={`${POISED_BASE}/project`} replace />} />
          <Route path="about" element={<Navigate to={`${POISED_BASE}/about`} replace />} />
          <Route path="build" element={<Navigate to={`${POISED_BASE}/build`} replace />} />
        </Route>
        <Route path="studio" element={<StudioShell />}>
          <Route index element={<StudioHomePage />} />
          <Route path="work" element={<StudioWorkPage />} />
          <Route path="services" element={<StudioServicesPage />} />
          <Route path="agency" element={<StudioAgencyPage />} />
          <Route path="culture" element={<StudioCulturePage />} />
        </Route>
        <Route path="craft" element={<CraftShell />}>
          <Route index element={<CraftHomePage />} />
          <Route path="bcp" element={<CraftBcpPage />} />
        </Route>
        <Route path="1sap" element={<SapShell />}>
          <Route index element={<SapHomePage />} />
        </Route>
        <Route path="os1" element={<Os1Shell />}>
          <Route index element={<Os1HomePage />} />
        </Route>
        <Route path="obs" element={<ObsShell />}>
          <Route index element={<ObsHomePage />} />
          <Route path="about" element={<ObsAboutPage />} />
          <Route path="work/:slug" element={<ObsWorkPage />} />
        </Route>
        <Route path="mix1" element={<Mix1Shell />}>
          <Route index element={<Mix1HomePage />} />
          <Route path="work" element={<Mix1WorkPage />} />
          <Route path="about" element={<Mix1AboutPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MediaBlocksProvider>
        <WireframeProvider>
          <AppRoutes />
        </WireframeProvider>
      </MediaBlocksProvider>
    </BrowserRouter>
  );
}
