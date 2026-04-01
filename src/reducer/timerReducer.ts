interface TimerState {
  activeTaskId: number | null;
  isRunning: boolean;
  startedAt: number | null;
  tasks: Task[];
}

interface Task {
  id: number;
  text: string;
  duration: number;
  remainingTime: number;
  isComplete: boolean;
}

type TimerAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id'> }
  | { type: 'SELECT_TASK'; payload: number }
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'EDIT_TASK'; payload: { id: number; text: string } }
  | { type: 'EXTEND_TIME'; payload: { id: number; additionalTime: number } }
  | { type: 'TICK' }
  | { type: 'COMPLETE_TASK' };

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
      duration: 5,
      remainingTime: 5,
      isComplete: false,
    },
    {
      id: 3,
      text: 'Work in Figma',
      duration: 4500,
      remainingTime: 4500,
      isComplete: false,
    },
  ],
};

export default function timerReducer(
  state: TimerState,
  action: TimerAction,
): TimerState {
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
      if (!state.isRunning) return { ...state, activeTaskId: action.payload };
      const elapsedSeconds = state.startedAt
        ? Math.floor((Date.now() - state.startedAt) / 1000)
        : 0;
      return {
        ...state,
        activeTaskId: action.payload,
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
    case 'START_TIMER':
      return {
        ...state,
        isRunning: true,
        startedAt: Date.now(),
      };
    case 'PAUSE_TIMER': {
      const elapsedSeconds = state.startedAt
        ? Math.floor((Date.now() - state.startedAt) / 1000)
        : 0;

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
    case 'COMPLETE_TASK': {
      const elapsedSeconds = state.startedAt
        ? Math.floor((Date.now() - state.startedAt) / 1000)
        : 0;
      return {
        ...state,
        isRunning: false,
        startedAt: null,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? {
                ...task,
                isComplete: true,
                remainingTime: task.remainingTime - elapsedSeconds,
              }
            : task,
        ),
      };
    }
    default:
      return state;
  }
}

export { timerInitialState };
