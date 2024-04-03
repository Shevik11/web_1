// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = parseInt(localStorage.getItem('score')) || 0; // Зчитуємо результат з localStorage або встановлюємо 0, якщо результат відсутній
let headImage = new Image();
let foodImage = new Image();
let bodyImage = new Image();

// Load images
headImage.src = 'snake_head.png'; // Замініть 'snake_head.png' на шлях до вашого зображення голови змійки
foodImage.src = 'berry.png'; // Замініть 'berry.png' на шлях до вашого зображення їжі
bodyImage.src = 'collect_berry.png'; // Замініть 'collect_berry.png' на шлях до вашого зображення "збирання ягід"

// Game loop
function gameLoop() {
    setTimeout(function() {
        requestAnimationFrame(gameLoop);
        update();
        draw();
    }, 100); // оновлює стан гри і перерисовує гру кожні 100 мілісекунд
}

// Update game state
function update() {
    // Move the snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

    // Check for collision with walls
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        gameOver();
    }

    // Check for collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }

    // Save score to localStorage
    localStorage.setItem('score', score);
}

// Generate new food
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

function draw() {
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach(function (segment, index) {
        if (index === 0) {
            ctx.drawImage(headImage, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        } else {
            ctx.drawImage(bodyImage, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        }
    });

    ctx.drawImage(foodImage, food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Game over
function gameOver() {
    alert('Game over! Your score    : ' + score);
    updateBestScores(score);
    updateWorstScores(score);
    showScoreboard();

    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    generateFood();
    localStorage.setItem('score', score); // Скидаємо результат в localStorage
}


// Handle keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (event.key === 'ArrowDown' && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (event.key === 'ArrowLeft' && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

// Функція для оновлення списку найкращих результатів
function updateBestScores(score) {
    let bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];
    
    // Перевіряємо, чи новий результат є кращим, ніж будь-який з існуючих
    if (!bestScores.includes(score) && (bestScores.length < 3 || score > bestScores[bestScores.length - 1])) {
        bestScores.push(score);
        bestScores.sort((a, b) => b - a);
        bestScores = bestScores.slice(0, 3); // Обмежуємо список до трьох найкращих результатів
        localStorage.setItem('bestScores', JSON.stringify(bestScores));
    }
}

// Функція для оновлення списку найгірших результатів
function updateWorstScores(score) {
    let worstScores = JSON.parse(localStorage.getItem('worstScores')) || [];
    
    // Видаляємо всі випадки повторів результату в списку
    worstScores = worstScores.filter(s => s !== score);
    
    // Перевіряємо, чи новий результат є гіршим, ніж будь-який з існуючих
    if (worstScores.length < 3 || score < worstScores[worstScores.length - 1]) {
        worstScores.push(score);
        worstScores.sort((a, b) => a - b);
        worstScores = worstScores.slice(0, 3); // Обмежуємо список до трьох найгірших результатів
        localStorage.setItem('worstScores', JSON.stringify(worstScores));
    }
}

// Функція для відображення таблиці з найкращими та найгіршими результатами
function showScoreboard() {
    let bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];
    let worstScores = JSON.parse(localStorage.getItem('worstScores')) || [];

    let scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = `
        <h2>Table of results</h2>
        <h3>Best scores:</h3>
        <ol style="text-align: center;">
            ${bestScores.map(score => `<li style="text-align: center;">${score}</li>`).join('')}
        </ol>
        <h3>Worst scores:</h3>
        <ol style="text-align: center;">
            ${worstScores.map(score => `<li style="text-align: center;">${score}</li>`).join('')}
        </ol>
    `;
}





// Start the game
generateFood();
gameLoop();

