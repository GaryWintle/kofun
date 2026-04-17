'use client';

import { useReducer, useState } from 'react';
import timerReducer, { timerInitialState } from '@/reducer/timerReducer';
import styles from '@/components/KofunApp/KofunApp.module.css';
import Hero from '@/components/Hero/Hero';
import TaskList from '@/components/TaskList/TaskList';
import TaskForm from '@/components/TaskForm/TaskForm';
import useTimer from '@/hooks/useTimer';

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

  // Adds task object to useReducer
  const handleAddTask = (newTask) => {
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  return (
    <div className={styles.container}>
      {activeTask?.isComplete && <p>HURRAY!!!</p>}
      <Hero
        state={state}
        dispatch={dispatch}
        displayTime={displayTime}
        activeTask={activeTask}
      />
      <TaskList state={state} dispatch={dispatch} displayTime={displayTime} />
      {taskModule && (
        <TaskForm
          tasks={state.tasks}
          dispatch={dispatch}
          onAddTask={handleAddTask}
          setTaskModule={setTaskModule}
        />
      )}
      <button
        className={styles.addTaskButton}
        onClick={() => setTaskModule((prev) => !prev)}
      >
        {' '}
        <img src="/buttons-icons/kofun-button-addtask.svg" />
      </button>
    </div>
  );
};

export default KofunApp;
