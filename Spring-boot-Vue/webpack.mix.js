const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/main/resources/assets/js/admin.js', 'src/main/resources/static/js')
   .sass('src/main/resources/assets/sass/app.scss', 'src/main/resources/static/css')
   .sass('src/main/resources/assets/sass/dropzone.scss', 'src/main/resources/static/css');