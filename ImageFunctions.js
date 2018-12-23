import Utilities from './Utilities';
var utils = new Utilities();

var functions = {};
var convolutions = {};

function curves(start, c1, c2, end, ch) {
	var bezier = utils.bezier(start, c1, c2, end, 0, 255);
	if (start[0] > 0)
		for (var i=0, ref=start[0]; ref>=0 ? i<ref : i>ref; i= 0<=ref ? ++i : --i)
			bezier[i] = start[1];
	if (end[0] < 255)
		for (var i=end[0],ref=end[0]; ref<=255 ? i<=255 : i>=255; i= ref<=255 ? ++i : --i)
			bezier[i] = end[1];
	return function(x,y,idx) {
		for (var i=0; i<ch.length; i++)
			this.bitmap.data[idx+ch[i]] = bezier[this.bitmap.data[idx+ch[i]]];
	}
};
functions["curves"] = curves;

function exposure(amount) {
	var p = Math.abs(amount)/100;
	var c1 = [0,255*p];
	var c2 = [255-255*p,255];
	if (amount<0) {
		c1 = c1.reverse();
		c2 = c2.reverse();
	}
	return curves([0,0],c1,c2,[255,255],[0,1,2]);
}
functions["exposure"] = exposure;

function noise(amount) {
	amount = Math.abs(amount) * 2.55;
	return function(x,y,idx) {
		var rand = Math.random() * 2*amount - amount;
		for (var i=0; i<3; i++)
			this.bitmap.data[idx+i] = Math.min(Math.max(this.bitmap.data[idx+i]+rand, 0), 255);
	}
};
functions["noise"] = noise;

function vibrance(amount) {
	amount *= -1;
	return function(x,y,idx) {
		var max = 0;
		var avg = 0;
		for (var i=0; i<3; i++) {
			max = Math.max(this.bitmap.data[idx+i], max);
			avg += this.bitmap.data[idx+i];
		}
		avg /= 3;
		var amt = ((Math.abs(max-avg)*2/255)*amount)/100;
		for (var i=0; i<3; i++)
			if (this.bitmap.data[idx+i]!==max)
				this.bitmap.data[idx+i] = Math.min(Math.max(this.bitmap.data[idx+i]+(max-this.bitmap.data[idx+i])*amt,0),255);
	}
}
functions["vibrance"] = vibrance;

function sharpen(amount) {
	amount /= 100;
	return [[0, -amount, 0], [-amount, 4*amount+1, -amount], [0, -amount, 0]];
}
convolutions["sharpen"] = sharpen;

function vignette(size, strength,width,height) {
	var size = (height > width) ? width * size : height * size;
	strength /= 100;
	var centre = [width/2, height/2];
	var start = Math.sqrt(Math.pow(centre[0],2) + Math.pow(centre[1],2));
	var end = start - size;
	var bezier = utils.bezier([0,1],[30,30],[70,60],[100,80],0,255);
	return function(x,y,idx) {
		var dist = Math.sqrt(Math.pow(y-centre[1],2)+Math.pow(x-centre[0],2));
		if (dist > end) {
			var div = Math.max(1, (bezier[Math.round(((dist-end)/size)*100)]/10)*strength);
			for (var i=0; i<3; i++)
				this.bitmap.data[idx+i] = Math.pow(this.bitmap.data[idx+i]/255,div)*255;
		}
	}
}
functions["vignette"] = vignette;

function sepia(amount) {
	amount /= 100;
	return function(x,y,idx) {
		this.bitmap.data[idx+0] = Math.min(255, (this.bitmap.data[idx+0]*(1-(0.067*amount)))
			+(this.bitmap.data[idx+1]*(0.769*amount))
			+(this.bitmap.data[idx+2]*(0.189*amount)));
		this.bitmap.data[idx+1] = Math.min(255, (this.bitmap.data[idx+0]*(0.349*amount))
			+(this.bitmap.data[idx+1]*(1-(0.314*amount)))
			+(this.bitmap.data[idx+2]*(0.168*amount)));
		this.bitmap.data[idx+2] = Math.min(255, (this.bitmap.data[idx+0]*(0.272*amount))
			+(this.bitmap.data[idx+1]*(0.534*amount))
			+(this.bitmap.data[idx+2]*(1-(0.869*amount))));
	}
}
functions["sepia"] = sepia;

function colorise(colour, amount) {
	return function(x,y,idx) {
		for (var i=0; i<3; i++)
			this.bitmap.data[idx+i] -= (this.bitmap.data[idx+i]-colour[i])*(amount/100);
	}
}
functions["colorise"] = colorise;

function gamma(amount) {
	return function(x,y,idx) {
		for (var i=0; i<3; i++)
			this.bitmap.data[idx+i] = Math.pow(this.bitmap.data[idx+i]/255,amount)*255;
	}
}
functions["gamma"] = gamma;

function fill(rgb) {
	return function(x,y,idx) {
		for (var i=0; i<3; i++)
			this.bitmap.data[idx+i] = rgb[i];
		this.bitmap.data[idx+3] = 255;
	}
}
functions["fill"] = fill;

function clip(amount) {
	amount = Math.abs(amount) * 2.55;
	return function(x,y,idx) {
		for (var i=0; i<3; i++)
			this.bitmap.data[idx+i] = (this.bitmap.data[idx+i] > 255-amount) ?
				255 :
				(this.bitmap.data[idx+i] < amount) ?
				0 :
				this.bitmap.data[idx+i];
	}
}
functions["clip"] = clip;

export {
	functions,
	convolutions
};
