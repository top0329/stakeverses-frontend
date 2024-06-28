'use client';

import React, { FC } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { IAccordion } from '@/types';

const Accordion: FC<IAccordion> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <button
        type="button"
        className={`flex justify-between items-center w-full py-5 text-left text-xl transition-colors delay-100 md:text-2xl lg:text-[28px] ${
          isExpanded
            ? 'text-[#00BBDF] font-bold'
            : 'text-black font-medium dark:text-white'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Icon
            className="min-w-6"
            icon="radix-icons:dot-filled"
            width="24"
            height="24"
          />
          {title}
        </div>
        <Icon
          className="flex min-w-10 text-black dark:text-white"
          icon={
            isExpanded
              ? 'heroicons:minus-circle-16-solid'
              : 'heroicons:plus-circle-16-solid'
          }
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </button>
      <div
        className={`grid text-light-gray text-lg md:text-xl overflow-hidden transition-200 duration-700 ease-in-out ${
          isExpanded ? 'max-h-[500px] sm:max-h-[300px]' : 'max-h-[0px]'
        }`}
      >
        <div className="pl-6 pb-5 pr-10">{content}</div>
      </div>
    </React.Fragment>
  );
};

export default Accordion;
