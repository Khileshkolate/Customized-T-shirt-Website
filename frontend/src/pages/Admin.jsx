import React, { useState, useRef, useEffect } from 'react';
import useAdminStore from '../store/adminStore';
import { 
  Camera, RefreshCw, Trash2, ArrowRight, LayoutDashboard, 
  Search, Upload, Plus, X, ChevronDown, ChevronUp, Palette, Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

const VIEWS = ['front', 'back'];

const Admin = () => {
    const { 
        mockups, uploadMockup, removeMockup, fetchMockups, 
        shirtTypes, colors, fetchAttributes, addAttribute, deleteAttribute,
        loading 
    } = useAdminStore();
    
    const fileInputRef = useRef(null);
    const [pendingKey, setPendingKey] = useState(null);
    
    // Tab/Collapse state
    const [showAttrManager, setShowAttrManager] = useState(false);
    
    // Forms state
    const [newType, setNewType] = useState({ name: '', icon: '👕' });
    const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });

    useEffect(() => {
        fetchAttributes();
        fetchMockups();
    }, [fetchAttributes, fetchMockups]);
    
    // Filters
    const [filterType, setFilterType] = useState('all');
    const [filterColor, setFilterColor] = useState('all');

    // Stats calculation
    const totalSlots = shirtTypes.length * colors.length * VIEWS.length;
    const uploadedCount = Object.keys(mockups).length;
    const pendingCount = totalSlots - uploadedCount;
    const coverage = totalSlots === 0 ? 0 : Math.round((uploadedCount / totalSlots) * 100);

    const handleUploadClick = (key) => {
        setPendingKey(key);
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !pendingKey) return;
        
        await uploadMockup(pendingKey, file);
        setPendingKey(null);
        e.target.value = '';
    };

    const handleAddType = async (e) => {
        e.preventDefault();
        if (!newType.name) return;
        await addAttribute({
            name: newType.name,
            value: newType.name, // Using name as value for simplicity
            type: 'shirt-type',
            meta: { icon: newType.icon }
        });
        setNewType({ name: '', icon: '👕' });
    };

    const handleAddColor = async (e) => {
        e.preventDefault();
        if (!newColor.name) return;
        await addAttribute({
            name: newColor.name,
            value: newColor.name,
            type: 'color',
            meta: { hex: newColor.hex }
        });
        setNewColor({ name: '', hex: '#000000' });
    };

    const displayTypes = filterType === 'all' ? shirtTypes : shirtTypes.filter(t => t.value === filterType);
    const displayColors = filterColor === 'all' ? colors : colors.filter(c => c.value === filterColor);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
            <main className="max-w-7xl mx-auto px-8 mt-10">
                
                {/* Header Info */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mockup Image Manager</h1>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl">
                            Upload high-quality, transparent T-shirt base images. Add new colors or shirt types below to expand your collection.
                        </p>
                    </div>
                    <button 
                        onClick={() => setShowAttrManager(!showAttrManager)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-all font-semibold text-sm"
                    >
                        {showAttrManager ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        Manage Types & Colors
                    </button>
                </div>

                {/* Attribute Management Section */}
                {showAttrManager && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
                        {/* Shirt Types */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Tag className="text-indigo-600" size={20} />
                                Shirt Types
                            </h2>
                            <form onSubmit={handleAddType} className="flex gap-2 mb-6">
                                <input 
                                    type="text" 
                                    placeholder="Type Name (e.g. V-Neck)"
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={newType.name}
                                    onChange={(e) => setNewType({...newType, name: e.target.value})}
                                />
                                <input 
                                    type="text" 
                                    placeholder="Icon"
                                    className="w-12 bg-gray-50 border border-gray-200 rounded-lg p-2 text-center text-sm outline-none"
                                    value={newType.icon}
                                    onChange={(e) => setNewType({...newType, icon: e.target.value})}
                                />
                                <button type="submit" className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </form>
                            <div className="flex flex-wrap gap-2">
                                {shirtTypes.map(type => (
                                    <div key={type._id} className="group flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium">
                                        <span>{type.meta?.icon}</span>
                                        <span>{type.name}</span>
                                        <button 
                                            onClick={() => deleteAttribute(type._id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Palette className="text-pink-600" size={20} />
                                Shirt Colors
                            </h2>
                            <form onSubmit={handleAddColor} className="flex gap-2 mb-6">
                                <input 
                                    type="text" 
                                    placeholder="Color Name (e.g. Pink)"
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={newColor.name}
                                    onChange={(e) => setNewColor({...newColor, name: e.target.value})}
                                />
                                <div className="relative group">
                                    <input 
                                        type="color" 
                                        className="w-10 h-10 p-0.5 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer flex-shrink-0"
                                        value={newColor.hex}
                                        onChange={(e) => setNewColor({...newColor, hex: e.target.value})}
                                    />
                                </div>
                                <button type="submit" className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </form>
                            <div className="flex flex-wrap gap-2">
                                {colors.map(color => (
                                    <div key={color._id} className="group flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium">
                                        <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: color.meta?.hex }} />
                                        <span>{color.name}</span>
                                        <button 
                                            onClick={() => deleteAttribute(color._id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Total Slots', val: totalSlots, color: 'text-indigo-600' },
                        { label: 'Uploaded', val: uploadedCount, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Pending', val: pendingCount, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Coverage', val: `${coverage}%`, color: 'text-gray-900' }
                    ].map((stat, i) => (
                        <div key={i} className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-center ${stat.bg || ''}`}>
                            <div className={`text-3xl font-black ${stat.color} mb-1 tracking-tight`}>{stat.val}</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 border-r border-gray-200 pr-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Type</span>
                        <select 
                            className="bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none"
                            value={filterType} onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            {shirtTypes.map(t => <option key={t._id} value={t.value}>{t.name}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Color</span>
                        <select 
                            className="bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none cursor-pointer"
                            value={filterColor} onChange={(e) => setFilterColor(e.target.value)}
                        >
                            <option value="all">All Colors</option>
                            {colors.map(c => <option key={c._id} value={c.value}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Hidden File Input */}
                <input type="file" ref={fileInputRef} accept="image/png, image/jpeg" style={{ display: 'none' }} onChange={handleFileChange} />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayTypes.map(type => 
                        displayColors.map(color => 
                            VIEWS.map(view => {
                                const key = `${type.value}_${color.value}_${view}`;
                                const imgData = mockups[key];
                                const hasImg = !!imgData;

                                return (
                                    <div key={key} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                                        
                                        {/* Card Header */}
                                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                    {type.meta?.icon} {type.name}
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: color.meta?.hex }} />
                                                    <span className="text-xs text-gray-500 font-medium">{color.name}</span>
                                                    <span className="text-xs text-gray-300 mx-1">•</span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{view}</span>
                                                </div>
                                            </div>
                                            {hasImg ? (
                                                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] uppercase tracking-widest font-bold rounded-full border border-green-200">Done</span>
                                            ) : (
                                                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] uppercase tracking-widest font-bold rounded-full border border-amber-200">Pending</span>
                                            )}
                                        </div>

                                        {/* Preview Area */}
                                        <div className="h-48 bg-gray-100 relative items-center justify-center flex overflow-hidden border-b border-gray-100">
                                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }} />
                                            
                                            {hasImg ? (
                                                <img src={imgData} alt="Mockup" className="max-h-full max-w-full object-contain relative z-10 p-4 drop-shadow-xl" />
                                            ) : (
                                                <div className="text-center relative z-10 flex flex-col items-center opacity-40">
                                                    <Camera className="w-10 h-10 mb-2" />
                                                    <span className="text-xs font-semibold">No Layout Uploaded</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="p-4 flex gap-2 mt-auto">
                                            <button 
                                                onClick={() => handleUploadClick(key)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all border ${hasImg ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 shadow-sm'}`}
                                            >
                                                {hasImg ? <RefreshCw size={14} /> : <Upload size={14} />}
                                                {hasImg ? 'Replace' : 'Upload PNG'}
                                            </button>
                                            
                                            {hasImg && (
                                                <button 
                                                    onClick={() => removeMockup(key)}
                                                    className="px-3 py-2.5 rounded-lg text-xs font-bold bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
                                                    title="Remove Image"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )
                    )}
                </div>

            </main>
        </div>
    );
};

export default Admin;

