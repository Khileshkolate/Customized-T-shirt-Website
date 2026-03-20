import React from 'react';
import CanvasEditor from '../components/designer/CanvasEditor';
import ToolPanel from '../components/designer/ToolPanel';
import RightPanel from '../components/designer/RightPanel';
import useDesignStore from '../store/designStore';
import { Undo, Redo, Copy, Trash2, X, Download, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const Designer = () => {
  const { clearCanvas, deleteSelected } = useDesignStore();

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col font-sans overflow-hidden text-gray-800 selection:bg-indigo-500 selection:text-white fixed inset-0 z-[100]">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm z-30 shrink-0">
        
        {/* Logo Area */}
        <div className="flex items-center space-x-2 w-1/3">
          <Palette className="w-7 h-7 text-indigo-600" />
          <span className="text-2xl font-extrabold text-[#1e1b4b] tracking-tight">PrintCraft</span>
        </div>

        {/* Center Toggle */}
        <div className="flex justify-center w-1/3">
            <div className="flex bg-gray-100 rounded-full border border-gray-200 p-1">
                <Link to="/admin" className="px-6 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">Admin Panel</Link>
                <div className="px-6 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold bg-white text-indigo-600 border border-gray-200 shadow-sm">Designer</div>
            </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center justify-end space-x-2 w-1/3">
            {[
                { icon: Undo, label: 'Undo' },
                { icon: Redo, label: 'Redo' },
                { icon: Copy, label: 'Clone' },
            ].map(tool => (
                <button key={tool.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200 transition-all">
                    <tool.icon size={14} />
                    <span>{tool.label}</span>
                </button>
            ))}
            
            <div className="w-px h-4 bg-gray-300 mx-2" />
            
            <button onClick={deleteSelected} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all">
                <Trash2 size={14} />
                <span>Delete</span>
            </button>
            <button onClick={clearCanvas} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all">
                <X size={14} />
                <span>Clear</span>
            </button>

            <div className="w-px h-4 bg-gray-300 mx-2" />

            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-[4px] text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                <Download size={14} />
                <span>Export</span>
            </button>
        </div>

      </header>

      {/* Main Workspace (3 columns) */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Panel */}
        <ToolPanel />

        {/* Center Canvas */}
        <CanvasEditor />

        {/* Right Panel */}
        <RightPanel />

      </main>
    </div>
  );
};

export default Designer;
