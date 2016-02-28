/*
* Swill Boilerplate v4.3.1
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2016 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

'use strict';

var         args = require('yargs').argv,
	 browserSync = require('browser-sync'),
		  buffer = require('vinyl-buffer'),
		  config = require('./config.json'),
			 del = require('del'),
			  fs = require('fs'),
		 ghPages = require('gulp-gh-pages'),
			gulp = require('gulp'),
		   merge = require('merge-stream'),
		 plugins = require('gulp-load-plugins')(),
		sequence = require('run-sequence'),
	 spritesmith = require('gulp.spritesmith'),
	   svgSprite = require('gulp-svg-sprite'),
	  vinylPaths = require('vinyl-paths'),
		   Karma = require('karma').Server,
		 jasmine = require('gulp-jasmine'),

//***************************** Path configs *****************************//

basePaths = config.basePaths,

paths = {
	images: {
		src: basePaths.src + basePaths.images.src ,
	   dest: basePaths.dest + basePaths.images.dest,
	  build: basePaths.build + basePaths.images.src
	},

	sprite: {
	  src: basePaths.src + basePaths.images.src + basePaths.sprite.src
	},

	scripts: {
		src: basePaths.src + basePaths.scripts.src,
	   dest: basePaths.dest + basePaths.scripts.dest,
	  build: basePaths.build + basePaths.scripts.dest
	},

	styles: {
		src: basePaths.src + basePaths.styles.src,
	   dest: basePaths.dest + basePaths.styles.dest,
	  build: basePaths.build + basePaths.styles.dest
	}
  },

//******************************* Settings *******************************//

  extensionStyle = 'styl',
  headerProject = fs.readFileSync(basePaths.src + "header-comments.txt", "utf8")

//******************************** Tasks *********************************//

gulp.task('coverall', function(){
  gulp.src('coverage/**/lcov.info')
	.pipe(plugins.coveralls());
});

