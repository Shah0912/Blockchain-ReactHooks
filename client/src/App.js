import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
function App () {
  const [storageValue, setstorageValue] = useState(undefined);
  const [web3, setweb3] = useState(undefined);
  const [accounts, setaccounts] = useState([]);
  const [contract, setcontract] = useState([]);

  useEffect(() => {
    const init = async() => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const contract = new web3.eth.Contract(
          SimpleStorageContract.abi, 
          deployedNetwork && deployedNetwork.address,
        );

        // instance.options.address = "0xC06f97F9c75fCa17bdEd5a64FBf7eB30961A6e84"
      console.log("address = ", contract.options.address);

        setaccounts(accounts);
        setcontract(contract);
        setweb3(web3);
        
      } catch(error) {
        alert("Failed to load web3, accounts or contract");
        console.error(error);
      }
    }
    init()
  }, []);

  useEffect(() => {
    const load = async () => {
      // const { accounts, contract } = this.state;
      // console.log("accounts = ", accounts);
      // console.log("contract = ", contract);
      // console.log(accounts[0]);
      // Stores a given value, 5 by default.
      await contract.methods.set(22).send({ from: accounts[0] });

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();

      // Update state with the result.
      setstorageValue(response);
      // this.setState({ storageValue: response });
    }
    if(typeof web3 !== 'undefined' 
    && typeof accounts !== 'undefined'
    && typeof contract !== 'undefined'
    )
    load();
  }, [web3, accounts, contract])

  if(typeof web3 === 'undefined') {
    return <div>Loading Web3, accounts and contract ... </div>
  }
  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts are compiled and migrated successfully,
        below will show a stored value of 5 (by default).
      </p>
      <p>
        Try changing the value stored on <strong>line 40</strong> of App.js.
      </p>
      <div>The stored value is {storageValue}</div> 
    </div>
  );

}
// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

// // CHANGE THE ADDRESS of contract

//       instance.options.address = "0xC06f97F9c75fCa17bdEd5a64FBf7eB30961A6e84"
//       console.log("address = ", instance.options.address);

//       console.log("instance = ", instance);

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
      
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

    

  //   console.log("accounts = ", accounts);
  //   console.log("contract = ", contract);
  //   // console.log(accounts[0]);
  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(22).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

//   addToSimpleStorage() {
//     if (this.state.simpleStorageInstance && this.state.accounts) {
//       const value = this.storageAmountInput.value;
//       console.log('value to be stored is');
//       console.log(value);
//       this.state.simpleStorageInstance.set(value, {from: this.state.accounts[0]})
//         .then((result) => {
//           return this.state.simpleStorageInstance.get.call(this.state.accounts[0])
//         }).then((result) => {
//           this.setState(prevState => ({
//             ...prevState,
//             storageValue: result.c[0]
//           }));
//         }).catch((err) => {
//           console.log('error');
//           console.log(err);
//         });
//     } else {
//       this.setState(prevState => ({
//         ...prevState,
//         error: new Error('simple storage instance not loaded')
//       }))
//     }
//   }

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 42</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//         <form className="pure-form pure-form-stacked">
//           <fieldset>
//             <label htmlFor="storage">Storage Amount</label>
//             <input id ="storage" type = "number" ref = {c => {this.storageAmountInput = c}} />
//             <button
//               className="pure-button"
//               onClick = {(e) => {
//                 e.preventDefault();
//                 this.addToSimpleStorage()
//               }}  
//             >
//               Set Storage
//             </button>
//           </fieldset>
//         </form>
//       </div>
//     );
//   }
// }

export default App;
