import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Plus, Flame, Droplets, Wheat, Beef } from "lucide-react";

type Meal = {
  id: number;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const SAMPLE_MEALS: Meal[] = [
  { id: 1, name: "燕麦牛奶 + 鸡蛋", time: "07:30", calories: 420, protein: 25, carbs: 48, fat: 14 },
  { id: 2, name: "鸡胸肉沙拉", time: "12:00", calories: 380, protein: 42, carbs: 18, fat: 12 },
  { id: 3, name: "蛋白粉 + 香蕉", time: "15:30", calories: 250, protein: 30, carbs: 28, fat: 3 },
];

const TARGET = { calories: 2200, protein: 160, carbs: 250, fat: 65 };

export default function DietTracker() {
  const [meals] = useState<Meal[]>(SAMPLE_MEALS);

  const totals = meals.reduce(
    (acc, m) => ({ calories: acc.calories + m.calories, protein: acc.protein + m.protein, carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const caloriePercent = Math.min((totals.calories / TARGET.calories) * 100, 100);

  return (
    <div className="space-y-5">
      {/* Calorie Ring */}
      <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--coral))" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${caloriePercent * 2.64} 264`} className="transition-all duration-700" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-display text-coral">{totals.calories}</span>
              <span className="text-[10px] text-muted-foreground">/ {TARGET.calories} kcal</span>
            </div>
          </div>
          <div className="flex-1 space-y-2.5">
            <MacroBar icon={<Beef className="w-3.5 h-3.5" />} label="蛋白质" current={totals.protein} target={TARGET.protein} unit="g" color="bg-coral" />
            <MacroBar icon={<Wheat className="w-3.5 h-3.5" />} label="碳水" current={totals.carbs} target={TARGET.carbs} unit="g" color="bg-amber-brand" />
            <MacroBar icon={<Droplets className="w-3.5 h-3.5" />} label="脂肪" current={totals.fat} target={TARGET.fat} unit="g" color="bg-sky-brand" />
          </div>
        </div>
      </div>

      {/* AI Upload */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="w-full bg-card border-2 border-dashed border-coral/30 rounded-2xl p-4 flex items-center justify-center gap-3 hover:border-coral/50 transition-colors shadow-card"
      >
        <div className="w-11 h-11 rounded-full gradient-warm flex items-center justify-center">
          <Camera className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold">AI 拍照识别</p>
          <p className="text-xs text-muted-foreground">上传食物图片，一键计算热量</p>
        </div>
      </motion.button>

      {/* Meal List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-display font-bold">今日饮食</h2>
          <button className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center hover:bg-muted transition-colors shadow-card">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {meals.map((meal, i) => (
            <motion.div key={meal.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-3.5 shadow-card border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{meal.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{meal.time}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-coral">
                    <Flame className="w-3.5 h-3.5" />
                    <span className="font-bold text-sm font-display">{meal.calories}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">蛋白{meal.protein}g · 碳水{meal.carbs}g · 脂肪{meal.fat}g</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MacroBar({ icon, label, current, target, unit, color }: {
  icon: React.ReactNode; label: string; current: number; target: number; unit: string; color: string;
}) {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <div className="flex items-center gap-1 text-muted-foreground">{icon}<span>{label}</span></div>
        <span className="text-foreground font-medium">{current}/{target}{unit}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
