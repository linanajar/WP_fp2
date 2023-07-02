$(document).ready(function() {
    var generateLinkButton = $("#generateLinkButton");
    var startGameButton = $("#startGameButton");
    var copyButton = $("#copyButton");
    var usernameInput = $("#username");
    let linkInput = $("#linkInput");

    // Define function to generate link
    function generateLink(usernameInput, startGameButton, copyButton) {
        let username = usernameInput.val();
        if (username !== '') {
            let gameURL = window.location.origin + "/WP23/WP_fp2/gamepage.php?username=" + encodeURIComponent(username)
            linkInput.val(gameURL + "&player=Player 2");
            startGameButton.on("click", function() {
                startGame(gameURL + "&player=Player 1")
            });
            copyButton.on("click", copyURL)
        } else {

        }
    }

    // Define function to start game
    function startGame(gameURL) {
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
    generateLinkButton.on("click", function () {
        generateLink(usernameInput, startGameButton, copyButton)
    });
})
