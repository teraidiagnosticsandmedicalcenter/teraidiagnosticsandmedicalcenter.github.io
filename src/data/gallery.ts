export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "facility" | "laboratory" | "banners" | "videos";
  type: "image" | "video";
  url: string;
  caption: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "banner-calendar",
    title: "Official Center Calendar & Services Poster",
    category: "banners",
    type: "image",
    url: "/uploads/banners/calendar_poster.png",
    caption: "Comprehensive services list, leadership credentials, and calendar of Terai Diagnostic & Medical Center."
  },
  {
    id: "banner-brochure-front",
    title: "Official Patient Folder Cover & Doctors Directory",
    category: "banners",
    type: "image",
    url: "/uploads/banners/folder_front_cover.jpg",
    caption: "Official front cover featuring microscope emblem, leadership registration, clinical collage, and patient slip."
  },
  {
    id: "banner-brochure-services",
    title: "Official 18 Medical Services & Diagnostic Panels",
    category: "banners",
    type: "image",
    url: "/uploads/banners/folder_services_page.jpg",
    caption: "Detailed brochure listing of all 18 clinical departments, home sample collection, and laboratory imaging facilities."
  },
  {
    id: "clinic-qr-code",
    title: "Official Clinic QR Code (Scan to Visit)",
    category: "banners",
    type: "image",
    url: "/uploads/qr/terai-diagnostic-official-qr-stand.png",
    caption: "High-resolution printable QR code stand for clinic front desk, OPD, and patient reports."
  },
  {
    id: "banner-card",
    title: "Specialties & Facilities Information Card",
    category: "banners",
    type: "image",
    url: "/uploads/banners/banner_card.png",
    caption: "Director details, discount information, and types of doctors available at Birgunj-4 Birta."
  },
  {
    id: "leader-photo",
    title: "Mr. Saheb Sah Kanu (Sr. Medical Lab Technologist)",
    category: "facility",
    type: "image",
    url: "/uploads/leadership/saheb-sah.png",
    caption: "NHPC Registered Technologist (A3912 MLT) & Advocate ensuring clinical diagnostic accuracy."
  },
  {
    id: "leader-photo-bablu",
    title: "Mr. Bablu Sah Kanu (Managing Director)",
    category: "facility",
    type: "image",
    url: "/uploads/leadership/bablu-sah.jpg",
    caption: "Managing Director overseeing patient accessibility, community outreach, and home collection operations."
  }
];
