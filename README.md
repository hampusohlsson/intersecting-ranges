# Intersecting Ranges
Find the common intersecting ranges using [Marzullo's algorithm](https://en.wikipedia.org/wiki/Marzullo%27s_algorithm) 

![diagram](https://i.imgur.com/IqhI22a.png)

## Usage
Example using ranges in the picture

```js
const intersectingRanges = require('intersecting-ranges');

const ranges = [
  [1,31],  // pink
  [3,10],  // orange
  [13,20], // orange
  [23,29], // orange
  [4,15],  // green
  [16,30], // green
  [1,7],   // blue
  [9,24]   // blue
];

intersectingRanges(ranges);
// [[4, 7], [9, 10], [13, 15], [16, 20], [23, 24]];
```
