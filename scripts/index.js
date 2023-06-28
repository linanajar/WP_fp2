$(document).ready(function() {
    var generateLinkButton = $("#generateLinkButton");
    var startGameButton = $("#startGameButton");
    var copyButton = $("#copyButton");
    var usernameInput = $("#username");
    var linkInput = $("#linkInput");
    var username = usernameInput.val();

    // Define function to generate link
    function  generateLink(){
        username = usernameInput.val();
        var gameURL = window.location.origin + "/WP23/WP_fp2/gamepage.php?username=" + encodeURIComponent(username);
        linkInput.val(gameURL);
    }

    // Define function to start game
    function startGame() {
        username = usernameInput.val();
        var gameURL = window.location.origin + "/WP23/WP_fp2/gamepage.php?username=" + encodeURIComponent(username);
        window.open(gameURL, "_blank");
    }

    // Define function to copy url
    function copyURL() {
        // Copy the game URL to the clipboard
        linkInput.select();
        document.execCommand("copy");
        window.alert("Game URL copied to clipboard!");
    }

    // If username is provided in the query, make the buttons work
    if (username !== null) {
        generateLinkButton.on("click", generateLink);
        startGameButton.on("click", startGame);
        copyButton.on("click", copyURL);
    }
});
