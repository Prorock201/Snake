window.onload = bindEventHandlers;
var X = 600;
var Y = 400;
var Size = 40;
var Move = Size;
var MoveX = -Move;
var MoveY = 0;
var Snake = [{x:X, y:Y},{x:X+Size, y:Y},{x:X+2*Size, y:Y}];
var ExampleSnake = [];
var Basket = [];
var ExampleBasket = [{x:40, y:180},{x:100, y:380},{x:160, y:40}];
var MaxFruits = 1;
var NeedFruits = 0;
var Lives = 3;
var Level = 1;
var Fruits = 0;
var CurrentScore = 0;
var PreviouslyScore = 0;
var Score = 0;
var Speed = 250;
var Bonus = 300;
var Pic = new Image();
var FriutName = 'strawberry';
var SkinA = '#000066';
var SkinB = 'white';
var Theme = 'sand';
Pic.src = 'images/' + FriutName + '.png';
var CheatCode = [];
var CheatMode = false;
var UserName;
var HighScore = [
	{name: 'vasya', points: 60000},
	{name: 'DrAgOn', points: 50000},
	{name: 'mikhalich', points: 3000},
	{name: 'LUDOCHLA', points: 5000},
	{name: 'killer888', points: 30000},
	{name: 'Zahar', points: 8000},
	{name: 'babka', points: 10000},
	{name: 'PupS', points: 2000},
	{name: 'karlson', points: 1000},
	{name: 'Putin V.V.', points: 70000},
];

function bindEventHandlers() {
	window.example = document.getElementById('example');
	window.exCtx = example.getContext('2d');
	example.width = 200;
	example.height = 460;

	window.canvas = document.getElementById('grass');
	window.context = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 600;

	//window buttons
	//cheat window
	$('#jump').click(function() {
		CheatMode = true;
		Level = $('#level-go option:selected').val();
		$('.cheat-game').css('display', 'none');
		getNecessarylevel(Level);
	});
	$('#cancelCheat').click(function() {
		$('.cheat-game').css('display', 'none');
		continueGame();
	});
	
	//profile window
	$('#confirm').click(function() {
		if ($('.profile__text__value input').val().length < 3) {
			$('#name-error').css('display', 'block');
		} else {
			UserName = $('.profile__text__value input').val();
			$('.profile').css('display', 'none');
			$('.new-game').css('display', 'block');
			fillName();
		}
	});
	$('#incognito').click(function() {
		UserName = 'noName';
		$('.profile').css('display', 'none');
		$('.new-game').css('display', 'block');
		fillName();
	});

	//new game window
	$('#start').click(function() {
		if (NeedFruits == 0) {
		NeedFruits = 5;
		}
		$('#grass').css('background', 'url(images/'+ Theme + '.jpg)');
		$('.new-game').css('display', 'none');
		continueGame();
	});
	$('#settings').click(function() {
		drawExample();
		$('.setting-menu').css('display', 'block');
	});

	//level-up window
	$('#next').click(function() {
		Level += 1;
		MaxFruits = Level;
		Fruits = 0;
		CurrentScore = 0;
		Speed -= 25;
		NeedFruits += 5;
		$('.level-up').css('display', 'none');
		continueGame();
	});
	$('.quit').on('click', startNewGame);

	//pause window
	$('#continue').on('click', getResume);

	//die window
	$('#resume').on('click', getResume);

	//end-game window
	$('#end-game').on('click', startNewGame);
	$('.records').on('click', showHighScore);

	//win-game window
	$('#win-game').on('click', startNewGame);

	//settings window
	$('#apply').click(function() {
		$('.setting-menu').css('display', 'none');
	});
	$('#cancel').on('click', startNewGame);

	//high score window
	$('#hs-ok').click(function() {
		if (Lives > 0) {
			continueGame();
		}
		$('#records').css('background-color', '#000066');
		$('.high-score').css('display', 'none');
	});
	$('#clear').click(function() {
		console.log('FILL IT!!!');
	});

	//menu buttons
	$('#records').on('click', showHighScore);
	$('#sound').click(function() {
		$('audio').each(function(index, element) {
			if (element.paused == true) {
				$('#sound').text('Sound: on');
				$('#sound').css('background-color', '#000066');
				element.play();
			} else {
				$('#sound').text('Sound: off');
				$('#sound').css('background-color', '#FF0000');
				element.pause();
			}
		});
	});
	$('#pause').click(function() {
		clearInterval(play);
		$('#pause').css('background-color', '#FF0000');
		$('.pause__text__name-score').text('Your Current Score: ' + Score);
		$('.pause').css('display', 'block');
	});

	//setting changes
	$('#snake-size').change(function() {
		Size = parseInt($('#snake-size option:selected').val());
		Move = Size;
		MoveX = -Move;
		drawExample();
	});

	$('#snake-color').change(function() {
		switch($('#snake-color option:selected').val()) {
			case 'Mamba':
				SkinA = 'green';
				SkinB = 'white';
				break;
			case 'Viper':
				SkinA = 'green';
				SkinB = 'yellow';
				break;
			case 'Scarlet':
				SkinA = 'red';
				SkinB = 'black';
				break;
			case 'Coral':
				SkinA = 'red';
				SkinB = 'yellow';
				break;
			case 'Racer':
				SkinA = 'black';
				SkinB = 'white';
				break;
			case 'Python':
				SkinA = 'black';
				SkinB = 'green';
				break;
			case 'Copperhead':
				SkinA = 'white';
				SkinB = 'red';
				break;
			case 'Tiger':
				SkinA = 'white';
				SkinB = 'yellow';
				break;
			case 'Puff adder':
				SkinA = 'yellow';
				SkinB = 'black';
				break;
			case 'Indigo':
				SkinA = 'yellow';
				SkinB = 'blue';
				break;
			case 'King snake':
				SkinA = 'blue';
				SkinB = 'red';
				break;
			case 'Boomslang':
				SkinA = '#000066';
				SkinB = 'white';
				break;
		}
		drawExample();
	});

	$('#fruits').change(function() {
		FriutName = $('#fruits option:selected').val().toLowerCase();
		Pic.src = 'images/' + FriutName + '.png';
		drawExample();
	});
	
	$('#board-color').change(function() {
		Theme = $('#board-color option:selected').val().toLowerCase();
		$('#example').css('background', 'url(images/' + Theme + '.jpg)');
		drawExample();
	});

	//moving snake
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
				break;
		}

		//cheating
		switch(event.keyCode) {
			case 67:
				if (CheatCode.length == 0) {
					CheatCode.push('c');
				}
				break;
			case 72:
				if (CheatCode.length == 1) {
					CheatCode.push('h');
				}
				break;
			case 69:
				if (CheatCode.length == 2) {
					CheatCode.push('e');
				}
				break;
			case 65:
				if (CheatCode.length == 3) {
					CheatCode.push('a');
				}
				break;
			case 84:
				if (CheatCode.length == 4) {
					clearInterval(play);
					$('.cheat-game').css('display', 'block');
				}
				break;
			default:
				CheatCode = [];
		}
	});
}

