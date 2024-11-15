function TaskForm({ task, onSubmit, onChange, onCancel, submitLabel, hideDateField = false }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-custom-gray-800 dark:text-gray-200 mb-1">
          Task Title
        </label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => onChange({ ...task, title: e.target.value })}
          className="w-full px-3 py-2 border border-custom-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-custom-gray-800 dark:text-white"
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-custom-gray-800 dark:text-gray-200 mb-1">
          Priority
        </label>
        <select
          value={task.priority || 'not-important'}
          onChange={(e) => onChange({ ...task, priority: e.target.value })}
          className="w-full px-3 py-2 border border-custom-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-custom-gray-800 dark:text-white"
        >
          <option value="not-important">Not Important</option>
          <option value="least-important">Least Important</option>
          <option value="important">Important</option>
          <option value="most-important">Most Important</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-custom-gray-800 dark:text-gray-200 mb-1">
          Status
        </label>
        <select
          value={task.status}
          onChange={(e) => onChange({ ...task, status: e.target.value })}
          className="w-full px-3 py-2 border border-custom-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-custom-gray-800 dark:text-white"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {!hideDateField && (
        <div>
          <label className="block text-sm font-medium text-custom-gray-800 dark:text-gray-200 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => onChange({ ...task, dueDate: e.target.value })}
            className="w-full px-3 py-2 border border-custom-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-custom-gray-800 dark:text-white"
            required
          />
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-custom-gray-200 dark:border-gray-600 rounded-lg hover:bg-custom-gray-50 dark:hover:bg-gray-700 text-custom-gray-800 dark:text-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm; 