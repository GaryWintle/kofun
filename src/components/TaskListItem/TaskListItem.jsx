import clsx from 'clsx';
import formatTime from '@/utils/formatTime';
import styles from '@/components/TaskListItem/TaskListItem.module.css';

const TaskListItem = ({ task, activeTaskId, dispatch, displayTime }) => {
  return (
    <li
      className={clsx(styles.poop, {
        [styles.selectedPoop]: activeTaskId === task.id,
      })}
      onClick={() => {
        dispatch({ type: 'SELECT_TASK', payload: task.id });
      }}
    >
      <p className="filler">{task.text}</p>
      <p className="filler">
        {formatTime(
          task.id === activeTaskId ? displayTime : task.remainingTime,
        )}
      </p>
    </li>
  );
};

export default TaskListItem;
