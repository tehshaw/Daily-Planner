var $timeContainer = $("#currentDay");
var todayIS = moment().format("DDDD-YY");
var todaySchedule = JSON.parse(localStorage.getItem(todayIS));
var $schduleDisplay = $(".container");
var theTime = Number.parseInt(moment().format("k"));





function scheduleCheck(){   

    if(todaySchedule === null){
        localStorage.setItem(todayIS, JSON.stringify(emptySchedule));
        todaySchedule = emptySchedule;
    }
}

function showSchedule(){

    for(let x of todaySchedule){
        var theHour = x.hour;
        var elID = "info-" + theHour;
        var $divEL = $("<div>")
        $divEL.addClass("input-group row");

        var $labelEL = $("<label>");
        $labelEL.attr({
            for: elID,
            class: "input-group-text hour"
        });
        theHour < 12 ? $labelEL.text(theHour +"AM") :
        theHour === 12 ? $labelEL.text("Noon") :
        $labelEL.text(theHour-12 + "PM");

        var $textEL = $("<textarea>");
        $textEL.attr({
            id: elID,
            name: elID
        });
        $textEL.text(x.info);

        console.log(theHour > theTime);
        theHour < theTime ? $textEL.addClass("form-control past") :
        theHour === theTime ? $textEL.addClass("form-control present") :
        $textEL.addClass("form-control future");

        

        var $buttonEL = $("<button>")
        $buttonEL.attr({
            class: "btn saveBtn",
            id: x.hour
        });
        $buttonEL.append("<i class='fas fa-file'>");

        $divEL.append($labelEL, [$textEL, $buttonEL]);

        $schduleDisplay.append($divEL);
    }
}


$timeContainer.text(moment().format("dddd, MMMM Do") );

scheduleCheck();
showSchedule();