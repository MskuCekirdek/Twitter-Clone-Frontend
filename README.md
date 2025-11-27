# Twitter_FE — Mini X/Twitter Arayüzü

Next.js 16, App Router ve Tailwind CSS 4 ile hazırlanmış küçük bir X/Twitter klonu. Proje; kimlik doğrulama, tweet oluşturma, feed çekme, gündem kutusu ve durum yönetimi (Zustand) içeriyor. Bu README, daha önce web geliştirmemiş biri için öğretmen anlatımıyla hazırlandı.

---

## HTML Kaynakları
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements
https://www.w3schools.com/tags/default.asp

## CSS Kaynakları
https://www.w3schools.com/w3css/w3css_intro.asp

## Proje Kurulumu (sıfırdan başlama adımları)
1) VS Code’da terminali aç, projeyi kurmak istediğin klasörü aç (`File > Open Folder`).
2) Terminale `npx create-next-app@latest` yaz ve Enter’a bas.
3) Komut “Ok to proceed? (y)” diye sorar, `y` deyip Enter’a bas.
4) “What is your project named?” çıktığında proje adını İngilizce karakter ve boşluksuz gir (ör. `twitter_fe`).
5) “Would you like to use the recommended Next.js defaults?” sorusunda ok tuşlarıyla “Yes, use recommended defaults” seç ve Enter’a bas.
6) Kurulum bittiğinde şöyle bir klasör görmelisin:
   ```
   twitter_fe/
     app/
     components/
     public/
     package.json
     ...
   ```

> Bu repo o adımlarla oluşturuldu; aşağıdaki kılavuz, projeyi indirip çalıştırmak isteyenler içindir.

---

## Ortam Gereksinimleri
- Node.js 18+ (Next.js 16 bunu istiyor)
- npm (varsayılan olarak geliyor)
- Bir REST API (kardeş klasördeki `twitter_api` veya `NEXT_PUBLIC_API_URL` ile ulaşılabilen başka bir backend)

---

## Depoyu İndirip Çalıştırma
```bash
git clone <repo-url>
cd twitter_fe
npm install
```

### Ortam değişkeni
Projenin API ile konuşabilmesi için `.env.local` dosyasına backend adresini ekle:
```
NEXT_PUBLIC_API_URL="https://msku-cekirdek-twitterapi-nds0uc-becaec-45-141-151-147.traefik.me"
```
- Backend’i önce başlat; frontend giriş ve tweet isteklerini buraya yolluyor.

### Geliştirme sunucusu
```bash
npm run dev
# tarayıcı: http://localhost:3000/auth   (giriş/kayıt ekranı)
# tarayıcı: http://localhost:3000/home   (feed)
```

---

## Proje Yapısı (öğrenci gözüyle kısaca)
- `app/layout.tsx`: Tüm sayfalara uygulanan ortak çerçeve ve font ayarı.
- `app/auth/page.tsx`: Giriş/Kayıt sekmeli ekranı, form kontrolleri ve API çağrıları.
- `app/home/page.tsx`: Ana sayfa; sol menü, orta feed, sağ gündem kutusu.
- `app/_components/`: Tekil UI parçaları (Sidebar, Trendbar, tweet kartı, tweet oluşturma vb.).
- `app/_hooks/`: API istekleri (`auth.service.ts`, `post.service.ts`).
- `app/_stores/`: Zustand ile kullanıcı ve token bilgisini saklayan store.
- `components/ui/`: Button, Input, Tabs gibi yeniden kullanılabilir UI bileşenleri (Radix + shadcn tarzı).
- `app/globals.css`: Tailwind 4 katmanları, tema değişkenleri, global stiller.

---

## Geliştirme Adımları (nasıl ilerledik?)
1) **Next.js kurulumu:** `create-next-app` ile temel iskeleti oluşturduk.
2) **Tailwind 4 ekleme:** `app/globals.css` içine Tailwind’i dahil edip tema değişkenlerini tanımladık.
3) **Temel layout:** `app/layout.tsx` ile tüm sayfalara ortak font, tema ve `<body>` yapısı verdik.
4) **Kimlik doğrulama:** `app/auth/page.tsx` içinde Tabs ile “Giriş Yap / Kayıt Ol” akışını kurduk; `auth.service.ts` üzerinden API’ye istek atıyoruz, `useAuthStore` ile kullanıcı bilgisini saklıyoruz.
5) **Tweet akışı:** `post.service.ts` feed ve tweet oluşturma isteklerini yapıyor. `TweetFeed` ilk sayfayı çekiyor, “Daha Fazla Yükle” ile sayfayı artırarak devam ediyor. `Tweetcreate` giriş yapmış kullanıcıya tweet atma alanı veriyor.
6) **Arayüz parçaları:** Sidebar, Trendbar ve TweetCard bileşenleriyle sayfa üç kolona bölündü.
7) **Geri bildirimler:** Başarılı/başarısız işlemler için `sonner` ile toast mesajları gösteriyoruz.

---

## Kullanışlı Komutlar
- `npm run dev` — Geliştirme sunucusu (hot-reload).
- `npm run build` — Production derlemesi.
- `npm run start` — Build sonrası uygulamayı çalıştırır.
- `npm run lint` — ESLint kontrolü.

---

## Sık Sorulan Küçük Notlar
- “401 / yetkisiz” hatası alırsan: Token yoktur; `/auth`’tan giriş yap veya `.env.local` adresinin doğru olduğundan emin ol.
- Feed boşsa: Backend’i çalıştır, `NEXT_PUBLIC_API_URL`’deki portun doğru olduğuna bak.
- Stil değişiklikleri hemen yansımıyorsa: `npm run dev`’in açık olduğundan ve dosyayı kaydettiğinden emin ol.

---

## Sonraki Adımlar (kendini geliştirmek için)
- Backend’ten dönen kullanıcı avatarını gerçek görsel ile eşleştir.
- Tweetlere beğeni/yorum/retweet aksiyonları ekle.
- `Trendbar` verisini statik yerine API’den çek.
- Light/Dark tema geçişini UI’ya ekle (tema değişkenleri hazır).
