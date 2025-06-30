import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}
