import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes: string;
}

interface WorkoutPlan {
  title: string;
  description: string;
  duration: string;
  frequency: string;
  level: string;
  exercises: Exercise[];
}

const CreateWorkoutPlan = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<WorkoutPlan>({
    title: '',
    description: '',
    duration: '',
    frequency: '',
    level: 'Beginner',
    exercises: []
  });

  const handleAddExercise = () => {
    setPlan({
      ...plan,
      exercises: [...plan.exercises, {
        name: '',
        sets: 3,
        reps: '',
        rest: '',
        notes: ''
      }]
    });
  };

  const handleRemoveExercise = (index: number) => {
    setPlan({
      ...plan,
      exercises: plan.exercises.filter((_, i) => i !== index)
    });
  };

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
    const updatedExercises = [...plan.exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value
    };
    setPlan({ ...plan, exercises: updatedExercises });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to save the workout plan
    console.log('Saving workout plan:', plan);
    alert('Workout plan created successfully!');
    navigate('/workout-plans');
  };

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
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Workout Plan</h1>

            {/* Basic Information */}
            <div className="space-y-4 mb-8">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Plan Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={plan.title}
                  onChange={(e) => setPlan({ ...plan, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="e.g., Full Body Strength Training"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  value={plan.description}
                  onChange={(e) => setPlan({ ...plan, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Describe the workout plan and its goals..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    required
                    value={plan.duration}
                    onChange={(e) => setPlan({ ...plan, duration: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="e.g., 45 mins"
                  />
                </div>

                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <input
                    type="text"
                    id="frequency"
                    required
                    value={plan.frequency}
                    onChange={(e) => setPlan({ ...plan, frequency: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="e.g., 3x/week"
                  />
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Difficulty Level
                  </label>
                  <select
                    id="level"
                    value={plan.level}
                    onChange={(e) => setPlan({ ...plan, level: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Exercises */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Exercises</h2>
                <button
                  type="button"
                  onClick={handleAddExercise}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Exercise
                </button>
              </div>

              <div className="space-y-4">
                {plan.exercises.map((exercise, index) => (
                  <div key={index} className="relative bg-gray-50 rounded-lg p-4">
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Exercise Name
                        </label>
                        <input
                          type="text"
                          required
                          value={exercise.name}
                          onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                          placeholder="e.g., Barbell Squats"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Sets
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(index, 'sets', parseInt(e.target.value))}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Reps
                          </label>
                          <input
                            type="text"
                            required
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="e.g., 8-10"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Rest
                          </label>
                          <input
                            type="text"
                            required
                            value={exercise.rest}
                            onChange={(e) => handleExerciseChange(index, 'rest', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="e.g., 90 sec"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <input
                        type="text"
                        value={exercise.notes}
                        onChange={(e) => handleExerciseChange(index, 'notes', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Optional form tips or instructions"
                      />
                    </div>
                  </div>
                ))}

                {plan.exercises.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No exercises added yet. Click "Add Exercise" to start building your workout plan.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={plan.exercises.length === 0}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Create Workout Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutPlan; 