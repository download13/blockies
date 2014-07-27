Blockies
=========

A tiny library for generating blocky identicons.

![Sample blockies image](sample.png "Blockies")


Use
---

```javascript
var icon = blockies.create({ // All options are optional
    seed: 'randstring', // seed used to generate icon data, default: random
    color: '#dfe', // to manually specify the icon color, default: random
    size: 15, // width/height of the icon in blocks, default: 10
    scale: 3 // width/height of each block in pixels, default: 5
});

document.body.appendChild(icon); // icon is a canvas element
```

In the above example the icon will be 15x15 blocks, and each block will be 3x3 pixels. The icon canvas will be 45x45 pixels.


Notes
-----

The defaults of size 10 and scale 5 generate 50x50 pixel icons. Below are some standard sizes that work well.
 * 24x24 `{size: 8, scale: 3}`
 * 48x48 `{size: 12, scale: 4}`


Build
-----

    node build
All this does is minify `blockies.js` to `blockies.min.js`.


License
-------

[WTFPL](http://www.wtfpl.net/)
