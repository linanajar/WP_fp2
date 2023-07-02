<?php
//posts the diceValue and currentPlayer on gameState.json
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['diceValue']) && isset($_POST['currentPlayer'])) {
        $diceValue = $_POST['diceValue'];
        $currentPlayer = $_POST['currentPlayer'];

        // create array to store needed values
        $gameState = [
            'diceValue' => $diceValue,
            'currentPlayer' => $currentPlayer
        ];

        // encode the array to json and put the data in gameState.json
        $jsonData = json_encode($gameState);
        file_put_contents('../data/gameState.json', $jsonData);
    } else {
        echo 'values are missing';
    }
}
