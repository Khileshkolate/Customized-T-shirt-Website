import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import useDesignStore from '../../store/designStore';
import useAdminStore from '../../store/adminStore'; // Integration

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const { setCanvas, setActiveObject, shirtType, shirtColor, printZone } = useDesignStore();
  const getMockup = useAdminStore(state => state.getMockup); // Admin Sync

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 480,
      height: 520,
      preserveObjectStacking: true,
    });

    const clipBox = new fabric.Rect({
      left: 0, top: 0, width: 480, height: 520,
      fill: 'transparent',
      hasBorders: false, hasControls: false, selectable: false, evented: false, id: 'clipPath'
    });
    canvas.add(clipBox);

    // Bounding Box Guide from HTML prototype coordinates
    const zones = {
        front: { x: 148, y: 130, w: 185, h: 260 },
        back:  { x: 148, y: 130, w: 185, h: 260 },
        pocket:{ x: 152, y: 155, w: 72, h: 72 },
    };
    const z = zones[printZone?.toLowerCase()] || zones.front;
    
    const guideBox = new fabric.Rect({
        left: z.x, top: z.y, width: z.w, height: z.h,
        fill: 'transparent', stroke: '#6366f1', strokeWidth: 1.5,
        strokeDashArray: [5, 5], hasControls: false, selectable: false, evented: false, rx: 8, ry: 8, id: 'guideBox'
    });
    canvas.add(guideBox);
    canvas.sendToBack(guideBox);

    canvas.on('selection:created', (e) => setActiveObject(e.selected[0]));
    canvas.on('selection:updated', (e) => setActiveObject(e.selected[0]));
    canvas.on('selection:cleared', () => setActiveObject(null));

    setCanvas(canvas);

    return () => {
      canvas.dispose();
      setCanvas(null);
    };
  }, [setCanvas, setActiveObject, printZone]);

  // Visual rep color
  const getSimulatedColor = () => {
      if (shirtColor === 'White' || shirtColor === 'Off White') return '#f1f5f9';
      if (shirtColor === 'Black' || shirtColor === 'Charcoal') return '#1e293b';
      if (shirtColor === 'White') return '#ffffff'; // safety
      return '#6366f1';
  };

  // Fetch admin layout if uploaded
  const getSimulatedImage = () => {
      const view = printZone?.toLowerCase() === 'pocket' ? 'front' : printZone?.toLowerCase() || 'front';
      return getMockup(shirtType, shirtColor, view);
  };
  
  const customImg = getSimulatedImage();

  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-center relative bg-gray-100 overflow-hidden z-0 shadow-inner">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{ 
            backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Canvas Area Container */}
      <div className="relative z-10 flex flex-col items-center">
          
          {/* Dashed Mockup Placeholder */}
          <div className="relative w-[480px] h-[520px] rounded-xl flex flex-col items-center justify-center overflow-hidden group">
              
              {!customImg && (
                  <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center justify-center text-center p-6 bg-white/60 backdrop-blur-sm border-2 border-dashed border-gray-300 shadow-xl rounded-xl">
                      <div className="w-20 h-20 bg-current mb-4 rounded opacity-80 flex items-center justify-center shadow-inner" style={{ color: getSimulatedColor(), backgroundColor: getSimulatedColor() }}>
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${shirtColor === 'White' || shirtColor === 'Off White' ? 'text-gray-400' : 'text-white'}`}>
                            <path d="M4 6L8 3L16 3L20 6L18 11L16 10L16 21H8L8 10L6 11L4 6Z" fill="currentColor"/>
                          </svg>
                      </div>
                      <p className="text-sm text-gray-500 font-bold leading-relaxed tracking-wide">
                          No mockup image for <br/> {shirtType} — {shirtColor} — {(printZone||'Front').toUpperCase()}
                      </p>
                      <a href="/admin" className="text-indigo-600 font-bold text-xs mt-3 hover:underline pointer-events-auto bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                          Go to Admin Panel to upload
                      </a>
                  </div>
              )}

              {customImg && (
                  <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
                      <img src={customImg} alt="Mockup" className="max-w-full max-h-full object-contain filter drop-shadow-2xl" />
                  </div>
              )}

              {/* The Actual Interactive Canvas */}
              <div className="absolute inset-0 z-30 transition-colors pointer-events-auto">
                 <canvas ref={canvasRef} />
              </div>

          </div>

          <div className="mt-8 text-[11px] font-black tracking-[0.25em] text-gray-400 uppercase bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
              {printZone} VIEW
          </div>

      </div>

    </div>
  );
};

export default CanvasEditor;
