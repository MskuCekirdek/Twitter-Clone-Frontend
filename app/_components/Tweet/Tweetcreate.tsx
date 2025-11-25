"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createPost } from "@/app/_hooks/post.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/app/_stores/auth.store";

import {
  Image as ImageIcon,
  Smile,
  BarChart2,
  MapPin,
  PlusCircle,
} from "lucide-react";

export default function TweetCreate({ onTweet }: { onTweet?: () => void }) {
  const user = useAuthStore((s) => s.user);
  const [text, setText] = useState("");

  async function handleTweet() {
    if (!text.trim()) return;

    try {
      const res = await createPost(text);

      toast.success("Tweet gönderildi!");
      setText("");
      onTweet?.();
    } catch {
      toast.error("Tweet gönderilemedi");
    }
  }

  return (
    <div className="border-b p-4 flex gap-3">
      {/* Avatar */}
      <Avatar style={{ width: 48, height: 48 }} className="rounded-full border">
        <AvatarImage
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
          alt={user?.username}
        />
        <AvatarFallback className="bg-slate-200 font-semibold">
          {user?.username?.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* MAIN RIGHT AREA */}
      <div className="flex-1">
        {/* Text */}
        <Textarea
          className="resize-none border-none focus-visible:ring-0 shadow-none"
          placeholder="Neler oluyor?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* OPTIONS + BUTTON */}
        <div className="flex items-center justify-between mt-3">
          {/* LEFT ICONS */}
          <div className="flex items-center gap-3 text-blue-500">
            {/* Upload Image */}
            <label className="cursor-pointer hover:text-blue-600 transition">
              <ImageIcon size={20} />
            </label>

            <button className="hover:text-blue-600 transition">
              <Smile size={20} />
            </button>

            <button className="hover:text-blue-600 transition">
              <BarChart2 size={20} />
            </button>

            <button className="hover:text-blue-600 transition">
              <MapPin size={20} />
            </button>

            <button className="hover:text-blue-600 transition">
              <PlusCircle size={20} />
            </button>
          </div>

          {/* TWEET BUTTON */}
          <Button disabled={!text.trim()} onClick={handleTweet}>
            Tweetle
          </Button>
        </div>
      </div>
    </div>
  );
}
