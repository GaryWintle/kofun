import { useState } from 'react';
import styles from '@/components/TaskForm/TaskForm.module.css';
import formatTime from '@/utils/formatTime';

const TaskForm = ({ tasks, dispatch, onAddTask, displayTime }) => {
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState(0);

  const decrement = (amount) => {
    setTaskTime((prev) => Math.max(0, prev - amount));
  };
  const increment = (amount) => {
    setTaskTime((prev) => prev + amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      text: taskText,
      duration: taskTime,
      remainingTime: taskTime,
      isComplete: false,
    };
    onAddTask(newTask);
    setTaskText('');
    setTaskTime(0);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.field}>
        <label htmlFor="taskText" className={styles.title}>
          Enter your Task
        </label>
        <input
          id="taskText"
          className={styles.textInput}
          value={taskText}
          type="text"
          placeholder="Whatcha working on?"
          onChange={(e) => setTaskText(e.target.value)}
        ></input>
      </div>
      <div className={styles.field}>
        <label htmlFor="taskTime" className={styles.title}>
          Task Time Limit
        </label>
        <div className={styles.stepper}>
          <button type="button" onClick={() => decrement(60)}>
            -
          </button>
          <input
            id="taskTime"
            className={styles.taskTime}
            value={formatTime(taskTime)}
            type="text"
            onChange={(e) => setTaskTime(Number(e.target.value))}
            disabled
          ></input>
          <button type="button" onClick={() => increment(60)}>
            +
          </button>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        ADD TASK
      </button>
    </form>
  );
};

export default TaskForm;
