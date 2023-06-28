$(document).ready(function() {
    var generateLinkButton = $("#generateLinkButton");
    var startGameButton = $("#startGameButton");
    var copyButton = $("#copyButton");
    var usernameInput = $("#username");
    var linkInput = $("#linkInput");


    // Define function to generate link
    function  generateLink(usernameInput){
        let username = usernameInput.val();
        if (username !== '') {
            let gameURL = window.location.origin + "/WP23/WP_fp2/gamepage.php?username=" + encodeURIComponent(username)
            linkInput.val(gameURL);
        }
        else {

        }
    }

    // Define function to start game
    function startGame() {
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
        generateLinkButton.on("click", function() {
            generateLink(usernameInput)
        });
        startGameButton.on("click", startGame);
        copyButton.on("click", copyURL);

});
