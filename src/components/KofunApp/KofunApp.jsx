'use client';

import { useState } from 'react';
import useTimerStore from '@/store/timerStore';
import styles from '@/components/KofunApp/KofunApp.module.css';
import Hero from '@/components/Hero/Hero';
import TaskList from '@/components/TaskList/TaskList';
import TaskForm from '@/components/TaskForm/TaskForm';
import useTimer from '@/hooks/useTimer';
import { motion, AnimatePresence } from 'motion/react';
import { buttonPress } from '@/animations/variants';

const KofunApp = () => {
  const [taskModule, setTaskModule] = useState(false);
  const activeTaskId = useTimerStore((state) => state.activeTaskId);
  const isRunning = useTimerStore((state) => state.isRunning);
  const startedAt = useTimerStore((state) => state.startedAt);
  const tasks = useTimerStore((state) => state.tasks);
  const addTask = useTimerStore((state) => state.addTask);
  const selectTask = useTimerStore((state) => state.selectTask);
  const deselectTask = useTimerStore((state) => state.deselectTask);
  const setTaskDialog = useTimerStore((state) => state.setTaskDialog);

  // Chooses the active task
  const activeTask = tasks.find((task) => task.id === activeTaskId);

  //// Derived from startedAt + Date.now() so it stays accurate even if JS is throttled
  let displayTime;

  if (!activeTask) {
    displayTime = null;
  } else {
    if (isRunning) {
      displayTime = Math.max(
        0,
        activeTask.remainingTime - Math.floor((Date.now() - startedAt) / 1000)
      );
    } else {
      displayTime = activeTask.remainingTime;
    }
  }

  // Custom hook for controlling countdown and completion
  useTimer(activeTask, displayTime);

  // Adds task object to useReducer and selects it so it's highlighted
  const handleAddTask = async (newTask) => {
    const id = Date.now();
    addTask({ ...newTask, id });
    selectTask(id);

    const response = await fetch('/api/haniwa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        haniwaDialog: newTask.text,
        duration: newTask.duration,
      }),
    });

    const data = await response.json();

    setTaskDialog(id, data.message);
  };

  return (
    <div className={styles.container} onClick={() => deselectTask()}>
      {activeTask?.isComplete && <p>HURRAY!!!</p>}
      <Hero displayTime={displayTime} activeTask={activeTask} />
      <TaskList displayTime={displayTime} />
      <motion.button
        {...buttonPress()}
        className={styles.addTaskButton}
        onClick={(e) => {
          e.stopPropagation();
          setTaskModule((prev) => !prev);
        }}
      >
        <img src="/buttons-icons/kofun-button-addtask.svg" />
      </motion.button>
      <AnimatePresence>
        {taskModule && (
          <TaskForm onAddTask={handleAddTask} setTaskModule={setTaskModule} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default KofunApp;
