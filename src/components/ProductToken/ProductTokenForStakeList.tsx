import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import getERC1155Data from '@/lib/getERC1155Data';
import { IProductTokenForStakeListProps } from '@/types';
import BreadImage from '@/assets/images/bread.svg';

function ProductTokenForStakeList({
  productId,
  ratio,
  consumable,
}: IProductTokenForStakeListProps) {
  const [imageUri, setImageUri] = useState<string>(BreadImage);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const erc1155Data = await getERC1155Data(
          (process.env.NEXT_PUBLIC_PRODUCTADDRESS || '') as Address,
          Number(productId)
        );
        if (erc1155Data) {
          const { name, uri } = erc1155Data;
          setImageUri(uri);
          setName(name);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (productId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center h-16 gap-1">
        <div className="text-[22px] rounded-full border border-white aspect-square min-w-[28px] text-center leading-6">
          {Number(ratio)}
        </div>
        <Image
          className="aspect-square w-16 rounded-full"
          width={64}
          height={64}
          src={imageUri}
          alt="product"
          unoptimized
          onError={() => {
            setImageUri(BreadImage);
            setName('Bread');
          }}
        />
      </div>
      <div className="relative flex flex-col items-center text-center pb-6">
        <div className="text-2xl text-right">{name}</div>
        <div
          className={`absolute bottom-0 text-[11px] rounded-full bg-[#2F3A42] px-1.5 py-1 w-[92px] ${
            consumable ? 'block' : 'hidden'
          }`}
        >
          Consumable
        </div>
      </div>
    </div>
  );
}

export default ProductTokenForStakeList;
