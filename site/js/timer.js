// Get the input box
let input = document.getElementById('word');

// Init a timeout variable to be used below
let timeout = null;

// Listen for keystroke events
input.addEventListener('keyup', function (e) {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(timeout);

    // Make a new timeout set to go off in 500ms (0.5 second)
    if (input.value != "") {
        timeout = setTimeout(function () {
            console.log('Input Value:', input.value);
            document.getElementById("word_form").submit();
        }, 500);
    }
});

