# Double Booked
When maintaining a calendar of events, it is important to know if an event overlaps with another event.

Given a sequence of events, each having a start and end time, write a program that will return the sequence of all pairs of overlapping events.

## Usage
node double-booked

## Notes
By default the program generates 15 events (meetings).

## Sample Output
-------------------------------------------
{ meeting: 'Stand-up meeting with Brian',
  start: 2019-04-30T11:24:03.655Z,
  end: 2019-04-30T22:27:03.655Z }
{ meeting: 'Management meeting with Roger',
  start: 2019-04-30T09:28:03.654Z,
  end: 2019-04-30T12:31:03.654Z }
------------------------------------------- 

{ meeting: 'One-on-One meeting with Lucy',
  start: 2019-04-30T12:00:03.655Z,
  end: 2019-04-30T12:47:03.655Z }
{ meeting: 'Stand-up meeting with Brian',
  start: 2019-04-30T11:24:03.655Z,
  end: 2019-04-30T22:27:03.655Z }
------------------------------------------- 

Meeting Generated : 15
Overlap Found: : 13