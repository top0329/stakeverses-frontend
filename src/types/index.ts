import { Address } from 'viem';
import { ContractRunner } from 'ethers';

export interface IButton {
  text: string;
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IButtonClass {
  name: string;
  style: string;
}

export interface IProductTokenForStakeListProps {
  tokenId: string;
  tokenAddress: string;
  ratio: string;
  isERC1155?: boolean;
  consumable?: boolean;
  isApproved?: boolean;
}

export interface IRewardTokenInfoForStakeListProps {
  tokenId: string;
  tokenAddress: string;
  ratio: string;
  isERC1155?: boolean;
  isApproved?: boolean;
  claimableReward?: string;
}

export interface IStakingPoolListProps {
  instanceId: string;
  creator: string;
  instanceAddress: string;
  stakingTokenInfo: IProductTokenForStakeListProps[];
  rewardTokenInfo: IRewardTokenInfoForStakeListProps[];
}

export interface IProductTokenInfo {
  tokenName?: string;
  imageUri?: string;
  tokenAddress?: string;
  tokenId: number;
  ratio?: number;
  isERC1155?: boolean;
  amount?: number;
  consumable?: boolean;
  isApproved?: boolean;
}

export interface IRewardTokenInfo {
  tokenName?: string;
  imageUri?: string;
  tokenAddress?: string;
  tokenId: number;
  ratio: number;
  isERC1155?: boolean;
  isApproved?: boolean;
}

export type Web3ContextType = {
  account?: Address;
  chainId?: number;
  isConnected?: boolean;
  library?: ContractRunner;
  productStakingInstance: any;
  currentProductStakingInstanceAddress: string;
  currentTokenDataUrl: string;
  erc20Approve: (erc20Address: string, spender: string, amount: string) => any;
  erc1155Approve: (
    erc1155Address: string,
    spender: string,
    approved: boolean
  ) => any;
  web3: any;
};

export interface IRewardTokenListForCreate {
  tokenAddress?: string;
  tokenId: number;
  amount: number;
  isERC1155?: boolean;
  isApproved?: boolean;
  instanceAddress?: string;
}

export interface IAccordion {
  title: string;
  content: any;
}
