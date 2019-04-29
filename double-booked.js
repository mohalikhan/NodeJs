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

function overlap(dateRanges){
    var sortedRanges = dateRanges.sort((previous, current) => {
    
      // get the start date from previous and current
      var previousTime = previous.start.getTime();
      var currentTime = current.start.getTime();
  
      // if the previous is earlier than the current
      if (previousTime < currentTime) {
        return -1;
      }
  
      // if the previous time is the same as the current time
      if (previousTime === currentTime) {
        return 0;
      }
  
      // if the previous time is later than the current time
      return 1;
    });
    
    var result = sorted.reduce((result, current, idx, arr) => {
      // get the previous range
      if (idx === 0) { return result; }
      var previous = arr[idx-1];
    
      // check for any overlap
      var previousEnd = previous.end.getTime();
      var currentStart = current.start.getTime();
      var overlap = (previousEnd >= currentStart);
    
      // store the result
      if (overlap) {
        // yes, there is overlap
        result.overlap = true;
        // store the specific ranges that overlap
        result.ranges.push({
          previous: previous,
          current: current
        })
      }
     
      return result;
     
       // seed the reduce  
    }, {overlap: false, ranges: []});
  
  
    // return the final results  
    return result;
  }

// Generate some randomly meetings
var meetings = meetings(10);

// print original meetings
console.log(overlaps(meetings));