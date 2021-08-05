/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  connectWithMetamask,
  useTotalSupply,
  useChainId,
  usePrice,
  mintNFTs,
} from "../data/contract";
import { useRefresh } from "../data/utils";
import { Countdown } from "./counter";
import { MintDialog } from "./minting";

const TOAST_OPTIONS = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: 0,
};
const DEADLINE = new Date("2021-08-09T16:00:00.000-04:00");
const MAX_COUNT = 15;
const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sets = [];
let lastIndex;

export const Header = (props) => {
  const { timerRefresh, randomRefresh } = useRefresh();
  const chainId = useChainId();
  const price = usePrice();
  const totalSupply = useTotalSupply();
  const isMetamaskEnabled = typeof window.ethereum !== "undefined";

  const [account, setAccount] = useState("");
  const [count, setCount] = useState(10);
  const [onSale, setSale] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isMinting, setMinting] = useState(false);

  useEffect(() => {
    if (price.length > 0 && totalSupply.length > 0) setLoading(false);
  }, [price, totalSupply]);

  useEffect(() => {
    if (!onSale && DEADLINE <= Date.now()) {
      setSale(true);
      if (chainId !== "1") {
        toast.info(
          "Current network is not the target network. Switch to mainnet!",
          TOAST_OPTIONS
        );
      }
    } else if (onSale && DEADLINE > Date.now()) setSale(false);
  }, [timerRefresh]);

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
      element.src = `img/bears/random/${count}.png`;
      element.classList.remove("fade-out");
      element.classList.add("fade-in");
    });
    indexes[index] = count;
    setCount(count < MAX_COUNT ? count + 1 : 1);
  }, [randomRefresh]);

  const handleClose = () => setMinting(false);

  const handleMint = async () => {
    if (chainId !== "1") {
      toast.info(
        "Current network is not the target network. Switch to mainnet!",
        TOAST_OPTIONS
      );
    } else {
      await connectWithMetamask((acc) => {
        setAccount(acc);
        setMinting(true);
      });
    }
  };

  const onMint = (count) => {
    mintNFTs(account, count, price)
      .on("transactionHash", () => setMinting(false))
      .on("receipt", () =>
        toast.success("Bears minted successfully", TOAST_OPTIONS)
      )
      .on("error", () => {
        setMinting(false);
        toast.error("Bears not minted. Errors occurred", TOAST_OPTIONS);
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
                    className={`btn btn-mint btn-lg page-scroll ${
                      isMetamaskEnabled ? "" : "btn-disabled"
                    }`}
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
            <img src="img/bears/random/1.png" className="col-md-4" alt="" />
            <img src="img/bears/random/2.png" className="col-md-4" alt="" />
            <img src="img/bears/random/3.png" className="col-md-4" alt="" />
            <img src="img/bears/random/4.png" className="col-md-4" alt="" />
            <img src="img/bears/random/5.png" className="col-md-4" alt="" />
            <img src="img/bears/random/6.png" className="col-md-4" alt="" />
            <img src="img/bears/random/7.png" className="col-md-4" alt="" />
            <img src="img/bears/random/8.png" className="col-md-4" alt="" />
            <img src="img/bears/random/9.png" className="col-md-4" alt="" />
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
      <ToastContainer />
    </div>
  );
};
