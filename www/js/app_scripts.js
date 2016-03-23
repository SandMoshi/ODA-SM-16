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
											
												totalQ = Quotes.length;
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
												$(".facebox").css("background-image",CurrentImage);
												$(".facebox").css("opacity","1.0");
												$("#qotd").html(Quote);
												console.log("Image Changed");
											
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
			   $("#qotd:visible").hide();
			   $('h2').css('visibility','visible').hide().fadeIn('slow');
						$(".facebox").css("background-image",CurrentImage);
			   setTimeout( function() {
								$(".facebox").css("opacity","1.0");
						}, 100);
						$("#qotd").html(Quote);
						console.log("Showing the same fact as before. Wait until tomorrow to get a new fact.");
		}
	}),
}; 


$(window).ready(function() {
var headerh;
var footerh;
var pageh;
var hbtn_nextq;

headerh = $("div[data-role='header']").height();
footerh = $("div[data-role='footer']").height();
pageh = $(window).height();
	
console.log(headerh + " " + footerh + " " + pageh);
	
var difference = pageh - headerh - footerh - 35;
	
$(".ui-content").css("height", difference);
	
var h1, h2, h3, h4;
	
h1 = $(".ui-content").height();
h2 = $(".ui-content>h2").height();
h3 = $("#quotebox").height();
hbtn_nextq = $("#nextQ").height();

h4 = (h1 - h2 - h3 - hbtn_nextq - 80) /2;
	console.log(h1);
 console.log(h2);
 console.log(h3);
	console.log(hbtn_nextq);
 console.log(h4);
	
 var h4s = h4 + "px";

$("#quotebox").css("margin-top",h4s);
	
});

//Make the quotebox flip over on click
$(".facebox").click(function(){
	$("#quotebox").removeClass("PulseEffect");
	$(".facebox").css("opacity","0");
	$("#qotd").fadeIn("slow", function(){});
});


//-------------------------------------------------------------//
//                                                             //
// This is the scirpt that will get the facts and display them //
//                                                             //
//-------------------------------------------------------------//														


