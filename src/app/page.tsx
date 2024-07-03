'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import Button from '@/components/Buttons';
import HeroImage from '@/assets/images/hero.svg';
import LandingImages from '@/assets/images/landing-images.svg';
import EllipseImage from '@/assets/images/ellipse.svg';
import PurpleJewelImage from '@/assets/images/purple-jewel.svg';
import SilverImage from '@/assets/images/silver.svg';
import SpearImage from '@/assets/images/spear-dragoon-holy-lance-ranged-weapon.svg';
import VectorImage from '@/assets/images/Vector.png';
import Avatar1Image from '@/assets/images/avatar1.png';
import Avatar2Image from '@/assets/images/avatar2.png';
import Avatar3Image from '@/assets/images/avatar3.png';
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
          <div className="flex justify-center gap-4 md:justify-start">
            <Icon
              className="p-1.5 rounded-full border-2 border-black cursor-pointer dark:border-[#00cfc9]"
              icon="bxl:discord-alt"
              width="54"
              height="54"
            />
            <Icon
              className="p-1.5 rounded-full border-2 border-black cursor-pointer dark:border-cyan"
              icon="uil:twitter"
              width="54"
              height="54"
            />
            <Icon
              className="p-1.5 rounded-full border-2 border-black cursor-pointer dark:border-cyan"
              icon="ri:telegram-2-fill"
              width="54"
              height="54"
            />
            <Icon
              className="p-2.5 rounded-full border-2 border-black cursor-pointer dark:border-cyan"
              icon="fa:book"
              width="54"
              height="54"
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
        className="flex justify-center items-center -mx-[500px] overflow-x-hidden"
        data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="200"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <Image src={LandingImages} alt="landing-imgaes" />
      </div>
      <div className="flex flex-row justify-between -mx-[130px]">
        <Image
          className="-ml-[200px] w-[200px] md:w-[400px]"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          src={SilverImage}
          alt="silver-image"
        />
        <Image
          className="-mr-[100px] w-[200px] md:w-[400px]"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          src={SpearImage}
          alt="spear-image"
        />
      </div>
      <div
        className="flex flex-col justify-center items-center text-center -mt-[200px] mb-[88px]"
        data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="200"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <h1 className="text-5xl 2xl:text-[68px] xl:text-6xl lg:text-5xl md:text-4xl">
          30 Million Users Worldwide
        </h1>
        <h6 className="text-xl w-full mt-8 lg:text-2xl md:w-3/4">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable.
        </h6>
      </div>
      <div
        className="relative w-auto h-full -mx-6 px-6 text-center mb-[178px] 2xl:px-32 lg:-mx-10 md:px-28 md:-mx-0 xs:px-16"
        data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="200"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <Swiper
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ type: 'bullets', clickable: true }}
          loop={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide className="bg-gradient-to-r from-[#011717] to-[#055F76] rounded-xl">
            <div className="flex flex-col justify-center items-center bg-white rounded-xl m-0.5 pt-20 pb-16 px-2 2xl:pt-28 2xl:pb-24 2xl:px-12 xl:pt-20 xl:pb-16 xl:px-4 lg:pt-28 lg:pb-24 lg:px-10 md:pt-20 md:pb-16 md:px-2 sm:pt-24 sm:pb-20 sm:px-8 dark:bg-[#010b0c]">
              <Image
                className="w-20 h-12 mx-auto mb-12"
                src={VectorImage}
                alt="vector"
              />
              <p className="text-lg opacity-60 lg:text-xl">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <Image
                className="mt-8 w-[64px] h-[64px]"
                src={Avatar1Image}
                alt="avatar1"
              />
              <h6 className="truncate mt-4 text-xl font-medium underline lg:text-2xl">
                Cameron Williamson
              </h6>
              <p className="mt-1.5 text-base underline text-[#01cacc]">
                FX Trader
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-gradient-to-r from-[#011717] to-[#055F76] rounded-xl">
            <div className="flex flex-col justify-center items-center bg-white rounded-xl m-0.5 pt-20 pb-16 px-2 2xl:pt-28 2xl:pb-24 2xl:px-12 xl:pt-20 xl:pb-16 xl:px-4 lg:pt-28 lg:pb-24 lg:px-10 md:pt-20 md:pb-16 md:px-2 sm:pt-24 sm:pb-20 sm:px-8 dark:bg-[#010b0c]">
              <Image
                className="w-20 h-12 mx-auto mb-12"
                src={VectorImage}
                alt="vector"
              />
              <p className="text-lg opacity-60 lg:text-xl">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <Image
                className="mt-8 w-[64px] h-[64px]"
                src={Avatar2Image}
                alt="avatar1"
              />
              <h6 className="truncate mt-4 text-xl font-medium underline lg:text-2xl">
                Cameron Williamson
              </h6>
              <p className="mt-1.5 text-base underline text-[#01cacc]">
                FX Trader
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-gradient-to-r from-[#011717] to-[#055F76] rounded-xl">
            <div className="flex flex-col justify-center items-center bg-white rounded-xl m-0.5 pt-20 pb-16 px-2 2xl:pt-28 2xl:pb-24 2xl:px-12 xl:pt-20 xl:pb-16 xl:px-4 lg:pt-28 lg:pb-24 lg:px-10 md:pt-20 md:pb-16 md:px-2 sm:pt-24 sm:pb-20 sm:px-8 dark:bg-[#010b0c]">
              <Image
                className="w-20 h-12 mx-auto mb-12"
                src={VectorImage}
                alt="vector"
              />
              <p className="text-lg opacity-60 lg:text-xl">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <Image
                className="mt-8 w-[64px] h-[64px]"
                src={Avatar3Image}
                alt="avatar1"
              />
              <h6 className="truncate mt-4 text-xl font-medium underline lg:text-2xl">
                Bessie Cooper
              </h6>
              <p className="mt-1.5 text-base underline text-[#01cacc]">
                Stock Manager
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-gradient-to-r from-[#011717] to-[#055F76] rounded-xl">
            <div className="flex flex-col justify-center items-center bg-white rounded-xl m-0.5 pt-20 pb-16 px-2 2xl:pt-28 2xl:pb-24 2xl:px-12 xl:pt-20 xl:pb-16 xl:px-4 lg:pt-28 lg:pb-24 lg:px-10 md:pt-20 md:pb-16 md:px-2 sm:pt-24 sm:pb-20 sm:px-8 dark:bg-[#010b0c]">
              <Image
                className="w-20 h-12 mx-auto mb-12"
                src={VectorImage}
                alt="vector"
              />
              <p className="text-lg opacity-60 lg:text-xl">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <Image
                className="mt-8 w-[64px] h-[64px]"
                src={Avatar1Image}
                alt="avatar1"
              />
              <h6 className="truncate mt-4 text-xl font-medium underline lg:text-2xl">
                Albert Flores
              </h6>
              <p className="mt-1.5 text-base underline text-[#01cacc]">
                Crypto Analyst
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-button-prev !z-20 bg-[#055f76]/60 !top-[107%] !left-[30%] rounded-full p-6 md:p-10 xs:!left-[2%] xs:!top-1/2 dark:bg-[#02F5FF]/10 dark:text-white"></div>
        <div className="swiper-button-next !z-20 bg-[#055f76]/60 !top-[107%] !right-[30%] rounded-full p-6 md:p-10 xs:!right-[2%] xs:!top-1/2 dark:bg-[#02F5FF]/10 dark:text-white"></div>
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
