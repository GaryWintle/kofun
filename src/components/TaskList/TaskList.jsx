import clsx from 'clsx';
import styles from '@/components/TaskList/TaskList.module.css';
import formatTime from '@/utils/formatTime';

const TaskList = ({ state, dispatch, displayTime }) => {
  return (
    <ul role="list">
      {state.tasks.map((task) => (
        <li
          key={task.id}
          className={clsx(styles.poop, {
            [styles.selectedPoop]: state.activeTaskId === task.id,
          })}
          onClick={() => {
            dispatch({ type: 'SELECT_TASK', payload: task.id });
          }}
        >
          <p className="filler">{task.text}</p>
          <p className="filler">
            {formatTime(
              task.id === state.activeTaskId ? displayTime : task.remainingTime,
            )}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
