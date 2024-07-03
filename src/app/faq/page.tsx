'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';

import Accordion from '@/components/Accordion/Accordion';

function FAQPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <h1
        className="mt-16 mb-10 text-3xl text-center font-semibold lg:my-24 lg:text-4xl xl:text-5xl 2xl:text-6xl"
        data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="200"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        FAQ
      </h1>
      <ul className="bg-[#e4f0fd] mb-20 px-4 py-10 rounded-[20px] border-2 border-[#7a9acb]/50 xl:px-24 lg:px-16 md:px-12 sm:px-8 sm:py-14 md:py-16 xl:py-20 dark:bg-[#011e25] dark:border-none">
        <li>
          <Accordion
            title="What is Stakeverses?"
            content="Stakeverses is a staking platform for product tokens.  You can create product tokens from Factory Platform(Link to factorygam.org)?"
          />
        </li>
        <li>
          <Accordion
            title="What can I do with Stakeverses?"
            content="You can stake game assets and receive another different game assets as rewards."
          />
        </li>
        <li>
          <Accordion
            title="What is consumable and non consumable?"
            content="..."
          />
        </li>
        <li>
          <Accordion
            title="How can users earn new assets through staking?"
            content="..."
          />
        </li>
        <li>
          <Accordion title="How can I make product token?" content="..." />
        </li>
        <li>
          <Accordion title="How are rewards calculated?" content="..." />
        </li>
      </ul>
    </React.Fragment>
  );
}

export default FAQPage;
