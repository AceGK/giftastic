$(document).ready(function () {

    //default buttons
    let displayedButtons = ["Gandalf", "Bilbo", "Gollum"];

    //get and display images from giphy
    function displayImg() {

        $("#displayImages").empty();
        let input = $(this).attr("data-name");
        let limit = 10;
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=&api_key=lye937Rm4BcL8Zsh3ktfZnK22N6Cf6OE";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            for (let j = 0; j < limit; j++) {

                let displayDiv = $("<div class=gifDiv>");

                let image = $("<img>");
                image.attr("class", "gif");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                displayDiv.append(image);
                
                let rating = response.data[j].rating;
                displayDiv.append("<p> Rating: " + rating + "</p>")

                $("#displayImages").append(displayDiv);
            }
        });
    }

    //Display default buttons & new submitted buttons
    function renderButtons() {

        $("#displayButtons").empty();

        for (let i = 0; i < displayedButtons.length; i++) {

            let newButton = $("<button>")
            newButton.attr("id", "input")
            newButton.attr("data-name", displayedButtons[i]);
            newButton.text(displayedButtons[i]);
            $("#displayButtons").append(newButton);
        }
    }

    //animate and freeze(still) gifs
    function imageChangeState() {

        let state = $(this).attr("data-state");
        let animate = $(this).attr("data-animate");
        let still = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    }

    //submit button on click function
    $("#submitButton").on("click", function () {

        var input = $("#userInput").val().trim();
        displayedButtons.push(input);
        form.reset();

        renderButtons();
        return false;

    })

    renderButtons();
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});