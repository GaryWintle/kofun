import { useState } from 'react';
import styles from '@/components/TaskForm/TaskForm.module.css';
import formatTime from '@/utils/formatTime';
import { motion } from 'motion/react';
import { buttonPress, moduleSlideInOut } from '@/animations/variants';

const TaskForm = ({ onAddTask, setTaskModule }) => {
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
    <motion.div
      className={styles.moduleWrapper}
      onClick={(e) => e.stopPropagation()}
      {...moduleSlideInOut}
    >
      <div className={styles.moduleHeader}>
        <p className={styles.headerText}>Please enter task & time limit.</p>
        {/* <p className={styles.headerSecondaryText}>
          Enter your task and its time limit.
        </p> */}
        <motion.button
          {...buttonPress()}
          className={styles.cancelButton}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTaskModule((prev) => !prev);
          }}
        >
          <svg width="26" height="25" viewBox="0 0 26 25" fill="none">
            <path
              d="M25.0722 5.30363C24.4506 4.3177 23.705 3.38224 22.8284 2.52275C21.9518 1.66327 20.9977 0.932185 19.9922 0.322736L12.5925 7.57819L4.86366 0.000115678C3.88422 0.567234 2.9617 1.25829 2.12244 2.08119C1.28318 2.90408 0.578375 3.80861 -2.18301e-05 4.76896L7.72877 12.347L0.329015 19.6025C0.950584 20.5884 1.69621 21.5239 2.57278 22.3834C3.44936 23.2429 4.40343 23.9739 5.40897 24.5834L12.8087 17.3279L20.5375 24.906C21.517 24.3389 22.4395 23.6478 23.2787 22.8249C24.118 22.002 24.8228 21.0975 25.4012 20.1372L17.6724 12.5591L25.0722 5.30363Z"
              fill="var(--green-300)"
            />
          </svg>
        </motion.button>
      </div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.field}>
          {/* <label htmlFor="taskText" className={styles.title}>
            Enter your Task
          </label> */}
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
          {/* <label htmlFor="taskTime" className={styles.title}>
            Task Time Limit
          </label> */}
          <div className={styles.timeField}>
            <div className={styles.timeStepper}>
              <motion.button
                {...buttonPress()}
                type="button"
                className={styles.taskTimeButton}
                onClick={() => decrement(60)}
              >
                <svg width="13" height="5" viewBox="0 0 13 5">
                  <path
                    d="M12.667 4.87207H0V0H12.667V4.87207Z"
                    fill="var(--green-300)"
                  />
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
              >
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M9.23047 4.10254H13.333V9.23047H9.23047V13.333H4.10254V9.23047H0V4.10254H4.10254V0H9.23047V4.10254Z"
                    fill="var(--green-300)"
                  />
                </svg>
              </motion.button>
            </div>
            {/* <p className={styles.longTimeText}>1 hour & 15 Minutes</p> */}

            <ul className={styles.presetButtonsWrapper} role="list">
              {presetTimes.map((time) => (
                <li key={time.timeAmount}>
                  <motion.button
                    {...buttonPress()}
                    type="button"
                    className={styles.presetButton}
                    onClick={() =>
                      setTaskTime((prev) => prev + time.timeAmount)
                    }
                  >
                    {time.timeDisplay}
                  </motion.button>
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
          <motion.button
            {...buttonPress()}
            type="submit"
            className={styles.submitButton}
          >
            ADD TASK
          </motion.button>
          <button
            className={styles.subtleButton}
            onClick={() => setTaskModule((prev) => !prev)}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;
