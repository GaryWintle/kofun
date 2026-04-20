'use client';

import { useReducer, useState } from 'react';
import timerReducer, { timerInitialState } from '@/reducer/timerReducer';
import styles from '@/components/KofunApp/KofunApp.module.css';
import Hero from '@/components/Hero/Hero';
import TaskList from '@/components/TaskList/TaskList';
import TaskForm from '@/components/TaskForm/TaskForm';
import useTimer from '@/hooks/useTimer';
import { motion, AnimatePresence } from 'motion/react';
import { buttonPress } from '@/animations/variants';

const KofunApp = () => {
  const [state, dispatch] = useReducer(timerReducer, timerInitialState);
  const [taskModule, setTaskModule] = useState(false);

  // Chooses the active task
  const activeTask = state.tasks.find((task) => task.id === state.activeTaskId);

  //// Derived from startedAt + Date.now() so it stays accurate even if JS is throttled
  let displayTime;

  if (!activeTask) {
    displayTime = null;
  } else {
    if (state.isRunning) {
      displayTime =
        activeTask.remainingTime -
        Math.floor((Date.now() - state.startedAt) / 1000);
    } else {
      displayTime = activeTask.remainingTime;
    }
  }

  // Custom hook for controlling countdown and completion
  useTimer(state.isRunning, activeTask, dispatch, displayTime);

  // Adds task object to useReducer and selects it so it's highlighted
  const handleAddTask = (newTask) => {
    const id = Date.now();
    dispatch({ type: 'ADD_TASK', payload: { ...newTask, id } });
    dispatch({ type: 'SELECT_TASK', payload: id });
  };

  return (
    <div
      className={styles.container}
      onClick={() => dispatch({ type: 'DESELECT_TASK' })}
    >
      {activeTask?.isComplete && <p>HURRAY!!!</p>}
      <Hero
        state={state}
        dispatch={dispatch}
        displayTime={displayTime}
        activeTask={activeTask}
      />
      <TaskList state={state} dispatch={dispatch} displayTime={displayTime} />
      <motion.button
        {...buttonPress}
        className={styles.addTaskButton}
        onClick={(e) => {
          e.stopPropagation();
          setTaskModule((prev) => !prev);
        }}
      >
        <img src="/buttons-icons/kofun-button-addtask.svg" />
      </motion.button>
      <AnimatePresence>
        {taskModule && (
          <TaskForm
            tasks={state.tasks}
            dispatch={dispatch}
            onAddTask={handleAddTask}
            setTaskModule={setTaskModule}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default KofunApp;
