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
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col justify-center items-center h-16 gap-1">
        <div className="text-[22px] rounded-full border border-white aspect-square min-w-[28px] text-center leading-6">
          {Number(ratio)}
        </div>
        <Image
          className="aspect-square min-w-12 max-w-12 rounded-full sm:min-w-16 sm:max-w-16"
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
        <div className="text-sm text-right lg:text-xl sm:text-lg xs:text-base">
          {name}
        </div>
        <div
          className={`absolute bottom-0 text-[10px] rounded-full bg-[#2F3A42] px-1 py-1 w-auto sm:px-1.5 ${
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
