$(function() {

    //define function for open-button
    function openForm() {
        $(".form-container").show();
        $("#open-button").hide();
        $(".form-container").scrollTop($(".form-container")[0].scrollHeight);
    }

    //define function for close-button
    function closeForm() {
        $(".form-container").hide();
        $("#open-button").show();
    }

    //link functions to on-click events for the buttons
    $("#open-button").on("click", openForm);
    $("#close-button").on("click", closeForm);

    //Get form elements
    var submitButton = $('#submit-button');

    //Event listener for submit button
    submitButton.click(function () {
        // Get input
        var nameInput = $('#name').val();
        var messageInput = $('#message').val();
        if(nameInput.length == 0) {
            $('#name').addClass("is-invalid")
        }
        if(messageInput.length == 0) {
            $('#message').addClass("is-invalid")
        }
        else {
            //Create new xhr object
            var xhr = new XMLHttpRequest();

            // Set request URL and method
            xhr.open('POST', 'scripts/display_messages.php', true)

            // Set request headers
            xhr.setRequestHeader('Content-Type', 'application/json');

            // Prepare data
            var data = {
                name: nameInput,
                message: messageInput
            };

            // Make data into JSON
            var jsonData = JSON.stringify(data);

            //Send AJAX request
            xhr.send(jsonData);

            // Handle the response
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // Request successful, handle any response here
                    console.log(jsonData);

                } else {
                    // Request failed, handle any errors here
                    console.error('Request failed. Error code:', xhr.status);
                }
            };
            // clear input boxes
            $('#name').val('');
            $('#message').val('')
            // Handle the response
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // Request successful, handle any response here
                    console.log(jsonData);
                    // Add the submitted message to the message box
                    addMessage(nameInput, messageInput);
                } else {
                    // Request failed, handle any errors here
                    console.error('Request failed. Error code:', xhr.status);
                }
            };
        }
    })


    $.ajax({
        url: "data/messages.json",
        type: "POST",
        data: {call_now: true},
        dataType: "json",
        success: function (data) {
            $("#message_box").html(data.html);

        }
    })
    // Function to add a message to the message box
    function addMessage(name, message) {
        // Create a new paragraph element for the message
        var messageElement = $('<p></p>');

        // Set the text content of the paragraph to the name and message
        messageElement.text(name + ': ' + message);

        // Append the message element to the message box
        $('#message_box').append(messageElement);
      /*  $(".form-container").scrollTop($(".form-container")[0].scrollHeight);*/
    }

    function printMessages() {
/*
        $('#message_box').empty();
*/
        $.ajax({
            url: 'data/messages.json',
            dataType: 'json',
            success: function(data) {
                // Iterate over each message object in the data
                $.each(data, function(index, message) {
                    // Extract the name and message from the message object
                    var name = message.name;
                    var text = message.message;

                    // Add the message to the message box
                    addMessage(name, text);
                });
/*
                setTimeout(printMessages, 1000);
*/
            },
            error: function(xhr, status, error) {
                console.error('Error fetching messages:', error);
                }
        });
    }

    // Call printMessages initially to load existing messages
    printMessages();

})
