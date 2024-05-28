import { Address } from "viem";
import { Contract, ContractRunner } from 'ethers';

export interface IButtonClass {
  name: string;
  style: string;
}

export interface ProductTokenForStakeListProps {
  imageUri: string;
  text: string;
  consumable?: boolean;
}

export interface StakingPoolListProps {
  productTokenList: ProductTokenForStakeListProps[];
  progress: number;
  instanceId: string;
  creatorAddress: string;
  remainingTime: string;
}

export interface ProductTokenInfo {
  productAddress?: string;
  productId: string;
  ratio: string;
  consumable: boolean;
}

export interface RewardTokenInfo {
  tokenAddress?: string;
  tokenId: string;
  ratio: string;
  isERC1155: boolean;
}

export type Web3ContextType = {
  account?: Address;
  chainId?: number;
  isConnected?: boolean;
  library?: ContractRunner;
  // factoryContract: Contract;
  // blueprintContract: Contract;
  // productContract: Contract;
  // factoryWeb3: any;
  // blueprintWeb3: any;
  // productWeb3: any;
  erc20Approve: (erc20Address: string, spender: string, amount: string) => any;
  erc1155Approve: (
    erc1155Address: string,
    spender: string,
    approved: boolean
  ) => any;
};
