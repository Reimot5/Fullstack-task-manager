import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../lib/api';

export default function TaskForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending');

  const createMutation = useMutation({
    mutationFn: () => API.post('/tasks', { title, description, status, dueDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6 space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        className="border p-2 w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value as typeof status)}
        required
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}