import React, { useState, useRef, useEffect } from 'react';
import useAdminStore from '../store/adminStore';
import { Camera, RefreshCw, Trash2, ArrowRight, LayoutDashboard, Search, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const TYPES = [
  { id: 'Round Neck', name: 'Round Neck', icon: '👕' },
  { id: 'Polo', name: 'Polo', icon: '🎽' },
  { id: 'Hoodie', name: 'Hoodie', icon: '🧥' },
];

const COLORS = [
  { id: 'White', name: 'White', hex: '#ffffff' },
  { id: 'Off White', name: 'Off White', hex: '#f8fafc' },
  { id: 'Black', name: 'Black', hex: '#0f172a' },
  { id: 'Navy', name: 'Navy', hex: '#1e3a8a' },
  { id: 'Charcoal', name: 'Charcoal', hex: '#334155' },
  { id: 'Red', name: 'Red', hex: '#dc2626' },
  { id: 'Green', name: 'Green', hex: '#16a34a' },
  { id: 'Yellow', name: 'Yellow', hex: '#eab308' },
  { id: 'Blue', name: 'Blue', hex: '#2563eb' }
];

const VIEWS = ['front', 'back'];

const Admin = () => {
    const { mockups, uploadMockup, removeMockup, fetchMockups, loading } = useAdminStore();
    const fileInputRef = useRef(null);
    const [pendingKey, setPendingKey] = useState(null);

    useEffect(() => {
        fetchMockups();
    }, [fetchMockups]);
    
    // Filters
    const [filterType, setFilterType] = useState('all');
    const [filterColor, setFilterColor] = useState('all');

    // Stats calculation
    const totalSlots = TYPES.length * COLORS.length * VIEWS.length;
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

    const displayTypes = filterType === 'all' ? TYPES : TYPES.filter(t => t.id === filterType);
    const displayColors = filterColor === 'all' ? COLORS : COLORS.filter(c => c.id === filterColor);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
            
            {/* Navbar */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm shrink-0 sticky top-0 z-30">
                <div className="flex items-center space-x-2">
                    <LayoutDashboard className="w-6 h-6 text-indigo-600" />
                    <span className="text-xl font-extrabold text-[#1e1b4b] tracking-tight">PrintCraft Admin</span>
                </div>
                <div className="flex bg-gray-100 rounded-full border border-gray-200 p-1">
                    <div className="px-6 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold bg-white text-indigo-600 border border-gray-200 shadow-sm">Admin Panel</div>
                    <Link to="/designer" className="px-6 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">Designer</Link>
                </div>
                <div>
                     <Link to="/designer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md">
                        Open Designer <ArrowRight size={16} />
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 mt-10">
                
                {/* Header Info */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mockup Image Manager</h1>
                    <p className="text-gray-500 mt-2 text-sm max-w-2xl">
                        Upload high-quality, transparent T-shirt base images for each category and color. These assets will automatically sync to the Designer canvas as backgrounds.
                    </p>
                </div>

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
                            {TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Color</span>
                        <select 
                            className="bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none cursor-pointer"
                            value={filterColor} onChange={(e) => setFilterColor(e.target.value)}
                        >
                            <option value="all">All Colors</option>
                            {COLORS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
                                const key = `${type.id}_${color.id}_${view}`;
                                const imgData = mockups[key];
                                const hasImg = !!imgData;

                                return (
                                    <div key={key} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                                        
                                        {/* Card Header */}
                                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                    {type.icon} {type.name}
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: color.hex }} />
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
                                            {/* Checkerboard subtle background */}
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
