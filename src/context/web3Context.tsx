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

declare let window: any;

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner();
  const ethersProvider = useEthersProvider();
  const defaultProvider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_DEFAULTRPC
  );
  const web3 = new Web3(window.ethereum);

  const [provider, setProvider] = useState<ContractRunner>(defaultProvider);
  const [productStakingInstanceContract, setProductStakingInstanceContract] =
    useState<Contract>({} as Contract);

  const init = useCallback(async () => {
    try {
      if (!isConnected || !ethersProvider) {
        console.log('Not connected wallet');
      } else {
        setProvider(ethersProvider);
        console.log('Connected wallet');
      }

      const _productStakingInstanceWeb3: any = new web3.eth.Contract(
        ProductStakingInstanceAbi,
        process.env.NEXT_PUBLIC_PRODUCTSTAKINGINSTANCEADDRESS
      );

      setProductStakingInstanceContract(_productStakingInstanceWeb3);
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
        const tx = await erc20Contract.methods
          .approve(spender, amount)
          .send({ from: address });
        return tx;
      } catch (err) {
        console.log(err);
      }
    },
    [address, web3.eth]
  );

  const erc1155Approve = useCallback(
    async (erc1155Address: string, spender: string, approved: boolean) => {
      try {
        const erc1155Contract = new web3.eth.Contract(
          erc1155Abi,
          erc1155Address
        );
        const tx = await erc1155Contract.methods
          .setApprovalForAll(spender, approved)
          .send({ from: address });
        return tx;
      } catch (err) {
        console.log(err);
      }
    },
    [address, web3.eth]
  );

  const value = useMemo(
    () => ({
      account: address,
      chainId,
      isConnected,
      library: provider ?? signer,
      productStakingInstanceContract,
      erc20Approve,
      erc1155Approve,
    }),
    [
      address,
      chainId,
      isConnected,
      provider,
      signer,
      productStakingInstanceContract,
      erc20Approve,
      erc1155Approve,
    ]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
