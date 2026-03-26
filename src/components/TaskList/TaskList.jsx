import styles from '@/components/TaskList/TaskList.module.css';

const TaskList = ({ state, dispatch }) => {
  return (
    <ul>
      {state.tasks.map((task) => (
        <li
          key={task.id}
          className={
            state.activeTaskId === task.id ? styles.selectedPoop : styles.poop
          }
          onClick={() => {
            dispatch({ type: 'SELECT_TASK', payload: task.id });
          }}
        >
          <p className="filler">{task.text}</p>
          <p className="filler">{task.remainingTime}</p>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
