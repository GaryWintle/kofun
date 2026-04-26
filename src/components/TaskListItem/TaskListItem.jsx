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
  const deleteTask = useTimerStore((state) => state.deleteTask);

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
      <div
        className={styles.endButton}
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
          console.log('poop');
        }}
      >
        <svg width="14" height="14" viewBox="0 0 26 25" fill="none">
          <path
            d="M25.0722 5.30363C24.4506 4.3177 23.705 3.38224 22.8284 2.52275C21.9518 1.66327 20.9977 0.932185 19.9922 0.322736L12.5925 7.57819L4.86366 0.000115678C3.88422 0.567234 2.9617 1.25829 2.12244 2.08119C1.28318 2.90408 0.578375 3.80861 -2.18301e-05 4.76896L7.72877 12.347L0.329015 19.6025C0.950584 20.5884 1.69621 21.5239 2.57278 22.3834C3.44936 23.2429 4.40343 23.9739 5.40897 24.5834L12.8087 17.3279L20.5375 24.906C21.517 24.3389 22.4395 23.6478 23.2787 22.8249C24.118 22.002 24.8228 21.0975 25.4012 20.1372L17.6724 12.5591L25.0722 5.30363Z"
            fill={
              activeTaskId === task.id
                ? 'var(--green-100)'
                : 'var(--neutral-400)'
            }
          />
        </svg>
      </div>
    </motion.li>
  );
};

export default TaskListItem;
