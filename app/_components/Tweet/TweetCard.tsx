"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Repeat,
  Heart,
  Share,
  Bookmark,
  MoreHorizontal,
  Eye,
} from "lucide-react";

export default function TweetCard({ tweet }: { tweet: any }) {
  return (
    <div
      key={tweet.id}
      className="border-b p-4 flex gap-3 hover:bg-black/5 transition-colors cursor-pointer"
    >
      {/* Avatar */}
      <Avatar style={{ width: 48, height: 48 }} className="rounded-full border">
        <AvatarImage
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tweet.author.username}`}
          alt={tweet.author.username}
        />
        <AvatarFallback className="bg-slate-200 font-semibold">
          {tweet.author.username?.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1">
        {/* Username + menu */}
        <div className="flex justify-between">
          <div className="flex justify-start items-center gap-0.5">
            <p className="font-semibold">{tweet.author.firstName}</p>
            <p className="text-sm text-zinc-600">@{tweet.author.username}</p>
          </div>

          {/* 3 dots menu */}
          <button className="p-2 hover:bg-black/10 rounded-full transition">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Tweet text */}
        <p className="text-sm mt-1">{tweet.content}</p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 max-w-[500px] text-gray-500">
          {/* Comment */}
          <button className="flex items-center gap-2 hover:text-blue-500 transition">
            <MessageCircle size={18} />
            <span className="text-xs">{tweet.commentCount ?? 0}</span>
          </button>

          {/* Retweet */}
          <button className="flex items-center gap-2 hover:text-green-500 transition">
            <Repeat size={18} />
            <span className="text-xs">{tweet.repostCount ?? 0}</span>
          </button>

          {/* Like */}
          <button className="flex items-center gap-2 hover:text-red-500 transition">
            <Heart size={18} />
            <span className="text-xs">{tweet.likeCount ?? 0}</span>
          </button>

          {/* Views */}
          <div className="flex items-center gap-2">
            <Eye size={18} />
            <span className="text-xs">{tweet.views ?? "12.3K"}</span>
          </div>

          <div className="flex justify-center items-center gap-1">
            {/* Bookmark */}
            <button className="hover:text-blue-500 transition">
              <Bookmark size={18} />
            </button>

            {/* Share */}
            <button className="hover:text-blue-500 transition">
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
