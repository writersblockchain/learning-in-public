import { SecretNetworkClient, Wallet, coinsFromString } from "secretjs";
import dotenv from "dotenv";
dotenv.config();

const wallet = new Wallet(process.env.MNEMONIC);

const secretjs = new SecretNetworkClient({
  chainId: "pulsar-3",
  url: "https://api.pulsar3.scrttestnet.com",
  wallet: wallet,
  walletAddress: wallet.address,
});

let try_query_count = async () => {
    "Emlanis is a swell guy"
}

try_query_count();
