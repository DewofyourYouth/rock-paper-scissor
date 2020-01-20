const { createStore } = Redux;

const counter = (state = { you: 0, computer: 0 }, action) => {
  switch (action.type) {
    case 'WIN':
      return { you: state.you + 1, computer: state.computer };
    case 'LOSE':
      return { you: state.you, computer: state.computer + 1 };
    default:
      return state;
  }
};

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const results = document.getElementById('results');
const rpsArray = [
  { name: 'rock', el: rock },
  { name: 'paper', el: paper },
  { name: 'scissors', el: scissors }
];

const displayScore = () => {
  document.getElementById('urscore').innerText = store.getState().you
    ? store.getState().you
    : 0;
  document.getElementById('compscore').innerText = store.getState().computer
    ? store.getState().computer
    : 0;
};

let store = createStore(counter);
const checkGame = (you, computer) => {
  if (you === computer) {
    return 'Tie';
  } else if (
    (you === 'rock' && computer === 'scissors') ||
    (you === 'scissors' && computer === 'paper') ||
    (you === 'paper' && computer === 'rock')
  ) {
    store.dispatch({ type: 'WIN' });
    displayScore();
    return 'You Win!';
  } else {
    store.dispatch({ type: 'LOSE' });
    displayScore();
    return 'You Lose!';
  }
};

rpsArray.forEach(choice => {
  choice.el.addEventListener('click', e => {
    e.preventDefault();
    let computer = rpsArray[Math.floor(Math.random() * 3)].name;
    results.innerHTML = `<h2>You: ${choice.name.toUpperCase()}, Computer: ${computer.toUpperCase()}</h2>`;
    results.innerHTML += `<h1>${checkGame(choice.name, computer)}</h1>`;
  });
});
