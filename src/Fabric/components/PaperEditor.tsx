import React, { useEffect, useRef, useState } from 'react';
import * as fabric  from 'fabric';

interface FabricCanvas extends fabric.Canvas {
  freeDrawingBrush: fabric.PencilBrush;
}

const PaperEditor: React.FC = () => {
  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<FabricCanvas | null>(null);
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState<fabric.Object[]>([]);
  const [redoStack, setRedoStack] = useState<fabric.Object[]>([]);

  const [isDrawingMode, setIsDrawingMode] = useState(true);

  useEffect(() => {
    if (!canvasEl.current) return;

    // Clean up existing canvas if it exists
    if (canvasRef.current) {
      canvasRef.current.dispose();
    }

    // Initialize new canvas
    const canvas = new fabric.Canvas(canvasEl.current) as FabricCanvas;
    canvas.setWidth(800);
    canvas.setHeight(600);
    canvas.backgroundColor = '#ddd';
    canvas.renderAll();

    // Setup drawing mode
    canvas.isDrawingMode = true;
    const pencilBrush = new fabric.PencilBrush(canvas);
    pencilBrush.color = 'rgba(0, 0, 255, 0.5)';
    pencilBrush.width = brushSize;
    canvas.freeDrawingBrush = pencilBrush;

    // Disable drawing when selecting objects
    canvas.on('mouse:down', () => {
      if (!canvas.isDrawingMode) {
        canvas.selection = true;
      }
    });

    // Track object additions for undo/redo
    canvas.on('object:added', (event) => {
      if (!canvas.isDrawingMode) return;
      setHistory((prevHistory) => [...prevHistory, event.target as fabric.Object]);
      setRedoStack([]);
    });

    // Setup selection styling
    canvas.on('object:selected', (event) => {
      const obj = event.target;
      if (obj) {
        obj.set({
          borderColor: 'white',
          cornerColor: 'white',
          cornerStyle: 'circle',
          borderDashArray: [5, 5],
        });
        canvas.renderAll();
      }
    });

    canvasRef.current = canvas;

    // Cleanup function
    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, []);

  // Update brush size without recreating canvas
  useEffect(() => {
    if (canvasRef.current?.freeDrawingBrush) {
      canvasRef.current.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize]);

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
  };

//   const handleToggleSelectionMode = () => {
//     if (canvasRef.current) {
//       canvasRef.current.isDrawingMode = !canvasRef.current.isDrawingMode;
//       canvasRef.current.selection = !canvasRef.current.isDrawingMode;
//     }
//   };

const handleToggleSelectionMode = () => {
    if (canvasRef.current) {
      const newMode = !isDrawingMode;
      canvasRef.current.isDrawingMode = newMode;
      canvasRef.current.selection = !newMode;
      setIsDrawingMode(newMode);
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects();
      if (objects.length > 0) {
        const lastObject = objects[objects.length - 1];
        setRedoStack((prevRedo) => [lastObject, ...prevRedo]);
        canvasRef.current.remove(lastObject);
        canvasRef.current.renderAll();
      }
    }
  };

  const handleRedo = () => {
    if (canvasRef.current && redoStack.length > 0) {
      const [lastRedo, ...restRedo] = redoStack;
      canvasRef.current.add(lastRedo);
      setRedoStack(restRedo);
      canvasRef.current.renderAll();
    }
  };

  const handleDeleteSelected = () => {
    if (canvasRef.current) {
      const activeObject = canvasRef.current.getActiveObject();
      if (activeObject) {
        canvasRef.current.remove(activeObject);
        canvasRef.current.discardActiveObject();
        canvasRef.current.renderAll();
      }
    }
  };

  const handleSaveMask = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL({ format: 'png', quality: 1 });

      const link = document.createElement('a');
      link.download = 'mask.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={handleUndo}
          style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px' }}
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}
        >
          Redo
        </button>
        <button
  onClick={handleToggleSelectionMode}
  style={{ backgroundColor: 'orange', color: 'white', padding: '10px', borderRadius: '5px' }}
>
  {isDrawingMode ? 'Enabled Draw' : 'Select Mode'}
</button>
        <button
          onClick={handleDeleteSelected}
          style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}
        >
          Delete Selected
        </button>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => handleBrushSizeChange(Number(e.target.value))}
        />
        <button
          onClick={handleSaveMask}
          style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '5px' }}
        >
          Save Mask
        </button>
      </div>
      <canvas ref={canvasEl} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default PaperEditor;
