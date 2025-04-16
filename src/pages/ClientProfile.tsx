import React, { useState, useEffect } from 'react';
import { Edit2, Save, Target, Calendar, Activity, Scale, Plus, X, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface Goal {
  id: string;
  title: string;
  target: string;
  deadline: string;
  progress: number;
}

interface WorkoutHistory {
  id: string;
  date: string;
  type: string;
  duration: string;
  calories: number;
}

const ClientProfile = () => {
  const { user, updateUserProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.full_name || 'Sarah Johnson',
    age: '28',
    height: '165',
    weight: '62',
    fitnessLevel: 'Intermediate',
    goals: [
      {
        id: '1',
        title: 'Weight Loss',
        target: 'Lose 5kg',
        deadline: '2024-06-30',
        progress: 40
      },
      {
        id: '2',
        title: 'Running',
        target: 'Run 5km under 30min',
        deadline: '2024-05-15',
        progress: 65
      }
    ] as Goal[],
    workoutHistory: [
      {
        id: '1',
        date: '2024-03-10',
        type: 'Strength Training',
        duration: '45 mins',
        calories: 320
      },
      {
        id: '2',
        date: '2024-03-08',
        type: 'HIIT',
        duration: '30 mins',
        calories: 280
      }
    ] as WorkoutHistory[],
    bio: 'Committed to achieving my fitness goals through consistent training and healthy lifestyle choices. Looking to improve strength and endurance.',
    preferences: {
      workoutDays: ['Monday', 'Wednesday', 'Friday'],
      preferredTime: 'Morning',
      focusAreas: ['Weight Loss', 'Muscle Tone', 'Cardio']
    }
  });

  // Initialize profile data with user data if available
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.full_name || prev.name,
        // Add other user data initialization here if available
      }));
    }
  }, [user]);

  // Debug useEffect to log state changes
  useEffect(() => {
    console.log('Current editing state:', isEditing);
  }, [isEditing]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    deadline: ''
  });

  const handleEditToggle = () => {
    console.log('Toggling edit mode:', !isEditing);
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    console.log('Saving profile data:', profileData);
    
    // Update the user profile in the auth store
    if (user) {
      console.log('Updating user profile in auth store');
      updateUserProfile({
        full_name: profileData.name,
        // Add client-specific profile data
        fitness_level: profileData.fitnessLevel,
        weight: Number(profileData.weight),
        height: Number(profileData.height),
        goals: profileData.goals.map(goal => goal.title),
        // Add any other fields that should be saved
      });
    } else {
      console.log('No user found in auth store');
    }
    
    // In a real app, this would make an API call to save the profile
    setIsEditing(false);
    
    // Show success message
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      setProfileData(prev => ({
        ...prev,
        goals: [
          ...prev.goals,
          {
            id: Date.now().toString(),
            ...newGoal,
            progress: 0
          }
        ]
      }));
      setNewGoal({ title: '', target: '', deadline: '' });
      setShowAddGoal(false);
    }
  };

  const handleRemoveGoal = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id)
    }));
  };

  const handlePreferenceChange = (area: string) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        focusAreas: prev.preferences.focusAreas.includes(area)
          ? prev.preferences.focusAreas.filter(a => a !== area)
          : [...prev.preferences.focusAreas, area]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
            {/* Edit Button in Header */}
            <div className="absolute bottom-4 right-6 z-10">
              <button
                onClick={isEditing ? handleSaveProfile : handleEditToggle}
                className="flex items-center gap-2 text-sm font-medium bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-colors border border-blue-200"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col items-center -mt-20">
              <div className="w-40 h-40 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {isEditing ? (
                <div className="mt-4 w-full max-w-md">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-3xl font-bold text-center w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              ) : (
                <h1 className="text-3xl font-bold mt-4">{profileData.name}</h1>
              )}
            </div>
            
            {/* Success Message */}
            {saveSuccess && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Profile saved successfully!</span>
              </div>
            )}

            {/* Basic Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={profileData.age}
                        onChange={e => setProfileData(prev => ({ ...prev, age: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.age} years</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Height</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={profileData.height}
                        onChange={e => setProfileData(prev => ({ ...prev, height: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.height} cm</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weight</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={profileData.weight}
                        onChange={e => setProfileData(prev => ({ ...prev, weight: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.weight} kg</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fitness Level</label>
                    {isEditing ? (
                      <select
                        value={profileData.fitnessLevel}
                        onChange={e => setProfileData(prev => ({ ...prev, fitnessLevel: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.fitnessLevel}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Bio</h2>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={e => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-600">{profileData.bio}</p>
                )}
              </div>
            </div>

            {/* Fitness Goals */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Fitness Goals</h2>
                {isEditing && (
                  <button
                    onClick={() => setShowAddGoal(true)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Goal
                  </button>
                )}
              </div>

              {showAddGoal && (
                <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Goal Title"
                      value={newGoal.title}
                      onChange={e => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Target"
                      value={newGoal.target}
                      onChange={e => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={e => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowAddGoal(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddGoal}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {profileData.goals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{goal.title}</h3>
                        <p className="text-sm text-gray-500">{goal.target}</p>
                        <p className="text-sm text-gray-500">
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveGoal(goal.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem]">{goal.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workout History */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
              <div className="space-y-4">
                {profileData.workoutHistory.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{workout.type}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(workout.date).toLocaleDateString()} • {workout.duration}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {workout.calories} calories
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Training Preferences</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Preferred Workout Days</h3>
                  {isEditing ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <button
                          key={day}
                          onClick={() => {
                            setProfileData(prev => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                workoutDays: prev.preferences.workoutDays.includes(day)
                                  ? prev.preferences.workoutDays.filter(d => d !== day)
                                  : [...prev.preferences.workoutDays, day]
                              }
                            }));
                          }}
                          className={`px-3 py-1 rounded-full text-sm ${
                            profileData.preferences.workoutDays.includes(day)
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profileData.preferences.workoutDays.map((day) => (
                        <span key={day} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {day}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700">Preferred Time</h3>
                  {isEditing ? (
                    <select
                      value={profileData.preferences.preferredTime}
                      onChange={e => setProfileData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, preferredTime: e.target.value }
                      }))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    >
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  ) : (
                    <p className="mt-1 text-gray-900">{profileData.preferences.preferredTime}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700">Focus Areas</h3>
                  {isEditing ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Weight Loss', 'Muscle Tone', 'Cardio', 'Flexibility', 'Strength'].map((area) => (
                        <button
                          key={area}
                          onClick={() => handlePreferenceChange(area)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            profileData.preferences.focusAreas.includes(area)
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profileData.preferences.focusAreas.map((area) => (
                        <span key={area} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;