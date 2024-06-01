import axios from 'axios';
import { ethers } from 'ethers';
import { Address } from 'viem';

import erc1155Abi from '@/abi/ERC1155ABI.json';

export default async function getERC1155Data(
  contractAddress: Address | '',
  tokenId: number
) {
  if (contractAddress === '') return null;
  const provider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_DEFAULTRPC
  );
  const erc1155Contract = new ethers.Contract(
    contractAddress,
    erc1155Abi,
    provider
  );
  try {
    const tokenUri = await erc1155Contract.uri(tokenId);
    const gatewayUrl = 'https://ipfs.io/';
    const metaData = await axios.get(`${gatewayUrl}${tokenUri}`);
    const { name, image } = metaData.data;
    if (image === undefined) return null;
    return {
      name,
      uri: `${gatewayUrl}${image}`,
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
}
