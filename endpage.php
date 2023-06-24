<?php
/* Header */
$active = 'End';
$navigation = array(
    'active' => $active,
    'items' => array(
        'Home' => 'index.php',
        'Game' => 'gamepage.php'
    )
);

$page_title = "End";
include 'tpl/head.php';
?>


<!DOCTYPE html>
<html>
<head>
    <script>
        // Retrieve the winner's username from localStorage
        var winnerUsername = localStorage.getItem('winnerUsername');

        // Set the winner's username in the HTML
        document.getElementById("winnerUsername").textContent = winnerUsername;

        // Clear the winnerUsername from localStorage (optional)
        localStorage.removeItem('winnerUsername');
    </script>
</head>
<body>
<div class="container-fluid">
    <div class="container-md">
        <!--        <img src="media/gameover.png" alt="GAME OVER">-->
        <h1 class="text-center mt-5">Game over</h1>
        <p class="text-center mt-5">You finished the game! The winner is: <span id="winnerUsername"></span>.</p>

        <div class="options text-center mt-5">
            <a href="index.php" class="btn btn-outline-danger">Return to Homepage</a>
            <a href="gamepage.php" class="btn btn-info">Start a New Game</a>
        </div>
    </div>
</div>

<script>
    // Retrieve the winner's username from the URL parameter
    var urlParams = new URLSearchParams(window.location.search);
    var winnerUsername = urlParams.get("winner");

    // Set the winner's username in the HTML
    document.getElementById("winnerUsername").textContent = winnerUsername;
</script>
</body>
</html>

<?php include __DIR__ . '/tpl/footer.php'?>
