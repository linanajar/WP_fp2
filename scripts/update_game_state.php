<?php
//Not being used atm

error_reporting(E_ALL);
ini_set('display_errors', 1);
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['diceValue']) && isset($_GET['currentPlayer'])) {
        $diceValue = $_GET['diceValue'];
        $currentPlayer = $_GET['currentPlayer'];

        $jsonData = file_get_contents('../data/gameState.json');
        $gameState = json_decode($jsonData, true);

        $gameState['diceValue'] = $diceValue;
        $gameState['currentPlayer'] = $currentPlayer;

        $jsonData = json_encode($gameState);
        file_put_contents('../data/gameState.json', $jsonData);


        // Send the updated game state as the response
        header('Content-Type: application/json');
        echo $jsonData;
    } else {
//        header('Content-Type: application/json');
        echo json_encode(array('error' => 'geen diceValue en currentPlayer'));

    }
} else {
    echo 'nope';
}

//Old code
//if ($_SERVER["REQUEST_METHOD"] === "GET") {
////    if (isset($_GET['diceValue'])) {
////        $diceValue = $_GET['diceValue'];
////
////        $jsonData = file_get_contents('../data/gameState.json');
////        $gameState = json_decode($jsonData, true);
////
////        $gameState['diceValue'] = $diceValue;
////        $jsonData = json_encode($gameState);
////        file_put_contents('../data/gameState.json', $jsonData);
////
////        // Send the updated game state as the response
////        header('Content-Type: application/json');
////        echo json_encode($gameState);
//    if (isset($_GET['diceValue'])) {
//        $diceValue = $_GET['diceValue'];
//        echo "Received diceValue: " . $diceValue . "<br>";
//        $jsonData = file_get_contents('../data/gameState.json');
//        $gameState = json_decode($jsonData, true);
//
//        // Send the game state as the response
//        header('Content-Type: application/json');
//        echo json_encode($gameState);
//    } else {
//        echo 'geen dicevalue';
//    }
//} else {
//    echo 'Nope';
//}
