# FilterJS

An image filtering library built on top of [Jimp](https://github.com/oliver-moran/jimp) incorporating much of the image manipulation functionality of [CamanJS](https://github.com/meltingice/CamanJS/) including the preset filters implemented therein.

As with Jimp, supports: `jpeg`, `png`, `bmp`, `tiff`, `gif`.

## Installation
`npm install --save @harikulendran/filterjs`

## Basic Usage
```javascript
var FJS = new FilterJS();
var filteredBase64 = await FJS.apply(inputBase64, {name:'filterName'});
var filteredBase64 = await FJS.apply(inputPath, {name:'filterName'}, "path");
```
Apply a filter 'filterName' to an image, either from a path or from a base 64 representation and return a promise for the base 64 representation of the filtered image.

## Custom Filters
Custom filters can be passed to the apply method like so:

```javascript
var filter = {
	name: 'customFilterName', //Name must not clash with existing filters
	instructions: [
		...
	]
};
```

### Instructions
Instructions are made up of layers and functions, layers allow you to composite multiple lists of functions onto each other, and functions modify image data. For example a basic filter that increases brightness would be defined as:

```javascript
var brightenFilter = {
	name: 'brightenFilter',
	instructions: 
		{ layer:'base', idx:0, blend:'', instructions: [
			{ apply:'brightness', params:[0.5] } //Parameters must be enclosed in an array
		]}
	]
};
```

### Layers
A layer is comprised of a type, an index, and blend mode and a set of instructions, the types are defined as such:

```javascript
layer: 'base'  <- the base image, onto which all layers are composited
       'clone' <- a layer created by cloning another layer (specified in the cl param)
       'blank' <- a blank layer
```
The index, `idx` is used to define the order of the layers. An additional `cl` parameter is given when creating a `clone` layer, this is to let FilterJS know which layer to clone from.

The supported blend modes are from Jimp and can be found [here](https://github.com/oliver-moran/jimp/blob/master/packages/jimp/README.md).

### Supported Instructions
The `instructions` argument takes a list of functions to apply to the layer, all of the Jimp operations are support (listed [here](https://github.com/oliver-moran/jimp/blob/master/packages/jimp/README.md)), and are converted into the correct syntax as such:

```javascript
image.posterize( n );             => { apply:'posterize', params:[n] }

image.color([                        { apply:'color', params: [
	{ apply: 'red', params:[10] } =>     { apply: 'red', params:[10] }
]);                                  ]}
```

On top of these functions, FilterJS also supports/overrides the following:

```javascript
//Adjust the gamma
{apply:'gamma', params:[amt]}

//Apply curves, clipped at max and min, and applied to the selected channels
{apply:'curves', params:[start, c1, c2, end, min, max, ch]}

//Adjust the exposure
{apply:'exposure', params:[amt]}

//Add noise with the given strength
{apply:'noise', params:[amt]}

//Adjust the vibrance
{apply:'vibrance', params:[amt]}

//Sharpen the image
{apply:'sharpen', params:[amt]}

//Apply a vignette to the given percentage of the given strength
{apply:'vignette', params:[p, str]}

//Apply sepia
{apply:'sepia', params:[amt]}

//Colorise the image
{apply:'colorise', params:[amt]}

//Fill the image with a given colour
{apply:'fill', params:[rgb]}

//Clip the image on both extremes by the given amount
{apply:'clip', params:[amt]}
```
## Preset Filters
FilterJS supports all the preset filters implemented in [CamanJS](https://github.com/meltingice/CamanJS):

 * Vintage
 * Lomo
 * Clarity
 * Sin City
 * Sunrise
 * Cross Process
 * Orange Peel
 * Love
 * Grungy
 * Jarques
 * Pinhole
 * Old Boot
 * Glowing Sun
 * Hazy Days
 * Her Majesty
 * Nostalgia
 * Hemingway
 * Concentrate
