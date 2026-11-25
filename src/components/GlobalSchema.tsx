import React from "react";
import { siteConfig } from "../data/siteConfig";

/**
 * Reusable Global Schema Component for Google Search, Google AI Overviews, and GEO (Perplexity/ChatGPT)
 * 
 * PLACEHOLDERS MAPPING:
 * - [CLINIC_NAME]: siteConfig.name / "Terai Diagnostic & Medical Center"
 * - [NEPAL_CITY_AND_WARD]: "Birgunj-4, Main Road Birta (Opposite 10-Storey Building), Parsa, Nepal"
 * - [LATITUDE]: 27.0134
 * - [LONGITUDE]: 84.8785
 * - [PHONE_NUMBER]: "+977-9816295312"
 * - [OPENING_HOURS]: "Mo-Su 07:00-22:00"
 * - [PRICE_RANGE]: "NPR"
 * - [AREA_SERVED]: "Nepal"
 */
export const GlobalSchema: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["DiagnosticLab", "MedicalClinic", "LocalBusiness"],
        "@id": "https://teraidiagnosticsandmedicalcenter.com/#clinic",
        "name": siteConfig.name, // [CLINIC_NAME]
        "alternateName": [
          siteConfig.nameNepali,
          "Terai Diagnostic Center",
          "TDMC Birgunj",
          "Try Diagnostics and Medical Center"
        ],
        "url": "https://teraidiagnosticsandmedicalcenter.com",
        "logo": "https://teraidiagnosticsandmedicalcenter.com/uploads/logo/logo-icon.svg",
        "image": [
          "https://teraidiagnosticsandmedicalcenter.com/uploads/banners/folder_front_cover.jpg",
          "https://teraidiagnosticsandmedicalcenter.com/uploads/banners/folder_services_page.jpg",
          "https://teraidiagnosticsandmedicalcenter.com/uploads/leadership/saheb-sah.png",
          "https://teraidiagnosticsandmedicalcenter.com/uploads/leadership/bablu-sah.jpg"
        ],
        "description": "Premier ISO-standard medical pathology and diagnostic center in Birgunj-4, Nepal. Offering computerized blood tests, hormonal profiles, digital X-ray, 3D/4D ultrasound, ECG, dental clinic, eye OPD, and free home blood sample collection across Parsa district.",
        "telephone": siteConfig.phones.primary, // [PHONE_NUMBER]
        "email": siteConfig.email,
        "priceRange": "NPR", // [PRICE_RANGE]
        "currenciesAccepted": "NPR",
        "paymentAccepted": "Cash, Fonepay, eSewa, Khalti, Mobile Banking QR",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": `${siteConfig.address.street}, ${siteConfig.address.landmark}`, // [NEPAL_CITY_AND_WARD]
          "addressLocality": siteConfig.address.city,
          "addressRegion": "Madhesh Province",
          "postalCode": "44300",
          "addressCountry": "NP"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.0134, // [LATITUDE]
          "longitude": 84.8785 // [LONGITUDE]
        },
        "hasMap": "https://maps.google.com/?q=Birta,+Birgunj,+Nepal",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Nepal", // [AREA_SERVED]
          "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": "Parsa District, Madhesh Province"
          }
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "07:00",
            "closes": "22:00" // [OPENING_HOURS] (7:00 AM - 10:00 PM Everyday)
          }
        ],
        "medicalSpecialty": [
          "https://schema.org/Pathology",
          "https://schema.org/Radiology",
          "https://schema.org/Cardiovascular",
          "https://schema.org/Dentistry"
        ],
        "founder": {
          "@type": "Person",
          "name": "Mr. Saheb Sah Kanu",
          "jobTitle": "Senior Medical Lab Technologist & Legal Advisor",
          "alumniOf": "Dehradun (UK India)",
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "degree",
              "name": "B.Sc. MLT (Medical Laboratory Technology)"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "professional registration",
              "name": "NHPC No: A3912 MLT",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Nepal Health Professional Council (NHPC)"
              }
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "degree",
              "name": "L.L.B. (Lawyer)"
            }
          ]
        },
        "director": {
          "@type": "Person",
          "name": "Mr. Bablu Sah Kanu",
          "jobTitle": "Managing Director",
          "sameAs": "https://www.facebook.com/bablu.sah.22241"
        },
        "sameAs": [
          siteConfig.socials.facebook,
          "https://www.facebook.com/bablu.sah.22241"
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
