import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import RewardTokenForStakeList from '../ProductToken/RewardTokenForStakeList';
import Button from '@/components/Buttons';
import { IStakingPoolListProps } from '@/types';

function MyStakingPoolList({
  instanceId,
  creator,
  productInfo,
  rewardTokenInfo,
}: IStakingPoolListProps) {
  const router = useRouter();

  return (
    <div className="bg-[#053F40] px-4 py-9 rounded-[20px] md:px-6">
      <div className="flex flex-col items-center justify-center pt-6 gap-2 xl:flex-row xl:gap-0 xl:pt-0">
        <div className="flex items-center justify-center gap-0 lg:gap-4 xl:gap-0">
          {productInfo
            .filter((product) => product.consumable === false)
            .map((product, index) => (
              <React.Fragment key={index}>
                <ProductTokenForStakeList
                  productId={product.productId}
                  ratio={product.ratio}
                />
                {productInfo.filter((product) => product.consumable === true)
                  .length !== 0 && (
                  <p className="text-3xl font-medium -mt-16 px-0.5">+</p>
                )}
              </React.Fragment>
            ))}
          {productInfo.filter((product) => product.consumable === true).length >
          0 ? (
            <React.Fragment>
              <p className="text-3xl font-medium -mt-16 px-0.5 lg:text-5xl">
                &#40;
              </p>
              {productInfo
                .filter((product) => product.consumable === true)
                .map((product, index) => (
                  <React.Fragment key={index}>
                    <ProductTokenForStakeList
                      productId={product.productId}
                      ratio={product.ratio}
                      consumable
                    />
                    {index !==
                      productInfo.filter(
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
                * 1min
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
              />
              {index !== rewardTokenInfo.length - 1 && (
                <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 pt-8 w-full 2xl:flex-row 2xl:justify-between 2xl:items-end 2xl:gap-4 xl:flex-col xl:items-start lg:flex-row lg:items-end">
        <div className="flex flex-col justify-between items-end text-base gap-4 xl:flex-row md:text-lg lg:text-xl">
          <div className="flex flex-row justify-between items-end w-full gap-4">
            <div className="flex flex-col items-center gap-2.5 min-w-[120px] w-auto text-center">
              <p className="truncate">Instance Id</p>
              <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 font-medium">
                {Number(instanceId)}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-[140px] text-center">
              <p className="truncate">Remaining time</p>
              <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 font-medium">
                03:28
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2.5 w-auto text-center">
            <p className="truncate">Creator Address</p>
            <div className="flex items-center w-full h-[54px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xs sm:text-sm">
              {creator}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full gap-14 lg:justify-end lg:gap-5 sm:gap-28">
          <Button
            className="!w-[140px] xl:!w-[220px] !h-14"
            text="Withdraw"
            variant="primary"
            onClick={() => router.push('/my-portfolio/1/withdraw')}
          />
          <Button
            className="!w-[120px] xl:!w-[140px] !h-14"
            text="Claim"
            variant="primary"
            onClick={() => router.push('/my-portfolio/1/claim')}
          />
        </div>
      </div>
    </div>
  );
}

export default MyStakingPoolList;
