import { useState } from 'react';
import styles from '@/components/TaskForm/TaskForm.module.css';
import TaskFormCancelButton from '@/components/TaskFormCancelButton/TaskFormCancelButton.jsx';
import formatTime from '@/utils/formatTime';
import { useTaskTime } from '@/hooks/useTaskTime';
import { motion } from 'motion/react';
import { buttonPress, moduleSlideInOut } from '@/animations/variants';

const TaskForm = ({ onAddTask, setTaskModule }) => {
  const [taskText, setTaskText] = useState('');
  const {
    taskTime,
    presetTime,
    holdIncrement,
    holdDecrement,
    increment,
    decrement,
    stopInterval,
    reset,
  } = useTaskTime();

  const presetTimes = [
    { timeDisplay: '3h', timeAmount: 10800 },
    { timeDisplay: '2h', timeAmount: 7200 },
    { timeDisplay: '1h', timeAmount: 3600 },
    { timeDisplay: '30m', timeAmount: 1800 },
    { timeDisplay: '20m', timeAmount: 1200 },
    { timeDisplay: '10m', timeAmount: 600 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      text: taskText,
      dialog: null,
      duration: taskTime,
      remainingTime: taskTime,
      isComplete: false,
    };
    onAddTask(newTask);
    setTaskText('');
    reset();
    setTaskModule((prev) => !prev);
  };

  return (
    <div className={styles.moduleWrapper} {...moduleSlideInOut}>
      <div className={styles.moduleHeader}>
        <div className={styles.drawerHandle}></div>
        <TaskFormCancelButton setTaskModule={setTaskModule} />
      </div>

      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.field}>
          <label htmlFor="taskText" className={styles.title}>
            Ready to focus?
          </label>
          <input
            id="taskText"
            className={styles.textInput}
            value={taskText}
            type="text"
            placeholder="Task here, time limit below."
            onChange={(e) => setTaskText(e.target.value)}
          ></input>
        </div>
        <div className={styles.field}>
          {/* <label htmlFor="taskTime" className={styles.title}>
            How long ya need?
          </label> */}
          <div className={styles.timeField}>
            <div className={styles.timeStepper}>
              <motion.button
                {...buttonPress()}
                type="button"
                className={styles.taskTimeButton}
                onClick={() => decrement(60)}
                onPointerDown={() => {
                  holdDecrement(60);
                }}
                onPointerUp={() => {
                  stopInterval();
                }}
                onMouseLeave={() => stopInterval()}
                onContextMenu={(e) => e.preventDefault()}
              >
                <svg
                  width="16"
                  height="2"
                  viewBox="0 0 16 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 2.00098H0V0H16V2.00098Z" fill="#EAF1F0" />
                </svg>
              </motion.button>
              <input
                id="taskTime"
                className={styles.taskTime}
                value={formatTime(taskTime, false)}
                type="text"
                onChange={(e) => setTaskTime(Number(e.target.value))}
                readOnly
              ></input>
              <motion.button
                {...buttonPress()}
                type="button"
                className={styles.taskTimeButton}
                onClick={() => increment(60)}
                onPointerDown={() => {
                  holdIncrement(60);
                }}
                onPointerUp={() => {
                  stopInterval();
                }}
                onMouseLeave={() => stopInterval()}
                onContextMenu={(e) => e.preventDefault()}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.15723 7.1582H16V9.15918H9.15723V16H7.1582V9.15918H0V7.1582H7.1582V0H9.15723V7.1582Z"
                    fill="#EAF1F0"
                  />
                </svg>
              </motion.button>
            </div>

            <ul className={styles.presetButtonsWrapper} role="list">
              {presetTimes.map((time) => (
                <li key={time.timeAmount}>
                  <motion.button
                    {...buttonPress()}
                    type="button"
                    className={styles.presetButton}
                    onClick={() => presetTime(time.timeAmount)}
                  >
                    {time.timeDisplay}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.finalButtonsWrapper}>
          <motion.button
            {...buttonPress()}
            type="submit"
            className={styles.submitButton}
          >
            Add Task
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
