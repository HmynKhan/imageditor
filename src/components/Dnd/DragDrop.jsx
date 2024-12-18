import React, { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "BOX"; // Type identifier for the draggable item

// Box component to render draggable box
const Box = ({ id, text, index, moveBox }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { id, index }, // What data is being dragged
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBox(draggedItem.index, index);
        draggedItem.index = index; // Update the dragged item's index after swap
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={(node) => dragRef(dropRef(node))} // Attach both drag and drop refs
      style={{
        opacity,
        padding: "16px",
        margin: "8px",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        cursor: "move",
      }}
    >
      {text}
    </div>
  );
};

// Container component to hold and swap boxes
const Container = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, text: "Box 1" },
    { id: 2, text: "Box 2" },
    { id: 3, text: "Box 3" },
    { id: 4, text: "Box 4" },
  ]);

  const moveBox = useCallback(
    (dragIndex, hoverIndex) => {
      const updatedBoxes = [...boxes];
      const [draggedBox] = updatedBoxes.splice(dragIndex, 1); // Remove dragged box
      updatedBoxes.splice(hoverIndex, 0, draggedBox); // Insert it at the hover index
      setBoxes(updatedBoxes); // Update state with the new order
    },
    [boxes]
  );

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {boxes.map((box, index) => (
        <Box
          key={box.id}
          id={box.id}
          index={index}
          text={box.text}
          moveBox={moveBox}
        />
      ))}
    </div>
  );
};

// Main App component to wrap everything in DndProvider
const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  );
};

export default App;
