
BASE_URL = `http://numbersapi.com/`;


const favNumList = document.querySelector('#fav-num');
const otherNumList = document.querySelector('#other-nums');

function favNumberFacts(){
    axios.get(`${BASE_URL}24?json`)
    .then(res => console.log(res.data.text))
    .catch(err => console.log(err))
    };

function fourFavNumFacts(){
    let promises=[];
    for (let i=1; i <= 4; i++){
        promises.push(axios.get(`${BASE_URL}24?json`))
        };
    Promise.all(promises)
    .then(arr => {
        arr.forEach(fact => {
            newLi=document.createElement('li');
            newLi.innerHTML=fact.data.text;
            favNumList.appendChild(newLi);
        });
    })
    .catch(err => console.log(err))
    };

function multiNumberFacts(){
    let nums = [15,23,8,21]
    axios.get(`${BASE_URL}${nums}?json`)
    .then(res => {
        for (num in res.data){
            let newLi=document.createElement('li')
            newLi.innerHTML=res.data[num];
            otherNumList.appendChild(newLi);
        }
    })
    .catch(err => console.log(err));
    };

function fillPage(){
    fourFavNumFacts();
    multiNumberFacts();
};

fillPage();