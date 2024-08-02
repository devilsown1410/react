import './App.css';
import {useEffect, useState} from "react"

function App() {
  const [priority, setPriority] = useState("top");
  const [tasks, setTasks] = useState([]);
  const [deadline,setDeadline]=useState("")
  const [task,setTask]=useState("");
  const [completedTasks,setCompletedTasks]=useState([]);

  const handleTaskChange= (e)=>{
    setTask(e.target.value)
  }

  const handlePriorityChange=(e)=>{
    setPriority(e.target.value)
  }
  const handleDeadlineChange=(e)=>{
    setDeadline(e.target.value)
  }

  const addTask=()=>{
    if(task.trim()==="" || deadline===""){
      alert("Please enter a task and valid deadline")
      return;
    }
    const selectedDate=new Date(deadline)
    const currentDate=new Date()
    if(selectedDate<=currentDate){
      alert("Please enter a future date")
      return;
    }
    const newTask={
      id:tasks.length+1,
      task,
      priority,
      deadline,
      done:false,
    }
    setTasks([...tasks,newTask])
    setTask("")
    setPriority("")
    setDeadline("")
  }

  const markDone=(id)=>{
    const updatedTasks=tasks.map((t)=>
      t.id===id ? {...t,done:true} :t
    )
    setTasks(updatedTasks)

    const completedTask=tasks.find((t)=>t.id===id)
    if(completedTasks){
      setCompletedTasks([...completedTasks,completedTask])
    }
  }
  useEffect(() => {
    const priorityMap = {
      top: 1,
      middle: 2,
      low: 3,
    };

    const sortedTasks = tasks.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
    setTasks([...sortedTasks]); // Update state with sorted tasks
  }, [markDone,addTask]);
  const upcomingTasks=tasks.filter((t)=> !t.done);
  return (
    <div className="App">
      <header>
        <h1>Task Scheduler</h1>
      </header>
      <main>
        <div className='task-form'>
          <input
          type="text"
          id='task'
          placeholder="Enter task"
          value={task}
          onChange={handleTaskChange}
          />
          <select
            id='priority'
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="top">Top Priority</option>
            <option value="middle">Middle Priority</option>
            <option value="low">Less Priority</option>
          </select>
          <input
          type='date'
          id='deadline'
          value={deadline}
          onChange={handleDeadlineChange}/>
          <button onClick={addTask}>Add Task</button>
        </div>
        <h2 className='heading'>Upcoming Tasks</h2>
        <div className='task-list' id='task-list'>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingTasks.map((t)=>(
                <tr key={t.id}>
                  <td>{t.task}</td>
                  <td>{t.priority}</td>
                  <td>{t.deadline}</td>
                  <td>
                    {!t.done &&(
                      <button className='mark-done' onClick={()=>markDone(t.id)}>
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='completed-task-list'>
          <h2 className='finished'>Completed Tasks</h2>
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((t)=>(
                <tr key={t.id}>
                  <td>{t.task}</td>
                  <td>{t.priority}</td>
                  <td>{t.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
