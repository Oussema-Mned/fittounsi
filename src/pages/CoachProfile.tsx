import React, { useState } from 'react';
import { Star, Medal, Clock, Users, MessageSquare, Edit2, Save, X, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface Client {
  id: string;
  name: string;
  plan: string;
  startDate: string;
  progress: number;
}

interface Specialization {
  area: string;
  description: string;
}

const CoachProfile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCertification, setShowAddCertification] = useState(false);

  // Mock data - in a real app, this would come from an API
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    title: 'Professional Fitness Coach',
    bio: 'Certified personal trainer with 8+ years of experience in strength training, weight loss, and athletic performance. I specialize in creating personalized workout and nutrition plans that help my clients achieve their fitness goals efficiently and sustainably.',
    specializations: ['Weight Loss', 'Strength Training', 'HIIT', 'Nutrition Planning', 'Post-Injury Recovery'],
    experience: '8+ Years',
    totalClients: 200,
    totalSessions: 1000,
    hourlyRate: 60,
    certifications: [
      { id: '1', name: 'NASM Certified Personal Trainer', issuer: 'National Academy of Sports Medicine', year: '2015' },
      { id: '2', name: 'Nutrition Specialist', issuer: 'Precision Nutrition', year: '2016' },
      { id: '3', name: 'CrossFit Level 2 Trainer', issuer: 'CrossFit', year: '2018' }
    ] as Certification[],
    clients: [
      { id: '1', name: 'Sarah Johnson', plan: 'Weight Loss Program', startDate: '2024-01-15', progress: 75 },
      { id: '2', name: 'Mike Chen', plan: 'Strength Building', startDate: '2024-02-01', progress: 45 },
      { id: '3', name: 'Emma Davis', plan: 'HIIT Training', startDate: '2024-02-15', progress: 30 }
    ] as Client[],
    availableHours: {
      start: '09:00',
      end: '17:00'
    },
    languages: ['English', 'Spanish']
  });

  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    year: ''
  });

  const [newSpecialization, setNewSpecialization] = useState<Specialization>({
    area: '',
    description: ''
  });

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to save the profile
    setIsEditing(false);
  };

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuer && newCertification.year) {
      setProfileData(prev => ({
        ...prev,
        certifications: [
          ...prev.certifications,
          {
            id: Date.now().toString(),
            ...newCertification
          }
        ]
      }));
      setNewCertification({ name: '', issuer: '', year: '' });
      setShowAddCertification(false);
    }
  };

  const handleRemoveCertification = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const handleSpecializationChange = (specialization: string) => {
    setProfileData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const addSpecialization = () => {
    if (newSpecialization.area && newSpecialization.description) {
      setProfileData(prev => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization]
      }));
      setNewSpecialization({ area: '', description: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Coach Profile</h1>
          <Button
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            variant="outline"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                value={profileData.name}
                onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <Input
                value={profileData.title}
                onChange={e => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <Textarea
                value={profileData.bio}
                onChange={e => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Certifications</h2>
          <div className="space-y-4">
            {profileData.certifications.map((cert, index) => (
              <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer} - {cert.year}</p>
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCertification(cert.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {isEditing && (
              <div className="space-y-2">
                <Input
                  placeholder="Certification Name"
                  value={newCertification.name}
                  onChange={e => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Issuing Organization"
                  value={newCertification.issuer}
                  onChange={e => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                />
                <Input
                  type="text"
                  placeholder="Year"
                  value={newCertification.year}
                  onChange={e => setNewCertification(prev => ({ ...prev, year: e.target.value }))}
                />
                <Button onClick={handleAddCertification} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Specializations</h2>
          <div className="space-y-4">
            {profileData.specializations.map((spec, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{spec.area}</h3>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpecializationChange(spec.area)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{spec.description}</p>
              </div>
            ))}
            {isEditing && (
              <div className="space-y-2">
                <Input
                  placeholder="Specialization Area"
                  value={newSpecialization.area}
                  onChange={(e) => setNewSpecialization(prev => ({ ...prev, area: e.target.value }))}
                />
                <Textarea
                  placeholder="Description"
                  value={newSpecialization.description}
                  onChange={(e) => setNewSpecialization(prev => ({ ...prev, description: e.target.value }))}
                />
                <Button onClick={addSpecialization} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Specialization
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Availability & Rates</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <Input
                  type="time"
                  value={profileData.availableHours.start}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    availableHours: { ...prev.availableHours, start: e.target.value }
                  }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <Input
                  type="time"
                  value={profileData.availableHours.end}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    availableHours: { ...prev.availableHours, end: e.target.value }
                  }))}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
              <Input
                type="number"
                value={profileData.hourlyRate}
                onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                disabled={!isEditing}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {profileData.languages.map((lang, index) => (
              <Badge key={index} variant="secondary">
                {lang}
                {isEditing && (
                  <button
                    onClick={() => {
                      setProfileData(prev => ({
                        ...prev,
                        languages: prev.languages.filter((_, i) => i !== index)
                      }));
                    }}
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Current Clients</h2>
          <div className="space-y-4">
            {profileData.clients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.plan} • Started {new Date(client.startDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${client.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{client.progress}%</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                value={user.email}
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <Input
                value={user.phone}
                disabled={true}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CoachProfile;