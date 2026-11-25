import React, { useEffect } from "react";
import { ArrowLeft, Home, Calendar, Phone, Sparkles, Share2 } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export interface SectionMeta {
  id: "about" | "facilities" | "tests" | "packages" | "departments" | "doctors" | "gallery" | "contact";
  title: string;
  titleNepali: string;
  seoTitle: string;
  description: string;
  schemaType: string;
}

export const sectionMetaMap: Record<string, SectionMeta> = {
  about: {
    id: "about",
    title: "About Leadership & Legal Credentials",
    titleNepali: "व्यवस्थापन तथा नेतृत्व",
    seoTitle: "About Leadership, NHPC Credentials & Mission | Terai Diagnostic Birgunj",
    description: "Meet Senior Medical Technologist Saheb Sah Kanu (NHPC: A3912 MLT, L.L.B.) and Managing Director Bablu Sah Kanu at Terai Diagnostic & Medical Center Birgunj.",
    schemaType: "AboutPage"
  },
  facilities: {
    id: "facilities",
    title: "Diagnostic Facilities & Advanced Lab Technology",
    titleNepali: "उपलब्ध सेवा तथा सुविधाहरू",
    seoTitle: "Diagnostic Facilities: Pathology, Digital X-Ray & Ultrasound | Terai Diagnostic Birgunj",
    description: "State-of-the-art diagnostic facilities in Birgunj-4: automated biochemistry, hematology, digital X-ray, 3D/4D ultrasound, computerized ECG, dental, and eye OPD.",
    schemaType: "MedicalWebPage"
  },
  tests: {
    id: "tests",
    title: "Diagnostic Tests & Pathology Directory",
    titleNepali: "सम्पूर्ण ल्याब परीक्षणहरू",
    seoTitle: "Find & Book Diagnostic Tests with Transparent NPR Pricing | Terai Diagnostic Birgunj",
    description: "Search 100+ diagnostic laboratory tests with transparent Nepal pricing, preparation rules, turnaround times, and free home blood sample collection in Birgunj.",
    schemaType: "CollectionPage"
  },
  packages: {
    id: "packages",
    title: "Preventive Health Checkup Packages",
    titleNepali: "स्वास्थ्य जाँच प्याकेजहरू",
    seoTitle: "Preventive Health Checkup Packages & Prices in Nepal | Terai Diagnostic Birgunj",
    description: "Comprehensive health checkup packages: Whole Body Profile, Diabetic Checkup, Cardiac Profile, Senior Citizen Care at subsidized NPR rates with home collection.",
    schemaType: "MedicalWebPage"
  },
  departments: {
    id: "departments",
    title: "17+ Specialized Clinical Departments",
    titleNepali: "हाम्रा सेवा तथा विभागहरू",
    seoTitle: "17+ Clinical & Medical Specialty Departments | Terai Diagnostic Birgunj",
    description: "Explore clinical services: Pathology, Gynecology, Urology, Surgery, Orthopedics, Cardiology, ENT, Dentistry, Physiotherapy, and Radiology in Birgunj.",
    schemaType: "MedicalWebPage"
  },
  doctors: {
    id: "doctors",
    title: "Consultant Doctors & Visiting OPD Rosters",
    titleNepali: "विशेषज्ञ डाक्टरहरूको ओ.पि.डी.",
    seoTitle: "Consultant Doctors & Visiting OPD Rosters in Birgunj | Terai Diagnostic",
    description: "Schedule consultations with leading consultant physicians, surgeons, gynecologists, radiologists, and pathologists in Birgunj-4, Nepal.",
    schemaType: "MedicalWebPage"
  },
  gallery: {
    id: "gallery",
    title: "Clinic Gallery, Facility Photos & Official Publications",
    titleNepali: "फोटो तथा सूचना ग्यालरी",
    seoTitle: "Official Clinic Photos, Folders & Notices | Terai Diagnostic Birgunj",
    description: "View authentic clinic photographs, official patient service folders, laboratory automation equipment, and health announcements.",
    schemaType: "ImageGallery"
  },
  contact: {
    id: "contact",
    title: "Contact, Clinic Location & Operating Hours",
    titleNepali: "सम्पर्क तथा ठेगाना",
    seoTitle: "Contact Us, Location Map & 7am-10pm Everyday Hours | Terai Diagnostic Birgunj",
    description: "Contact Terai Diagnostic & Medical Center on Main Road Birta, Birgunj-4, Nepal. Phone: +977 9816295312. Open 7:00 AM – 10:00 PM every day.",
    schemaType: "ContactPage"
  }
};

interface SectionPageViewProps {
  sectionId: "about" | "facilities" | "tests" | "packages" | "departments" | "doctors" | "gallery" | "contact";
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateSection: (section: string) => void;
  onOpenBooking: (itemName?: string) => void;
}

export const SectionPageView: React.FC<SectionPageViewProps> = ({
  sectionId,
  children,
  onNavigateHome,
  onNavigateSection,
  onOpenBooking
}) => {
  const meta = sectionMetaMap[sectionId] || sectionMetaMap.about;

  useEffect(() => {
    const originalTitle = document.title;
    document.title = meta.seoTitle;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      document.title = originalTitle;
    };
  }, [meta]);

  const navSections = [
    { id: "about", label: "About Leadership" },
    { id: "facilities", label: "Facilities" },
    { id: "tests", label: "Tests Catalog" },
    { id: "packages", label: "Health Packages" },
    { id: "departments", label: "Departments" },
    { id: "doctors", label: "Doctors OPD" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact & Location" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://teraidiagnosticsandmedicalcenter.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": meta.title,
        "item": `https://teraidiagnosticsandmedicalcenter.com/${sectionId}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Schema.org BreadcrumbList Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap"
          >
            <button
              onClick={onNavigateHome}
              className="text-slate-600 hover:text-teal-700 font-semibold flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-teal-800 truncate">
              {meta.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Full Homepage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner for Section */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white py-8 sm:py-12 border-b border-teal-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Terai Diagnostic & Medical Center • Birgunj-4, Nepal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {meta.title}
          </h1>

          <p className="text-teal-200 font-semibold text-sm sm:text-base">
            {meta.titleNepali}
          </p>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white">
        {children}
      </div>

      {/* Quick Other Sections Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 text-center">
          Explore Other Departments &amp; Services
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {navSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onNavigateSection(sec.id)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
                sec.id === sectionId
                  ? "bg-teal-800 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {sec.label}
            </button>
          ))}
          <button
            onClick={onNavigateHome}
            className="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
          >
            ← Back to All Sections
          </button>
        </div>
      </div>
    </div>
  );
};
