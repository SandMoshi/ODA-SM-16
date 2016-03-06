//Sizing -- This will make the content height be the perfect size to fill between the header and footer
$(function(){
var headerh;
var footerh;
var pageh;
var pageh2;

headerh = $("div[data-role='header']").height();
footerh = $("div[data-role='footer']").height();
pageh = $(window).height();
	
console.log(headerh + " " + footerh + " " + pageh + " " + pageh2 );
	
var difference = pageh - headerh - footerh - 35;
	
$(".ui-content").css("height", difference);
	
var h1, h2, h3, h4;
	
h1 = $(".ui-content").height();
h2 = $(".ui-content>h2").height();
h3 = $("#quotebox").height();

h4 = (h1 - h2 - h3)/2;
	 console.log(h1);
 console.log(h2);
 console.log(h3);
 console.log(h4);
var h4s = h4 + "px";

$("#quotebox").css("margin-top",h4s);
	
});

//Make the quotebox flip over on click
$(".facebox").click(function(){
   $(this).fadeOut("slow", function(){
				  $("#qotd").fadeIn("slow", function(){
						})
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

function onDeviceReady() {
	var Quotes = [];
	var ID = [];
	var Tag = [];
	var seen = [];
   //Get quotes from JSON file
	  $.ajax({
								url: '../facts.json',
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
//					$("#nextQ").click(function(){ 
	   
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
					$("#qotd").html(Quote);
					$(".facebox").css("background-image",CurrentImage);
     console.log("Image Changed");
					//================
				function ChooseQuote(min,max){
						var RandomNum = Math.floor(Math.random()*(max-min+1)+min);
						Quote = Quotes[RandomNum];
						var ImageNum = Math.floor(Math.random()*(5-1+1)+1);
						CurrentImage = "url(./images/FaceBoxes/" + Tag[RandomNum] + "/" + Tag[RandomNum] + ImageNum + ".png)"; 
						if (seen[RandomNum] == true ) {
							ChooseQuote(0,totalQ);
								}
						seen[RandomNum] = true;
						console.log(Quote);
						console.log(CurrentImage);

						}
	//==================
	});
}



