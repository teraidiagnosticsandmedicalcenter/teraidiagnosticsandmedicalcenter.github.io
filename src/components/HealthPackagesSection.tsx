import React from "react";
import { CheckCircle2, ShieldCheck, Heart, Sparkles, ArrowRight, Clock } from "lucide-react";
import { healthPackagesData } from "../data/packages";
import { siteConfig } from "../data/siteConfig";

interface PackagesProps {
  onOpenBooking: (packageName?: string) => void;
  isTeaser?: boolean;
  onViewAll?: () => void;
}

export const HealthPackagesSection: React.FC<PackagesProps> = ({
  onOpenBooking,
  isTeaser = false,
  onViewAll
}) => {
  const displayedPackages = isTeaser ? healthPackagesData.slice(0, 2) : healthPackagesData;

  return (
    <section id="packages" className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 via-teal-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Preventive Healthcare Checkups</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Health Packages
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Curated panels designed for early illness detection, chronic disease tracking, and peace of mind for you and your family.
          </p>
        </div>

        {/* Packages Grid */}
        <div className={`grid grid-cols-1 ${isTeaser ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6 sm:gap-8 items-stretch`}>
          {displayedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between relative bg-white border ${
                pkg.popular
                  ? "border-teal-500 shadow-xl shadow-teal-700/10 ring-2 ring-teal-500/20"
                  : "border-slate-200 shadow-card hover:shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                  ★ Popular Choice
                </div>
              )}

              <div className="space-y-4">
                {/* Header */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {pkg.badge}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug mt-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    {pkg.nameNepali}
                  </p>
                </div>

                {/* Test Count & Fasting */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 py-2 border-y border-slate-100">
                  <div className="flex items-center gap-1.5 text-teal-700">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{pkg.testCount} Key Parameters</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{pkg.fastingNote}</span>
                  </div>
                </div>

                {/* Ideal For */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Ideal For:</strong> {pkg.idealFor}
                </p>

                {/* Tests Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-700 block">Includes Key Tests:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pkg.includes.slice(0, 6).map((test: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{test}</span>
                      </li>
                    ))}
                    {pkg.includes.length > 6 && (
                      <li className="text-[11px] font-bold text-teal-700 pl-5">
                        + {pkg.includes.length - 6} more specialized tests
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => onOpenBooking(pkg.name)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    pkg.popular
                      ? "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md hover:shadow-teal-500/20"
                      : "bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-700"
                  }`}
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  Home collection available in Birgunj
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Teaser "View All" CTA Banner */}
        {isTeaser && onViewAll && (
          <div className="mt-10 text-center">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-teal-800 border-2 border-teal-300 font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-xs hover:shadow-md transition-all"
            >
              <span>Compare All 4 Packages &amp; Full Biomarker Profiles</span>
              <ArrowRight className="w-4 h-4 text-teal-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HealthPackagesSection;
