import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TaskBoard from "./components/task/TaskBoard";

function App() {
   return (
      <div className="items-center flex flex-col">
         <Header />
         <Hero />
         <TaskBoard />
         <Footer />
      </div>
   );
}

export default App;
