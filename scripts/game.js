// Generates player boards
function generatePlayerBoard(board, playerName, playerTiles) {
    for (var i = 1; i <= 9; i++) {
        var button = $("<button></button>");
        button.text(i);
        button.attr("data-player", playerName);
        button.attr("data-tile", i);
        board.append(button);
        playerTiles.push(i); // Assign the tile to the respective player's array
    }
};

function rollDice(tileButtons, currentPlayer, diceResult) {
    diceValue = Math.floor(Math.random() * 11) + 2;
    diceResult.text("Dice result: " + diceValue);

    console.log("diceValue:", diceValue);

    $.ajax({
        url: "scripts/ajax.handler.php",
        method: "POST",
        data: {diceValue: diceValue.toString()},
        dataType: "text",
        success: function () {
            console.log("gelukt");
        },
        error: function (error) {
            console.error("nee", error);
        }
    });
    checkEndGame(tileButtons, diceValue, currentPlayer)
};

// check if game should be ended
function checkEndGame(tileButtons, diceValue, currentPlayer) {
    // Check if sum of open tiles is less than dice value
    openTiles = [];
    tileButtons.each(function () {
        var player = $(this).attr("data-player");
        var tile = parseInt($(this).attr("data-tile"));
        if (player === currentPlayer && !($(this).hasClass("selected"))) {
            openTiles.push(tile);
        }})
    // Check if open tiles sum up to more than dice value
    var sum = openTiles.reduce(function (acc, curr) {
        return acc + curr;
    }, 0);
    if(sum < diceValue) {
        window.location.href = "http://localhost:8888/WP23/WP_fp2/endpage.php";
        return;
    }
};


$(document).ready(function() {
    let rollButton = $("#rollButton");
    var tileButtons = $(".player-board button");
    let diceValue;
    var player1Board = $("#player1");
    var player2Board = $("#player2");
    // Arrays to hold the player tiles
    var player1Tiles = [];
    var player2Tiles = [];

    // Generates boards with tiles/buttons
    generatePlayerBoard(player1Board, "Player 1", player1Tiles);
    generatePlayerBoard(player2Board, "Player 2", player2Tiles);

    rollButton.on("click", rollDice(tileButtons, currentPlayer));
    let diceResult = $("#diceResult");

    var messageText = $("#messageText");

    var currentPlayer = "Player 1";

    // Add event listeners to tile buttons
    tileButtons.on("click", function () {
        var player = $(this).attr("data-player");
        var tile = parseInt($(this).attr("data-tile"));

        if (player === currentPlayer && tile !== -1) {
            // Toggle the selection of the tile
            $(this).toggleClass("selected");
        }
    });


    var submitButton = $("#submit-choice");
    submitButton.on("click", function () {
        var currentPlayerTiles = currentPlayer === "Player 1" ? player1Tiles : player2Tiles;

        // Find selected tiles
        var selectedTiles = [];
        tileButtons.each(function () {
            var player = $(this).attr("data-player");
            var tile = parseInt($(this).attr("data-tile"));

            if (player === currentPlayer && tile !== -1 && $(this).hasClass("selected")) {
                selectedTiles.push(tile);
                $(this).removeClass("selected");
            }
        });
        console.log(selectedTiles)

        var requestData = {
            selectedTiles: selectedTiles,
            diceValue: diceValue
        };

        $.ajax({
            url: "scripts/ajax.handler.php",
            method: "POST",
            data: requestData,
            success: function (response) {
                // Handle the response from the server
                //console.log(requestData);
                // ...
            },
            error: function (error) {
                console.error("Error updating game state:", error);
                // ...
            }
        });

        // Check if selected tiles sum up to dice value
        var sum = selectedTiles.reduce(function (acc, curr) {
            return acc + curr;
        }, 0);

        if (sum === diceValue) {
            // Close selected tiles
            selectedTiles.forEach(function (tile) {
                var index = currentPlayerTiles.indexOf(tile);
                currentPlayerTiles[index] = -1; // Mark the tile as closed
                tileButtons.each(function () {
                    var player = $(this).attr("data-player");
                    var buttonTile = parseInt($(this).attr("data-tile"));

                    if (player === currentPlayer && buttonTile === tile) {
                        $(this).prop("disabled", true); // Disable the button to indicate it is closed
                        $(this).addClass("closed"); // Add a CSS class to visually indicate a closed tile
                    }
                });
            });
        }

            // Switch to next player
            currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
            messageText.text(currentPlayer + "'s turn. Select tiles and roll again.");
        });
    });


