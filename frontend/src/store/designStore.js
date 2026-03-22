import { create } from 'zustand';

const useDesignStore = create((set, get) => ({
    // Fabric.js canvas instance
    canvas: null,
    setCanvas: (canvas) => set({ canvas }),
    
    activeObject: null,
    setActiveObject: (obj) => set({ activeObject: obj }),
    
    // Config States
    shirtType: 'Round Neck',
    setShirtType: (type) => set({ shirtType: type }),
    
    shirtColor: 'White',
    shirtColorHex: '#ffffff',
    setShirtColor: (colorName, hex) => set({ shirtColor: colorName, shirtColorHex: hex }),
    
    printZone: 'Front',
    setPrintZone: (zone) => set({ printZone: zone }),
    
    fabric: 'Cotton',
    setFabric: (fabric) => set({ fabric }),
    
    size: 'M',
    setSize: (size) => set({ size }),
    
    qty: 1,
    setQty: (qty) => set({ qty }),

    // Design Status
    designStatus: {
        Front: 'empty',
        Back: 'empty',
        Pocket: 'empty'
    },
    updateDesignStatus: (zone, status) => set((state) => ({
        designStatus: { ...state.designStatus, [zone]: status }
    })),

    // Canvas Tools
    addText: (text = 'Double tap to edit') => {
        const { canvas } = get();
        if (!canvas) return;
        
        import('fabric').then(({ fabric }) => {
            const textObj = new fabric.IText(text, {
                left: 100,
                top: 100,
                fontFamily: 'sans-serif',
                fill: '#ffffff',
                fontSize: 24,
                cornerColor: '#38bdf8',
                cornerStrokeColor: '#38bdf8',
                borderColor: '#38bdf8',
                cornerSize: 10,
                transparentCorners: false,
            });
            canvas.add(textObj);
            canvas.setActiveObject(textObj);
            canvas.renderAll();
        });
    },
    
    addShape: (shapeType) => {
        const { canvas } = get();
        if (!canvas) return;
        
        import('fabric').then(({ fabric }) => {
            let obj;
            const commonOptions = {
                left: 150, top: 150, fill: '#64748b',
                cornerColor: '#38bdf8', borderColor: '#38bdf8', cornerSize: 10, transparentCorners: false
            };
            
            if (shapeType === 'rect') obj = new fabric.Rect({ ...commonOptions, width: 80, height: 80 });
            if (shapeType === 'circle') obj = new fabric.Circle({ ...commonOptions, radius: 40 });
            if (shapeType === 'triangle') obj = new fabric.Triangle({ ...commonOptions, width: 80, height: 80 });
            
            if (obj) {
                canvas.add(obj);
                canvas.setActiveObject(obj);
                canvas.renderAll();
            }
        });
    },

    addImage: (dataUrl) => {
        const { canvas } = get();
        if (!canvas) return;

        import('fabric').then(({ fabric }) => {
            fabric.Image.fromURL(dataUrl, (img) => {
                // Auto-scale large images to fit decently in the workspace setup
                if (img.width > 200) {
                    img.scaleToWidth(200);
                }
                img.set({
                    left: 150,
                    top: 150,
                    cornerColor: '#38bdf8', borderColor: '#38bdf8', cornerSize: 10, transparentCorners: false
                });
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
            });
        });
    },

    clearCanvas: () => {
        const { canvas } = get();
        if (canvas) {
            canvas.getObjects().forEach((obj) => {
                if(obj.id !== 'clipPath') canvas.remove(obj);
            });
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    },
    
    deleteSelected: () => {
        const { canvas, activeObject } = get();
        if (canvas && activeObject) {
            canvas.remove(activeObject);
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    },

    // History and Advanced Tools
    history: [],
    historyIndex: -1,
    isProcessingHistory: false,

    saveHistory: () => {
        const { canvas, isProcessingHistory, history, historyIndex } = get();
        if (!canvas || isProcessingHistory) return;
        
        const json = JSON.stringify(canvas.toJSON(['id']));
        const newHistory = history.slice(0, historyIndex + 1);
        if (newHistory.length > 0 && newHistory[newHistory.length - 1] === json) return; // Ignore unchanged state
        newHistory.push(json);
        set({ history: newHistory, historyIndex: newHistory.length - 1 });
    },
    
    undo: () => {
        const { canvas, history, historyIndex } = get();
        if (!canvas || historyIndex <= 0) return;
        
        set({ isProcessingHistory: true, historyIndex: historyIndex - 1 });
        canvas.loadFromJSON(history[historyIndex - 1], () => {
            canvas.renderAll();
            set({ isProcessingHistory: false });
        });
    },
    
    redo: () => {
        const { canvas, history, historyIndex } = get();
        if (!canvas || historyIndex >= history.length - 1) return;
        
        set({ isProcessingHistory: true, historyIndex: historyIndex + 1 });
        canvas.loadFromJSON(history[historyIndex + 1], () => {
            canvas.renderAll();
            set({ isProcessingHistory: false });
        });
    },
    
    cloneSelected: () => {
        const { canvas, activeObject } = get();
        if (canvas && activeObject) {
            activeObject.clone((cloned) => {
                canvas.discardActiveObject();
                cloned.set({
                    left: cloned.left + 20,
                    top: cloned.top + 20,
                    evented: true,
                });
                if (cloned.type === 'activeSelection') {
                    cloned.canvas = canvas;
                    cloned.forEachObject((obj) => canvas.add(obj));
                    cloned.setCoords();
                } else {
                    canvas.add(cloned);
                }
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
        }
    },
    
    exportDesign: () => {
        const { canvas } = get();
        if (canvas) {
            // Deselect active object to hide bounding boxes in export
            canvas.discardActiveObject();
            canvas.renderAll();
            
            const dataURL = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 });
            const link = document.createElement('a');
            link.download = 'printcraft-design.png';
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}));

export default useDesignStore;
