import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Dumbbell, Plus } from "lucide-react";

type TrainingLog = {
  date: number;
  type: string;
  color: string;
};

const TRAINING_TYPES: { label: string; color: string }[] = [
  { label: "臀腿", color: "bg-neon" },
  { label: "肩背", color: "bg-blue-500" },
  { label: "胸臂", color: "bg-purple-500" },
  { label: "核心", color: "bg-orange-500" },
  { label: "有氧", color: "bg-pink-500" },
  { label: "休息", color: "bg-muted" },
];

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

export default function TrainingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logs, setLogs] = useState<TrainingLog[]>([
    { date: 2, type: "臀腿", color: "bg-neon" },
    { date: 4, type: "肩背", color: "bg-blue-500" },
    { date: 6, type: "胸臂", color: "bg-purple-500" },
    { date: 8, type: "臀腿", color: "bg-neon" },
    { date: 10, type: "核心", color: "bg-orange-500" },
    { date: 12, type: "有氧", color: "bg-pink-500" },
    { date: 14, type: "肩背", color: "bg-blue-500" },
    { date: 16, type: "臀腿", color: "bg-neon" },
    { date: 18, type: "胸臂", color: "bg-purple-500" },
  ]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getLog = (day: number) => logs.find((l) => l.date === day);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setShowPicker(true);
  };

  const assignTraining = (type: string, color: string) => {
    if (selectedDay === null) return;
    setLogs((prev) => {
      const filtered = prev.filter((l) => l.date !== selectedDay);
      return [...filtered, { date: selectedDay, type, color }];
    });
    setShowPicker(false);
  };

  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-xl font-bold font-display tracking-wider">
          {year}年 {monthNames[month]}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const log = getLog(day);
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

          return (
            <motion.button
              key={day}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDayClick(day)}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center relative text-sm transition-colors
                ${isToday ? "ring-2 ring-primary" : ""}
                ${log ? "" : "bg-secondary/50 hover:bg-secondary"}
              `}
            >
              <span className={`text-xs ${isToday ? "text-neon font-bold" : "text-muted-foreground"}`}>{day}</span>
              {log && (
                <div className={`w-2 h-2 rounded-full mt-0.5 ${log.color}`} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-2">
        {TRAINING_TYPES.slice(0, 5).map((t) => (
          <div key={t.label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
            <span className="text-xs text-muted-foreground">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Training Picker Modal */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-0 z-50 p-4 bg-card border-t border-border rounded-t-2xl"
          >
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-display mb-3">选择训练类型 — {selectedDay}日</h3>
            <div className="grid grid-cols-3 gap-2">
              {TRAINING_TYPES.map((t) => (
                <motion.button
                  key={t.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => assignTraining(t.label, t.color)}
                  className="p-3 rounded-xl bg-secondary hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${t.color}`} />
                  <span className="text-sm font-medium">{t.label}</span>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setShowPicker(false)}
              className="w-full mt-3 py-3 text-muted-foreground text-sm"
            >
              取消
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats bar */}
      <div className="gradient-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Dumbbell className="w-4 h-4 text-neon" />
          <span className="text-sm font-medium">本月训练统计</span>
        </div>
        <div className="flex gap-4">
          <div>
            <span className="text-2xl font-bold font-display text-neon">{logs.length}</span>
            <span className="text-xs text-muted-foreground ml-1">次训练</span>
          </div>
          <div>
            <span className="text-2xl font-bold font-display">{daysInMonth - logs.length}</span>
            <span className="text-xs text-muted-foreground ml-1">天剩余</span>
          </div>
        </div>
      </div>
    </div>
  );
}
