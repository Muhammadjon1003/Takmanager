import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Bell, Sun, Moon, CheckCircle2 } from 'lucide-react'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'
import {
  getStatusColor,
  getStatusBadgeColor,
  getOverdueTasks,
  editTask,
} from '../utils/taskUtils'
import { getCurrentUser } from '../utils/userUtils'
import { saveThemeToLocalStorage, getThemeFromLocalStorage } from '../utils/themeUtils'

function CompletedTasksModal({ 
  isOpen, 
  onClose, 
  tasks,
  onEditTask,
}) {
  const completedTasks = tasks.filter(task => task.status === 'done');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Completed Tasks"
    >
      <div className="space-y-4">
        {completedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-custom-gray-800/60 dark:text-gray-400">
            <CheckCircle2 className="h-12 w-12 mb-2 stroke-1" />
            <p>No completed tasks</p>
          </div>
        ) : (
          <>
            <div className="flex items-center text-green-500 mb-4">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <span className="font-medium">You have completed {completedTasks.length} tasks</span>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {completedTasks.map(task => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30"
                >
                  <div>
                    <h4 className="font-medium text-custom-gray-800 dark:text-white">{task.title}</h4>
                    <p className="text-sm text-green-500">Completed on: {task.dueDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        onEditTask(task)
                        onClose()
                      }}
                      className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full text-custom-gray-800 dark:text-gray-300"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default CompletedTasksModal; 