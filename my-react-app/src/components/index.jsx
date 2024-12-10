import React, { useEffect, useState } from "react";
import '../css/index.css'
import { createTask,getTask,putTask } from "../hooks/storeExpress";

export default function KanbanBoard() {
  
  //titulos para los Cards
  const [title,setTitle] = useState(["Backlog", "To Do", "Ongoing", "Done"]);
  //lista inicial
  const [startTasks,setStartTask] = useState([{name:"Task uno",stage:1},{name:"Task dos",stage:2}]);
  //input onchange tomamos lo del input
  const [taskInput,setTask] = useState("");
  //lista para las nuevas task
  const [newTask,setNewTask] = useState([]);
  //array data
  const [arrayDataDB,setArrayDataDB] = useState([]);
  //ver data DB estado
  const [verDataDB,setVerDataDB] = useState(false)
  //id task selectted
  const [idTaskSelected,setIdTaskTselected] = useState({});
  //input onchange tomamos lo del input UPDATETASK
  const [taskInputUpdate,setTaskUpdate] = useState("");
  //Ver input update
  const [verInputUpdate,setVerInputUpdate]= useState(false)


  const onchangeTask = (e) => {
     setTask(e.target.value);
  }


  const eliminarTask = (task) => {
        var cardIndex = parseInt(task[0]);
        var taskIndex = parseInt(task[1]);
        var taskSelected = task[2]?.stage;
        const taskFiltered = startTasks.filter(start => start.stage!== taskSelected);
        setStartTask(taskFiltered);
        setNewTask([]);
  }

  const startTaskSiguiente = (task) => {
      if(parseInt(task[0]) <= 2){
        var cardIndex = parseInt(task[0])+1;
        var taskIndex = parseInt(task[1]);
        var taskSelected = task[2]?.stage;
        const taskFiltered = startTasks.filter(start => start.stage!== taskSelected);

        var newTaskStart = {
          name: task[2]?.name,
          stage: task[2]?.stage,
          nivel: cardIndex
        }
        const taskStartUpdate = [...taskFiltered,newTaskStart];
        setStartTask(taskStartUpdate);
        
      }
     
  }

  const startTaskVolver = (task) => {
    if(parseInt(task[0]) >=1 ){
      var cardIndex = parseInt(task[0])-1;
      var taskIndex = parseInt(task[1]);
      var taskSelected = task[2]?.stage;
      const taskFiltered = startTasks.filter(start => start.stage!== taskSelected);

      var newTaskStart = {
        name: task[2]?.name,
        stage: task[2]?.stage,
        nivel: cardIndex
      }
      const taskStartUpdate = [...taskFiltered,newTaskStart];
      setStartTask(taskStartUpdate);
    }
  }

  
  const onclickCreateNewTask = async () => {
    
    var lastItemStartTask = startTasks[startTasks.length -1];
    
      if(taskInput && lastItemStartTask?.stage <=2 || lastItemStartTask ===undefined ){
           setStartTask([]);  
           var lastItemStartTask = startTasks[startTasks.length -1];
           if(startTasks.length===0 && lastItemStartTask ===undefined){
            var newTaskItem = {
              name: taskInput,
              stage:lastItemStartTask?.stage?lastItemStartTask?.stage+1:1,
            }
            setNewTask([...newTask,newTaskItem]);
            setTask("");
            await createTask(newTaskItem);
            cargarDataDB();
           }else{
            
            var newTaskItem = {
              name: taskInput,
              stage:lastItemStartTask?.stage?lastItemStartTask?.stage+1:1,
              nivel:0
            }
            setStartTask([...startTasks,newTaskItem]);
            setTask("");
            await createTask(newTaskItem);
            cargarDataDB();
           }

        }else if(taskInput && lastItemStartTask?.stage >=3){
          
          
          var highestStage = Math.max(...startTasks.map(task => task.stage));

          var newTaskItem = {
              name: taskInput,
              stage: highestStage + 1, 
          };
          setNewTask([...newTask,newTaskItem]);
          setTask("");
          await createTask(newTaskItem);
          cargarDataDB();
        }else{
          alert("Ingrese un nombre para la tarea Y/O proyecto!");
      }
  }

  function llenarTaskStart(newTaskArray){
    if(startTasks.length===0){
        setStartTask(newTaskArray);
    }else if(startTasks.length >=1){
      const lastElement = newTaskArray[newTaskArray.length - 1];
      setStartTask([...startTasks,lastElement]);
    }
  }


  const cargarDataDB = async () => {
    const resTasks = await getTask();
    setArrayDataDB(resTasks.tasks);
  }

  const onclickVerDataDB = () => {
      cargarDataDB();
      setVerDataDB(state => !state);
      
  }

  const onclickSelectTaskUpdate = (taskSelect) =>{
        const taskToUpdate = taskSelect;
        setIdTaskTselected(taskToUpdate);
        setVerDataDB(state => !state);
        setVerInputUpdate(true);
  }


  const onchangeTaskUpdate = (e) => {
    setTaskUpdate(e.target.value);
 }

 const onclickUpdateTask = async () => {
  if (taskInputUpdate) {

    const taskToUpdate = {
      name: idTaskSelected.name,
      stage: parseInt(taskInputUpdate),
    };

    // Cambia el orden de los parámetros aquí.
    const res = await putTask(idTaskSelected.id, taskToUpdate);
    if(res.status ===400){
      alert(res.response.data.message);
    }else{
      setVerInputUpdate(false);
      setVerDataDB(true);
      cargarDataDB();
      setTaskUpdate(""); 
    }
  } else {
    alert("Ingrese nuevo nombre de tarea o proyecto");
  }
};


  useEffect(()=> {
    cargarDataDB();
    setNewTask([]);
  },[])


  useEffect(()=>{
    if(newTask.length >0){
      llenarTaskStart(newTask)
    }
  },[newTask])




  
  return (
    <>
        <div className="container">
                <div className="box-title">
                      <h1>Create Task Project</h1>
                </div>
                <div className="box-header">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div className="textInputWrapper">
                          <input placeholder="Create New Task" type="text" className="textInput" onChange={onchangeTask} value={taskInput} />
                        </div>
                      </td>
                      <td>
                        <button onClick={() => onclickCreateNewTask()}>Create Task</button>
                        <button onClick={()=> onclickVerDataDB()}>Ver DataDB</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
                  <div className="box-body">
                        {title.map((cardTitle, cardIndex) => (
                          <div className="card" key={cardIndex}>
                            <div className="card__title">{cardTitle}</div>
                            {/* Aquí filtramos las tareas solo para el card actual */}
                            {startTasks.filter((start) => 
                              {
                              if(cardIndex ===0){
                                    return !start.nivel;
                              }else{
                                return start.nivel === cardIndex;
                              }
                              
                              }) // Solo se muestran las tareas con el "nivel" correspondiente
                              .map((start, indexStart) => (
                                <div className="card__data" key={indexStart}>
                                  <div className="card__right">
                                    <div className="item">{start.name}</div>
                                  </div>
                                  <div className="card__left">
                                    <div className="item">{start.stage}</div>
                                  </div>
                                  <div className="card__left">
                                    <div className="item-volver" onClick={() => startTaskVolver([cardIndex, indexStart, start])}>{start.stage ? "<-" : ""}</div>
                                  </div>
                                  <div className="card__left">
                                    <div className="item-siguiente" onClick={() => startTaskSiguiente([cardIndex, indexStart, start])}>
                                      {start.stage ? "->" : ""}
                                    </div>
                                  </div>
                                  <div className="card__left">
                                    <div className="item-eliminar" onClick={() => eliminarTask([cardIndex, indexStart, start])}>
                                      {start.stage? "X" : ""}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          
                        ))}
                      </div>
                      {verDataDB ===true? (
                                              <div className="box-body-db">
                                              <div className="card">
                                                <div className="card__title">DATACARD DB</div>
                                                    {arrayDataDB && arrayDataDB.map((taskDB, indexDB) => (
                                                     <div className="card__data" key={indexDB}>
                                                          <div className="card__right">
                                                         <div className="item">{taskDB?.id}</div>
                                                       </div>
                                                       <div className="card__right">
                                                         <div className="item">{taskDB?.name}</div>
                                                       </div>
                                                       <div className="card__left">
                                                         <div className="item">{taskDB?.stage}</div>
                                                       </div>
                                                       <div className="card__left">
                                                         <div className="item-volver" onClick={() => onclickSelectTaskUpdate(taskDB)}>ACTUALIZAR</div>
                                                       </div>
                                                     </div>
                                                    ))}
                                              </div>
                                          </div>
                      ):
                      (<div>
                        {verInputUpdate ==true? 
                        (
                          <table>
                            <tbody>
                                <tr>
                                  <td>
                                    <div className="textInputWrapper">
                                      <input placeholder="Change Stage" type="number" className="textInput" onChange={onchangeTaskUpdate} value={taskInputUpdate} />
                                    </div>
                                  </td>
                                  <td>
                                    <button onClick={onclickUpdateTask}>Actualizar</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                        )
                        :(<div></div>)}
                      </div>)}
              </div>
            </>
    );
}