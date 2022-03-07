pragma solidity ^0.6.0;

import "./SimpleStorage.sol";

contract StorageFactory{
    
    SimpleStorage[] public simpleStorageArray;

    //esta funcion nos permite desplegar un contrato SimpleStorage a partir de este nuevo contrato
    //ademas almacenamos el address de ese contrato
    function createSimpleStorageContract() public{
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);

    }
    // con esta funcion vamos a guardar en un contrato creado el numero favorito, para eso nesecitamos el numero de la posicion
    //en la cual se encuentra el contrato para saber a quien asignarle el num y el numero que le queremos asignar
    function SimpleStorageStore(uint256 _simpleStorageIndex, uint256 _simpleStorageFavoriteNumber) public{
        SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).store(_simpleStorageFavoriteNumber);
        

    }
   //con esta funcion podemos obtener el numero favorito del contrato pasandole la posicion en la que se encuentra almacenada
   // el address del contrato
   function SimpleStorageGet(uint256 _simpleStorageIndex) public view returns(uint256){
       return SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).retrieve();
       


   }
}