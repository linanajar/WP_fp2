<?php
/* Header */
$active = 'Home';
$navigation = array(
    'active' => $active,
    'items' => array(
        'Home' => 'index.php',
        'Game' => 'gamepage.php'
    )
);

$page_title = 'Home';
include 'tpl/head.php';?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Homepage</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>

<div class="container-fluid">
    <div class="container-md">
        <h1 class="text-center mt-5">Welcome to Shut The Box!</h1>
        <form id="usernameForm">
            <label for="username">Enter your username:</label>
            <input type="text" id="username" required>
            <button type="button" id="generateLinkButton">Generate Link</button>
        </form>
        <div id="gameLink" class="text-center mt-4">
            <p>Share this link with a friend to play together:</p>
            <div class="input-group">
                <input type="text" id="linkInput" class="form-control" readonly aria-label="Game URL">
                <div class="input-group-append">
                    <button id="copyButton" class="btn btn-secondary" type="button">Copy</button>
                    <button id="startGameButton" style="...">Start Game</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="scripts/index.js"></script>
</body>
</html>

<?php include __DIR__ . '/tpl/footer.php'?>
