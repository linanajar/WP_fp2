// Generates player boards
function generatePlayerBoard(board, playerName, playerTiles) {
    for (let i = 1; i <= 9; i++) {
        let button = $("<button></button>");
        button.text(i);
        button.attr("data-player", playerName);
        button.attr("data-tile", i);
        board.append(button);
        playerTiles.push(i); // Assign the tile to the respective player's array
    }
}

function updateGameState() {
    $.getJSON("data/gameState.json", function(gameState) {
        console.log("Updated gameState:", gameState);

        // Extract diceValue and currentPlayer from gameState
        var diceValue1 = gameState.diceValue;
        var currentPlayer = gameState.currentPlayer;

        // Display the data on the page
        $("#diceValue").text("Dice result: " + diceValue1);
        $("#currentPlayer").text("Current Player: " + currentPlayer);


        // Check if it works
        console.log("diceValue:", diceValue1);
        console.log("currentPlayer:", currentPlayer);

        console.log("wel gelukt");
    })
        .fail(function(xhr, status, error) {
            console.error("niet gelukt", error);
            console.error("Error details: " + error);
            console.error("AJAX request failed with status: " + status);
            console.error("Error details: " + JSON.stringify(xhr));
        });
}


function rollDice(rollButton, player1Tiles, player2Tiles) {
    // define important variables
    let submitButton = $("#submit-choice");
    let tileButtons = $(".player-board button");
    let currentPlayer = window.currentPlayer
    var diceResult = $("#diceResult");
    // roll dice
    let diceValue = Math.floor(Math.random() * 11) + 2;
    // show result
    diceResult.text("Dice result: " + diceValue);
    console.log("diceValue:", diceValue);

    // Posts diceValue and currentPlayer to gameState.json to retrieve later
    $.ajax({
        url: "scripts/add_dicevalue_currentplayer.php",
        method: "POST",
        data: {
            diceValue: diceValue,
            currentPlayer: currentPlayer},
        dataType: "text",
        success: function () {
            console.log("gelukt");
            // Get the current
            updateGameState();
            setInterval(updateGameState, 2000)
        },
        error: function (error) {
            console.error("nee", error);
        }
    });
    checkEndGame(tileButtons, diceValue, currentPlayer)
    toggleButtons(rollButton, submitButton);
    allowSelection(currentPlayer, tileButtons);
    submitButton.off().on("click", function () {
        submit(player1Tiles, player2Tiles, tileButtons, currentPlayer, diceValue, rollButton, submitButton)
    });
};

//toggle visibility of roll and hide button
function toggleButtons(rollButton, submitButton) {
    rollButton.toggle();
    submitButton.toggle();
}

// check if game should be ended
function checkEndGame(tileButtons, diceValue, currentPlayer) {
    // Check if sum of open tiles is less than dice value
    openTiles = [];
    tileButtons.each(function () {
        let player = $(this).attr("data-player");
        let tile = parseInt($(this).attr("data-tile"));
        if (player === currentPlayer && !($(this).hasClass("closed"))) {
            openTiles.push(tile);
        }})
    // Check if open tiles sum up to less than dice value and end game if so
    let sumOpen = calculateSum(openTiles)
    if(sumOpen < diceValue) {
        // Redirect to endpage
        window.location.href = "http://localhost:8888/WP23/WP_fp2/endpage.php";
    }
};

function submit(player1Tiles, player2Tiles, tileButtons, currentPlayer1, diceValue, rollButton, submitButton) {
    // find tiles attached to current player
    let currentPlayerTiles = currentPlayer1 === "Player 1" ? player1Tiles : player2Tiles;

    // Find selected tiles
    let selectedTiles = [];
    tileButtons.each(function () {
        let player = $(this).attr("data-player");
        let tile = parseInt($(this).attr("data-tile"));
        // add tiles selected by current player that were not closed to array
        if (player === currentPlayer1 && tile !== -1 && $(this).hasClass("selected")) {
            selectedTiles.push(tile);
            $(this).removeClass("selected");
        }
    });

    // Check if selected tiles sum up to dice value
    sumSelect = calculateSum(selectedTiles)


}

/**
 * A function that adds all values of an array consisting of numbers to each other
 * @param Array, which consists solely of integers
 * @returns integer, the values in the array added up
 */
function calculateSum(Array) {
    let sum = Array.reduce(function (acc, curr) {
        return acc + curr;
    }, 0);
    return sum;
}

function checkIfClose(diceValue, selectedTiles, sumSelect, currentPlayerTiles, tileButtons, currentPlayer1) {
    if (sumSelect === diceValue) {
        // Close selected tiles
        selectedTiles.forEach(function (tile) {
            let index = currentPlayerTiles.indexOf(tile);
            currentPlayerTiles[index] = -1; // Mark the tile as closed
            tileButtons.each(function () {
                let player = $(this).attr("data-player");
                let buttonTile = parseInt($(this).attr("data-tile"));

                if (player === currentPlayer1 && buttonTile === tile) {
                    $(this).prop("disabled", true); // Disable the button to indicate it is closed
                    $(this).addClass("closed"); // Add a CSS class to visually indicate a closed tile
                }
            });
        });
    // update who the current player is
        currentPlayer1 = currentPlayer1 === "Player 1" ? "Player 2" : "Player 1";
        window.currentPlayer = currentPlayer1
        // toggle buttons
        toggleButtons(rollButton, submitButton);
        // show message about whose turn it is
        let messageText = $("#messageText");
        messageText.text(currentPlayer + "'s turn. Select tiles and roll again.");
    } else {
        // Show error message
        window.alert("Selected tiles do not match dice value. Please try again.")
    }
}

function allowSelection (currentPlayer, tileButtons) {
    // Add event listeners to tile buttons
    tileButtons.off('click').on("click", function () {
        // Add event listeners to tile buttons
        let player = $(this).attr("data-player");
        let tile = parseInt($(this).attr("data-tile"));
        // check if current player clicked an unclosed tile
        if (player === currentPlayer && tile !== -1) {
            // Toggle the selection of the tile
            $(this).toggleClass("selected");
        }
    });
}



$(document).ready(function() {
    // generate player boards
    window.currentPlayer = "Player 1";
    let player1Board = $("#player1");
    let player2Board = $("#player2");
    // Arrays to hold the player tiles
    let player1Tiles = [];
    let player2Tiles = [];

    // Generates boards with tiles/buttons
    generatePlayerBoard(player1Board, "Player 1", player1Tiles);
    generatePlayerBoard(player2Board, "Player 2", player2Tiles);

    // when the button to roll is clicked, roll the dice
    let rollButton = $("#rollButton");
    rollButton.on("click", function () {
        rollDice(rollButton, player1Tiles, player2Tiles)
    });

    setInterval(updateGameState, 3000);
});


