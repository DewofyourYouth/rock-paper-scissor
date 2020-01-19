const { createStore } = Redux;

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      if (state > 0) {
        return state - 1;
      }
      return state;
    default:
      return state;
  }
};

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const results = document.getElementById('results');
let yourScore = 0;
let computerScore = 0;
const rpsArray = [
  { name: 'rock', el: rock },
  { name: 'paper', el: paper },
  { name: 'scissors', el: scissors }
];

let store = createStore(counter);
const checkGame = (you, computer) => {
  if (you === computer) {
    return 'Tie';
  } else if (
    (you === 'rock' && computer === 'scissors') ||
    (you === 'scissors' && computer === 'paper') ||
    (you === 'paper' && computer === 'rock')
  ) {
    store.dispatch({ type: 'INCREMENT' });
    if (store.getState()) {
      console.log('your score ' + store.getState());
    }
    document.getElementById('urscore').innerText = store.getState()
      ? store.getState()
      : 0;
    return 'You Win!';
  } else {
    store.dispatch({ type: 'DECREMENT' });
    console.log('your score' + store.getState());
    document.getElementById('urscore').innerText = store.getState();
    return 'You Lose!';
  }
};

rpsArray.forEach(choice => {
  choice.el.addEventListener('click', e => {
    e.preventDefault();
    let computer = rpsArray[Math.floor(Math.random() * 3)].name;
    results.innerHTML = `<h2>You: ${choice.name.toUpperCase()}, Computer: ${computer.toUpperCase()}</h2>`;
    results.innerHTML += `<h1>${checkGame(choice.name, computer)}</h1>`;
    console.table({
      you: { choice: choice.name },
      computer: { choice: computer }
    });
  });
});
