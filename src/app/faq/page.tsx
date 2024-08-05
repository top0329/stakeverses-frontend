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
            content={`<div>
                Stakeverses is a staking platform for product tokens. You can
                create product tokens from Factory Platform(<a href='https://factorygame.org' target='_blank' style='color: #00BBDF; font-weight: 600'>factorygame.org</a>).
              </div>`}
          />
        </li>
        <li>
          <Accordion
            title="What can I do with Stakeverses?"
            content={`You can stake game assets and receive another different game assets as rewards.`}
          />
        </li>
        <li>
          <Accordion
            title="What is consumable and non consumable?"
            content={`<div>
              <p>In Stakeverses, assets are divided into two categories:</p>
              <span style='font-weight: 600;'>Consumable Assets</span>
              <ul style='margin-left: 12px;'>
                <li>
                  • <span style='font-weight: 600;'>Definition:</span> Items that get used up during staking or synthesis.
                </li>
                <li>
                  • <span style='font-weight: 600;'>Examples:</span> Bread, water, pickaxes.
                </li>
                <li>
                  • <span style='font-weight: 600;'>Note:</span> These items are obtained by the project creators as a source of revenue.
                </li>
              </ul>
              <span style='font-weight: 600;'>Non-Consumable Assets</span>
              <ul style='margin-left: 12px;'>
                <li>
                  • <span style='font-weight: 600;'>Definition:</span> Items that do not get used up and can be reused.
                </li>
                <li>
                  • <span style='font-weight: 600;'>Examples:</span> Blueprints, permanent items.
                </li>
              </ul>
              Understanding these categories helps you manage your resources effectively in Stakeverses.
            </div>`}
          />
        </li>
        <li>
          <Accordion
            title="How can users earn new assets through staking?"
            content={`<div>
              <p>Users can earn new assets in Stakeverses by following these steps:</p>
              <ul style='margin-left: 12px;'>
                <li>
                  1. <span style='font-weight: 600;'>Stake Your Assets:</span> Deposit your existing assets, such as resources or tools, into a staking pool.
                </li>
                <li>
                  2. <span style='font-weight: 600;'>Follow the Blueprint:</span> Use blueprints to combine staked assets in specific ways.
                </li>
                <li>
                  3. <span style='font-weight: 600;'>Earn New Assets:</span> Receive new, higher-value assets as a reward for successful staking.
                </li>
              </ul>
              By staking and following blueprints, users can continuously earn and upgrade their assets in Stakeverses.
            </div>`}
          />
        </li>
        <li>
          <Accordion
            title="How can I make product token?"
            content={`<div>
              <p>To create product tokens in Stakeverses, follow these steps:</p>
              <ul style='margin-left: 12px;'>
                <li>
                  1. <span style='font-weight: 600;'>Obtain a Blueprint:</span> Get a blueprint that specifies the components needed to create a product token.
                </li>
                <li>
                  2. <span style='font-weight: 600;'>Gather Components:</span> Collect the necessary consumable and non-consumable assets listed in the blueprint.
                </li>
                <li>
                  3. <span style='font-weight: 600;'>Combine Components:</span> Use the platform to combine the components according to the blueprint.
                </li>
                <li>
                  4. <span style='font-weight: 600;'>Mint the Product Token:</span> Once combined, the system will mint a new product token for you.
                </li>
              </ul>
              By following these steps, you can create new and valuable product tokens in Stakeverses.
            </div>`}
          />
        </li>
        <li>
          <Accordion
            title="How are rewards calculated?"
            content={`<div>
              <p>Rewards in Stakeverses are calculated based on several factors:</p>
              <ul style='margin-left: 12px;'>
                <li>
                  1. <span style='font-weight: 600;'>Staked Assets:</span> The type and amount of assets you stake.
                </li>
                <li>
                  2. <span style='font-weight: 600;'>Blueprints Used:</span> The specific blueprints you follow for staking.
                </li>
                <li>
                  3. <span style='font-weight: 600;'>Staking Duration:</span> The length of time you keep your assets staked.
                </li>
                <li>
                  4. <span style='font-weight: 600;'>Platform Conditions:</span> Current market conditions and platform-specific rules.
                </li>
              </ul>
              These factors combine to determine the total rewards you earn from staking.
            </div>`}
          />
        </li>
      </ul>
    </React.Fragment>
  );
}

export default FAQPage;
