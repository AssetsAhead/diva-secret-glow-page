import { Shield, CheckCircle, Clock } from "lucide-react";

export const GuaranteeBadge = () => {
  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-4 shadow-2xl border-4 border-white max-w-xs">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-2 text-white" />
          <div className="font-bold text-lg mb-1">100% MONEY-BACK</div>
          <div className="font-bold text-lg mb-2">GUARANTEE</div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Risk-free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Full refund if not satisfied</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>30-day guarantee period</span>
            </div>
          </div>
          
          <div className="mt-3 text-xs bg-white/20 rounded-lg p-2">
            Try Diva Secret completely risk-free!
          </div>
        </div>
      </div>
    </div>
  );
};