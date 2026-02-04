import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  LayoutDashboard, FileText, Settings, LogOut, Plus, Edit, Trash2, Upload, Search, User, Save, X, Lock, Youtube, Loader2, Menu
} from 'lucide-react';
import { AdminTab, PortfolioItem } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

const data = [
  { name: 'Mon', visitors: 400, inquiries: 2 },
  { name: 'Tue', visitors: 300, inquiries: 1 },
  { name: 'Wed', visitors: 550, inquiries: 5 },
  { name: 'Thu', visitors: 480, inquiries: 3 },
  { name: 'Fri', visitors: 690, inquiries: 8 },
  { name: 'Sat', visitors: 200, inquiries: 1 },
  { name: 'Sun', visitors: 150, inquiries: 0 },
];

const mockInquiries = [
  { id: 1, name: "김철수", company: "삼성전자", type: "Visual", date: "2024-05-20" },
  { id: 2, name: "이영희", company: "현대자동차", type: "Archive", date: "2024-05-19" },
  { id: 3, name: "박지성", company: "서울시청", type: "Visual", date: "2024-05-18" },
];

// Helper to extract YouTube Video ID
const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2]) ? match[2] : null;
};

const AdminDashboard: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('innc_admin_auth') === 'true';
  });
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.DASHBOARD);
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === 'admin' && loginPw === 'Lupilupi001#') {
      localStorage.setItem('innc_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('innc_admin_auth');
    setIsAuthenticated(false);
    setLoginId('');
    setLoginPw('');
  };

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  // Components for Tab Content
  const DashboardHome = () => (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl">
          <div className="text-gray-400 mb-2 text-sm md:text-base">Total Visitors (Week)</div>
          <div className="text-2xl md:text-3xl font-bold text-white">2,770</div>
          <div className="text-green-500 text-xs md:text-sm mt-2 flex items-center">↑ 12% vs last week</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl">
          <div className="text-gray-400 mb-2 text-sm md:text-base">New Inquiries</div>
          <div className="text-2xl md:text-3xl font-bold text-white">20</div>
          <div className="text-green-500 text-xs md:text-sm mt-2 flex items-center">↑ 5 new today</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl">
          <div className="text-gray-400 mb-2 text-sm md:text-base">Portfolio Items</div>
          <div className="text-2xl md:text-3xl font-bold text-white">48</div>
          <div className="text-innc-mint text-xs md:text-sm mt-2">Manage Projects</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Weekly Traffic</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickMargin={5} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="visitors" fill="#00C2CB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Recent Inquiries</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400 min-w-[500px]">
              <thead className="text-xs text-gray-500 uppercase bg-white/5">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockInquiries.map(inq => (
                  <tr key={inq.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 font-medium text-white">{inq.name}</td>
                    <td className="px-4 py-3">{inq.company}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${inq.type === 'Visual' ? 'bg-purple-900/50 text-purple-200' : 'bg-blue-900/50 text-blue-200'}`}>
                        {inq.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{inq.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const PostsEditor = () => {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCat, setFilterCat] = useState('All');
    const [isLoading, setIsLoading] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);
    
    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
      title: '',
      client: '',
      year: new Date().getFullYear().toString(),
      category: 'visual',
      imageUrl: '',
      youtubeUrl: '',
      description: ''
    });

    const portfolioCollectionRef = collection(db, "portfolio");

    const fetchPortfolio = async () => {
      setIsLoading(true);
      try {
        const data = await getDocs(portfolioCollectionRef);
        const mappedData = data.docs.map((doc) => ({
          ...(doc.data() as any),
          id: doc.id,
        })) as PortfolioItem[];
        setItems(mappedData);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        alert("Failed to load portfolio data.");
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchPortfolio();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Auto-generate thumbnail if YouTube URL is entered
      if (name === 'youtubeUrl') {
        const videoId = getYoutubeId(value);
        if (videoId) {
          setFormData(prev => ({ 
            ...prev, 
            [name]: value,
            imageUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          }));
          return;
        }
      }

      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (item: PortfolioItem) => {
      setIsEditing(true);
      setCurrentId(item.id);
      setFormData({
        title: item.title,
        client: item.client,
        year: item.year,
        category: item.category,
        imageUrl: item.imageUrl,
        youtubeUrl: item.youtubeUrl || '',
        description: item.description
      });
      setTimeout(() => {
        document.getElementById('edit-form')?.scrollIntoView({ behavior: 'smooth' });
        titleInputRef.current?.focus();
      }, 100);
    };

    const handleDeleteClick = async (id: string) => {
      if (window.confirm("Are you sure you want to delete this project?")) {
        try {
          const itemDoc = doc(db, "portfolio", id);
          await deleteDoc(itemDoc);
          alert("Project deleted successfully!");
          fetchPortfolio(); // Refresh list
        } catch (err) {
          console.error("Error deleting document:", err);
          alert("Error deleting project.");
        }
      }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      const itemData = {
        ...formData,
        category: formData.category as 'visual' | 'archive'
      };
      
      try {
        if (currentId && isEditing) {
          const itemDoc = doc(db, "portfolio", currentId);
          await updateDoc(itemDoc, itemData);
          alert("Project updated successfully!");
        } else {
          await addDoc(portfolioCollectionRef, itemData);
          alert("Project created successfully!");
        }
        
        handleCancel();
        fetchPortfolio();

      } catch (err) {
        console.error("Error saving document:", err);
        alert("Error saving project. Check console for details.");
      } finally {
        setIsLoading(false);
      }
    };

    const handleCancel = () => {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({
        title: '',
        client: '',
        year: new Date().getFullYear().toString(),
        category: 'visual',
        imageUrl: '',
        youtubeUrl: '',
        description: ''
      });
    };

    const filteredItems = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = filterCat === 'All' || 
                         (filterCat === 'Visual Creative' && item.category === 'visual') ||
                         (filterCat === 'Digital Archive' && item.category === 'archive');
      return matchesSearch && matchesCat;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Portfolio Management</h2>
          <button 
            onClick={() => {
              handleCancel();
              setTimeout(() => {
                document.getElementById('edit-form')?.scrollIntoView({ behavior: 'smooth' });
                titleInputRef.current?.focus();
              }, 50);
            }}
            className="w-full md:w-auto px-4 py-2 bg-innc-mint text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-innc-mintHover transition-colors"
          >
            <Plus size={18} /> Add New
          </button>
        </div>

        {/* List Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-innc-mint"
              />
            </div>
            <select 
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-gray-300 w-full md:w-auto"
            >
              <option>All</option>
              <option>Visual Creative</option>
              <option>Digital Archive</option>
            </select>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {isLoading && items.length === 0 ? (
               <div className="flex items-center justify-center py-8 text-innc-mint">
                 <Loader2 className="animate-spin mr-2" /> Loading...
               </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No projects found.
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-black/30 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors gap-4">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-16 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0 relative group">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      {item.youtubeUrl && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Youtube size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm md:text-base truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500 truncate">{item.client} • {item.year}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end md:self-auto">
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Editor Form */}
        <div id="edit-form" className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {currentId ? <><Edit size={20} className="text-innc-mint" /> Edit Project</> : <><Plus size={20} className="text-innc-mint" /> Create New Project</>}
            </h3>
            {currentId && (
              <button onClick={handleCancel} className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                <X size={14} /> Cancel
              </button>
            )}
          </div>
          
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Project Title</label>
                <input 
                  type="text" 
                  name="title"
                  ref={titleInputRef}
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Samsung Global Campaign" 
                  className="w-full bg-black/50 border border-white/10 p-3 rounded text-white focus:border-innc-mint focus:outline-none transition-colors" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Client</label>
                   <input 
                    type="text" 
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Samsung" 
                    className="w-full bg-black/50 border border-white/10 p-3 rounded text-white focus:border-innc-mint focus:outline-none transition-colors" 
                  />
                </div>
                <div>
                   <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Year</label>
                   <input 
                    type="text" 
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    placeholder="2024" 
                    className="w-full bg-black/50 border border-white/10 p-3 rounded text-white focus:border-innc-mint focus:outline-none transition-colors" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-white/10 p-3 rounded text-white focus:border-innc-mint focus:outline-none transition-colors"
                >
                  <option value="visual">Visual Creative</option>
                  <option value="archive">Digital Archive</option>
                </select>
              </div>
              
              <div className="p-4 bg-innc-black/50 rounded-lg border border-white/5">
                <label className="block text-xs text-innc-mint mb-2 uppercase tracking-wider font-bold flex items-center gap-2">
                  <Youtube size={14} /> YouTube Video
                </label>
                <input 
                  type="text" 
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleInputChange}
                  placeholder="Paste YouTube URL here" 
                  className="w-full bg-black/50 border border-white/10 p-3 rounded text-white focus:border-innc-mint focus:outline-none transition-colors mb-2" 
                />
                
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider mt-4">Thumbnail Image URL</label>
                <div className="flex flex-col md:flex-row gap-2">
                  <input 
                    type="text" 
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://..." 
                    className="w-full bg-black/50 border border-white/10 p-3 rounded text-white focus:border-innc-mint focus:outline-none transition-colors" 
                  />
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({...prev, imageUrl: `https://picsum.photos/800/600?random=${Date.now()}`}))}
                    className="px-3 py-3 md:py-0 bg-white/10 rounded hover:bg-white/20 text-gray-300 text-xs whitespace-nowrap"
                  >
                    Random
                  </button>
                </div>
                {formData.imageUrl && (
                  <div className="mt-4 w-full aspect-video bg-black rounded overflow-hidden border border-white/10 relative">
                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                     <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">Preview</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4 flex flex-col">
               <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5} 
                  placeholder="Project details..." 
                  className="w-full h-full min-h-[150px] bg-black/50 border border-white/10 p-3 rounded text-white resize-none focus:border-innc-mint focus:outline-none transition-colors"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-4 bg-innc-mint text-black font-bold rounded-lg hover:bg-innc-mintHover transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Save size={18} />} 
                {currentId ? 'Update Project' : 'Save New Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const SettingsPanel = () => (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-white">General Settings</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Site Name</label>
            <input type="text" defaultValue="INNC" className="w-full bg-black/50 border border-white/10 p-3 rounded text-white" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Primary Color</label>
            <div className="flex items-center gap-4">
              <input type="color" defaultValue="#00C2CB" className="h-10 w-20 rounded cursor-pointer bg-transparent" />
              <span className="text-gray-400">Current: INNC Mint (#00C2CB)</span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/10">
             <button className="w-full md:w-auto px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-innc-mint rounded-lg flex items-center justify-center font-bold text-black text-xl mx-auto mb-4">
              I
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-gray-400 text-sm">Authorized personnel only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Admin ID</label>
              <input 
                type="text" 
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full bg-black/50 border border-white/10 p-3 rounded text-white focus:border-innc-mint focus:outline-none transition-colors"
                placeholder="Enter ID"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={loginPw}
                onChange={(e) => setLoginPw(e.target.value)}
                className="w-full bg-black/50 border border-white/10 p-3 rounded text-white focus:border-innc-mint focus:outline-none transition-colors"
                placeholder="Enter Password"
              />
            </div>
            
            {loginError && (
              <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded">
                {loginError}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-3 bg-innc-mint text-black font-bold rounded hover:bg-innc-mintHover transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link to="/" className="text-gray-500 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors">
              <LogOut size={14} /> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show dashboard with responsive layout
  return (
    <div className="min-h-screen bg-innc-black text-white flex flex-col lg:flex-row">
      {/* Sidebar / Top Navigation */}
      <aside className="bg-black border-b lg:border-b-0 lg:border-r border-white/10 w-full lg:w-64 lg:h-screen lg:flex lg:flex-col lg:justify-between flex-shrink-0 z-30 lg:sticky lg:top-0">
        
        {/* Header (Logo + Mobile Toggle) */}
        <div className="flex justify-between items-center p-4 lg:p-6 border-b border-white/10 lg:border-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-innc-mint rounded-lg flex items-center justify-center font-bold text-black">I</div>
            <span className="font-bold text-xl tracking-tight">INNC ADMIN</span>
          </div>
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
        
        {/* Nav Content (Collapsible on Mobile, Visible on Desktop) */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:flex lg:flex-col lg:flex-1 lg:justify-between w-full`}>
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => handleTabChange(AdminTab.DASHBOARD)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === AdminTab.DASHBOARD ? 'bg-innc-mint text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
            <button 
              onClick={() => handleTabChange(AdminTab.POSTS)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === AdminTab.POSTS ? 'bg-innc-mint text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <FileText size={20} /> Posts
            </button>
             <button 
              onClick={() => handleTabChange(AdminTab.SETTINGS)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === AdminTab.SETTINGS ? 'bg-innc-mint text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Settings size={20} /> Settings
            </button>
          </nav>

          {/* Footer / User Info */}
          <div className="p-4 border-t border-white/10 mt-auto">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <User size={16} />
              </div>
              <div>
                <div className="text-sm font-bold">Admin</div>
                <div className="text-xs text-gray-500">admin@innc.co.kr</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-gray-400 hover:text-white px-2 py-2 transition-colors text-left"
              >
                <LogOut size={16} /> Log Out
              </button>
              <Link to="/" className="w-full flex items-center gap-2 text-gray-400 hover:text-white px-2 py-2 transition-colors text-xs border-t border-white/5 pt-2">
                <ExternalLink size={12} /> View Live Site
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] min-h-[calc(100vh-64px)] lg:h-screen">
        <div className="p-4 md:p-8">
          {activeTab === AdminTab.DASHBOARD && <DashboardHome />}
          {activeTab === AdminTab.POSTS && <PostsEditor />}
          {activeTab === AdminTab.SETTINGS && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
};

// Helper component for Icon
const ExternalLink = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export default AdminDashboard;