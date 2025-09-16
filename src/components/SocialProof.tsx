import { useState, useEffect } from "react";
import { Users, ShoppingCart, MapPin } from "lucide-react";

export const SocialProof = () => {
  const [visitorCount, setVisitorCount] = useState(247);
  const [recentOrders, setRecentOrders] = useState([
    { name: "Sarah M.", location: "Cape Town", time: "2 minutes ago", package: "Silver" },
    { name: "John D.", location: "Johannesburg", time: "5 minutes ago", package: "Bronze" },
    { name: "Mary L.", location: "Durban", time: "8 minutes ago", package: "Gold" },
  ]);

  useEffect(() => {
    // Simulate real-time visitor updates
    const visitorTimer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);

    // Rotate recent orders
    const orderTimer = setInterval(() => {
      const names = ["Lisa K.", "David P.", "Emma S.", "Michael R.", "Sarah T.", "James W."];
      const locations = ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein"];
      const packages = ["Starter", "Bronze", "Silver", "Gold"];
      
      setRecentOrders(prev => {
        const newOrder = {
          name: names[Math.floor(Math.random() * names.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          time: "Just now",
          package: packages[Math.floor(Math.random() * packages.length)]
        };
        
        return [newOrder, ...prev.slice(0, 2).map(order => ({
          ...order,
          time: order.time === "Just now" ? "2 minutes ago" : 
                order.time === "2 minutes ago" ? "5 minutes ago" : "8 minutes ago"
        }))];
      });
    }, 12000);

    return () => {
      clearInterval(visitorTimer);
      clearInterval(orderTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-20 left-4 z-40 space-y-3">
      {/* Live Visitor Counter */}
      <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-200 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <Users className="h-4 w-4 text-green-600" />
          <div className="text-sm">
            <span className="font-bold text-green-600">{visitorCount}</span>
            <span className="text-gray-600"> people viewing now</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      {recentOrders.slice(0, 1).map((order, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-3 border border-gray-200 max-w-xs animate-fade-in">
          <div className="flex items-start space-x-2">
            <ShoppingCart className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-semibold text-gray-800">{order.name}</div>
              <div className="text-purple-600 font-medium">{order.package} Package</div>
              <div className="flex items-center text-gray-500 text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {order.location} • {order.time}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};