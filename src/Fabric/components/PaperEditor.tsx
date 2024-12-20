import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

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
  const [selectionCount, setSelectionCount] = useState(0);
  
  console.log(history)
  
  useEffect(() => {
    if (!canvasEl.current) return;

    if (canvasRef.current) {
      canvasRef.current.dispose();
    }

    const canvas = new fabric.Canvas(canvasEl.current) as FabricCanvas;
    canvas.setWidth(1707);
    canvas.setHeight(650);
    canvas.backgroundColor = 'gray';
    canvas.renderAll();

    canvas.isDrawingMode = true;
    const pencilBrush = new fabric.PencilBrush(canvas);
    pencilBrush.color = 'rgba(0, 0, 255, 0.5)';
    pencilBrush.width = brushSize;
    canvas.freeDrawingBrush = pencilBrush;

    canvas.on('path:created', (event) => {
      const path = event.path;
      if (path) {
        mergePath(canvas, path);
        addBorderEffect(canvas);
        canvas.renderAll();
        setHistory((prevHistory) => [...prevHistory, path]);
        setRedoStack([]);
        updateSelectionCount(canvas);
      }
    });

    canvas.on('object:modified', () => updateSelectionCount(canvas));

    canvasRef.current = canvas;

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current?.freeDrawingBrush) {
      canvasRef.current.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize]);

  const mergePath = (canvas: fabric.Canvas, path: fabric.Path) => {
    const existingPath = canvas.getObjects().find((obj) => obj.type === 'path') as fabric.Path;

    if (existingPath) {
      const combinedPathData = existingPath.path?.concat(path.path || []);
      if (combinedPathData) {
        const newPath = new fabric.Path(combinedPathData);
        newPath.set({
          fill: existingPath.fill,
          stroke: existingPath.stroke,
          left: Math.min(existingPath.left || 0, path.left || 0),
          top: Math.min(existingPath.top || 0, path.top || 0),
        });

        canvas.remove(existingPath);
        canvas.remove(path);
        canvas.add(newPath);
      }
    } else {
      canvas.add(path);
    }
  };

  const addBorderEffect = (canvas: fabric.Canvas) => {
    canvas.getObjects().forEach((obj) => {
      if (obj.type === 'path') {
        obj.set({
          stroke: 'white',
          strokeDashArray: [5, 5],
          strokeWidth: 2,
        });
      }
    });
    canvas.renderAll();
  };

  const handleBrushSizeChange = (size: number) => setBrushSize(size);

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
        updateSelectionCount(canvasRef.current);
      }
    }
  };

  const handleRedo = () => {
    if (canvasRef.current && redoStack.length > 0) {
      const [lastRedo, ...restRedo] = redoStack;
      canvasRef.current.add(lastRedo);
      setRedoStack(restRedo);
      canvasRef.current.renderAll();
      updateSelectionCount(canvasRef.current);
    }
  };

  const handleDeleteSelected = () => {
    if (canvasRef.current) {
      const activeObject = canvasRef.current.getActiveObject();
      if (activeObject) {
        canvasRef.current.remove(activeObject);
        canvasRef.current.discardActiveObject();
        canvasRef.current.renderAll();
        updateSelectionCount(canvasRef.current);
      }
    }
  };

  const handleSaveMask = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = canvas.getWidth();
      maskCanvas.height = canvas.getHeight();
      const maskCtx = maskCanvas.getContext('2d');

      if (maskCtx) {
        canvas.renderAll();
        const dataURL = canvas.toDataURL({ format: 'png', multiplier: 1 });
        const image = new Image();
        image.src = dataURL;
        image.onload = () => {
          maskCtx.fillStyle = 'black';
          maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
          maskCtx.globalCompositeOperation = 'source-atop';
          maskCtx.drawImage(image, 0, 0);
          const maskDataURL = maskCanvas.toDataURL('image/png');

          const link = document.createElement('a');
          link.download = 'mask.png';
          link.href = maskDataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      }
    }
  };

  const updateSelectionCount = (canvas: fabric.Canvas) => {
    setSelectionCount(canvas.getObjects().length);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={handleUndo} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px' }}>
          Undo
        </button>
        <button onClick={handleRedo} style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>
          Redo
        </button>
        <button onClick={handleToggleSelectionMode} style={{ backgroundColor: 'orange', color: 'white', padding: '10px', borderRadius: '5px' }}>
          {isDrawingMode ? 'Draw Mode' : 'Select Mode'}
        </button>
        <button onClick={handleDeleteSelected} style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>
          Delete Selected
        </button>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => handleBrushSizeChange(Number(e.target.value))}
        />
        <button onClick={handleSaveMask} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '5px' }}>
          Save Mask
        </button>
      </div>
      <div>Selections: {selectionCount}</div>
      <canvas ref={canvasEl} style={{ border: '1px solid gray' }} />
    </div>
  );
};

export default PaperEditor;
