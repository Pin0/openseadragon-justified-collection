(function ($) {
    'use strict';

    if (!$.version || $.version.major < 2) {
        throw new Error('This version of OpenSeadragonImagefilters requires OpenSeadragon version 2.0.0+');
    }

    $.World.prototype.arrange = function (options) {
        if (!this.justifiedCollectionInstance || options) {
            options = options || {};
            options.viewer = this;
            this.justifiedCollectionInstance = new $.justifiedCollection(options);
        }
        return this.justifiedCollectionInstance;
    };

    /**
     * @class justifiedCollection
     * @classdesc Provides functionality for arranging images in a justified grid layout
     * @param {Object} options
     */
    $.justifiedCollection = function (options) {
        $.extend(true, this, {
            columns: options.columns || 8,
            tileMargin: options.tileMargin || 0.1,
            showLastRow: options.showLastRow || true
        }, options);

        var ImageRow = new $.Row(this);

        for (var i = 0; i < this.viewer._items.length; i++) {
            var item = this.viewer._items[i];

            //imagerow will set positions of items
            ImageRow.addTileSource(item);
        }

        //draw remaining
        if(this.showLastRow === true){
            ImageRow.draw();    
        }
       
    };

    $.Row = function (world){
        $.extend(true, this, world);

        this.ready = false;
        this.images = []; //temp array of images needed for row buffering
        this.height = 1; //changed based on ratio of row based on first row
        this.resizePercentage = 1;
        this.totalWidth = 0; //after first row we know the total width
        this.firstRow = true; //start with first row
        this.rowWidth = 0; //hold temp rowWidth of each row.
        this.line = 0; //y position of images to position
        this.called = 0;

        //positions rows of images rescales row ti make it fit first row
        this.draw = function() {

            var x = 0;
            this.images.map(function(image){
                image.setHeight(this.height,true);
                image.setPosition({x:x,y:this.line});
                var tileSourceBounds = image.getBounds();
                x = x+tileSourceBounds.width+(this.tileMargin*this.height);
            }, this);


            this.ready = false;
            this.line += this.height+this.tileMargin;
            this.images = [];
            //this.resizePercentage = 1;
            this.rowWidth = 0;
        };

        this.addTileSource = function (tileSource) {
            this.called++;
            if(this.isReady()){
                throw 'Can\'t add tilesource to ready row!';
            }

            //set height of tile to 1, image will change keeping right ratio, images are of equal height in each row
            tileSource.setHeight(1, true);

            var tileSourceBounds = tileSource.getBounds();
            tileSource.ratio = Math.round((tileSourceBounds.width/tileSourceBounds.height)*100) / 100;
            tileSource.width = tileSourceBounds.width;

            this.images.push(tileSource);

            this.rowWidth = this.rowWidth+(tileSource.width)+this.tileMargin;

            //first row based on number of images, based on this the other rows will match it width
            if(this.firstRow === true && this.images.length === this.columns) {
                this.totalWidth = this.rowWidth;
                this.firstRow = false;
                this.ready = true;
                this.draw();
                return;
            }

            if(this.firstRow === false && this.rowWidth >= this.totalWidth ){
                var resizePercentage = this.totalWidth/this.rowWidth; //1200/1300 = 0.92
                this.height = resizePercentage;
                this.ready = true;
                this.draw();
            }
        };

        this.isReady = function() {
            return this.ready;
        };
    };

})(OpenSeadragon);