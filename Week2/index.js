const useState = (value) => {
    //Value contains the initial value of the variable 
    let myValue = value;

    //We need to return 2 elements, the value and set function 
    const getter = () => myValue;

    //The set function needs to update the value
    const setter = (newValue) => {
        //Check if the value is data or a function
        if (typeof newValue !== 'function') {
            //If data 
            myValue = newValue;
        } 
        //Update the value 
        else {
            //If function 
            myValue = newValue(myValue);
        }
    }

    return [getter, setter];
}

//Execute the function to update the value 
const [name, setName] = useState('Hallo')
const [game, setGame] = useState('Bye')
console.log(name());
console.log(game());

setName('Hellu')
console.log(name())