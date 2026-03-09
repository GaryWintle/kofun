const timerInitialState = {
  activeTaskId: null,
  isRunning: false,
  tasks: [],
};

export default function timerReducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export { timerInitialState };
