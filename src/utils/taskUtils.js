// Filter tasks based on status
export const filterTasks = (tasks, activeFilter) => {
  if (activeFilter === 'all') return tasks;
  return tasks.filter(task => task.status === activeFilter);
};

// Priority levels for sorting
const PRIORITY_LEVELS = {
  'most-important': 3,
  'important': 2,
  'least-important': 1,
  'not-important': 0
};

// Updated getRecentTasks function
export const getRecentTasks = (filteredTasks) => {
  if (!filteredTasks || filteredTasks.length === 0) return [];
  
  const today = new Date();
  return filteredTasks
    .sort((a, b) => {
      // First, compare by priority
      const priorityA = PRIORITY_LEVELS[a.priority || 'not-important'];
      const priorityB = PRIORITY_LEVELS[b.priority || 'not-important'];
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA; // Higher priority first
      }
      
      // If same priority, compare by due date
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      
      // If both dates are in the past
      if (dateA < today && dateB < today) {
        return dateB - dateA;
      }
      
      // If at least one date is in the future
      return dateA - dateB;
    })
    .slice(0, 4);
};

// Get status colors for task cards
export const getStatusColor = (status) => {
  switch (status) {
    case "todo":
      return "bg-gradient-to-r from-red-500 to-red-600 text-white"
    case "in-progress":
      return "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
    case "done":
      return "bg-gradient-to-r from-green-500 to-green-600 text-white"
    default:
      return "bg-gradient-to-r from-gray-100 to-gray-200"
  }
};

// Get status badge colors
export const getStatusBadgeColor = (status) => {
  switch (status) {
    case "todo":
      return "bg-gradient-to-r from-red-600 to-red-700"
    case "in-progress":
      return "bg-gradient-to-r from-orange-500 to-orange-600"
    case "done":
      return "bg-gradient-to-r from-green-600 to-green-700"
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-600"
  }
};

// Local storage operations
export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Task operations
export const createTask = (newTask) => {
  return {
    id: Date.now(),
    ...newTask
  };
};

export const getEmptyTask = () => ({
  title: '',
  status: 'todo',
  priority: 'not-important',
  dueDate: new Date().toISOString().split('T')[0]
});

// Task CRUD operations
export const addTask = (tasks, newTask, setTasks, setNewTask, setIsModalOpen) => {
  if (newTask.title.trim() !== "") {
    const newTaskWithId = createTask(newTask)
    setTasks([newTaskWithId, ...tasks])
    setNewTask(getEmptyTask())
    setIsModalOpen(false)
  }
};

export const editTask = (tasks, editingTask, setTasks, setIsEditModalOpen, setEditingTask) => {
  if (editingTask.title.trim() !== "") {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ))
    setIsEditModalOpen(false)
    setEditingTask(null)
  }
};

export const deleteTask = (id, tasks, setTasks) => {
  if (window.confirm('Are you sure you want to delete this task?')) {
    setTasks(tasks.filter(task => task.id !== id))
  }
};

export const openEditModal = (task, setEditingTask, setIsEditModalOpen) => {
  setEditingTask(task)
  setIsEditModalOpen(true)
};

// Get overdue tasks
export const getOverdueTasks = (tasks) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'done';
  });
};

// Update the searchTasks function with console logs
export const searchTasks = (tasks, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) {
    return [];  // Return empty array when no search query
  }
  
  const query = searchQuery.toLowerCase().trim();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(query)  // Only search in title
  );
};

export const addComment = (tasks, taskId, text, setTasks) => {
  const newComment = {
    id: Date.now(),
    text,
    timestamp: new Date().toISOString()
  };

  const updatedTasks = tasks.map(task => 
    task.id === taskId 
      ? { 
          ...task, 
          comments: [...(task.comments || []), newComment]
        }
      : task
  );

  setTasks(updatedTasks);
  saveTasksToLocalStorage(updatedTasks); // Save to localStorage
};

export const editComment = (tasks, taskId, commentId, text, setTasks) => {
  const updatedTasks = tasks.map(task => 
    task.id === taskId 
      ? {
          ...task,
          comments: task.comments.map(comment =>
            comment.id === commentId
              ? { ...comment, text, edited: true }
              : comment
          )
        }
      : task
  );

  setTasks(updatedTasks);
  saveTasksToLocalStorage(updatedTasks); // Save to localStorage
};

export const deleteComment = (tasks, taskId, commentId, setTasks) => {
  if (window.confirm('Are you sure you want to delete this comment?')) {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            comments: task.comments.filter(comment => comment.id !== commentId)
          }
        : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks); // Save to localStorage
  }
}; 