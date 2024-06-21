'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

import ConnectWallet from '@/components/Buttons/ConnectButton';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import StakeversesLogo from '@/assets/images/Stakeverses-logo.png';
import { ThemeModeToggler } from '../Buttons/ThemeModeToggler';

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 10px)',
    },
  },
};

function Header() {
  const { isConnected } = useWeb3();
  const { showToast } = useToast();
  const router = useRouter();
  const path = usePathname();

  const [activeItem, setActiveItem] = useState<number>(0);
  const [isListButtonClicked, setIsListButtonClicked] =
    useState<boolean>(false);

  const panelVariants = {
    open: {
      width: '100%',
      height: isConnected ? '354px' : '294px',
    },
    closed: {
      width: '100%',
      height: '0px',
    },
  };

  useEffect(() => {
    path.includes('stakes') && setActiveItem(1);
    path.includes('my-portfolio') && setActiveItem(2);
    path.includes('create-instance') && setActiveItem(3);
    path.includes('faq') && setActiveItem(4);
    path === '/' && setActiveItem(0);
  }, [path, setActiveItem]);

  const handleCreateInstance = () => {
    if (isConnected) {
      router.push('/create-instance/product');
      setActiveItem(3);
      setIsListButtonClicked(false);
    } else showToast('warning', 'Please connect wallet!');
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-[68px] h-auto mx-[20px] my-[20px] bg-gradient-to-r from-[#192F3A] to-[#06C2C4] bg-opacity-15 rounded-[34px] border border-white border-opacity-30 2xl:h-[98px] 2xl:mx-[130px] 2xl:my-[51px] xl:h-[88px] xl:mx-[100px] xl:my-[46px] lg:h-[78px] lg:mx-[70px] lg:my-[40px] md:h-[68px] md:my-[40px] md:rounded-full dark:bg-gradient-to-r dark:from-[#2a2c30] dark:to-[#2a2c30] dark:bg-opacity-15">
      <div className="flex justify-between items-center w-full min-h-[68px]">
        <Link href="/" onClick={() => setActiveItem(0)}>
          <Image
            src={StakeversesLogo}
            className="ml-0 w-[180px] h-[54px] lg:w-[230px] lg:h-[72px] xl:w-[280px] xl:h-[80px] 2xl:ml-[15px] 2xl:w-[358px] 2xl:h-[93px] md:ml-[10px]"
            alt="Stakeverses Logo"
            priority
          />
        </Link>
        <div className="hidden justify-center items-center text-lg gap-2 mr-[10px] 2xl:mr-[15px] 2xl:gap-8 2xl:text-2xl xl:gap-6 xl:text-xl lg:gap-4 md:flex">
          <Link
            className={`truncate cursor-pointer ${
              activeItem === 1
                ? 'font-semibold text-[#26DDFF] space-y-0.5'
                : 'font-medium'
            }`}
            href="/stakes"
            onClick={() => setActiveItem(1)}
          >
            Stakes
            {activeItem === 1 && (
              <motion.div
                layoutId="pill-tab"
                transition={{ type: 'spring', duration: 0.5 }}
                className="border border-[#26DDFF] w-full"
              ></motion.div>
            )}
          </Link>
          {isConnected && (
            <Link
              className={`truncate cursor-pointer ${
                activeItem === 2
                  ? 'font-semibold text-[#26DDFF] space-y-0.5'
                  : 'font-medium'
              }`}
              href="/my-portfolio"
              onClick={() => setActiveItem(2)}
            >
              My Portfolio
              {activeItem === 2 && (
                <motion.div
                  layoutId="pill-tab"
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="border border-[#26DDFF] w-full"
                ></motion.div>
              )}
            </Link>
          )}
          <div
            className={`truncate cursor-pointer ${
              activeItem === 3
                ? 'font-semibold text-[#26DDFF] space-y-0.5'
                : 'font-medium'
            }`}
            onClick={handleCreateInstance}
          >
            Create Instance
            {activeItem === 3 && (
              <motion.div
                layoutId="pill-tab"
                transition={{ type: 'spring', duration: 0.5 }}
                className="border border-[#26DDFF] w-full"
              ></motion.div>
            )}
          </div>
          <Link
            className={`truncate cursor-pointer ${
              activeItem === 4
                ? 'font-semibold text-[#26DDFF] space-y-0.5'
                : 'font-medium'
            }`}
            href="/faq"
            onClick={() => setActiveItem(4)}
          >
            FAQ
            {activeItem === 4 && (
              <motion.div
                layoutId="pill-tab"
                transition={{ type: 'spring', duration: 0.5 }}
                className="border border-[#26DDFF] w-full"
              ></motion.div>
            )}
          </Link>
          <ThemeModeToggler />
          <ConnectWallet />
        </div>
        <MotionConfig
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <div className="flex flex-row gap-4 md:hidden">
            <ThemeModeToggler />
            <motion.button
              initial={false}
              animate={isListButtonClicked ? 'open' : 'closed'}
              className="relative h-[70px] w-10 mr-6"
              onClick={() => setIsListButtonClicked(!isListButtonClicked)}
            >
              <motion.span
                variants={VARIANTS.top}
                className="absolute h-1 w-10 rounded-full bg-white"
                style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
              />
              <motion.span
                variants={VARIANTS.middle}
                className="absolute h-1 w-10 rounded-full bg-white"
                style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
              />
              <motion.span
                variants={VARIANTS.bottom}
                className="absolute h-1 w-5 rounded-full bg-white"
                style={{
                  x: '-50%',
                  y: '50%',
                  bottom: '35%',
                  left: 'calc(50% + 10px)',
                }}
              />
            </motion.button>
          </div>
        </MotionConfig>
      </div>
      <AnimatePresence>
        {isListButtonClicked && (
          <motion.div
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col justify-start items-start px-6 text-lg w-full h-full gap-8"
          >
            <Link
              className={`truncate cursor-pointer pt-8 ${
                activeItem === 1
                  ? 'font-semibold text-[#26DDFF] space-y-0.5'
                  : 'font-medium'
              }`}
              href="/stakes"
              onClick={() => {
                setActiveItem(1);
                setIsListButtonClicked(false);
              }}
            >
              Stakes
              {activeItem === 1 && (
                <motion.div
                  layoutId="pill-tab"
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="border border-[#26DDFF] w-full"
                ></motion.div>
              )}
            </Link>
            {isConnected && (
              <Link
                className={`truncate cursor-pointer ${
                  activeItem === 2
                    ? 'font-semibold text-[#26DDFF] space-y-0.5'
                    : 'font-medium'
                }`}
                href="/my-portfolio"
                onClick={() => {
                  setActiveItem(2);
                  setIsListButtonClicked(false);
                }}
              >
                My Portfolio
                {activeItem === 2 && (
                  <motion.div
                    layoutId="pill-tab"
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="border border-[#26DDFF] w-full"
                  ></motion.div>
                )}
              </Link>
            )}
            <div
              className={`truncate cursor-pointer ${
                activeItem === 3
                  ? 'font-semibold text-[#26DDFF] space-y-0.5'
                  : 'font-medium'
              }`}
              onClick={handleCreateInstance}
            >
              Create Instance
              {activeItem === 3 && (
                <motion.div
                  layoutId="pill-tab"
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="border border-[#26DDFF] w-full"
                ></motion.div>
              )}
            </div>
            <Link
              className={`truncate cursor-pointer ${
                activeItem === 4
                  ? 'font-semibold text-[#26DDFF] space-y-0.5'
                  : 'font-medium'
              }`}
              href="/faq"
              onClick={() => {
                setActiveItem(4);
                setIsListButtonClicked(false);
              }}
            >
              FAQ
              {activeItem === 4 && (
                <motion.div
                  layoutId="pill-tab"
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="border border-[#26DDFF] w-full"
                ></motion.div>
              )}
            </Link>
            <ConnectWallet />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
