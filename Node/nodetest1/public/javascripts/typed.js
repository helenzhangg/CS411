

$(function(){
	$("#start").typed({
		strings: ["Hello, I'm Woku :)", "I can help you explore places.", "Just put in your budget, location, and activity to start!", "Try me out :)"],
        // strings: ["Hello, I'm Woku :)"],
		// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
		stringsElement: null,
		// typing speed
		typeSpeed: 35,
		// time before typing starts
		startDelay: 1600,
		// backspacing speed
		backSpeed: 5,
		// time before backspacing
		backDelay: 1200,
		// loop
		loop: true,
		// false = infinite
		loopCount: 1,
		// show cursor
		showCursor: true,
		// character for cursor
		cursorChar: "|",
		// attribute to type (null == text)
		attr: null,
		// either html or text
		contentType: 'html',
		// call when done callback function
		callback: function() {},
		// starting callback function before each string
		preStringTyped: function() {},
		//callback for every typed string
		onStringTyped: function() {},
		// callback for reset
		resetCallback: function() {}
	});
});


// for the lets go button UNCOMMENT LATER

// $(document).ready(function() {
//     $("#location").hide();
//     $("#budgets").hide();
//     $("#activity").hide();
//     $('#go').hide().delay(20000).fadeIn(2200);
//     $("#go").click(function(){
//         $("#location").fadeIn("slow",function(){});
//         $("#budgets").fadeIn("slow",function(){});
//         $("#activity").fadeIn("slow",function(){});
//     });
// });



//
// br
// button.button#go
// span Let's Go!
