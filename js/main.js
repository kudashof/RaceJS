const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div'),

    // добавление музыки - способ 1
    // music = document.createElement('audio'),

    // добавление музыки - способ 2 (более кроссбраузерный и кроссплатформенный)
    music = document.createElement('embed');

// добавление музыки - способ 2 (более кроссбраузерный и кроссплатформенный)
music.setAttribute('src', './audio.mp3');
music.setAttribute('type', 'audio/mp3');
music.classList.add('music');

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

function getQuantityElements(heightElement) {
    // return document.documentElement.clientHeight / heightElement + 1;
    return Math.ceil(gameArea.offsetHeight / heightElement);
}

// скрываем блок start: добавляем элементу start новый класс hide
function startGame() {
    start.classList.add('hide');
    // перед стартом очищаем поле с очками
    gameArea.innerHTML = '';

    for (let i = 0; i < getQuantityElements(100) + 1; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        let enemyImg = Math.floor(Math.random() * 2) + 1;
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./img/enemy${enemyImg}.png) center / cover no-repeat`;
        gameArea.appendChild(enemy);
        // console.log(enemy);
    }

    setting.score = 0;

    setting.start = true;

    // вставим/добавим в gameArea потомка - car
    gameArea.appendChild(car);

    // задаём координаты старта автомобился
    // car.style.left = '125px';
    // задаём координаты старта автомобился независимо от ширины дороги
    car.style.left = (gameArea.offsetWidth / 2 - car.offsetWidth / 2) + 'px';
    // console.log('car.style.left: ', car.style.left);
    car.style.top = 'auto';
    car.style.bottom = '10px';

    // добавим музыка при старте игры - способ 1
    // music.setAttribute('autoplay', true);
    // music.setAttribute('src', './audio.mp3');
    // music.setAttribute('controls', true);
    // gameArea.appendChild(music);

    // добавим музыка при старте игры - способ 2 (более кроссбраузерный и кроссплатформенный)
    gameArea.appendChild(music);

    // манипулируем свойством left. Добавим свойство 'x' в объект 'setting'
    // 'x' это координата по горизонтальной оси и мы будем её изменять во время игры
    // offsetLeft это значение которое у нас в CSS находится, значение left 125px
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;


    //requestAnimationFrame современный и хорошо оптимизированный метод запуска запуска анимации. Он говорит браузеру что
    //  вы хотите выполнить анимацию и просит его запланировать перерисовку на следующем кадре анимации
    requestAnimationFrame(playGame);

    // setTimeout(function() {
    // 	setting.start = false;
    // }, 300000);
}

function playGame() {
    // console.log('Play Game!');
    // пока start будет true, функция будет перезапускаться
    if (setting.start) {
        // if (setting.start === true) {

        // при запуске игры постоянно увеличиваются очки. Зависит от скорости игры
        setting.score += setting.speed; // первый вариант

        // выводим в блок количество очков
        // score.textContent = "SCORE:  " + setting.score;
        score.innerHTML = "SCORE:<br>" + setting.score;
        // console.log(setting.score);

        moveRoad();
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
    } else {
        music.remove();
    }

}

function startRun(event) {
    event.preventDefault();
    // console.log('start');
    // console.log(event);
    // console.log(event.key);
    // console.log(event.code);

    if (event.key in keys) {
        keys[event.key] = true;
    }
}

function stopRun(event) {
    // console.log('stop');
    // console.log(keys);
    // keys[event.key] = false;

    if (event.key in keys) {
        keys[event.key] = false;
    }

}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y >= gameArea.offsetHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {

        // получает параметры автомобиля
        let carRect = car.getBoundingClientRect();
        // console.log('carRect: ', carRect);
        // получаем enemy
        let enemyRect = item.getBoundingClientRect();

        // если автомобили сталкиваются, то игра остановится
        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {

            setting.start = false;
            console.warn('Произошло ДДП');
            // console.log('Произошло ДДП');

            // скрываем очки при ДТП
            start.classList.remove('hide');

            // опускаем очки вниз
            // score.style.top = start.offsetHeight + "px";

            // опускаем start вниз
            start.style.top = score.offsetHeight + "px";

        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= gameArea.offsetHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });

}



