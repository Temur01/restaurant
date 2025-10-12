import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 3a1 1 0 011-1h6a1 1 0 011 1v1h3a1 1 0 110 2h-.5l-.77 8.47a2 2 0 01-1.99 1.86H7.26a2 2 0 01-1.99-1.86L4.5 6H4a1 1 0 010-2h3V3zm2 0h4v1H8V3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Beyougli Karshi</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Yangi va mahalliy mahsulotlardan tayyorlangan mazali taomlarni taqdim etamiz. 
              Har bir luqmada kulinariya san'atini his eting.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Tez havolalar</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-orange-500">→</span> Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-orange-500">→</span> Menyu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-orange-500">→</span> Biz haqimizda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-orange-500">→</span> Bron qilish
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-2">
                  <span className="text-orange-500">→</span> Aloqa
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Bog'lanish</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Qarshi shahri,<br />Nasaf ko'chasi, 123-uy</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm">+998 99 123-45-67</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm">info@beyouglikarshi.uz</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Ish vaqti</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-400">Har kuni:</span>
                <span className="text-white font-semibold">08:00 - 24:00</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <p className="text-white text-sm font-semibold mb-2">Yangiliklar obunasi</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email manzilingiz" 
                  className="flex-1 px-3 py-2 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-orange-500 px-4 py-2 rounded font-bold hover:bg-gray-100 transition-colors duration-300">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © 2025 Beyougli Karshi. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                Maxfiylik siyosati
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                Foydalanish shartlari
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                Cookie siyosati
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

