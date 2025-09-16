import { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";

export const UrgencyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    // Check if banner was dismissed today
    const dismissed = localStorage.getItem('urgency-banner-dismissed');
    const today = new Date().toDateString();
    
    if (dismissed === today) {
      setIsVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 24 hours
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('urgency-banner-dismissed', new Date().toDateString());
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
        <Clock className="h-5 w-5 animate-pulse" />
        <div className="flex items-center space-x-2 text-sm md:text-base font-bold">
          <span>⚡ Limited Time Offer:</span>
          <span className="bg-white/20 px-2 py-1 rounded">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span>Free Priority Support + Fast Delivery!</span>
        </div>
        <button
          onClick={handleDismiss}
          className="absolute right-4 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};