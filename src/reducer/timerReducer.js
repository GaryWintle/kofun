const timerInitialState = {
  activeTaskId: null,
  isRunning: false,
  tasks: [],
};

export default function timerReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const taskId = Date.now();
      const newTask = {
        ...action.payload,
        id: taskId,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }
    case 'SELECT_TASK':
      return {
        ...state,
        activeTaskId: action.payload,
      };
    case 'START_TIMER':
      return {
        ...state,
        isRunning: true,
      };
    case 'PAUSE_TIMER':
      return {
        ...state,
        isRunning: false,
      };
    default:
      return state;
  }
}

export { timerInitialState };
