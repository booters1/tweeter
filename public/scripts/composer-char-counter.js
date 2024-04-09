//reference: https://stackoverflow.com/a/7934560
$(document).ready(function() {
  function updateCounter() {
    //retrieve length of ea line

    var inputLength = $(this).val().length;
    var remainingChars = 140 - inputLength;
    var counter = $(this).closest('form').find('.counter');
    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.addClass("over-limit");
    } else {
      counter.removeClass("over-limit");
    }
  }


  $(".new-tweet textarea").on("input", updateCounter);


  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    var textarea = $(this).find("textarea");
    updateCounter.call(textarea);
  });
});