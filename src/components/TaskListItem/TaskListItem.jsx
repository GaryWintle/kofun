import styles from '@/components/TaskListItem/TaskListItem.module.css';
import useTimerStore from '@/store/timerStore';
import clsx from 'clsx';
import formatTime from '@/utils/formatTime';
import CircleTimer from '../CircleTimer/CircleTimer';
import { motion } from 'motion/react';
import { buttonPress } from '@/animations/variants';

const TaskListItem = ({ task, displayTime }) => {
  const activeTaskId = useTimerStore((state) => state.activeTaskId);
  const selectTask = useTimerStore((state) => state.selectTask);

  return (
    <motion.li
      className={clsx(styles.task, {
        [styles.selectedTask]: activeTaskId === task.id,
      })}
      onClick={(e) => {
        e.stopPropagation();
        selectTask(task.id);
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
