// import React from "react";
// import D3BarChart from "./components/DDD3/D3BarChart";
// const App = () => {
//   return <D3BarChart />;
// };

// export default App;

// import React from "react";
// import ReactEcharts from "echarts-for-react";
// function App() {
//   const option = {
//     xAxis: {
//       type: "category",
//       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     },
//     yAxis: {
//       type: "value",
//     },
//     series: [
//       {
//         data: [120, 200, 150, 80, 70, 110, 130],
//         type: "bar",
//       },
//     ],
//   };
//   return <ReactEcharts option={option} />;
// }
// export default App;

// import React, { useState, useCallback } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const ItemType = "BOX"; // Type identifier for the draggable item

// // Box component to render draggable box
// const Box = ({ id, text, index, moveBox }) => {
//   const [{ isDragging }, dragRef] = useDrag({
//     type: ItemType,
//     item: { id, index }, // What data is being dragged
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [, dropRef] = useDrop({
//     accept: ItemType,
//     hover: (draggedItem) => {
//       if (draggedItem.index !== index) {
//         moveBox(draggedItem.index, index);
//         draggedItem.index = index; // Update the dragged item's index after swap
//       }
//     },
//   });

//   const opacity = isDragging ? 0.4 : 1;

//   return (
//     <div
//       ref={(node) => dragRef(dropRef(node))} // Attach both drag and drop refs
//       style={{
//         opacity,
//         padding: "16px",
//         margin: "8px",
//         backgroundColor: "#f0f0f0",
//         border: "1px solid #ccc",
//         cursor: "move",
//       }}
//     >
//       {text}
//     </div>
//   );
// };

// // Container component to hold and swap boxes
// const Container = () => {
//   const [boxes, setBoxes] = useState([
//     { id: 1, text: "Box 1" },
//     { id: 2, text: "Box 2" },
//     { id: 3, text: "Box 3" },
//     { id: 4, text: "Box 4" },
//     { id: 5, text: "Box 5" },
//     { id: 6, text: "Box 6" },
//     { id: 7, text: "Box 7" },
//     { id: 8, text: "Box 8" },
//     { id: 9, text: "Box 9" },
//     { id: 10, text: "Box 10" },
//   ]);

//   const moveBox = useCallback(
//     (dragIndex, hoverIndex) => {
//       const updatedBoxes = [...boxes];

//       // Remove the dragged box
//       const [draggedBox] = updatedBoxes.splice(dragIndex, 1);

//       // Insert the dragged box at the hover index
//       updatedBoxes.splice(hoverIndex, 0, draggedBox);

//       // Shift other boxes' positions accordingly
//       if (dragIndex < hoverIndex) {
//         // If the dragged item is moved down, shift everything up
//         for (let i = hoverIndex - 1; i >= dragIndex; i--) {
//           updatedBoxes[i + 1] = updatedBoxes[i];
//         }
//       } else {
//         // If the dragged item is moved up, shift everything down
//         for (let i = hoverIndex + 1; i <= dragIndex; i++) {
//           updatedBoxes[i - 1] = updatedBoxes[i];
//         }
//       }

//       setBoxes(updatedBoxes); // Update state with the shifted boxes
//     },
//     [boxes]
//   );

//   return (
//     <div
//       style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
//     >
//       {boxes.map((box, index) => (
//         <Box
//           key={box.id}
//           id={box.id}
//           index={index}
//           text={box.text}
//           moveBox={moveBox}
//         />
//       ))}
//     </div>
//   );
// };

// // Main App component to wrap everything in DndProvider
// const App = () => {
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Container />
//     </DndProvider>
//   );
// };

// export default App;

// App.js
// import React, { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertToRaw } from 'draft-js';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './App.css'; // Custom CSS if needed

// const App = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const onEditorStateChange = (newState) => {
//     setEditorState(newState);
//   };

//   const handleSave = () => {
//     const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
//     console.log("Editor Content:", content);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h2>Description</h2>
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={onEditorStateChange}
//         wrapperClassName="demo-wrapper"
//         editorClassName="demo-editor"
//         placeholder="Write your description here..."
//       />
//       <button onClick={handleSave} style={{ marginTop: '20px', padding: '10px 20px' }}>
//         Save Description
//       </button>
//     </div>
//   );
// };

// export default App;

// import React from "react";
// // import StarRating from "./components/StarRating/StarRating";
// // import "./App.css";
// import PassGen from "./components/Passwordgen/PassGen";
// // import LoadmoreButton from "./components/loadmorebutton/LoadmoreButton";
// // import ImageSlider from "./components/ImageSlider/ImageSlider";

// const App = () => {
//   return (
//     // star rating component
//     // <StarRating noOfStars={10} />
//     // <ImageSlider
//     //   url={"https://picsum.photos/v2/list"}
//     //   limit={"20"}
//     //   page={"1"}
//     // />

//     // load more products components
//     // <LoadmoreButton />

//     <PassGen />
//   );
// };

// export default App;




// import React, { useState } from 'react'
// import { InputBox } from './components/CurrencyProject/components'
// import useCurrencyInfo from './components/CurrencyProject/hooks/currencyhooks/useCurrenyInfo'
// const App = () => {

//   const [amount,setAmount] = useState(0)
//   const [from,setFrom] = useState('usd')
//   const [to,setTo] = useState('pkr')
//   const [convertedAmount,setConvertedAmount] = useState(0);

//   const currencyInfo = useCurrencyInfo(from)

//   const options = Object.keys(currencyInfo)

//   const swap = ()=>{
//     setFrom(to)
//     setTo(from)
//     setConvertedAmount(amount)
//     setAmount(convertedAmount)
//   }



//   const convert = ()=>{
//     setConvertedAmount(amount*currencyInfo[to]) 
//   }
//   return (
//     <div
//         className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
//         style={{
//             backgroundImage: `url('https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600')`,
//         }}
//     >
//         <div className="w-full">
//             <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
//                 <form
//                     onSubmit={(e) => {
//                         e.preventDefault();
//                         convert()
                       
//                     }}
//                 >
//                     <div className="w-full mb-1">
//                         <InputBox
//                             label="From"
//                             amount={amount}
//                             currencyOption={options}
//                             onCurryChange={(currency)=>setAmount(currency)}
//                             selectCurrecny={from}
//                             onAmountChange={(amount)=>setAmount(amount)}

                            
//                         />
//                     </div>
//                     <div className="relative w-full h-0.5">
//                         <button
//                             type="button"
//                             className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
//                             onClick={swap}
//                         >
//                             swap
//                         </button>
//                     </div>
//                     <div className="w-full mt-1 mb-4">
//                         <InputBox
//                             label="To"
//                             amount={convertedAmount}
//                             currencyOption={options}
//                             onCurryChange={(currency)=>setTo(currency)}
//                             selectCurrecny={to}
//                             amountDisable
                            
//                         />
//                     </div>
//                     <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
//                         Convert {from.toUpperCase() } to {to.toUpperCase()}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     </div>
// );
// }

// export default App









// import React from 'react'
// import Header from './components/ReactRouter/Header/Header'
// import Home from './components/ReactRouter/Home/Home'
// import Footer from './components/ReactRouter/Footer/Footer'

// const App = () => {
//   return (
//     <>
//     {/* <Header /> */}
//     <Home/>
//     <Footer/>
      
//     </>
//   )
// }

// export default App



// import React, { useEffect, useState } from 'react'
// import { ThemeProvider } from './components/ThemeseWitcher/context/theme'
// import ThemeBtn from './components/ThemeseWitcher/ThemeBtn'
// import Card from './components/ThemeseWitcher/Card'
// // import UserContextProvider from './components/MiniContext/context/UserContextProvider'
// // import Login from './components/MiniContext/context/Login'
// // import Profile from './components/MiniContext/context/Profile'

// const App = () => {

//   const [themeMode,setThemeMode] = useState('light')

//   const lightTheme = ()=>{

//     setThemeMode('light')

//   } 

//   const darkTheme = ()=>{

//     setThemeMode('dark')
//   }


//   useEffect(()=>{
//     document.querySelector('html').classList.remove("light","dark")
//     document.querySelector('html').classList.add(themeMode)
//   },[themeMode])

//   return (
//     // <UserContextProvider>
//     //   <Login />
//     //   <Profile />
//     // </UserContextProvider>

//       // <h1 className='p-4 bg-pink-500 text-3xl'>Welcome Back</h1>

            

//       <ThemeProvider value={{themeMode,lightTheme,darkTheme}}>
      
// <div className="flex flex-wrap min-h-screen items-center">
//                 <div className="w-full">
//                     <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
//                         <ThemeBtn />
//                     </div>

//                     <div className="w-full max-w-sm mx-auto">
//                        <Card />
//                     </div>
//                 </div>
//             </div>


//             </ThemeProvider>

    
//   )
// }

// export default App



// import React from "react";
// import D3BarChart from "./components/DDD3/D3BarChart";
// const App = () => {
//   return <D3BarChart />;
// };

// export default App;


// import React, { useEffect, useState } from "react";
// import { TodoProvider } from "./components/TodoLocalContext/context";
// import TodoForm from "./components/TodoLocalContext/TodoForm";
// import TodoItem from "./components/TodoLocalContext/TodoItem";

// function App() {

//   const [todos,setTodos] = useState([]);

//   const addTodo = (todo) =>{

//     setTodos((prev)=>[{id:Date.now(), ...todo} , ...prev])

//   }

//   const updateTodo = (id,todo) =>{
//         setTodos((prev)=>prev.map((item)=>item.id===id? todo : item ))
//   }

//   const deleteToDo = (id) =>{
//     console.log(todos,"before delete todo");
//     setTodos((prev)=>prev.filter((todo)=>todo.id !== id))
//     console.log(todos,"after delete todo");
    
//   }

//   const toggleComplete = (id) =>{
//       setTodos((prev)=> prev.map((item)=>item.id === id ? {...item,completed: !item.completed} : item))
//   }

//   useEffect(()=>{
    
//     const todos = JSON.parse(localStorage.getItem('todos'))

//     if(todos && todos.length >0){
//       setTodos(todos)
//     }

//   },[])

//   useEffect(()=>{
//     localStorage.setItem('todos',JSON.stringify(todos))
//   },[todos])

//   return (
//     <TodoProvider value={{todos,addTodo,updateTodo,deleteToDo,toggleComplete}}>

//             <div className="bg-[#172842] min-h-screen py-8">
//                 <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
//                     <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
//                     <div className="mb-4">
//                         <TodoForm />
//                     </div>
//                     <div className="flex flex-wrap gap-y-3">
//                         {
//                           todos.map((item)=>(
//                             <div key={item.id}
//                             className="w-full">
//                             <TodoItem todo={item} />

//                           </div>))
//                         }
//                     </div>
//                 </div>
//             </div>

//             </TodoProvider>
//   );
// }

// export default App;


// import React from 'react';
// import CanvasEditor from './Fabric/components/CanvasEditor';
// // import ImageEditor from './ImageEditor';


// function App() {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Welcome to My React App</h1>
//       {/* <ImageEditor /> */}
//       <CanvasEditor />
//     </div>
//   );
// }

// export default App;

import React from "react";
import CanvasEditor from './Fabric/components/CanvasEditor.tsx';

function App() {
  return (
    <div className="App">
      <CanvasEditor />
    </div>
  );
}

export default App;
