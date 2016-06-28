### Openseadragon plugin for arranging collections in a justified grid layout.

 Much like <a href="https://github.com/flickr/justified-layout">flickr</a> does.

 <a href="https://pin0.github.io/openseadragon-justified-collection/">Demo</a>

 Requires <a href="http://openseadragon.github.io/">OpenSeadragon</a>

 ### Usage
Include dist/openseadragon-justified-collection.min.js after openseadragon

Add images to your viewer

And call viewer.world.arange(); when you need it.

You can provide some options like margin and columns.
```javascript
viewer.world.arange({margin:0.05, columns:5, showLastRow:true});
```


Example:
```javascript
    <script type="text/javascript">

        var imageSources = [];
        var chosenImage = '';

        var img1 = 'https://openseadragon.github.io/example-images/highsmith/highsmith.dzi';
        var img2 = 'https://openseadragon.github.io/example-images/duomo/duomo.dzi';

        //50 random images
        for(var i = 0; i <= 50; i++){
            chosenImage = Math.random() < 0.5 ? img1 : img2;
            imageSources.push(chosenImage)
        }

        var viewer = OpenSeadragon({
            id: "osd",
            prefixUrl: "images/",
            crossOriginPolicy: 'Anonymous',
            viewportMargins: {top:10, left: 10, right: 10, bottom: 10},
            tileSources: imageSources
        });

        viewer.addHandler('open', function() {
            viewer.world.arrange();
            viewer.viewport.goHome(true);
        });
    </script>
```




