import React, { useState, useRef, useEffect } from "react";
import { BigNumber, Contract, providers, utils } from "ethers";
//import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import styles from "../../styles/Home.module.css";
import Header from "./Header";
import Web3Modal from "web3modal";
import { AMBASS_CONTRACT_ADDRESS, AMBASS_CONTRACT_ABI } from "../../constants";

export default function CampaignList() {
  const [subTokens, setSubTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();

  const getProvider = async () => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Connect with Rinkey Network");
      throw new Error("Incorrect Network: Connect with Rinkeyu");
    }
    return web3Provider;
  };

  const getAllSubTokens = async () => {
    console.log("getAllSubTokens()");
    try {
      const signer = await getProvider();
      const tokenContract = new Contract(
        AMBASS_CONTRACT_ADDRESS,
        AMBASS_CONTRACT_ABI,
        signer
      );

      const subTokenArray = await tokenContract.getSubTokens();
      setLoading(true);
      //await subTokenArray;
      console.log(subTokenArray);
      setSubTokens([...subTokenArray]);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    getAllSubTokens();
  }, []);

  const showCampaignDetail = async () => {};

  return (
    <div className={styles.container}>
      <Header />
      <main>
        <div>
          {subTokens.map((token, idx) => {
            return (
              <div
                key={idx}
                className={styles.campaign_card}
                onClick={showCampaignDetail}
              >
                {token}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
