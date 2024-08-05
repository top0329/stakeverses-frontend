'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AOS from 'aos';

import Button from '@/components/Buttons';
import HeroImage from '@/assets/images/hero.svg';
import LandingImages from '@/assets/images/landing-images.svg';
import EllipseImage from '@/assets/images/ellipse.svg';
import PurpleJewelImage from '@/assets/images/purple-jewel.svg';
import SwordImage from '@/assets/images/sword.svg';
import GoldImage from '@/assets/images/gold.svg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-y-16 md:gap-0">
        <Image
          className="absolute -right-60 -top-60 -z-10"
          src={EllipseImage}
          alt="ellipse"
        />
        <div
          className="relative grid col-span-12 order-last items-center ml-0 mr-0 xl:mr-20 lg:-ml-32 md:col-span-6 md:order-first md:-ml-14 md:mr-2"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <Image className="absolute -z-10" src={EllipseImage} alt="ellipse" />
          <Image
            className="w-full"
            src={HeroImage}
            alt="Jewel Image"
            priority
          />
        </div>
        <div
          className="grid col-span-12 my-auto text-center mt-10 gap-y-6 lg:gap-y-12 md:col-span-6 md:text-left md:mt-8"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <h1 className="text-5xl tracking-[-1px] font-medium font-serif 2xl:text-[68px] xl:text-6xl lg:text-5xl lg:tracking-[-4px] md:text-4xl">
            Product Token Staking!
          </h1>
          <h3 className="text-lg xl:text-2xl lg:text-xl">
            We empower creators to unleash the full potential of their creations
            through our innovative staking platform. With our cutting-edge
            technology, creators can tokenize their products and engage with
            their audience like never before.
          </h3>
          <div className="flex justify-center gap-4 xl:gap-14 lg:gap-10 md:justify-start">
            <Button
              className="!w-[120px] md:!w-[180px] xl:!w-[250px] lg:!w-[200px]"
              text="Stake"
              variant="outline"
              onClick={() => router.push('/stakes')}
            />
            <Button
              className="!w-[180px] xl:!w-[250px] lg:!w-[200px]"
              text="Create Instance"
              variant="primary"
              onClick={() => router.push('/create-instance/product')}
            />
          </div>
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center text-center gap-2 -mx-w-auto mt-16 lg:-mx-[130px] md:-mx-[70px]">
        <div className="absolute -z-10 flex justify-between left-0 right-0 -ml-[500px] mt-32">
          <Image
            src={EllipseImage}
            alt="ellipse"
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-delay="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          />
          <Image
            src={PurpleJewelImage}
            alt="purple-jewel"
            data-aos="fade-left"
            data-aos-offset="200"
            data-aos-delay="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          />
        </div>
        <h1
          className="text-5xl tracking-[-1px] font-medium my-8 2xl:text-[68px] xl:text-6xl lg:text-5xl lg:tracking-[-4px] md:text-4xl"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          Stake & Earn Coin
        </h1>
        <p
          className="text-xl w-auto px-6 2xl:px-0 xl:px-10 lg:px-24 lg:text-2xl lg:w-[1090px] md:w-[900px] md:px-32"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          We empower creators to unleash the full potential of their creations
          through our innovative staking platform. With our cutting-edge
          technology, creators can tokenize their products and engage with their
          audience like never before.
        </p>
      </div>
      <div
        className="flex justify-center items-center -mx-[500px] mb-40 overflow-x-hidden"
        data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="200"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <Image src={LandingImages} alt="landing-imgaes" />
      </div>
      <div className="relative flex">
        <Image
          className="absolute -z-10 -ml-[130px] w-[400px] -top-[300px] md:w-[469px] md:-top-[350px] !rotate-[-42.61deg]"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          src={SwordImage}
          alt="sword"
        />
        <Image
          className="absolute z-10 right-0 w-[200px] md:w-[400px] -mr-[130px] -top-[250px] md:-top-[350px]"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          src={GoldImage}
          alt="gold"
        />
      </div>
    </React.Fragment>
  );
}