function drawExample() {
	exCtx.clearRect(0, 0, example.width, example.height);
	ExampleSnake = [{x:40, y:40},{x:40, y:40+Size},{x:40, y:40+2*Size}];
	$.each(ExampleSnake, function (index, element) {
		exCtx.beginPath();
		exCtx.fillStyle = SkinA;
		exCtx.arc(element.x + Size/2, element.y + Size/2, Size/2, 0, 2*Math.PI);
		exCtx.fill();
		exCtx.stroke();
		exCtx.beginPath();
		exCtx.fillStyle = SkinB;
		exCtx.moveTo(element.x + 14*(Size/16), element.y + 3*(Size/16));
		exCtx.arc(element.x + Size/2, element.y - 2*(Size/16), Size/2, 0.22*Math.PI, 0.78*Math.PI);
		exCtx.arc(element.x + Size/2, element.y + Size/2, Size/2, 1.22*Math.PI, 1.78*Math.PI);
		exCtx.moveTo(element.x + 2*(Size/16), element.y + 13*(Size/16));
		exCtx.arc(element.x + Size/2, element.y + 18*(Size/16), Size/2, 1.22*Math.PI, 1.78*Math.PI);
		exCtx.arc(element.x + Size/2, element.y + Size/2, Size/2, 0.22*Math.PI, 0.78*Math.PI);
		exCtx.fill();
		exCtx.stroke();
	});

	$.each(ExampleBasket, function (index2, element2) {
		exCtx.drawImage(Pic, element2.x, element2.y, Size, Size);
	});
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
			Lives -= 1;
			if (Lives < 0) {
				$('.end-game__text__name-score').text('Your Total Score: ' + Score);
				$('.end-game').css('display', 'block');
				recordResult();
			} else {
				$('.die__text__name-score').text('Your Current Score: ' + Score);
				$('.die__text__name').text('You have ' + Lives +' lives left');
				$('.die').css('display', 'block');
			}
		}
	}

	$.each(Snake, function drawBody(index, element) {
		context.beginPath();
		context.fillStyle = SkinA;
		context.arc(element.x + Size/2, element.y + Size/2, Size/2, 0, 2*Math.PI);
		context.fill();
		context.stroke();
		context.beginPath();
		context.fillStyle = SkinB;
		context.moveTo(element.x + 14*(Size/16), element.y + 3*(Size/16));
		context.arc(element.x + Size/2, element.y - 2*(Size/16), Size/2, 0.22*Math.PI, 0.78*Math.PI);
		context.arc(element.x + Size/2, element.y + Size/2, Size/2, 1.22*Math.PI, 1.78*Math.PI);
		context.moveTo(element.x + 2*(Size/16), element.y + 13*(Size/16));
		context.arc(element.x + Size/2, element.y + 18*(Size/16), Size/2, 1.22*Math.PI, 1.78*Math.PI);
		context.arc(element.x + Size/2, element.y + Size/2, Size/2, 0.22*Math.PI, 0.78*Math.PI);
		context.fill();
		context.stroke();

		if (element.x < 0) {
			element.x = element.x + canvas.width;
			X = element.x;
			drawBody(index, element);
		} else if (element.x > canvas.width - Size) {
			element.x = element.x - canvas.width;
			X = element.x;
			drawBody(index, element);
		}	
		if (element.y < 0) {
			element.y = element.y + canvas.height;
			Y = element.y;
			drawBody(index, element);
		} else if (element.y > canvas.height - Size) {
			element.y = element.y - canvas.height;
			Y = element.y;
			drawBody(index, element);
		}
		
		$.each(Basket, function (index2, element2) {
			if (element.x == element2.x && element.y == element2.y) {
				Basket[index2] = new getFruits();
			}
			context.drawImage(Pic, element2.x, element2.y, Size, Size);
			if (element.x == element2.x && element.y == element2.y) {
				Fruits += 1;
				Basket[index2] = new getFruits();
				Snake.push(new getSnakeBody());
			}
		});
	});
}

