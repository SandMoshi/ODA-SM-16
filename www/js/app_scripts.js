var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: 	$("#nextQ").click(function(){ 
        
		var tempd = new Date(); //Get today's date
		//Checks if localstorage had 'DateOpened' already stored
	
	 // Note that by adding strings in there, we end up with a string instead of adding.
		// Note the order: Year first, then month, then day.
		// Also, since we display it, we put separators in and add 1 to month (since Jan = 0).
		var str = tempd.getFullYear() + "-" + (tempd.getMonth() + 1) + "-" + tempd.getDate();
	    console.log("Today's date: " + str);
	
		var localVal = localStorage.getItem('DateOpened'); 
        console.log("Previous localVal: " + localVal);
		
        if(localVal != null){
			var difference = localVal.localeCompare(str);
		}
			console.log("localeCompare: " + difference);
		//If stored date is older than this date do something:	
		if(localVal  == null || difference < 0){  
						// If the localstorage doesn't exist, nothing happens
						console.log("App will now run once for today.")

        //Run the JS for the app (give new quote since it is a new day)
	
								var Quotes = [];
								var ID = [];
								var Tag = [];
										//Get quotes from JSON file
										$.ajax({
															url: './json/facts.json',
															dataType: 'json',
															type: 'get',
															success: function(data){
																	console.log(data);
																	console.log("successfully imported the JSON file");
																	console.log(data.length); //Returns 64
																	totalQ = data.length; 
																	for (i = 0; i < totalQ; i++){
																					ID[i] = data[i][0];
																					Tag[i] = data[i][1];
																					Quotes[i] = data[i][2];
																	}
																console.log(Quotes.length);
													}
										})
										.done(function(data){ //This waits for AJAX to be done before running

												var Quote = new String;
												var qnumber = 0;
												var totalQ //The total number of available quotes to choose from
												var Qrem //Remaining unseen quotes
												var lock = new Boolean; //This will be true if the quote is already seen
												var CurrentImage = String;
											
												totalQ = Quotes.length - 1;
												console.log("TotalQ = " + totalQ);
											
												//Get list of which facts have already been seen
												var seen = localStorage.getItem('seen');
											 console.log("var seen = " + seen);
													if (seen == null){
															var seen = new Array(totalQ);
														 console.log("var seen = " + seen);
													}
											
											 //Get a Quote
												ChooseQuote(0,totalQ);

												//Change the image depending on the quote

												//replace the quote with a new one
                                                $("#qotd:visible").hide();
												$("#ShineDiv").addClass("shine");
												$(".facebox").css("background-image",CurrentImage);
												$(".facebox").css("opacity","1.0");
												$("#qotd").html(Quote);
												console.log("Image Changed");
											    
                                                increaseXP();
												//================
											function ChooseQuote(min,max){
												 //Choose 2 random numbers, one for quotes one for image
													var RandomNum = Math.floor(Math.random()*(max-min+1)+min);
													var ImageNum = Math.floor(Math.random()*(5-1+1)+1);
												 
													Quote = Quotes[RandomNum];
													CurrentImage = "url(./images/FaceBoxes/" + Tag[RandomNum] + "/" + Tag[RandomNum] + ImageNum + ".png)"; 
													if (seen[RandomNum] == true ) {
														//Choose new quote
														ChooseQuote(0,totalQ);
														console.log("This quote seen before? = " + seen[RandomNum] );
														var numOfTrue = 0;
																		for(var i=0; i<totalQ; i++){
																						if(seen[i] === "true")
																									numOfTrue++;
																		}
														    if (numOfTrue = totalQ) {
																			 localStorage.setItem('All_Facts_Seen:', true);
																			 console.log("All the Facts have been seen. Resetting Facts.");
																			 seen = new Array(totalQ); //Empty the seen Array
																			 localStorage.setItem('seen', seen); //Save the empty Array
																		}
															}
												 else { 
														seen[RandomNum] = true;
														console.log("This fact has never been seen.")
													}
													console.log(Quote);
													console.log(CurrentImage);
												
												 //Remeber which fact is displayed
												 localStorage.setItem('Curr_Fact', Quote);
												 localStorage.setItem('Curr_ImgUrl', CurrentImage);
												 localStorage.setItem('seen', seen);
													}
									//==================
								//Save the current date in local storage
        localStorage.setItem('DateOpened',str);
							 console.log("The App Ran, you can get a new fact tomorrow");
								console.log("Current LocalStorage Date: " + str);
								});
		}
	 else {
			//If it is still the same day, show the last fact & image
			 var Quote = localStorage.getItem('Curr_Fact');
			 var CurrentImage = localStorage.getItem('Curr_ImgUrl');
			
			   $("#qotd:visible").hide(); //Hide main quote
			   $("#ShineDiv2").addClass("shine");
						if ($('h2').hasClass("invisible")){ //if heading is invisble show it, remove that class
							$('h2').css('visibility','visible').hide().fadeIn('slow').removeClass("invisible");
						}
						$(".facebox").css("background-image",CurrentImage); 
			   setTimeout( function() { //This is so that the first image and new image don't crossfade/stretch
								$(".facebox").css("opacity","1.0");
								}, 100);
			    
						$("#qotd").html(Quote); //Replace the main message with the actual quote
			
						console.log("Showing the same fact as before. Wait until tomorrow to get a new fact.");
		}
	}),
}; 


