'use client';

import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import MyStakingPoolList from '@/components/StakingPoolList/MyStakingPoolList';
import MyInstanceList from '@/components/StakingPoolList/MyInstanceList';
import useWeb3 from '@/hooks/useWeb3';
import {
  myCreatedInstanceDataListAtom,
  myStakingDataListAtom,
} from '@/jotai/atoms';

function MyPortfolioPage() {
  const { productStakingInstance, account } = useWeb3();

  const [myStakingDataList, setMyStakingDataList] = useAtom(
    myStakingDataListAtom
  );
  const [myCreatedInstanceDataList, setMyCreatedInstanceDataList] = useAtom(
    myCreatedInstanceDataListAtom
  );

  const [activeItem, setActiveItem] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const _myStakedInstanceIds = await productStakingInstance.methods
        .getInstanceIdsForUser(account)
        .call();
      const _myCreatedInstanceIds = await productStakingInstance.methods
        .getCreatorInstanceIds(account)
        .call();
      const stakingData = await Promise.all(
        _myStakedInstanceIds.map(async (id: number) => {
          const createdInstanceData = await productStakingInstance.methods
            .getStakingInfo(id)
            .call();
          return { ...createdInstanceData, instanceId: id };
        })
      );
      const createdInstanceData = await Promise.all(
        _myCreatedInstanceIds.map(async (id: number) => {
          const stakeData = await productStakingInstance.methods
            .getStakingInfo(id)
            .call();
          return { ...stakeData, instanceId: id };
        })
      );
      setMyStakingDataList(stakingData);
      setMyCreatedInstanceDataList(createdInstanceData);
    }
    if (Object.keys(productStakingInstance).length > 0 && account) {
      fetchData();
    }
  }, [
    account,
    productStakingInstance,
    setMyCreatedInstanceDataList,
    setMyStakingDataList,
  ]);

  return (
    <React.Fragment>
      <h1 className="mt-16 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        My Portfolio
      </h1>
      <div className="flex flex-row text-2xl font-semibold items-center justify-start mt-24 xl:text-4xl md:text-3xl">
        <div
          className={`flex justify-center items-center rounded-tl-[20px] w-[300px] h-[100px] text-center cursor-pointer lg:w-[400px] ${
            activeItem === 0
              ? 'bg-[#117077] text-white dark:bg-[#040E20]/75'
              : 'bg-[#e4f0fd] dark:bg-[#272727]/40'
          }`}
          onClick={() => setActiveItem(0)}
        >
          My Instance
        </div>
        <div
          className={`flex justify-center items-center rounded-tr-[20px] w-[300px] h-[100px] text-center cursor-pointer lg:w-[400px] ${
            activeItem === 1
              ? 'bg-[#117077] text-white dark:bg-[#040E20]/75'
              : 'bg-[#e4f0fd] dark:bg-[#272727]/40'
          }`}
          onClick={() => setActiveItem(1)}
        >
          My Stakes
        </div>
      </div>
      {activeItem === 0 && (
        <div className="relative flex flex-col py-10 px-2 rounded-b-[20px] rounded-tr-[20px] bg-[#f4f7f9] gap-10 mb-20 border-2 border-[#C8C3C3]/50 2xl:px-16 md:px-10 md:py-14 xl:py-20 dark:bg-[#040E20]/75 dark:border-none">
          {myCreatedInstanceDataList.length > 0 ? (
            myCreatedInstanceDataList.map((stakingData) => (
              <MyInstanceList
                key={stakingData.instanceId}
                instanceId={stakingData.instanceId}
                creator={stakingData.creator}
                instanceAddress={stakingData.instanceAddress}
                productInfo={stakingData.productInfo}
                rewardTokenInfo={stakingData.rewardTokenInfo}
              />
            ))
          ) : (
            <div className="flex justify-center items-center text-2xl text-center font-semibold py-[60px] px-8 sm:text-3xl lg:text-4xl sm:px-0">
              There is no instance you created.
            </div>
          )}
        </div>
      )}
      {activeItem === 1 && (
        <div className="relative flex flex-col py-10 px-2 rounded-b-[20px] rounded-tr-[20px] bg-[#f4f7f9] gap-10 mb-20 border-2 border-[#C8C3C3]/50 2xl:px-16 md:px-10 md:py-14 xl:py-20 dark:bg-[#040E20]/75 dark:border-none">
          {myStakingDataList.length > 0 ? (
            myStakingDataList.map((stakingData) => (
              <MyStakingPoolList
                key={stakingData.instanceId}
                instanceId={stakingData.instanceId}
                creator={stakingData.creator}
                instanceAddress={stakingData.instanceAddress}
                productInfo={stakingData.productInfo}
                rewardTokenInfo={stakingData.rewardTokenInfo}
              />
            ))
          ) : (
            <div className="flex justify-center items-center text-2xl text-center font-semibold py-[60px] px-8 sm:text-3xl lg:text-4xl sm:px-0">
              There is no Staking Pools you staked.
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default MyPortfolioPage;
