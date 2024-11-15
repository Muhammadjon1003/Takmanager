import { useState } from 'react';
import { MessageSquare, Pencil, Trash2 } from 'lucide-react';
import Modal from './Modal';

function CommentModal({ isOpen, onClose, comments, onAddComment, onEditComment, onDeleteComment }) {
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingComment) {
      onEditComment(editingComment.id, newComment);
      setEditingComment(null);
    } else {
      onAddComment(newComment);
    }
    setNewComment('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Comments">
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={editingComment ? "Edit comment..." : "Add a comment..."}
              className="w-full px-3 py-2 border border-custom-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-custom-gray-800 dark:text-white"
            />
          </div>
          <div className="flex justify-end">
            {editingComment && (
              <button
                type="button"
                onClick={() => {
                  setEditingComment(null);
                  setNewComment('');
                }}
                className="px-4 py-2 mr-2 border border-custom-gray-200 dark:border-gray-600 rounded-lg hover:bg-custom-gray-50 dark:hover:bg-gray-700 text-custom-gray-800 dark:text-white"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editingComment ? 'Save' : 'Add Comment'}
            </button>
          </div>
        </form>

        <div className="space-y-3 mt-4">
          {comments.map(comment => (
            <div 
              key={comment.id}
              className="p-3 border border-custom-gray-200 dark:border-gray-600 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-custom-gray-800 dark:text-white">{comment.text}</p>
                  <p className="text-sm text-custom-gray-800/60 dark:text-gray-400 mt-1">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingComment(comment);
                      setNewComment(comment.text);
                    }}
                    className="p-1 hover:bg-custom-gray-100 dark:hover:bg-gray-700 rounded-full text-custom-gray-800 dark:text-gray-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="p-1 hover:bg-custom-gray-100 dark:hover:bg-gray-700 rounded-full text-custom-gray-800 dark:text-gray-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default CommentModal; 