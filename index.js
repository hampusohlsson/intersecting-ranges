/**
 * Copyright (c) 2018 Hampus Ohlsson.
 * GitHub: http://github.com/hampusohlsson/intersecting-ranges
 *
 * MIT License
 */

(function() {
  const START = 1;
  const END = -1;
  function intersectingRanges(ranges) {
    const points = ranges
      // Break range intervals into start/end values
      .reduce(
        (arr, range, rangeIndex) =>
          arr
            .concat({ value: range[0], type: START, rangeIndex })
            .concat({ value: range[1], type: END, rangeIndex }),
        []
      )
      // Sort on value, then on type
      // Invert type sorting if comparing two points in the same range
      .sort((a, b) => {
        let valueDiff = a.value - b.value;
        if (valueDiff !== 0) {
          return valueDiff;
        } else {
          return a.type - b.type * (a.rangeIndex === b.rangeIndex) ? -1 : 1;
        }
      })
      // For each point add the level of intersecting ranges
      .reduce((arr, p, index) => {
        const prevLevel = index > 0 ? arr[index - 1].level : 0;
        return arr.concat(Object.assign({}, p, { level: prevLevel + p.type, index }));
      }, []);
    // Get the max number of simultaneous intersecting ranges
    const maxLevels = points.reduce((max, p) => Math.max(max, p.level), 0);
    return (
      points
        // Remove all starting points that are not at the max overlap
        .filter(p => p.level === maxLevels)
        // Create interval with this point as starting value and next point as end value
        .map(p => [p.value, points[p.index + 1].value])
    );
  }

  if (typeof module !== 'undefined' && module.exports) {
    intersectingRanges.default = intersectingRanges;
    module.exports = intersectingRanges;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // register as 'classnames', consistent with npm package name
    define('intersectingRanges', [], function() {
      return intersectingRanges;
    });
  } else {
    window.intersectingRanges = intersectingRanges;
  }
})();
