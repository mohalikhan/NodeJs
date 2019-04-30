'use strict';

// Occasions array
let occasions = [
  "One-on-One",
  "Stand-up",
  "Estimation",
  "Retro",
  "Management",
  "Personal",
  "HR",
  "Business",
  "Job Interview"
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
  "Reza",
  "Kavita",
  "Lucy",
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

// Create random meeting object
var meetingname = () => {
  var event = meeting();
  var eventinterval = meetinginterval(new Date());

  return {
    meeting: event,
    start: eventinterval.start,
    end: eventinterval.end,
  }
}

// Create random meetings
var meetings = (num) => {
  var toReturn = []
  for (var i = 0; i < num; i++) {
    toReturn.push(meetingname());
  }
  return toReturn;
}

// Overlap function
function overlap(meetings) {
  // sort meetings
  meetings.sort((previous, current) => {
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

  // iterate through array's reduce function
  var result = meetings.reduce((accumulator, current, idx, arr) => {
    // get the previous range
    if (idx === 0) { 
      return accumulator; 
    }
    var previous = arr[idx - 1];

    // check for any overlap
    var previousEnd = previous.end.getTime();
    var currentStart = current.start.getTime();
    var overlap = (previousEnd >= currentStart);

    // store the result
    if (overlap) {
      // there is a overlap
      accumulator.overlap = true;
      // store the overlaps
      accumulator.ranges.push({
        previous: previous,
        current: current
      });
    }
    return accumulator;
    // seed the reduce function by initialValue param 
  }, { overlap: false, ranges: [] });

  // return the final results  
  return result;
}

// Generate some randomly meetings
var originalmeetings = meetings(15);
var meetings = overlap(originalmeetings);

// print original meetings
if (meetings.overlap === true) {
  meetings.ranges.forEach(obj => {
    console.log(obj.current);
    console.log(obj.previous);
    console.log("------------------------------------------- \n")
  });
  console.log("Meeting Generated :", originalmeetings.length);
  console.log("Overlap Found: :", meetings.ranges.length);
} else {
  console.log("No overlaps found.");
}