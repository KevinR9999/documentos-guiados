import { Navigate, Route, Routes } from 'react-router-dom';
import DocumentFlowPlaceholderPage from './pages/Documents/DocumentFlowPlaceholderPage';
import DocumentsHomePage from './pages/Documents/DocumentsHomePage';
import IdealClientIntroPage from './pages/Documents/IdealClientIntroPage';
import IdealClientResultPage from './pages/Documents/IdealClientResultPage';
import IdealClientReviewPage from './pages/Documents/IdealClientReviewPage';
import IdealClientWizardPage from './pages/Documents/IdealClientWizardPage';
import InventoryOfSelfIntroPage from './pages/Documents/InventoryOfSelfIntroPage';
import InventoryOfSelfResultPage from './pages/Documents/InventoryOfSelfResultPage';
import InventoryOfSelfReviewPage from './pages/Documents/InventoryOfSelfReviewPage';
import InventoryOfSelfWizardPage from './pages/Documents/InventoryOfSelfWizardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/documents" replace />} />
      <Route path="/documents" element={<DocumentsHomePage />} />
      <Route
        path="/documents/ideal_client_manifesto"
        element={<IdealClientIntroPage />}
      />
      <Route
        path="/documents/ideal_client_manifesto/wizard"
        element={<IdealClientWizardPage />}
      />
      <Route
        path="/documents/ideal_client_manifesto/review"
        element={<IdealClientReviewPage />}
      />
      <Route
        path="/documents/ideal_client_manifesto/result"
        element={<IdealClientResultPage />}
      />
      <Route
        path="/documents/inventory_of_self"
        element={<InventoryOfSelfIntroPage />}
      />
      <Route
        path="/documents/inventory_of_self/wizard"
        element={<InventoryOfSelfWizardPage />}
      />
      <Route
        path="/documents/inventory_of_self/review"
        element={<InventoryOfSelfReviewPage />}
      />
      <Route
        path="/documents/inventory_of_self/result"
        element={<InventoryOfSelfResultPage />}
      />
      <Route
        path="/documents/:flowId"
        element={<DocumentFlowPlaceholderPage />}
      />
    </Routes>
  );
}