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
        <div className={styles.timeField}>
          <div className={styles.timeStepper}>
            <button
              type="button"
              className={styles.taskTimeButton}
              onClick={() => decrement(60)}
            >
              <svg width="13" height="5" viewBox="0 0 13 5">
                <path
                  d="M12.667 4.87207H0V0H12.667V4.87207Z"
                  fill="var(--green-400)"
                />
              </svg>
            </button>
            <input
              id="taskTime"
              className={styles.taskTime}
              value={formatTime(taskTime)}
              type="text"
              onChange={(e) => setTaskTime(Number(e.target.value))}
              disabled
            ></input>
            <button
              type="button"
              className={styles.taskTimeButton}
              onClick={() => increment(60)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path
                  d="M9.23047 4.10254H13.333V9.23047H9.23047V13.333H4.10254V9.23047H0V4.10254H4.10254V0H9.23047V4.10254Z"
                  fill="var(--green-400)"
                />
              </svg>
            </button>
          </div>
          <p className={styles.longTimeText}>1 hour & 15 Minutes</p>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        ADD TASK
      </button>
    </form>
  );
};

export default TaskForm;
