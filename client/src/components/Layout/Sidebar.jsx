import { UserCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 md:w-64'}`}>
      <div className="flex h-full flex-col p-4">
        <button 
          className="mb-8 md:hidden text-white"
          onClick={toggleSidebar}
        >
          {isOpen ? 'X' : '≡'}
        </button>
        
        <Link 
          to="/profile"
          className={`mb-4 flex items-center p-3 rounded-lg transition-colors ${
            isActive('/profile') ? 'bg-blue-600' : 'hover:bg-gray-700'
          }`}
        >
          <UserCircleIcon className="h-6 w-6 mr-2" />
          <span>Profile</span>
        </Link>

        <Link 
          to="/posts"
          className={`mb-4 flex items-center p-3 rounded-lg transition-colors ${
            isActive('/posts') ? 'bg-blue-600' : 'hover:bg-gray-700'
          }`}
        >
          <DocumentTextIcon className="h-6 w-6 mr-2" />
          <span>Posts</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;