function getSweeties() {
	if (Basket.length < MaxFruits) {
		Basket.push(new getFruits());
	}
}

function getSnakeBody() {
	this.x = X;
	this.y = Y;
}

function getFruits() {
	this.x = getRandom(0, (canvas.width-Size)/Size)*Size;
	this.y = getRandom(0, (canvas.height-Size)/Size)*Size;
}

function getRandom(min,max) {
	return Math.floor(Math.random()*(max+1-min)+min);
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
	
	if (Fruits == 50) {
		clearInterval(play);
		$('.win__text__fruits-bonus .value').text(CurrentScore);
		$('.win__text__level-bonus .value').text(levelBonus);
		$('.win__text__score .value').text(Score);
		$('.win__text__total-score .value').text(Score);
		$('#score').text('Score: ' + Score);
		$('.win-game').css('display', 'block');
		recordResult();
	} else if (Fruits >= NeedFruits) {
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

function getNecessarylevel(Level) {
	Basket = [];
	MaxFruits = Level;
	Fruits = 0;
	NeedFruits = Level*5;
	CurrentScore = 0;
	Speed = 275 - Level*25;
	continueGame();
}

function continueGame() {
	play = setInterval(drawSnake, Speed);
	setInterval(getSweeties, 1000);
}

function fillName() {
	$('#user-name').text(UserName);
}

function startNewGame() {
	location.reload();
}

function getResume() {
	if ($('#pause').css('background-color') == 'rgb(255, 0, 0)') {
		$('#pause').css('background-color', '#000066');
	}
	$('.pause').css('display', 'none');
	$('.die').css('display', 'none');
	continueGame();
}

function showHighScore() {
	clearInterval(play);
	$('#records').css('background-color', '#FF0000');
	$('.high-score').css('display', 'block');
	if (localStorage.length == 0) {
		HighScore.sort(function(a, b) {
 			return b.points - a.points
		});
	} else {
		HighScore = JSON.parse(localStorage.getItem('result'));
		HighScore.sort(function(a, b) {
 			return b.points - a.points
		});
	}
	localStorage.setItem('result', JSON.stringify(HighScore));
	$('.high-score__content__row__result').each(function(index, element) {
		$(element).find('div').each(function(index2, element2) {
			switch (index2) {
				case 0:
					$(element2).text(HighScore[index].name);
					break;
				case 1:
					$(element2).text(HighScore[index].points);
					break;
			}
		});
	});
}

function recordResult() {
	$('.high-score').css('display', 'block');
	if (localStorage.length == 0) {
		HighScore.push({'name': UserName, 'points': Score});
		HighScore.sort(function(a, b) {
 			return b.points - a.points
		});
	} else {
		HighScore = JSON.parse(localStorage.getItem('result'));
		HighScore.push({'name': UserName, 'points': Score});
		HighScore.sort(function(a, b) {
 			return b.points - a.points
		});
	}
	localStorage.setItem('result', JSON.stringify(HighScore));
	$('.high-score__content__row__result').each(function(index, element) {
		$(element).find('div').each(function(index2, element2) {
			switch (index2) {
				case 0:
					$(element2).text(HighScore[index].name);
					break;
				case 1:
					$(element2).text(HighScore[index].points);
					break;
			}
		});
	});
}