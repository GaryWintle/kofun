'use client';

import { useReducer } from 'react';
import timerReducer, { timerInitialState } from '../reducer/timerReducer';
import useTimer from '@/hooks/useTimer';

const KofunApp = () => {
  const [state, dispatch] = useReducer(timerReducer, timerInitialState);
  useTimer(
    state.isRunning,
    state.tasks.find((task) => task.id === state.activeTaskId),
    dispatch,
  );

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button
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
          dispatch({
            type: 'SELECT_TASK',
            payload: testId,
          });
        }}
      >
        Add Task
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'START_TIMER',
          })
        }
      >
        Start Timer
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'DELETE_TASK',
          })
        }
      >
        Delete Task
      </button>
    </div>
  );
};

export default KofunApp;
