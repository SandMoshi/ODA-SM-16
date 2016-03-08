 function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

//Sizing -- This will make the content height be the perfect size to fill between the header and footer

//$(function(){
$( document ).ready(function() {
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
   $(".facebox").fadeOut("slow", function(){
				  $("#qotd").fadeIn("slow", function(){
						});
			});
});


//-------------------------------------------------------------//
//                                                             //
// This is the scirpt that will get the facts and display them //
//                                                             //
//-------------------------------------------------------------//
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }


function onDeviceReady() { //Do something when the app on device is loaded
	
		var tempd = new Date(); //Get today's date
		//Checks if localstorage had 'DateOpened' already stored
	
	 // Note that by adding strings in there, we end up with a string instead of adding.
		// Note the order: Year first, then month, then day.
		// Also, since we display it, we put separators in and add 1 to month (since Jan = 0).
		var str = tempd.getFullYear() + "-" + (tempd.getMonth() + 1) + "-" + tempd.getDate();
	    console.log("Today's date: " + str);
	
		var localVal = localStorage.getItem('DateOpened'); 
     console.log("Previous localVal: " + localVal);
	
//If stored date is older than this date do something:	
if(localVal  == null || localVal.localeCompare(str) < 0){  
    // If the localstorage doesn't exist, nothing happens
	   console.log("App will now run once for today.")

        //Run the JS for the app (give new quote since it is a new day)
	
								var Quotes = [];
								var ID = [];
								var Tag = [];
								var seen = [];
										//Get quotes from JSON file
										$.ajax({
															url: 'json/facts.json',
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
																					seen[i] = data[i][3];
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
												ChooseQuote(0,totalQ);

												//Change the image depending on the quote

												//replace the quote with a new one
								$("#nextQ").click(function(){ 
												$("#qotd").html(Quote);
												$(".facebox").css("background-image",CurrentImage);
												console.log("Image Changed");
								});
												//================
											function ChooseQuote(min,max){
													var RandomNum = Math.floor(Math.random()*(max-min+1)+min);
													Quote = Quotes[RandomNum];
													var ImageNum = Math.floor(Math.random()*(5-1+1)+1);
													CurrentImage = "url(../images/FaceBoxes/" + Tag[RandomNum] + "/" + Tag[RandomNum] + ImageNum + ".png)"; 
													if (seen[RandomNum] == true ) {
														ChooseQuote(0,totalQ);
															}
													seen[RandomNum] = true;
													console.log(Quote);
													console.log(CurrentImage);
												
												 //Remeber which fact is displayed
												 localStorage.setItem('Curr_Fact', Quote);
												 localStorage.setItem('Curr_ImgUrl', CurrentImage);

													}
									//==================
								});
								//Save the current date in local storage
        localStorage.setItem('DateOpened',str);
							 console.log("The App Ran, you can get a new fact tomorrow");
								console.log("Current LocalStorage Date: " + str);
		}
	 else {
			//If it is still the same day, show the last fact & image
			$("#nextQ").click(function(){ 
			 var Quote = localStorage.getItem('Curr_Fact');
			 var CurrentImage = localStorage.getItem('Curr_ImgUrl');
						$(".facebox").css("background-image",CurrentImage);
						$("#qotd").html(Quote);
						console.log("Showing the same fact as before. Wait until tomorrow to get a new fact.");
			});
		}
}


