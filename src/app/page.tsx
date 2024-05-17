'use client';

import Image from 'next/image';
import HeroImage from '@/assets/images/hero.svg';
import DiscordIcon from '@/assets/images/discord.svg';
import TwitterIcon from '@/assets/images/twitter.svg';
import TelegramIcon from '@/assets/images/telegram.svg';
import OpenseaIcon from '@/assets/images/opensea.svg';
import WhitepaperIcon from '@/assets/images/whitepaper.svg';
import LandingImages from '@/assets/images/landing-images.svg';
import EllipseImage from '@/assets/images/ellipse.svg';
import PurpleJewelImage from '@/assets/images/purple-jewel.svg';

export default function Home() {
  return (
    <main className="px-[130px] overflow-hidden">
      <Image
        className="absolute -right-60 -top-60"
        src={EllipseImage}
        alt="ellipse"
      />
      <div className="grid grid-cols-12 h-[900px]">
        <div className="relative grid col-span-6 items-center -ml-32 mr-20">
          <Image
            className="absolute"
            src={EllipseImage}
            alt="ellipse"
          />
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
            <button className="btn">Stake</button>
            <button className="btn">Create Instance</button>
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
      <div className="flex justify-center -mx-[500px]">
        <Image className="" src={LandingImages} alt="landing-imgaes" />
      </div>
    </main>
  );
}
