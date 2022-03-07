pragma solidity ^0.6.0;

contract SimpleStorage {

    //Tipos de variables
    //https://docs.soliditylang.org/en/v0.8.6/types.html

    uint256 favoriteNumber = 543;
    bool favoriteState = true;
    string favoriteText = "PEPE";
    int256 favoriteInt = -1;
    address favoriteAddress = 0x28df3d8c734D1ef31B7AB18c0133deb10BC7B9ED; 
    bytes32 favoriteBytes = "cat";

    //esta funcion cambia el valor de favoritenumber por uno q ingresemos
    function store (uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    //esta funcion muestra el valor almacenado en favorite number 
    //la funcion view sirve para mostrar una info dentro del contrato ( no hace un cambio entonces no cobra gas)
    //igual que la funcion pure q sirve para hacer una operacion matematica de variables dentro del contrato

    function retrieve() public view returns(uint256){
        return favoriteNumber;
    }

    //clases
    struct People {
        uint256 favoriteNumber;
        string name ;
    }

    //instanciar una persona
    People public person1 = People({favoriteNumber: 10, name:"marcos"});

    //arrays (lista de personas)
    People[] public people;

    //agarra una variable y la engancha a otra para q queden relacionadas
    mapping(uint256 => string) public favoriteNumberToName;

    //funcion para agregar gente a ese array
    function addPerson(uint256 _favoriteNumber, string memory _name) public{
        people.push(People({favoriteNumber: _favoriteNumber, name: _name}));
        favoriteNumberToName[_favoriteNumber] = _name ;

    }
}