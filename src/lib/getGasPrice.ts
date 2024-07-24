export const getGasPrice = async (web3: any, chainId: number) => {
  const gasPrice = await web3.eth.getGasPrice();
  if (chainId === 137 || chainId === 80002) {
      return Number(gasPrice) * 1.5;
  } else if(chainId === 1 || chainId === 56 || chainId === 11155111) {
      return Number(gasPrice);
  }
};
