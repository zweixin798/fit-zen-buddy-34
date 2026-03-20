import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Flame, X } from "lucide-react";

type TrainingLog = {
  date: number;
  type: string;
  color: string;
};

const DEFAULT_TAGS = [
  { label: "臀腿", color: "bg-coral" },
  { label: "肩背", color: "bg-sky-brand" },
  { label: "胸臂", color: "bg-lavender" },
  { label: "核心", color: "bg-amber-brand" },
  { label: "有氧", color: "bg-mint" },
  { label: "休息", color: "bg-muted" },
];

const TAG_COLORS = [
  "bg-coral", "bg-sky-brand", "bg-lavender", "bg-amber-brand", "bg-mint", "bg-rose-brand",
];

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return "夜深了，注意休息 🌙";
  if (h < 12) return "早上好！新的一天，动起来 🌅";
  if (h < 14) return "中午好！补充能量 ☀️";
  if (h < 18) return "下午好！该去锻炼了 💪";
  return "晚上好！今天练了吗 🌆";
}

export default function TrainingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tags, setTags] = useState(DEFAULT_TAGS);
  const [logs, setLogs] = useState<TrainingLog[]>([
    { date: 2, type: "臀腿", color: "bg-coral" },
    { date: 4, type: "肩背", color: "bg-sky-brand" },
    { date: 6, type: "胸臂", color: "bg-lavender" },
    { date: 8, type: "臀腿", color: "bg-coral" },
    { date: 10, type: "核心", color: "bg-amber-brand" },
    { date: 12, type: "有氧", color: "bg-mint" },
    { date: 14, type: "肩背", color: "bg-sky-brand" },
    { date: 16, type: "臀腿", color: "bg-coral" },
    { date: 18, type: "胸臂", color: "bg-lavender" },
  ]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0]);

  // Calorie data per training type
  const calorieMap: Record<string, number> = {
    "臀腿": 380, "肩背": 320, "胸臂": 300, "核心": 250, "有氧": 450, "休息": 0,
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const getLog = (day: number) => logs.find((l) => l.date === day);

  const totalCalories = logs.reduce((sum, l) => sum + (calorieMap[l.type] || 300), 0);

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

  const removeTraining = () => {
    if (selectedDay === null) return;
    setLogs((prev) => prev.filter((l) => l.date !== selectedDay));
    setShowPicker(false);
  };

  const addCustomTag = () => {
    if (!newTagName.trim()) return;
    setTags((prev) => [...prev, { label: newTagName.trim(), color: newTagColor }]);
    setNewTagName("");
    setShowAddTag(false);
  };

  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

  return (
    <div className="space-y-4">
      {/* Greeting Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-warm rounded-2xl p-5 text-primary-foreground shadow-elevated"
      >
        <p className="text-sm opacity-90">{getGreeting()}</p>
        <h2 className="text-2xl font-display font-bold mt-1">
          {today.getMonth() + 1}月{today.getDate()}日，{WEEKDAYS[(today.getDay() + 6) % 7]}
        </h2>
        <div className="flex items-center gap-2 mt-3 bg-primary-foreground/15 rounded-xl px-3 py-2 w-fit">
          <Flame className="w-5 h-5" />
          <span className="font-display font-bold text-lg">{totalCalories}</span>
          <span className="text-sm opacity-90">kcal 本月已燃烧</span>
        </div>
      </motion.div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-2 rounded-xl bg-card shadow-card hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-lg font-bold font-display">
          {year}年 {monthNames[month]}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-xl bg-card shadow-card hover:bg-muted transition-colors">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`e-${i}`} className="aspect-square" />
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
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all
                ${isToday ? "ring-2 ring-primary shadow-card" : ""}
                ${log ? `${log.color} text-primary-foreground shadow-card` : "bg-card hover:bg-muted shadow-card"}
              `}
            >
              <span className={`text-xs font-medium ${log ? "text-primary-foreground" : isToday ? "text-coral font-bold" : "text-foreground"}`}>{day}</span>
              {log && <span className="text-[8px] mt-0.5 opacity-90 leading-tight">{log.type}</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Legend with custom tag support */}
      <div className="flex flex-wrap gap-2 pt-1">
        {tags.filter(t => t.label !== "休息").map((t) => (
          <div key={t.label} className="flex items-center gap-1.5 bg-card rounded-full px-2.5 py-1 shadow-card">
            <div className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
            <span className="text-xs text-muted-foreground">{t.label}</span>
          </div>
        ))}
        <button
          onClick={() => setShowAddTag(true)}
          className="flex items-center gap-1 bg-card rounded-full px-2.5 py-1 shadow-card text-xs text-muted-foreground hover:text-coral transition-colors"
        >
          <Plus className="w-3 h-3" /> 自定义
        </button>
      </div>

      {/* Add Custom Tag */}
      <AnimatePresence>
        {showAddTag && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-2xl p-4 shadow-elevated border border-border overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-sm">添加自定义标签</h3>
              <button onClick={() => setShowAddTag(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="标签名称（如：瑜伽、游泳）"
              className="w-full bg-secondary rounded-xl px-3 py-2 text-sm mb-3 outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex gap-2 mb-3">
              {TAG_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewTagColor(c)}
                  className={`w-7 h-7 rounded-full ${c} transition-transform ${newTagColor === c ? "scale-125 ring-2 ring-foreground/20" : ""}`}
                />
              ))}
            </div>
            <button onClick={addCustomTag} className="w-full py-2 rounded-xl gradient-warm text-primary-foreground font-semibold text-sm">
              添加
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Picker Modal */}
      <AnimatePresence>
        {showPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setShowPicker(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              className="fixed inset-x-0 bottom-0 z-50 p-4 bg-card border-t border-border rounded-t-3xl shadow-elevated"
            >
              <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
              <h3 className="text-base font-display font-semibold mb-3">
                {selectedDay}日 — 选择训练
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {tags.map((t) => (
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
              {getLog(selectedDay!) && (
                <button
                  onClick={removeTraining}
                  className="w-full mt-3 py-2.5 text-destructive text-sm rounded-xl bg-destructive/10"
                >
                  清除记录
                </button>
              )}
              <button onClick={() => setShowPicker(false)} className="w-full mt-2 py-2.5 text-muted-foreground text-sm">
                取消
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-4 h-4 text-coral" />
          <span className="text-sm font-semibold">本月统计</span>
        </div>
        <div className="flex gap-6">
          <div>
            <span className="text-2xl font-bold font-display text-coral">{logs.length}</span>
            <span className="text-xs text-muted-foreground ml-1">次训练</span>
          </div>
          <div>
            <span className="text-2xl font-bold font-display text-amber-brand">{totalCalories}</span>
            <span className="text-xs text-muted-foreground ml-1">kcal</span>
          </div>
          <div>
            <span className="text-2xl font-bold font-display text-sky-brand">{daysInMonth - logs.length}</span>
            <span className="text-xs text-muted-foreground ml-1">天剩余</span>
          </div>
        </div>
      </div>
    </div>
  );
}
