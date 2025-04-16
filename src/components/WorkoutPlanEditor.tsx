import React, { useState } from 'react';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface WorkoutPlan {
  title: string;
  exercises: Exercise[];
}

interface WorkoutPlanEditorProps {
  workoutPlan: WorkoutPlan;
  onSave: (updatedPlan: WorkoutPlan) => void;
}

export const WorkoutPlanEditor: React.FC<WorkoutPlanEditorProps> = ({ workoutPlan, onSave }) => {
  const [title, setTitle] = useState(workoutPlan.title);
  const [exercises, setExercises] = useState<Exercise[]>(workoutPlan.exercises);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newExercise, setNewExercise] = useState<Exercise>({ name: '', sets: 3, reps: 10 });

  const handleEdit = (idx: number) => setEditingIndex(idx);
  const handleSaveEdit = (idx: number) => setEditingIndex(null);
  const handleChange = (idx: number, field: keyof Exercise, value: string | number) => {
    setExercises(exs => {
      const updated = [...exs];
      updated[idx] = { ...updated[idx], [field]: field === 'name' ? value : Number(value) };
      return updated;
    });
  };
  const handleRemove = (idx: number) => setExercises(exs => exs.filter((_, i) => i !== idx));
  const handleAdd = () => {
    if (!newExercise.name) return;
    setExercises(exs => [...exs, newExercise]);
    setNewExercise({ name: '', sets: 3, reps: 10 });
  };
  const handleSavePlan = () => onSave({ title, exercises });

  return (
    <div className="space-y-4">
      <input
        className="w-full px-2 py-1 border rounded mb-2"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Workout Plan Title"
      />
      <div className="space-y-2">
        {exercises.map((ex, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
            {editingIndex === idx ? (
              <>
                <input
                  className="px-1 py-0.5 border rounded w-32"
                  value={ex.name}
                  onChange={e => handleChange(idx, 'name', e.target.value)}
                />
                <input
                  type="number"
                  className="px-1 py-0.5 border rounded w-16"
                  value={ex.sets}
                  min={1}
                  onChange={e => handleChange(idx, 'sets', e.target.value)}
                />
                <input
                  type="number"
                  className="px-1 py-0.5 border rounded w-16"
                  value={ex.reps}
                  min={1}
                  onChange={e => handleChange(idx, 'reps', e.target.value)}
                />
                <button className="text-green-600 ml-2" onClick={() => handleSaveEdit(idx)}>Save</button>
                <button className="text-red-600 ml-2" onClick={() => handleRemove(idx)}>Remove</button>
              </>
            ) : (
              <>
                <span className="font-medium w-32">{ex.name}</span>
                <span className="w-16">{ex.sets} sets</span>
                <span className="w-16">{ex.reps} reps</span>
                <button className="text-blue-600 ml-2" onClick={() => handleEdit(idx)}>Edit</button>
                <button className="text-red-600 ml-2" onClick={() => handleRemove(idx)}>Remove</button>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Add Exercise */}
      <div className="flex items-center gap-2 mt-4">
        <input
          className="px-1 py-0.5 border rounded w-32"
          value={newExercise.name}
          onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
          placeholder="Exercise Name"
        />
        <input
          type="number"
          className="px-1 py-0.5 border rounded w-16"
          value={newExercise.sets}
          min={1}
          onChange={e => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
          placeholder="Sets"
        />
        <input
          type="number"
          className="px-1 py-0.5 border rounded w-16"
          value={newExercise.reps}
          min={1}
          onChange={e => setNewExercise({ ...newExercise, reps: Number(e.target.value) })}
          placeholder="Reps"
        />
        <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={handleAdd}>Add Exercise</button>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" onClick={handleSavePlan}>Save Plan</button>
    </div>
  );
};
