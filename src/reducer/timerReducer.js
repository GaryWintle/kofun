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
    case 'RESET_TIMER':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? { ...task, remainingTime: task.duration }
            : task,
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task,
        ),
      };
    case 'EXTEND_TIME':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                remainingTime:
                  task.remainingTime + action.payload.additionalTime,
                duration: task.duration + action.payload.additionalTime,
              }
            : task,
        ),
      };
    case 'TICK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? {
                ...task,
                remainingTime:
                  task.remainingTime > 0
                    ? task.remainingTime - 1
                    : task.remainingTime,
              }
            : task,
        ),
      };
    case 'COMPLETE_TASK':
      return {
        ...state,
        isRunning: false,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId ? { ...task, isComplete: true } : task,
        ),
      };
    default:
      return state;
  }
}

export { timerInitialState };
