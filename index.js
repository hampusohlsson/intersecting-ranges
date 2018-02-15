/**
 * Copyright (c) 2018 Hampus Ohlsson.
 * GitHub: http://github.com/hampusohlsson/intersecting-ranges
 *
 * MIT License
 */

(function() {
  function intersectingRanges(ranges) {
    var START = 1;
    var END = -1;
    var points = [];

    // Break range intervals into start/end values
    ranges.forEach(function(range, index) {
      points.push({ value: range[0], rangeIndex: index, type: START });
      points.push({ value: range[1], rangeIndex: index, type: END });
    });

    // Sort on value, then on type
    // Invert type sorting if comparing two points in the same range
    points.sort(function(a, b) {
      var valueDiff = a.value - b.value;
      if (valueDiff !== 0) {
        return valueDiff;
      } else {
        return a.type - b.type * (a.rangeIndex === b.rangeIndex) ? -1 : 1;
      }
    });

    // For each point add the count of intersecting ranges
    var count = 0;
    points = points.map(function(p, index) {
      count += p.type;
      return Object.assign({}, p, { count: count, index: index });
    });

    // Get the max number of simultaneous intersecting ranges
    var maxCount = points.reduce(function(max, p) {
      return Math.max(max, p.count);
    }, 0);

    // Remove all starting points that are not at the max intersection count,
    // then create interval with starting value and its next neigbor as end value
    return points
      .filter(function(p) {
        return p.count === maxCount;
      })
      .map(function(p) {
        return [p.value, points[p.index + 1].value];
      });
  }

  if (typeof module !== 'undefined' && module.exports) {
    intersectingRanges.default = intersectingRanges;
    module.exports = intersectingRanges;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // register as 'intersectingRanges', consistent with npm package name
    define('intersectingRanges', [], function() {
      return intersectingRanges;
    });
  } else {
    window.intersectingRanges = intersectingRanges;
  }
})();
