fetch("/events/ticketMasterSearch", {

    $(document).ready(function () {

        $('#btnSubmit').on('click', function (event) {
            event.preventDefault();
            var keyword = $("#keyword").val().trim();
            var startDate = $("#startDate").val().trim();
            var endDate = $("#endDate").val().trim();
            var location = $("#location").val().trim();
            if (localStorage.getItem("windowLatitude") !== null || localStorage.getItem("windowLongitude") !== null) {
                var currentLatitude = localStorage.getItem("windowLatitude");
                var currentLongitude = localStorage.getItem("windowLongitude");
            }
            else {
                var currentLatitude = windowLatitude;
                var currentLongitude = windowLongitude;
            }
            var myUserInput = new userInput(keyword, startDate, endDate, location, currentLatitude, currentLongitude);
            var mytmEventList = tmEventSearch(myUserInput);
            if (localStorage.getItem("tmEventListString") === null) {
                var mytmEventListString = JSON.stringify(mytmEventList);
                localStorage.setItem("tmEventListString", mytmEventListString);
            }
            else {
                localStorage.removeItem("tmEventListString");
                var mytmEventListString = JSON.stringify(mytmEventList);
                localStorage.setItem("tmEventListString", mytmEventListString);
            }
            displaySearchResult(mytmEventList);
    
        });
    });
    $("#btnReset").on("click", function (event) {
        event.preventDefault();
        $("#displayResults").empty();
        $("#keyword").val("");
        $("#startDate").val("");
        $("#endDate").val("");
        $("#location").val("");
        localStorage.removeItem("tmEventListString");
        window.location.href = "main.html";
    })

})