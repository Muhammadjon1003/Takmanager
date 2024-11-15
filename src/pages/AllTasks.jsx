import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Bell, Sun, Moon, Pencil, Trash2 } from 'lucide-react'
import TaskList from '../components/TaskList'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import NotificationModal from '../components/NotificationModal'
import {
  filterTasks,
  getStatusColor,
  getStatusBadgeColor,
  getOverdueTasks,
  searchTasks,
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
import TaskCard from '../components/TaskCard'
import Navbar from '../components/Navbar'

function AllTasks({ tasks, setTasks, isDarkMode, setIsDarkMode }) {
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

  const filteredTasks = filterTasks(tasks, activeFilter)
  const searchedTasks = isSearching ? searchTasks(tasks, searchQuery) : []

  // Group tasks by status
  const groupedTasks = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    done: filteredTasks.filter(task => task.status === 'done')
  }

  return (
    <div className="container mx-auto p-4 bg-custom-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <Navbar 
        title="All Tasks"
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        overdueTasks={overdueTasks}
        setIsNotificationModalOpen={setIsNotificationModalOpen}
        showBackButton
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => (
          <div key={status} className="space-y-4">
            <h2 className="text-lg font-semibold text-custom-gray-800 dark:text-white capitalize">
              {status.replace('-', ' ')} ({statusTasks.length})
            </h2>
            <div className="space-y-4">
              {statusTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteTask}
                  getStatusColor={getStatusColor}
                  getStatusBadgeColor={getStatusBadgeColor}
                  onAddComment={(taskId, text) => addComment(tasks, taskId, text, setTasks)}
                  onEditComment={(taskId, commentId, text) => editComment(tasks, taskId, commentId, text, setTasks)}
                  onDeleteComment={(taskId, commentId) => deleteComment(tasks, taskId, commentId, setTasks)}
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

export default AllTasks 