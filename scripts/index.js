document.addEventListener("DOMContentLoaded", function() {
    var usernameForm = document.getElementById("usernameForm");
    var gameLink = document.getElementById("gameLink");
    var generateLinkButton = document.getElementById("generateLinkButton");
    var startGameButton = document.getElementById("startGameButton");
    var copyButton = document.getElementById("copyButton");
    var queryParams = new URLSearchParams(window.location.search);
    var username = queryParams.get("username");

    if (username) {
            // If username is provided in the query, display game link with username
            var gameURL = window.location.origin + "/WP23/WP_fp/gamepage.php?username=" + encodeURIComponent(username);
            gameLink.style.display = "block";
            linkInput.value = gameURL;
            copyButton.style.display = "inline-block";
            startGameButton.style.display = "inline-block";
        }

    generateLinkButton.addEventListener("click", function(event) {
        event.preventDefault();
        username = document.getElementById("username").value;
        var gameURL = window.location.origin + "/WP23/WP_fp/gamepage.php?username=" + encodeURIComponent(username);
        gameLink.style.display = "block";
        linkInput.value = gameURL;
        copyButton.style.display = "inline-block";
        startGameButton.style.display = "inline-block";
    });

    startGameButton.addEventListener("click", function(event) {
        event.preventDefault();
        username = document.getElementById("username").value;
        var gameURL = window.location.origin + "/WP23/WP_fp/gamepage.php?username=" + encodeURIComponent(username);
        window.open(gameURL, "_blank");
    });

    copyButton.addEventListener("click", function() {
        // Copy the game URL to the clipboard
        linkInput.select();
        document.execCommand("copy");
        window.alert("Game URL copied to clipboard!");
    });
});
