"use client";

import { useEffect, useState } from "react";
import { getFeed } from "@/app/_hooks/post.service";
import TweetCard from "./TweetCard";
import { toast } from "sonner";
import { useAuthStore } from "@/app/_stores/auth.store";
import { Button } from "@/components/ui/button";
import TweetCreate from "./Tweetcreate";

export default function TweetFeed() {
  const user = useAuthStore((s) => s.user);

  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // İlk yükleme
  useEffect(() => {
    load(1);
  }, []);

  async function load(p: number) {
    try {
      if (p === 1) setLoading(true);

      const res = await getFeed(p, 10); // backend sayfa mantığı
      const data = res.data;

      if (p === 1) {
        // ilk sayfa
        setPosts(data.posts);
      } else {
        // yüklenen sayfayı ekle
        setPosts((prev) => [...prev, ...data.posts]);
      }

      setHasMore(data.hasMore);
    } catch {
      toast.error("Feed yüklenemedi");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  async function loadMore() {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);

    const nextPage = page + 1;
    setPage(nextPage);
    await load(nextPage);
  }

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Yükleniyor...</div>;
  }

  return (
    <div>
      {user && (
        <TweetCreate
          onTweet={() => {
            setPage(1);
            load(1); // tweet sonrası feed reset
          }}
        />
      )}

      {posts.map((post) => (
        <TweetCard key={post.id} tweet={post} />
      ))}

      {/* Daha fazla yükle butonu */}
      {hasMore && (
        <div className="p-4 text-center">
          <Button
            disabled={loadingMore}
            onClick={loadMore}
            variant="outline"
            className="w-full"
          >
            {loadingMore ? "Yükleniyor..." : "Daha Fazla Yükle"}
          </Button>
        </div>
      )}
    </div>
  );
}
