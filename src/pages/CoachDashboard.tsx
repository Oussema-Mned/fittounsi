import React, { useState } from 'react';
import { BarChart, Users, DollarSign, Calendar, MessageSquare, ClipboardList } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Modal, Button } from 'antd';
import { Messages } from '../components/Messages';

interface Client {
  id: string;
  name: string;
  lastSession: string;
  workoutPlan?: {
    title: string;
    exercises: Array<{
      name: string;
      sets: number;
      reps: number;
    }>;
  };
}

const CoachDashboard = () => {
  const { user } = useAuthStore();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [isWorkoutModalVisible, setIsWorkoutModalVisible] = useState(false);

  // Mock client data - in a real app, this would come from an API
  const clients: Client[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastSession: '2 days ago',
      workoutPlan: {
        title: 'Weight Loss Program',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 12 },
          { name: 'Squats', sets: 3, reps: 15 },
          { name: 'Planks', sets: 3, reps: 60 }
        ]
      }
    },
    {
      id: '2',
      name: 'Mike Chen',
      lastSession: '1 day ago',
      workoutPlan: {
        title: 'Strength Training',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: 8 },
          { name: 'Bench Press', sets: 4, reps: 10 },
          { name: 'Pull-ups', sets: 3, reps: 8 }
        ]
      }
    },
    {
      id: '3',
      name: 'Emma Davis',
      lastSession: '3 days ago',
      workoutPlan: {
        title: 'HIIT Program',
        exercises: [
          { name: 'Burpees', sets: 3, reps: 15 },
          { name: 'Mountain Climbers', sets: 3, reps: 20 },
          { name: 'Jump Rope', sets: 3, reps: 50 }
        ]
      }
    }
  ];

  const handleMessageClick = (client: Client) => {
    setSelectedClient(client);
    setIsMessageModalVisible(true);
  };

  const handleWorkoutClick = (client: Client) => {
    setSelectedClient(client);
    setIsWorkoutModalVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.full_name}</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your clients today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$2,400</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sessions Today</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Clients</h2>
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-600">Last session: {client.lastSession}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-2 text-gray-600 hover:text-blue-600"
                    onClick={() => handleMessageClick(client)}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:text-blue-600"
                    onClick={() => handleWorkoutClick(client)}
                  >
                    <ClipboardList className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((session) => (
              <div key={session} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Client Session {session}</p>
                    <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      <Modal
        title={`Chat with ${selectedClient?.name}`}
        open={isMessageModalVisible}
        onCancel={() => setIsMessageModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedClient && (
          <Messages
            coachId={user?.id || ''}
            clientId={selectedClient.id}
            clientName={selectedClient.name}
          />
        )}
      </Modal>

      {/* Workout Plan Modal */}
      <Modal
        title={`${selectedClient?.name}'s Workout Plan`}
        open={isWorkoutModalVisible}
        onCancel={() => setIsWorkoutModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsWorkoutModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        {selectedClient?.workoutPlan && (
          <WorkoutPlanEditor 
            workoutPlan={selectedClient.workoutPlan} 
            onSave={(updatedPlan) => {
              // Update selectedClient's workoutPlan in state
              setSelectedClient({ ...selectedClient, workoutPlan: updatedPlan });
              // In a real app, send update to backend here
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default CoachDashboard;