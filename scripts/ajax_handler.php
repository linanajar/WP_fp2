<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $diceValue = $_POST["diceValue"];

    $json_data = json_encode(["diceValue" => $diceValue]);

    file_put_contents('../data/gameState.json', $json_data);

} else {
    echo('NOPE');

}

