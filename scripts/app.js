const welcomeScreen = document.querySelector('.welcome');
const gameScreen = document.querySelector('.game');
const statusScreen = document.querySelector('.resume');
const levelSelect = document.querySelector('.welcome select');
const levelSelectBtn = document.querySelector('.welcome button');
const timeContent = document.querySelector('.game h2');
const userInput = document.querySelector('.game input');
const playBtn = document.querySelector('.game button');
const helpImage = document.querySelector('.game .help > img');
const gameList = document.querySelector('.game .help ul');
const statusContent = document.querySelector('.resume h2');
const statusImage = document.querySelector('.resume img');
const newGameBtn = document.querySelector('.resume button');

const game = {
    number: null,
    moves: [],
    timer: null,
    level: null,
    lives: null
}

function init() {
    levelSelectBtn.addEventListener('click', startGame);
    playBtn.addEventListener('click', play);
    userInput.addEventListener('keyup', onkeyUp);
    newGameBtn.addEventListener('click', newGame);
}

function onkeyUp(event) {
    if (event.keyCode == 13) {
        play();
    }
}

function startGame() {

    reset();
    game.level = levelSelect.value;
    game.number = Math.floor(100 * Math.random()) + 1;
    game.moves = [];

    switch (game.level) {
        case '1':
            game.lives = 15;
            startTimer(120);
            break;
        case '2':
            game.lives = 10;
            startTimer(60);
            break;
        case '3':
            game.lives = 5;
            startTimer(15);
            break;
    }

    changeScreen('game');
}

function play () {
    helpImage.setAttribute('src', '');
    const move = parseInt(userInput.value);
    game.moves.push(move);

    if (isWinner(move)) {
        endGame(true);
        return;
    }

    if (game.moves.length <= game.moves.lives) {
        help(move);
        // console.log(game.moves.length);
    } else {
        endGame(false);
    }

    userInput.value = null;
    userInput.focus();
}

function help(move) {
    helpImage.setAttribute('src', move > game.number ? 'images/down.png' : 'images/up.png');
    const moveEl = document.createElement('li');
    moveEl.textContent = isNaN(move) ? 'Jogada Inválida' : move;
    const moveImage = document.createElement('img');
    moveImage.setAttribute('src', helpImage.getAttribute('src'));
    moveImage.style.width = '20px'; 
    moveEl.appendChild(moveImage);

    gameList.appendChild(moveEl);
}

function isWinner(move) {
    return move === game.number;
}


function reset () {
    helpImage.setAttribute('src', 'images/question.png');
    gameList.innerHTML = '';
    userInput.value = null;
    timeContent.textContent = '---';
    timeContent.style.color = 'var(--primary)';
}

function startTimer(time) {
    clearInterval(game.timer);
    
    game.timer = setInterval(function() {
        const m = Math.floor(time / 60);
        const s = time - 60 * m;
        timeContent.textContent = `${m}:${s<10 ? '0' + s : s}`;
        time--;
    
        if (time <= 10) {
            timeContent.style.color = 'var(--accent)';
        }
        
        if (time <= 0) {
            endGame(false);
        }
    }, 1000);
    
    
}

function changeScreen (screen) {
    welcomeScreen.style.display = screen === 'welcome' ? 'flex' : 'none';
    gameScreen.style.display = screen === 'game' ? 'flex' : 'none';
    statusScreen.style.display = screen === 'resume' ? 'flex' : 'none';
}

function endGame(win) {
    clearInterval(game.timer);
    changeScreen('resume');

    statusImage.setAttribute('src', win ? 'images/happy.png' : 'images/sad.png');
    statusContent.textContent = win ? `Ganhou em ${game.moves.length} jogadas.` : `Perdeu! O número era o ${game.number}`;
}

function newGame () {
    changeScreen('welcome');

}

window.addEventListener('load', init);