// global variables

// global functions 

// when the user scrolls down the button displays
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// =============================================================================================
// main app logic
// =============================================================================================

$(document).ready(function(){
    $('.parallax').parallax();

    
    window.onscroll = function() {scrollFunction()};
    $(document.body).on("click", "#myBtn", function(){
      topFunction();
    });
  });
        