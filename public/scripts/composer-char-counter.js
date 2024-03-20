$(document).ready(function() {
  //reference: https://stackoverflow.com/a/7934560
  // attaching keyup event handeler 
  $(".new-tweet textarea").on("keyup", function() {
    //retrieve length of ea line
      var inputLength = $(this).val().length;
      var remainingChars = 140 - inputLength;
      // updates counter after subtracting
      $(".counter").text(remainingChars);


      if (remainingChars < 0) {
          $(".counter").addClass("over-limit");
      } else {
          $(".counter").removeClass("over-limit");
      }
  });
});