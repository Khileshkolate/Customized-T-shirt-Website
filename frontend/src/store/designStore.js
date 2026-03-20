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
    }
}));

export default useDesignStore;
