window.onload = bindEventHandlers;
var X = 600;
var Y = 300;
var Size = 20;
var Speed = 20;
var SpeedX = -Speed;
var SpeedY = 0;
var PreviousX = 600;
var PreviousY = 300;
var Snake = [{x:600, y:300}];
var Basket = [];
var FruitsVolume = 3;

function bindEventHandlers() {
	window.canvas = document.getElementById('grass');
	window.context = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 500;
	context.fillStyle = 'red';
	
	window.move = setInterval(drawSnake, 200);
	setInterval(getSweeties, 100);

	$(document).keydown(function(event) {
		switch(event.keyCode) {
			case 37:
				if (SpeedX != Speed) {
					SpeedX = -Speed;
					SpeedY = 0;
				}
				break;
			case 38:
				if (SpeedY != Speed) {
					SpeedX = 0;
					SpeedY = -Speed;
				}
				break;
			case 39:
				if (SpeedX != -Speed) {
					SpeedX = Speed;
					SpeedY = 0;
				}
				break;
			case 40:
				if (SpeedY != -Speed) {
					SpeedX = 0;
					SpeedY = Speed;
				}
		}
	});
}

function Body() {
	this.x = X;
	this.y = Y;
}

function Fruits() {
	this.x = getRandom(0, (canvas.width-Size)/Size)*Size;
	this.y = getRandom(0, (canvas.height-Size)/Size)*Size;
}

function drawSnake() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	X += SpeedX;
	Y += SpeedY;
	Snake.pop();
	Snake.unshift(new Body());
	$.each(Snake, function drawBody(index, element) {
		context.fillStyle = 'red';
		context.fillRect(element.x, element.y, Size, Size);
		context.strokeRect(element.x, element.y, Size, Size);
		if (element.x < 0) {
			element.x = element.x + 800;
			drawBody(index, element);
		} else if (element.x > 800 - Size) {
			element.x = element.x - 800;
			drawBody(index, element);
		}	
		if (element.y < 0) {
			element.y = element.y + 500;
			drawBody(index, element);
		} else if (element.y > 500 - Size) {
			element.y = element.y - 500;
			drawBody(index, element);
		}
		/*for (var i = 1; i < Snake.length; i++) {
			if (Snake[0].x == Snake[i].x && Snake[0].y == Snake[i].y) {
				location.reload();
			}
		}*/
		$.each(Basket, function (index2, element2) {
			context.fillStyle = 'green';
			context.fillRect(element2.x, element2.y, Size, Size);
			if (element.x == element2.x && element.y == element2.y) {
				Basket[index2] = new Fruits();
				Snake.push(new Body);
			}
		});
	});	
}

function getRandom(min,max) {
	return Math.floor(Math.random()*(max+1-min)+min);
}

function getSweeties() {
	if (Basket.length < FruitsVolume) {
		Basket.push(new Fruits());
	}
}