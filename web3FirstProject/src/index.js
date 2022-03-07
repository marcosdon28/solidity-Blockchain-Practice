const Web3 = require('web3');


var Contract = require('web3-eth-contract');
Contract.setProvider(window.web3.currentProvider); //Web3.givenProvider
let contract = new Contract([
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "numTokens",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newTokensAmount",
				"type": "uint256"
			}
		],
		"name": "increaseTotalSupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalsupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "numTokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "numTokens",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
], "0x5E2a8B058281e685A7D0D52FF59Ed941cE722ad9");

window.onload = function() {
    //variables
    let web3;
    let from;

    //elements
    const connectButton = document.getElementById('connect');
    const content = document.getElementById('content');
    const account = document.getElementById('account');
    const content2 = document.getElementById('content2');
    
    //Form
    const formsend = document.getElementById('send');
    const recipientInput = document.getElementById('recipient');
    const amountInput = document.getElementById('amount');

	const formTotalSuplyIncrease = document.getElementById('IncreaseTotalSupply');
	const amountToAddSupply = document.getElementById('amountToAddSupply');
    
    //functions
    const connect = async function(){
        if (window.ethereum){
            try{
            await window.ethereum.request({method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            let accounts = await web3.eth.getAccounts();
            from = accounts[0];
            content.style.display = 'initial';
            account.innerText = from;

            
        }catch(err){
        alert('Connection reject by user');
        }
        } 
        else{
            alert('Web3 provider is neccesary eg: Metamask');     
        }
    }

    const transact = function(event){
        //prevenimos la recarga de la pagina al confirmar el form
        event.preventDefault();
        
        const amount = amountInput.value;
        const recipient = recipientInput.value;
        if(Number(amount) <= 0 ){
            alert('Cannot send negative amounts');
            return;

        }
        if(!web3.utils.isAddress(recipient)){
            alert('invalid recipient address');
            return;

        }
        
        contract.methods.transfer(recipient,amount).send({
            from,});

    }

	const increaseSupply = function(event){
		event.preventDefault();
		const amount = amountToAddSupply.value;

		if(Number(amount) <= 0 ){
            alert('Cannot Add a negative amount to supply');
            return;
        }
		

	}

    //events
    connectButton.onclick = connect ;
    formsend.onsubmit = transact;
	IncreaseTotalSupply.onsubmit = increaseSupply;
};


