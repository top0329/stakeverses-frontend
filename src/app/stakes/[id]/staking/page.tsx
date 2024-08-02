'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import Button from '@/components/Buttons';
import ProductTokenStakeList from '@/components/Lists/ProductTokenStakeList';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import useSpinner from '@/hooks/useSpinner';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import {
  currentPoolDataAtom,
  isProductApproveAvailableAtom,
  stakeBaseAmountAtom,
} from '@/jotai/atoms';
import getTokenData from '@/lib/getTokenData';
import getERC1155Data from '@/lib/getERC1155Data';
import { getGasPrice } from '@/lib/getGasPrice';

function StakingPage() {
  const { account, chainId, web3, library } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();
  const { showToast } = useToast();
  const router = useRouter();

  const [currentPoolData] = useAtom(currentPoolDataAtom);
  const [stakeBaseAmount, setStakeBaseAmount] =
    useAtom<number>(stakeBaseAmountAtom);
  const [isProductApproveAvailable] = useAtom<boolean>(
    isProductApproveAvailableAtom
  );

  const [numberOfStakers, setNumberOfStakers] = useState<number>(0);
  const [totalStakingBaseAmount, setTotalStakingBaseAmount] =
    useState<number>(0);
  const [totalValueStakedArray, setTotalValueStakedArray] = useState<any[]>([]);

  const productStakingWeb3: any = new web3.eth.Contract(
    ProductStakingAbi,
    currentPoolData.instanceAddress
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const _numberOfStakers = await productStakingWeb3.methods
          .getStakers()
          .call();
        const _totalStakingBaseAmount = await productStakingWeb3.methods
          .totalStakingBaseAmount()
          .call();
        setNumberOfStakers(Number(_numberOfStakers.length));
        setTotalStakingBaseAmount(Number(_totalStakingBaseAmount));
        setTotalValueStakedArray(
          await Promise.all(
            currentPoolData.stakingTokenInfo.map(async (product, idx) => {
              let _tokenName: string = '';
              if (product.isERC1155) {
                const erc1155Data = await getERC1155Data(
                  product.tokenAddress as Address,
                  Number(product.tokenId),
                  library
                );
                if (erc1155Data) {
                  const { name } = erc1155Data;
                  _tokenName = name;
                }
              } else {
                const erc20Data = await getTokenData(
                  product.tokenAddress as Address,
                  library
                );
                if (erc20Data) {
                  const { tokenName } = erc20Data;
                  _tokenName = tokenName;
                }
              }
              return (
                <div
                  key={idx}
                  className="flex flex-row justify-between items-center bg-[#47556e] rounded-[20px] px-8 py-8 text-xl font-semibold sm:text-2xl dark:bg-[#141D2D]/70"
                >
                  <p>{_tokenName}</p>
                  <p>{Number(product.ratio) * totalStakingBaseAmount}</p>
                </div>
              );
            })
          )
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [
    currentPoolData.stakingTokenInfo,
    library,
    productStakingWeb3.methods,
    totalStakingBaseAmount,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStakeBaseAmount(Number(value));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        (event.key >= '0' &&
          event.key <= '9' &&
          event.getModifierState('NumLock'))
      )
    ) {
      event.preventDefault();
    }
  };

  const handleStake = async () => {
    if (
      currentPoolData.stakingTokenInfo.filter((token) => token.isApproved).length ===
      currentPoolData.stakingTokenInfo.length
    ) {
      try {
        openSpin('Staking Product');
        const gasPrice = await getGasPrice(web3, chainId!);
        await productStakingWeb3.methods
          .staking(stakeBaseAmount)
          .send({ from: account, gasPrice });
        setStakeBaseAmount(0);
        router.push('/my-portfolio');
      } catch (err) {
        console.log(err);
      } finally {
        closeSpin();
      }
    } else {
      showToast('warning', 'Please approve all reward tokens!');
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-16 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Stakes
      </h1>
      <div className="relative grid grid-cols-12 my-8 rounded-[20px] bg-[#e4f0fd] gap-2 px-2 pt-[80px] pb-[93px] border-2 border-[#C8C3C3]/50 2xl:px-16 2xl:gap-14 xl:my-20 xl:gap-12 lg:my-16 lg:gap-8 md:px-10 md:gap-6 sm:my-12 sm:gap-4 dark:bg-[#040E20]/75 dark:border-none">
        <div className="col-span-12 bg-[#d0e2fe] rounded-[20px] border-2 border-[#7a9acb]/50 lg:col-span-7 dark:bg-[#053F40] dark:border-none">
          <h3 className="text-2xl text-center font-semibold pt-10 pb-8 lg:text-4xl sm:text-3xl">
            Product Token Stake
          </h3>
          <div className="flex flex-row justify-end items-center text-base px-6 mb-6 2xl:px-12 xl:px-8 lg:text-xl sm:text-lg">
            <label className="font-semibold">Enter Base Amount :</label>
            <input
              className="w-20 ml-4 px-2 text-right bg-transparent border-b-2 border-black border-dashed dark:border-white"
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              value={stakeBaseAmount || ''}
            />
          </div>
          <div className="flex flex-col text-center gap-4 px-2 sm:px-6 sm:gap-7 2xl:px-12 xl:px-8">
            {currentPoolData.stakingTokenInfo.map((product, idx) => (
              <ProductTokenStakeList
                key={idx}
                tokenId={Number(product.tokenId)}
                tokenAddress={product.tokenAddress}
                isERC1155={!!product.isERC1155}
                consumable={!!product.consumable}
                amount={Number(product.ratio) * stakeBaseAmount}
                isApproved={product.isApproved}
              />
            ))}
            <div className="pb-10 mx-auto">
              <Button
                className={`!w-[160px] ${
                  isProductApproveAvailable ? '' : 'opacity-50'
                }`}
                text="Stake"
                onClick={handleStake}
                disabled={!isProductApproveAvailable}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 flex flex-col h-full gap-2 2xl:gap-14 xl:gap-12 lg:col-span-5 lg:gap-8 md:gap-6 sm:gap-4">
          <div className="bg-[#d0e2fe] rounded-[20px] h-full pb-4 border-2 border-[#7a9acb]/50 dark:bg-[#053F40] dark:border-none sm:pb-10">
            <h3 className="text-2xl text-center font-semibold pt-6 pb-4 xl:text-4xl sm:text-3xl sm:pt-10 sm:pb-8">
              Total Value Staked
            </h3>
            <div className="flex flex-col text-white gap-4 px-2 sm:px-6 2xl:px-12 xl:px-8">
              {totalValueStakedArray}
            </div>
          </div>
          <div className="bg-[#d0e2fe] rounded-[20px] py-4 border-2 border-[#7a9acb]/50 dark:bg-[#053F40] dark:border-none sm:py-10">
            <h3 className="text-2xl text-center font-semibold pt-4 pb-4 xl:text-4xl sm:text-3xl sm:pt-8 sm:pb-8">
              Number of Stakers
            </h3>
            <h3 className="text-2xl text-center font-semibold pb-4 xl:text-4xl sm:text-3xl sm:pb-8">
              {numberOfStakers}
            </h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StakingPage;
