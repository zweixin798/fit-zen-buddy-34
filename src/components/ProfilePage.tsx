import { motion } from "framer-motion";
import {
  Settings, ChevronRight, Heart, FileText, UserCheck, Award, LogOut,
  Bell, Shield, HelpCircle, Star, Bookmark, Activity, Target
} from "lucide-react";

const STATS = [
  { label: "训练天数", value: "128", icon: Activity, color: "text-coral" },
  { label: "连续打卡", value: "14", icon: Target, color: "text-amber-brand" },
  { label: "获赞", value: "1.2K", icon: Heart, color: "text-rose-brand" },
  { label: "粉丝", value: "86", icon: Star, color: "text-sky-brand" },
];

const MENU_SECTIONS = [
  {
    title: "我的内容",
    items: [
      { label: "我的发布", icon: FileText, desc: "查看已发布的内容", badge: "3" },
      { label: "我的收藏", icon: Bookmark, desc: "收藏的训练方案和文章" },
      { label: "训练成就", icon: Award, desc: "已解锁 8 个成就", badge: "8" },
    ],
  },
  {
    title: "专属服务",
    items: [
      { label: "私人教练", icon: UserCheck, desc: "1对1专属训练指导", vip: true },
      { label: "训练报告", icon: Activity, desc: "AI 分析你的训练数据", vip: true },
    ],
  },
  {
    title: "设置",
    items: [
      { label: "通知设置", icon: Bell, desc: "管理推送和提醒" },
      { label: "隐私与安全", icon: Shield, desc: "账号安全和隐私设置" },
      { label: "帮助与反馈", icon: HelpCircle, desc: "常见问题和意见反馈" },
      { label: "关于我们", icon: Settings, desc: "版本 1.0.0" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <div className="gradient-warm rounded-2xl p-5 text-primary-foreground shadow-elevated relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center text-2xl font-display font-bold">
            F
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-display font-bold">FitUser</h2>
            <p className="text-sm opacity-90">坚持训练，遇见更好的自己 💪</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-primary-foreground/20 px-2 py-0.5 rounded-full">Lv.12</span>
              <span className="text-xs bg-primary-foreground/20 px-2 py-0.5 rounded-full">VIP 会员</span>
            </div>
          </div>
          <button className="p-2 bg-primary-foreground/20 rounded-xl">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-3 shadow-card border border-border text-center"
            >
              <Icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-display font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Menu Sections */}
      {MENU_SECTIONS.map((section, si) => (
        <div key={section.title}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {section.title}
          </h3>
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (si * 3 + i) * 0.03 }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors text-left
                    ${i !== section.items.length - 1 ? "border-b border-border" : ""}
                  `}
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{item.label}</p>
                      {"vip" in item && item.vip && (
                        <span className="text-[9px] bg-coral/10 text-coral px-1.5 py-0.5 rounded font-semibold">VIP</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {"badge" in item && item.badge && (
                      <span className="text-xs bg-coral text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center font-medium">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-destructive bg-card rounded-2xl shadow-card border border-border hover:bg-muted/50 transition-colors">
        <LogOut className="w-4 h-4" />
        退出登录
      </button>

      <div className="h-4" />
    </div>
  );
}
