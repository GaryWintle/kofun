'use client';

import { useReducer } from 'react';
import timerReducer, { timerInitialState } from '@/reducer/timerReducer';
import styles from '@/components/KofunApp/KofunApp.module.css';
import Hero from '@/components/Hero/Hero';
import TaskList from '@/components/TaskList/TaskList';
import TaskForm from '@/components/TaskForm/TaskForm';
import useTimer from '@/hooks/useTimer';

const KofunApp = () => {
  const [state, dispatch] = useReducer(timerReducer, timerInitialState);

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
    <>
      {activeTask?.isComplete && <p>HURRAY!!!</p>}
      <Hero
        state={state}
        dispatch={dispatch}
        displayTime={displayTime}
        activeTask={activeTask}
      />
      <TaskList state={state} dispatch={dispatch} displayTime={displayTime} />
      <TaskForm
        tasks={state.tasks}
        dispatch={dispatch}
        onAddTask={handleAddTask}
      />
    </>
  );
};

export default KofunApp;
