const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

function FrameWork()
{
  let state = {};
  let stateCounter = {};

  function useState(value)
  {
    const callerName = arguments.callee.caller.name;
    const callerArguments = arguments.callee.caller.arguments;

    if (typeof stateCounter[callerName] === 'undefined') {
      stateCounter[callerName] = 0;
    }

    const stateName = callerName + stateCounter[callerName];
    if (typeof state[stateName] === 'undefined') {
      state[stateName] = { value: value, component: arguments.callee.caller };
    }
    stateCounter[callerName]++;

    const setter = (newValue) => {
      if (typeof newValue !== 'function') {
        state[stateName].value = newValue;
      } else {
        state[stateName].value = newValue(state[stateName].value);
      }

      stateCounter[callerName] = 0;
      state[stateName].component(...callerArguments);
    };

    return [state[stateName].value, setter];
  }

  const FirstComponent = function ({ onClick }) {
    const [name, setName] = useState('Antwan');

    eventEmitter.once('fakeClick', () => {
      setName('Bas');
      onClick();
    });

    console.log(`My name is ${name}`);
  };
  FirstComponent({ onClick: () => console.log('first instance') });
  FirstComponent({ onClick: () => console.log('second instance') });

  const SecondComponent = function () {
    const [counter, setCounter] = useState(0);
    const [list, setList] = useState(['Dancing']);

    eventEmitter.once('fakeClick', () => setCounter(10));
    eventEmitter.once('fakeClick', () => setCounter((oldCounter) => oldCounter + 1));
    eventEmitter.once('fakeClick', () => setList((oldList) => {
      oldList.push('Do groceries');
      oldList.push('Listen music');
      return oldList;
    }));

    console.log(`I count ${counter}, and my list contains ${list.join(', ')}`);
  };
  SecondComponent();

  eventEmitter.emit('fakeClick');
  console.log(state);
}

FrameWork();