$(window).load(function() {
var headerh;
var footerh;
var pageh;
var hbtn_nextq;

headerh = $("div[data-role='header']").outerHeight();
footerh = $("div[data-role='footer']").outerHeight();
pageh = $(window).height();
	
console.log(headerh + " " + footerh + " " + pageh);
	
var difference = pageh - headerh - footerh;
	
$(".ui-content").css("height", difference);
	
var h1, h2, h3, h4 , h5;
	
h1 = $(".ui-content").outerHeight();
h2 = $(".ui-content>h2").outerHeight();
h3 = $("#quotebox").outerHeight(true);
h4 = $("#nextQ").outerHeight();

h5 = ((h1 - h2 - h3 - h4) /2) - 50;
	console.log(h1);
 console.log(h2);
 console.log(h3);
	console.log(h4);
 console.log(h5);
	
 var h5s = h5 + "px";

//$("#quotebox").css("margin-top",h5s);
$(".ui-content>h2").css("margin-top",h5s);
//$("#nextQ").css("margin-bottom",h5s);
	
//ShowXP();
//Make the quotebox flip over on click
$(".facebox, #ShineDiv").click(function(){
	$("#quotebox").removeClass("PulseEffect")
	$("#ShineDiv").removeClass("shine");
	$(".facebox").css("opacity","0");
	$("#qotd").fadeIn("slow", function(){});
});
  

ShowXP();    

});


function increaseXP(){
    //Get the lvl and xp from storage
    var lvl = localStorage.getItem("lvl", lvl);
    var XP = localStorage.getItem("XP", XP);
    console.log("XP = " + XP + "  Level = " + lvl);
    
    lvl = parseInt(lvl);
    XP = parseInt(XP);
    
    //Increase XP
    XP = XP + 25;
    
    //Increase lvl
    if (XP >= 100){
      lvl = lvl + 1;
      localStorage.setItem('XP',XP);
      localStorage.setItem('lvl',lvl);
      
      UpdateXP(XP);
        setTimeout(function() {
      ShowUP(lvl);
        }, 200);
      XP = XP - 100;
      UpdateXP(XP);
    }
    
    localStorage.setItem('XP',XP);
    localStorage.setItem('lvl',lvl);
    UpdateXP(XP);
    
}

function ShowXP(){
    var XP = localStorage.getItem("XP");
    var lvl = localStorage.getItem("lvl");
    

    if (XP == null){
        XP = 0;
        localStorage.setItem("XP", XP);
    }
    if (lvl == null){
        lvl = 1;
        localStorage.setItem("lvl",lvl);
    }
    
    lvl = parseInt(lvl);
    XP = parseInt(XP);
    
    $("#lvl").text(lvl);

    $(".XPmeter > span#bar").each(function() {
      $(this)
        .data("origWidth", XP)
        .width(0)
        .animate({
          width: $(this).data("origWidth") + "%" // or + "%" if fluid
        }, 1200);
    });

}

function UpdateXP(XP){
    $(".XPmeter > span#bar").each(function() {
      $(this)
        .animate({
          width: XP + "%" // or + "%" if fluid
        }, 1200);
    });
}

function ShowUP(new_level){
    $("#medal").animate({height: "100px" },600, function(){
        $("#lvl").text(new_level);
        $("#medal").animate({height: "50px" },600);
    });
    
    $(".XPmeter > span#bar").width("0");
}

//-------------------------------------------------------------//
//                                                             //
// This is the scirpt that will get the facts and display them //
//                                                             //
//-------------------------------------------------------------//														


