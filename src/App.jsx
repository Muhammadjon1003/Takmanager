import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AllTasks from './pages/AllTasks';
import PriorityTasks from './pages/PriorityTasks';
import Schedule from './pages/Schedule';
import { getTasksFromLocalStorage } from './utils/taskUtils';
import { getThemeFromLocalStorage, saveThemeToLocalStorage } from './utils/themeUtils';

function App() {
  const [tasks, setTasks] = useState(getTasksFromLocalStorage);
  const [isDarkMode, setIsDarkMode] = useState(getThemeFromLocalStorage);

  useEffect(() => {
    saveThemeToLocalStorage(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/dashboard" element={<Dashboard tasks={tasks} setTasks={setTasks} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/all-tasks" element={<AllTasks tasks={tasks} setTasks={setTasks} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/priority-tasks" element={<PriorityTasks tasks={tasks} setTasks={setTasks} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/schedule" element={<Schedule tasks={tasks} setTasks={setTasks} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
