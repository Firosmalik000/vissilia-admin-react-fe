import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/icon/logo.png';
import { useUserStore } from '@/store/useUserStore';
import { ActivitySquareIcon, BadgeIcon, BellDot, BookCheck, ChartBar, CheckCircle, CircleDollarSign, DollarSignIcon, GiftIcon, Presentation, User2Icon } from 'lucide-react';

// Icon components (no changes)

const HomeIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7 7-7m-2 2V10a1 1 0 00-1-1h-3m-6 0a1 1 0 00-1 1v10a1 1 0 001 1h3m-6-10v10a1 1 0 001 1h3"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H15M19 12L15 8M19 12L15 16M19 12H9"
    ></path>
  </svg>
);
const ChevronRightIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className={`ml-auto w-4 h-4 transform ${isOpen ? 'rotate-90' : ''} transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
);

interface SubMenuItem {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href: string;

  icon: React.FC | string;
  submenu?: SubMenuItem[];
  initiallyOpen?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Chart', href: '/', icon: ChartBar },
  { name: 'Invest', href: '/invest', icon: CircleDollarSign },
  {
    name: 'E-commerce',
    href: '#ecommerce',
    icon: BadgeIcon,
    submenu: [
      { name: 'Chart', href: '/e-commerce/chart' },
      { name: 'Produk', href: '/e-commerce/produk' },
      { name: 'Order', href: '/e-commerce/orders' },
      { name: 'Marketing', href: '/e-commerce/marketing' },
    ],
  },
  {
    name: 'Program',
    href: '#program',
    icon: Presentation,
    submenu: [
      { name: 'Chart', href: '/program/program-chart' },
      { name: 'Produk', href: '/program/program-produk' },
      { name: 'Marketing', href: '/program/program-marketing' },
    ],
  },
  {
    name: 'Kado Cinta',
    href: '#reward',
    icon: GiftIcon,
    submenu: [
      { name: 'Kado Cinta', href: '/program/kado-cinta' },
      { name: 'Kategori Kado Cinta', href: '/program/kategori-kado-cinta' },
      { name: 'Order', href: '/program/kado-cinta-orders' },
    ],
  },
  {
    name: 'Approval',
    href: '#approval',
    icon: CheckCircle,
    submenu: [
      { name: 'Chart', href: '/approval/chart' },
      { name: 'Invest', href: '/approval/invest' },
      { name: 'Withdraw', href: '/approval/withdraw' },
    ],
  },
  { name: 'Subsidi Plan', href: '/subsidi-plan', icon: BookCheck },
  { name: 'User', href: '/user', icon: User2Icon },

  { name: 'Notification', href: '/notification', icon: BellDot },
  { name: 'Activity', href: '/activity', icon: ActivitySquareIcon },
];

const Sidebar: React.FC = () => {
  const { clearUserData } = useUserStore();
  const location = useLocation();
  const currentPath = location.pathname;

  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  useEffect(() => {
    const initialOpen: string[] = [];
    menuItems.forEach((item) => {
      if (item.initiallyOpen) {
        initialOpen.push(item.name);
      }
      if (item.submenu && item.submenu.some((sub) => sub.href === currentPath)) {
        if (!initialOpen.includes(item.name)) {
          initialOpen.push(item.name);
        }
      }
    });
    setOpenSubmenus(initialOpen);
  }, [currentPath]);

  const handleToggleSubmenu = (menuName: string) => {
    setOpenSubmenus((prev) => (prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName]));
  };

  const handleLogout = () => {
    clearUserData();
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-white h-screen shadow-md flex flex-col p-4">
      <div className="flex items-center justify-center mb-2">
        <div className="  flex items-center justify-center text-gray-700 font-bold rounded">
          <img src={Logo} alt="Logo" className="w-24  " />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {/* Home/List item */}
          <li>
            <Link // Use Link component for navigation
              to="/"
              className={`flex items-center p-2 text-sm font-medium rounded-lg
                ${currentPath === '/' ? 'text-blue-700 bg-blue-100' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <HomeIcon />
              Home
            </Link>
          </li>
          {/* Main menu items */}
          {menuItems.map((menuItem) => {
            const isMenuItemActive = menuItem.href === currentPath;
            const hasActiveSubmenu = menuItem.submenu?.some((subItem) => subItem.href === currentPath);
            const isSubmenuOpen = openSubmenus.includes(menuItem.name);

            return (
              <li key={menuItem.name} className="relative group">
                {menuItem.submenu ? (
                  <details open={isSubmenuOpen} className="group">
                    <summary
                      className={`flex items-center p-2 text-sm font-medium rounded-lg cursor-pointer
                        ${isMenuItemActive || hasActiveSubmenu ? 'text-blue-700 bg-blue-100' : 'text-gray-700 hover:bg-gray-100'}
                      `}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default details toggle behavior
                        handleToggleSubmenu(menuItem.name);
                      }}
                    >
                      {/* Kondisional rendering untuk ikon: jika string (path), gunakan <img>; jika komponen, render sebagai komponen */}
                      {typeof menuItem.icon === 'string' ? (
                        <img src={menuItem.icon} alt={menuItem.name} className="w-5 h-5 mr-3" />
                      ) : (
                        // <img src={menuItem.icon} alt={menuItem.name} className="w-5 h-5 mr-3" />
                        // Meneruskan className langsung ke komponen SVG
                        <menuItem.icon className="w-5 h-5 mr-3" />
                      )}

                      {menuItem.name}
                      <ChevronRightIcon isOpen={isSubmenuOpen} />
                    </summary>
                    <ul className="pl-8 mt-1 space-y-1">
                      {menuItem.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link // Use Link component for submenu navigation
                            to={subItem.href}
                            className={`flex items-center p-2 text-sm rounded-lg
                              ${currentPath === subItem.href ? 'text-blue-700 bg-blue-100' : 'text-gray-600 hover:bg-gray-50'}`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  // Regular menu item without submenu
                  <Link // Use Link component for regular menu items
                    to={menuItem.href}
                    className={`flex items-center p-2 text-sm font-medium rounded-lg
                      ${isMenuItemActive ? 'text-blue-700 bg-blue-100' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {isMenuItemActive && <span className="w-1.5 h-full bg-blue-700 absolute left-0 top-0 rounded-l-lg"></span>}
                    {/* Kondisional rendering untuk ikon: jika string (path), gunakan <img>; jika komponen, render sebagai komponen */}
                    {typeof menuItem.icon === 'string' ? (
                      <img src={menuItem.icon} alt={menuItem.name} className="w-5 h-5 mr-3" />
                    ) : (
                      // Meneruskan className langsung ke komponen SVG
                      <menuItem.icon className="w-5 h-5 mr-3" />
                    )}
                    {menuItem.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button type="button" onClick={handleLogout} className="flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg w-full">
          <LogoutIcon />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
