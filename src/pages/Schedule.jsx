import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Bell, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import NotificationModal from '../components/NotificationModal'
import {
  getStatusColor,
  getStatusBadgeColor,
  getOverdueTasks,
  editTask,
  addTask,
  getEmptyTask,
} from '../utils/taskUtils'
import { getCurrentUser, logoutUser } from '../utils/userUtils'
import { saveThemeToLocalStorage, getThemeFromLocalStorage } from '../utils/themeUtils'
import Navbar from '../components/Navbar'

function Schedule({ tasks, setTasks, isDarkMode, setIsDarkMode }) {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newTask, setNewTask] = useState(getEmptyTask())
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
  const overdueTasks = getOverdueTasks(tasks)

  const handleEditTask = (e) => {
    e.preventDefault()
    editTask(tasks, editingTask, setTasks, setIsEditModalOpen, setEditingTask)
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  // Get week dates
  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateString);
  }

  // Navigate weeks
  const previousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  }

  const nextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (selectedDate) {
      const taskWithDate = {
        ...newTask,
        dueDate: selectedDate.toISOString().split('T')[0]
      }
      addTask(tasks, taskWithDate, setTasks, setNewTask, setIsAddModalOpen)
      setSelectedDate(null)
    }
  }

  const weekDates = getWeekDates();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto p-4 bg-custom-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <Navbar 
        title="Schedule"
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        overdueTasks={overdueTasks}
        setIsNotificationModalOpen={setIsNotificationModalOpen}
        showBackButton
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={previousWeek}
            className="p-2 hover:bg-custom-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">
            {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {
              weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            }
          </h2>
          <button
            onClick={nextWeek}
            className="p-2 hover:bg-custom-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date, index) => {
            const dateString = date.toISOString().split('T')[0];
            const isToday = dateString === today;
            const dayTasks = getTasksForDate(date);

            return (
              <div 
                key={dateString}
                onClick={() => {
                  setSelectedDate(date);
                  setNewTask(getEmptyTask());
                  setIsAddModalOpen(true);
                }}
                className={`min-h-[200px] p-3 rounded-lg border cursor-pointer hover:bg-custom-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  isToday 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-custom-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-center mb-3">
                  <div className="text-sm text-custom-gray-800/60 dark:text-gray-400">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-semibold ${
                    isToday ? 'text-blue-500' : 'text-custom-gray-800 dark:text-white'
                  }`}>
                    {date.getDate()}
                  </div>
                </div>
                <div className="space-y-2">
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering parent's onClick
                        setEditingTask(task);
                        setIsEditModalOpen(true);
                      }}
                      className={`p-2 rounded cursor-pointer text-sm ${getStatusColor(task.status)} hover:opacity-90`}
                    >
                      <div className="font-medium truncate">{task.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedDate(null);
        }}
        title={`Add Task for ${selectedDate?.toLocaleDateString()}`}
      >
        <TaskForm
          task={newTask}
          onSubmit={handleAddTask}
          onChange={setNewTask}
          onCancel={() => {
            setIsAddModalOpen(false);
            setSelectedDate(null);
          }}
          submitLabel="Add Task"
          hideDateField={true} // Hide the date field since it's set by the calendar
        />
      </Modal>

      {/* Modals */}
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

export default Schedule; 