import { X } from 'lucide-react'

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-custom-gray-800 dark:text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-custom-gray-100 dark:hover:bg-gray-700 rounded-full text-custom-gray-800 dark:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal; 