import React from 'react';
import { Users, Award, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

// Mock data for coaches - in a real app, this would come from an API
const coaches = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Weight Loss & Nutrition',
    clients: 45,
    experience: '5 years',
    certifications: ['NASM Certified Personal Trainer', 'Nutrition Specialist'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 49.99,
    description: 'Specialized in helping clients achieve sustainable weight loss through personalized workout and nutrition plans.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Strength Training',
    clients: 38,
    experience: '7 years',
    certifications: ['ACE Certified Trainer', 'CrossFit Level 2'],
    image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 59.99,
    description: 'Expert in strength training and functional fitness, helping clients build muscle and improve overall performance.'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    specialty: 'Yoga & Wellness',
    clients: 52,
    experience: '6 years',
    certifications: ['RYT-200 Yoga Instructor', 'Meditation Coach'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 44.99,
    description: 'Combines yoga, meditation, and mindfulness to help clients achieve balance in body and mind.'
  }
];

const CoachList = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const isClient = user?.role === 'client';

  const handleSubscribe = (coachId: string, coachName: string, price: number) => {
    navigate('/payment', {
      state: {
        coachId,
        coachName,
        price
      }
    });
  };

  // If not a client, redirect to dashboard
  if (!isClient) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Your Perfect Coach</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div key={coach.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={coach.image}
                alt={coach.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div>
                  <h3 className="text-xl font-semibold">{coach.name}</h3>
                  <p className="text-blue-600 font-medium">{coach.specialty}</p>
                </div>
                
                <p className="text-gray-600 mt-2">{coach.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{coach.clients} clients</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{coach.experience} experience</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700">Certifications:</h4>
                  <ul className="mt-1 space-y-1">
                    {coach.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-lg font-semibold">
                    <span className="text-gray-600">$</span>{coach.price}
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  <button 
                    onClick={() => handleSubscribe(coach.id, coach.name, coach.price)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachList; 