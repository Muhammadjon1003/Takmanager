import { Bell, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../utils/userUtils'

function Navbar({ 
  title, 
  isDarkMode, 
  setIsDarkMode, 
  overdueTasks, 
  setIsNotificationModalOpen,
  showBackButton = false 
}) {
  const navigate = useNavigate()
  const currentUser = getCurrentUser()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <header className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-custom-gray-800 dark:text-white">{title}</h1>
        {showBackButton && (
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-custom-gray-800 dark:text-white hover:bg-custom-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-custom-gray-100 dark:hover:bg-custom-gray-800 text-custom-gray-800 dark:text-white relative"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-custom-gray-100 dark:hover:bg-custom-gray-800 text-custom-gray-800 dark:text-white relative"
            onClick={() => setIsNotificationModalOpen(true)}
          >
            <Bell className="h-4 w-4" />
            {overdueTasks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {overdueTasks.length}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {currentUser ? (
            <>
              <span className="text-custom-gray-800 dark:text-white">{currentUser.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-custom-gray-800 dark:text-white hover:bg-custom-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-custom-gray-800 dark:text-white hover:bg-custom-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar; 