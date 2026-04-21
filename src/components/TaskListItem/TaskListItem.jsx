import clsx from 'clsx';
import formatTime from '@/utils/formatTime';
import styles from '@/components/TaskListItem/TaskListItem.module.css';
import CircleTimer from '../CircleTimer/CircleTimer';
import { motion } from 'motion/react';
import { buttonPress } from '@/animations/variants';

const TaskListItem = ({ task, activeTaskId, dispatch, displayTime }) => {
  return (
    <motion.li
      className={clsx(styles.task, {
        [styles.selectedTask]: activeTaskId === task.id,
      })}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: 'SELECT_TASK', payload: task.id });
      }}
      {...buttonPress(0.99)}
    >
      <div
        className={clsx(styles.timeContainer, {
          [styles.selectedTimeContainer]: activeTaskId === task.id,
        })}
      >
        <CircleTimer
          task={task}
          activeTaskId={activeTaskId}
          displayTime={
            task.id === activeTaskId ? displayTime : task.remainingTime
          }
          duration={task.duration}
          timerStrokeWidth={40}
          circleWidth={'22px'}
          circlePadding={0}
        />
        <p className={styles.taskTime}>
          {formatTime(
            task.id === activeTaskId ? displayTime : task.remainingTime
          )}
        </p>
      </div>
      <p>{task.text}</p>
    </motion.li>
  );
};

export default TaskListItem;
