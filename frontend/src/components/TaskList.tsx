import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../lib/api';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export default function TaskList() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Task>>({});

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await API.get('/tasks');
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => API.delete(`/tasks/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => API.put(`/tasks/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  return (
    <div className="mt-6 space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="border p-4 rounded shadow bg-white">
          {editingId === task.id ? (
            <>
              <input
                className="border p-1 mb-2 w-full"
                value={editValues.title ?? task.title}
                onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
              />
              <textarea
                className="border p-1 mb-2 w-full"
                value={editValues.description ?? task.description ?? ''}
                onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
              />
              <input
                className="border p-1 mb-2 w-full"
                type="date"
                value={editValues.dueDate ?? (task.dueDate ? task.dueDate.slice(0, 10) : '')}
                onChange={(e) => setEditValues({ ...editValues, dueDate: e.target.value })}
              />
              <select
                className="border p-1 mb-2 w-full"
                value={editValues.status ?? task.status}
                onChange={(e) => setEditValues({ ...editValues, status: e.target.value as Task['status'] })}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => {
                  updateMutation.mutate({ id: task.id, data: editValues });
                  setEditingId(null);
                  setEditValues({});
                }}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-black px-3 py-1 rounded"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-gray-700">{task.dueDate?.slice(0,10)}</p>
              <p className="text-sm text-gray-500 capitalize">Status: {task.status}</p>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setEditingId(task.id);
                    setEditValues(task);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteMutation.mutate(task.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
