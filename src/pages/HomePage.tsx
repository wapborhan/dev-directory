import HomeHeader from "@/components/HomeHeader";
import SearchData from "@/components/SearchData";
import SearchForm from "@/components/SearchForm";
import SearchResult from "@/components/SearchResult";
import DevCard from "@/components/shared/DevCard";
import { useLocation } from "react-router-dom";

function HomePage() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/profile" && <HomeHeader />}
      <main className="min-h-screen bg-background text-foreground">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6">
          <div className="grid grid-cols-5 gap-5">
            <SearchForm />
            <SearchData />
          </div>
          <SearchResult />
          <section className="mt-4 grid gap-5 md:grid-cols-2">
            <DevCard />
            <DevCard />
            <DevCard />
            <DevCard />
          </section>
        </div>
      </main>
    </>
  );
}

export default HomePage;
