const TaskList = ({ state, dispatch }) => {
  return (
    <ul>
      {state.tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => {
            dispatch({ type: 'SELECT_TASK', payload: task.id });
          }}
        >
          <p className="filler">{task.text}</p>
          <p className="filler">{task.remainingTime}</p>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
