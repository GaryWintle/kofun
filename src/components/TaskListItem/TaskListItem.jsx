import clsx from 'clsx';
import formatTime from '@/utils/formatTime';
import styles from '@/components/TaskListItem/TaskListItem.module.css';
import CircleTimer from '../CircleTimer/CircleTimer';

const TaskListItem = ({ task, activeTaskId, dispatch, displayTime }) => {
  return (
    <li
      className={clsx(styles.task, {
        [styles.selectedTask]: activeTaskId === task.id,
      })}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: 'SELECT_TASK', payload: task.id });
      }}
    >
      <div className={styles.timeContainer}>
        <CircleTimer
          displayTime={
            task.id === activeTaskId ? displayTime : task.remainingTime
          }
          duration={task.duration}
          timerStrokeWidth={40}
          circleWidth={'24px'}
          circlePadding={0}
        />
        <p>
          {formatTime(
            task.id === activeTaskId ? displayTime : task.remainingTime
          )}
        </p>
      </div>
      <p>{task.text}</p>
    </li>
  );
};

export default TaskListItem;
