import { Address } from "viem";
import { ContractRunner } from 'ethers';

export interface IButtonClass {
  name: string;
  style: string;
}

export interface IProductTokenForStakeListProps {
  productId: string;
  ratio: string;
  consumable?: boolean;
}

export interface IRewardTokenInfoForStakeListProps {
  tokenId: string;
  tokenAddress: string;
  ratio: string;
  isERC1155?: boolean;
}

export interface IStakingPoolListProps {
  instanceId: string;
  creator: string;
  instanceAddress: string;
  productInfo: IProductTokenForStakeListProps[];
  rewardTokenInfo: IRewardTokenInfoForStakeListProps[];
}

export interface IProductTokenInfo {
  productAddress?: string;
  productId: number;
  ratio?: number;
  consumable?: boolean;
}

export interface IRewardTokenInfo {
  tokenAddress?: string;
  tokenId: number;
  ratio: number;
  isERC1155?: boolean;
}

export type Web3ContextType = {
  account?: Address;
  chainId?: number;
  isConnected?: boolean;
  library?: ContractRunner;
  productStakingInstance: any;
  // erc20Approve: (erc20Address: string, spender: string, amount: string) => any;
  erc1155Approve: (
    erc1155Address: string,
    spender: string,
    approved: boolean
  ) => any;
};

export interface IRewardTokenListForCreate {
  tokenAddress?: string;
  tokenId: number;
  amount: number;
  isERC1155?: boolean;
}
