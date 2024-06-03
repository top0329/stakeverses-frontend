'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import MyStakingPoolList from '@/components/StakingPoolList/MyStakingPoolList';
import useWeb3 from '@/hooks/useWeb3';
import { truncateAddress } from '@/lib/utils';
import { myStakingDataListAtom } from '@/jotai/atoms';

function MyPortfolioPage() {
  const { productStakingInstance } = useWeb3();
  const router = useRouter();

  const [myStakingDataList, setMyStakingDataList] = useAtom(
    myStakingDataListAtom
  );

  const [activeItem, setActiveItem] = useState<number>(0);
  const [myStakedInstanceIds, setMyStakedInstanceIds] = useState([1]);

  useEffect(() => {
    async function fetchData() {
      const stakingData = await Promise.all(
        myStakedInstanceIds.map(async (id: number) => {
          const stakeData = await productStakingInstance.methods
            .getStakingInfo(id)
            .call();
          return { ...stakeData, instanceId: id };
        })
      );
      setMyStakingDataList(stakingData);
      console.log(stakingData);
    }
    if (Object.keys(productStakingInstance).length > 0) {
      fetchData();
    }
  }, [myStakedInstanceIds, productStakingInstance, setMyStakingDataList]);

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        My Portfolio
      </h1>
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
          <div className="bg-[#053F40] px-[50px] py-9 rounded-[20px]">
            <div className="flex items-center justify-between">
              <ProductTokenForStakeList productId={'72'} ratio={'1'} />
              <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              <ProductTokenForStakeList productId={'73'} ratio={'1'} />
              <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              <p className="text-[50px] font-medium -mt-16 px-1">&#40;</p>
              <ProductTokenForStakeList
                productId={'71'}
                ratio={'1'}
                consumable
              />
              <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              <ProductTokenForStakeList
                productId={'74'}
                ratio={'1'}
                consumable
              />
              <p className="text-[50px] font-medium -mt-16 px-1">&#41;</p>
              <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">
                * 1 min{' '}
              </p>
              <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">=</p>
              <ProductTokenForStakeList productId={'9'} ratio={'1'} />
            </div>
            <div className="flex flex-row justify-between items-center pt-6">
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px] truncate">Instance Id</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  0983
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px] truncate">Creator Address</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  0x1I8D...8SDF
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px] truncate">Remaining time</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  03:28
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <Button
                  className="!w-[260px] !h-14"
                  text="Charge Reward"
                  variant="primary"
                  onClick={() => router.push('/my-portfolio/8/charge-reward')}
                />
                <Button
                  className="!w-[192px] !h-14"
                  text="Pause"
                  variant="primary"
                />
              </div>
            </div>
          </div>
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
          {/* <div className="bg-[#053F40] px-[50px] py-9 rounded-[20px]">
            <div className="flex items-center justify-between">
              <ProductTokenForStakeList productId={'5'} ratio={'1'} />
              <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              <ProductTokenForStakeList productId={'5'} ratio={'1'} />
              <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              <p className="text-[50px] font-medium -mt-16 px-1">&#40;</p>
              <ProductTokenForStakeList
                productId={'6'}
                ratio={'1'}
                consumable
              />
              <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              <ProductTokenForStakeList
                productId={'6'}
                ratio={'1'}
                consumable
              />
              <p className="text-[50px] font-medium -mt-16 px-1">&#41;</p>
              <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">
                * 1 min{' '}
              </p>
              <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">=</p>
              <ProductTokenForStakeList productId={'9'} ratio={'1'} />
            </div>
            <div className="flex flex-row justify-between items-center pt-6">
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px] truncate">Instance Id</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  0983
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px] truncate">Creator Address</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  0x1I8D...8SDF
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
                <p className="text-[22px] truncate">Remaining time</p>
                <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
                  03:28
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <Button
                  className="!w-[192px] !h-14"
                  text="Withdraw"
                  variant="primary"
                  onClick={() => router.push('/my-portfolio/8/withdraw')}
                />
                <Button
                  className="!w-[192px] !h-14"
                  text="Claim"
                  variant="primary"
                  onClick={() => router.push('/my-portfolio/8/claim')}
                />
              </div>
            </div>
          </div> */}
        </div>
      )}
    </React.Fragment>
  );
}

export default MyPortfolioPage;
