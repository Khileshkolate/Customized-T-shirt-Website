import React from 'react';
import CanvasEditor from '../components/designer/CanvasEditor';
import ToolPanel from '../components/designer/ToolPanel';
import RightPanel from '../components/designer/RightPanel';
import useDesignStore from '../store/designStore';
import { useAuth } from '../contexts/AuthContext';
import { Undo, Redo, Copy, Trash2, X, Download, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const Designer = () => {
  const { clearCanvas, deleteSelected, undo, redo, cloneSelected, exportDesign, historyIndex, history } = useDesignStore();
  const { user } = useAuth();

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col font-sans overflow-hidden text-gray-800 selection:bg-indigo-500 selection:text-white fixed inset-0 z-[100]">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 h-auto md:h-16 flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 md:py-0 shadow-sm z-30 shrink-0 gap-3 md:gap-0">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 w-full md:w-1/3 hover:opacity-80 transition-opacity group">
          <Palette className="w-7 h-7 text-primary-600 group-hover:text-primary-700 transition-colors" />
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Virag<span className="text-primary-600 group-hover:text-primary-700 transition-colors">Kala</span>
          </span>
        </Link>

        {/* Center Toggle */}
        <div className="flex justify-center w-full md:w-1/3">
            <div className="flex bg-gray-100 rounded-full border border-gray-200 p-1">
                {user && user.role === 'admin' && (
                    <Link to="/admin" className="px-6 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">Admin Panel</Link>
                )}
                <div className="px-6 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold bg-white text-primary-600 border border-gray-200 shadow-sm">Designer</div>
            </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center justify-start md:justify-end space-x-2 w-full md:w-1/3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
            <button 
                onClick={undo} 
                disabled={historyIndex <= 0}
                className={`flex items-center gap-1.5 px-3 py-1.5 shrink-0 rounded-md text-xs font-semibold transition-all ${historyIndex <= 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200'}`}
            >
                <Undo size={14} />
                <span>Undo</span>
            </button>
            <button 
                onClick={redo} 
                disabled={historyIndex >= history.length - 1}
                className={`flex items-center gap-1.5 px-3 py-1.5 shrink-0 rounded-md text-xs font-semibold transition-all ${historyIndex >= history.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200'}`}
            >
                <Redo size={14} />
                <span>Redo</span>
            </button>
            <button 
                onClick={cloneSelected} 
                className="flex items-center gap-1.5 px-3 py-1.5 shrink-0 rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200 transition-all"
            >
                <Copy size={14} />
                <span>Clone</span>
            </button>
            
            <div className="w-px h-4 bg-gray-300 shrink-0 mx-2" />
            
            <button onClick={deleteSelected} className="flex items-center gap-1.5 px-3 py-1.5 shrink-0 rounded-md text-xs font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all">
                <Trash2 size={14} />
                <span>Delete</span>
            </button>
            <button onClick={clearCanvas} className="flex items-center gap-1.5 px-3 py-1.5 shrink-0 rounded-md text-xs font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all">
                <X size={14} />
                <span>Clear</span>
            </button>

        </div>

      </header>

      {/* Main Workspace (3 columns) */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        
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
