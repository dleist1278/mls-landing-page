import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import BlueprintPage from './pages/BlueprintPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/blueprint" element={<BlueprintPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;