// *****************************************************************************************
// get single card from new shuffled deck, console.log result
// *****************************************************************************************
// function pickACard(){
//     axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
//     .then(res => console.log(res.data.cards[0].value, 'of', res.data.cards[0].suit))
//     .catch(err => console.log(err))
// }
// *****************************************************************************************
// // get 2 cards from same deck, console.log result
// *****************************************************************************************
// function pickCardSameDeck(){
//     axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
//     .then(res => {
//         let deck = res.data.deck_id
//         console.log(res.data.cards[0].value, 'of', res.data.cards[0].suit)
//         return axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
//     })
//     .then(res => console.log(res.data.cards[0].value, 'of', res.data.cards[0].suit))
//     .catch(err => console.log(err))
// }
// *****************************************************************************************

const startButton = document.querySelector('#start-button');
const pickButton = document.querySelector('#pick-button');
const restartButton = document.querySelector('#restart-button');
const card = document.querySelector('#card');
const countHeader = document.querySelector('h3')
const count = document.querySelector('#count')


let deck;

function get_deck(){
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        deck = res.data.deck_id
    })
    .catch(err => console.log(err))
};

function start(){
    get_deck();
    startButton.classList.add('hidden');
    pickButton.classList.remove('hidden');
    countHeader.classList.remove('hidden');
};

function restart(){
    get_deck();
    restartButton.classList.add('hidden');
    pickButton.classList.remove('hidden');
    card.src="https://kofc14406.org/wp-content/uploads/2018/04/playing-cards-bicycle-rider-back-1_1024x1024.png"
    count.innerText='52'
};

function drawCard(){
    axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then(res => {
        card.src=res.data.cards[0].image;
        count.innerText=res.data.remaining;
        if (res.data.remaining === 0){
            pickButton.classList.add('hidden');
            restartButton.classList.remove('hidden');
        };
    })
    .catch(err => console.log(err))
};

startButton.addEventListener('click', start);

pickButton.addEventListener('click', drawCard);

restartButton.addEventListener('click', restart);
