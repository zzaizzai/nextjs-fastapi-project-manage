import Image from "next/image";
import Link from "next/link";

export default function Home() {




  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/">home</Link>
      <Link href="/posts">posts</Link>
      <div>
        mainpage


      </div>
    </main>
  );
}
