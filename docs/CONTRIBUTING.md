# Guidelines to contribute

If you could not find the logo you were looking for, please either open an issue or contribute by adding it to the project!

## Guide to open a pull request

1. Fork it!
1. Create your feature branch: `git checkout -b new-{artist}-logo`
1. Add [new logo](https://github.com/tiagoporto/svg-music-logos/tree/main#adding-new-logos) or [new artist](https://github.com/tiagoporto/svg-music-logos/tree/main#adding-new-artists)
1. Create the SVG file.
   - **TIPS**
     - SVG Tutorial: [How to work with SVG icons](https://fvsch.com/svg-icons).
     - Use at least 3 decimal places to improve precision.
     - Let the SVG scale, avoid using `width` and `height`.
       ```diff
       <svg
       - width="200"
       - height="40">
       + viewBox="0 0 200 40"
       >
       ```
     - Do not use `<image/>`
     - Do not use `<text/>`
     - Use [SVGOMG](https://jakearchibald.github.io/svgomg/) to clean up the SVG removing unncessary attributes and prettify.
1. Run the project locally and check if it works as expected. [Check the steps](https://github.com/tiagoporto/svg-music-logos/tree/main#development-).
1. Commit your changes: `git commit -am 'Add {Artist} Logo'`
1. Push to the branch: `git push origin new-{artist}-logo`
1. Submit a pull request :D

<p align="center">Thanks for your contribution!</p>
<p align="center">❤️</p>
