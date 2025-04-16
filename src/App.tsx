import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CoachDashboard from './pages/CoachDashboard';
import ClientDashboard from './pages/ClientDashboard';
import WorkoutPlans from './pages/WorkoutPlans';
import WorkoutPlanDetails from './pages/WorkoutPlanDetails';
import CoachProfile from './pages/CoachProfile';
import ClientProfile from './pages/ClientProfile';
import CoachList from './pages/CoachList';
import CreateWorkoutPlan from './pages/CreateWorkoutPlan';
import Payment from './pages/Payment';
import AboutUs from './pages/AboutUs';
import BookingSession from './pages/BookingSession';

// Protected route component for coach-only routes
const CoachRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (!user || user.role !== 'coach') {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

// Protected route component for authenticated users
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

// Client-only route component
const ClientRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (!user || user.role !== 'client') {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/book-session" element={<BookingSession />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              user ? (
                user.role === 'coach' ? (
                  <CoachDashboard />
                ) : (
                  <ClientDashboard />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/workout-plans"
            element={
              <ProtectedRoute>
                <WorkoutPlans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout-plans/create"
            element={
              <CoachRoute>
                <CreateWorkoutPlan />
              </CoachRoute>
            }
          />
          <Route
            path="/workout-plans/:id"
            element={
              <ProtectedRoute>
                <WorkoutPlanDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/coach"
            element={
              <CoachRoute>
                <CoachProfile />
              </CoachRoute>
            }
          />
          <Route
            path="/profile/client"
            element={
              <ClientRoute>
                <ClientProfile />
              </ClientRoute>
            }
          />
          <Route
            path="/find-coach"
            element={
              <ClientRoute>
                <CoachList />
              </ClientRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ClientRoute>
                <Payment />
              </ClientRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;