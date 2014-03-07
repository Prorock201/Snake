window.onload = bindEventHandlers;
var X = 600;
var Y = 300;
var Size = 20;
var Move = Size;
var MoveX = -Move;
var MoveY = 0;
var Snake = [{x:X, y:Y}];
var Basket = [];
var MaxFruits = 1;
var NeedFruits = 0;
var Lives = 3;
var Level = 1;
var Fruits = 0;
var CurrentScore = 0;
var PreviouslyScore = 0;
var Score = 0;
var Speed = 200;
var Bonus = 300;

function bindEventHandlers() {
	window.canvas = document.getElementById('grass');
	window.context = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 500;
	
	$('#start').on('click', startGame);
	$('#next').on('click', getNewLevel);
	$('#continue').on('click', getResume);
	$('#resume').on('click', getResume);
	$('#end-game').on('click', startNewGame);
	$('#win-game').on('click', startNewGame);
	$('#pause').on('click', getPause);

	$(document).keydown(function(event) {
		switch(event.keyCode) {
			case 37:
				if (MoveX != Move) {
					MoveX = -Move;
					MoveY = 0;
				}
				break;
			case 38:
				if (MoveY != Move) {
					MoveX = 0;
					MoveY = -Move;
				}
				break;
			case 39:
				if (MoveX != -Move) {
					MoveX = Move;
					MoveY = 0;
				}
				break;
			case 40:
				if (MoveY != -Move) {
					MoveX = 0;
					MoveY = Move;
				}
		}
	});
}

function getSnakeBody() {
	this.x = X;
	this.y = Y;
}

function getFruits() {
	this.x = getRandom(0, (canvas.width-Size)/Size)*Size;
	this.y = getRandom(0, (canvas.height-Size)/Size)*Size;
}

function drawSnake() {
	upDateResult();	
	context.clearRect(0, 0, canvas.width, canvas.height);
	X += MoveX;
	Y += MoveY;
	Snake.pop();
	Snake.unshift(new getSnakeBody());
	for (var i = 1; i < Snake.length; i++) {
		if (Snake[0].x == Snake[i].x && Snake[0].y == Snake[i].y) {
			clearInterval(play);
			--Lives;
			$('.die__text__name-score').text('Your Current Score: ' + Score);
			$('.die__text__name').text('You have ' + Lives +' lives left');
			$('.die').css('display', 'block');
		}
	}
	$.each(Snake, function drawBody(index, element) {
		context.fillStyle = 'red';
		context.fillRect(element.x, element.y, Size, Size);
		context.strokeRect(element.x, element.y, Size, Size);
		if (element.x < 0) {
			element.x = element.x + 800;
			X = element.x;
			drawBody(index, element);
		} else if (element.x > 800 - Size) {
			element.x = element.x - 800;
			X = element.x;
			drawBody(index, element);
		}	
		if (element.y < 0) {
			element.y = element.y + 500;
			Y = element.y;
			drawBody(index, element);
		} else if (element.y > 500 - Size) {
			element.y = element.y - 500;
			Y = element.y;
			drawBody(index, element);
		}
		
		$.each(Basket, function (index2, element2) {
			if (element.x == element2.x && element.y == element2.y) {
				Basket[index2] = new getFruits();
			}
			context.fillStyle = 'yellow';
			context.fillRect(element2.x, element2.y, Size, Size);
			context.strokeRect(element2.x, element2.y, Size, Size);
			if (element.x == element2.x && element.y == element2.y) {
				++Fruits;
				Basket[index2] = new getFruits();
				Snake.push(new getSnakeBody());
			}
		});
	});
}

function getRandom(min,max) {
	return Math.floor(Math.random()*(max+1-min)+min);
}

function getSweeties() {
	if (Basket.length < MaxFruits) {
		Basket.push(new getFruits());
	}
}

function getPause() {
	clearInterval(play);
	$('.pause').css('display', 'block');
}

function getResume() {
	$('.pause').css('display', 'none');
	$('.die').css('display', 'none');
	play = setInterval(drawSnake, Speed);
}

function startNewGame() {
	location.reload();
}

function upDateResult() {
	CurrentScore = $('.level-up__text__fruits-bonus .value').text();
	var levelBonus = $('.level-up__text__level-bonus .value').text();
	CurrentScore = 25*Level*Fruits;
	Score = PreviouslyScore + CurrentScore;
	
	$('.content__info__lives').text('Lives: '+ Lives);
	$('.content__info__level').text('Level: '+ Level);
	$('.content__info__fruits').text('Fruits: '+ Fruits + '/' + NeedFruits);
	$('#score').text('Score: ' + Score);
	if (Lives < 0) {
		clearInterval(play);
		$('.end-game').css('display', 'block');
	}
	if (Fruits == 60) {
		clearInterval(play);
		$('.win__text__fruits-bonus .value').text(CurrentScore);
		$('.win__text__level-bonus .value').text(levelBonus);
		$('.win__text__score .value').text(Score);
		$('.win__text__total-score .value').text(Score);
		$('#score').text('Score: ' + Score);
		$('.win-game').css('display', 'block');
	} else if (Fruits == NeedFruits) {
		clearInterval(play);
		levelBonus = Level*Bonus;
		Score += levelBonus;
		$('.level-up__text__fruits-bonus .value').text(CurrentScore);
		$('.level-up__text__level-bonus .value').text(levelBonus);
		$('.level-up__text__score .value').text(CurrentScore + levelBonus);
		$('.level-up__text__total-score .value').text(Score);
		$('#score').text('Score: ' + Score);
		PreviouslyScore = Score;
		$('.level-up').css('display', 'block');
	}
}

function startGame() {
	if (NeedFruits == 0) {
		NeedFruits = 5;
	}
	$('.new-game').css('display', 'none');
	window.play = setInterval(drawSnake, Speed);
	setInterval(getSweeties, 1000);
}

function getNewLevel() {
	clearInterval(play);
	X = 600;
	Y = 300;
	Move = Size;
	MoveX = -Move;
	MoveY = 0;
	Snake = [{x:X, y:Y}];
	Basket = [];
	MaxFruits += 1;
	Level += 1;
	Fruits = 0;
	CurrentScore = 0;
	Speed -= 25;
	if (NeedFruits == 45) {
		NeedFruits = 60;
	} else {
		NeedFruits += 5;
	}
	$('.level-up').css('display', 'none');
	window.play = setInterval(drawSnake, Speed);
	setInterval(getSweeties, 1000);
}