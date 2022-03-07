// SPDX-License-Identifier: MIT

pragma solidity >=0.5.5<0.8.0;
import "@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";


interface IERC20{
  function totalsupply()external view returns (uint256);
  function balanceOf(address account)external view returns (uint256);
  function allowance(address owner, address spender)external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);




  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);


}

contract QuimioToken is IERC20{
  string public constant name = "QuimioToken";
  string public constant symbol = "QMO";
  uint public constant decimals= 9;

  event Transfer(address indexed from, address indexed to, uint256 tokens);
  event Approval(address indexed owner, address indexed spender, uint256 tokens);   
  using SafeMathChainlink for uint256;
  
  mapping(address=>uint) balances;
  mapping (address => mapping (address => uint)) allowed;
  uint256 totalSupply_;

  constructor (uint256 initialSupply) public{
    totalSupply_ = initialSupply;
    balances[msg.sender]=totalSupply_;
}
function totalsupply() public override view returns (uint256){
 return totalSupply_;
}

function increaseTotalSupply(uint newTokensAmount) public {
    totalSupply_+=newTokensAmount;
    balances[msg.sender]+= newTokensAmount;
}

function balanceOf(address tokenOwner) public override view returns (uint256){
    return balances[tokenOwner];
    }

function allowance(address owner, address delegate) public override view returns (uint256){
    return allowed[owner][delegate];
}

function transfer(address recipient, uint256 numTokens) public override returns (bool){
    require(numTokens <=balances[msg.sender]);
    balances[msg.sender]=balances[msg.sender]. sub(numTokens);
    balances[recipient]=balances[recipient].add(numTokens);
    emit Transfer(msg.sender, recipient, numTokens);
    return true;
}

function approve(address delegate, uint256 numTokens) public override returns (bool){
    allowed[msg.sender][delegate]=numTokens;
    emit Approval(msg.sender, delegate, numTokens);
    return true;
} 

function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool){
    require(numTokens <= balances[owner]);
    require(numTokens <= allowed[owner][msg.sender]);
    balances[owner] = balances[owner].sub(numTokens);
    allowed[owner][msg.sender]=allowed[owner][msg.sender].sub(numTokens);
    balances[buyer]=balances[buyer].add(numTokens);
    emit Transfer (owner, buyer, numTokens);
    return true;
}

}
