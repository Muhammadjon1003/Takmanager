import { useState, useEffect } from "react"
import { Bell, CalendarIcon, CheckCircle2, List, Plus, Star, Sun, Moon } from 'lucide-react'
import Calendar from '../components/Calendar'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import {
  filterTasks,
  getRecentTasks,
  getStatusColor,
  getStatusBadgeColor,
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
  getEmptyTask,
  addTask,
  editTask,
  deleteTask,
  openEditModal,
  getOverdueTasks,
  searchTasks,
  addComment,
  editComment,
  deleteComment,
} from '../utils/taskUtils'
import NotificationModal from '../components/NotificationModal'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../utils/userUtils'
import { saveThemeToLocalStorage, getThemeFromLocalStorage } from '../utils/themeUtils'
import CompletedTasksModal from '../components/CompletedTasksModal'
import Navbar from '../components/Navbar'

function Dashboard({ tasks, setTasks, isDarkMode, setIsDarkMode }) {
  const [selected, setSelected] = useState(new Date())
  const [activeFilter, setActiveFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState(getEmptyTask())
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false)

  useEffect(() => {
    saveThemeToLocalStorage(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    saveTasksToLocalStorage(tasks)
  }, [tasks])

  const filteredTasks = filterTasks(tasks, activeFilter);
  const searchedTasks = isSearching ? searchTasks(tasks, searchQuery) : [];

  console.log('Active Filter:', activeFilter);
  console.log('Search Query State:', searchQuery);
  console.log('Filtered Tasks:', filteredTasks);
  console.log('Searched Tasks:', searchedTasks);

  const overdueTasks = getOverdueTasks(tasks)

  const handleAddTask = (e) => {
    e.preventDefault()
    addTask(tasks, newTask, setTasks, setNewTask, setIsModalOpen)
  }

  const handleEditTask = (e) => {
    e.preventDefault()
    editTask(tasks, editingTask, setTasks, setIsEditModalOpen, setEditingTask)
  }

  const handleDeleteTask = (id) => {
    deleteTask(id, tasks, setTasks)
  }

  const handleOpenEditModal = (task) => {
    openEditModal(task, setEditingTask, setIsEditModalOpen)
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  const quickActions = [
    { label: 'All Tasks', icon: List, path: '/all-tasks' },
    { label: 'Priority', icon: Star, path: '/priority-tasks' },
    { 
      label: 'Completed', 
      icon: CheckCircle2, 
      onClick: () => setIsCompletedModalOpen(true) 
    },
    { label: 'Schedule', icon: CalendarIcon, path: '/schedule' }
  ];

  return (
    <div className="container mx-auto p-4 bg-custom-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <Navbar 
        title="Task Manager"
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        overdueTasks={overdueTasks}
        setIsNotificationModalOpen={setIsNotificationModalOpen}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add New Task"
      >
        <TaskForm
          task={newTask}
          onSubmit={handleAddTask}
          onChange={setNewTask}
          onCancel={() => setIsModalOpen(false)}
          submitLabel="Add Task"
        />
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingTask(null)
        }}
        title="Edit Task"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleEditTask}
          onChange={setEditingTask}
          onCancel={() => {
            setIsEditModalOpen(false)
            setEditingTask(null)
          }}
          submitLabel="Save Changes"
        />
      </Modal>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        overdueTasks={overdueTasks}
        onEditTask={handleOpenEditModal}
      />

      <CompletedTasksModal
        isOpen={isCompletedModalOpen}
        onClose={() => setIsCompletedModalOpen(false)}
        tasks={tasks}
        onEditTask={(task) => {
          handleOpenEditModal(task);
          setIsCompletedModalOpen(false);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TaskList
            tasks={isSearching ? searchedTasks : filteredTasks}
            onAddClick={() => setIsModalOpen(true)}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onEditTask={handleOpenEditModal}
            onDeleteTask={handleDeleteTask}
            getStatusColor={getStatusColor}
            getStatusBadgeColor={getStatusBadgeColor}
            getRecentTasks={() => getRecentTasks(isSearching ? searchedTasks : filteredTasks)}
            searchQuery={searchQuery}
            onSearchChange={(value) => {
              setSearchQuery(value);
            }}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            onAddComment={(taskId, text) => addComment(tasks, taskId, text, setTasks)}
            onEditComment={(taskId, commentId, text) => editComment(tasks, taskId, commentId, text, setTasks)}
            onDeleteComment={(taskId, commentId) => deleteComment(tasks, taskId, commentId, setTasks)}
          />
        </div>

        <div className="space-y-6">
          <Calendar 
            tasks={tasks}
            selected={selected}
            setSelected={setSelected}
            onEditTask={handleOpenEditModal}
          />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-custom-gray-800 dark:text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map(({ label, icon: Icon, path, onClick }) => (
                <button 
                  key={label}
                  onClick={() => onClick ? onClick() : navigate(path)}
                  className="p-3 border border-custom-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-custom-gray-50 dark:hover:bg-gray-700 transition-colors text-custom-gray-800 dark:text-white"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 