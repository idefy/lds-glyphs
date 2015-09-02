module.exports = function() {
    
	var glyphs = './src/';
	var svg = 'lds-glyphs.svg';
	var dist = './dist/';
	var temp = './.tmp/';
	

    var config = {
        /**
         * File paths
         */
		glyphs: glyphs,
		svg: svg,
		dist: dist,
		build: dist + 'glyphs/',
		sample: dist + 'sample/',
		html: glyphs + 'sample.html',
		css: glyphs + 'lds-glyphs.css',
		jsonData: temp + 'lds-glyphs.json',
		temp: temp
    };

    return config;
};
