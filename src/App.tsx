import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Activity, Dashboard, Invest, Notification, User } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard.default />} />
          <Route path="/approval/invest" element={<Invest.default />} />
          <Route path="/notification" element={<Notification.default />} />
          <Route path="/activity" element={<Activity.default />} />
          <Route path="/user" element={<User.default />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
