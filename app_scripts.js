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