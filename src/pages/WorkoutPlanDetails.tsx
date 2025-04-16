import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Dumbbell, Clock, Calendar, Users } from 'lucide-react';

// Mock data - in a real app, this would come from an API
const workoutPlans = {
  '1': {
    id: '1',
    title: 'Full Body Strength',
    description: 'A comprehensive full-body workout designed to build strength and muscle.',
    coach: 'Sarah Johnson',
    duration: '45 mins',
    frequency: '3x/week',
    level: 'Intermediate',
    exercises: [
      {
        name: 'Barbell Squats',
        sets: 4,
        reps: '8-10',
        rest: '90 sec',
        notes: 'Focus on form and depth. Keep your chest up.'
      },
      {
        name: 'Bench Press',
        sets: 4,
        reps: '8-10',
        rest: '90 sec',
        notes: 'Control the weight on the way down.'
      },
      {
        name: 'Deadlifts',
        sets: 3,
        reps: '8-10',
        rest: '120 sec',
        notes: 'Keep your back straight and engage your core.'
      },
      {
        name: 'Pull-ups',
        sets: 3,
        reps: '8-10',
        rest: '90 sec',
        notes: 'Use assistance band if needed.'
      },
      {
        name: 'Shoulder Press',
        sets: 3,
        reps: '10-12',
        rest: '60 sec',
        notes: 'Maintain strict form.'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'HIIT Cardio Blast',
    description: 'High-intensity interval training to improve cardiovascular fitness and burn fat.',
    coach: 'Michael Chen',
    duration: '30 mins',
    frequency: '4x/week',
    level: 'Advanced',
    exercises: [
      {
        name: 'Burpees',
        sets: 4,
        reps: '45 sec',
        rest: '15 sec',
        notes: 'Maintain high intensity throughout.'
      },
      {
        name: 'Mountain Climbers',
        sets: 4,
        reps: '45 sec',
        rest: '15 sec',
        notes: 'Keep your core engaged.'
      },
      {
        name: 'Jump Squats',
        sets: 4,
        reps: '45 sec',
        rest: '15 sec',
        notes: 'Land softly and immediately go into next rep.'
      }
    ]
  }
};

const WorkoutPlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = workoutPlans[id as keyof typeof workoutPlans];

  // State for modals and selected exercise
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState<null | (typeof plan.exercises[number] & { index: number })>(null);

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">Workout Plan Not Found</h1>
          <button
            onClick={() => navigate('/workout-plans')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Workout Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/workout-plans')}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Workout Plans
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">{plan.title}</h1>
            <p className="mt-2 text-gray-600">{plan.description}</p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{plan.duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{plan.frequency}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{plan.level}</span>
              </div>
              <div className="flex items-center">
                <Dumbbell className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{plan.exercises.length} exercises</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Exercises</h2>
              <div className="space-y-4">
                {plan.exercises.map((exercise, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                        <div className="mt-1 text-sm text-gray-600">
                          {exercise.sets} sets × {exercise.reps}
                          <span className="mx-2">•</span>
                          {exercise.rest} rest
                        </div>
                        {exercise.notes && (
                          <p className="mt-2 text-sm text-gray-500">{exercise.notes}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 items-center ml-4">
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-white border border-blue-200 rounded-full hover:bg-blue-50"
                          onClick={() => {
                            setSelectedExercise({ ...exercise, index });
                            setShowCommentModal(true);
                          }}
                          title="Comment"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l.8-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-white border border-blue-200 rounded-full hover:bg-blue-50"
                          onClick={() => {
                            setSelectedExercise({ ...exercise, index });
                            setShowDetailsModal(true);
                          }}
                          title="Details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </button>
                        <span className="text-xs text-blue-400 mt-1">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {showCommentModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 w-96">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Leave a comment on {selectedExercise.name}</h2>
                  <textarea className="w-full h-24 p-2 border border-gray-300 rounded-lg" placeholder="Type your comment here..."></textarea>
                  <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Post Comment</button>
                  <button className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setShowCommentModal(false)}>Cancel</button>
                </div>
              </div>
            )}

            {showDetailsModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 w-96">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Details for {selectedExercise.name}</h2>
                  <p className="text-sm text-gray-600">Sets: {selectedExercise.sets}</p>
                  <p className="text-sm text-gray-600">Reps: {selectedExercise.reps}</p>
                  <p className="text-sm text-gray-600">Rest: {selectedExercise.rest}</p>
                  {selectedExercise.notes && (
                    <p className="text-sm text-gray-600">Notes: {selectedExercise.notes}</p>
                  )}
                  <button className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setShowDetailsModal(false)}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanDetails; 