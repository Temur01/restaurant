import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 text-white sticky top-0 z-50 shadow-xl">
      {/* Top Bar */}
      <div className="bg-black bg-opacity-20 py-2">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +998 20 005-10-11
              </span>
              <span className="hidden md:flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +998 20 005-50-11
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-orange-100">Ochiq: Har kuni 08:00-24:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col items-center justify-center">
          {/* <img 
            src="/src/assets/logo.JPG" 
            alt="Beyougli Karshi Logo" 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg mb-3"
          /> */}
          <div className='text-center'>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Beyoglu Karshi</h1>
            <p className="text-orange-100 text-xs sm:text-sm mt-0.5">Turkiya taomlari | Fast Food | Nonushta</p>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="relative h-4 sm:h-6">
        <svg className="absolute bottom-0 w-full h-4 sm:h-6" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#f3f4f6"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#f3f4f6"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f3f4f6"></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;

