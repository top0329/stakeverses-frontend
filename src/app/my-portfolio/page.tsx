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
      <h1 className="mt-24 text-6xl text-center font-semibold">My Portfolio</h1>
      <div className="flex flex-row text-[38px] font-semibold items-center justify-start mt-24">
        <div
          className={`flex justify-center items-center rounded-tl-[20px] w-[400px] h-[100px] text-center cursor-pointer ${
            activeItem === 0 ? 'bg-[#040E20]/75' : 'bg-[#272727]/40'
          }`}
          onClick={() => setActiveItem(0)}
        >
          My Instance
        </div>
        <div
          className={`flex justify-center items-center rounded-tr-[20px] w-[400px] h-[100px] text-center cursor-pointer ${
            activeItem === 1 ? 'bg-[#040E20]/75' : 'bg-[#272727]/40'
          }`}
          onClick={() => setActiveItem(1)}
        >
          My Stakes
        </div>
      </div>
      {activeItem === 0 && (
        <div className="flex flex-col py-20 px-24 rounded-b-[20px] rounded-tr-[20px] bg-[#040E20]/75 gap-10 mb-20">
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
            <div className="flex justify-center items-center text-[28px] font-semibold text-center py-10">
              There is no instance you created.
            </div>
          )}
        </div>
      )}
      {activeItem === 1 && (
        <div className="flex flex-col py-20 px-24 rounded-b-[20px] rounded-tr-[20px] bg-[#040E20]/75 gap-10 mb-20">
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
            <div className="flex justify-center items-center text-[28px] font-semibold text-center py-10">
              There is no Staking Pools you staked.
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default MyPortfolioPage;
