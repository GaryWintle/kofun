import { useState } from 'react';
import styles from '@/components/TaskForm/TaskForm.module.css';
import formatTime from '@/utils/formatTime';

const TaskForm = ({
  tasks,
  dispatch,
  onAddTask,
  displayTime,
  setTaskModule,
}) => {
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState(0);

  const decrement = (amount) => {
    setTaskTime((prev) => Math.max(0, prev - amount));
  };
  const increment = (amount) => {
    setTaskTime((prev) => prev + amount);
  };

  const presetTimes = [
    { timeDisplay: '3h', timeAmount: 10800 },
    { timeDisplay: '2h', timeAmount: 7200 },
    { timeDisplay: '1h', timeAmount: 3600 },
    { timeDisplay: '30m', timeAmount: 1800 },
    { timeDisplay: '15m', timeAmount: 900 },
    { timeDisplay: '10m', timeAmount: 600 },
    { timeDisplay: '5m', timeAmount: 300 },
  ];

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
    setTaskModule((prev) => !prev);
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
              value={formatTime(taskTime, false)}
              type="text"
              onChange={(e) => setTaskTime(Number(e.target.value))}
              readOnly
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
          {/* <p className={styles.longTimeText}>1 hour & 15 Minutes</p> */}

          <ul className={styles.presetButtonsWrapper} role="list">
            {presetTimes.map((time) => (
              <li key={time.timeAmount}>
                <button
                  type="button"
                  className={styles.presetButton}
                  onClick={() => setTaskTime((prev) => prev + time.timeAmount)}
                >
                  {time.timeDisplay}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.subtleButton}
            onClick={() => setTaskTime((prev) => 0)}
          >
            Reset
          </button>
        </div>
      </div>
      <div className={styles.finalButtonsWrapper}>
        <button type="submit" className={styles.submitButton}>
          ADD TASK
        </button>
        <button
          className={styles.subtleButton}
          onClick={() => setTaskModule((prev) => !prev)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
