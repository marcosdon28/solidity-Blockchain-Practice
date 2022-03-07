pragma solidity ^0.6.0;



import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";

contract FundMe{
    //revisa que las operaciones no se superpongan
        using SafeMathChainlink for uint256;
        address public owner;
        constructor() public{
            owner = msg.sender;
            
        }

    // funcion que nos permite pagar con un addres y registrar cuanto pago ese mismo adres
    //con un minimo de pay de 1 dolares
    function fund()public payable {
        uint256 minimunUsd = 1 * 10 ** 18 ;
        require(getConversionRate(msg.value) >= minimunUsd, "The minimun is 1 usd ");
        addressToAmountFunded[msg.sender] += msg.value;

    }
    mapping(address => uint256) public addressToAmountFunded ;

    //obtiene la version de la direccion del oracle
    function getVersion() public view returns(uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        return priceFeed.version();
    }


    //obtener precio eth
    function getPrice() public view returns(uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        ( ,int256 answer,,,) //aca entre las comasva una variable local que no se usa entonces dejamos la coma para avisarle a solidity q hay algo pero q lo ignore 
            = priceFeed.latestRoundData();
        return uint256(answer * 10000000000);

    }

    //sacamos los ceros
    function getConversionRate(uint256 ethAmount)public view returns(uint256){
        uint256 ethPrice = getPrice();
        uint256 ethAmountUsd = (ethPrice * ethAmount) / 1000000000000000000;
        return ethAmountUsd;


    }

    function withdraw() payable public {
        require(msg.sender == owner);
        msg.sender.transfer(address(this).balance);


    }


}