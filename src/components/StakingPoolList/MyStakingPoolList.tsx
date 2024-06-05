import React from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="bg-[#053F40] px-[50px] py-9 rounded-[20px]">
      <div className="flex items-center justify-center gap-4">
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
                <p className="text-[35px] font-medium -mt-16 px-1">+</p>
              )}
            </React.Fragment>
          ))}
        {productInfo.filter((product) => product.consumable === true).length >
        0 ? (
          <React.Fragment>
            <p className="text-[50px] font-medium -mt-16 px-1">&#40;</p>
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
                    productInfo.filter((product) => product.consumable === true)
                      .length -
                      1 && (
                    <p className="text-[35px] font-medium -mt-16 px-1">+</p>
                  )}
                </React.Fragment>
              ))}
            <p className="text-[50px] font-medium -mt-16 px-1">&#41;</p>
            <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">
              * 1 min{' '}
            </p>
          </React.Fragment>
        ) : null}
        <p className="text-[22px] -mt-14 px-1 whitespace-nowrap">=</p>
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
      <div className="flex flex-row justify-between items-center pt-6">
        <div className="flex flex-col items-center gap-2.5 w-[194px] text-center">
          <p className="text-[22px] truncate">Instance Id</p>
          <div className="w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-xl font-medium">
            {Number(instanceId)}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5 w-auto text-center">
          <p className="text-[22px] truncate">Creator Address</p>
          <div className="flex items-center w-full h-[54px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-3 text-sm">
            {creator}
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
            onClick={() => router.push('/my-portfolio/1/withdraw')}
          />
          <Button
            className="!w-[192px] !h-14"
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
