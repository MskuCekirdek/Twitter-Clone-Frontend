import Link from "next/link";

const notFound = () => {
  return (
    <div className="flex flex-col gap-2 h-screen justify-center items-center">
      <h1 className="text-4xl">YAPIM AŞAMASINDA</h1>
      <Link href="/home" className="border rounded-md py-2 px-4">
        Anasayfa'ya git
      </Link>
    </div>
  );
};

export default notFound;
