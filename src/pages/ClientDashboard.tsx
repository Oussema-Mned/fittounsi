import React, { useState } from 'react';
import { Activity, Calendar, Award, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Typography, List, Avatar, Space, Modal } from 'antd';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import { Messages } from '../components/Messages';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
}

interface Coach {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
}

const { Title, Text } = Typography;

const ClientDashboard = () => {
  const { user, subscriptions } = useAuthStore();
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: 1, name: 'Push-ups', sets: 3, reps: 12, completed: false },
    { id: 2, name: 'Squats', sets: 3, reps: 12, completed: false },
    { id: 3, name: 'Pull-ups', sets: 3, reps: 12, completed: false },
  ]);
  const [selectedCoach, setSelectedCoach] = useState<{ id: string; name: string } | null>(null);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  
  // Mock data - in a real app, this would come from an API
  const hasCoach = subscriptions.length > 0;

  // Mock data for subscribed coaches - in a real app, this would come from an API
  const subscribedCoaches: Coach[] = [
    { 
      id: '1', 
      name: 'Coach John', 
      specialty: 'Weight Loss',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    { 
      id: '2', 
      name: 'Coach Sarah', 
      specialty: 'Muscle Gain',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
  ].filter(coach => subscriptions.some(sub => sub.coachId === coach.id));

  const handleMarkComplete = (exerciseId: number) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, completed: !exercise.completed }
        : exercise
    ));
  };

  // Calculate completed workouts
  const completedWorkouts = exercises.filter(ex => ex.completed).length;

  const handleMessageClick = (coachId: string, coachName: string) => {
    setSelectedCoach({ id: coachId, name: coachName });
    setIsMessageModalVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <Title level={2}>Welcome, {user?.full_name}</Title>
        <p className="text-gray-600 mt-2">Track your progress and stay motivated!</p>
      </div>

      {/* Coach Section - Only shown if client doesn't have a coach */}
      {!hasCoach && (
        <div className="mb-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold text-blue-800">Find Your Perfect Coach</h2>
              <p className="text-blue-600 mt-1">Connect with expert coaches to help you achieve your fitness goals.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Link 
                to="/find-coach" 
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Users className="h-5 w-5" />
                <span>Browse Coaches</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/book-session"
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Session</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Workouts Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedWorkouts}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Streak Days</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Goal Progress</p>
              <p className="text-2xl font-bold text-gray-900">75%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Workout</h2>
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <div 
              key={exercise.id} 
              className={`p-4 rounded-lg ${
                exercise.completed ? 'bg-green-50 border border-green-100' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-gray-600">{exercise.sets} sets × {exercise.reps} reps</p>
                </div>
                <button 
                  onClick={() => handleMarkComplete(exercise.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    exercise.completed 
                      ? 'text-green-600 hover:bg-green-100'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {exercise.completed ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Your Subscribed Coaches">
            <List
              dataSource={subscribedCoaches}
              renderItem={(coach: Coach) => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      key="message"
                      onClick={() => handleMessageClick(coach.id, coach.name)}
                    >
                      <MessageOutlined /> Message
                    </Button>,
                    <Link
                      to="/book-session"
                      key="book"
                      className="ant-btn ant-btn-link"
                      style={{ color: '#52c41a' }}
                    >
                      <Calendar className="inline align-text-bottom mr-1" style={{ width: 16, height: 16 }} /> Book Session
                    </Link>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={coach.avatar} />}
                    title={coach.name}
                    description={coach.specialty}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Chat with Coach"
        open={isMessageModalVisible}
        onCancel={() => setIsMessageModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedCoach && (
          <Messages
            coachId={selectedCoach.id}
            coachName={selectedCoach.name}
          />
        )}
      </Modal>
    </div>
  );
};

export default ClientDashboard;