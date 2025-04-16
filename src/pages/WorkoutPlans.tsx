import React from 'react';
import { Dumbbell, Clock, Calendar, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

// Mock data - in a real app, this would come from an API
const workoutPlans = [
  {
    id: '1',
    title: 'Full Body Strength',
    description: 'A comprehensive full-body workout designed to build strength and muscle.',
    exercises: 5,
    duration: '45 mins',
    frequency: '3x/week',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: '2',
    title: 'HIIT Cardio Blast',
    description: 'High-intensity interval training to improve cardiovascular fitness and burn fat.',
    exercises: 3,
    duration: '30 mins',
    frequency: '4x/week',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  }
];

const WorkoutPlans: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const isCoach = user?.role === 'coach';

  const handleViewDetails = (planId: string) => {
    navigate(`/workout-plans/${planId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Workout Plans</h1>
          {isCoach && (
            <button
              onClick={() => navigate('/workout-plans/create')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create New Plan
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${plan.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Dumbbell className="h-4 w-4" />
                    <span>{plan.exercises} exercises</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{plan.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{plan.frequency}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleViewDetails(plan.id)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans;