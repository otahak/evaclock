// EvaClock, by Luis Masia
$( document ).ready(function() { //start of page ready function	
// padding numbers
	function pad(number) {   
	     return (number < 10 ? '0' : '') + number   
	}
// clear intervals
function clear() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}	
// zero clock
	function zero() {
		$('.digits').delay(2500).removeClass('danger');	
		$('.date').delay(2500).removeClass('danger');		
		$('.internal').css({'background' : 'none'});
		$('.external').css({'background' : 'url(res/external.png) no-repeat', 'background-size' : '100%'});		
		$('.batt').css({'background' : 'url(res/batt.png) no-repeat', 'background-size' : '100%', 'background-size' : '100%'});
		$('.hour').html(pad(0));
		$('.min').html(pad(0));	
		$('.sec').html(pad(0));
		$('.mil').html(pad(0));			
	}
// active button marker
	function active(div) {
		var html = '<div id="active">&nbsp;</div>';
		if ($('#active').length < 1) {
			$(div).append(html);
		}
		else
		{
			$('#active').remove();
			$(div).append(html);
		}
	}
// clock function
	function clock() {
		$('.internal').css({'background' : 'none'});
		$('.external').css({'background' : 'url(res/external.png) no-repeat', 'background-size' : '100%'});	
		$('.batt').css({'background' : 'url(res/batt.png) no-repeat', 'background-size' : '100%', 'background-size' : '100%'});	
		$('.clock_wrap').css({
			'background'      : 'url(res/bg.png) no-repeat',
			'background-size' : '100%'
		});	
		$('.digits').delay(2500).removeClass('danger');	
		$('.date').delay(2500).removeClass('danger');			
		var date = new Date();    
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var milliseconds = Math.abs(Math.floor(date.getMilliseconds() / 10));
		$('.hour').html(pad(hours));
		$('.min').html(pad(minutes));	
		$('.sec').html(pad(seconds));
		$('.mil').html(pad(milliseconds));	
	}
// countdown function
	function countdown() {
		$('.hour').html(pad(0));
		$('.min').html(pad(4));	
		$('.sec').html(pad(60));
		$('.mil').html(pad(100));
		$('.external').css({'background' : 'none'});
		$('.internal').css({'background' : 'url(res/internal.png) no-repeat', 'background-size' : '100%'});
		$('.batt').css({'background' : 'url(res/batt_g.png) no-repeat', 'background-size' : '100%', 'background-size' : '100%'});
		// min/sec eval
		var minutes = 0;
		var seconds = 0;
		setInterval(function() {
			if (minutes < 5) {
				seconds++;
				if (seconds == 60) {
					minutes++;
					seconds = 0;
				}			
				$('.sec').html(pad(Math.abs(60 - seconds)));
				$('.min').html(pad(Math.abs(4 - minutes)));			
			}
			if (minutes == 4) {
				$('.digits').addClass('danger');
				$('.date').addClass('danger');
				$('.clock_wrap').css({
					'background'      : 'url(res/bgr.png) no-repeat',
					'background-size' : '100%'
				});
				$('.internal').css({'background' : 'url(res/internal_r.png) no-repeat', 'background-size' : '100%'});
				$('.batt').css({'background' : 'url(res/batt_r.png) no-repeat', 'background-size' : '100%', 'background-size' : '100%'});
			}			
		},1000);
		// ms eval
		var milliseconds = 0;
		setInterval(function() {
			if (minutes < 6) {				
				milliseconds++;
				if (milliseconds > 100) {
					milliseconds = 0;
				}
				$('.mil').html(pad(Math.abs(100 - milliseconds)));
			}		
		},10);	
		setTimeout(function() {
				zero();
				$('.digits').fadeToggle(250).fadeToggle(250).fadeToggle(250).fadeToggle(250).fadeToggle(250).fadeToggle(250);				
				$('.digits').delay(2500).removeClass('danger');	
				$('.date').delay(2500).removeClass('danger');
				$('.clock_wrap').css({
					'background'      : 'url(res/bg.png) no-repeat',
					'background-size' : '100%'
				});
				clear();			
		},300000);	
	}
// stopwatch functionality
	var x = 0;
	var thours;
	var tminutes;
	var tseconds;
	var tmilliseconds;
	function race() {
		$('.digits').delay(2500).removeClass('danger');	
		$('.date').delay(2500).removeClass('danger');		
		$('.internal').css({'background' : 'none'});
		$('.external').css({'background' : 'url(res/external.png) no-repeat', 'background-size' : '100%'});
		$('.batt').css({'background' : 'url(res/batt.png) no-repeat', 'background-size' : '100%',	'background-size' : '100%'});

		if (x == 0) {
			// first click
			zero();
			x = 1;
			thours = 0;
			tminutes = 0;
			tseconds = 0;
			tmilliseconds = 0;	
			//time regulators
			setInterval(function() {
				tmilliseconds = tmilliseconds + 10;
				$('.mil').html(pad(Math.abs(tmilliseconds / 10)));
				if (tmilliseconds >= 1000) {
					tmilliseconds = 0;
					tseconds++;
					$('.sec').html(pad(Math.abs(tseconds)));
					if (tseconds >= 60) {
						tseconds = 0;
						tminutes++;
						$('.min').html(pad(Math.abs(tminutes)));
						if (tminutes >= 60) {
							tminutes = 0;
							thours++;
							$('.hour').html(pad(Math.abs(thours)));
						}
					}
				}
			},10);
		}
		else if (x == 1) {
			//second click
			x = 0;
			clear();
		}
	}
// standard clock button listener
	$( document ).on('click', '.btn_clock', function(){	
		x = 0;	
		clear();
		setInterval(function() {clock()}, 1);
	});
// stop button listener	
	$( document ).on('click', '.btn_stop', function(){
		x = 0;
		clear();
		zero();
	});	
// countdown button listener	
	$( document ).on('click', '.btn_start', function(){
		x = 0;
		clear();	
		countdown();
	});
//race button listener
	$( document ).on('click', '.btn_race', function() {
		clear();
		race();
	});	
//active button listener
	$( document ).on('click', '.btn', function() {
		active(this);
	});	
// date function
t = new Date();
var day = t.getDate();
var month = 1 + t.getMonth();
var year = t.getFullYear();
$('.day').html(pad(day));
$('.month').html(pad(month));
$('.year').html(pad(year));
}); //end of page ready function