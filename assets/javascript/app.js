var question_number = 0;
var questions=[
	'Question 1?',
	'Question 2?'
	];
var options=[
	['1 Option1','1 Option2','1 Option3','1 Option4'],
	['2 Option1','2 Option2','2 Option3','2 Option4']
	];
var images=[
	'minions.gif',
	'giphy.gif'
	];
var correct_answers=[
	0,
	0,
	];
var counter;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer = {
	time:30,
	reset: function(){
		timer.time = 30;
		$('#timer').html('Time remaining: ' + timer.time);
		timer.start();
	},
	start: function(){
		counter = setInterval(timer.count,1000);
	},
	stop: function(){
		clearInterval(counter);
	},
	count: function(){
		timer.time--;
		$('#timer').html('Time remaining: ' + timer.time);

		if(timer.time == 0){
			timer.stop();
			outOfTime();
		}
	}
};

function nextQuestion(){
	timer.reset();

	$('#larger-text').html(questions[question_number]);
	$('#smaller-text').hide();
	$('#gif').hide();
	$('#option1').html(options[question_number][0]);
	$('#option1').show();
	$('#option2').html(options[question_number][1]);
	$('#option2').show();
	$('#option3').html(options[question_number][2]);
	$('#option3').show();
	$('#option4').html(options[question_number][3]);
	$('#option4').show();
	$('#start').hide();
}
function incorrectResponse(){
	timer.stop();

	$('#larger-text').html('Nope!');
	$('#smaller-text').html('The correct answer was: ' + options[question_number][correct_answers[question_number]]);
	$('#smaller-text').show();
	$('#gif').html('<img src="assets/images/' + question_number + '.gif">');
	$('#gif').show();
	$('#option1').hide();
	$('#option2').hide();
	$('#option3').hide();
	$('#option4').hide();

	question_number++;
	incorrect++;

	if(question_number == questions.length)
		setTimeout(endGame,5000);
	else
		setTimeout(nextQuestion,5000);
}
function correctResponse(){
	timer.stop();

	$('#larger-text').html('Correct!');
	$('#gif').html('<img src="assets/images/' + question_number + '.gif">');
	$('#gif').show();
	$('#option1').hide();
	$('#option2').hide();
	$('#option3').hide();
	$('#option4').hide();

	question_number++;
	correct++;

	if(question_number == questions.length)
		setTimeout(endGame,5000);
	else
		setTimeout(nextQuestion,5000);
}
function outOfTime(){
	timer.stop();

	$('#larger-text').html('Out of time!');
	$('#smaller-text').html('The correct answer was: ' + options[question_number][correct_answers[question_number]]);
	$('#smaller-text').show();
	$('#gif').html('<img src="assets/images/' + question_number + '.gif">');
	$('#gif').show();
	$('#option1').hide();
	$('#option2').hide();
	$('#option3').hide();
	$('#option4').hide();

	question_number++;
	unanswered++;

	if(question_number == questions.length)
		setTimeout(endGame,5000);
	else
		setTimeout(nextQuestion,5000);
}
function endGame(){
	timer.stop();

	$('#larger-text').html('All done, here\'s how you did!');
	$('#smaller-text').html('Correct answers: ' + correct
		+ '<br>Incorrect answers: ' + incorrect
		+ '<br>Unanswered: ' + unanswered);
	$('#gif').hide();
	$('#option1').hide();
	$('#option2').hide();
	$('#option3').hide();
	$('#option4').hide();
	$('#start').html('Start Over?');
	$('#start').show();
}

// Initial display
$('#option1').hide();
$('#option2').hide();
$('#option3').hide();
$('#option4').hide();
$('#start').html('Start');

// Start game
$('#start').on('click',function(){
	question_number = 0;
	correct = 0;
	incorrect = 0;
	unanswered = 0;

	nextQuestion();
});

// User answers question
$('.option').on('click',function(){
	if(this.value == correct_answers[question_number])
		correctResponse();
	else
		incorrectResponse();
});