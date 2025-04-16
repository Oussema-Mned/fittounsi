export type UserRole = 'admin' | 'coach' | 'client';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Coach extends User {
  specialization: string;
  experience_years: number;
  bio: string;
  hourly_rate: number;
}

export interface Client extends User {
  goals: string[];
  fitness_level: string;
  weight: number;
  height: number;
  medical_conditions?: string[];
}

export interface WorkoutPlan {
  id: string;
  coach_id: string;
  client_id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  video_url?: string;
  notes?: string;
}

export interface MealPlan {
  id: string;
  coach_id: string;
  client_id: string;
  title: string;
  description: string;
  meals: Meal[];
  created_at: string;
  updated_at: string;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  recipe?: string;
}