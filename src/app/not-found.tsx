'use client';

import Image from 'next/image';

import NotFoundImage from '@/assets/images/not-found.svg';
import Button from '@/components/Buttons';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between items-center gap-6 py-10 md:flex-row sm:py-20">
      <div className="flex flex-col gap-6 text-4xl w-full font-medium md:text-5xl sm:w-1/2 lg:text-6xl xl:text-7xl 2xl:text-8xl">
        <h1>Go Home,</h1>
        <h1>You&apos;re Drunk!</h1>
        <Button
          className="ml-8 my-6 2xl:ml-32 2xl:my-10 lg:ml-20 md:ml-12"
          text="Back To Home"
          onClick={() => router.push('/')}
        />
      </div>
      <Image className="w-full sm:w-1/2" src={NotFoundImage} alt="not-found" />
    </div>
  );
}
