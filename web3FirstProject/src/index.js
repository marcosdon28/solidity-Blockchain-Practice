const Web3 = require('web3');
import abi from "../abi";

var Contract = require('web3-eth-contract');
Contract.setProvider(window.web3.currentProvider); //Web3.givenProvider
var contractAddress = "0x5E2a8B058281e685A7D0D52FF59Ed941cE722ad9";
let contract = new Contract(abi, contractAddress);

window.onload = function() {
    //variables
    let web3;
    let from;

    //elements
    const connectButton = document.getElementById('connect');
    const content = document.getElementById('content');
    const account = document.getElementById('account');
    const content2 = document.getElementById('content2');
	const qmoBalance = document.getElementById('qmoBalance');
    
    //Form
    const formsend = document.getElementById('send');
    const recipientInput = document.getElementById('recipient');
    const amountInput = document.getElementById('amount');

	const currentSuply = document.getElementById('currentSuply');
	const formTotalSuplyIncrease = document.getElementById('IncreaseTotalSupply');
	const amountToAddSupply = document.getElementById('amountToAddSupply');
    
	const formBalanceOf = document.getElementById('balanceOf');
	const addressToBalanceOf = document.getElementById('addressToBalanceOf');
	const resultBalance = document.getElementById('resultBalance');

    
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
			qmoBalanceSetOnStart(from);
			refreshSuply();
            
        }catch(err){
        alert('Connection reject by user');
        }
        } 
        else{
            alert('Web3 provider is neccesary eg: Metamask');     
        }
    }

	// poner el balance de la cuenta al logearse en la pagina
	function qmoBalanceSetOnStart(from){
		contract.methods.balanceOf(from).call((err, result) => {
			if(err){
			  alert("Error: ", err);
			}
			if(result == 0){
				resultBalance.innerText = "This Address Do not have any Qmo tokens!";
			}
			else{
				qmoBalance.innerText = result / 1000000000 + " QMO";
			}
			
		  });
	}

	//funcion para refrescar supply
	const refreshSuply = function(){
		contract.methods.totalsupply().call((err, result) => {
			if(err){
			  console.error('Error: ', err);
			}
		  
			let supply = result / 1000000000;
			currentSuply.innerText = supply + " QMO";
		  });
		
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


	const increaseSupply = async function(event){
		event.preventDefault();
		const amount = amountToAddSupply.value;

		if(Number(amount) <= 0){
            alert('Cannot Add a negative amount to supply');
            return;
        }
		else{
			contract.methods.increaseTotalSupply(amount).send({
			from,}).on('confirmation', refreshSuply);
			
		}
		

	}


	function viewBalanceOf(event){
		event.preventDefault();
		const address = addressToBalanceOf.value;
		if(address == ""){
			alert("the field cannot be empty");
			return;
		}
		else{
			contract.methods.balanceOf(address).call((err, result) => {
				if(err){
				  alert("Error: ", err);
				}
				if(result == 0){
					resultBalance.innerText = "This Address Do not have any Qmo tokens!";
					resultBalance.style.display = 'initial';
				}
				else{
					resultBalance.innerText = result / 1000000000 + " QMO";
					resultBalance.style.display = 'initial';
				}
				
			  });

		}
	}
    //events
    connectButton.onclick = connect ;
    formsend.onsubmit = transact;
	IncreaseTotalSupply.onsubmit = increaseSupply;
	formBalanceOf.onsubmit = viewBalanceOf;
};


