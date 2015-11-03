## gulp project file architecture
A ``Files Architecture`` for normal-sized project using ``gulp``. 

Providings ``watching files``(auto sync pages on different devices when developing) and ``deploy`` tasks.

Compiled sass, minified css, js, and automatically injecting css, js files to html pages.

## How to use
**Step by step:**<br/> 

``$ npm install`` download the gulp dependencies<br/>

``$ gulp help`` to see the main task commands

``$ gulp develop`` watch files and automatically starting the ``browsersync``

``$ gulp deploy`` create directory ``dist/`` and deploy files

## Introcution
**File structures**

```
assets/
|-- images/			
|-- scripts/			
		compiled/		# concated and minified scripts
			maps/
|-- stylesheets/	
		compiled/		# compiled and minified css
			maps/
dist/	
	assets/
	|-- images/			
	|-- scripts/
			app.js
			app.min.js
			maps/
	|-- stylesheets/
			app.css
			app.min.css
			maps/
			
.jshintrc				# jshint config file			
gulpfiles.js			# defined gulp tasks
index.html 		    	# index page of the project
package.json
README.md		
```

## Options
**You can customize the files structure in the file ``gulpfiles.js``**

Below are predefined configurations

**var ``filePath``** and **var ``concatOrder``**

```
/**  configuration */
var filePath = {
    distRoot: 'dist/',
    maps: 'maps/',

    html: './',
    htmlDist: 'dist/',

    css: 'assets/stylesheets/',
    cssCompiled: 'assets/stylesheets/compiled/',
    cssDist: 'dist/assets/stylesheets/',

    js: 'assets/scripts/',
    jsCompiled: 'assets/scripts/compiled/',
    jsDist: 'dist/assets/scripts/',

    img: 'assets/images',
    imgDist: 'dist/assets/images'
};

//  put css files in order, used for concat process
var concatOrder = {
    css: [
        filePath.cssCompiled + 'base.css',
        filePath.cssCompiled + 'main.css'
    ],

    js: [
        filePath.js + 'base.js',
        filePath.js + 'flexible.js',
        filePath.js + 'jquery-2.1.3.min.js',
        filePath.js + 'swiper.js',
        filePath.js + 'main.js'
    ]
};
```
				