'use client';

import { useReducer } from 'react';
import timerReducer, { timerInitialState } from '@/reducer/timerReducer';
import styles from '@/components/KofunApp/KofunApp.module.css';
import TaskList from '@/components/TaskList/TaskList';
import TaskForm from '@/components/TaskForm/TaskForm';
import useTimer from '@/hooks/useTimer';

const KofunApp = () => {
  const [state, dispatch] = useReducer(timerReducer, timerInitialState);

  useTimer(
    state.isRunning,
    state.tasks.find((task) => task.id === state.activeTaskId),
    dispatch,
  );

  const handleAddTask = (newTask) => {
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const heroTask = state.tasks.find((task) => task.id === state.activeTaskId);

  return (
    <div>
      <header className={styles.container}>
        <div className={styles.heroText}>{heroTask?.text}</div>
        <div className={styles.heroTime}>{heroTask?.remainingTime}</div>
      </header>
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
