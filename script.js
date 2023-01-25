// Create array to hold board data - Создать массив для хранения данных доски
let boardData = [
[0, 0, 0],
[0, 0, 0],
[0, 0, 0]
]

// Define game variables - Определение игровых переменных
let player = 1;
let gameOver = false;

// Pull in cells from DOM - Извлекать ячейки из ДОМ дерева
const cellElements = document.querySelectorAll(".cell");
// Pull in the result text from DOM - Извлеките текст результата из ДОМ дерева
const resultElement = document.getElementById("result");

// Add event listener - Добавить обработчик событий
cellElements.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    placeMarker(index);
  });
});

// Create function for placing markers - Создать функцию для размещения маркеров
function placeMarker(index) {
  // Determine row and column from index - Определите строку и столбец из индекса
  let col = index % 3;
  let row = (index - col) / 3;
  // Cheak if the current cell is empty - Проверить, пуста ли текущая ячейка
  if(boardData[row][col] == 0 && gameOver == false) {
    boardData[row][col] = player;
    // Change player - Сменить игрока
    player *= -1;
    // Update the screen with markers - Обновить экран с помощью маркеров
    drawMarkers();
    // Check if anyone has won - Проверять выиграл ли кто-нибудь
    checkResult();
  }
}

// Create function for drawing player markers - Создать функцию для рисования маркеров игроков
function drawMarkers() {
  // Iterate over rows - Перебирать строки
  for(let row = 0; row < 3; row++) {
    // Iterate over columns - Перебирать колонки
    for(let col = 0; col <3; col++) {
      // Check if it is player 1's marker - Проверять есть ли у первого игрока маркер
      if(boardData[row][col] == 1) {
        // Update cell class to add a cross - Обновлять у ячейки класс и добавлять крест
        cellElements[(row * 3) + col].classList.add("cross");
      } else if(boardData[row][col] == -1) {
        // Update cell class to add a circle - Обновлять у ячейки класс и добавлять круг
        cellElements[(row * 3) + col].classList.add("circle");
      }
    }
  }
}

// Create function for checking the result of the game - Создать функцию для проверки результата игры
function checkResult() {
  // Check rows and columns - Проверять строки и колонки
  for(let i = 0; i <3; i++) {
    let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
    let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
    if(rowSum == 3 || colSum == 3) {
      // Player 1 wins - Игрок 1 выиграл
      endGame(1);
      return
    } else if(rowSum == -3 || colSum == -3) {
      // Player 2 wins - Игрок 2 выиграл
      endGame(2);
      return
    }
  }

  // Creck diagonals - Проверять диагональ
  let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
  let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
  if(diagonalSum1 == 3 || diagonalSum2 == 3) {
    // Player 1 wins - Игрок 1 выиграл
    endGame(1);
    return
  } else if(diagonalSum1 == -3 || diagonalSum2 == -3) {
    // Player 2 wins - Игрок 2 выиграл
    endGame(2);
    return
  }

  // Check for a tie - Проверять наличие ничьи
  if(boardData[0].indexOf(0) == -1 &&
    boardData[1].indexOf(0) == -1 &&
    boardData[2].indexOf(0) == -1) {
      endGame(0);
      return
  }
}

// Function to end the game and display the result - Функция для завершения игры и отображения результата
function endGame(winner) {
  // Trigger game over - Запуск игры окончен
  gameOver = true;
  // Check if game ended in a tie - Проверить если игра закончена в ничью
  if(winner == 0) {
    resultElement.innerText = "Это ничья!"
  } else {
    resultElement.innerText = `Игрок ${winner} победил!`
  }
}

// Restart game - Перезапустить игру
const restartButton = document.getElementById("restart");
// Add event listener to restart button - Добавить обработчик событий к кнопке перезапуска
restartButton.addEventListener("click", () => {
  // Reset game variables - Сброс игровых переменных
  boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
  player = 1;
  gameOver = false;

  // Reset game board - Сбросить игровую доску
  cellElements.forEach(cell => {
    cell.classList.remove("cross", "circle");
  });
  // Reset outcome text - Сбросить текст результата
  resultElement.innerText = "";
});