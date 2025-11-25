"use client";

import Sidebar from "../_components/Sidebar";
import Trending from "../_components/Trendbar";
import TweetFeed from "../_components/Tweet/TweetFeed";

export default function HomePage() {
  return (
    <div className="flex justify-center">
      <Sidebar />

      {/* ORTA ALAN */}
      <main className="w-[600px] border-x min-h-screen">
        <TweetFeed />
      </main>

      <Trending />
    </div>
  );
}
