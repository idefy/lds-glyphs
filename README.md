# LSD glyphs 

This is an open set of glyphs for LDS users who may use them freely. The basic icons have been redrawn and new ones are being added slowly. 
Anyone with talents in glyphs is welcome to submit suggestion or replacement to current glyphs.

**Recommendations**
> These glyphs are designed to be used by the web. They are all packaged and ready to be used.

## Preview
You can see a preview of the glyphs [here](https://rawgit.com/idefy/lds-glyphs/master/dist/sample.html) to preview what it looks like.

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
It uses Fontello to build fonts from SVG files, so I recommend reading how to create valid SVG files [here](https://github.com/fontello/fontello/wiki/How-to-use-custom-images#importing-svg-images) 

#### SVG file convention
- Modify the font with Inkscape. 
- Saved it as simple SVG format.
- Name all glyph with a descriptive name, all lowercased and with dashes for spaces. The name is what defines the css name, so choose wisely.

#### Creating a new glyph
- Use the svg template found in src/template/_template.svg
- Make a copy into the src/assets/ directory and rename it as desired (following rules mentionned above)
- Saved it as simple SVG format.

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