gulp.task('karma', function (done) {
  new Karma({
	configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('test', function(){
  sequence('karma', 'coverall');
});

gulp.task('styles-helpers', function(){
	 var mixins = gulp.src(paths.styles.src + 'helpers/mixins/*.{styl,scss}')
					.pipe(plugins.concat('_mixins.styl'))
					.pipe(gulp.dest(paths.styles.src + 'helpers'));

  var functions = gulp.src(paths.styles.src + 'helpers/functions/*.{styl,scss}')
					.pipe(plugins.concat('_functions.styl'))
					.pipe(gulp.dest(paths.styles.src + 'helpers'));

  return merge(mixins, functions);
});

gulp.task('styles', function(){
  return  gulp.src([
		  paths.styles.src + '*.styl',
		  '!' + paths.styles.src + '_*.styl'
		])
		.pipe(plugins.plumber())
		.pipe(plugins.stylus({
			'include css': true//,use:[koutoSwiss(), rupture()]
		  })
		  .on('error', function (err) {

			console.log(err.message);

			// If rename the stylus file change here
			plugins.file('styles.css', 'body:before{white-space: pre; font-family: monospace; content: "' + err.message + '";}', { src: true })
			  .pipe(plugins.replace("\\",'/'))
			  .pipe(plugins.replace(/\n/gm,'\\A '))
			  .pipe(plugins.replace("\"",'\''))
			  .pipe(plugins.replace("content: '",'content: "'))
			  .pipe(plugins.replace("';}",'";}'))
			  .pipe(gulp.dest(paths.styles.dest))
			  .pipe(plugins.rename({suffix: '.min'}))
			  .pipe(gulp.dest(paths.styles.dest));
		  })
		)
		.pipe(plugins.autoprefixer({
		  browsers: config.autoprefixerBrowsers
		}))
		.pipe(plugins.wrapper({
		  header: headerProject + '\n'
		}))
		.pipe(plugins.if(config.lintCSS, plugins.csslint('./.csslintrc')))
		.pipe(plugins.if(config.lintCSS, plugins.csslint.reporter()))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(plugins.csso())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(plugins.notify({message: 'Styles task complete', onLast: true}));
});

// Generate Bitmap Sprite
gulp.task('bitmap-sprite', function () {
  var sprite = gulp.src(paths.sprite.src + '**/*.png')
		  .pipe(plugins.plumber())
		  .pipe(
			spritesmith({
			  imgName: 'bitmap-sprite.png',
			  cssName: "_bitmap-sprite." + extensionStyle,
			  cssOpts: {
				cssSelector: function (item) {
				  if (item.name.indexOf('~hover') !== -1) {
					return '.icon-' + item.name.replace('~hover', ':hover');
				  }
				  else {
					return '.icon-' + item.name;
				  }
				}
			  },
			  imgPath: '../' + basePaths.images.dest + 'bitmap-sprite.png',
			  padding: 2,
			  algorithm: 'top-down'
			})
		  );

  sprite.img
	.pipe(buffer())
	.pipe(plugins.imagemin())
	.pipe(gulp.dest(paths.images.dest));
  sprite.css
	.pipe(gulp.dest(paths.styles.src + 'helpers'))
	.pipe(plugins.notify({message: 'Bitmap sprite task complete', onLast: true}));

  return sprite;
});

// Generate SVG Sprite
gulp.task('vetor-sprite', function() {
  var spriteOptions = {
		  shape: {
			spacing: {
			  padding: 2
			}
		  },
		  mode : {
			css : {
			  prefix: ".icon-%s",
			  dest: './',
			  sprite: '../' + basePaths.images.dest + 'vetor-sprite.svg',
			  layout: 'vertical',
			  bust: false,
			  render: {}
			},
		  }
		};

  spriteOptions.mode.css.render[extensionStyle] =  {};

  spriteOptions.mode.css.render[extensionStyle].dest =  '../../' + paths.styles.src + 'helpers/_vetor-sprite.' + extensionStyle;

  return gulp.src(paths.sprite.src + '*.svg')
		.pipe(plugins.plumber())
		.pipe(svgSprite(spriteOptions))
		.pipe(gulp.dest(paths.images.dest))
		.pipe(plugins.notify({message: 'SVG sprite task complete', onLast: true}));
});

//Fallback convert SVG to PNG
gulp.task('svg2png', function () {
  return gulp.src(paths.images.dest + 'vetor-sprite.svg')
		.pipe(plugins.plumber())
		.pipe(plugins.svg2png())
		.pipe(gulp.dest(paths.images.dest));
});

// Optimize Images
gulp.task('images', function () {
  var images = gulp.src([
		  paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
		  '!' + paths.sprite.src + '**/*',
		])
		.pipe(plugins.plumber())
		.pipe(plugins.newer(paths.images.dest))
		.pipe(plugins.imagemin({optimizationLevel: 5, progressive: true}))
		.pipe(gulp.dest(paths.images.dest));

  var svg = gulp.src([
		  paths.images.src + '**/*.svg',
		  '!' + paths.sprite.src + '**/*'
		])
		.pipe(plugins.plumber())
		.pipe(plugins.newer(paths.images.dest))
		.pipe(plugins.svg2png())
		.pipe(gulp.dest(paths.images.dest))
		.pipe(plugins.notify({message: 'Images task complete', onLast: true}));

  return merge(images, svg)
});


// Concatenate vendor scripts and Minify
gulp.task('vendor-scripts', function () {
  return gulp.src([
		  '!' + paths.scripts.src + '**/*_IGNORE.js',
		  paths.scripts.src + 'settings/google_analytics.js',
		  paths.scripts.src + 'settings/*.js'
		])
		.pipe(plugins.plumber())
		.pipe(plugins.concat('vendors.js'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(plugins.rename('vendors.min.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.scripts.dest));
});

// Concatenate and Minify Main Scripts
gulp.task('scripts', function () {
  var angular = gulp.src([
			  paths.scripts.src + 'angular/**/*.js'
			])
			.pipe(plugins.plumber())
			.pipe(plugins.cached('angular'))
			.pipe(plugins.remember('angular'))
			.pipe(plugins.plumber())
			.pipe(plugins.if(config.lintJS, plugins.eslint()))
			.pipe(plugins.if(config.lintJS, plugins.eslint.format()))
			.pipe(plugins.if(
			  config.es6,
			  plugins.babel({
				presets: ['es2015']
			  })
			))
			.pipe(plugins.concat('angular.js'))
			.pipe(plugins.wrapper({
			  header: headerProject + '\n'
			}))
			.pipe(gulp.dest(paths.scripts.dest))
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(plugins.uglify())
			.pipe(gulp.dest(paths.scripts.dest));

  var concatenate = gulp.src([
			  '!' + paths.scripts.src + '**/*_SEPARATE.js',
			  '!' + paths.scripts.src + '**/*_IGNORE.js',
			  paths.scripts.src + '*.js'
			])
			.pipe(plugins.plumber())
			.pipe(plugins.cached('scripts'))
			.pipe(plugins.remember('scripts'))
			.pipe(plugins.plumber())
			.pipe(plugins.if(config.lintJS, plugins.eslint()))
			.pipe(plugins.if(config.lintJS, plugins.eslint.format()))
			.pipe(plugins.if(
			  config.es6,
			  plugins.babel({
				presets: ['es2015']
			  })
			))
			.pipe(plugins.concat('scripts.js'))
			.pipe( plugins.if(
			  config.jQuery,
			  plugins.wrapper({
				header: 'jQuery(document).ready(function($) {\n\n',
				footer: '\n});'
			  })
			))
			.pipe(plugins.wrapper({
			  header: headerProject + '\n'
			}))
			.pipe(gulp.dest(paths.scripts.dest))
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(plugins.uglify())
			.pipe(gulp.dest(paths.scripts.dest));


	   var copy = gulp.src([
			  paths.scripts.src + '/*_SEPARATE.js'
			])
			.pipe(plugins.plumber())
			.pipe(plugins.newer(paths.scripts.dest))
			.pipe(plugins.plumber())
			.pipe(plugins.if(config.lintJS, plugins.eslint()))
			.pipe(plugins.if(config.lintJS, plugins.eslint.format()))
			.pipe(plugins.rename(function(path){
			  path.basename = path.basename.substring(0,  path.basename.length -9)
			}))
			.pipe(plugins.wrapper({
			  header: headerProject + '\n'
			}))
			.pipe(gulp.dest(paths.scripts.dest))
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(plugins.uglify({
			  preserveComments: 'some'
			}))
			.pipe(gulp.dest(paths.scripts.dest))
			.pipe(plugins.notify({message: 'Scripts task complete', onLast: true}));

  return merge(angular, concatenate, copy);
});

// Copy Files to Build
gulp.task('copy', function () {
  var  assets  = {searchPath: basePaths.dest};

  // Minify and Copy HTML
  var  html    = gulp.src([
			basePaths.dest + '**/*.{html,php}',
			'!' + basePaths.bower + '{,/**}'
		  ])
			.pipe(plugins.useref(assets))
			.pipe(plugins.if('*.js', plugins.uglify()))
			.pipe(plugins.if('*.css', plugins.csso()))
			.pipe(plugins.if('*.html', plugins.htmlmin({collapseWhitespace: true, spare:true, empty: true, conditionals: true})))
			.pipe(plugins.if('*.php', plugins.htmlmin({collapseWhitespace: true, spare:true, empty: true, conditionals: true})))
			.pipe(gulp.dest(basePaths.build));

  // Copy All Other files except HTML, PHP, CSS e JS Files
  var allFiles = gulp.src([
			  '!' + basePaths.bower + '{,/**}',
			  basePaths.dest + '**/*',
			  '!' + paths.styles.dest + '**/*',
			  '!' + paths.scripts.dest + '**/*',
			  '!' + basePaths.dest + '**/*.{html,php}'
			], {dot: true})
			.pipe(gulp.dest(basePaths.build));

  return merge(html, allFiles);
});


gulp.task('outdatedbrowser', function(){
  if(!config.outdatedBrowser){

  }else{
	return gulp.src(basePaths.bower + '/outdated-browser/outdatedbrowser/lang/*')
					.pipe(gulp.dest(basePaths.dest + 'lang/outdated_browser'));

  }
})

//Set the use of components
gulp.task('set-dependencies', ['outdatedbrowser'], function(){


  var bower_path = gulp.src('./.bowerrc')
			.pipe(plugins.replace(/"directory" : "[a-z\/_]+"/g, '"directory" : "' + basePaths.bower + '"'))
			.pipe(gulp.dest('./'));


  var styles_var = gulp.src(paths.styles.src + '**/*.{styl,sass,scss}')
			.pipe(plugins.replace(/(image-path[\s=:]+ ")[.\/a-z]+"/g, '$1../' + basePaths.images.dest + '"'))
			.pipe(plugins.replace(/(font-path[\s=:]+ ")[.\/a-z]+"/g, '$1../' + basePaths.fonts.dest + '"'))
			.pipe(gulp.dest(paths.styles.src));

});

//*************************** Utility Tasks ******************************//

gulp.task('setup', function(cb){
  sequence('set-dependencies', cb);
});

gulp.task('combine-assets', function () {
  var assets   =  {searchPath: basePaths.dest};

  // Minify and Copy HTML
  return  gulp.src(basePaths.dest + '**/*.{html,php}')
		  .pipe(plugins.useref(assets))
		  .pipe(plugins.if('*.js', plugins.uglify()))
		  .pipe(plugins.if('*.css', plugins.csso()))
		  .pipe(gulp.dest(basePaths.dest));
});

// Clean Directories
gulp.task('clean', function (cb) {
  return del([
	  basePaths.build,
	  paths.styles.dest,
	  paths.scripts.dest,
	  paths.styles.src + 'helpers/_bitmap-sprite.{styl,scss}',
	  paths.styles.src + 'helpers/_vetor-sprite.{styl,scss}',
	  paths.images.dest + '**/*',
	  // Add here the folders that will not be deleted in public/img
	  '!' + paths.images.dest + 'copyright{,**/*{,**/*}}',
	  '!' + paths.images.dest + 'logos{,**/*{,**/*}}'
	], cb)
});

//***************************** Main Tasks *******************************//

// Serve the project and watch
gulp.task('serve', function () {
  browserSync(config.browserSync);

  gulp.watch([
		paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
		'!' + paths.sprite.src + '**/*'
	  ],

	  ['images', browserSync.reload]
	 );

  gulp.watch(
	  paths.sprite.src + '**/*.{png,gif}',

	  ['bitmap-sprite', browserSync.reload]
	);

  gulp.watch(
	  paths.sprite.src + '**/*.svg',

	  ['vetor-sprite', 'styles', browserSync.reload]
	);

  gulp.watch(
	  paths.images.dest + 'vetor-sprite.svg',

	  ['svg2png', browserSync.reload]
	);

  gulp.watch([
		paths.scripts.src + 'angular/**/*.js',
		paths.scripts.src + '*.js'
	  ],

	  ['scripts', browserSync.reload]
	);

  gulp.watch([
		paths.scripts.src + 'vendor/**/*.js',
		paths.scripts.src + 'settings/**/*.js'
	  ],

	  ['vendor-scripts', browserSync.reload]
	);

  gulp.watch([
	  paths.styles.src + '**/*.{styl,scss,sass}',
	  '!' + paths.styles.src + 'helpers/mixins/*.{styl,scss,sass}',
	  '!' + paths.styles.src + 'helpers/functions/*.{styl,scss,sass}'],

	  ['styles', browserSync.reload]
	);

  gulp.watch([
	  paths.styles.src + 'helpers/mixins/*.{styl,scss,sass}',
	  paths.styles.src + 'helpers/functions/*.{styl,scss,sass}'],

	  ['styles-helpers']
	);

  gulp.watch(basePaths.dest + '**/*.{html,php,json}', browserSync.reload);
});

// Clean, compile, watch and serve project
gulp.task('default', function () {
  if(args.compile === true){
	sequence('clean', ['images', 'bitmap-sprite', 'vetor-sprite', 'styles-helpers', 'vendor-scripts'], 'svg2png', 'styles', 'scripts', 'serve');

  }else{
	gulp.start('serve');
  }
});

// Clean and compile the project
gulp.task('compile', function () {
  sequence('clean', ['images', 'bitmap-sprite', 'vetor-sprite', 'styles-helpers', 'vendor-scripts'], 'svg2png', 'styles', 'scripts');
});

gulp.task('gh', function() {
 return gulp.src( basePaths.build + '**/*')
   .pipe(ghPages());
});

// Build the project and push the builded folder to gh-pages branch
gulp.task('ghpages', function() {
  sequence(['images', 'bitmap-sprite', 'vetor-sprite', 'styles-helpers', 'vendor-scripts'], 'svg2png', 'styles', 'scripts', 'copy', 'gh');
});

// Build Project and serve if pass the parameter --serve
gulp.task('build', ['clean'], function () {
  sequence(['images', 'bitmap-sprite', 'vetor-sprite', 'styles-helpers', 'vendor-scripts'], 'svg2png', 'styles', 'scripts', 'copy', function(){
	  if(args.serve === true){
		browserSync(config.browserSyncBuild);
	  }
	});
});
