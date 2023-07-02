<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["board"]) && isset($_POST["playerName"])) {
        $board = $_POST["board"];
        $playerName = $_POST["playerName"];

        // create array to store needed values
        $gameState = [
            'board' => $board,
            'playerName' => $playerName
        ];

        // encode the array to json and put the data in gameState.json
        $jsonData = json_encode($gameState);
        file_put_contents('../data/gameState.json', $jsonData);
    } else {
        echo 'values are missing';
    }
}