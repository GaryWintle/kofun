import { create } from 'zustand';

interface Task {
  id: number;
  text: string;
  duration: number;
  remainingTime: number;
  isComplete: boolean;
}

interface TimerState {
  activeTaskId: number | null;
  isRunning: boolean;
  startedAt: number | null;
  tasks: Task[];
}

interface TimerStore extends TimerState {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  selectTask: (id: number) => void;
  deselectTask: () => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, text: string) => void;
  extendTime: (id: number, additionalTime: number) => void;
  completeTask: () => void;
}

const useTimerStore = create<TimerStore>()((set) => ({
  activeTaskId: null,
  isRunning: false,
  startedAt: null,
  tasks: [
    {
      id: 1,
      text: 'Write blog post',
      duration: 500,
      remainingTime: 500,
      isComplete: false,
    },
    {
      id: 2,
      text: 'Review designs',
      duration: 15,
      remainingTime: 15,
      isComplete: false,
    },
    {
      id: 3,
      text: 'Work in Figma',
      duration: 300,
      remainingTime: 300,
      isComplete: false,
    },
  ],

  // START TIMER
  startTimer: () =>
    set({
      isRunning: true,
      startedAt: Date.now(),
    }),

  // PAUSE TIMER
  pauseTimer: () =>
    set((state) => {
      const elapsedSeconds = state.startedAt
        ? Math.floor((Date.now() - state.startedAt) / 1000)
        : 0;
      return {
        isRunning: false,
        startedAt: null,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? {
                ...task,
                remainingTime: task.remainingTime - elapsedSeconds,
              }
            : task
        ),
      };
    }),

  //RESET TIMER
  resetTimer: () =>
    set((state) => {
      return {
        isRunning: false,
        startedAt: null,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? {
                ...task,
                remainingTime: task.duration,
              }
            : task
        ),
      };
    }),

  // ADD TASK
  addTask: (task: Omit<Task, 'id'>) =>
    set((state) => {
      const newTask = {
        ...task,
        id: Date.now(),
      };
      return { tasks: [...state.tasks, newTask] };
    }),

  //SELECT TASK
  selectTask: (id: number) =>
    set((state) => {
      if (!state.isRunning) return { ...state, activeTaskId: id };
      const elapsedSeconds = state.startedAt
        ? Math.floor((Date.now() - state.startedAt) / 1000)
        : 0;
      return {
        activeTaskId: id,
        isRunning: false,
        startedAt: null,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? {
                ...task,
                remainingTime: task.remainingTime - elapsedSeconds,
              }
            : task
        ),
      };
    }),
  // DESELECT TASK
  deselectTask: () => set({ activeTaskId: null }),

  //DELETE TASK
  deleteTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  //EDIT TASK
  editTask: (id: number, text: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, text } : task
      ),
    })),

  //EXTEND TIME
  extendTime: (id: number, additionalTime: number) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              remainingTime: task.remainingTime + additionalTime,
              duration: task.duration + additionalTime,
            }
          : task
      ),
    })),

  // COMPLETE TASK
  completeTask: () =>
    set((state) => {
      const elapsedSeconds = state.startedAt
        ? Math.floor((Date.now() - state.startedAt) / 1000)
        : 0;
      return {
        isRunning: false,
        startedAt: null,
        tasks: state.tasks.map((task) =>
          task.id === state.activeTaskId
            ? {
                ...task,
                isComplete: true,
                remainingTime: task.remainingTime - elapsedSeconds,
              }
            : task
        ),
      };
    }),
  // end
}));

export default useTimerStore;
