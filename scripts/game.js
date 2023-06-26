$(document).ready(function() {
    let rollButton = $("#rollButton");
    let diceResult = $("#diceResult");
    let diceValue;

    function rollDice() {
        diceValue = Math.floor(Math.random() * 11) + 2;
        diceResult.text("Dice result: " + diceValue);

        $.ajax({
            url: "ajax_handler.php",
            method: "POST",
            data: {diceValue: diceValue.toString()},
            dataType: "text",
            success: function(response) {
                console.log("gelukt");
            },
            error: function(error) {
                console.error("nee", error);
            }
        });
    }

    rollButton.on("click", rollDice);
});




