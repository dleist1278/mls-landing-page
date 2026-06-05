import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import ThankYouGuide from './pages/ThankYouGuide';
import BlueprintPage from './pages/BlueprintPage';
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';
import QuizJoin from './pages/QuizJoin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/quiz/join" element={<QuizJoin />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/thank-you-guide" element={<ThankYouGuide />} />
        <Route path="/blueprint" element={<BlueprintPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;