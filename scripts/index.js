$(document).ready(function() {
    var generateLinkButton = $("#generateLinkButton");
    var startGameButton = $("#startGameButton");
    var copyButton = $("#copyButton");
    var queryParams = new URLSearchParams(window.location.search);
    var username = queryParams.get("username");

    if (username) {
        // If username is provided in the query, display game link with username
        var gameURL = window.location.origin + "/WP23/WP_fp2/gamepage.php?username=" + encodeURIComponent(username);
        linkInput.val(gameURL);
    }

    generateLinkButton.on("click", function(event) {
        event.preventDefault();
        username = $("#username").val();
        var gameURL = window.location.origin + "/WP23/WP_fp2/gamepage.php?username=" + encodeURIComponent(username);
        linkInput.val(gameURL);
    });

    startGameButton.on("click", function(event) {
        event.preventDefault();
        username = $("#username").val();
        var gameURL = window.location.origin + "/WP23/WP_fp2/gamepage.php?username=" + encodeURIComponent(username);
        window.open(gameURL, "_blank");
    });

    copyButton.on("click", function() {
        // Copy the game URL to the clipboard
        linkInput.select();
        document.execCommand("copy");
        window.alert("Game URL copied to clipboard!");
    });
});
