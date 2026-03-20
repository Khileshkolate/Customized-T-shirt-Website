import { useState, useEffect } from 'react';
import { 
  Search, Filter, Palette, Download, Eye, 
  Edit2, Trash2, Share2, Calendar, User
} from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import axios from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const AdminDesigns = () => {
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchDesigns();
  }, []);

  useEffect(() => {
    filterDesigns();
  }, [searchTerm, typeFilter, designs]);

  const fetchDesigns = async () => {
    try {
      const response = await axios.get('/designs');
      setDesigns(response.data.data || []);
      setFilteredDesigns(response.data.data || []);
    } catch (error) {
      console.error('Error fetching designs:', error);
      toast.error('Failed to load designs');
    } finally {
      setLoading(false);
    }
  };

  const filterDesigns = () => {
    let filtered = [...designs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(design =>
        design.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(design => design.type === typeFilter);
    }

    setFilteredDesigns(filtered);
  };

  const deleteDesign = async (designId) => {
    if (!window.confirm('Are you sure you want to delete this design?')) {
      return;
    }

    try {
      await axios.delete(`/designs/${designId}`);
      toast.success('Design deleted successfully');
      fetchDesigns(); // Refresh list
    } catch (error) {
      console.error('Error deleting design:', error);
      toast.error('Failed to delete design');
    }
  };

  const designColumns = [
    { key: 'design', label: 'Design' },
    { key: 'user', label: 'Created By' },
    { key: 'type', label: 'Type' },
    { key: 'date', label: 'Created' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ];

  const designData = filteredDesigns.map(design => ({
    design: (
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
          <Palette className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <div className="font-medium">{design.name || 'Untitled Design'}</div>
          <div className="text-sm text-gray-500">
            {design.elements?.length || 0} elements
          </div>
        </div>
      </div>
    ),
    user: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-primary-600" />
        </div>
        <div>
          <div className="font-medium text-sm">{design.user?.name}</div>
          <div className="text-xs text-gray-500">{design.user?.email}</div>
        </div>
      </div>
    ),
    type: (
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
        {design.type || 't-shirt'}
      </span>
    ),
    date: (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span className="text-sm">
          {new Date(design.createdAt).toLocaleDateString()}
        </span>
      </div>
    ),
    status: (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        design.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {design.isPublic ? 'Public' : 'Private'}
      </span>
    ),
    actions: (
      <div className="flex items-center gap-2">
        <button
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          title="View Design"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
          title="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => deleteDesign(design._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    )
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Designs</h1>
          <p className="text-gray-600">Manage user-created designs and templates</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Export Designs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="t-shirt">T-Shirts</option>
              <option value="mug">Mugs</option>
              <option value="hoodie">Hoodies</option>
              <option value="frame">Frames</option>
              <option value="template">Templates</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{designs.length}</div>
              <div className="text-sm text-gray-600">Total Designs</div>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Palette className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {designs.filter(d => d.type === 't-shirt').length}
              </div>
              <div className="text-sm text-gray-600">T-Shirt Designs</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Palette className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {designs.filter(d => d.isPublic).length}
              </div>
              <div className="text-sm text-gray-600">Public Designs</div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Share2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Designs Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <DataTable 
          columns={designColumns} 
          data={designData} 
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default AdminDesigns;