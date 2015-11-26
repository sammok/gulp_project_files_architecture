## gulp project file architecture
A ``Files Architecture`` for common project using ``gulp``. 

Providings ``watching files``(auto sync pages on different devices when developing) and ``deploy`` tasks.

Compiled sass, concate and minify for ``css`` ``js`` to be single file, 

And automatically injecting css, js files into html pages.

Preset responsive lib, and swiper.js for mobile projects

## How to use
**Step by step:**<br/> 

``$ npm install`` download the gulp dependencies<br/>

``$ gulp help`` to see the task commands

``$ gulp develop`` watch files and automatically run the ``browsersync``

``$ gulp deploy`` create directory ``dist/`` in the root path and deploy files

## Introcution
**File structures**

```
assets/
|-- images/			
|-- scripts/
	        main.js         # main js
	        flexible.js		# responsive lib using rem, https://github.com/amfe/lib-flexible
	        swiper.js		# popular slider plugin, good supported for mobile and PC pages.  http://www.idangero.us/swiper
	        ----------------------------------------------
            after compiled (auto create addition below):
            app.js          # concated
            app.min.js
			maps/
|-- stylesheets/
            base.scss       # reset styles, useful styles
            swiper.min.css  # swiper.js styles
            main.scss       # main styles
            ----------------------------------------------
            after compiled (auto create addition below):
			app.css         # concated
			app.min.css
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

## Configurations
**Change the page psd width for [flexible.js](https://github.com/amfe/lib-flexible) plugin  in ``assets/stylesheets/main.scss``**

    /* psd width `divided` 10, if your psd width is 750, so set ``$page-base-rem`` to 75 */
    /* main.scss provided it */
    $page-base-rem: 75; 

---

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

    css: 'assets/stylesheets/',             # sass files path
    cssCompiled: 'assets/stylesheets/',              # compiled sass path, must be same with filePath.css in this version
    cssDist: 'dist/assets/stylesheets/',    # dist path

    js: 'assets/scripts/',                  # js files path
    jsCompiled: 'assets/scripts/',                # compiled js path
    jsDist: 'dist/assets/scripts/',         # dist path

    img: 'assets/images',
    imgDist: 'dist/assets/images'
};

//  put files in order, used for concat process
var concatOrder = {
    css: [
        filePath.cssCompiled + 'base.css',
        filePath.cssCompiled + 'swiper.min.css',
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



