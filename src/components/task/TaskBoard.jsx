import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

import { useState } from "react";
import TaskModal from "./TaskModal";

export default function TaskBoard({ onAddClick }) {
   const defaultTasks = {
      id: crypto.randomUUID(),
      title: "Integration API",
      description:
         "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
      priority: "High",
      tag: ["Web", "Python", "API"],
      isFavorite: true,
   };

   const [tasks, setTasks] = useState([defaultTasks]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   return (
      <section className="mb-20" id="tasks">
         <div className="container">
            <div className="p-2 flex justify-end">
               <SearchTask />
            </div>
            {isModalOpen && <TaskModal />}
            <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
               <TaskActions onAddClick={() => setIsModalOpen(true)} />
               <TaskList tasks={tasks} />
            </div>
         </div>
      </section>
   );
}
