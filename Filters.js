import Jimp from 'jimp';
var filters = {};

filters["nostalgia"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'color', params: [
			{apply:'saturate', params:[20]},
		]},
		{ apply:'gamma', params:[1.4] },
		{ apply:'greyscale', params:[]},
		{ apply:'contrast', params:[0.05]},
		{ apply:'sepia', params:[100]},
		{ apply:'color', params: [
			{ apply:'red', params:[8]},
			{ apply:'blue', params:[2]},
			{ apply:'green', params:[4]},
		]},
		{ apply:'gamma', params:[0.8] },
		{ apply:'contrast', params:[0.05]},
		{ apply:'exposure', params:[10]},
		{ apply:'vignette', params:[0.5,30]}
	]},
	{ layer:'clone', cl:0, idx:1, blend:Jimp.BLEND_OVERLAY, instructions:[
		{ apply:'blur', params:[10]},
		{ apply:'opacity', params:[0.55]}
	]},
];

filters["vintage"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'greyscale', params:[] },
		{ apply:'contrast', params:[0.05] },
		{ apply:'noise', params:[3] },
		{ apply:'sepia', params:[100] },
		{ apply:'color', params: [
			{ apply:'red', params:[8]},
			{ apply:'blue', params:[2]},
			{ apply:'green', params:[4]},
		]},
		{ apply:'gamma', params:[0.87] },
		{ apply:'vignette', params:[0.4,30] },
	]}
];

filters["lomo"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'brightness', params:[0.15] },
		{ apply:'exposure', params:[15] },
		{ apply:'curves', params:[[0,0],[200,0],[155,255],[255,255],[0,1,2]] },
		{ apply:'color', params: [
			{apply:'desaturate', params:[20]},
		]},
		{ apply:'gamma', params:[1.8] },
		{ apply:'vignette', params:[0.5,60] },
		{ apply:'brightness', params:[0.05] },
	]}
];

filters["clarity"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'vibrance', params: [20] },
		{ apply:'curves', params: [[0,0],[200,0],[155,255],[255,255],[0,1,2]] },
		{ apply:'sharpen', params: [15] },
		{ apply:'vignette', params:[0.45,20] },
	]}
];

filters["sinCity"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'contrast', params: [1] },
		{ apply:'brightness', params: [.15] },
		{ apply:'exposure', params: [10] },
		{ apply:'posterize', params: [80] },
		{ apply:'clip', params: [30] },
		{ apply:'greyscale', params: [] },
	]}
]

filters["sunrise"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'exposure', params: [3.5] },
		{ apply:'color', params: [
			{apply:'desaturate', params:[5]}
		]},
		{ apply:'vibrance', params: [50] },
		{ apply:'sepia', params: [60] },
		{ apply:'colorise', params: [[232,123,34],10] },
		{ apply:'color', params: [
			{apply:'red', params:[8]},
			{apply:'blue', params:[8]}
		]},
		{ apply:'contrast', params: [0.05] },
		{ apply:'gamma', params:[1.2] },
		{ apply:'vignette', params: [0.55,25] }
	]}
]

filters["crossProcess"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'exposure', params: [5] },
		{ apply:'colorise', params: [[232,123,34],10] },
		{ apply:'sepia', params: [20] },
		{ apply:'color', params: [
			{apply:'blue', params:[8]},
			{apply:'red', params:[3]}
		]},
		{ apply:'curves', params: [[0,0],[100,50],[180,180],[255,255],[2]] },
		{ apply:'contrast', params: [0.15] },
		{ apply:'vibrance', params: [75] },
		{ apply:'gamma', params:[1.6] },
	]}
]

filters["orangePeel"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'curves', params: [[0,0],[100,50],[140,200],[255,255],[0,1,2]] },
		{ apply:'color', params: [
			{apply:'desaturate', params:[30]},
		]},
		{ apply:'colorise', params: [[255,144,0],30] },
		{ apply:'contrast', params: [-0.05] },
		{ apply:'gamma', params:[1.4] },
	]}
]

filters["love"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'brightness', params:[0.05] },
		{ apply:'exposure', params:[8] },
		{ apply:'contrast', params:[0.04] },
		{ apply:'colorise', params:[[196,32,7],30] },
		{ apply:'vibrance', params:[50] },
		{ apply:'gamma', params:[1.3] },
	]}
]

filters["grungy"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'gamma', params:[1.5] },
		{ apply:'clip', params: [25] },
		{ apply:'color', params: [
			{apply:'desaturate', params:[60]},
		]},
		{ apply:'contrast', params:[0.05] },
		{ apply:'noise', params:[5] },
		{ apply:'vignette', params:[0.5,30] },
	]}
]

filters["jarques"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'color', params: [
			{apply:'desaturate', params:[35]},
		]},
		{ apply:'curves', params: [[20,0],[90,120],[186,144],[255,230],[2]] },
		{ apply:'curves', params: [[0,0],[144,90],[138,120],[255,255],[0]] },
		{ apply:'curves', params: [[10,0],[115,105],[148,100],[255,248],[1]] },
		{ apply:'curves', params: [[0,0],[120,100],[128,140],[255,255],[0,1,2]] },
		{ apply:'sharpen', params:[20] },
	]}
]

filters["pinhole"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'greyscale', params:[] },
		{ apply:'sepia', params:[10] },
		{ apply:'exposure', params:[10] },
		{ apply:'contrast', params:[0.15] },
		{ apply:'vignette', params:[0.6,35] },
	]}
]

