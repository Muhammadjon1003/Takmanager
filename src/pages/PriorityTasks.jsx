import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Bell, Sun, Moon } from 'lucide-react'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import NotificationModal from '../components/NotificationModal'
import TaskCard from '../components/TaskCard'
import {
  getStatusColor,
  getStatusBadgeColor,
  getOverdueTasks,
  addTask,
  editTask,
  deleteTask,
  openEditModal,
  getEmptyTask,
  addComment,
  editComment,
  deleteComment
} from '../utils/taskUtils'
import { getCurrentUser, logoutUser } from '../utils/userUtils'
import { saveThemeToLocalStorage, getThemeFromLocalStorage } from '../utils/themeUtils'
import Navbar from '../components/Navbar'

function PriorityTasks({ tasks, setTasks, isDarkMode, setIsDarkMode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState(getEmptyTask())
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
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

  // Group tasks by priority
  const groupedTasks = {
    'most-important': tasks.filter(task => task.priority === 'most-important'),
    'important': tasks.filter(task => task.priority === 'important'),
    'least-important': tasks.filter(task => task.priority === 'least-important'),
    'not-important': tasks.filter(task => task.priority === 'not-important' || !task.priority),
  }

  const priorityLabels = {
    'most-important': 'Most Important',
    'important': 'Important',
    'least-important': 'Least Important',
    'not-important': 'Not Important'
  }

  return (
    <div className="container mx-auto p-4 bg-custom-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <Navbar 
        title="Priority Tasks"
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        overdueTasks={overdueTasks}
        setIsNotificationModalOpen={setIsNotificationModalOpen}
        showBackButton
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Object.entries(groupedTasks).map(([priority, priorityTasks]) => (
          <div key={priority} className="space-y-4">
            <h2 className="text-lg font-semibold text-custom-gray-800 dark:text-white capitalize flex items-center">
              {priorityLabels[priority]} ({priorityTasks.length})
            </h2>
            <div className="space-y-4">
              {priorityTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteTask}
                  getStatusColor={getStatusColor}
                  getStatusBadgeColor={getStatusBadgeColor}
                  onAddComment={(text) => addComment(tasks, task.id, text, setTasks)}
                  onEditComment={(commentId, text) => editComment(tasks, task.id, commentId, text, setTasks)}
                  onDeleteComment={(commentId) => deleteComment(tasks, task.id, commentId, setTasks)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
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
        onEditTask={(task) => {
          setEditingTask(task)
          setIsEditModalOpen(true)
          setIsNotificationModalOpen(false)
        }}
      />
    </div>
  )
}

export default PriorityTasks; 