"use client";

export default function Trending() {
  const trends = [
    { title: "Next.js 15", tweets: "120K Tweet" },
    { title: "Yapay Zeka", tweets: "89K Tweet" },
    { title: "Üniversite", tweets: "45K Tweet" },
  ];

  return (
    <aside className="w-80 sticky top-0 h-screen p-4">
      <div className="bg-[#F7F9F9] rounded-2xl shadow-sm">
        {/* Header */}
        <h2 className="p-4 text-xl font-extrabold">Gündemler</h2>

        {/* Trends */}
        <div className="flex flex-col">
          {trends.map((t, i) => (
            <div
              key={i}
              className="
                px-4 py-3 
                hover:bg-black/5 
                cursor-pointer 
                transition-colors
              "
            >
              <p className="text-xs text-muted-foreground">
                Türkiye'de gündemde
              </p>

              <p className="font-semibold text-[15px]">{t.title}</p>

              <p className="text-xs text-muted-foreground">{t.tweets}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
