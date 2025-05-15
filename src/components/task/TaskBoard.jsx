import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

export default function TaskBoard() {
   const defaultTasks = {
      id: crypto.randomUUID(),
      title: "Integration API",
      description:
         "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
      priority: "High",
      tags: ["Web", "Python", "API"],
      isFavorite: true,
   };

   const [tasks, setTasks] = useState([defaultTasks]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [taskToUpdate, setTaskToUpdate] = useState(null);

   function handleAddTask(newTask, isAdd) {
      console.log("Task added", newTask);

      if (isAdd) {
         setTasks([...tasks, newTask]);
      } else {
         setTasks(
            tasks.map((task) => {
               if (task.id === newTask.id) {
                  return newTask;
               }
               return task;
            })
         );
      }

      handleCloseClick();
   }
   function handletask(task) {
      console.log("Task Edited", task);
      setTaskToUpdate(task);
      setIsModalOpen(true);
   }

   function handleCloseClick() {
      setIsModalOpen(false);
      setTaskToUpdate(null);
   }
   function handleDeleteTask(taskId) {
      const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
      setTasks(tasksAfterDelete);
   }

   function handleDeleteAllClick() {
      tasks.length = 0;
      setTasks([...tasks]);
   }

   function handleFavorite(taskId) {
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      const newTasks = [...tasks];
      newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
      setTasks(newTasks);
   }

   function handleSearch(searchTerm) {
      console.log("Search term:", searchTerm);

      const filtered = tasks.filter((task) =>
         task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(typeof(tasks));
      setTasks([...filtered]);
      console.log(filtered);
      console.log(tasks);
      console.log(typeof(tasks));
   
   }

   return (
      <section className="mb-20" id="tasks">
         <div className="container">
            <div className="p-2 flex justify-end">
               <SearchTask onSearch={handleSearch} />
            </div>
            {isModalOpen && (
               <TaskModal
                  onSave={handleAddTask}
                  onCloseClick={handleCloseClick}
                  taskToUpdate={taskToUpdate}
               />
            )}
            <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
               <TaskActions
                  onAddClick={() => setIsModalOpen(true)}
                  onDeleteAllClick={handleDeleteAllClick}
               />
               <TaskList
                  tasks={tasks}
                  onEdit={handletask}
                  onFav={handleFavorite}
                  onDelete={handleDeleteTask}
               />
            </div>
         </div>
      </section>
   );
}
