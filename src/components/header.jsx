/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import {
  useAccount,
  useTotalSupply,
  usePrice,
  mintNFTs,
} from "../data/contract";
import { useRefresh } from "../data/utils";
import { Countdown } from "./counter";
import { MintDialog } from "./minting";

const DEADLINE = new Date(2021, 7, 4);
const MAX_COUNT = 15;
const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sets = [];
let lastIndex;
let count = 10;

export const Header = (props) => {
  const { fastRefresh, randomRefresh } = useRefresh();
  const account = useAccount();
  const price = usePrice();
  const totalSupply = useTotalSupply();

  const [onSale, setSale] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isMinting, setMinting] = useState(false);
  const [isConfirming, setConfirming] = useState(false);

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    if (price.length > 0 && totalSupply.length > 0) setLoading(false);
  }, [price, totalSupply, account]);

  useEffect(() => {
    if (DEADLINE <= Date.now()) setSale(true);
  }, [fastRefresh]);

  useEffect(() => {
    let index;
    while (true) {
      index = Math.floor(Math.random() * 9);
      if (sets.length === 0 && index === lastIndex) continue;
      if (!sets.includes(index)) {
        sets.push(index);
        break;
      }
    }
    if (sets.length === 9) {
      lastIndex = index;
      sets = [];
    }

    const element =
      document.getElementsByClassName("random")[0].childNodes[index];
    element.classList.remove("fade-in");
    element.classList.add("fade-out");
    element.addEventListener("transitionend", function x() {
      element.removeEventListener("transitionend", x);
      element.src = `img/bears/${count}.png`;
      element.classList.remove("fade-out");
      element.classList.add("fade-in");
    });
    indexes[index] = count;
    count++;
    if (count > MAX_COUNT) count = 1;
  }, [randomRefresh]);

  const handleClose = () => setMinting(false);

  const handleMint = () => setMinting(true);

  const onMint = (count) => {
    mintNFTs(account, count, price)
      .on("transactionHash", () => {
        setConfirming(true);
        setMinting(false);
      })
      .on("receipt", () => {
        setConfirming(false);
      })
      .on("error", () => {
        setMinting(false);
        setConfirming(false);
      });
  };

  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <p
              className="title"
              dangerouslySetInnerHTML={{ __html: props.data.title }}
            />
            <p
              className="content"
              dangerouslySetInnerHTML={{ __html: props.data.content }}
            />
            <div className="info-outer">
              {onSale ? (
                <div className="info-inner text-center">
                  <p>Price {isLoading ? "0.00" : price} ETH</p>
                  <p>
                    {isLoading ? (
                      <img src="img/loading.gif" alt="loading" />
                    ) : (
                      10000 - totalSupply
                    )}{" "}
                    / 10000 available
                  </p>
                  <div className="slider-outer">
                    <div
                      className="slider-inner"
                      style={{
                        width: `${
                          totalSupply === ""
                            ? 0
                            : (parseInt(totalSupply) / 100).toFixed(2)
                        }%`,
                      }}
                    />
                  </div>
                  <a
                    onClick={handleMint}
                    className="btn btn-mint btn-lg page-scroll"
                  >
                    Mint
                  </a>
                </div>
              ) : (
                <Countdown deadline={DEADLINE} />
              )}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 random">
            <img src="img/bears/1.png" className="col-md-4" alt="" />
            <img src="img/bears/2.png" className="col-md-4" alt="" />
            <img src="img/bears/3.png" className="col-md-4" alt="" />
            <img src="img/bears/4.png" className="col-md-4" alt="" />
            <img src="img/bears/5.png" className="col-md-4" alt="" />
            <img src="img/bears/6.png" className="col-md-4" alt="" />
            <img src="img/bears/7.png" className="col-md-4" alt="" />
            <img src="img/bears/8.png" className="col-md-4" alt="" />
            <img src="img/bears/9.png" className="col-md-4" alt="" />
          </div>
        </div>
      </div>
      {isMinting && (
        <MintDialog
          onMint={onMint}
          handleClose={handleClose}
          max={Math.min(20, 10000 - totalSupply)}
        />
      )}
    </div>
  );
};
