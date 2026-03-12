'use client';

import { useReducer } from 'react';
import timerReducer, { timerInitialState } from '../reducer/timerReducer';

const KofunApp = () => {
  const [state, dispatch] = useReducer(timerReducer, timerInitialState);

  return (
    <div>
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
        Test Button
      </button>
    </div>
  );
};

export default KofunApp;
