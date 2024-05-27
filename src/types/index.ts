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
  address: string;
  id: string;
  ratio: string;
  consumable: boolean;
}
