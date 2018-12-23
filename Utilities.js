class Utilities {
	calcMissingVals(vals, end) {
		if (Object.keys(vals).length < end+1) {
			var out = {};
			var lcoord, rcoord;
			for (var i=0; end>=0 ? i<=end : i>=end; i= end>=0 ? ++i : --i) {
				if (vals[i] != null)
					out[i] = vals[i];
				else {
					lcoord = [i-1, out[i-1]];
					for (var j=i; i<=end ? j<=end : j>=end; j= i<=end ? ++j : --j)
						if (vals[j] != null) {
							rcoord = [j, vals[j]];
							break;
						}
					out[i] = lcoord[1] + ((rcoord[1]-lcoord[1]) / (rcoord[0]-lcoord[0])) * (i-lcoord[0]);
				}
			}
			return out;
		}
		return vals;
	}

	bezier(start, c1, c2, end, low, high) {
		var controlpoints = [start, c1, c2, end];
		var bezier = {};
		var lerp = function(a,b,t) {
			return a * (1-t) + b*t;
		};
		var clamp = function(a, min, max) {
			return Math.min(Math.max(a, min), max);
		};
		var prev, next;
		for (var i=0; i<1000; ++i) {
			var t = i/1000;
			prev = controlpoints;
			while (prev.length > 1) {
				next = [];
				for (var j=0, ref=prev.length-2; ref>=0 ? j<=ref : j >= ref; j= ref>=0 ? ++j : --j)
					next.push([lerp(prev[j][0], prev[j+1][0], t), lerp(prev[j][1], prev[j+1][1], t)]);
				prev = next;
			}
			bezier[Math.round(prev[0][0])] = Math.round(clamp(prev[0][1], low, high));
		}
		var endX = controlpoints[controlpoints.length-1][0];
		bezier = this.calcMissingVals(bezier, endX);
		if (bezier[endX] == null)
			bezier[endX] = bezier[endX-1];
		return bezier;
	}
}

export default Utilities;
