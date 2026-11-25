import React from "react";
import { Home, Activity, Package, UserCheck, Calendar } from "lucide-react";

interface MobileBottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPath,
  onNavigate,
  onOpenBooking,
}) => {
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Tests", path: "/tests", icon: Activity },
    { label: "Packages", path: "/packages", icon: Package },
    { label: "Doctors", path: "/doctors", icon: UserCheck },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Quick Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] xl:hidden py-1.5 px-3 flex items-center justify-between transition-transform duration-300"
    >
      {/* Quick Nav Links */}
      <div className="flex items-center justify-around flex-1 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/"
              ? currentPath === "/" || currentPath === ""
              : currentPath === item.path || currentPath.startsWith(item.path);

          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-teal-800 font-extrabold scale-105"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  isActive ? "bg-teal-50 text-teal-700" : "text-slate-500"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Primary Action Button: 1-Tap Booking */}
      <div className="pl-2 border-l border-slate-100">
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl shadow-sm active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-0.5">Book</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
