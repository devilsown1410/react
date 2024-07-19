import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let count =15;
  const[counter,setCounter]=useState(count)
  
  const addValue=()=>{
    if(counter>=20){
      alert("Counter value is greater than 20")
      return
    }else{
      setCounter(counter+1)
    }
    
  }
  const removeValue=()=>{
    if(counter<=0){
      alert("Counter value is less than 0")
      return
    }else{
    setCounter(counter-1)
    }
  }
  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter value :{counter}</h2>
      <button onClick={addValue}>Add Value {counter}</button>
      <br/>
      <button onClick={removeValue}>remove Value {counter}</button>
      <p>footer: {counter}</p>
    </>
  )
}

export default App
