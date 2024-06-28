import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ethers } from 'ethers';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import useWeb3 from '@/hooks/useWeb3';
import getERC1155Data from '@/lib/getERC1155Data';
import DefaultERC1155Image from '@/assets/images/erc1155.png';
import erc1155Abi from '@/abi/ERC1155ABI.json';
import { baseAmountAtom, isProductApproveAvailableAtom } from '@/jotai/atoms';

function ProductTokenStakeList({
  productId,
  amount,
  consumable,
}: {
  productId: number;
  amount: number;
  consumable: boolean;
}) {
  const { account } = useWeb3();

  const [, setIsProductApproveAvailable] = useAtom<boolean>(
    isProductApproveAvailableAtom
  );
  const [baseAmount] = useAtom<number>(baseAmountAtom);

  const [imageUri, setImageUri] = useState<string>(DefaultERC1155Image.src);
  const [name, setName] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_DEFAULTRPC
        );
        const erc1155Data = await getERC1155Data(
          (process.env.NEXT_PUBLIC_PRODUCTADDRESS || '') as Address,
          Number(productId)
        );
        if (erc1155Data) {
          const { name, uri } = erc1155Data;
          setImageUri(uri);
          setName(name);
        }
        const erc1155Contract = new ethers.Contract(
          (process.env.NEXT_PUBLIC_PRODUCTADDRESS || '') as Address,
          erc1155Abi,
          provider
        );
        const _balance = await erc1155Contract.balanceOf(
          account,
          Number(productId)
        );
        setBalance(Number(_balance));
      } catch (err) {
        console.log(err);
      }
    }
    if (productId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (baseAmount > balance) {
      setIsProductApproveAvailable(false);
    } else {
      setIsProductApproveAvailable(true);
    }
  }, [balance, baseAmount, setIsProductApproveAvailable]);

  return (
    <div className="relative flex flex-col text-white text-lg px-4 py-6 bg-[#47556e] rounded-[20px] gap-2 2xl:text-xl lg:gap-2 md:gap-10 sm:flex-row dark:bg-[#141D2D]/70">
      <div className="flex flex-row justify-between w-full gap-4 xl:gap-10 lg:gap-2 md:gap-10 sm:gap-2 xs:gap-10">
        <Image
          className="aspect-square min-w-[90px] rounded-full"
          width={90}
          height={90}
          src={imageUri}
          alt="product"
          unoptimized
          onError={() => {
            setImageUri(DefaultERC1155Image.src);
          }}
        />
        <div className="flex flex-row justify-between items-center w-full gap-1">
          <div className="flex flex-col">
            <p className="truncate tracking-[-1px]">Name</p>
            <p className="font-semibold">{name}</p>
          </div>
          <div className="flex-col hidden sm:flex">
            <p className="truncate tracking-[-1px]">Id</p>
            <p className="font-semibold">{productId}</p>
          </div>
          <div className="flex-col flex">
            <p className="tracking-[-1px]">Balance</p>
            <p className="font-semibold">{balance}</p>
          </div>
          <div className="flex-col hidden sm:flex">
            <p className="tracking-[-1px]">Amount</p>
            <p className="font-semibold">{amount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row gap-2 sm:hidden">
          <p className="truncate">Product Id: </p>
          <p className="font-semibold">{productId}</p>
        </div>
        <div className="flex flex-row gap-2 sm:hidden">
          <p>Amount: </p>
          <p className="font-semibold">{amount}</p>
        </div>
      </div>
      {consumable && (
        <div className="absolute bottom-[140px] right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5 sm:bottom-1.5">
          Consumable
        </div>
      )}
    </div>
  );
}

export default ProductTokenStakeList;
