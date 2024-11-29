
BASE_URL = `http://numbersapi.com/`;


const favNumList = document.querySelector('#fav-num');
const otherNumList = document.querySelector('#other-nums');

// *****************************************************************************************
// get single fact for a number, console.log result
// *****************************************************************************************
// function favNumberFacts(){
//     axios.get(`${BASE_URL}24?json`)
//     .then(res => console.log(res.data.text))
//     .catch(err => console.log(err))
//     };
// *****************************************************************************************


// get 4 facts about single number and add to ul
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

// get facts for multiple different numbers and add to ul
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

// fills page using functions above.
function fillPage(){
    fourFavNumFacts();
    multiNumberFacts();
};

fillPage();