import React, { useState, useEffect } from 'react';

// Icon components - These remain unchanged as they are simple SVG placeholders.
// In a real application, you'd likely use an icon library (e.g., Heroicons, React Icons).
const HomeIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7 7-7m-2 2V10a1 1 0 00-1-1h-3m-6 0a1 1 0 00-1 1v10a1 1 0 001 1h3m-6-10v10a1 1 0 001 1h3"></path>
  </svg>
);
const ChartIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18A9 9 0 0112 3z"></path>
  </svg>
);
const InvestIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 002 2h2a2 2 0 002-2z"
    ></path>
  </svg>
);
const ECommerceIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
  </svg>
);
const ProgramIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3m0 0l3-3m-3 3v4m0 0a9 9 0 110 18A9 9 0 0112 3z"></path>
  </svg>
);
const RewardIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11.085 15.656L15.343 19.914 20 15.257l-4.257-4.257zm0 0a.75.75 0 011.06 0l2.686 2.686a.75.75 0 010 1.06l-2.686 2.686a.75.75 0 01-1.06 0l-2.686-2.686a.75.75 0 010-1.06l2.686-2.686z"
    ></path>
  </svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>
);
const ApprovalIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);
const NotificationIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    ></path>
  </svg>
);
const ActivityIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8A5 5 0 013 17V7a4 4 0 014-4h10a4 4 0 014 4z"></path>
  </svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
  </svg>
);
const ChevronRightIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className={`ml-auto w-4 h-4 transform ${isOpen ? 'rotate-90' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
);

// Define types for menu items - 'active' property removed as it's now determined dynamically
interface SubMenuItem {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href: string;
  icon: React.FC;
  submenu?: SubMenuItem[];
  initiallyOpen?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Chart', href: '/', icon: ChartIcon },
  { name: 'Invest', href: '/invest', icon: InvestIcon },
  {
    name: 'E-commerce',
    href: '#ecommerce',
    icon: ECommerceIcon,
    submenu: [
      { name: 'Chart', href: '/e-commerce/chart' },
      { name: 'Produk', href: '/e-commerce/produk' },
      { name: 'Marketing', href: '/e-commerce/marketing' },
    ],
  },
  {
    name: 'Program',
    href: '#program',
    icon: ProgramIcon,
    submenu: [
      { name: 'Chart', href: '/program/program-chart' },
      { name: 'Produk', href: '/program/program-produk' },
      { name: 'Marketing', href: '/program/program-marketing' },
    ],
  },
  { name: 'Reward', href: '#reward', icon: RewardIcon },
  { name: 'User', href: '/user', icon: UserIcon },
  {
    name: 'Approval',
    href: '#approval',
    icon: ApprovalIcon,
    // initiallyOpen: true, // Uncomment to test initial open
    submenu: [
      { name: 'Chart', href: '/approval/chart' },
      { name: 'Invest', href: '/approval/invest' },
    ],
  },
  { name: 'Notification', href: '/notification', icon: NotificationIcon },
  { name: 'Activity', href: '/activity', icon: ActivityIcon },
];

const Sidebar: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  // State to manage which submenus are currently open
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  // Effect to update currentPath when browser history changes (e.g., back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Effect to initialize open submenus based on `initiallyOpen` or active submenu item
  useEffect(() => {
    const initialOpen: string[] = [];
    menuItems.forEach((item) => {
      if (item.initiallyOpen) {
        initialOpen.push(item.name);
      }
      // Also open if any of its submenus is the current active path
      if (item.submenu && item.submenu.some((sub) => sub.href === currentPath)) {
        if (!initialOpen.includes(item.name)) {
          initialOpen.push(item.name);
        }
      }
    });
    setOpenSubmenus(initialOpen);
  }, [currentPath]); // Re-evaluate when currentPath changes

  // Function to handle navigation
  const handleMenuClick = (href: string) => {
    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
    }
    setCurrentPath(href);
  };

  // Function to toggle submenu open/close state
  const handleToggleSubmenu = (menuName: string) => {
    setOpenSubmenus((prev) => (prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName]));
  };

  return (
    <div className="w-64 bg-white h-screen shadow-md flex flex-col p-4">
      <div className="flex items-center justify-center mb-6">
        {/* Replace with your actual logo */}
        <div className="w-36 h-10 bg-gray-200 flex items-center justify-center text-gray-700 font-bold rounded">Your Logo</div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {/* Home/List item - Consider making this a proper link if it navigates */}
          <li>
            <a
              href="/" // Assuming / is the home route
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick('/');
              }}
              className={`flex items-center p-2 text-sm font-medium rounded-lg
                ${currentPath === '/' ? 'text-blue-700 bg-blue-100' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <HomeIcon />
              Home
            </a>
          </li>
          {/* Main menu items */}
          {menuItems.map((menuItem) => {
            const isMenuItemActive = menuItem.href === currentPath;
            const hasActiveSubmenu = menuItem.submenu?.some((subItem) => subItem.href === currentPath);
            const isSubmenuOpen = openSubmenus.includes(menuItem.name);

            return (
              <li key={menuItem.name} className="relative group">
                {menuItem.submenu ? (
                  // Use a div with onClick for summary to control details
                  // The `open` prop of details is now fully controlled by React state
                  <details open={isSubmenuOpen} className="group">
                    <summary
                      className={`flex items-center p-2 text-sm font-medium rounded-lg cursor-pointer
                        ${isMenuItemActive || hasActiveSubmenu ? 'text-blue-700 bg-blue-100' : 'text-gray-700 hover:bg-gray-100'}
                      `}
                      onClick={(e) => {
                        // Prevent default details toggle behavior
                        e.preventDefault();
                        handleToggleSubmenu(menuItem.name);
                      }}
                    >
                      <menuItem.icon />
                      {menuItem.name}
                      <ChevronRightIcon isOpen={isSubmenuOpen} />
                    </summary>
                    <ul className="pl-8 mt-1 space-y-1">
                      {menuItem.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <a
                            href={subItem.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleMenuClick(subItem.href);
                            }}
                            className={`flex items-center p-2 text-sm rounded-lg
                              ${currentPath === subItem.href ? 'text-blue-700 bg-blue-100' : 'text-gray-600 hover:bg-gray-50'}`}
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  // Regular menu item without submenu
                  <a
                    href={menuItem.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(menuItem.href);
                    }}
                    className={`flex items-center p-2 text-sm font-medium rounded-lg
                      ${isMenuItemActive ? 'text-blue-700 bg-blue-100' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {isMenuItemActive && <span className="w-1.5 h-full bg-blue-700 absolute left-0 top-0 rounded-l-lg"></span>}
                    <menuItem.icon />
                    {menuItem.name}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button className="flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg w-full">
          <LogoutIcon />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