filters["oldBoot"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'color', params: [
			{apply:'desaturate', params:[20]},
		]},
		{ apply:'vibrance', params:[-50] },
		{ apply:'gamma', params:[1.1] },
		{ apply:'sepia', params:[30] },
		{ apply:'color', params: [
			{apply:'red', params:[-10]},
			{apply:'blue', params:[5]}
		]},
		{ apply:'curves', params: [[0,0],[80,50],[128,230],[255,255],[0,1,2]] },
		{ apply:'vignette', params:[0.6,30] },
	]}
]

filters["glowingSun"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'brightness', params:[0.1] },
	]},
	{ layer:'clone', idx:1, cl:0, blend:Jimp.BLEND_MULTIPLY, instructions: [
		{ apply:'gamma', params:[0.8] },
		{ apply:'contrast', params:[0.5] },
		{ apply:'exposure', params:[10] },
		{ apply:'opacity', params:[0.8] }
	]},
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'exposure', params:[20] },
		{ apply:'gamma', params:[0.8] },
		{ apply:'vignette', params:[0.45,20] },
	]}
]

filters["hazyDays"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'gamma', params:[1.2] },
	]},
	{ layer:'clone', idx:1, cl:0, blend:Jimp.BLEND_OVERLAY, instructions: [
		{ apply:'color', params: [
			{apply:'red', params:[5]},
		]},
		{ apply:'blur', params:[15] },
		{ apply:'opacity', params:[0.6] }
	]},
	{ layer:'blank', idx:2, blend:Jimp.BLEND_SOURCE_OVER, instructions:[
		{ apply:'fill', params:[[104,153,186]] },
		{ apply:'opacity', params:[0.3] },
	]},
	{ layer:'clone', idx:3, cl:0, blend:Jimp.BLEND_MULTIPLY, instructions: [
		{ apply:'brightness', params:[0.4] },
		{ apply:'vibrance', params:[40] },
		{ apply:'exposure', params:[10] },
		{ apply:'contrast', params:[0.15] },
		{ apply:'curves', params: [[0,40],[128,128],[128,128],[255,215],[0,1,2]] },
		{ apply:'blur', params:[5] },
		{ apply:'opacity', params:[0.35] },
	]},
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'curves', params: [[20,0],[128,158],[128,128],[235,255],[0,1,2]] },
		{ apply:'vignette', params:[0.45,20] },
	]},
]

filters["herMajesty"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'gamma', params:[0.4] },
		{ apply:'colorise', params:[[234,28,93],10] },
		{ apply:'curves', params: [[0,10],[128,180],[190,190],[255,255],[2]] },
	]},
	{ layer:'clone', idx:1, cl:0, blend:Jimp.BLEND_OVERLAY, instructions: [
		{ apply:'gamma', params: [0.7] },
		{ apply:'opacity', params:[0.5] }
	]},
	{ layer:'blank', idx:2, blend:Jimp.BLEND_OVERLAY, instructions:[
		{ apply:'fill', params:[[234,28,93]] },
		{ apply:'opacity', params:[0.4] },
	]},
	{ layer:'clone', idx:3, cl:0, blend:Jimp.BLEND_MULTIPLY, instructions: [
		{ apply:'color', params: [
			{apply:'saturate', params:[50]},
			{apply:'hue', params:[90]},
		]},
		{ apply:'contrast', params:[0.1] },
		{ apply:'opacity', params:[0.2] },
	]},
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'gamma', params: [1.4] },
		{ apply:'vibrance', params: [-30] },
	]},
	{ layer:'blank', idx:4, blend:Jimp.BLEND_SOURCE_OVER, instructions:[
		{ apply:'fill', params:[[299,240,255]] },
		{ apply:'opacity', params:[0.1] },
	]},
]

filters["hemingway"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'greyscale', params:[] },
		{ apply:'contrast', params:[0.10] },
		{ apply:'gamma', params: [0.9] },
	]},
	{ layer:'clone', idx:1, cl:0, blend:Jimp.BLEND_MULTIPLY, instructions: [
		{ apply:'opacity', params:[0.4] },
		{ apply:'exposure', params: [15] },
		{ apply:'contrast', params: [0.15] },
		{ apply:'color', params: [
			{apply:'green', params:[10]},
			{apply:'red', params:[5]},
		]},
	]},
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'sepia', params:[30] },
		{ apply:'curves', params: [[0,10],[120,90],[180,200],[235,255],[0,1,2]] },
		{ apply:'color', params: [
			{apply:'red', params:[5]},
			{apply:'green', params:[-2]},
		]},
		{ apply:'exposure', params: [15] },
	]},
]

filters["concentrate"] = [
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'sharpen', params:[40] },
		{ apply:'color', params: [
			{apply:'desaturate', params:[20]},
			{apply:'red', params:[3]},
		]},
	]},
	{ layer:'clone', idx:1, cl:0, blend:Jimp.BLEND_MULTIPLY, instructions: [
		{ apply:'opacity', params:[0.8] },
		{ apply:'sharpen', params: [5] },
		{ apply:'contrast', params: [0.5] },
		{ apply:'exposure', params: [10] },
		{ apply:'color', params: [
			{apply:'blue', params:[5]},
		]},
	]},
	{ layer:'base', idx:0, blend:'', instructions:[
		{ apply:'brightness', params:[0.10] },
	]},
]

export {
	filters,
};
