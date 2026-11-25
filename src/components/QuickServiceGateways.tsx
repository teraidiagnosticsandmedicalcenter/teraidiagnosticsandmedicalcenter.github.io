import React from "react";
import { Activity, Package, UserCheck, Stethoscope, ArrowRight, Sparkles } from "lucide-react";

interface QuickServiceGatewaysProps {
  onNavigate: (path: string) => void;
}

export const QuickServiceGateways: React.FC<QuickServiceGatewaysProps> = ({ onNavigate }) => {
  const gateways = [
    {
      title: "100+ Diagnostic Tests",
      titleNepali: "सम्पूर्ण ल्याब परीक्षणहरू",
      description: "Blood glucose, thyroid, lipid, kidney & liver panels with transparent NPR rates.",
      badge: "Free Home Collection",
      path: "/tests",
      icon: Activity,
      color: "from-teal-500/10 to-teal-500/5",
      borderColor: "border-teal-200/80 hover:border-teal-400",
      iconBg: "bg-teal-50 text-teal-700",
      cta: "Search Tests & Pricing"
    },
    {
      title: "Preventive Health Packages",
      titleNepali: "स्वास्थ्य जाँच प्याकेजहरू",
      description: "Whole Body Profile, Diabetic Checkup & Cardiac Wellness at subsidized rates.",
      badge: "Save up to 40%",
      path: "/packages",
      icon: Package,
      color: "from-emerald-500/10 to-emerald-500/5",
      borderColor: "border-emerald-200/80 hover:border-emerald-400",
      iconBg: "bg-emerald-50 text-emerald-700",
      cta: "Compare Packages"
    },
    {
      title: "Consultant Doctors OPD",
      titleNepali: "विशेषज्ञ डाक्टरहरूको ओ.पि.डी.",
      description: "Visiting specialist surgeons, gynecologists, physicians & sonologists.",
      badge: "Active Roster",
      path: "/doctors",
      icon: UserCheck,
      color: "from-blue-500/10 to-blue-500/5",
      borderColor: "border-blue-200/80 hover:border-blue-400",
      iconBg: "bg-blue-50 text-blue-700",
      cta: "View OPD Schedules"
    },
    {
      title: "Advanced Lab Facilities",
      titleNepali: "आधुनिक डाइग्नोष्टिक सुविधाहरू",
      description: "Automated pathology, digital X-Ray, 3D/4D ultrasound, ECG, dental & eye care.",
      badge: "ISO Calibrated",
      path: "/facilities",
      icon: Stethoscope,
      color: "from-amber-500/10 to-amber-500/5",
      borderColor: "border-amber-200/80 hover:border-amber-400",
      iconBg: "bg-amber-50 text-amber-700",
      cta: "Explore Facilities"
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Direct Clinical Gateways</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Can We Care for You Today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Quickly navigate directly to test pricing, checkup packages, doctor schedules, or clinical technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {gateways.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => onNavigate(item.path)}
                className={`group cursor-pointer rounded-2xl p-5 sm:p-6 border bg-gradient-to-br ${item.color} ${item.borderColor} shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-700 border border-slate-200/80 shadow-2xs">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {item.titleNepali}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                  <span>{item.cta}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickServiceGateways;
