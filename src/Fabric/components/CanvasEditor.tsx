import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import './CanvasEditor.css';

const CanvasEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  useEffect(() => {
    const initCanvas = new fabric.Canvas("fabricCanvas", {
      selection: true,
      backgroundColor: "white",
    });

    setCanvas(initCanvas);

    // Save initial state
    saveHistory(initCanvas);

    initCanvas.on("object:added", () => {
      saveHistory(initCanvas);
    });

    initCanvas.on("selection:created", (e) => {
      setSelectedObject(e.target || null);
    });

    initCanvas.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    return () => {
      initCanvas.dispose();
    };
  }, []);

  const saveHistory = (canvasInstance: fabric.Canvas) => {
    setHistory((prev) => [...prev, JSON.stringify(canvasInstance)]);
    setRedoStack([]); // Clear redo stack on new action
  };

  const undo = () => {
    if (canvas && history.length > 1) {
      const currentState = history.pop();
      setRedoStack((prev) => [currentState!, ...prev]);

      const previousState = history[history.length - 1];
      canvas.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setHistory([...history]);
      });
    }
  };

  const redo = () => {
    if (canvas && redoStack.length > 0) {
      const nextState = redoStack.shift();
      setHistory((prev) => [...prev, nextState!]);

      canvas.loadFromJSON(nextState!, () => {
        canvas.renderAll();
        setRedoStack([...redoStack]);
      });
    }
  };

  const enableBrush = () => {
    if (canvas) {
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.color = "rgba(0, 0, 255, 0.5)";
      brush.width = brushSize;
      brush.strokeDashArray = [5, 5];
      canvas.freeDrawingBrush = brush;
    }
  };

  const disableBrush = () => {
    if (canvas) {
      canvas.isDrawingMode = false;
    }
  };

  const increaseBrushSize = () => {
    setBrushSize((size) => size + 5);
    if (canvas?.freeDrawingBrush) {
      canvas.freeDrawingBrush.width += 5;
    }
  };

  const decreaseBrushSize = () => {
    setBrushSize((size) => (size > 5 ? size - 5 : size));
    if (canvas?.freeDrawingBrush && canvas.freeDrawingBrush.width > 5) {
      canvas.freeDrawingBrush.width -= 5;
    }
  };

  const addRectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 100,
        height: 60,
        selectable: true,
      });
      canvas.add(rect);
    }
  };

  const addTriangle = () => {
    if (canvas) {
      const triangle = new fabric.Triangle({
        left: 150,
        top: 150,
        fill: "green",
        width: 100,
        height: 100,
        selectable: true,
      });
      canvas.add(triangle);
    }
  };

  const addSquare = () => {
    if (canvas) {
      const square = new fabric.Rect({
        left: 200,
        top: 200,
        fill: "blue",
        width: 100,
        height: 100,
        selectable: true,
      });
      canvas.add(square);
    }
  };

  const deleteSelectedObject = () => {
    if (canvas && selectedObject) {
      canvas.remove(selectedObject);
      setSelectedObject(null);
      saveHistory(canvas);
    }
  };

  const downloadCanvas = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "canvas-image.png";
      link.href = dataURL;
      link.click();
    }
  };

  const saveMask = () => {
    if (canvas) {
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = canvas.width!;
      maskCanvas.height = canvas.height!;

      const maskCtx = maskCanvas.getContext("2d");
      if (maskCtx) {
        maskCtx.fillStyle = "black";
        maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

        canvas.getObjects().forEach((obj) => {
          if (obj instanceof fabric.Path) {
            maskCtx.fillStyle = "white";
            obj._render(maskCtx);
          }
        });

        const maskURL = maskCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "mask.png";
        link.href = maskURL;
        link.click();
      }
    }
  };

  return (
    <div className="canvas-editor-container">
      <div className="toolbar">
        <button onClick={enableBrush}>Enable Brush</button>
        <button onClick={disableBrush}>Disable Brush</button>
        <button onClick={increaseBrushSize}>Increase Brush Size ({brushSize}px)</button>
        <button onClick={decreaseBrushSize}>Decrease Brush Size ({brushSize}px)</button>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addTriangle}>Add Triangle</button>
        <button onClick={addSquare}>Add Square</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={saveMask}>Save Mask</button>
        <button onClick={downloadCanvas}>Download Canvas</button>
        {selectedObject && (
          <button onClick={deleteSelectedObject}>Delete Selected</button>
        )}
      </div>
      <div className="canvas-container">
        <canvas id="fabricCanvas" ref={canvasRef} width={800} height={600}></canvas>
      </div>
    </div>
  );
};

export default CanvasEditor;
