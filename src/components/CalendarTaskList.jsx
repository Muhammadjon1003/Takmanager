import { Pencil } from 'lucide-react';

function CalendarTaskList({ tasks, onEditTask }) {
  return (
    <div className="mt-4">
      <div className="space-y-2">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="flex items-center justify-between p-2 rounded-lg border border-custom-gray-200 dark:border-gray-700 hover:bg-custom-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${
                task.status === 'todo' 
                  ? 'bg-red-500' 
                  : task.status === 'in-progress' 
                  ? 'bg-orange-500' 
                  : 'bg-green-500'
              }`} />
              <span className="text-sm text-custom-gray-800 dark:text-gray-300">{task.title}</span>
            </div>
            <button
              onClick={() => onEditTask(task)}
              className="p-1 hover:bg-custom-gray-100 dark:hover:bg-gray-600 rounded-full text-custom-gray-800 dark:text-gray-300"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarTaskList; 