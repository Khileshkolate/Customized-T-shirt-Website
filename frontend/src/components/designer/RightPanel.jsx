import React from 'react';
import useDesignStore from '../../store/designStore';

const RightPanel = () => {
  const { shirtType, shirtColor, fabric, size, qty, designStatus } = useDesignStore();

  return (
    <div className="w-[300px] h-full bg-white border-l border-gray-200 text-gray-700 overflow-y-auto flex flex-col p-6 shadow-xl z-20">
      
      {/* LIVE PRICING */}
      <div className="mb-10 block">
        <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">Live Pricing</h3>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
                <span>Base ({fabric})</span>
                <span>₹299</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-4 font-medium">
                <span>Size ×{qty}</span>
                <span>₹299</span>
            </div>
            <div className="h-px w-full bg-gray-200 mb-4" />
            <div className="flex justify-between text-xs text-gray-500 mb-6 font-medium">
                <span>Unit price</span>
                <span>₹299</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-900 items-center">
                <span>Total (×{qty})</span>
                <span className="text-indigo-600 text-xl font-extrabold">₹299</span>
            </div>
        </div>
      </div>

      {/* DESIGN STATUS */}
      <div className="mb-10">
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
      <div className="mb-auto">
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

      {/* ADD TO CART BUTTON */}
      <div className="pt-6">
         <button className="w-full py-4 rounded-xl text-sm font-bold text-white bg-indigo-600 focus:ring-4 focus:ring-indigo-100 shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all active:scale-[0.98]">
             ADD TO CART — ₹299
         </button>
      </div>

    </div>
  );
};

export default RightPanel;
