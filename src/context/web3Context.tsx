'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useChainId } from 'wagmi';
import Web3 from 'web3';
import { Contract, ContractRunner, ethers } from 'ethers';

import { Web3ContextType } from '@/types';
import { useEthersProvider, useEthersSigner } from '@/lib/utils';
import ProductStakingInstanceAbi from '@/abi/ProductStakingInstanceAbi.json';
import erc20Abi from '@/abi/ERC20ABI.json';
import erc1155Abi from '@/abi/ERC1155ABI.json';
import { defaultRPC, productAddress, productStakingInstanceAddress } from '@/lib/constants';
import { getGasPrice } from '@/lib/getGasPrice';

declare let window: any;

let web3: any;

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner();
  const ethersProvider = useEthersProvider();
  let defaultProvider: any;
  if (chainId === 1) {
    defaultProvider = new ethers.JsonRpcProvider(defaultRPC.mainnet);
  } else if (chainId === 11155111) {
    defaultProvider = new ethers.JsonRpcProvider(defaultRPC.sepolia);
  }
  if (chainId === 56) {
    defaultProvider = new ethers.JsonRpcProvider(defaultRPC.bsc);
  } else if (chainId === 137) {
    defaultProvider = new ethers.JsonRpcProvider(defaultRPC.polygon);
  } else if (chainId === 80002) {
    defaultProvider = new ethers.JsonRpcProvider(defaultRPC.amoy);
  }

  const [provider, setProvider] = useState<ContractRunner>(defaultProvider);
  const [productStakingInstance, setProductStakingInstance] =
    useState<Contract>({} as Contract);
    const [currentProductStakingInstanceAddress, setCurrentProductStakingInstanceAddress] =
      useState<string>('');
    const [currentProductAddress, setCurrentProductAddress] =
      useState<string>('');

  const init = useCallback(async () => {
    try {
      if (typeof window !== 'undefined') {
        web3 = new Web3(window.ethereum);
      }
      if (!isConnected || !ethersProvider) {
        console.log('Not connected wallet');
      } else {
        setProvider(ethersProvider);
        console.log('Connected wallet');
      }

      if (chainId === 1) {
        const _productStakingInstanceWeb3: any = new web3.eth.Contract(
          ProductStakingInstanceAbi,
          productStakingInstanceAddress.mainnet
        );
        setProductStakingInstance(_productStakingInstanceWeb3);
        setCurrentProductStakingInstanceAddress(productStakingInstanceAddress.mainnet);
        setCurrentProductAddress(productAddress.mainnet);
      } else if (chainId === 11155111) {
        const _productStakingInstanceWeb3: any = new web3.eth.Contract(
          ProductStakingInstanceAbi,
          productStakingInstanceAddress.sepolia
        );
        setProductStakingInstance(_productStakingInstanceWeb3);
        setCurrentProductStakingInstanceAddress(productStakingInstanceAddress.sepolia);
        setCurrentProductAddress(productAddress.sepolia);
      } else if(chainId === 56) {
        const _productStakingInstanceWeb3: any = new web3.eth.Contract(
          ProductStakingInstanceAbi,
          productStakingInstanceAddress.bsc
        );
        setProductStakingInstance(_productStakingInstanceWeb3);
        setCurrentProductStakingInstanceAddress(productStakingInstanceAddress.bsc);
        setCurrentProductAddress(productAddress.bsc);
      } else if(chainId === 137) {
        const _productStakingInstanceWeb3: any = new web3.eth.Contract(
          ProductStakingInstanceAbi,
          productStakingInstanceAddress.polygon
        );
        setProductStakingInstance(_productStakingInstanceWeb3);
        setCurrentProductStakingInstanceAddress(productStakingInstanceAddress.polygon);
        setCurrentProductAddress(productAddress.polygon);
      } else if(chainId === 80002) {
        const _productStakingInstanceWeb3: any = new web3.eth.Contract(
          ProductStakingInstanceAbi,
          productStakingInstanceAddress.amoy
        );
        setProductStakingInstance(_productStakingInstanceWeb3);
        setCurrentProductStakingInstanceAddress(productStakingInstanceAddress.amoy);
        setCurrentProductAddress(productAddress.amoy);
      }
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, ethersProvider, provider]);

  useEffect(() => {
    init();
  }, [init]);

  const erc20Approve = useCallback(
    async (erc20Address: string, spender: string, amount: string) => {
      try {
        const erc20Contract = new web3.eth.Contract(erc20Abi, erc20Address);
        const gasPrice = await getGasPrice(web3, chainId);
        if (gasPrice) {
          const tx = await erc20Contract.methods
            .approve(spender, amount)
            .send({ from: address, gasPrice: gasPrice.toString() });
          return tx;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [address, chainId]
  );

  const erc1155Approve = useCallback(
    async (erc1155Address: string, spender: string, approved: boolean) => {
      try {
        const erc1155Contract = new web3.eth.Contract(
          erc1155Abi,
          erc1155Address
        );
        const gasPrice = await getGasPrice(web3, chainId);
        if (gasPrice) {
          const tx = await erc1155Contract.methods
            .setApprovalForAll(spender, approved)
            .send({ from: address, gasPrice: gasPrice.toString() });
          return tx;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [address, chainId]
  );

  const value = useMemo(
    () => ({
      account: address,
      chainId,
      isConnected,
      library: provider ?? signer,
      productStakingInstance,
      currentProductStakingInstanceAddress,
      currentProductAddress,
      erc20Approve,
      erc1155Approve,
      web3,
    }),
    [
      address,
      chainId,
      isConnected,
      provider,
      signer,
      productStakingInstance,
      currentProductAddress,
      currentProductStakingInstanceAddress,
      erc20Approve,
      erc1155Approve,
    ]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
