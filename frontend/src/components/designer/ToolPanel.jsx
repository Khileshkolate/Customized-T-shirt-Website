import React from 'react';
import useDesignStore from '../../store/designStore';
import { Type, Upload, Square, Circle, Triangle, Slash } from 'lucide-react';
import toast from 'react-hot-toast';

const colors = [
    { name: 'White', hex: '#ffffff' },
    { name: 'Off White', hex: '#f8fafc' },
    { name: 'Black', hex: '#0f172a' },
    { name: 'Navy', hex: '#1e3a8a' },
    { name: 'Charcoal', hex: '#334155' },
    { name: 'Red', hex: '#dc2626' },
    { name: 'Green', hex: '#16a34a' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Blue', hex: '#2563eb' }
];

const ToolPanel = () => {
  const { 
      shirtType, setShirtType, 
      shirtColor, setShirtColor,
      printZone, setPrintZone,
      fabric, setFabric,
      size, setSize,
      addText, addShape, addImage
  } = useDesignStore();
  
  const fileInputRef = React.useRef(null);

  const handleUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
          toast.error('Please upload a valid image file');
          return;
      }

      const reader = new FileReader();
      reader.onload = (f) => {
          const data = f.target.result;
          addImage(data);
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Reset
  };

  return (
    <div className="w-full lg:w-[300px] h-auto lg:h-full lg:overflow-y-auto bg-white border-b lg:border-b-0 lg:border-r border-gray-200 text-gray-700 custom-scrollbar flex flex-col pt-4 shadow-xl z-20 shrink-0">
      
      {/* Hidden File Input for Image Upload */}
      <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleUpload} 
      />

      {/* T SHIRT TYPE */}
      <div className="px-6 mb-8 mt-2">
        <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">T Shirt Type</h3>
        <div className="flex gap-3">
          {['Round Neck', 'Polo', 'Hoodie'].map(type => (
              <button 
                key={type}
                onClick={() => setShirtType(type)}
                className={`flex-1 aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 transition-all shadow-sm ${shirtType === type ? 'border-indigo-500 text-indigo-700 bg-indigo-50 ring-1 ring-indigo-500' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 bg-white'}`}
              >
                  <div className="w-6 h-6 bg-current opacity-80 mask-shirt" style={{ maskImage: 'url(/icons/tshirt.svg)', WebkitMaskImage: 'url(/icons/tshirt.svg)' }} />
                  <span className="text-[10px] font-bold">{type}</span>
              </button>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div className="px-6 mb-8">
        <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">Color</h3>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((c) => (
             <div key={c.name} className="relative">
                <button
                  onClick={() => setShirtColor(c.name, c.hex)}
                  className={`w-7 h-7 rounded-full shadow-sm transition-transform border border-gray-300 ${shirtColor === c.name ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110' : 'hover:scale-110'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
                {shirtColor === c.name && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white" />
                )}
             </div>
          ))}
        </div>
      </div>

      {/* PRINT ZONE */}
      <div className="px-6 mb-8">
        <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">Print Zone</h3>
        <div className="flex bg-gray-100 rounded-lg border border-gray-200 p-1">
          {['Front', 'Back', 'Pocket'].map(zone => (
              <button 
                key={zone}
                onClick={() => setPrintZone(zone)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${printZone === zone ? 'bg-white border border-gray-200 text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 border border-transparent'}`}
              >
                  {zone}
              </button>
          ))}
        </div>
      </div>

      {/* DESIGN TOOLS */}
      <div className="px-6 mb-8">
        <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">Design Tools</h3>
        <div className="grid grid-cols-3 gap-2">
            {[
                { icon: Type, label: 'TEXT', action: () => addText() },
                { icon: Upload, label: 'UPLOAD', action: () => fileInputRef.current?.click() },
                { icon: Square, label: 'RECT', action: () => addShape('rect') },
                { icon: Circle, label: 'CIRCLE', action: () => addShape('circle') },
                { icon: Triangle, label: 'TRIANGLE', action: () => addShape('triangle') },
                { icon: Slash, label: 'LINE', action: () => {} },
            ].map(tool => (
                <button 
                    key={tool.label}
                    onClick={tool.action}
                    className="aspect-square bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:text-indigo-600 transition-colors text-gray-500 shadow-sm"
                >
                    <tool.icon size={18} strokeWidth={2} />
                    <span className="text-[9px] font-black uppercase">{tool.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* SIZE */}
      <div className="px-6 mb-8">
        <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">Size</h3>
        <div className="flex bg-gray-100 rounded-lg border border-gray-200 p-1">
          {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
              <button 
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${size === s ? 'bg-white border border-gray-200 text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 border border-transparent'}`}
              >
                  {s}
              </button>
          ))}
        </div>
      </div>

      {/* FABRIC */}
      <div className="px-6 mb-8 pb-4">
        <h3 className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">Fabric</h3>
        <div className="grid grid-cols-2 gap-2">
            {[
                { name: 'Cotton', price: '₹299' },
                { name: 'Polyester', price: '₹249' },
                { name: 'Polycotton', price: '₹279' },
                { name: 'Matt Finish', price: '₹319' }
            ].map(f => (
                <button 
                    key={f.name}
                    onClick={() => setFabric(f.name)}
                    className={`p-3 rounded-lg border text-left transition-all shadow-sm ${fabric === f.name ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
                >
                    <div className={`text-xs font-bold ${fabric === f.name ? 'text-indigo-700' : 'text-gray-700'}`}>{f.name}</div>
                    <div className="text-[10px] text-gray-500 font-medium">{f.price}</div>
                </button>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ToolPanel;
