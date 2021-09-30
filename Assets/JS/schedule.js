class schedule {

    static dayOfWeek = moment().format("dddd");;
    static date = moment().format("MMMM DD, YYYY");;
    static todaysInfo;

    constructor(theDate, theDay){
        this.date = theDate;
        this.dayOfWeek = theDay;
        this.todaysInfo = [
        {
            hour: 9,
            info: ""
        },
        {
            hour: 10,
            info: ""
        },
        {
            hour: 11,
            info: ""
        },
        {
            hour: 12,
            info: ""
        },
        {
            hour: 13,
            info: ""
        },
        {
            hour: 14,
            info: ""
        },
        {
            hour: 15,
            info: ""
        },
        {
            hour: 16,
            info: ""
        },
        {
            hour: 17,
            info: ""
        }]
    }

    get theSchedule (){
        return this.todaysInfo;
    }


}