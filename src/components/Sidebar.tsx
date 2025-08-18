import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/icon/logo.png';

// Icon components (no changes)
const ChartIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7.755 13.38V20.21C7.755 20.6184 7.59275 21.0101 7.30394 21.2989C7.01514 21.5878 6.62343 21.75 6.215 21.75H4.405C4.20192 21.7513 4.00059 21.7125 3.81259 21.6357C3.62460 21.5589 3.45365 21.4456 3.30958 21.3025C3.16552 21.1594 3.05119 20.9891 2.97317 20.8017C2.89516 20.6142 2.85499 20.4131 2.855 20.21V13.38C2.85367 13.1761 2.89285 12.9739 2.97028 12.7853C3.04770 12.5966 3.16182 12.4252 3.30602 12.281C3.45022 12.1368 3.62162 12.0227 3.81027 11.9453C3.99892 11.8679 4.20108 11.8287 4.405 11.83H6.215C6.41808 11.83 6.61915 11.8702 6.80665 11.9482C6.99415 12.0262 7.16436 12.1405 7.30749 12.2846C7.45063 12.4286 7.56385 12.5996 7.64066 12.7876C7.71746 12.9756 7.75632 13.1769 7.755 13.38ZM14.455 3.8V20.21C14.455 20.4131 14.4148 20.6142 14.3368 20.8017C14.2588 20.9891 14.1445 21.1594 14.0004 21.3025C13.8563 21.4456 13.6854 21.5589 13.4974 21.6357C13.3094 21.7125 13.1081 21.7513 12.905 21.75H11.095C10.6856 21.75 10.2929 21.5881 10.0025 21.2996C9.71211 21.011 9.54764 20.6193 9.545 20.21V3.8C9.54762 3.38972 9.71176 2.997 10.0019 2.70688C10.2920 2.41677 10.6847 2.25262 11.095 2.25H12.905C13.3161 2.25 13.7103 2.4133 14.0010 2.70398C14.2917 2.99467 14.455 3.38891 14.455 3.8ZM21.145 8.98V20.21C21.145 20.6184 20.9827 21.0101 20.6939 21.2989C20.4051 21.5878 20.0134 21.75 19.605 21.75H17.795C17.5919 21.7513 17.3906 21.7125 17.2026 21.6357C17.0146 21.5589 16.8436 21.4456 16.6996 21.3025C16.5555 21.1594 16.4412 20.9891 16.3632 20.8017C16.2852 20.6142 16.245 20.4131 16.245 20.21V8.98C16.245 8.77645 16.2851 8.57490 16.3630 8.38684C16.4409 8.19879 16.5551 8.02792 16.6990 7.88398C16.8429 7.74005 17.0138 7.62588 17.2018 7.54799C17.3899 7.47009 17.5914 7.43 17.795 7.43H19.645C20.0474 7.44299 20.4289 7.612 20.7088 7.90129C20.9888 8.19058 21.1452 8.57743 21.145 8.98Z"
      fill="currentColor"
    />
  </svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7 7-7m-2 2V10a1 1 0 00-1-1h-3m-6 0a1 1 0 00-1 1v10a1 1 0 001 1h3m-6-10v10a1 1 0 001 1h3"></path>
  </svg>
);

const InvestIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13.0625 11.2812C13.0625 11.5962 12.9374 11.8982 12.7147 12.1209C12.492 12.3436 12.1899 12.4688 11.875 12.4688H8.3125V10.0938H11.875C12.1899 10.0938 12.492 10.2189 12.7147 10.4416C12.9374 10.6643 13.0625 10.9663 13.0625 11.2812ZM17.8125 9.5C17.8125 11.0266 17.3598 12.519 16.5117 13.7883C15.6635 15.0576 14.458 16.047 13.0476 16.6312C11.6372 17.2154 10.0852 17.3683 8.5879 17.0704C7.09061 16.7726 5.71526 16.0375 4.63577 14.958C3.55629 13.8785 2.82115 12.5031 2.52332 11.0059C2.22549 9.50856 2.37834 7.95658 2.96256 6.54616C3.54677 5.13574 4.5361 3.93024 5.80545 3.08209C7.07479 2.23395 8.56713 1.78125 10.0938 1.78125C12.1402 1.78341 14.1023 2.59733 15.5493 4.04441C16.9964 5.49148 17.8103 7.45352 17.8125 9.5ZM14.25 11.2812C14.25 10.8716 14.1439 10.4688 13.9422 10.1122C13.7405 9.75565 13.45 9.45729 13.0989 9.24617C13.3572 8.93897 13.5335 8.57131 13.6112 8.17751C13.689 7.78372 13.6656 7.37665 13.5434 6.99432C13.4212 6.61199 13.204 6.26687 12.9123 5.99121C12.6205 5.71555 12.2636 5.51833 11.875 5.41797V4.75C11.875 4.59253 11.8124 4.44151 11.7011 4.33016C11.5897 4.21881 11.4387 4.15625 11.2813 4.15625C11.1238 4.15625 10.9728 4.21881 10.8614 4.33016C10.7501 4.44151 10.6875 4.59253 10.6875 4.75V5.34375H9.5V4.75C9.5 4.59253 9.43745 4.44151 9.3261 4.33016C9.21475 4.21881 9.06373 4.15625 8.90625 4.15625C8.74878 4.15625 8.59776 4.21881 8.48641 4.33016C8.37506 4.44151 8.3125 4.59253 8.3125 4.75V5.34375H7.125C6.96753 5.34375 6.81651 5.40631 6.70516 5.51766C6.59381 5.62901 6.53125 5.78003 6.53125 5.9375C6.53125 6.09497 6.59381 6.246 6.70516 6.35734C6.81651 6.46869 6.96753 6.53125 7.125 6.53125V12.4688C6.96753 12.4688 6.81651 12.5313 6.70516 12.6427C6.59381 12.754 6.53125 12.905 6.53125 13.0625C6.53125 13.22 6.59381 13.371 6.70516 13.4823C6.81651 13.5937 6.96753 13.6562 7.125 13.6562H8.3125V14.25C8.3125 14.4075 8.37506 14.5585 8.48641 14.6698C8.59776 14.7812 8.74878 14.8438 8.90625 14.8438C9.06373 14.8438 9.21475 14.7812 9.3261 14.6698C9.43745 14.5585 9.5 14.4075 9.5 14.25V13.6562H10.6875V14.25C10.6875 14.4075 10.7501 14.5585 10.8614 14.6698C10.9728 14.7812 11.1238 14.8438 11.2813 14.8438C11.4387 14.8438 11.5897 14.7812 11.7011 14.6698C11.8124 14.5585 11.875 14.4075 11.875 14.25V13.6562C12.5049 13.6562 13.109 13.406 13.5544 12.9606C13.9998 12.5152 14.25 11.9111 14.25 11.2812ZM12.4688 7.71875C12.4688 7.40381 12.3436 7.10176 12.1209 6.87906C11.8982 6.65636 11.5962 6.53125 11.2813 6.53125H8.3125V8.90625H11.2813C11.5962 8.90625 11.8982 8.78114 12.1209 8.55844C12.3436 8.33574 12.4688 8.03369 12.4688 7.71875Z"
    ></path>
  </svg>
);
const ECommerceIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6.87501 6.41732V5.95898C6.87501 4.86497 7.3096 3.81576 8.08319 3.04217C8.85678 2.26858 9.90599 1.83398 11 1.83398C12.094 1.83398 13.1432 2.26858 13.9168 3.04217C14.6904 3.81576 15.125 4.86497 15.125 5.95898V6.41732H17.4167C17.9227 6.41732 18.3333 6.8289 18.3333 7.3404V18.3413C18.3333 19.3497 17.5129 20.1673 16.5055 20.1673H5.49451C5.01005 20.1673 4.54541 19.975 4.20268 19.6326C3.85995 19.2902 3.66716 18.8258 3.66667 18.3413V7.34132C3.66667 6.82982 4.07459 6.41732 4.58334 6.41732H6.87501ZM8.25001 6.41732H13.75V5.95898C13.75 5.22964 13.4603 4.53017 12.9445 4.01444C12.4288 3.49872 11.7294 3.20898 11 3.20898C10.2707 3.20898 9.57119 3.49872 9.05546 4.01444C8.53974 4.53017 8.25001 5.22964 8.25001 5.95898V6.41732ZM6.87501 6.41732V10.084H8.25001V6.41732H6.87501ZM13.75 6.41732V10.084H15.125V6.41732H13.75Z"
    ></path>
  </svg>
);
const ProgramIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.84 12.691L15.774 12.711C15.6396 12.7509 15.5002 12.7718 15.36 12.773C14.75 12.773 14.406 12.361 14.59 11.852C14.726 11.48 15.081 11.166 15.515 11.021C16.187 10.776 16.657 10.217 16.657 9.566C16.657 8.689 15.804 7.979 14.752 7.979C13.7 7.979 12.847 8.689 12.847 9.566V14.434C12.847 15.604 12.169 16.631 11.154 17.212C10.5739 17.5424 9.91757 17.7155 9.25 17.714C7.266 17.714 5.652 16.243 5.652 14.434C5.652 13.858 5.816 13.317 6.103 12.847C6.547 12.117 7.287 11.56 8.173 11.306C8.32633 11.2573 8.47967 11.233 8.633 11.233C9.245 11.233 9.591 11.647 9.406 12.157C9.28 12.504 8.94 12.802 8.545 12.96C8.49804 12.9756 8.45167 12.993 8.406 13.012C7.778 13.272 7.345 13.81 7.345 14.434C7.345 15.311 8.198 16.021 9.25 16.021C10.302 16.021 11.154 15.311 11.154 14.434V9.566C11.154 8.396 11.833 7.369 12.848 6.788C13.4281 6.45759 14.0844 6.28454 14.752 6.286C16.736 6.286 18.35 7.757 18.35 9.566C18.3488 10.1265 18.1927 10.6757 17.899 11.153C17.457 11.879 16.72 12.435 15.84 12.691ZM2.002 12C2.002 17.523 6.479 22 12.002 22C17.525 22 22.002 17.523 22.002 12C22.002 6.477 17.525 2 12.002 2C6.479 2 2.002 6.477 2.002 12Z"
    ></path>
  </svg>
);
const RewardIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7.54999 1.60746C5.97499 1.59912 4.44166 3.11579 5.14166 4.99912H2.49999C2.05797 4.99912 1.63404 5.17472 1.32148 5.48728C1.00892 5.79984 0.833328 6.22376 0.833328 6.66579V8.33246C0.833328 8.55347 0.921126 8.76543 1.07741 8.92171C1.23369 9.07799 1.44565 9.16579 1.66666 9.16579H9.16666V6.66579H10.8333V9.16579H18.3333C18.5543 9.16579 18.7663 9.07799 18.9226 8.92171C19.0789 8.76543 19.1667 8.55347 19.1667 8.33246V6.66579C19.1667 6.22376 18.9911 5.79984 18.6785 5.48728C18.3659 5.17472 17.942 4.99912 17.5 4.99912H14.8583C15.8333 2.27412 12.1667 0.349123 10.475 2.69912L9.99999 3.33246L9.52499 2.68246C8.99999 1.94079 8.27499 1.61579 7.54999 1.60746ZM7.49999 3.33246C8.24166 3.33246 8.61666 4.23246 8.09166 4.75746C7.56666 5.28246 6.66666 4.90746 6.66666 4.16579C6.66666 3.94478 6.75446 3.73281 6.91074 3.57653C7.06702 3.42025 7.27898 3.33246 7.49999 3.33246ZM12.5 3.33246C13.2417 3.33246 13.6167 4.23246 13.0917 4.75746C12.5667 5.28246 11.6667 4.90746 11.6667 4.16579C11.6667 3.94478 11.7545 3.73281 11.9107 3.57653C12.067 3.42025 12.279 3.33246 12.5 3.33246ZM1.66666 9.99912V16.6658C1.66666 17.1078 1.84226 17.5317 2.15482 17.8443C2.46738 18.1569 2.8913 18.3325 3.33333 18.3325H16.6667C17.1087 18.3325 17.5326 18.1569 17.8452 17.8443C18.1577 17.5317 18.3333 17.1078 18.3333 16.6658V9.99912H10.8333V16.6658H9.16666V9.99912H1.66666Z"
    ></path>
  </svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5.41667 6.24935C5.41667 5.03377 5.89955 3.86798 6.75909 3.00844C7.61864 2.1489 8.78442 1.66602 10 1.66602C11.2156 1.66602 12.3814 2.1489 13.2409 3.00844C14.1004 3.86798 14.5833 5.03377 14.5833 6.24935C14.5833 7.46492 14.1004 8.63071 13.2409 9.49026C12.3814 10.3498 11.2156 10.8327 10 10.8327C8.78442 10.8327 7.61864 10.3498 6.75909 9.49026C5.89955 8.63071 5.41667 7.46492 5.41667 6.24935ZM2.5 15.8327C2.5 14.7276 2.93899 13.6678 3.72039 12.8864C4.50179 12.105 5.5616 11.666 6.66667 11.666H13.3333C14.4384 11.666 15.4982 12.105 16.2796 12.8864C17.061 13.6678 17.5 14.7276 17.5 15.8327V18.3327H2.5V15.8327Z"
    ></path>
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
      d="M15.4716 11.9992C15.4132 11.9289 15.3559 11.8586 15.2996 11.7907C14.5262 10.8552 14.0583 10.2906 14.0583 7.64227C14.0583 6.27117 13.7303 5.14617 13.0837 4.30242C12.607 3.6791 11.9626 3.20625 11.1132 2.8568C11.1023 2.85072 11.0925 2.84274 11.0844 2.83324C10.7789 1.8102 9.94289 1.125 9 1.125C8.05711 1.125 7.22144 1.8102 6.91594 2.83219C6.9078 2.84135 6.89817 2.84908 6.88746 2.85504C4.90535 3.67102 3.94207 5.23652 3.94207 7.64121C3.94207 10.2906 3.47484 10.8552 2.7007 11.7896C2.64445 11.8575 2.58715 11.9264 2.52879 11.9981C2.37804 12.1799 2.28252 12.4011 2.25355 12.6355C2.22458 12.8699 2.26336 13.1077 2.36531 13.3207C2.58222 13.7777 3.04453 14.0614 3.57222 14.0614H14.4316C14.9569 14.0614 15.416 13.7781 15.6336 13.3232C15.736 13.1101 15.7752 12.8721 15.7464 12.6374C15.7177 12.4028 15.6223 12.1813 15.4716 11.9992ZM9 16.875C9.50802 16.8746 10.0065 16.7367 10.4424 16.4759C10.8784 16.2152 11.2357 15.8413 11.4764 15.3939C11.4877 15.3724 11.4933 15.3484 11.4927 15.3242C11.492 15.2999 11.485 15.2763 11.4725 15.2555C11.46 15.2347 11.4423 15.2176 11.4212 15.2056C11.4001 15.1937 11.3762 15.1875 11.352 15.1875H6.64875C6.62446 15.1874 6.60057 15.1936 6.5794 15.2055C6.55822 15.2174 6.54049 15.2346 6.52792 15.2554C6.51536 15.2761 6.50838 15.2998 6.50769 15.3241C6.50699 15.3484 6.51259 15.3724 6.52394 15.3939C6.7646 15.8412 7.12183 16.2151 7.55775 16.4758C7.99367 16.7366 8.49204 16.8745 9 16.875Z"
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

// Define types for menu items - 'active' property removed as it's now determined dynamically
interface SubMenuItem {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href: string;
  // `icon` sekarang bisa berupa komponen React (React.FC) atau string (untuk jalur gambar jika kamu memutuskan menggunakan <img>)
  icon: React.FC | string;
  submenu?: SubMenuItem[];
  initiallyOpen?: boolean;
}

const menuItems: MenuItem[] = [
  // Gunakan komponen React yang diimpor untuk Chart
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
  const location = useLocation(); // Use useLocation hook to get current path
  const currentPath = location.pathname;

  // State to manage which submenus are currently open
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

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

  // Function to toggle submenu open/close state
  const handleToggleSubmenu = (menuName: string) => {
    setOpenSubmenus((prev) => (prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName]));
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
                        // Meneruskan className langsung ke komponen SVG
                        <menuItem.icon />
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
                      <menuItem.icon />
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
        <button className="flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg w-full">
          <LogoutIcon />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
