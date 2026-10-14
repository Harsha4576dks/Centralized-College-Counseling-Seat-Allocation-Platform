import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import StudentDashboard from '../components/studentDashboard';
import App from './App';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <StudentDashboard studentId={1}/>
    </StrictMode>
);