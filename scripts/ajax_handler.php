<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['diceValue'])) {
        $diceValue = $_POST['diceValue'];

//    $diceValue = $_POST["diceValue"];

    $json_data = json_encode(["diceValue" => $diceValue]);

    file_put_contents('../data/gameState.json', $json_data);
    } else {
        echo 'diceValue is missing';
    }
} else {
    echo 'NOpe';
}

