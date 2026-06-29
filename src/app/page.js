// Remove curly braces from FeaturedTutors to match its export default definition


// Keep the rest of your home section imports unchanged
import Banner from "@/components/home/Banner";
import StatisticsSection from "@/components/home/StatisticsSection";
import PopularTutors from "@/components/home/PopularTutors";
import FeaturedTutors from "@/components/home/FeaturedTutors"; 
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StudentReviews from "@/components/home/StudentReviews";


export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-background min-h-screen pb-12">
      


      <Banner />
      
      
      <StatisticsSection />
      
      <PopularTutors />
      
      <FeaturedTutors />
      
      <WhyChooseUs />
      
            <StudentReviews />
    </div>
  );
}
