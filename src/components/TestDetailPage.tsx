import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Phone,
  ShieldCheck,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Share2,
  MapPin,
  Home,
  Activity,
  Check,
  FileText
} from "lucide-react";
import { DiagnosticTest, diagnosticTestsData } from "../data/tests";
import { siteConfig } from "../data/siteConfig";

interface TestDetailPageProps {
  test: DiagnosticTest;
  onOpenBooking: (testName?: string) => void;
  onNavigateHome: () => void;
  onSelectTest: (slug: string) => void;
}

export const TestDetailPage: React.FC<TestDetailPageProps> = ({
  test,
  onOpenBooking,
  onNavigateHome,
  onSelectTest
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Set document title and meta description dynamically
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${test.name} (${test.nameNepali}) in Birgunj, Nepal | Terai Diagnostic`;

    // Scroll to top when test changes
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document.title = originalTitle;
    };
  }, [test]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${test.name} - Terai Diagnostic Birgunj`,
          text: `Check preparation instructions, transparent pricing in NPR, and turnaround time for ${test.name} at Terai Diagnostic & Medical Center, Birgunj-4, Nepal.`,
          url: shareUrl
        });
      } catch {
        // User cancelled or failed share
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Find related tests in the same category (excluding current)
  const relatedTests = diagnosticTestsData
    .filter((t) => t.category === test.category && t.id !== test.id)
    .slice(0, 3);

  // Schema.org MedicalTest + FAQPage + BreadcrumbList JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            "name": "Diagnostic Tests",
            "item": "https://teraidiagnosticsandmedicalcenter.com/#tests"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": test.name,
            "item": `https://teraidiagnosticsandmedicalcenter.com/tests/${test.id}`
          }
        ]
      },
      {
        "@type": "MedicalTest",
        "@id": `https://teraidiagnosticsandmedicalcenter.com/tests/${test.id}#medicalTest`,
        "name": test.name,
        "alternateName": [test.nameNepali],
        "description": test.answerFirstSummary,
        "url": `https://teraidiagnosticsandmedicalcenter.com/tests/${test.id}`,
        "usedToDiagnose": {
          "@type": "MedicalCondition",
          "name": test.clinicalSignificance
        },
        "normalRange": test.normalRange,
        "signOrSymptom": test.description,
        "preparation": test.preparationInstructions.join(" "),
        "itemOffered": {
          "@type": "Offer",
          "price": test.discountedPriceNPR,
          "priceCurrency": "NPR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31"
        },
        "provider": {
          "@type": "DiagnosticLab",
          "name": siteConfig.name,
          "telephone": siteConfig.phones.primary,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": `${siteConfig.address.street}, ${siteConfig.address.landmark}`,
            "addressLocality": siteConfig.address.city,
            "addressRegion": "Madhesh Province",
            "postalCode": "44300",
            "addressCountry": "NP"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://teraidiagnosticsandmedicalcenter.com/tests/${test.id}#faq`,
        "mainEntity": test.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  const discountPercent = Math.round(
    ((test.priceNPR - test.discountedPriceNPR) / test.priceNPR) * 100
  );

  return (
    <article className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Schema.org Injected LD+JSON for Search Bots & Generative Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Top Breadcrumb & Back Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
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
            <button
              onClick={onNavigateHome}
              className="text-slate-600 hover:text-teal-700 font-semibold transition-colors"
            >
              Diagnostic Tests
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-teal-800 truncate max-w-[200px] sm:max-w-none">
              {test.name}
            </span>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
              title="Share this test guide"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {copiedLink ? "Link Copied!" : "Share Guide"}
              </span>
            </button>

            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Tests</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-300">
              {test.category}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>NPR Subsidized Pricing</span>
            </span>
            {test.homeCollection && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                <Home className="w-3 h-3 text-blue-600" />
                <span>Birgunj Home Collection Available</span>
              </span>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {test.name}
            </h1>
            <p className="text-base sm:text-xl font-bold text-teal-800 mt-1.5">
              {test.nameNepali}
            </p>
          </div>
        </header>

        {/* 1. Answer-First Summary Box (Generative Engine Optimization Anchor) */}
        <section
          aria-labelledby="summary-heading"
          className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/90 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-900 uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h2 id="summary-heading">Direct Summary & Quick Facts (Answer-First)</h2>
          </div>

          {/* 2-3 sentence direct answer for Google AI Overviews and Perplexity */}
          <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium mb-6">
            {test.answerFirstSummary}
          </p>

          {/* 4 Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-emerald-200/70 text-xs sm:text-sm">
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-slate-500 font-medium block">Sample Type</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-700" />
                {test.sampleType}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-slate-500 font-medium block">Fasting Rule</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                {test.fastingRequired ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-amber-800">Fasting Needed</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-emerald-800">No Fasting</span>
                  </>
                )}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-slate-500 font-medium block">Report Delivery</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                {test.turnaroundTime}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-slate-500 font-medium block">Doorstep Collection</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-blue-700" />
                {test.homeCollection ? "Available" : "At Clinic Only"}
              </span>
            </div>
          </div>
        </section>

        {/* 2. Transparent Pricing Table & Action Section */}
        <section
          aria-labelledby="pricing-heading"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Transparent Nepal Pricing
              </span>
              <h2 id="pricing-heading" className="text-2xl sm:text-3xl font-black text-slate-900">
                Fee Schedule & Home Collection Details
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                ★ {siteConfig.features.discountNoticeNepali}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-700">
                  <th className="py-3 px-4 font-bold rounded-l-xl">Diagnostic Service</th>
                  <th className="py-3 px-4 font-bold">Regular Price</th>
                  <th className="py-3 px-4 font-bold">Subsidized Price</th>
                  <th className="py-3 px-4 font-bold">Report Format</th>
                  <th className="py-3 px-4 font-bold rounded-r-xl">Collection Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 font-extrabold text-slate-900">
                    {test.name}
                    <div className="text-xs font-semibold text-slate-500">
                      Standard Quality Control Run
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-400 line-through">
                    NPR {test.priceNPR}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-emerald-700">
                        NPR {test.discountedPriceNPR}
                      </span>
                      {discountPercent > 0 && (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-medium text-slate-600">
                    <div>Digital PDF on WhatsApp</div>
                    <div className="text-slate-400">+ Physical Hardcopy</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                      <Check className="w-3 h-3 text-teal-600" />
                      Home or Clinic
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action CTAs */}
          <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-extrabold text-slate-900 text-base">
                Ready to book your test in Birgunj?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Book in 30 seconds. Choose clinic visit or request certified phlebotomist sample collection right at your home.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenBooking(test.name)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Test Now</span>
              </button>
              <a
                href={`tel:${siteConfig.phones.primary}`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-bold text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span className="hidden sm:inline">Call Clinic</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. Clinical Significance & Normal Range Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-teal-800">
              <FileText className="w-5 h-5 text-teal-700" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Clinical Significance & Purpose
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {test.clinicalSignificance}
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Prescribed for clinical diagnosis, routine wellness screening, and treatment response evaluation.
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-teal-800">
              <Activity className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Reference / Normal Values
              </h3>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-800 font-mono leading-relaxed">
              {test.normalRange}
            </div>
            <p className="text-xs text-slate-500 italic">
              Note: Biological reference intervals may vary slightly based on patient age, sex, clinical history, and testing methodologies. Always review reports with your attending physician.
            </p>
          </div>
        </section>

        {/* 4. Preparation Checklist */}
        <section
          aria-labelledby="prep-heading"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 id="prep-heading" className="text-xl sm:text-2xl font-black text-slate-900">
                How to Prepare for Your {test.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Following these instructions ensures accurate, doctor-trusted laboratory results.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {test.preparationInstructions.map((instruction, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Medical E-E-A-T Review Block (Credibility & Regulatory Accreditation) */}
        <section
          aria-labelledby="eeat-heading"
          className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Medical E-E-A-T & Authority Verification</span>
              </div>
              <h2 id="eeat-heading" className="text-xl sm:text-2xl font-bold">
                Medically Reviewed & Validated Protocol
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Last Medically Reviewed: <strong>{test.reviewingSpecialist.lastReviewedDate}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-600/40 border border-teal-400/40 flex items-center justify-center text-teal-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {test.reviewingSpecialist.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-400 font-semibold">
                    {test.reviewingSpecialist.role}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pl-1">
                <p>
                  🎓 <strong>Qualifications:</strong> {test.reviewingSpecialist.degrees}
                </p>
                <p>
                  📜 <strong>Accreditation:</strong> {test.reviewingSpecialist.registrationNumber}
                </p>
                <p>
                  🏛️ <strong>Regulatory Council:</strong> {test.reviewingSpecialist.council}
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-xs text-slate-300 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Quality Assurance & Calibration Standard
              </h4>
              <p className="leading-relaxed">
                All pathological samples are processed via automated analyzers with rigorous daily internal quality control (IQC) and calibration traceable to WHO international standards.
              </p>
              <div className="pt-1 text-[11px] text-emerald-300">
                Facility: Main Road Birta, Birgunj-4, Nepal (Opp. 10-Storey Building)
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ Accordion + FAQPage JSON-LD Injected */}
        <section
          aria-labelledby="faq-heading"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-teal-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Patient Information & Common Queries</span>
            </div>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900">
              Frequently Asked Questions About {test.name}
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {test.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
                  >
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="text-teal-700 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="py-4 px-5 bg-white text-slate-700 text-sm leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Related Tests in Category */}
        {relatedTests.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900">
                Related {test.category} Tests in Birgunj
              </h3>
              <button
                onClick={onNavigateHome}
                className="text-xs font-bold text-teal-700 hover:text-teal-900"
              >
                View all tests →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTests.map((relTest) => (
                <div
                  key={relTest.id}
                  onClick={() => onSelectTest(relTest.id)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-md cursor-pointer transition-all space-y-2 group"
                >
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                    {relTest.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors line-clamp-1">
                    {relTest.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {relTest.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="font-extrabold text-emerald-700">
                      NPR {relTest.discountedPriceNPR}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {relTest.turnaroundTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Contact Callout */}
        <div className="bg-slate-100 rounded-2xl p-6 text-center space-y-3">
          <p className="text-xs font-semibold text-slate-500">
            Terai Diagnostic & Medical Center • Main Road Birta, Birgunj-4, Nepal (Opp. 10-Storey Building)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              Primary: {siteConfig.phones.primary}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              Lab: {siteConfig.phones.technologist}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-700" />
              Hours: 7:00 AM – 10:00 PM Everyday
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TestDetailPage;
