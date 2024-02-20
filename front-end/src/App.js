import './App.css';
import React, { useState } from "react";
import { SecretNetworkClient, Wallet } from "secretjs";

function App() {
  const [emlanisQuery, setEmlanisQuery] = useState("")

  const wallet = new Wallet(
    "desk pigeon hammer sleep only mistake stool december offer patrol once vacant"
  );
  
  const secretjs = new SecretNetworkClient({
    chainId: "pulsar-3",
    url: "https://api.pulsar3.scrttestnet.com",
    wallet: wallet,
    walletAddress: wallet.address,
  });
  
  let codeHash =
    "6c0281401b31d5af254bf9291ea1a2aa90da5cb5074c4eb06bf39447fdd66915";
  let contractAddress = "secret1wl0srn0x8rkddf4grsfz7hfeapflchg62uw4x9";
  
  let query_contract = async () => {
    let my_query = await secretjs.query.compute.queryContract({
      contract_address: contractAddress,
      code_hash: codeHash,
      query: { get_count: {} },
    });
    
    // Extract the count value from my_query
    let count = my_query.count;
  
    // Set the count value in the state
    setEmlanisQuery(count);
    
    console.log("emlanis's count: ", count);
  };

  let increment_contract = async () => {
    // Execute the increment function on the smart contract
    const tx = await secretjs.tx.compute.executeContract(
      {
        sender: wallet.address,
        contract_address: contractAddress,
        msg: {
          increment: {},
        },
        code_hash: codeHash,
      },
      { gasLimit: 100_000 }
    );
  
    // After executing the increment, query the contract to get the updated count
    let my_query = await secretjs.query.compute.queryContract({
      contract_address: contractAddress,
      code_hash: codeHash,
      query: { get_count: {} },
    });
  
    // Extract the count value from my_query
    let count = my_query.count;
  
    // Set the count value in the state
    setEmlanisQuery(count);
  
    console.log("emlanis's count after increment: ", count);
  };
  
  let reset_contract = async () => {
    // Execute the reset function on the smart contract
    const tx = await secretjs.tx.compute.executeContract(
      {
        sender: wallet.address,
        contract_address: contractAddress,
        msg: {
          reset: { count: 1 }, // Assuming count should reset to 1
        },
        code_hash: codeHash,
      },
      { gasLimit: 100_000 }
    );

    // After executing the reset, query the contract to get the updated count
    query_contract();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Emlanis' Counter</h1>
        <button onClick={query_contract}>Get Count</button>
        <button onClick={increment_contract}>Increment Count</button>
        <button onClick={reset_contract}>Reset Count</button>
        <h3>The current count is: {emlanisQuery}</h3>
      </header>
    </div>
  );
}

export default App;

