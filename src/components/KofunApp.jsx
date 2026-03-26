'use client';

import { useReducer } from 'react';
import timerReducer, { timerInitialState } from '../reducer/timerReducer';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
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

  return (
    <div>
      <TaskList state={state} dispatch={dispatch} />
      <TaskForm
        tasks={state.tasks}
        dispatch={dispatch}
        onAddTask={handleAddTask}
      />

      {/* <button
        onClick={() => {
          const testId = Date.now();
          dispatch({
            type: 'ADD_TASK',
            payload: {
              id: testId,
              text: 'Learn React',
              duration: 1500,
              remainingTime: 1500,
              isComplete: false,
            },
          });
        }}
      >
        Add Task
      </button> */}
    </div>
  );
};

export default KofunApp;
