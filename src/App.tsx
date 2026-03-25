import { Navigate, Route, Routes } from 'react-router-dom';
import DocumentFlowPlaceholderPage from './pages/Documents/DocumentFlowPlaceholderPage';
import DocumentsHomePage from './pages/Documents/DocumentsHomePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/documents" replace />} />
      <Route path="/documents" element={<DocumentsHomePage />} />
      <Route
        path="/documents/:flowId"
        element={<DocumentFlowPlaceholderPage />}
      />
    </Routes>
  );
}