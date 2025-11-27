"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { login, register } from "../_hooks/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../_stores/auth.store";

export default function AuthPage() {
  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Register
  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regFirst, setRegFirst] = useState("");
  const [regLast, setRegLast] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);

  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  // LOGIN
  async function handleLogin() {
    try {
      setLoadingLogin(true);
      const data = await login(loginEmail, loginPassword);

      toast.success("Giriş başarılı!");
      router.replace("/home");
    } catch {
      toast.error("Girilen bilgiler hatalı");
    } finally {
      setLoadingLogin(false);
    }
  }

  // REGISTER
  async function handleRegister() {
    try {
      setLoadingRegister(true);
      await register(regEmail, regUsername, regPassword, regFirst, regLast);
      toast.success("Kayıt başarılı!");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Beklenmedik bir hata oluştu"
      );
    } finally {
      setLoadingRegister(false);
    }
  }

  useEffect(() => {
    if (user) router.replace("/home");
  }, [user, router]);

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE – BIG X LOGO */}
      <div className="w-1/2 bg-black flex justify-center items-center">
        <h1 className="text-white text-9xl font-extrabold">X</h1>
      </div>

      {/* RIGHT SIDE – AUTH CONTENT */}
      <div className="w-1/2 flex justify-center items-center p-10">
        <div className="w-[400px]">
          <h1 className="text-3xl font-bold mb-8">Hoş Geldin</h1>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <div className="space-y-4 mt-6">
                <div className="p-1 flex flex-col gap-1">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="p-1 flex flex-col gap-1">
                  <Label>Şifre</Label>
                  <Input
                    type="password"
                    placeholder="Şifre"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={loadingLogin}
                  onClick={handleLogin}
                >
                  {loadingLogin ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </div>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="register">
              <div className="space-y-4 mt-6">
                {/* FIRST & LAST NAME */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label>Ad</Label>
                    <Input
                      placeholder="Ad"
                      value={regFirst}
                      onChange={(e) => setRegFirst(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Soyad</Label>
                    <Input
                      placeholder="Soyad"
                      value={regLast}
                      onChange={(e) => setRegLast(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Kullanıcı Adı</Label>
                  <Input
                    placeholder="Kullanıcı adı"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Şifre</Label>
                  <Input
                    type="password"
                    placeholder="Şifre"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={loadingRegister}
                  onClick={handleRegister}
                >
                  {loadingRegister ? "Kaydediliyor..." : "Kayıt Ol"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
