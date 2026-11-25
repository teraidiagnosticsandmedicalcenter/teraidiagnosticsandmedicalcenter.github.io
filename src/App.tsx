import React, { useState, useEffect } from "react";
import { TopBar } from "./components/TopBar";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HomeCollectionBanner } from "./components/HomeCollectionBanner";
import { LeadershipSection } from "./components/LeadershipSection";
import { FacilitiesSection } from "./components/FacilitiesSection";
import { TestSearchCatalog } from "./components/TestSearchCatalog";
import { HealthPackagesSection } from "./components/HealthPackagesSection";
import { DepartmentsSection } from "./components/DepartmentsSection";
import { DoctorsSection } from "./components/DoctorsSection";
import { GallerySection } from "./components/GallerySection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { FaqSection } from "./components/FaqSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { BookingModal } from "./components/BookingModal";
import { GlobalSchema } from "./components/GlobalSchema";
import { TestDetailPage } from "./components/TestDetailPage";
import { SectionPageView } from "./components/SectionPageView";
import { diagnosticTestsData } from "./data/tests";

export type RouteInfo =
  | { type: "home" }
  | { type: "test"; slug: string }
  | { type: "section"; section: "about" | "facilities" | "tests" | "packages" | "departments" | "doctors" | "gallery" | "contact" };

function extractCurrentRoute(): RouteInfo {
  if (typeof window === "undefined") return { type: "home" };

  // 1. Check query param ?p= (from 404.html redirect)
  const params = new URLSearchParams(window.location.search);
  let p = params.get("p") || "";
  const testParam = params.get("test");
  if (testParam) return { type: "test", slug: testParam };

  let pathname = p || window.location.pathname;
  let hash = window.location.hash;

  // Clean trailing slash
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  // Check test routes: /tests/:slug
  const testMatch = pathname.match(/\/tests\/([a-zA-Z0-9_-]+)/);
  if (testMatch && testMatch[1]) {
    return { type: "test", slug: testMatch[1] };
  }
  const hashTestMatch = hash.match(/#\/?tests\/([a-zA-Z0-9_-]+)/);
  if (hashTestMatch && hashTestMatch[1]) {
    return { type: "test", slug: hashTestMatch[1] };
  }

  // Check section routes
  const sections = ["about", "facilities", "tests", "packages", "departments", "doctors", "gallery", "contact"] as const;
  for (const sec of sections) {
    if (pathname === `/${sec}` || hash === `#/${sec}` || hash === `#${sec}`) {
      return { type: "section", section: sec };
    }
  }

  return { type: "home" };
}

export function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState("");
  const [route, setRoute] = useState<RouteInfo>(extractCurrentRoute);

  useEffect(() => {
    const onLocationChange = () => {
      setRoute(extractCurrentRoute());
    };
    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("hashchange", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("hashchange", onLocationChange);
    };
  }, []);

  const handleOpenBooking = (itemName?: string) => {
    setSelectedBookingItem(itemName || "");
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedBookingItem("");
  };

  const handleNavigateRoute = (routePath: string) => {
    try {
      window.history.pushState({}, "", routePath);
    } catch {
      window.location.hash = routePath;
    }
    setRoute(extractCurrentRoute());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectTest = (slug: string) => {
    handleNavigateRoute(`/tests/${slug}`);
  };

  const handleNavigateHome = () => {
    handleNavigateRoute("/");
  };

  const currentTest = route.type === "test"
    ? diagnosticTestsData.find((t) => t.id === route.slug)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Global Schema.org JSON-LD */}
      <GlobalSchema />

      {/* Top Announcement Bar */}
      <TopBar />

      {/* Main Navigation Header */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onNavigateRoute={handleNavigateRoute}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {route.type === "test" && currentTest ? (
          <TestDetailPage
            test={currentTest}
            onOpenBooking={handleOpenBooking}
            onNavigateHome={handleNavigateHome}
            onSelectTest={handleSelectTest}
          />
        ) : route.type === "section" ? (
          <SectionPageView
            sectionId={route.section}
            onNavigateHome={handleNavigateHome}
            onNavigateSection={(sec) => handleNavigateRoute(`/${sec}`)}
            onOpenBooking={handleOpenBooking}
          >
            {route.section === "about" && (
              <>
                <LeadershipSection />
                <WhyChooseUs />
              </>
            )}

            {route.section === "facilities" && (
              <FacilitiesSection onOpenBooking={handleOpenBooking} />
            )}

            {route.section === "tests" && (
              <TestSearchCatalog
                onOpenBooking={handleOpenBooking}
                onSelectTest={handleSelectTest}
              />
            )}

            {route.section === "packages" && (
              <HealthPackagesSection onOpenBooking={handleOpenBooking} />
            )}

            {route.section === "departments" && (
              <DepartmentsSection onOpenBooking={handleOpenBooking} />
            )}

            {route.section === "doctors" && (
              <DoctorsSection onOpenBooking={handleOpenBooking} />
            )}

            {route.section === "gallery" && (
              <GallerySection />
            )}

            {route.section === "contact" && (
              <>
                <ContactSection />
                <FaqSection />
              </>
            )}
          </SectionPageView>
        ) : (
          /* Full Flagship Homepage */
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking("Home Blood Sample Collection")}
              onNavigateToTests={() => handleNavigateRoute("/tests")}
            />

            <HomeCollectionBanner
              onOpenBooking={() => handleOpenBooking("Home Blood Sample Collection")}
            />

            <LeadershipSection />

            <FacilitiesSection onOpenBooking={handleOpenBooking} />

            <TestSearchCatalog
              onOpenBooking={handleOpenBooking}
              onSelectTest={handleSelectTest}
            />

            <HealthPackagesSection onOpenBooking={handleOpenBooking} />

            <DepartmentsSection onOpenBooking={handleOpenBooking} />

            <DoctorsSection onOpenBooking={handleOpenBooking} />

            <GallerySection />

            <WhyChooseUs />

            <FaqSection />

            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Chat Button */}
      <FloatingWhatsApp />

      {/* Interactive Zero-Backend Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        preSelectedTest={selectedBookingItem}
      />
    </div>
  );
}

export default App;
