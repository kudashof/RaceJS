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
    speed: 3,
    traffic: 3
};

//
function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

// скрываем блок start: добавляем элементу start новый класс hide
function startGame() {
    start.classList.add('hide');

    //
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    //
    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url("./img/enemy.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
    }

    //
    setting.start = true;

    // вставим/добавим в gameArea потомка - car
    gameArea.appendChild(car);

    // манипулируем свойством left. Добавим свойство 'x' в объект 'setting'
    // 'x' это координата по горизонтальной оси и мы будем её изменять во время игры
    // offsetLeft это значение которое у нас в CSS находится, значение left 125px
    setting.x = car.offsetLeft;

    //
    setting.y = car.offsetTop;


    //requestAnimationFrame современный и хорошо оптимизированный метод запуска запуска анимации. Он говорит браузеру что
    //  вы хотите выполнить анимацию и просит его запланировать перерисовку на следующем кадре анимации
    requestAnimationFrame(playGame);
}

function playGame() {
    // console.log('Play Game!');

    // пока start будет true, функция будет перезапускаться
    if (setting.start) {
        // if (setting.start === true) {

        //
        moveRoad();

        //
        moveEnemy();

        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }

        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }

        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }


        car.style.left = setting.x + 'px';

        car.style.top = setting.y + 'px';


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

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item) {
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });

}