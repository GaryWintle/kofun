import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: number;
  text: string;
  dialog: string | null;
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
  setTaskDialog: (id: number, dialog: string) => void;
}

const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      activeTaskId: null,
      isRunning: false,
      startedAt: null,
      tasks: [
        // {
        //   id: 1,
        //   text: 'Write blog post',
        //   dialog: "Oh, you're making a blog? Cool!",
        //   duration: 500,
        //   remainingTime: 500,
        //   isComplete: false,
        // },
        // {
        //   id: 2,
        //   text: 'Review designs',
        //   dialog: "It's always good to keep a sharp eye on the visuals",
        //   duration: 15,
        //   remainingTime: 15,
        //   isComplete: false,
        // },
        // {
        //   id: 3,
        //   text: 'Work in Figma',
        //   dialog:
        //     "Ticky tacky, making web stuff is really rewarding. Let's get 'er done!",
        //   duration: 300,
        //   remainingTime: 300,
        //   isComplete: false,
        // },
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
            dialog: null,
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
          activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
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
      setTaskDialog: (id: number, dialog: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, dialog } : task
          ),
        })),
    }),
    {
      name: 'kofun-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        activeTaskId: state.activeTaskId,
      }),
    }
    // end
  )
);

export default useTimerStore;
