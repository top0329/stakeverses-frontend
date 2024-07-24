import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

import useWeb3 from '@/hooks/useWeb3';
import DefaultERC1155Image from '@/assets/images/erc1155.png';
import getERC1155Data from '@/lib/getERC1155Data';
import { IProductTokenForStakeListProps } from '@/types';

function ProductTokenForStakeList({
  productId,
  ratio,
  consumable,
}: IProductTokenForStakeListProps) {
  const { library, currentProductAddress } = useWeb3();

  const [imageUri, setImageUri] = useState<string>(DefaultERC1155Image.src);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const erc1155Data = await getERC1155Data(
          currentProductAddress as Address,
          Number(productId),
          library
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
  }, [currentProductAddress, library, productId]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col justify-center items-center h-16 gap-1">
        <div className="text-[22px] rounded-full border border-black aspect-square min-w-[28px] text-center leading-6 dark:border-white">
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
            setImageUri(DefaultERC1155Image.src);
            setName('product');
          }}
        />
      </div>
      <div className="relative flex flex-col items-center text-center pb-6">
        <div className="text-sm text-right lg:text-xl sm:text-lg xs:text-base">
          {name}
        </div>
        <div
          className={`absolute bottom-0 text-[10px] text-white rounded-full bg-[#2F3A42] px-1 py-1 w-auto sm:px-1.5 ${
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
