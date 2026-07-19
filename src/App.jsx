import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import PlaygroundPage from './pages/PlaygroundPage'
import ChallengesPage from './pages/ChallengesPage'
import QuizPage from './pages/QuizPage'
import LeaderboardPage from './pages/LeaderboardPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}
