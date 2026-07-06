import styles from '@/components/TaskListItem/TaskListItem.module.css';
import useTimerStore from '@/store/timerStore';
import clsx from 'clsx';
import formatTime from '@/utils/formatTime';
import CircleTimer from '../CircleTimer/CircleTimer';
import { motion } from 'motion/react';
import { buttonPress } from '@/animations/variants';

function getTimeStyle(currentTime) {
  if (currentTime <= 10) return styles.expiringTime;
  if (currentTime <= 120) return styles.warningTime;
  return styles.defaultTime;
}

const TaskListItem = ({ task, displayTime }) => {
  const activeTaskId = useTimerStore((state) => state.activeTaskId);
  const isRunning = useTimerStore((state) => state.isRunning);
  const selectTask = useTimerStore((state) => state.selectTask);
  const deleteTask = useTimerStore((state) => state.deleteTask);

  const currentTime =
    task.id === activeTaskId ? displayTime : task.remainingTime;

  const isActiveAndRunning = task.id === activeTaskId && isRunning;

  const timeStyle = isActiveAndRunning ? getTimeStyle(currentTime) : null;

  return (
    <motion.li
      className={clsx(styles.task, {
        [styles.selectedTask]: activeTaskId === task.id,
        [styles.runningTask]: activeTaskId === task.id && isRunning,
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
          [styles.runningTimeContainer]: activeTaskId === task.id && isRunning,
        })}
      >
        <CircleTimer
          task={task}
          displayTime={
            task.id === activeTaskId ? displayTime : task.remainingTime
          }
          duration={task.duration}
          timerStrokeWidth={20}
          circleWidth={'45px'}
          circlePadding={0}
        />
        <p className={clsx(styles.taskTime, timeStyle)}>
          {formatTime(currentTime)}
        </p>
      </div>
      <p>{task.text}</p>
      <div
        className={styles.endButton}
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 1.52344L9.52246 8L16 14.4766L14.4766 16L7.99902 9.52246L1.52344 15.999L0 14.4756L6.47559 8L0 1.52441L1.52344 0.000976562L7.99902 6.47656L14.4766 0L16 1.52344Z"
            fill={
              activeTaskId === task.id ? 'var(--blue-200)' : 'var(--blue-100)'
            }
          />
        </svg>
      </div>
    </motion.li>
  );
};

export default TaskListItem;
