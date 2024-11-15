import { Plus, List, Search } from 'lucide-react';
import TaskCard from './TaskCard';
import { useState } from 'react';

function TaskList({ 
  tasks, 
  onAddClick, 
  activeFilter, 
  setActiveFilter, 
  onEditTask, 
  onDeleteTask,
  getStatusColor,
  getStatusBadgeColor,
  getRecentTasks,
  searchQuery,
  onSearchChange,
  isSearching,
  setIsSearching,
  onAddComment,
  onEditComment,
  onDeleteComment
}) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-custom-gray-800 dark:text-white">Tasks</h2>
          <p className="text-custom-gray-800/60 dark:text-gray-400">Manage your tasks and track progress</p>
        </div>
        <button 
          onClick={onAddClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>
      
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'todo', label: 'To Do' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'done', label: 'Done' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setIsSearching(false);
                onSearchChange('');
              }}
              className={`px-4 py-2 rounded-lg flex items-center transition-colors whitespace-nowrap
                ${activeFilter === filter.id && !isSearching
                  ? `bg-${filter.id === 'all' ? 'blue' : filter.id === 'todo' ? 'red' : filter.id === 'in-progress' ? 'orange' : 'green'}-500 text-white` 
                  : 'bg-custom-gray-100 dark:bg-gray-700 text-custom-gray-800 dark:text-white hover:bg-custom-gray-200 dark:hover:bg-gray-600'}`}
            >
              {filter.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsSearching(true);
              setActiveFilter('');
              onSearchChange('');
            }}
            className={`px-4 py-2 rounded-lg flex items-center transition-colors whitespace-nowrap
              ${isSearching 
                ? 'bg-blue-500 text-white' 
                : 'bg-custom-gray-100 dark:bg-gray-700 text-custom-gray-800 dark:text-white hover:bg-custom-gray-200 dark:hover:bg-gray-600'}`}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </div>
      </div>

      {isSearching ? (
        <div>
          <div className="mb-6">
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative flex-shrink-0 flex items-center"
            >
              <Search className="h-4 w-4 absolute left-3 text-custom-gray-800/60 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-12 py-2 border border-custom-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-custom-gray-800 dark:text-white placeholder-custom-gray-800/60 dark:placeholder-gray-400"
                autoFocus
              />
            </form>
          </div>

          {!searchQuery ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-custom-gray-800/60 dark:text-gray-400 mb-4" />
              <p className="text-custom-gray-800/60 dark:text-gray-400 text-center">
                Search from your tasks
              </p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-custom-gray-800/60 dark:text-gray-400 mb-4" />
              <p className="text-custom-gray-800/60 dark:text-gray-400 text-center">
                No tasks found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  getStatusColor={getStatusColor}
                  getStatusBadgeColor={getStatusBadgeColor}
                  onAddComment={onAddComment}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-custom-gray-100 rounded-full p-4 mb-4">
              <List className="h-8 w-8 text-custom-gray-800" />
            </div>
            <h3 className="text-xl font-semibold text-custom-gray-800 mb-2">
              No tasks yet
            </h3>
            <p className="text-custom-gray-800/60 text-center mb-6">
              You don't have any tasks yet. Click the 'Add Task' button to create your first task.
            </p>
            <button 
              onClick={onAddClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getRecentTasks().map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                getStatusColor={getStatusColor}
                getStatusBadgeColor={getStatusBadgeColor}
                onAddComment={onAddComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default TaskList; 