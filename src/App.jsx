import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import React from 'react'
import reactLogo from './assets/react.svg'
import close from './assets/close.png'
import viteLogo from '/vite.svg'
import './App.css'



function App({ initialItem = "", initialList = [], initialCheck2 = [] }) {
  initialItem = window.localStorage.getItem("item") || "";

  if(initialList != undefined) initialList = JSON.parse(window.localStorage.getItem("itemsList")) || [];


  const [item, setItem] = React.useState(initialItem);
  const [itemsList, setItemsList] = useState(initialList);

  React.useEffect(() => {
    console.log("tes3")
    window.localStorage.setItem("item", item);
  }, [item]);

  React.useEffect(() => {
    window.localStorage.setItem("itemsList", JSON.stringify(itemsList));
  }, [itemsList]);


  function addTask(event) {
    setItemsList([...itemsList, {value : item[0].toUpperCase()+item.substring(1), completed : 0}]); // Ajoutez un nouvel élément à la liste
    setItem("")
  }

  function handleDelete(index2) {
    const updatedList = itemsList.filter((item, index) => index !== index2);
    setItemsList(updatedList);
  }

  function handleCheck2(index2) {
    const copy = [...itemsList]
    copy[index2].completed = (copy[index2].completed +1 ) %2 
    console.log(itemsList)
    setItemsList(copy);
  }

  return (
    <div>
        <h3>You have {itemsList.length} items.</h3>
        <div id="list">
        {itemsList.map((item, index)  => (
          
          // eslint-disable-next-line react/no-unknown-property          
          <div  key={index} ><input type="checkbox" onClick={() => handleCheck2(index)} id="maCheckbox" checked={item.completed} readOnly/><p style= {{display: 'inline-block'}} className="items" align="left" >{item.value}<img className="itemsimg"
          src={close}  // Remplacez ceci par le chemin de votre image
          alt="Supprimer"
          style={{ cursor: 'pointer' }}  // Changez le curseur pour indiquer qu'il est cliquable
          onClick={() => handleDelete(index)}
      /></p></div>

        ))}
      </div>

        <input placeholder="Enter Item" value={item} onChange={(e) => {
          setItem(event.target.value)
         }} />
        <button onClick={addTask} >Submit</button>

    </div>
  )
}



export default App
