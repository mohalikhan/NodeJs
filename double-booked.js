'use strict';

// Occasions array
let occasions = [
    "One-on-One",
    "Stand-up",
    "Estimation",
    "Retro",
    "Managment",
    "Personal",
    "HR",
]

// Persons array
let persons = [
    "Team",
    "Ali",
    "Roger",
    "Li",
    "Brian",
    "Fred",
    "Cheryl",
    "Reza"
]

// Create random meeting string
var meeting = () => {
    let occasion = occasions[Math.floor(Math.random() * occasions.length)];
    let person = persons[Math.floor(Math.random() * persons.length)];
    return occasion + " meeting with " + person;
};

// Create random interval and return start/end datetime object
var meetinginterval = (dt) => {
    dt.setHours(dt.getHours() + Math.floor(Math.random() * 12));
    dt.setMinutes(dt.getMinutes() + Math.floor(Math.random() * 60));
    var start = new Date(dt);

    dt.setHours(dt.getHours() + Math.floor(Math.random() * 12));
    dt.setMinutes(dt.getMinutes() + Math.floor(Math.random() * 60));
    var end = new Date(dt);

    return { start: start, end: end };
}

// Crate random meeting object
var meetingname = () => {
    var event = meeting();
    var eventinterval = meetinginterval(new Date());

    return {
        meeting: event,
        start: eventinterval.start,
        end: eventinterval.end,
    }
}

var meetings = (num) => {
    var toReturn = []
    for (var i = 0; i < num; i++) {
        toReturn.push(meetingname());   
    }
    return toReturn;
}

var overlaps = (meetings) => {
    for (var i = 0, l = meetings.length; i < l; i++) {
        console.log(meetings[i]);
    }
}

// Generate some randomly meetings
var meetings = meetings(10);

// print original meetings
console.log(overlaps(meetings));