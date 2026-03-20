import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, UserPlus, Dumbbell, Utensils, Newspaper, Trophy, TrendingUp } from "lucide-react";

type TabId = "fitness" | "news" | "trending";

const TABS = [
  { id: "fitness" as const, label: "健身交流", icon: Dumbbell },
  { id: "news" as const, label: "体育新闻", icon: Newspaper },
  { id: "trending" as const, label: "热门话题", icon: TrendingUp },
];

type Post = {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  tag: string;
  likes: number;
  comments: number;
  liked: boolean;
};

const FITNESS_POSTS: Post[] = [
  {
    id: 1, author: "健身达人小王", avatar: "W", time: "2小时前",
    content: "今天完成了新的臀腿训练方案！保加利亚分腿蹲真的太虐了，但是效果很好 💪 推荐给大家试试！",
    tag: "训练分享", likes: 128, comments: 23, liked: false,
  },
  {
    id: 2, author: "营养师Lucy", avatar: "L", time: "5小时前",
    content: "分享一个高蛋白低脂的减脂餐搭配：鸡胸肉100g + 糙米饭150g + 西兰花200g，总热量仅约450kcal！",
    tag: "饮食分享", likes: 256, comments: 45, liked: true,
  },
  {
    id: 3, author: "跑步爱好者", avatar: "R", time: "昨天",
    content: "坚持跑步第100天打卡！从5km到半马，感觉自己越来越强了 📊",
    tag: "跑步日记", likes: 89, comments: 12, liked: false,
  },
];

const NEWS_POSTS: Post[] = [
  {
    id: 10, author: "体育频道", avatar: "S", time: "1小时前",
    content: "🏀 NBA季后赛战况激烈！东部决赛即将开打，谁将率先拿到总决赛入场券？赛程分析及球员数据一览。",
    tag: "NBA", likes: 542, comments: 88, liked: false,
  },
  {
    id: 11, author: "足球天地", avatar: "F", time: "3小时前",
    content: "⚽ 欧冠半决赛首回合结束，皇马客场2-1逆转！维尼修斯梅开二度，附精彩进球集锦。",
    tag: "足球", likes: 891, comments: 156, liked: true,
  },
  {
    id: 12, author: "运动科学", avatar: "E", time: "6小时前",
    content: "📖 最新研究表明：HIIT训练每周3次，持续8周可显著提升心肺功能。详细训练方案点击查看。",
    tag: "科学健身", likes: 324, comments: 67, liked: false,
  },
];

const TRENDING_POSTS: Post[] = [
  {
    id: 20, author: "健身挑战", avatar: "C", time: "今天",
    content: "🔥 #30天深蹲挑战# 已有5000人参与！今天Day 15，大家加油！分享你的打卡记录赢取奖品 🎁",
    tag: "挑战", likes: 1203, comments: 234, liked: false,
  },
  {
    id: 21, author: "体态教练Amy", avatar: "A", time: "昨天",
    content: "久坐族必看！5个动作拯救你的圆肩驼背，每天只需10分钟。已帮助10万+用户改善体态 ✨",
    tag: "体态矫正", likes: 2156, comments: 412, liked: true,
  },
];

const POST_MAP: Record<TabId, Post[]> = {
  fitness: FITNESS_POSTS,
  news: NEWS_POSTS,
  trending: TRENDING_POSTS,
};

export default function CommunityFeed() {
  const [activeTab, setActiveTab] = useState<TabId>("fitness");
  const [posts, setPosts] = useState(POST_MAP);

  const toggleLike = (id: number) => {
    setPosts((prev) => {
      const updated = { ...prev };
      for (const key of Object.keys(updated) as TabId[]) {
        updated[key] = updated[key].map((p) =>
          p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
        );
      }
      return updated;
    });
  };

  const currentPosts = posts[activeTab];

  return (
    <div className="space-y-4">
      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${isActive ? "gradient-warm text-primary-foreground shadow-card" : "bg-card text-muted-foreground shadow-card hover:bg-muted"}
              `}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Compose */}
      <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-warm flex items-center justify-center text-primary-foreground font-bold text-sm">我</div>
          <div className="flex-1 bg-secondary rounded-xl px-3 py-2.5 text-sm text-muted-foreground">分享你的训练心得...</div>
        </div>
      </div>

      {/* Feed */}
      {currentPosts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="bg-card rounded-2xl p-4 shadow-card border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
                {post.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
                <p className="text-[10px] text-muted-foreground">{post.time}</p>
              </div>
            </div>
            {activeTab === "fitness" && (
              <button className="flex items-center gap-1 text-xs text-coral bg-coral/10 px-2.5 py-1 rounded-full hover:bg-coral/20 transition-colors">
                <UserPlus className="w-3 h-3" /> 关注
              </button>
            )}
          </div>

          <div className="mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
              {post.tag}
            </span>
          </div>

          <p className="text-sm text-secondary-foreground leading-relaxed mb-3">{post.content}</p>

          <div className="flex items-center gap-5 pt-2 border-t border-border">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${post.liked ? "text-coral" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Heart className={`w-4 h-4 ${post.liked ? "fill-coral" : ""}`} /> {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="w-4 h-4" /> {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" /> 分享
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
