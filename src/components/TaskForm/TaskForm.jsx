import { useState } from 'react';

const TaskForm = ({ tasks, dispatch, onAddTask, displayTime }) => {
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState(0);

  const decrement = (amount) => {
    setTaskTime((prev) => Math.max(0, prev - amount));
  };
  const increment = (amount) => {
    setTaskTime((prev) => prev + amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      text: taskText,
      duration: taskTime,
      remainingTime: taskTime,
      isComplete: false,
    };
    onAddTask(newTask);
    setTaskText('');
    setTaskTime(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h1>{taskText}</h1>
      <h1>{taskTime}</h1> */}
      <label htmlFor="taskText">Enter your Task</label>
      <input
        id="taskText"
        value={taskText}
        type="text"
        placeholder="Whatcha working on?"
        onChange={(e) => setTaskText(e.target.value)}
      ></input>
      <label htmlFor="taskTime">Task Time Limit</label>
      <button type="button" onClick={() => decrement(1)}>
        -
      </button>
      <input
        id="taskTime"
        value={taskTime}
        type="text"
        placeholder="25"
        onChange={(e) => setTaskTime(Number(e.target.value))}
      ></input>
      <button type="button" onClick={() => increment(1)}>
        +
      </button>
      <button type="submit">ADD TASK</button>
    </form>
  );
};

export default TaskForm;
