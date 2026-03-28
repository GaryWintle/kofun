const timerInitialState = {
  activeTaskId: null,
  isRunning: false,
  startedAt: null,
  tasks: [
    {
      id: 1,
      text: 'Write blog post',
      duration: 1500,
      remainingTime: 1500,
      isComplete: false,
    },
    {
      id: 2,
      text: 'Review designs',
      duration: 900,
      remainingTime: 900,
      isComplete: false,
    },
  ],
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
        startedAt: Date.now(),
      };
    case 'PAUSE_TIMER': {
      const elapsedSeconds = Math.floor((Date.now() - state.startedAt) / 1000);

      return {
        ...state,
        isRunning: false,
        startedAt: null,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? {
                ...task,
                remainingTime: task.remainingTime - elapsedSeconds,
              }
            : task,
        ),
      };
    }
    case 'RESET_TIMER':
      return {
        ...state,
        isRunning: false,
        startedAt: null,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? {
                ...task,
                remainingTime: task.duration,
              }
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
      };
    case 'COMPLETE_TASK':
      return {
        ...state,
        startedAt: null,
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
