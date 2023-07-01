<?php
/* Header */
$active = 'Game';
$navigation = array(
    'active' => $active,
    'items' => array(
        'Home' => 'index.php',
        'Game' => 'gamepage.php'
    )
);
$page_title = 'Shut the box';
include 'tpl/head.php';?>

<head>
    <title>Two-Player Game</title>
    <link rel="stylesheet" type="text/css" href="css/game.css">
    <script src="scripts/game.js"></script>
</head>
<body>

<!--Game-->
<div class="container">
    <h1>Shut the Box - Two-Player Game</h1>
    <div id="player1" class="player-board">
        <h2>Player 1</h2>
        <!-- Player 1's tiles/buttons -->
    </div>
    <div id="player2" class="player-board">
        <h2>Player 2</h2>
        <!-- Player 2's tiles/buttons -->
    </div>
    <div class="submit">
        <button id="submit-choice">Submit</button>
    </div>
    <div class="dice">
        <p id="diceResult">Dice result: </p>
        <button id="rollButton">Roll</button>
    </div>
    <div class="message">
        <p id="messageText"></p>
    </div>
</div>


</body>
<?php
include __DIR__ . '/scripts/add_dicevalue_currentplayer.php';
include __DIR__ . '/scripts/update_game_state.php';
include __DIR__ . '/tpl/footer.php';
?>
