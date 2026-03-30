import TaskListItem from '@/components/TaskListItem/TaskListItem';
import styles from '@/components/TaskList/TaskList.module.css';

const TaskList = ({ state, dispatch, displayTime }) => {
  return (
    <ul role="list" className={styles.container}>
      {state.tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          activeTaskId={state.activeTaskId}
          dispatch={dispatch}
          displayTime={displayTime}
        />
      ))}
    </ul>
  );
};

export default TaskList;
