import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import RewardTokenForStakeList from '../ProductToken/RewardTokenForStakeList';
import Button from '@/components/Buttons';
import useWeb3 from '@/hooks/useWeb3';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import { IStakingPoolListProps } from '@/types';
import { calcRemainingTime } from '@/lib/utils';

function MyStakingPoolList({
  instanceId,
  creator,
  instanceAddress,
  stakingTokenInfo,
  rewardTokenInfo,
}: IStakingPoolListProps) {
  const router = useRouter();
  const { account, web3 } = useWeb3();

  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [claimableReward, setClaimableReward] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const productStakingWeb3: any = new web3.eth.Contract(
        ProductStakingAbi,
        instanceAddress
      );
      const _remainingTime = await productStakingWeb3.methods
        .getStakingEndTime()
        .call();
      const _claimableReward = await productStakingWeb3.methods
        .getClaimableReward(account)
        .call();
      setRemainingTime(Number(_remainingTime));
      setClaimableReward(_claimableReward);
    }
    fetchData();
  }, [instanceAddress, account, web3.eth.Contract]);

  return (
    <div className="bg-[#e4f0fd] px-4 py-9 rounded-[20px] border-2 border-[#7a9acb]/50 md:px-6 dark:bg-[#053F40] dark:border-none">
      <div className="flex flex-col items-center justify-center pt-6 gap-2 xl:flex-row xl:gap-0 xl:pt-0">
        <div className="flex items-center justify-center gap-0 lg:gap-4 xl:gap-0">
          {stakingTokenInfo
            .filter((product) => product.consumable === false)
            .map((product, index) => (
              <React.Fragment key={index}>
                <ProductTokenForStakeList
                  tokenId={product.tokenId}
                  tokenAddress={product.tokenAddress}
                  isERC1155={product.isERC1155}
                  ratio={product.ratio}
                />
                {stakingTokenInfo.filter(
                  (product) => product.consumable === true
                ).length !== 0 && (
                  <p className="text-2xl font-medium -mt-16 px-0 sm:text-3xl sm:px-0.5">
                    +
                  </p>
                )}
              </React.Fragment>
            ))}
          {stakingTokenInfo.filter((product) => product.consumable === true)
            .length > 0 ? (
            <React.Fragment>
              <p className="text-3xl font-medium -mt-16 px-0.5 lg:text-5xl">
                &#40;
              </p>
              {stakingTokenInfo
                .filter((product) => product.consumable === true)
                .map((product, index) => (
                  <React.Fragment key={index}>
                    <ProductTokenForStakeList
                      tokenId={product.tokenId}
                      tokenAddress={product.tokenAddress}
                      isERC1155={product.isERC1155}
                      ratio={product.ratio}
                      consumable
                    />
                    {index !==
                      stakingTokenInfo.filter(
                        (product) => product.consumable === true
                      ).length -
                        1 && (
                      <p className="text-2xl font-medium -mt-16 px-0 sm:text-3xl sm:px-0.5">
                        +
                      </p>
                    )}
                  </React.Fragment>
                ))}
              <p className="text-3xl font-medium -mt-16 px-0.5 lg:text-5xl">
                &#41;
              </p>
              <p className="text-sm -mt-14 px-0.5 whitespace-nowrap lg:text-xl md:text-lg">
                * 1D
              </p>
            </React.Fragment>
          ) : null}
        </div>
        <p className="text-xl -mt-14 px-0.5 whitespace-nowrap hidden xl:block">
          =
        </p>
        <p className="text-xl -mt-0 px-0.5 whitespace-nowrap xl:-mt-14 block xl:hidden">
          <Icon icon="mingcute:arrow-down-fill" width="36" height="36" />
        </p>
        <div className="flex justify-center items-center gap-0 lg:gap-4 xl:gap-0">
          {rewardTokenInfo.map((rewardToken, index) => (
            <React.Fragment key={index}>
              <RewardTokenForStakeList
                tokenId={rewardToken.tokenId}
                tokenAddress={rewardToken.tokenAddress}
                ratio={rewardToken.ratio}
                isERC1155={rewardToken.isERC1155}
                claimableReward={claimableReward[index]}
              />
              {index !== rewardTokenInfo.length - 1 && (
                <p className="text-2xl font-medium -mt-16 px-0 sm:text-3xl sm:px-0.5">
                  +
                </p>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 pt-8 w-full md:justify-between md:items-center">
        <div className="flex flex-col justify-start items-center text-base gap-4 xl:gap-14 lg:flex-row md:text-lg lg:text-xl">
          <div className="flex flex-row justify-between items-end w-full gap-4 xl:gap-14">
            <div className="flex flex-col items-center gap-2.5 w-32 text-center xs:w-40">
              <p className="truncate">Instance Id</p>
              <div className="w-full bg-[#c8dcff] border border-[#2F3A42] rounded-lg px-2 py-1 font-medium xs:px-4 xs:py-3 xs:h-[54px] xs:rounded-[15px] dark:bg-[#141D2D]">
                {Number(instanceId)}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-32 text-center xs:w-40">
              <p className="truncate">Remaining time</p>
              <div className="w-full bg-[#c8dcff] border border-[#2F3A42] rounded-lg px-2 py-1 font-medium xs:px-4 xs:py-3 xs:h-[54px] xs:rounded-[15px] dark:bg-[#141D2D]">
                {calcRemainingTime(remainingTime)} days
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2.5 w-auto text-center">
            <p className="truncate">Creator Address</p>
            <div className="flex items-center w-full h-[34px] bg-[#c8dcff] border border-[#2F3A42] rounded-lg px-2 py-1 text-xs tracking-[-1px] sm:text-sm xs:px-4 xs:py-3 xs:h-[54px] xs:rounded-[15px] xs:tracking-[0px] dark:bg-[#141D2D]">
              {creator}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full gap-14 lg:justify-end lg:gap-5 sm:gap-28">
          <Button
            className="!w-[140px] xl:!w-[220px]"
            text="Withdraw"
            variant="primary"
            onClick={() =>
              router.push(`/my-portfolio/${Number(instanceId)}/withdraw`)
            }
          />
          <Button
            className="!w-[120px] xl:!w-[140px]"
            text="Claim"
            variant="primary"
            onClick={() =>
              router.push(`/my-portfolio/${Number(instanceId)}/claim`)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default MyStakingPoolList;
