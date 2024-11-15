import { Bell, AlertCircle, CheckCircle2 } from 'lucide-react'
import Modal from './Modal'

function NotificationModal({ 
  isOpen, 
  onClose, 
  overdueTasks, 
  onEditTask 
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Notifications"
    >
      <div className="space-y-4">
        {overdueTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-custom-gray-800/60 dark:text-gray-400">
            <Bell className="h-12 w-12 mb-2 stroke-1" />
            <p>No overdue tasks</p>
          </div>
        ) : (
          <>
            <div className="flex items-center text-red-500 mb-4">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">You have {overdueTasks.length} overdue tasks</span>
            </div>
            <div className="space-y-3">
              {overdueTasks.map(task => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30"
                >
                  <div>
                    <h4 className="font-medium text-custom-gray-800 dark:text-white">{task.title}</h4>
                    <p className="text-sm text-red-500">Due: {task.dueDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        onEditTask(task)
                        onClose()
                      }}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-custom-gray-800 dark:text-gray-300"
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

export default NotificationModal 