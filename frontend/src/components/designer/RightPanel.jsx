import React from 'react';
import useDesignStore from '../../store/designStore';
import { useCart } from '../../contexts/CartContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RightPanel = () => {
  const { canvas, activeObject, saveHistory, shirtType, shirtColor, fabric, size, qty, designStatus } = useDesignStore();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Dynamic Pricing Logic
  const getBasePrice = () => {
      switch(fabric) {
          case 'Polyester': return 249;
          case 'Polycotton': return 279;
          case 'Matt Finish': return 319;
          case 'Cotton':
          default: return 299;
      }
  };

  // Trigger re-render explicitly if needed, but Zustand activeObject mutations don't trigger this strictly on length.
  // We'll rely on designStatus or general component updates. 
  // A better way is to read the history state since it updates on every canvas mutation!
  const hasCustomDesign = canvas ? canvas.getObjects().some(o => o.id !== 'clipPath' && o.id !== 'guideBox') : false;
  
  const basePrice = getBasePrice();
  const designFee = hasCustomDesign ? 50 : 0;
  const unitPrice = basePrice + designFee;
  const totalPrice = unitPrice * qty;

  const handleAddToCart = () => {
      if (!canvas) {
          toast.error("Design tool not ready.");
          return;
      }

      // Deselect before capturing so we don't capture the blue bounding box
      canvas.discardActiveObject();
      canvas.renderAll();

      const designImage = canvas.toDataURL({ format: 'png', quality: 0.8 });
      const productId = searchParams.get('product') || 'custom-1';

      addToCart({
          productId: productId,
          productName: `Custom ${shirtType}`,
          price: unitPrice, 
          image: designImage,
          color: shirtColor,
          size: size,
          quantity: qty,
          designId: Date.now().toString()
      });

      toast.success('Custom design added to cart!');
      navigate('/cart');
  };

  return (
    <div className="w-full lg:w-[300px] h-auto lg:h-full lg:overflow-y-auto bg-white border-t lg:border-t-0 lg:border-l border-gray-200 text-gray-700 flex flex-col shadow-xl z-20 shrink-0">
      
      {/* SCROLLABLE UPPER SECTION */}
      <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          
          {/* CONTEXTUAL OBJECT EDITOR */}
          {activeObject && (
            <div className="block animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-[10px] font-bold tracking-widest text-indigo-600 mb-4 uppercase flex justify-between items-center bg-indigo-50 px-3 py-2 rounded-md">
                   Edit {activeObject.type === 'i-text' || activeObject.type === 'text' ? 'Text' : 'Shape'}
                   <button onClick={() => { canvas.discardActiveObject(); canvas.renderAll(); }} className="text-indigo-400 hover:text-indigo-700 text-xs">Done</button>
                </h3>
                
                <div className="space-y-6 bg-gray-50 rounded-xl border border-gray-200 p-5">
                    
                    {/* Color Palette */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Colors</label>
                        <div className="flex flex-wrap gap-2">
                            {['#000000', '#ffffff', '#94a3b8', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'].map(c => (
                                <button 
                                    key={c} 
                                    onClick={() => { 
                                        activeObject.set('fill', c); 
                                        canvas.renderAll(); 
                                        saveHistory(); 
                                    }}
                                    className="w-7 h-7 rounded-full border border-gray-300 hover:scale-110 transition-transform shadow-sm"
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Scale / Resize */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Scale & Resize</label>
                        <div className="flex gap-2">
                           <button onClick={() => { activeObject.scale(activeObject.scaleX * 0.9); canvas.renderAll(); saveHistory(); }} className="flex-1 py-1.5 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 rounded text-sm font-bold text-gray-600 transition-all">-</button>
                           <button onClick={() => { activeObject.scale(activeObject.scaleX * 1.1); canvas.renderAll(); saveHistory(); }} className="flex-1 py-1.5 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 rounded text-sm font-bold text-gray-600 transition-all">+</button>
                        </div>
                    </div>

                    {/* Text Specific Tools */}
                    {(activeObject.type === 'i-text' || activeObject.type === 'text') && (
                        <>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Font Family</label>
                                <select 
                                    onChange={(e) => { 
                                        activeObject.set('fontFamily', e.target.value); 
                                        canvas.renderAll(); 
                                        saveHistory(); 
                                    }}
                                    className="w-full text-xs font-semibold p-2 rounded-md border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-100 outline-none"
                                >
                                    <option value="sans-serif">Sans Serif</option>
                                    <option value="serif">Serif</option>
                                    <option value="monospace">Monospace</option>
                                    <option value="Impact">Impact</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Courier New">Courier New</option>
                                </select>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Alignment</label>
                                <div className="flex rounded-md overflow-hidden border border-gray-200 bg-white">
                                    {['left', 'center', 'right'].map(align => (
                                        <button 
                                            key={align}
                                            onClick={() => { 
                                                activeObject.set('textAlign', align); 
                                                canvas.renderAll(); 
                                                saveHistory(); 
                                            }}
                                            className="flex-1 py-2 text-[10px] font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 uppercase border-r border-gray-100 last:border-0 transition-colors"
                                        >
                                            {align}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
          )}

          {/* DESIGN STATUS */}
          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">Design Status</h3>
            <div className="space-y-3">
                {['Front', 'Back', 'Pocket'].map(zone => (
                    <div key={zone} className="flex justify-between text-xs items-center font-medium">
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className={`w-1.5 h-1.5 rounded-full ${designStatus[zone] !== 'empty' ? 'bg-indigo-500' : 'bg-gray-300'}`} />
                            <span>{zone}</span>
                        </div>
                        <span className="text-gray-400 uppercase text-[10px] tracking-wider">{designStatus[zone]}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* CONFIG */}
          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">Config Details</h3>
            <div className="space-y-3 text-xs">
                <div className="flex justify-between font-medium">
                    <span className="text-gray-500">Type</span>
                    <span className="text-gray-900">{shirtType}</span>
                </div>
                <div className="flex justify-between font-medium">
                    <span className="text-gray-500">Color</span>
                    <span className="text-gray-900">{shirtColor}</span>
                </div>
                <div className="flex justify-between font-medium">
                    <span className="text-gray-500">Fabric</span>
                    <span className="text-gray-900">{fabric}</span>
                </div>
                <div className="flex justify-between font-medium">
                    <span className="text-gray-500">Size</span>
                    <span className="text-gray-900">{size}</span>
                </div>
                <div className="flex justify-between font-medium">
                    <span className="text-gray-500">Qty</span>
                    <span className="text-gray-900">{qty}</span>
                </div>
            </div>
          </div>
          
      </div>

      {/* FIXED BOTTOM BILL SECTION */}
      <div className="p-6 bg-gray-50 border-t border-gray-200 mt-auto">
          <h3 className="text-[10px] font-bold tracking-widest text-gray-500 mb-4 uppercase">Bill</h3>
          
          <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs text-gray-600 font-medium">
                  <span>Base ({fabric})</span>
                  <span>₹{basePrice}</span>
              </div>
              
              {hasCustomDesign && (
                  <div className="flex justify-between text-[11px] text-indigo-600 font-bold bg-indigo-100/50 px-2 py-1.5 rounded">
                      <span>Design Fee</span>
                      <span>+₹50</span>
                  </div>
              )}
              
              <div className="flex justify-between text-xs text-gray-600 font-medium pt-1">
                  <span>Quantity</span>
                  <span>×{qty}</span>
              </div>
          </div>

          <button onClick={handleAddToCart} className="w-full py-4 rounded-xl text-sm font-bold text-white bg-indigo-600 focus:ring-4 focus:ring-indigo-100 shadow-xl hover:shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-[0.98] flex justify-between items-center px-6">
              <span>ADD TO CART</span>
              <span className="text-indigo-100">₹{totalPrice}</span>
          </button>
      </div>

    </div>
  );
};

export default RightPanel;
