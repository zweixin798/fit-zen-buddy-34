import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, UserPlus, Dumbbell, Utensils } from "lucide-react";

type Post = {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  tag: string;
  tagIcon: "workout" | "diet";
  likes: number;
  comments: number;
  liked: boolean;
};

const POSTS: Post[] = [
  {
    id: 1, author: "健身达人小王", avatar: "W", time: "2小时前",
    content: "今天完成了新的臀腿训练方案！保加利亚分腿蹲真的太虐了，但是效果很好 💪 推荐给大家试试！",
    tag: "训练分享", tagIcon: "workout", likes: 128, comments: 23, liked: false,
  },
  {
    id: 2, author: "营养师Lucy", avatar: "L", time: "5小时前",
    content: "分享一个高蛋白低脂的减脂餐搭配：鸡胸肉100g + 糙米饭150g + 西兰花200g，总热量仅约450kcal，蛋白质42g！",
    tag: "饮食分享", tagIcon: "diet", likes: 256, comments: 45, liked: true,
  },
  {
    id: 3, author: "跑步爱好者", avatar: "R", time: "昨天",
    content: "坚持跑步第100天打卡！从5km到半马，感觉自己越来越强了。记录一下今天的配速变化 📊",
    tag: "训练分享", tagIcon: "workout", likes: 89, comments: 12, liked: false,
  },
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState(POSTS);

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Compose */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-neon flex items-center justify-center text-primary-foreground font-bold text-sm">
            我
          </div>
          <div className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-muted-foreground">
            分享你的训练心得...
          </div>
        </div>
      </div>

      {/* Feed */}
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-card rounded-xl p-4 border border-border"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
                {post.avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                <p className="text-[10px] text-muted-foreground">{post.time}</p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs text-neon bg-neon/10 px-2.5 py-1 rounded-full hover:bg-neon/20 transition-colors">
              <UserPlus className="w-3 h-3" />
              关注
            </button>
          </div>

          {/* Tag */}
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
              {post.tagIcon === "workout" ? <Dumbbell className="w-3 h-3" /> : <Utensils className="w-3 h-3" />}
              {post.tag}
            </span>
          </div>

          {/* Content */}
          <p className="text-sm text-secondary-foreground leading-relaxed mb-3">{post.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-5 pt-2 border-t border-border">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${post.liked ? "text-red-400" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Heart className={`w-4 h-4 ${post.liked ? "fill-red-400" : ""}`} />
              {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" />
              分享
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
