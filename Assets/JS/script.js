var $timeContainer = $("#currentDay");
var todayIS = moment().format("DDDD-YY");
var todaysSchedule;
var $schduleDisplay = $("#scheduleArea");
var theTime = Number.parseInt(moment().format("k"));
var scheduleInfo = new schedule();

//get schedule from local storage
//if there is no schedule for todays date it will make a new instance
function getSchedule(){
        
    if(localStorage.getItem(todayIS) === null){
        //create a new object of schedule that will have a default schedule loaded
        var newSchedule = new schedule;
        //load default schedule to local
        localStorage.setItem(todayIS, JSON.stringify(newSchedule.theSchedule));
        //set the working variable to the default schedule
        todaysSchedule = newSchedule.theSchedule;   
    }else{
        todaysSchedule = JSON.parse(localStorage.getItem(todayIS));
    }
}

//save the schdule back to local storage
function setSchedule(){
    localStorage.setItem(todayIS, JSON.stringify(todaysSchedule));
}

//build and display stored schedule
function showSchedule(){

    //create a line in the scheduel for each hour
    for(let x of todaysSchedule){
        var theHour = x.hour;
        var elID = "info-" + theHour;

        //create containing div and classes
        var $divEL = $("<div>")
        $divEL.addClass("input-group row");

        //create label and assocaited attr
        var $labelEL = $("<label>");
        $labelEL.attr({
            for: elID,
            class: "input-group-text hour col-1"
        });
        theHour < 12 ? $labelEL.text(theHour +"AM") :
        theHour === 12 ? $labelEL.text("Noon") :
        $labelEL.text(theHour-12 + "PM");

        //create textarea and asosciated arrt
        var $textEL = $("<textarea>");
        $textEL.attr({
            id: elID,
            name: elID
        });
        $textEL.text(x.info);

        //color text area based on time of day
        //grey is hours past, red is current hour, green are hours not yet past
        theHour < theTime ? $textEL.addClass("form-control past") :
        theHour === theTime ? $textEL.addClass("form-control present") :
        $textEL.addClass("form-control future");

        //create button and assocaited attr
        var $buttonEL = $("<button>")
        $buttonEL.attr({
            class: "btn saveBtn col-1",
            id: x.hour
        });
        //add icon to button
        $buttonEL.append("<i class='fas fa-file'>");

        //add all elements to the div
        $divEL.append($labelEL, [$textEL, $buttonEL]);
        //then add the div to the site
        $schduleDisplay.append($divEL);
    }
}

//listen for any save button on the screen to be selected
//will save all changes in all fields to local
$schduleDisplay.on("click", ".saveBtn", function(){

    //get all text areas (these contain the info for each hour)
    var todaysEvents = $("div").find("textarea");
    
    //step through and write what ever is in the text fields
    //into the clone of the local date in "todaysSchedule"
    //then write back to local
    for(let x = 0; x < todaysEvents.length; x++)
    {
        todaysSchedule[x].info = todaysEvents[x].value;
    }
    setSchedule();

});

//show todays date at the top of the screen
$timeContainer.text(moment().format("dddd, MMMM Do") );

getSchedule();
showSchedule();