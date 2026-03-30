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
  const displayTime = activeTask
    ? state.isRunning
      ? activeTask.remainingTime -
        Math.floor((Date.now() - state.startedAt) / 1000)
      : activeTask.remainingTime
    : null;

  // Custom hook for controlling countdown and completion
  useTimer(state.isRunning, activeTask, dispatch, displayTime);

  // Adds task object to useReducer
  const handleAddTask = (newTask) => {
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  return (
    <div>
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
    </div>
  );
};

export default KofunApp;
