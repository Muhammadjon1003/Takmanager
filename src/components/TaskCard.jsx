import { useState } from 'react';
import { Pencil, Trash2, MessageSquare, Star } from 'lucide-react';
import CommentModal from './CommentModal';

function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  getStatusColor, 
  getStatusBadgeColor,
  onAddComment,
  onEditComment,
  onDeleteComment 
}) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const renderPriorityStars = () => {
    const starCount = {
      'least-important': 1,
      'important': 2,
      'most-important': 3,
      'not-important': 0
    }[task.priority || 'not-important'];

    return starCount > 0 && (
      <div className="flex space-x-1">
        {[...Array(starCount)].map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current text-yellow-400" />
        ))}
      </div>
    );
  };

  return (
    <div className={`flex flex-col justify-between p-4 rounded-lg h-48 shadow-sm ${getStatusColor(task.status)}`}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(task.status)} text-white font-medium`}>
            {task.status}
          </span>
          {renderPriorityStars()}
        </div>
        <h3 className="font-semibold mb-2 text-white">{task.title}</h3>
        <p className="text-sm text-white/80">Due: {task.dueDate}</p>
        {task.comments && task.comments.length > 0 && (
          <p className="text-sm text-white/80 mt-2">
            Latest: {task.comments[task.comments.length - 1].text}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          className="p-2 hover:bg-white/10 rounded-full text-white" 
          onClick={() => setIsCommentModalOpen(true)}
        >
          <MessageSquare className="h-4 w-4" />
        </button>
        <button 
          className="p-2 hover:bg-white/10 rounded-full text-white" 
          onClick={() => onEdit(task)}
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button 
          className="p-2 hover:bg-white/10 rounded-full text-white" 
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        comments={task.comments || []}
        onAddComment={(text) => onAddComment(task.id, text)}
        onEditComment={(commentId, text) => onEditComment(task.id, commentId, text)}
        onDeleteComment={(commentId) => onDeleteComment(task.id, commentId)}
      />
    </div>
  );
}

export default TaskCard; 