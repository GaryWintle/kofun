'use client';

import { useReducer } from 'react';
import timerReducer, { timerInitialState } from '../reducer/timerReducer';

const KofunApp = () => {
  const [state, dispatch] = useReducer(timerReducer, timerInitialState);

  return (
    <div>
      {state.isRunning ? <h1>I am running!</h1> : <h1>I got nothing to do!</h1>}
    </div>
  );
};

export default KofunApp;
