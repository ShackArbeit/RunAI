import {
  feedback as feedbackData,
  prediction as predictionData,
  routes as routeData,
  stats as statsData,
  todayTraining as todayTrainingData,
} from "@/lib/mock-data";
import { FeedbackPanel } from "@/components/members/FeedbackPanel";
import { Header } from "@/components/members/Header";
import { PredictionCard } from "@/components/members/PredictionCard";
import { RouteList } from "@/components/members/RouteList";
import { StatsCard } from "@/components/members/StatsCard";
import { TodayTrainingCard } from "@/components/members/TodayTrainingCard";

export function MembersDashboard() {
  return (
    <div className="min-h-screen bg-[#08111f] px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 md:gap-6">
        <Header />
        <main className="grid gap-4 md:gap-6 xl:grid-cols-[minmax(0,1.32fr)_minmax(360px,0.88fr)]">
          <div className="flex flex-col gap-4 md:gap-6">
            <TodayTrainingCard training={todayTrainingData} />
            <RouteList initialRoutes={routeData} />
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <PredictionCard prediction={predictionData} />
            <StatsCard stats={statsData} />
            <FeedbackPanel initialFeedback={feedbackData} />
          </div>
        </main>
      </div>
    </div>
  );
}
