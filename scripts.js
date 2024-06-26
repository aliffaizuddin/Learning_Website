// scripts.js

$(function() {
    // Datepicker Initialization
    $("#datepicker").datepicker();

    // Drag and Drop for Planets and Animals
    $(".planet, .animal").draggable({
        revert: "invalid",
        stack: ".planet, .animal"
    });

    $(".orbit").droppable({
        accept: ".planet",
        drop: function(event, ui) {
            var planet = ui.draggable.data("planet");
            var orbit = $(this).data("orbit");
            if (planet === orbit) {
                $(this).addClass("correct");
            }
        }
    });

    $(".habitat").droppable({
        accept: ".animal",
        drop: function(event, ui) {
            var animal = ui.draggable.data("habitat");
            var habitat = $(this).data("habitat");
            if (animal === habitat) {
                $(this).addClass("correct");
            }
        }
    });

    // Resize Functionality
    $(".resizable").resizable({
        aspectRatio: true
    });

    // Sortable Functionality
    $(".sortable").sortable();

    // Periodic Table Quiz
    $(".element").click(function() {
        var symbol = $(this).data("symbol");
        if (symbol === "H") { // Replace with dynamic check
            $(this).addClass("correct");
        }
    });

// Check Answers and Update Progress
function checkAnswers() {
    var totalQuestions = 11; // Update total number of questions

    // Reset correct answers counter
    var correctAnswers = 0;

    // Check Drag and Drop (Planets and Animals)
    correctAnswers += $(".orbit.correct").length;
    correctAnswers += $(".habitat.correct").length;

    // Check Resizable Images
    $(".resizable").each(function() {
        var width = $(this).width();
        if (width === 200) { // Assuming correct width
            correctAnswers++;
        }
    });

    // Check Sortable (Phases of the Moon)
    var correctOrder = [1, 2, 3, 4]; // Correct order of phases
    var sortedItems = $(".sortable li").map(function() {
        return $(this).data("phase");
    }).get();

    if (JSON.stringify(sortedItems) === JSON.stringify(correctOrder)) {
        correctAnswers++;
    }

    // Check Periodic Table Quiz
    $(".element").each(function() {
        var symbol = $(this).data("symbol");
        if (symbol === "H") { // Replace with dynamic check
            correctAnswers++;
        }
    });

    // Check Fill in the Blanks
    var fillBlank1 = $("#fill-blank-1").val().trim().toLowerCase();
    if (fillBlank1 === "star") {
        correctAnswers++;
    }

    var fillBlank2 = $("#fill-blank-2").val().trim();
    if (fillBlank2 === "8") {
        correctAnswers++;
    }

    // Check Trivia Questions
    $(".trivia-question").each(function() {
        var selectedAnswer = $(this).find("input:checked").val();
        if (selectedAnswer === "32" || selectedAnswer === "Blue Whale" || selectedAnswer === "Mars") {
            correctAnswers++;
        }
    });

    // Check Sheep Count
    var sheepCount = parseInt($("#sheep-count-input").val());
    var correctSheepCount = $(".resizable img").data("sheep-count");

    if (sheepCount === correctSheepCount) {
        correctAnswers++;
    }

    // Calculate Progress
    var progress = (correctAnswers / totalQuestions) * 100;
    $("#progress-bar").css("width", progress + "%");
    $("#progress-text").text(progress.toFixed(0) + "% Completed");

    return progress;
}





// Submit Answers
window.submitAnswers = function() {
    var totalQuestions = 11; // Update total number of questions

    // Reset correct answers counter
    var correctAnswers = 0;

    // Check Drag and Drop (Planets and Animals)
    correctAnswers += $(".orbit.correct").length;
    correctAnswers += $(".habitat.correct").length;

    // Check Resizable Images
    $(".resizable").each(function() {
        var width = $(this).width();
        if (width === 200) { // Assuming correct width
            correctAnswers++;
        }
    });

    // Check Sortable (Phases of the Moon)
    var correctOrder = [1, 2, 3, 4]; // Correct order of phases
    var sortedItems = $(".sortable li").map(function() {
        return $(this).data("phase");
    }).get();

    if (JSON.stringify(sortedItems) === JSON.stringify(correctOrder)) {
        correctAnswers++;
    } else {
        // Highlight incomplete section
        $("#section-sort").addClass("incomplete");
    }

    // Check Periodic Table Quiz
    $(".element").each(function() {
        var symbol = $(this).data("symbol");
        if (symbol === "H") { // Replace with dynamic check
            correctAnswers++;
        }
    });

    // Check Fill in the Blanks
    var fillBlank1 = $("#fill-blank-1").val().trim().toLowerCase();
    if (fillBlank1 === "star") {
        correctAnswers++;
    }

    var fillBlank2 = $("#fill-blank-2").val().trim();
    if (fillBlank2 === "8") {
        correctAnswers++;
    }

    // Check Trivia Questions
    $(".trivia-question").each(function() {
        var selectedAnswer = $(this).find("input:checked").val();
        if (selectedAnswer === "32" || selectedAnswer === "Blue Whale" || selectedAnswer === "Mars") {
            correctAnswers++;
        }
    });

    // Calculate Progress
    var progress = (correctAnswers / totalQuestions) * 100;
    $("#progress-bar").css("width", progress + "%");
    $("#progress-text").text(progress.toFixed(0) + "% Completed");

    // Show incomplete message
    if (progress !== 100) {
        $("#submit-message").text("Please complete all sections to submit.");
    } else {
        $("#submit-message").text("Congratulations! You have completed all activities!");
        // Redirect to certificate.html
        window.location.href = "certificate.html";
    }
};



    // Reset Form
    window.resetForm = function() {
        // Reset All Inputs and Styles
        $("input[type='text'], input[type='number']").val("");
        $(".orbit, .habitat, .element").removeClass("correct");
        $(".sortable").sortable("cancel");
        $(".resizable").resizable("destroy").resizable({ aspectRatio: true });
        $(".trivia-question input").prop("checked", false);
        $("#progress-bar").css("width", "0");
        $("#progress-text").text("");
        $("#submit-message").text("");
    };
});
