
import { useState } from "react";

export const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <footer className="bg-emerald-950 text-white py-12">
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
              <a href="https://www.instagram.com/divabyfay/" className="text-gray-400 hover:text-white transition-colors">
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
                📞 <a href="https://wa.me/27679820321" className="hover:text-white transition-colors">+27 67 982 0321</a>
              </li>
              <li className="text-gray-300">
                🌐 <a href="http://Divabyfay.com" className="hover:text-white transition-colors">Divabyfay.com</a>
              </li>
              <li className="text-gray-300">📍 South Africa</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="mb-6 text-center">
            <p className="text-red-400 font-bold text-lg">NO REFUNDS POLICY</p>
            <p className="text-gray-300 text-sm mt-2">All sales are final. Membership fees and product purchases are non-refundable.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Diva Secret International. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <button onClick={() => setShowPrivacyPolicy(true)} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setShowTerms(true)} className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</button>
              <button onClick={() => setShowDisclaimer(true)} className="text-gray-400 hover:text-white transition-colors">Disclaimer</button>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              *This product is not intended to diagnose, treat, cure, or prevent any disease. 
              Results may vary. Consult your healthcare provider before starting any supplement regimen.
            </p>
          </div>
        </div>

        {/* Terms & Conditions Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Terms and Conditions</h2>
                <button onClick={() => setShowTerms(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
              </div>
              <div className="text-gray-700 space-y-4">
                <p><strong>Last Updated:</strong> 2025/08/03</p>
                
                <h3 className="text-lg font-semibold">1. Introduction</h3>
                <p>Welcome to Diva Secret International ("we," "us," or "our"). These Terms and Conditions govern your use of our website (https://divasecretintl.com/) and any purchases or participation in our network marketing business. By accessing or using our site, you agree to comply with these terms.</p>

                <h3 className="text-lg font-semibold">2. Business Opportunity</h3>
                <p>Our Business In a Box program offers membership packages (Starter, Silver, etc.) that include digital assets such as capture pages and websites.</p>
                <p>Earnings and success depend on individual effort, market conditions, and business skills. We do not guarantee income.</p>
                <p>Membership fees are non-refundable unless otherwise stated.</p>

                <h3 className="text-lg font-semibold">3. Product Purchases</h3>
                <p>Diva Secret Stem Cells products are sold as dietary supplements or cosmetics (depending on claims).</p>
                <p>These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
                <p>We reserve the right to limit quantities, reject orders, or discontinue products at any time.</p>

                <h3 className="text-lg font-semibold">4. Network Marketing Policies</h3>
                <p>Distributors must comply with our Compensation Plan and Marketing Guidelines.</p>
                <p>Spamming, false claims, or unethical marketing practices are prohibited and may result in termination.</p>
                <p>We are not responsible for disputes between distributors or third-party transactions.</p>

                <h3 className="text-lg font-semibold">5. Intellectual Property</h3>
                <p>All content (logos, text, images) on our site is owned by Diva Secret International and protected by copyright laws.</p>
                <p>Unauthorized use, duplication, or distribution is strictly prohibited.</p>

                <h3 className="text-lg font-semibold">6. Limitation of Liability</h3>
                <p>We are not liable for any direct, indirect, or consequential damages arising from the use of our products or website.</p>
                <p>We do not guarantee uninterrupted or error-free website access.</p>

                <h3 className="text-lg font-semibold">7. Governing Law</h3>
                <p>These Terms are governed by the laws of South Africa. Any disputes will be resolved in the courts of South Africa.</p>

                <h3 className="text-lg font-semibold">8. Changes to Terms</h3>
                <p>We may update these Terms at any time. Continued use of the site constitutes acceptance of changes.</p>

                <h3 className="text-lg font-semibold">Contact Us:</h3>
                <p>For questions, email divabyfay@gmail.com or call +27 67 982 0321.</p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Policy Modal */}
        {showPrivacyPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
                <button onClick={() => setShowPrivacyPolicy(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
              </div>
              <div className="text-gray-700 space-y-4 prose max-w-none">
                <p><strong>Last updated:</strong> August 03, 2025</p>
                <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
                <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
                
                <h3>Interpretation and Definitions</h3>
                <h4>Interpretation</h4>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                
                <h4>Definitions</h4>
                <p>For the purposes of this Privacy Policy:</p>
                <ul>
                  <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                  <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Divabyfay.</li>
                  <li><strong>Country</strong> refers to: South Africa</li>
                  <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                  <li><strong>Service</strong> refers to the Website.</li>
                  <li><strong>Website</strong> refers to Divabyfay, accessible from <a href="http://www.divabyfay.com" target="_blank" rel="noopener noreferrer">http://www.divabyfay.com</a></li>
                </ul>

                <h3>Collecting and Using Your Personal Data</h3>
                <h4>Types of Data Collected</h4>
                <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
                <ul>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Usage Data</li>
                </ul>

                <h3>Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                <ul>
                  <li>By email: divabyfay@gmail.com</li>
                  <li>By phone number: +27 67 982 0321</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer Modal */}
        {showDisclaimer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
                <button onClick={() => setShowDisclaimer(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
              </div>
              <div className="text-gray-700 space-y-4">
                <p><strong>Last Updated:</strong> 2025/08/03</p>
                
                <h3 className="text-lg font-semibold">1. Product & Health Disclaimer</h3>
                <p>The statements regarding Diva Secret Stem Cells products have not been evaluated by the South African Health Products Regulatory Authority (SAHPRA) or other relevant regulatory body. These products are not intended to diagnose, treat, cure, or prevent any disease. All testimonials and before/after results reflect individual experiences and do not guarantee similar outcomes. Scientific research on stem cell technology is ongoing; our products are marketed as cosmetic or dietary supplements only. Consult a licensed physician before use, especially if pregnant, nursing, or under medical treatment.</p>

                <h3 className="text-lg font-semibold">2. Business Opportunity Disclaimer</h3>
                <p>Participation in the Diva Secret International network marketing program is not a guarantee of income. Success depends on individual effort, market conditions, and business acumen. The "Business In a Box" (including capture pages and websites) provides tools, but earnings are contingent on active sales and team building. Any income examples are illustrative only.</p>

                <h3 className="text-lg font-semibold">3. Financial & Legal Liability</h3>
                <p>Diva Secret International and its affiliates are not responsible for financial losses, health issues, or disputes arising from product use or business operations.</p>
                <p>Distributors are independent contractors, not employees, and are solely responsible for complying with local business and tax laws.</p>

                <h3 className="text-lg font-semibold">4. Intellectual Property</h3>
                <p>Unauthorized use of Diva Secret's trademarks, product images, or marketing materials is prohibited. Distributors must adhere to the company's official compliance policies.</p>

                <h3 className="text-lg font-semibold">5. External Content</h3>
                <p>This website may link to third-party sites. We do not endorse or assume liability for their content, privacy practices, or claims.</p>

                <h3 className="text-lg font-semibold">Contact:</h3>
                <p>For questions, email divabyfay@gmail.com or call: +27 67 982 0321</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </footer>
  );
};
