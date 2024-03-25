import React, { useState } from "react";
import "../Scss/style.scss";

export default function ResultContainer({ Tasks, setTasks }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedTextarea, setEditedTextarea] = useState("");

  const toggleCompletion = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((taskIndex) => taskIndex !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...Tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  
    // Adjust completedTasks 
    const updatedCompletedTasks =  completedTasks.filter(
      (taskIndex) => taskIndex !== index).map((taskIndex) => taskIndex > index ? taskIndex - 1 : taskIndex);
    setCompletedTasks(updatedCompletedTasks);
  };

  const deleteSelectedTasks = () => {
    const updatedTasks = Tasks.filter((task, index) => !completedTasks.includes(index));
    setTasks(updatedTasks);
    setCompletedTasks([]);
  };

  const completeAllTasks = () => {
    if (completedTasks.length === Tasks.length) {
      setCompletedTasks([]);
    } else {
      setCompletedTasks(Tasks.map((task, index) => index));
      // alert("Please Select Task  to Complete All!");
    }
  };

  const activateEditing = (index) => {
    setEditingTask(index);
    setEditedName(Tasks[index].name);
    setEditedTextarea(Tasks[index].textarea);
  };

  const updateTask = (index) => {
    const updatedTasks = [...Tasks];
    updatedTasks[index].name = editedName;
    updatedTasks[index].textarea = editedTextarea;
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const activeTasks = Tasks.length - completedTasks.length;

  return (
    <div className="Result-Container flexibility">
      <div className="heading">
        <h1>Todo Lists</h1>
      </div>
      <div className="task-list">
        {Tasks.length === 0 ? (
          <div className="empty">
            <p className="empty">Your task list is empty.</p>
          </div>
        ) : (
          <>
            {Tasks.map((item, index) => (
              <div className="content-container flexibility" key={index}>
                <div className={`content flexibility ${completedTasks.includes(index) ? 'completed' : ''}`}>
                  <div className="check-head">
                    <input type="checkbox" checked={completedTasks.includes(index)} onChange={() => toggleCompletion(index)} />
                    {editingTask === index ? (
                      <>
                        <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                        <textarea value={editedTextarea} onChange={(e) => setEditedTextarea(e.target.value)}></textarea>
                      </>
                    ) : (
                      <>
                        <h2>{item.name}</h2>
                        <p>{item.textarea}</p>
                      </>
                    )}
                  </div>
                  <div className="actions">
                    <button className="update" onClick={() => editingTask === index ? updateTask(index) : activateEditing(index)}>
                      {editingTask === index ? "Save" : "Update"}
                    </button>
                    <button className="delete" onClick={() => deleteTask(index)}>X</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="footer">
        <button onClick={completeAllTasks}>Complete All</button>
        <div className="footer-nav">
          <p>Total Tasks : {Tasks.length}</p>
          <p>Active : {activeTasks}</p>
          <p>Completed : {completedTasks.length}</p>
        </div>
        <button onClick={deleteSelectedTasks}>Delete All</button>
      </div>
    </div>
  );
}
