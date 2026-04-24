import styles from '@/components/TaskList/TaskList.module.css';
import useTimerStore from '@/store/timerStore';
import TaskListItem from '@/components/TaskListItem/TaskListItem';

const TaskList = ({ displayTime }) => {
  const tasks = useTimerStore((state) => state.tasks);

  return (
    <ul role="list" className={styles.container}>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} displayTime={displayTime} />
      ))}
    </ul>
  );
};

export default TaskList;
