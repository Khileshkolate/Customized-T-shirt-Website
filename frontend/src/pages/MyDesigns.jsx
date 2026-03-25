import React, { useState, useEffect } from 'react';
import { Palette, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const MyDesigns = () => {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            const response = await axios.get('/designs/my-designs');
            setDesigns(response.data.data || []);
        } catch (error) {
            console.error('Error fetching designs:', error);
            // toast.error('Failed to load designs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this design?')) return;
        try {
            await axios.delete(`/designs/${id}`);
            setDesigns(designs.filter(d => d._id !== id));
            toast.success('Design deleted successfully');
        } catch (error) {
            toast.error('Failed to delete design');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Designs</h1>
                        <p className="text-gray-600">Manage your saved custom creations</p>
                    </div>
                    <Link
                        to="/designer"
                        className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-md"
                    >
                        <Palette className="h-5 w-5" />
                        Create New Design
                    </Link>
                </div>

                {designs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {designs.map((design) => (
                            <div key={design._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group">
                                <div className="aspect-square bg-gray-100 relative">
                                    <img 
                                        src={design.previewImage || 'https://via.placeholder.com/400x400?text=No+Preview'} 
                                        alt={design.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <Link 
                                            to={`/designer?designId=${design._id}`}
                                            className="p-3 bg-white rounded-full text-primary-600 hover:scale-110 transition-transform"
                                        >
                                            <ExternalLink className="h-5 w-5" />
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(design._id)}
                                            className="p-3 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate">{design.name || 'Untitled Design'}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Last edited: {new Date(design.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Palette className="h-10 w-10 text-primary-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No designs yet</h2>
                        <p className="text-gray-600 mb-8">
                            You haven't saved any designs yet. Start creating your masterpiece today!
                        </p>
                        <Link
                            to="/designer"
                            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            Start Designing
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyDesigns;
