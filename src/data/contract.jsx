import { useState, useEffect } from "react";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import tokenAbi from "./token.json";
import { useRefresh } from "./utils";

const web3 = new Web3(window.ethereum);
const tokenContract = new web3.eth.Contract(
  tokenAbi,
  "0x33d15e8a4e626f8d6ef821a6c1e22bccae20a041"
);

export const useAccount = () => {
  const [account, setAccount] = useState("");

  const fetch = async () => {
    if (typeof window.ethereum === "undefined") {
      console.error("Metamask is not installed!");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) setAccount(accounts[0]);
  };
  fetch();

  return account;
};

export const useTotalSupply = () => {
  const refresh = useRefresh();
  const [totalSupply, setTotalSupply] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const supply = await tokenContract.methods.totalSupply().call();
      setTotalSupply(supply);
    };
    fetch();
  }, [refresh]);

  return totalSupply;
};

export const usePrice = () => {
  const refresh = useRefresh();
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const price = await tokenContract.methods.price().call();
      setPrice(
        new BigNumber(price).dividedBy(new BigNumber(10).pow(18)).toString()
      );
    };
    fetch();
  }, [refresh]);

  return price;
};

export const mintNFTs = (account, count, price) =>
  tokenContract.methods.mintApes(count).send({
    from: account,
    value: new BigNumber(price).times(Math.pow(10, 18)).times(count),
  });
