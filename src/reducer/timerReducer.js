const timerInitialState = {
  activeTaskId: null,
  isRunning: false,
  tasks: [],
};

export default function timerReducer(state, action) {
  const taskId = Date.now();
  const newTask = {
    ...action.payload,
    id: taskId,
  };

  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    default:
      return state;
  }
}

export { timerInitialState };
