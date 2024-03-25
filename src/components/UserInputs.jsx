import React, { useState } from "react"; //imp useState from react library
import "../Scss/style.scss";
import ResultContainer from "./ResultContainer";

export default function UserInputs() {
  const [data, setData] = useState([]);

  function submitHandler(e) {
    e.preventDefault();
    let form = e.target;
    const formData = new FormData(form);
    const newData = Object.fromEntries(formData.entries());
    setData([...data, newData]);
    form.reset();

    //  console.log(data)
    //  console.log(form)
    //  console.log(formData)
    //  console.log(newData)
  }

  return (
    <>
      <div className="Inputs flexibility">
        <div className="heading">
          <h1>Enter Your Task</h1>
        </div>
        <form className="flexibility" onSubmit={submitHandler}>
          <input type="text" name="name" placeholder="Enter Task" required />
          <br />
          <br />
          <textarea
            name="textarea"
            placeholder="Enter Your Task Detail..."
            id="textarea"
            cols="30"
            rows="10"
            required
          ></textarea>
          <button  className="taskSubmission">
            Add Task
          </button>
        </form>
      </div>
      <ResultContainer Tasks={data} setTasks={setData} />
    </>
  );
}
