import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import CalendarTaskList from './CalendarTaskList'

function Calendar({ tasks, selected, setSelected, onEditTask }) {
  const calendarClassName = `
    [&_.rdp-day_button:hover]:bg-gray-100
    [&_.rdp-day_button:hover]:dark:bg-gray-700
    [&_.rdp-day_selected]:bg-blue-500
    [&_.rdp-day_selected]:text-white
    [&_.rdp-day_selected:hover]:bg-blue-600
    [&_.rdp-day_today]:font-bold
    [&_.rdp]:text-custom-gray-800
    [&_.rdp]:dark:text-white
    [&_.rdp-day]:dark:text-gray-300
    [&_.rdp-day_disabled]:dark:text-gray-600
    [&_.rdp-head_cell]:dark:text-gray-400
    [&_.rdp-button:hover]:dark:bg-gray-700
    [&_.rdp-nav_button]:dark:text-gray-300
    [&_.rdp-nav_button:hover]:dark:bg-gray-700
  `

  const getDateTaskStatus = (date) => {
    const targetDate = new Date(date);
    const dateString = targetDate.toISOString().split('T')[0];
    
    const tasksOnDate = tasks.filter(task => task.dueDate === dateString);
    
    if (tasksOnDate.length === 0) return null;
    
    if (tasksOnDate.some(task => task.status === 'todo')) {
      return 'todo';
    }
    if (tasksOnDate.some(task => task.status === 'in-progress')) {
      return 'in-progress';
    }
    if (tasksOnDate.every(task => task.status === 'done')) {
      return 'done';
    }
    
    return null;
  };

  const getTasksForSelectedDate = () => {
    if (!selected) return [];
    const dateString = selected.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateString);
  };

  const selectedTasks = getTasksForSelectedDate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 text-custom-gray-800 dark:text-white">Calendar</h2>
      <div className={`${calendarClassName}`}>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          className="mx-auto"
          modifiers={{
            todo: (date) => getDateTaskStatus(date) === 'todo',
            'in-progress': (date) => getDateTaskStatus(date) === 'in-progress',
            done: (date) => getDateTaskStatus(date) === 'done',
          }}
          modifiersStyles={{
            todo: {
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              color: 'rgb(185, 28, 28)',
            },
            'in-progress': {
              backgroundColor: 'rgba(249, 115, 22, 0.2)',
              color: 'rgb(194, 65, 12)',
            },
            done: {
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              color: 'rgb(21, 128, 61)',
            },
          }}
        />
      </div>

      {selectedTasks.length > 0 && (
        <>
          <div className="mt-4 pt-4 border-t dark:border-gray-700">
            <h3 className="font-medium text-custom-gray-800 dark:text-white mb-2">
              Tasks for {selected.toLocaleDateString()}
            </h3>
            <CalendarTaskList 
              tasks={selectedTasks}
              onEditTask={onEditTask}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Calendar 