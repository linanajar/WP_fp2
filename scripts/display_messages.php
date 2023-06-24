<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the submitted data
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if ($data && isset($data['name']) && isset($data['message'])) {
        $name = $data['name'];
        $message = $data['message'];

        // Read existing messages from the JSON file
        $json_file = file_get_contents('../data/messages.json');
        $messages = json_decode($json_file, true);

        // Create a new message object
        $new_message = array(
            'time' => time(),
            'name' => $name,
            'message' => $message
        );

        // Add the new message to the messages array
        $messages[] = $new_message;

        // Convert the updated messages array to JSON
        $json_data = json_encode($messages);

        // Write the JSON data back to the file
        file_put_contents('../data/messages.json', $json_data);
    } else {
        echo ('NOPE');
    }
}
