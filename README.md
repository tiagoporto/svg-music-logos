[![David](https://img.shields.io/david/tiagoporto/svg-music-logos.svg?style=flat-square)](https://david-dm.org/tiagoporto/svg-music-logos)
[![David](https://img.shields.io/david/dev/tiagoporto/svg-music-logos.svg?style=flat-square)](https://david-dm.org/tiagoporto/svg-music-logos?type=dev)


# SVG Music Logos
![Artists links](https://img.shields.io/travis/tiagoporto/svg-music-logos.svg?style=flat-square&label=Artists%20links)
![Total Artists](https://img.shields.io/badge/artists-174-blue.svg?style=flat-square)
![Total Logos](https://img.shields.io/badge/logos-316-blue.svg?style=flat-square)

A collection of logos and symbols from bands, musicians and related in SVG.

## Contributing

> Don't have the logo that you are looking for?

1. Fork it!
1. Create the SVG file.
    1. SVG Tutorial: [How to work with SVG icons](http://fvsch.com/code/svg-icons/how-to/).
    1. Use [SVGOMG](https://jakearchibald.github.io/svgomg/) to minify the SVG file.

        <img src="dist/img/svgomg-settings.png" align="top" alt="">

    1. Remove ids.
    1. Use [BEM — Block Element Modifier](https://bem.info/) for naming classes
1. Put in folder `dist/logos`.
    1. Use the file naming convention
        1. Lower case: `band.svg`
        1. Separate compound name by using a hyphen `band-name.svg`
1. Add the logo and necessary info on `dist/data.json`.
1. Commit your changes: `git commit -am 'Add some Logo'`
1. Push to the branch: `git push origin master`
1. Submit a pull request :D