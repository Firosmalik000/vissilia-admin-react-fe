import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, Invest } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard.default />} />
          <Route path="/approval/invest" element={<Invest.default />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
