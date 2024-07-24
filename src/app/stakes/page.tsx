'use client';

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';

import Subtitle from '@/components/Subtitle';
import StakingPoolList from '@/components/StakingPoolList/StakingPoolList';
import useWeb3 from '@/hooks/useWeb3';
import { stakingDataListAtom } from '@/jotai/atoms';

function StakesPage() {
  const { productStakingInstance } = useWeb3();

  const [stakingDataList, setStakingDataList] = useAtom(stakingDataListAtom);

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
      setStakingDataList(stakingData);
    }
    if (Object.keys(productStakingInstance).length > 0) {
      init();
    }
  }, [productStakingInstance, setStakingDataList]);

  return (
    <React.Fragment>
      <h1 className="mt-16 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Stakes
      </h1>
      <div className="relative my-8 rounded-[20px] xl:my-20 lg:my-16 sm:my-12 bg-[#f4f7f9] border-2 border-[#C8C3C3]/50 dark:bg-[#040E20]/75 dark:border-none">
        <Subtitle text="Stakes List" />
        <div className="flex flex-col gap-10 mx-2 pb-10 2xl:mx-16 md:mx-10 text-white">
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
            <div className="flex justify-center items-center text-black text-2xl text-center font-semibold py-[60px] px-8 sm:text-3xl lg:text-4xl sm:px-0 dark:text-white">
              There is no Staking Pools
            </div>
          )}
          <div className="text-black text-2xl text-center font-semibold underline lg:text-3xl xl:text-4xl dark:text-white">
            See More
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StakesPage;
