var rollButton = $("#rollButton");
var diceResult = $("#diceResult");
var messageText = $("#messageText");

rollButton.on("click", function() {
    //
});

var submitButton = $("#submit-choice");
submitButton.on("click", function() {
    //
});

var tileButtons = $(".player-board button");

tileButtons.on("click", function() {
    //
});


var requestData = {
    selectedTiles: selectedTiles,
    diceValue: diceValue
};

$.ajax({
    url: "scripts/ajax_handler.php",
    method: "POST",
    data: requestData,
    success: function(response) {
        //
    },
    error: function(error) {
        console.error("Error updating game state:", error);
        //
    }
});
