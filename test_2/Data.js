const testData = {
    "testname": "Football knowledge test",
    "questions": [
        {
            "question": "Club with the most UCL",
            "answers": [
                {
                    "answer": "FC Barcelona",
                    "isCorrect": false
                },
                {
                    "answer": "Real Madrid",
                    "isCorrect": true
                },
                {
                    "answer": "FC Bayern",
                    "isCorrect": false
                },
                {
                    "answer": "Manchester City",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Player with the most Ballon Dors",
            "answers": [
                {
                    "answer": "Messi",
                    "isCorrect": true
                },
                {
                    "answer": "Cristiano Ronaldo",
                    "isCorrect": false
                },
                {
                    "answer": "Pele",
                    "isCorrect": false
                },
                {
                    "answer": "Maradona",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Top 5 League:",
            "answers": [
                {
                    "answer": "EPL, La liga, Seria A, Eredivisie, Bundesliga",
                    "isCorrect": false
                },
                {
                    "answer": "EPL, La liga, League 1, Eredivisie, Bundesliga",
                    "isCorrect": false
                },
                {
                    "answer": "EPL, La liga, Seria A, Eredivisie, League 1",
                    "isCorrect": false
                },
                {
                    "answer": "EPL, La liga, Seria A, League 1, Bundesliga",
                    "isCorrect": true
                }
            ]

        },
        { 
            "question": "Best country team of all time:",
            "answers": [
                {
                    "answer": "Argentina",
                    "isCorrect": false
                },
                {
                    "answer": "England",
                    "isCorrect": false
                },
                {
                    "answer": "Brazil",
                    "isCorrect": true
                },
                {
                    "answer": "German",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Who won UCl in 2003/04:",
            "answers": [
                {
                    "answer": "Real Madrid",
                    "isCorrect": false
                },
                {
                    "answer": "Monaco",
                    "isCorrect": false
                },
                {
                    "answer": "Porto",
                    "isCorrect": false
                },
                {
                    "answer": "Milan",
                    "isCorrect": true
                }
            ]
        }
    ]
};

const questionsContainer = document.getElementById('questions-container');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');

testData.questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

    question.answers.forEach(answer => {
        const answerInput = document.createElement('input');
        answerInput.type = 'radio';
        answerInput.name = `question${index}`;
        answerInput.value = answer.answer;
        questionDiv.appendChild(answerInput);

        const answerLabel = document.createElement('label');
        answerLabel.textContent = answer.answer;
        questionDiv.appendChild(answerLabel);
        questionDiv.appendChild(document.createElement('br'));
    });

    questionsContainer.appendChild(questionDiv); // Додайте створений div до контейнера
});

submitBtn.addEventListener('click', () => {
    let correctAnswers = 0;
    testData.questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`).value;
        if (question.answers.find(answer => answer.answer === selectedAnswer && answer.isCorrect)) {
            correctAnswers++;
        }
    });

    resultContainer.textContent = `You gave the correct answers to ${correctAnswers}/${testData.questions.length} questions.`;
});
