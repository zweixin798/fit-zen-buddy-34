import { motion } from "framer-motion";
import { Crown, Zap, RotateCcw, Watch, ChevronRight, Lock } from "lucide-react";

const PLANS = [
  { name: "二分化方案", split: "上肢 / 下肢", days: "每周4练", level: "初学者", free: true },
  { name: "三分化方案", split: "推 / 拉 / 腿", days: "每周5练", level: "中级", free: true },
  { name: "五分化方案", split: "胸/背/肩/臂/腿", days: "每周5-6练", level: "高级", free: false },
];

const TODAY_WORKOUT = [
  { name: "杠铃深蹲", sets: "4组", reps: "8-12次", rest: "90s" },
  { name: "罗马尼亚硬拉", sets: "3组", reps: "10-12次", rest: "90s" },
  { name: "腿举", sets: "3组", reps: "12-15次", rest: "60s" },
  { name: "保加利亚分腿蹲", sets: "3组", reps: "10次/侧", rest: "60s" },
  { name: "臀桥", sets: "3组", reps: "15次", rest: "45s" },
];

export default function TrainingPlans() {
  return (
    <div className="space-y-6">
      {/* Today's workout */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-display font-bold">今日训练</h2>
          <span className="text-xs text-coral font-semibold bg-coral/10 px-3 py-1 rounded-full">臀腿日</span>
        </div>
        <div className="space-y-2">
          {TODAY_WORKOUT.map((ex, i) => (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-3.5 shadow-card border border-border flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl gradient-warm flex items-center justify-center text-primary-foreground font-bold text-sm font-display">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{ex.name}</p>
                <p className="text-xs text-muted-foreground">{ex.sets} × {ex.reps}</p>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg">休息 {ex.rest}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-display font-bold mb-3">训练方案</h2>
        <div className="space-y-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-4 shadow-card border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    {!plan.free && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{plan.split} · {plan.days} · {plan.level}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* VIP */}
      <div className="gradient-warm rounded-2xl p-5 text-primary-foreground shadow-elevated relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5" />
            <h3 className="font-display text-lg font-bold">VIP 专属服务</h3>
          </div>
          <div className="space-y-2.5 mt-3">
            <div className="flex items-center gap-2.5 text-sm opacity-95">
              <Zap className="w-4 h-4" />
              <span>根据体质定制训练计划</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm opacity-95">
              <RotateCcw className="w-4 h-4" />
              <span>智能替换动作（如膝盖不好）</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm opacity-95">
              <Watch className="w-4 h-4" />
              <span>手表互联 · 语音训练提醒</span>
            </div>
          </div>
          <button className="mt-4 w-full py-2.5 rounded-xl bg-primary-foreground text-coral font-bold text-sm font-display tracking-wide">
            开通 VIP
          </button>
        </div>
      </div>
    </div>
  );
}
