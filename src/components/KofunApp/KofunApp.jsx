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

  const activeTask = state.tasks.find((task) => task.id === state.activeTaskId);

  useTimer(state.isRunning, activeTask, dispatch);

  const handleAddTask = (newTask) => {
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  return (
    <div>
      {activeTask?.isComplete && <p>HURRAY!!!</p>}
      <Hero state={state} dispatch={dispatch} />
      <TaskList state={state} dispatch={dispatch} />
      <TaskForm
        tasks={state.tasks}
        dispatch={dispatch}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default KofunApp;

// useEffect(() => {
//   if (!state.isRunning) return;

//   const id = setInterval(() => {
//     dispatch({ type: 'TICK' });
//   }, 1000);

//   return () => clearInterval(id);
// }, [state.isRunning, dispatch]);
