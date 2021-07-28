/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import {
  useAccount,
  useTotalSupply,
  usePrice,
  mintNFTs,
} from "../data/contract";
import { MintDialog } from "./minting";

export const Header = (props) => {
  const account = useAccount();
  const price = usePrice();
  const totalSupply = useTotalSupply();

  const [onSale, setSale] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isMinting, setMinting] = useState(false);
  const [isConfirming, setConfirming] = useState(false);

  const handleClose = () => setMinting(false);

  const handleMint = () => setMinting(true);

  const onMint = (count) => {
    mintNFTs(account, count, price)
      .then(() => setMinting(false))
      .catch(() => setMinting(false));
  };

  useEffect(() => {
    if (price.length > 0 && totalSupply.length > 0) setLoading(false);
  }, [price, totalSupply, account]);

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
                <div />
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
