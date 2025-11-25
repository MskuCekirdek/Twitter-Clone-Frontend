"use client";

import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  List,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/app/_stores/auth.store";
import { logout } from "../_hooks/auth.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);

  const menuItems = [
    { label: "Ana Sayfa", icon: Home, href: "/home" },
    { label: "Keşfet", icon: Search, href: "/explore" },
    ...(user
      ? [
          { label: "Bildirimler", icon: Bell, href: "/notifications" },
          { label: "Mesajlar", icon: Mail, href: "/messages" },
          { label: "Kaydedilenler", icon: Bookmark, href: "/bookmarks" },
          { label: "Listeler", icon: List, href: "/lists" },
          { label: "Profil", icon: User, href: "/profile" },
          { label: "Ayarlar", icon: Settings, href: "/settings" },
        ]
      : []),
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 p-4 border-r flex flex-col justify-between bg-white">
      {/* TOP LOGO + MENU */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold pl-2">X</h1>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 text-xl px-4 py-2 rounded-full hover:bg-black/10 transition"
            >
              <item.icon size={26} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* BOTTOM USER AREA */}
      {user ? (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-black/10 transition cursor-pointer">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Avatar
              style={{ width: 48, height: 48 }}
              className="rounded-full border"
            >
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.username}
              />
              <AvatarFallback className="bg-slate-200 font-semibold">
                {user.username?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div>
              <p className="font-semibold text-base">
                {user.firstName ?? "Kullanıcı"}
              </p>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 hover:bg-black/10 rounded-full"
          >
            <LogOut size={20} />
          </button>
        </div>
      ) : (
        <Link href="/auth" className="w-full">
          <button className="bg-black text-white px-4 py-2 w-full rounded-full font-semibold hover:bg-black/80 transition">
            Giriş Yap
          </button>
        </Link>
      )}
    </aside>
  );
}
