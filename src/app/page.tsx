'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import Button from '@/components/Buttons';
import HeroImage from '@/assets/images/hero.svg';
import DiscordIcon from '@/assets/images/discord.svg';
import TwitterIcon from '@/assets/images/twitter.svg';
import TelegramIcon from '@/assets/images/telegram.svg';
import OpenseaIcon from '@/assets/images/opensea.svg';
import WhitepaperIcon from '@/assets/images/whitepaper.svg';
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
  return (
    <React.Fragment>
      <div className="grid grid-cols-12 h-full">
        <Image
          className="absolute -right-60 -top-60 -z-10"
          src={EllipseImage}
          alt="ellipse"
        />
        <div className="relative grid col-span-6 items-center -ml-32 mr-20">
          <Image className="absolute -z-10" src={EllipseImage} alt="ellipse" />
          <Image
            className="w-full"
            src={HeroImage}
            alt="Jewel Image"
            priority
          />
        </div>
        <div className="grid col-span-6 my-auto gap-y-10">
          <h1 className="text-[70px] tracking-[-4px] font-medium font-serif">
            Product Token Staking!
          </h1>
          <h3 className="text-2xl">
            We empower creators to unleash the full potential of their creations
            through our innovative staking platform. With our cutting-edge
            technology, creators can tokenize their products and engage with
            their audience like never before.
          </h3>
          <div className="flex gap-14">
            <Button text="Stake" variant="primary" />
            <Button text="Create Instance" variant="primary" />
          </div>
          <div className="flex gap-4">
            <Image
              className="cursor-pointer"
              src={DiscordIcon}
              alt="discord-icon"
            />
            <Image
              className="cursor-pointer"
              src={TwitterIcon}
              alt="twitter-icon"
            />
            <Image
              className="cursor-pointer"
              src={TelegramIcon}
              alt="telegram-icon"
            />
            <Image
              className="cursor-pointer"
              src={OpenseaIcon}
              alt="opensea-icon"
            />
            <Image
              className="cursor-pointer"
              src={WhitepaperIcon}
              alt="whitepaper-icon"
            />
          </div>
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center text-center gap-2 -mx-[130px]">
        <div className="absolute -z-10 flex justify-between left-0 right-0 -ml-[500px] mt-32">
          <Image src={EllipseImage} alt="ellipse" />
          <Image src={PurpleJewelImage} alt="purple-jewel" />
        </div>
        <h1 className="text-[70px] tracking-[-4px] font-medium">
          Stake & Earn Coin
        </h1>
        <p className="text-2xl w-[1090px]">
          We empower creators to unleash the full potential of their creations
          through our innovative staking platform. With our cutting-edge
          technology, creators can tokenize their products and engage with their
          audience like never before.
        </p>
      </div>
      <div className="flex justify-center items-center -mx-[500px] overflow-x-hidden">
        <Image src={LandingImages} alt="landing-imgaes" />
      </div>
      <div className="flex flex-row justify-between -mx-[130px]">
        <Image className="-mt-[300px]" src={SilverImage} alt="silver-image" />
        <Image src={SpearImage} alt="spear-image" />
      </div>
      <div className="flex flex-col justify-center items-center text-center -mt-[200px] mb-[88px]">
        <h1 className="text-[70px]">30 Million Users Worldwide</h1>
        <h6 className="text-2xl w-3/4 mt-8">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable.
        </h6>
      </div>
      <div className="relative w-auto h-full -mx-10 px-32 text-center mb-[178px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
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
        >
          <SwiperSlide className="bg-gradient-to-r from-[#011717] to-[#055F76] rounded-xl">
            <div className="bg-[#010b0c] rounded-xl m-0.5 pt-[116px] flex flex-col justify-center items-center">
              <Image
                className="w-20 h-[54px] mx-auto mb-[58px]"
                src={VectorImage}
                alt="vector"
              />
              <p className="mx-[48px] text-xl opacity-60">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <Image
                className="mt-8 w-[64px] h-[64px]"
                src={Avatar1Image}
                alt="avatar1"
              />
              <h6 className="mt-4 text-2xl font-medium underline">
                Cameron Williamson
              </h6>
              <p className="mt-1.5 mb-[90px] text-base underline text-[#01cacc]">
                FX Trader
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-gradient-to-r from-[#011717] to-[#055F76] rounded-xl">
            <div className="bg-[#010b0c] rounded-xl m-0.5 pt-[116px] flex flex-col justify-center items-center">
              <Image
                className="w-20 h-[54px] mx-auto mb-[58px]"
                src={VectorImage}
                alt="vector"
              />
              <p className="mx-[48px] text-xl opacity-60">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <Image
                className="mt-8 w-[64px] h-[64px]"
                src={Avatar2Image}
                alt="avatar1"
              />
              <h6 className="mt-4 text-2xl font-medium underline">
                Cameron Williamson
              </h6>
              <p className="mt-1.5 mb-[90px] text-base underline text-[#01cacc]">
                FX Trader
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-gradient-to-r from-[#011717] to-[#055F76] rounded-xl">
            <div className="bg-[#010b0c] rounded-xl m-0.5 pt-[116px] flex flex-col justify-center items-center">
              <Image
                className="w-20 h-[54px] mx-auto mb-[58px]"
                src={VectorImage}
                alt="vector"
              />
              <p className="mx-[48px] text-xl opacity-60">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <Image
                className="mt-8 w-[64px] h-[64px]"
                src={Avatar3Image}
                alt="avatar1"
              />
              <h6 className="mt-4 text-2xl font-medium underline">
                Bessie Cooper
              </h6>
              <p className="mt-1.5 mb-[90px] text-base underline text-[#01cacc]">
                Stock Manager
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-gradient-to-r from-[#011717] to-[#055F76] rounded-xl">
            <div className="bg-[#010b0c] rounded-xl m-0.5 pt-[116px] flex flex-col justify-center items-center">
              <Image
                className="w-20 h-[54px] mx-auto mb-[58px]"
                src={VectorImage}
                alt="vector"
              />
              <p className="mx-[48px] text-xl opacity-60">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
              <Image
                className="mt-8 w-[64px] h-[64px]"
                src={Avatar1Image}
                alt="avatar1"
              />
              <h6 className="mt-4 text-2xl font-medium underline">
                Albert Flores
              </h6>
              <p className="mt-1.5 mb-[90px] text-base underline text-[#01cacc]">
                Crypto Analyst
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-button-prev absolute -left-10 bg-[#02F5FF]/10 text-white rounded-full p-10"></div>
        <div className="swiper-button-next bg-[#02F5FF]/10 text-white rounded-full p-10"></div>
      </div>
      <div className="relative">
        <Image
          className="absolute -ml-[130px] -bottom-64"
          src={SwordImage}
          alt="sword"
        />
        <Image
          className="absolute z-10 right-0 -mr-[130px] -top-[400px]"
          src={GoldImage}
          alt="gold"
        />
      </div>
    </React.Fragment>
  );
}
