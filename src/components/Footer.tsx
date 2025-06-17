
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/lovable-uploads/31d847f2-6d21-4c6b-bf8f-34eabd0a5cc7.png" 
              alt="Diva Secret International" 
              className="h-16 w-auto mb-6"
            />
            <p className="text-gray-300 leading-relaxed mb-6">
              Transforming lives through revolutionary stem cell technology. 
              Diva Secret International brings you natural wellness solutions 
              that repair, restore, and rejuvenate at the cellular level.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1Eg5bPf487/?mibextid=qi2Omg" className="text-gray-400 hover:text-white transition-colors">
                📘 Facebook
              </a>
              <a href="https://instagram.com/YOUR_HANDLE" className="text-gray-400 hover:text-white transition-colors">
                📷 Instagram
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#product" className="text-gray-300 hover:text-white transition-colors">Product</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">
                📞 <a href="https://wa.me/27734247729" className="hover:text-white transition-colors">073 424 7729</a>
              </li>
              <li className="text-gray-300">
                🌐 <a href="http://Divabyfay.com" className="hover:text-white transition-colors">Divabyfay.com</a>
              </li>
              <li className="text-gray-300">📍 South Africa</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Diva Secret International. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Disclaimer</a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              *This product is not intended to diagnose, treat, cure, or prevent any disease. 
              Results may vary. Consult your healthcare provider before starting any supplement regimen.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
