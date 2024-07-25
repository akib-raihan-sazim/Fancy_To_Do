import { Inter } from "next/font/google";
import { useEffect } from 'react';
import { useRouter } from 'next/router'; // or 'next/navigation' for App Router

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/LandingPage');
  }, []);

}