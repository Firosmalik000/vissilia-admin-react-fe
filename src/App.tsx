import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Activity, Chart, Dashboard, EChart, Invest, Login, MainInvest, Marketing, Notification, Produk, ProgramChart, ProgramMarketing, ProgramProduk, User } from './pages';
import MainLayout from './fragment/MainLayout';
import { setNavigator } from './utils/navigate';

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <Routes>
      {/* Login route does not use MainLayout */}
      <Route path="/login" element={<Login.default />} />

      {/* Routes that use MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard.default />} />
        <Route path="invest" element={<MainInvest.default />} />
        <Route path="approval/chart" element={<Chart.default />} />
        <Route path="approval/invest" element={<Invest.default />} />
        <Route path="e-commerce/chart" element={<EChart.default />} />
        <Route path="e-commerce/produk" element={<Produk.default />} />
        <Route path="e-commerce/marketing" element={<Marketing.default />} />
        <Route path="program/program-chart" element={<ProgramChart.default />} />
        <Route path="program/program-produk" element={<ProgramProduk.default />} />
        <Route path="program/program-marketing" element={<ProgramMarketing.default />} />
        <Route path="notification" element={<Notification.default />} />
        <Route path="activity" element={<Activity.default />} />
        <Route path="user" element={<User.default />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
