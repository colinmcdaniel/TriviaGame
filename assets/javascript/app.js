var question_number = 0;
var questions=[
	'(1/10) Which director cast Bill Murray in more than seven films?',
	'(2/10) Which of these films starring Woody Allen did he NOT direct?',
	'(3/10) Which director was temporarily banned from the Cannes Film Festival?',
	'(4/10) Who is known for his surrealist films such as "Blue Velvet" and "Mulholland Drive"?',
	'(5/10) Which movie did Stanley Kubrick NOT direct?',
	'(6/10) What movie was Charlie Kaufman\'s directorial debut?',
	'(7/10) What do Alfred Hitchcock and M. Night Shyamalan have in common?',
	'(8/10) Who is the richest film director of all time?',
	'(9/10) Which actor has also directed several critically acclaimed films?',
	'(10/10) Which movie took 12 years to film?'
	];
var options=[
	['Francis Ford Coppola','Jim Jarmusch','Paul Thomas Anderson','Wes Anderson'],
	['Annie Hall','Crimes and Misdemeanors','Manhattan','Play It Again, Sam'],
	['Lars von Trier','Peter Jackson','Quentin Tarantino','Spike Lee'],
	['David Fincher','David Lynch','Ingmar Bergman','Roman Polanski'],
	['2001: A Space Odyssey','A.I. Artificial Intelligence','Eyes Wide Shut','The Shining'],
	['Adaptation','Being John Malkovich','Eternal Sunshine of the Spotless Mind','Synecdoche, New York'],
	['Both have the same birthday','Both regularly appeared in their own films','Both were inspired by Sofia Coppola','None of the above'],
	['George Lucas','Martin Scorsese','Michael Bay','Steven Spielberg'],
	['Brad Pitt','Johnny Depp','Leonardo DiCaprio','Sean Penn'],
	['Christopher Nolan\'s "Interstellar"','James Cameron\'s "Avatar"','Richard Linklater\'s "Boyhood"','Steve McQueen\'s "12 Years a Slave']
	];
var correct_answers=[
	3,
	3,
	0,
	1,
	1,
	3,
	1,
	0,
	3,
	2
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
		setTimeout(endGame,6000);
	else
		setTimeout(nextQuestion,6000);
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
		setTimeout(endGame,6000);
	else
		setTimeout(nextQuestion,6000);
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
		setTimeout(endGame,6000);
	else
		setTimeout(nextQuestion,6000);
}
function endGame(){
	timer.stop();

	$('#larger-text').html('All done, here\'s how you did!');
	$('#smaller-text').html('Correct answers: ' + correct
		+ '<br>Incorrect answers: ' + incorrect
		+ '<br>Unanswered: ' + unanswered);
	$('#smaller-text').show();
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