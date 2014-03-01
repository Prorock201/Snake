window.onload = bindEventHandlers;
var X = 600;
var Y = 300;
var R = 20;
var Z = (Math.PI/180)*360;
var SpeedX = -20;
var SpeedY = 0;
var PreviousX = 600;
var PreviousY = 300;

function bindEventHandlers() {
	window.canvas = document.getElementById('grass');
	window.context = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 500;
	
	setInterval(move, 100);

	$(document).keydown(function(event) {
		switch(event.keyCode) {
			case 37:
				SpeedX = -20;
				SpeedY = 0;
				break;
			case 38:
				SpeedX = 0;
				SpeedY = -20;
				break;
			case 39:
				SpeedX = 20;
				SpeedY = 0;
				break;
			case 40:
				SpeedX = 0;
				SpeedY = 20;
		}
	});
}

function move() {
	context.clearRect(PreviousX-R, PreviousY-R, R*2, R*2);
	context.clearRect(X-R, Y-R, R*2, R*2);
	X += SpeedX;
	Y += SpeedY;
	drawBody(X, Y);
	PreviousX = X;
	PreviousY = Y;
	if (X <= 0) {
		X = 800 - X;
		drawBody(X, Y);
	} else if (X >= 800) {
		X = 800 - X;
		drawBody(X, Y);
	}
	if (Y <= 0) {
		Y = 500 - Y;
		drawBody(X, Y);
	} else if (Y >= 500) {
		Y = 500 - Y;
		drawBody(X, Y);
	}
}

function drawBody (X, Y) {
	context.fillStyle = 'red';
	context.beginPath();
	context.arc(X, Y , R, 0, Z);
	context.fill();
}