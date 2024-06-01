'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';

import Subtitle from '@/components/Subtitle';
import StakingPoolList from '@/components/StakingPoolList/StakingPoolList';
import useWeb3 from '@/hooks/useWeb3';
import { stakingDataListAtom } from '@/jotai/atoms';

function StakesPage() {
  const { productStakingInstance } = useWeb3();

  const [stakingDataList, setStakingDataList] = useAtom(stakingDataListAtom);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    async function init() {
      const instanceIds = await productStakingInstance.methods
        .getInstanceIds()
        .call();
      const stakingData = await Promise.all(
        instanceIds.map(async (id: bigint) => {
          const stakeData = await productStakingInstance.methods
            .getStakingInfo(id)
            .call();
          return { ...stakeData, instanceId: id };
        })
      );
      console.log(stakingData);
      setStakingDataList(stakingData);
    }
    if (Object.keys(productStakingInstance).length > 0) {
      init();
    }
  }, [productStakingInstance, setStakingDataList]);

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Stakes
      </h1>
      <div className="relative my-24 rounded-[20px] bg-[#040E20]/75">
        <Subtitle text="Stakes List" />
        <button
          className="absolute top-[50px] right-[96px] flex items-center gap-5 bg-gradient-to-r from-[#192F3A] to-[#06C2C4] text-white text-[22px] font-semibold rounded-[5px] py-2.5 px-[18px]"
          onClick={handleDropdown}
        >
          <span>View</span>
          <Icon icon="ep:arrow-down-bold" />
        </button>
        <div
          id="dropdown"
          className={`absolute top-[110px] right-[96px] z-10  bg-[#00242D] divide-y divide-gray-100 rounded-[5px] shadow w-[140px] h-[108px] ${
            isDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="px-2 py-3 text-xl text-center">
            <li className="bg-gradient-to-br from-[#00B8E2] to-[#00E2B2] py-1.5 px-[15px] rounded-[5px] mb-2">
              <button>List View</button>
            </li>
            <li className="py-1.5 px-[15px] rounded-[5px]">
              <button>Grid View</button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10 mx-[90px] pb-10">
          {stakingDataList.length > 0 ? (
            stakingDataList.map((stakingData) => (
              <StakingPoolList
                key={stakingData.instanceId}
                instanceId={stakingData.instanceId}
                creator={stakingData.creator}
                instanceAddress={stakingData.instanceAddress}
                productInfo={stakingData.productInfo}
                rewardTokenInfo={stakingData.rewardTokenInfo}
              />
            ))
          ) : (
            <div className='flex justify-center items-center text-[28px] font-semibold text-center py-10'>There is no Staking Pools</div>
          )}
          <div className="text-[38px] text-center font-semibold underline">
            See More
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StakesPage;
