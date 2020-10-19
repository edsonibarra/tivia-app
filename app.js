const sectionForCategories = document.getElementById('select-a-category');
const sectionForQuestions = document.getElementById('select-a-number-questions');
const difficultiesMode = ['easy', 'medium', 'hard'];
const difficultySection = document.getElementById('select-difficulty-questions');
// const placeForQuestions = document.getElementById('questions-html-section');
let answersArray = [];
let correctAns = [];
let selectedAns = [];
let pointsPerCorrect = 10;
let score = 0;
fetch('https://opentdb.com/api_category.php')
    .then(response => response.json())
    .then(categories => {
        // console.log(categories);
        categoriesArr = [...categories.trivia_categories];
        // console.log(categoriesArr);
        categoriesArr.forEach( category => {
            const categoryHTML = `<option id = "category-${category.id}" value="${category.id}">${category.name}</option>`;
            sectionForCategories.innerHTML += categoryHTML;
        });
    })

for(let i = 0; i < 50; i++) {
    const n = `<option value="${i+1}">${i+1}</option>`;
    sectionForQuestions.innerHTML += n; 
}

difficultiesMode.forEach( mode => {
    const difficultyHTML = `<option value="${mode}">${mode}</option>`;
    difficultySection.innerHTML += difficultyHTML;
})

getValuesForURL = () => {
    const categorySelected = document.getElementById('select-a-category').value;
    const numberSelected = document.getElementById('select-a-number-questions').value;
    const modeSelected = document.getElementById('select-difficulty-questions').value;
    const typeSelected = document.getElementById('select-a-type').value;
    const everything = document.getElementById('outter-container');
    fetch(`https://opentdb.com/api.php?amount=${numberSelected}&category=${categorySelected}&difficulty=${modeSelected}&type=${typeSelected}`)
        .then(response => response.json())
        .then(questionsFromApi => {
            
            const arrayQuestions = [...questionsFromApi.results];
            const w = document.getElementById('filters-container')
            w.innerHTML = "";
            w.innerHTML += `<div class="questions-page-title"><h2>Answer these ${numberSelected} questions</h2></div>`;
            w.innerHTML += `<div class="question-filtered-page"><span class="">You Get 10 ponits for each correct question!</span></div>`
            w.innerHTML +=  `<div>
                                <form onsubmit="event.preventDefault()" id="filters-container-2">
                                </form>
                            </div>`
            const wDos = document.getElementById('filters-container-2');
            arrayQuestions.forEach( (question,index1) => {
                correctAns.push(question.correct_answer);
                // console.log(question.correct_answer);
                const questionHTML =    `<div class=>
                                            <h2>${index1+1}). ${question.question}</h2>
                                        </div>`;
                wDos.innerHTML += questionHTML;
                let randomNumber = Math.floor(Math.random() * 4);
                answersArray = [...question.incorrect_answers];
                answersArray.splice(randomNumber, 0 , question.correct_answer);
                answersArray.forEach( (item,index2) => {
                    const answersHTML = `<input class="choice" type="radio" id="${index1}${index2}" name="${index1}" value="${item}" required><label for="${index1}${index2}">${item}</label><br>`;
                    wDos.innerHTML += answersHTML;
                })
            })
            console.log('correctas desde fecth')
            console.log(correctAns);
            const passedCorrects = [...correctAns]
            wDos.innerHTML += `<input onclick="getValuesSelected('${correctAns}')" class="submit-button-form" type="submit" value="submit">`
        })
}

getValuesSelected = (corrAns) => {
    const newCorrAns = corrAns.split(',');
    console.log('nuevo')
    console.log(newCorrAns)
    let score2 = 0;
    let sumador = 10;
    let options = Array.from(document.getElementsByClassName('choice'));
    options.forEach( option => {
        if(option.checked) {
            selectedAns.push(option.value)
        }
    })
    console.log('correctas')
    console.log(newCorrAns)
    console.log('seleccionadas')
    console.log(selectedAns);
    for(let  i = 0; i < newCorrAns.length; i++) {
        if(newCorrAns[i] == selectedAns [i]) {
            console.log('found a correct');
            score += pointsPerCorrect;
        }
    }
    console.log(score)
    // const aaw = document.getElementById('filters-container')
    
    const outOf = newCorrAns.length * pointsPerCorrect;
    const wwDos = document.getElementById('filters-container');
    wwDos.innerHTML = '';
    const scoreHTML =  `<h2>Your Score: ${score} Out Of ${outOf}</h2>`
    wwDos.innerHTML =  scoreHTML;
    
}
















