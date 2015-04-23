import luxe.Rectangle;
import luxe.Vector;
import luxe.Input;
import luxe.Color;
import phoenix.Texture;
import phoenix.geometry.CircleGeometry;

import luxe.tilemaps.Tilemap;
import luxe.tilemaps.Isometric;
import luxe.tilemaps.Ortho;

import luxe.importers.tiled.TiledMap;
import luxe.importers.tiled.TiledObjectGroup;


class Main extends luxe.Game {


	var tiled_ortho : TiledMap;
	var batcher : phoenix.Batcher;


 override function ready() {

 	Luxe.renderer.clear_color = new Color().rgb(0xaf663a);

    load_ortho_tiledmap();

 }//ready




 function load_ortho_tiledmap() {

        //try these, but remove the format:'json' or set to format:'xml'
        //'assets/tiles_base64_zlib.tmx'
        //'assets/tiles_base64.tmx'
        //'assets/tiles_csv.tmx'
        Luxe.loadText('assets/tiles_base64.tmx', function(res){

            var scale = 3;

                //create from xml file, with various encodings, or from JSON
            tiled_ortho = new TiledMap( { tiled_file_data:res.text, format:'xml', pos : new Vector(512,0) } );

                //tell the map to display
            tiled_ortho.display({ scale:scale, grid:false, filter:FilterType.nearest });
            
        });

    } //load_ortho_tiledmap

	}//main