const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');


// console.log(score);
// console.dir(score);

// // при клике присваиваем функцию
// start.onclick = function () {
// 	// скрываем блок start и запускаем игру
// 	// добавляем элементу start новый класс hide
// 	start.classList.add('hide');
// };

// событие при нажатии на надпись "Чтобы начать игру кликни сюда!"
start.addEventListener('click', startGame);

// событие при нажатии на любую клавишу
document.addEventListener('keydown', startRun);

// событие при отпускании кнопки
document.addEventListener('keyup', stopRun);

// объект с названиями клавиш для управления автомобилем
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

// объект с первоначальными данными
const setting = {
    start: false,
    score: 0,
    speed: 3
};

// скрываем блок start: добавляем элементу start новый класс hide
function startGame() {
    start.classList.add('hide');

    //
    setting.start = true;

    // вставим/добавим в gameArea потомка - car
    gameArea.appendChild(car);

    //requestAnimationFrame современный и хорошо оптимизированный метод запуска запуска анимации. Он говорит браузеру что
    //  вы хотите выполнить анимацию и просит его запланировать перерисовку на следующем кадре анимации
    requestAnimationFrame(playGame);
}

function playGame() {
    console.log('Play Game!');

    // пока start будет true, функция будет перезапускаться
    if (setting.start) {
        // if (setting.start === true) {
        // эта функция должна сама себя перезапускать(рекурсия), чтобы игра не останавливалась, и чтобы это было плавно,
        // без большой нагрузки на браузер и ПК пользователя, мы указываем:
        requestAnimationFrame(playGame);
    }

}


function startRun(event) {
    event.preventDefault();
    // console.log('start');
    // console.log(event);
    // console.log(event.key);
    // console.log(event.code);

    keys[event.key] = true;
}

function stopRun(event) {
    // console.log('stop');
    console.log(keys);
    keys[event.key] = false;

}