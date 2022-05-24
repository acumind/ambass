import Head from "next/head";
import Link from "next/link";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { AMBASS_CONTRACT_ADDRESS } from "../constants";

export default function Home() {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const walletAddressRef = useRef();

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

  const getSigner = async () => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Connect with Rinkey Network");
      throw new Error("Incorrect Network: Connect with Rinkeyu");
    }
    return web3Provider.getSigner();
  };

  const connectWallet = async () => {
    try {
      let provider = await getProvider();
      setWalletConnected(true);
      //const walletAddress = await provider.getSigner().getAddress();
    } catch (error) {
      console.error(error);
    }
  };
  async function getWalletAddress() {
    console.log("getWalletAddress():", walletAddressRef.current);

    return walletAddressRef.current;
  }

  const displayConnectButton = () => {
    if (isWalletConnected) {
      if (loading) {
        return <button>Loading..</button>;
      } else {
        return (
          <div>
            <button>Wallet Connected</button>
            {/* <div className={styles.button}>Address: {getWalletAddress()}</div> */}
          </div>
        );
      }
    } else {
      return <button onClick={connectWallet}>Connect Wallet</button>;
    }
  };

  useEffect(() => {
    if (!isWalletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [isWalletConnected]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ambass</title>
        <meta name="Ambass Web App" content="Ambass Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="bg-zinc-100 p-10 m-1">
          <h1 className={styles.title}>Ambass!</h1>
          <p className={styles.description}>
            An Incentivising Platform for Campaign Ambassdors!!!
          </p>
        </div>

        <div className={styles.card}>{displayConnectButton()}</div>

        <div className={styles.grid}>
          <Link href="/new_campaign">
            <a className={styles.card}>
              <h2>Create Campaign &rarr;</h2>
              <p>Create and Configure your public campaign.</p>
            </a>
          </Link>

          <Link href="/list_campaign">
            <a className={styles.card}>
              <h2>My Campaigns &rarr;</h2>
              <p>View And Analyze All Your Campaigns</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/acumind"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Acumind
        </a>
      </footer>
    </div>
  );
}
