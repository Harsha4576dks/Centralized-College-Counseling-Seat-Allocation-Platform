import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/loginForm';
import Home from './pages/Home';
import StudentDetails from './pages/StudentDetails';
import PreferenceDetails from './pages/preference';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student-details" element={<StudentDetails/>}/>
        <Route path="/course-preferences" element={<PreferenceDetails/>}/>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;