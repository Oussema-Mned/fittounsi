import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BookingSession: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send booking data to the backend API
    setSuccess(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="p-8 max-w-md w-full shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Book a Session</h1>
        {success ? (
          <div className="text-green-600 text-center font-semibold">Session booked successfully!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Date</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Time</label>
              <Input type="time" value={time} onChange={e => setTime(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Notes (optional)</label>
              <Input type="text" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">Book Session</Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default BookingSession;
