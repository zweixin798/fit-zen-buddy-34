import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Dumbbell, Utensils, Users, User } from "lucide-react";
import TrainingCalendar from "@/components/TrainingCalendar";
import TrainingPlans from "@/components/TrainingPlans";
import DietTracker from "@/components/DietTracker";
import CommunityFeed from "@/components/CommunityFeed";
import ProfilePage from "@/components/ProfilePage";

const TABS = [
  { id: "calendar", label: "日程", icon: CalendarDays },
  { id: "plans", label: "训练", icon: Dumbbell },
  { id: "diet", label: "饮食", icon: Utensils },
  { id: "community", label: "社区", icon: Users },
  { id: "profile", label: "我的", icon: User },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabId>("calendar");

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-display font-bold tracking-wide text-coral">FITLOG</h1>
          <p className="text-xs text-muted-foreground">你的私人训练伙伴</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "calendar" && <TrainingCalendar />}
            {activeTab === "plans" && <TrainingPlans />}
            {activeTab === "diet" && <DietTracker />}
            {activeTab === "community" && <CommunityFeed />}
            {activeTab === "profile" && <ProfilePage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-card/95 backdrop-blur-xl border-t border-border z-50">
        <div className="flex">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex flex-col items-center py-2.5 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-px left-3 right-3 h-0.5 gradient-warm rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-coral" : "text-muted-foreground"}`} />
                <span className={`text-[10px] mt-0.5 transition-colors ${isActive ? "text-coral font-semibold" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
