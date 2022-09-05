import logo from './logo.svg';
import './App.css';
import web3 from './web3.js';
import { useRef, useState } from 'react';
import {MedianOracle,abi1,Wamples,abi2,UFragments,abi3,UFragmentsPolicy,abi4,Orchestrator,abi5} from './abi.js';


function App() {
  const mp=useRef(null);
  const _add=useRef(null);
  const orch=useRef(null);
  const mint=useRef(null);
  const trans_add=useRef(null);
  const data=useRef(null);
  const [MP,setMP] =useState("");
  

  const sol1 = new web3.eth.Contract(abi1, MedianOracle);
  const sol2 = new web3.eth.Contract(abi2, Wamples);
  const sol3 = new web3.eth.Contract(abi3, UFragments);
  const sol4 = new web3.eth.Contract(abi4, UFragmentsPolicy);
  const sol5 = new web3.eth.Contract(abi5, Orchestrator);


  

  const provider = async()=>{
    const accounts = await web3.eth.getAccounts();
    let b = await sol1.methods.minimumProviders().call();
    setMP(b);
      console.log(b);
      }
      const setmp=async()=>{
        const accounts = await web3.eth.getAccounts();
        await sol1.methods.setMinimumProviders(mp.current.value).send({from:accounts[0]});
        window.alert("Updated!!")
      }
      const MintWamples=async()=>{
        const accounts = await web3.eth.getAccounts();
        await sol2.methods.mint(mint.current.value).send({from:accounts[0]});
        window.alert("Minited Successfully!!")
      }
      const totalAmt=async()=>{
        const accounts = await web3.eth.getAccounts();
        let a=await sol2.methods.totalSupply().call();
        window.alert(a)
      }
      const Initialize=async()=>{
        const accounts = await web3.eth.getAccounts();
        await sol3.methods.initialize(_add.current.value).send({from:accounts[0]});
        window.alert("Initialized Successfully!!")
      }

      const SetOrchestrator=async()=>{
        const accounts = await web3.eth.getAccounts();
        await sol4.methods.setOrchestrator(orch.current.value).send({from:accounts[0]});
        window.alert("Updated!!")
      }
      const addTransaction=async()=>{
        const accounts = await web3.eth.getAccounts();
        await sol5.methods.addTransaction(trans_add.current.value,data.current.value).send({from:accounts[0]});
        window.alert("Transaction Added!!")
      }
      const totalTransactions=async()=>{
        const accounts = await web3.eth.getAccounts();
        let s=await sol5.methods.transactionsSize().call();
        window.alert("Total Transactions:"+s)
      }
  return (
    <div className="App">
      <h1>Ampleforth</h1>
      <h1>MedianOracle</h1>
      <label>Set Minimumprovider</label>&nbsp;&nbsp;<input ref={mp} type="text" id="mp" name="mp"></input>
      &nbsp;&nbsp;<button onClick={setmp}>Set</button><br/><br/>
      <button onClick={provider}>Minimumprovider</button><br/>
      <h3>{MP}</h3>

      <h1>WAMP</h1>
      <label>Mint Wamples</label>&nbsp;&nbsp;<input ref={mint} type="text" id="mint" name="mint"></input>
      &nbsp;&nbsp;<button onClick={MintWamples}>Set</button><br/><br/>
      <button onClick={totalAmt}>Total Supply</button><br/>
      

      <h1>UFragments</h1>
      <label>Initialize</label>&nbsp;&nbsp;<input ref={_add} type="text" id="_add" name="_add"></input>
      &nbsp;&nbsp;<button onClick={Initialize}>Set</button><br/><br/>

    <h1>UFragmentsPolicy</h1>
    <label>SetOrchestrator</label>&nbsp;&nbsp;<input ref={orch} type="text" id="orch" name="orch"></input>
      &nbsp;&nbsp;<button onClick={SetOrchestrator}>Set</button><br/><br/>

      <h1>Orchestrator</h1>
      <h3>Add Transaction</h3><label>Address</label>&nbsp;&nbsp;<input ref={trans_add} type="text" id="trans_add" name="trans_add"></input>
      <br/><br/><label>Data</label>&nbsp;&nbsp;<input ref={data} type="text" id="data" name="data"></input>
      <br/><br/><button onClick={addTransaction}>Set</button><br/><br/>
      <button onClick={totalTransactions}>Total Transactions</button><br/>

    </div>
  );
}

export default App;
