"use client";

import { useState, useRef } from "react";

const Page = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [error, seterror] = useState(false);

  const inputRef = useRef(null);

  const handleTask = (e) => {
    const task = e.target.value;
    setTask(task);
    seterror(false);
  };

  const handleDesc = (e) => {
    const desc = e.target.value;
    setDesc(desc);
    seterror(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (isUpdateMode) {
      if (task.trim() === "" && desc.trim() === "") {
        mainTask.splice(updateIndex, 1);
        setMainTask([...mainTask]);
      } else {
        setMainTask((prevMainTask) =>
          prevMainTask.map((value, index) =>
            updateIndex === index ? { task, desc } : value
          )
        );
      }

      setIsUpdateMode(false);
      setUpdateIndex(null);
    } else {
      if (task && desc) {
        setMainTask((prevMainTask) => [...prevMainTask, { task, desc }]);
      } else {
        seterror(true);
      }
    }
    if (task && desc) {
      setTask("");
      setDesc("");
    }
  };

  const startUpdate = (index) => {
    setTask(mainTask[index].task);
    setDesc(mainTask[index].desc);

    setIsUpdateMode(true);
    setUpdateIndex(index);
  };

  const deleteUser = (i) => {
    const updatedMainTask = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedMainTask);
  };

  let renderTask = <h1>Task is not available.</h1>;

  return (
    <>
      <div className="bg-zinc-800 text-white text-center text-3xl font-bold py-3">
        <h2>My Todo List</h2>
      </div>

      {error && (
        <p className="text-xl font-bold uppercase text-center text-red-600 mt-2">
          Please fill out the fields!
        </p>
      )}
      <form onSubmit={submitHandler}>
        <input
          className="border-2 border-zinc-700 focus:outline-none m-5 px-3 py-2 text-xl rounded"
          placeholder="Enter Task"
          onChange={handleTask}
          value={task}
          ref={inputRef}
        />
        <input
          className="border-2 border-zinc-700 focus:outline-none m-5 px-3 py-2 text-xl rounded"
          placeholder="Enter Description"
          onChange={handleDesc}
          value={desc}
          ref={inputRef}
        />

        <button className="bg-black text-white text-2xl font-semibold rounded px-4 py-2 m-5">
          {isUpdateMode ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="bg-slate-300 p-5 relative">
        {mainTask.length > 0 &&
          mainTask.map((value, index) => {
            return (
              <ul key={index}>
                <li>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-2xl font-semibold">{value.task}</h4>
                    <h5 className="text-xl font-semibold">{value.desc}</h5>
                    <div className="flex gap-4">
                      <button
                        className="bg-orange-400 text-white px-3 py-2 border-none rounded hover:bg-orange-500"
                        onClick={() => startUpdate(index)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-2 border-none rounded hover:bg-red-800"
                        onClick={() => deleteUser(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            );
          })}

        {mainTask.length < 1 ? <ul>{renderTask}</ul> : null}

        {mainTask.length > 0 && (
          <div
            className="absolute right-3 -top-12 text-red-600 text-xl p-4 rounded cursor-pointer"
            onClick={() => setMainTask([])}
          >
            Clear Todo's
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
