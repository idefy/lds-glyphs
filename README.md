# LSD glyphs 1.0 

This is an open set of glyphs for LDS users who may use them freely. The basic icons have been redrawn and new ones are being added slowly. 
Anyone with talents in glyphs is welcome to submit suggestion or replacement to current glyphs.

**Recommendations**
> These glyphs are designed to be used by the web. They are all packaged and ready to be used.

## Preview
You can see a preview of the glyphs [here](https://rawgit.com/idefy/lds-glyphs/master/dist/sample/sample.html) to preview what it looks like.

## Install
`bower install lds-glyphs`

## Usage
Just add the fonts and the css file found in dist/glyphs directory.

### Include the style sheet in your html file
    <link rel="stylesheet" type="text/css" href="./glyphs/lds-glyphs.css"></link>

### Use it in your HTML
	<span class="ldsg ldsg-moroni-statue"></span>

## CDN
If this glyph library becomes popular enough, then I hope to upgrade it to a CDN. But for now there is none.

## Getting involved
A list of things to add is maintained [here](todo.md).

If you want to get involved and help this glyph library grow, then you can fork and create pull requests on this library.

Optionnaly, if you are not familiar with how GIT works, you can just send me a SVG file containing the glyphs you think should be added or modified.

### How to add/modify a SVG font
Soon I will add an in depth tutorial, for now you can read what follows.

#### Prerequisites
You will [inkscape](https://inkscape.org/) to manipulates svg font files.

#### Basic tutorial
Not the best tutorial, but covers all the basics : [youtube video here](https://www.youtube.com/watch?v=_KX-e6sijGE)

#### SVG file convention
- Modify the font with Inkscape. 
- Name all glyph with a descriptive name and prefixed with ldsg- . All lowercased and with dashes for spaces.
Do not add new caracters because they follow UTF the glyphs standards and I want to keep it that way. Use any of the numbered glyphs, eg. ldsg-e102. This is what defines the css name, so choose wisely.


### Testing it localy
Provided that you've installed nodejs, run :

	npm install

Then to test as you modify:

	gulp serve

Or to just package the font:

	gulp glyph

Serve and glyph will create the different font formats, the css and the sample.html file for you.

## Changelog
The detailed changelog can be viewed [here](changelog.md)