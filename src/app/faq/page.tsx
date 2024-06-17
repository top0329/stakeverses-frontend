import Accordion from '@/components/Accordion/Accordion';
import React from 'react';

function FAQPage() {
  return (
    <React.Fragment>
      <h1 className="mt-16 mb-10 text-3xl text-center font-semibold lg:mt-24 lg:mb-[60px] lg:text-4xl xl:text-5xl 2xl:text-6xl">
        FAQ
      </h1>
      <ul className="bg-[#011e25] px-4 py-10 rounded-[20px] xl:px-24 lg:px-16 md:px-12 sm:px-8 sm:py-14 md:py-16 xl:py-20">
        <li>
          <Accordion
            title="What is Stakeverses?"
            content="Stakeverses is a staking platform for product tokens.  You can create product tokens from Factory Platform(Link to factorygam.org).?"
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
