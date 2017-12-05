

$(function(){
    $("#result").typed({
        strings: ["Here are some results I found... I hope I helped!", "Feel free to do a new search :)"],
        // strings: ["Hello, I'm Woku :)"],
        // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
        stringsElement: null,
        // typing speed
        typeSpeed: 35,
        // time before typing starts
        startDelay: 1200,
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

$("#newsearch").click(function(){
    document.location.href= history.back();
    // history.back();
});

