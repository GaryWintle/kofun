'use client';

import { useReducer } from 'react';
import timerReducer, { timerInitialState } from '../reducer/timerReducer';

const KofunApp = () => {
  const [state, dispatch] = useReducer(timerReducer, timerInitialState);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button
        onClick={() =>
          dispatch({
            type: 'ADD_TASK',
            payload: {
              text: 'Learn React',
              duration: 1500,
              remainingTime: 1500,
              isComplete: false,
            },
          })
        }
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
