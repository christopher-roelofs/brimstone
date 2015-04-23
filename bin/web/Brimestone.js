(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var Luxe = function() { };
$hxClasses["Luxe"] = Luxe;
Luxe.__name__ = ["Luxe"];
Luxe.__properties__ = {set_alpha:"set_alpha",get_alpha:"get_alpha",set_cur_frame_start:"set_cur_frame_start",get_cur_frame_start:"get_cur_frame_start",set_current_time:"set_current_time",get_current_time:"get_current_time",set_last_frame_start:"set_last_frame_start",get_last_frame_start:"get_last_frame_start",set_delta_sim:"set_delta_sim",get_delta_sim:"get_delta_sim",set_dt:"set_dt",get_dt:"get_dt",set_max_frame_time:"set_max_frame_time",get_max_frame_time:"get_max_frame_time",set_update_rate:"set_update_rate",get_update_rate:"get_update_rate",set_fixed_delta:"set_fixed_delta",get_fixed_delta:"get_fixed_delta",set_timescale:"set_timescale",get_timescale:"get_timescale",get_screen:"get_screen",get_time:"get_time",get_snow:"get_snow"}
Luxe.on = function(event,handler) {
	Luxe.core.emitter.on(event,handler,{ fileName : "Luxe.hx", lineNumber : 86, className : "Luxe", methodName : "on"});
};
Luxe.off = function(event,handler) {
	return Luxe.core.emitter.off(event,handler,{ fileName : "Luxe.hx", lineNumber : 91, className : "Luxe", methodName : "off"});
};
Luxe.shutdown = function() {
	Luxe.core.shutdown();
};
Luxe.showConsole = function(_show) {
	Luxe.core.show_console(_show);
};
Luxe.loadJSON = function(_id,_onload) {
	if(Luxe.resources.json.exists(_id)) {
		haxe.Log.trace("     i / luxe / " + ("loadJSON - return existing " + _id),{ fileName : "Luxe.hx", lineNumber : 114, className : "Luxe", methodName : "loadJSON"});
		var res = Luxe.resources.find_json(_id);
		if(_onload != null) _onload(res);
		return res;
	}
	var res1 = new luxe.resource.JSONResource(_id,null,Luxe.resources);
	snow.system.assets.AssetText.load(Luxe.core.app.assets,_id).then(function(_asset) {
		res1.json = JSON.parse(_asset.text);
		if(_onload != null) _onload(res1);
		Luxe.resources.cache(res1);
	});
	return res1;
};
Luxe.loadText = function(_id,_onload) {
	if(Luxe.resources.text.exists(_id)) {
		haxe.Log.trace("     i / luxe / " + ("loadText - return existing " + _id),{ fileName : "Luxe.hx", lineNumber : 144, className : "Luxe", methodName : "loadText"});
		var res = Luxe.resources.find_text(_id);
		if(_onload != null) _onload(res);
		return res;
	}
	var res1 = new luxe.resource.TextResource(_id,null,Luxe.resources);
	snow.system.assets.AssetText.load(Luxe.core.app.assets,_id).then(function(_asset) {
		res1.text = _asset.text;
		if(_onload != null) _onload(res1);
		Luxe.resources.cache(res1);
	});
	return res1;
};
Luxe.loadData = function(_id,_onload) {
	if(Luxe.resources.data.exists(_id)) {
		haxe.Log.trace("     i / luxe / " + ("loadData - return existing " + _id),{ fileName : "Luxe.hx", lineNumber : 175, className : "Luxe", methodName : "loadData"});
		var res = Luxe.resources.find_data(_id);
		if(_onload != null) _onload(res);
		return res;
	}
	var res1 = new luxe.resource.DataResource(_id,null,Luxe.resources);
	snow.system.assets.AssetBytes.load(Luxe.core.app.assets,_id).then(function(_asset) {
		res1.data = _asset.bytes;
		if(_onload != null) _onload(res1);
		Luxe.resources.cache(res1);
	});
	return res1;
};
Luxe.loadSound = function(_name,_id,_is_music,_onload) {
	if(_is_music == null) _is_music = false;
	if(Luxe.resources.sounds.exists(_id)) {
		haxe.Log.trace("     i / luxe / " + ("loadSound - return existing " + _id),{ fileName : "Luxe.hx", lineNumber : 206, className : "Luxe", methodName : "loadSound"});
		var res = Luxe.resources.find_sound(_id);
		if(_onload != null) _onload(res);
		return res;
	}
	Luxe.audio.create(_id,_name,_is_music);
	var res1 = new luxe.resource.SoundResource(_id,_name,Luxe.resources);
	if(_onload != null) _onload(res1);
	Luxe.resources.cache(res1);
	return res1;
};
Luxe.loadTexture = function(_id,_onload,_silent) {
	if(_silent == null) _silent = false;
	return phoenix.Texture.load(_id,_onload,_silent);
};
Luxe.loadTextures = function(_ids,_onload,_silent) {
	if(_silent == null) _silent = false;
	var total_count = _ids.length;
	var loaded_count = 0;
	var loaded = [];
	var on_single_texture_complete = function(texture) {
		loaded.push(texture);
		loaded_count++;
		if(loaded_count == total_count) _onload(loaded);
	};
	var _g = 0;
	while(_g < _ids.length) {
		var _id = _ids[_g];
		++_g;
		Luxe.loadTexture(_id,on_single_texture_complete,_silent);
	}
};
Luxe.loadFont = function(_id,_texture_path,_onload,_silent) {
	if(_silent == null) _silent = false;
	if(Luxe.resources.fonts.exists(_id)) {
		haxe.Log.trace("     i / luxe / " + ("loadFont - return existing " + _id),{ fileName : "Luxe.hx", lineNumber : 263, className : "Luxe", methodName : "loadFont"});
		var res = Luxe.resources.find_font(_id);
		if(_onload != null) _onload(res);
		return res;
	}
	return phoenix.BitmapFont.load({ id : _id, texture_path : _texture_path, onload : _onload, silent : _silent});
};
Luxe.loadShader = function(_ps_id,_vs_id,_onload,_silent) {
	if(_silent == null) _silent = false;
	if(_vs_id == null) _vs_id = "default";
	if(_ps_id == null) _ps_id = "default";
	var _id = "" + _ps_id + "|" + _vs_id;
	if(Luxe.resources.shaders.exists(_id)) {
		haxe.Log.trace("     i / luxe / " + ("loadShader - return existing " + _id),{ fileName : "Luxe.hx", lineNumber : 280, className : "Luxe", methodName : "loadShader"});
		var res = Luxe.resources.find_shader(_id);
		if(_onload != null) _onload(res);
		return res;
	}
	return phoenix.Shader.load(_ps_id,_vs_id,_onload,_silent);
};
Luxe.get_snow = function() {
	return Luxe.core.app;
};
Luxe.get_screen = function() {
	return Luxe.core.screen;
};
Luxe.get_time = function() {
	return snow.Snow.core.timestamp();
};
Luxe.get_timescale = function() {
	return Luxe.core.timescale;
};
Luxe.get_fixed_delta = function() {
	return Luxe.core.fixed_delta;
};
Luxe.get_update_rate = function() {
	return Luxe.core.update_rate;
};
Luxe.get_max_frame_time = function() {
	return Luxe.core.max_frame_time;
};
Luxe.get_dt = function() {
	return Luxe.core.delta_time;
};
Luxe.get_delta_sim = function() {
	return Luxe.core.delta_sim;
};
Luxe.get_last_frame_start = function() {
	return Luxe.core.last_frame_start;
};
Luxe.get_current_time = function() {
	return Luxe.core.current_time;
};
Luxe.get_cur_frame_start = function() {
	return Luxe.core.cur_frame_start;
};
Luxe.get_alpha = function() {
	return Luxe.core.alpha;
};
Luxe.set_timescale = function(value) {
	return Luxe.core.timescale = value;
};
Luxe.set_fixed_delta = function(value) {
	return Luxe.core.fixed_delta = value;
};
Luxe.set_update_rate = function(value) {
	return Luxe.core.update_rate = value;
};
Luxe.set_max_frame_time = function(value) {
	return Luxe.core.max_frame_time = value;
};
Luxe.set_dt = function(value) {
	return Luxe.core.delta_time = value;
};
Luxe.set_delta_sim = function(value) {
	return Luxe.core.delta_sim = value;
};
Luxe.set_last_frame_start = function(value) {
	return Luxe.core.last_frame_start = value;
};
Luxe.set_current_time = function(value) {
	return Luxe.core.current_time = value;
};
Luxe.set_cur_frame_start = function(value) {
	return Luxe.core.cur_frame_start = value;
};
Luxe.set_alpha = function(value) {
	return Luxe.core.alpha = value;
};
var _Luxe = {};
_Luxe.Ev_Impl_ = function() { };
$hxClasses["_Luxe.Ev_Impl_"] = _Luxe.Ev_Impl_;
_Luxe.Ev_Impl_.__name__ = ["_Luxe","Ev_Impl_"];
var LuxeApp = function() { };
$hxClasses["LuxeApp"] = LuxeApp;
LuxeApp.__name__ = ["LuxeApp"];
LuxeApp.main = function() {
	LuxeApp._conf = { window : { width : 960, height : 640, fullscreen : false, resizable : true, borderless : false, title : "luxe app"}};
	LuxeApp._snow = new snow.Snow();
	LuxeApp._game = new Main();
	LuxeApp._core = new luxe.Core(LuxeApp._game,LuxeApp._conf);
	var _snow_config = { has_loop : true, config_custom_assets : false, config_custom_runtime : false, config_runtime_path : "config.json", config_assets_path : "manifest", app_package : "com.Brimstone"};
	LuxeApp._snow.init(_snow_config,LuxeApp._core);
};
var luxe = {};
luxe.Emitter = function() {
	this._checking = false;
	this._to_remove = new List();
	this.connected = new List();
	this.bindings = new haxe.ds.IntMap();
};
$hxClasses["luxe.Emitter"] = luxe.Emitter;
luxe.Emitter.__name__ = ["luxe","Emitter"];
luxe.Emitter.prototype = {
	emit: function(event,data,pos) {
		this._check();
		var list = this.bindings.get(event);
		if(list != null && list.length > 0) {
			var _g = 0;
			while(_g < list.length) {
				var handler = list[_g];
				++_g;
				handler(data);
			}
		}
		this._check();
	}
	,on: function(event,handler,pos) {
		this._check();
		if(!this.bindings.exists(event)) {
			this.bindings.set(event,[handler]);
			this.connected.push({ handler : handler, event : event, pos : pos});
		} else {
			var list = this.bindings.get(event);
			if(HxOverrides.indexOf(list,handler,0) == -1) {
				list.push(handler);
				this.connected.push({ handler : handler, event : event, pos : pos});
			}
		}
	}
	,off: function(event,handler,pos) {
		this._check();
		var success = false;
		if(this.bindings.exists(event)) {
			this._to_remove.push({ event : event, handler : handler});
			var $it0 = this.connected.iterator();
			while( $it0.hasNext() ) {
				var _info = $it0.next();
				if(_info.event == event && _info.handler == handler) this.connected.remove(_info);
			}
			success = true;
		}
		return success;
	}
	,connections: function(handler) {
		var list = [];
		var $it0 = this.connected.iterator();
		while( $it0.hasNext() ) {
			var _info = $it0.next();
			if(_info.handler == handler) list.push(_info);
		}
		return list;
	}
	,_check: function() {
		if(this._checking) return;
		this._checking = true;
		if(this._to_remove.length > 0) {
			var $it0 = this._to_remove.iterator();
			while( $it0.hasNext() ) {
				var _node = $it0.next();
				var list = this.bindings.get(_node.event);
				HxOverrides.remove(list,_node.handler);
				if(list.length == 0) this.bindings.remove(_node.event);
			}
			this._to_remove = null;
			this._to_remove = new List();
		}
		this._checking = false;
	}
	,__class__: luxe.Emitter
};
luxe.Game = function() {
	luxe.Emitter.call(this);
};
$hxClasses["luxe.Game"] = luxe.Game;
luxe.Game.__name__ = ["luxe","Game"];
luxe.Game.__super__ = luxe.Emitter;
luxe.Game.prototype = $extend(luxe.Emitter.prototype,{
	config: function(config) {
		return config;
	}
	,ready: function() {
	}
	,update: function(dt) {
	}
	,onevent: function(event) {
	}
	,ondestroy: function() {
	}
	,onprerender: function() {
	}
	,onrender: function() {
	}
	,onpostrender: function() {
	}
	,oninputdown: function(_name,e) {
	}
	,oninputup: function(_name,e) {
	}
	,onmousedown: function(event) {
	}
	,onmouseup: function(event) {
	}
	,onmousewheel: function(event) {
	}
	,onmousemove: function(event) {
	}
	,onkeydown: function(event) {
	}
	,onkeyup: function(event) {
	}
	,ontextinput: function(event) {
	}
	,ontouchdown: function(event) {
	}
	,ontouchup: function(event) {
	}
	,ontouchmove: function(event) {
	}
	,ongamepadaxis: function(event) {
	}
	,ongamepaddown: function(event) {
	}
	,ongamepadup: function(event) {
	}
	,ongamepaddevice: function(event) {
	}
	,onwindowmoved: function(event) {
	}
	,onwindowresized: function(event) {
	}
	,onwindowsized: function(event) {
	}
	,onwindowminimized: function(event) {
	}
	,onwindowrestored: function(event) {
	}
	,__class__: luxe.Game
});
var Main = function() {
	luxe.Game.call(this);
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.__super__ = luxe.Game;
Main.prototype = $extend(luxe.Game.prototype,{
	ready: function() {
		Luxe.renderer.clear_color = new phoenix.Color().rgb(11494970);
		this.load_ortho_tiledmap();
	}
	,load_ortho_tiledmap: function() {
		var _g = this;
		Luxe.loadText("assets/tiles_base64.tmx",function(res) {
			var scale = 3;
			_g.tiled_ortho = new luxe.importers.tiled.TiledMap({ tiled_file_data : res.text, format : "xml", pos : new phoenix.Vector(512,0)});
			_g.tiled_ortho.display({ scale : scale, grid : false, filter : phoenix.FilterType.nearest});
		});
	}
	,__class__: Main
});
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
IMap.prototype = {
	__class__: IMap
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = s + c;
	return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var XmlType = $hxClasses["XmlType"] = { __ename__ : ["XmlType"], __constructs__ : [] };
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
};
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
};
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
};
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
};
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
};
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
};
Xml.prototype = {
	get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n = this.x[k1];
				k1 += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k1;
					return n;
				}
			}
			return null;
		}};
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,__class__: Xml
	,__properties__: {set_nodeValue:"set_nodeValue",get_nodeValue:"get_nodeValue",set_nodeName:"set_nodeName",get_nodeName:"get_nodeName"}
};
var haxe = {};
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Resource = function() { };
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.crypto.Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
haxe.Resource.getBytes = function(name) {
	var _g = 0;
	var _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return haxe.io.Bytes.ofString(x.str);
			return haxe.crypto.Base64.decode(x.data);
		}
	}
	return null;
};
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
};
haxe.Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(Math.isNaN(v2)) this.buf.b += "k"; else if(!Math.isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var $it0 = v3.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(HxOverrides.dateStr(d));
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it1 = v4.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it2 = v5.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it3 = v6.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe.io.Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe.Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(this.useCache && this.serializeRef(v)) return;
				this.buf.b += "o";
				this.serializeFields(v);
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw "Cannot serialize function";
				break;
			default:
				throw "Cannot serialize " + Std.string(v);
			}
		}
	}
	,__class__: haxe.Serializer
};
haxe.Timer = function() { };
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
};
haxe.Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
};
haxe.Utf8 = function(size) {
	this.__b = "";
};
$hxClasses["haxe.Utf8"] = haxe.Utf8;
haxe.Utf8.__name__ = ["haxe","Utf8"];
haxe.Utf8.prototype = {
	__class__: haxe.Utf8
};
haxe.crypto = {};
haxe.crypto.Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
$hxClasses["haxe.crypto.Adler32"] = haxe.crypto.Adler32;
haxe.crypto.Adler32.__name__ = ["haxe","crypto","Adler32"];
haxe.crypto.Adler32.read = function(i) {
	var a = new haxe.crypto.Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
};
haxe.crypto.Adler32.prototype = {
	update: function(b,pos,len) {
		var a1 = this.a1;
		var a2 = this.a2;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var p = _g1++;
			var c = b.b[p];
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,equals: function(a) {
		return a.a1 == this.a1 && a.a2 == this.a2;
	}
	,__class__: haxe.crypto.Adler32
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i1 = _g++;
			b1[i1 + pos] = b2[i1 + srcpos];
		}
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe.io.Bytes
};
haxe.crypto.Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe.crypto.Base64;
haxe.crypto.Base64.__name__ = ["haxe","crypto","Base64"];
haxe.crypto.Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe.crypto.BaseCode(haxe.crypto.Base64.BYTES).decodeBytes(haxe.io.Bytes.ofString(str));
};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe.crypto.BaseCode;
haxe.crypto.BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe.crypto.BaseCode.prototype = {
	initTable: function() {
		var tbl = new Array();
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe.io.Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw "BaseCode : invalid encoded char";
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe.crypto.BaseCode
};
haxe.crypto.Md5 = function() {
};
$hxClasses["haxe.crypto.Md5"] = haxe.crypto.Md5;
haxe.crypto.Md5.__name__ = ["haxe","crypto","Md5"];
haxe.crypto.Md5.encode = function(s) {
	var m = new haxe.crypto.Md5();
	var h = m.doEncode(haxe.crypto.Md5.str2blks(s));
	return m.hex(h);
};
haxe.crypto.Md5.str2blks = function(str) {
	var nblk = (str.length + 8 >> 6) + 1;
	var blks = new Array();
	var blksSize = nblk * 16;
	var _g = 0;
	while(_g < blksSize) {
		var i = _g++;
		blks[i] = 0;
	}
	var i1 = 0;
	while(i1 < str.length) {
		blks[i1 >> 2] |= HxOverrides.cca(str,i1) << (str.length * 8 + i1) % 4 * 8;
		i1++;
	}
	blks[i1 >> 2] |= 128 << (str.length * 8 + i1) % 4 * 8;
	var l = str.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
};
haxe.crypto.Md5.prototype = {
	bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,addme: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,hex: function(a) {
		var str = "";
		var hex_chr = "0123456789abcdef";
		var _g = 0;
		while(_g < a.length) {
			var num = a[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < 4) {
				var j = _g1++;
				str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
			}
		}
		return str;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(x) {
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = this.addme(a,olda);
			b = this.addme(b,oldb);
			c = this.addme(c,oldc);
			d = this.addme(d,oldd);
			i += 16;
		}
		return [a,b,c,d];
	}
	,__class__: haxe.crypto.Md5
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
haxe.io.BytesBuffer = function() {
	this.b = new Array();
};
$hxClasses["haxe.io.BytesBuffer"] = haxe.io.BytesBuffer;
haxe.io.BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe.io.BytesBuffer.prototype = {
	addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe.io.Bytes(this.b.length,this.b);
		this.b = null;
		return bytes;
	}
	,__class__: haxe.io.BytesBuffer
};
haxe.io.Input = function() { };
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	readByte: function() {
		throw "Not implemented";
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,read: function(nbytes) {
		var s = haxe.io.Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw haxe.io.Error.Blocked;
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) return ch2 | ch1 << 8; else return ch1 | ch2 << 8;
	}
	,__class__: haxe.io.Input
};
haxe.io.BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe.io.Error.OutsideBounds;
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe.io.BytesInput;
haxe.io.BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe.io.BytesInput.__super__ = haxe.io.Input;
haxe.io.BytesInput.prototype = $extend(haxe.io.Input.prototype,{
	readByte: function() {
		if(this.len == 0) throw new haxe.io.Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
		if(this.len == 0 && len > 0) throw new haxe.io.Eof();
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe.io.BytesInput
});
haxe.io.Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; };
haxe.io.Path = function(path) {
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe.io.Path;
haxe.io.Path.__name__ = ["haxe","io","Path"];
haxe.io.Path.directory = function(path) {
	var s = new haxe.io.Path(path);
	if(s.dir == null) return "";
	return s.dir;
};
haxe.io.Path.extension = function(path) {
	var s = new haxe.io.Path(path);
	if(s.ext == null) return "";
	return s.ext;
};
haxe.io.Path.join = function(paths) {
	var paths1 = paths.filter(function(s) {
		return s != null && s != "";
	});
	if(paths1.length == 0) return "";
	var path = paths1[0];
	var _g1 = 1;
	var _g = paths1.length;
	while(_g1 < _g) {
		var i = _g1++;
		path = haxe.io.Path.addTrailingSlash(path);
		path += paths1[i];
	}
	return haxe.io.Path.normalize(path);
};
haxe.io.Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join("/");
	if(path == null || path == slash) return slash;
	var target = [];
	var src;
	var parts;
	var token;
	src = path.split(slash);
	var _g1 = 0;
	var _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		token = src[i];
		if(token == "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join(slash);
	var regex = new EReg("([^:])/+","g");
	var result = regex.replace(tmp,"$1" + slash);
	return result;
};
haxe.io.Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) return path + "\\"; else return path;
	} else if(c1 != path.length - 1) return path + "/"; else return path;
};
haxe.io.Path.prototype = {
	__class__: haxe.io.Path
};
haxe.xml = {};
haxe.xml.Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
};
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i;
					if(s.charCodeAt(1) == 120) i = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else i = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.add(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
};
haxe.zip = {};
haxe.zip.Huffman = $hxClasses["haxe.zip.Huffman"] = { __ename__ : ["haxe","zip","Huffman"], __constructs__ : ["Found","NeedBit","NeedBits"] };
haxe.zip.Huffman.Found = function(i) { var $x = ["Found",0,i]; $x.__enum__ = haxe.zip.Huffman; $x.toString = $estr; return $x; };
haxe.zip.Huffman.NeedBit = function(left,right) { var $x = ["NeedBit",1,left,right]; $x.__enum__ = haxe.zip.Huffman; $x.toString = $estr; return $x; };
haxe.zip.Huffman.NeedBits = function(n,table) { var $x = ["NeedBits",2,n,table]; $x.__enum__ = haxe.zip.Huffman; $x.toString = $estr; return $x; };
haxe.zip.HuffTools = function() {
};
$hxClasses["haxe.zip.HuffTools"] = haxe.zip.HuffTools;
haxe.zip.HuffTools.__name__ = ["haxe","zip","HuffTools"];
haxe.zip.HuffTools.prototype = {
	treeDepth: function(t) {
		switch(t[1]) {
		case 0:
			return 0;
		case 2:
			throw "assert";
			break;
		case 1:
			var b = t[3];
			var a = t[2];
			var da = this.treeDepth(a);
			var db = this.treeDepth(b);
			return 1 + (da < db?da:db);
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) return t;
		if(d == 1) switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			return haxe.zip.Huffman.NeedBit(this.treeCompress(a),this.treeCompress(b));
		default:
			throw "assert";
		}
		var size = 1 << d;
		var table = new Array();
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			table.push(haxe.zip.Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return haxe.zip.Huffman.NeedBits(d,table);
	}
	,treeWalk: function(table,p,cd,d,t) {
		switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else table[p] = this.treeCompress(t);
			break;
		default:
			table[p] = this.treeCompress(t);
		}
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) throw "Invalid huffman";
		var idx = v << 5 | len;
		if(bits.exists(idx)) return haxe.zip.Huffman.Found(bits.get(idx));
		v <<= 1;
		len += 1;
		return haxe.zip.Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,make: function(lengths,pos,nlengths,maxbits) {
		var counts = new Array();
		var tmp = new Array();
		if(maxbits > 32) throw "Invalid huffman";
		var _g = 0;
		while(_g < maxbits) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g1 = 0;
		while(_g1 < nlengths) {
			var i1 = _g1++;
			var p = lengths[i1 + pos];
			if(p >= maxbits) throw "Invalid huffman";
			counts[p]++;
		}
		var code = 0;
		var _g11 = 1;
		var _g2 = maxbits - 1;
		while(_g11 < _g2) {
			var i2 = _g11++;
			code = code + counts[i2] << 1;
			tmp[i2] = code;
		}
		var bits = new haxe.ds.IntMap();
		var _g3 = 0;
		while(_g3 < nlengths) {
			var i3 = _g3++;
			var l = lengths[i3 + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.set(n << 5 | l,i3);
			}
		}
		return this.treeCompress(haxe.zip.Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,__class__: haxe.zip.HuffTools
};
haxe.zip._InflateImpl = {};
haxe.zip._InflateImpl.Window = function(hasCrc) {
	this.buffer = haxe.io.Bytes.alloc(65536);
	this.pos = 0;
	if(hasCrc) this.crc = new haxe.crypto.Adler32();
};
$hxClasses["haxe.zip._InflateImpl.Window"] = haxe.zip._InflateImpl.Window;
haxe.zip._InflateImpl.Window.__name__ = ["haxe","zip","_InflateImpl","Window"];
haxe.zip._InflateImpl.Window.prototype = {
	slide: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,32768);
		var b = haxe.io.Bytes.alloc(65536);
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) this.slide();
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,addByte: function(c) {
		if(this.pos == 65536) this.slide();
		this.buffer.b[this.pos] = c & 255;
		this.pos++;
	}
	,getLastChar: function() {
		return this.buffer.b[this.pos - 1];
	}
	,available: function() {
		return this.pos;
	}
	,checksum: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,this.pos);
		return this.crc;
	}
	,__class__: haxe.zip._InflateImpl.Window
};
haxe.zip._InflateImpl.State = $hxClasses["haxe.zip._InflateImpl.State"] = { __ename__ : ["haxe","zip","_InflateImpl","State"], __constructs__ : ["Head","Block","CData","Flat","Crc","Dist","DistOne","Done"] };
haxe.zip._InflateImpl.State.Head = ["Head",0];
haxe.zip._InflateImpl.State.Head.toString = $estr;
haxe.zip._InflateImpl.State.Head.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Block = ["Block",1];
haxe.zip._InflateImpl.State.Block.toString = $estr;
haxe.zip._InflateImpl.State.Block.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.CData = ["CData",2];
haxe.zip._InflateImpl.State.CData.toString = $estr;
haxe.zip._InflateImpl.State.CData.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Flat = ["Flat",3];
haxe.zip._InflateImpl.State.Flat.toString = $estr;
haxe.zip._InflateImpl.State.Flat.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Crc = ["Crc",4];
haxe.zip._InflateImpl.State.Crc.toString = $estr;
haxe.zip._InflateImpl.State.Crc.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Dist = ["Dist",5];
haxe.zip._InflateImpl.State.Dist.toString = $estr;
haxe.zip._InflateImpl.State.Dist.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.DistOne = ["DistOne",6];
haxe.zip._InflateImpl.State.DistOne.toString = $estr;
haxe.zip._InflateImpl.State.DistOne.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip._InflateImpl.State.Done = ["Done",7];
haxe.zip._InflateImpl.State.Done.toString = $estr;
haxe.zip._InflateImpl.State.Done.__enum__ = haxe.zip._InflateImpl.State;
haxe.zip.InflateImpl = function(i,header,crc) {
	if(crc == null) crc = true;
	if(header == null) header = true;
	this["final"] = false;
	this.htools = new haxe.zip.HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	if(header) this.state = haxe.zip._InflateImpl.State.Head; else this.state = haxe.zip._InflateImpl.State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = new Array();
	var _g = 0;
	while(_g < 19) {
		var i1 = _g++;
		this.lengths.push(-1);
	}
	this.window = new haxe.zip._InflateImpl.Window(crc);
};
$hxClasses["haxe.zip.InflateImpl"] = haxe.zip.InflateImpl;
haxe.zip.InflateImpl.__name__ = ["haxe","zip","InflateImpl"];
haxe.zip.InflateImpl.run = function(i,bufsize) {
	if(bufsize == null) bufsize = 65536;
	var buf = haxe.io.Bytes.alloc(bufsize);
	var output = new haxe.io.BytesBuffer();
	var inflate = new haxe.zip.InflateImpl(i);
	while(true) {
		var len = inflate.readBytes(buf,0,bufsize);
		output.addBytes(buf,0,len);
		if(len < bufsize) break;
	}
	return output.getBytes();
};
haxe.zip.InflateImpl.prototype = {
	buildFixedHuffman: function() {
		if(haxe.zip.InflateImpl.FIXED_HUFFMAN != null) return haxe.zip.InflateImpl.FIXED_HUFFMAN;
		var a = new Array();
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143?8:n <= 255?9:n <= 279?7:8);
		}
		haxe.zip.InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return haxe.zip.InflateImpl.FIXED_HUFFMAN;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) while(this.inflateLoop()) {
		}
		return len - this.needed;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getRevBits: function(n) {
		if(n == 0) return 0; else if(this.getBit()) return 1 << n - 1 | this.getRevBits(n - 1); else return this.getRevBits(n - 1);
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.b[this.outpos] = b & 255;
		this.needed--;
		this.outpos++;
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,applyHuffman: function(h) {
		switch(h[1]) {
		case 0:
			var n = h[2];
			return n;
		case 1:
			var b = h[3];
			var a = h[2];
			return this.applyHuffman(this.getBit()?b:a);
		case 2:
			var tbl = h[3];
			var n1 = h[2];
			return this.applyHuffman(tbl[this.getBits(n1)]);
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				i++;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) throw "Invalid data";
				while(i < end) {
					a[i] = prev;
					i++;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) throw "Invalid data";
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) throw "Invalid data";
				break;
			default:
				throw "Invalid data";
			}
		}
	}
	,inflateLoop: function() {
		var _g = this.state;
		switch(_g[1]) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8 || cinfo != 7) throw "Invalid data";
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) throw "Invalid data";
			if(fdict) throw "Unsupported dictionary";
			this.state = haxe.zip._InflateImpl.State.Block;
			return true;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = haxe.zip._InflateImpl.State.Done;
				return true;
			}
			var crc = haxe.crypto.Adler32.read(this.input);
			if(!calc.equals(crc)) throw "Invalid CRC";
			this.state = haxe.zip._InflateImpl.State.Done;
			return true;
		case 7:
			return false;
		case 1:
			this["final"] = this.getBit();
			var _g1 = this.getBits(2);
			switch(_g1) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) throw "Invalid data";
				this.state = haxe.zip._InflateImpl.State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = haxe.zip._InflateImpl.State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g2 = 0;
				while(_g2 < hclen) {
					var i = _g2++;
					this.lengths[haxe.zip.InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g21 = hclen;
				while(_g21 < 19) {
					var i1 = _g21++;
					this.lengths[haxe.zip.InflateImpl.CODE_LENGTHS_POS[i1]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = new Array();
				var _g3 = 0;
				var _g22 = hlit + hdist;
				while(_g3 < _g22) {
					var i2 = _g3++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = haxe.zip._InflateImpl.State.CData;
				return true;
			default:
				throw "Invalid data";
			}
			break;
		case 3:
			var rlen;
			if(this.len < this.needed) rlen = this.len; else rlen = this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) if(this["final"]) this.state = haxe.zip._InflateImpl.State.Crc; else this.state = haxe.zip._InflateImpl.State.Block;
			return this.needed > 0;
		case 6:
			var rlen1;
			if(this.len < this.needed) rlen1 = this.len; else rlen1 = this.needed;
			this.addDistOne(rlen1);
			this.len -= rlen1;
			if(this.len == 0) this.state = haxe.zip._InflateImpl.State.CData;
			return this.needed > 0;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist;
				if(this.len < this.dist) rdist = this.len; else rdist = this.dist;
				var rlen2;
				if(this.needed < rdist) rlen2 = this.needed; else rlen2 = rdist;
				this.addDist(this.dist,rlen2);
				this.len -= rlen2;
			}
			if(this.len == 0) this.state = haxe.zip._InflateImpl.State.CData;
			return this.needed > 0;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				if(this["final"]) this.state = haxe.zip._InflateImpl.State.Crc; else this.state = haxe.zip._InflateImpl.State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = haxe.zip.InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) throw "Invalid data";
				this.len = haxe.zip.InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code;
				if(this.huffdist == null) dist_code = this.getRevBits(5); else dist_code = this.applyHuffman(this.huffdist);
				extra_bits = haxe.zip.InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) throw "Invalid data";
				this.dist = haxe.zip.InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) throw "Invalid data";
				if(this.dist == 1) this.state = haxe.zip._InflateImpl.State.DistOne; else this.state = haxe.zip._InflateImpl.State.Dist;
				return true;
			}
			break;
		}
	}
	,__class__: haxe.zip.InflateImpl
};
haxe.zip.Uncompress = function() { };
$hxClasses["haxe.zip.Uncompress"] = haxe.zip.Uncompress;
haxe.zip.Uncompress.__name__ = ["haxe","zip","Uncompress"];
haxe.zip.Uncompress.run = function(src,bufsize) {
	return haxe.zip.InflateImpl.run(new haxe.io.BytesInput(src),bufsize);
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop((o instanceof Array) && o.__enum__ == null?Array:o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
luxe.Audio = function(_core) {
	this.core = _core;
};
$hxClasses["luxe.Audio"] = luxe.Audio;
luxe.Audio.__name__ = ["luxe","Audio"];
luxe.Audio.prototype = {
	init: function() {
		null;
	}
	,destroy: function() {
		null;
	}
	,create: function(_id,_name,_streaming) {
		if(_streaming == null) _streaming = false;
		if(_name == null) _name = "";
		return this.core.app.audio.create(_id,_name,_streaming);
	}
	,create_from_bytes: function(_name,_bytes,_format) {
		if(_name == null) _name = "";
		return this.core.app.audio.create_from_bytes(_name,_bytes,_format);
	}
	,uncreate: function(_name) {
		return this.core.app.audio.uncreate(_name);
	}
	,add: function(sound) {
		return this.core.app.audio.add(sound);
	}
	,on: function(_name,_event,_handler) {
		return this.core.app.audio.on(_name,_event,_handler);
	}
	,off: function(_name,_event,_handler) {
		return this.core.app.audio.off(_name,_event,_handler);
	}
	,get: function(_name) {
		return this.core.app.audio.get(_name);
	}
	,exists: function(_name) {
		return this.get(_name) != null;
	}
	,on_complete: function(_name,handler) {
	}
	,loop: function(_name) {
		return this.core.app.audio.loop(_name);
	}
	,stop: function(_name) {
		return this.core.app.audio.stop(_name);
	}
	,play: function(_name) {
		return this.core.app.audio.play(_name);
	}
	,pause: function(_name) {
		return this.core.app.audio.pause(_name);
	}
	,toggle: function(_name) {
		return this.core.app.audio.toggle(_name);
	}
	,volume: function(_name,_volume) {
		return this.core.app.audio.volume(_name,_volume);
	}
	,pan: function(_name,_pan) {
		return this.core.app.audio.pan(_name,_pan);
	}
	,pitch: function(_name,_pitch) {
		return this.core.app.audio.pitch(_name,_pitch);
	}
	,position: function(_name,_position) {
		return this.core.app.audio.position(_name,_position);
	}
	,duration: function(_name) {
		return this.core.app.audio.duration(_name);
	}
	,process: function() {
	}
	,__class__: luxe.Audio
};
luxe.SizeMode = $hxClasses["luxe.SizeMode"] = { __ename__ : ["luxe","SizeMode"], __constructs__ : ["fit","cover","contain"] };
luxe.SizeMode.fit = ["fit",0];
luxe.SizeMode.fit.toString = $estr;
luxe.SizeMode.fit.__enum__ = luxe.SizeMode;
luxe.SizeMode.cover = ["cover",1];
luxe.SizeMode.cover.toString = $estr;
luxe.SizeMode.cover.__enum__ = luxe.SizeMode;
luxe.SizeMode.contain = ["contain",2];
luxe.SizeMode.contain.toString = $estr;
luxe.SizeMode.contain.__enum__ = luxe.SizeMode;
luxe.Objects = function(_name,_id) {
	if(_id == null) _id = "";
	if(_name == null) _name = "";
	this.name = "";
	this.id = "";
	luxe.Emitter.call(this);
	this.name = _name;
	if(_id == "") this.id = Luxe.utils.uniqueid(); else this.id = _id;
};
$hxClasses["luxe.Objects"] = luxe.Objects;
luxe.Objects.__name__ = ["luxe","Objects"];
luxe.Objects.__super__ = luxe.Emitter;
luxe.Objects.prototype = $extend(luxe.Emitter.prototype,{
	__class__: luxe.Objects
});
luxe.Entity = function(_options,_pos_info) {
	this.component_count = 0;
	this.active = true;
	this.fixed_rate = 0;
	this.started = false;
	this.inited = false;
	this.destroyed = false;
	luxe.Objects.call(this,"entity");
	this.name += "." + this.id;
	this.options = _options;
	this._components = new luxe.components.Components(this);
	this.children = new Array();
	this.events = new luxe.Events();
	if(this.options != null && this.options.transform != null) this.set_transform(this.options.transform); else this.set_transform(new phoenix.Transform());
	this.get_transform().listen_pos($bind(this,this.set_pos_from_transform));
	this.get_transform().listen_scale($bind(this,this.set_scale_from_transform));
	this.get_transform().listen_origin($bind(this,this.set_origin_from_transform));
	this.get_transform().listen_parent($bind(this,this.set_parent_from_transform));
	this.get_transform().listen_rotation($bind(this,this.set_rotation_from_transform));
	if(this.options != null) {
		if(this.options.name_unique == null) this.options.name_unique = false;
		if(this.options.name != null) {
			this.name = this.options.name;
			if(this.options.name_unique) this.name += "." + this.id;
		}
		if(this.options.pos != null) {
			var _op = this.options.pos;
			this.set_pos(new phoenix.Vector(_op.x,_op.y,_op.z,_op.w));
		}
		if(this.options.scale != null) {
			var _os = this.options.scale;
			this.set_scale(new phoenix.Vector(_os.x,_os.y,_os.z,_os.w));
		}
		var _should_add = true;
		if(this.options.no_scene != null) {
			if(this.options.no_scene == true) {
				_should_add = false;
				null;
			}
		}
		if(this.options.parent != null) {
			_should_add = false;
			this.set_parent(this.options.parent);
			null;
		}
		if(_should_add) {
			if(this.options.scene != null) {
				this.set_scene(this.options.scene);
				null;
			} else {
				this.set_scene(Luxe.scene);
				null;
			}
		}
	} else {
		this.set_scene(Luxe.scene);
		null;
	}
	if(this.get_scene() != null) this.get_scene().add(this,_pos_info); else null;
	null;
};
$hxClasses["luxe.Entity"] = luxe.Entity;
luxe.Entity.__name__ = ["luxe","Entity"];
luxe.Entity.__super__ = luxe.Objects;
luxe.Entity.prototype = $extend(luxe.Objects.prototype,{
	init: function() {
	}
	,update: function(dt) {
	}
	,onfixedupdate: function(rate) {
	}
	,onreset: function() {
	}
	,ondestroy: function() {
	}
	,onkeyup: function(event) {
	}
	,onkeydown: function(event) {
	}
	,ontextinput: function(event) {
	}
	,oninputdown: function(name,event) {
	}
	,oninputup: function(name,event) {
	}
	,onmousedown: function(event) {
	}
	,onmouseup: function(event) {
	}
	,onmousemove: function(event) {
	}
	,onmousewheel: function(event) {
	}
	,ontouchdown: function(event) {
	}
	,ontouchup: function(event) {
	}
	,ontouchmove: function(event) {
	}
	,ongamepadup: function(event) {
	}
	,ongamepaddown: function(event) {
	}
	,ongamepadaxis: function(event) {
	}
	,ongamepaddevice: function(event) {
	}
	,onwindowmoved: function(event) {
	}
	,onwindowresized: function(event) {
	}
	,onwindowsized: function(event) {
	}
	,onwindowminimized: function(event) {
	}
	,onwindowrestored: function(event) {
	}
	,add: function(_component) {
		this.component_count++;
		return this._components.add(_component);
	}
	,remove: function(_name) {
		this.component_count--;
		return this._components.remove(_name);
	}
	,get: function(_name,_in_children) {
		if(_in_children == null) _in_children = false;
		return this._components.get(_name,_in_children);
	}
	,get_any: function(_name,_in_children,_first_only) {
		if(_first_only == null) _first_only = true;
		if(_in_children == null) _in_children = false;
		return this._components.get_any(_name,_in_children,_first_only);
	}
	,has: function(_name) {
		return this._components.has(_name);
	}
	,_init: function() {
		this.init();
		this.emit(2,null,{ fileName : "Entity.hx", lineNumber : 291, className : "luxe.Entity", methodName : "_init"});
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.init();
			}
		}
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child._init();
			}
		}
		this.inited = true;
	}
	,_reset: function(_) {
		this.onreset();
		this.emit(3,null,{ fileName : "Entity.hx", lineNumber : 321, className : "luxe.Entity", methodName : "_reset"});
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.onreset();
			}
		}
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child._reset(_);
				null;
			}
		}
		this._set_fixed_rate_timer(this.fixed_rate,{ fileName : "Entity.hx", lineNumber : 339, className : "luxe.Entity", methodName : "_reset"});
		this.started = true;
	}
	,destroy: function(_from_parent) {
		if(_from_parent == null) _from_parent = false;
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child.destroy(true);
			}
		}
		this.children = null;
		this.children = [];
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.onremoved();
				_component.ondestroy();
			}
		}
		this.emit(6,null,{ fileName : "Entity.hx", lineNumber : 372, className : "luxe.Entity", methodName : "destroy"});
		this.ondestroy();
		if(this.get_parent() != null && !_from_parent) this.get_parent()._remove_child(this);
		if(this.fixed_rate_timer != null) {
			this.fixed_rate_timer.stop();
			this.fixed_rate_timer = null;
		}
		this.destroyed = true;
		this.inited = false;
		this.started = false;
		if(this.get_scene() != null) this.get_scene().remove(this);
		if(this.events != null) {
			this.events.destroy();
			this.events = null;
		}
	}
	,_update: function(dt) {
		if(this.destroyed) return;
		if(!this.get_active() || !this.inited || !this.started) return;
		this.get_transform().clean_check();
		this.update(dt);
		if(this.events != null) this.events.process();
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.update(dt);
			}
		}
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child._update(dt);
			}
		}
	}
	,_fixed_update: function() {
		if(this.destroyed) return;
		if(!this.get_active() || !this.inited || !this.started) return;
		this.emit(5,null,{ fileName : "Entity.hx", lineNumber : 460, className : "luxe.Entity", methodName : "_fixed_update"});
		this.onfixedupdate(this.fixed_rate);
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.onfixedupdate(this.fixed_rate);
			}
		}
		if(this.children.length > 0) {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				_child._fixed_update();
			}
		}
	}
	,_find_emit_source: function(_from_unlisten) {
		if(_from_unlisten == null) _from_unlisten = false;
		var source = null;
		if(this.get_scene() != null) source = this.get_scene(); else if(this.get_parent() != null) {
			var looking = true;
			while(looking) if(this.get_parent().get_scene() == null) {
				if(this.get_parent().get_parent() == null) {
					if(!_from_unlisten) haxe.Log.trace("   i / entity / " + "entity has no parent or scene, currently no core events will reach it.",{ fileName : "Entity.hx", lineNumber : 499, className : "luxe.Entity", methodName : "_find_emit_source"});
					looking = false;
					break;
				} else {
				}
			} else {
				source = this.get_parent().get_scene();
				looking = false;
				break;
			}
		} else if(!_from_unlisten) haxe.Log.trace("   i / entity / " + "entity has no parent or scene, currently no core events will reach it.",{ fileName : "Entity.hx", lineNumber : 520, className : "luxe.Entity", methodName : "_find_emit_source"});
		return source;
	}
	,_listen: function(_event,_handler,_self) {
		if(_self == null) _self = false;
		if(!_self) this.on(_event,_handler,{ fileName : "Entity.hx", lineNumber : 540, className : "luxe.Entity", methodName : "_listen"});
		var source = this._find_emit_source(null);
		if(source != null) switch(_event) {
		case 11:
			source.on(_event,$bind(this,this._keyup),{ fileName : "Entity.hx", lineNumber : 550, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 10:
			source.on(_event,$bind(this,this._keydown),{ fileName : "Entity.hx", lineNumber : 551, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 12:
			source.on(_event,$bind(this,this._textinput),{ fileName : "Entity.hx", lineNumber : 552, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 15:
			source.on(_event,$bind(this,this._mousedown),{ fileName : "Entity.hx", lineNumber : 554, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 16:
			source.on(_event,$bind(this,this._mouseup),{ fileName : "Entity.hx", lineNumber : 555, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 17:
			source.on(_event,$bind(this,this._mousemove),{ fileName : "Entity.hx", lineNumber : 556, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 18:
			source.on(_event,$bind(this,this._mousewheel),{ fileName : "Entity.hx", lineNumber : 557, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 19:
			source.on(_event,$bind(this,this._touchdown),{ fileName : "Entity.hx", lineNumber : 559, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 20:
			source.on(_event,$bind(this,this._touchup),{ fileName : "Entity.hx", lineNumber : 560, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 21:
			source.on(_event,$bind(this,this._touchmove),{ fileName : "Entity.hx", lineNumber : 561, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 14:
			source.on(_event,$bind(this,this._inputup),{ fileName : "Entity.hx", lineNumber : 563, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 13:
			source.on(_event,$bind(this,this._inputdown),{ fileName : "Entity.hx", lineNumber : 564, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 23:
			source.on(_event,$bind(this,this._gamepaddown),{ fileName : "Entity.hx", lineNumber : 566, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 24:
			source.on(_event,$bind(this,this._gamepadup),{ fileName : "Entity.hx", lineNumber : 567, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 22:
			source.on(_event,$bind(this,this._gamepadaxis),{ fileName : "Entity.hx", lineNumber : 568, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 25:
			source.on(_event,$bind(this,this._gamepaddevice),{ fileName : "Entity.hx", lineNumber : 569, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 27:
			source.on(_event,$bind(this,this._windowmoved),{ fileName : "Entity.hx", lineNumber : 571, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 28:
			source.on(_event,$bind(this,this._windowresized),{ fileName : "Entity.hx", lineNumber : 572, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 29:
			source.on(_event,$bind(this,this._windowsized),{ fileName : "Entity.hx", lineNumber : 573, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 30:
			source.on(_event,$bind(this,this._windowminimized),{ fileName : "Entity.hx", lineNumber : 574, className : "luxe.Entity", methodName : "_listen"});
			break;
		case 31:
			source.on(_event,$bind(this,this._windowrestored),{ fileName : "Entity.hx", lineNumber : 575, className : "luxe.Entity", methodName : "_listen"});
			break;
		}
	}
	,_unlisten: function(_event,_handler,_self) {
		if(_self == null) _self = false;
		var source = this._find_emit_source(true);
		if(!_self) this.off(_event,_handler,{ fileName : "Entity.hx", lineNumber : 589, className : "luxe.Entity", methodName : "_unlisten"});
		if(source != null) switch(_event) {
		case 11:
			source.off(_event,$bind(this,this._keyup),{ fileName : "Entity.hx", lineNumber : 595, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 10:
			source.off(_event,$bind(this,this._keydown),{ fileName : "Entity.hx", lineNumber : 596, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 12:
			source.off(_event,$bind(this,this._textinput),{ fileName : "Entity.hx", lineNumber : 597, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 15:
			source.off(_event,$bind(this,this._mousedown),{ fileName : "Entity.hx", lineNumber : 599, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 16:
			source.off(_event,$bind(this,this._mouseup),{ fileName : "Entity.hx", lineNumber : 600, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 17:
			source.off(_event,$bind(this,this._mousemove),{ fileName : "Entity.hx", lineNumber : 601, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 18:
			source.off(_event,$bind(this,this._mousewheel),{ fileName : "Entity.hx", lineNumber : 602, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 19:
			source.off(_event,$bind(this,this._touchdown),{ fileName : "Entity.hx", lineNumber : 604, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 20:
			source.off(_event,$bind(this,this._touchup),{ fileName : "Entity.hx", lineNumber : 605, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 21:
			source.off(_event,$bind(this,this._touchmove),{ fileName : "Entity.hx", lineNumber : 606, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 14:
			source.off(_event,$bind(this,this._inputup),{ fileName : "Entity.hx", lineNumber : 608, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 13:
			source.off(_event,$bind(this,this._inputdown),{ fileName : "Entity.hx", lineNumber : 609, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 23:
			source.off(_event,$bind(this,this._gamepaddown),{ fileName : "Entity.hx", lineNumber : 611, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 24:
			source.off(_event,$bind(this,this._gamepadup),{ fileName : "Entity.hx", lineNumber : 612, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 22:
			source.off(_event,$bind(this,this._gamepadaxis),{ fileName : "Entity.hx", lineNumber : 613, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 25:
			source.off(_event,$bind(this,this._gamepaddevice),{ fileName : "Entity.hx", lineNumber : 614, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 27:
			source.off(_event,$bind(this,this._windowmoved),{ fileName : "Entity.hx", lineNumber : 616, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 28:
			source.off(_event,$bind(this,this._windowresized),{ fileName : "Entity.hx", lineNumber : 617, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 29:
			source.off(_event,$bind(this,this._windowsized),{ fileName : "Entity.hx", lineNumber : 618, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 30:
			source.off(_event,$bind(this,this._windowminimized),{ fileName : "Entity.hx", lineNumber : 619, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		case 31:
			source.off(_event,$bind(this,this._windowrestored),{ fileName : "Entity.hx", lineNumber : 620, className : "luxe.Entity", methodName : "_unlisten"});
			break;
		}
	}
	,_detach_scene: function() {
		if(this.get_scene() != null) {
			this.get_scene().off(3,$bind(this,this._reset),{ fileName : "Entity.hx", lineNumber : 634, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(6,$bind(this,this.destroy),{ fileName : "Entity.hx", lineNumber : 635, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(11,$bind(this,this._keyup),{ fileName : "Entity.hx", lineNumber : 638, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(10,$bind(this,this._keydown),{ fileName : "Entity.hx", lineNumber : 639, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(12,$bind(this,this._textinput),{ fileName : "Entity.hx", lineNumber : 640, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(15,$bind(this,this._mousedown),{ fileName : "Entity.hx", lineNumber : 641, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(16,$bind(this,this._mouseup),{ fileName : "Entity.hx", lineNumber : 642, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(17,$bind(this,this._mousemove),{ fileName : "Entity.hx", lineNumber : 643, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(18,$bind(this,this._mousewheel),{ fileName : "Entity.hx", lineNumber : 644, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(19,$bind(this,this._touchdown),{ fileName : "Entity.hx", lineNumber : 645, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(20,$bind(this,this._touchup),{ fileName : "Entity.hx", lineNumber : 646, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(21,$bind(this,this._touchmove),{ fileName : "Entity.hx", lineNumber : 647, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(14,$bind(this,this._inputup),{ fileName : "Entity.hx", lineNumber : 648, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(13,$bind(this,this._inputdown),{ fileName : "Entity.hx", lineNumber : 649, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(23,$bind(this,this._gamepaddown),{ fileName : "Entity.hx", lineNumber : 650, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(24,$bind(this,this._gamepadup),{ fileName : "Entity.hx", lineNumber : 651, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(22,$bind(this,this._gamepadaxis),{ fileName : "Entity.hx", lineNumber : 652, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(25,$bind(this,this._gamepaddevice),{ fileName : "Entity.hx", lineNumber : 653, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(27,$bind(this,this._windowmoved),{ fileName : "Entity.hx", lineNumber : 654, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(28,$bind(this,this._windowresized),{ fileName : "Entity.hx", lineNumber : 655, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(29,$bind(this,this._windowsized),{ fileName : "Entity.hx", lineNumber : 656, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(30,$bind(this,this._windowminimized),{ fileName : "Entity.hx", lineNumber : 657, className : "luxe.Entity", methodName : "_detach_scene"});
			this.get_scene().off(31,$bind(this,this._windowrestored),{ fileName : "Entity.hx", lineNumber : 658, className : "luxe.Entity", methodName : "_detach_scene"});
		}
	}
	,_attach_scene: function() {
		if(this.get_scene() != null) {
			this.get_scene().on(3,$bind(this,this._reset),{ fileName : "Entity.hx", lineNumber : 667, className : "luxe.Entity", methodName : "_attach_scene"});
			this.get_scene().on(6,$bind(this,this.destroy),{ fileName : "Entity.hx", lineNumber : 668, className : "luxe.Entity", methodName : "_attach_scene"});
		}
	}
	,_keyup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onkeyup(_event);
		this.emit(11,_event,{ fileName : "Entity.hx", lineNumber : 684, className : "luxe.Entity", methodName : "_keyup"});
	}
	,_keydown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onkeydown(_event);
		this.emit(10,_event,{ fileName : "Entity.hx", lineNumber : 697, className : "luxe.Entity", methodName : "_keydown"});
	}
	,_textinput: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ontextinput(_event);
		this.emit(12,_event,{ fileName : "Entity.hx", lineNumber : 710, className : "luxe.Entity", methodName : "_textinput"});
	}
	,_mousedown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onmousedown(_event);
		this.emit(15,_event,{ fileName : "Entity.hx", lineNumber : 726, className : "luxe.Entity", methodName : "_mousedown"});
	}
	,_mouseup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onmouseup(_event);
		this.emit(16,_event,{ fileName : "Entity.hx", lineNumber : 740, className : "luxe.Entity", methodName : "_mouseup"});
	}
	,_mousewheel: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onmousewheel(_event);
		this.emit(18,_event,{ fileName : "Entity.hx", lineNumber : 753, className : "luxe.Entity", methodName : "_mousewheel"});
	}
	,_mousemove: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onmousemove(_event);
		this.emit(17,_event,{ fileName : "Entity.hx", lineNumber : 766, className : "luxe.Entity", methodName : "_mousemove"});
	}
	,_touchdown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ontouchdown(_event);
		this.emit(19,_event,{ fileName : "Entity.hx", lineNumber : 780, className : "luxe.Entity", methodName : "_touchdown"});
	}
	,_touchup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ontouchup(_event);
		this.emit(20,_event,{ fileName : "Entity.hx", lineNumber : 793, className : "luxe.Entity", methodName : "_touchup"});
	}
	,_touchmove: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ontouchmove(_event);
		this.emit(21,_event,{ fileName : "Entity.hx", lineNumber : 806, className : "luxe.Entity", methodName : "_touchmove"});
	}
	,_gamepadaxis: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ongamepadaxis(_event);
		this.emit(22,_event,{ fileName : "Entity.hx", lineNumber : 820, className : "luxe.Entity", methodName : "_gamepadaxis"});
	}
	,_gamepaddown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ongamepaddown(_event);
		this.emit(23,_event,{ fileName : "Entity.hx", lineNumber : 833, className : "luxe.Entity", methodName : "_gamepaddown"});
	}
	,_gamepadup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ongamepadup(_event);
		this.emit(24,_event,{ fileName : "Entity.hx", lineNumber : 846, className : "luxe.Entity", methodName : "_gamepadup"});
	}
	,_gamepaddevice: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.ongamepaddevice(_event);
		this.emit(25,_event,{ fileName : "Entity.hx", lineNumber : 859, className : "luxe.Entity", methodName : "_gamepaddevice"});
	}
	,_windowmoved: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowmoved(_event);
		this.emit(27,_event,{ fileName : "Entity.hx", lineNumber : 874, className : "luxe.Entity", methodName : "_windowmoved"});
	}
	,_windowresized: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowresized(_event);
		this.emit(28,_event,{ fileName : "Entity.hx", lineNumber : 887, className : "luxe.Entity", methodName : "_windowresized"});
	}
	,_windowsized: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowsized(_event);
		this.emit(29,_event,{ fileName : "Entity.hx", lineNumber : 900, className : "luxe.Entity", methodName : "_windowsized"});
	}
	,_windowminimized: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowminimized(_event);
		this.emit(30,_event,{ fileName : "Entity.hx", lineNumber : 913, className : "luxe.Entity", methodName : "_windowminimized"});
	}
	,_windowrestored: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.onwindowrestored(_event);
		this.emit(31,_event,{ fileName : "Entity.hx", lineNumber : 926, className : "luxe.Entity", methodName : "_windowrestored"});
	}
	,_inputdown: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.oninputdown(_event.name,_event.event);
		this.emit(13,_event,{ fileName : "Entity.hx", lineNumber : 941, className : "luxe.Entity", methodName : "_inputdown"});
	}
	,_inputup: function(_event) {
		if(!this.get_active() || !this.inited || !this.started) return;
		this.oninputup(_event.name,_event.event);
		this.emit(14,_event,{ fileName : "Entity.hx", lineNumber : 954, className : "luxe.Entity", methodName : "_inputup"});
	}
	,get_fixed_rate: function() {
		return this.fixed_rate;
	}
	,set_fixed_rate: function(_rate) {
		this.fixed_rate = _rate;
		if(this.started) {
			if(this.fixed_rate_timer != null) {
				this.fixed_rate_timer.stop();
				this.fixed_rate_timer = null;
			}
			if(_rate != 0 && this.get_parent() == null && !this.destroyed) {
				this.fixed_rate_timer = new snow.api.Timer(_rate);
				this.fixed_rate_timer.run = $bind(this,this._fixed_update);
			}
		}
		return this.fixed_rate;
	}
	,_stop_fixed_rate_timer: function() {
		if(this.fixed_rate_timer != null) {
			this.fixed_rate_timer.stop();
			this.fixed_rate_timer = null;
		}
	}
	,_set_fixed_rate_timer: function(_rate,_pos) {
		if(this.fixed_rate_timer != null) {
			this.fixed_rate_timer.stop();
			this.fixed_rate_timer = null;
		}
		if(_rate != 0 && this.get_parent() == null && !this.destroyed) {
			this.fixed_rate_timer = new snow.api.Timer(_rate);
			this.fixed_rate_timer.run = $bind(this,this._fixed_update);
		}
	}
	,get_components: function() {
		return this._components.components;
	}
	,_add_child: function(child) {
		this.children.push(child);
		if(child.get_scene() != null) {
			var removed = child.get_scene().remove(child);
		} else null;
	}
	,_remove_child: function(child) {
		HxOverrides.remove(this.children,child);
	}
	,set_pos_from_transform: function(_pos) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_pos_change(_pos);
			}
		}
	}
	,set_rotation_from_transform: function(_rotation) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_rotation_change(_rotation);
			}
		}
	}
	,set_scale_from_transform: function(_scale) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_scale_change(_scale);
			}
		}
	}
	,set_origin_from_transform: function(_origin) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_origin_change(_origin);
			}
		}
	}
	,set_parent_from_transform: function(_parent) {
		if(this.component_count > 0) {
			var _g_index = 0;
			var _g_map = this._components.components;
			while(_g_index < _g_map._keys.length) {
				var _component = _g_map.get(_g_map._keys[_g_index++]);
				_component.entity_parent_change(_parent);
			}
		}
	}
	,set_pos: function(_p) {
		return this.get_transform().set_pos(_p);
	}
	,get_pos: function() {
		return this.get_transform().get_pos();
	}
	,set_rotation: function(_r) {
		return this.get_transform().set_rotation(_r);
	}
	,get_rotation: function() {
		return this.get_transform().get_rotation();
	}
	,set_scale: function(_s) {
		return this.get_transform().set_scale(_s);
	}
	,get_scale: function() {
		return this.get_transform().get_scale();
	}
	,set_origin: function(_origin) {
		return this.get_transform().set_origin(_origin);
	}
	,get_origin: function() {
		return this.get_transform().get_origin();
	}
	,set_transform: function(_transform) {
		return this.transform = _transform;
	}
	,get_transform: function() {
		return this.transform;
	}
	,set_parent: function(other) {
		if(this.get_parent() != null) this.get_parent()._remove_child(this);
		this.parent = other;
		if(this.get_parent() != null) {
			this.get_parent()._add_child(this);
			this.get_transform().set_parent(this.get_parent().get_transform());
		} else this.get_transform().set_parent(null);
		return this.get_parent();
	}
	,get_parent: function() {
		return this.parent;
	}
	,set_scene: function(_scene) {
		this._detach_scene();
		this.scene = _scene;
		this._attach_scene();
		return this.get_scene();
	}
	,get_scene: function() {
		return this.scene;
	}
	,set_active: function(_active) {
		return this.active = _active;
	}
	,get_active: function() {
		return this.active;
	}
	,__class__: luxe.Entity
	,__properties__: {set_origin:"set_origin",get_origin:"get_origin",set_scale:"set_scale",get_scale:"get_scale",set_rotation:"set_rotation",get_rotation:"get_rotation",set_pos:"set_pos",get_pos:"get_pos",set_transform:"set_transform",get_transform:"get_transform",set_active:"set_active",get_active:"get_active",set_scene:"set_scene",get_scene:"get_scene",set_parent:"set_parent",get_parent:"get_parent",set_fixed_rate:"set_fixed_rate",get_fixed_rate:"get_fixed_rate",get_components:"get_components"}
});
luxe.Camera = function(options) {
	this._connected = false;
	this.minimum_shake = 0.1;
	this.shaking = false;
	this._size_factor = new phoenix.Vector();
	this._rotation_radian = new phoenix.Vector();
	this._rotation_cache = new phoenix.Quaternion();
	this.set_size_mode(luxe.SizeMode.fit);
	var _name = "untitled camera";
	if(options != null) {
		if(options.name != null) _name = options.name;
	} else options = { no_scene : false};
	if(options.view == null) this.view = new phoenix.Camera(options); else this.view = options.view;
	luxe.Entity.call(this,{ name : _name, no_scene : options.no_scene},{ fileName : "Camera.hx", lineNumber : 91, className : "luxe.Camera", methodName : "new"});
	this._final_pos = this.view.get_pos();
};
$hxClasses["luxe.Camera"] = luxe.Camera;
luxe.Camera.__name__ = ["luxe","Camera"];
luxe.Camera.__super__ = luxe.Entity;
luxe.Camera.prototype = $extend(luxe.Entity.prototype,{
	get_viewport: function() {
		return this.view.get_viewport();
	}
	,set_viewport: function(_v) {
		return this.view.set_viewport(_v);
	}
	,get_center: function() {
		return this.view.get_center();
	}
	,set_center: function(_c) {
		this.set_pos(new phoenix.Vector(_c.x - this.get_viewport().w / 2,_c.y - this.get_viewport().h / 2));
		return this.view.set_center(_c);
	}
	,get_minimum_zoom: function() {
		return this.view.minimum_zoom;
	}
	,set_minimum_zoom: function(_m) {
		return this.view.minimum_zoom = _m;
	}
	,get_zoom: function() {
		return this.view.zoom;
	}
	,set_zoom: function(_z) {
		this.view.set_zoom(_z);
		if(this.get_size() != null) {
			var _g = this.view.get_scale();
			_g.set_x(_g.x * (1 / this._size_factor.x));
			var _g1 = this.view.get_scale();
			_g1.set_y(_g1.y * (1 / this._size_factor.y));
		}
		return this.view.zoom;
	}
	,get_size: function() {
		return this.size;
	}
	,get_size_mode: function() {
		return this.size_mode;
	}
	,set_size_mode: function(_m) {
		if(this.get_size_mode() != null) {
			this.size_mode = _m;
			if(this.get_size() != null) this.set_size(this.get_size());
		}
		return this.size_mode = _m;
	}
	,_onwindowsized: function(_event) {
		if(this.get_size() != null) {
			this.set_viewport(new phoenix.Rectangle(this.get_viewport().x,this.get_viewport().y,_event.event.x,_event.event.y));
			this.set_size(this.get_size());
		}
	}
	,set_size: function(_size) {
		if(_size == null) {
			this.set_center(new phoenix.Vector(this.get_viewport().w / 2,this.get_viewport().h / 2));
			this.size = _size;
			this._size_factor.set_x(this._size_factor.set_y(1));
			this.set_zoom(this.get_zoom());
			this._connected = false;
			Luxe.off(29,$bind(this,this._onwindowsized));
			return this.get_size();
		}
		if(!this._connected) {
			Luxe.on(29,$bind(this,this._onwindowsized));
			this._connected = true;
		}
		var _ratio_x = this.get_viewport().w / _size.x;
		var _ratio_y = this.get_viewport().h / _size.y;
		var _shortest = Math.max(_ratio_x,_ratio_y);
		var _longest = Math.min(_ratio_x,_ratio_y);
		var _g = this.get_size_mode();
		switch(_g[1]) {
		case 0:
			_ratio_x = _ratio_y = _longest;
			break;
		case 1:
			_ratio_x = _ratio_y = _shortest;
			break;
		case 2:
			break;
		}
		this._size_factor.set_x(_ratio_x);
		this._size_factor.set_y(_ratio_y);
		this.view.get_scale().set_x(1 / (this._size_factor.x * this.get_zoom()));
		this.view.get_scale().set_y(1 / (this._size_factor.y * this.get_zoom()));
		this.set_center(new phoenix.Vector(_size.x / 2,_size.y / 2));
		return this.size = new phoenix.Vector(_size.x,_size.y,_size.z,_size.w);
	}
	,focus: function(_p,_t,oncomplete) {
		if(_t == null) _t = 0.6;
		var _g = this;
		luxe.tween.Actuate.tween(this.view.get_center(),_t,{ x : _p.x, y : _p.y},true).onComplete(oncomplete).ease(luxe.tween.easing.Quad.get_easeInOut()).onUpdate(function() {
			_g.get_transform().get_pos().set_xy(_g.view.get_pos().x,_g.view.get_pos().y);
		});
	}
	,screen_point_to_world: function(_vector) {
		return this.view.screen_point_to_world(_vector);
	}
	,world_point_to_screen: function(_vector,_viewport) {
		return this.view.world_point_to_screen(_vector,_viewport);
	}
	,set_pos_from_transform: function(_pos) {
		var vw = this.view.get_viewport().w;
		var vh = this.view.get_viewport().h;
		var hvw = vw / 2;
		var hvh = vh / 2;
		var _px = _pos.x;
		var _py = _pos.y;
		if(this.bounds != null) {
			if(_px < this.bounds.x) _px = this.bounds.x;
			if(_py < this.bounds.y) _py = this.bounds.y;
			if(_px + hvw > this.bounds.w - vw) _px = this.bounds.w - vw - hvw;
			if(_py + hvh > this.bounds.h - vh) _py = this.bounds.h - vh - hvh;
		}
		var prev = _pos.ignore_listeners;
		_pos.ignore_listeners = true;
		_pos.set_xy(_px,_py);
		_pos.ignore_listeners = prev;
		luxe.Entity.prototype.set_pos_from_transform.call(this,_pos);
		this.update_view_pos = _pos;
	}
	,set_rotation_from_transform: function(_rotation) {
		luxe.Entity.prototype.set_rotation_from_transform.call(this,_rotation);
		if(this.view != null) this.view.set_rotation(_rotation);
	}
	,set_scale_from_transform: function(_scale) {
		luxe.Entity.prototype.set_scale_from_transform.call(this,_scale);
		if(this.view != null) this.view.set_scale(_scale);
	}
	,shake: function(amount) {
		this.shake_amount = amount;
		this.shaking = true;
	}
	,update: function(dt) {
		if(this.shaking) {
			this._final_pos.set_xyz(this.get_transform().get_pos().x,this.get_transform().get_pos().y,this.get_transform().get_pos().z);
			this.shake_vector = Luxe.utils.geometry.random_point_in_unit_circle();
			var _g = this.shake_vector;
			_g.set_x(_g.x * this.shake_amount);
			var _g1 = this.shake_vector;
			_g1.set_y(_g1.y * this.shake_amount);
			var _g2 = this.shake_vector;
			_g2.set_z(_g2.z * this.shake_amount);
			this.shake_amount *= 0.9;
			if(this.shake_amount <= this.minimum_shake) {
				this.shake_amount = 0;
				this.shaking = false;
			}
			this._final_pos.set_xyz(this._final_pos.x + this.shake_vector.x,this._final_pos.y + this.shake_vector.y,this._final_pos.z + this.shake_vector.z);
			this.update_view_pos = this._final_pos;
		}
		if(this.update_view_pos != null && this.view != null) {
			this.view.set_pos(this.update_view_pos.clone());
			this.update_view_pos = null;
		}
	}
	,init: function() {
	}
	,ondestroy: function() {
		luxe.Entity.prototype.ondestroy.call(this);
	}
	,__class__: luxe.Camera
	,__properties__: $extend(luxe.Entity.prototype.__properties__,{set_size_mode:"set_size_mode",get_size_mode:"get_size_mode",set_size:"set_size",get_size:"get_size",set_minimum_zoom:"set_minimum_zoom",get_minimum_zoom:"get_minimum_zoom",set_zoom:"set_zoom",get_zoom:"get_zoom",set_center:"set_center",get_center:"get_center",set_viewport:"set_viewport",get_viewport:"get_viewport"})
});
luxe.ID = function(_name,_id) {
	if(_id == null) _id = "";
	if(_name == null) _name = "";
	this.name = "";
	this.name = _name;
	if(_id == "") this.id = Luxe.utils.uniqueid(); else this.id = _id;
};
$hxClasses["luxe.ID"] = luxe.ID;
luxe.ID.__name__ = ["luxe","ID"];
luxe.ID.prototype = {
	__class__: luxe.ID
};
luxe.Component = function(_options) {
	var _name = "";
	if(_options != null) {
		if(_options.name != null) _name = _options.name;
	}
	luxe.ID.call(this,_name == ""?Luxe.utils.uniqueid():_name);
};
$hxClasses["luxe.Component"] = luxe.Component;
luxe.Component.__name__ = ["luxe","Component"];
luxe.Component.__super__ = luxe.ID;
luxe.Component.prototype = $extend(luxe.ID.prototype,{
	init: function() {
	}
	,update: function(dt) {
	}
	,onadded: function() {
	}
	,onremoved: function() {
	}
	,onfixedupdate: function(rate) {
	}
	,onreset: function() {
	}
	,ondestroy: function() {
	}
	,onkeyup: function(event) {
	}
	,onkeydown: function(event) {
	}
	,ontextinput: function(event) {
	}
	,oninputdown: function(event) {
	}
	,oninputup: function(event) {
	}
	,onmousedown: function(event) {
	}
	,onmouseup: function(event) {
	}
	,onmousemove: function(event) {
	}
	,onmousewheel: function(event) {
	}
	,ontouchdown: function(event) {
	}
	,ontouchup: function(event) {
	}
	,ontouchmove: function(event) {
	}
	,ongamepadup: function(event) {
	}
	,ongamepaddown: function(event) {
	}
	,ongamepadaxis: function(event) {
	}
	,ongamepaddevice: function(event) {
	}
	,onwindowmoved: function(event) {
	}
	,onwindowresized: function(event) {
	}
	,onwindowsized: function(event) {
	}
	,onwindowminimized: function(event) {
	}
	,onwindowrestored: function(event) {
	}
	,add: function(component) {
		return this.get_entity().add(component);
	}
	,remove: function(_name) {
		return this.get_entity().remove(_name);
	}
	,get: function(_name,in_children) {
		if(in_children == null) in_children = false;
		return this.get_entity().get(_name,in_children);
	}
	,get_any: function(_name,in_children,first_only) {
		if(first_only == null) first_only = true;
		if(in_children == null) in_children = false;
		return this.get_entity().get_any(_name,in_children,first_only);
	}
	,has: function(_name) {
		return this.get_entity().has(_name);
	}
	,_detach_entity: function() {
		if(this.get_entity() != null) {
		}
	}
	,_attach_entity: function() {
		if(this.get_entity() != null) {
		}
	}
	,set_entity: function(_entity) {
		this._detach_entity();
		this.entity = _entity;
		this._attach_entity();
		return this.get_entity();
	}
	,get_entity: function() {
		return this.entity;
	}
	,set_pos: function(_p) {
		return this.get_entity().get_transform().set_pos(_p);
	}
	,get_pos: function() {
		return this.get_entity().get_transform().get_pos();
	}
	,set_rotation: function(_r) {
		return this.get_entity().get_transform().set_rotation(_r);
	}
	,get_rotation: function() {
		return this.get_entity().get_transform().get_rotation();
	}
	,set_scale: function(_s) {
		return this.get_entity().get_transform().set_scale(_s);
	}
	,get_scale: function() {
		return this.get_entity().get_transform().get_scale();
	}
	,set_origin: function(_o) {
		return this.get_entity().get_transform().set_origin(_o);
	}
	,get_origin: function() {
		return this.get_entity().get_transform().get_origin();
	}
	,set_transform: function(_o) {
		return this.get_entity().set_transform(_o);
	}
	,get_transform: function() {
		return this.get_entity().get_transform();
	}
	,entity_pos_change: function(_pos) {
	}
	,entity_scale_change: function(_scale) {
	}
	,entity_rotation_change: function(_rotation) {
	}
	,entity_origin_change: function(_origin) {
	}
	,entity_parent_change: function(_parent) {
	}
	,__class__: luxe.Component
	,__properties__: {set_origin:"set_origin",get_origin:"get_origin",set_scale:"set_scale",get_scale:"get_scale",set_rotation:"set_rotation",get_rotation:"get_rotation",set_pos:"set_pos",get_pos:"get_pos",set_entity:"set_entity",get_entity:"get_entity"}
});
var snow = {};
snow.App = function() {
	this.next_render = 0;
	this.next_tick = 0;
	this.alpha = 1.0;
	this.cur_frame_start = 0.0;
	this.current_time = 0;
	this.last_frame_start = 0.0;
	this.delta_sim = 0.0166666666666666664;
	this.delta_time = 0.0166666666666666664;
	this.max_frame_time = 0.25;
	this.update_rate = 0;
	this.render_rate = 0.0166666666666666664;
	this.fixed_delta = 0;
	this.timescale = 1;
};
$hxClasses["snow.App"] = snow.App;
snow.App.__name__ = ["snow","App"];
snow.App.prototype = {
	config: function(config) {
		return config;
	}
	,ready: function() {
	}
	,update: function(dt) {
	}
	,ondestroy: function() {
	}
	,onevent: function(event) {
	}
	,onkeydown: function(keycode,scancode,repeat,mod,timestamp,window_id) {
	}
	,onkeyup: function(keycode,scancode,repeat,mod,timestamp,window_id) {
	}
	,ontextinput: function(text,start,length,type,timestamp,window_id) {
	}
	,onmousedown: function(x,y,button,timestamp,window_id) {
	}
	,onmouseup: function(x,y,button,timestamp,window_id) {
	}
	,onmousewheel: function(x,y,timestamp,window_id) {
	}
	,onmousemove: function(x,y,xrel,yrel,timestamp,window_id) {
	}
	,ontouchdown: function(x,y,touch_id,timestamp) {
	}
	,ontouchup: function(x,y,touch_id,timestamp) {
	}
	,ontouchmove: function(x,y,dx,dy,touch_id,timestamp) {
	}
	,ongamepadaxis: function(gamepad,axis,value,timestamp) {
	}
	,ongamepaddown: function(gamepad,button,value,timestamp) {
	}
	,ongamepadup: function(gamepad,button,value,timestamp) {
	}
	,ongamepaddevice: function(gamepad,type,timestamp) {
	}
	,on_internal_init: function() {
		this.cur_frame_start = snow.Snow.core.timestamp();
		this.last_frame_start = this.cur_frame_start;
		this.current_time = 0;
		this.delta_time = 0.016;
	}
	,on_internal_update: function() {
		if(this.update_rate != 0) {
			if(this.next_tick < snow.Snow.core.timestamp()) this.next_tick = snow.Snow.core.timestamp() + this.update_rate; else return;
		}
		this.cur_frame_start = snow.Snow.core.timestamp();
		this.delta_time = this.cur_frame_start - this.last_frame_start;
		this.last_frame_start = this.cur_frame_start;
		if(this.delta_time > this.max_frame_time) this.delta_time = this.max_frame_time;
		var used_delta;
		if(this.fixed_delta == 0) used_delta = this.delta_time; else used_delta = this.fixed_delta;
		used_delta *= this.timescale;
		this.delta_sim = used_delta;
		this.current_time += used_delta;
		this.app.do_internal_update(used_delta);
	}
	,on_internal_render: function() {
		if(this.render_rate != 0) {
			if(this.next_render < snow.Snow.core.timestamp()) {
				this.app.render();
				this.next_render += this.render_rate;
			}
		}
	}
	,__class__: snow.App
};
luxe.Core = function(_game,_config) {
	this.inited = false;
	this.has_shutdown = false;
	this.shutting_down = false;
	this.headless = false;
	this.console_visible = false;
	snow.App.call(this);
	this.appconfig = _config;
	this.game = _game;
	this.game.app = this;
	this.emitter = new luxe.Emitter();
	Luxe.core = this;
	Luxe.utils = new luxe.utils.Utils(this);
};
$hxClasses["luxe.Core"] = luxe.Core;
luxe.Core.__name__ = ["luxe","Core"];
luxe.Core.__super__ = snow.App;
luxe.Core.prototype = $extend(snow.App.prototype,{
	ready: function() {
		var _g = this;
		Luxe.version = haxe.Resource.getString("version");
		Luxe.build = Luxe.version + haxe.Resource.getString("build");
		haxe.Log.trace("     i / luxe / " + ("" + Luxe.core.app.platform + " / version " + Luxe.build),{ fileName : "Core.hx", lineNumber : 112, className : "luxe.Core", methodName : "ready"});
		this.headless = this.app.window == null;
		if(!this.headless) {
			var _font_name = "default.png";
			var _font_image = snow.api.buffers._Uint8Array.Uint8Array_Impl_.fromBytes(haxe.Resource.getBytes(_font_name));
			var _font_load = snow.system.assets.AssetImage.load_from_bytes(this.app.assets,_font_name,_font_image);
			_font_load.then(function(asset) {
				_g.init(asset);
			}).error(function(error) {
				haxe.Log.trace("     i / luxe / " + "failed to load default font, things will probably not look right... $error",{ fileName : "Core.hx", lineNumber : 133, className : "luxe.Core", methodName : "ready"});
				_g.init(null);
			});
		} else this.init(null);
	}
	,ondestroy: function() {
		this.shutting_down = true;
		haxe.Log.trace("     i / luxe / " + "shutting down...",{ fileName : "Core.hx", lineNumber : 151, className : "luxe.Core", methodName : "ondestroy"});
		this.game.ondestroy();
		this.emitter.emit(6,null,{ fileName : "Core.hx", lineNumber : 157, className : "luxe.Core", methodName : "ondestroy"});
		if(this.renderer != null) this.renderer.destroy();
		this.physics.destroy();
		this.input.destroy();
		this.audio.destroy();
		this.timer.destroy();
		this.events.destroy();
		this.debug.destroy();
		this.emitter = null;
		this.input = null;
		this.audio = null;
		this.events = null;
		this.timer = null;
		this.debug = null;
		Luxe.utils = null;
		this.has_shutdown = true;
		haxe.Log.trace("     i / luxe / " + "goodbye.",{ fileName : "Core.hx", lineNumber : 183, className : "luxe.Core", methodName : "ondestroy"});
	}
	,init: function(asset) {
		Luxe.debug = this.debug = new luxe.Debug(this);
		Luxe.io = this.io = new luxe.IO(this);
		this.draw = new luxe.Draw(this);
		this.timer = new luxe.Timer(this);
		this.events = new luxe.Events();
		this.audio = new luxe.Audio(this);
		this.input = new luxe.Input(this);
		this.physics = new luxe.Physics(this);
		this.resources = new luxe.resource.Resources();
		Luxe.resources = this.resources;
		if(!this.headless) {
			this.app.window.onevent = $bind(this,this.window_event);
			this.renderer = new phoenix.Renderer(this,asset);
			Luxe.renderer = this.renderer;
		}
		var _window_w = 0;
		var _window_h = 0;
		if(this.app.window != null) {
			_window_w = this.app.window.width;
			_window_h = this.app.window.height;
		}
		this.screen = new luxe.Screen(this,_window_w,_window_h);
		this.debug.init();
		this.io.init();
		this.timer.init();
		this.audio.init();
		this.input.init();
		if(!this.headless) this.renderer.init();
		this.physics.init();
		Luxe.audio = this.audio;
		Luxe.draw = this.draw;
		Luxe.events = this.events;
		Luxe.timer = this.timer;
		Luxe.input = this.input;
		if(!this.headless) Luxe.camera = new luxe.Camera({ name : "default camera", view : this.renderer.camera});
		Luxe.physics = this.physics;
		this.scene = new luxe.Scene("default scene");
		Luxe.scene = this.scene;
		if(!this.headless) {
			this.scene.add(Luxe.camera,{ fileName : "Core.hx", lineNumber : 260, className : "luxe.Core", methodName : "init"});
			this.debug.create_debug_console();
		}
		if(this.app.window != null && !this.headless) {
			this.app.window.onrender = $bind(this,this.render);
			this.debug.start(luxe.Tag.update,50);
			this.debug.start(luxe.Tag.renderdt,50);
		}
		this.internal_ready();
	}
	,internal_ready: function() {
		this.game.ready();
		if(!this.shutting_down) {
			this.emitter.emit(2,null,{ fileName : "Core.hx", lineNumber : 294, className : "luxe.Core", methodName : "internal_ready"});
			this.inited = true;
			this.physics.reset();
			if(!this.app.snow_config.has_loop) this.shutdown();
		}
	}
	,shutdown: function() {
		this.shutting_down = true;
		snow.Snow.next(($_=this.app,$bind($_,$_.shutdown)));
	}
	,on: function(event,handler) {
		this.emitter.on(event,handler,{ fileName : "Core.hx", lineNumber : 321, className : "luxe.Core", methodName : "on"});
	}
	,off: function(event,handler) {
		return this.emitter.off(event,handler,{ fileName : "Core.hx", lineNumber : 325, className : "luxe.Core", methodName : "off"});
	}
	,emit: function(event,data) {
		return this.emitter.emit(event,data,{ fileName : "Core.hx", lineNumber : 329, className : "luxe.Core", methodName : "emit"});
	}
	,onevent: function(event) {
		if(!this.inited) return;
		this.game.onevent(event);
	}
	,update: function(dt) {
		if(this.has_shutdown) return;
		if(!this.inited) return;
		this.debug.end(luxe.Tag.update);
		this.debug.start(luxe.Tag.update);
		this.timer.process();
		this.input.process();
		this.audio.process();
		this.events.process();
		this.physics.process();
		this.debug.start(luxe.Tag.updates);
		this.emitter.emit(4,dt,{ fileName : "Core.hx", lineNumber : 378, className : "luxe.Core", methodName : "update"});
		this.debug.end(luxe.Tag.updates);
		this.debug.start(luxe.Tag.game_update);
		this.game.update(dt);
		this.debug.end(luxe.Tag.game_update);
		this.debug.process();
	}
	,window_event: function(_event) {
		if(this.shutting_down) return;
		if(!this.inited) return;
		this.emitter.emit(26,_event,{ fileName : "Core.hx", lineNumber : 398, className : "luxe.Core", methodName : "window_event"});
		var _g = _event.type;
		switch(_g) {
		case 5:
			this.emitter.emit(27,_event,{ fileName : "Core.hx", lineNumber : 403, className : "luxe.Core", methodName : "window_event"});
			this.game.onwindowmoved(_event);
			break;
		case 6:
			this.screen.internal_resized(_event.event.x,_event.event.y);
			this.renderer.internal_resized(_event.event.x,_event.event.y);
			this.emitter.emit(28,_event,{ fileName : "Core.hx", lineNumber : 410, className : "luxe.Core", methodName : "window_event"});
			this.game.onwindowresized(_event);
			break;
		case 7:
			this.screen.internal_resized(_event.event.x,_event.event.y);
			this.renderer.internal_resized(_event.event.x,_event.event.y);
			this.emitter.emit(29,_event,{ fileName : "Core.hx", lineNumber : 417, className : "luxe.Core", methodName : "window_event"});
			this.game.onwindowsized(_event);
			break;
		case 8:
			this.emitter.emit(30,_event,{ fileName : "Core.hx", lineNumber : 422, className : "luxe.Core", methodName : "window_event"});
			this.game.onwindowminimized(_event);
			break;
		case 10:
			this.emitter.emit(31,_event,{ fileName : "Core.hx", lineNumber : 427, className : "luxe.Core", methodName : "window_event"});
			this.game.onwindowrestored(_event);
			break;
		default:
		}
	}
	,render: function(window) {
		if(this.shutting_down) return;
		if(!this.inited) return;
		this.debug.end(luxe.Tag.renderdt);
		this.debug.start(luxe.Tag.renderdt);
		if(!this.headless) {
			this.debug.start(luxe.Tag.render);
			this.emitter.emit(7,null,{ fileName : "Core.hx", lineNumber : 449, className : "luxe.Core", methodName : "render"});
			this.game.onprerender();
			this.emitter.emit(8,null,{ fileName : "Core.hx", lineNumber : 452, className : "luxe.Core", methodName : "render"});
			this.game.onrender();
			this.renderer.process();
			this.emitter.emit(9,null,{ fileName : "Core.hx", lineNumber : 456, className : "luxe.Core", methodName : "render"});
			this.game.onpostrender();
			this.debug.end(luxe.Tag.render);
		}
	}
	,show_console: function(_show) {
		if(_show == null) _show = true;
		this.console_visible = _show;
		this.debug.show_console(this.console_visible);
	}
	,onkeydown: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		if(!this.inited) return;
		var event = { scancode : scancode, keycode : keycode, state : luxe.InteractState.down, mod : mod, repeat : repeat, timestamp : timestamp, window_id : window_id};
		if(!this.shutting_down) {
			this.input.check_named_keys(event,true);
			this.emitter.emit(10,event,{ fileName : "Core.hx", lineNumber : 492, className : "luxe.Core", methodName : "onkeydown"});
			this.game.onkeydown(event);
			if(scancode == snow.system.input.Scancodes.grave) this.show_console(!this.console_visible);
		}
	}
	,onkeyup: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		if(!this.inited) return;
		var event = { scancode : scancode, keycode : keycode, state : luxe.InteractState.up, mod : mod, repeat : repeat, timestamp : timestamp, window_id : window_id};
		if(!this.shutting_down) {
			this.input.check_named_keys(event);
			this.emitter.emit(11,event,{ fileName : "Core.hx", lineNumber : 522, className : "luxe.Core", methodName : "onkeyup"});
			this.game.onkeyup(event);
		}
	}
	,ontextinput: function(text,start,length,type,timestamp,window_id) {
		if(!this.inited) return;
		var _type = luxe.TextEventType.unknown;
		switch(type) {
		case 1:
			_type = luxe.TextEventType.edit;
			break;
		case 2:
			_type = luxe.TextEventType.input;
			break;
		default:
			return;
		}
		var event = { text : text, start : start, length : length, type : _type, timestamp : timestamp, window_id : window_id};
		if(!this.shutting_down) {
			this.emitter.emit(12,event,{ fileName : "Core.hx", lineNumber : 555, className : "luxe.Core", methodName : "ontextinput"});
			this.game.ontextinput(event);
		}
	}
	,oninputdown: function(name,event) {
		if(!this.inited) return;
		if(!this.shutting_down) {
			this.emitter.emit(13,{ name : name, event : event},{ fileName : "Core.hx", lineNumber : 571, className : "luxe.Core", methodName : "oninputdown"});
			this.game.oninputdown(name,event);
		}
	}
	,oninputup: function(name,event) {
		if(!this.inited) return;
		if(!this.shutting_down) {
			this.emitter.emit(14,{ name : name, event : event},{ fileName : "Core.hx", lineNumber : 585, className : "luxe.Core", methodName : "oninputup"});
			this.game.oninputup(name,event);
		}
	}
	,onmousedown: function(x,y,button,timestamp,window_id) {
		if(!this.inited) return;
		this.screen.cursor.set_internal(new phoenix.Vector(x,y));
		var event = { timestamp : timestamp, window_id : window_id, state : luxe.InteractState.down, button : button, x : x, y : y, xrel : x, yrel : y, pos : this.screen.cursor.get_pos()};
		if(!this.shutting_down) {
			this.input.check_named_mouse(event,true);
			this.emitter.emit(15,event,{ fileName : "Core.hx", lineNumber : 617, className : "luxe.Core", methodName : "onmousedown"});
			this.game.onmousedown(event);
		}
	}
	,onmouseup: function(x,y,button,timestamp,window_id) {
		if(!this.inited) return;
		this.screen.cursor.set_internal(new phoenix.Vector(x,y));
		var event = { timestamp : timestamp, window_id : window_id, state : luxe.InteractState.up, button : button, x : x, y : y, xrel : x, yrel : y, pos : this.screen.cursor.get_pos()};
		if(!this.shutting_down) {
			this.input.check_named_mouse(event);
			this.emitter.emit(16,event,{ fileName : "Core.hx", lineNumber : 646, className : "luxe.Core", methodName : "onmouseup"});
			this.game.onmouseup(event);
		}
	}
	,onmousemove: function(x,y,xrel,yrel,timestamp,window_id) {
		if(!this.inited) return;
		this.screen.cursor.set_internal(new phoenix.Vector(x,y));
		var event = { timestamp : timestamp, window_id : window_id, state : luxe.InteractState.move, button : 0, x : x, y : y, xrel : xrel, yrel : yrel, pos : this.screen.cursor.get_pos()};
		if(!this.shutting_down) {
			this.emitter.emit(17,event,{ fileName : "Core.hx", lineNumber : 674, className : "luxe.Core", methodName : "onmousemove"});
			this.game.onmousemove(event);
		}
	}
	,onmousewheel: function(x,y,timestamp,window_id) {
		if(!this.inited) return;
		var event = { timestamp : timestamp, window_id : window_id, state : luxe.InteractState.wheel, button : 0, x : x, y : y, xrel : x, yrel : y, pos : this.screen.cursor.get_pos()};
		if(!this.shutting_down) {
			this.input.check_named_mouse(event,false);
			this.emitter.emit(18,event,{ fileName : "Core.hx", lineNumber : 700, className : "luxe.Core", methodName : "onmousewheel"});
			this.game.onmousewheel(event);
		}
	}
	,ontouchdown: function(x,y,touch_id,timestamp) {
		if(!this.inited) return;
		this._touch_pos = new phoenix.Vector(x,y);
		var event = { state : luxe.InteractState.down, timestamp : timestamp, touch_id : touch_id, x : x, y : y, dx : x, dy : y, pos : this._touch_pos};
		if(!this.shutting_down) {
			this.emitter.emit(19,event,{ fileName : "Core.hx", lineNumber : 730, className : "luxe.Core", methodName : "ontouchdown"});
			this.game.ontouchdown(event);
			if(this.app.input.touch_count == 3) {
				if(this.console_visible) this.debug.switch_view();
			}
			if(this.app.input.touch_count == 4) this.show_console(!this.console_visible);
		}
	}
	,ontouchup: function(x,y,touch_id,timestamp) {
		if(!this.inited) return;
		this._touch_pos = new phoenix.Vector(x,y);
		var event = { state : luxe.InteractState.up, timestamp : timestamp, touch_id : touch_id, x : x, y : y, dx : x, dy : y, pos : this._touch_pos};
		if(!this.shutting_down) {
			this.emitter.emit(20,event,{ fileName : "Core.hx", lineNumber : 773, className : "luxe.Core", methodName : "ontouchup"});
			this.game.ontouchup(event);
		}
	}
	,ontouchmove: function(x,y,dx,dy,touch_id,timestamp) {
		if(!this.inited) return;
		this._touch_pos = new phoenix.Vector(x,y);
		var event = { state : luxe.InteractState.move, timestamp : timestamp, touch_id : touch_id, x : x, y : y, dx : dx, dy : dy, pos : this._touch_pos};
		if(!this.shutting_down) {
			this.emitter.emit(21,event,{ fileName : "Core.hx", lineNumber : 799, className : "luxe.Core", methodName : "ontouchmove"});
			this.game.ontouchmove(event);
		}
	}
	,ongamepadaxis: function(gamepad,axis,value,timestamp) {
		if(!this.inited) return;
		var event = { timestamp : timestamp, type : luxe.GamepadEventType.axis, state : luxe.InteractState.axis, gamepad : gamepad, button : -1, axis : axis, value : value};
		if(!this.shutting_down) {
			this.emitter.emit(22,event,{ fileName : "Core.hx", lineNumber : 824, className : "luxe.Core", methodName : "ongamepadaxis"});
			this.game.ongamepadaxis(event);
		}
	}
	,ongamepaddown: function(gamepad,button,value,timestamp) {
		if(!this.inited) return;
		var event = { timestamp : timestamp, type : luxe.GamepadEventType.button, state : luxe.InteractState.down, gamepad : gamepad, button : button, axis : -1, value : value};
		if(!this.shutting_down) {
			this.input.check_named_gamepad_buttons(event,true);
			this.emitter.emit(23,event,{ fileName : "Core.hx", lineNumber : 848, className : "luxe.Core", methodName : "ongamepaddown"});
			this.game.ongamepaddown(event);
		}
	}
	,ongamepadup: function(gamepad,button,value,timestamp) {
		if(!this.inited) return;
		var event = { timestamp : timestamp, type : luxe.GamepadEventType.button, state : luxe.InteractState.up, gamepad : gamepad, button : button, axis : -1, value : value};
		if(!this.shutting_down) {
			this.input.check_named_gamepad_buttons(event,false);
			this.emitter.emit(24,event,{ fileName : "Core.hx", lineNumber : 872, className : "luxe.Core", methodName : "ongamepadup"});
			this.game.ongamepadup(event);
		}
	}
	,ongamepaddevice: function(gamepad,type,timestamp) {
		if(!this.inited) return;
		var _event_type = luxe.GamepadEventType.unknown;
		switch(type) {
		case 1:
			_event_type = luxe.GamepadEventType.device_added;
			break;
		case 2:
			_event_type = luxe.GamepadEventType.device_removed;
			break;
		case 3:
			_event_type = luxe.GamepadEventType.device_remapped;
			break;
		default:
		}
		var event = { timestamp : timestamp, type : _event_type, state : luxe.InteractState.none, gamepad : gamepad, button : -1, axis : -1, value : 0};
		if(!this.shutting_down) this.game.ongamepaddevice(event);
	}
	,config: function(config) {
		config.window.width = this.appconfig.window.width;
		config.window.height = this.appconfig.window.height;
		config.window.fullscreen = this.appconfig.window.fullscreen;
		config.window.borderless = this.appconfig.window.borderless;
		config.window.resizable = this.appconfig.window.resizable;
		config.window.title = this.appconfig.window.title;
		return this.game.config(config);
	}
	,__class__: luxe.Core
});
luxe.Tag = function() { };
$hxClasses["luxe.Tag"] = luxe.Tag;
luxe.Tag.__name__ = ["luxe","Tag"];
luxe.Debug = function(_core) {
	this.last_cursor_grab = false;
	this.last_cursor_shown = true;
	this.profiling = false;
	this.profile_path = "profile.txt";
	this.started = false;
	this.last_view_index = 0;
	this.current_view_index = 0;
	this.dt_average_count = 0;
	this.dt_average_span = 60;
	this.dt_average_accum = 0;
	this.dt_average = 0;
	this.visible = false;
	this.core = _core;
};
$hxClasses["luxe.Debug"] = luxe.Debug;
luxe.Debug.__name__ = ["luxe","Debug"];
luxe.Debug.internal_trace = function(v,inf) {
	var _line = StringTools.rpad(inf.lineNumber == null?"null":"" + inf.lineNumber," ",4);
	console.log("" + inf.fileName + "::" + _line + " " + Std.string(v));
	if(luxe.Debug.shut_down) return;
	var $it0 = luxe.Debug.trace_callbacks.iterator();
	while( $it0.hasNext() ) {
		var _callback = $it0.next();
		_callback(v,inf);
	}
};
luxe.Debug.prototype = {
	init: function() {
		luxe.Debug.trace_callbacks = new haxe.ds.StringMap();
		luxe.Debug.views = [new luxe.debug.TraceDebugView(),new luxe.debug.StatsDebugView(),new luxe.debug.ProfilerDebugView()];
		this.current_view = luxe.Debug.views[0];
		haxe.Log.trace = luxe.Debug.internal_trace;
		null;
	}
	,start: function(_name,_max) {
		if(_max == null) _max = 0.0;
		if(!this.core.headless) luxe.debug.ProfilerDebugView.start(_name,_max);
	}
	,end: function(_name) {
		if(!this.core.headless) luxe.debug.ProfilerDebugView.end(_name);
	}
	,remove_trace_listener: function(_name) {
		luxe.Debug.trace_callbacks.remove(_name);
	}
	,add_trace_listener: function(_name,_callback) {
		luxe.Debug.trace_callbacks.set(_name,_callback);
	}
	,create_debug_console: function() {
		var _g = this;
		this.core.on(11,$bind(this,this.keyup));
		this.core.on(10,$bind(this,this.keydown));
		this.core.on(16,$bind(this,this.mouseup));
		this.core.on(15,$bind(this,this.mousedown));
		this.core.on(17,$bind(this,this.mousemove));
		this.core.on(18,$bind(this,this.mousewheel));
		this.batcher = new phoenix.Batcher(Luxe.renderer,"debug_batcher");
		this.view = new phoenix.Camera();
		this.batcher.view = this.view;
		this.batcher.set_layer(999);
		Luxe.renderer.add_batch(this.batcher);
		this.overlay = new phoenix.geometry.QuadGeometry({ x : 0, y : 0, w : Luxe.core.screen.w, h : Luxe.core.screen.h, color : new phoenix.Color(0,0,0,0.8), depth : 999, group : 999, visible : false, batcher : this.batcher});
		this.padding = new phoenix.Vector(Luxe.core.screen.w * 0.05,Luxe.core.screen.h * 0.05);
		this.debug_inspector = new luxe.debug.Inspector({ title : "luxe debug", pos : new phoenix.Vector(this.padding.x,this.padding.y), size : new phoenix.Vector(Luxe.core.screen.w - this.padding.x * 2,Luxe.core.screen.h - this.padding.y * 2), batcher : this.batcher});
		this.debug_inspector.onrefresh = $bind(this,this.refresh);
		this.core.on(29,function(_event) {
			var _w = _event.event.x;
			var _h = _event.event.y;
			var _v = new phoenix.Vector(_w,_h);
			_g.padding.set_xy(_w * 0.05,_h * 0.05);
			_g.overlay.resize(_v);
			_g.view.set_viewport(new phoenix.Rectangle(0,0,_w,_h));
			_g.debug_inspector.set_size(new phoenix.Vector(_w - _g.padding.x * 2,_h - _g.padding.y * 2));
			_g.debug_inspector.set_pos(new phoenix.Vector(_g.padding.x,_g.padding.y));
			var _g1 = 0;
			var _g2 = luxe.Debug.views;
			while(_g1 < _g2.length) {
				var view = _g2[_g1];
				++_g1;
				view.onwindowsized(_event);
			}
		});
		this.batcher.enabled = false;
		var _g3 = 0;
		var _g11 = luxe.Debug.views;
		while(_g3 < _g11.length) {
			var view1 = _g11[_g3];
			++_g3;
			view1.create();
		}
	}
	,mouseup: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe.Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onmouseup(e);
			}
		}
	}
	,mousedown: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe.Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onmousedown(e);
			}
		}
	}
	,mousewheel: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe.Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onmousewheel(e);
			}
		}
	}
	,mousemove: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe.Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onmousemove(e);
			}
		}
	}
	,keyup: function(e) {
		if(this.visible) {
			var _g = 0;
			var _g1 = luxe.Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onkeyup(e);
			}
		}
	}
	,keydown: function(e) {
		if(this.visible) {
			if(e.keycode == snow.system.input.Keycodes.key_1 && this.core.console_visible) this.switch_view();
			var _g = 0;
			var _g1 = luxe.Debug.views;
			while(_g < _g1.length) {
				var view = _g1[_g];
				++_g;
				view.onkeydown(e);
			}
		}
	}
	,refresh: function() {
		this.current_view.refresh();
	}
	,switch_view: function() {
		this.last_view_index = this.current_view_index;
		this.current_view_index++;
		if(this.current_view_index > luxe.Debug.views.length - 1) this.current_view_index = 0;
		luxe.Debug.views[this.last_view_index].hide();
		this.current_view = luxe.Debug.views[this.current_view_index];
		this.current_view.show();
	}
	,show_console: function(_show) {
		if(_show == null) _show = true;
		if(_show) {
			this.last_cursor_shown = Luxe.core.screen.cursor.get_visible();
			this.last_cursor_grab = Luxe.core.screen.cursor.get_grab();
			Luxe.core.screen.cursor.set_visible(true);
			Luxe.core.screen.cursor.set_grab(false);
		} else {
			if(this.last_cursor_shown != true) Luxe.core.screen.cursor.set_visible(this.last_cursor_shown);
			if(this.last_cursor_grab != false) Luxe.core.screen.cursor.set_grab(this.last_cursor_grab);
		}
		this.visible = _show;
		this.batcher.enabled = _show;
		if(_show) {
			this.current_view.show();
			this.overlay.set_visible(true);
			this.debug_inspector.show();
		} else {
			this.current_view.hide();
			this.debug_inspector.hide();
			this.overlay.set_visible(false);
		}
	}
	,destroy: function() {
		this.core.off(11,$bind(this,this.keyup));
		this.core.off(10,$bind(this,this.keydown));
		this.core.off(16,$bind(this,this.mouseup));
		this.core.off(15,$bind(this,this.mousedown));
		this.core.off(17,$bind(this,this.mousemove));
		this.core.off(18,$bind(this,this.mousewheel));
		luxe.Debug.shut_down = true;
	}
	,process: function() {
		this.dt_average_accum += Luxe.core.delta_time;
		this.dt_average_count++;
		if(this.dt_average_count == this.dt_average_span - 1) {
			this.dt_average = this.dt_average_accum / this.dt_average_span;
			this.dt_average_accum = this.dt_average;
			this.dt_average_count = 0;
		}
		if(!this.visible) return;
		this.debug_inspector._title_text.set_text("[ " + this.current_view.name + " ] " + luxe.utils.Maths.fixed(Luxe.core.delta_time,5) + " / " + luxe.utils.Maths.fixed(this.dt_average,5));
		var _g = 0;
		var _g1 = luxe.Debug.views;
		while(_g < _g1.length) {
			var view = _g1[_g];
			++_g;
			view.process();
		}
	}
	,__class__: luxe.Debug
};
luxe.Draw = function(_core) {
	this.core = _core;
};
$hxClasses["luxe.Draw"] = luxe.Draw;
luxe.Draw.__name__ = ["luxe","Draw"];
luxe.Draw.prototype = {
	line: function(options) {
		if(options.p0 == null) throw "draw.line requires p0:Vector, and p1:Vector";
		if(options.p1 == null) throw "draw.line requires p0:Vector, and p1:Vector";
		if(options.id == null) options.id = "line.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		return new phoenix.geometry.LineGeometry(options);
	}
	,rectangle: function(options) {
		if(options.id == null) options.id = "rectangle.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		return new phoenix.geometry.RectangleGeometry(options);
	}
	,box: function(options) {
		if(options.id == null) options.id = "quad.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		return new phoenix.geometry.QuadGeometry(options);
	}
	,ring: function(options) {
		if(options.id == null) options.id = "ring.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		return new phoenix.geometry.RingGeometry(options);
	}
	,circle: function(options) {
		if(options.id == null) options.id = "circle.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		return new phoenix.geometry.CircleGeometry(options);
	}
	,arc: function(options) {
		if(options.id == null) options.id = "arc.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		return new phoenix.geometry.ArcGeometry(options);
	}
	,ngon: function(options) {
		if(options.id == null) options.id = "ngon.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		var _sides = 3;
		var _radius = 64;
		var _solid = false;
		var _x = 0;
		var _y = 0;
		var _angle = 0;
		if(options.sides != null) _sides = options.sides;
		if(options.r != null) _radius = options.r;
		if(options.x != null) _x = options.x;
		if(options.y != null) _y = options.y;
		if(options.angle != null) _angle = options.angle;
		if(options.solid != null) _solid = options.solid;
		var _geometry = new phoenix.geometry.Geometry(options);
		if(!_solid) _geometry.set_primitive_type(1); else _geometry.set_primitive_type(6);
		var _two_pi = 2 * Math.PI;
		var _sides_over_pi = Math.PI / _sides;
		var _sides_over_twopi = _two_pi / _sides;
		var _angle_rad = _angle * 0.0174532925199432781;
		if(_solid) _geometry.add(new phoenix.geometry.Vertex(new phoenix.Vector(_x,_y),options.color));
		var _count;
		if(_solid == false) _count = _sides; else _count = _sides + 1;
		var _points = [];
		var _g = 0;
		while(_g < _count) {
			var i = _g++;
			var __x = _radius * Math.sin(_angle_rad + _sides_over_pi + i * _sides_over_twopi);
			var __y = _radius * Math.cos(_angle_rad + _sides_over_pi + i * _sides_over_twopi);
			var __pos = new phoenix.Vector(_x + __x,_y + __y,0);
			_geometry.add(new phoenix.geometry.Vertex(__pos,options.color));
			if(!_solid) {
				if(i > 0) {
					var _last = _points[i - 1];
					_geometry.add(new phoenix.geometry.Vertex(__pos,options.color));
				}
			}
			_points.push(__pos);
		}
		if(!_solid) _geometry.add(new phoenix.geometry.Vertex(_points[0],options.color));
		return _geometry;
	}
	,texture: function(options) {
		if(options.id == null) options.id = "texture.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		var _x = 0;
		var _y = 0;
		var _w = 0;
		var _h = 0;
		var _tw = 64;
		var _th = 64;
		if(options.texture != null) {
			_tw = options.texture.width;
			_th = options.texture.height;
			if(options.size == null) {
				_w = _tw;
				_h = _th;
			}
		}
		if(options.pos != null) {
			_x = options.pos.x;
			_y = options.pos.y;
		}
		if(options.size != null) {
			_w = options.size.x;
			_h = options.size.y;
		}
		if(options.x == null) options.x = _x;
		if(options.y == null) options.y = _y;
		if(options.w == null) options.w = _w;
		if(options.h == null) options.h = _h;
		var _quad = new phoenix.geometry.QuadGeometry(options);
		var _ux = 0;
		var _uy = 0;
		var _uw = _tw;
		var _uh = _th;
		if(options.uv != null) {
			_ux = options.uv.x;
			_uy = options.uv.y;
			_uw = options.uv.w;
			_uh = options.uv.h;
		}
		_quad.uv(new phoenix.Rectangle(_ux,_uy,_uw,_uh));
		return _quad;
	}
	,text: function(options) {
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		return new phoenix.geometry.TextGeometry(options);
	}
	,plane: function(options) {
		if(options.id == null) options.id = "plane.geometry";
		if(options.batcher == null) options.batcher = Luxe.renderer.batcher;
		return new phoenix.geometry.PlaneGeometry(options);
	}
	,__class__: luxe.Draw
};
luxe.Events = function() {
	this.event_connections = new haxe.ds.StringMap();
	this.event_slots = new haxe.ds.StringMap();
	this.event_filters = new haxe.ds.StringMap();
	this.event_queue = new haxe.ds.StringMap();
	this.event_schedules = new haxe.ds.StringMap();
};
$hxClasses["luxe.Events"] = luxe.Events;
luxe.Events.__name__ = ["luxe","Events"];
luxe.Events.prototype = {
	destroy: function() {
		this.clear();
	}
	,clear: function() {
		var $it0 = this.event_schedules.iterator();
		while( $it0.hasNext() ) {
			var schedule = $it0.next();
			schedule.stop();
			schedule = null;
		}
		var $it1 = this.event_connections.keys();
		while( $it1.hasNext() ) {
			var connection = $it1.next();
			this.event_connections.remove(connection);
		}
		var $it2 = this.event_filters.keys();
		while( $it2.hasNext() ) {
			var filter = $it2.next();
			this.event_filters.remove(filter);
		}
		var $it3 = this.event_slots.keys();
		while( $it3.hasNext() ) {
			var slot = $it3.next();
			this.event_slots.remove(slot);
		}
		var $it4 = this.event_queue.keys();
		while( $it4.hasNext() ) {
			var event = $it4.next();
			this.event_queue.remove(event);
		}
	}
	,does_filter_event: function(_filter,_event) {
		var _replace_stars = new EReg("\\*","gi");
		var _final_filter = _replace_stars.replace(_filter,".*?");
		var _final_search = new EReg(_final_filter,"gi");
		return _final_search.match(_event);
	}
	,listen: function(_event_name,_listener) {
		var id = Luxe.utils.uniqueid();
		var connection = new luxe._Events.EventConnection(id,_event_name,_listener);
		this.event_connections.set(id,connection);
		var _has_stars = new EReg("\\*","gi");
		if(_has_stars.match(_event_name)) {
			if(!this.event_filters.exists(_event_name)) {
				var value = new Array();
				this.event_filters.set(_event_name,value);
			}
			this.event_filters.get(_event_name).push(connection);
		} else {
			if(!this.event_slots.exists(_event_name)) {
				var value1 = new Array();
				this.event_slots.set(_event_name,value1);
			}
			this.event_slots.get(_event_name).push(connection);
		}
		return id;
	}
	,disconnect: function(event_id) {
		if(this.event_connections.exists(event_id)) {
			var connection = this.event_connections.get(event_id);
			var event_slot = this.event_slots.get(connection.event_name);
			if(event_slot != null) {
				HxOverrides.remove(event_slot,connection);
				return true;
			} else {
				var event_filter = this.event_filters.get(connection.event_name);
				if(event_filter != null) {
					HxOverrides.remove(event_filter,connection);
					return true;
				} else return false;
			}
			return true;
		} else return false;
	}
	,queue: function(event_name,properties) {
		var id = Luxe.utils.uniqueid();
		var event = new luxe._Events.EventObject(id,event_name,properties);
		this.event_queue.set(id,event);
		return id;
	}
	,dequeue: function(event_id) {
		if(this.event_queue.exists(event_id)) {
			var event = this.event_queue.get(event_id);
			event = null;
			this.event_queue.remove(event_id);
			return true;
		}
		return false;
	}
	,process: function() {
		var $it0 = this.event_queue.iterator();
		while( $it0.hasNext() ) {
			var event = $it0.next();
			this.fire(event.name,event.properties);
		}
		if(this.event_queue.keys().hasNext()) {
			this.event_queue = null;
			this.event_queue = new haxe.ds.StringMap();
		}
	}
	,fire: function(_event_name,_properties) {
		var $it0 = this.event_filters.iterator();
		while( $it0.hasNext() ) {
			var _filter = $it0.next();
			if(_filter.length > 0) {
				var _filter_name = _filter[0].event_name;
				if(this.does_filter_event(_filter_name,_event_name)) {
					_properties = this.tag_properties(_properties,_event_name,_filter.length);
					var _g = 0;
					while(_g < _filter.length) {
						var _connection = _filter[_g];
						++_g;
						_connection.listener(_properties);
					}
				}
			}
		}
		if(this.event_slots.exists(_event_name)) {
			var connections = this.event_slots.get(_event_name);
			var _g1 = 0;
			while(_g1 < connections.length) {
				var connection = connections[_g1];
				++_g1;
				connection.listener(_properties);
			}
		} else return false;
		return false;
	}
	,schedule: function(time,event_name,properties) {
		var _g = this;
		var id = Luxe.utils.uniqueid();
		var _timer = Luxe.timer.schedule(time,function() {
			_g.fire(event_name,properties);
		});
		this.event_schedules.set(id,_timer);
		return id;
	}
	,unschedule: function(schedule_id) {
		if(this.event_schedules.exists(schedule_id)) {
			var timer = this.event_schedules.get(schedule_id);
			timer.stop();
			this.event_schedules.remove(schedule_id);
			return true;
		}
		return false;
	}
	,tag_properties: function(_properties,_name,_count) {
		if(_properties == null) _properties = { };
		_properties._event_name_ = _name;
		_properties._event_connection_count_ = _count;
		return _properties;
	}
	,__class__: luxe.Events
};
luxe._Events = {};
luxe._Events.EventConnection = function(_id,_event_name,_listener) {
	this.id = _id;
	this.listener = _listener;
	this.event_name = _event_name;
};
$hxClasses["luxe._Events.EventConnection"] = luxe._Events.EventConnection;
luxe._Events.EventConnection.__name__ = ["luxe","_Events","EventConnection"];
luxe._Events.EventConnection.prototype = {
	__class__: luxe._Events.EventConnection
};
luxe._Events.EventObject = function(_id,_event_name,_event_properties) {
	this.id = _id;
	this.name = _event_name;
	this.properties = _event_properties;
};
$hxClasses["luxe._Events.EventObject"] = luxe._Events.EventObject;
luxe._Events.EventObject.__name__ = ["luxe","_Events","EventObject"];
luxe._Events.EventObject.prototype = {
	__class__: luxe._Events.EventObject
};
luxe.IO = function(_core) {
	this.core = _core;
};
$hxClasses["luxe.IO"] = luxe.IO;
luxe.IO.__name__ = ["luxe","IO"];
luxe.IO.prototype = {
	url_open: function(_url) {
		this.core.app.io.module.url_open(_url);
	}
	,string_save: function(_key,_value,_slot) {
		if(_slot == null) _slot = 0;
		return this.core.app.io.string_save(_key,_value,_slot);
	}
	,string_load: function(_key,_slot) {
		if(_slot == null) _slot = 0;
		return this.core.app.io.string_load(_key,_slot);
	}
	,init: function() {
	}
	,__class__: luxe.IO
};
luxe._Input = {};
luxe._Input.MouseButton_Impl_ = function() { };
$hxClasses["luxe._Input.MouseButton_Impl_"] = luxe._Input.MouseButton_Impl_;
luxe._Input.MouseButton_Impl_.__name__ = ["luxe","_Input","MouseButton_Impl_"];
luxe.InteractState = $hxClasses["luxe.InteractState"] = { __ename__ : ["luxe","InteractState"], __constructs__ : ["unknown","none","down","up","move","wheel","axis"] };
luxe.InteractState.unknown = ["unknown",0];
luxe.InteractState.unknown.toString = $estr;
luxe.InteractState.unknown.__enum__ = luxe.InteractState;
luxe.InteractState.none = ["none",1];
luxe.InteractState.none.toString = $estr;
luxe.InteractState.none.__enum__ = luxe.InteractState;
luxe.InteractState.down = ["down",2];
luxe.InteractState.down.toString = $estr;
luxe.InteractState.down.__enum__ = luxe.InteractState;
luxe.InteractState.up = ["up",3];
luxe.InteractState.up.toString = $estr;
luxe.InteractState.up.__enum__ = luxe.InteractState;
luxe.InteractState.move = ["move",4];
luxe.InteractState.move.toString = $estr;
luxe.InteractState.move.__enum__ = luxe.InteractState;
luxe.InteractState.wheel = ["wheel",5];
luxe.InteractState.wheel.toString = $estr;
luxe.InteractState.wheel.__enum__ = luxe.InteractState;
luxe.InteractState.axis = ["axis",6];
luxe.InteractState.axis.toString = $estr;
luxe.InteractState.axis.__enum__ = luxe.InteractState;
luxe.TextEventType = $hxClasses["luxe.TextEventType"] = { __ename__ : ["luxe","TextEventType"], __constructs__ : ["unknown","edit","input"] };
luxe.TextEventType.unknown = ["unknown",0];
luxe.TextEventType.unknown.toString = $estr;
luxe.TextEventType.unknown.__enum__ = luxe.TextEventType;
luxe.TextEventType.edit = ["edit",1];
luxe.TextEventType.edit.toString = $estr;
luxe.TextEventType.edit.__enum__ = luxe.TextEventType;
luxe.TextEventType.input = ["input",2];
luxe.TextEventType.input.toString = $estr;
luxe.TextEventType.input.__enum__ = luxe.TextEventType;
luxe.GamepadEventType = $hxClasses["luxe.GamepadEventType"] = { __ename__ : ["luxe","GamepadEventType"], __constructs__ : ["unknown","axis","button","device_added","device_removed","device_remapped"] };
luxe.GamepadEventType.unknown = ["unknown",0];
luxe.GamepadEventType.unknown.toString = $estr;
luxe.GamepadEventType.unknown.__enum__ = luxe.GamepadEventType;
luxe.GamepadEventType.axis = ["axis",1];
luxe.GamepadEventType.axis.toString = $estr;
luxe.GamepadEventType.axis.__enum__ = luxe.GamepadEventType;
luxe.GamepadEventType.button = ["button",2];
luxe.GamepadEventType.button.toString = $estr;
luxe.GamepadEventType.button.__enum__ = luxe.GamepadEventType;
luxe.GamepadEventType.device_added = ["device_added",3];
luxe.GamepadEventType.device_added.toString = $estr;
luxe.GamepadEventType.device_added.__enum__ = luxe.GamepadEventType;
luxe.GamepadEventType.device_removed = ["device_removed",4];
luxe.GamepadEventType.device_removed.toString = $estr;
luxe.GamepadEventType.device_removed.__enum__ = luxe.GamepadEventType;
luxe.GamepadEventType.device_remapped = ["device_remapped",5];
luxe.GamepadEventType.device_remapped.toString = $estr;
luxe.GamepadEventType.device_remapped.__enum__ = luxe.GamepadEventType;
luxe.InputType = $hxClasses["luxe.InputType"] = { __ename__ : ["luxe","InputType"], __constructs__ : ["mouse","touch","keys","gamepad"] };
luxe.InputType.mouse = ["mouse",0];
luxe.InputType.mouse.toString = $estr;
luxe.InputType.mouse.__enum__ = luxe.InputType;
luxe.InputType.touch = ["touch",1];
luxe.InputType.touch.toString = $estr;
luxe.InputType.touch.__enum__ = luxe.InputType;
luxe.InputType.keys = ["keys",2];
luxe.InputType.keys.toString = $estr;
luxe.InputType.keys.__enum__ = luxe.InputType;
luxe.InputType.gamepad = ["gamepad",3];
luxe.InputType.gamepad.toString = $estr;
luxe.InputType.gamepad.__enum__ = luxe.InputType;
luxe.Input = function(_core) {
	this.core = _core;
};
$hxClasses["luxe.Input"] = luxe.Input;
luxe.Input.__name__ = ["luxe","Input"];
luxe.Input.prototype = {
	init: function() {
		this.key_bindings = new haxe.ds.StringMap();
		this.mouse_bindings = new haxe.ds.StringMap();
		this.gamepad_bindings = new haxe.ds.StringMap();
		this._named_input_down = new haxe.ds.StringMap();
		this._named_input_pressed = new haxe.ds.StringMap();
		this._named_input_released = new haxe.ds.StringMap();
		null;
	}
	,destroy: function() {
		null;
	}
	,process: function() {
		var $it0 = this._named_input_pressed.keys();
		while( $it0.hasNext() ) {
			var _event = $it0.next();
			if(this._named_input_pressed.get(_event)) this._named_input_pressed.remove(_event); else this._named_input_pressed.set(_event,true);
		}
		var $it1 = this._named_input_released.keys();
		while( $it1.hasNext() ) {
			var _event1 = $it1.next();
			if(this._named_input_released.get(_event1)) this._named_input_released.remove(_event1); else this._named_input_released.set(_event1,true);
		}
	}
	,inputpressed: function(_event) {
		return this._named_input_pressed.exists(_event);
	}
	,inputreleased: function(_event) {
		return this._named_input_released.exists(_event);
	}
	,inputdown: function(_event) {
		return this._named_input_down.exists(_event);
	}
	,keypressed: function(_code) {
		return this.core.app.input.keypressed(_code);
	}
	,keyreleased: function(_code) {
		return this.core.app.input.keyreleased(_code);
	}
	,keydown: function(_code) {
		return this.core.app.input.keydown(_code);
	}
	,scanpressed: function(_code) {
		return this.core.app.input.scanpressed(_code);
	}
	,scanreleased: function(_code) {
		return this.core.app.input.scanreleased(_code);
	}
	,scandown: function(_code) {
		return this.core.app.input.scandown(_code);
	}
	,mousepressed: function(_button) {
		return this.core.app.input.mousepressed(_button);
	}
	,mousereleased: function(_button) {
		return this.core.app.input.mousereleased(_button);
	}
	,mousedown: function(_button) {
		return this.core.app.input.mousedown(_button);
	}
	,gamepadpressed: function(_gamepad,_button) {
		return this.core.app.input.gamepadpressed(_gamepad,_button);
	}
	,gamepadreleased: function(_gamepad,_button) {
		return this.core.app.input.gamepadreleased(_gamepad,_button);
	}
	,gamepaddown: function(_gamepad,_button) {
		return this.core.app.input.gamepaddown(_gamepad,_button);
	}
	,gamepadaxis: function(_gamepad,_axis) {
		return this.core.app.input.gamepadaxis(_gamepad,_axis);
	}
	,bind_key: function(_name,_key) {
		if(!this.key_bindings.exists(_name)) {
			var value = new haxe.ds.IntMap();
			this.key_bindings.set(_name,value);
		}
		var kb = this.key_bindings.get(_name);
		kb.set(_key,true);
	}
	,bind_mouse: function(_name,_button) {
		if(!this.mouse_bindings.exists(_name)) {
			var value = new haxe.ds.IntMap();
			this.mouse_bindings.set(_name,value);
		}
		var mb = this.mouse_bindings.get(_name);
		mb.set(_button,true);
	}
	,bind_gamepad: function(_name,_gamepad_button,_gamepad_id) {
		if(!this.gamepad_bindings.exists(_name)) {
			var value = new haxe.ds.IntMap();
			this.gamepad_bindings.set(_name,value);
		}
		var gp = this.gamepad_bindings.get(_name);
		gp.set(_gamepad_button,_gamepad_id);
	}
	,check_named_keys: function(e,_down) {
		if(_down == null) _down = false;
		var _fired = [];
		var $it0 = this.key_bindings.keys();
		while( $it0.hasNext() ) {
			var _name = $it0.next();
			var _b = this.key_bindings.get(_name);
			var _is_down_repeat = _down && e.repeat;
			if(_b.exists(e.keycode) && !_is_down_repeat) {
				if(!Lambda.has(_fired,_name)) _fired.push(_name);
			}
		}
		var _g = 0;
		while(_g < _fired.length) {
			var _f = _fired[_g];
			++_g;
			if(_down) {
				this._named_input_pressed.set(_f,false);
				this._named_input_down.set(_f,true);
				this.core.oninputdown(_f,{ name : _f, type : luxe.InputType.keys, state : luxe.InteractState.down, key_event : e});
			} else {
				this._named_input_released.set(_f,false);
				this._named_input_down.remove(_f);
				this.core.oninputup(_f,{ name : _f, type : luxe.InputType.keys, state : luxe.InteractState.up, key_event : e});
			}
		}
	}
	,check_named_mouse: function(e,_down) {
		if(_down == null) _down = false;
		var _fired = [];
		var $it0 = this.mouse_bindings.keys();
		while( $it0.hasNext() ) {
			var _name = $it0.next();
			var _b = this.mouse_bindings.get(_name);
			if(_b.exists(e.button)) {
				if(!Lambda.has(_fired,_name)) _fired.push(_name);
			}
		}
		var _g = 0;
		while(_g < _fired.length) {
			var _f = _fired[_g];
			++_g;
			if(_down) {
				this._named_input_pressed.set(_f,false);
				this._named_input_down.set(_f,true);
				this.core.oninputdown(_f,{ name : _f, type : luxe.InputType.mouse, state : luxe.InteractState.down, mouse_event : e});
			} else {
				this._named_input_released.set(_f,false);
				this._named_input_down.remove(_f);
				this.core.oninputup(_f,{ name : _f, type : luxe.InputType.mouse, state : luxe.InteractState.up, mouse_event : e});
			}
		}
	}
	,check_named_gamepad_buttons: function(e,_down) {
		if(_down == null) _down = false;
		var _fired = [];
		var $it0 = this.gamepad_bindings.keys();
		while( $it0.hasNext() ) {
			var _name = $it0.next();
			var _b = this.gamepad_bindings.get(_name);
			if(_b.exists(e.button)) {
				var _kb = _b.get(e.button);
				var _accepted_gamepad = _kb == null || _kb == e.gamepad;
				if(!Lambda.has(_fired,_name) && _accepted_gamepad) _fired.push(_name);
			}
		}
		var _g = 0;
		while(_g < _fired.length) {
			var _f = _fired[_g];
			++_g;
			if(_down) {
				this._named_input_pressed.set(_f,false);
				this._named_input_down.set(_f,true);
				this.core.oninputdown(_f,{ name : _f, type : luxe.InputType.gamepad, state : luxe.InteractState.down, gamepad_event : e});
			} else {
				this._named_input_released.set(_f,false);
				this._named_input_down.remove(_f);
				this.core.oninputup(_f,{ name : _f, type : luxe.InputType.gamepad, state : luxe.InteractState.up, gamepad_event : e});
			}
		}
	}
	,__class__: luxe.Input
};
luxe._Log = {};
luxe._Log.LogError = $hxClasses["luxe._Log.LogError"] = { __ename__ : ["luxe","_Log","LogError"], __constructs__ : ["RequireString"] };
luxe._Log.LogError.RequireString = function(detail) { var $x = ["RequireString",0,detail]; $x.__enum__ = luxe._Log.LogError; $x.toString = $estr; return $x; };
luxe.Log = function() { };
$hxClasses["luxe.Log"] = luxe.Log;
luxe.Log.__name__ = ["luxe","Log"];
luxe.Log._get_spacing = function(_file) {
	var _spaces = "";
	var _trace_length = _file.length + 4;
	var _diff = luxe.Log._log_width - _trace_length;
	if(_diff > 0) {
		var _g = 0;
		while(_g < _diff) {
			var i = _g++;
			_spaces += " ";
		}
	}
	return _spaces;
};
luxe.DebugError = $hxClasses["luxe.DebugError"] = { __ename__ : ["luxe","DebugError"], __constructs__ : ["assertion","null_assertion"] };
luxe.DebugError.assertion = function(expr) { var $x = ["assertion",0,expr]; $x.__enum__ = luxe.DebugError; $x.toString = $estr; return $x; };
luxe.DebugError.null_assertion = function(expr) { var $x = ["null_assertion",1,expr]; $x.__enum__ = luxe.DebugError; $x.toString = $estr; return $x; };
luxe.Visual = function(_options,_pos_info) {
	this.ignore_texture_on_geometry_change = false;
	this._creating_geometry = false;
	this._has_custom_origin = false;
	this.radians = 0.0;
	this.group = 0;
	this.depth = 0.0;
	this.visible = true;
	this.locked = false;
	var _g = this;
	if(_options == null) throw "Visual needs not-null options at the moment";
	this._rotation_euler = new phoenix.Vector();
	this._rotation_quat = new phoenix.Quaternion();
	luxe.Entity.call(this,_options,_pos_info);
	this.set_color(new phoenix.Color());
	this.set_size(new phoenix.Vector());
	if(this.options.texture != null) this.set_texture(this.options.texture);
	if(this.options.shader != null) this.set_shader(this.options.shader);
	if(this.options.color != null) this.set_color(this.options.color);
	if(this.options.depth != null) this.set_depth(this.options.depth);
	if(this.options.group != null) this.set_group(this.options.group);
	if(this.options.visible != null) this.set_visible(this.options.visible);
	if(this.options.size != null) {
		this.set_size(this.options.size);
		this._create_geometry();
	} else if(this.texture != null) {
		if(this.texture.loaded) {
			this.set_size(new phoenix.Vector(this.texture.width,this.texture.height));
			this._create_geometry();
		} else this.texture.set_onload(function(_texture) {
			_g.set_size(new phoenix.Vector(_texture.width,_texture.height));
			_g._create_geometry();
		});
	} else {
		this.set_size(new phoenix.Vector(64,64));
		this._create_geometry();
	}
};
$hxClasses["luxe.Visual"] = luxe.Visual;
luxe.Visual.__name__ = ["luxe","Visual"];
luxe.Visual.__super__ = luxe.Entity;
luxe.Visual.prototype = $extend(luxe.Entity.prototype,{
	_create_geometry: function() {
		if(this.options.geometry == null) {
			if(this.options.no_geometry == null || this.options.no_geometry == false) {
				this._creating_geometry = true;
				var _batcher = null;
				if(this.options.no_batcher_add == null || this.options.no_batcher_add == false) {
					if(this.options.batcher != null) _batcher = this.options.batcher; else _batcher = Luxe.renderer.batcher;
				}
				this.set_geometry(new phoenix.geometry.QuadGeometry({ id : this.name + ".visual", x : 0, y : 0, w : this.size.x, h : this.size.y, scale : new phoenix.Vector(1,1,1), texture : this.texture, color : this.color, shader : this.shader, batcher : _batcher, depth : this.options.depth == null?0:this.options.depth, group : this.options.group == null?0:this.options.group, visible : this.options.visible == null?this.visible:this.options.visible}));
				this._creating_geometry = false;
				this.on_geometry_created();
			}
		} else this.set_geometry(this.options.geometry);
		if(this.geometry != null) {
			this.geometry.id = this.name + ".visual";
			this.geometry.transform.id = this.name + ".visual.transform";
		}
		if(this.options.origin != null) {
			this._has_custom_origin = true;
			this.set_origin(this.options.origin);
		}
		if(this.options.rotation_z != null) this.set_rotation_z(this.options.rotation_z);
	}
	,ondestroy: function() {
		if(this.geometry != null && this.geometry.added) this.geometry.drop(true);
		this.set_geometry(null);
		this.set_texture(null);
	}
	,on_geometry_created: function() {
	}
	,set_visible: function(_v) {
		this.visible = _v;
		if(this.geometry != null) this.geometry.set_visible(this.visible);
		return this.visible;
	}
	,set_depth: function(_v) {
		if(this.geometry != null) this.geometry.set_depth(_v);
		return this.depth = _v;
	}
	,set_group: function(_v) {
		if(this.geometry != null) this.geometry.set_group(_v);
		return this.group = _v;
	}
	,set_color: function(_c) {
		if(this.color != null && this.geometry != null) this.geometry.set_color(_c);
		return this.color = _c;
	}
	,set_texture: function(_t) {
		if(this.geometry != null && this.geometry.get_texture() != _t) this.geometry.set_texture(_t);
		return this.texture = _t;
	}
	,set_shader: function(_s) {
		if(this.geometry != null && this.geometry.get_shader() != _s) this.geometry.set_shader(_s);
		return this.shader = _s;
	}
	,set_geometry: function(_g) {
		if(this.geometry == _g) return this.geometry;
		if(this.geometry != null) this.geometry.drop();
		this.geometry = _g;
		if(this.geometry != null) {
			this.geometry.transform.set_parent(this.get_transform());
			if(this._creating_geometry == false) {
				this.geometry.set_color(this.color);
				this.geometry.set_group(this.group);
				this.geometry.set_depth(this.depth);
				this.geometry.set_visible(this.visible);
				if(!this.ignore_texture_on_geometry_change) {
				}
			}
		}
		return this.geometry;
	}
	,set_parent_from_transform: function(_parent) {
		luxe.Entity.prototype.set_parent_from_transform.call(this,_parent);
		if(this.geometry != null) this.geometry.transform.set_parent(this.get_transform());
	}
	,set_rotation_from_transform: function(_rotation) {
		luxe.Entity.prototype.set_rotation_from_transform.call(this,_rotation);
		this._rotation_euler.setEulerFromQuaternion(_rotation,null);
		this._rotation_quat.copy(_rotation);
	}
	,set_size: function(_v) {
		this.size = _v;
		if(this.size != null) phoenix.Vector.Listen(this.size,$bind(this,this._size_change));
		return this.size;
	}
	,get_rotation_z: function() {
		return luxe.utils.Maths.degrees(this.get_radians());
	}
	,set_rotation_z: function(_degrees) {
		this.set_radians(_degrees * 0.0174532925199432781);
		return _degrees;
	}
	,set_radians: function(_r) {
		this._rotation_euler.set_z(_r);
		this._rotation_quat.setFromEuler(this._rotation_euler);
		this.set_rotation(this._rotation_quat.clone());
		return this.radians = _r;
	}
	,get_radians: function() {
		return this.radians;
	}
	,set_locked: function(_l) {
		if(this.geometry != null) this.geometry.set_locked(_l);
		return this.locked = _l;
	}
	,set_clip_rect: function(_val) {
		if(this.geometry != null) this.geometry.set_clip_rect(_val);
		return this.clip_rect = _val;
	}
	,_size_change: function(_v) {
		this.set_size(this.size);
	}
	,init: function() {
	}
	,__class__: luxe.Visual
	,__properties__: $extend(luxe.Entity.prototype.__properties__,{set_rotation_z:"set_rotation_z",get_rotation_z:"get_rotation_z",set_radians:"set_radians",get_radians:"get_radians",set_clip_rect:"set_clip_rect",set_group:"set_group",set_depth:"set_depth",set_visible:"set_visible",set_color:"set_color",set_shader:"set_shader",set_texture:"set_texture",set_locked:"set_locked",set_geometry:"set_geometry",set_size:"set_size"})
});
luxe.NineSlice = function(_options) {
	this.added = false;
	this.midheight = 0.0;
	this.midwidth = 0.0;
	this.is_set = false;
	this.source_h = 0.0;
	this.source_w = 0.0;
	this.source_y = 0.0;
	this.source_x = 0.0;
	this.height = 0.0;
	this.bottom = 32;
	this.width = 0.0;
	this.right = 32;
	this.left = 32;
	this.top = 32;
	this.slices = new Array();
	if(_options == null) _options = { no_geometry : true, no_scene : true}; else {
		_options.no_geometry = true;
		_options.no_scene = true;
	}
	this.nineslice_options = _options;
	if(_options.batcher != null) this._batcher = _options.batcher; else this._batcher = Luxe.renderer.batcher;
	luxe.Visual.call(this,_options,{ fileName : "NineSlice.hx", lineNumber : 77, className : "luxe.NineSlice", methodName : "new"});
	if(_options.top != null) this.top = _options.top;
	if(_options.left != null) this.left = _options.left;
	if(_options.right != null) this.right = _options.right;
	if(_options.bottom != null) this.bottom = _options.bottom;
	if(_options.source_x != null) this.source_x = _options.source_x;
	if(_options.source_y != null) this.source_y = _options.source_y;
	if(_options.source_w != null) this.source_w = _options.source_w; else this.source_w = this.texture.width;
	if(_options.source_h != null) this.source_h = _options.source_h; else this.source_h = this.texture.height;
	this.set_geometry(null);
};
$hxClasses["luxe.NineSlice"] = luxe.NineSlice;
luxe.NineSlice.__name__ = ["luxe","NineSlice"];
luxe.NineSlice.__super__ = luxe.Visual;
luxe.NineSlice.prototype = $extend(luxe.Visual.prototype,{
	lock: function() {
		if(this.is_set && this._geometry != null) this._geometry.set_locked(true);
	}
	,dirty: function() {
		if(this.is_set && this._geometry != null) this._geometry.set_dirty(true);
	}
	,update_size: function(_width,_height) {
		this.width = _width;
		this.height = _height;
		this.midwidth = Math.abs(this.width - this.left - this.right);
		this.midheight = Math.abs(this.height - this.top - this.bottom);
		this.slices[0].source_width = this.left;
		this.slices[0].source_height = this.top;
		this.slices[0].source_x = this.source_x;
		this.slices[0].source_y = this.source_y;
		this.slices[0].pos.set_xy(0,0);
		this.slices[0].width = this.left;
		this.slices[0].height = this.top;
		this.slices[1].source_width = this.source_w - this.left - this.right;
		this.slices[1].source_height = this.top;
		this.slices[1].source_x = this.source_x + this.left;
		this.slices[1].source_y = this.source_y;
		this.slices[1].pos.set_xy(this.left,0);
		this.slices[1].width = this.width - this.left - this.right;
		this.slices[1].height = this.top;
		this.slices[2].source_width = this.right;
		this.slices[2].source_height = this.top;
		this.slices[2].source_x = this.source_x + (this.source_w - this.right);
		this.slices[2].source_y = this.source_y;
		this.slices[2].pos.set_xy(this.left + this.midwidth,0);
		this.slices[2].width = this.right;
		this.slices[2].height = this.top;
		this.slices[3].source_width = this.left;
		this.slices[3].source_height = this.source_h - this.top - this.bottom;
		this.slices[3].source_x = this.source_x;
		this.slices[3].source_y = this.source_y + this.top;
		this.slices[3].pos.set_xy(0,this.top);
		this.slices[3].width = this.left;
		this.slices[3].height = this.height - this.top - this.bottom;
		this.slices[4].source_width = this.source_w - this.left - this.right;
		this.slices[4].source_height = this.source_h - this.top - this.bottom;
		this.slices[4].source_x = this.source_x + this.left;
		this.slices[4].source_y = this.source_y + this.top;
		this.slices[4].pos.set_xy(this.left,this.top);
		this.slices[4].width = this.width - this.left - this.right;
		this.slices[4].height = this.height - this.top - this.bottom;
		this.slices[5].source_width = this.right;
		this.slices[5].source_height = this.source_h - this.top - this.bottom;
		this.slices[5].source_x = this.source_x + (this.source_w - this.right);
		this.slices[5].source_y = this.source_y + this.top;
		this.slices[5].pos.set_xy(this.left + this.midwidth,this.top);
		this.slices[5].width = this.right;
		this.slices[5].height = this.height - this.top - this.bottom;
		this.slices[6].source_width = this.left;
		this.slices[6].source_height = this.bottom;
		this.slices[6].source_x = this.source_x;
		this.slices[6].source_y = this.source_y + (this.source_h - this.bottom);
		this.slices[6].pos.set_xy(0,this.top + this.midheight);
		this.slices[6].width = this.left;
		this.slices[6].height = this.bottom;
		this.slices[7].source_width = this.source_w - this.left - this.right;
		this.slices[7].source_height = this.bottom;
		this.slices[7].source_x = this.source_x + this.left;
		this.slices[7].source_y = this.source_y + (this.source_h - this.bottom);
		this.slices[7].pos.set_xy(this.left,this.top + this.midheight);
		this.slices[7].width = this.width - this.left - this.right;
		this.slices[7].height = this.bottom;
		this.slices[8].source_width = this.right;
		this.slices[8].source_height = this.bottom;
		this.slices[8].source_x = this.source_x + (this.source_w - this.right);
		this.slices[8].source_y = this.source_y + (this.source_h - this.bottom);
		this.slices[8].pos.set_xy(this.left + this.midwidth,this.top + this.midheight);
		this.slices[8].width = this.right;
		this.slices[8].height = this.bottom;
	}
	,set: function(_width,_height) {
		if(this.added) {
			this._geometry.drop();
			this.added = false;
		}
		this.slices.splice(0,this.slices.length);
		this.width = _width;
		this.height = _height;
		this.midwidth = Math.abs(this.width - this.left - this.right);
		this.midheight = Math.abs(this.height - this.top - this.bottom);
		this.slices.push({ source_width : this.left, source_height : this.top, source_x : this.source_x, source_y : this.source_y, pos : new phoenix.Vector(0,0), width : this.left, height : this.top, geometry_id : 0});
		this.slices.push({ source_width : this.source_w - this.left - this.right, source_height : this.top, source_x : this.source_x + this.left, source_y : this.source_y, pos : new phoenix.Vector(this.left,0), width : this.width - this.left - this.right, height : this.top, geometry_id : 0});
		this.slices.push({ source_width : this.right, source_height : this.top, source_x : this.source_x + (this.source_w - this.right), source_y : this.source_y, pos : new phoenix.Vector(this.left + this.midwidth,0), width : this.right, height : this.top, geometry_id : 0});
		this.slices.push({ source_width : this.left, source_height : this.source_h - this.top - this.bottom, source_x : this.source_x, source_y : this.source_y + this.top, pos : new phoenix.Vector(0,this.top), width : this.left, height : this.height - this.top - this.bottom, geometry_id : 0});
		this.slices.push({ source_width : this.source_w - this.left - this.right, source_height : this.source_h - this.top - this.bottom, source_x : this.source_x + this.left, source_y : this.source_y + this.top, pos : new phoenix.Vector(this.left,this.top), width : this.width - this.left - this.right, height : this.height - this.top - this.bottom, geometry_id : 0});
		this.slices.push({ source_width : this.right, source_height : this.source_h - this.top - this.bottom, source_x : this.source_x + (this.source_w - this.right), source_y : this.source_y + this.top, pos : new phoenix.Vector(this.left + this.midwidth,this.top), width : this.right, height : this.height - this.top - this.bottom, geometry_id : 0});
		this.slices.push({ source_width : this.left, source_height : this.bottom, source_x : this.source_x, source_y : this.source_y + (this.source_h - this.bottom), pos : new phoenix.Vector(0,this.top + this.midheight), width : this.left, height : this.bottom, geometry_id : 0});
		this.slices.push({ source_width : this.source_w - this.left - this.right, source_height : this.bottom, source_x : this.source_x + this.left, source_y : this.source_y + (this.source_h - this.bottom), pos : new phoenix.Vector(this.left,this.top + this.midheight), width : this.width - this.left - this.right, height : this.bottom, geometry_id : 0});
		this.slices.push({ source_width : this.right, source_height : this.bottom, source_x : this.source_x + (this.source_w - this.right), source_y : this.source_y + (this.source_h - this.bottom), pos : new phoenix.Vector(this.left + this.midwidth,this.top + this.midheight), width : this.right, height : this.bottom, geometry_id : 0});
		this.is_set = true;
	}
	,set_size: function(_v) {
		if(!this.is_set) return _v;
		this.update_size(_v.x,_v.y);
		var _g = 0;
		var _g1 = this.slices;
		while(_g < _g1.length) {
			var slice = _g1[_g];
			++_g;
			if(this._geometry != null) this._geometry.quad_resize(slice.geometry_id,new phoenix.Rectangle(slice.pos.x,slice.pos.y,slice.width,slice.height));
		}
		return _v;
	}
	,_create: function(_pos,_w,_h,_reset) {
		if(_reset == null) _reset = false;
		if(!this.is_set || _reset) this.set(_w,_h);
		var _color = new phoenix.Color();
		this._geometry = new phoenix.geometry.QuadPackGeometry({ texture : this.texture, color : _color, depth : this.nineslice_options.depth, group : this.nineslice_options.group, visible : this.nineslice_options.visible, batcher : this._batcher});
		var _g = 0;
		var _g1 = this.slices;
		while(_g < _g1.length) {
			var slice = _g1[_g];
			++_g;
			slice.geometry_id = this._geometry.quad_add({ x : slice.pos.x, y : slice.pos.y, w : slice.width, h : slice.height, color : this.nineslice_options.color, uv : new phoenix.Rectangle(slice.source_x,slice.source_y,slice.source_width,slice.source_height)});
		}
		this._geometry.id = "NineSlice" + this._geometry.id;
		this.set_geometry(this._geometry);
		this.set_pos(_pos);
		this.added = true;
		this.is_set = true;
	}
	,create: function(_pos,_w,_h,_reset) {
		if(_reset == null) _reset = false;
		var _g = this;
		if(!this.texture.loaded) this.texture.set_onload(function(texture) {
			_g._create(_pos,_w,_h,_reset);
		}); else this._create(_pos,_w,_h,_reset);
	}
	,init: function() {
	}
	,ondestroy: function() {
		luxe.Visual.prototype.ondestroy.call(this);
	}
	,__class__: luxe.NineSlice
});
luxe.Physics = function(_core) {
	this.step_delta = 0.0166666666666666664;
	this.step_rate = 0.0166666666666666664;
	this.core = _core;
};
$hxClasses["luxe.Physics"] = luxe.Physics;
luxe.Physics.__name__ = ["luxe","Physics"];
luxe.Physics.prototype = {
	init: function() {
		this.engines = [];
	}
	,reset: function() {
		if(this.timer != null) {
			this.timer.stop();
			this.timer = null;
		}
		if(this.step_rate != 0) this.timer = Luxe.timer.schedule(this.step_rate,$bind(this,this.fixed_update),true);
	}
	,fixed_update: function() {
		Luxe.debug.start(luxe.Physics.tag_physics);
		this.update();
		Luxe.debug.end(luxe.Physics.tag_physics);
	}
	,add_engine: function(type,_data) {
		var _engine_instance = Type.createInstance(type,[_data]);
		var _physics_engine = _engine_instance;
		_physics_engine.init();
		this.engines.push(_physics_engine);
		return _engine_instance;
	}
	,update: function() {
		var _g = 0;
		var _g1 = this.engines;
		while(_g < _g1.length) {
			var engine = _g1[_g];
			++_g;
			engine.update();
		}
	}
	,process: function() {
		var _g = 0;
		var _g1 = this.engines;
		while(_g < _g1.length) {
			var engine = _g1[_g];
			++_g;
			engine.process();
		}
	}
	,render: function() {
		var _g = 0;
		var _g1 = this.engines;
		while(_g < _g1.length) {
			var engine = _g1[_g];
			++_g;
			engine.render();
		}
	}
	,destroy: function() {
		if(this.timer != null) this.timer.stop();
		this.timer = null;
		var _g = 0;
		var _g1 = this.engines;
		while(_g < _g1.length) {
			var engine = _g1[_g];
			++_g;
			engine.destroy();
		}
	}
	,set_step_rate: function(_rate) {
		this.step_rate = _rate;
		this.step_delta = this.step_rate;
		this.reset();
		return this.step_rate;
	}
	,__class__: luxe.Physics
	,__properties__: {set_step_rate:"set_step_rate"}
};
luxe.PhysicsEngine = function() {
	this.draw = true;
	this.paused = false;
	this.name = "engine";
	this.set_gravity(new phoenix.Vector(0,-9.8,0));
	Luxe.on(8,$bind(this,this._render));
};
$hxClasses["luxe.PhysicsEngine"] = luxe.PhysicsEngine;
luxe.PhysicsEngine.__name__ = ["luxe","PhysicsEngine"];
luxe.PhysicsEngine.prototype = {
	init: function() {
	}
	,_render: function(_) {
		this.render();
	}
	,process: function() {
	}
	,update: function() {
	}
	,render: function() {
	}
	,get_paused: function() {
		return this.paused;
	}
	,set_paused: function(_pause) {
		return this.paused = _pause;
	}
	,get_draw: function() {
		return this.draw;
	}
	,set_draw: function(_draw) {
		return this.draw = _draw;
	}
	,get_gravity: function() {
		return this.gravity;
	}
	,set_gravity: function(_gravity) {
		return this.gravity = _gravity;
	}
	,destroy: function() {
	}
	,__class__: luxe.PhysicsEngine
	,__properties__: {set_draw:"set_draw",get_draw:"get_draw",set_gravity:"set_gravity",get_gravity:"get_gravity",set_paused:"set_paused",get_paused:"get_paused"}
};
luxe.Scene = function(_name) {
	if(_name == null) _name = "untitled scene";
	this.entity_count = 0;
	this.length = 0;
	this.started = false;
	this.inited = false;
	luxe.Objects.call(this,_name);
	this.entities = new haxe.ds.StringMap();
	this._delayed_init_entities = [];
	this._delayed_reset_entities = [];
	Luxe.core.on(2,$bind(this,this.init));
	Luxe.core.on(6,$bind(this,this._destroy));
	Luxe.core.on(4,$bind(this,this.update));
	Luxe.core.on(7,$bind(this,this.prerender));
	Luxe.core.on(9,$bind(this,this.postrender));
	Luxe.core.on(8,$bind(this,this.render));
	Luxe.core.on(10,$bind(this,this.keydown));
	Luxe.core.on(11,$bind(this,this.keyup));
	Luxe.core.on(12,$bind(this,this.textinput));
	Luxe.core.on(14,$bind(this,this.inputup));
	Luxe.core.on(13,$bind(this,this.inputdown));
	Luxe.core.on(16,$bind(this,this.mouseup));
	Luxe.core.on(15,$bind(this,this.mousedown));
	Luxe.core.on(17,$bind(this,this.mousemove));
	Luxe.core.on(18,$bind(this,this.mousewheel));
	Luxe.core.on(20,$bind(this,this.touchup));
	Luxe.core.on(19,$bind(this,this.touchdown));
	Luxe.core.on(21,$bind(this,this.touchmove));
	Luxe.core.on(24,$bind(this,this.gamepadup));
	Luxe.core.on(23,$bind(this,this.gamepaddown));
	Luxe.core.on(22,$bind(this,this.gamepadaxis));
	Luxe.core.on(25,$bind(this,this.gamepaddevice));
	Luxe.core.on(27,$bind(this,this.windowmoved));
	Luxe.core.on(28,$bind(this,this.windowresized));
	Luxe.core.on(29,$bind(this,this.windowsized));
	Luxe.core.on(30,$bind(this,this.windowminimized));
	Luxe.core.on(31,$bind(this,this.windowrestored));
	if(Luxe.core.inited) this.init(null);
};
$hxClasses["luxe.Scene"] = luxe.Scene;
luxe.Scene.__name__ = ["luxe","Scene"];
luxe.Scene.__super__ = luxe.Objects;
luxe.Scene.prototype = $extend(luxe.Objects.prototype,{
	add: function(entity,pos) {
		if(entity == null) throw "can't put entity in a scene if the entity is null.";
		if(this.entities.exists(entity.name)) haxe.Log.trace("    i / scene / " + ("" + this.name + " / adding a second entity named " + entity.name + "! " + Luxe.utils.pos_info(pos) + "\n                This will replace the existing one, possibly leaving the previous one in limbo.\n                Use EntityOptions name_unique flag to automatically handle this for similar named entities."),{ fileName : "Scene.hx", lineNumber : 86, className : "luxe.Scene", methodName : "add"});
		entity.set_scene(this);
		this.entities.set(entity.name,entity);
		this.entity_count++;
		if(this.inited) this._delayed_init_entities.push(entity);
		if(this.started) this._delayed_reset_entities.push(entity);
	}
	,remove: function(entity) {
		if(entity == null) throw "can't remove entity from a scene if the entity is null.";
		if(entity.get_scene() == this) {
			entity.set_scene(null);
			this.entity_count--;
			return this.entities.remove(entity.name);
		} else {
			haxe.Log.trace("    i / scene / " + "can't remove the entity from this scene, it is not mine (entity.scene != this)",{ fileName : "Scene.hx", lineNumber : 123, className : "luxe.Scene", methodName : "remove"});
			return false;
		}
		return false;
	}
	,empty: function() {
		if(this.entity_count > 0) {
			var $it0 = this.entities.iterator();
			while( $it0.hasNext() ) {
				var entity = $it0.next();
				if(entity != null) {
					this.remove(entity);
					entity.destroy();
					entity = null;
				}
			}
		}
	}
	,get_named_like: function(_name,into) {
		if(this.entity_count > 0) {
			var _filter = new EReg("^((?:" + _name + ")[.]{1})","g");
			var $it0 = this.entities.iterator();
			while( $it0.hasNext() ) {
				var _entity = $it0.next();
				if(_filter.match(_entity.name)) into.push(_entity);
			}
		}
		return into;
	}
	,render: function(_) {
		this.emit(8,null,{ fileName : "Scene.hx", lineNumber : 178, className : "luxe.Scene", methodName : "render"});
	}
	,prerender: function(_) {
		this.emit(7,null,{ fileName : "Scene.hx", lineNumber : 184, className : "luxe.Scene", methodName : "prerender"});
	}
	,postrender: function(_) {
		this.emit(9,null,{ fileName : "Scene.hx", lineNumber : 190, className : "luxe.Scene", methodName : "postrender"});
	}
	,keydown: function(e) {
		this.emit(10,e,{ fileName : "Scene.hx", lineNumber : 200, className : "luxe.Scene", methodName : "keydown"});
	}
	,keyup: function(e) {
		this.emit(11,e,{ fileName : "Scene.hx", lineNumber : 208, className : "luxe.Scene", methodName : "keyup"});
	}
	,textinput: function(e) {
		this.emit(12,e,{ fileName : "Scene.hx", lineNumber : 216, className : "luxe.Scene", methodName : "textinput"});
	}
	,mousedown: function(e) {
		this.emit(15,e,{ fileName : "Scene.hx", lineNumber : 226, className : "luxe.Scene", methodName : "mousedown"});
	}
	,mousewheel: function(e) {
		this.emit(18,e,{ fileName : "Scene.hx", lineNumber : 234, className : "luxe.Scene", methodName : "mousewheel"});
	}
	,mouseup: function(e) {
		this.emit(16,e,{ fileName : "Scene.hx", lineNumber : 242, className : "luxe.Scene", methodName : "mouseup"});
	}
	,mousemove: function(e) {
		this.emit(17,e,{ fileName : "Scene.hx", lineNumber : 250, className : "luxe.Scene", methodName : "mousemove"});
	}
	,touchdown: function(event) {
		this.emit(19,event,{ fileName : "Scene.hx", lineNumber : 258, className : "luxe.Scene", methodName : "touchdown"});
	}
	,touchup: function(event) {
		this.emit(20,event,{ fileName : "Scene.hx", lineNumber : 264, className : "luxe.Scene", methodName : "touchup"});
	}
	,touchmove: function(event) {
		this.emit(21,event,{ fileName : "Scene.hx", lineNumber : 270, className : "luxe.Scene", methodName : "touchmove"});
	}
	,gamepadaxis: function(event) {
		this.emit(22,event,{ fileName : "Scene.hx", lineNumber : 278, className : "luxe.Scene", methodName : "gamepadaxis"});
	}
	,gamepadup: function(event) {
		this.emit(24,event,{ fileName : "Scene.hx", lineNumber : 284, className : "luxe.Scene", methodName : "gamepadup"});
	}
	,gamepaddown: function(event) {
		this.emit(23,event,{ fileName : "Scene.hx", lineNumber : 290, className : "luxe.Scene", methodName : "gamepaddown"});
	}
	,gamepaddevice: function(event) {
		this.emit(25,event,{ fileName : "Scene.hx", lineNumber : 296, className : "luxe.Scene", methodName : "gamepaddevice"});
	}
	,windowmoved: function(event) {
		this.emit(27,event,{ fileName : "Scene.hx", lineNumber : 305, className : "luxe.Scene", methodName : "windowmoved"});
	}
	,windowresized: function(event) {
		this.emit(28,event,{ fileName : "Scene.hx", lineNumber : 311, className : "luxe.Scene", methodName : "windowresized"});
	}
	,windowsized: function(event) {
		this.emit(29,event,{ fileName : "Scene.hx", lineNumber : 317, className : "luxe.Scene", methodName : "windowsized"});
	}
	,windowminimized: function(event) {
		this.emit(30,event,{ fileName : "Scene.hx", lineNumber : 323, className : "luxe.Scene", methodName : "windowminimized"});
	}
	,windowrestored: function(event) {
		this.emit(31,event,{ fileName : "Scene.hx", lineNumber : 329, className : "luxe.Scene", methodName : "windowrestored"});
	}
	,inputdown: function(event) {
		this.emit(13,event,{ fileName : "Scene.hx", lineNumber : 337, className : "luxe.Scene", methodName : "inputdown"});
	}
	,inputup: function(event) {
		this.emit(14,event,{ fileName : "Scene.hx", lineNumber : 343, className : "luxe.Scene", methodName : "inputup"});
	}
	,_destroy: function(_) {
		this.destroy();
	}
	,destroy: function() {
		Luxe.core.off(2,$bind(this,this.init));
		Luxe.core.off(6,$bind(this,this._destroy));
		Luxe.core.off(4,$bind(this,this.update));
		Luxe.core.off(7,$bind(this,this.prerender));
		Luxe.core.off(9,$bind(this,this.postrender));
		Luxe.core.off(8,$bind(this,this.render));
		Luxe.core.off(10,$bind(this,this.keydown));
		Luxe.core.off(11,$bind(this,this.keyup));
		Luxe.core.off(12,$bind(this,this.textinput));
		Luxe.core.off(14,$bind(this,this.inputup));
		Luxe.core.off(13,$bind(this,this.inputdown));
		Luxe.core.off(16,$bind(this,this.mouseup));
		Luxe.core.off(15,$bind(this,this.mousedown));
		Luxe.core.off(17,$bind(this,this.mousemove));
		Luxe.core.off(18,$bind(this,this.mousewheel));
		Luxe.core.off(20,$bind(this,this.touchup));
		Luxe.core.off(19,$bind(this,this.touchdown));
		Luxe.core.off(21,$bind(this,this.touchmove));
		Luxe.core.off(24,$bind(this,this.gamepadup));
		Luxe.core.off(23,$bind(this,this.gamepaddown));
		Luxe.core.off(22,$bind(this,this.gamepadaxis));
		Luxe.core.off(25,$bind(this,this.gamepaddevice));
		Luxe.core.off(27,$bind(this,this.windowmoved));
		Luxe.core.off(28,$bind(this,this.windowresized));
		Luxe.core.off(29,$bind(this,this.windowsized));
		Luxe.core.off(30,$bind(this,this.windowminimized));
		Luxe.core.off(31,$bind(this,this.windowrestored));
		this.emit(6,null,{ fileName : "Scene.hx", lineNumber : 392, className : "luxe.Scene", methodName : "destroy"});
	}
	,_do_init: function() {
		var _before_count = this.get_length();
		if(this.entity_count > 0) {
			var $it0 = this.entities.iterator();
			while( $it0.hasNext() ) {
				var entity = $it0.next();
				if(entity != null) {
					if(!entity.inited) entity._init();
				}
			}
		}
		var _after_count = this.get_length();
		return _before_count != _after_count;
	}
	,init: function(_) {
		var keep_going = true;
		while(keep_going) keep_going = this._do_init();
		this.inited = true;
		this.emit(2,null,{ fileName : "Scene.hx", lineNumber : 428, className : "luxe.Scene", methodName : "init"});
		this.reset();
	}
	,reset: function() {
		this.started = false;
		this.emit(3,null,{ fileName : "Scene.hx", lineNumber : 439, className : "luxe.Scene", methodName : "reset"});
		this.started = true;
	}
	,update: function(dt) {
		Luxe.core.debug.start("scene." + this.name);
		this.handle_delayed_additions();
		this.emit(4,dt,{ fileName : "Scene.hx", lineNumber : 452, className : "luxe.Scene", methodName : "update"});
		if(this.entity_count > 0) {
			var $it0 = this.entities.iterator();
			while( $it0.hasNext() ) {
				var entity = $it0.next();
				if(entity != null) entity._update(dt);
			}
		}
		Luxe.core.debug.end("scene." + this.name);
	}
	,handle_delayed_additions: function() {
		if(this._delayed_init_entities.length != 0 || this._delayed_reset_entities.length != 0) null;
		if(this._delayed_init_entities.length > 0) {
			var _g = 0;
			var _g1 = this._delayed_init_entities;
			while(_g < _g1.length) {
				var entity = _g1[_g];
				++_g;
				entity._init();
			}
			this._delayed_init_entities.splice(0,this._delayed_init_entities.length);
		}
		if(this._delayed_reset_entities.length > 0) {
			var _g2 = 0;
			var _g11 = this._delayed_reset_entities;
			while(_g2 < _g11.length) {
				var entity1 = _g11[_g2];
				++_g2;
				entity1._reset(null);
			}
			this._delayed_reset_entities.splice(0,this._delayed_reset_entities.length);
		}
	}
	,get_length: function() {
		return Lambda.count(this.entities);
	}
	,toString: function() {
		return "luxe Scene: " + this.name + " / " + this.get_length() + " entities / id: " + this.id;
	}
	,__class__: luxe.Scene
	,__properties__: {get_length:"get_length"}
});
luxe.Screen = function(_core,_w,_h) {
	this.internal = false;
	this.core = _core;
	this.cursor = new luxe.Cursor(this);
	this.w = _w;
	this.h = _h;
	this.mid = new phoenix.Vector(Math.round(this.w / 2),Math.round(this.h / 2));
	this.size = new phoenix.Vector(this.w,this.h);
};
$hxClasses["luxe.Screen"] = luxe.Screen;
luxe.Screen.__name__ = ["luxe","Screen"];
luxe.Screen.prototype = {
	toString: function() {
		return "luxe.Screen({ w:" + this.w + ", h:" + this.h + " })";
	}
	,point_inside: function(_p) {
		if(_p.x < 0) return false;
		if(_p.y < 0) return false;
		if(_p.x > this.w) return false;
		if(_p.y > this.h) return false;
		return true;
	}
	,point_inside_xy: function(_x,_y) {
		if(_x < 0) return false;
		if(_y < 0) return false;
		if(_x > this.w) return false;
		if(_y > this.h) return false;
		return true;
	}
	,internal_resized: function(_w,_h) {
		this.w = _w;
		this.h = _h;
		this.internal = true;
		this.get_size().set_x(_w);
		this.get_size().set_y(_h);
		this.get_mid().set_x(_w / 2);
		this.get_mid().set_y(_h / 2);
		this.internal = false;
	}
	,get_mid: function() {
		if(this.internal) return this.mid;
		return this.mid.clone();
	}
	,get_size: function() {
		if(this.internal) return this.size;
		return this.size.clone();
	}
	,__class__: luxe.Screen
	,__properties__: {get_size:"get_size",get_mid:"get_mid"}
};
luxe.Cursor = function(_screen) {
	this.ignore = false;
	this.lock = false;
	this.grab = false;
	this.visible = true;
	this.screen = _screen;
	this.set_pos(new phoenix.Vector());
};
$hxClasses["luxe.Cursor"] = luxe.Cursor;
luxe.Cursor.__name__ = ["luxe","Cursor"];
luxe.Cursor.prototype = {
	set_internal: function(_pos) {
		this.ignore = true;
		this.set_pos(_pos);
		this.ignore = false;
	}
	,get_visible: function() {
		return this.visible;
	}
	,set_visible: function(_visible) {
		this.screen.core.app.windowing.enable_cursor(_visible);
		return this.visible = _visible;
	}
	,get_grab: function() {
		return this.grab;
	}
	,get_lock: function() {
		return this.lock;
	}
	,set_grab: function(_grab) {
		this.screen.core.app.window.set_grab(_grab);
		return this.grab = _grab;
	}
	,set_lock: function(_lock) {
		this.screen.core.app.windowing.enable_cursor_lock(_lock);
		return this.lock = _lock;
	}
	,get_pos: function() {
		return this.pos;
	}
	,set_pos: function(_p) {
		if(this.get_pos() != null && _p != null && !this.ignore) this.screen.core.app.window.set_cursor_position(_p.x | 0,_p.y | 0);
		return this.pos = _p;
	}
	,__class__: luxe.Cursor
	,__properties__: {set_pos:"set_pos",get_pos:"get_pos",set_lock:"set_lock",get_lock:"get_lock",set_grab:"set_grab",get_grab:"get_grab",set_visible:"set_visible",get_visible:"get_visible"}
};
luxe.Sprite = function(options) {
	this.flipy = false;
	this.flipx = false;
	this.centered = true;
	this.set_uv(new phoenix.Rectangle());
	if(options == null) throw "Sprite needs not-null options at the moment";
	if(options.centered != null) this.set_centered(options.centered);
	if(options.flipx != null) this.set_flipx(options.flipx);
	if(options.flipy != null) this.set_flipy(options.flipy);
	luxe.Visual.call(this,options,{ fileName : "Sprite.hx", lineNumber : 48, className : "luxe.Sprite", methodName : "new"});
};
$hxClasses["luxe.Sprite"] = luxe.Sprite;
luxe.Sprite.__name__ = ["luxe","Sprite"];
luxe.Sprite.__super__ = luxe.Visual;
luxe.Sprite.prototype = $extend(luxe.Visual.prototype,{
	on_geometry_created: function() {
		var _g = this;
		luxe.Visual.prototype.on_geometry_created.call(this);
		if(this.texture != null) this.texture.set_onload(function(t) {
			if(_g.options.uv == null) _g.set_uv(new phoenix.Rectangle(0,0,_g.texture.width,_g.texture.height)); else _g.set_uv(_g.options.uv);
			if(_g.texture.type == 6) _g.set_flipy(true);
		});
		this.set_centered(!(!this.centered));
		this.set_flipx(!(!this.flipx));
		this.set_flipy(!(!this.flipy));
	}
	,set_geometry: function(_g) {
		this.geometry_quad = _g;
		return luxe.Visual.prototype.set_geometry.call(this,_g);
	}
	,point_inside: function(_p) {
		if(this.geometry == null) return false;
		return Luxe.utils.geometry.point_in_geometry(_p,this.geometry);
	}
	,point_inside_AABB: function(_p) {
		if(this.get_pos() == null) return false;
		if(this.size == null) return false;
		var _s_x = this.size.x * this.get_scale().x;
		var _s_y = this.size.y * this.get_scale().y;
		if(this.centered) {
			var _hx = _s_x / 2;
			var _hy = _s_y / 2;
			if(_p.x < this.get_pos().x - _hx) return false;
			if(_p.y < this.get_pos().y - _hy) return false;
			if(_p.x > this.get_pos().x + _s_x - _hx) return false;
			if(_p.y > this.get_pos().y + _s_y - _hy) return false;
		} else {
			if(_p.x < this.get_pos().x) return false;
			if(_p.y < this.get_pos().y) return false;
			if(_p.x > this.get_pos().x + _s_x) return false;
			if(_p.y > this.get_pos().y + _s_y) return false;
		}
		return true;
	}
	,set_uv: function(_uv) {
		if(this.geometry_quad != null) this.geometry_quad.uv(_uv);
		this.uv = _uv;
		phoenix.Rectangle.listen(this.uv,$bind(this,this._uv_change));
		return this.uv;
	}
	,set_flipy: function(_v) {
		if(_v == this.flipy) return this.flipy;
		if(this.geometry_quad != null) this.geometry_quad.set_flipy(_v);
		return this.flipy = _v;
	}
	,set_flipx: function(_v) {
		if(_v == this.flipx) return this.flipx;
		if(this.geometry_quad != null) this.geometry_quad.set_flipx(_v);
		return this.flipx = _v;
	}
	,set_size: function(_v) {
		if(this.geometry_quad != null) {
			this.geometry_quad.resize(new phoenix.Vector(_v.x,_v.y));
			if(!this._has_custom_origin) {
				if(this.centered) this.set_origin(new phoenix.Vector(_v.x,_v.y,_v.z,_v.w).divideScalar(2));
			}
		}
		return luxe.Visual.prototype.set_size.call(this,_v);
	}
	,set_centered: function(_c) {
		if(this.size != null) {
			if(_c) this.set_origin(new phoenix.Vector(this.size.x / 2,this.size.y / 2)); else this.set_origin(new phoenix.Vector());
		}
		return this.centered = _c;
	}
	,_uv_change: function(_v) {
		this.set_uv(this.uv);
	}
	,init: function() {
	}
	,ondestroy: function() {
		luxe.Visual.prototype.ondestroy.call(this);
	}
	,__class__: luxe.Sprite
	,__properties__: $extend(luxe.Visual.prototype.__properties__,{set_uv:"set_uv",set_flipy:"set_flipy",set_flipx:"set_flipx",set_centered:"set_centered"})
});
luxe.Text = function(_options,_pos_info) {
	this.text_options = _options;
	this.text_bounds = new phoenix.Rectangle();
	var _batcher = null;
	if(_options.no_batcher_add == null || _options.no_batcher_add == false) {
		if(_options.batcher != null) _batcher = _options.batcher; else _batcher = Luxe.renderer.batcher;
	}
	this.geom = new phoenix.geometry.TextGeometry({ batcher : _batcher, depth : _options.depth, group : _options.group, visible : _options.visible, immediate : _options.immediate, color : _options.color, shader : _options.shader, texture : _options.texture, text : _options.text, font : _options.font, point_size : _options.point_size, line_spacing : _options.line_spacing, letter_spacing : _options.letter_spacing, bounds : _options.bounds, bounds_wrap : _options.bounds_wrap, align : _options.align, align_vertical : _options.align_vertical, sdf : _options.sdf, smoothness : _options.smoothness, thickness : _options.thickness, outline : _options.outline, outline_color : _options.outline_color, glow_threshold : _options.glow_threshold, glow_amount : _options.glow_amount, glow_color : _options.glow_color});
	this.geom.emitter.on(1,$bind(this,this.on_geom_text_update),{ fileName : "Text.hx", lineNumber : 141, className : "luxe.Text", methodName : "new"});
	_options.geometry = this.geom;
	_options.shader = this.geom.get_shader();
	luxe.Visual.call(this,_options,_pos_info);
	this._update_bounds();
};
$hxClasses["luxe.Text"] = luxe.Text;
luxe.Text.__name__ = ["luxe","Text"];
luxe.Text.__super__ = luxe.Visual;
luxe.Text.prototype = $extend(luxe.Visual.prototype,{
	get_text: function() {
		return this.geom.text;
	}
	,set_text: function(_s) {
		return this.geom.set_text(_s);
	}
	,get_font: function() {
		return this.geom.font;
	}
	,set_font: function(_f) {
		return this.geom.font = _f;
	}
	,get_point_size: function() {
		return this.geom.point_size;
	}
	,set_point_size: function(_s) {
		return this.geom.set_point_size(_s);
	}
	,get_letter_spacing: function() {
		return this.geom.letter_spacing;
	}
	,set_letter_spacing: function(_s) {
		return this.geom.set_letter_spacing(_s);
	}
	,get_line_spacing: function() {
		return this.geom.line_spacing;
	}
	,set_line_spacing: function(_s) {
		return this.geom.set_line_spacing(_s);
	}
	,get_bounds: function() {
		return this.geom.bounds;
	}
	,set_bounds: function(_b) {
		return this.geom.set_bounds(_b);
	}
	,get_bounds_wrap: function() {
		return this.geom.bounds_wrap;
	}
	,set_bounds_wrap: function(_b) {
		return this.geom.set_bounds_wrap(_b);
	}
	,get_align: function() {
		return this.geom.align;
	}
	,set_align: function(_a) {
		return this.geom.set_align(_a);
	}
	,get_align_vertical: function() {
		return this.geom.align_vertical;
	}
	,set_align_vertical: function(_a) {
		return this.geom.set_align_vertical(_a);
	}
	,get_sdf: function() {
		return this.geom.sdf;
	}
	,set_sdf: function(_s) {
		return this.geom.sdf = _s;
	}
	,get_smoothness: function() {
		return this.geom.smoothness;
	}
	,set_smoothness: function(_s) {
		return this.geom.set_smoothness(_s);
	}
	,get_thickness: function() {
		return this.geom.thickness;
	}
	,set_thickness: function(_t) {
		return this.geom.set_thickness(_t);
	}
	,get_outline: function() {
		return this.geom.outline;
	}
	,set_outline: function(_o) {
		return this.geom.set_outline(_o);
	}
	,get_outline_color: function() {
		return this.geom.outline_color;
	}
	,set_outline_color: function(_c) {
		return this.geom.set_outline_color(_c);
	}
	,get_glow_threshold: function() {
		return this.geom.glow_threshold;
	}
	,set_glow_threshold: function(_s) {
		return this.geom.set_glow_threshold(_s);
	}
	,get_glow_amount: function() {
		return this.geom.glow_amount;
	}
	,set_glow_amount: function(_e) {
		return this.geom.set_glow_amount(_e);
	}
	,get_glow_color: function() {
		return this.geom.glow_color;
	}
	,set_glow_color: function(_c) {
		return this.geom.set_glow_color(_c);
	}
	,point_inside: function(p) {
		this._update_bounds();
		return this.text_bounds.point_inside(p);
	}
	,set_pos_from_transform: function(_p) {
		luxe.Visual.prototype.set_pos_from_transform.call(this,_p);
		this._update_bounds();
		this.text_options.pos = this.get_pos();
	}
	,on_geom_text_update: function(_) {
		this._update_bounds();
	}
	,_update_bounds: function() {
		var _x = this.get_pos().x;
		var _y = this.get_pos().y;
		var _tw = this.geom.text_width;
		var _th = this.geom.text_height;
		var _bw = this.geom.text_width;
		var _bh = this.geom.text_height;
		if(this.get_bounds() != null) {
			_bh = this.get_bounds().h;
			_bw = this.get_bounds().w;
			_x = this.get_bounds().x;
			_y = this.get_bounds().y;
			var _g = this.get_align();
			switch(_g) {
			case 2:
				_x += _tw / 2;
				break;
			case 1:
				_x += _tw;
				break;
			default:
				_x += 0.0;
			}
			var _g1 = this.get_align_vertical();
			switch(_g1) {
			case 2:
				_y += _bh / 2 - _th / 2;
				break;
			case 4:
				_y += _bh - _th;
				break;
			default:
				_y += 0.0;
			}
		} else {
			var _g2 = this.get_align();
			switch(_g2) {
			case 2:
				_x -= _tw / 2;
				break;
			case 1:
				_x -= _tw;
				break;
			default:
				_x -= 0.0;
			}
			var _g3 = this.get_align_vertical();
			switch(_g3) {
			case 2:
				_y -= _th / 2;
				break;
			case 4:
				_y -= _th;
				break;
			default:
				_y -= 0.0;
			}
		}
		this.text_bounds.set(_x,_y,_tw,_th);
	}
	,init: function() {
	}
	,ondestroy: function() {
		luxe.Visual.prototype.ondestroy.call(this);
	}
	,__class__: luxe.Text
	,__properties__: $extend(luxe.Visual.prototype.__properties__,{set_glow_color:"set_glow_color",get_glow_color:"get_glow_color",set_glow_amount:"set_glow_amount",get_glow_amount:"get_glow_amount",set_glow_threshold:"set_glow_threshold",get_glow_threshold:"get_glow_threshold",set_outline_color:"set_outline_color",get_outline_color:"get_outline_color",set_outline:"set_outline",get_outline:"get_outline",set_thickness:"set_thickness",get_thickness:"get_thickness",set_smoothness:"set_smoothness",get_smoothness:"get_smoothness",set_sdf:"set_sdf",get_sdf:"get_sdf",set_align_vertical:"set_align_vertical",get_align_vertical:"get_align_vertical",set_align:"set_align",get_align:"get_align",set_bounds_wrap:"set_bounds_wrap",get_bounds_wrap:"get_bounds_wrap",set_bounds:"set_bounds",get_bounds:"get_bounds",set_line_spacing:"set_line_spacing",get_line_spacing:"get_line_spacing",set_letter_spacing:"set_letter_spacing",get_letter_spacing:"get_letter_spacing",set_point_size:"set_point_size",get_point_size:"get_point_size",set_font:"set_font",get_font:"get_font",set_text:"set_text",get_text:"get_text"})
});
luxe.Timer = function(_core) {
	this.core = _core;
	this.timers = [];
};
$hxClasses["luxe.Timer"] = luxe.Timer;
luxe.Timer.__name__ = ["luxe","Timer"];
luxe.Timer.prototype = {
	init: function() {
		null;
	}
	,destroy: function() {
		this.reset();
		null;
	}
	,process: function() {
	}
	,reset: function() {
		var _g = 0;
		var _g1 = this.timers;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.stop();
			t = null;
		}
		this.timers = null;
		this.timers = [];
	}
	,schedule: function(_time_in_seconds,_on_time,repeat) {
		if(repeat == null) repeat = false;
		var _g = this;
		var t = new snow.api.Timer(_time_in_seconds);
		t.run = function() {
			if(!repeat) {
				t.stop();
				HxOverrides.remove(_g.timers,t);
			}
			_on_time();
		};
		this.timers.push(t);
		return t;
	}
	,__class__: luxe.Timer
};
luxe.components = {};
luxe.components.Components = function(_entity) {
	var _map = new haxe.ds.StringMap();
	this.components = new luxe.structural.OrderedMap(_map);
	this.entity = _entity;
};
$hxClasses["luxe.components.Components"] = luxe.components.Components;
luxe.components.Components.__name__ = ["luxe","components","Components"];
luxe.components.Components.prototype = {
	add: function(_component) {
		if(_component == null) {
			haxe.Log.trace("attempt to add null component to " + this.entity.name,{ fileName : "Components.hx", lineNumber : 28, className : "luxe.components.Components", methodName : "add"});
			return _component;
		}
		_component.set_entity(this.entity);
		this.components.set(_component.name,_component);
		_component.onadded();
		if(this.entity.inited) _component.init();
		if(this.entity.started) _component.onreset();
		return _component;
	}
	,remove: function(_name) {
		if(!this.components.map.exists(_name)) {
			haxe.Log.trace("attempt to remove " + _name + " from " + this.entity.name + " failed because that component was not attached to this entity",{ fileName : "Components.hx", lineNumber : 61, className : "luxe.components.Components", methodName : "remove"});
			return false;
		}
		var _component = this.components.map.get(_name);
		_component.onremoved();
		_component.set_entity(null);
		return this.components.remove(_name);
	}
	,get: function(_name,in_children) {
		if(in_children == null) in_children = false;
		if(!in_children) return this.components.map.get(_name); else {
			var in_this_entity = this.components.map.get(_name);
			if(in_this_entity != null) return in_this_entity;
			var _g = 0;
			var _g1 = this.entity.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				var found = _child._components.get(_name,true);
				if(found != null) return found;
			}
			return null;
		}
		return null;
	}
	,get_any: function(_name,in_children,first_only) {
		if(first_only == null) first_only = true;
		if(in_children == null) in_children = false;
		var results = [];
		if(!in_children) return [this.components.map.get(_name)]; else {
			var in_this_entity = this.components.map.get(_name);
			if(in_this_entity != null) {
				if(first_only) return [in_this_entity]; else results.push(in_this_entity);
			}
			var _g = 0;
			var _g1 = this.entity.children;
			while(_g < _g1.length) {
				var _child = _g1[_g];
				++_g;
				var found = _child._components.get_any(_name,true,first_only);
				if(found != null) {
					if(first_only && found.length > 0) return [found[0]]; else results.concat(found);
				}
			}
		}
		return results;
	}
	,has: function(_name) {
		return this.components.map.exists(_name);
	}
	,__class__: luxe.components.Components
};
luxe.debug = {};
luxe.debug.DebugView = function() {
	this.visible = false;
	luxe.Objects.call(this);
};
$hxClasses["luxe.debug.DebugView"] = luxe.debug.DebugView;
luxe.debug.DebugView.__name__ = ["luxe","debug","DebugView"];
luxe.debug.DebugView.__super__ = luxe.Objects;
luxe.debug.DebugView.prototype = $extend(luxe.Objects.prototype,{
	refresh: function() {
	}
	,process: function() {
	}
	,onmousedown: function(e) {
	}
	,onmousewheel: function(e) {
	}
	,onmouseup: function(e) {
	}
	,onmousemove: function(e) {
	}
	,onkeydown: function(e) {
	}
	,onkeyup: function(e) {
	}
	,onwindowsized: function(e) {
	}
	,create: function() {
	}
	,show: function() {
		this.visible = true;
	}
	,hide: function() {
		this.visible = false;
	}
	,__class__: luxe.debug.DebugView
});
luxe.debug.BatcherDebugView = function() {
	this.as_immediate = false;
	this.dragging = false;
	luxe.debug.DebugView.call(this);
	this.name = "Batcher Debug";
};
$hxClasses["luxe.debug.BatcherDebugView"] = luxe.debug.BatcherDebugView;
luxe.debug.BatcherDebugView.__name__ = ["luxe","debug","BatcherDebugView"];
luxe.debug.BatcherDebugView.__super__ = luxe.debug.DebugView;
luxe.debug.BatcherDebugView.prototype = $extend(luxe.debug.DebugView.prototype,{
	create: function() {
		this.batcher = Luxe.renderer.create_batcher({ name : "debug_batcher_view", camera : new phoenix.Camera({ camera_name : "batcher_debug_view"}), layer : 1000});
	}
	,refresh: function() {
		this.clear_batcher_tree();
		this.draw_batcher_tree();
	}
	,onmousedown: function(e) {
		this.dragmstart = e.pos.clone();
		this.dragstart = this.batcher.view.get_pos().clone();
		this.dragging = true;
	}
	,onmouseup: function(e) {
		this.dragging = false;
	}
	,onmousemove: function(e) {
		if(this.dragging) {
			var diff = phoenix.Vector.Subtract(e.pos,this.dragmstart);
			this.batcher.view.set_pos(phoenix.Vector.Subtract(this.dragstart,diff));
		}
	}
	,onmousewheel: function(e) {
		if(e.y < 0) {
			var _g = this.batcher.view;
			_g.set_zoom(_g.zoom - 0.1);
		} else {
			var _g1 = this.batcher.view;
			_g1.set_zoom(_g1.zoom + 0.1);
		}
	}
	,clear_batcher_tree: function() {
		if(this._tree_geom != null) {
			this._tree_geom.drop();
			this._tree_geom = null;
		}
	}
	,keystr: function(key,key2) {
		return "ts: " + key.timestamp + "\n" + "seq: " + key.sequence + "\n" + "primitive_type: " + Std.string(key.primitive_type) + " " + Std.string(key.primitive_type) + "\n" + "texture: " + (key.texture == null?"null":Std.string(key.texture.texture)) + "\n" + "texture id: " + (key.texture == null?"null":key.texture.id) + "\n" + "shader: " + (key.shader == null?"null":key.shader.id) + "\n" + "group: " + key.group + "\n" + "depth: " + key.depth + "\n" + "clip: " + (key.clip == null?"null":"" + key.clip);
	}
	,draw_geom_node: function(l,_leaf,_p,_bbw) {
		if(_bbw == null) _bbw = 20;
		var _bw = 128;
		var _bwhalf = _bw / 2;
		var _bh = 128;
		var _g = _leaf.value;
		var c = new phoenix.Color(1,1,1,0.4).rgb(16777215);
		if(_g.dropped) c = new phoenix.Color(1,1,1,1).rgb(13369344);
		this._tree_geom.add_geometry(Luxe.draw.rectangle({ immediate : this.as_immediate, x : _p.x - _bwhalf, y : _p.y, w : _bw, h : _bh, color : c, batcher : this.batcher, depth : 999.4}));
		this._tree_geom.add_geometry(Luxe.draw.text({ immediate : this.as_immediate, bounds : new phoenix.Rectangle(_p.x - _bwhalf,_p.y,_bw,_bh), point_size : 13, color : c, batcher : this.batcher, depth : 999.4, text : this.keystr(_leaf.key,_g.key), align : 2, align_vertical : 2}));
		var t = new phoenix.Vector(_p.x,_p.y,_p.z,_p.w).set_xy(_p.x,_p.y - 16);
		var t2 = new phoenix.Vector(_p.x,_p.y,_p.z,_p.w).set_xy(_p.x,_p.y + _bw + 2);
		var talign = 2;
		this._tree_geom.add_geometry(Luxe.draw.text({ immediate : this.as_immediate, pos : t, point_size : 13, color : c, batcher : this.batcher, depth : 999.4, text : _g.id, align : talign}));
		var c2 = new phoenix.Color(1,1,1,0.4).rgb(16750916);
		var notes_l = "none";
		var notes_r = "none";
		if(_leaf.left != null) {
			notes_l = "node";
			var compare = Luxe.renderer.batcher.compare_rule(_leaf.key,_leaf.left.key);
			notes_l = Luxe.renderer.batcher.compare_rule_to_string(compare);
		}
		if(_leaf.right != null) {
			notes_r = "node";
			var compare1 = Luxe.renderer.batcher.compare_rule(_leaf.key,_leaf.right.key);
			notes_r = Luxe.renderer.batcher.compare_rule_to_string(compare1);
		}
		this._tree_geom.add_geometry(Luxe.draw.text({ immediate : this.as_immediate, pos : t2, point_size : 13, color : c2, batcher : this.batcher, depth : 999.4, text : notes_l + " / " + notes_r, align : talign}));
	}
	,draw_geom_leaf: function(L,_leaf,_p) {
		if(_leaf == null) return;
		var _bw = _leaf.nodecount / 20;
		var _bwb = _leaf.nodecount * 25;
		var _bh = 128;
		var _bh2 = 148;
		var _bwhalf = _bw / 2;
		var c = new phoenix.Color(1,1,1,0.4).rgb(16777215);
		if(_leaf != null) {
			this.draw_geom_node(L,_leaf,_p,_bw);
			if(_leaf.left != null) {
				if(Luxe.renderer.batcher.geometry_compare(_leaf.left.key,_leaf.key) < 0) c = new phoenix.Color(1,1,1,1).rgb(52224); else c = new phoenix.Color(1,1,1,1).rgb(13369344);
				this._tree_geom.add_geometry(Luxe.draw.line({ immediate : this.as_immediate, p0 : new phoenix.Vector(_p.x - _bwhalf,_p.y + _bh), p1 : new phoenix.Vector(_p.x - _bwb,_p.y + _bh2), color : c, batcher : this.batcher, depth : 999.4}));
				this.draw_geom_leaf(true,_leaf.left,new phoenix.Vector(_p.x - _bwb,_p.y + _bh2));
			}
			if(_leaf.right != null) {
				if(Luxe.renderer.batcher.geometry_compare(_leaf.right.key,_leaf.key) > 0) c = new phoenix.Color(1,1,1,1).rgb(52224); else c = new phoenix.Color(1,1,1,1).rgb(13369344);
				this._tree_geom.add_geometry(Luxe.draw.line({ immediate : this.as_immediate, p0 : new phoenix.Vector(_p.x + _bwhalf,_p.y + _bh), p1 : new phoenix.Vector(_p.x + _bwb,_p.y + _bh2), color : c, batcher : this.batcher, depth : 999.4}));
				this.draw_geom_leaf(false,_leaf.right,new phoenix.Vector(_p.x + _bwb,_p.y + _bh2));
			}
		}
	}
	,draw_batcher_tree: function() {
		this._tree_geom = null;
		this._tree_geom = new phoenix.geometry.CompositeGeometry({ batcher : this.batcher, immediate : this.as_immediate, depth : 999.4});
		var _p = new phoenix.Vector(Luxe.core.screen.w / 2,Luxe.debug.padding.y * 2 + 10);
		var _node = Luxe.renderer.batcher.geometry.root;
		this.draw_geom_leaf(true,_node,_p);
	}
	,process: function() {
		if(this.visible) {
			if(Luxe.renderer.batcher.tree_changed) this.refresh();
		}
	}
	,show: function() {
		luxe.debug.DebugView.prototype.show.call(this);
		this.refresh();
	}
	,hide: function() {
		luxe.debug.DebugView.prototype.hide.call(this);
		this.clear_batcher_tree();
	}
	,__class__: luxe.debug.BatcherDebugView
});
luxe.debug.Inspector = function(_options) {
	this.title = "Inspector";
	this.font = Luxe.renderer.font;
	this.set_size(new phoenix.Vector(Luxe.core.screen.w * 0.2 | 0,Luxe.core.screen.h * 0.6 | 0));
	this.set_pos(new phoenix.Vector(Luxe.core.screen.w / 2 - this.size.x / 2,Luxe.core.screen.h / 2 - this.size.y / 2));
	this._batcher = Luxe.renderer.batcher;
	if(_options != null) {
		if(_options.title != null) this.title = _options.title;
		if(_options.font != null) this.font = _options.font;
		if(_options.pos != null) this.set_pos(_options.pos);
		if(_options.size != null) this.set_size(_options.size);
		if(_options.batcher != null) this._batcher = _options.batcher;
	}
};
$hxClasses["luxe.debug.Inspector"] = luxe.debug.Inspector;
luxe.debug.Inspector.__name__ = ["luxe","debug","Inspector"];
luxe.debug.Inspector.prototype = {
	refresh: function() {
		if(this._window == null) this._create_window();
		if(this.onrefresh != null) this.onrefresh();
	}
	,show: function() {
		this.refresh();
		this._window.set_visible(true);
		this._title_text.set_visible(true);
		this._version_text.set_visible(true);
	}
	,hide: function() {
		this._window.set_visible(false);
		this._title_text.set_visible(false);
		this._version_text.set_visible(false);
	}
	,set_size: function(_size) {
		if(this.size != null && this._window != null) this._window.set_size(_size);
		if(this._version_text != null) this._version_text.set_pos(new phoenix.Vector(this.pos.x + (_size.x - 14),this.pos.y + 6));
		return this.size = _size;
	}
	,set_pos: function(_pos) {
		if(this.pos != null && this._window != null) this._window.set_pos(_pos);
		if(this._title_text != null) this._title_text.set_pos(new phoenix.Vector(_pos.x + 14,_pos.y + 6));
		if(this._version_text != null) this._version_text.set_pos(new phoenix.Vector(_pos.x + (this.size.x - 14),_pos.y + 6));
		return this.pos = _pos;
	}
	,_create_window: function() {
		if(this._window != null) this._window.destroy();
		this._window = new luxe.Sprite({ centered : false, depth : 999.1, color : new phoenix.Color().rgb(1447449), size : this.size, pos : this.pos, batcher : this._batcher});
		this._window.geometry.id = "debug.Inspector";
		this._window.set_locked(true);
		this._title_text = new luxe.Text({ name : "debug.title", batcher : this._batcher, no_scene : true, depth : 999.2, color : new phoenix.Color().rgb(16121979), pos : new phoenix.Vector(this.pos.x + 14,this.pos.y + 6), align : 0, font : this.font, text : this.title, point_size : 15, visible : false},{ fileName : "Inspector.hx", lineNumber : 128, className : "luxe.debug.Inspector", methodName : "_create_window"});
		this._version_text = new luxe.Text({ name : "debug.version", batcher : this._batcher, no_scene : true, depth : 999.2, color : new phoenix.Color().rgb(3355443), pos : new phoenix.Vector(this.pos.x + (this.size.x - 14),this.pos.y + 6), align : 1, font : this.font, text : "" + Luxe.build, point_size : 16, visible : false},{ fileName : "Inspector.hx", lineNumber : 142, className : "luxe.debug.Inspector", methodName : "_create_window"});
		if(this._title_text.geometry != null) this._title_text.geometry.id = "debug.title.text";
		if(this._version_text.geometry != null) this._version_text.geometry.id = "debug.version.text";
	}
	,__class__: luxe.debug.Inspector
	,__properties__: {set_size:"set_size",set_pos:"set_pos"}
};
luxe.debug.ProfilerDebugView = function() {
	this._setup = false;
	luxe.debug.DebugView.call(this);
	this.name = "Profiler";
	luxe.debug.ProfilerDebugView.lists = new haxe.ds.StringMap();
};
$hxClasses["luxe.debug.ProfilerDebugView"] = luxe.debug.ProfilerDebugView;
luxe.debug.ProfilerDebugView.__name__ = ["luxe","debug","ProfilerDebugView"];
luxe.debug.ProfilerDebugView.add_offset = function(_id,_offset) {
	var _item = luxe.debug.ProfilerDebugView.lists.get(_id);
	var _offsetitem = luxe.debug.ProfilerDebugView.lists.get(_offset);
	if(_item != null && _offsetitem != null) _item.offsets.push(_offsetitem); else {
		haxe.Log.trace("not found for " + _id + " or " + _offset,{ fileName : "ProfilerDebugView.hx", lineNumber : 32, className : "luxe.debug.ProfilerDebugView", methodName : "add_offset"});
		haxe.Log.trace(Std.string(_item) + " / " + Std.string(_offsetitem),{ fileName : "ProfilerDebugView.hx", lineNumber : 33, className : "luxe.debug.ProfilerDebugView", methodName : "add_offset"});
	}
};
luxe.debug.ProfilerDebugView.hide_item = function(_id) {
	var _item = luxe.debug.ProfilerDebugView.lists.get(_id);
	if(_item != null) {
		_item.hidden = true;
		_item.bar.hide();
	}
};
luxe.debug.ProfilerDebugView.show_item = function(_id) {
	var _item = luxe.debug.ProfilerDebugView.lists.get(_id);
	if(_item != null) {
		_item.hidden = false;
		_item.bar.show();
	}
};
luxe.debug.ProfilerDebugView.start = function(_id,_max) {
	if(_max == null) _max = 0.0;
	var _item = luxe.debug.ProfilerDebugView.lists.get(_id);
	if(_item == null) {
		_item = new luxe.debug._ProfilerDebugView.ProfilerValue(_id,new luxe.debug._ProfilerDebugView.ProfilerBar(_id,_max,new phoenix.Color().rgb(16121979)));
		_item.bar.set_pos(new phoenix.Vector(Luxe.debug.padding.x * 2,Luxe.debug.padding.y * 3 + Lambda.count(luxe.debug.ProfilerDebugView.lists) * 20));
		luxe.debug.ProfilerDebugView.lists.set(_id,_item);
	}
	_item.start = snow.Snow.core.timestamp();
};
luxe.debug.ProfilerDebugView.end = function(_id) {
	var _item = luxe.debug.ProfilerDebugView.lists.get(_id);
	if(_item != null) _item.set(); else throw "Profile end called for " + _id + " but no start called";
};
luxe.debug.ProfilerDebugView.__super__ = luxe.debug.DebugView;
luxe.debug.ProfilerDebugView.prototype = $extend(luxe.debug.DebugView.prototype,{
	show: function() {
		var $it0 = luxe.debug.ProfilerDebugView.lists.iterator();
		while( $it0.hasNext() ) {
			var _item = $it0.next();
			if(!_item.hidden) _item.bar.show();
		}
		if(!this._setup) {
			luxe.debug.ProfilerDebugView.add_offset("core.render","batch.debug_batcher");
			this._setup = true;
		}
	}
	,hide: function() {
		var $it0 = luxe.debug.ProfilerDebugView.lists.iterator();
		while( $it0.hasNext() ) {
			var _item = $it0.next();
			_item.bar.hide();
		}
	}
	,__class__: luxe.debug.ProfilerDebugView
});
luxe.debug._ProfilerDebugView = {};
luxe.debug._ProfilerDebugView.ProfilerValue = function(_name,_bar) {
	this.accum = 0;
	this.count = 0;
	this.hidden = false;
	this.avg = 10;
	this.start = 0.0;
	this.name = _name;
	this.bar = _bar;
	this.history = [];
	this.offsets = [];
};
$hxClasses["luxe.debug._ProfilerDebugView.ProfilerValue"] = luxe.debug._ProfilerDebugView.ProfilerValue;
luxe.debug._ProfilerDebugView.ProfilerValue.__name__ = ["luxe","debug","_ProfilerDebugView","ProfilerValue"];
luxe.debug._ProfilerDebugView.ProfilerValue.prototype = {
	set: function() {
		var _t = snow.Snow.core.timestamp() - this.start;
		var _g = 0;
		var _g1 = this.offsets;
		while(_g < _g1.length) {
			var _offset = _g1[_g];
			++_g;
			_t -= _offset.history[_offset.history.length - 1];
		}
		this.history.push(_t);
		if(this.history.length > this.avg) this.history.shift();
		this.count++;
		if(this.count == this.avg) {
			var __t = this.accum / this.avg;
			this.bar.set_value(__t);
			this.bar.set_ping(__t);
			this.accum = 0;
			this.count = 0;
		}
		this.accum += _t;
		if(this.bar.visible) this.bar.set_text(Std.string(luxe.utils.Maths.fixed(_t * 1000,4)));
	}
	,__class__: luxe.debug._ProfilerDebugView.ProfilerValue
};
luxe.debug._ProfilerDebugView.ProfilerBar = function(_name,_max,_color) {
	if(_max == null) _max = 0.0;
	this.visible = false;
	this.history = 33;
	this.max = 16.6;
	this.height2 = 8;
	this.height = 8;
	this.width = 128;
	this.color_red = new phoenix.Color().rgb(13369344);
	this.color_green = new phoenix.Color().rgb(2263108);
	this.color_normal = new phoenix.Color().rgb(15790320);
	if(_max == 0.0) this.max = 16.6666666666666679; else this.max = _max;
	this.max = luxe.utils.Maths.fixed(this.max,1);
	this.name = _name;
	this.segment = this.width / this.history;
	this.height2 = this.height * 2;
	this.text_item = new luxe.Text({ no_scene : true, name : "profiler.text." + _name, pos : new phoenix.Vector(0,0), color : _color, point_size : this.height * 1.8, depth : 999.3, text : "", batcher : Luxe.debug.batcher},{ fileName : "ProfilerDebugView.hx", lineNumber : 189, className : "luxe.debug._ProfilerDebugView.ProfilerBar", methodName : "new"});
	this.bg_geometry = Luxe.draw.box({ color : new phoenix.Color().rgb(592137), depth : 999.3, batcher : Luxe.debug.batcher, x : 0, y : 0, w : this.width, h : this.height});
	this.graphbg_geometry = Luxe.draw.box({ color : new phoenix.Color().rgb(2236962), depth : 999.3, batcher : Luxe.debug.batcher, x : 0, y : 0, w : this.width - this.segment, h : this.height * 2});
	this.bar_geometry = Luxe.draw.box({ color : _color, depth : 999.33, batcher : Luxe.debug.batcher, x : 1, y : 1, w : this.width - 2, h : this.height - 2});
	this.graph_geometry = new phoenix.geometry.Geometry({ color : _color, depth : 999.33, batcher : Luxe.debug.batcher});
	var _g1 = 0;
	var _g = this.history;
	while(_g1 < _g) {
		var i = _g1++;
		var _b = new phoenix.geometry.Vertex(new phoenix.Vector(this.segment * i,0),_color);
		this.graph_geometry.add(_b);
	}
	this.graph_geometry.set_primitive_type(3);
	this.hide();
};
$hxClasses["luxe.debug._ProfilerDebugView.ProfilerBar"] = luxe.debug._ProfilerDebugView.ProfilerBar;
luxe.debug._ProfilerDebugView.ProfilerBar.__name__ = ["luxe","debug","_ProfilerDebugView","ProfilerBar"];
luxe.debug._ProfilerDebugView.ProfilerBar.prototype = {
	hide: function() {
		this.visible = false;
		this.bar_geometry.set_visible(false);
		this.bg_geometry.set_visible(false);
		this.graph_geometry.set_visible(false);
		this.graphbg_geometry.set_visible(false);
		this.text_item.set_visible(false);
	}
	,show: function() {
		this.visible = true;
		this.bar_geometry.set_visible(true);
		this.bg_geometry.set_visible(true);
		this.graph_geometry.set_visible(true);
		this.graphbg_geometry.set_visible(true);
		this.text_item.set_visible(true);
	}
	,set_ping: function(_v) {
		var _vv = luxe.utils.Maths.fixed(_v * 1000,4);
		var _p = _vv / this.max;
		var _g1 = 0;
		var _g = this.history;
		while(_g1 < _g) {
			var i = _g1++;
			var v = this.graph_geometry.vertices[i];
			if(i < this.history - 1) {
				var v1 = this.graph_geometry.vertices[i + 1];
				if(v1 != null) {
					v.pos.set_y(Math.floor(v1.pos.y));
					v.color = v1.color;
				}
			}
		}
		if(_p > 1) {
			_p = 1;
			this.graph_geometry.vertices[this.history - 1].color = this.color_red;
		} else if(_p < 0.2) this.graph_geometry.vertices[this.history - 1].color = this.color_green; else this.graph_geometry.vertices[this.history - 1].color = this.color_normal;
		if(_p < 0.001) _p = 0.001;
		this.graph_geometry.vertices[this.history - 1].pos.set_y(Math.floor(this.height2 * (1.0 - _p)));
		return this.ping = _v;
	}
	,set_value: function(_v) {
		var _vv = luxe.utils.Maths.fixed(_v * 1000,4);
		var _p = _vv / this.max;
		if(_p > 1) {
			_p = 1;
			this.bar_geometry.set_color(this.color_red);
		} else if(_p < 0.15) this.bar_geometry.set_color(this.color_green); else this.bar_geometry.set_color(this.color_normal);
		if(_p < 0.005) _p = 0.005;
		var nx = (this.width - 2) * _p;
		this.bar_geometry.resize(new phoenix.Vector(nx,this.height - 2));
		return this.value = _v;
	}
	,set_pos: function(_p) {
		this.bg_geometry.transform.local.set_pos(_p);
		this.bar_geometry.transform.set_pos(new phoenix.Vector(_p.x + 1,_p.y + 1));
		this.text_item.set_pos(new phoenix.Vector(_p.x + this.width * 2 + 10,_p.y - 6));
		this.graphbg_geometry.transform.set_pos(new phoenix.Vector(_p.x + this.width + 2,_p.y - 4));
		this.graph_geometry.transform.local.set_pos(this.graphbg_geometry.transform.local.pos);
		return this.pos = _p;
	}
	,set_text: function(_t) {
		this.text_item.set_text("" + this.name + " (" + this.max + "ms) | " + _t + "ms");
		return this.text = _t;
	}
	,__class__: luxe.debug._ProfilerDebugView.ProfilerBar
	,__properties__: {set_ping:"set_ping",set_value:"set_value",set_pos:"set_pos",set_text:"set_text"}
};
luxe.debug.StatsDebugView = function() {
	this.hide_debug = true;
	this.font_size = 15;
	this.debug_geometry_count = 13;
	this.debug_draw_call_count = 3;
	luxe.debug.DebugView.call(this);
	this.name = "Statistics";
	this._last_render_stats = { batchers : 0, geometry_count : 0, dynamic_batched_count : 0, static_batched_count : 0, visible_count : 0, draw_calls : 0, vert_count : 0, group_count : 0};
	this._render_stats = { batchers : 0, geometry_count : 0, dynamic_batched_count : 0, static_batched_count : 0, visible_count : 0, draw_calls : 0, vert_count : 0, group_count : 0};
};
$hxClasses["luxe.debug.StatsDebugView"] = luxe.debug.StatsDebugView;
luxe.debug.StatsDebugView.__name__ = ["luxe","debug","StatsDebugView"];
luxe.debug.StatsDebugView.__super__ = luxe.debug.DebugView;
luxe.debug.StatsDebugView.prototype = $extend(luxe.debug.DebugView.prototype,{
	get_resource_stats_string: function() {
		return Std.string(Luxe.resources.stats);
	}
	,get_render_stats_string: function() {
		return "Renderer Statistics\n" + "\tbatcher count : " + this._render_stats.batchers + "\n" + "\ttotal geometry : " + this._render_stats.geometry_count + "\n" + "\tvisible geometry : " + this._render_stats.visible_count + "\n" + "\tdynamic batch count : " + this._render_stats.dynamic_batched_count + "\n" + "\tstatic batch count : " + this._render_stats.static_batched_count + "\n" + "\ttotal draw calls : " + this._render_stats.draw_calls + "\n" + "\ttotal vert count : " + this._render_stats.vert_count;
	}
	,create: function() {
		var debug = Luxe.debug;
		this.render_stats_text = new luxe.Text({ depth : 999.3, no_scene : true, color : new phoenix.Color(0,0,0,1).rgb(16121979), pos : new phoenix.Vector(debug.padding.x * 2,debug.padding.y * 3), font : Luxe.renderer.font, text : this.get_render_stats_string(), point_size : this.font_size, batcher : debug.batcher, visible : false},{ fileName : "StatsDebugView.hx", lineNumber : 82, className : "luxe.debug.StatsDebugView", methodName : "create"});
		this.resource_stats_text = new luxe.Text({ depth : 999.3, no_scene : true, color : new phoenix.Color(0,0,0,1).rgb(16121979), pos : new phoenix.Vector(debug.padding.x * 2,debug.padding.y * 7.5), font : Luxe.renderer.font, text : this.get_resource_stats_string(), point_size : this.font_size, batcher : debug.batcher, visible : false},{ fileName : "StatsDebugView.hx", lineNumber : 94, className : "luxe.debug.StatsDebugView", methodName : "create"});
		this.resource_list_text = new luxe.Text({ depth : 999.3, no_scene : true, color : new phoenix.Color(0,0,0,1).rgb(16121979), pos : new phoenix.Vector(debug.padding.x * 7,debug.padding.y * 3), font : Luxe.renderer.font, text : "", point_size : this.font_size * 0.8, batcher : debug.batcher, visible : false},{ fileName : "StatsDebugView.hx", lineNumber : 106, className : "luxe.debug.StatsDebugView", methodName : "create"});
		this.resource_list_text.set_locked(true);
		this.resource_stats_text.set_locked(true);
	}
	,onwindowsized: function(e) {
		var debug = Luxe.debug;
		if(this.resource_list_text != null) {
			this.resource_list_text.set_pos(new phoenix.Vector(debug.padding.x * 7,debug.padding.y * 3));
			this.resource_list_text.geometry.set_dirty(true);
		}
		if(this.resource_stats_text != null) {
			this.resource_stats_text.set_pos(new phoenix.Vector(debug.padding.x * 2,debug.padding.y * 7.5));
			this.resource_stats_text.geometry.set_dirty(true);
		}
		if(this.render_stats_text != null) {
			this.render_stats_text.set_pos(new phoenix.Vector(debug.padding.x * 2,debug.padding.y * 3));
			this.render_stats_text.geometry.set_dirty(true);
		}
	}
	,refresh: function() {
		var texture_lists = "";
		var shader_lists = "";
		var font_lists = "";
		var _g = 0;
		var _g1 = Luxe.resources.resourcelist;
		while(_g < _g1.length) {
			var res = _g1[_g];
			++_g;
			var _g2 = res.type;
			switch(_g2) {
			case 4:
				var t = res;
				texture_lists += "\t" + t.id + "    (" + t.width_actual + "x" + t.height_actual + "  " + t.estimated_memory() + " )\n";
				break;
			case 7:
				font_lists += "\t" + res.id + "\n";
				break;
			case 8:
				shader_lists += "\t" + res.id + "\n";
				break;
			default:
			}
		}
		var lists = "Fonts\n";
		lists += font_lists;
		lists += "Shader\n";
		lists += shader_lists;
		lists += "Textures\n";
		lists += texture_lists;
		this.resource_list_text.set_text(lists);
		if(this.resource_list_text.geometry != null) this.resource_list_text.geometry.set_dirty(true);
	}
	,process: function() {
		if(!this.visible) return;
		var dirty = false;
		this.update_render_stats();
		if(this._last_render_stats.batchers != this._render_stats.batchers) {
			dirty = true;
			this._last_render_stats.batchers = this._render_stats.batchers;
		}
		if(this._last_render_stats.geometry_count != this._render_stats.geometry_count) {
			dirty = true;
			this._last_render_stats.geometry_count = this._render_stats.geometry_count;
		}
		if(this._last_render_stats.dynamic_batched_count != this._render_stats.dynamic_batched_count) {
			dirty = true;
			this._last_render_stats.dynamic_batched_count = this._render_stats.dynamic_batched_count;
		}
		if(this._last_render_stats.static_batched_count != this._render_stats.static_batched_count) {
			dirty = true;
			this._last_render_stats.static_batched_count = this._render_stats.static_batched_count;
		}
		if(this._last_render_stats.visible_count != this._render_stats.visible_count) {
			dirty = true;
			this._last_render_stats.visible_count = this._render_stats.visible_count;
		}
		if(this._last_render_stats.draw_calls != this._render_stats.draw_calls) {
			dirty = true;
			this._last_render_stats.draw_calls = this._render_stats.draw_calls;
		}
		if(this._last_render_stats.group_count != this._render_stats.group_count) {
			dirty = true;
			this._last_render_stats.group_count = this._render_stats.group_count;
		}
		if(this._last_render_stats.vert_count != this._render_stats.vert_count) {
			dirty = true;
			this._last_render_stats.vert_count = this._render_stats.vert_count;
		}
		if(dirty) this.refresh_render_stats();
	}
	,onkeydown: function(e) {
		if(e.keycode == snow.system.input.Keycodes.key_2 && this.visible) this.toggle_debug_stats();
	}
	,show: function() {
		luxe.debug.DebugView.prototype.show.call(this);
		this.refresh();
		this.render_stats_text.set_visible(true);
		this.resource_stats_text.set_visible(true);
		this.resource_list_text.set_visible(true);
	}
	,hide: function() {
		luxe.debug.DebugView.prototype.hide.call(this);
		this.render_stats_text.set_visible(false);
		this.resource_stats_text.set_visible(false);
		this.resource_list_text.set_visible(false);
	}
	,refresh_render_stats: function() {
		if(!this.visible) return;
		this.render_stats_text.set_text(this.get_render_stats_string());
		this.resource_stats_text.set_text(this.get_resource_stats_string());
		this.resource_stats_text.set_locked(true);
		this.render_stats_text.set_locked(true);
		if(this.render_stats_text.geometry != null) {
			this.resource_stats_text.geometry.set_dirty(true);
			this.render_stats_text.geometry.set_dirty(true);
		}
	}
	,toggle_debug_stats: function() {
		this.hide_debug = !this.hide_debug;
	}
	,update_render_stats: function() {
		this.debug_geometry_count = Luxe.debug.batcher.geometry.size();
		this.debug_draw_call_count = Luxe.debug.batcher.draw_calls;
		this._render_stats.batchers = Luxe.renderer.stats.batchers;
		this._render_stats.geometry_count = Luxe.renderer.stats.geometry_count;
		this._render_stats.visible_count = Luxe.renderer.stats.visible_count;
		this._render_stats.dynamic_batched_count = Luxe.renderer.stats.dynamic_batched_count;
		this._render_stats.static_batched_count = Luxe.renderer.stats.static_batched_count;
		this._render_stats.draw_calls = Luxe.renderer.stats.draw_calls;
		this._render_stats.vert_count = Luxe.renderer.stats.vert_count;
		if(this.hide_debug) {
			this._render_stats.batchers = this._render_stats.batchers - 1;
			this._render_stats.geometry_count = this._render_stats.geometry_count - this.debug_geometry_count;
			this._render_stats.visible_count = this._render_stats.visible_count - Luxe.debug.batcher.visible_count;
			this._render_stats.dynamic_batched_count = this._render_stats.dynamic_batched_count - Luxe.debug.batcher.dynamic_batched_count;
			this._render_stats.static_batched_count = this._render_stats.static_batched_count - Luxe.debug.batcher.static_batched_count;
			this._render_stats.draw_calls -= this.debug_draw_call_count;
			this._render_stats.vert_count -= Luxe.debug.batcher.vert_count;
		}
	}
	,__class__: luxe.debug.StatsDebugView
});
luxe.debug.TraceDebugView = function() {
	this._last_logged_length = 0;
	this.max_lines = 35;
	luxe.debug.DebugView.call(this);
	this.name = "Log";
	Luxe.debug.add_trace_listener("TraceDebugView",$bind(this,this.on_trace));
	this.logged = new Array();
	this.add_line("luxe version " + Luxe.build + " Debug Log");
};
$hxClasses["luxe.debug.TraceDebugView"] = luxe.debug.TraceDebugView;
luxe.debug.TraceDebugView.__name__ = ["luxe","debug","TraceDebugView"];
luxe.debug.TraceDebugView.__super__ = luxe.debug.DebugView;
luxe.debug.TraceDebugView.prototype = $extend(luxe.debug.DebugView.prototype,{
	on_trace: function(v,inf) {
		this.add_line(inf.fileName + ":" + inf.lineNumber + " " + Std.string(v));
	}
	,create: function() {
		var debug = Luxe.debug;
		var text_bounds = new phoenix.Rectangle(debug.padding.x + 20,debug.padding.y + 40,Luxe.core.screen.w - debug.padding.x * 2 - 20,Luxe.core.screen.h - debug.padding.y * 2 - 40);
		this.lines = new luxe.Text({ name : "debug.log.text", no_scene : true, depth : 999.3, color : new phoenix.Color().rgb(8947848), bounds : text_bounds, bounds_wrap : true, font : Luxe.renderer.font, text : "", align_vertical : 4, point_size : 12, batcher : debug.batcher, visible : false},{ fileName : "TraceDebugView.hx", lineNumber : 35, className : "luxe.debug.TraceDebugView", methodName : "create"});
		if(this.lines.geometry != null) {
			this.lines.geometry.set_clip_rect(text_bounds);
			this.lines.geometry.set_locked(true);
		}
	}
	,onwindowsized: function(e) {
		var debug = Luxe.debug;
		var text_bounds = new phoenix.Rectangle(debug.padding.x + 20,debug.padding.y + 40,Luxe.core.screen.w - debug.padding.x * 2 - 20,Luxe.core.screen.h - debug.padding.y * 2 - 40);
		this.lines.set_bounds(text_bounds);
		this.lines.set_clip_rect(text_bounds);
		if(this.lines.geometry != null) {
			this.lines.geometry.set_locked(true);
			this.lines.geometry.set_dirty(true);
		}
	}
	,add_line: function(_t) {
		if(this.logged == null) return;
		this.logged.push(_t);
		if(!this.visible) return;
		this.refresh_lines();
	}
	,refresh_lines: function() {
		if(this._last_logged_length == this.logged.length) return;
		var _final = "";
		if(this.logged.length <= this.max_lines) {
			var _g = 0;
			var _g1 = this.logged;
			while(_g < _g1.length) {
				var _line = _g1[_g];
				++_g;
				_final += _line + "\n";
			}
		} else {
			var _start = this.logged.length - this.max_lines;
			var _total = this.logged.length;
			var _g11 = _start;
			var _g2 = this.logged.length;
			while(_g11 < _g2) {
				var i = _g11++;
				var _line1 = this.logged[i];
				_final += _line1 + "\n";
			}
		}
		this.lines.set_text(_final);
		if(this.lines.geometry != null) {
			this.lines.geometry.set_locked(true);
			this.lines.geometry.set_dirty(true);
		}
		this._last_logged_length = this.logged.length;
	}
	,refresh: function() {
	}
	,process: function() {
	}
	,show: function() {
		luxe.debug.DebugView.prototype.show.call(this);
		this.refresh_lines();
		this.lines.set_visible(true);
	}
	,hide: function() {
		luxe.debug.DebugView.prototype.hide.call(this);
		this.lines.set_visible(false);
	}
	,__class__: luxe.debug.TraceDebugView
});
luxe.importers = {};
luxe.importers.tiled = {};
luxe.importers.tiled.TiledLayer = function(_map) {
	this.visible = true;
	this.opacity = 1.0;
	this.map = _map;
	this.properties = new haxe.ds.StringMap();
	this.tiles = [];
};
$hxClasses["luxe.importers.tiled.TiledLayer"] = luxe.importers.tiled.TiledLayer;
luxe.importers.tiled.TiledLayer.__name__ = ["luxe","importers","tiled","TiledLayer"];
luxe.importers.tiled.TiledLayer.bytes_get_int32 = function(bytes,pos) {
	return bytes.b[pos] | bytes.b[pos + 1] << 8 | bytes.b[pos + 2] << 16 | bytes.b[pos + 3] << 24;
};
luxe.importers.tiled.TiledLayer.base64_to_array = function(input,compression) {
	if(luxe.importers.tiled.TiledLayer.base_lookup.length == 0) {
		var _g1 = 0;
		var _g = luxe.importers.tiled.TiledLayer.base_chars.length;
		while(_g1 < _g) {
			var c = _g1++;
			luxe.importers.tiled.TiledLayer.base_lookup[HxOverrides.cca(luxe.importers.tiled.TiledLayer.base_chars,c)] = c;
		}
	}
	var result = [];
	var bytes = haxe.io.Bytes.alloc(input.length / 4 * 3 | 0);
	var byte_pos = 0;
	var i = 0;
	while(i < input.length - 3) {
		var input_ch = input.charAt(i);
		if(input_ch == " " || input_ch == "\n") {
			i++;
			continue;
		}
		var a0 = luxe.importers.tiled.TiledLayer.base_lookup[HxOverrides.cca(input,i)];
		var a1 = luxe.importers.tiled.TiledLayer.base_lookup[HxOverrides.cca(input,i + 1)];
		var a2 = luxe.importers.tiled.TiledLayer.base_lookup[HxOverrides.cca(input,i + 2)];
		var a3 = luxe.importers.tiled.TiledLayer.base_lookup[HxOverrides.cca(input,i + 3)];
		if(a1 < 64) bytes.set(byte_pos++,(a0 << 2) + ((a1 & 48) >> 4));
		if(a2 < 64) bytes.set(byte_pos++,((a1 & 15) << 4) + ((a2 & 60) >> 2));
		if(a3 < 64) bytes.set(byte_pos++,((a2 & 3) << 6) + a3);
		i += 4;
	}
	if(compression != null) switch(compression) {
	case "gzip":
		throw "TiledMap: gzip compression is not currently supported. Try zlib/zip compression instead.";
		break;
	case "zlib":
		bytes = haxe.zip.Uncompress.run(bytes);
		break;
	}
	var byte_len = bytes.length;
	byte_pos = 0;
	while(byte_pos < byte_len) {
		result.push(bytes.b[byte_pos] | bytes.b[byte_pos + 1] << 8 | bytes.b[byte_pos + 2] << 16 | bytes.b[byte_pos + 3] << 24);
		byte_pos += 4;
	}
	bytes = null;
	return result;
};
luxe.importers.tiled.TiledLayer.prototype = {
	from_xml: function(xml) {
		var tileGIDs = new Array();
		var root = xml;
		this.name = root.get("name");
		this.width = Std.parseInt(root.get("width"));
		this.height = Std.parseInt(root.get("height"));
		var _opacity = root.get("opacity");
		var _visible = root.get("visible");
		if(_opacity == null) this.opacity = 1.0; else this.opacity = Std.parseFloat(_opacity);
		if(_visible == "0") this.visible = false; else this.visible = true;
		var $it0 = root.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(luxe.importers.tiled.TiledUtil.valid_element(child)) {
				var _g = child.get_nodeName();
				switch(_g) {
				case "properties":
					var $it1 = child.iterator();
					while( $it1.hasNext() ) {
						var property = $it1.next();
						if(!luxe.importers.tiled.TiledUtil.valid_element(property)) continue;
						var key = property.get("name");
						var value = property.get("value");
						this.properties.set(key,value);
					}
					break;
				case "data":
					var encoding;
					if(child.exists("encoding")) encoding = child.get("encoding"); else encoding = "";
					var node_value = child.firstChild().get_nodeValue();
					switch(encoding) {
					case "base64":
						tileGIDs = luxe.importers.tiled.TiledLayer.base64_to_array(node_value,child.get("compression"));
						break;
					case "csv":
						tileGIDs = this.csv_to_array(node_value);
						break;
					default:
						var $it2 = child.iterator();
						while( $it2.hasNext() ) {
							var tile = $it2.next();
							if(luxe.importers.tiled.TiledUtil.valid_element(tile)) {
								var gid = Std.parseInt(tile.get("gid"));
								tileGIDs.push(gid);
							}
						}
					}
					break;
				}
			}
		}
		var _g1 = 0;
		while(_g1 < tileGIDs.length) {
			var gid1 = tileGIDs[_g1];
			++_g1;
			this.tiles.push(new luxe.importers.tiled.TiledTile(this,gid1));
		}
	}
	,from_json: function(json) {
		var tileGIDs = new Array();
		this.name = Reflect.field(json,"name");
		this.width = Std.parseInt(Reflect.field(json,"width"));
		this.height = Std.parseInt(Reflect.field(json,"height"));
		this.opacity = Std.parseFloat(Reflect.field(json,"opacity"));
		if(Reflect.field(json,"visible") == "false") this.visible = false; else this.visible = true;
		var fields = Reflect.fields(json);
		var _g = 0;
		while(_g < fields.length) {
			var nodename = fields[_g];
			++_g;
			var child = Reflect.field(json,nodename);
			switch(nodename) {
			case "properties":
				var child_fields = Reflect.fields(child);
				var _g1 = 0;
				while(_g1 < child_fields.length) {
					var property_name = child_fields[_g1];
					++_g1;
					var value = Reflect.field(child,property_name);
					this.properties.set(property_name,value);
				}
				break;
			case "data":
				tileGIDs = child;
				break;
			}
		}
		var _g2 = 0;
		while(_g2 < tileGIDs.length) {
			var gid = tileGIDs[_g2];
			++_g2;
			this.tiles.push(new luxe.importers.tiled.TiledTile(this,gid));
		}
	}
	,csv_to_array: function(input) {
		var result = new Array();
		var rows = StringTools.trim(input).split("\n");
		var row;
		var _g = 0;
		while(_g < rows.length) {
			var row1 = rows[_g];
			++_g;
			if(row1 != "") {
				var resultRow = new Array();
				var entries = StringTools.trim(row1).split(",");
				var entry;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry1 = entries[_g1];
					++_g1;
					if(entry1 != "") result.push(Std.parseInt(entry1));
				}
			}
		}
		return result;
	}
	,__class__: luxe.importers.tiled.TiledLayer
};
luxe.tilemaps = {};
luxe.tilemaps.Tilemap = function(options) {
	this.total_height = 0;
	this.total_width = 0;
	this.height = 0;
	this.width = 0;
	this.tile_height = 0;
	this.tile_width = 0;
	this.width = options.w;
	this.height = options.h;
	this.tile_width = options.tile_width;
	this.tile_height = options.tile_height;
	if(options.x != null && options.y != null) this.pos = new phoenix.Vector(options.x,options.y); else {
		this.pos = new phoenix.Vector();
		if(options.x != null) this.pos.set_x(options.x);
		if(options.y != null) this.pos.set_y(options.y);
	}
	if(options.orientation == null) this.orientation = luxe.tilemaps.TilemapOrientation.none; else this.orientation = options.orientation;
	this.properties = new haxe.ds.StringMap();
	this.tilesets = new haxe.ds.StringMap();
	this.layers = new haxe.ds.StringMap();
	this.layers_ordered = [];
};
$hxClasses["luxe.tilemaps.Tilemap"] = luxe.tilemaps.Tilemap;
luxe.tilemaps.Tilemap.__name__ = ["luxe","tilemaps","Tilemap"];
luxe.tilemaps.Tilemap.prototype = {
	display: function(options) {
		var _g = this.orientation;
		switch(_g[1]) {
		case 0:
			this.visual = new luxe.tilemaps.OrthoVisual(this,options);
			break;
		case 1:
			this.visual = new luxe.tilemaps.IsometricVisual(this,options);
			break;
		case 2:
			break;
		}
	}
	,inside: function(x,y) {
		if(this.width == 0 || this.height == 0) return false;
		if(x < 0) return false;
		if(y < 0) return false;
		if(y > this.height - 1) return false;
		if(x > this.width - 1) return false;
		return true;
	}
	,tile_pos: function(layer_name,x,y,scale,offset_x,offset_y) {
		if(scale == null) scale = 1.0;
		if(this.inside(x,y)) {
			var _g = this.orientation;
			switch(_g[1]) {
			case 0:
				var _worldpos = luxe.tilemaps.Ortho.tile_coord_to_worldpos(x,y,this.tile_width,this.tile_height,scale,offset_x,offset_y);
				return _worldpos.add(this.pos);
			case 1:
				var _worldpos1 = luxe.tilemaps.Isometric.tile_coord_to_worldpos(x,y,this.tile_width,this.tile_height,scale,offset_x,offset_y);
				return _worldpos1.add(this.pos);
			default:
			}
		}
		return new phoenix.Vector();
	}
	,tile_at_pos: function(layer_name,worldpos,_scale) {
		if(_scale == null) _scale = 1.0;
		var _g = this.orientation;
		switch(_g[1]) {
		case 0:
			var _tile_pos = luxe.tilemaps.Ortho.worldpos_to_tile_coord(worldpos.x - this.pos.x,worldpos.y - this.pos.y,this.tile_width,this.tile_height,_scale);
			return this.tile_at(layer_name,Math.floor(_tile_pos.x),Math.floor(_tile_pos.y));
		case 1:
			var _tile_pos1 = luxe.tilemaps.Isometric.worldpos_to_tile_coord(worldpos.x - this.pos.x,worldpos.y - this.pos.y,this.tile_width,this.tile_height,_scale);
			return this.tile_at(layer_name,Math.floor(_tile_pos1.x),Math.floor(_tile_pos1.y));
		default:
		}
		return null;
	}
	,worldpos_to_map: function(worldpos,_scale) {
		if(_scale == null) _scale = 1.0;
		var _g = this.orientation;
		switch(_g[1]) {
		case 0:
			return luxe.tilemaps.Ortho.worldpos_to_tile_coord(worldpos.x - this.pos.x,worldpos.y - this.pos.y,this.tile_width,this.tile_height,_scale);
		case 1:
			return luxe.tilemaps.Isometric.worldpos_to_tile_coord(worldpos.x - this.pos.x,worldpos.y - this.pos.y,this.tile_width,this.tile_height,_scale);
		default:
		}
		return null;
	}
	,layer: function(layer_name) {
		return this.layers.get(layer_name);
	}
	,tileset: function(layer_name) {
		return this.tilesets.get(layer_name);
	}
	,tile_at: function(layer_name,x,y) {
		if(this.inside(x,y)) {
			var _layer = this.layers.get(layer_name);
			if(_layer != null) return _layer.tiles[y][x]; else {
				haxe.Log.trace("No tile layer called '" + layer_name + "' for tile_at " + x + "," + y,{ fileName : "Tilemap.hx", lineNumber : 531, className : "luxe.tilemaps.Tilemap", methodName : "tile_at"});
				return null;
			}
		} else return null;
	}
	,iterator: function() {
		return HxOverrides.iter(this.layers_ordered);
	}
	,add_tileset: function(options) {
		var tileset = new luxe.tilemaps.Tileset(options);
		this.tilesets.set(tileset.name,tileset);
		return tileset;
	}
	,_sort_layers: function(a,b) {
		if(a.layer < b.layer) return -1;
		if(a.layer >= b.layer) return 1;
		return 1;
	}
	,sort_layers: function() {
		this.layers_ordered.sort($bind(this,this._sort_layers));
	}
	,tileset_from_id: function(_id) {
		var tileset = null;
		var max = 0;
		var $it0 = this.tilesets.iterator();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			if(_id >= t.first_id && t.first_id >= max) {
				max = t.first_id;
				tileset = t;
			}
		}
		return tileset;
	}
	,remove_tile: function(layer_name,x,y) {
		if(this.inside(x,y)) {
			var _layer = this.layer(layer_name);
			if(_layer != null) _layer.tiles[y][x].set_id(0);
		}
		return false;
	}
	,remove_tileset: function(name,_destroy_textures) {
		if(_destroy_textures == null) _destroy_textures = false;
		var _tileset = this.tileset(name);
		if(_tileset != null && _destroy_textures) _tileset.texture.destroy();
		return this.tilesets.remove(name);
	}
	,remove_layer: function(name) {
		var _layer = this.layer(name);
		if(_layer != null) HxOverrides.remove(this.layers_ordered,_layer);
		return this.layers.remove(name);
	}
	,add_layer: function(options) {
		if(options.map == null) options.map = this;
		var new_layer = new luxe.tilemaps.TileLayer(options);
		this.layers.set(new_layer.name,new_layer);
		this.layers_ordered.push(new_layer);
		this.sort_layers();
		return new_layer;
	}
	,add_tiles_fill_by_id: function(layer_name,_tileid) {
		if(_tileid == null) _tileid = 0;
		var _layer = this.layers.get(layer_name);
		if(_layer != null) {
			_layer.tiles = null;
			_layer.tiles = [];
			var _g1 = 0;
			var _g = this.height;
			while(_g1 < _g) {
				var y = _g1++;
				var _tile_row = [];
				var _g3 = 0;
				var _g2 = this.width;
				while(_g3 < _g2) {
					var x = _g3++;
					var _tile = new luxe.tilemaps.Tile({ layer : _layer, id : _tileid, x : x, y : y});
					_tile_row.push(_tile);
				}
				_layer.tiles.push(_tile_row);
			}
		} else haxe.Log.trace("No tile layer called '" + layer_name + "' for add_tiles_fill_by_id",{ fileName : "Tilemap.hx", lineNumber : 670, className : "luxe.tilemaps.Tilemap", methodName : "add_tiles_fill_by_id"});
	}
	,add_tiles_from_grid: function(layer_name,grid) {
		if(grid.length != this.height) throw "add_tiles_from_grid requires a grid of integers the same size as the tilemap! height != grid.length";
		if(grid.length != 0) {
			if(grid[0].length != this.width) throw "add_tiles_from_grid requires a grid of integers the same size as the tilemap! width != grid[0].length";
		}
		var _layer = this.layers.get(layer_name);
		if(_layer != null) {
			_layer.tiles = null;
			_layer.tiles = [];
			var _g1 = 0;
			var _g = this.height;
			while(_g1 < _g) {
				var y = _g1++;
				var _tile_row = [];
				var _g3 = 0;
				var _g2 = this.width;
				while(_g3 < _g2) {
					var x = _g3++;
					var tileid = grid[y][x];
					var _tile = new luxe.tilemaps.Tile({ layer : _layer, id : tileid, x : x, y : y});
					_tile_row.push(_tile);
				}
				_layer.tiles.push(_tile_row);
			}
		} else haxe.Log.trace("No tile layer called '" + layer_name + "' for add_tiles_from_grid",{ fileName : "Tilemap.hx", lineNumber : 716, className : "luxe.tilemaps.Tilemap", methodName : "add_tiles_from_grid"});
	}
	,get_total_width: function() {
		return this.width * this.tile_width;
	}
	,get_total_height: function() {
		return this.height * this.tile_height;
	}
	,get_bounds: function() {
		return new phoenix.Rectangle(this.pos.x,this.pos.y,this.pos.x + this.get_total_width(),this.pos.y + this.get_total_height());
	}
	,__class__: luxe.tilemaps.Tilemap
	,__properties__: {get_bounds:"get_bounds",get_total_height:"get_total_height",get_total_width:"get_total_width"}
};
luxe.importers.tiled.TiledMap = function(options) {
	if(options.format == null) options.format = "xml";
	if(options.asset_path == null) options.asset_path = "assets/";
	if(options.pos == null) options.pos = new phoenix.Vector();
	if(options.tiled_file_data == null || options.tiled_file_data.length == 0) throw "TiledMap handed invalid file data, pass the text contents of the tmx/json file";
	this.tiledmap_data = new luxe.importers.tiled.TiledMapData();
	if(options.format == "json") this.tiledmap_data.parseFromJSON(JSON.parse(options.tiled_file_data)); else this.tiledmap_data.parseFromXML(Xml.parse(options.tiled_file_data));
	luxe.tilemaps.Tilemap.call(this,{ x : options.pos.x | 0, y : options.pos.y | 0, w : this.tiledmap_data.width, h : this.tiledmap_data.height, tile_width : this.tiledmap_data.tile_width, tile_height : this.tiledmap_data.tile_height});
	this._load_tilesets(options);
	this._load_layers(options);
	this.orientation = this.tiledmap_data.orientation;
};
$hxClasses["luxe.importers.tiled.TiledMap"] = luxe.importers.tiled.TiledMap;
luxe.importers.tiled.TiledMap.__name__ = ["luxe","importers","tiled","TiledMap"];
luxe.importers.tiled.TiledMap.__super__ = luxe.tilemaps.Tilemap;
luxe.importers.tiled.TiledMap.prototype = $extend(luxe.tilemaps.Tilemap.prototype,{
	_load_tilesets: function(options) {
		var _g = 0;
		var _g1 = this.tiledmap_data.tilesets;
		while(_g < _g1.length) {
			var _tileset = _g1[_g];
			++_g;
			this.add_tileset({ name : _tileset.name, texture : Luxe.loadTexture(options.asset_path + _tileset.texture_name), first_id : _tileset.first_id, tile_width : _tileset.tile_width, tile_height : _tileset.tile_height, spacing : _tileset.spacing, margin : _tileset.margin});
		}
	}
	,_load_layers: function(options) {
		var layer_index = 0;
		var _g = 0;
		var _g1 = this.tiledmap_data.layers;
		while(_g < _g1.length) {
			var _layer = _g1[_g];
			++_g;
			this.add_layer({ name : _layer.name, layer : layer_index, opacity : _layer.opacity, visible : _layer.visible});
			this.add_tiles_fill_by_id(_layer.name,0);
			var tilemap_layer = this.layers.get(_layer.name);
			var _gid_counter = 0;
			var _g3 = 0;
			var _g2 = _layer.height;
			while(_g3 < _g2) {
				var _y = _g3++;
				var _g5 = 0;
				var _g4 = _layer.width;
				while(_g5 < _g4) {
					var _x = _g5++;
					var next_id = _layer.tiles[_gid_counter].id;
					if(next_id != 0) tilemap_layer.tiles[_y][_x].set_id(next_id);
					_gid_counter++;
				}
			}
			layer_index++;
		}
	}
	,__class__: luxe.importers.tiled.TiledMap
});
luxe.importers.tiled.TiledMapData = function() {
	this.background_color = "";
	this.version = "";
	this.width = 0;
	this.height = 0;
	this.tile_width = 0;
	this.tile_height = 0;
	this.orientation = luxe.tilemaps.TilemapOrientation.none;
	this.tilesets = [];
	this.layers = [];
	this.properties = new haxe.ds.StringMap();
	this.object_groups = [];
};
$hxClasses["luxe.importers.tiled.TiledMapData"] = luxe.importers.tiled.TiledMapData;
luxe.importers.tiled.TiledMapData.__name__ = ["luxe","importers","tiled","TiledMapData"];
luxe.importers.tiled.TiledMapData.prototype = {
	toString: function() {
		return "TiledMap : layers(" + this.layers.length + ") tilesets(" + this.tilesets.length + ")" + " tilew,tileh(" + this.tile_width + "," + this.tile_height + ")";
	}
	,parseFromXML: function(xml) {
		var root = xml.firstElement();
		this.version = root.get("version");
		this.background_color = root.get("backgroundcolor");
		this.width = Std.parseInt(root.get("width"));
		this.height = Std.parseInt(root.get("height"));
		this.orientation = luxe.importers.tiled.TiledUtil.orientation_from_string(root.get("orientation"));
		this.tile_width = Std.parseInt(root.get("tilewidth"));
		this.tile_height = Std.parseInt(root.get("tileheight"));
		var $it0 = root.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(luxe.importers.tiled.TiledUtil.valid_element(child)) {
				var _g = child.get_nodeName();
				switch(_g) {
				case "tileset":
					var tileset = new luxe.importers.tiled.TiledTileset();
					if(child.get("source") != null) haxe.Log.trace("tilesets from other sources are not available right now? " + child.get("source"),{ fileName : "TiledMapData.hx", lineNumber : 78, className : "luxe.importers.tiled.TiledMapData", methodName : "parseFromXML"}); else tileset.from_xml(child);
					tileset.first_id = Std.parseInt(child.get("firstgid"));
					this.tilesets.push(tileset);
					break;
				case "properties":
					var $it1 = child.iterator();
					while( $it1.hasNext() ) {
						var property = $it1.next();
						if(!luxe.importers.tiled.TiledUtil.valid_element(property)) continue;
						var key = property.get("name");
						var value = property.get("value");
						this.properties.set(key,value);
					}
					break;
				case "layer":
					var layer = new luxe.importers.tiled.TiledLayer(this);
					layer.from_xml(child);
					this.layers.push(layer);
					break;
				case "objectgroup":
					var object_group = new luxe.importers.tiled.TiledObjectGroup(this);
					object_group.from_xml(child);
					this.object_groups.push(object_group);
					break;
				}
			}
		}
	}
	,parseFromJSON: function(json) {
		this.version = Reflect.field(json,"version");
		this.background_color = Reflect.field(json,"backgroundcolor");
		this.width = Std.parseInt(Reflect.field(json,"width"));
		this.height = Std.parseInt(Reflect.field(json,"height"));
		this.orientation = luxe.importers.tiled.TiledUtil.orientation_from_string(Reflect.field(json,"orientation"));
		this.tile_width = Std.parseInt(Reflect.field(json,"tilewidth"));
		this.tile_height = Std.parseInt(Reflect.field(json,"tileheight"));
		var fields = Reflect.fields(json);
		var _g = 0;
		while(_g < fields.length) {
			var nodename = fields[_g];
			++_g;
			var child = Reflect.field(json,nodename);
			switch(nodename) {
			case "tilesets":
				var list = child;
				var _g1 = 0;
				while(_g1 < list.length) {
					var _tileset_json = list[_g1];
					++_g1;
					var tileset = new luxe.importers.tiled.TiledTileset();
					tileset.from_json(_tileset_json);
					tileset.first_id = Std.parseInt(Reflect.field(_tileset_json,"firstgid"));
					this.tilesets.push(tileset);
				}
				break;
			case "properties":
				var child_fields = Reflect.fields(child);
				var _g11 = 0;
				while(_g11 < child_fields.length) {
					var property_name = child_fields[_g11];
					++_g11;
					var value = Reflect.field(child,property_name);
					this.properties.set(property_name,value);
				}
				break;
			case "layers":
				var list1 = child;
				var _g12 = 0;
				while(_g12 < list1.length) {
					var _layer_json = list1[_g12];
					++_g12;
					var type = Reflect.field(_layer_json,"type");
					switch(type) {
					case "tilelayer":
						var layer = new luxe.importers.tiled.TiledLayer(this);
						layer.from_json(_layer_json);
						this.layers.push(layer);
						break;
					case "objectgroup":
						var object_group = new luxe.importers.tiled.TiledObjectGroup(this);
						object_group.from_json(_layer_json);
						this.object_groups.push(object_group);
						break;
					}
				}
				break;
			}
		}
	}
	,__class__: luxe.importers.tiled.TiledMapData
};
luxe.importers.tiled.TiledPropertyTile = function(_id,_properties) {
	this.id = _id;
	this.properties = _properties;
};
$hxClasses["luxe.importers.tiled.TiledPropertyTile"] = luxe.importers.tiled.TiledPropertyTile;
luxe.importers.tiled.TiledPropertyTile.__name__ = ["luxe","importers","tiled","TiledPropertyTile"];
luxe.importers.tiled.TiledPropertyTile.prototype = {
	__class__: luxe.importers.tiled.TiledPropertyTile
};
luxe.importers.tiled.TiledObjectType = $hxClasses["luxe.importers.tiled.TiledObjectType"] = { __ename__ : ["luxe","importers","tiled","TiledObjectType"], __constructs__ : ["polyline","polygon","rectangle","ellipse"] };
luxe.importers.tiled.TiledObjectType.polyline = ["polyline",0];
luxe.importers.tiled.TiledObjectType.polyline.toString = $estr;
luxe.importers.tiled.TiledObjectType.polyline.__enum__ = luxe.importers.tiled.TiledObjectType;
luxe.importers.tiled.TiledObjectType.polygon = ["polygon",1];
luxe.importers.tiled.TiledObjectType.polygon.toString = $estr;
luxe.importers.tiled.TiledObjectType.polygon.__enum__ = luxe.importers.tiled.TiledObjectType;
luxe.importers.tiled.TiledObjectType.rectangle = ["rectangle",2];
luxe.importers.tiled.TiledObjectType.rectangle.toString = $estr;
luxe.importers.tiled.TiledObjectType.rectangle.__enum__ = luxe.importers.tiled.TiledObjectType;
luxe.importers.tiled.TiledObjectType.ellipse = ["ellipse",3];
luxe.importers.tiled.TiledObjectType.ellipse.toString = $estr;
luxe.importers.tiled.TiledObjectType.ellipse.__enum__ = luxe.importers.tiled.TiledObjectType;
luxe.importers.tiled.TiledPolyObject = function(_origin,_points) {
	this.origin = _origin;
	this.points = _points;
};
$hxClasses["luxe.importers.tiled.TiledPolyObject"] = luxe.importers.tiled.TiledPolyObject;
luxe.importers.tiled.TiledPolyObject.__name__ = ["luxe","importers","tiled","TiledPolyObject"];
luxe.importers.tiled.TiledPolyObject.prototype = {
	__class__: luxe.importers.tiled.TiledPolyObject
};
luxe.importers.tiled.TiledObject = function(_group) {
	this.visible = true;
	this.group = _group;
	this.properties = new haxe.ds.StringMap();
	this.pos = new phoenix.Vector();
};
$hxClasses["luxe.importers.tiled.TiledObject"] = luxe.importers.tiled.TiledObject;
luxe.importers.tiled.TiledObject.__name__ = ["luxe","importers","tiled","TiledObject"];
luxe.importers.tiled.TiledObject.prototype = {
	polyobject_from_xml: function(xml) {
		var points = new Array();
		var pointsAsString = xml.get("points");
		var pointsAsStringArray = pointsAsString.split(" ");
		var _g = 0;
		while(_g < pointsAsStringArray.length) {
			var point = pointsAsStringArray[_g];
			++_g;
			var coords = point.split(",");
			points.push(new phoenix.Vector(Std.parseInt(coords[0]),Std.parseInt(coords[1])));
		}
		return new luxe.importers.tiled.TiledPolyObject(this.pos.clone(),points);
	}
	,polyobject_from_json: function(json) {
		var points = new Array();
		var point_list = json;
		var _g = 0;
		while(_g < point_list.length) {
			var point = point_list[_g];
			++_g;
			var _x = Reflect.field(point,"x");
			var _y = Reflect.field(point,"y");
			points.push(new phoenix.Vector(_x,_y));
		}
		return new luxe.importers.tiled.TiledPolyObject(this.pos.clone(),points);
	}
	,from_xml: function(xml) {
		if(xml.get("gid") != null) this.gid = Std.parseInt(xml.get("gid")); else this.gid = 0;
		this.name = xml.get("name");
		this.type = xml.get("type");
		this.visible = xml.get("visible") != "0";
		this.pos.set_x(Std.parseInt(xml.get("x")));
		this.pos.set_y(Std.parseInt(xml.get("y")));
		this.width = Std.parseInt(xml.get("width"));
		this.height = Std.parseInt(xml.get("height"));
		if(xml.get("rotation") != null) this.rotation = Std.parseFloat(xml.get("rotation")); else this.rotation = 0;
		this.object_type = luxe.importers.tiled.TiledObjectType.rectangle;
		var $it0 = xml.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(luxe.importers.tiled.TiledUtil.valid_element(child)) {
				var _g = child.get_nodeName();
				switch(_g) {
				case "polygon":
					this.object_type = luxe.importers.tiled.TiledObjectType.polygon;
					this.polyobject = this.polyobject_from_xml(child);
					break;
				case "polyline":
					this.object_type = luxe.importers.tiled.TiledObjectType.polyline;
					this.polyobject = this.polyobject_from_xml(child);
					break;
				case "ellipse":
					this.object_type = luxe.importers.tiled.TiledObjectType.ellipse;
					var _mid_x = this.width / 2 | 0;
					var _mid_y = this.height / 2 | 0;
					var _g1 = this.pos;
					_g1.set_x(_g1.x + _mid_x);
					var _g11 = this.pos;
					_g11.set_y(_g11.y + _mid_y);
					break;
				case "properties":
					var $it1 = child.iterator();
					while( $it1.hasNext() ) {
						var property = $it1.next();
						if(luxe.importers.tiled.TiledUtil.valid_element(property)) {
							var key = property.get("name");
							var value = property.get("value");
							this.properties.set(key,value);
						}
					}
					break;
				}
			}
		}
	}
	,from_json: function(json) {
		var _gid = Reflect.field(json,"gid");
		if(_gid != null) this.gid = _gid; else this.gid = 0;
		this.name = Reflect.field(json,"name");
		this.type = Reflect.field(json,"type");
		this.visible = Reflect.field(json,"visible");
		this.pos.set_x(Reflect.field(json,"x"));
		this.pos.set_y(Reflect.field(json,"y"));
		this.width = Reflect.field(json,"width");
		this.height = Reflect.field(json,"height");
		var _rotation = Reflect.field(json,"rotation");
		if(_rotation != null) this.rotation = _rotation; else this.rotation = 0;
		this.object_type = luxe.importers.tiled.TiledObjectType.rectangle;
		var fields = Reflect.fields(json);
		var _g = 0;
		while(_g < fields.length) {
			var nodename = fields[_g];
			++_g;
			var child = Reflect.field(json,nodename);
			switch(nodename) {
			case "polygon":
				this.object_type = luxe.importers.tiled.TiledObjectType.polygon;
				this.polyobject = this.polyobject_from_json(child);
				break;
			case "polyline":
				this.object_type = luxe.importers.tiled.TiledObjectType.polyline;
				this.polyobject = this.polyobject_from_json(child);
				break;
			case "ellipse":
				this.object_type = luxe.importers.tiled.TiledObjectType.ellipse;
				var _mid_x = this.width / 2 | 0;
				var _mid_y = this.height / 2 | 0;
				var _g1 = this.pos;
				_g1.set_x(_g1.x + _mid_x);
				var _g11 = this.pos;
				_g11.set_y(_g11.y + _mid_y);
				break;
			case "properties":
				var child_fields = Reflect.fields(child);
				var _g12 = 0;
				while(_g12 < child_fields.length) {
					var property_name = child_fields[_g12];
					++_g12;
					var value = Reflect.field(child,property_name);
					this.properties.set(property_name,value);
				}
				break;
			}
		}
	}
	,__class__: luxe.importers.tiled.TiledObject
};
luxe.importers.tiled.TiledObjectGroup = function(_map) {
	this.map = _map;
	this.name = "";
	this.width = 0;
	this.height = 0;
	this.color = "";
	this.properties = new haxe.ds.StringMap();
	this.objects = [];
};
$hxClasses["luxe.importers.tiled.TiledObjectGroup"] = luxe.importers.tiled.TiledObjectGroup;
luxe.importers.tiled.TiledObjectGroup.__name__ = ["luxe","importers","tiled","TiledObjectGroup"];
luxe.importers.tiled.TiledObjectGroup.prototype = {
	from_xml: function(xml) {
		this.name = xml.get("name");
		this.color = xml.get("color");
		this.visible = xml.get("visible") != "0";
		if(xml.get("opacity") == null) this.opacity = 1; else this.opacity = Std.parseFloat(xml.get("opacity"));
		this.width = Std.parseInt(xml.get("width"));
		this.height = Std.parseInt(xml.get("height"));
		var $it0 = xml.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(luxe.importers.tiled.TiledUtil.valid_element(child)) {
				if(child.get_nodeName() == "properties") {
					var $it1 = child.iterator();
					while( $it1.hasNext() ) {
						var property = $it1.next();
						if(luxe.importers.tiled.TiledUtil.valid_element(property)) {
							var key = property.get("name");
							var value = property.get("value");
							this.properties.set(key,value);
						}
					}
				}
				if(child.get_nodeName() == "object") {
					var object = new luxe.importers.tiled.TiledObject(this);
					object.from_xml(child);
					this.objects.push(object);
				}
			}
		}
	}
	,from_json: function(json) {
		this.name = Reflect.field(json,"name");
		this.color = Reflect.field(json,"color");
		this.visible = Reflect.field(json,"visible");
		this.opacity = Reflect.field(json,"opacity");
		this.width = Reflect.field(json,"width");
		this.height = Reflect.field(json,"height");
		var fields = Reflect.fields(json);
		var _g = 0;
		while(_g < fields.length) {
			var nodename = fields[_g];
			++_g;
			var child = Reflect.field(json,nodename);
			switch(nodename) {
			case "objects":
				var list = child;
				var _g1 = 0;
				while(_g1 < list.length) {
					var _object_json = list[_g1];
					++_g1;
					var object = new luxe.importers.tiled.TiledObject(this);
					object.from_json(_object_json);
					this.objects.push(object);
				}
				break;
			case "properties":
				var child_fields = Reflect.fields(child);
				var _g11 = 0;
				while(_g11 < child_fields.length) {
					var property_name = child_fields[_g11];
					++_g11;
					var value = Reflect.field(child,property_name);
					this.properties.set(property_name,value);
				}
				break;
			}
		}
	}
	,__class__: luxe.importers.tiled.TiledObjectGroup
};
luxe.importers.tiled.TiledTile = function(_layer,_id) {
	this.layer = _layer;
	this.id = _id;
};
$hxClasses["luxe.importers.tiled.TiledTile"] = luxe.importers.tiled.TiledTile;
luxe.importers.tiled.TiledTile.__name__ = ["luxe","importers","tiled","TiledTile"];
luxe.importers.tiled.TiledTile.prototype = {
	get_width: function() {
		return this.layer.map.tile_width;
	}
	,get_height: function() {
		return this.layer.map.tile_height;
	}
	,__class__: luxe.importers.tiled.TiledTile
	,__properties__: {get_height:"get_height",get_width:"get_width"}
};
luxe.importers.tiled.TiledTileset = function() {
	this.spacing = 0;
	this.margin = 0;
	this.tile_height = 0;
	this.tile_width = 0;
	this.first_id = 1;
	this.texture_name = "";
	this.name = "";
	this.properties = new haxe.ds.StringMap();
	this.property_tiles = new haxe.ds.IntMap();
};
$hxClasses["luxe.importers.tiled.TiledTileset"] = luxe.importers.tiled.TiledTileset;
luxe.importers.tiled.TiledTileset.__name__ = ["luxe","importers","tiled","TiledTileset"];
luxe.importers.tiled.TiledTileset.prototype = {
	from_xml: function(xml) {
		var root = xml;
		this.name = root.get("name");
		this.tile_width = Std.parseInt(root.get("tilewidth"));
		this.tile_height = Std.parseInt(root.get("tileheight"));
		this.spacing = Std.parseInt(root.get("spacing"));
		this.margin = Std.parseInt(root.get("margin"));
		var $it0 = root.elements();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(luxe.importers.tiled.TiledUtil.valid_element(child)) {
				var _g = child.get_nodeName();
				switch(_g) {
				case "properties":
					var $it1 = child.iterator();
					while( $it1.hasNext() ) {
						var property = $it1.next();
						if(luxe.importers.tiled.TiledUtil.valid_element(property)) {
							var key = property.get("name");
							var value = property.get("value");
							this.properties.set(key,value);
						}
					}
					break;
				case "image":
					this.texture_name = child.get("source");
					break;
				case "tile":
					var _tile_id = Std.parseInt(child.get("id"));
					var _tile_props = new haxe.ds.StringMap();
					var $it2 = child.iterator();
					while( $it2.hasNext() ) {
						var element = $it2.next();
						if(luxe.importers.tiled.TiledUtil.valid_element(element)) {
							if(element.get_nodeName() == "properties") {
								var $it3 = element.iterator();
								while( $it3.hasNext() ) {
									var property1 = $it3.next();
									if(!luxe.importers.tiled.TiledUtil.valid_element(property1)) continue;
									var key1 = property1.get("name");
									var value1 = property1.get("value");
									_tile_props.set(key1,value1);
								}
							}
						}
					}
					var value2 = new luxe.importers.tiled.TiledPropertyTile(_tile_id,_tile_props);
					this.property_tiles.set(_tile_id,value2);
					break;
				}
			}
		}
	}
	,from_json: function(json) {
		this.name = Reflect.field(json,"name");
		this.tile_width = Reflect.field(json,"tilewidth");
		this.tile_height = Reflect.field(json,"tileheight");
		this.spacing = Reflect.field(json,"spacing");
		this.margin = Reflect.field(json,"margin");
		var fields = Reflect.fields(json);
		var _g = 0;
		while(_g < fields.length) {
			var nodename = fields[_g];
			++_g;
			var child = Reflect.field(json,nodename);
			switch(nodename) {
			case "properties":
				var child_fields = Reflect.fields(child);
				var _g1 = 0;
				while(_g1 < child_fields.length) {
					var property_name = child_fields[_g1];
					++_g1;
					var value = Reflect.field(child,property_name);
					this.properties.set(property_name,value);
				}
				break;
			case "image":
				this.texture_name = child;
				break;
			case "tile":
				var _tile_id = Reflect.field(child,"id");
				var _tile_props = new haxe.ds.StringMap();
				var tile_fields = Reflect.fields(child);
				var _g11 = 0;
				while(_g11 < tile_fields.length) {
					var tile_node = tile_fields[_g11];
					++_g11;
					if(tile_node == "properties") {
						var tile_item = Reflect.field(child,tile_node);
						var child_fields1 = Reflect.fields(tile_item);
						var _g2 = 0;
						while(_g2 < child_fields1.length) {
							var property_name1 = child_fields1[_g2];
							++_g2;
							var value1 = Reflect.field(tile_item,property_name1);
							this.properties.set(property_name1,value1);
						}
					}
				}
				var value2 = new luxe.importers.tiled.TiledPropertyTile(_tile_id,_tile_props);
				this.property_tiles.set(_tile_id,value2);
				break;
			}
		}
	}
	,__class__: luxe.importers.tiled.TiledTileset
};
luxe.importers.tiled.TiledUtil = function() { };
$hxClasses["luxe.importers.tiled.TiledUtil"] = luxe.importers.tiled.TiledUtil;
luxe.importers.tiled.TiledUtil.__name__ = ["luxe","importers","tiled","TiledUtil"];
luxe.importers.tiled.TiledUtil.valid_element = function(element) {
	return Std.string(element.nodeType) == "element";
};
luxe.importers.tiled.TiledUtil.orientation_from_string = function(_orientation_string) {
	switch(_orientation_string) {
	case "orthogonal":
		return luxe.tilemaps.TilemapOrientation.ortho;
	case "isometric":
		return luxe.tilemaps.TilemapOrientation.isometric;
	default:
		return luxe.tilemaps.TilemapOrientation.none;
	}
};
luxe.macros = {};
luxe.macros.BuildVersion = function() { };
$hxClasses["luxe.macros.BuildVersion"] = luxe.macros.BuildVersion;
luxe.macros.BuildVersion.__name__ = ["luxe","macros","BuildVersion"];
luxe.macros.BuildVersion.try_git = function(root) {
	return "";
};
luxe.options = {};
luxe.options._DrawOptions = {};
luxe.options._DrawOptions.DrawOptions = function() { };
$hxClasses["luxe.options._DrawOptions.DrawOptions"] = luxe.options._DrawOptions.DrawOptions;
luxe.options._DrawOptions.DrawOptions.__name__ = ["luxe","options","_DrawOptions","DrawOptions"];
luxe.resource = {};
luxe.resource._Resource = {};
luxe.resource._Resource.ResourceType_Impl_ = function() { };
$hxClasses["luxe.resource._Resource.ResourceType_Impl_"] = luxe.resource._Resource.ResourceType_Impl_;
luxe.resource._Resource.ResourceType_Impl_.__name__ = ["luxe","resource","_Resource","ResourceType_Impl_"];
luxe.resource.Resource = function(_manager,_type,_load_time) {
	this.dropped = false;
	this.time_created = 0;
	this.time_to_load = 0;
	this.persistent = false;
	if(_manager == null) this.manager = Luxe.resources; else this.manager = _manager;
	this.type = _type;
	this.time_to_load = _load_time;
	this.time_created = snow.Snow.core.timestamp();
	this.manager.add(this);
};
$hxClasses["luxe.resource.Resource"] = luxe.resource.Resource;
luxe.resource.Resource.__name__ = ["luxe","resource","Resource"];
luxe.resource.Resource.prototype = {
	drop: function() {
		if(!this.dropped) {
			this.dropped = true;
			this.manager.remove(this);
		}
	}
	,__class__: luxe.resource.Resource
};
luxe.resource.TextResource = function(_id,_text,_manager) {
	this.id = _id;
	luxe.resource.Resource.call(this,_manager,1);
	this.text = _text;
};
$hxClasses["luxe.resource.TextResource"] = luxe.resource.TextResource;
luxe.resource.TextResource.__name__ = ["luxe","resource","TextResource"];
luxe.resource.TextResource.__super__ = luxe.resource.Resource;
luxe.resource.TextResource.prototype = $extend(luxe.resource.Resource.prototype,{
	__class__: luxe.resource.TextResource
});
luxe.resource.JSONResource = function(_id,_json,_manager) {
	this.id = _id;
	luxe.resource.Resource.call(this,_manager,2);
	this.json = _json;
};
$hxClasses["luxe.resource.JSONResource"] = luxe.resource.JSONResource;
luxe.resource.JSONResource.__name__ = ["luxe","resource","JSONResource"];
luxe.resource.JSONResource.__super__ = luxe.resource.Resource;
luxe.resource.JSONResource.prototype = $extend(luxe.resource.Resource.prototype,{
	__class__: luxe.resource.JSONResource
});
luxe.resource.DataResource = function(_id,_data,_manager) {
	this.id = _id;
	luxe.resource.Resource.call(this,_manager,3);
	this.data = _data;
};
$hxClasses["luxe.resource.DataResource"] = luxe.resource.DataResource;
luxe.resource.DataResource.__name__ = ["luxe","resource","DataResource"];
luxe.resource.DataResource.__super__ = luxe.resource.Resource;
luxe.resource.DataResource.prototype = $extend(luxe.resource.Resource.prototype,{
	__class__: luxe.resource.DataResource
});
luxe.resource.SoundResource = function(_id,_name,_manager) {
	this.id = _id;
	luxe.resource.Resource.call(this,_manager,5);
	this.name = _name;
};
$hxClasses["luxe.resource.SoundResource"] = luxe.resource.SoundResource;
luxe.resource.SoundResource.__name__ = ["luxe","resource","SoundResource"];
luxe.resource.SoundResource.__super__ = luxe.resource.Resource;
luxe.resource.SoundResource.prototype = $extend(luxe.resource.Resource.prototype,{
	__class__: luxe.resource.SoundResource
});
luxe.resource.Resources = function() {
	this.resourcelist = new Array();
	this.textures = new haxe.ds.StringMap();
	this.render_textures = new haxe.ds.StringMap();
	this.fonts = new haxe.ds.StringMap();
	this.shaders = new haxe.ds.StringMap();
	this.sounds = new haxe.ds.StringMap();
	this.data = new haxe.ds.StringMap();
	this.text = new haxe.ds.StringMap();
	this.json = new haxe.ds.StringMap();
	this.stats = new luxe.resource.ResourceStats();
};
$hxClasses["luxe.resource.Resources"] = luxe.resource.Resources;
luxe.resource.Resources.__name__ = ["luxe","resource","Resources"];
luxe.resource.Resources.prototype = {
	add: function(res) {
		this.resourcelist.push(res);
		var _g = res.type;
		switch(_g) {
		case 4:
			this.stats.textures++;
			break;
		case 6:
			this.stats.render_textures++;
			break;
		case 7:
			this.stats.fonts++;
			break;
		case 8:
			this.stats.shaders++;
			break;
		case 5:
			this.stats.sounds++;
			break;
		case 1:
			this.stats.texts++;
			break;
		case 2:
			this.stats.jsons++;
			break;
		case 3:
			this.stats.datas++;
			break;
		case 0:
			this.stats.unknown++;
			break;
		}
		this.stats.resources++;
	}
	,remove: function(res) {
		HxOverrides.remove(this.resourcelist,res);
		this.uncache(res);
		var _g = res.type;
		switch(_g) {
		case 4:
			this.stats.textures--;
			break;
		case 6:
			this.stats.render_textures--;
			break;
		case 7:
			this.stats.fonts--;
			break;
		case 8:
			this.stats.shaders--;
			break;
		case 5:
			this.stats.sounds--;
			break;
		case 1:
			this.stats.texts--;
			break;
		case 2:
			this.stats.jsons--;
			break;
		case 3:
			this.stats.datas--;
			break;
		case 0:
			this.stats.unknown--;
			break;
		}
		this.stats.resources--;
	}
	,uncache: function(res) {
		var _g = res.type;
		switch(_g) {
		case 4:
			this.textures.remove(res.id);
			break;
		case 6:
			this.render_textures.remove(res.id);
			break;
		case 7:
			this.fonts.remove(res.id);
			break;
		case 8:
			this.shaders.remove(res.id);
			break;
		case 5:
			this.sounds.remove(res.id);
			break;
		case 3:
			this.data.remove(res.id);
			break;
		case 1:
			this.text.remove(res.id);
			break;
		case 2:
			this.json.remove(res.id);
			break;
		case 0:
			break;
		}
	}
	,cache: function(res) {
		var _g = res.type;
		switch(_g) {
		case 4:
			this.textures.set(res.id,res);
			break;
		case 6:
			this.render_textures.set(res.id,res);
			break;
		case 7:
			this.fonts.set(res.id,res);
			break;
		case 8:
			this.shaders.set(res.id,res);
			break;
		case 5:
			this.sounds.set(res.id,res);
			break;
		case 1:
			this.text.set(res.id,res);
			break;
		case 2:
			this.json.set(res.id,res);
			break;
		case 3:
			this.data.set(res.id,res);
			break;
		case 0:
			break;
		}
	}
	,find_render_texture: function(_name) {
		return this.render_textures.get(_name);
	}
	,find_texture: function(_name) {
		return this.textures.get(_name);
	}
	,find_shader: function(_name) {
		return this.shaders.get(_name);
	}
	,find_font: function(_name) {
		return this.fonts.get(_name);
	}
	,find_sound: function(_name) {
		return this.sounds.get(_name);
	}
	,find_text: function(_name) {
		return this.text.get(_name);
	}
	,find_json: function(_name) {
		return this.json.get(_name);
	}
	,find_data: function(_name) {
		return this.data.get(_name);
	}
	,clear: function(and_persistent) {
		if(and_persistent == null) and_persistent = false;
		var keep = [];
		var _g = 0;
		var _g1 = this.resourcelist;
		while(_g < _g1.length) {
			var res = _g1[_g];
			++_g;
			if(!res.persistent || and_persistent) res.drop(); else keep.push(res);
		}
		this.resourcelist.splice(0,this.resourcelist.length);
		this.resourcelist = new Array();
		this.stats.reset();
		var _g2 = 0;
		while(_g2 < keep.length) {
			var res1 = keep[_g2];
			++_g2;
			this.add(res1);
		}
		keep = null;
	}
	,find: function(id) {
		var _g = 0;
		var _g1 = this.resourcelist;
		while(_g < _g1.length) {
			var resource = _g1[_g];
			++_g;
			if(resource.id == id) return resource;
		}
		return null;
	}
	,__class__: luxe.resource.Resources
};
luxe.resource.ResourceStats = function() {
	this.unknown = 0;
	this.sounds = 0;
	this.datas = 0;
	this.jsons = 0;
	this.texts = 0;
	this.shaders = 0;
	this.render_textures = 0;
	this.textures = 0;
	this.fonts = 0;
	this.resources = 0;
};
$hxClasses["luxe.resource.ResourceStats"] = luxe.resource.ResourceStats;
luxe.resource.ResourceStats.__name__ = ["luxe","resource","ResourceStats"];
luxe.resource.ResourceStats.prototype = {
	toString: function() {
		return "Resource Statistics\n" + "\ttotal resources : " + this.resources + "\n" + "\ttextures : " + this.textures + " \n" + "" + "\trender textures : " + this.render_textures + " \n" + "\tfonts : " + this.fonts + "\n" + "\tshaders : " + this.shaders + "\n" + "\tsounds : " + this.sounds + "\n" + "\ttext : " + this.texts + "\n" + "\tjson : " + this.jsons + "\n" + "\tdata : " + this.datas + "\n" + "\tunknown : " + this.unknown;
	}
	,reset: function() {
		this.resources = 0;
		this.fonts = 0;
		this.textures = 0;
		this.render_textures = 0;
		this.shaders = 0;
		this.texts = 0;
		this.jsons = 0;
		this.datas = 0;
		this.sounds = 0;
		this.unknown = 0;
	}
	,__class__: luxe.resource.ResourceStats
};
luxe.structural = {};
luxe.structural.BalancedBST = function(compare_function) {
	this.compare = compare_function;
	this._array = [];
};
$hxClasses["luxe.structural.BalancedBST"] = luxe.structural.BalancedBST;
luxe.structural.BalancedBST.__name__ = ["luxe","structural","BalancedBST"];
luxe.structural.BalancedBST.prototype = {
	size: function() {
		return this.node_count(this.root);
	}
	,depth: function() {
		return this.node_depth(this.root);
	}
	,insert: function(_key,_value) {
		this.root = this.node_insert(this.root,_key,_value);
		this.root.color = false;
		this._array = null;
		this._array = this.toArray();
	}
	,contains: function(_key) {
		return this.find(_key) != null;
	}
	,find: function(_key) {
		return this.node_find(this.root,_key);
	}
	,rank: function(_key) {
		return this.node_rank(_key,this.root);
	}
	,select: function(_rank) {
		var _node = this.node_select(this.root,_rank);
		if(_node != null) return _node.key; else return null;
	}
	,smallest: function() {
		var _node = this.node_smallest(this.root);
		if(_node != null) return _node.key; else return null;
	}
	,largest: function() {
		var _node = this.node_largest(this.root);
		if(_node != null) return _node.key; else return null;
	}
	,remove: function(_key) {
		if(!this.is_red(this.root.left) && !this.is_red(this.root.right)) this.root.color = true;
		if(!this.contains(_key)) return false;
		this.root = this.node_remove(this.root,_key);
		if(this.root != null) this.root.color = false;
		this._array = null;
		this._array = this.toArray();
		return true;
	}
	,remove_smallest: function() {
		if(!this.is_red(this.root.left) && !this.is_red(this.root.right)) this.root.color = true;
		this.root = this.node_remove_smallest(this.root);
		if(this.root != null) this.root.color = false;
		this._array = null;
		this._array = this.toArray();
		return true;
	}
	,remove_largest: function() {
		if(!this.is_red(this.root.left) && !this.is_red(this.root.right)) this.root.color = true;
		this.root = this.node_remove_largest(this.root);
		if(this.root != null) this.root.color = false;
		this._array = null;
		this._array = this.toArray();
		return true;
	}
	,floor: function(_key) {
		var _node = this.node_floor(this.root,_key);
		if(_node == null) return null;
		return _node.key;
	}
	,ceil: function(_key) {
		var _node = this.node_ceil(this.root,_key);
		if(_node == null) return null;
		return _node.key;
	}
	,toArray: function() {
		var a = new Array();
		this.traverse_node(this.root,luxe.structural.BalancedBSTTraverseMethod.order_retain,function(_node) {
			a.push(_node.value);
		});
		return a;
	}
	,keys: function() {
		var a = new Array();
		this.traverse_node(this.root,luxe.structural.BalancedBSTTraverseMethod.order_retain,function(_node) {
			a.push(_node.key);
		});
		return a;
	}
	,iterator: function() {
		return HxOverrides.iter(this._array);
	}
	,traverse_node: function(_node,_method,_on_traverse) {
		if(_node != null) switch(_method[1]) {
		case 0:
			_on_traverse(_node);
			this.traverse_node(_node.left,_method,_on_traverse);
			this.traverse_node(_node.right,_method,_on_traverse);
			break;
		case 1:
			this.traverse_node(_node.left,_method,_on_traverse);
			_on_traverse(_node);
			this.traverse_node(_node.right,_method,_on_traverse);
			break;
		case 2:
			this.traverse_node(_node.left,_method,_on_traverse);
			this.traverse_node(_node.right,_method,_on_traverse);
			_on_traverse(_node);
			break;
		}
	}
	,get_empty: function() {
		return this.root == null;
	}
	,node_depth: function(_node) {
		if(_node == null) return 0;
		var _n_depth = Math.max(this.node_depth(_node.left),this.node_depth(_node.right));
		return 1 + (_n_depth | 0);
	}
	,node_count: function(_node) {
		if(_node == null) return 0; else return _node.nodecount;
	}
	,node_insert: function(_node,_key,_value) {
		if(_node == null) return new luxe.structural.BalancedBSTNode(_key,_value,1,true);
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) _node.left = this.node_insert(_node.left,_key,_value); else if(comparison > 0) _node.right = this.node_insert(_node.right,_key,_value); else _node.value = _value;
		if(this.is_red(_node.right) && !this.is_red(_node.left)) _node = this.rotate_left(_node);
		if(this.is_red(_node.left) && this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		if(this.is_red(_node.left) && this.is_red(_node.right)) this.swap_color(_node);
		this.node_update_count(_node);
		return _node;
	}
	,node_update_count: function(_node) {
		_node.nodecount = this.node_count(_node.left) + this.node_count(_node.right) + 1;
		return _node;
	}
	,node_find: function(_node,_key) {
		if(_node == null) return null;
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) return this.node_find(_node.left,_key); else if(comparison > 0) return this.node_find(_node.right,_key); else return _node.value;
	}
	,node_rank: function(_key,_node) {
		if(_node == null) return 0;
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) return this.node_rank(_key,_node.left); else if(comparison > 0) return 1 + this.node_count(_node.left) + this.node_rank(_key,_node.right); else return this.node_count(_node.left);
	}
	,node_select: function(_node,_rank) {
		if(_node == null) return null;
		var _r = this.node_count(_node.left);
		if(_r > _rank) return this.node_select(_node.left,_rank); else if(_r < _rank) return this.node_select(_node.right,_rank - _r - 1); else return _node;
	}
	,node_smallest: function(_node) {
		if(_node.left == null) return _node;
		return this.node_smallest(_node.left);
	}
	,node_largest: function(_node) {
		if(_node.right == null) return _node; else return this.node_largest(_node.right);
	}
	,node_floor: function(_node,_key) {
		if(_node == null) return null;
		var comparison = this.compare(_key,_node.key);
		if(comparison == 0) return _node; else if(comparison < 0) return this.node_floor(_node.left,_key);
		var _n = this.node_floor(_node.right,_key);
		if(_n != null) return _n; else return _node;
	}
	,node_ceil: function(_node,_key) {
		if(_node == null) return null;
		var comparison = this.compare(_key,_node.key);
		if(comparison == 0) return _node; else if(comparison < 0) {
			var _n = this.node_ceil(_node.left,_key);
			if(_n != null) return _n; else return _node;
		}
		return this.node_ceil(_node.right,_key);
	}
	,node_remove_smallest: function(_node) {
		if(_node.left == null) return null;
		if(!this.is_red(_node.left) && !this.is_red(_node.left.left)) _node = this.move_red_left(_node);
		_node.left = this.node_remove_smallest(_node.left);
		this.node_update_count(_node);
		return this.balance(_node);
	}
	,node_remove_largest: function(_node) {
		if(this.is_red(_node.left)) _node = this.rotate_right(_node);
		if(_node.right == null) return null;
		if(!this.is_red(_node.right) && !this.is_red(_node.right.left)) _node = this.move_red_right(_node);
		_node.right = this.node_remove_largest(_node.right);
		this.node_update_count(_node);
		return this.balance(_node);
	}
	,node_remove: function(_node,_key) {
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) {
			if(!this.is_red(_node.left) && !this.is_red(_node.left.left)) _node = this.move_red_left(_node);
			_node.left = this.node_remove(_node.left,_key);
		} else {
			if(this.is_red(_node.left)) _node = this.rotate_right(_node);
			var comparison1 = this.compare(_key,_node.key);
			if(comparison1 == 0 && _node.right == null) return null;
			if(!this.is_red(_node.right) && !this.is_red(_node.right.left)) _node = this.move_red_right(_node);
			var comparison2 = this.compare(_key,_node.key);
			if(comparison2 == 0) {
				var _n = this.node_smallest(_node.right);
				_node.key = _n.key;
				_node.value = _n.value;
				_node.right = this.node_remove_smallest(_node.right);
			} else _node.right = this.node_remove(_node.right,_key);
		}
		return this.balance(_node);
	}
	,is_red: function(_node) {
		if(_node == null) return false;
		return _node.color == true;
	}
	,rotate_left: function(_node) {
		var _n = _node.right;
		_n.color = _node.color;
		_node.color = true;
		_node.right = _n.left;
		_n.left = _node;
		_n.nodecount = _node.nodecount;
		this.node_update_count(_node);
		return _n;
	}
	,rotate_right: function(_node) {
		var _n = _node.left;
		_n.color = _node.color;
		_node.color = true;
		_node.left = _n.right;
		_n.right = _node;
		_n.nodecount = _node.nodecount;
		this.node_update_count(_node);
		return _n;
	}
	,swap_color: function(_node) {
		_node.color = !_node.color;
		_node.left.color = !_node.left.color;
		_node.right.color = !_node.right.color;
	}
	,move_red_left: function(_node) {
		this.swap_color(_node);
		if(this.is_red(_node.right.left)) {
			_node.right = this.rotate_right(_node.right);
			_node = this.rotate_left(_node);
		}
		return _node;
	}
	,move_red_right: function(_node) {
		this.swap_color(_node);
		if(this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		return _node;
	}
	,balance: function(_node) {
		if(this.is_red(_node.right)) _node = this.rotate_left(_node);
		if(this.is_red(_node.left) && this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		if(this.is_red(_node.left) && this.is_red(_node.right)) this.swap_color(_node);
		this.node_update_count(_node);
		return _node;
	}
	,__class__: luxe.structural.BalancedBST
	,__properties__: {get_empty:"get_empty"}
};
luxe.structural._BalancedBST = {};
luxe.structural._BalancedBST.NodeColor = function() { };
$hxClasses["luxe.structural._BalancedBST.NodeColor"] = luxe.structural._BalancedBST.NodeColor;
luxe.structural._BalancedBST.NodeColor.__name__ = ["luxe","structural","_BalancedBST","NodeColor"];
luxe.structural.BalancedBSTNode = function(_key,_value,_node_count,_color) {
	this.left = null;
	this.right = null;
	this.key = _key;
	this.value = _value;
	this.nodecount = _node_count;
	this.color = _color;
};
$hxClasses["luxe.structural.BalancedBSTNode"] = luxe.structural.BalancedBSTNode;
luxe.structural.BalancedBSTNode.__name__ = ["luxe","structural","BalancedBSTNode"];
luxe.structural.BalancedBSTNode.prototype = {
	__class__: luxe.structural.BalancedBSTNode
};
luxe.structural.BalancedBSTTraverseMethod = $hxClasses["luxe.structural.BalancedBSTTraverseMethod"] = { __ename__ : ["luxe","structural","BalancedBSTTraverseMethod"], __constructs__ : ["order_pre","order_retain","order_post"] };
luxe.structural.BalancedBSTTraverseMethod.order_pre = ["order_pre",0];
luxe.structural.BalancedBSTTraverseMethod.order_pre.toString = $estr;
luxe.structural.BalancedBSTTraverseMethod.order_pre.__enum__ = luxe.structural.BalancedBSTTraverseMethod;
luxe.structural.BalancedBSTTraverseMethod.order_retain = ["order_retain",1];
luxe.structural.BalancedBSTTraverseMethod.order_retain.toString = $estr;
luxe.structural.BalancedBSTTraverseMethod.order_retain.__enum__ = luxe.structural.BalancedBSTTraverseMethod;
luxe.structural.BalancedBSTTraverseMethod.order_post = ["order_post",2];
luxe.structural.BalancedBSTTraverseMethod.order_post.toString = $estr;
luxe.structural.BalancedBSTTraverseMethod.order_post.__enum__ = luxe.structural.BalancedBSTTraverseMethod;
luxe.structural.BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry = function(_key,_value,_node_count,_color) {
	this.left = null;
	this.right = null;
	this.key = _key;
	this.value = _value;
	this.nodecount = _node_count;
	this.color = _color;
};
$hxClasses["luxe.structural.BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry"] = luxe.structural.BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry;
luxe.structural.BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry.__name__ = ["luxe","structural","BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry"];
luxe.structural.BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry.prototype = {
	__class__: luxe.structural.BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry
};
luxe.structural.BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry = function(compare_function) {
	this.compare = compare_function;
	this._array = [];
};
$hxClasses["luxe.structural.BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry"] = luxe.structural.BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry;
luxe.structural.BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry.__name__ = ["luxe","structural","BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry"];
luxe.structural.BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry.prototype = {
	size: function() {
		return this.node_count(this.root);
	}
	,depth: function() {
		return this.node_depth(this.root);
	}
	,insert: function(_key,_value) {
		this.root = this.node_insert(this.root,_key,_value);
		this.root.color = false;
		this._array = null;
		this._array = this.toArray();
	}
	,contains: function(_key) {
		return this.find(_key) != null;
	}
	,find: function(_key) {
		return this.node_find(this.root,_key);
	}
	,rank: function(_key) {
		return this.node_rank(_key,this.root);
	}
	,select: function(_rank) {
		var _node = this.node_select(this.root,_rank);
		if(_node != null) return _node.key; else return null;
	}
	,smallest: function() {
		var _node = this.node_smallest(this.root);
		if(_node != null) return _node.key; else return null;
	}
	,largest: function() {
		var _node = this.node_largest(this.root);
		if(_node != null) return _node.key; else return null;
	}
	,remove: function(_key) {
		if(!this.is_red(this.root.left) && !this.is_red(this.root.right)) this.root.color = true;
		if(!this.contains(_key)) return false;
		this.root = this.node_remove(this.root,_key);
		if(this.root != null) this.root.color = false;
		this._array = null;
		this._array = this.toArray();
		return true;
	}
	,remove_smallest: function() {
		if(!this.is_red(this.root.left) && !this.is_red(this.root.right)) this.root.color = true;
		this.root = this.node_remove_smallest(this.root);
		if(this.root != null) this.root.color = false;
		this._array = null;
		this._array = this.toArray();
		return true;
	}
	,remove_largest: function() {
		if(!this.is_red(this.root.left) && !this.is_red(this.root.right)) this.root.color = true;
		this.root = this.node_remove_largest(this.root);
		if(this.root != null) this.root.color = false;
		this._array = null;
		this._array = this.toArray();
		return true;
	}
	,floor: function(_key) {
		var _node = this.node_floor(this.root,_key);
		if(_node == null) return null;
		return _node.key;
	}
	,ceil: function(_key) {
		var _node = this.node_ceil(this.root,_key);
		if(_node == null) return null;
		return _node.key;
	}
	,toArray: function() {
		var a = new Array();
		this.traverse_node(this.root,luxe.structural.BalancedBSTTraverseMethod.order_retain,function(_node) {
			a.push(_node.value);
		});
		return a;
	}
	,keys: function() {
		var a = new Array();
		this.traverse_node(this.root,luxe.structural.BalancedBSTTraverseMethod.order_retain,function(_node) {
			a.push(_node.key);
		});
		return a;
	}
	,iterator: function() {
		return HxOverrides.iter(this._array);
	}
	,traverse_node: function(_node,_method,_on_traverse) {
		if(_node != null) switch(_method[1]) {
		case 0:
			_on_traverse(_node);
			this.traverse_node(_node.left,_method,_on_traverse);
			this.traverse_node(_node.right,_method,_on_traverse);
			break;
		case 1:
			this.traverse_node(_node.left,_method,_on_traverse);
			_on_traverse(_node);
			this.traverse_node(_node.right,_method,_on_traverse);
			break;
		case 2:
			this.traverse_node(_node.left,_method,_on_traverse);
			this.traverse_node(_node.right,_method,_on_traverse);
			_on_traverse(_node);
			break;
		}
	}
	,get_empty: function() {
		return this.root == null;
	}
	,node_depth: function(_node) {
		if(_node == null) return 0;
		var _n_depth = Math.max(this.node_depth(_node.left),this.node_depth(_node.right));
		return 1 + (_n_depth | 0);
	}
	,node_count: function(_node) {
		if(_node == null) return 0; else return _node.nodecount;
	}
	,node_insert: function(_node,_key,_value) {
		if(_node == null) return new luxe.structural.BalancedBSTNode_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry(_key,_value,1,true);
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) _node.left = this.node_insert(_node.left,_key,_value); else if(comparison > 0) _node.right = this.node_insert(_node.right,_key,_value); else _node.value = _value;
		if(this.is_red(_node.right) && !this.is_red(_node.left)) _node = this.rotate_left(_node);
		if(this.is_red(_node.left) && this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		if(this.is_red(_node.left) && this.is_red(_node.right)) this.swap_color(_node);
		this.node_update_count(_node);
		return _node;
	}
	,node_update_count: function(_node) {
		_node.nodecount = this.node_count(_node.left) + this.node_count(_node.right) + 1;
		return _node;
	}
	,node_find: function(_node,_key) {
		if(_node == null) return null;
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) return this.node_find(_node.left,_key); else if(comparison > 0) return this.node_find(_node.right,_key); else return _node.value;
	}
	,node_rank: function(_key,_node) {
		if(_node == null) return 0;
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) return this.node_rank(_key,_node.left); else if(comparison > 0) return 1 + this.node_count(_node.left) + this.node_rank(_key,_node.right); else return this.node_count(_node.left);
	}
	,node_select: function(_node,_rank) {
		if(_node == null) return null;
		var _r = this.node_count(_node.left);
		if(_r > _rank) return this.node_select(_node.left,_rank); else if(_r < _rank) return this.node_select(_node.right,_rank - _r - 1); else return _node;
	}
	,node_smallest: function(_node) {
		if(_node.left == null) return _node;
		return this.node_smallest(_node.left);
	}
	,node_largest: function(_node) {
		if(_node.right == null) return _node; else return this.node_largest(_node.right);
	}
	,node_floor: function(_node,_key) {
		if(_node == null) return null;
		var comparison = this.compare(_key,_node.key);
		if(comparison == 0) return _node; else if(comparison < 0) return this.node_floor(_node.left,_key);
		var _n = this.node_floor(_node.right,_key);
		if(_n != null) return _n; else return _node;
	}
	,node_ceil: function(_node,_key) {
		if(_node == null) return null;
		var comparison = this.compare(_key,_node.key);
		if(comparison == 0) return _node; else if(comparison < 0) {
			var _n = this.node_ceil(_node.left,_key);
			if(_n != null) return _n; else return _node;
		}
		return this.node_ceil(_node.right,_key);
	}
	,node_remove_smallest: function(_node) {
		if(_node.left == null) return null;
		if(!this.is_red(_node.left) && !this.is_red(_node.left.left)) _node = this.move_red_left(_node);
		_node.left = this.node_remove_smallest(_node.left);
		this.node_update_count(_node);
		return this.balance(_node);
	}
	,node_remove_largest: function(_node) {
		if(this.is_red(_node.left)) _node = this.rotate_right(_node);
		if(_node.right == null) return null;
		if(!this.is_red(_node.right) && !this.is_red(_node.right.left)) _node = this.move_red_right(_node);
		_node.right = this.node_remove_largest(_node.right);
		this.node_update_count(_node);
		return this.balance(_node);
	}
	,node_remove: function(_node,_key) {
		var comparison = this.compare(_key,_node.key);
		if(comparison < 0) {
			if(!this.is_red(_node.left) && !this.is_red(_node.left.left)) _node = this.move_red_left(_node);
			_node.left = this.node_remove(_node.left,_key);
		} else {
			if(this.is_red(_node.left)) _node = this.rotate_right(_node);
			var comparison1 = this.compare(_key,_node.key);
			if(comparison1 == 0 && _node.right == null) return null;
			if(!this.is_red(_node.right) && !this.is_red(_node.right.left)) _node = this.move_red_right(_node);
			var comparison2 = this.compare(_key,_node.key);
			if(comparison2 == 0) {
				var _n = this.node_smallest(_node.right);
				_node.key = _n.key;
				_node.value = _n.value;
				_node.right = this.node_remove_smallest(_node.right);
			} else _node.right = this.node_remove(_node.right,_key);
		}
		return this.balance(_node);
	}
	,is_red: function(_node) {
		if(_node == null) return false;
		return _node.color == true;
	}
	,rotate_left: function(_node) {
		var _n = _node.right;
		_n.color = _node.color;
		_node.color = true;
		_node.right = _n.left;
		_n.left = _node;
		_n.nodecount = _node.nodecount;
		this.node_update_count(_node);
		return _n;
	}
	,rotate_right: function(_node) {
		var _n = _node.left;
		_n.color = _node.color;
		_node.color = true;
		_node.left = _n.right;
		_n.right = _node;
		_n.nodecount = _node.nodecount;
		this.node_update_count(_node);
		return _n;
	}
	,swap_color: function(_node) {
		_node.color = !_node.color;
		_node.left.color = !_node.left.color;
		_node.right.color = !_node.right.color;
	}
	,move_red_left: function(_node) {
		this.swap_color(_node);
		if(this.is_red(_node.right.left)) {
			_node.right = this.rotate_right(_node.right);
			_node = this.rotate_left(_node);
		}
		return _node;
	}
	,move_red_right: function(_node) {
		this.swap_color(_node);
		if(this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		return _node;
	}
	,balance: function(_node) {
		if(this.is_red(_node.right)) _node = this.rotate_left(_node);
		if(this.is_red(_node.left) && this.is_red(_node.left.left)) _node = this.rotate_right(_node);
		if(this.is_red(_node.left) && this.is_red(_node.right)) this.swap_color(_node);
		this.node_update_count(_node);
		return _node;
	}
	,__class__: luxe.structural.BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry
	,__properties__: {get_empty:"get_empty"}
};
luxe.structural.OrderedMapIterator = function(omap) {
	this.index = 0;
	this.map = omap;
};
$hxClasses["luxe.structural.OrderedMapIterator"] = luxe.structural.OrderedMapIterator;
luxe.structural.OrderedMapIterator.__name__ = ["luxe","structural","OrderedMapIterator"];
luxe.structural.OrderedMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.map._keys.length;
	}
	,next: function() {
		return this.map.get(this.map._keys[this.index++]);
	}
	,__class__: luxe.structural.OrderedMapIterator
};
luxe.structural.OrderedMap = function(_map) {
	this.idx = 0;
	this._keys = [];
	this.map = _map;
};
$hxClasses["luxe.structural.OrderedMap"] = luxe.structural.OrderedMap;
luxe.structural.OrderedMap.__name__ = ["luxe","structural","OrderedMap"];
luxe.structural.OrderedMap.__interfaces__ = [IMap];
luxe.structural.OrderedMap.prototype = {
	set: function(key,value) {
		if(!this.map.exists(key)) this._keys.push(key);
		this.map.set(key,value);
		value;
	}
	,toString: function() {
		var _ret = "";
		var _cnt = 0;
		var _len = this._keys.length;
		var _g = 0;
		var _g1 = this._keys;
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			_ret += "" + Std.string(k) + " => " + Std.string(this.map.get(k)) + (_cnt++ < _len - 1?", ":"");
		}
		return "{" + _ret + "}";
	}
	,iterator: function() {
		return new luxe.structural.OrderedMapIterator(this);
	}
	,remove: function(key) {
		return this.map.remove(key) && HxOverrides.remove(this._keys,key);
	}
	,exists: function(key) {
		return this.map.exists(key);
	}
	,get: function(key) {
		return this.map.get(key);
	}
	,keys: function() {
		return HxOverrides.iter(this._keys);
	}
	,__class__: luxe.structural.OrderedMap
};
luxe.tilemaps.Isometric = function() { };
$hxClasses["luxe.tilemaps.Isometric"] = luxe.tilemaps.Isometric;
luxe.tilemaps.Isometric.__name__ = ["luxe","tilemaps","Isometric"];
luxe.tilemaps.Isometric.worldpos_to_tile_coord = function(world_x,world_y,tile_width,tile_height,scale) {
	if(scale == null) scale = 1.0;
	var tile_pos = new phoenix.Vector();
	var tile_width_half = tile_width / 2;
	var tile_height_half = tile_height / 2;
	tile_pos.set_x((world_x / tile_width_half + world_y / tile_height_half) / 2);
	tile_pos.set_y((world_y / tile_height_half - world_x / tile_width_half) / 2);
	return tile_pos;
};
luxe.tilemaps.Isometric.tile_coord_to_worldpos = function(tile_x,tile_y,tile_width,tile_height,scale,offset_x,offset_y) {
	if(scale == null) scale = 1.0;
	var world_pos = new phoenix.Vector();
	var _scaled_tw = tile_width * scale;
	var _scaled_th = tile_height * scale;
	var tile_width_half = _scaled_tw / 2;
	var tile_height_half = _scaled_th / 2;
	if(offset_x == null) offset_x = luxe.tilemaps.TileOffset.left;
	if(offset_y == null) offset_y = luxe.tilemaps.TileOffset.top;
	var tile_offset_x = 0;
	var tile_offset_y = 0;
	switch(offset_x[1]) {
	case 0:
		tile_offset_x += _scaled_tw / 2;
		tile_offset_x /= tile_width;
		break;
	case 4:
		tile_offset_x += _scaled_tw;
		tile_offset_x /= tile_width;
		break;
	default:
	}
	switch(offset_y[1]) {
	case 0:
		tile_offset_y += _scaled_th / 2;
		tile_offset_y /= tile_height;
		break;
	case 2:
		tile_offset_y += _scaled_th;
		tile_offset_y /= tile_height;
		break;
	default:
	}
	tile_offset_x += tile_x;
	tile_offset_y += tile_y;
	world_pos.set_x((tile_offset_x - tile_offset_y) * tile_width_half);
	world_pos.set_y((tile_offset_x + tile_offset_y) * tile_height_half);
	return world_pos;
};
luxe.tilemaps.TilemapVisual = function(_map,_options) {
	this.geometry = new haxe.ds.StringMap();
	this.map = _map;
	this.options = _options;
	this.default_options();
	this.create();
};
$hxClasses["luxe.tilemaps.TilemapVisual"] = luxe.tilemaps.TilemapVisual;
luxe.tilemaps.TilemapVisual.__name__ = ["luxe","tilemaps","TilemapVisual"];
luxe.tilemaps.TilemapVisual.prototype = {
	create: function() {
		if(this.options.no_destroy == null && this.options.no_destroy != true) {
			this.destroy();
			this.geometry = new haxe.ds.StringMap();
		}
	}
	,geometry_for_tile: function(_layer,x,y) {
		if(!this.geometry.exists(_layer)) {
			haxe.Log.trace("  i / tilemap / " + ("visual / geometry_for_layer / " + _layer + " does not exist in tilemap visual"),{ fileName : "Tilemap.hx", lineNumber : 49, className : "luxe.tilemaps.TilemapVisual", methodName : "geometry_for_tile"});
			return null;
		}
		var geomlayer = this.geometry_for_layer(_layer);
		return geomlayer[y][x];
	}
	,geometry_for_layer: function(_layer) {
		if(!this.geometry.exists(_layer)) haxe.Log.trace("  i / tilemap / " + ("visual / geometry_for_layer / " + _layer + " does not exist in tilemap visual"),{ fileName : "Tilemap.hx", lineNumber : 62, className : "luxe.tilemaps.TilemapVisual", methodName : "geometry_for_layer"});
		return this.geometry.get(_layer);
	}
	,default_options: function() {
		if(this.options.batcher == null) this.options.batcher = Luxe.renderer.batcher;
		if(this.options.depth == null) this.options.depth = 0.0;
		if(this.options.group == null) this.options.group = 0;
		if(this.options.scale == null) this.options.scale = 1;
		if(this.options.grid == null) this.options.grid = false;
		if(this.options.filter == null) this.options.filter = phoenix.FilterType.nearest;
	}
	,create_tile_for_layer: function(layer,x,y) {
		return null;
	}
	,update_tile_id: function(_geom,_layer_name,_x,_y,_id) {
	}
	,refresh_tile_id: function(_layer_name,_x,_y,_id) {
		var _tile_layer = this.map.layer(_layer_name);
		var _geom_layer = this.geometry_for_layer(_layer_name);
		if(_geom_layer != null) {
			if(this.map.inside(_x,_y)) {
				var _geom = _geom_layer[_y][_x];
				if(_geom == null) {
					if(_id != 0) {
						_geom = this.create_tile_for_layer(this.map.layer(_layer_name),_x,_y);
						_geom_layer[_y][_x] = _geom;
					}
				} else if(_id == 0) {
					_geom.drop();
					_geom = null;
					_geom_layer[_y][_x] = null;
				} else this.update_tile_id(_geom,_layer_name,_x,_y,_id);
			} else haxe.Log.trace("cannot refresh tile " + _x + "," + _y + " because the coords were out of the map width/height : " + _layer_name + " and " + this.map.width + "," + this.map.height,{ fileName : "Tilemap.hx", lineNumber : 140, className : "luxe.tilemaps.TilemapVisual", methodName : "refresh_tile_id"});
		} else haxe.Log.trace("cannot refresh tile " + _x + "," + _y + " because layer was not found : " + _layer_name,{ fileName : "Tilemap.hx", lineNumber : 144, className : "luxe.tilemaps.TilemapVisual", methodName : "refresh_tile_id"});
	}
	,destroy: function() {
		if(this.geometry != null) {
			var $it0 = this.geometry.keys();
			while( $it0.hasNext() ) {
				var _name = $it0.next();
				var layer = this.geometry.get(_name);
				var _g = 0;
				while(_g < layer.length) {
					var row = layer[_g];
					++_g;
					var _g1 = 0;
					while(_g1 < row.length) {
						var tile = row[_g1];
						++_g1;
						if(tile != null) tile.drop();
						tile = null;
					}
					row = null;
				}
				this.geometry.remove(_name);
			}
		}
		this.geometry = null;
	}
	,__class__: luxe.tilemaps.TilemapVisual
};
luxe.tilemaps.IsometricVisual = function(_map,_options) {
	luxe.tilemaps.TilemapVisual.call(this,_map,_options);
};
$hxClasses["luxe.tilemaps.IsometricVisual"] = luxe.tilemaps.IsometricVisual;
luxe.tilemaps.IsometricVisual.__name__ = ["luxe","tilemaps","IsometricVisual"];
luxe.tilemaps.IsometricVisual.__super__ = luxe.tilemaps.TilemapVisual;
luxe.tilemaps.IsometricVisual.prototype = $extend(luxe.tilemaps.TilemapVisual.prototype,{
	create: function() {
		var $it0 = this.map.iterator();
		while( $it0.hasNext() ) {
			var layer = $it0.next();
			var _layer_geom = [];
			var _g1 = 0;
			var _g = this.map.height;
			while(_g1 < _g) {
				var y = _g1++;
				var _geom_row = [];
				var _g3 = 0;
				var _g2 = this.map.width;
				while(_g3 < _g2) {
					var x = _g3++;
					var _tile_geom = this.create_tile_for_layer(layer,x,y);
					_geom_row.push(_tile_geom);
				}
				_layer_geom.push(_geom_row);
			}
			this.geometry.set(layer.name,_layer_geom);
		}
		if(this.options.grid) {
			var color = new phoenix.Color(1,1,1,0.8).rgb(13369344);
			var _g11 = 0;
			var _g4 = this.map.width + 1;
			while(_g11 < _g4) {
				var x1 = _g11++;
				var ip = luxe.tilemaps.Isometric.tile_coord_to_worldpos(x1,0,this.map.tile_width,this.map.tile_height,this.options.scale);
				var ip_bot = luxe.tilemaps.Isometric.tile_coord_to_worldpos(x1,this.map.height,this.map.tile_width,this.map.tile_height,this.options.scale);
				Luxe.draw.line({ p0 : new phoenix.Vector(this.map.pos.x + ip.x,this.map.pos.y + ip.y), p1 : new phoenix.Vector(this.map.pos.x + ip_bot.x,this.map.pos.y + ip_bot.y), color : color, depth : this.options.depth + 0.001, group : this.options.group, batcher : this.options.batcher});
			}
			var _g12 = 0;
			var _g5 = this.map.height + 1;
			while(_g12 < _g5) {
				var y1 = _g12++;
				var ip1 = luxe.tilemaps.Isometric.tile_coord_to_worldpos(0,y1,this.map.tile_width,this.map.tile_height,this.options.scale);
				var ip_bot1 = luxe.tilemaps.Isometric.tile_coord_to_worldpos(this.map.width,y1,this.map.tile_width,this.map.tile_height,this.options.scale);
				Luxe.draw.line({ p0 : new phoenix.Vector(this.map.pos.x + ip1.x,this.map.pos.y + ip1.y), p1 : new phoenix.Vector(this.map.pos.x + ip_bot1.x,this.map.pos.y + ip_bot1.y), color : color, depth : this.options.depth + 0.001, group : this.options.group, batcher : this.options.batcher});
			}
		}
	}
	,update_tile_id: function(_geom,_layer_name,_x,_y,_id) {
		var tileset = this.map.tileset_from_id(_id);
		var image_coord = tileset.pos_in_texture(_id);
		var g = _geom;
		g.uv(new phoenix.Rectangle(tileset.margin + (image_coord.x * tileset.tile_width + image_coord.x * tileset.spacing),tileset.margin + (image_coord.y * tileset.tile_height + image_coord.y * tileset.spacing),tileset.tile_width,tileset.tile_height));
	}
	,create_tile_for_layer: function(layer,x,y) {
		var _g = this;
		var _scaled_tilewidth = this.map.tile_width * this.options.scale;
		var _scaled_tileheight = this.map.tile_height * this.options.scale;
		var tile = layer.tiles[y][x];
		if(tile.id == 0) return null;
		var tileset = this.map.tileset_from_id(tile.id);
		var _scaled_tileset_tilewidth = tileset.tile_width * this.options.scale;
		var _scaled_tileset_tileheight = tileset.tile_height * this.options.scale;
		var _half_world_tile_width = _scaled_tilewidth / 2;
		var _half_world_tile_height = _scaled_tileheight / 2;
		var _tile_geom = Luxe.draw.box({ x : this.map.pos.x + (x - y) * _half_world_tile_width - _half_world_tile_width, y : this.map.pos.y + (x + y) * _half_world_tile_height - _half_world_tile_height, w : _scaled_tileset_tilewidth, h : _scaled_tileset_tileheight, texture : tileset != null?tileset.texture:null, visible : layer.visible, color : new phoenix.Color(1,1,1,layer.opacity), depth : this.options.depth, group : this.options.group, batcher : this.options.batcher});
		if(tileset != null) {
			if(tileset.texture != null) tileset.texture.set_onload(function(t) {
				var image_coord = tileset.pos_in_texture(tile.id);
				_tile_geom.uv(new phoenix.Rectangle(tileset.margin + (image_coord.x * tileset.tile_width + image_coord.x * tileset.spacing),tileset.margin + (image_coord.y * tileset.tile_height + image_coord.y * tileset.spacing),tileset.tile_width,tileset.tile_height));
				tileset.texture.set_filter(_g.options.filter);
			});
		}
		return _tile_geom;
	}
	,__class__: luxe.tilemaps.IsometricVisual
});
luxe.tilemaps.Ortho = function() { };
$hxClasses["luxe.tilemaps.Ortho"] = luxe.tilemaps.Ortho;
luxe.tilemaps.Ortho.__name__ = ["luxe","tilemaps","Ortho"];
luxe.tilemaps.Ortho.worldpos_to_tile_coord = function(world_x,world_y,tile_width,tile_height,scale) {
	if(scale == null) scale = 1.0;
	var tile_coord = new phoenix.Vector();
	tile_coord.set_x(Math.floor(world_x / (tile_width * scale)));
	tile_coord.set_y(Math.floor(world_y / (tile_height * scale)));
	return tile_coord;
};
luxe.tilemaps.Ortho.tile_coord_to_worldpos = function(tile_x,tile_y,tile_width,tile_height,scale,offset_x,offset_y) {
	if(scale == null) scale = 1.0;
	var world_pos = new phoenix.Vector();
	var _scaled_tw = tile_width * scale;
	var _scaled_th = tile_height * scale;
	world_pos.set_x(tile_x * _scaled_tw);
	world_pos.set_y(tile_y * _scaled_th);
	if(offset_x == null) offset_x = luxe.tilemaps.TileOffset.left;
	if(offset_y == null) offset_y = luxe.tilemaps.TileOffset.top;
	switch(offset_x[1]) {
	case 0:
		var _g = world_pos;
		_g.set_x(_g.x + _scaled_tw / 2);
		break;
	case 4:
		var _g1 = world_pos;
		_g1.set_x(_g1.x + _scaled_tw);
		break;
	default:
	}
	switch(offset_y[1]) {
	case 0:
		var _g2 = world_pos;
		_g2.set_y(_g2.y + _scaled_th / 2);
		break;
	case 2:
		var _g3 = world_pos;
		_g3.set_y(_g3.y + _scaled_th);
		break;
	default:
	}
	return world_pos;
};
luxe.tilemaps.OrthoVisual = function(_map,_options) {
	luxe.tilemaps.TilemapVisual.call(this,_map,_options);
};
$hxClasses["luxe.tilemaps.OrthoVisual"] = luxe.tilemaps.OrthoVisual;
luxe.tilemaps.OrthoVisual.__name__ = ["luxe","tilemaps","OrthoVisual"];
luxe.tilemaps.OrthoVisual.__super__ = luxe.tilemaps.TilemapVisual;
luxe.tilemaps.OrthoVisual.prototype = $extend(luxe.tilemaps.TilemapVisual.prototype,{
	create: function() {
		luxe.tilemaps.TilemapVisual.prototype.create.call(this);
		var _map_scaled_tw = this.map.tile_width * this.options.scale;
		var _map_scaled_th = this.map.tile_height * this.options.scale;
		var $it0 = this.map.iterator();
		while( $it0.hasNext() ) {
			var layer = $it0.next();
			var _layer_geom = [];
			var _g1 = 0;
			var _g = this.map.height;
			while(_g1 < _g) {
				var y = _g1++;
				var _geom_row = [];
				var _g3 = 0;
				var _g2 = this.map.width;
				while(_g3 < _g2) {
					var x = _g3++;
					var _tile_geom = this.create_tile_for_layer(layer,x,y);
					_geom_row.push(_tile_geom);
				}
				_layer_geom.push(_geom_row);
			}
			this.geometry.set(layer.name,_layer_geom);
		}
		if(this.options.grid) {
			var color = new phoenix.Color(1,1,1,0.8).rgb(13369344);
			var _g11 = 0;
			var _g4 = this.map.width + 1;
			while(_g11 < _g4) {
				var x1 = _g11++;
				Luxe.draw.line({ p0 : new phoenix.Vector(this.map.pos.x + x1 * _map_scaled_tw,this.map.pos.y), p1 : new phoenix.Vector(this.map.pos.x + x1 * _map_scaled_tw,this.map.pos.y + this.map.height * _map_scaled_th), color : color, depth : this.options.depth + 0.0001, group : this.options.group, batcher : this.options.batcher});
			}
			var _g12 = 0;
			var _g5 = this.map.height + 1;
			while(_g12 < _g5) {
				var y1 = _g12++;
				Luxe.draw.line({ p0 : new phoenix.Vector(this.map.pos.x,this.map.pos.y + y1 * _map_scaled_th), p1 : new phoenix.Vector(this.map.pos.x + this.map.width * _map_scaled_tw,this.map.pos.y + y1 * _map_scaled_th), color : color, depth : this.options.depth + 0.0001, group : this.options.group, batcher : this.options.batcher});
			}
		}
	}
	,update_tile_id: function(_geom,_layer_name,_x,_y,_id) {
		var tileset = this.map.tileset_from_id(_id);
		var image_coord = tileset.pos_in_texture(_id);
		var g = _geom;
		g.uv(new phoenix.Rectangle(tileset.margin + (image_coord.x * tileset.tile_width + image_coord.x * tileset.spacing),tileset.margin + (image_coord.y * tileset.tile_height + image_coord.y * tileset.spacing),tileset.tile_width,tileset.tile_height));
	}
	,create_tile_for_layer: function(layer,x,y) {
		var _g = this;
		var _map_scaled_tw = this.map.tile_width * this.options.scale;
		var _map_scaled_th = this.map.tile_height * this.options.scale;
		var tile = layer.tiles[y][x];
		if(tile.id == 0) return null;
		var tileset = this.map.tileset_from_id(tile.id);
		var _scaled_tilewidth = tileset.tile_width * this.options.scale;
		var _scaled_tileheight = tileset.tile_height * this.options.scale;
		var _offset_x = 0;
		var _offset_y = _scaled_tileheight - _map_scaled_th;
		var _tile_geom = Luxe.draw.box({ x : this.map.pos.x + tile.x * _map_scaled_tw - _offset_x, y : this.map.pos.y + tile.y * _map_scaled_th - _offset_y, w : _scaled_tilewidth, h : _scaled_tileheight, visible : layer.visible, texture : tileset != null?tileset.texture:null, color : new phoenix.Color(1,1,1,layer.opacity), depth : this.options.depth, group : this.options.group, batcher : this.options.batcher});
		if(tileset != null) {
			if(tileset.texture != null) tileset.texture.set_onload(function(t) {
				var image_coord = tileset.pos_in_texture(tile.id);
				_tile_geom.uv(new phoenix.Rectangle(tileset.margin + (image_coord.x * tileset.tile_width + image_coord.x * tileset.spacing),tileset.margin + (image_coord.y * tileset.tile_height + image_coord.y * tileset.spacing),tileset.tile_width,tileset.tile_height));
				tileset.texture.set_filter(_g.options.filter);
			});
		}
		return _tile_geom;
	}
	,__class__: luxe.tilemaps.OrthoVisual
});
luxe.tilemaps.Tile = function(options) {
	this.id = 0;
	this.uuid = Luxe.utils.uniqueid();
	this.set_id(options.id);
	this.layer = options.layer;
	this.map = options.layer.map;
	this.x = options.x;
	this.y = options.y;
	var _tileset = this.map.tileset_from_id(this.id);
	if(_tileset != null) this.size = new phoenix.Vector(_tileset.tile_width,_tileset.tile_height); else this.size = new phoenix.Vector(this.map.tile_width,this.map.tile_height);
	this.pos = new phoenix.Vector(this.map.pos.x + this.size.x * this.x,this.map.pos.y + this.size.y * this.y);
};
$hxClasses["luxe.tilemaps.Tile"] = luxe.tilemaps.Tile;
luxe.tilemaps.Tile.__name__ = ["luxe","tilemaps","Tile"];
luxe.tilemaps.Tile.prototype = {
	toString: function() {
		return "Tile: id:" + this.id + " x,y:" + this.x + "," + this.y + " layer(" + this.layer.name + ") coord(" + this.x + "," + this.y + ") pos(" + this.pos.x + "," + this.pos.y + ") size(" + this.size.x + "," + this.size.y + ")";
	}
	,set_id: function(_id) {
		this.id = _id;
		if(this.map != null) {
			if(this.map.visual != null) this.map.visual.refresh_tile_id(this.layer.name,this.x,this.y,_id);
		}
		return this.id;
	}
	,__class__: luxe.tilemaps.Tile
	,__properties__: {set_id:"set_id"}
};
luxe.tilemaps.TileLayer = function(options) {
	this.fixed = true;
	this.visible = true;
	this.opacity = 1.0;
	if(options.map == null) throw "TileLayer requires a Tilemap passed into the options, as map:Tilemap";
	this.id = Luxe.utils.uniqueid();
	this.name = options.name;
	this.map = options.map;
	if(options.layer == null) this.layer = 0; else this.layer = options.layer;
	if(options.opacity == null) this.opacity = 1.0; else this.opacity = options.opacity;
	if(options.visible == null) this.visible = true; else this.visible = options.visible;
	if(options.fixed == null) this.fixed = true; else this.fixed = options.fixed;
	this.tiles = [];
	this.properties = new haxe.ds.StringMap();
};
$hxClasses["luxe.tilemaps.TileLayer"] = luxe.tilemaps.TileLayer;
luxe.tilemaps.TileLayer.__name__ = ["luxe","tilemaps","TileLayer"];
luxe.tilemaps.TileLayer.prototype = {
	__class__: luxe.tilemaps.TileLayer
};
luxe.tilemaps.Tileset = function(options) {
	this.spacing = 0;
	this.margin = 0;
	this.tile_height = 0;
	this.tile_width = 0;
	this.first_id = 1;
	if(options == null) throw "Tileset requires a non-null options on new()";
	if(options.texture == null) throw "Tileset requires a texture that is not null";
	this.name = options.name;
	this.texture = options.texture;
	this.tile_width = options.tile_width;
	this.tile_height = options.tile_height;
	if(options.first_id == null) this.first_id = 1; else this.first_id = options.first_id;
	if(options.margin == null) this.margin = 0; else this.margin = options.margin;
	if(options.spacing == null) this.spacing = 0; else this.spacing = options.spacing;
};
$hxClasses["luxe.tilemaps.Tileset"] = luxe.tilemaps.Tileset;
luxe.tilemaps.Tileset.__name__ = ["luxe","tilemaps","Tileset"];
luxe.tilemaps.Tileset.prototype = {
	toString: function() {
		return "Tileset; " + this.name + " tw(" + this.tile_width + ") th(" + this.tile_height + ") first_id(" + this.first_id + ") margin(" + this.margin + ") spacing(" + this.spacing + ")";
	}
	,pos_in_texture: function(_id) {
		var tileid = _id - this.first_id;
		return new phoenix.Vector(this.texture_x(tileid),this.texture_y(tileid));
	}
	,texture_x: function(_id) {
		var _tx = this.texture.width / this.tile_width | 0;
		if(_tx == 0) return 0; else return _id % _tx;
	}
	,texture_y: function(_id) {
		var _ty = this.texture.width / this.tile_width | 0;
		if(_ty == 0) return 0; else return _id / _ty | 0;
	}
	,__class__: luxe.tilemaps.Tileset
};
luxe.tilemaps.TilemapOrientation = $hxClasses["luxe.tilemaps.TilemapOrientation"] = { __ename__ : ["luxe","tilemaps","TilemapOrientation"], __constructs__ : ["ortho","isometric","none"] };
luxe.tilemaps.TilemapOrientation.ortho = ["ortho",0];
luxe.tilemaps.TilemapOrientation.ortho.toString = $estr;
luxe.tilemaps.TilemapOrientation.ortho.__enum__ = luxe.tilemaps.TilemapOrientation;
luxe.tilemaps.TilemapOrientation.isometric = ["isometric",1];
luxe.tilemaps.TilemapOrientation.isometric.toString = $estr;
luxe.tilemaps.TilemapOrientation.isometric.__enum__ = luxe.tilemaps.TilemapOrientation;
luxe.tilemaps.TilemapOrientation.none = ["none",2];
luxe.tilemaps.TilemapOrientation.none.toString = $estr;
luxe.tilemaps.TilemapOrientation.none.__enum__ = luxe.tilemaps.TilemapOrientation;
luxe.tilemaps.TileOffset = $hxClasses["luxe.tilemaps.TileOffset"] = { __ename__ : ["luxe","tilemaps","TileOffset"], __constructs__ : ["center","top","bottom","left","right"] };
luxe.tilemaps.TileOffset.center = ["center",0];
luxe.tilemaps.TileOffset.center.toString = $estr;
luxe.tilemaps.TileOffset.center.__enum__ = luxe.tilemaps.TileOffset;
luxe.tilemaps.TileOffset.top = ["top",1];
luxe.tilemaps.TileOffset.top.toString = $estr;
luxe.tilemaps.TileOffset.top.__enum__ = luxe.tilemaps.TileOffset;
luxe.tilemaps.TileOffset.bottom = ["bottom",2];
luxe.tilemaps.TileOffset.bottom.toString = $estr;
luxe.tilemaps.TileOffset.bottom.__enum__ = luxe.tilemaps.TileOffset;
luxe.tilemaps.TileOffset.left = ["left",3];
luxe.tilemaps.TileOffset.left.toString = $estr;
luxe.tilemaps.TileOffset.left.__enum__ = luxe.tilemaps.TileOffset;
luxe.tilemaps.TileOffset.right = ["right",4];
luxe.tilemaps.TileOffset.right.toString = $estr;
luxe.tilemaps.TileOffset.right.__enum__ = luxe.tilemaps.TileOffset;
luxe.tween = {};
luxe.tween.actuators = {};
luxe.tween.actuators.IGenericActuator = function() { };
$hxClasses["luxe.tween.actuators.IGenericActuator"] = luxe.tween.actuators.IGenericActuator;
luxe.tween.actuators.IGenericActuator.__name__ = ["luxe","tween","actuators","IGenericActuator"];
luxe.tween.actuators.IGenericActuator.prototype = {
	__class__: luxe.tween.actuators.IGenericActuator
};
luxe.tween.actuators.GenericActuator = function(target,duration,properties) {
	this.timescaled = false;
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = luxe.tween.Actuate.defaultEase;
};
$hxClasses["luxe.tween.actuators.GenericActuator"] = luxe.tween.actuators.GenericActuator;
luxe.tween.actuators.GenericActuator.__name__ = ["luxe","tween","actuators","GenericActuator"];
luxe.tween.actuators.GenericActuator.__interfaces__ = [luxe.tween.actuators.IGenericActuator];
luxe.tween.actuators.GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return method.apply(method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		luxe.tween.Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,timescale: function(_value) {
		if(_value == null) _value = true;
		this.timescaled = _value;
		return this;
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,pause: function() {
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: luxe.tween.actuators.GenericActuator
};
luxe.tween.actuators.SimpleActuator = function(target,duration,properties) {
	this.has_timescaled_starttime = false;
	this.active = true;
	this.propertyDetails = new Array();
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = snow.Snow.core.timestamp();
	luxe.tween.actuators.GenericActuator.call(this,target,duration,properties);
	if(!luxe.tween.actuators.SimpleActuator.addedEvent) {
		luxe.tween.actuators.SimpleActuator.addedEvent = true;
		Luxe.on(4,luxe.tween.actuators.SimpleActuator.on_internal_update);
	}
};
$hxClasses["luxe.tween.actuators.SimpleActuator"] = luxe.tween.actuators.SimpleActuator;
luxe.tween.actuators.SimpleActuator.__name__ = ["luxe","tween","actuators","SimpleActuator"];
luxe.tween.actuators.SimpleActuator.on_internal_update = function(dt) {
	luxe.tween.actuators.SimpleActuator.update_timer += dt;
	luxe.tween.actuators.SimpleActuator.current_time = snow.Snow.core.timestamp();
	var currentTime = luxe.tween.actuators.SimpleActuator.current_time;
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = luxe.tween.actuators.SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = luxe.tween.actuators.SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(actuator.timescaled) currentTime = luxe.tween.actuators.SimpleActuator.update_timer; else currentTime = luxe.tween.actuators.SimpleActuator.current_time;
			if(actuator.timescaled && !actuator.has_timescaled_starttime) {
				actuator.has_timescaled_starttime = true;
				actuator.startTime = luxe.tween.actuators.SimpleActuator.update_timer;
				actuator.timeOffset = actuator.startTime;
			}
			if(currentTime > actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			luxe.tween.actuators.SimpleActuator.actuators.splice(j,1);
			--luxe.tween.actuators.SimpleActuator.actuatorsLength;
		}
	}
};
luxe.tween.actuators.SimpleActuator.__super__ = luxe.tween.actuators.GenericActuator;
luxe.tween.actuators.SimpleActuator.prototype = $extend(luxe.tween.actuators.GenericActuator.prototype,{
	autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i) && (!this.target.__properties__ || !this.target.__properties__["set_" + i])) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				details = new luxe.tween.actuators.PropertyDetails(this.target,i,start,this.getField(this.properties,i) - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		luxe.tween.actuators.SimpleActuator.actuators.push(this);
		++luxe.tween.actuators.SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		this.paused = true;
		if(this.timescaled) this.pauseTime = luxe.tween.actuators.SimpleActuator.update_timer; else this.pauseTime = luxe.tween.actuators.SimpleActuator.current_time;
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += ((this.timescaled?luxe.tween.actuators.SimpleActuator.update_timer:luxe.tween.actuators.SimpleActuator.current_time) - this.pauseTime) / 1000;
		}
	}
	,setField: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setProperty: function(details,value) {
		if(details.isField) Reflect.setProperty(details.target,details.propertyName,value); else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) Reflect.setProperty(details.target,details.propertyName,endValue); else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: luxe.tween.actuators.SimpleActuator
});
luxe.tween.easing = {};
luxe.tween.easing.Quad = function() { };
$hxClasses["luxe.tween.easing.Quad"] = luxe.tween.easing.Quad;
luxe.tween.easing.Quad.__name__ = ["luxe","tween","easing","Quad"];
luxe.tween.easing.Quad.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
luxe.tween.easing.Quad.get_easeIn = function() {
	return new luxe.tween.easing.QuadEaseIn();
};
luxe.tween.easing.Quad.get_easeInOut = function() {
	return new luxe.tween.easing.QuadEaseInOut();
};
luxe.tween.easing.Quad.get_easeOut = function() {
	return new luxe.tween.easing.QuadEaseOut();
};
luxe.tween.easing.IEasing = function() { };
$hxClasses["luxe.tween.easing.IEasing"] = luxe.tween.easing.IEasing;
luxe.tween.easing.IEasing.__name__ = ["luxe","tween","easing","IEasing"];
luxe.tween.easing.IEasing.prototype = {
	__class__: luxe.tween.easing.IEasing
};
luxe.tween.easing.QuadEaseOut = function() {
};
$hxClasses["luxe.tween.easing.QuadEaseOut"] = luxe.tween.easing.QuadEaseOut;
luxe.tween.easing.QuadEaseOut.__name__ = ["luxe","tween","easing","QuadEaseOut"];
luxe.tween.easing.QuadEaseOut.__interfaces__ = [luxe.tween.easing.IEasing];
luxe.tween.easing.QuadEaseOut.prototype = {
	calculate: function(k) {
		return -k * (k - 2);
	}
	,ease: function(t,b,c,d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	,__class__: luxe.tween.easing.QuadEaseOut
};
luxe.tween.Actuate = function() { };
$hxClasses["luxe.tween.Actuate"] = luxe.tween.Actuate;
luxe.tween.Actuate.__name__ = ["luxe","tween","Actuate"];
luxe.tween.Actuate.apply = function(target,properties,customActuator) {
	luxe.tween.Actuate.stop(target,properties);
	if(customActuator == null) customActuator = luxe.tween.Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
luxe.tween.Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!luxe.tween.Actuate.targetLibraries.exists(target) && allowCreation) luxe.tween.Actuate.targetLibraries.set(target,new Array());
	return luxe.tween.Actuate.targetLibraries.get(target);
};
luxe.tween.Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return luxe.tween.Actuate.tween(target,duration,properties,overwrite,luxe.tween.actuators.MotionPathActuator);
};
luxe.tween.Actuate.pause = function(target) {
	if(js.Boot.__instanceof(target,luxe.tween.actuators.GenericActuator)) (js.Boot.__cast(target , luxe.tween.actuators.GenericActuator)).pause(); else {
		var library = luxe.tween.Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator = library[_g];
				++_g;
				actuator.pause();
			}
		}
	}
};
luxe.tween.Actuate.pauseAll = function() {
	var $it0 = luxe.tween.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
luxe.tween.Actuate.reset = function() {
	var $it0 = luxe.tween.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	luxe.tween.Actuate.targetLibraries = new haxe.ds.ObjectMap();
};
luxe.tween.Actuate.resume = function(target) {
	if(js.Boot.__instanceof(target,luxe.tween.actuators.GenericActuator)) (js.Boot.__cast(target , luxe.tween.actuators.GenericActuator)).resume(); else {
		var library = luxe.tween.Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator = library[_g];
				++_g;
				actuator.resume();
			}
		}
	}
};
luxe.tween.Actuate.resumeAll = function() {
	var $it0 = luxe.tween.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
luxe.tween.Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js.Boot.__instanceof(target,luxe.tween.actuators.GenericActuator)) (js.Boot.__cast(target , luxe.tween.actuators.GenericActuator)).stop(null,complete,sendEvent); else {
			var library = luxe.tween.Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js.Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
luxe.tween.Actuate.timer = function(duration,customActuator) {
	return luxe.tween.Actuate.tween(new luxe.tween._Actuate.TweenTimer(0),duration,new luxe.tween._Actuate.TweenTimer(1),false,customActuator);
};
luxe.tween.Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = luxe.tween.Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = luxe.tween.Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = luxe.tween.Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return luxe.tween.Actuate.apply(target,properties,customActuator);
	}
	return null;
};
luxe.tween.Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(luxe.tween.Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(luxe.tween.Actuate.targetLibraries.h[target.__id__],actuator);
		if(luxe.tween.Actuate.targetLibraries.h[target.__id__].length == 0) luxe.tween.Actuate.targetLibraries.remove(target);
	}
};
luxe.tween.Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return luxe.tween.Actuate.tween(target,duration,properties,overwrite,luxe.tween.actuators.MethodActuator);
};
luxe.tween._Actuate = {};
luxe.tween._Actuate.TweenTimer = function(progress) {
	this.progress = progress;
};
$hxClasses["luxe.tween._Actuate.TweenTimer"] = luxe.tween._Actuate.TweenTimer;
luxe.tween._Actuate.TweenTimer.__name__ = ["luxe","tween","_Actuate","TweenTimer"];
luxe.tween._Actuate.TweenTimer.prototype = {
	__class__: luxe.tween._Actuate.TweenTimer
};
luxe.tween.MotionPath = function() {
	this._x = new luxe.tween.ComponentPath();
	this._y = new luxe.tween.ComponentPath();
	this._rotation = null;
};
$hxClasses["luxe.tween.MotionPath"] = luxe.tween.MotionPath;
luxe.tween.MotionPath.__name__ = ["luxe","tween","MotionPath"];
luxe.tween.MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new luxe.tween.BezierPath(x,controlX,strength));
		this._y.addPath(new luxe.tween.BezierPath(y,controlY,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new luxe.tween.LinearPath(x,strength));
		this._y.addPath(new luxe.tween.LinearPath(y,strength));
		return this;
	}
	,get_rotation: function() {
		if(this._rotation == null) this._rotation = new luxe.tween.RotationPath(this._x,this._y);
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: luxe.tween.MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
luxe.tween.IComponentPath = function() { };
$hxClasses["luxe.tween.IComponentPath"] = luxe.tween.IComponentPath;
luxe.tween.IComponentPath.__name__ = ["luxe","tween","IComponentPath"];
luxe.tween.IComponentPath.prototype = {
	__class__: luxe.tween.IComponentPath
};
luxe.tween.ComponentPath = function() {
	this.paths = new Array();
	this.start = 0;
	this.totalStrength = 0;
};
$hxClasses["luxe.tween.ComponentPath"] = luxe.tween.ComponentPath;
luxe.tween.ComponentPath.__name__ = ["luxe","tween","ComponentPath"];
luxe.tween.ComponentPath.__interfaces__ = [luxe.tween.IComponentPath];
luxe.tween.ComponentPath.prototype = {
	addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,__class__: luxe.tween.ComponentPath
	,__properties__: {get_end:"get_end"}
};
luxe.tween.BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
$hxClasses["luxe.tween.BezierPath"] = luxe.tween.BezierPath;
luxe.tween.BezierPath.__name__ = ["luxe","tween","BezierPath"];
luxe.tween.BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: luxe.tween.BezierPath
};
luxe.tween.LinearPath = function(end,strength) {
	luxe.tween.BezierPath.call(this,end,0,strength);
};
$hxClasses["luxe.tween.LinearPath"] = luxe.tween.LinearPath;
luxe.tween.LinearPath.__name__ = ["luxe","tween","LinearPath"];
luxe.tween.LinearPath.__super__ = luxe.tween.BezierPath;
luxe.tween.LinearPath.prototype = $extend(luxe.tween.BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: luxe.tween.LinearPath
});
luxe.tween.RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.start = this.calculate(0.0);
};
$hxClasses["luxe.tween.RotationPath"] = luxe.tween.RotationPath;
luxe.tween.RotationPath.__name__ = ["luxe","tween","RotationPath"];
luxe.tween.RotationPath.__interfaces__ = [luxe.tween.IComponentPath];
luxe.tween.RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: luxe.tween.RotationPath
	,__properties__: {get_end:"get_end"}
};
luxe.tween.actuators.MethodActuator = function(target,duration,properties) {
	this.currentParameters = new Array();
	this.tweenProperties = { };
	luxe.tween.actuators.SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = new Array();
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(null);
	}
};
$hxClasses["luxe.tween.actuators.MethodActuator"] = luxe.tween.actuators.MethodActuator;
luxe.tween.actuators.MethodActuator.__name__ = ["luxe","tween","actuators","MethodActuator"];
luxe.tween.actuators.MethodActuator.__super__ = luxe.tween.actuators.SimpleActuator;
luxe.tween.actuators.MethodActuator.prototype = $extend(luxe.tween.actuators.SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		luxe.tween.actuators.SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new luxe.tween.actuators.PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		luxe.tween.actuators.SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: luxe.tween.actuators.MethodActuator
});
luxe.tween.actuators.MotionPathActuator = function(target,duration,properties) {
	luxe.tween.actuators.SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["luxe.tween.actuators.MotionPathActuator"] = luxe.tween.actuators.MotionPathActuator;
luxe.tween.actuators.MotionPathActuator.__name__ = ["luxe","tween","actuators","MotionPathActuator"];
luxe.tween.actuators.MotionPathActuator.__super__ = luxe.tween.actuators.SimpleActuator;
luxe.tween.actuators.MotionPathActuator.prototype = $extend(luxe.tween.actuators.SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , luxe.tween.IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , luxe.tween.IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js.Boot.__cast(Reflect.field(this.properties,propertyName) , luxe.tween.IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new luxe.tween.actuators.PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js.Boot.__cast(details1 , luxe.tween.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js.Boot.__cast(details1 , luxe.tween.actuators.PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js.Boot.__cast(details2 , luxe.tween.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js.Boot.__cast(details2 , luxe.tween.actuators.PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js.Boot.__cast(details2 , luxe.tween.actuators.PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js.Boot.__cast(details2 , luxe.tween.actuators.PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: luxe.tween.actuators.MotionPathActuator
});
luxe.tween.actuators.PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["luxe.tween.actuators.PropertyDetails"] = luxe.tween.actuators.PropertyDetails;
luxe.tween.actuators.PropertyDetails.__name__ = ["luxe","tween","actuators","PropertyDetails"];
luxe.tween.actuators.PropertyDetails.prototype = {
	__class__: luxe.tween.actuators.PropertyDetails
};
luxe.tween.actuators.PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	luxe.tween.actuators.PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["luxe.tween.actuators.PropertyPathDetails"] = luxe.tween.actuators.PropertyPathDetails;
luxe.tween.actuators.PropertyPathDetails.__name__ = ["luxe","tween","actuators","PropertyPathDetails"];
luxe.tween.actuators.PropertyPathDetails.__super__ = luxe.tween.actuators.PropertyDetails;
luxe.tween.actuators.PropertyPathDetails.prototype = $extend(luxe.tween.actuators.PropertyDetails.prototype,{
	__class__: luxe.tween.actuators.PropertyPathDetails
});
luxe.tween.easing.QuadEaseIn = function() {
};
$hxClasses["luxe.tween.easing.QuadEaseIn"] = luxe.tween.easing.QuadEaseIn;
luxe.tween.easing.QuadEaseIn.__name__ = ["luxe","tween","easing","QuadEaseIn"];
luxe.tween.easing.QuadEaseIn.__interfaces__ = [luxe.tween.easing.IEasing];
luxe.tween.easing.QuadEaseIn.prototype = {
	calculate: function(k) {
		return k * k;
	}
	,ease: function(t,b,c,d) {
		return c * (t /= d) * t + b;
	}
	,__class__: luxe.tween.easing.QuadEaseIn
};
luxe.tween.easing.QuadEaseInOut = function() {
};
$hxClasses["luxe.tween.easing.QuadEaseInOut"] = luxe.tween.easing.QuadEaseInOut;
luxe.tween.easing.QuadEaseInOut.__name__ = ["luxe","tween","easing","QuadEaseInOut"];
luxe.tween.easing.QuadEaseInOut.__interfaces__ = [luxe.tween.easing.IEasing];
luxe.tween.easing.QuadEaseInOut.prototype = {
	calculate: function(k) {
		if((k *= 2) < 1) return 0.5 * k * k;
		return -0.5 * ((k - 1) * (k - 3) - 1);
	}
	,ease: function(t,b,c,d) {
		if((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((t - 1) * (t - 3) - 1) + b;
	}
	,__class__: luxe.tween.easing.QuadEaseInOut
};
luxe.utils = {};
luxe.utils.GeometryUtils = function() {
};
$hxClasses["luxe.utils.GeometryUtils"] = luxe.utils.GeometryUtils;
luxe.utils.GeometryUtils.__name__ = ["luxe","utils","GeometryUtils"];
luxe.utils.GeometryUtils.prototype = {
	segments_for_smooth_circle: function(_radius,_smooth) {
		if(_smooth == null) _smooth = 5;
		return Std["int"](_smooth * Math.sqrt(_radius));
	}
	,random_point_in_unit_circle: function() {
		var _r = Math.sqrt(Math.random());
		var _t = (-1 + 2 * Math.random()) * 6.283185307179586;
		return new phoenix.Vector(_r * Math.cos(_t),_r * Math.sin(_t));
	}
	,point_in_polygon: function(_point,_offset,_verts) {
		if(_offset == null) _offset = new phoenix.Vector();
		var c = false;
		var nvert = _verts.length;
		var j = nvert - 1;
		var _g = 0;
		while(_g < nvert) {
			var i = _g++;
			if(_verts[i].y + _offset.y > _point.y != _verts[j].y + _offset.y > _point.y && _point.x < (_verts[j].x + _offset.x - (_verts[i].x + _offset.x)) * (_point.y - (_verts[i].y + _offset.y)) / (_verts[j].y + _offset.y - (_verts[i].y + _offset.y)) + (_verts[i].x + _offset.x)) c = !c;
			j = i;
		}
		return c;
	}
	,point_in_geometry: function(_point,_geometry) {
		var c = false;
		var nvert = _geometry.vertices.length;
		var j = nvert - 1;
		var _g = 0;
		while(_g < nvert) {
			var i = _g++;
			var _vert_i_pos = _geometry.vertices[i].pos.clone().transform(_geometry.transform.get_world().get_matrix());
			var _vert_j_pos = _geometry.vertices[j].pos.clone().transform(_geometry.transform.get_world().get_matrix());
			if(_vert_i_pos.y > _point.y != _vert_j_pos.y > _point.y && _point.x < (_vert_j_pos.x - _vert_i_pos.x) * (_point.y - _vert_i_pos.y) / (_vert_j_pos.y - _vert_i_pos.y) + _vert_i_pos.x) c = !c;
			j = i;
		}
		return c;
	}
	,intersect_ray_plane: function(_ray_start,_ray_dir,_plane_normal,_plane_point) {
		var part1 = _plane_normal.dot(new phoenix.Vector(_plane_point.x - _ray_start.x,_plane_point.y - _ray_start.y,_plane_point.z - _ray_start.z));
		var part2 = _plane_normal.x * _ray_dir.x + _plane_normal.y * _ray_dir.y + _plane_normal.z * _ray_dir.z;
		var T = part1 / part2;
		return phoenix.Vector.Add(_ray_start,phoenix.Vector.Multiply(_ray_dir,T));
	}
	,__class__: luxe.utils.GeometryUtils
};
luxe.utils.Maths = function() {
};
$hxClasses["luxe.utils.Maths"] = luxe.utils.Maths;
luxe.utils.Maths.__name__ = ["luxe","utils","Maths"];
luxe.utils.Maths.fixed = function(value,precision) {
	var n = Math.pow(10,precision);
	return (value * n | 0) / n;
};
luxe.utils.Maths.lerp = function(value,target,t) {
	if(t < 0) t = 0; else if(t > 1) t = 1; else t = t;
	return value + t * (target - value);
};
luxe.utils.Maths.weighted_avg = function(value,target,slowness) {
	if(slowness == 0) slowness = 0.00000001;
	return (value * (slowness - 1) + target) / slowness;
};
luxe.utils.Maths.clamp = function(value,a,b) {
	if(value < a) return a; else if(value > b) return b; else return value;
};
luxe.utils.Maths.clamp_bottom = function(value,a) {
	if(value < a) return a; else return value;
};
luxe.utils.Maths.within_range = function(value,start_range,end_range) {
	return value >= start_range && value <= end_range;
};
luxe.utils.Maths.wrap_angle = function(degrees,lower,upper) {
	var _radians = degrees * 0.0174532925199432781;
	var _distance = upper - lower;
	var _times = Math.floor((degrees - lower) / _distance);
	return degrees - _times * _distance;
};
luxe.utils.Maths.nearest_power_of_two = function(_value) {
	_value--;
	_value |= _value >> 1;
	_value |= _value >> 2;
	_value |= _value >> 4;
	_value |= _value >> 8;
	_value |= _value >> 16;
	_value++;
	return _value;
};
luxe.utils.Maths.map_linear = function(value,a1,a2,b1,b2) {
	return b1 + (value - a1) * (b2 - b1) / (a2 - a1);
};
luxe.utils.Maths.smoothstep = function(x,min,max) {
	if(x <= min) return 0;
	if(x >= max) return 1;
	x = (x - min) / (max - min);
	return x * x * (3 - 2 * x);
};
luxe.utils.Maths.smootherstep = function(x,min,max) {
	if(x <= min) return 0;
	if(x >= max) return 1;
	x = (x - min) / (max - min);
	return x * x * x * (x * (x * 6 - 15) + 10);
};
luxe.utils.Maths.random16 = function() {
	return (65280 * Math.random() + 255 * Math.random()) / 65535;
};
luxe.utils.Maths.random_int = function(low,high) {
	return low + Math.floor(Math.random() * (high - low + 1));
};
luxe.utils.Maths.random_float = function(low,high) {
	return low + Math.random() * (high - low);
};
luxe.utils.Maths.random_float_spread = function(range) {
	return range * (0.5 - Math.random());
};
luxe.utils.Maths.sign = function(x) {
	if(x < 0) return -1; else if(x > 0) return 1; else return 0;
};
luxe.utils.Maths.radians = function(degrees) {
	return degrees * 0.0174532925199432781;
};
luxe.utils.Maths.degrees = function(radians) {
	return radians * 57.2957795130823797;
};
luxe.utils.Maths.prototype = {
	__class__: luxe.utils.Maths
};
luxe.utils.Random = function(_initial_seed) {
	this.initial = this.seed = _initial_seed;
	this.seed = this.initial;
};
$hxClasses["luxe.utils.Random"] = luxe.utils.Random;
luxe.utils.Random.__name__ = ["luxe","utils","Random"];
luxe.utils.Random.prototype = {
	get: function() {
		return (function($this) {
			var $r;
			var a;
			a = $this.seed = (function($this) {
				var $r;
				var $int = $this.seed * 16807;
				$r = $int < 0?4294967296.0 + $int:$int + 0.0;
				return $r;
			}($this)) % (function($this) {
				var $r;
				var int1 = 2147483647;
				$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
				return $r;
			}($this)) | 0;
			$r = (function($this) {
				var $r;
				var int2 = a;
				$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
				return $r;
			}($this)) / (function($this) {
				var $r;
				var int3 = 2147483647;
				$r = int3 < 0?4294967296.0 + int3:int3 + 0.0;
				return $r;
			}($this));
			return $r;
		}(this)) + 0.000000000233;
	}
	,'float': function(min,max) {
		if(max == null) {
			max = min;
			min = 0;
		}
		return this.get() * (max - min) + min;
	}
	,'int': function(min,max) {
		if(max == null) {
			max = min;
			min = 0;
		}
		return Math.floor(this["float"](min,max));
	}
	,bool: function(chance) {
		if(chance == null) chance = 0.5;
		return this.get() < chance;
	}
	,sign: function(chance) {
		if(chance == null) chance = 0.5;
		if(this.get() < chance) return 1; else return -1;
	}
	,bit: function(chance) {
		if(chance == null) chance = 0.5;
		if(this.get() < chance) return 1; else return 0;
	}
	,reset: function() {
		var s = this.seed;
		this.initial = this.seed = s;
		this.initial;
	}
	,set_initial: function(_initial) {
		this.initial = this.seed = _initial;
		return this.initial;
	}
	,__class__: luxe.utils.Random
	,__properties__: {set_initial:"set_initial"}
};
luxe.utils.Utils = function(_luxe) {
	this.core = _luxe;
	this.geometry = new luxe.utils.GeometryUtils();
	this.random = new luxe.utils.Random(Std["int"](Math.random() * 1073741823));
	this._byte_levels = ["bytes","Kb","MB","GB","TB"];
};
$hxClasses["luxe.utils.Utils"] = luxe.utils.Utils;
luxe.utils.Utils.__name__ = ["luxe","utils","Utils"];
luxe.utils.Utils.prototype = {
	pos_info: function(pos) {
		return "" + pos.fileName + ":" + pos.lineNumber + ":(" + pos.className + ":" + pos.methodName + ")";
	}
	,uniqueid: function(val) {
		if(val == null) val = Std.random(2147483647);
		var to_char = function(value) {
			if(value > 9) {
				var ascii = 65 + (value - 10);
				if(ascii > 90) ascii += 6;
				return String.fromCharCode(ascii);
			} else return (value == null?"null":"" + value).charAt(0);
		};
		var r = val % 62 | 0;
		var q = val / 62 | 0;
		if(q > 0) return this.uniqueid(q) + to_char(r); else return Std.string(to_char(r));
	}
	,uniquehash: function() {
		return this.hash(this.uniqueid());
	}
	,hash: function(string) {
		return this.hashdjb2(string);
	}
	,hashdjb2: function(string) {
		var _hash = 5381;
		var _g1 = 0;
		var _g = string.length;
		while(_g1 < _g) {
			var i = _g1++;
			_hash = (_hash << 5) + _hash + HxOverrides.cca(string,i);
		}
		return _hash;
	}
	,uniqueid2: function() {
		return haxe.crypto.Md5.encode(Std.string(snow.Snow.core.timestamp() * Math.random()));
	}
	,stacktrace: function(_depth) {
		if(_depth == null) _depth = 100;
		var result = "\n";
		var stack = haxe.CallStack.callStack();
		stack.shift();
		stack.reverse();
		var total = Std["int"](Math.min(stack.length,_depth));
		var _g = 0;
		while(_g < total) {
			var i = _g++;
			var stackitem = stack[i];
			{
				var _g1 = stack[i];
				switch(_g1[1]) {
				case 2:
					var line = _g1[4];
					var file = _g1[3];
					var s = _g1[2];
					switch(s[1]) {
					case 3:
						var method = s[3];
						var classname = s[2];
						result += "   at " + file + ":" + line + ": " + classname + "." + method;
						break;
					default:
					}
					break;
				default:
				}
			}
			if(i != total - 1) result += "\n";
		}
		return result;
	}
	,path_is_relative: function(_path) {
		return _path.charAt(0) != "#" && _path.charAt(0) != "/" && _path.indexOf(":\\") == -1 && _path.indexOf(":/") == -1 && (_path.indexOf("//") == -1 || _path.indexOf("//") > _path.indexOf("#") || _path.indexOf("//") > _path.indexOf("?"));
	}
	,find_assets_image_sequence: function(_name,_ext,_start) {
		if(_start == null) _start = "1";
		if(_ext == null) _ext = ".png";
		var _final = [];
		var _sequence_type = "";
		var _pattern_regex = null;
		var _type0 = _name + _start + _ext;
		var _type0_re = new EReg("(" + _name + ")(\\d\\b)","gi");
		var _type1 = _name + "_" + _start + _ext;
		var _type1_re = new EReg("(" + _name + ")(_\\d\\b)","gi");
		var _type2 = _name + "-" + _start + _ext;
		var _type2_re = new EReg("(" + _name + ")(-\\d\\b)","gi");
		if(HxOverrides.indexOf(this.core.app.assets.list,_type0,0) != -1) {
			_sequence_type = _type0;
			_pattern_regex = _type0_re;
		} else if(HxOverrides.indexOf(this.core.app.assets.list,_type1,0) != -1) {
			_sequence_type = _type1;
			_pattern_regex = _type1_re;
		} else if(HxOverrides.indexOf(this.core.app.assets.list,_type2,0) != -1) {
			_sequence_type = _type2;
			_pattern_regex = _type2_re;
		} else haxe.Log.trace("Sequence requested from " + _name + " but no assets found like `" + _type0 + "` or `" + _type1 + "` or `" + _type2 + "`",{ fileName : "Utils.hx", lineNumber : 168, className : "luxe.utils.Utils", methodName : "find_assets_image_sequence"});
		if(_sequence_type != "") {
			var _g = 0;
			var _g1 = this.core.app.assets.list;
			while(_g < _g1.length) {
				var _asset = _g1[_g];
				++_g;
				if(_pattern_regex.match(_asset)) _final.push(_asset);
			}
			_final.sort(function(a,b) {
				if(a == b) return 0;
				if(a < b) return -1;
				return 1;
			});
		}
		return _final;
	}
	,text_wrap_column_knuth_plass: function(_string,_column) {
		if(_column == null) _column = 80;
		var result = [];
		var words = [];
		var lengths = [];
		var badness;
		var _g = new haxe.ds.IntMap();
		_g.set(0,0);
		badness = _g;
		var extra = new haxe.ds.IntMap();
		var s = _string;
		var rgx = new EReg("(\\b[^\\s]+\\b)","gm");
		while(rgx.match(s)) {
			words.push(rgx.matched(1));
			s = rgx.matchedRight();
		}
		if(words.length == 0) words.push(_string);
		words;
		words.map(function(w) {
			lengths.push(w.length);
		});
		var n = words.length;
		var _g2 = 1;
		var _g1 = n + 1;
		while(_g2 < _g1) {
			var i = _g2++;
			var sums = new haxe.ds.IntMap();
			var k = i;
			while((function($this) {
				var $r;
				var total = 0;
				{
					var _g3 = k - 1;
					while(_g3 < i) {
						var i1 = _g3++;
						total += lengths[i1];
					}
				}
				$r = total + (i - k + 1);
				return $r;
			}(this)) <= _column && k > 0) {
				var a;
				a = _column - (function($this) {
					var $r;
					var total1 = 0;
					{
						var _g4 = k - 1;
						while(_g4 < i) {
							var i2 = _g4++;
							total1 += lengths[i2];
						}
					}
					$r = total1 + (i - k + 1);
					return $r;
				}(this));
				var k1 = Std["int"](Math.pow(a,3) + badness.get(k - 1));
				sums.set(k1,k);
				k;
				k -= 1;
			}
			var mn;
			var min = 1073741823;
			var $it0 = sums.keys();
			while( $it0.hasNext() ) {
				var item = $it0.next();
				if(item < min) min = item;
			}
			mn = min;
			badness.set(i,mn);
			mn;
			var v = sums.get(mn);
			extra.set(i,v);
			v;
		}
		var line = 1;
		while(n > 1) {
			result.unshift(words.slice(extra.get(n) - 1,n).join(" "));
			n = extra.get(n) - 1;
			line += 1;
		}
		if(result.length == 0) result.push(_string);
		return result;
	}
	,text_wrap_column: function(_text,_brk,_column) {
		if(_column == null) _column = 80;
		if(_brk == null) _brk = "\n";
		var result = new EReg("(.{1," + _column + "})(?: +|$)\n?|(.{" + _column + "})","gimu").replace(_text,"$1$2" + _brk);
		return StringTools.rtrim(result);
	}
	,bytes_to_string: function(bytes,precision) {
		if(precision == null) precision = 3;
		var index = Math.floor(Math.log(bytes) / Math.log(1024));
		var _byte_value = bytes / Math.pow(1024,index);
		_byte_value = luxe.utils.Maths.fixed(_byte_value,precision);
		return _byte_value + " " + this._byte_levels[index];
	}
	,array_to_bytes: function(array) {
		if(array == null) return null;
		var bytes = haxe.io.Bytes.alloc(array.length);
		var _g1 = 0;
		var _g = bytes.length;
		while(_g1 < _g) {
			var n = _g1++;
			bytes.b[n] = array[n] & 255;
		}
		return bytes;
	}
	,__class__: luxe.utils.Utils
};
luxe.utils.unifill = {};
luxe.utils.unifill._CodePoint = {};
luxe.utils.unifill._CodePoint.CodePoint_Impl_ = function() { };
$hxClasses["luxe.utils.unifill._CodePoint.CodePoint_Impl_"] = luxe.utils.unifill._CodePoint.CodePoint_Impl_;
luxe.utils.unifill._CodePoint.CodePoint_Impl_.__name__ = ["luxe","utils","unifill","_CodePoint","CodePoint_Impl_"];
luxe.utils.unifill._CodePoint.CodePoint_Impl_.cons = function(a,b) {
	return luxe.utils.unifill.Utf16.fromCodePoint(a).toString() + b;
};
luxe.utils.unifill._CodePoint.CodePoint_Impl_.snoc = function(a,b) {
	return a + luxe.utils.unifill.Utf16.fromCodePoint(b).toString();
};
luxe.utils.unifill._CodePoint.CodePoint_Impl_.addInt = function(a,b) {
	return a + b;
};
luxe.utils.unifill._CodePoint.CodePoint_Impl_.sub = function(a,b) {
	return a - b;
};
luxe.utils.unifill._CodePoint.CodePoint_Impl_.subInt = function(a,b) {
	return a - b;
};
luxe.utils.unifill._CodePoint.CodePoint_Impl_._new = function(code) {
	var this1;
	if(!(0 <= code && code <= 1114111 && !(55296 <= code && code <= 56319) && !(56320 <= code && code <= 57343))) throw luxe.utils.unifill.Exception.InvalidCodePoint(code);
	this1 = code;
	return this1;
};
luxe.utils.unifill._CodePoint.CodePoint_Impl_.toString = function(this1) {
	return luxe.utils.unifill.Utf16.fromCodePoint(this1).toString();
};
luxe.utils.unifill._CodePoint.CodePoint_Impl_.toInt = function(this1) {
	return this1;
};
luxe.utils.unifill.CodePointIter = function(s) {
	this.s = s;
	this.itr = new luxe.utils.unifill.InternalEncodingIter(s,0,s.length);
};
$hxClasses["luxe.utils.unifill.CodePointIter"] = luxe.utils.unifill.CodePointIter;
luxe.utils.unifill.CodePointIter.__name__ = ["luxe","utils","unifill","CodePointIter"];
luxe.utils.unifill.CodePointIter.prototype = {
	hasNext: function() {
		return this.itr.hasNext();
	}
	,next: function() {
		return luxe.utils.unifill.InternalEncoding.codePointAt(this.s,this.itr.next());
	}
	,__class__: luxe.utils.unifill.CodePointIter
};
luxe.utils.unifill.Exception = $hxClasses["luxe.utils.unifill.Exception"] = { __ename__ : ["luxe","utils","unifill","Exception"], __constructs__ : ["InvalidCodePoint","InvalidCodeUnitSequence"] };
luxe.utils.unifill.Exception.InvalidCodePoint = function(code) { var $x = ["InvalidCodePoint",0,code]; $x.__enum__ = luxe.utils.unifill.Exception; $x.toString = $estr; return $x; };
luxe.utils.unifill.Exception.InvalidCodeUnitSequence = function(index) { var $x = ["InvalidCodeUnitSequence",1,index]; $x.__enum__ = luxe.utils.unifill.Exception; $x.toString = $estr; return $x; };
luxe.utils.unifill.InternalEncoding = function() { };
$hxClasses["luxe.utils.unifill.InternalEncoding"] = luxe.utils.unifill.InternalEncoding;
luxe.utils.unifill.InternalEncoding.__name__ = ["luxe","utils","unifill","InternalEncoding"];
luxe.utils.unifill.InternalEncoding.__properties__ = {get_internalEncoding:"get_internalEncoding"}
luxe.utils.unifill.InternalEncoding.get_internalEncoding = function() {
	return "UTF-16";
};
luxe.utils.unifill.InternalEncoding.codeUnitAt = function(s,index) {
	var u_str = s;
	return u_str.charCodeAt(index);
};
luxe.utils.unifill.InternalEncoding.codePointAt = function(s,index) {
	var u = new luxe.utils.unifill.Utf16(s);
	return u.codePointAt(index);
};
luxe.utils.unifill.InternalEncoding.charAt = function(s,index) {
	var u = new luxe.utils.unifill.Utf16(s);
	return u.charAt(index).toString();
};
luxe.utils.unifill.InternalEncoding.codePointCount = function(s,beginIndex,endIndex) {
	var u = new luxe.utils.unifill.Utf16(s);
	return u.codePointCount(beginIndex,endIndex);
};
luxe.utils.unifill.InternalEncoding.codePointWidthAt = function(s,index) {
	var u = new luxe.utils.unifill.Utf16(s);
	return u.codePointWidthAt(index);
};
luxe.utils.unifill.InternalEncoding.codePointWidthBefore = function(s,index) {
	var u = new luxe.utils.unifill.Utf16(s);
	return luxe.utils.unifill._Utf16.Utf16Impl.find_prev_code_point($bind(u,u.codeUnitAt),index);
};
luxe.utils.unifill.InternalEncoding.offsetByCodePoints = function(s,index,codePointOffset) {
	var u = new luxe.utils.unifill.Utf16(s);
	if(codePointOffset >= 0) return u.forward_offset_by_code_points(index,codePointOffset); else return u.backward_offset_by_code_points(index,-codePointOffset);
};
luxe.utils.unifill.InternalEncoding.backwardOffsetByCodePoints = function(s,index,codePointOffset) {
	var u = new luxe.utils.unifill.Utf16(s);
	return u.offsetByCodePoints(index,-codePointOffset);
};
luxe.utils.unifill.InternalEncoding.fromCodePoint = function(codePoint) {
	return luxe.utils.unifill.Utf16.fromCodePoint(codePoint).toString();
};
luxe.utils.unifill.InternalEncoding.fromCodePoints = function(codePoints) {
	return luxe.utils.unifill.Utf16.fromCodePoints(codePoints).toString();
};
luxe.utils.unifill.InternalEncoding.validate = function(s) {
	var u = new luxe.utils.unifill.Utf16(s);
	u.validate();
};
luxe.utils.unifill.InternalEncoding.isValidString = function(s) {
	try {
		luxe.utils.unifill.InternalEncoding.validate(s);
		return true;
	} catch( e ) {
		if( js.Boot.__instanceof(e,luxe.utils.unifill.Exception) ) {
			switch(e[1]) {
			case 1:
				var index = e[2];
				return false;
			default:
				throw e;
			}
		} else throw(e);
	}
};
luxe.utils.unifill.InternalEncodingIter = function(s,beginIndex,endIndex) {
	this.string = s;
	this.index = beginIndex;
	this.endIndex = endIndex;
};
$hxClasses["luxe.utils.unifill.InternalEncodingIter"] = luxe.utils.unifill.InternalEncodingIter;
luxe.utils.unifill.InternalEncodingIter.__name__ = ["luxe","utils","unifill","InternalEncodingIter"];
luxe.utils.unifill.InternalEncodingIter.prototype = {
	hasNext: function() {
		return this.index < this.endIndex;
	}
	,next: function() {
		var i = this.index;
		this.index += luxe.utils.unifill.InternalEncoding.codePointWidthAt(this.string,this.index);
		return i;
	}
	,__class__: luxe.utils.unifill.InternalEncodingIter
};
luxe.utils.unifill.Unicode = function() { };
$hxClasses["luxe.utils.unifill.Unicode"] = luxe.utils.unifill.Unicode;
luxe.utils.unifill.Unicode.__name__ = ["luxe","utils","unifill","Unicode"];
luxe.utils.unifill.Unicode.decodeSurrogate = function(hi,lo) {
	return hi - 55232 << 10 | lo & 1023;
};
luxe.utils.unifill.Unicode.encodeHighSurrogate = function(c) {
	return (c >> 10) + 55232;
};
luxe.utils.unifill.Unicode.encodeLowSurrogate = function(c) {
	return c & 1023 | 56320;
};
luxe.utils.unifill.Unicode.isScalar = function(code) {
	return 0 <= code && code <= 1114111 && !(55296 <= code && code <= 56319) && !(56320 <= code && code <= 57343);
};
luxe.utils.unifill.Unicode.isHighSurrogate = function(code) {
	return 55296 <= code && code <= 56319;
};
luxe.utils.unifill.Unicode.isLowSurrogate = function(code) {
	return 56320 <= code && code <= 57343;
};
luxe.utils.unifill.Unifill = function() { };
$hxClasses["luxe.utils.unifill.Unifill"] = luxe.utils.unifill.Unifill;
luxe.utils.unifill.Unifill.__name__ = ["luxe","utils","unifill","Unifill"];
luxe.utils.unifill.Unifill.uLength = function(s) {
	return luxe.utils.unifill.InternalEncoding.codePointCount(s,0,s.length);
};
luxe.utils.unifill.Unifill.uCharAt = function(s,index) {
	var i = luxe.utils.unifill.InternalEncoding.offsetByCodePoints(s,0,index);
	return luxe.utils.unifill.InternalEncoding.charAt(s,i);
};
luxe.utils.unifill.Unifill.uCharCodeAt = function(s,index) {
	var i = luxe.utils.unifill.InternalEncoding.offsetByCodePoints(s,0,index);
	return luxe.utils.unifill.InternalEncoding.codePointAt(s,i);
};
luxe.utils.unifill.Unifill.uCodePointAt = function(s,index) {
	return luxe.utils.unifill.Unifill.uCharCodeAt(s,index);
};
luxe.utils.unifill.Unifill.uIndexOf = function(s,value,startIndex) {
	if(startIndex == null) startIndex = 0;
	var index = s.indexOf(value,luxe.utils.unifill.InternalEncoding.offsetByCodePoints(s,0,startIndex));
	if(index >= 0) return luxe.utils.unifill.InternalEncoding.codePointCount(s,0,index); else return -1;
};
luxe.utils.unifill.Unifill.uLastIndexOf = function(s,value,startIndex) {
	if(startIndex == null) startIndex = s.length - 1;
	var index = s.lastIndexOf(value,luxe.utils.unifill.InternalEncoding.offsetByCodePoints(s,0,startIndex));
	if(index >= 0) return luxe.utils.unifill.InternalEncoding.codePointCount(s,0,index); else return -1;
};
luxe.utils.unifill.Unifill.uSplit = function(s,delimiter) {
	if(delimiter.length == 0) {
		var _g = [];
		var _g1 = new luxe.utils.unifill.InternalEncodingIter(s,0,s.length);
		while(_g1.index < _g1.endIndex) {
			var i = _g1.next();
			_g.push(luxe.utils.unifill.InternalEncoding.charAt(s,i));
		}
		return _g;
	} else return s.split(delimiter);
};
luxe.utils.unifill.Unifill.uSubstr = function(s,startIndex,length) {
	var si = luxe.utils.unifill.InternalEncoding.offsetByCodePoints(s,startIndex >= 0?0:s.length,startIndex);
	var ei;
	if(length == null) ei = s.length; else if(length < 0) ei = si; else ei = luxe.utils.unifill.InternalEncoding.offsetByCodePoints(s,si,length);
	return s.substring(si,ei);
};
luxe.utils.unifill.Unifill.uSubstring = function(s,startIndex,endIndex) {
	var si;
	if(startIndex < 0) si = 0; else si = luxe.utils.unifill.InternalEncoding.offsetByCodePoints(s,0,startIndex);
	var ei;
	if(endIndex == null) ei = s.length; else if(endIndex < 0) ei = 0; else ei = luxe.utils.unifill.InternalEncoding.offsetByCodePoints(s,0,endIndex);
	return s.substring(si,ei);
};
luxe.utils.unifill.Unifill.uIterator = function(s) {
	return new luxe.utils.unifill.CodePointIter(s);
};
luxe.utils.unifill.Unifill.uCompare = function(a,b) {
	var aiter = new luxe.utils.unifill.InternalEncodingIter(a,0,a.length);
	var biter = new luxe.utils.unifill.InternalEncodingIter(b,0,b.length);
	while(aiter.index < aiter.endIndex && biter.index < biter.endIndex) {
		var acode = luxe.utils.unifill.InternalEncoding.codePointAt(a,aiter.next());
		var bcode = luxe.utils.unifill.InternalEncoding.codePointAt(b,biter.next());
		if(acode < bcode) return -1;
		if(acode > bcode) return 1;
	}
	if(biter.index < biter.endIndex) return -1;
	if(aiter.index < aiter.endIndex) return 1;
	return 0;
};
luxe.utils.unifill.Unifill.uToString = function(codePoints) {
	return luxe.utils.unifill.Utf16.fromCodePoints(codePoints).toString();
};
luxe.utils.unifill.Utf = function() { };
$hxClasses["luxe.utils.unifill.Utf"] = luxe.utils.unifill.Utf;
luxe.utils.unifill.Utf.__name__ = ["luxe","utils","unifill","Utf"];
luxe.utils.unifill.Utf.prototype = {
	__class__: luxe.utils.unifill.Utf
};
luxe.utils.unifill.Utf16 = function(s) {
	this.str = s;
};
$hxClasses["luxe.utils.unifill.Utf16"] = luxe.utils.unifill.Utf16;
luxe.utils.unifill.Utf16.__name__ = ["luxe","utils","unifill","Utf16"];
luxe.utils.unifill.Utf16.__interfaces__ = [luxe.utils.unifill.Utf];
luxe.utils.unifill.Utf16.fromCodePoint = function(codePoint) {
	var buf = new StringBuf();
	luxe.utils.unifill._Utf16.Utf16Impl.encode_code_point(function(x) {
		buf.b += String.fromCharCode(x);
	},codePoint);
	return new luxe.utils.unifill.Utf16(buf.b);
};
luxe.utils.unifill.Utf16.fromCodePoints = function(codePoints) {
	var buf = new StringBuf();
	var $it0 = $iterator(codePoints)();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		luxe.utils.unifill._Utf16.Utf16Impl.encode_code_point(function(x) {
			buf.b += String.fromCharCode(x);
		},c);
	}
	return new luxe.utils.unifill.Utf16(buf.b);
};
luxe.utils.unifill.Utf16.fromString = function(s) {
	return new luxe.utils.unifill.Utf16(s);
};
luxe.utils.unifill.Utf16.fromArray = function(a) {
	return new luxe.utils.unifill.Utf16((function($this) {
		var $r;
		var buf = new StringBuf();
		{
			var _g = 0;
			while(_g < a.length) {
				var x = a[_g];
				++_g;
				buf.b += String.fromCharCode(x);
			}
		}
		$r = buf.b;
		return $r;
	}(this)));
};
luxe.utils.unifill.Utf16.prototype = {
	codeUnitAt: function(index) {
		return this.str.charCodeAt(index);
	}
	,codePointAt: function(index) {
		return luxe.utils.unifill._Utf16.Utf16Impl.decode_code_point(this.str.length,$bind(this,this.codeUnitAt),index);
	}
	,charAt: function(index) {
		return new luxe.utils.unifill.Utf16((function($this) {
			var $r;
			var len = $this.codePointWidthAt(index);
			$r = (function($this) {
				var $r;
				var s = HxOverrides.substr($this.str,index,len);
				$r = s;
				return $r;
			}($this));
			return $r;
		}(this)));
	}
	,codePointCount: function(beginIndex,endIndex) {
		var index = beginIndex;
		var i = 0;
		while(index < endIndex) {
			index += this.codePointWidthAt(index);
			++i;
		}
		return i;
	}
	,codePointWidthAt: function(index) {
		var c = this.str.charCodeAt(index);
		if(!(55296 <= c && c <= 56319)) return 1; else return 2;
	}
	,codePointWidthBefore: function(index) {
		return luxe.utils.unifill._Utf16.Utf16Impl.find_prev_code_point($bind(this,this.codeUnitAt),index);
	}
	,offsetByCodePoints: function(index,codePointOffset) {
		if(codePointOffset >= 0) return this.forward_offset_by_code_points(index,codePointOffset); else return this.backward_offset_by_code_points(index,-codePointOffset);
	}
	,substr: function(index,len) {
		return new luxe.utils.unifill.Utf16((function($this) {
			var $r;
			var s = HxOverrides.substr($this.str,index,len);
			$r = s;
			return $r;
		}(this)));
	}
	,validate: function() {
		var len = this.str.length;
		var accessor = $bind(this,this.codeUnitAt);
		var i = 0;
		while(i < len) {
			luxe.utils.unifill._Utf16.Utf16Impl.decode_code_point(len,accessor,i);
			i += this.codePointWidthAt(i);
		}
	}
	,toString: function() {
		return this.str;
	}
	,toArray: function() {
		var this1 = this.str;
		var i = 0;
		var len = this1.length;
		var _g = [];
		while(i < len) _g.push(StringTools.fastCodeAt(this1,i++));
		return _g;
	}
	,get_length: function() {
		return this.str.length;
	}
	,forward_offset_by_code_points: function(index,codePointOffset) {
		var len = this.str.length;
		var i = 0;
		while(i < codePointOffset && index < len) {
			index += this.codePointWidthAt(index);
			++i;
		}
		return index;
	}
	,backward_offset_by_code_points: function(index,codePointOffset) {
		var count = 0;
		while(count < codePointOffset && 0 < index) {
			index -= luxe.utils.unifill._Utf16.Utf16Impl.find_prev_code_point($bind(this,this.codeUnitAt),index);
			++count;
		}
		return index;
	}
	,__class__: luxe.utils.unifill.Utf16
	,__properties__: {get_length:"get_length"}
};
luxe.utils.unifill._Utf16 = {};
luxe.utils.unifill._Utf16.Utf16Impl = function() { };
$hxClasses["luxe.utils.unifill._Utf16.Utf16Impl"] = luxe.utils.unifill._Utf16.Utf16Impl;
luxe.utils.unifill._Utf16.Utf16Impl.__name__ = ["luxe","utils","unifill","_Utf16","Utf16Impl"];
luxe.utils.unifill._Utf16.Utf16Impl.code_point_width = function(c) {
	if(!(55296 <= c && c <= 56319)) return 1; else return 2;
};
luxe.utils.unifill._Utf16.Utf16Impl.find_prev_code_point = function(accessor,index) {
	var c = accessor(index - 1);
	if(!(56320 <= c && c <= 57343)) return 1; else return 2;
};
luxe.utils.unifill._Utf16.Utf16Impl.encode_code_point = function(addUnit,codePoint) {
	if(codePoint <= 65535) addUnit(codePoint); else {
		addUnit((codePoint >> 10) + 55232);
		addUnit(codePoint & 1023 | 56320);
	}
};
luxe.utils.unifill._Utf16.Utf16Impl.decode_code_point = function(len,accessor,index) {
	if(index < 0 || len <= index) throw luxe.utils.unifill.Exception.InvalidCodeUnitSequence(index);
	var hi = accessor(index);
	if(55296 <= hi && hi <= 56319) {
		if(index + 1 < 0 || len <= index + 1) throw luxe.utils.unifill.Exception.InvalidCodeUnitSequence(index);
		var lo = accessor(index + 1);
		if(56320 <= lo && lo <= 57343) return hi - 55232 << 10 | lo & 1023; else throw luxe.utils.unifill.Exception.InvalidCodeUnitSequence(index);
	} else if(56320 <= hi && hi <= 57343) throw luxe.utils.unifill.Exception.InvalidCodeUnitSequence(index); else return hi;
};
luxe.utils.unifill._Utf16.StringU16Buffer_Impl_ = function() { };
$hxClasses["luxe.utils.unifill._Utf16.StringU16Buffer_Impl_"] = luxe.utils.unifill._Utf16.StringU16Buffer_Impl_;
luxe.utils.unifill._Utf16.StringU16Buffer_Impl_.__name__ = ["luxe","utils","unifill","_Utf16","StringU16Buffer_Impl_"];
luxe.utils.unifill._Utf16.StringU16Buffer_Impl_._new = function() {
	return new StringBuf();
};
luxe.utils.unifill._Utf16.StringU16Buffer_Impl_.addUnit = function(this1,unit) {
	this1.b += String.fromCharCode(unit);
};
luxe.utils.unifill._Utf16.StringU16Buffer_Impl_.getStringU16 = function(this1) {
	return this1.b;
};
luxe.utils.unifill._Utf16.StringU16_Impl_ = function() { };
$hxClasses["luxe.utils.unifill._Utf16.StringU16_Impl_"] = luxe.utils.unifill._Utf16.StringU16_Impl_;
luxe.utils.unifill._Utf16.StringU16_Impl_.__name__ = ["luxe","utils","unifill","_Utf16","StringU16_Impl_"];
luxe.utils.unifill._Utf16.StringU16_Impl_.__properties__ = {get_length:"get_length"}
luxe.utils.unifill._Utf16.StringU16_Impl_.fromString = function(s) {
	return s;
};
luxe.utils.unifill._Utf16.StringU16_Impl_.ofArray = function(a) {
	var buf = new StringBuf();
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		buf.b += String.fromCharCode(x);
	}
	return buf.b;
};
luxe.utils.unifill._Utf16.StringU16_Impl_.fromArray = function(a) {
	var buf = new StringBuf();
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		buf.b += String.fromCharCode(x);
	}
	return buf.b;
};
luxe.utils.unifill._Utf16.StringU16_Impl_.codeUnitAt = function(this1,index) {
	return this1.charCodeAt(index);
};
luxe.utils.unifill._Utf16.StringU16_Impl_.substr = function(this1,index,len) {
	var s = HxOverrides.substr(this1,index,len);
	return s;
};
luxe.utils.unifill._Utf16.StringU16_Impl_.toString = function(this1) {
	return this1;
};
luxe.utils.unifill._Utf16.StringU16_Impl_.toArray = function(this1) {
	var i = 0;
	var len = this1.length;
	var _g = [];
	while(i < len) _g.push(StringTools.fastCodeAt(this1,i++));
	return _g;
};
luxe.utils.unifill._Utf16.StringU16_Impl_._new = function(s) {
	return s;
};
luxe.utils.unifill._Utf16.StringU16_Impl_.get_length = function(this1) {
	return this1.length;
};
var phoenix = {};
phoenix.BatchState = function(_r) {
	this.log = false;
	this.last_group = -1;
	this.batcher = _r;
	this.geom_state = new phoenix.geometry.GeometryState();
	this.last_geom_state = new phoenix.geometry.GeometryState();
};
$hxClasses["phoenix.BatchState"] = phoenix.BatchState;
phoenix.BatchState.__name__ = ["phoenix","BatchState"];
phoenix.BatchState.prototype = {
	active_shader: function() {
		if(this.geom_state.shader != null) return this.geom_state.shader; else if(this.geom_state.texture != null) return this.batcher.renderer.shaders.textured.shader; else return this.batcher.renderer.shaders.plain.shader;
	}
	,activate: function(batcher) {
		if(this.geom_state.dirty) {
			if(this.geom_state.texture != null) {
				if(this.last_texture_id == null) {
				}
				if(this.last_texture_id != this.geom_state.texture.id) {
					this.last_texture_id = this.geom_state.texture.id;
					if(this.geom_state.texture.loaded) {
						this.geom_state.texture.bind();
						this.geom_state.texture.activate(batcher.tex0_attribute);
					}
				}
			} else {
				Luxe.renderer.state.bindTexture2D(null);
				this.last_texture_id = null;
			}
			if(this.geom_state.shader != null) {
				if(this.last_shader_id != this.geom_state.shader.program) {
					batcher.shader_activate(this.geom_state.shader);
					this.last_shader_id = this.geom_state.shader.program;
				}
			} else if(this.geom_state.texture != null) {
				batcher.shader_activate(batcher.renderer.shaders.textured.shader);
				this.last_shader_id = batcher.renderer.shaders.textured.shader.program;
			} else {
				batcher.shader_activate(batcher.renderer.shaders.plain.shader);
				this.last_shader_id = batcher.renderer.shaders.plain.shader.program;
			}
			if(this.geom_state.group != this.last_group) {
				var previous = batcher.groups.get(this.last_group);
				if(previous != null) {
					var _g = 0;
					while(_g < previous.length) {
						var _batch_group = previous[_g];
						++_g;
						if(_batch_group.post_render != null) _batch_group.post_render(batcher);
					}
				}
				var current = batcher.groups.get(this.geom_state.group);
				if(current != null) {
					var _g1 = 0;
					while(_g1 < current.length) {
						var _batch_group1 = current[_g1];
						++_g1;
						if(_batch_group1.pre_render != null) _batch_group1.pre_render(batcher);
					}
				}
				this.last_group = this.geom_state.group;
			}
		}
		if(this.geom_state.clip) {
			if(!this.is_clipping) {
				snow.modules.opengl.web.GL.enable(3089);
				this.is_clipping = true;
			}
			if(this.clip_rect != null) {
				if(!this.clip_rect.equal(this.last_clip_rect)) {
					var _y = batcher.view.get_viewport().h - (this.clip_rect.y + this.clip_rect.h);
					snow.modules.opengl.web.GL.scissor(this.clip_rect.x | 0,_y | 0,this.clip_rect.w | 0,this.clip_rect.h | 0);
				}
			}
		} else if(this.is_clipping) {
			snow.modules.opengl.web.GL.disable(3089);
			this.is_clipping = false;
		}
		this.geom_state.clean();
	}
	,deactivate: function(batcher) {
		if(this.last_texture_id != null) Luxe.renderer.state.bindTexture2D(null);
		Luxe.renderer.state.useProgram(null);
		var previous = batcher.groups.get(this.last_group);
		if(previous != null) {
			var _g = 0;
			while(_g < previous.length) {
				var _batch_group = previous[_g];
				++_g;
				if(_batch_group.post_render != null) _batch_group.post_render(batcher);
			}
		}
		if(this.is_clipping) snow.modules.opengl.web.GL.disable(3089);
	}
	,update: function(geom) {
		this.geom_state.clone_onto(this.last_geom_state);
		this.geom_state.update(geom.state);
		if(this.geom_state.clip) {
			this.last_clip_rect = this.clip_rect;
			this.clip_rect = geom.get_clip_rect();
		}
		return this.geom_state.dirty || this.last_clip_rect != this.clip_rect;
	}
	,str: function() {
		if(!this.log) return;
		haxe.Log.trace("\t+ BATCHSTATE LAST ",{ fileName : "BatchState.hx", lineNumber : 200, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tdepth - " + this.last_geom_state.depth,{ fileName : "BatchState.hx", lineNumber : 201, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tgroup - " + this.last_geom_state.group,{ fileName : "BatchState.hx", lineNumber : 202, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\ttexture - " + (this.last_geom_state.texture == null?"null":this.last_geom_state.texture.id),{ fileName : "BatchState.hx", lineNumber : 203, className : "phoenix.BatchState", methodName : "str"});
		if(this.last_geom_state.texture != null) haxe.Log.trace("\t\t\t " + Std.string(this.last_geom_state.texture.texture),{ fileName : "BatchState.hx", lineNumber : 205, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tshader - " + (this.last_geom_state.shader == null?"null":this.last_geom_state.shader.id),{ fileName : "BatchState.hx", lineNumber : 207, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tprimitive_type - " + Std.string(this.last_geom_state.primitive_type),{ fileName : "BatchState.hx", lineNumber : 208, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tclip - " + Std.string(this.last_geom_state.clip),{ fileName : "BatchState.hx", lineNumber : 209, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t- BATCHSTATE LAST",{ fileName : "BatchState.hx", lineNumber : 210, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t+ BATCHSTATE STATE",{ fileName : "BatchState.hx", lineNumber : 212, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tdepth - " + this.geom_state.depth,{ fileName : "BatchState.hx", lineNumber : 213, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tgroup - " + this.geom_state.group,{ fileName : "BatchState.hx", lineNumber : 214, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\ttexture - " + (this.geom_state.texture == null?"null":this.geom_state.texture.id),{ fileName : "BatchState.hx", lineNumber : 215, className : "phoenix.BatchState", methodName : "str"});
		if(this.geom_state.texture != null) haxe.Log.trace("\t\t\t " + Std.string(this.geom_state.texture.texture),{ fileName : "BatchState.hx", lineNumber : 217, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tshader - " + (this.geom_state.shader == null?"null":this.geom_state.shader.id),{ fileName : "BatchState.hx", lineNumber : 219, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tprimitive_type - " + Std.string(this.geom_state.primitive_type),{ fileName : "BatchState.hx", lineNumber : 220, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t\tclip - " + Std.string(this.geom_state.clip),{ fileName : "BatchState.hx", lineNumber : 221, className : "phoenix.BatchState", methodName : "str"});
		haxe.Log.trace("\t- BATCHSTATE STATE",{ fileName : "BatchState.hx", lineNumber : 222, className : "phoenix.BatchState", methodName : "str"});
	}
	,__class__: phoenix.BatchState
};
phoenix._Batcher = {};
phoenix._Batcher.PrimitiveType_Impl_ = function() { };
$hxClasses["phoenix._Batcher.PrimitiveType_Impl_"] = phoenix._Batcher.PrimitiveType_Impl_;
phoenix._Batcher.PrimitiveType_Impl_.__name__ = ["phoenix","_Batcher","PrimitiveType_Impl_"];
phoenix._Batcher.BlendMode_Impl_ = function() { };
$hxClasses["phoenix._Batcher.BlendMode_Impl_"] = phoenix._Batcher.BlendMode_Impl_;
phoenix._Batcher.BlendMode_Impl_.__name__ = ["phoenix","_Batcher","BlendMode_Impl_"];
phoenix._Batcher.BlendEquation_Impl_ = function() { };
$hxClasses["phoenix._Batcher.BlendEquation_Impl_"] = phoenix._Batcher.BlendEquation_Impl_;
phoenix._Batcher.BlendEquation_Impl_.__name__ = ["phoenix","_Batcher","BlendEquation_Impl_"];
phoenix.BatchGroup = function(_pre,_post) {
	this.pre_render = _pre;
	this.post_render = _post;
};
$hxClasses["phoenix.BatchGroup"] = phoenix.BatchGroup;
phoenix.BatchGroup.__name__ = ["phoenix","BatchGroup"];
phoenix.BatchGroup.prototype = {
	__class__: phoenix.BatchGroup
};
phoenix.Batcher = function(_r,_name) {
	if(_name == null) _name = "";
	this.sequence = -1;
	this.name = "";
	this.log = false;
	this.visible_count = 0;
	this.static_batched_count = 0;
	this.dynamic_batched_count = 0;
	this.draw_calls = 0;
	this.color_attribute = 2;
	this.tcoord_attribute = 1;
	this.vert_attribute = 0;
	this.vert_count = 0;
	this.max_floats = 0;
	this.max_verts = 0;
	this.buffer_index = 0;
	this.buffer_count = 2;
	this.static_normal_floats = 0;
	this.static_color_floats = 0;
	this.static_tcoord_floats = 0;
	this.static_vert_floats = 0;
	this.normal_floats = 0;
	this.color_floats = 0;
	this.tcoord_floats = 0;
	this.vert_floats = 0;
	this.tree_changed = false;
	this.enabled = true;
	this.layer = 0;
	this.id = Luxe.utils.uniqueid();
	this.renderer = _r;
	this.sequence = ++phoenix.Batcher._sequence_key;
	this.geometry = new luxe.structural.BalancedBST_phoenix_geometry_GeometryKey_phoenix_geometry_Geometry($bind(this,this.geometry_compare));
	this.groups = new haxe.ds.IntMap();
	this.max_verts = Std["int"](Math.pow(2,15));
	this.max_floats = this.max_verts * 4;
	var elements = this.max_floats;
	var len = null;
	var this1;
	if(elements != null) this1 = new Float32Array(elements); else this1 = null;
	this.vertlist = this1;
	var elements1 = this.max_floats;
	var len1 = null;
	var this2;
	if(elements1 != null) this2 = new Float32Array(elements1); else this2 = null;
	this.tcoordlist = this2;
	var elements2 = this.max_floats;
	var len2 = null;
	var this3;
	if(elements2 != null) this3 = new Float32Array(elements2); else this3 = null;
	this.colorlist = this3;
	var elements3 = this.max_floats;
	var len3 = null;
	var this4;
	if(elements3 != null) this4 = new Float32Array(elements3); else this4 = null;
	this.static_vertlist = this4;
	var elements4 = this.max_floats;
	var len4 = null;
	var this5;
	if(elements4 != null) this5 = new Float32Array(elements4); else this5 = null;
	this.static_tcoordlist = this5;
	var elements5 = this.max_floats;
	var len5 = null;
	var this6;
	if(elements5 != null) this6 = new Float32Array(elements5); else this6 = null;
	this.static_colorlist = this6;
	this.view = this.renderer.camera;
	this.vertexBuffers = [];
	this.tcoordBuffers = [];
	this.vcolorBuffers = [];
	var _g1 = 0;
	var _g = this.buffer_count;
	while(_g1 < _g) {
		var i = _g1++;
		var _vb = snow.modules.opengl.web.GL.createBuffer();
		var _tb = snow.modules.opengl.web.GL.createBuffer();
		var _cb = snow.modules.opengl.web.GL.createBuffer();
		var _nb = snow.modules.opengl.web.GL.createBuffer();
		snow.modules.opengl.web.GL.bindBuffer(34962,_vb);
		snow.modules.opengl.web.GL.bufferData(34962,this.vertlist,35044);
		snow.modules.opengl.web.GL.bindBuffer(34962,_tb);
		snow.modules.opengl.web.GL.bufferData(34962,this.tcoordlist,35044);
		snow.modules.opengl.web.GL.bindBuffer(34962,_cb);
		snow.modules.opengl.web.GL.bufferData(34962,this.colorlist,35044);
		this.vertexBuffers.push(_vb);
		this.tcoordBuffers.push(_tb);
		this.vcolorBuffers.push(_cb);
	}
	snow.modules.opengl.web.GL.enableVertexAttribArray(this.vert_attribute);
	snow.modules.opengl.web.GL.enableVertexAttribArray(this.tcoord_attribute);
	snow.modules.opengl.web.GL.enableVertexAttribArray(this.color_attribute);
	if(_name.length == 0) this.name = Luxe.utils.uniqueid(); else this.name = _name;
};
$hxClasses["phoenix.Batcher"] = phoenix.Batcher;
phoenix.Batcher.__name__ = ["phoenix","Batcher"];
phoenix.Batcher.prototype = {
	set_layer: function(_layer) {
		this.layer = _layer;
		this.renderer.batchers.sort(($_=this.renderer,$bind($_,$_.sort_batchers)));
		return this.layer;
	}
	,toString: function() {
		return "Batcher(" + this.name + ")";
	}
	,compare: function(other) {
		if(this.layer == other.layer) return 0;
		if(this.layer < other.layer) return -1;
		return 1;
	}
	,add_group: function(_group,_pre_render,_post_render) {
		if(!this.groups.exists(_group)) {
			var value = new Array();
			this.groups.set(_group,value);
		}
		this.groups.get(_group).push(new phoenix.BatchGroup(_pre_render,_post_render));
	}
	,compare_rule_to_string: function(r) {
		switch(r) {
		case 0:
			return "same";
		case 1:
			return "depth <";
		case 2:
			return "depth >";
		case 3:
			return "shader <";
		case 4:
			return "shader >";
		case 5:
			return "shader s._ >";
		case 6:
			return "shader _.s <";
		case 7:
			return "texture <";
		case 8:
			return "texture >";
		case 9:
			return "texture t._ >";
		case 10:
			return "texture _.t <";
		case 11:
			return "primitive <";
		case 12:
			return "primitive >";
		case 13:
			return "unclipped";
		case 14:
			return "clipped";
		case 15:
			return "timestamp <";
		case 16:
			return "timestamp >";
		case 17:
			return "timestamp ==";
		case 18:
			return "sequence <";
		case 19:
			return "sequence >";
		case 20:
			return "fallback";
		}
		return "unknown";
	}
	,compare_rule: function(a,b) {
		if(a.uuid == b.uuid) return 0;
		if(a.depth < b.depth) return 1;
		if(a.depth > b.depth) return 2;
		if(a.shader != null && b.shader != null) {
			if(a.shader.id < b.shader.id) return 3;
			if(a.shader.id > b.shader.id) return 4;
		} else if(a.shader != null && b.shader == null) return 5; else if(a.shader == null && b.shader != null) return 6;
		if(a.texture != null && b.texture != null) {
			if(a.texture.id < b.texture.id) return 7;
			if(a.texture.id > b.texture.id) return 8;
		} else if(a.texture != null && b.texture == null) return 9; else if(a.texture == null && b.texture != null) return 10;
		var a_primitive_index = a.primitive_type;
		var b_primitive_index = b.primitive_type;
		if(a_primitive_index < b_primitive_index) return 11;
		if(a_primitive_index > b_primitive_index) return 12;
		if(a.clip != b.clip) {
			if(a.clip == false && b.clip == true) return 13; else if(a.clip == true && b.clip == false) return 14;
		}
		if(a.timestamp < b.timestamp) return 15;
		if(a.timestamp > b.timestamp) return 16;
		if(a.timestamp == b.timestamp) return 17;
		if(a.sequence < b.sequence) return 18;
		if(a.sequence > b.sequence) return 19;
		return 20;
	}
	,geometry_compare: function(a,b) {
		if(a.uuid == b.uuid) return 0;
		if(a.depth < b.depth) return -1;
		if(a.depth > b.depth) return 1;
		if(a.shader != null && b.shader != null) {
			if(a.shader.id < b.shader.id) return -1;
			if(a.shader.id > b.shader.id) return 1;
		} else if(a.shader != null && b.shader == null) return 1; else if(a.shader == null && b.shader != null) return -1;
		if(a.texture != null && b.texture != null) {
			if(a.texture.id < b.texture.id) return -1;
			if(a.texture.id > b.texture.id) return 1;
		} else if(a.texture != null && b.texture == null) return 1; else if(a.texture == null && b.texture != null) return -1;
		var a_primitive_index = a.primitive_type;
		var b_primitive_index = b.primitive_type;
		if(a_primitive_index < b_primitive_index) return -1;
		if(a_primitive_index > b_primitive_index) return 1;
		if(a.clip != b.clip) {
			if(a.clip == false && b.clip == true) return 1; else if(a.clip == true && b.clip == false) return -1;
		}
		if(a.timestamp < b.timestamp) return -1;
		if(a.timestamp >= b.timestamp) return 1;
		if(a.sequence < b.sequence) return -1;
		if(a.sequence > b.sequence) return 1;
		return 1;
	}
	,list_geometry: function() {
		var $it0 = this.geometry.iterator();
		while( $it0.hasNext() ) {
			var geom = $it0.next();
			null;
		}
	}
	,add: function(_geom,_force_add) {
		if(_force_add == null) _force_add = false;
		if(this.geometry.find(_geom.key) == null || _force_add) {
			if(!Lambda.has(_geom.batchers,this)) _geom.batchers.push(this);
			this.geometry.insert(_geom.key,_geom);
			_geom.added = true;
			this.tree_changed = true;
		} else {
		}
	}
	,empty: function(_drop) {
		if(_drop == null) _drop = true;
		if(_drop) {
			var $it0 = this.geometry.iterator();
			while( $it0.hasNext() ) {
				var geom = $it0.next();
				geom.drop(true);
				geom = null;
			}
		} else {
			var $it1 = this.geometry.iterator();
			while( $it1.hasNext() ) {
				var geom1 = $it1.next();
				this.geometry.remove(geom1.key);
			}
		}
	}
	,remove: function(_geom,_remove_batcher_from_geometry) {
		if(_remove_batcher_from_geometry == null) _remove_batcher_from_geometry = true;
		if(_remove_batcher_from_geometry) {
			HxOverrides.remove(_geom.batchers,this);
			if(_geom.batchers.length == 0) _geom.added = false;
		}
		var countbefore = this.geometry.size();
		this.geometry.remove(_geom.key);
		var countafter = this.geometry.size();
		if(countbefore == countafter) {
		}
		this.tree_changed = true;
	}
	,shader_activate: function(_shader) {
		_shader.activate();
		this.projectionmatrix_attribute = _shader.projectionmatrix_attribute;
		this.modelviewmatrix_attribute = _shader.modelviewmatrix_attribute;
		this.tex0_attribute = _shader.tex0_attribute;
		this.tex1_attribute = _shader.tex1_attribute;
		this.tex2_attribute = _shader.tex2_attribute;
		this.tex3_attribute = _shader.tex3_attribute;
		this.tex4_attribute = _shader.tex4_attribute;
		this.tex5_attribute = _shader.tex5_attribute;
		this.tex6_attribute = _shader.tex6_attribute;
		this.tex7_attribute = _shader.tex7_attribute;
		_shader.apply_uniforms();
		Luxe.renderer.state.activeTexture(33984);
	}
	,batch: function(persist_immediate) {
		if(persist_immediate == null) persist_immediate = false;
		this.dynamic_batched_count = 0;
		this.static_batched_count = 0;
		this.visible_count = 0;
		this.vert_floats = 0;
		this.tcoord_floats = 0;
		this.color_floats = 0;
		this.normal_floats = 0;
		this.state = new phoenix.BatchState(this);
		var geom = null;
		var $it0 = this.geometry.iterator();
		while( $it0.hasNext() ) {
			var _geom = $it0.next();
			geom = _geom;
			if(geom != null && !geom.dropped) {
				if(this.state.update(geom)) {
					if(this.vert_floats > 0) this.submit_current_vertex_list(this.state.last_geom_state.primitive_type);
				}
				this.state.activate(this);
				if(geom.visible) {
					this.visible_count++;
					if(geom.get_locked()) {
						this.submit_static_geometry(geom);
						this.vert_count += geom.vertices.length;
					} else if(geom.get_primitive_type() == 3 || geom.get_primitive_type() == 2 || geom.get_primitive_type() == 5 || geom.get_primitive_type() == 6) {
						this.geometry_batch(geom);
						this.submit_current_vertex_list(geom.get_primitive_type());
						this.vert_count += geom.vertices.length;
					} else {
						this.geometry_batch(geom);
						this.dynamic_batched_count++;
						this.vert_count += geom.vertices.length;
					}
					if(!persist_immediate && geom.immediate) geom.drop();
				}
			} else {
			}
		}
		if(this.vert_floats > 0 && geom != null) {
			this.state.update(geom);
			this.state.activate(this);
			this.submit_current_vertex_list(this.state.last_geom_state.primitive_type);
		}
		this.state.deactivate(this);
		this.state = null;
	}
	,draw: function(persist_immediate) {
		if(persist_immediate == null) persist_immediate = false;
		this.draw_calls = 0;
		this.vert_count = 0;
		this.view.process();
		this.renderer.state.viewport(this.view.get_viewport().x,this.view.get_viewport().y,this.view.get_viewport().w,this.view.get_viewport().h);
		this.batch(persist_immediate);
	}
	,submit_static_geometry: function(geom) {
		if(geom.vertices.length == 0) return;
		this.static_vert_floats = 0;
		this.static_tcoord_floats = 0;
		this.static_color_floats = 0;
		if(!geom.submitted || geom.get_dirty()) this.geometry_batch_static(geom); else {
			this.static_vert_floats = geom.vertices.length * 4;
			this.static_tcoord_floats = geom.vertices.length * 4;
			this.static_color_floats = geom.vertices.length * 4;
		}
		if(geom.static_vertex_buffer == null) {
			geom.static_vertex_buffer = snow.modules.opengl.web.GL.createBuffer();
			geom.static_tcoord_buffer = snow.modules.opengl.web.GL.createBuffer();
			geom.static_vcolor_buffer = snow.modules.opengl.web.GL.createBuffer();
		}
		this._enable_attributes();
		snow.modules.opengl.web.GL.bindBuffer(34962,geom.static_vertex_buffer);
		snow.modules.opengl.web.GL.vertexAttribPointer(this.vert_attribute,4,5126,false,0,0);
		if(!geom.submitted || geom.get_dirty()) snow.modules.opengl.web.GL.bufferData(34962,this.static_vertlist,35044);
		snow.modules.opengl.web.GL.bindBuffer(34962,geom.static_tcoord_buffer);
		snow.modules.opengl.web.GL.vertexAttribPointer(this.tcoord_attribute,4,5126,false,0,0);
		if(!geom.submitted || geom.get_dirty()) snow.modules.opengl.web.GL.bufferData(34962,this.static_tcoordlist,35044);
		snow.modules.opengl.web.GL.bindBuffer(34962,geom.static_vcolor_buffer);
		snow.modules.opengl.web.GL.vertexAttribPointer(this.color_attribute,4,5126,false,0,0);
		if(!geom.submitted || geom.get_dirty()) snow.modules.opengl.web.GL.bufferData(34962,this.static_colorlist,35044);
		snow.modules.opengl.web.GL.drawArrays(geom.get_primitive_type(),0,phoenix.utils.Rendering.get_elements_for_type(geom.get_primitive_type(),this.static_vert_floats));
		this._disable_attributes();
		this.draw_calls++;
		this.static_batched_count++;
		this.static_vert_floats = 0;
		this.static_tcoord_floats = 0;
		this.static_color_floats = 0;
		geom.set_dirty(false);
		geom.submitted = true;
	}
	,submit_current_vertex_list: function(type) {
		if(this.vert_floats == 0) return;
		if(this.vert_floats > this.max_floats) throw "uh oh, somehow too many floats are being submitted (max:$max_floats, attempt:$vert_floats).";
		this._enable_attributes();
		snow.modules.opengl.web.GL.bindBuffer(34962,this.vertexBuffers[this.buffer_index]);
		snow.modules.opengl.web.GL.vertexAttribPointer(0,4,5126,false,0,0);
		snow.modules.opengl.web.GL.bufferSubData(34962,0,(function($this) {
			var $r;
			var buffer = $this.vertlist.buffer;
			var len = $this.vert_floats;
			var this1;
			if(buffer != null) {
				if(len == null) {
					len = undefined;
				} else len = len;
				this1 = new Float32Array(buffer,0,len);
			} else this1 = null;
			$r = this1;
			return $r;
		}(this)));
		snow.modules.opengl.web.GL.bindBuffer(34962,this.tcoordBuffers[this.buffer_index]);
		snow.modules.opengl.web.GL.vertexAttribPointer(1,4,5126,false,0,0);
		snow.modules.opengl.web.GL.bufferSubData(34962,0,(function($this) {
			var $r;
			var buffer1 = $this.tcoordlist.buffer;
			var len1 = $this.tcoord_floats;
			var this2;
			if(buffer1 != null) {
				if(len1 == null) {
					len1 = undefined;
				} else len1 = len1;
				this2 = new Float32Array(buffer1,0,len1);
			} else this2 = null;
			$r = this2;
			return $r;
		}(this)));
		snow.modules.opengl.web.GL.bindBuffer(34962,this.vcolorBuffers[this.buffer_index]);
		snow.modules.opengl.web.GL.vertexAttribPointer(2,4,5126,false,0,0);
		snow.modules.opengl.web.GL.bufferSubData(34962,0,(function($this) {
			var $r;
			var buffer2 = $this.colorlist.buffer;
			var len2 = $this.color_floats;
			var this3;
			if(buffer2 != null) {
				if(len2 == null) {
					len2 = undefined;
				} else len2 = len2;
				this3 = new Float32Array(buffer2,0,len2);
			} else this3 = null;
			$r = this3;
			return $r;
		}(this)));
		snow.modules.opengl.web.GL.drawArrays(type,0,phoenix.utils.Rendering.get_elements_for_type(type,this.vert_floats));
		this._disable_attributes();
		this.buffer_index++;
		if(this.buffer_index >= this.buffer_count) this.buffer_index = 0;
		this.vert_floats = 0;
		this.tcoord_floats = 0;
		this.color_floats = 0;
		this.normal_floats = 0;
		this.draw_calls++;
	}
	,geometry_batch: function(geom) {
		var _count_after = geom.vertices.length + this.vert_floats / 4;
		if(_count_after > this.max_verts) this.submit_current_vertex_list(geom.get_primitive_type());
		geom.batch(this.vert_floats,this.tcoord_floats,this.color_floats,this.normal_floats,this.vertlist,this.tcoordlist,this.colorlist,this.normallist);
		this.vert_floats += geom.vertices.length * 4;
		this.tcoord_floats += geom.vertices.length * 4;
		this.color_floats += geom.vertices.length * 4;
	}
	,geometry_batch_static: function(geom) {
		geom.batch(this.static_vert_floats,this.static_tcoord_floats,this.static_color_floats,this.static_normal_floats,this.static_vertlist,this.static_tcoordlist,this.static_colorlist,this.static_normallist);
		this.static_vert_floats += geom.vertices.length * 4;
		this.static_tcoord_floats += geom.vertices.length * 4;
		this.static_color_floats += geom.vertices.length * 4;
	}
	,_enable_attributes: function() {
		snow.modules.opengl.web.GL.uniformMatrix4fv(this.projectionmatrix_attribute,false,this.view.projection_float32array);
		snow.modules.opengl.web.GL.uniformMatrix4fv(this.modelviewmatrix_attribute,false,this.view.view_inverse_float32array);
	}
	,_disable_attributes: function() {
	}
	,__class__: phoenix.Batcher
	,__properties__: {set_layer:"set_layer"}
};
phoenix._BitmapFont = {};
phoenix._BitmapFont.TextAlign_Impl_ = function() { };
$hxClasses["phoenix._BitmapFont.TextAlign_Impl_"] = phoenix._BitmapFont.TextAlign_Impl_;
phoenix._BitmapFont.TextAlign_Impl_.__name__ = ["phoenix","_BitmapFont","TextAlign_Impl_"];
phoenix.BitmapFont = function(_options) {
	this.items_total = 0;
	this.items_loaded = 0;
	this.loaded = false;
	if(_options == null) this.options = { id : "font." + Luxe.utils.uniqueid()}; else this.options = _options;
	this.id = this.options.id;
	this.default_options();
	luxe.resource.Resource.call(this,this.options.resources,7);
	this.pages = new haxe.ds.IntMap();
};
$hxClasses["phoenix.BitmapFont"] = phoenix.BitmapFont;
phoenix.BitmapFont.__name__ = ["phoenix","BitmapFont"];
phoenix.BitmapFont.load = function(_options) {
	if(_options == null || _options.id == null) throw "BitmapFont: `load` cannot work without a file id to load from.";
	if(_options.silent == null) _options.silent = false;
	var font = new phoenix.BitmapFont(_options);
	Luxe.loadText(font.id,function(font_data) {
		font.from_string(font_data.text,font.options.onload,null,font.options.silent);
		font.options.resources.cache(font);
	});
	return font;
};
phoenix.BitmapFont.__super__ = luxe.resource.Resource;
phoenix.BitmapFont.prototype = $extend(luxe.resource.Resource.prototype,{
	from_string: function(_bitmapfont_data,_onload,_custom_pages,_silent) {
		if(_silent == null) _silent = false;
		if(_onload != null) this.onload = _onload;
		this.info = phoenix._BitmapFont.Parser.parse(_bitmapfont_data);
		if(this.info.char_count == 0 || this.info.pages.length == 0 && _custom_pages.length == 0) {
			haxe.Log.trace("i / bitmapfont / " + ("error / " + this.id + " / invalid font data specified for this font, cannot load. This font will not be valid."),{ fileName : "BitmapFont.hx", lineNumber : 116, className : "phoenix.BitmapFont", methodName : "from_string"});
			this.do_onload(false);
			return;
		}
		this.space_char = this.info.chars.get(32);
		this.load_pages(_custom_pages);
		if(HxOverrides.indexOf(phoenix.BitmapFont.generic_names,this.id,0) != -1) {
			var _warning = "warning / font loaded with a generic or no name as \"" + this.id + "\". ";
			_warning += "This could lead to bugs or confusion, or not being able to retrieve the font ";
			_warning += "later from the resources.";
			haxe.Log.trace("i / bitmapfont / " + _warning,{ fileName : "BitmapFont.hx", lineNumber : 130, className : "phoenix.BitmapFont", methodName : "from_string"});
		}
	}
	,kerning: function(_first,_second) {
		var _map = this.info.kernings.get(_first);
		if(_map != null && _map.exists(_second)) return _map.get(_second);
		return 0;
	}
	,wrap_string_to_bounds: function(_string,_bounds,_point_size,_letter_spc) {
		if(_letter_spc == null) _letter_spc = 0.0;
		if(_point_size == null) _point_size = 1.0;
		var _g = this;
		if(_bounds == null) return _string;
		var _cur_x = 0.0;
		var _idx = 0;
		var _final_str = "";
		var _spacew = _g.width_of(" ",_point_size,_letter_spc,null);
		var _strings = _string.split(" ");
		var _count = _strings.length;
		var _g1 = 0;
		while(_g1 < _strings.length) {
			var _str = _strings[_g1];
			++_g1;
			if(luxe.utils.unifill.Unifill.uIndexOf(_str,"\n",null) == -1) {
				if(_str == "") _str = " ";
				var _w = _g.width_of(_str,_point_size,_letter_spc,null);
				if(_cur_x + _w > _bounds.w) {
					_cur_x = 0;
					_final_str += "\n";
				}
				_cur_x += _w;
				_final_str += _str;
			} else {
				var _widx = 0;
				var _words = _str.split("\n");
				var _g11 = 0;
				while(_g11 < _words.length) {
					var _word = _words[_g11];
					++_g11;
					if(_word != "") {
						var _w1 = _g.width_of(_word,_point_size,_letter_spc,null);
						if(_cur_x + _w1 > _bounds.w) {
							_cur_x = 0;
							_final_str += "\n";
						}
						_cur_x += _w1;
						_final_str += _word;
					} else _cur_x = 0;
					if(_widx < _words.length - 1) {
						_final_str += "\n";
						_cur_x = 0;
					}
					_widx++;
				}
			}
			if(_idx < _count - 1) {
				_final_str += " ";
				_cur_x += _spacew + _letter_spc;
			}
			_idx++;
		}
		return _final_str;
	}
	,width_of_line: function(_string,_point_size,_letter_spc) {
		if(_letter_spc == null) _letter_spc = 0.0;
		if(_point_size == null) _point_size = 1.0;
		var _cur_x = 0.0;
		var _cur_w = 0.0;
		var _ratio = _point_size / this.info.point_size;
		var i = 0;
		var _len = luxe.utils.unifill.InternalEncoding.codePointCount(_string,0,_string.length);
		var $it0 = new luxe.utils.unifill.CodePointIter(_string);
		while( $it0.hasNext() ) {
			var _uglyph = $it0.next();
			var _index = _uglyph;
			var _char = this.info.chars.get(_index);
			if(_char == null) _char = this.space_char;
			var _cw = (_char.xoffset + Math.max(_char.width,_char.xadvance)) * _ratio;
			var _cx = _cur_x + _char.xoffset * _ratio;
			var _spacing = _char.xadvance;
			if(i < _len - 1) {
				var _next_index = luxe.utils.unifill.Unifill.uCharCodeAt(_string,i + 1);
				_spacing += this.kerning(_index,_next_index);
				if(_next_index >= 32) _spacing += _letter_spc;
			}
			_cur_x += _spacing * _ratio;
			_cur_w = Math.max(_cur_w,_cx + _cw);
			++i;
		}
		return _cur_w;
	}
	,width_of: function(_string,_point_size,_letter_spc,_line_widths) {
		if(_letter_spc == null) _letter_spc = 0.0;
		if(_point_size == null) _point_size = 1.0;
		var _max_w = 0.0;
		var _push_widths = _line_widths != null;
		var _lines = luxe.utils.unifill.Unifill.uSplit(_string,"\n");
		var _g = 0;
		while(_g < _lines.length) {
			var _line = _lines[_g];
			++_g;
			var _cur_w = this.width_of_line(_line,_point_size,_letter_spc);
			_max_w = Math.max(_max_w,_cur_w);
			if(_push_widths) _line_widths.push(_cur_w);
		}
		return _max_w;
	}
	,height_of: function(_string,_point_size,_line_spc) {
		if(_line_spc == null) _line_spc = 0.0;
		return this.height_of_lines(_string.split("\n"),_point_size,_line_spc);
	}
	,dimensions_of: function(_string,_point_size,_into,_letter_spc,_line_spc) {
		if(_line_spc == null) _line_spc = 0.0;
		if(_letter_spc == null) _letter_spc = 0.0;
		var _width = this.width_of(_string,_point_size,_letter_spc,null);
		var _height = this.height_of_lines(_string.split("\n"),_point_size,_line_spc);
		return _into.set_xy(_width,_height);
	}
	,height_of_lines: function(_lines,_point_size,_line_spc) {
		if(_line_spc == null) _line_spc = 0.0;
		var _ratio = _point_size / this.info.point_size;
		return _lines.length * ((this.info.line_height + _line_spc) * _ratio);
	}
	,default_options: function() {
		if(this.options.id == null) this.options.id = this.id;
		if(this.options.resources == null) this.options.resources = Luxe.resources;
		if(this.options.mipmaps == null) this.options.mipmaps = false;
		if(this.options.filter == null) this.options.filter = phoenix.FilterType.linear;
		if(this.options.filter_min == null) this.options.filter_min = phoenix.FilterType.linear;
		if(this.options.filter_mag == null) this.options.filter_mag = phoenix.FilterType.linear;
	}
	,do_onload: function(success) {
		if(success == null) success = true;
		this.loaded = success;
		if(this.onload != null) this.onload(this);
	}
	,page_loaded: function(t) {
		this.items_loaded++;
		if(this.items_loaded == this.items_total) this.do_onload();
	}
	,load_pages: function(_custom_pages) {
		var _g2 = this;
		var _path;
		if(this.options.texture_path == null) _path = haxe.io.Path.directory(this.id); else _path = this.options.texture_path;
		if(_custom_pages == null) {
			this.items_total = Lambda.count(this.info.pages);
			var _g = 0;
			var _g1 = this.info.pages;
			while(_g < _g1.length) {
				var _page = [_g1[_g]];
				++_g;
				var _page_path = haxe.io.Path.join([_path,_page[0].file]);
				var _t = [Luxe.loadTexture(_page_path,null,this.options.silent)];
				if(_t[0] != null) _t[0].set_onload((function(_t,_page) {
					return function(_) {
						_g2.pages.set(_page[0].id,_t[0]);
						_t[0].slot = _page[0].id;
						_t[0].set_filter(_g2.options.filter);
						_t[0].set_filter_min(_g2.options.filter_min);
						_t[0].set_filter_mag(_g2.options.filter_mag);
						if(_g2.options.mipmaps) _t[0].generate_mipmaps();
						_g2.page_loaded(_t[0]);
					};
				})(_t,_page)); else throw "BitmapFont: \"" + this.id + " (" + this.info.face + ")\" specified a page \"" + _page[0].file + "\" with a missing texture at " + _page_path;
			}
		} else {
			this.items_total = _custom_pages.length;
			var _id = 0;
			var _g3 = 0;
			while(_g3 < _custom_pages.length) {
				var _page1 = _custom_pages[_g3];
				++_g3;
				_page1.slot = _id;
				this.pages.set(_id,_page1);
				++_id;
			}
			this.do_onload();
		}
	}
	,draw_text: function(opt) {
		if(opt.batcher == null) opt.batcher = Luxe.renderer.batcher;
		opt.font = this;
		return new phoenix.geometry.TextGeometry(opt);
	}
	,toString: function() {
		return "BitmapFont(" + this.id + ")";
	}
	,__class__: phoenix.BitmapFont
});
phoenix._BitmapFont.Parser = function() { };
$hxClasses["phoenix._BitmapFont.Parser"] = phoenix._BitmapFont.Parser;
phoenix._BitmapFont.Parser.__name__ = ["phoenix","_BitmapFont","Parser"];
phoenix._BitmapFont.Parser.parse = function(_font_data) {
	if(_font_data.length == 0) throw "BitmapFont:Parser: _font_data is 0 length";
	var _info = { face : null, chars : new haxe.ds.IntMap(), point_size : 0, base_size : 0, char_count : 0, line_height : 0, pages : [], kernings : new haxe.ds.IntMap()};
	var _lines = _font_data.split("\n");
	if(_lines.length == 0) throw "BitmapFont; invalid font data specified for parser.";
	var _first = _lines[0];
	if((function($this) {
		var $r;
		var _this = StringTools.ltrim(_first);
		$r = HxOverrides.substr(_this,0,4);
		return $r;
	}(this)) != "info") throw "BitmapFont; invalid font data specified for parser. Format should be plain ascii text .fnt file only currently.";
	var _g = 0;
	while(_g < _lines.length) {
		var _line = _lines[_g];
		++_g;
		var _tokens = _line.split(" ");
		var _g1 = 0;
		while(_g1 < _tokens.length) {
			var _current = _tokens[_g1];
			++_g1;
			phoenix._BitmapFont.Parser.parse_token(_current,_tokens,_info);
		}
	}
	return _info;
};
phoenix._BitmapFont.Parser.parse_token = function(_token,_tokens,_info) {
	_tokens.shift();
	var _items = phoenix._BitmapFont.Parser.tokenize_line(_tokens);
	switch(_token) {
	case "info":
		_info.face = phoenix._BitmapFont.Parser.unquote(_items.get("face"));
		_info.point_size = Std.parseFloat(_items.get("size"));
		break;
	case "common":
		_info.line_height = Std.parseFloat(_items.get("lineHeight"));
		_info.base_size = Std.parseFloat(_items.get("base"));
		break;
	case "page":
		_info.pages.push({ id : Std.parseInt(_items.get("id")), file : phoenix._BitmapFont.Parser.trim(phoenix._BitmapFont.Parser.unquote(_items.get("file")))});
		break;
	case "chars":
		_info.char_count = Std.parseInt(_items.get("count"));
		break;
	case "char":
		var _char = { id : Std.parseInt(_items.get("id")), x : Std.parseFloat(_items.get("x")), y : Std.parseFloat(_items.get("y")), width : Std.parseFloat(_items.get("width")), height : Std.parseFloat(_items.get("height")), xoffset : Std.parseFloat(_items.get("xoffset")), yoffset : Std.parseFloat(_items.get("yoffset")), xadvance : Std.parseFloat(_items.get("xadvance")), page : Std.parseInt(_items.get("page"))};
		_info.chars.set(_char.id,_char);
		break;
	case "kerning":
		var _first = Std.parseInt(_items.get("first"));
		var _second = Std.parseInt(_items.get("second"));
		var _amount = Std.parseFloat(_items.get("amount"));
		var _map = _info.kernings.get(_first);
		if(_map == null) {
			_map = new haxe.ds.IntMap();
			_info.kernings.set(_first,_map);
		}
		_map.set(_second,_amount);
		break;
	default:
	}
};
phoenix._BitmapFont.Parser.tokenize_line = function(_tokens) {
	var _item_map = new haxe.ds.StringMap();
	var _g = 0;
	while(_g < _tokens.length) {
		var _token = _tokens[_g];
		++_g;
		var _items = _token.split("=");
		_item_map.set(_items[0],_items[1]);
	}
	return _item_map;
};
phoenix._BitmapFont.Parser.trim = function(_s) {
	return StringTools.trim(_s);
};
phoenix._BitmapFont.Parser.unquote = function(_s) {
	if(_s.indexOf("\"") != -1) _s = StringTools.replace(_s,"\"","");
	return _s;
};
phoenix.ProjectionType = $hxClasses["phoenix.ProjectionType"] = { __ename__ : ["phoenix","ProjectionType"], __constructs__ : ["ortho","perspective","custom"] };
phoenix.ProjectionType.ortho = ["ortho",0];
phoenix.ProjectionType.ortho.toString = $estr;
phoenix.ProjectionType.ortho.__enum__ = phoenix.ProjectionType;
phoenix.ProjectionType.perspective = ["perspective",1];
phoenix.ProjectionType.perspective.toString = $estr;
phoenix.ProjectionType.perspective.__enum__ = phoenix.ProjectionType;
phoenix.ProjectionType.custom = ["custom",2];
phoenix.ProjectionType.custom.toString = $estr;
phoenix.ProjectionType.custom.__enum__ = phoenix.ProjectionType;
phoenix.Camera = function(_options) {
	this._refresh_pos = false;
	this._setup = true;
	this.look_at_dirty = true;
	this.projection_dirty = true;
	this.transform_dirty = true;
	this.minimum_zoom = 0.01;
	this.aspect = 1.5;
	this.fov_type = phoenix.FOVType.horizontal;
	this.fov = 60;
	this.far = -1000;
	this.near = 1000;
	this.zoom = 1.0;
	this.name = "camera";
	this.transform = new phoenix.Transform();
	this.options = _options;
	if(this.options == null) this.options = this.default_camera_options();
	if(this.options.camera_name != null) this.name = this.options.camera_name;
	if(this.options.projection != null) this.projection = this.options.projection; else this.projection = phoenix.ProjectionType.ortho;
	this.set_center(new phoenix.Vector(Luxe.core.screen.w / 2,Luxe.core.screen.h / 2));
	this.set_pos(new phoenix.Vector());
	if(this.options.viewport != null) this.set_viewport(this.options.viewport); else this.set_viewport(new phoenix.Rectangle(0,0,Luxe.core.screen.w,Luxe.core.screen.h));
	this.up = new phoenix.Vector(0,1,0);
	this.projection_matrix = new phoenix.Matrix();
	this.view_matrix = new phoenix.Matrix();
	this.view_matrix_inverse = new phoenix.Matrix();
	this.look_at_matrix = new phoenix.Matrix();
	this.transform.listen($bind(this,this.on_transform_cleaned));
	this.apply_default_camera_options();
	var _g = this.projection;
	switch(_g[1]) {
	case 0:
		this.set_ortho(this.options);
		break;
	case 1:
		this.set_perspective(this.options);
		break;
	case 2:
		break;
	}
	this._setup = false;
};
$hxClasses["phoenix.Camera"] = phoenix.Camera;
phoenix.Camera.__name__ = ["phoenix","Camera"];
phoenix.Camera.prototype = {
	set_ortho: function(_options) {
		this.projection = phoenix.ProjectionType.ortho;
		this._merge_options(_options);
	}
	,set_perspective: function(_options) {
		this.projection = phoenix.ProjectionType.perspective;
		this._merge_options(_options);
		this.transform.origin.set_xyz(0,0,0);
	}
	,project: function(_vector) {
		this.update_view_matrix();
		var _transform = new phoenix.Matrix().multiplyMatrices(this.projection_matrix,this.view_matrix_inverse);
		return new phoenix.Vector(_vector.x,_vector.y,_vector.z,_vector.w).applyProjection(_transform);
	}
	,unproject: function(_vector) {
		this.update_view_matrix();
		var _inverted = new phoenix.Matrix().multiplyMatrices(this.projection_matrix,this.view_matrix_inverse);
		return new phoenix.Vector(_vector.x,_vector.y,_vector.z,_vector.w).applyProjection(_inverted.getInverse(_inverted));
	}
	,screen_point_to_ray: function(_vector) {
		return new phoenix.Ray(_vector,this);
	}
	,screen_point_to_world: function(_vector) {
		if(this.projection == phoenix.ProjectionType.ortho) return this.ortho_screen_to_world(_vector); else if(this.projection == phoenix.ProjectionType.perspective) return this.screen_point_to_ray(_vector).end;
		return this.ortho_screen_to_world(_vector);
	}
	,world_point_to_screen: function(_vector,_viewport) {
		if(this.projection == phoenix.ProjectionType.ortho) return this.ortho_world_to_screen(_vector); else if(this.projection == phoenix.ProjectionType.perspective) return this.persepective_world_to_screen(_vector,_viewport);
		return this.ortho_world_to_screen(_vector);
	}
	,process: function() {
		if(this.target != null) this.update_look_at();
		this.update_projection_matrix();
		this.update_view_matrix();
		this.apply_state(2884,this.options.cull_backfaces);
		this.apply_state(2929,this.options.depth_test);
	}
	,on_transform_cleaned: function(t) {
		this.transform_dirty = true;
	}
	,update_look_at: function() {
		if(this.look_at_dirty && this.target != null) {
			this.look_at_matrix.lookAt(this.target,this.get_pos(),this.up);
			this.get_rotation().setFromRotationMatrix(this.look_at_matrix);
		}
	}
	,update_view_matrix: function() {
		this.view_matrix = this.transform.get_world().get_matrix();
		if(!this.transform_dirty) return;
		this.view_matrix_inverse = this.view_matrix.inverse();
		this.view_inverse_float32array = this.view_matrix_inverse.float32array();
		this.transform_dirty = false;
	}
	,update_projection_matrix: function() {
		if(!this.projection_dirty) return;
		var _g = this.projection;
		switch(_g[1]) {
		case 1:
			this.projection_matrix.makePerspective(this.fov_y,this.aspect,this.near,this.far);
			break;
		case 0:
			this.projection_matrix.makeOrthographic(0,this.get_viewport().w,0,this.get_viewport().h,this.near,this.far);
			break;
		case 2:
			break;
		}
		this.projection_float32array = this.projection_matrix.float32array();
		this.projection_dirty = false;
	}
	,apply_state: function(state,value) {
		if(value) Luxe.renderer.state.enable(state); else Luxe.renderer.state.disable(state);
	}
	,apply_default_camera_options: function() {
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			this.options.cull_backfaces = false;
			this.options.depth_test = false;
			break;
		case 1:
			this.options.cull_backfaces = true;
			this.options.depth_test = true;
			break;
		case 2:
			break;
		}
	}
	,default_camera_options: function() {
		return { projection : phoenix.ProjectionType.ortho, depth_test : false, cull_backfaces : false, near : 1000, far : -1000};
	}
	,ortho_screen_to_world: function(_vector) {
		this.update_view_matrix();
		return new phoenix.Vector(_vector.x,_vector.y,_vector.z,_vector.w).transform(this.view_matrix);
	}
	,ortho_world_to_screen: function(_vector) {
		this.update_view_matrix();
		return new phoenix.Vector(_vector.x,_vector.y,_vector.z,_vector.w).transform(this.view_matrix_inverse);
	}
	,persepective_world_to_screen: function(_vector,_viewport) {
		if(_viewport == null) _viewport = this.get_viewport();
		var _projected = this.project(_vector);
		var width_half = _viewport.w / 2;
		var height_half = _viewport.h / 2;
		return new phoenix.Vector(_projected.x * width_half + width_half,-(_projected.y * height_half) + height_half);
	}
	,set_target: function(_target) {
		if(_target != null) this.look_at_dirty = true;
		return this.target = _target;
	}
	,set_fov: function(_fov) {
		this.projection_dirty = true;
		this.options.fov = _fov;
		if(this.fov_type == phoenix.FOVType.horizontal) this.fov_y = 180 / Math.PI * (2 * Math.atan(Math.tan(_fov * (Math.PI / 180) / 2) * (1 / this.aspect))); else this.fov_y = _fov;
		return this.fov = _fov;
	}
	,set_fov_type: function(_fov_type) {
		this.options.fov_type = _fov_type;
		this.fov_type = _fov_type;
		this.set_fov(this.fov);
		return this.fov_type;
	}
	,set_aspect: function(_aspect) {
		this.projection_dirty = true;
		this.options.aspect = _aspect;
		return this.aspect = _aspect;
	}
	,set_near: function(_near) {
		this.projection_dirty = true;
		this.options.near = _near;
		return this.near = _near;
	}
	,set_far: function(_far) {
		this.projection_dirty = true;
		this.options.far = _far;
		return this.far = _far;
	}
	,set_zoom: function(_z) {
		var _new_zoom = _z;
		if(_new_zoom < this.minimum_zoom) _new_zoom = this.minimum_zoom;
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			this.transform.local.scale.set_x(1 / _new_zoom);
			this.transform.local.scale.set_y(1 / _new_zoom);
			this.transform.local.scale.set_z(1 / _new_zoom);
			break;
		case 1:
			break;
		case 2:
			break;
		}
		return this.zoom = _new_zoom;
	}
	,set_center: function(_p) {
		this.center = _p;
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			if(!this._refresh_pos && !this._setup) {
				this.get_pos().ignore_listeners = true;
				this.get_pos().set_x(_p.x - this.get_viewport().w / 2);
				this.get_pos().set_y(_p.y - this.get_viewport().h / 2);
				this.get_pos().ignore_listeners = false;
			}
			break;
		case 1:
			break;
		case 2:
			break;
		}
		phoenix.Vector.Listen(this.get_center(),$bind(this,this._center_changed));
		return this.get_center();
	}
	,get_center: function() {
		return this.center;
	}
	,get_pos: function() {
		return this.pos;
	}
	,get_rotation: function() {
		return this.transform.local.rotation;
	}
	,get_scale: function() {
		return this.transform.local.scale;
	}
	,get_viewport: function() {
		return this.viewport;
	}
	,set_viewport: function(_r) {
		this.projection_dirty = true;
		this.viewport = _r;
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			this.transform.set_origin(new phoenix.Vector(_r.w / 2,_r.h / 2));
			this.set_pos(this.get_pos());
			break;
		case 1:
			break;
		case 2:
			break;
		}
		return this.get_viewport();
	}
	,set_rotation: function(_q) {
		return this.transform.local.set_rotation(_q);
	}
	,set_scale: function(_s) {
		return this.transform.local.set_scale(_s);
	}
	,set_pos: function(_p) {
		this.pos = _p;
		var _g = this.projection;
		switch(_g[1]) {
		case 0:
			var _cx = this.get_center().x;
			var _cy = this.get_center().y;
			if(this.get_viewport() != null) {
				_cx = _p.x + this.get_viewport().w / 2;
				_cy = _p.y + this.get_viewport().h / 2;
			}
			this._refresh_pos = true;
			this.get_center().ignore_listeners = true;
			this.get_center().set_x(_cx);
			this.get_center().set_y(_cy);
			this.get_center().ignore_listeners = false;
			this._refresh_pos = false;
			this.transform.local.pos.set_x(_cx);
			this.transform.local.pos.set_y(_cy);
			break;
		case 1:
			this.transform.set_pos(this.get_pos());
			break;
		case 2:
			break;
		}
		phoenix.Vector.Listen(this.get_pos(),$bind(this,this._pos_changed));
		return this.get_pos();
	}
	,_merge_options: function(_options) {
		if(_options.aspect != null) {
			this.options.aspect = _options.aspect;
			this.set_aspect(this.options.aspect);
		}
		if(_options.far != null) {
			this.options.far = _options.far;
			this.set_far(this.options.far);
		}
		if(_options.fov != null) {
			this.options.fov = _options.fov;
			this.set_fov(this.options.fov);
		}
		if(_options.fov_type != null) {
			this.options.fov_type = _options.fov_type;
			this.set_fov_type(_options.fov_type);
		} else {
			this.options.fov_type = phoenix.FOVType.horizontal;
			this.set_fov_type(phoenix.FOVType.horizontal);
		}
		if(_options.near != null) {
			this.options.near = _options.near;
			this.set_near(this.options.near);
		}
		if(_options.viewport != null) {
			this.options.viewport = _options.viewport;
			this.set_viewport(this.options.viewport);
		}
		this.apply_default_camera_options();
		if(_options.cull_backfaces != null) this.options.cull_backfaces = _options.cull_backfaces;
		if(_options.depth_test != null) this.options.depth_test = _options.depth_test;
	}
	,_pos_changed: function(v) {
		this.set_pos(this.get_pos());
	}
	,_center_changed: function(v) {
		this.set_center(this.get_center());
	}
	,__class__: phoenix.Camera
	,__properties__: {set_rotation:"set_rotation",get_rotation:"get_rotation",set_scale:"set_scale",get_scale:"get_scale",set_pos:"set_pos",get_pos:"get_pos",set_target:"set_target",set_aspect:"set_aspect",set_fov_type:"set_fov_type",set_fov:"set_fov",set_far:"set_far",set_near:"set_near",set_zoom:"set_zoom",set_center:"set_center",get_center:"get_center",set_viewport:"set_viewport",get_viewport:"get_viewport"}
};
phoenix.FOVType = $hxClasses["phoenix.FOVType"] = { __ename__ : ["phoenix","FOVType"], __constructs__ : ["vertical","horizontal"] };
phoenix.FOVType.vertical = ["vertical",0];
phoenix.FOVType.vertical.toString = $estr;
phoenix.FOVType.vertical.__enum__ = phoenix.FOVType;
phoenix.FOVType.horizontal = ["horizontal",1];
phoenix.FOVType.horizontal.toString = $estr;
phoenix.FOVType.horizontal.__enum__ = phoenix.FOVType;
phoenix.Circle = function(_x,_y,_r) {
	if(_r == null) _r = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this.x = _x;
	this.y = _y;
	this.r = _r;
};
$hxClasses["phoenix.Circle"] = phoenix.Circle;
phoenix.Circle.__name__ = ["phoenix","Circle"];
phoenix.Circle.prototype = {
	toString: function() {
		return "{ x:" + this.x + ", y:" + this.y + ", r:" + this.r + " }";
	}
	,point_inside: function(_p) {
		var diff = new phoenix.Vector(_p.x - this.x,_p.y - this.y);
		return Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z) <= this.r;
	}
	,clone: function() {
		return new phoenix.Circle(this.x,this.y,this.r);
	}
	,set: function(_x,_y,_r) {
		var _setx = this.x;
		var _sety = this.y;
		var _setr = this.r;
		if(_x != null) _setx = _x;
		if(_y != null) _sety = _y;
		if(_r != null) _setr = _r;
		this.x = _setx;
		this.y = _sety;
		this.r = _setr;
		return this;
	}
	,__class__: phoenix.Circle
};
phoenix.Color = function(_r,_g,_b,_a) {
	if(_a == null) _a = 1.0;
	if(_b == null) _b = 1.0;
	if(_g == null) _g = 1.0;
	if(_r == null) _r = 1.0;
	this.refreshing = false;
	this.is_hsv = false;
	this.is_hsl = false;
	this.a = 1.0;
	this.b = 1.0;
	this.g = 1.0;
	this.r = 1.0;
	this.set_r(_r);
	this.set_g(_g);
	this.set_b(_b);
	this.a = _a;
};
$hxClasses["phoenix.Color"] = phoenix.Color;
phoenix.Color.__name__ = ["phoenix","Color"];
phoenix.Color.random = function(_include_alpha) {
	if(_include_alpha == null) _include_alpha = false;
	return new phoenix.Color(Math.random(),Math.random(),Math.random(),_include_alpha?Math.random():1.0);
};
phoenix.Color.prototype = {
	set_r: function(_r) {
		this.r = _r;
		if(!this.refreshing) {
			if(this.is_hsl) {
				var colorhsl = this;
				colorhsl.fromColor(this);
			} else if(this.is_hsv) {
				var colorhsv = this;
				colorhsv.fromColor(this);
			}
		}
		return this.r;
	}
	,set_g: function(_g) {
		this.g = _g;
		if(!this.refreshing) {
			if(this.is_hsl) {
				var colorhsl = this;
				colorhsl.fromColor(this);
			} else if(this.is_hsv) {
				var colorhsv = this;
				colorhsv.fromColor(this);
			}
		}
		return this.g;
	}
	,set_b: function(_b) {
		this.b = _b;
		if(!this.refreshing) {
			if(this.is_hsl) {
				var colorhsl = this;
				colorhsl.fromColor(this);
			} else if(this.is_hsv) {
				var colorhsv = this;
				colorhsv.fromColor(this);
			}
		}
		return this.b;
	}
	,set: function(_r,_g,_b,_a) {
		var _setr = this.r;
		var _setg = this.g;
		var _setb = this.b;
		var _seta = this.a;
		if(_r != null) _setr = _r;
		if(_g != null) _setg = _g;
		if(_b != null) _setb = _b;
		if(_a != null) _seta = _a;
		this.set_r(_setr);
		this.set_g(_setg);
		this.set_b(_setb);
		this.a = _seta;
		return this;
	}
	,maxRGB: function() {
		return Math.max(this.r,Math.max(this.g,this.b));
	}
	,minRGB: function() {
		return Math.min(this.r,Math.min(this.g,this.b));
	}
	,tween: function(_time_in_seconds,_properties_to_tween,_override) {
		if(_override == null) _override = true;
		if(_time_in_seconds == null) _time_in_seconds = 0.5;
		if(_properties_to_tween != null) {
			var _dest_r = this.r;
			var _dest_g = this.g;
			var _dest_b = this.b;
			var _dest_a = this.a;
			var _change_r = false;
			var _change_g = false;
			var _change_b = false;
			var _change_a = false;
			if(js.Boot.__instanceof(_properties_to_tween,phoenix.Color)) {
				_dest_r = _properties_to_tween.r;
				_dest_g = _properties_to_tween.g;
				_dest_b = _properties_to_tween.b;
				_dest_a = _properties_to_tween.a;
				_change_r = true;
				_change_g = true;
				_change_b = true;
				_change_a = true;
			} else {
				if(_properties_to_tween.r != null) {
					_dest_r = _properties_to_tween.r;
					_change_r = true;
				}
				if(_properties_to_tween.g != null) {
					_dest_g = _properties_to_tween.g;
					_change_g = true;
				}
				if(_properties_to_tween.b != null) {
					_dest_b = _properties_to_tween.b;
					_change_b = true;
				}
				if(_properties_to_tween.a != null) {
					_dest_a = _properties_to_tween.a;
					_change_a = true;
				}
			}
			var _properties = { };
			if(_change_r) _properties.r = _dest_r;
			if(_change_g) _properties.g = _dest_g;
			if(_change_b) _properties.b = _dest_b;
			if(_change_a) _properties.a = _dest_a;
			return luxe.tween.Actuate.tween(this,_time_in_seconds,_properties,_override);
		} else throw " Warning: Color.tween passed a null destination ";
	}
	,clone: function() {
		return new phoenix.Color(this.r,this.g,this.b,this.a);
	}
	,rgb: function(_rgb) {
		if(_rgb == null) _rgb = 16777215;
		this.from_int(_rgb);
		return this;
	}
	,toColorHSL: function() {
		return new phoenix.ColorHSL().fromColor(this);
	}
	,toColorHSV: function() {
		return new phoenix.ColorHSV().fromColor(this);
	}
	,fromColorHSV: function(_color_hsv) {
		var d = _color_hsv.h % 360 / 60;
		if(d < 0) d += 6;
		var hf = Math.floor(d);
		var hi = hf % 6;
		var f = d - hf;
		var v = _color_hsv.v;
		var p = _color_hsv.v * (1 - _color_hsv.s);
		var q = _color_hsv.v * (1 - f * _color_hsv.s);
		var t = _color_hsv.v * (1 - (1 - f) * _color_hsv.s);
		switch(hi) {
		case 0:
			this.set_r(v);
			this.set_g(t);
			this.set_b(p);
			break;
		case 1:
			this.set_r(q);
			this.set_g(v);
			this.set_b(p);
			break;
		case 2:
			this.set_r(p);
			this.set_g(v);
			this.set_b(t);
			break;
		case 3:
			this.set_r(p);
			this.set_g(q);
			this.set_b(v);
			break;
		case 4:
			this.set_r(t);
			this.set_g(p);
			this.set_b(v);
			break;
		case 5:
			this.set_r(v);
			this.set_g(p);
			this.set_b(q);
			break;
		}
		this.a = _color_hsv.a;
	}
	,fromColorHSL: function(_color_hsl) {
		var q = 1;
		if(_color_hsl.l < 0.5) q = _color_hsl.l * (1 + _color_hsl.s); else q = _color_hsl.l + _color_hsl.s - _color_hsl.l * _color_hsl.s;
		var p = 2 * _color_hsl.l - q;
		var hk = _color_hsl.h % 360 / 360;
		var tr = hk + 0.333333333333333315;
		var tg = hk;
		var tb = hk - 0.333333333333333315;
		var tc = [tr,tg,tb];
		var _g1 = 0;
		var _g = tc.length;
		while(_g1 < _g) {
			var n = _g1++;
			var t = tc[n];
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 0.166666666666666657) tc[n] = p + (q - p) * 6 * t; else if(t < 0.5) tc[n] = q; else if(t < 0.66666666666666663) tc[n] = p + (q - p) * 6 * (0.66666666666666663 - t); else tc[n] = p;
		}
		this.set_r(tc[0]);
		this.set_g(tc[1]);
		this.set_b(tc[2]);
		this.a = _color_hsl.a;
		return this;
	}
	,toString: function() {
		return "{ r:" + this.r + " , g:" + this.g + " , b:" + this.b + " , a:" + this.a + " }";
	}
	,from_int: function(_i) {
		var _r = _i >> 16;
		var _g = _i >> 8 & 255;
		var _b = _i & 255;
		this.set_r(_r / 255);
		this.set_g(_g / 255);
		this.set_b(_b / 255);
	}
	,__class__: phoenix.Color
	,__properties__: {set_b:"set_b",set_g:"set_g",set_r:"set_r"}
};
phoenix.ColorHSL = function(_h,_s,_l,_a) {
	if(_a == null) _a = 1.0;
	if(_l == null) _l = 1.0;
	if(_s == null) _s = 1.0;
	if(_h == null) _h = 0.0;
	this.l = 1.0;
	this.s = 1.0;
	this.h = 0.0;
	phoenix.Color.call(this);
	this.is_hsl = true;
	this.set_h(_h);
	this.set_s(_s);
	this.set_l(_l);
	this.a = _a;
	this._refresh();
};
$hxClasses["phoenix.ColorHSL"] = phoenix.ColorHSL;
phoenix.ColorHSL.__name__ = ["phoenix","ColorHSL"];
phoenix.ColorHSL.__super__ = phoenix.Color;
phoenix.ColorHSL.prototype = $extend(phoenix.Color.prototype,{
	set_h: function(_h) {
		this.h = _h;
		this._refresh();
		return _h;
	}
	,set_s: function(_s) {
		this.s = _s;
		this._refresh();
		return _s;
	}
	,set_l: function(_l) {
		this.l = _l;
		this._refresh();
		return _l;
	}
	,set: function(_h,_s,_l,_a) {
		var _seth = this.h;
		var _sets = this.s;
		var _setl = this.l;
		var _seta = this.a;
		if(_h != null) _seth = _h;
		if(_s != null) _sets = _s;
		if(_l != null) _setl = _l;
		if(_a != null) _seta = _a;
		this.set_h(_seth);
		this.set_s(_sets);
		this.set_l(_setl);
		this.a = _seta;
		this._refresh();
		return this;
	}
	,tween: function(_time_in_seconds,_dest,_override) {
		if(_override == null) _override = true;
		if(_time_in_seconds == null) _time_in_seconds = 0.5;
		phoenix.Color.prototype.tween.call(this,_time_in_seconds,_dest,_override);
		if(_dest != null) {
			var _dest_h = this.h;
			var _dest_s = this.s;
			var _dest_l = this.l;
			var _dest_a = this.a;
			var _change_h = false;
			var _change_s = false;
			var _change_l = false;
			var _change_a = false;
			if(js.Boot.__instanceof(_dest,phoenix.ColorHSL)) {
				_dest_h = _dest.h;
				_dest_s = _dest.s;
				_dest_l = _dest.l;
				_dest_a = _dest.a;
				_change_h = true;
				_change_s = true;
				_change_l = true;
				_change_a = true;
			} else {
				if(_dest.h != null) {
					_dest_h = _dest.h;
					_change_h = true;
				}
				if(_dest.s != null) {
					_dest_s = _dest.s;
					_change_s = true;
				}
				if(_dest.l != null) {
					_dest_l = _dest.l;
					_change_l = true;
				}
				if(_dest.a != null) {
					_dest_a = _dest.a;
					_change_a = true;
				}
			}
			var _properties = { };
			if(_change_h) _properties.h = _dest_h;
			if(_change_s) _properties.s = _dest_s;
			if(_change_l) _properties.l = _dest_l;
			if(_change_a) _properties.a = _dest_a;
			return luxe.tween.Actuate.tween(this,_time_in_seconds,_properties,_override);
		} else throw " Warning: Color.tween passed a null destination ";
	}
	,_refresh: function() {
		this.refreshing = true;
		phoenix.Color.prototype.fromColorHSL.call(this,this);
		this.refreshing = false;
		return this;
	}
	,clone: function() {
		return new phoenix.ColorHSL(this.h,this.s,this.l,this.a);
	}
	,toColor: function() {
		return this._refresh();
	}
	,fromColor: function(_color) {
		var max = _color.maxRGB();
		var min = _color.minRGB();
		var add = max + min;
		var sub = max - min;
		var _h = 0;
		if(max == min) _h = 0; else if(max == _color.r) _h = (60 * (_color.g - _color.b) / sub + 360) % 360; else if(max == _color.g) _h = 60 * (_color.b - _color.r) / sub + 120; else if(max == _color.b) _h = 60 * (_color.r - _color.g) / sub + 240;
		var _l = add / 2;
		var _s;
		if(max == min) _s = 0; else if(this.l <= 0.5) _s = sub / add; else _s = sub / (2 - add);
		this.set_h(_h);
		this.set_s(_s);
		this.set_l(_l);
		this.a = _color.a;
		return this;
	}
	,toString: function() {
		return "{ h:" + this.h + " , s:" + this.s + " , l:" + this.l + " , a:" + this.a + " }";
	}
	,__class__: phoenix.ColorHSL
	,__properties__: $extend(phoenix.Color.prototype.__properties__,{set_l:"set_l",set_s:"set_s",set_h:"set_h"})
});
phoenix.ColorHSV = function(_h,_s,_v,_a) {
	if(_a == null) _a = 1.0;
	if(_v == null) _v = 1.0;
	if(_s == null) _s = 0.0;
	if(_h == null) _h = 0.0;
	this.v = 1.0;
	this.s = 0.0;
	this.h = 0.0;
	phoenix.Color.call(this);
	this.is_hsv = true;
	this.set_h(_h);
	this.set_s(_s);
	this.set_v(_v);
	this.a = _a;
	this._refresh();
};
$hxClasses["phoenix.ColorHSV"] = phoenix.ColorHSV;
phoenix.ColorHSV.__name__ = ["phoenix","ColorHSV"];
phoenix.ColorHSV.__super__ = phoenix.Color;
phoenix.ColorHSV.prototype = $extend(phoenix.Color.prototype,{
	set_h: function(_h) {
		this.h = _h;
		this._refresh();
		return _h;
	}
	,set_s: function(_s) {
		this.s = _s;
		this._refresh();
		return this.s;
	}
	,set_v: function(_v) {
		this.v = _v;
		this._refresh();
		return this.v;
	}
	,set: function(_h,_s,_v,_a) {
		var _seth = this.h;
		var _sets = this.s;
		var _setv = this.v;
		var _seta = this.a;
		if(_h != null) _seth = _h;
		if(_s != null) _sets = _s;
		if(_v != null) _setv = _v;
		if(_a != null) _seta = _a;
		this.set_h(_seth);
		this.set_s(_sets);
		this.set_v(_setv);
		this.a = _seta;
		this._refresh();
		return this;
	}
	,tween: function(_time_in_seconds,_dest,_override) {
		if(_override == null) _override = true;
		if(_time_in_seconds == null) _time_in_seconds = 0.5;
		phoenix.Color.prototype.tween.call(this,_time_in_seconds,_dest,_override);
		if(_dest != null) {
			var _dest_h = this.h;
			var _dest_s = this.s;
			var _dest_v = this.v;
			var _dest_a = this.a;
			var _change_h = false;
			var _change_s = false;
			var _change_v = false;
			var _change_a = false;
			if(js.Boot.__instanceof(_dest,phoenix.ColorHSV)) {
				_dest_h = _dest.h;
				_dest_s = _dest.s;
				_dest_v = _dest.v;
				_dest_a = _dest.a;
				_change_h = true;
				_change_s = true;
				_change_v = true;
				_change_a = true;
			} else {
				if(_dest.h != null) {
					_dest_h = _dest.h;
					_change_h = true;
				}
				if(_dest.s != null) {
					_dest_s = _dest.s;
					_change_s = true;
				}
				if(_dest.v != null) {
					_dest_v = _dest.v;
					_change_v = true;
				}
				if(_dest.a != null) {
					_dest_a = _dest.a;
					_change_a = true;
				}
			}
			var _properties = { };
			if(_change_h) _properties.h = _dest_h;
			if(_change_s) _properties.s = _dest_s;
			if(_change_v) _properties.v = _dest_v;
			if(_change_a) _properties.a = _dest_a;
			return luxe.tween.Actuate.tween(this,_time_in_seconds,_properties,_override);
		} else throw " Warning: Color.tween passed a null destination ";
	}
	,_refresh: function() {
		this.refreshing = true;
		phoenix.Color.prototype.fromColorHSV.call(this,this);
		this.refreshing = false;
		return this;
	}
	,clone: function() {
		return new phoenix.ColorHSV(this.h,this.s,this.v,this.a);
	}
	,toColor: function() {
		return this._refresh();
	}
	,toColorHSL: function() {
		this._refresh();
		return phoenix.Color.prototype.toColorHSL.call(this);
	}
	,fromColorHSL: function(_color_hsl) {
		_color_hsl._refresh();
		return this.fromColor(_color_hsl);
	}
	,fromColor: function(_color) {
		var max = _color.maxRGB();
		var min = _color.minRGB();
		var add = max + min;
		var sub = max - min;
		var _h = 0;
		if(max == min) _h = 0; else if(max == _color.r) _h = (60 * (_color.g - _color.b) / sub + 360) % 360; else if(max == _color.g) _h = 60 * (_color.b - _color.r) / sub + 120; else if(max == _color.b) _h = 60 * (_color.r - _color.g) / sub + 240;
		var _s;
		if(max == 0) _s = 0; else _s = 1 - min / max;
		this.set_h(_h);
		this.set_s(_s);
		this.set_v(max);
		this.a = _color.a;
		return this;
	}
	,toString: function() {
		return "{ h:" + this.h + " , s:" + this.s + " , v:" + this.v + " , a:" + this.a + " }";
	}
	,__class__: phoenix.ColorHSV
	,__properties__: $extend(phoenix.Color.prototype.__properties__,{set_v:"set_v",set_s:"set_s",set_h:"set_h"})
});
phoenix.MatrixTransform = function(p,r,s) {
	this.pos = p;
	this.rotation = r;
	this.scale = s;
};
$hxClasses["phoenix.MatrixTransform"] = phoenix.MatrixTransform;
phoenix.MatrixTransform.__name__ = ["phoenix","MatrixTransform"];
phoenix.MatrixTransform.prototype = {
	destroy: function() {
		this.pos = null;
		this.rotation = null;
		this.scale = null;
	}
	,__class__: phoenix.MatrixTransform
};
phoenix.Matrix = function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
	if(n44 == null) n44 = 1;
	if(n43 == null) n43 = 0;
	if(n42 == null) n42 = 0;
	if(n41 == null) n41 = 0;
	if(n34 == null) n34 = 0;
	if(n33 == null) n33 = 1;
	if(n32 == null) n32 = 0;
	if(n31 == null) n31 = 0;
	if(n24 == null) n24 = 0;
	if(n23 == null) n23 = 0;
	if(n22 == null) n22 = 1;
	if(n21 == null) n21 = 0;
	if(n14 == null) n14 = 0;
	if(n13 == null) n13 = 0;
	if(n12 == null) n12 = 0;
	if(n11 == null) n11 = 1;
	this.M44 = 1;
	this.M34 = 0;
	this.M24 = 0;
	this.M14 = 0;
	this.M43 = 0;
	this.M33 = 1;
	this.M23 = 0;
	this.M13 = 0;
	this.M42 = 0;
	this.M32 = 0;
	this.M22 = 1;
	this.M12 = 0;
	this.M41 = 0;
	this.M31 = 0;
	this.M21 = 0;
	this.M11 = 1;
	this.elements = new Array();
	var i = 0;
	while(i++ < 16) this.elements.push(0.0);
	this.set(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44);
	var array = this.elements;
	var len = null;
	var this1;
	if(array != null) this1 = new Float32Array(array); else this1 = null;
	this._float32array = this1;
};
$hxClasses["phoenix.Matrix"] = phoenix.Matrix;
phoenix.Matrix.__name__ = ["phoenix","Matrix"];
phoenix.Matrix.prototype = {
	set: function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
		var e = this.elements;
		e[0] = n11;
		e[4] = n12;
		e[8] = n13;
		e[12] = n14;
		e[1] = n21;
		e[5] = n22;
		e[9] = n23;
		e[13] = n24;
		e[2] = n31;
		e[6] = n32;
		e[10] = n33;
		e[14] = n34;
		e[3] = n41;
		e[7] = n42;
		e[11] = n43;
		e[15] = n44;
		return this;
	}
	,toString: function() {
		var e = this.elements;
		var str = "{ 11:" + luxe.utils.Maths.fixed(e[0],3) + ", 12:" + luxe.utils.Maths.fixed(e[4],3) + ", 13:" + luxe.utils.Maths.fixed(e[8],3) + ", 14:" + luxe.utils.Maths.fixed(e[12],3) + " }, " + "{ 21:" + luxe.utils.Maths.fixed(e[1],3) + ", 22:" + luxe.utils.Maths.fixed(e[5],3) + ", 23:" + luxe.utils.Maths.fixed(e[9],3) + ", 24:" + luxe.utils.Maths.fixed(e[13],3) + " }, " + "{ 31:" + luxe.utils.Maths.fixed(e[2],3) + ", 32:" + luxe.utils.Maths.fixed(e[6],3) + ", 33:" + luxe.utils.Maths.fixed(e[10],3) + ", 34:" + luxe.utils.Maths.fixed(e[14],3) + " }, " + "{ 41:" + luxe.utils.Maths.fixed(e[3],3) + ", 42:" + luxe.utils.Maths.fixed(e[7],3) + ", 43:" + luxe.utils.Maths.fixed(e[11],3) + ", 44:" + luxe.utils.Maths.fixed(e[15],3) + " }";
		return str;
	}
	,get_M11: function() {
		return this.elements[0];
	}
	,get_M12: function() {
		return this.elements[1];
	}
	,get_M13: function() {
		return this.elements[2];
	}
	,get_M14: function() {
		return this.elements[3];
	}
	,get_M21: function() {
		return this.elements[4];
	}
	,get_M22: function() {
		return this.elements[5];
	}
	,get_M23: function() {
		return this.elements[6];
	}
	,get_M24: function() {
		return this.elements[7];
	}
	,get_M31: function() {
		return this.elements[8];
	}
	,get_M32: function() {
		return this.elements[9];
	}
	,get_M33: function() {
		return this.elements[10];
	}
	,get_M34: function() {
		return this.elements[11];
	}
	,get_M41: function() {
		return this.elements[12];
	}
	,get_M42: function() {
		return this.elements[13];
	}
	,get_M43: function() {
		return this.elements[14];
	}
	,get_M44: function() {
		return this.elements[15];
	}
	,set_M11: function(_value) {
		this.elements[0] = _value;
		return _value;
	}
	,set_M12: function(_value) {
		this.elements[1] = _value;
		return _value;
	}
	,set_M13: function(_value) {
		this.elements[2] = _value;
		return _value;
	}
	,set_M14: function(_value) {
		this.elements[3] = _value;
		return _value;
	}
	,set_M21: function(_value) {
		this.elements[4] = _value;
		return _value;
	}
	,set_M22: function(_value) {
		this.elements[5] = _value;
		return _value;
	}
	,set_M23: function(_value) {
		this.elements[6] = _value;
		return _value;
	}
	,set_M24: function(_value) {
		this.elements[7] = _value;
		return _value;
	}
	,set_M31: function(_value) {
		this.elements[8] = _value;
		return _value;
	}
	,set_M32: function(_value) {
		this.elements[9] = _value;
		return _value;
	}
	,set_M33: function(_value) {
		this.elements[10] = _value;
		return _value;
	}
	,set_M34: function(_value) {
		this.elements[11] = _value;
		return _value;
	}
	,set_M41: function(_value) {
		this.elements[12] = _value;
		return _value;
	}
	,set_M42: function(_value) {
		this.elements[13] = _value;
		return _value;
	}
	,set_M43: function(_value) {
		this.elements[14] = _value;
		return _value;
	}
	,set_M44: function(_value) {
		this.elements[15] = _value;
		return _value;
	}
	,float32array: function() {
		var array = this.elements;
		var len = null;
		var this1;
		if(array != null) this1 = new Float32Array(array); else this1 = null;
		return this1;
	}
	,identity: function() {
		this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		return this;
	}
	,copy: function(m) {
		var me = m.elements;
		this.set(me[0],me[4],me[8],me[12],me[1],me[5],me[9],me[13],me[2],me[6],me[10],me[14],me[3],me[7],me[11],me[15]);
		return this;
	}
	,make2D: function(_x,_y,_scale,_rotation) {
		if(_rotation == null) _rotation = 0;
		if(_scale == null) _scale = 1;
		var theta = _rotation * 0.0174532925199432781;
		var c = Math.cos(theta);
		var s = Math.sin(theta);
		this.set(c * _scale,s * _scale,0,_x,-s * _scale,c * _scale,0,_y,0,0,1,0,0,0,0,1);
		return this;
	}
	,copyPosition: function(m) {
		this.elements[12] = m.elements[12];
		this.elements[13] = m.elements[13];
		this.elements[14] = m.elements[14];
		return this;
	}
	,getPosition: function() {
		return new phoenix.Vector(this.elements[12],this.elements[13],this.elements[14],1);
	}
	,extractRotation: function(m) {
		var _temp = new phoenix.Vector();
		var me = m.elements;
		var _scale_x = 1 / _temp.set_xyz(me[0],me[1],me[2]).get_length();
		var _scale_y = 1 / _temp.set_xyz(me[4],me[5],me[6]).get_length();
		var _scale_z = 1 / _temp.set_xyz(me[8],me[9],me[10]).get_length();
		this.elements[0] = me[0] * _scale_x;
		this.elements[1] = me[1] * _scale_x;
		this.elements[2] = me[2] * _scale_x;
		this.elements[4] = me[4] * _scale_y;
		this.elements[5] = me[5] * _scale_y;
		this.elements[6] = me[6] * _scale_y;
		this.elements[8] = me[8] * _scale_z;
		this.elements[9] = me[9] * _scale_z;
		this.elements[10] = me[10] * _scale_z;
		return this;
	}
	,makeRotationFromEuler: function(_v,_order) {
		if(_order == null) _order = 0;
		var te = this.elements;
		var x = _v.x;
		var y = _v.y;
		var z = _v.z;
		var a = Math.cos(x);
		var b = Math.sin(x);
		var c = Math.cos(y);
		var d = Math.sin(y);
		var e = Math.cos(z);
		var f = Math.sin(z);
		if(_order == 0) {
			var ae = a * e;
			var af = a * f;
			var be = b * e;
			var bf = b * f;
			te[0] = c * e;
			te[4] = -c * f;
			te[8] = d;
			te[1] = af + be * d;
			te[5] = ae - bf * d;
			te[9] = -b * c;
			te[2] = bf - ae * d;
			te[6] = be + af * d;
			te[10] = a * c;
		} else if(_order == 1) {
			var ce = c * e;
			var cf = c * f;
			var de = d * e;
			var df = d * f;
			te[0] = ce + df * b;
			te[4] = de * b - cf;
			te[8] = a * d;
			te[1] = a * f;
			te[5] = a * e;
			te[9] = -b;
			te[2] = cf * b - de;
			te[6] = df + ce * b;
			te[10] = a * c;
		} else if(_order == 2) {
			var ce1 = c * e;
			var cf1 = c * f;
			var de1 = d * e;
			var df1 = d * f;
			te[0] = ce1 - df1 * b;
			te[4] = -a * f;
			te[8] = de1 + cf1 * b;
			te[1] = cf1 + de1 * b;
			te[5] = a * e;
			te[9] = df1 - ce1 * b;
			te[2] = -a * d;
			te[6] = b;
			te[10] = a * c;
		} else if(_order == 3) {
			var ae1 = a * e;
			var af1 = a * f;
			var be1 = b * e;
			var bf1 = b * f;
			te[0] = c * e;
			te[4] = be1 * d - af1;
			te[8] = ae1 * d + bf1;
			te[1] = c * f;
			te[5] = bf1 * d + ae1;
			te[9] = af1 * d - be1;
			te[2] = -d;
			te[6] = b * c;
			te[10] = a * c;
		} else if(_order == 4) {
			var ac = a * c;
			var ad = a * d;
			var bc = b * c;
			var bd = b * d;
			te[0] = c * e;
			te[4] = bd - ac * f;
			te[8] = bc * f + ad;
			te[1] = f;
			te[5] = a * e;
			te[9] = -b * e;
			te[2] = -d * e;
			te[6] = ad * f + bc;
			te[10] = ac - bd * f;
		} else if(_order == 5) {
			var ac1 = a * c;
			var ad1 = a * d;
			var bc1 = b * c;
			var bd1 = b * d;
			te[0] = c * e;
			te[4] = -f;
			te[8] = d * e;
			te[1] = ac1 * f + bd1;
			te[5] = a * e;
			te[9] = ad1 * f - bc1;
			te[2] = bc1 * f - ad1;
			te[6] = b * e;
			te[10] = bd1 * f + ac1;
		}
		te[3] = 0;
		te[7] = 0;
		te[11] = 0;
		te[12] = 0;
		te[13] = 0;
		te[14] = 0;
		te[15] = 1;
		return this;
	}
	,makeRotationFromQuaternion: function(q) {
		var te = this.elements;
		var x2 = q.x + q.x;
		var y2 = q.y + q.y;
		var z2 = q.z + q.z;
		var xx = q.x * x2;
		var xy = q.x * y2;
		var xz = q.x * z2;
		var yy = q.y * y2;
		var yz = q.y * z2;
		var zz = q.z * z2;
		var wx = q.w * x2;
		var wy = q.w * y2;
		var wz = q.w * z2;
		te[0] = 1 - (yy + zz);
		te[4] = xy - wz;
		te[8] = xz + wy;
		te[1] = xy + wz;
		te[5] = 1 - (xx + zz);
		te[9] = yz - wx;
		te[2] = xz - wy;
		te[6] = yz + wx;
		te[10] = 1 - (xx + yy);
		te[3] = 0;
		te[7] = 0;
		te[11] = 0;
		te[12] = 0;
		te[13] = 0;
		te[14] = 0;
		te[15] = 1;
		return this;
	}
	,lookAt: function(_eye,_target,_up) {
		var _x = new phoenix.Vector();
		var _y = new phoenix.Vector();
		var _z = new phoenix.Vector();
		var te = this.elements;
		_z = new phoenix.Vector(_target.x - _eye.x,_target.y - _eye.y,_target.z - _eye.z).get_normalized();
		if(Math.sqrt(_z.x * _z.x + _z.y * _z.y + _z.z * _z.z) == 0) {
			_z.z = 1;
			if(_z._construct) _z.z; else {
				if(_z.listen_z != null && !_z.ignore_listeners) _z.listen_z(1);
				_z.z;
			}
		}
		_x = new phoenix.Vector(_up.y * _z.z - _up.z * _z.y,_up.z * _z.x - _up.x * _z.z,_up.x * _z.y - _up.y * _z.x).get_normalized();
		if(Math.sqrt(_x.x * _x.x + _x.y * _x.y + _x.z * _x.z) == 0) {
			var _g = _z;
			_g.set_x(_g.x + 0.0001);
			_x = new phoenix.Vector(_up.y * _z.z - _up.z * _z.y,_up.z * _z.x - _up.x * _z.z,_up.x * _z.y - _up.y * _z.x).get_normalized();
		}
		_y = new phoenix.Vector(_z.y * _x.z - _z.z * _x.y,_z.z * _x.x - _z.x * _x.z,_z.x * _x.y - _z.y * _x.x);
		te[0] = _x.x;
		te[4] = _y.x;
		te[8] = _z.x;
		te[1] = _x.y;
		te[5] = _y.y;
		te[9] = _z.y;
		te[2] = _x.z;
		te[6] = _y.z;
		te[10] = _z.z;
		return this;
	}
	,multiply: function(_m) {
		return this.multiplyMatrices(this,_m);
	}
	,multiplyMatrices: function(_a,_b) {
		var ae = _a.elements;
		var be = _b.elements;
		var te = this.elements;
		var a11 = ae[0];
		var a12 = ae[4];
		var a13 = ae[8];
		var a14 = ae[12];
		var a21 = ae[1];
		var a22 = ae[5];
		var a23 = ae[9];
		var a24 = ae[13];
		var a31 = ae[2];
		var a32 = ae[6];
		var a33 = ae[10];
		var a34 = ae[14];
		var a41 = ae[3];
		var a42 = ae[7];
		var a43 = ae[11];
		var a44 = ae[15];
		var b11 = be[0];
		var b12 = be[4];
		var b13 = be[8];
		var b14 = be[12];
		var b21 = be[1];
		var b22 = be[5];
		var b23 = be[9];
		var b24 = be[13];
		var b31 = be[2];
		var b32 = be[6];
		var b33 = be[10];
		var b34 = be[14];
		var b41 = be[3];
		var b42 = be[7];
		var b43 = be[11];
		var b44 = be[15];
		te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
		te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
		te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
		te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
		return this;
	}
	,multiplyToArray: function(_a,_b,_r) {
		var te = this.elements;
		this.multiplyMatrices(_a,_b);
		_r[0] = te[0];
		_r[1] = te[1];
		_r[2] = te[2];
		_r[3] = te[3];
		_r[4] = te[4];
		_r[5] = te[5];
		_r[6] = te[6];
		_r[7] = te[7];
		_r[8] = te[8];
		_r[9] = te[9];
		_r[10] = te[10];
		_r[11] = te[11];
		_r[12] = te[12];
		_r[13] = te[13];
		_r[14] = te[14];
		_r[15] = te[15];
		return this;
	}
	,multiplyScalar: function(_s) {
		var te = this.elements;
		te[0] *= _s;
		te[4] *= _s;
		te[8] *= _s;
		te[12] *= _s;
		te[1] *= _s;
		te[5] *= _s;
		te[9] *= _s;
		te[13] *= _s;
		te[2] *= _s;
		te[6] *= _s;
		te[10] *= _s;
		te[14] *= _s;
		te[3] *= _s;
		te[7] *= _s;
		te[11] *= _s;
		te[15] *= _s;
		return this;
	}
	,multiplyVector3Array: function(_a) {
		var v1 = new phoenix.Vector();
		var i = 0;
		var il = _a.length;
		while(i < il) {
			v1.set_x(_a[i]);
			v1.set_y(_a[i + 1]);
			v1.set_z(_a[i + 2]);
			v1.applyProjection(this);
			_a[i] = v1.x;
			_a[i + 1] = v1.y;
			_a[i + 2] = v1.z;
			i += 3;
		}
		return _a;
	}
	,determinant: function() {
		var te = this.elements;
		var n11 = te[0];
		var n12 = te[4];
		var n13 = te[8];
		var n14 = te[12];
		var n21 = te[1];
		var n22 = te[5];
		var n23 = te[9];
		var n24 = te[13];
		var n31 = te[2];
		var n32 = te[6];
		var n33 = te[10];
		var n34 = te[14];
		var n41 = te[3];
		var n42 = te[7];
		var n43 = te[11];
		var n44 = te[15];
		return n41 * (n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
	}
	,transpose: function() {
		var te = this.elements;
		var tmp;
		tmp = te[1];
		te[1] = te[4];
		te[4] = tmp;
		tmp = te[2];
		te[2] = te[8];
		te[8] = tmp;
		tmp = te[6];
		te[6] = te[9];
		te[9] = tmp;
		tmp = te[3];
		te[3] = te[12];
		te[12] = tmp;
		tmp = te[7];
		te[7] = te[13];
		te[13] = tmp;
		tmp = te[11];
		te[11] = te[14];
		te[14] = tmp;
		return this;
	}
	,flattenToArray: function(_flat) {
		if(_flat == null) {
			_flat = new Array();
			var _g = 0;
			while(_g < 16) {
				var i = _g++;
				_flat.push(0.0);
			}
		}
		var te = this.elements;
		_flat[0] = te[0];
		_flat[1] = te[1];
		_flat[2] = te[2];
		_flat[3] = te[3];
		_flat[4] = te[4];
		_flat[5] = te[5];
		_flat[6] = te[6];
		_flat[7] = te[7];
		_flat[8] = te[8];
		_flat[9] = te[9];
		_flat[10] = te[10];
		_flat[11] = te[11];
		_flat[12] = te[12];
		_flat[13] = te[13];
		_flat[14] = te[14];
		_flat[15] = te[15];
		return _flat;
	}
	,flattenToArrayOffset: function(_flat,_offset) {
		var te = this.elements;
		_flat[_offset] = te[0];
		_flat[_offset + 1] = te[1];
		_flat[_offset + 2] = te[2];
		_flat[_offset + 3] = te[3];
		_flat[_offset + 4] = te[4];
		_flat[_offset + 5] = te[5];
		_flat[_offset + 6] = te[6];
		_flat[_offset + 7] = te[7];
		_flat[_offset + 8] = te[8];
		_flat[_offset + 9] = te[9];
		_flat[_offset + 10] = te[10];
		_flat[_offset + 11] = te[11];
		_flat[_offset + 12] = te[12];
		_flat[_offset + 13] = te[13];
		_flat[_offset + 14] = te[14];
		_flat[_offset + 15] = te[15];
		return _flat;
	}
	,setPosition: function(_v) {
		var te = this.elements;
		te[12] = _v.x;
		te[13] = _v.y;
		te[14] = _v.z;
		return this;
	}
	,inverse: function() {
		return this.clone().getInverse(this);
	}
	,getInverse: function(_m) {
		var te = this.elements;
		var me = _m.elements;
		var n11 = me[0];
		var n12 = me[4];
		var n13 = me[8];
		var n14 = me[12];
		var n21 = me[1];
		var n22 = me[5];
		var n23 = me[9];
		var n24 = me[13];
		var n31 = me[2];
		var n32 = me[6];
		var n33 = me[10];
		var n34 = me[14];
		var n41 = me[3];
		var n42 = me[7];
		var n43 = me[11];
		var n44 = me[15];
		te[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
		te[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
		te[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
		te[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
		te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
		te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
		te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
		te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
		te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
		te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
		te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
		te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
		te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
		te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
		te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
		te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;
		var det = me[0] * te[0] + me[1] * te[4] + me[2] * te[8] + me[3] * te[12];
		if(det == 0) {
			haxe.Log.trace("Matrix.getInverse: cant invert matrix, determinant is 0",{ fileName : "Matrix.hx", lineNumber : 689, className : "phoenix.Matrix", methodName : "getInverse"});
			this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
			this;
			return this;
		}
		this.multiplyScalar(1 / det);
		return this;
	}
	,scale: function(_v) {
		var te = this.elements;
		var _x = _v.x;
		var _y = _v.y;
		var _z = _v.z;
		te[0] *= _x;
		te[4] *= _y;
		te[8] *= _z;
		te[1] *= _x;
		te[5] *= _y;
		te[9] *= _z;
		te[2] *= _x;
		te[6] *= _y;
		te[10] *= _z;
		te[3] *= _x;
		te[7] *= _y;
		te[11] *= _z;
		return this;
	}
	,getMaxScaleOnAxis: function() {
		var te = this.elements;
		var _scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
		var _scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
		var _scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
		return Math.sqrt(Math.max(_scaleXSq,Math.max(_scaleYSq,_scaleZSq)));
	}
	,makeTranslation: function(_x,_y,_z) {
		this.set(1,0,0,_x,0,1,0,_y,0,0,1,_z,0,0,0,1);
		return this;
	}
	,makeRotationX: function(_theta) {
		var _c = Math.cos(_theta);
		var _s = Math.sin(_theta);
		this.set(1,0,0,0,0,_c,-_s,0,0,_s,_c,0,0,0,0,1);
		return this;
	}
	,makeRotationY: function(_theta) {
		var _c = Math.cos(_theta);
		var _s = Math.sin(_theta);
		this.set(_c,0,_s,0,0,1,0,0,-_s,0,_c,0,0,0,0,1);
		return this;
	}
	,makeRotationZ: function(_theta) {
		var _c = Math.cos(_theta);
		var _s = Math.sin(_theta);
		this.set(_c,-_s,0,0,_s,_c,0,0,0,0,1,0,0,0,0,1);
		return this;
	}
	,makeRotationAxis: function(_axis,_angle) {
		var _c = Math.cos(_angle);
		var _s = Math.sin(_angle);
		var _t = 1 - _c;
		var _ax = _axis.x;
		var _ay = _axis.y;
		var _az = _axis.z;
		var _tx = _t * _ax;
		var _ty = _t * _ay;
		this.set(_tx * _ax + _c,_tx * _ay - _s * _az,_tx * _az + _s * _ay,0,_tx * _ay + _s * _az,_ty * _ay + _c,_ty * _az - _s * _ax,0,_tx * _az - _s * _ay,_ty * _az + _s * _ax,_t * _az * _az + _c,0,0,0,0,1);
		return this;
	}
	,makeScale: function(_x,_y,_z) {
		this.set(_x,0,0,0,0,_y,0,0,0,0,_z,0,0,0,0,1);
		return this;
	}
	,compose_with_origin: function(_position,_origin,_quaternion,_scale) {
		this.set(1,0,0,_origin.x,0,1,0,_origin.y,0,0,1,_origin.z,0,0,0,1);
		this;
		this.scale(_scale);
		this.multiply(new phoenix.Matrix().makeRotationFromQuaternion(_quaternion));
		this.multiply(new phoenix.Matrix().makeTranslation(-_origin.x,-_origin.y,-_origin.z));
		this.multiply(new phoenix.Matrix().makeTranslation(_position.x,_position.y,_position.z));
		return this;
	}
	,compose: function(_position,_quaternion,_scale) {
		this.makeRotationFromQuaternion(_quaternion);
		this.scale(_scale);
		this.setPosition(_position);
		return this;
	}
	,decompose: function(_position,_quaternion,_scale) {
		var te = this.elements;
		var matrix = new phoenix.Matrix();
		var _ax_x = te[0];
		var _ax_y = te[1];
		var _ax_z = te[2];
		var _ay_x = te[4];
		var _ay_y = te[5];
		var _ay_z = te[6];
		var _az_x = te[8];
		var _az_y = te[9];
		var _az_z = te[10];
		var _ax_length = Math.sqrt(_ax_x * _ax_x + _ax_y * _ax_y + _ax_z * _ax_z);
		var _ay_length = Math.sqrt(_ay_x * _ay_x + _ay_y * _ay_y + _ay_z * _ay_z);
		var _az_length = Math.sqrt(_az_x * _az_x + _az_y * _az_y + _az_z * _az_z);
		if(_quaternion == null) _quaternion = new phoenix.Quaternion();
		if(_position == null) _position = new phoenix.Vector(te[12],te[13],te[14]); else {
			_position.set_x(te[12]);
			_position.set_y(te[13]);
			_position.set_z(te[14]);
		}
		if(_scale == null) _scale = new phoenix.Vector(_ax_length,_ay_length,_az_length); else {
			_scale.x = _ax_length;
			if(_scale._construct) _scale.x; else {
				if(_scale.listen_x != null && !_scale.ignore_listeners) _scale.listen_x(_ax_length);
				_scale.x;
			}
			_scale.y = _ay_length;
			if(_scale._construct) _scale.y; else {
				if(_scale.listen_y != null && !_scale.ignore_listeners) _scale.listen_y(_ay_length);
				_scale.y;
			}
			_scale.z = _az_length;
			if(_scale._construct) _scale.z; else {
				if(_scale.listen_z != null && !_scale.ignore_listeners) _scale.listen_z(_az_length);
				_scale.z;
			}
		}
		matrix.elements = this.elements.concat([]);
		var me = matrix.elements;
		me[0] /= _ax_length;
		me[1] /= _ax_length;
		me[2] /= _ax_length;
		me[4] /= _ay_length;
		me[5] /= _ay_length;
		me[6] /= _ay_length;
		me[8] /= _az_length;
		me[9] /= _az_length;
		me[10] /= _az_length;
		_quaternion.setFromRotationMatrix(matrix);
		if(this._transform == null) this._transform = new phoenix.MatrixTransform(_position,_quaternion,_scale); else {
			this._transform.pos = _position;
			this._transform.rotation = _quaternion;
			this._transform.scale = _scale;
		}
		return this._transform;
	}
	,makeFrustum: function(_left,_right,_bottom,_top,_near,_far) {
		var te = this.elements;
		var tx = 2 * _near / (_right - _left);
		var ty = 2 * _near / (_top - _bottom);
		var a = (_right + _left) / (_right - _left);
		var b = (_top + _bottom) / (_top - _bottom);
		var c = -(_far + _near) / (_far - _near);
		var d = -2 * _far * _near / (_far - _near);
		te[0] = tx;
		te[4] = 0;
		te[8] = a;
		te[12] = 0;
		te[1] = 0;
		te[5] = ty;
		te[9] = b;
		te[13] = 0;
		te[2] = 0;
		te[6] = 0;
		te[10] = c;
		te[14] = d;
		te[3] = 0;
		te[7] = 0;
		te[11] = -1;
		te[15] = 0;
		return this;
	}
	,makePerspective: function(_fov,_aspect,_near,_far) {
		var ymax = _near * Math.tan(_fov * 0.5 * 0.0174532925199432781);
		var ymin = -ymax;
		var xmin = ymin * _aspect;
		var xmax = ymax * _aspect;
		return this.makeFrustum(xmin,xmax,ymin,ymax,_near,_far);
	}
	,makeOrthographic: function(_left,_right,_top,_bottom,_near,_far) {
		var te = this.elements;
		var w = _right - _left;
		var h = _top - _bottom;
		var p = _far - _near;
		var tx = (_right + _left) / w;
		var ty = (_top + _bottom) / h;
		var tz = (_far + _near) / p;
		te[0] = 2 / w;
		te[4] = 0;
		te[8] = 0;
		te[12] = -tx;
		te[1] = 0;
		te[5] = 2 / h;
		te[9] = 0;
		te[13] = -ty;
		te[2] = 0;
		te[6] = 0;
		te[10] = -2 / p;
		te[14] = -tz;
		te[3] = 0;
		te[7] = 0;
		te[11] = 0;
		te[15] = 1;
		return this;
	}
	,fromArray: function(_from) {
		this.elements = _from.concat([]);
	}
	,toArray: function() {
		var te = this.elements;
		return [te[0],te[1],te[2],te[3],te[4],te[5],te[6],te[7],te[8],te[9],te[10],te[11],te[12],te[13],te[14],te[15]];
	}
	,clone: function() {
		var te = this.elements;
		return new phoenix.Matrix(te[0],te[4],te[8],te[12],te[1],te[5],te[9],te[13],te[2],te[6],te[10],te[14],te[3],te[7],te[11],te[15]);
	}
	,up: function() {
		return new phoenix.Vector(this.elements[4],this.elements[5],this.elements[10]);
	}
	,down: function() {
		return new phoenix.Vector(this.elements[4],this.elements[5],this.elements[10]).get_inverted();
	}
	,left: function() {
		return new phoenix.Vector(this.elements[0],this.elements[1],this.elements[2]).get_inverted();
	}
	,right: function() {
		return new phoenix.Vector(this.elements[0],this.elements[1],this.elements[2]);
	}
	,backward: function() {
		return new phoenix.Vector(this.elements[8],this.elements[9],this.elements[10]);
	}
	,forward: function() {
		return new phoenix.Vector(this.elements[8],this.elements[9],this.elements[10]).get_inverted();
	}
	,__class__: phoenix.Matrix
	,__properties__: {set_M44:"set_M44",get_M44:"get_M44",set_M34:"set_M34",get_M34:"get_M34",set_M24:"set_M24",get_M24:"get_M24",set_M14:"set_M14",get_M14:"get_M14",set_M43:"set_M43",get_M43:"get_M43",set_M33:"set_M33",get_M33:"get_M33",set_M23:"set_M23",get_M23:"get_M23",set_M13:"set_M13",get_M13:"get_M13",set_M42:"set_M42",get_M42:"get_M42",set_M32:"set_M32",get_M32:"get_M32",set_M22:"set_M22",get_M22:"get_M22",set_M12:"set_M12",get_M12:"get_M12",set_M41:"set_M41",get_M41:"get_M41",set_M31:"set_M31",get_M31:"get_M31",set_M21:"set_M21",get_M21:"get_M21",set_M11:"set_M11",get_M11:"get_M11"}
};
phoenix.Quaternion = function(_x,_y,_z,_w) {
	if(_w == null) _w = 1;
	if(_z == null) _z = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this.ignore_euler = false;
	this._construct = false;
	this.ignore_listeners = false;
	this.w = 0.0;
	this.z = 0.0;
	this.y = 0.0;
	this.x = 0.0;
	this._construct = true;
	this.x = _x;
	if(this._construct) this.x; else {
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		this.x;
	}
	this.y = _y;
	if(this._construct) this.y; else {
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		this.y;
	}
	this.z = _z;
	if(this._construct) this.z; else {
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		this.z;
	}
	this.w = _w;
	if(this._construct) this.w; else {
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		this.w;
	}
	this.euler = new phoenix.Vector();
	this._construct = false;
};
$hxClasses["phoenix.Quaternion"] = phoenix.Quaternion;
phoenix.Quaternion.__name__ = ["phoenix","Quaternion"];
phoenix.Quaternion.Add = function(_a,_b) {
	return _a.clone().add(_b);
};
phoenix.Quaternion.Multiply = function(_a,_b) {
	return _a.clone().multiply(_b);
};
phoenix.Quaternion.MultiplyScalar = function(_quaternion,_scalar) {
	return _quaternion.clone().multiplyScalar(_scalar);
};
phoenix.Quaternion.Slerp = function(_qa,_qb,_qm,_t) {
	return _qm.copy(_qa).slerp(_qb,_t);
};
phoenix.Quaternion.Dot = function(_a,_b) {
	return new phoenix.Quaternion(_a.x,_a.y,_a.z,_a.w).dot(_b);
};
phoenix.Quaternion.Listen = function(_q,listener) {
	_q.listen_x = listener;
	_q.listen_y = listener;
	_q.listen_z = listener;
	_q.listen_w = listener;
};
phoenix.Quaternion.prototype = {
	toString: function() {
		return "{ x:" + this.x + ", y:" + this.y + ", z:" + this.z + ", w:" + this.w + " }";
	}
	,set: function(_x,_y,_z,_w) {
		this.ignore_euler = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,copy: function(_quaternion) {
		this.ignore_euler = true;
		this.x = _quaternion.x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _quaternion.y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _quaternion.z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _quaternion.w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,dot: function(_other) {
		return this.x * _other.x + this.y * _other.y + this.z * _other.z + this.w * _other.w;
	}
	,setFromEuler: function(_euler,_order) {
		if(_order == null) _order = 0;
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		var _w = this.w;
		var c1 = Math.cos(_euler.x / 2);
		var c2 = Math.cos(_euler.y / 2);
		var c3 = Math.cos(_euler.z / 2);
		var s1 = Math.sin(_euler.x / 2);
		var s2 = Math.sin(_euler.y / 2);
		var s3 = Math.sin(_euler.z / 2);
		if(_order == 0) {
			_x = s1 * c2 * c3 + c1 * s2 * s3;
			_y = c1 * s2 * c3 - s1 * c2 * s3;
			_z = c1 * c2 * s3 + s1 * s2 * c3;
			_w = c1 * c2 * c3 - s1 * s2 * s3;
		} else if(_order == 1) {
			_x = s1 * c2 * c3 + c1 * s2 * s3;
			_y = c1 * s2 * c3 - s1 * c2 * s3;
			_z = c1 * c2 * s3 - s1 * s2 * c3;
			_w = c1 * c2 * c3 + s1 * s2 * s3;
		} else if(_order == 2) {
			_x = s1 * c2 * c3 - c1 * s2 * s3;
			_y = c1 * s2 * c3 + s1 * c2 * s3;
			_z = c1 * c2 * s3 + s1 * s2 * c3;
			_w = c1 * c2 * c3 - s1 * s2 * s3;
		} else if(_order == 3) {
			_x = s1 * c2 * c3 - c1 * s2 * s3;
			_y = c1 * s2 * c3 + s1 * c2 * s3;
			_z = c1 * c2 * s3 - s1 * s2 * c3;
			_w = c1 * c2 * c3 + s1 * s2 * s3;
		} else if(_order == 4) {
			_x = s1 * c2 * c3 + c1 * s2 * s3;
			_y = c1 * s2 * c3 + s1 * c2 * s3;
			_z = c1 * c2 * s3 - s1 * s2 * c3;
			_w = c1 * c2 * c3 - s1 * s2 * s3;
		} else if(_order == 5) {
			_x = s1 * c2 * c3 - c1 * s2 * s3;
			_y = c1 * s2 * c3 - s1 * c2 * s3;
			_z = c1 * c2 * s3 + s1 * s2 * c3;
			_w = c1 * c2 * c3 + s1 * s2 * s3;
		}
		this.ignore_euler = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,setFromAxisAngle: function(_axis,_angle) {
		var _halfAngle = _angle / 2;
		var _s = Math.sin(_halfAngle);
		this.set_xyzw(_axis.x * _s,_axis.y * _s,_axis.z * _s,Math.cos(_halfAngle));
		return this;
	}
	,setFromRotationMatrix: function(_m) {
		var te = _m.elements;
		var m11 = te[0];
		var m12 = te[4];
		var m13 = te[8];
		var m21 = te[1];
		var m22 = te[5];
		var m23 = te[9];
		var m31 = te[2];
		var m32 = te[6];
		var m33 = te[10];
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		var _w = this.w;
		var tr = m11 + m22 + m33;
		var s;
		if(tr > 0) {
			s = 0.5 / Math.sqrt(tr + 1.0);
			_w = 0.25 / s;
			_x = (m32 - m23) * s;
			_y = (m13 - m31) * s;
			_z = (m21 - m12) * s;
		} else if(m11 > m22 && m11 > m33) {
			s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
			_w = (m32 - m23) / s;
			_x = 0.25 * s;
			_y = (m12 + m21) / s;
			_z = (m13 + m31) / s;
		} else if(m22 > m33) {
			s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
			_w = (m13 - m31) / s;
			_x = (m12 + m21) / s;
			_y = 0.25 * s;
			_z = (m23 + m32) / s;
		} else {
			s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
			_w = (m21 - m12) / s;
			_x = (m13 + m31) / s;
			_y = (m23 + m32) / s;
			_z = 0.25 * s;
		}
		this.ignore_euler = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,inverse: function() {
		return this.conjugate().normalize();
	}
	,conjugate: function() {
		this.ignore_euler = true;
		this.x = this.x * -1;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = this.y * -1;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = this.z * -1;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		return this;
	}
	,lengthSq: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	,length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	,normalize: function() {
		var l = this.length();
		if(l == 0) {
			this.ignore_euler = true;
			this.x = 0;
			if(this._construct) this.x; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
				this.x;
			}
			this.y = 0;
			if(this._construct) this.y; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
				this.y;
			}
			this.z = 0;
			if(this._construct) this.z; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
				this.z;
			}
			this.w = 1;
			if(this._construct) this.w; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
				this.w;
			}
			this.ignore_euler = false;
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		} else {
			l = 1 / l;
			this.ignore_euler = true;
			this.x = this.x * l;
			if(this._construct) this.x; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
				this.x;
			}
			this.y = this.y * l;
			if(this._construct) this.y; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
				this.y;
			}
			this.z = this.z * l;
			if(this._construct) this.z; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
				this.z;
			}
			this.w = this.w * l;
			if(this._construct) this.w; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
				this.w;
			}
			this.ignore_euler = false;
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		}
		return this;
	}
	,multiply: function(_quaternion) {
		return this.multiplyQuaternions(this,_quaternion);
	}
	,add: function(_quaternion) {
		return this.addQuaternions(this,_quaternion);
	}
	,addQuaternions: function(_a,_b) {
		this.x = _a.x + _b.x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _a.y + _b.y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _a.z + _b.z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _a.w + _b.w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		return this;
	}
	,multiplyScalar: function(_scalar) {
		var _g = this;
		_g.x = _g.x * _scalar;
		if(_g._construct) _g.x; else {
			if(_g.euler == null || _g.ignore_euler || _g._construct) null; else _g.euler.setEulerFromQuaternion(_g,null);
			if(_g.listen_x != null && !_g.ignore_listeners) _g.listen_x(_g.x);
			_g.x;
		}
		var _g1 = this;
		_g1.y = _g1.y * _scalar;
		if(_g1._construct) _g1.y; else {
			if(_g1.euler == null || _g1.ignore_euler || _g1._construct) null; else _g1.euler.setEulerFromQuaternion(_g1,null);
			if(_g1.listen_y != null && !_g1.ignore_listeners) _g1.listen_y(_g1.y);
			_g1.y;
		}
		var _g2 = this;
		_g2.z = _g2.z * _scalar;
		if(_g2._construct) _g2.z; else {
			if(_g2.euler == null || _g2.ignore_euler || _g2._construct) null; else _g2.euler.setEulerFromQuaternion(_g2,null);
			if(_g2.listen_z != null && !_g2.ignore_listeners) _g2.listen_z(_g2.z);
			_g2.z;
		}
		var _g3 = this;
		_g3.w = _g3.w * _scalar;
		if(_g3._construct) _g3.w; else {
			if(_g3.euler == null || _g3.ignore_euler || _g3._construct) null; else _g3.euler.setEulerFromQuaternion(_g3,null);
			if(_g3.listen_w != null && !_g3.ignore_listeners) _g3.listen_w(_g3.w);
			_g3.w;
		}
		return this;
	}
	,multiplyQuaternions: function(_a,_b) {
		var qax = _a.x;
		var qay = _a.y;
		var qaz = _a.z;
		var qaw = _a.w;
		var qbx = _b.x;
		var qby = _b.y;
		var qbz = _b.z;
		var qbw = _b.w;
		this.ignore_euler = true;
		this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,slerp: function(_qb,_t) {
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		var _w = this.w;
		var cosHalfTheta = _w * _qb.w + _x * _qb.x + _y * _qb.y + _z * _qb.z;
		if(cosHalfTheta < 0) {
			this.w = -_qb.w;
			if(this._construct) this.w; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
				this.w;
			}
			this.x = -_qb.x;
			if(this._construct) this.x; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
				this.x;
			}
			this.y = -_qb.y;
			if(this._construct) this.y; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
				this.y;
			}
			this.z = -_qb.z;
			if(this._construct) this.z; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
				this.z;
			}
			cosHalfTheta = -cosHalfTheta;
		} else this.copy(_qb);
		if(cosHalfTheta >= 1.0) {
			this.ignore_euler = true;
			this.x = _x;
			if(this._construct) this.x; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
				this.x;
			}
			this.y = _y;
			if(this._construct) this.y; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
				this.y;
			}
			this.z = _z;
			if(this._construct) this.z; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
				this.z;
			}
			this.w = _w;
			if(this._construct) this.w; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
				this.w;
			}
			this.ignore_euler = false;
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			return this;
		}
		var halfTheta = Math.acos(cosHalfTheta);
		var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
		if(Math.abs(sinHalfTheta) < 0.001) {
			this.ignore_euler = true;
			this.x = 0.5 * (_w + this.w);
			if(this._construct) this.x; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
				this.x;
			}
			this.y = 0.5 * (_x + this.x);
			if(this._construct) this.y; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
				this.y;
			}
			this.z = 0.5 * (_y + this.y);
			if(this._construct) this.z; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
				this.z;
			}
			this.w = 0.5 * (_z + this.z);
			if(this._construct) this.w; else {
				if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
				if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
				this.w;
			}
			this.ignore_euler = false;
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			return this;
		}
		var ratioA = Math.sin((1 - _t) * halfTheta) / sinHalfTheta;
		var ratioB = Math.sin(_t * halfTheta) / sinHalfTheta;
		this.ignore_euler = true;
		this.x = _w * ratioA + this.w * ratioB;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _x * ratioA + this.x * ratioB;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _y * ratioA + this.y * ratioB;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _z * ratioA + this.z * ratioB;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,equals: function(_q) {
		return _q.x == this.x && _q.y == this.y && _q.z == this.z && _q.w == this.w;
	}
	,fromArray: function(_a) {
		this.ignore_euler = true;
		this.x = _a[0];
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _a[1];
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _a[2];
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _a[3];
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this;
	}
	,toArray: function() {
		return [this.x,this.y,this.z,this.w];
	}
	,clone: function() {
		return new phoenix.Quaternion(this.x,this.y,this.z,this.w);
	}
	,toeuler: function() {
		return new phoenix.Vector().setEulerFromQuaternion(this,null).degrees();
	}
	,update_euler: function() {
		if(this.euler == null || this.ignore_euler || this._construct) return;
		this.euler.setEulerFromQuaternion(this,null);
	}
	,set_xyzw: function(_x,_y,_z,_w) {
		this.ignore_euler = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.w = _w;
		if(this._construct) this.w; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
			this.w;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
	}
	,set_xyz: function(_x,_y,_z) {
		this.ignore_euler = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
			this.z;
		}
		this.ignore_euler = false;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
	}
	,set_x: function(_v) {
		this.x = _v;
		if(this._construct) return this.x;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		return this.x;
	}
	,set_y: function(_v) {
		this.y = _v;
		if(this._construct) return this.y;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		return this.y;
	}
	,set_z: function(_v) {
		this.z = _v;
		if(this._construct) return this.z;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		return this.z;
	}
	,set_w: function(_v) {
		this.w = _v;
		if(this._construct) return this.w;
		if(this.euler == null || this.ignore_euler || this._construct) null; else this.euler.setEulerFromQuaternion(this,null);
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(this.w);
		return this.w;
	}
	,__class__: phoenix.Quaternion
	,__properties__: {set_w:"set_w",set_z:"set_z",set_y:"set_y",set_x:"set_x"}
};
phoenix.Ray = function(_screen_pos,_camera,_viewport) {
	if(_viewport == null) _viewport = new phoenix.Rectangle(0,0,Luxe.core.screen.w,Luxe.core.screen.h);
	if(_camera == null) throw "Camera required for a ray!";
	this.camera = _camera;
	this.viewport = _viewport;
	this.refresh(_screen_pos);
};
$hxClasses["phoenix.Ray"] = phoenix.Ray;
phoenix.Ray.__name__ = ["phoenix","Ray"];
phoenix.Ray.prototype = {
	refresh: function(_screen_pos) {
		var ndc_x = (_screen_pos.x / this.viewport.w - 0.5) * 2.0;
		var ndc_y = ((this.viewport.h - _screen_pos.y) / this.viewport.h - 0.5) * 2.0;
		var start_ndc = new phoenix.Vector(ndc_x,ndc_y,0.0,1.0);
		var end_ndc = new phoenix.Vector(ndc_x,ndc_y,1.0,1.0);
		this.origin = this.camera.unproject(start_ndc);
		this.end = this.camera.unproject(end_ndc);
		this.dir = phoenix.Vector.Subtract(this.end,this.origin);
	}
	,__class__: phoenix.Ray
};
phoenix.Rectangle = function(_x,_y,_w,_h) {
	if(_h == null) _h = 0;
	if(_w == null) _w = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this.ignore_listeners = false;
	this.h = 0;
	this.w = 0;
	this.y = 0;
	this.x = 0;
	this.set_x(_x);
	this.set_y(_y);
	this.set_w(_w);
	this.set_h(_h);
};
$hxClasses["phoenix.Rectangle"] = phoenix.Rectangle;
phoenix.Rectangle.__name__ = ["phoenix","Rectangle"];
phoenix.Rectangle.listen = function(_r,listener) {
	_r.listen_x = listener;
	_r.listen_y = listener;
	_r.listen_w = listener;
	_r.listen_h = listener;
};
phoenix.Rectangle.prototype = {
	toString: function() {
		return "{ x:" + this.x + ", y:" + this.y + ", w:" + this.w + ", h:" + this.h + " }";
	}
	,point_inside: function(_p) {
		if(_p.x < this.x) return false;
		if(_p.y < this.y) return false;
		if(_p.x > this.x + this.w) return false;
		if(_p.y > this.y + this.h) return false;
		return true;
	}
	,overlaps: function(_other) {
		if(_other == null) return false;
		if(this.x < _other.x + _other.w && this.y < _other.y + _other.h && this.x + this.w > _other.x && this.y + this.h > _other.y) return true;
		return false;
	}
	,clone: function() {
		return new phoenix.Rectangle(this.x,this.y,this.w,this.h);
	}
	,equal: function(_other) {
		if(_other == null) return false;
		return this.x == _other.x && this.y == _other.y && this.w == _other.w && this.h == _other.h;
	}
	,copy_from: function(_rect) {
		this.set_x(_rect.x);
		this.set_y(_rect.y);
		this.set_w(_rect.w);
		this.set_h(_rect.h);
	}
	,set: function(_x,_y,_w,_h) {
		var _setx = this.x;
		var _sety = this.y;
		var _setw = this.w;
		var _seth = this.h;
		if(_x != null) _setx = _x;
		if(_y != null) _sety = _y;
		if(_w != null) _setw = _w;
		if(_h != null) _seth = _h;
		this.set_x(_setx);
		this.set_y(_sety);
		this.set_w(_setw);
		this.set_h(_seth);
		return this;
	}
	,set_x: function(_x) {
		this.x = _x;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
		return this.x;
	}
	,set_y: function(_y) {
		this.y = _y;
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
		return this.y;
	}
	,set_w: function(_w) {
		this.w = _w;
		if(this.listen_w != null && !this.ignore_listeners) this.listen_w(_w);
		return this.w;
	}
	,set_h: function(_h) {
		this.h = _h;
		if(this.listen_h != null && !this.ignore_listeners) this.listen_h(_h);
		return this.h;
	}
	,__class__: phoenix.Rectangle
	,__properties__: {set_h:"set_h",set_w:"set_w",set_y:"set_y",set_x:"set_x"}
};
phoenix.RenderPath = function(_renderer) {
	this.renderer = _renderer;
};
$hxClasses["phoenix.RenderPath"] = phoenix.RenderPath;
phoenix.RenderPath.__name__ = ["phoenix","RenderPath"];
phoenix.RenderPath.prototype = {
	render: function(_batchers,_stats) {
		var _g = 0;
		while(_g < _batchers.length) {
			var batch = _batchers[_g];
			++_g;
			if(batch.enabled) {
				Luxe.debug.start("batch." + batch.name);
				batch.draw();
				_stats.geometry_count += batch.geometry.size();
				_stats.dynamic_batched_count += batch.dynamic_batched_count;
				_stats.static_batched_count += batch.static_batched_count;
				_stats.visible_count += batch.visible_count;
				_stats.draw_calls += batch.draw_calls;
				_stats.vert_count += batch.vert_count;
				Luxe.debug.end("batch." + batch.name);
			}
		}
	}
	,__class__: phoenix.RenderPath
};
phoenix.RenderState = function(_renderer) {
	this._last_depth_mask = true;
	this._last_line_width = 1;
	this._bound_texture_2D = null;
	this._active_texture = -1;
	this._used_program = null;
	this._current_rbo = null;
	this._current_fbo = null;
	this.depth_func = -1;
	this.depth_mask = true;
	this.depth_test = false;
	this.cull_face = false;
	this.renderer = _renderer;
	this._viewport = new phoenix.Rectangle(0,0,0,0);
};
$hxClasses["phoenix.RenderState"] = phoenix.RenderState;
phoenix.RenderState.__name__ = ["phoenix","RenderState"];
phoenix.RenderState.prototype = {
	enable: function(what) {
		switch(what) {
		case 2884:
			if(!this.cull_face) {
				this.cull_face = true;
				snow.modules.opengl.web.GL.enable(2884);
			}
			break;
		case 2929:
			if(Luxe.core.app.config.render.depth) {
				if(!this.depth_test) {
					this.depth_test = true;
					snow.modules.opengl.web.GL.enable(2929);
				}
			}
			break;
		}
	}
	,disable: function(what) {
		switch(what) {
		case 2884:
			if(this.cull_face) {
				this.cull_face = false;
				snow.modules.opengl.web.GL.disable(2884);
			}
			break;
		case 2929:
			if(Luxe.core.app.config.render.depth) {
				if(this.depth_test) {
					this.depth_test = false;
					snow.modules.opengl.web.GL.disable(2929);
				}
			}
			break;
		}
	}
	,depth_function: function(what) {
		if(this.depth_func != this.depth_func) {
			snow.modules.opengl.web.GL.depthFunc(what);
			this.depth_func = what;
		}
	}
	,viewport: function(x,y,w,h) {
		if(this._viewport.x != x || this._viewport.y != y || this._viewport.w != w || this._viewport.h != h) {
			this._viewport.set_x(x);
			this._viewport.set_y(y);
			this._viewport.set_w(w);
			this._viewport.set_h(h);
			var _y = this.renderer.target_size.y - (y + h);
			snow.modules.opengl.web.GL.viewport(x | 0,_y | 0,w | 0,h | 0);
		}
	}
	,bindFramebuffer: function(buffer) {
		if(this._current_fbo != buffer) {
			if(buffer == null) buffer = this.renderer.default_fbo;
			snow.modules.opengl.web.GL.bindFramebuffer(36160,buffer);
			this._current_fbo = buffer;
		}
	}
	,bindRenderbuffer: function(buffer) {
		if(this._current_rbo != buffer) {
			if(buffer == null) buffer = this.renderer.default_rbo;
			snow.modules.opengl.web.GL.bindRenderbuffer(36161,buffer);
			this._current_rbo = buffer;
		}
	}
	,useProgram: function(program) {
		if(this._used_program != program) {
			this._used_program = program;
			snow.modules.opengl.web.GL.useProgram(program);
		}
	}
	,activeTexture: function(val) {
		if(this._active_texture != val) {
			snow.modules.opengl.web.GL.activeTexture(val);
			this._active_texture = val;
		}
	}
	,bindTexture2D: function(tex) {
		if(this._bound_texture_2D != tex) {
			this._bound_texture_2D = tex;
			snow.modules.opengl.web.GL.bindTexture(3553,tex);
		}
	}
	,lineWidth: function(_width) {
		if(this._last_line_width != _width) {
			this._last_line_width = _width;
			snow.modules.opengl.web.GL.lineWidth(_width);
		}
	}
	,depthMask: function(_enable) {
		if(this._last_depth_mask != _enable) {
			this._last_depth_mask = _enable;
			snow.modules.opengl.web.GL.depthMask(_enable);
		}
	}
	,__class__: phoenix.RenderState
};
phoenix.Texture = function(_manager,_type) {
	this.slot = 0;
	this.loaded = false;
	this.height = -1;
	this.width = -1;
	this.height_actual = -1;
	this.width_actual = -1;
	if(_type == null) _type = 4;
	luxe.resource.Resource.call(this,_manager,_type);
	this._onload_handlers = new Array();
	this.id = Luxe.utils.uniqueid();
	this.set_filter(phoenix.FilterType.linear);
	this.set_clamp(phoenix.ClampType.edge);
};
$hxClasses["phoenix.Texture"] = phoenix.Texture;
phoenix.Texture.__name__ = ["phoenix","Texture"];
phoenix.Texture.load = function(_id,_onloaded,_silent) {
	if(_silent == null) _silent = false;
	var resources = Luxe.resources;
	var _exists = resources.find_texture(_id);
	if(_exists != null) {
		if(_onloaded != null) _onloaded(_exists);
		return _exists;
	}
	var texture = new phoenix.Texture(resources);
	if(_onloaded != null) texture.set_onload(_onloaded);
	snow.system.assets.AssetImage.load(Luxe.core.app.assets,_id).then(function(_asset) {
		if(_asset != null && _asset.image != null) {
			texture.from_asset(_asset);
			texture.reset();
			texture.do_onload();
			if(!_silent) haxe.Log.trace("  i / texture / " + ("loaded " + texture.id + " (" + texture.width + "x" + texture.height + ") real size (" + texture.width_actual + "x" + texture.height_actual + ")"),{ fileName : "Texture.hx", lineNumber : 150, className : "phoenix.Texture", methodName : "load"});
		} else if(!_silent) haxe.Log.trace("  i / texture / " + ("failed to load! " + _id),{ fileName : "Texture.hx", lineNumber : 155, className : "phoenix.Texture", methodName : "load"});
	});
	texture.id = _id;
	resources.cache(texture);
	return texture;
};
phoenix.Texture.load_from_resource = function(_name,_cache) {
	if(_cache == null) _cache = true;
	var texture_bytes = haxe.Resource.getBytes(_name);
	if(texture_bytes != null) {
		var texture = phoenix.Texture.load_from_bytes(_name,snow.api.buffers._Uint8Array.Uint8Array_Impl_.fromBytes(texture_bytes),_cache);
		texture_bytes = null;
		return texture;
	}
	return null;
};
phoenix.Texture.load_from_bytes = function(_id,_bytes,_cache) {
	if(_cache == null) _cache = true;
	if(_bytes != null) {
		var resources = Luxe.resources;
		var texture = new phoenix.Texture(resources);
		var _load = snow.system.assets.AssetImage.load_from_bytes(Luxe.core.app.assets,_id,_bytes);
		_load.then(function(_asset) {
			texture.from_asset(_asset);
			texture.reset();
			texture.do_onload();
			if(_cache) resources.cache(texture);
		});
		return texture;
	}
	return null;
};
phoenix.Texture.load_from_pixels = function(_id,_width,_height,_pixels,_cache) {
	if(_cache == null) _cache = true;
	if(_pixels == null) return null;
	var resources = Luxe.resources;
	var texture = new phoenix.Texture(resources);
	var _asset = snow.system.assets.AssetImage.load_from_pixels(Luxe.core.app.assets,_id,_width,_height,_pixels);
	texture.from_asset(_asset);
	texture.reset();
	texture.do_onload();
	if(_cache) resources.cache(texture);
	return texture;
};
phoenix.Texture.__super__ = luxe.resource.Resource;
phoenix.Texture.prototype = $extend(luxe.resource.Resource.prototype,{
	set_onload: function(f) {
		if(this.loaded) {
			f(this);
			return f;
		} else this._onload_handlers.push(f);
		return f;
	}
	,do_onload: function() {
		this.loaded = true;
		var _g = 0;
		var _g1 = this._onload_handlers;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			if(f != null) f(this);
		}
		this._onload_handlers.splice(0,this._onload_handlers.length);
	}
	,toString: function() {
		return "Texture (" + Std.string(this.texture) + ") (" + this.width + "x" + this.height + ") real size(" + this.width_actual + "x" + this.height_actual + ") " + Std.string(this.filter) + " filtering. " + Std.string(this.clamp) + " clamp. id: " + this.id;
	}
	,estimated_memory: function() {
		var _bytes = this.width_actual * this.height_actual * 4;
		return Luxe.utils.bytes_to_string(_bytes);
	}
	,check_size: function() {
		var max_size = snow.modules.opengl.web.GL.getParameter(3379);
		if(this.asset.image.width_actual > max_size) throw "texture bigger than MAX_TEXTURE_SIZE (" + max_size + ") " + this.asset.id;
		if(this.asset.image.height_actual > max_size) throw "texture bigger than MAX_TEXTURE_SIZE (" + max_size + ") " + this.asset.id;
	}
	,reset: function() {
		this.texture = snow.modules.opengl.web.GL.createTexture();
		this.bind();
		snow.modules.opengl.web.GL.texImage2D(3553,0,6408,this.width_actual,this.height_actual,0,6408,5121,this.asset.image.pixels);
		this._set_filter(this.filter);
		this._set_clamp(this.clamp);
	}
	,from_asset: function(_asset) {
		if(_asset == null) throw "null asset passed to Texture.from_asset";
		this.asset = _asset;
		this.check_size();
		this.id = this.asset.id;
		this.width = this.asset.image.width;
		this.height = this.asset.image.height;
		this.width_actual = this.asset.image.width_actual;
		this.height_actual = this.asset.image.height_actual;
	}
	,generate_mipmaps: function() {
		var _g = this;
		this.set_onload(function(t) {
			_g.bind();
			snow.modules.opengl.web.GL.generateMipmap(3553);
		});
	}
	,bind: function() {
		Luxe.renderer.state.activeTexture(33984 + this.slot);
		Luxe.renderer.state.bindTexture2D(this.texture);
	}
	,get_pixel: function(_pos) {
		if(this.asset.image.pixels == null) return null;
		var x = _pos.x | 0;
		var y = _pos.y | 0;
		return { r : (function($this) {
			var $r;
			var $int = $this.asset.image.pixels[(y * $this.width + x) * 4];
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) / 255.0, g : (function($this) {
			var $r;
			var int1 = $this.asset.image.pixels[(y * $this.width + x) * 4 + 1];
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this)) / 255.0, b : (function($this) {
			var $r;
			var int2 = $this.asset.image.pixels[(y * $this.width + x) * 4 + 2];
			$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
			return $r;
		}(this)) / 255.0, a : (function($this) {
			var $r;
			var int3 = $this.asset.image.pixels[(y * $this.width + x) * 4 + 3];
			$r = int3 < 0?4294967296.0 + int3:int3 + 0.0;
			return $r;
		}(this)) / 255.0};
	}
	,set_pixel: function(_pos,_color) {
		if(this.asset.image.pixels == null) return;
		var x = _pos.x | 0;
		var y = _pos.y | 0;
		this.asset.image.pixels[(y * this.width + x) * 4] = _color.r * 255 | 0;
		this.asset.image.pixels[(y * this.width + x) * 4 + 1] = _color.g * 255 | 0;
		this.asset.image.pixels[(y * this.width + x) * 4 + 2] = _color.b * 255 | 0;
		this.asset.image.pixels[(y * this.width + x) * 4 + 3] = _color.a * 255 | 0;
	}
	,lock: function() {
		return true;
	}
	,unlock: function() {
		if(this.asset.image.pixels != null) {
			Luxe.renderer.state.bindTexture2D(this.texture);
			snow.modules.opengl.web.GL.texImage2D(3553,0,6408,this.width,this.height,0,6408,5121,this.asset.image.pixels);
			this.asset.image.pixels = null;
		}
	}
	,drop: function() {
		luxe.resource.Resource.prototype.drop.call(this);
		this.destroy();
	}
	,activate: function(att) {
	}
	,destroy: function() {
		if(this.texture != null) snow.modules.opengl.web.GL.deleteTexture(this.texture);
	}
	,_set_clamp: function(_clamp) {
		switch(_clamp[1]) {
		case 0:
			snow.modules.opengl.web.GL.texParameteri(3553,10242,33071);
			snow.modules.opengl.web.GL.texParameteri(3553,10243,33071);
			break;
		case 1:
			snow.modules.opengl.web.GL.texParameteri(3553,10242,10497);
			snow.modules.opengl.web.GL.texParameteri(3553,10243,10497);
			break;
		case 2:
			snow.modules.opengl.web.GL.texParameteri(3553,10242,33648);
			snow.modules.opengl.web.GL.texParameteri(3553,10243,33648);
			break;
		}
	}
	,set_clamp: function(_clamp) {
		var _g = this;
		if(this.clamp == null) return this.clamp = _clamp;
		if(this.loaded == false) this.set_onload(function(t) {
			_g.bind();
			_g._set_clamp(_clamp);
		}); else {
			this.bind();
			this._set_clamp(_clamp);
		}
		return _clamp;
	}
	,_set_filter: function(_filter) {
		switch(_filter[1]) {
		case 1:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9729);
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9729);
			break;
		case 0:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9728);
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9728);
			break;
		case 2:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9984);
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9984);
			break;
		case 3:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9985);
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9985);
			break;
		case 4:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9986);
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9986);
			break;
		case 5:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9987);
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9987);
			break;
		}
	}
	,_set_filter_min: function(_filter) {
		switch(_filter[1]) {
		case 1:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9729);
			break;
		case 0:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9728);
			break;
		case 2:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9984);
			break;
		case 3:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9985);
			break;
		case 4:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9986);
			break;
		case 5:
			snow.modules.opengl.web.GL.texParameteri(3553,10241,9987);
			break;
		}
	}
	,_set_filter_mag: function(_filter) {
		switch(_filter[1]) {
		case 1:
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9729);
			break;
		case 0:
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9728);
			break;
		case 2:
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9984);
			break;
		case 3:
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9985);
			break;
		case 4:
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9986);
			break;
		case 5:
			snow.modules.opengl.web.GL.texParameteri(3553,10240,9987);
			break;
		}
	}
	,set_filter: function(_filter) {
		var _g = this;
		if(this.filter == null) return this.filter = _filter;
		if(this.loaded == false) this.set_onload(function(t) {
			_g.bind();
			_g._set_filter(_filter);
		}); else {
			this.bind();
			this._set_filter(_filter);
		}
		return this.filter = _filter;
	}
	,set_filter_min: function(_filter) {
		var _g = this;
		if(this.loaded == false) this.set_onload(function(t) {
			_g.bind();
			_g._set_filter_min(_filter);
		}); else {
			this.bind();
			this._set_filter_min(_filter);
		}
		return this.filter_min = _filter;
	}
	,set_filter_mag: function(_filter) {
		var _g = this;
		if(this.loaded == false) this.set_onload(function(t) {
			_g.bind();
			_g._set_filter_mag(_filter);
		}); else {
			this.bind();
			this._set_filter_mag(_filter);
		}
		return this.filter_mag = _filter;
	}
	,__class__: phoenix.Texture
	,__properties__: {set_clamp:"set_clamp",set_filter_mag:"set_filter_mag",set_filter_min:"set_filter_min",set_filter:"set_filter",set_onload:"set_onload"}
});
phoenix.RenderTexture = function(_manager,_size) {
	phoenix.Texture.call(this,_manager,6);
	if(_size == null) new phoenix.Vector(Luxe.core.screen.w,Luxe.core.screen.h); else _size;
	this.width = this.width_actual = _size.x | 0;
	this.height = this.height_actual = _size.y | 0;
	this.texture = snow.modules.opengl.web.GL.createTexture();
	this.bind();
	snow.modules.opengl.web.GL.texImage2D(3553,0,6408,this.width,this.height,0,6408,5121,null);
	this._set_filter(phoenix.FilterType.linear);
	this._set_clamp(phoenix.ClampType.edge);
	this.fbo = snow.modules.opengl.web.GL.createFramebuffer();
	this.bindBuffer();
	this.renderbuffer = snow.modules.opengl.web.GL.createRenderbuffer();
	this.bindRenderBuffer();
	snow.modules.opengl.web.GL.renderbufferStorage(36161,33189,this.width,this.height);
	snow.modules.opengl.web.GL.framebufferTexture2D(36160,36064,3553,this.texture,0);
	snow.modules.opengl.web.GL.framebufferRenderbuffer(36160,36096,36161,this.renderbuffer);
	var status = snow.modules.opengl.web.GL.checkFramebufferStatus(36160);
	switch(status) {
	case 36053:
		break;
	case 36054:
		throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
		break;
	case 36055:
		throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
		break;
	case 36057:
		throw "Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
		break;
	case 36061:
		throw "Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED";
		break;
	default:
		throw "Incomplete framebuffer: " + status;
	}
	this.unbindBuffer();
	this.unbindRenderBuffer();
	this.loaded = true;
};
$hxClasses["phoenix.RenderTexture"] = phoenix.RenderTexture;
phoenix.RenderTexture.__name__ = ["phoenix","RenderTexture"];
phoenix.RenderTexture.__super__ = phoenix.Texture;
phoenix.RenderTexture.prototype = $extend(phoenix.Texture.prototype,{
	destroy: function() {
		snow.modules.opengl.web.GL.deleteFramebuffer(this.fbo);
		snow.modules.opengl.web.GL.deleteRenderbuffer(this.renderbuffer);
		phoenix.Texture.prototype.destroy.call(this);
	}
	,bindBuffer: function() {
		Luxe.renderer.state.bindFramebuffer(this.fbo);
	}
	,unbindBuffer: function(_other) {
		Luxe.renderer.state.bindFramebuffer(_other);
	}
	,bindRenderBuffer: function() {
		Luxe.renderer.state.bindRenderbuffer(this.renderbuffer);
	}
	,unbindRenderBuffer: function(_other) {
		Luxe.renderer.state.bindRenderbuffer(_other);
	}
	,__class__: phoenix.RenderTexture
});
phoenix.Renderer = function(_core,_asset) {
	this.stop_count = 0;
	this.stop = false;
	this.should_clear = true;
	this.core = _core;
	this.font_asset = _asset;
	this.default_fbo = snow.modules.opengl.web.GL.getParameter(36006);
	this.default_rbo = snow.modules.opengl.web.GL.getParameter(36007);
	null;
};
$hxClasses["phoenix.Renderer"] = phoenix.Renderer;
phoenix.Renderer.__name__ = ["phoenix","Renderer"];
phoenix.Renderer.prototype = {
	init: function() {
		this.state = new phoenix.RenderState(this);
		this.clear_color = new phoenix.Color().rgb(1710618);
		this.stats = new phoenix.RendererStats();
		this.batchers = [];
		this.target_size = new phoenix.Vector(Luxe.core.screen.w,Luxe.core.screen.h);
		this.camera = new phoenix.Camera();
		this.default_render_path = new phoenix.RenderPath(this);
		this.render_path = this.default_render_path;
		this.create_default_shaders();
		this.batcher = new phoenix.Batcher(this,"default batcher");
		this.batcher.set_layer(1);
		this.add_batch(this.batcher);
		this.create_default_font();
		if(Luxe.core.app.config.render.depth) {
			this.state.enable(2929);
			this.state.depth_function(515);
			snow.modules.opengl.web.GL.clearDepth(1.0);
		}
		snow.modules.opengl.web.GL.enable(3042);
		snow.modules.opengl.web.GL.blendFunc(770,771);
		snow.modules.opengl.web.GL.pixelStorei(37441,0);
	}
	,destroy: function() {
		this.clear(new phoenix.Color().rgb(16729099));
	}
	,sort_batchers: function(a,b) {
		if(a.layer < b.layer) return -1;
		if(a.layer > b.layer) return 1;
		if(a.sequence < b.sequence) return -1;
		if(a.sequence > b.sequence) return 1;
		return 1;
	}
	,add_batch: function(batch) {
		this.batchers.push(batch);
		this.batchers.sort($bind(this,this.sort_batchers));
	}
	,remove_batch: function(batch) {
		HxOverrides.remove(this.batchers,batch);
	}
	,create_batcher: function(options) {
		var _new_batcher_layer = 2;
		if(options != null) {
			if(options.name == null) options.name = "batcher";
			if(options.layer == null) options.layer = _new_batcher_layer;
			if(options.camera == null) options.camera = new phoenix.Camera();
		} else options = { name : "batcher", camera : new phoenix.Camera(), layer : _new_batcher_layer};
		var _batcher = new phoenix.Batcher(this,options.name);
		_batcher.view = options.camera;
		_batcher.set_layer(options.layer);
		if(options.no_add == null || options.no_add == false) this.add_batch(_batcher);
		return _batcher;
	}
	,clear: function(_color) {
		if(_color == null) _color = this.clear_color;
		snow.modules.opengl.web.GL.clearColor(_color.r,_color.g,_color.b,_color.a);
		if(Luxe.core.app.config.render.depth) {
			snow.modules.opengl.web.GL.clear(16640);
			snow.modules.opengl.web.GL.clearDepth(1.0);
		} else snow.modules.opengl.web.GL.clear(16384);
	}
	,blend_mode: function(_src_mode,_dst_mode) {
		if(_dst_mode == null) _dst_mode = 771;
		if(_src_mode == null) _src_mode = 770;
		snow.modules.opengl.web.GL.blendFunc(_src_mode,_dst_mode);
	}
	,blend_equation: function(_equation) {
		if(_equation == null) _equation = 32774;
		snow.modules.opengl.web.GL.blendEquation(_equation);
	}
	,internal_resized: function(_w,_h) {
		if(this.get_target() == null) this.target_size.set_xy(_w,_h);
	}
	,process: function() {
		if(this.stop) return;
		if(this.should_clear) this.clear(this.clear_color);
		this.stats.batchers = this.batchers.length;
		this.stats.reset();
		this.render_path.render(this.batchers,this.stats);
	}
	,onresize: function(e) {
	}
	,set_vsync: function(_vsync) {
		Luxe.core.app.windowing.enable_vsync(_vsync);
		return this.vsync = _vsync;
	}
	,get_vsync: function() {
		return this.vsync;
	}
	,get_target: function() {
		return this.target;
	}
	,set_target: function(_target) {
		if(_target != null) {
			this.target_size.set_x(_target.width);
			this.target_size.set_y(_target.height);
			this.state.bindFramebuffer(_target.fbo);
		} else {
			this.target_size.set_x(Luxe.core.screen.w);
			this.target_size.set_y(Luxe.core.screen.h);
			this.state.bindFramebuffer();
		}
		return this.target = _target;
	}
	,create_default_shaders: function() {
		var vert = haxe.Resource.getString("default.vert.glsl");
		var frag = haxe.Resource.getString("default.frag.glsl");
		var frag_textured = haxe.Resource.getString("default.frag.textured.glsl");
		var frag_bitmapfont = haxe.Resource.getString("default.frag.bitmapfont.glsl");
		var ext = snow.modules.opengl.web.GL.current_context.getExtension("OES_standard_derivatives");
		frag = "precision mediump float;\n" + frag;
		frag_textured = "precision mediump float;\n" + frag_textured;
		frag_bitmapfont = "#extension GL_OES_standard_derivatives : enable\n#extension OES_standard_derivatives : enable\nprecision mediump float;\n" + frag_bitmapfont;
		var _plain = new phoenix.Shader(this.core.resources);
		var _textured = new phoenix.Shader(this.core.resources);
		var _font = new phoenix.Shader(this.core.resources);
		var _dvs = "default vertex shader";
		_plain.id = "default_shader";
		_textured.id = "default_shader_textured";
		_font.id = "default_shader_bitmapfont";
		_plain.from_string(vert,frag,_dvs,"default fragment shader",false);
		_textured.from_string(vert,frag_textured,_dvs,"default textured shader",false);
		_font.from_string(vert,frag_bitmapfont,_dvs,"default bitmapfont shader",false);
		this.shaders = { plain : { shader : _plain, source : { vert : vert, frag : frag}}, textured : { shader : _textured, source : { vert : vert, frag : frag_textured}}, bitmapfont : { shader : _font, source : { vert : vert, frag : frag_bitmapfont}}};
		null;
	}
	,create_default_font: function() {
		if(this.font_asset == null) throw snow.types.Error.error("failed to create the default font... font_asset was null.");
		this.font = new phoenix.BitmapFont({ id : "default", resources : this.core.resources});
		var _font_texture = phoenix.Texture.load_from_pixels(this.font_asset.id,this.font_asset.image.width_actual,this.font_asset.image.height_actual,this.font_asset.image.pixels,true);
		if(_font_texture == null) throw snow.types.Error.error("failed to create the default font... _font_texture was null.");
		_font_texture.set_filter_min(phoenix.FilterType.linear);
		this.font.from_string(haxe.Resource.getString("default.fnt"),null,[_font_texture]);
		null;
	}
	,__class__: phoenix.Renderer
	,__properties__: {set_target:"set_target",get_target:"get_target",set_vsync:"set_vsync",get_vsync:"get_vsync"}
};
phoenix.RendererStats = function() {
	this.vert_count = 0;
	this.group_count = 0;
	this.draw_calls = 0;
	this.visible_count = 0;
	this.static_batched_count = 0;
	this.dynamic_batched_count = 0;
	this.geometry_count = 0;
	this.batchers = 0;
};
$hxClasses["phoenix.RendererStats"] = phoenix.RendererStats;
phoenix.RendererStats.__name__ = ["phoenix","RendererStats"];
phoenix.RendererStats.prototype = {
	reset: function() {
		this.geometry_count = 0;
		this.dynamic_batched_count = 0;
		this.static_batched_count = 0;
		this.visible_count = 0;
		this.group_count = 0;
		this.draw_calls = 0;
		this.vert_count = 0;
	}
	,toString: function() {
		return "Renderer Statistics\n" + "\tbatcher count : " + this.batchers + "\n" + "\ttotal geometry : " + this.geometry_count + "\n" + "\tvisible geometry : " + this.visible_count + "\n" + "\tdynamic batched geometry : " + this.dynamic_batched_count + "\n" + "\tstatic batched geometry : " + this.static_batched_count + "\n" + "\ttotal draw calls : " + this.draw_calls + "\n" + "\ttotal vertices : " + this.vert_count;
	}
	,__class__: phoenix.RendererStats
};
phoenix.Shader = function(_manager) {
	this.normal_attribute = 3;
	this.color_attribute = 2;
	this.tcoord_attribute = 1;
	this.vert_attribute = 0;
	this.frag_source_name = "";
	this.vertex_source_name = "";
	this.frag_source = "";
	this.vertex_source = "";
	this.log = "";
	this.errors = "";
	luxe.resource.Resource.call(this,_manager,8);
	this.uniforms = new haxe.ds.StringMap();
	this.uniform_textures = new haxe.ds.StringMap();
};
$hxClasses["phoenix.Shader"] = phoenix.Shader;
phoenix.Shader.__name__ = ["phoenix","Shader"];
phoenix.Shader.load = function(_psid,_vsid,_onload,_silent) {
	if(_silent == null) _silent = false;
	var _shader = new phoenix.Shader(Luxe.resources);
	var _frag_shader = "";
	var _vert_shader = "";
	if(_vsid == "default" || _vsid == "") {
		_vert_shader = Luxe.renderer.shaders.plain.source.vert;
		null;
	}
	if(_psid == "default" || _psid == "") {
		_frag_shader = Luxe.renderer.shaders.plain.source.frag;
		null;
	} else if(_psid == "textured") {
		_frag_shader = Luxe.renderer.shaders.textured.source.frag;
		null;
	}
	if(_vert_shader.length == 0) Luxe.loadText(_vsid,function(_vert_asset) {
		_vert_shader = _vert_asset.text;
		if(_vert_shader.length == 0) null; else if(_frag_shader.length == 0) null; else {
			_shader.from_string(_vert_shader,_frag_shader,_vsid,_psid,false);
			Luxe.resources.cache(_shader);
			if(_onload != null) _onload(_shader);
			if(!_silent) null;
		}
	});
	if(_frag_shader.length == 0) Luxe.loadText(_psid,function(_frag_asset) {
		var prefixes = "precision mediump float;\n";
		_frag_shader = prefixes + _frag_asset.text;
		if(_vert_shader.length == 0) null; else if(_frag_shader.length == 0) null; else {
			_shader.from_string(_vert_shader,_frag_shader,_vsid,_psid,false);
			Luxe.resources.cache(_shader);
			if(_onload != null) _onload(_shader);
			if(!_silent) null;
		}
	});
	_shader.id = _psid + "|" + _vsid;
	return _shader;
};
phoenix.Shader.__super__ = luxe.resource.Resource;
phoenix.Shader.prototype = $extend(luxe.resource.Resource.prototype,{
	activate: function() {
		if(this.program != null) Luxe.renderer.state.useProgram(this.program);
	}
	,deactivate: function() {
		Luxe.renderer.state.useProgram(null);
	}
	,clone: function() {
		var _clone = new phoenix.Shader(this.manager);
		_clone.id = this.id + ".clone." + Luxe.utils.uniqueid();
		_clone.from_string(this.vertex_source,this.frag_source,this.vertex_source_name,this.frag_source_name,false);
		return _clone;
	}
	,set_int: function(_name,_value) {
		if(this.uniforms.exists(_name)) {
			var _uniform = this.uniforms.get(_name);
			_uniform.value = _value;
		} else {
			var _uniform1 = { name : _name, value : _value, type : 1, location : snow.modules.opengl.web.GL.getUniformLocation(this.program,_name)};
			this.uniforms.set(_name,_uniform1);
		}
	}
	,set_float: function(_name,_value) {
		if(this.uniforms.exists(_name)) {
			var _uniform = this.uniforms.get(_name);
			_uniform.value = _value;
		} else {
			var _uniform1 = { name : _name, value : _value, type : 2, location : snow.modules.opengl.web.GL.getUniformLocation(this.program,_name)};
			this.uniforms.set(_name,_uniform1);
		}
	}
	,set_vector2: function(_name,_value) {
		if(this.uniforms.exists(_name)) {
			var _uniform = this.uniforms.get(_name);
			_uniform.value = _value;
		} else {
			var _uniform1 = { name : _name, value : _value, type : 3, location : snow.modules.opengl.web.GL.getUniformLocation(this.program,_name)};
			this.uniforms.set(_name,_uniform1);
		}
	}
	,set_vector3: function(_name,_value) {
		if(this.uniforms.exists(_name)) {
			var _uniform = this.uniforms.get(_name);
			_uniform.value = _value;
		} else {
			var _uniform1 = { name : _name, value : _value, type : 4, location : snow.modules.opengl.web.GL.getUniformLocation(this.program,_name)};
			this.uniforms.set(_name,_uniform1);
		}
	}
	,set_vector4: function(_name,_value) {
		if(this.uniforms.exists(_name)) {
			var _uniform = this.uniforms.get(_name);
			_uniform.value = _value;
		} else {
			var _uniform1 = { name : _name, value : _value, type : 5, location : snow.modules.opengl.web.GL.getUniformLocation(this.program,_name)};
			this.uniforms.set(_name,_uniform1);
		}
	}
	,set_color: function(_name,_value) {
		if(this.uniforms.exists(_name)) {
			var _uniform = this.uniforms.get(_name);
			_uniform.value = _value;
		} else {
			var _uniform1 = { name : _name, value : _value, type : 6, location : snow.modules.opengl.web.GL.getUniformLocation(this.program,_name)};
			this.uniforms.set(_name,_uniform1);
		}
	}
	,set_texture: function(_name,_value) {
		if(this.uniforms.exists(_name)) {
			var _uniform = this.uniforms.get(_name);
			_uniform.value = _value;
			this.uniform_textures.set(_name,_value);
		} else {
			var _uniform1 = { name : _name, value : _value, type : 7, location : snow.modules.opengl.web.GL.getUniformLocation(this.program,_name)};
			this.uniforms.set(_name,_uniform1);
			this.uniform_textures.set(_name,_value);
		}
	}
	,compile: function(_type,_source,_verbose) {
		if(_verbose == null) _verbose = false;
		var _shader = snow.modules.opengl.web.GL.createShader(_type);
		snow.modules.opengl.web.GL.shaderSource(_shader,_source);
		snow.modules.opengl.web.GL.compileShader(_shader);
		var shader_log = "";
		if(_verbose) {
			shader_log = snow.modules.opengl.web.GL.getShaderInfoLog(_shader);
			if(shader_log.length > 0) {
				this.log += "\n\t :: start -- (" + (_type == 35632?"fragment":"vertex") + ") Shader compile log -- " + this.id + "\n";
				this.log += "\t\t" + shader_log + "\n";
				this.log += "\t :: end -- (" + (_type == 35632?"fragment":"vertex") + ") Shader compile log -- " + this.id;
			}
		}
		if(snow.modules.opengl.web.GL.getShaderParameter(_shader,35713) == 0) {
			var _info;
			if(_type == 35632) _info = "fragment"; else _info = "vertex";
			if(_type == 35632) _info += "(" + this.frag_source_name + ")"; else _info += "(" + this.vertex_source_name + ")";
			this.errors += "\tFailed to compile shader (" + _info + ") : \n";
			if(!_verbose) shader_log = snow.modules.opengl.web.GL.getShaderInfoLog(_shader);
			this.errors += "\t\t" + shader_log;
			snow.modules.opengl.web.GL.deleteShader(_shader);
			_shader = null;
			return null;
		}
		return _shader;
	}
	,link: function() {
		this.program = snow.modules.opengl.web.GL.createProgram();
		snow.modules.opengl.web.GL.attachShader(this.program,this.vert_shader);
		snow.modules.opengl.web.GL.attachShader(this.program,this.frag_shader);
		snow.modules.opengl.web.GL.bindAttribLocation(this.program,this.vert_attribute,"vertexPosition");
		snow.modules.opengl.web.GL.bindAttribLocation(this.program,this.tcoord_attribute,"vertexTCoord");
		snow.modules.opengl.web.GL.bindAttribLocation(this.program,this.color_attribute,"vertexColor");
		snow.modules.opengl.web.GL.bindAttribLocation(this.program,this.normal_attribute,"vertexNormal");
		snow.modules.opengl.web.GL.linkProgram(this.program);
		if(snow.modules.opengl.web.GL.getProgramParameter(this.program,35714) == 0) {
			this.errors += "\tFailed to link shader program:";
			this.add_error("\t\t" + snow.modules.opengl.web.GL.getProgramInfoLog(this.program));
			snow.modules.opengl.web.GL.deleteProgram(this.program);
			this.program = null;
			return;
		}
		this.activate();
		this.projectionmatrix_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"projectionMatrix");
		this.modelviewmatrix_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"modelViewMatrix");
		this.tex0_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"tex0");
		this.tex1_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"tex1");
		this.tex2_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"tex2");
		this.tex3_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"tex3");
		this.tex4_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"tex4");
		this.tex5_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"tex5");
		this.tex6_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"tex6");
		this.tex7_attribute = snow.modules.opengl.web.GL.getUniformLocation(this.program,"tex7");
	}
	,drop: function() {
		luxe.resource.Resource.prototype.drop.call(this);
		this.destroy();
	}
	,destroy: function() {
		if(this.vert_shader != null) snow.modules.opengl.web.GL.deleteShader(this.vert_shader);
		if(this.frag_shader != null) snow.modules.opengl.web.GL.deleteShader(this.frag_shader);
		if(this.program != null) snow.modules.opengl.web.GL.deleteProgram(this.program);
	}
	,from_string: function(_vertex_source,_fragment_source,_vertex_name,_frag_name,_verbose) {
		if(_verbose == null) _verbose = false;
		if(_frag_name == null) _frag_name = "";
		if(_vertex_name == null) _vertex_name = "";
		var _g = this;
		this.destroy();
		this.frag_source = _fragment_source;
		this.vertex_source = _vertex_source;
		this.frag_source_name = _frag_name;
		this.vertex_source_name = _vertex_name;
		this.vert_shader = this.compile(35633,this.vertex_source,_verbose);
		this.frag_shader = this.compile(35632,this.frag_source,_verbose);
		if(this.vert_shader == null || this.frag_shader == null) {
			haxe.Log.trace("   i / shader / " + ("failed to create shader : " + _g.id + "\n\n" + _g.log + "\n" + _g.errors),{ fileName : "Shader.hx", lineNumber : 419, className : "phoenix.Shader", methodName : "from_string"});
			throw ":( shader errors ";
		}
		this.link();
		if(this.program == null) {
			haxe.Log.trace("   i / shader / " + ("failed to create shader : " + _g.id + "\n\n" + _g.log + "\n" + _g.errors),{ fileName : "Shader.hx", lineNumber : 419, className : "phoenix.Shader", methodName : "from_string"});
			throw ":( shader errors ";
		} else if(_verbose && this.log.length > 0) haxe.Log.trace("   i / shader / " + this.log,{ fileName : "Shader.hx", lineNumber : 436, className : "phoenix.Shader", methodName : "from_string"});
		if(this.program == null) return false;
		return true;
	}
	,toString: function() {
		return "Shader(" + this.id + ") vert:" + this.vertex_source_name + " / frag: " + this.frag_source_name;
	}
	,apply_uniforms: function() {
		snow.modules.opengl.web.GL.uniform1i(this.tex0_attribute,0);
		snow.modules.opengl.web.GL.uniform1i(this.tex1_attribute,1);
		snow.modules.opengl.web.GL.uniform1i(this.tex2_attribute,2);
		snow.modules.opengl.web.GL.uniform1i(this.tex3_attribute,3);
		snow.modules.opengl.web.GL.uniform1i(this.tex4_attribute,4);
		snow.modules.opengl.web.GL.uniform1i(this.tex5_attribute,5);
		snow.modules.opengl.web.GL.uniform1i(this.tex6_attribute,6);
		snow.modules.opengl.web.GL.uniform1i(this.tex7_attribute,7);
		var $it0 = this.uniforms.iterator();
		while( $it0.hasNext() ) {
			var uniform = $it0.next();
			var _g = uniform.type;
			switch(_g) {
			case 1:
				this.apply_int(uniform.location,uniform.value);
				break;
			case 2:
				this.apply_float(uniform.location,uniform.value);
				break;
			case 3:
				this.apply_vec2(uniform.location,uniform.value);
				break;
			case 4:
				this.apply_vec3(uniform.location,uniform.value);
				break;
			case 5:
				this.apply_vec4(uniform.location,uniform.value);
				break;
			case 6:
				this.apply_color(uniform.location,uniform.value);
				break;
			case 7:
				this.apply_texture(uniform.location,uniform.value);
				break;
			case 0:
				break;
			}
		}
	}
	,location: function(_name) {
		return snow.modules.opengl.web.GL.getUniformLocation(this.program,_name);
	}
	,apply_int: function(_location,_int) {
		snow.modules.opengl.web.GL.uniform1i(_location,_int);
	}
	,apply_float: function(_location,_float) {
		snow.modules.opengl.web.GL.uniform1f(_location,_float);
	}
	,apply_vec2: function(_location,_vec) {
		snow.modules.opengl.web.GL.uniform2f(_location,_vec.x,_vec.y);
	}
	,apply_vec3: function(_location,_vec) {
		snow.modules.opengl.web.GL.uniform3f(_location,_vec.x,_vec.y,_vec.z);
	}
	,apply_vec4: function(_location,_vec) {
		snow.modules.opengl.web.GL.uniform4f(_location,_vec.x,_vec.y,_vec.z,_vec.w);
	}
	,apply_color: function(_location,_color) {
		snow.modules.opengl.web.GL.uniform4f(_location,_color.r,_color.g,_color.b,_color.a);
	}
	,apply_texture: function(_location,_tex) {
		snow.modules.opengl.web.GL.uniform1i(_location,_tex.slot);
		_tex.bind();
	}
	,add_log: function(_log) {
		this.log += _log;
	}
	,add_error: function(_error) {
		this.errors += _error;
	}
	,__class__: phoenix.Shader
});
phoenix._Shader = {};
phoenix._Shader.UniformType_Impl_ = function() { };
$hxClasses["phoenix._Shader.UniformType_Impl_"] = phoenix._Shader.UniformType_Impl_;
phoenix._Shader.UniformType_Impl_.__name__ = ["phoenix","_Shader","UniformType_Impl_"];
phoenix.FilterType = $hxClasses["phoenix.FilterType"] = { __ename__ : ["phoenix","FilterType"], __constructs__ : ["nearest","linear","mip_nearest_nearest","mip_linear_nearest","mip_nearest_linear","mip_linear_linear"] };
phoenix.FilterType.nearest = ["nearest",0];
phoenix.FilterType.nearest.toString = $estr;
phoenix.FilterType.nearest.__enum__ = phoenix.FilterType;
phoenix.FilterType.linear = ["linear",1];
phoenix.FilterType.linear.toString = $estr;
phoenix.FilterType.linear.__enum__ = phoenix.FilterType;
phoenix.FilterType.mip_nearest_nearest = ["mip_nearest_nearest",2];
phoenix.FilterType.mip_nearest_nearest.toString = $estr;
phoenix.FilterType.mip_nearest_nearest.__enum__ = phoenix.FilterType;
phoenix.FilterType.mip_linear_nearest = ["mip_linear_nearest",3];
phoenix.FilterType.mip_linear_nearest.toString = $estr;
phoenix.FilterType.mip_linear_nearest.__enum__ = phoenix.FilterType;
phoenix.FilterType.mip_nearest_linear = ["mip_nearest_linear",4];
phoenix.FilterType.mip_nearest_linear.toString = $estr;
phoenix.FilterType.mip_nearest_linear.__enum__ = phoenix.FilterType;
phoenix.FilterType.mip_linear_linear = ["mip_linear_linear",5];
phoenix.FilterType.mip_linear_linear.toString = $estr;
phoenix.FilterType.mip_linear_linear.__enum__ = phoenix.FilterType;
phoenix.ClampType = $hxClasses["phoenix.ClampType"] = { __ename__ : ["phoenix","ClampType"], __constructs__ : ["edge","repeat","mirror"] };
phoenix.ClampType.edge = ["edge",0];
phoenix.ClampType.edge.toString = $estr;
phoenix.ClampType.edge.__enum__ = phoenix.ClampType;
phoenix.ClampType.repeat = ["repeat",1];
phoenix.ClampType.repeat.toString = $estr;
phoenix.ClampType.repeat.__enum__ = phoenix.ClampType;
phoenix.ClampType.mirror = ["mirror",2];
phoenix.ClampType.mirror.toString = $estr;
phoenix.ClampType.mirror.__enum__ = phoenix.ClampType;
phoenix.Transform = function() {
	this._destroying = false;
	this._cleaning = false;
	this._setup = true;
	this.dirty = true;
	luxe.ID.call(this,"transform");
	this.set_local(new phoenix.Spatial());
	this.set_world(new phoenix.Spatial());
	this._origin_undo_matrix = new phoenix.Matrix();
	this._pos_matrix = new phoenix.Matrix();
	this._rotation_matrix = new phoenix.Matrix();
	this.set_origin(new phoenix.Vector());
	this.local.pos_changed = $bind(this,this.on_local_pos_change);
	this.local.rotation_changed = $bind(this,this.on_local_rotation_change);
	this.local.scale_changed = $bind(this,this.on_local_scale_change);
	this._setup = false;
};
$hxClasses["phoenix.Transform"] = phoenix.Transform;
phoenix.Transform.__name__ = ["phoenix","Transform"];
phoenix.Transform.__super__ = luxe.ID;
phoenix.Transform.prototype = $extend(luxe.ID.prototype,{
	destroy: function() {
		this._destroying = true;
		if(this.parent != null) this.parent.unlisten($bind(this,this.on_parent_cleaned));
		this._clean_handlers = null;
		this._dirty_handlers = null;
		this._pos_handlers = null;
		this._rotation_handlers = null;
		this._scale_handlers = null;
		this._origin_handlers = null;
		this._parent_handlers = null;
		this.local.destroy();
		((function($this) {
			var $r;
			if(!$this._destroying) {
				if($this.parent != null) {
					if($this.parent.dirty) $this.parent.clean();
				}
				if($this.dirty && !$this._cleaning) {
					if(!$this.dirty) null; else {
						$this._cleaning = true;
						$this._pos_matrix.makeTranslation($this.local.pos.x,$this.local.pos.y,$this.local.pos.z);
						$this._rotation_matrix.makeRotationFromQuaternion($this.local.rotation);
						$this._origin_undo_matrix.makeTranslation(-$this.origin.x,-$this.origin.y,-$this.origin.z);
						$this.local.matrix.makeTranslation($this.origin.x,$this.origin.y,$this.origin.z);
						$this.local.matrix.scale($this.local.scale);
						$this.local.matrix.multiply($this._rotation_matrix);
						$this.local.matrix.setPosition($this.local.pos);
						$this.local.matrix.multiply($this._origin_undo_matrix);
						if($this.parent != null) $this.get_world().set_matrix($this.get_world().get_matrix().multiplyMatrices($this.parent.get_world().get_matrix(),$this.local.matrix)); else $this.get_world().set_matrix($this.local.matrix.clone());
						$this.get_world().decompose(false);
						$this.dirty = false;
						if($this.dirty && !$this._setup && $this._dirty_handlers != null && $this._dirty_handlers.length > 0) $this.propagate_dirty();
						$this.dirty;
						$this._cleaning = false;
						if($this._clean_handlers != null && $this._clean_handlers.length > 0) $this.propagate_clean();
					}
				}
			}
			$r = $this.world;
			return $r;
		}(this))).destroy();
		this.local = null;
		this.world = null;
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		this.origin = null;
		if(this._origin_handlers != null && this._origin_handlers.length > 0) this.propagate_origin(this.origin);
		this.origin;
		this._origin_undo_matrix = null;
		this._pos_matrix = null;
		this._rotation_matrix = null;
	}
	,set_dirty: function(_dirty) {
		this.dirty = _dirty;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		return this.dirty;
	}
	,on_local_pos_change: function(v) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		if(this._pos_handlers != null && this._pos_handlers.length > 0) this.propagate_pos(v);
	}
	,on_local_rotation_change: function(r) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		if(this._rotation_handlers != null && this._rotation_handlers.length > 0) this.propagate_rotation(r);
	}
	,on_local_scale_change: function(s) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		if(this._scale_handlers != null && this._scale_handlers.length > 0) this.propagate_scale(s);
	}
	,on_parent_cleaned: function(p) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
	}
	,get_local: function() {
		return this.local;
	}
	,set_local: function(l) {
		if(l != null) {
			this.dirty = true;
			if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
			this.dirty;
			l.pos_changed = $bind(this,this.on_local_pos_change);
			l.rotation_changed = $bind(this,this.on_local_rotation_change);
			l.scale_changed = $bind(this,this.on_local_scale_change);
		}
		return this.local = l;
	}
	,get_world: function() {
		if(!this._destroying) {
			if(this.parent != null) {
				if(this.parent.dirty) this.parent.clean();
			}
			if(this.dirty && !this._cleaning) {
				if(!this.dirty) null; else {
					this._cleaning = true;
					this._pos_matrix.makeTranslation(this.local.pos.x,this.local.pos.y,this.local.pos.z);
					this._rotation_matrix.makeRotationFromQuaternion(this.local.rotation);
					this._origin_undo_matrix.makeTranslation(-this.origin.x,-this.origin.y,-this.origin.z);
					this.local.matrix.makeTranslation(this.origin.x,this.origin.y,this.origin.z);
					this.local.matrix.scale(this.local.scale);
					this.local.matrix.multiply(this._rotation_matrix);
					this.local.matrix.setPosition(this.local.pos);
					this.local.matrix.multiply(this._origin_undo_matrix);
					if(this.parent != null) this.get_world().set_matrix(this.get_world().get_matrix().multiplyMatrices(this.parent.get_world().get_matrix(),this.local.matrix)); else this.get_world().set_matrix(this.local.matrix.clone());
					this.get_world().decompose(false);
					this.dirty = false;
					if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
					this.dirty;
					this._cleaning = false;
					if(this._clean_handlers != null && this._clean_handlers.length > 0) this.propagate_clean();
				}
			}
		}
		return this.world;
	}
	,clean_check: function() {
		if(this.parent != null) {
			if(this.parent.dirty) this.parent.clean();
		}
		if(this.dirty && !this._cleaning) {
			if(!this.dirty) null; else {
				this._cleaning = true;
				this._pos_matrix.makeTranslation(this.local.pos.x,this.local.pos.y,this.local.pos.z);
				this._rotation_matrix.makeRotationFromQuaternion(this.local.rotation);
				this._origin_undo_matrix.makeTranslation(-this.origin.x,-this.origin.y,-this.origin.z);
				this.local.matrix.makeTranslation(this.origin.x,this.origin.y,this.origin.z);
				this.local.matrix.scale(this.local.scale);
				this.local.matrix.multiply(this._rotation_matrix);
				this.local.matrix.setPosition(this.local.pos);
				this.local.matrix.multiply(this._origin_undo_matrix);
				if(this.parent != null) this.get_world().set_matrix(this.get_world().get_matrix().multiplyMatrices(this.parent.get_world().get_matrix(),this.local.matrix)); else this.get_world().set_matrix(this.local.matrix.clone());
				this.get_world().decompose(false);
				this.dirty = false;
				if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
				this.dirty;
				this._cleaning = false;
				if(this._clean_handlers != null && this._clean_handlers.length > 0) this.propagate_clean();
			}
		}
	}
	,clean: function() {
		if(!this.dirty) return;
		this._cleaning = true;
		this._pos_matrix.makeTranslation(this.local.pos.x,this.local.pos.y,this.local.pos.z);
		this._rotation_matrix.makeRotationFromQuaternion(this.local.rotation);
		this._origin_undo_matrix.makeTranslation(-this.origin.x,-this.origin.y,-this.origin.z);
		this.local.matrix.makeTranslation(this.origin.x,this.origin.y,this.origin.z);
		this.local.matrix.scale(this.local.scale);
		this.local.matrix.multiply(this._rotation_matrix);
		this.local.matrix.setPosition(this.local.pos);
		this.local.matrix.multiply(this._origin_undo_matrix);
		if(this.parent != null) this.get_world().set_matrix(this.get_world().get_matrix().multiplyMatrices(this.parent.get_world().get_matrix(),this.local.matrix)); else this.get_world().set_matrix(this.local.matrix.clone());
		this.get_world().decompose(false);
		this.dirty = false;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		this._cleaning = false;
		if(this._clean_handlers != null && this._clean_handlers.length > 0) this.propagate_clean();
	}
	,toString: function() {
		return "Transform (" + this.id + ")";
	}
	,get_origin: function() {
		return this.origin;
	}
	,set_origin: function(o) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		this.origin = o;
		if(this._origin_handlers != null && this._origin_handlers.length > 0) this.propagate_origin(this.origin);
		return this.origin;
	}
	,set_world: function(w) {
		if(w == null) return this.world = w;
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		return this.world = w;
	}
	,get_parent: function() {
		return this.parent;
	}
	,set_parent: function(_p) {
		this.dirty = true;
		if(this.dirty && !this._setup && this._dirty_handlers != null && this._dirty_handlers.length > 0) this.propagate_dirty();
		this.dirty;
		if(this.parent != null) this.parent.unlisten($bind(this,this.on_parent_cleaned));
		this.parent = _p;
		if(this._parent_handlers != null && this._parent_handlers.length > 0) this.propagate_parent(this.parent);
		if(this.parent != null) this.parent.listen($bind(this,this.on_parent_cleaned));
		return this.parent;
	}
	,get_pos: function() {
		return this.local.pos;
	}
	,get_rotation: function() {
		return this.local.rotation;
	}
	,get_scale: function() {
		return this.local.scale;
	}
	,set_pos: function(value) {
		return this.local.set_pos(value);
	}
	,set_rotation: function(value) {
		return this.local.set_rotation(value);
	}
	,set_scale: function(value) {
		return this.local.set_scale(value);
	}
	,propagate_clean: function() {
		var _g = 0;
		var _g1 = this._clean_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(this);
		}
	}
	,propagate_dirty: function() {
		var _g = 0;
		var _g1 = this._dirty_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(this);
		}
	}
	,propagate_pos: function(_pos) {
		var _g = 0;
		var _g1 = this._pos_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_pos);
		}
	}
	,propagate_rotation: function(_rotation) {
		var _g = 0;
		var _g1 = this._rotation_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_rotation);
		}
	}
	,propagate_scale: function(_scale) {
		var _g = 0;
		var _g1 = this._scale_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_scale);
		}
	}
	,propagate_origin: function(_origin) {
		var _g = 0;
		var _g1 = this._origin_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_origin);
		}
	}
	,propagate_parent: function(_parent) {
		var _g = 0;
		var _g1 = this._parent_handlers;
		while(_g < _g1.length) {
			var _handler = _g1[_g];
			++_g;
			if(_handler != null) _handler(_parent);
		}
	}
	,listen: function(_handler) {
		if(this._clean_handlers == null) this._clean_handlers = [];
		this._clean_handlers.push(_handler);
	}
	,unlisten: function(_handler) {
		if(this._clean_handlers == null) return false;
		return HxOverrides.remove(this._clean_handlers,_handler);
	}
	,listen_dirty: function(_handler) {
		if(this._dirty_handlers == null) this._dirty_handlers = [];
		this._dirty_handlers.push(_handler);
	}
	,unlisten_dirty: function(_handler) {
		if(this._dirty_handlers == null) return false;
		return HxOverrides.remove(this._dirty_handlers,_handler);
	}
	,listen_pos: function(_handler) {
		if(this._pos_handlers == null) this._pos_handlers = [];
		this._pos_handlers.push(_handler);
	}
	,unlisten_pos: function(_handler) {
		if(this._pos_handlers == null) return false;
		return HxOverrides.remove(this._pos_handlers,_handler);
	}
	,listen_scale: function(_handler) {
		if(this._scale_handlers == null) this._scale_handlers = [];
		this._scale_handlers.push(_handler);
	}
	,unlisten_scale: function(_handler) {
		if(this._scale_handlers == null) return false;
		return HxOverrides.remove(this._scale_handlers,_handler);
	}
	,listen_rotation: function(_handler) {
		if(this._rotation_handlers == null) this._rotation_handlers = [];
		this._rotation_handlers.push(_handler);
	}
	,unlisten_rotation: function(_handler) {
		if(this._rotation_handlers == null) return false;
		return HxOverrides.remove(this._rotation_handlers,_handler);
	}
	,listen_origin: function(_handler) {
		if(this._origin_handlers == null) this._origin_handlers = [];
		this._origin_handlers.push(_handler);
	}
	,unlisten_origin: function(_handler) {
		if(this._origin_handlers == null) return false;
		return HxOverrides.remove(this._origin_handlers,_handler);
	}
	,listen_parent: function(_handler) {
		if(this._parent_handlers == null) this._parent_handlers = [];
		this._parent_handlers.push(_handler);
	}
	,unlisten_parent: function(_handler) {
		if(this._parent_handlers == null) return false;
		return HxOverrides.remove(this._parent_handlers,_handler);
	}
	,__class__: phoenix.Transform
	,__properties__: {set_scale:"set_scale",get_scale:"get_scale",set_rotation:"set_rotation",get_rotation:"get_rotation",set_pos:"set_pos",get_pos:"get_pos",set_dirty:"set_dirty",set_origin:"set_origin",get_origin:"get_origin",set_world:"set_world",get_world:"get_world",set_local:"set_local",get_local:"get_local",set_parent:"set_parent",get_parent:"get_parent"}
});
phoenix.Spatial = function() {
	this._setup = true;
	this.auto_decompose = false;
	this.ignore_listeners = false;
	this.set_matrix(new phoenix.Matrix());
	this.floats = this.matrix.float32array();
	this.set_pos(new phoenix.Vector());
	this.set_rotation(new phoenix.Quaternion());
	this.set_scale(new phoenix.Vector(1,1,1));
	this._setup = false;
};
$hxClasses["phoenix.Spatial"] = phoenix.Spatial;
phoenix.Spatial.__name__ = ["phoenix","Spatial"];
phoenix.Spatial.prototype = {
	destroy: function() {
		this.matrix = null;
		this.matrix;
		this.floats = null;
		this.pos = null;
		this.pos;
		this.rotation = null;
		this.rotation;
		this.scale = null;
		this.scale;
	}
	,decompose: function(_force) {
		if(_force == null) _force = true;
		if(this.auto_decompose || _force) {
			var _transform = this.matrix.decompose(null,null,null);
			this.set_pos(_transform.pos);
			this.set_rotation(_transform.rotation);
			this.set_scale(_transform.scale);
		}
		return this;
	}
	,get_matrix: function() {
		return this.matrix;
	}
	,set_matrix: function(_m) {
		this.matrix = _m;
		if(_m != null) this.floats = this.matrix.float32array();
		return this.matrix;
	}
	,propagate_pos: function(_p) {
		if(this.pos_changed != null && !this.ignore_listeners) this.pos_changed(_p);
	}
	,propagate_rotation: function(_r) {
		if(this.rotation_changed != null && !this.ignore_listeners) this.rotation_changed(_r);
	}
	,propagate_scale: function(_s) {
		if(this.scale_changed != null && !this.ignore_listeners) this.scale_changed(_s);
	}
	,set_pos: function(_p) {
		this.pos = _p;
		if(_p != null) {
			phoenix.Vector.Listen(this.pos,$bind(this,this._pos_change));
			if(this.pos_changed != null && !this.ignore_listeners) this.pos_changed(this.pos);
		}
		return this.pos;
	}
	,set_rotation: function(_r) {
		this.rotation = _r;
		if(_r != null) {
			phoenix.Quaternion.Listen(this.rotation,$bind(this,this._rotation_change));
			if(this.rotation_changed != null && !this.ignore_listeners) this.rotation_changed(this.rotation);
		}
		return this.rotation;
	}
	,set_scale: function(_s) {
		this.scale = _s;
		if(_s != null) {
			phoenix.Vector.Listen(this.scale,$bind(this,this._scale_change));
			if(this.scale_changed != null && !this.ignore_listeners) this.scale_changed(this.scale);
		}
		return this.scale;
	}
	,_pos_change: function(_v) {
		this.set_pos(this.pos);
	}
	,_scale_change: function(_v) {
		this.set_scale(this.scale);
	}
	,_rotation_change: function(_v) {
		this.set_rotation(this.rotation);
	}
	,__class__: phoenix.Spatial
	,__properties__: {set_matrix:"set_matrix",get_matrix:"get_matrix",set_scale:"set_scale",set_rotation:"set_rotation",set_pos:"set_pos"}
};
phoenix.Vector = function(_x,_y,_z,_w) {
	if(_w == null) _w = 0;
	if(_z == null) _z = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this._construct = false;
	this.ignore_listeners = false;
	this.w = 0;
	this.z = 0;
	this.y = 0;
	this.x = 0;
	this._construct = true;
	this.x = _x;
	if(this._construct) this.x; else {
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
		this.x;
	}
	this.y = _y;
	if(this._construct) this.y; else {
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
		this.y;
	}
	this.z = _z;
	if(this._construct) this.z; else {
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(_z);
		this.z;
	}
	this.w = _w;
	this._construct = false;
};
$hxClasses["phoenix.Vector"] = phoenix.Vector;
phoenix.Vector.__name__ = ["phoenix","Vector"];
phoenix.Vector.Add = function(a,b) {
	return new phoenix.Vector(a.x + b.x,a.y + b.y,a.z + b.z);
};
phoenix.Vector.Subtract = function(a,b) {
	return new phoenix.Vector(a.x - b.x,a.y - b.y,a.z - b.z);
};
phoenix.Vector.MultiplyVector = function(a,b) {
	return new phoenix.Vector(a.x * b.x,a.y * b.y,a.z * b.z);
};
phoenix.Vector.DivideVector = function(a,b) {
	return new phoenix.Vector(a.x / b.x,a.y / b.y,a.z / b.z);
};
phoenix.Vector.Multiply = function(a,b) {
	return new phoenix.Vector(a.x * b,a.y * b,a.z * b);
};
phoenix.Vector.Divide = function(a,b) {
	return new phoenix.Vector(a.x / b,a.y / b,a.z / b);
};
phoenix.Vector.AddScalar = function(a,b) {
	return new phoenix.Vector(a.x + b,a.y + b,a.z + b);
};
phoenix.Vector.SubtractScalar = function(a,b) {
	return new phoenix.Vector(a.x - b,a.y - b,a.z - b);
};
phoenix.Vector.Cross = function(a,b) {
	return new phoenix.Vector(a.y * b.z - a.z * b.y,a.z * b.x - a.x * b.z,a.x * b.y - a.y * b.x);
};
phoenix.Vector.RotationTo = function(a,b) {
	return a.rotationTo(b);
};
phoenix.Vector.Listen = function(_v,listener) {
	_v.listen_x = listener;
	_v.listen_y = listener;
	_v.listen_z = listener;
};
phoenix.Vector.Degrees = function(_radian_vector) {
	return new phoenix.Vector(_radian_vector.x,_radian_vector.y,_radian_vector.z,_radian_vector.w).degrees();
};
phoenix.Vector.Radians = function(_degree_vector) {
	return new phoenix.Vector(_degree_vector.x,_degree_vector.y,_degree_vector.z,_degree_vector.w).radians();
};
phoenix.Vector.prototype = {
	copy_from: function(_other) {
		this.set(_other.x,_other.y,_other.z,_other.w);
		return this;
	}
	,set: function(_x,_y,_z,_w) {
		var prev = this.ignore_listeners;
		this.ignore_listeners = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(_z);
			this.z;
		}
		this.w = _w;
		this.ignore_listeners = prev;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		return this;
	}
	,set_xy: function(_x,_y) {
		var prev = this.ignore_listeners;
		this.ignore_listeners = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
			this.y;
		}
		this.ignore_listeners = prev;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		return this;
	}
	,set_xyz: function(_x,_y,_z) {
		var prev = this.ignore_listeners;
		this.ignore_listeners = true;
		this.x = _x;
		if(this._construct) this.x; else {
			if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
			this.x;
		}
		this.y = _y;
		if(this._construct) this.y; else {
			if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
			this.y;
		}
		this.z = _z;
		if(this._construct) this.z; else {
			if(this.listen_z != null && !this.ignore_listeners) this.listen_z(_z);
			this.z;
		}
		this.ignore_listeners = prev;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(this.x);
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(this.y);
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(this.z);
		return this;
	}
	,lerp_xy: function(_dest_x,_dest_y,_t) {
		this.set_xy(luxe.utils.Maths.lerp(this.x,_dest_x,_t),luxe.utils.Maths.lerp(this.y,_dest_y,_t));
		return this;
	}
	,lerp_xyz: function(_dest_x,_dest_y,_dest_z,_t) {
		this.set_xyz(luxe.utils.Maths.lerp(this.x,_dest_x,_t),luxe.utils.Maths.lerp(this.y,_dest_y,_t),luxe.utils.Maths.lerp(this.z,_dest_z,_t));
		return this;
	}
	,weighted_average_xy: function(_dest_x,_dest_y,_slowness) {
		this.set_xy(luxe.utils.Maths.weighted_avg(this.x,_dest_x,_slowness),luxe.utils.Maths.weighted_avg(this.y,_dest_y,_slowness));
		return this;
	}
	,weighted_average_xyz: function(_dest_x,_dest_y,_dest_z,_slowness) {
		this.set_xyz(luxe.utils.Maths.weighted_avg(this.x,_dest_x,_slowness),luxe.utils.Maths.weighted_avg(this.y,_dest_y,_slowness),luxe.utils.Maths.weighted_avg(this.z,_dest_z,_slowness));
		return this;
	}
	,'int': function() {
		this.set_xyz(Math.round(this.x),Math.round(this.y),Math.round(this.z));
		return this;
	}
	,int_x: function() {
		this.set_x(Math.round(this.x));
		return this;
	}
	,int_y: function() {
		this.set_y(Math.round(this.y));
		return this;
	}
	,int_z: function() {
		this.set_z(Math.round(this.z));
		return this;
	}
	,toString: function() {
		return "{ x:" + this.x + ", y:" + this.y + ", z:" + this.z + " }";
	}
	,equals: function(other) {
		return this.x == other.x && this.y == other.y && this.z == other.z && this.w == other.w;
	}
	,clone: function() {
		return new phoenix.Vector(this.x,this.y,this.z,this.w);
	}
	,normalize: function() {
		return this.divideScalar(Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z));
	}
	,dot: function(other) {
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}
	,cross: function(a,b) {
		this.set_xyz(a.y * b.z - a.z * b.y,a.z * b.x - a.x * b.z,a.x * b.y - a.y * b.x);
		return this;
	}
	,invert: function() {
		this.set_xyz(-this.x,-this.y,-this.z);
		return this;
	}
	,add: function(other) {
		if(other == null) throw "vector.add other was handed in as null";
		this.set_xyz(this.x + other.x,this.y + other.y,this.z + other.z);
		return this;
	}
	,add_xyz: function(_x,_y,_z) {
		if(_z == null) _z = 0;
		if(_y == null) _y = 0;
		if(_x == null) _x = 0;
		this.set_xyz(this.x + _x,this.y + _y,this.z + _z);
		return this;
	}
	,subtract: function(other) {
		if(other == null) throw "vector.subtract other was handed in as null";
		this.set_xyz(this.x - other.x,this.y - other.y,this.z - other.z);
		return this;
	}
	,subtract_xyz: function(_x,_y,_z) {
		if(_z == null) _z = 0;
		if(_y == null) _y = 0;
		if(_x == null) _x = 0;
		this.set_xyz(this.x - _x,this.y - _y,this.z - _z);
		return this;
	}
	,multiply: function(other) {
		if(other == null) throw "vector.multiply other was handed in as null";
		this.set_xyz(this.x * other.x,this.y * other.y,this.z * other.z);
		return this;
	}
	,multiply_xyz: function(_x,_y,_z) {
		if(_z == null) _z = 1;
		if(_y == null) _y = 1;
		if(_x == null) _x = 1;
		this.set_xyz(this.x * _x,this.y * _y,this.z * _z);
		return this;
	}
	,divide: function(other) {
		if(other == null) throw "vector.divide other was handed in as null";
		this.set_xyz(this.x / other.x,this.y / other.y,this.z / other.z);
		return this;
	}
	,divide_xyz: function(_x,_y,_z) {
		if(_z == null) _z = 1;
		if(_y == null) _y = 1;
		if(_x == null) _x = 1;
		this.set_xyz(this.x / _x,this.y / _y,this.z / _z);
		return this;
	}
	,addScalar: function(v) {
		this.set_xyz(this.x + v,this.y + v,this.z + v);
		return this;
	}
	,subtractScalar: function(v) {
		this.set_xyz(this.x - v,this.y - v,this.z - v);
		return this;
	}
	,multiplyScalar: function(v) {
		this.set_xyz(this.x * v,this.y * v,this.z * v);
		return this;
	}
	,divideScalar: function(v) {
		if(v != 0) this.set_xyz(this.x / v,this.y / v,this.z / v); else this.set_xyz(0,0,0);
		return this;
	}
	,set_length: function(value) {
		this.divideScalar(Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)).multiplyScalar(value);
		return value;
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthsq: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,get_normalized: function() {
		return phoenix.Vector.Divide(this,Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z));
	}
	,set_x: function(_x) {
		this.x = _x;
		if(this._construct) return this.x;
		if(this.listen_x != null && !this.ignore_listeners) this.listen_x(_x);
		return this.x;
	}
	,set_y: function(_y) {
		this.y = _y;
		if(this._construct) return this.y;
		if(this.listen_y != null && !this.ignore_listeners) this.listen_y(_y);
		return this.y;
	}
	,set_z: function(_z) {
		this.z = _z;
		if(this._construct) return this.z;
		if(this.listen_z != null && !this.ignore_listeners) this.listen_z(_z);
		return this.z;
	}
	,get_inverted: function() {
		return new phoenix.Vector(-this.x,-this.y,-this.z);
	}
	,set_angle2D: function(value) {
		var len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.set_xy(Math.cos(value) * len,Math.sin(value) * len);
		return value;
	}
	,get_angle2D: function() {
		return Math.atan2(this.y,this.x);
	}
	,truncate: function(max) {
		this.set_length(Math.min(max,Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)));
		return this;
	}
	,rotationTo: function(other) {
		var theta = Math.atan2(other.x - this.x,other.y - this.y);
		var r = -(180.0 + theta * 180.0 / Math.PI);
		return r;
	}
	,applyQuaternion: function(q) {
		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;
		var ix = qw * this.x + qy * this.z - qz * this.y;
		var iy = qw * this.y + qz * this.x - qx * this.z;
		var iz = qw * this.z + qx * this.y - qy * this.x;
		var iw = -qx * this.x - qy * this.y - qz * this.z;
		this.set_xyz(ix * qw + iw * -qx + iy * -qz - iz * -qy,iy * qw + iw * -qy + iz * -qx - ix * -qz,iz * qw + iw * -qz + ix * -qy - iy * -qx);
		return this;
	}
	,applyProjection: function(m) {
		var e = m.elements;
		var x = this.x;
		var y = this.y;
		var z = this.z;
		var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
		this.set_xyz((e[0] * x + e[4] * y + e[8] * z + e[12]) * d,(e[1] * x + e[5] * y + e[9] * z + e[13]) * d,(e[2] * x + e[6] * y + e[10] * z + e[14]) * d);
		return this;
	}
	,transform: function(_m) {
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		var e = _m.elements;
		this.set_xyz(e[0] * _x + e[4] * _y + e[8] * _z + e[12],e[1] * _x + e[5] * _y + e[9] * _z + e[13],e[2] * _x + e[6] * _y + e[10] * _z + e[14]);
		return this;
	}
	,transformDirection: function(m) {
		var e = m.elements;
		var x = this.x;
		var y = this.y;
		var z = this.z;
		this.set_xyz(e[0] * x + e[4] * y + e[8] * z,e[1] * x + e[5] * y + e[9] * z,e[2] * x + e[6] * y + e[10] * z);
		this.divideScalar(Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z));
		return this;
	}
	,setEulerFromRotationMatrix: function(m,order) {
		if(order == null) order = 0;
		var te = m.elements;
		var m11 = te[0];
		var m12 = te[4];
		var m13 = te[8];
		var m21 = te[1];
		var m22 = te[5];
		var m23 = te[9];
		var m31 = te[2];
		var m32 = te[6];
		var m33 = te[10];
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		if(order == 0) {
			_y = Math.asin(m13 < -1?-1:m13 > 1?1:m13);
			if(Math.abs(m13) < 0.99999) {
				_x = Math.atan2(-m23,m33);
				_z = Math.atan2(-m12,m11);
			} else {
				_x = Math.atan2(m32,m22);
				_z = 0;
			}
		} else if(order == 1) {
			_x = Math.asin(-(m23 < -1?-1:m23 > 1?1:m23));
			if(Math.abs(m23) < 0.99999) {
				_y = Math.atan2(m13,m33);
				_z = Math.atan2(m21,m22);
			} else {
				_y = Math.atan2(-m31,m11);
				_z = 0;
			}
		} else if(order == 2) {
			_x = Math.asin(m32 < -1?-1:m32 > 1?1:m32);
			if(Math.abs(m32) < 0.99999) {
				_y = Math.atan2(-m31,m33);
				_z = Math.atan2(-m12,m22);
			} else {
				_y = 0;
				_z = Math.atan2(m21,m11);
			}
		} else if(order == 3) {
			_y = Math.asin(-(m31 < -1?-1:m31 > 1?1:m31));
			if(Math.abs(m31) < 0.99999) {
				_x = Math.atan2(m32,m33);
				_z = Math.atan2(m21,m11);
			} else {
				_x = 0;
				_z = Math.atan2(-m12,m22);
			}
		} else if(order == 4) {
			_z = Math.asin(m21 < -1?-1:m21 > 1?1:m21);
			if(Math.abs(m21) < 0.99999) {
				_x = Math.atan2(-m23,m22);
				_y = Math.atan2(-m31,m11);
			} else {
				_x = 0;
				_y = Math.atan2(m13,m33);
			}
		} else if(order == 5) {
			_z = Math.asin(-(m12 < -1?-1:m12 > 1?1:m12));
			if(Math.abs(m12) < 0.99999) {
				_x = Math.atan2(m32,m22);
				_y = Math.atan2(m13,m11);
			} else {
				_x = Math.atan2(-m23,m33);
				_y = 0;
			}
		}
		this.set_xyz(_x,_y,_z);
		return this;
	}
	,setEulerFromQuaternion: function(q,order) {
		if(order == null) order = 0;
		var sqx = q.x * q.x;
		var sqy = q.y * q.y;
		var sqz = q.z * q.z;
		var sqw = q.w * q.w;
		var _x = this.x;
		var _y = this.y;
		var _z = this.z;
		if(order == 0) {
			_x = Math.atan2(2 * (q.x * q.w - q.y * q.z),sqw - sqx - sqy + sqz);
			_y = Math.asin(luxe.utils.Maths.clamp(2 * (q.x * q.z + q.y * q.w),-1,1));
			_z = Math.atan2(2 * (q.z * q.w - q.x * q.y),sqw + sqx - sqy - sqz);
		} else if(order == 1) {
			_x = Math.asin(luxe.utils.Maths.clamp(2 * (q.x * q.w - q.y * q.z),-1,1));
			_y = Math.atan2(2 * (q.x * q.z + q.y * q.w),sqw - sqx - sqy + sqz);
			_z = Math.atan2(2 * (q.x * q.y + q.z * q.w),sqw - sqx + sqy - sqz);
		} else if(order == 2) {
			_x = Math.asin(luxe.utils.Maths.clamp(2 * (q.x * q.w + q.y * q.z),-1,1));
			_y = Math.atan2(2 * (q.y * q.w - q.z * q.x),sqw - sqx - sqy + sqz);
			_z = Math.atan2(2 * (q.z * q.w - q.x * q.y),sqw - sqx + sqy - sqz);
		} else if(order == 3) {
			_x = Math.atan2(2 * (q.x * q.w + q.z * q.y),sqw - sqx - sqy + sqz);
			_y = Math.asin(luxe.utils.Maths.clamp(2 * (q.y * q.w - q.x * q.z),-1,1));
			_z = Math.atan2(2 * (q.x * q.y + q.z * q.w),sqw + sqx - sqy - sqz);
		} else if(order == 4) {
			_x = Math.atan2(2 * (q.x * q.w - q.z * q.y),sqw - sqx + sqy - sqz);
			_y = Math.atan2(2 * (q.y * q.w - q.x * q.z),sqw + sqx - sqy - sqz);
			_z = Math.asin(luxe.utils.Maths.clamp(2 * (q.x * q.y + q.z * q.w),-1,1));
		} else if(order == 5) {
			_x = Math.atan2(2 * (q.x * q.w + q.y * q.z),sqw - sqx + sqy - sqz);
			_y = Math.atan2(2 * (q.x * q.z + q.y * q.w),sqw + sqx - sqy - sqz);
			_z = Math.asin(luxe.utils.Maths.clamp(2 * (q.z * q.w - q.x * q.y),-1,1));
		}
		this.set_xyz(_x,_y,_z);
		return this;
	}
	,degrees: function() {
		this.set_xyz(this.x * 57.2957795130823797,this.y * 57.2957795130823797,this.z * 57.2957795130823797);
		return this;
	}
	,radians: function() {
		this.set_xyz(this.x * 0.0174532925199432781,this.y * 0.0174532925199432781,this.z * 0.0174532925199432781);
		return this;
	}
	,__class__: phoenix.Vector
	,__properties__: {get_inverted:"get_inverted",get_normalized:"get_normalized",set_angle2D:"set_angle2D",get_angle2D:"get_angle2D",get_lengthsq:"get_lengthsq",set_length:"set_length",get_length:"get_length",set_z:"set_z",set_y:"set_y",set_x:"set_x"}
};
phoenix._Vector = {};
phoenix._Vector.ComponentOrder_Impl_ = function() { };
$hxClasses["phoenix._Vector.ComponentOrder_Impl_"] = phoenix._Vector.ComponentOrder_Impl_;
phoenix._Vector.ComponentOrder_Impl_.__name__ = ["phoenix","_Vector","ComponentOrder_Impl_"];
phoenix._Vector.Vec_Impl_ = function() { };
$hxClasses["phoenix._Vector.Vec_Impl_"] = phoenix._Vector.Vec_Impl_;
phoenix._Vector.Vec_Impl_.__name__ = ["phoenix","_Vector","Vec_Impl_"];
phoenix._Vector.Vec_Impl_._new = function(_x,_y,_z,_w) {
	return new phoenix.Vector(_x,_y,_z,_w);
};
phoenix._Vector.Vec_Impl_._multiply = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x * rhs.x,lhs.y * rhs.y,lhs.z * rhs.z);
};
phoenix._Vector.Vec_Impl_._multiply_scalar = function(lhs,rhs) {
	return phoenix.Vector.Multiply(lhs,rhs);
};
phoenix._Vector.Vec_Impl_._multiply_scalar_int = function(lhs,rhs) {
	return phoenix.Vector.Multiply(lhs,rhs);
};
phoenix._Vector.Vec_Impl_._divide = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x / rhs.x,lhs.y / rhs.y,lhs.z / rhs.z);
};
phoenix._Vector.Vec_Impl_._divide_scalar = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x / rhs,lhs.y / rhs,lhs.z / rhs);
};
phoenix._Vector.Vec_Impl_._divide_scalar_int = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x / rhs,lhs.y / rhs,lhs.z / rhs);
};
phoenix._Vector.Vec_Impl_._add = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x + rhs.x,lhs.y + rhs.y,lhs.z + rhs.z);
};
phoenix._Vector.Vec_Impl_._add_scalar = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x + rhs,lhs.y + rhs,lhs.z + rhs);
};
phoenix._Vector.Vec_Impl_._add_scalar_int = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x + rhs,lhs.y + rhs,lhs.z + rhs);
};
phoenix._Vector.Vec_Impl_._subtract = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x - rhs.x,lhs.y - rhs.y,lhs.z - rhs.z);
};
phoenix._Vector.Vec_Impl_._subtract_scalar = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x - rhs,lhs.y - rhs,lhs.z - rhs);
};
phoenix._Vector.Vec_Impl_._subtract_scalar_int = function(lhs,rhs) {
	return new phoenix.Vector(lhs.x - rhs,lhs.y - rhs,lhs.z - rhs);
};
phoenix.geometry = {};
phoenix.geometry.Geometry = function(options) {
	this.dirty = false;
	this.locked = false;
	this.immediate = false;
	this.visible = true;
	this.dirty_clip = false;
	this.dirty_depth = false;
	this.dirty_group = false;
	this.dirty_shader = false;
	this.dirty_texture = false;
	this.dirty_primitive_type = false;
	this.shadow_clip = false;
	this.shadow_depth = 0.0;
	this.shadow_group = 0;
	this.id = "";
	this.uuid = "";
	this.dropped = false;
	this.added = false;
	this.submitted = false;
	this.uuid = Luxe.utils.uniqueid();
	this.id = this.uuid;
	this.vertices = new Array();
	this.state = new phoenix.geometry.GeometryState();
	this.batchers = new Array();
	this.transform = new phoenix.Transform();
	this._final_vert_position = new phoenix.Vector();
	this.set_clip_rect(null);
	this.set_clip(false);
	var _do_add = true;
	if(options != null) {
		this.state.set_depth(options.depth == null?this.state.depth:options.depth);
		this.state.set_group(options.group == null?this.state.group:options.group);
		this.state.set_texture(options.texture == null?this.state.texture:options.texture);
		this.state.set_clip_rect(options.clip_rect == null?this.state.clip_rect:options.clip_rect);
		this.state.set_primitive_type(options.primitive_type == null?this.state.primitive_type:options.primitive_type);
		this.state.set_shader(options.shader == null?this.state.shader:options.shader);
		if(options.id == null) this.id = this.uuid; else this.id = options.id;
		this.transform.local.set_pos(options.pos == null?this.transform.local.pos:options.pos);
		this.transform.local.set_rotation(options.rotation == null?this.transform.local.rotation:options.rotation);
		this.transform.local.set_scale(options.scale == null?this.transform.local.scale:options.scale);
		this.transform.set_origin(options.origin == null?this.transform.origin:options.origin);
		if(options.immediate == null) this.immediate = false; else this.immediate = options.immediate;
		this.set_visible(options.visible == null?true:options.visible);
		this.set_color(options.color == null?new phoenix.Color():options.color);
		if(options.no_batcher_add == null) _do_add = true; else _do_add = options.no_batcher_add;
	} else this.set_color(new phoenix.Color());
	phoenix.geometry.Geometry._sequence_key++;
	this.key = new phoenix.geometry.GeometryKey();
	this.key.uuid = this.uuid;
	this.key.timestamp = snow.Snow.core.timestamp();
	this.key.sequence = phoenix.geometry.Geometry._sequence_key;
	this.key.primitive_type = this.state.primitive_type;
	this.key.texture = this.state.texture;
	this.key.shader = this.state.shader;
	this.key.group = this.state.group;
	this.key.depth = this.state.depth;
	this.key.clip = this.state.clip;
	this.transform.id = this.uuid;
	this.transform.name = this.id;
	if(options != null && options.batcher != null && _do_add) options.batcher.add(this);
};
$hxClasses["phoenix.geometry.Geometry"] = phoenix.geometry.Geometry;
phoenix.geometry.Geometry.__name__ = ["phoenix","geometry","Geometry"];
phoenix.geometry.Geometry.prototype = {
	key_string: function() {
		return "ts: " + this.key.timestamp + "\n" + "sequence: " + this.key.sequence + "\n" + "primitive_type: " + Std.string(this.key.primitive_type) + "\n" + "texture: " + (this.key.texture == null?"null":this.key.texture.id) + "\n" + "shader: " + (this.key.shader == null?"null":this.key.shader.id) + "\n" + "group: " + this.key.group + "\n" + "depth: " + this.key.depth + "\n" + "clip: " + Std.string(this.key.clip);
	}
	,refresh_key: function() {
		this.key.uuid = this.uuid;
		this.key.timestamp = snow.Snow.core.timestamp();
		this.key.sequence = phoenix.geometry.Geometry._sequence_key;
		this.key.primitive_type = this.state.primitive_type;
		this.key.texture = this.state.texture;
		this.key.shader = this.state.shader;
		this.key.group = this.state.group;
		this.key.depth = this.state.depth;
		this.key.clip = this.state.clip;
	}
	,str: function() {
		if(!this.state.log) return;
		haxe.Log.trace("\t\tgeometry ; " + this.id,{ fileName : "Geometry.hx", lineNumber : 210, className : "phoenix.geometry.Geometry", methodName : "str"});
		this.state.log = true;
		this.state.str();
		this.state.log = false;
	}
	,drop: function(remove) {
		if(remove == null) remove = true;
		if(remove && this.added) {
			var _g = 0;
			var _g1 = this.batchers;
			while(_g < _g1.length) {
				var b = _g1[_g];
				++_g;
				b.remove(this,true);
			}
		}
		if(this.transform != null) {
			this.transform.destroy();
			this.transform = null;
		}
		this.dropped = true;
	}
	,add: function(v) {
		this.vertices.push(v);
		if(this.vertices.length > Luxe.renderer.batcher.max_verts) throw "" + this.id + " / Currently a single geometry cannot exceed the maximum vert count of " + Luxe.renderer.batcher.max_verts;
	}
	,remove: function(v) {
		HxOverrides.remove(this.vertices,v);
	}
	,batch: function(vert_index,tcoord_index,color_index,normal_index,vertlist,tcoordlist,colorlist,normallist) {
		var _g = 0;
		var _g1 = this.vertices;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this._final_vert_position.set(v.pos.x,v.pos.y,v.pos.z,v.pos.w);
			this._final_vert_position.transform(this.transform.get_world().get_matrix());
			vertlist[vert_index] = this._final_vert_position.x;
			vertlist[vert_index + 1] = this._final_vert_position.y;
			vertlist[vert_index + 2] = this._final_vert_position.z;
			vertlist[vert_index + 3] = this._final_vert_position.w;
			vert_index += 4;
			tcoordlist[tcoord_index] = v.uv.uv0.u;
			tcoordlist[tcoord_index + 1] = v.uv.uv0.v;
			tcoordlist[tcoord_index + 2] = v.uv.uv0.w;
			tcoordlist[tcoord_index + 3] = v.uv.uv0.t;
			tcoord_index += 4;
			colorlist[color_index] = v.color.r;
			colorlist[color_index + 1] = v.color.g;
			colorlist[color_index + 2] = v.color.b;
			colorlist[color_index + 3] = v.color.a;
			color_index += 4;
		}
	}
	,batch_into_arrays: function(vertlist,tcoordlist,colorlist,normallist) {
		var _g = 0;
		var _g1 = this.vertices;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this._final_vert_position.set(v.pos.x,v.pos.y,v.pos.z,v.pos.w);
			this._final_vert_position.transform(this.transform.get_world().get_matrix());
			vertlist.push(this._final_vert_position.x);
			vertlist.push(this._final_vert_position.y);
			vertlist.push(this._final_vert_position.z);
			vertlist.push(this._final_vert_position.w);
			tcoordlist.push(v.uv.uv0.u);
			tcoordlist.push(v.uv.uv0.v);
			tcoordlist.push(v.uv.uv0.w);
			tcoordlist.push(v.uv.uv0.t);
			colorlist.push(v.color.r);
			colorlist.push(v.color.g);
			colorlist.push(v.color.b);
			colorlist.push(v.color.a);
			normallist.push(v.normal.x);
			normallist.push(v.normal.y);
			normallist.push(v.normal.z);
			normallist.push(v.normal.w);
		}
	}
	,translate: function(_offset) {
		this.transform.local.pos.set_xyz(this.transform.local.pos.x + _offset.x,this.transform.local.pos.y + _offset.y,this.transform.local.pos.x + _offset.z);
	}
	,set_locked: function(_locked) {
		return this.locked = _locked;
	}
	,get_locked: function() {
		return this.locked;
	}
	,set_dirty: function(_dirty) {
		return this.dirty = _dirty;
	}
	,get_dirty: function() {
		return this.dirty;
	}
	,refresh: function() {
		var _g = 0;
		var _g1 = this.batchers;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			b.remove(this,false);
		}
		if(this.dirty_primitive_type) {
			this.dirty_primitive_type = false;
			this.state.set_primitive_type(this.shadow_primitive_type);
		}
		if(this.dirty_texture) {
			this.dirty_texture = false;
			this.state.set_texture(this.shadow_texture);
		}
		if(this.dirty_shader) {
			this.dirty_shader = false;
			this.state.set_shader(this.shadow_shader);
		}
		if(this.dirty_group) {
			this.dirty_group = false;
			this.state.set_group(this.shadow_group);
		}
		if(this.dirty_depth) {
			this.dirty_depth = false;
			this.state.set_depth(this.shadow_depth);
		}
		if(this.dirty_clip) {
			this.dirty_clip = false;
			this.state.set_clip(this.shadow_clip);
		}
		this.refresh_key();
		var _g2 = 0;
		var _g11 = this.batchers;
		while(_g2 < _g11.length) {
			var b1 = _g11[_g2];
			++_g2;
			b1.add(this,false);
		}
	}
	,get_primitive_type: function() {
		return this.state.primitive_type;
	}
	,set_primitive_type: function(val) {
		if(this.state.primitive_type != val) {
			this.shadow_primitive_type = val;
			this.dirty_primitive_type = true;
			this.refresh();
		}
		return this.primitive_type = val;
	}
	,get_texture: function() {
		return this.state.texture;
	}
	,set_texture: function(val) {
		if(this.state.texture != val) {
			this.shadow_texture = val;
			this.dirty_texture = true;
			this.refresh();
		}
		return this.texture = val;
	}
	,set_visible: function(val) {
		return this.visible = val;
	}
	,set_color: function(val) {
		var _g = 0;
		var _g1 = this.vertices;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			v.color = val;
		}
		return this.color = val;
	}
	,get_shader: function() {
		return this.state.shader;
	}
	,set_shader: function(val) {
		if(this.state.shader != val) {
			this.shadow_shader = val;
			this.dirty_shader = true;
			this.refresh();
		}
		return this.shader = val;
	}
	,get_depth: function() {
		return this.state.depth;
	}
	,set_depth: function(val) {
		if(this.state.depth != val) {
			this.shadow_depth = val;
			this.dirty_depth = true;
			this.refresh();
		}
		return this.depth = val;
	}
	,get_group: function() {
		return this.state.group;
	}
	,set_group: function(val) {
		if(this.state.group != val) {
			this.shadow_group = val;
			this.dirty_group = true;
			this.refresh();
		}
		return this.group = val;
	}
	,get_clip: function() {
		return this.state.clip;
	}
	,set_clip: function(val) {
		if(this.state.clip != val) {
			this.shadow_clip = val;
			this.dirty_clip = true;
			this.refresh();
		}
		return this.clip = val;
	}
	,get_clip_rect: function() {
		return this.state.clip_rect;
	}
	,set_clip_rect: function(val) {
		if(val == null) this.set_clip(false); else this.set_clip(true);
		return this.state.set_clip_rect(val);
	}
	,__class__: phoenix.geometry.Geometry
	,__properties__: {set_clip:"set_clip",get_clip:"get_clip",set_color:"set_color",set_dirty:"set_dirty",get_dirty:"get_dirty",set_locked:"set_locked",get_locked:"get_locked",set_visible:"set_visible",set_clip_rect:"set_clip_rect",get_clip_rect:"get_clip_rect",set_group:"set_group",get_group:"get_group",set_depth:"set_depth",get_depth:"get_depth",set_shader:"set_shader",get_shader:"get_shader",set_texture:"set_texture",get_texture:"get_texture",set_primitive_type:"set_primitive_type",get_primitive_type:"get_primitive_type"}
};
phoenix.geometry.CircleGeometry = function(options) {
	phoenix.geometry.Geometry.call(this,options);
	if(options == null) return;
	var _radius_x = 32;
	var _radius_y = 32;
	if(options.end_angle == null) options.end_angle = 360;
	if(options.start_angle == null) options.start_angle = 0;
	if(options.r != null) {
		_radius_x = options.r;
		_radius_y = options.r;
	}
	if(options.rx != null) _radius_x = options.rx;
	if(options.ry != null) _radius_y = options.ry;
	if(options.steps == null) {
		if(options.smooth == null) {
			var _max = Math.max(_radius_x,_radius_y);
			options.steps = Luxe.utils.geometry.segments_for_smooth_circle(_max);
		} else {
			var _smooth = options.smooth;
			var _max1 = Math.max(_radius_x,_radius_y);
			options.steps = Luxe.utils.geometry.segments_for_smooth_circle(_max1,_smooth);
		}
	}
	this.set(options.x,options.y,_radius_x,_radius_y,options.steps,options.start_angle,options.end_angle);
	if(options.visible != null) this.set_visible(options.visible);
};
$hxClasses["phoenix.geometry.CircleGeometry"] = phoenix.geometry.CircleGeometry;
phoenix.geometry.CircleGeometry.__name__ = ["phoenix","geometry","CircleGeometry"];
phoenix.geometry.CircleGeometry.__super__ = phoenix.geometry.Geometry;
phoenix.geometry.CircleGeometry.prototype = $extend(phoenix.geometry.Geometry.prototype,{
	set: function(_x,_y,_rx,_ry,_steps,_start_angle,_end_angle) {
		if(_end_angle == null) _end_angle = 360;
		if(_start_angle == null) _start_angle = 0;
		this.set_primitive_type(4);
		var half_pi = Math.PI / 2;
		var _start_angle_rad = _start_angle * 0.0174532925199432781 - half_pi;
		var _end_angle_rad = _end_angle * 0.0174532925199432781 - half_pi;
		var _range = _end_angle_rad - _start_angle_rad;
		_steps = Math.ceil(Math.abs(_range) / (Math.PI * 2) * _steps);
		var theta = _range / _steps;
		var tangential_factor = Math.tan(theta);
		var radial_factor = Math.cos(theta);
		var x = _rx * Math.cos(_start_angle_rad);
		var y = _rx * Math.sin(_start_angle_rad);
		var radial_ratio = _rx / _ry;
		if(radial_ratio == 0) radial_ratio = 0.000000001;
		var _index = 0;
		var _segment_pos = [];
		var _g1 = 0;
		var _g = _steps + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var __x = x;
			var __y = y / radial_ratio;
			var _seg = new phoenix.Vector(__x,__y);
			_segment_pos.push(_seg);
			if(_index > 0) this.add(new phoenix.geometry.Vertex(_seg,this.color));
			this.add(new phoenix.geometry.Vertex(new phoenix.Vector(0,0),this.color));
			this.add(new phoenix.geometry.Vertex(_seg,this.color));
			var tx = -y;
			var ty = x;
			x += tx * tangential_factor;
			y += ty * tangential_factor;
			x *= radial_factor;
			y *= radial_factor;
			_index++;
		}
		this.add(new phoenix.geometry.Vertex(_segment_pos[_steps],this.color));
		this.transform.set_pos(new phoenix.Vector(_x,_y));
	}
	,__class__: phoenix.geometry.CircleGeometry
});
phoenix.geometry.RingGeometry = function(options) {
	phoenix.geometry.CircleGeometry.call(this,options);
	this.set_primitive_type(1);
};
$hxClasses["phoenix.geometry.RingGeometry"] = phoenix.geometry.RingGeometry;
phoenix.geometry.RingGeometry.__name__ = ["phoenix","geometry","RingGeometry"];
phoenix.geometry.RingGeometry.__super__ = phoenix.geometry.CircleGeometry;
phoenix.geometry.RingGeometry.prototype = $extend(phoenix.geometry.CircleGeometry.prototype,{
	set: function(_x,_y,_rx,_ry,_steps,_start_angle_degrees,_end_angle_degrees) {
		if(_end_angle_degrees == null) _end_angle_degrees = 360;
		if(_start_angle_degrees == null) _start_angle_degrees = 0;
		this.set_primitive_type(4);
		var _start_angle_rad = _start_angle_degrees * 0.0174532925199432781;
		var _end_angle_rad = _end_angle_degrees * 0.0174532925199432781;
		var _range = _end_angle_rad - _start_angle_rad;
		var theta = _range / _steps;
		var tangential_factor = Math.tan(theta);
		var radial_factor = Math.cos(theta);
		var x = _rx * Math.cos(_start_angle_rad);
		var y = _rx * Math.sin(_start_angle_rad);
		var radial_ratio = _rx / _ry;
		if(radial_ratio == 0) radial_ratio = 0.000000001;
		var _index = 0;
		var _segment_pos = [];
		var _g = 0;
		while(_g < _steps) {
			var i = _g++;
			var __x = x;
			var __y = y / radial_ratio;
			var _seg = new phoenix.Vector(__x,__y);
			_segment_pos.push(_seg);
			this.add(new phoenix.geometry.Vertex(_seg,this.color));
			if(_index > 0) {
				var prevvert = _segment_pos[_index];
				this.add(new phoenix.geometry.Vertex(new phoenix.Vector(prevvert.x,prevvert.y,prevvert.z,prevvert.w),this.color));
			}
			var tx = -y;
			var ty = x;
			x += tx * tangential_factor;
			y += ty * tangential_factor;
			x *= radial_factor;
			y *= radial_factor;
			_index++;
		}
		this.add(new phoenix.geometry.Vertex(_segment_pos[0],this.color));
		this.transform.set_pos(new phoenix.Vector(_x,_y));
	}
	,__class__: phoenix.geometry.RingGeometry
});
phoenix.geometry.ArcGeometry = function(options) {
	phoenix.geometry.RingGeometry.call(this,options);
	this.vertices.pop();
	this.vertices.pop();
	this.set_primitive_type(1);
};
$hxClasses["phoenix.geometry.ArcGeometry"] = phoenix.geometry.ArcGeometry;
phoenix.geometry.ArcGeometry.__name__ = ["phoenix","geometry","ArcGeometry"];
phoenix.geometry.ArcGeometry.__super__ = phoenix.geometry.RingGeometry;
phoenix.geometry.ArcGeometry.prototype = $extend(phoenix.geometry.RingGeometry.prototype,{
	__class__: phoenix.geometry.ArcGeometry
});
phoenix.geometry.CompositeGeometry = function(_options) {
	phoenix.geometry.Geometry.call(this,_options);
	this.geometry = new Array();
};
$hxClasses["phoenix.geometry.CompositeGeometry"] = phoenix.geometry.CompositeGeometry;
phoenix.geometry.CompositeGeometry.__name__ = ["phoenix","geometry","CompositeGeometry"];
phoenix.geometry.CompositeGeometry.__super__ = phoenix.geometry.Geometry;
phoenix.geometry.CompositeGeometry.prototype = $extend(phoenix.geometry.Geometry.prototype,{
	toString: function() {
		return "CompositeGeometry " + Std.string(this.geometry) + " : " + Std.string(this.geometry);
	}
	,clear: function() {
		var _g = 0;
		var _g1 = this.geometry;
		while(_g < _g1.length) {
			var geom = _g1[_g];
			++_g;
			geom.transform.set_parent(null);
		}
		this.geometry.splice(0,this.geometry.length);
	}
	,replace: function(_geometry) {
		this.clear();
		this.geometry = _geometry;
		var _g = 0;
		var _g1 = this.geometry;
		while(_g < _g1.length) {
			var geom = _g1[_g];
			++_g;
			geom.transform.set_parent(this.transform);
		}
	}
	,has_geometry: function(geom) {
		return Lambda.has(this.geometry,geom);
	}
	,add_geometry: function(geom) {
		if(geom != null) {
			geom.transform.set_parent(this.transform);
			this.geometry.push(geom);
		}
	}
	,remove_geometry: function(g) {
		if(HxOverrides.remove(this.geometry,g)) g.transform.set_parent(null);
	}
	,add_to_batcher: function(_batcher) {
		var _g = 0;
		var _g1 = this.geometry;
		while(_g < _g1.length) {
			var geom = _g1[_g];
			++_g;
			_batcher.add(geom);
		}
	}
	,drop: function(remove) {
		if(remove == null) remove = true;
		phoenix.geometry.Geometry.prototype.drop.call(this,remove);
		var _g = 0;
		var _g1 = this.geometry;
		while(_g < _g1.length) {
			var geom = _g1[_g];
			++_g;
			geom.drop(remove);
			geom = null;
		}
		this.geometry = null;
		this.geometry = [];
	}
	,translate: function(_offset) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.translate(_offset);
			}
		}
	}
	,set_color: function(_color) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_color(_color);
			}
		}
		return this.color = _color;
	}
	,set_primitive_type: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_primitive_type(val);
			}
		}
		return this.primitive_type = val;
	}
	,set_shader: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_shader(val);
			}
		}
		return this.shader = val;
	}
	,set_texture: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_texture(val);
			}
		}
		return this.texture = val;
	}
	,set_depth: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_depth(val);
			}
		}
		return this.depth = val;
	}
	,set_group: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_group(val);
			}
		}
		return this.group = val;
	}
	,set_locked: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_locked(val);
			}
		}
		return this.locked = val;
	}
	,set_dirty: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_dirty(val);
			}
		}
		return this.dirty = val;
	}
	,set_clip_rect: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_clip_rect(val);
			}
		}
		return this.clip_rect = val;
	}
	,set_visible: function(val) {
		if(this.geometry != null) {
			var _g = 0;
			var _g1 = this.geometry;
			while(_g < _g1.length) {
				var geom = _g1[_g];
				++_g;
				geom.set_visible(val);
			}
		}
		return this.visible = val;
	}
	,__class__: phoenix.geometry.CompositeGeometry
});
phoenix.geometry.GeometryKey = function() {
	this.clip = false;
	this.depth = 0;
	this.group = 0;
	this.uuid = "";
	this.sequence = 0;
	this.timestamp = 0;
};
$hxClasses["phoenix.geometry.GeometryKey"] = phoenix.geometry.GeometryKey;
phoenix.geometry.GeometryKey.__name__ = ["phoenix","geometry","GeometryKey"];
phoenix.geometry.GeometryKey.prototype = {
	__class__: phoenix.geometry.GeometryKey
};
phoenix.geometry.GeometryState = function() {
	this.log = false;
	this.set_clip(false);
	this.set_clip_rect(new phoenix.Rectangle());
	this.set_texture(null);
	this.set_shader(null);
	this.set_group(0);
	this.set_depth(0.0);
	this.set_primitive_type(0);
	this.dirty = false;
};
$hxClasses["phoenix.geometry.GeometryState"] = phoenix.geometry.GeometryState;
phoenix.geometry.GeometryState.__name__ = ["phoenix","geometry","GeometryState"];
phoenix.geometry.GeometryState.prototype = {
	clone_onto: function(_other) {
		_other.dirty = this.dirty;
		_other.set_texture(this.texture);
		_other.set_shader(this.shader);
		_other.set_group(this.group);
		_other.set_depth(this.depth);
		_other.set_primitive_type(this.primitive_type);
		_other.set_clip(this.clip);
		_other.clip_rect.copy_from(this.clip_rect);
	}
	,str: function() {
		if(!this.log) return;
		haxe.Log.trace("\t+ GEOMETRYSTATE " + Std.string(this.dirty),{ fileName : "GeometryState.hx", lineNumber : 53, className : "phoenix.geometry.GeometryState", methodName : "str"});
		haxe.Log.trace("\t\tdepth - " + this.depth,{ fileName : "GeometryState.hx", lineNumber : 54, className : "phoenix.geometry.GeometryState", methodName : "str"});
		haxe.Log.trace("\t\tgroup - " + this.group,{ fileName : "GeometryState.hx", lineNumber : 55, className : "phoenix.geometry.GeometryState", methodName : "str"});
		haxe.Log.trace("\t\ttexture - " + (this.texture == null?"null":this.texture.id),{ fileName : "GeometryState.hx", lineNumber : 56, className : "phoenix.geometry.GeometryState", methodName : "str"});
		if(this.texture != null) haxe.Log.trace("\t\t\t " + Std.string(this.texture.texture),{ fileName : "GeometryState.hx", lineNumber : 58, className : "phoenix.geometry.GeometryState", methodName : "str"});
		haxe.Log.trace("\t\tshader - " + (this.shader == null?"null":this.shader.id),{ fileName : "GeometryState.hx", lineNumber : 60, className : "phoenix.geometry.GeometryState", methodName : "str"});
		haxe.Log.trace("\t\tprimitive_type - " + Std.string(this.primitive_type),{ fileName : "GeometryState.hx", lineNumber : 61, className : "phoenix.geometry.GeometryState", methodName : "str"});
		haxe.Log.trace("\t\tclip - " + Std.string(this.clip),{ fileName : "GeometryState.hx", lineNumber : 62, className : "phoenix.geometry.GeometryState", methodName : "str"});
		haxe.Log.trace("\t\tclip rect - " + Std.string(this.clip_rect),{ fileName : "GeometryState.hx", lineNumber : 63, className : "phoenix.geometry.GeometryState", methodName : "str"});
		haxe.Log.trace("\t- GEOMETRYSTATE",{ fileName : "GeometryState.hx", lineNumber : 64, className : "phoenix.geometry.GeometryState", methodName : "str"});
	}
	,clean: function() {
		this.dirty = false;
	}
	,update: function(other) {
		if(this.depth != other.depth) this.set_depth(other.depth);
		if(this.group != other.group) this.set_group(other.group);
		if(this.texture != other.texture) this.set_texture(other.texture);
		if(this.shader != other.shader) this.set_shader(other.shader);
		if(this.primitive_type != other.primitive_type) this.set_primitive_type(other.primitive_type);
		if(this.clip != other.clip) this.set_clip(other.clip);
		if(this.clip_rect != null) {
			if(other.clip_rect != null && !this.clip_rect.equal(other.clip_rect)) this.clip_rect.set(other.clip_rect.x,other.clip_rect.y,other.clip_rect.w,other.clip_rect.h);
		}
	}
	,set_primitive_type: function(val) {
		this.dirty = true;
		return this.primitive_type = val;
	}
	,set_texture: function(val) {
		this.dirty = true;
		return this.texture = val;
	}
	,set_shader: function(val) {
		this.dirty = true;
		return this.shader = val;
	}
	,set_depth: function(val) {
		return this.depth = val;
	}
	,set_group: function(val) {
		this.dirty = true;
		return this.group = val;
	}
	,set_clip: function(val) {
		this.dirty = true;
		return this.clip = val;
	}
	,set_clip_rect: function(val) {
		this.dirty = true;
		return this.clip_rect = val;
	}
	,__class__: phoenix.geometry.GeometryState
	,__properties__: {set_clip_rect:"set_clip_rect",set_clip:"set_clip",set_group:"set_group",set_depth:"set_depth",set_texture:"set_texture",set_shader:"set_shader",set_primitive_type:"set_primitive_type"}
};
phoenix.geometry.LineGeometry = function(options) {
	phoenix.geometry.Geometry.call(this,options);
	if(options == null) return;
	if(options.color == null) options.color = new phoenix.Color();
	if(options.color0 == null) options.color0 = options.color;
	if(options.color1 == null) options.color1 = options.color;
	if(options.p0 != null) this.set_p0(options.p0); else this.set_p0(new phoenix.Vector());
	if(options.p1 != null) this.set_p1(options.p1); else this.set_p1(new phoenix.Vector());
	this.set(options);
};
$hxClasses["phoenix.geometry.LineGeometry"] = phoenix.geometry.LineGeometry;
phoenix.geometry.LineGeometry.__name__ = ["phoenix","geometry","LineGeometry"];
phoenix.geometry.LineGeometry.__super__ = phoenix.geometry.Geometry;
phoenix.geometry.LineGeometry.prototype = $extend(phoenix.geometry.Geometry.prototype,{
	set_p0: function(_p) {
		if(this.vertices.length == 0) return this.p0 = _p;
		this.vertices[0].pos.set_x(_p.x);
		this.vertices[0].pos.set_y(_p.y);
		this.vertices[0].pos.set_z(_p.z);
		return this.p0 = _p;
	}
	,set_p1: function(_p) {
		if(this.vertices.length == 0) return this.p1 = _p;
		this.vertices[1].pos.set_x(_p.x);
		this.vertices[1].pos.set_y(_p.y);
		this.vertices[1].pos.set_z(_p.z);
		return this.p1 = _p;
	}
	,set: function(options) {
		this.vertices.splice(0,this.vertices.length);
		var vert0 = new phoenix.geometry.Vertex(new phoenix.Vector(options.p0.x,options.p0.y,options.p0.z),options.color0);
		vert0.uv.uv0.set_uv(0,0);
		var vert1 = new phoenix.geometry.Vertex(new phoenix.Vector(options.p1.x,options.p1.y,options.p1.z),options.color1);
		vert1.uv.uv0.set_uv(1,0);
		this.add(vert0);
		this.add(vert1);
		this.set_primitive_type(1);
		this.immediate = options.immediate;
	}
	,__class__: phoenix.geometry.LineGeometry
	,__properties__: $extend(phoenix.geometry.Geometry.prototype.__properties__,{set_p1:"set_p1",set_p0:"set_p0"})
});
phoenix.geometry.PlaneGeometry = function(options) {
	this.is_set = false;
	this.flipy = false;
	this.flipx = false;
	phoenix.geometry.Geometry.call(this,options);
	if(options == null) return;
	if(options.flipx != null) this.set_flipx(options.flipx);
	if(options.flipy != null) this.set_flipy(options.flipy);
	this._uv_cache = new phoenix.Rectangle(0,0,1,1);
	this.set(new phoenix.Rectangle(options.x,options.z,options.w,options.h),options.y);
	if(options.visible != null) this.set_visible(options.visible);
	if(options.immediate != null) this.immediate = options.immediate;
};
$hxClasses["phoenix.geometry.PlaneGeometry"] = phoenix.geometry.PlaneGeometry;
phoenix.geometry.PlaneGeometry.__name__ = ["phoenix","geometry","PlaneGeometry"];
phoenix.geometry.PlaneGeometry.__super__ = phoenix.geometry.Geometry;
phoenix.geometry.PlaneGeometry.prototype = $extend(phoenix.geometry.Geometry.prototype,{
	uv: function(_rect) {
		if(this.get_texture() == null) {
			haxe.Log.trace("Warning : calling UV on a geometry with null texture.",{ fileName : "PlaneGeometry.hx", lineNumber : 45, className : "phoenix.geometry.PlaneGeometry", methodName : "uv"});
			return;
		}
		var tlx = _rect.x / this.get_texture().width_actual;
		var tly = _rect.y / this.get_texture().height_actual;
		var szx = _rect.w / this.get_texture().width_actual;
		var szy = _rect.h / this.get_texture().height_actual;
		this.uv_space(new phoenix.Rectangle(tlx,tly,szx,szy));
	}
	,uv_space: function(_rect) {
		var sz_x = _rect.w;
		var sz_y = _rect.h;
		var tl_x = _rect.x;
		var tl_y = _rect.y;
		this._uv_cache.set(tl_x,tl_y,sz_x,sz_y);
		var tr_x = tl_x + sz_x;
		var tr_y = tl_y;
		var br_x = tl_x + sz_x;
		var br_y = tl_y + sz_y;
		var bl_x = tl_x;
		var bl_y = tl_y + sz_y;
		var tmp_x = 0.0;
		var tmp_y = 0.0;
		if(this.flipy) {
			tmp_y = bl_y;
			bl_y = tl_y;
			tl_y = tmp_y;
			tmp_y = br_y;
			br_y = tr_y;
			tr_y = tmp_y;
		}
		if(this.flipx) {
			tmp_x = tr_x;
			tr_x = tl_x;
			tl_x = tmp_x;
			tmp_x = br_x;
			br_x = bl_x;
			bl_x = tmp_x;
		}
		this.vertices[0].uv.uv0.set_uv(tl_x,tl_y);
		this.vertices[1].uv.uv0.set_uv(tr_x,tr_y);
		this.vertices[2].uv.uv0.set_uv(br_x,br_y);
		this.vertices[3].uv.uv0.set_uv(bl_x,bl_y);
		this.vertices[4].uv.uv0.set_uv(tl_x,tl_y);
		this.vertices[5].uv.uv0.set_uv(br_x,br_y);
		this.set_dirty(true);
	}
	,set: function(quad,y) {
		this.vertices.splice(0,this.vertices.length);
		var vert0 = new phoenix.geometry.Vertex(new phoenix.Vector(0,0,0),this.color);
		var vert1 = new phoenix.geometry.Vertex(new phoenix.Vector(quad.w,0,0),this.color);
		var vert2 = new phoenix.geometry.Vertex(new phoenix.Vector(quad.w,0,quad.h),this.color);
		var vert3 = new phoenix.geometry.Vertex(new phoenix.Vector(0,0,quad.h),this.color);
		var vert4 = new phoenix.geometry.Vertex(new phoenix.Vector(0,0,0),this.color);
		var vert5 = new phoenix.geometry.Vertex(new phoenix.Vector(quad.w,0,quad.h),this.color);
		this.add(vert5);
		this.add(vert4);
		this.add(vert3);
		this.add(vert2);
		this.add(vert1);
		this.add(vert0);
		this.set_primitive_type(4);
		this.immediate = false;
		this.transform.set_pos(new phoenix.Vector(quad.x,y,quad.y));
		this.is_set = true;
		this.uv_space(new phoenix.Rectangle(0,0,1,1));
	}
	,set_flipx: function(_val) {
		this.flipx = _val;
		if(this.is_set) this.uv_space(this._uv_cache);
		return this.flipx;
	}
	,set_flipy: function(_val) {
		this.flipy = _val;
		if(this.is_set) this.uv_space(this._uv_cache);
		return this.flipy;
	}
	,__class__: phoenix.geometry.PlaneGeometry
	,__properties__: $extend(phoenix.geometry.Geometry.prototype.__properties__,{set_flipy:"set_flipy",set_flipx:"set_flipx"})
});
phoenix.geometry.QuadGeometry = function(options) {
	this.is_set = false;
	this.flipy = false;
	this.flipx = false;
	phoenix.geometry.Geometry.call(this,options);
	if(options == null) return;
	if(options.flipx != null) this.set_flipx(options.flipx);
	if(options.flipy != null) this.set_flipy(options.flipy);
	var _x = options.x;
	var _y = options.y;
	var _w = options.w;
	var _h = options.h;
	if(options.rect != null) {
		_x = options.rect.x;
		_y = options.rect.y;
		_w = options.rect.w;
		_h = options.rect.h;
	}
	this._uv_cache = new phoenix.Rectangle(0,0,1,1);
	this.set(new phoenix.Rectangle(_x,_y,_w,_h));
	if(options.visible != null) this.set_visible(options.visible);
	if(options.immediate != null) this.immediate = options.immediate;
};
$hxClasses["phoenix.geometry.QuadGeometry"] = phoenix.geometry.QuadGeometry;
phoenix.geometry.QuadGeometry.__name__ = ["phoenix","geometry","QuadGeometry"];
phoenix.geometry.QuadGeometry.__super__ = phoenix.geometry.Geometry;
phoenix.geometry.QuadGeometry.prototype = $extend(phoenix.geometry.Geometry.prototype,{
	uv: function(_rect) {
		if(this.get_texture() == null) {
			haxe.Log.trace("Warning : calling UV on a geometry with null texture.",{ fileName : "QuadGeometry.hx", lineNumber : 56, className : "phoenix.geometry.QuadGeometry", methodName : "uv"});
			return;
		}
		var tlx = _rect.x / this.get_texture().width_actual;
		var tly = _rect.y / this.get_texture().height_actual;
		var szx = _rect.w / this.get_texture().width_actual;
		var szy = _rect.h / this.get_texture().height_actual;
		this.uv_space(new phoenix.Rectangle(tlx,tly,szx,szy));
	}
	,uv_space: function(_rect) {
		var sz_x = _rect.w;
		var sz_y = _rect.h;
		var tl_x = _rect.x;
		var tl_y = _rect.y;
		this._uv_cache.set(tl_x,tl_y,sz_x,sz_y);
		var tr_x = tl_x + sz_x;
		var tr_y = tl_y;
		var br_x = tl_x + sz_x;
		var br_y = tl_y + sz_y;
		var bl_x = tl_x;
		var bl_y = tl_y + sz_y;
		var tmp_x = 0.0;
		var tmp_y = 0.0;
		if(this.flipy) {
			tmp_y = bl_y;
			bl_y = tl_y;
			tl_y = tmp_y;
			tmp_y = br_y;
			br_y = tr_y;
			tr_y = tmp_y;
		}
		if(this.flipx) {
			tmp_x = tr_x;
			tr_x = tl_x;
			tl_x = tmp_x;
			tmp_x = br_x;
			br_x = bl_x;
			bl_x = tmp_x;
		}
		this.vertices[0].uv.uv0.set_uv(tl_x,tl_y);
		this.vertices[1].uv.uv0.set_uv(tr_x,tr_y);
		this.vertices[2].uv.uv0.set_uv(br_x,br_y);
		this.vertices[3].uv.uv0.set_uv(bl_x,bl_y);
		this.vertices[4].uv.uv0.set_uv(tl_x,tl_y);
		this.vertices[5].uv.uv0.set_uv(br_x,br_y);
		this.set_dirty(true);
	}
	,resize: function(quad) {
		this.vertices[0].pos.set_xy(0,0);
		this.vertices[1].pos.set_xy(quad.x,0);
		this.vertices[2].pos.set_xy(quad.x,quad.y);
		this.vertices[3].pos.set_xy(0,quad.y);
		this.vertices[4].pos.set_xy(0,0);
		this.vertices[5].pos.set_xy(quad.x,quad.y);
	}
	,set: function(quad) {
		this.vertices.splice(0,this.vertices.length);
		var vert0 = new phoenix.geometry.Vertex(new phoenix.Vector(0,0),this.color);
		var vert1 = new phoenix.geometry.Vertex(new phoenix.Vector(quad.w,0),this.color);
		var vert2 = new phoenix.geometry.Vertex(new phoenix.Vector(quad.w,quad.h),this.color);
		var vert3 = new phoenix.geometry.Vertex(new phoenix.Vector(0,quad.h),this.color);
		var vert4 = new phoenix.geometry.Vertex(new phoenix.Vector(0,0),this.color);
		var vert5 = new phoenix.geometry.Vertex(new phoenix.Vector(quad.w,quad.h),this.color);
		this.add(vert0);
		this.add(vert1);
		this.add(vert2);
		this.add(vert3);
		this.add(vert4);
		this.add(vert5);
		this.set_primitive_type(4);
		this.immediate = false;
		this.transform.set_pos(new phoenix.Vector(quad.x,quad.y));
		this.is_set = true;
		this.uv_space(new phoenix.Rectangle(0,0,1,1));
	}
	,set_flipx: function(_val) {
		this.flipx = _val;
		if(this.is_set) this.uv_space(this._uv_cache);
		return this.flipx;
	}
	,set_flipy: function(_val) {
		this.flipy = _val;
		if(this.is_set) this.uv_space(this._uv_cache);
		return this.flipy;
	}
	,__class__: phoenix.geometry.QuadGeometry
	,__properties__: $extend(phoenix.geometry.Geometry.prototype.__properties__,{set_flipy:"set_flipy",set_flipx:"set_flipx"})
});
phoenix.geometry.QuadPackGeometry = function(_options) {
	phoenix.geometry.Geometry.call(this,_options);
	this.set_primitive_type(4);
	this.quads = new haxe.ds.IntMap();
};
$hxClasses["phoenix.geometry.QuadPackGeometry"] = phoenix.geometry.QuadPackGeometry;
phoenix.geometry.QuadPackGeometry.__name__ = ["phoenix","geometry","QuadPackGeometry"];
phoenix.geometry.QuadPackGeometry.__super__ = phoenix.geometry.Geometry;
phoenix.geometry.QuadPackGeometry.prototype = $extend(phoenix.geometry.Geometry.prototype,{
	clear: function() {
		var $it0 = this.quads.keys();
		while( $it0.hasNext() ) {
			var q = $it0.next();
			this.quad_remove(q);
		}
	}
	,quad_add: function(_options) {
		if(_options.visible == null) _options.visible = true;
		if(_options.flipx == null) _options.flipx = false;
		if(_options.flipy == null) _options.flipy = false;
		var _uid = Luxe.utils.uniquehash();
		var vert0 = new phoenix.geometry.Vertex(new phoenix.Vector(_options.x,_options.y),_options.color);
		var vert1 = new phoenix.geometry.Vertex(new phoenix.Vector(_options.x + _options.w,_options.y),_options.color);
		var vert2 = new phoenix.geometry.Vertex(new phoenix.Vector(_options.x + _options.w,_options.y + _options.h),_options.color);
		var vert3 = new phoenix.geometry.Vertex(new phoenix.Vector(_options.x,_options.y + _options.h),_options.color);
		var vert4 = new phoenix.geometry.Vertex(new phoenix.Vector(_options.x,_options.y),_options.color);
		var vert5 = new phoenix.geometry.Vertex(new phoenix.Vector(_options.x + _options.w,_options.y + _options.h),_options.color);
		this.add(vert0);
		this.add(vert1);
		this.add(vert2);
		this.add(vert3);
		this.add(vert4);
		this.add(vert5);
		var _quad = { uid : _uid, verts : new Array(), flipx : _options.flipx, flipy : _options.flipx, visible : _options.visible, _uv_cache : new phoenix.Rectangle(0,0,1,1)};
		_quad.verts.push(vert0);
		_quad.verts.push(vert1);
		_quad.verts.push(vert2);
		_quad.verts.push(vert3);
		_quad.verts.push(vert4);
		_quad.verts.push(vert5);
		this.quads.set(_uid,_quad);
		if(_options.uv != null) this.quad_uv(_uid,_options.uv);
		this.set_dirty(true);
		return _uid;
	}
	,quad_remove: function(_quad_id) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			this.remove(_quad.verts[0]);
			this.remove(_quad.verts[1]);
			this.remove(_quad.verts[2]);
			this.remove(_quad.verts[3]);
			this.remove(_quad.verts[4]);
			this.remove(_quad.verts[5]);
			this.quads.remove(_quad_id);
			this.set_dirty(true);
		}
	}
	,quad_visible: function(_quad_id,visible) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			if(visible && !_quad.visible) {
				_quad.visible = false;
				this.add(_quad.verts[0]);
				this.add(_quad.verts[1]);
				this.add(_quad.verts[2]);
				this.add(_quad.verts[3]);
				this.add(_quad.verts[4]);
				this.add(_quad.verts[5]);
			} else if(!visible && _quad.visible) {
				_quad.visible = false;
				this.remove(_quad.verts[0]);
				this.remove(_quad.verts[1]);
				this.remove(_quad.verts[2]);
				this.remove(_quad.verts[3]);
				this.remove(_quad.verts[4]);
				this.remove(_quad.verts[5]);
			}
			this.set_dirty(true);
		}
	}
	,quad_resize: function(_quad_id,_size) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			_quad.verts[0].pos = new phoenix.Vector(_size.x,_size.y);
			_quad.verts[1].pos = new phoenix.Vector(_size.x + _size.w,_size.y);
			_quad.verts[2].pos = new phoenix.Vector(_size.x + _size.w,_size.y + _size.h);
			_quad.verts[3].pos = new phoenix.Vector(_size.x,_size.y + _size.h);
			_quad.verts[4].pos = new phoenix.Vector(_size.x,_size.y);
			_quad.verts[5].pos = new phoenix.Vector(_size.x + _size.w,_size.y + _size.h);
			this.set_dirty(true);
		}
	}
	,quad_pos: function(_quad_id,_p) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			var _diffx = _p.x - _quad.verts[0].pos.x;
			var _diffy = _p.y - _quad.verts[0].pos.y;
			var _g = _quad.verts[0].pos;
			_g.set_x(_g.x + _diffx);
			var _g1 = _quad.verts[0].pos;
			_g1.set_y(_g1.y + _diffy);
			var _g2 = _quad.verts[1].pos;
			_g2.set_x(_g2.x + _diffx);
			var _g3 = _quad.verts[1].pos;
			_g3.set_y(_g3.y + _diffy);
			var _g4 = _quad.verts[2].pos;
			_g4.set_x(_g4.x + _diffx);
			var _g5 = _quad.verts[2].pos;
			_g5.set_y(_g5.y + _diffy);
			var _g6 = _quad.verts[3].pos;
			_g6.set_x(_g6.x + _diffx);
			var _g7 = _quad.verts[3].pos;
			_g7.set_y(_g7.y + _diffy);
			var _g8 = _quad.verts[4].pos;
			_g8.set_x(_g8.x + _diffx);
			var _g9 = _quad.verts[4].pos;
			_g9.set_y(_g9.y + _diffy);
			var _g10 = _quad.verts[5].pos;
			_g10.set_x(_g10.x + _diffx);
			var _g11 = _quad.verts[5].pos;
			_g11.set_y(_g11.y + _diffy);
			this.set_dirty(true);
		}
	}
	,quad_color: function(_quad_id,_c) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			_quad.verts[0].color = _c;
			_quad.verts[1].color = _c;
			_quad.verts[2].color = _c;
			_quad.verts[3].color = _c;
			_quad.verts[4].color = _c;
			_quad.verts[5].color = _c;
		}
	}
	,quad_alpha: function(_quad_id,_a) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			_quad.verts[0].color.a = _a;
			_quad.verts[1].color.a = _a;
			_quad.verts[2].color.a = _a;
			_quad.verts[3].color.a = _a;
			_quad.verts[4].color.a = _a;
			_quad.verts[5].color.a = _a;
		}
	}
	,quad_uv_space: function(_quad_id,_uv) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			var flipx = _quad.flipx;
			var flipy = _quad.flipy;
			var sz_x = _uv.w;
			var sz_y = _uv.h;
			var tl_x = _uv.x;
			var tl_y = _uv.y;
			_quad._uv_cache.set(tl_x,tl_y,sz_x,sz_y);
			var tr_x = tl_x + sz_x;
			var tr_y = tl_y;
			var br_x = tl_x + sz_x;
			var br_y = tl_y + sz_y;
			var bl_x = tl_x;
			var bl_y = tl_y + sz_y;
			var tmp_x = 0.0;
			var tmp_y = 0.0;
			if(flipy) {
				tmp_y = bl_y;
				bl_y = tl_y;
				tl_y = tmp_y;
				tmp_y = br_y;
				br_y = tr_y;
				tr_y = tmp_y;
			}
			if(flipx) {
				tmp_x = tr_x;
				tr_x = tl_x;
				tl_x = tmp_x;
				tmp_x = br_x;
				br_x = bl_x;
				bl_x = tmp_x;
			}
			_quad.verts[0].uv.uv0.set_uv(tl_x,tl_y);
			_quad.verts[1].uv.uv0.set_uv(tr_x,tr_y);
			_quad.verts[2].uv.uv0.set_uv(br_x,br_y);
			_quad.verts[3].uv.uv0.set_uv(bl_x,bl_y);
			_quad.verts[4].uv.uv0.set_uv(tl_x,tl_y);
			_quad.verts[5].uv.uv0.set_uv(br_x,br_y);
			this.set_dirty(true);
		}
	}
	,quad_uv: function(_quad_id,_uv) {
		if(this.get_texture() == null) {
			haxe.Log.trace("Warning : calling UV on a PackedQuad Geometry with null texture.",{ fileName : "QuadPackGeometry.hx", lineNumber : 350, className : "phoenix.geometry.QuadPackGeometry", methodName : "quad_uv"});
			return;
		}
		var tlx = _uv.x / this.get_texture().width_actual;
		var tly = _uv.y / this.get_texture().height_actual;
		var szx = _uv.w / this.get_texture().width_actual;
		var szy = _uv.h / this.get_texture().height_actual;
		this.quad_uv_space(_quad_id,new phoenix.Rectangle(tlx,tly,szx,szy));
	}
	,quad_flipx: function(_quad_id,_flip) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			_quad.flipx = _flip;
			this.quad_uv_space(_quad_id,_quad._uv_cache);
		}
	}
	,quad_flipy: function(_quad_id,_flip) {
		var _quad = this.quads.get(_quad_id);
		if(_quad != null) {
			_quad.flipy = _flip;
			this.quad_uv_space(_quad_id,_quad._uv_cache);
		}
	}
	,__class__: phoenix.geometry.QuadPackGeometry
});
phoenix.geometry.RectangleGeometry = function(options) {
	phoenix.geometry.Geometry.call(this,options);
	if(options == null) return;
	this.set(options);
};
$hxClasses["phoenix.geometry.RectangleGeometry"] = phoenix.geometry.RectangleGeometry;
phoenix.geometry.RectangleGeometry.__name__ = ["phoenix","geometry","RectangleGeometry"];
phoenix.geometry.RectangleGeometry.__super__ = phoenix.geometry.Geometry;
phoenix.geometry.RectangleGeometry.prototype = $extend(phoenix.geometry.Geometry.prototype,{
	set: function(options) {
		this.vertices.splice(0,this.vertices.length);
		var _x = options.x;
		var _y = options.y;
		var _w = options.w;
		var _h = options.h;
		if(options.rect != null) {
			_x = options.rect.x;
			_y = options.rect.y;
			_w = options.rect.w;
			_h = options.rect.h;
		}
		var vert0 = new phoenix.geometry.Vertex(new phoenix.Vector(0,0));
		vert0.uv.uv0.set_uv(0,0);
		var vert1 = new phoenix.geometry.Vertex(new phoenix.Vector(_w,0));
		vert1.uv.uv0.set_uv(1,0);
		var vert2 = new phoenix.geometry.Vertex(new phoenix.Vector(_w,0));
		vert2.uv.uv0.set_uv(1,0);
		var vert3 = new phoenix.geometry.Vertex(new phoenix.Vector(_w,_h));
		vert3.uv.uv0.set_uv(1,1);
		var vert4 = new phoenix.geometry.Vertex(new phoenix.Vector(_w,_h));
		vert4.uv.uv0.set_uv(1,1);
		var vert5 = new phoenix.geometry.Vertex(new phoenix.Vector(0,_h));
		vert5.uv.uv0.set_uv(0,1);
		var vert6 = new phoenix.geometry.Vertex(new phoenix.Vector(0,_h));
		vert6.uv.uv0.set_uv(0,1);
		var vert7 = new phoenix.geometry.Vertex(new phoenix.Vector(0,0));
		vert7.uv.uv0.set_uv(0,0);
		this.add(vert0);
		this.add(vert1);
		this.add(vert2);
		this.add(vert3);
		this.add(vert4);
		this.add(vert5);
		this.add(vert6);
		this.add(vert7);
		this.set_primitive_type(1);
		if(options.immediate == null) this.immediate = false; else this.immediate = options.immediate;
		this.set_visible(options.visible == null?true:options.visible);
		this.set_color(options.color == null?new phoenix.Color():options.color);
		this.transform.set_pos(new phoenix.Vector(_x,_y));
	}
	,__class__: phoenix.geometry.RectangleGeometry
});
phoenix.geometry._TextGeometry = {};
phoenix.geometry._TextGeometry.EvTextGeometry_Impl_ = function() { };
$hxClasses["phoenix.geometry._TextGeometry.EvTextGeometry_Impl_"] = phoenix.geometry._TextGeometry.EvTextGeometry_Impl_;
phoenix.geometry._TextGeometry.EvTextGeometry_Impl_.__name__ = ["phoenix","geometry","_TextGeometry","EvTextGeometry_Impl_"];
phoenix.geometry.TextGeometry = function(_options) {
	this.dirty_align = true;
	this.dirty_sizing = true;
	this.point_ratio = 1;
	this.text_h_h = 0;
	this.text_h_w = 0;
	this.text_height = 0;
	this.text_width = 0;
	this.glow_amount = 0;
	this.glow_threshold = 0;
	this.outline = 0;
	this.thickness = 0.5;
	this.smoothness = 0.75;
	this.unique = false;
	this.sdf = false;
	this.bounds_wrap = false;
	this.letter_spacing = 0.0;
	this.line_spacing = 0.0;
	this.point_size = 32.0;
	this.text = "";
	this.options = _options;
	this.emitter = new luxe.Emitter();
	if(this.options == null) throw "TextGeometry: requires non-null options at the moment";
	if(this.options.sdf != null) this.sdf = this.options.sdf;
	if(this.options.font == null) this.font = Luxe.renderer.font; else this.font = this.options.font;
	if(this.font == Luxe.renderer.font) this.sdf = true;
	if(this.options.shader == null) {
		if(this.sdf) this.options.shader = Luxe.renderer.shaders.bitmapfont.shader; else this.options.shader = Luxe.renderer.shaders.textured.shader;
	} else if(this.options.shader != Luxe.renderer.shaders.bitmapfont.shader) this.unique = true;
	phoenix.geometry.Geometry.call(this,this.options);
	this.set_primitive_type(4);
	this.cache = [];
	this.line_widths = [];
	this.line_offsets = [[],[]];
	this.lines = [];
	this.set_outline_color(new phoenix.Color());
	this.set_glow_color(new phoenix.Color());
	this.default_options();
};
$hxClasses["phoenix.geometry.TextGeometry"] = phoenix.geometry.TextGeometry;
phoenix.geometry.TextGeometry.__name__ = ["phoenix","geometry","TextGeometry"];
phoenix.geometry.TextGeometry.__super__ = phoenix.geometry.Geometry;
phoenix.geometry.TextGeometry.prototype = $extend(phoenix.geometry.Geometry.prototype,{
	tidy: function() {
		var _vertidx = Math.floor(this.vertices.length / 6);
		var _diff = this.cache.length - _vertidx;
		if(_diff > 0) {
			var extra = this.cache.splice(_vertidx,_diff);
			var c = extra.length;
			while(c > 0) {
				c--;
				var vert = extra.pop();
				vert = null;
			}
		}
	}
	,default_options: function() {
		this.set_texture(this.font.pages.get(0));
		if(this.options.letter_spacing != null) this.set_letter_spacing(this.options.letter_spacing);
		if(this.options.line_spacing != null) this.set_line_spacing(this.options.line_spacing);
		if(this.options.point_size != null) this.set_point_size(this.options.point_size);
		if(this.options.bounds != null) this.set_bounds(this.options.bounds);
		if(this.options.bounds_wrap != null) this.set_bounds_wrap(this.options.bounds_wrap);
		if(this.options.align == null) this.options.align = 0;
		if(this.options.align_vertical == null) this.options.align_vertical = 0;
		this.set_align(this.options.align);
		this.set_align_vertical(this.options.align_vertical);
		if(this.options.thickness != null) this.set_thickness(this.options.thickness);
		if(this.options.smoothness != null) this.set_smoothness(this.options.smoothness);
		if(this.options.outline != null) this.set_outline(this.options.outline);
		if(this.options.outline_color != null) this.set_outline_color(this.options.outline_color);
		if(this.options.glow_threshold != null) this.set_glow_threshold(this.options.glow_threshold);
		if(this.options.glow_amount != null) this.set_glow_amount(this.options.glow_amount);
		if(this.options.glow_color != null) this.set_glow_color(this.options.glow_color);
		if(this.sdf) this.flush_uniforms();
		if(this.options.text != null) this.set_text(this.options.text);
	}
	,set_text: function(_text) {
		if(_text == null) {
			haxe.Log.trace("i / textgeometry / " + "null text passed into TextGeometry!",{ fileName : "TextGeometry.hx", lineNumber : 239, className : "phoenix.geometry.TextGeometry", methodName : "set_text"});
			_text = "";
		}
		if(this.text != _text) {
			this.text = _text;
			if(this.text != "") {
				this.set_dirty_sizing(true);
				this.update_text();
			} else this.vertices.splice(0,this.vertices.length);
		}
		return this.text;
	}
	,stats: function() {
		return "letters:" + this.vertices.length / 6 + " / cache:" + this.cache.length;
	}
	,update_sizes: function() {
		if(!this.dirty_sizing) return false;
		var drawn_text = phoenix.geometry.TextGeometry.tab_regex.replace(this.text,"    ");
		if(this.bounds_wrap && this.bounds != null) drawn_text = this.font.wrap_string_to_bounds(drawn_text,this.bounds,this.point_size,this.letter_spacing);
		this.lines.splice(0,this.lines.length);
		this.lines = drawn_text.split("\n");
		this.line_widths.splice(0,this.line_widths.length);
		this.text_width = this.font.width_of(drawn_text,this.point_size,this.letter_spacing,this.line_widths);
		this.text_height = this.font.height_of_lines(this.lines,this.point_size,this.line_spacing);
		this.text_h_w = this.text_width / 2;
		this.text_h_h = this.text_height / 2;
		this.point_ratio = this.point_size / this.font.info.point_size;
		this.set_dirty_sizing(false);
		return true;
	}
	,update_text: function() {
		var _g = this;
		var _pos_x = 0.0;
		var _pos_y = 0.0;
		var _bounds_based = this.bounds != null;
		if(_bounds_based) {
			this.transform.local.pos.set_x(_pos_x = this.bounds.x);
			this.transform.local.pos.set_y(_pos_y = this.bounds.y);
		}
		var _cur_x = 0.0;
		var _cur_y = 0.0;
		var _line_idx = 0;
		var _total_idx = 0;
		var _is_char = true;
		var _was_dirty = this.update_sizes();
		var _g1 = 0;
		var _g11 = this.lines;
		while(_g1 < _g11.length) {
			var _line = _g11[_g1];
			++_g1;
			var _line_x_offset = 0.0;
			var _line_y_offset = 0.0;
			if(this.dirty_align) {
				if(!_bounds_based) {
					var _g2 = this.align;
					switch(_g2) {
					case 2:
						_line_x_offset = -(this.line_widths[_line_idx] / 2.0);
						break;
					case 1:
						_line_x_offset = -this.line_widths[_line_idx];
						break;
					default:
						_line_x_offset = 0.0;
					}
					var _g21 = this.align_vertical;
					switch(_g21) {
					case 2:
						_line_y_offset = -this.text_h_h;
						break;
					case 4:
						_line_y_offset = -this.text_height;
						break;
					default:
						_line_y_offset = 0.0;
					}
				} else {
					var _g22 = this.align;
					switch(_g22) {
					case 2:
						_line_x_offset = -(this.line_widths[_line_idx] / 2.0) + this.bounds.w / 2;
						break;
					case 1:
						_line_x_offset = -this.line_widths[_line_idx] + this.bounds.w;
						break;
					default:
						_line_x_offset = 0.0;
					}
					var _g23 = this.align_vertical;
					switch(_g23) {
					case 2:
						_line_y_offset = this.bounds.h / 2 - this.text_h_h;
						break;
					case 4:
						_line_y_offset = this.bounds.h - this.text_height;
						break;
					default:
						_line_y_offset = 0.0;
					}
				}
				this.line_offsets[0][_line_idx] = _line_x_offset;
				this.line_offsets[1][_line_idx] = _line_y_offset;
			} else {
				_line_x_offset = this.line_offsets[0][_line_idx];
				_line_y_offset = this.line_offsets[1][_line_idx];
			}
			if(_line_idx != 0) {
				_cur_y += (_g.font.info.line_height + _g.line_spacing) * _g.point_ratio;
				_cur_x = 0;
			}
			var _idx = 0;
			var $it0 = new luxe.utils.unifill.CodePointIter(_line);
			while( $it0.hasNext() ) {
				var _uglyph = $it0.next();
				var _index = _uglyph;
				var _char = this.font.info.chars.get(_index);
				_is_char = _char != null && _index > 32;
				if(!_is_char) _char = this.font.space_char;
				if(_is_char) {
					var _quad_x = _line_x_offset + _cur_x + _char.xoffset * this.point_ratio;
					var _quad_y = _line_y_offset + _cur_y + _char.yoffset * this.point_ratio;
					var _page = this.font.pages.get(_char.page);
					var _u1 = _char.x / _page.width_actual;
					var _v1 = _char.y / _page.height_actual;
					var _u2 = (_char.x + _char.width) / _page.width_actual;
					var _v2 = (_char.y + _char.height) / _page.height_actual;
					this.update_char(_total_idx,_quad_x,_quad_y,_char.width * this.point_ratio,_char.height * this.point_ratio,_u1,_v1,_u2,_v2,this.color);
					_total_idx++;
				}
				var _x_inc = _char.xadvance;
				if(_idx < _line.length - 1) {
					_x_inc += this.font.kerning(_index,luxe.utils.unifill.Unifill.uCharCodeAt(_line,_idx + 1));
					if(_index >= 32) _x_inc += this.letter_spacing;
				}
				_x_inc *= this.point_ratio;
				_cur_x += _x_inc;
				_idx++;
			}
			_line_idx++;
		}
		var _vertidx = this.vertices.length / 6 | 0;
		var _diff = _vertidx - _total_idx;
		if(_diff > 0) this.vertices.splice(_total_idx * 6,_diff * 6);
		this.dirty_align = false;
		this.emitter.emit(1,null,{ fileName : "TextGeometry.hx", lineNumber : 453, className : "phoenix.geometry.TextGeometry", methodName : "update_text"});
	}
	,update_char: function(_letteridx,_x,_y,_w,_h,_u,_v,_u2,_v2,_color) {
		var vert0;
		var vert1;
		var vert2;
		var vert3;
		var vert4;
		var vert5;
		var quad = this.cache[_letteridx];
		if(quad == null) {
			vert0 = new phoenix.geometry.Vertex(new phoenix.Vector(_x,_y),_color);
			vert1 = new phoenix.geometry.Vertex(new phoenix.Vector(_x + _w,_y),_color);
			vert2 = new phoenix.geometry.Vertex(new phoenix.Vector(_x + _w,_y + _h),_color);
			vert3 = new phoenix.geometry.Vertex(new phoenix.Vector(_x,_y + _h),_color);
			vert4 = new phoenix.geometry.Vertex(new phoenix.Vector(_x,_y),_color);
			vert5 = new phoenix.geometry.Vertex(new phoenix.Vector(_x + _w,_y + _h),_color);
			quad = [vert0,vert1,vert2,vert3,vert4,vert5];
			this.cache[_letteridx] = quad;
		} else {
			vert0 = quad[0];
			vert1 = quad[1];
			vert2 = quad[2];
			vert3 = quad[3];
			vert4 = quad[4];
			vert5 = quad[5];
			vert0.pos.set_xy(_x,_y);
			vert1.pos.set_xy(_x + _w,_y);
			vert2.pos.set_xy(_x + _w,_y + _h);
			vert3.pos.set_xy(_x,_y + _h);
			vert4.pos.set_xy(_x,_y);
			vert5.pos.set_xy(_x + _w,_y + _h);
		}
		vert0.uv.uv0.set_uv(_u,_v);
		vert1.uv.uv0.set_uv(_u2,_v);
		vert2.uv.uv0.set_uv(_u2,_v2);
		vert3.uv.uv0.set_uv(_u,_v2);
		vert4.uv.uv0.set_uv(_u,_v);
		vert5.uv.uv0.set_uv(_u2,_v2);
		var _vertidx = Math.floor(this.vertices.length / 6);
		if(_vertidx <= _letteridx) {
			this.add(vert0);
			this.add(vert1);
			this.add(vert2);
			this.add(vert3);
			this.add(vert4);
			this.add(vert5);
		}
	}
	,set_dirty_sizing: function(_b) {
		this.dirty_align = true;
		return this.dirty_sizing = _b;
	}
	,set_bounds: function(_bounds) {
		this.bounds = _bounds;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.bounds;
	}
	,set_bounds_wrap: function(_wrap) {
		this.bounds_wrap = _wrap;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.bounds_wrap;
	}
	,set_line_spacing: function(_line_spacing) {
		this.line_spacing = _line_spacing;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.line_spacing;
	}
	,set_letter_spacing: function(_letter_spacing) {
		this.letter_spacing = _letter_spacing;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.letter_spacing;
	}
	,set_align: function(_align) {
		this.align = _align;
		this.dirty_align = true;
		this.update_text();
		return this.align;
	}
	,set_align_vertical: function(_align_vertical) {
		this.align_vertical = _align_vertical;
		this.dirty_align = true;
		this.update_text();
		return this.align_vertical;
	}
	,set_point_size: function(s) {
		if(s < 0) s = 0;
		this.point_size = s;
		this.set_dirty_sizing(true);
		this.update_text();
		return this.point_size;
	}
	,set_smoothness: function(s) {
		if(s < 0) s = 0;
		if(this.get_shader() != null && this.sdf && this.unique) this.get_shader().set_float("smoothness",s);
		return this.smoothness = s;
	}
	,set_thickness: function(s) {
		if(s < 0) s = 0;
		if(this.get_shader() != null && this.sdf && this.unique) this.get_shader().set_float("thickness",s);
		return this.thickness = s;
	}
	,set_outline: function(s) {
		if(s < 0.0) s = 0.0; else if(s > 1.0) s = 1.0; else s = s;
		if(this.get_shader() != null && this.sdf && this.unique) this.get_shader().set_float("outline",s);
		return this.outline = s;
	}
	,set_glow_threshold: function(s) {
		if(s < 0) s = 0;
		if(this.get_shader() != null && this.sdf && this.unique) this.get_shader().set_float("glow_threshold",s);
		return this.glow_threshold = s;
	}
	,set_glow_amount: function(s) {
		if(s < 0) s = 0;
		if(this.get_shader() != null && this.sdf && this.unique) this.get_shader().set_float("glow_amount",s);
		return this.glow_amount = s;
	}
	,set_outline_color: function(c) {
		if(this.get_shader() != null && this.sdf && this.unique) this.get_shader().set_color("outline_color",c);
		return this.outline_color = c;
	}
	,set_glow_color: function(c) {
		if(this.get_shader() != null && this.sdf && this.unique) this.get_shader().set_color("glow_color",c);
		return this.glow_color = c;
	}
	,flush_uniforms: function() {
		if(this.get_shader() != null && this.sdf) {
			this.get_shader().set_float("smoothness",this.smoothness);
			this.get_shader().set_float("thickness",this.thickness);
			this.get_shader().set_float("outline",this.outline);
			this.get_shader().set_float("glow_threshold",this.glow_threshold);
			this.get_shader().set_float("glow_amount",this.glow_amount);
			this.get_shader().set_color("outline_color",this.outline_color);
			this.get_shader().set_color("glow_color",this.glow_color);
		}
	}
	,__class__: phoenix.geometry.TextGeometry
	,__properties__: $extend(phoenix.geometry.Geometry.prototype.__properties__,{set_dirty_sizing:"set_dirty_sizing",set_glow_color:"set_glow_color",set_glow_amount:"set_glow_amount",set_glow_threshold:"set_glow_threshold",set_outline_color:"set_outline_color",set_outline:"set_outline",set_thickness:"set_thickness",set_smoothness:"set_smoothness",set_align_vertical:"set_align_vertical",set_align:"set_align",set_bounds_wrap:"set_bounds_wrap",set_bounds:"set_bounds",set_letter_spacing:"set_letter_spacing",set_line_spacing:"set_line_spacing",set_point_size:"set_point_size",set_text:"set_text"})
});
phoenix.geometry.TextureCoordSet = function() {
	this.uv0 = new phoenix.geometry.TextureCoord();
	this.uv1 = new phoenix.geometry.TextureCoord();
	this.uv2 = new phoenix.geometry.TextureCoord();
	this.uv3 = new phoenix.geometry.TextureCoord();
	this.uv4 = new phoenix.geometry.TextureCoord();
	this.uv5 = new phoenix.geometry.TextureCoord();
	this.uv6 = new phoenix.geometry.TextureCoord();
	this.uv7 = new phoenix.geometry.TextureCoord();
};
$hxClasses["phoenix.geometry.TextureCoordSet"] = phoenix.geometry.TextureCoordSet;
phoenix.geometry.TextureCoordSet.__name__ = ["phoenix","geometry","TextureCoordSet"];
phoenix.geometry.TextureCoordSet.prototype = {
	clone: function() {
		var _set = new phoenix.geometry.TextureCoordSet();
		_set.uv0.set(this.uv0.u,this.uv0.v,this.uv0.w,this.uv0.t);
		_set.uv1.set(this.uv1.u,this.uv1.v,this.uv1.w,this.uv1.t);
		_set.uv2.set(this.uv2.u,this.uv2.v,this.uv2.w,this.uv2.t);
		_set.uv3.set(this.uv3.u,this.uv3.v,this.uv3.w,this.uv3.t);
		_set.uv4.set(this.uv4.u,this.uv4.v,this.uv4.w,this.uv4.t);
		_set.uv5.set(this.uv5.u,this.uv5.v,this.uv5.w,this.uv5.t);
		_set.uv6.set(this.uv6.u,this.uv6.v,this.uv6.w,this.uv6.t);
		_set.uv7.set(this.uv7.u,this.uv7.v,this.uv7.w,this.uv7.t);
		return _set;
	}
	,__class__: phoenix.geometry.TextureCoordSet
};
phoenix.geometry.TextureCoord = function(_u,_v,_w,_t) {
	if(_t == null) _t = 0.0;
	if(_w == null) _w = 0.0;
	if(_v == null) _v = 0.0;
	if(_u == null) _u = 0.0;
	this.t = 0.0;
	this.w = 0.0;
	this.v = 0.0;
	this.u = 0.0;
	this.u = _u;
	this.v = _v;
	this.w = _w;
	this.t = _t;
};
$hxClasses["phoenix.geometry.TextureCoord"] = phoenix.geometry.TextureCoord;
phoenix.geometry.TextureCoord.__name__ = ["phoenix","geometry","TextureCoord"];
phoenix.geometry.TextureCoord.prototype = {
	clone: function() {
		return new phoenix.geometry.TextureCoord(this.u,this.v,this.w,this.t);
	}
	,set: function(_u,_v,_w,_t) {
		this.u = _u;
		this.v = _v;
		this.w = _w;
		this.t = _t;
		return this;
	}
	,set_uv: function(_u,_v) {
		this.u = _u;
		this.v = _v;
		return this;
	}
	,toString: function() {
		return "{ u:" + this.v + ", v:" + this.v + " }";
	}
	,__class__: phoenix.geometry.TextureCoord
};
phoenix.geometry.Vertex = function(_pos,_color,_normal) {
	this.uv = new phoenix.geometry.TextureCoordSet();
	this.pos = _pos;
	if(_color == null) this.color = new phoenix.Color(); else this.color = _color;
	if(_normal == null) this.normal = new phoenix.Vector(); else this.normal = _normal;
};
$hxClasses["phoenix.geometry.Vertex"] = phoenix.geometry.Vertex;
phoenix.geometry.Vertex.__name__ = ["phoenix","geometry","Vertex"];
phoenix.geometry.Vertex.prototype = {
	clone: function() {
		var _new = new phoenix.geometry.Vertex(this.pos.clone(),this.color.clone(),this.normal.clone());
		_new.uv = this.uv.clone();
		return _new;
	}
	,__class__: phoenix.geometry.Vertex
};
phoenix.utils = {};
phoenix.utils.Rendering = function() { };
$hxClasses["phoenix.utils.Rendering"] = phoenix.utils.Rendering;
phoenix.utils.Rendering.__name__ = ["phoenix","utils","Rendering"];
phoenix.utils.Rendering.gl_blend_mode_from_BlendMode = function(_b) {
	switch(_b) {
	case 0:
		return 0;
	case 1:
		return 1;
	case 768:
		return 768;
	case 769:
		return 769;
	case 770:
		return 770;
	case 771:
		return 771;
	case 772:
		return 772;
	case 773:
		return 773;
	case 774:
		return 774;
	case 775:
		return 775;
	case 776:
		return 776;
	}
};
phoenix.utils.Rendering.get_elements_for_type = function(type,length) {
	switch(type) {
	case 0:
		return length / 4 | 0;
	case 1:
		return length / 4 | 0;
	case 3:
		return length / 4 | 0;
	case 2:
		return length / 4 | 0;
	case 5:
		return length / 4 | 0;
	case 6:
		return length / 4 | 0;
	default:
		return length / 4 | 0;
	}
};
phoenix.utils.Rendering.fovx_to_y = function(fovx,aspect) {
	return 180 / Math.PI * (2 * Math.atan(Math.tan(fovx * (Math.PI / 180) / 2) * (1 / aspect)));
};
snow.AppFixedTimestep = function() {
	this.overflow = 0.0;
	this.frame_time = 0.0167;
	snow.App.call(this);
};
$hxClasses["snow.AppFixedTimestep"] = snow.AppFixedTimestep;
snow.AppFixedTimestep.__name__ = ["snow","AppFixedTimestep"];
snow.AppFixedTimestep.__super__ = snow.App;
snow.AppFixedTimestep.prototype = $extend(snow.App.prototype,{
	on_internal_init: function() {
		snow.App.prototype.on_internal_init.call(this);
		this.frame_time = 0.0166666666666666664;
		this.last_frame_start = snow.Snow.core.timestamp();
	}
	,on_internal_update: function() {
		this.cur_frame_start = snow.Snow.core.timestamp();
		this.delta_time = this.cur_frame_start - this.last_frame_start;
		this.delta_sim = this.delta_time * this.timescale;
		if(this.delta_sim > this.max_frame_time) this.delta_sim = this.max_frame_time;
		this.last_frame_start = this.cur_frame_start;
		this.overflow += this.delta_sim;
		while(this.overflow >= this.frame_time) {
			this.app.do_internal_update(this.frame_time * this.timescale);
			this.current_time += this.frame_time * this.timescale;
			this.overflow -= this.frame_time * this.timescale;
		}
		this.alpha = this.overflow / this.frame_time;
	}
	,__class__: snow.AppFixedTimestep
});
snow.Snow = function() {
	this.is_ready = false;
	this.was_ready = false;
	this.has_shutdown = false;
	this.shutting_down = false;
	this.platform = "unknown";
	this.freeze = false;
	this.platform = "web";
	snow.Snow.core = new snow.core.web.Core(this);
	snow.Snow.next_queue = [];
};
$hxClasses["snow.Snow"] = snow.Snow;
snow.Snow.__name__ = ["snow","Snow"];
snow.Snow.__properties__ = {get_timestamp:"get_timestamp"}
snow.Snow.next = function(func) {
	if(func != null) snow.Snow.next_queue.push(func);
};
snow.Snow.get_timestamp = function() {
	return snow.Snow.core.timestamp();
};
snow.Snow.prototype = {
	shutdown: function() {
		this.shutting_down = true;
		this.host.ondestroy();
		this.io.module.destroy();
		this.audio.destroy();
		this.input.destroy();
		this.windowing.destroy();
		snow.Snow.core.shutdown();
		this.has_shutdown = true;
	}
	,render: function() {
		this.windowing.update();
	}
	,dispatch_system_event: function(_event) {
		this.on_event(_event);
	}
	,init: function(_snow_config,_host) {
		this.snow_config = _snow_config;
		if(this.snow_config.app_package == null) this.snow_config.app_package = "org.snowkit.snowdefault";
		this.config = { has_window : true, runtime : { }, window : null, render : null, web : { no_context_menu : true, prevent_default_keys : [snow.system.input.Keycodes.left,snow.system.input.Keycodes.right,snow.system.input.Keycodes.up,snow.system.input.Keycodes.down,snow.system.input.Keycodes.backspace,snow.system.input.Keycodes.tab,snow.system.input.Keycodes["delete"]], prevent_default_mouse_wheel : true, true_fullscreen : false}, 'native' : { audio_buffer_length : 176400, audio_buffer_count : 4}};
		this.host = _host;
		this.host.app = this;
		snow.Snow.core.init($bind(this,this.on_event));
	}
	,on_snow_init: function() {
		this.host.on_internal_init();
	}
	,on_snow_ready: function() {
		var _g = this;
		if(this.was_ready) throw snow.types.Error.error("firing ready event more than once is invalid usage");
		this.io = new snow.system.io.IO(this);
		this.input = new snow.system.input.Input(this);
		this.audio = new snow.system.audio.Audio(this);
		this.assets = new snow.system.assets.Assets(this);
		this.windowing = new snow.system.window.Windowing(this);
		this.was_ready = true;
		this.setup_app_path();
		this.setup_default_assets().then(function(_) {
			_g.setup_configs().then(function(_1) {
				_g.setup_default_window();
				snow.Snow.next($bind(_g,_g.on_ready));
			});
		}).error(function(e) {
			throw snow.types.Error.init("snow / cannot recover from error: " + e);
		});
		snow.api.Promises.step();
		while(snow.Snow.next_queue.length > 0) this.cycle_next_queue();
	}
	,do_internal_update: function(dt) {
		this.io.module.update();
		this.input.update();
		this.audio.update();
		this.host.update(dt);
	}
	,on_ready: function() {
		this.is_ready = true;
		this.host.ready();
	}
	,on_snow_update: function() {
		if(this.freeze) return;
		snow.api.Timer.update();
		snow.api.Promises.step();
		this.cycle_next_queue();
		if(!this.is_ready) return;
		this.host.on_internal_update();
		this.host.on_internal_render();
	}
	,on_event: function(_event) {
		if(_event.type != 3 && _event.type != 0 && _event.type != 5 && _event.type != 6) null;
		if(_event.type != 3) null;
		if(this.is_ready) {
			this.io.module.on_event(_event);
			this.audio.on_event(_event);
			this.windowing.on_event(_event);
			this.input.on_event(_event);
			this.host.onevent(_event);
		}
		var _g = _event.type;
		switch(_g) {
		case 1:
			this.on_snow_init();
			break;
		case 2:
			this.on_snow_ready();
			break;
		case 3:
			this.on_snow_update();
			break;
		case 7:case 8:
			this.shutdown();
			break;
		case 4:
			haxe.Log.trace("     i / snow / " + "Goodbye.",{ fileName : "Snow.hx", lineNumber : 338, className : "snow.Snow", methodName : "on_event"});
			break;
		default:
		}
	}
	,cycle_next_queue: function() {
		var count = snow.Snow.next_queue.length;
		if(count > 0) {
			var _g = 0;
			while(_g < count) {
				var i = _g++;
				(snow.Snow.next_queue.shift())();
			}
		}
	}
	,setup_app_path: function() {
	}
	,setup_default_assets: function() {
		var _g = this;
		return new snow.api.Promise(function(resolve,reject) {
			if(!_g.snow_config.config_custom_assets) {
				_g.assets.manifest_path = _g.snow_config.config_assets_path;
				_g.default_asset_list().then(function(list) {
					_g.assets.list = list;
				}).error(function(e) {
					null;
				}).then(resolve);
			}
		});
	}
	,setup_configs: function() {
		var _g = this;
		this.config.window = this.default_window_config();
		this.config.render = this.default_render_config();
		return new snow.api.Promise(function(resolve,reject) {
			if(!_g.snow_config.config_custom_runtime) _g.default_runtime_config().then(function(_runtime_conf) {
				_g.config.runtime = _runtime_conf;
			}).error(function(error) {
				throw snow.types.Error.init("config / failed / default runtime config failed to parse as JSON. cannot recover. " + error);
			}).then(function() {
				_g.setup_host_config();
				resolve();
			}); else {
				_g.setup_host_config();
				resolve();
			}
		});
	}
	,setup_host_config: function() {
		this.config = this.host.config(this.config);
	}
	,setup_default_window: function() {
		if(this.config.has_window == true) {
			this.window = this.windowing.create(this.config.window);
			if(this.window.handle == null) throw snow.types.Error.windowing("requested default window cannot be created. cannot continue");
		}
	}
	,default_runtime_config: function() {
		var _g = this;
		return new snow.api.Promise(function(resolve,reject) {
			var load = _g.io.data_flow(_g.snow_config.config_runtime_path,snow.system.assets.AssetJSON.processor);
			load.then(resolve).error(function(error) {
				switch(error[1]) {
				case 3:
					var val = error[2];
					reject(error);
					break;
				default:
					resolve();
				}
			});
		});
	}
	,default_asset_list: function() {
		var _g = this;
		return new snow.api.Promise(function(resolve,reject) {
			var list_path = _g.assets.root + _g.assets.manifest_path;
			var load = _g.io.data_flow(list_path,snow.system.assets.AssetJSON.processor);
			load.then(function(json) {
				var _list = json;
				resolve(_list);
			}).error(reject);
		});
	}
	,default_render_config: function() {
		return { depth : false, stencil : false, antialiasing : 0, red_bits : 8, green_bits : 8, blue_bits : 8, alpha_bits : 8, depth_bits : 0, stencil_bits : 0, opengl : { minor : 0, major : 0, profile : 0}};
	}
	,default_window_config: function() {
		var conf = { fullscreen_desktop : true, fullscreen : false, borderless : false, resizable : true, x : 536805376, y : 536805376, width : 960, height : 640, title : "snow app"};
		return conf;
	}
	,set_freeze: function(_freeze) {
		this.freeze = _freeze;
		if(_freeze) this.audio.suspend(); else this.audio.resume();
		return this.freeze;
	}
	,get_time: function() {
		return snow.Snow.core.timestamp();
	}
	,get_uniqueid: function() {
		return this.make_uniqueid();
	}
	,make_uniqueid: function(val) {
		if(val == null) val = Std.random(2147483647);
		var r = val % 62 | 0;
		var q = val / 62 | 0;
		if(q > 0) return this.make_uniqueid(q) + (r > 9?(function($this) {
			var $r;
			var ascii = 65 + (r - 10);
			if(ascii > 90) ascii += 6;
			$r = String.fromCharCode(ascii);
			return $r;
		}(this)):(r == null?"null":"" + r).charAt(0));
		return Std.string(r > 9?(function($this) {
			var $r;
			var ascii1 = 65 + (r - 10);
			if(ascii1 > 90) ascii1 += 6;
			$r = String.fromCharCode(ascii1);
			return $r;
		}(this)):(r == null?"null":"" + r).charAt(0));
	}
	,typename: function(t) {
		return Type.getClassName(Type.getClass(t));
	}
	,__class__: snow.Snow
	,__properties__: {set_freeze:"set_freeze",get_uniqueid:"get_uniqueid",get_time:"get_time"}
};
snow.api = {};
snow.api._Debug = {};
snow.api._Debug.LogError = $hxClasses["snow.api._Debug.LogError"] = { __ename__ : ["snow","api","_Debug","LogError"], __constructs__ : ["RequireString"] };
snow.api._Debug.LogError.RequireString = function(detail) { var $x = ["RequireString",0,detail]; $x.__enum__ = snow.api._Debug.LogError; $x.toString = $estr; return $x; };
snow.api.Debug = function() { };
$hxClasses["snow.api.Debug"] = snow.api.Debug;
snow.api.Debug.__name__ = ["snow","api","Debug"];
snow.api.Debug._get_spacing = function(_file) {
	var _spaces = "";
	var _trace_length = _file.length + 4;
	var _diff = snow.api.Debug._log_width - _trace_length;
	if(_diff > 0) {
		var _g = 0;
		while(_g < _diff) {
			var i = _g++;
			_spaces += " ";
		}
	}
	return _spaces;
};
snow.api.DebugError = $hxClasses["snow.api.DebugError"] = { __ename__ : ["snow","api","DebugError"], __constructs__ : ["assertion","null_assertion"] };
snow.api.DebugError.assertion = function(expr) { var $x = ["assertion",0,expr]; $x.__enum__ = snow.api.DebugError; $x.toString = $estr; return $x; };
snow.api.DebugError.null_assertion = function(expr) { var $x = ["null_assertion",1,expr]; $x.__enum__ = snow.api.DebugError; $x.toString = $estr; return $x; };
snow.api.Libs = function() { };
$hxClasses["snow.api.Libs"] = snow.api.Libs;
snow.api.Libs.__name__ = ["snow","api","Libs"];
snow.api.Libs.tryLoad = function(name,library,func,args) {
	return null;
};
snow.api.Libs.findHaxeLib = function(library) {
	try {
	} catch( e ) {
	}
	return "";
};
snow.api.Libs.get_system_name = function() {
	return window.navigator.userAgent;
	return "unknown";
};
snow.api.Libs.web_add_lib = function(library,root) {
	if(snow.api.Libs._web_libs == null) snow.api.Libs._web_libs = new haxe.ds.StringMap();
	var value = root;
	snow.api.Libs._web_libs.set(library,value);
	return true;
};
snow.api.Libs.web_lib_load = function(library,method) {
	if(snow.api.Libs._web_libs == null) snow.api.Libs._web_libs = new haxe.ds.StringMap();
	var _root = snow.api.Libs._web_libs.get(library);
	if(_root != null) return Reflect.field(_root,method);
	return null;
};
snow.api.Libs.load = function(library,method,args) {
	if(args == null) args = 0;
	var found_in_web_libs = snow.api.Libs.web_lib_load(library,method);
	if(found_in_web_libs) return found_in_web_libs;
	if(snow.api.Libs.__moduleNames == null) snow.api.Libs.__moduleNames = new haxe.ds.StringMap();
	if(snow.api.Libs.__moduleNames.exists(library)) {
	}
	snow.api.Libs.__moduleNames.set(library,library);
	var result = snow.api.Libs.tryLoad("./" + library,library,method,args);
	if(result == null) result = snow.api.Libs.tryLoad(".\\" + library,library,method,args);
	if(result == null) result = snow.api.Libs.tryLoad(library,library,method,args);
	if(result == null) {
		var slash;
		if(((function($this) {
			var $r;
			var _this = snow.api.Libs.get_system_name();
			$r = HxOverrides.substr(_this,7,null);
			return $r;
		}(this))).toLowerCase() == "windows") slash = "\\"; else slash = "/";
		var haxelib = snow.api.Libs.findHaxeLib("snow");
		if(haxelib != "") {
			result = snow.api.Libs.tryLoad(haxelib + slash + "ndll" + slash + snow.api.Libs.get_system_name() + slash + library,library,method,args);
			if(result == null) result = snow.api.Libs.tryLoad(haxelib + slash + "ndll" + slash + snow.api.Libs.get_system_name() + "64" + slash + library,library,method,args);
		}
	}
	snow.api.Libs.loaderTrace("Result : " + Std.string(result));
	return result;
};
snow.api.Libs.loaderTrace = function(message) {
};
snow.api.Promise = function(func) {
	this.was_caught = false;
	var _g = this;
	this.state = 0;
	this.reject_reactions = [];
	this.fulfill_reactions = [];
	this.settle_reactions = [];
	snow.api.Promises.queue(function() {
		func($bind(_g,_g.onfulfill),$bind(_g,_g.onreject));
		snow.api.Promises.defer(snow.api.Promises.next);
	});
};
$hxClasses["snow.api.Promise"] = snow.api.Promise;
snow.api.Promise.__name__ = ["snow","api","Promise"];
snow.api.Promise.all = function(_tag,list) {
	if(_tag == null) _tag = "all";
	return new snow.api.Promise(function(ok,no) {
		var current = 0;
		var total = list.length;
		var fulfill_result = [];
		var reject_result = null;
		var all_state = 0;
		var single_ok = function(val) {
			if(all_state != 0) return;
			current++;
			fulfill_result.push(val);
			if(total == current) {
				all_state = 1;
				ok(fulfill_result);
			}
		};
		var single_err = function(val1) {
			if(all_state != 0) return;
			all_state = 2;
			reject_result = val1;
			no(reject_result);
		};
		var _g = 0;
		while(_g < list.length) {
			var promise = list[_g];
			++_g;
			promise.then(single_ok).error(single_err);
		}
	});
};
snow.api.Promise.race = function(list) {
	return new snow.api.Promise(function(ok,no) {
		var settled = false;
		var single_ok = function(val) {
			if(settled) return;
			settled = true;
			ok(val);
		};
		var single_err = function(val1) {
			if(settled) return;
			settled = true;
			no(val1);
		};
		var _g = 0;
		while(_g < list.length) {
			var promise = list[_g];
			++_g;
			promise.then(single_ok).error(single_err);
		}
	});
};
snow.api.Promise.reject = function(reason) {
	return new snow.api.Promise(function(ok,no) {
		no(reason);
	});
};
snow.api.Promise.resolve = function(val) {
	return new snow.api.Promise(function(ok,no) {
		ok(val);
	});
};
snow.api.Promise.prototype = {
	then: function(on_fulfilled,on_rejected) {
		var _g = this.state;
		switch(_g) {
		case 0:
			this.add_fulfill(on_fulfilled);
			this.add_reject(on_rejected);
			return this.new_linked_promise();
		case 1:
			snow.api.Promises.defer(on_fulfilled,this.result);
			return snow.api.Promise.resolve(this.result);
		case 2:
			snow.api.Promises.defer(on_rejected,this.result);
			return snow.api.Promise.reject(this.result);
		}
	}
	,error: function(on_rejected) {
		var _g = this.state;
		switch(_g) {
		case 0:
			this.add_reject(on_rejected);
			return this.new_linked_resolve_empty();
		case 1:
			return snow.api.Promise.resolve(this.result);
		case 2:
			snow.api.Promises.defer(on_rejected,this.result);
			return snow.api.Promise.reject(this.result);
		}
	}
	,toString: function() {
		return "Promise { state:" + this.state_string() + ", result:" + Std.string(this.result) + " }";
	}
	,add_settle: function(f) {
		if(this.state == 0) this.settle_reactions.push(f); else snow.api.Promises.defer(f,this.result);
	}
	,new_linked_promise: function() {
		var _g = this;
		return new snow.api.Promise(function(f,r) {
			_g.add_settle(function(_) {
				if(_g.state == 1) f(_g.result); else r(_g.result);
			});
		});
	}
	,new_linked_resolve: function() {
		var _g = this;
		return new snow.api.Promise(function(f,r) {
			_g.add_settle(function(val) {
				f(val);
			});
		});
	}
	,new_linked_reject: function() {
		var _g = this;
		return new snow.api.Promise(function(f,r) {
			_g.add_settle(function(val) {
				r(val);
			});
		});
	}
	,new_linked_resolve_empty: function() {
		var _g = this;
		return new snow.api.Promise(function(f,r) {
			_g.add_settle(function(_) {
				f();
			});
		});
	}
	,new_linked_reject_empty: function() {
		var _g = this;
		return new snow.api.Promise(function(f,r) {
			_g.add_settle(function(_) {
				r();
			});
		});
	}
	,add_fulfill: function(f) {
		if(f != null) this.fulfill_reactions.push(f);
	}
	,add_reject: function(f) {
		if(f != null) {
			this.was_caught = true;
			this.reject_reactions.push(f);
		}
	}
	,onfulfill: function(val) {
		this.state = 1;
		this.result = val;
		while(this.fulfill_reactions.length > 0) {
			var fn = this.fulfill_reactions.shift();
			fn(this.result);
		}
		this.onsettle();
	}
	,onreject: function(reason) {
		this.state = 2;
		this.result = reason;
		while(this.reject_reactions.length > 0) {
			var fn = this.reject_reactions.shift();
			fn(this.result);
		}
		this.onsettle();
	}
	,onsettle: function() {
		while(this.settle_reactions.length > 0) {
			var fn = this.settle_reactions.shift();
			fn(this.result);
		}
	}
	,onexception: function(err) {
		var _g = this;
		this.add_settle(function(_) {
			if(!_g.was_caught) {
				if(_g.state == 2) {
					throw snow.api.PromiseError.UnhandledPromiseRejection(_g.toString());
					return;
				}
			}
		});
		if(this.state == 0) this.onreject(err);
	}
	,state_string: function() {
		var _g = this.state;
		switch(_g) {
		case 0:
			return "pending";
		case 1:
			return "fulfilled";
		case 2:
			return "rejected";
		}
	}
	,__class__: snow.api.Promise
};
snow.api.Promises = function() { };
$hxClasses["snow.api.Promises"] = snow.api.Promises;
snow.api.Promises.__name__ = ["snow","api","Promises"];
snow.api.Promises.step = function() {
	snow.api.Promises.next();
	while(snow.api.Promises.defers.length > 0) {
		var defer = snow.api.Promises.defers.shift();
		defer.f(defer.a);
	}
};
snow.api.Promises.next = function() {
	if(snow.api.Promises.calls.length > 0) (snow.api.Promises.calls.shift())();
};
snow.api.Promises.defer = function(f,a) {
	if(f == null) return;
	snow.api.Promises.defers.push({ f : f, a : a});
};
snow.api.Promises.queue = function(f) {
	if(f == null) return;
	snow.api.Promises.calls.push(f);
};
snow.api.PromiseError = $hxClasses["snow.api.PromiseError"] = { __ename__ : ["snow","api","PromiseError"], __constructs__ : ["UnhandledPromiseRejection"] };
snow.api.PromiseError.UnhandledPromiseRejection = function(err) { var $x = ["UnhandledPromiseRejection",0,err]; $x.__enum__ = snow.api.PromiseError; $x.toString = $estr; return $x; };
snow.api._Promise = {};
snow.api._Promise.PromiseState_Impl_ = function() { };
$hxClasses["snow.api._Promise.PromiseState_Impl_"] = snow.api._Promise.PromiseState_Impl_;
snow.api._Promise.PromiseState_Impl_.__name__ = ["snow","api","_Promise","PromiseState_Impl_"];
snow.api.Timer = function(_time) {
	this.time = _time;
	snow.api.Timer.running_timers.push(this);
	this.fire_at = snow.Snow.core.timestamp() + this.time;
	this.running = true;
};
$hxClasses["snow.api.Timer"] = snow.api.Timer;
snow.api.Timer.__name__ = ["snow","api","Timer"];
snow.api.Timer.measure = function(f,pos) {
	var t0 = snow.Snow.core.timestamp();
	var r = f();
	haxe.Log.trace(snow.Snow.core.timestamp() - t0 + "s",pos);
	return r;
};
snow.api.Timer.update = function() {
	var now = snow.Snow.core.timestamp();
	var _g = 0;
	var _g1 = snow.api.Timer.running_timers;
	while(_g < _g1.length) {
		var timer = _g1[_g];
		++_g;
		if(timer.running) {
			if(timer.fire_at < now) {
				timer.fire_at += timer.time;
				timer.run();
			}
		}
	}
};
snow.api.Timer.delay = function(_time,_f) {
	var t = new snow.api.Timer(_time);
	t.run = function() {
		t.stop();
		_f();
	};
	return t;
};
snow.api.Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.running) {
			this.running = false;
			HxOverrides.remove(snow.api.Timer.running_timers,this);
		}
	}
	,__class__: snow.api.Timer
};
snow.api.buffers = {};
snow.api.buffers._Float32Array = {};
snow.api.buffers._Float32Array.Float32Array_Impl_ = function() { };
$hxClasses["snow.api.buffers._Float32Array.Float32Array_Impl_"] = snow.api.buffers._Float32Array.Float32Array_Impl_;
snow.api.buffers._Float32Array.Float32Array_Impl_.__name__ = ["snow","api","buffers","_Float32Array","Float32Array_Impl_"];
snow.api.buffers._Float32Array.Float32Array_Impl_.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
snow.api.buffers._Float32Array.Float32Array_Impl_.__get = function(this1,idx) {
	return this1[idx];
};
snow.api.buffers._Float32Array.Float32Array_Impl_.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) byteOffset = 0;
	if(byteOffset == null) return new Float32Array(bytes.b);
	if(len == null) return new Float32Array(bytes.b,byteOffset);
	return new Float32Array(bytes.b,byteOffset,len);
};
snow.api.buffers._Float32Array.Float32Array_Impl_.toBytes = function(this1) {
	return new haxe.io.Bytes(this1.byteLength,new Uint8Array(this1.buffer));
};
snow.api.buffers._Float32Array.Float32Array_Impl_.toString = function(this1) {
	return "Float32Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]";
};
snow.api.buffers._Int32Array = {};
snow.api.buffers._Int32Array.Int32Array_Impl_ = function() { };
$hxClasses["snow.api.buffers._Int32Array.Int32Array_Impl_"] = snow.api.buffers._Int32Array.Int32Array_Impl_;
snow.api.buffers._Int32Array.Int32Array_Impl_.__name__ = ["snow","api","buffers","_Int32Array","Int32Array_Impl_"];
snow.api.buffers._Int32Array.Int32Array_Impl_.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
snow.api.buffers._Int32Array.Int32Array_Impl_.__get = function(this1,idx) {
	return this1[idx];
};
snow.api.buffers._Int32Array.Int32Array_Impl_.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) byteOffset = 0;
	if(byteOffset == null) return new Int32Array(bytes.b);
	if(len == null) return new Int32Array(bytes.b,byteOffset);
	return new Int32Array(bytes.b,byteOffset,len);
};
snow.api.buffers._Int32Array.Int32Array_Impl_.toBytes = function(this1) {
	return new haxe.io.Bytes(this1.byteLength,new Uint8Array(this1.buffer));
};
snow.api.buffers._Int32Array.Int32Array_Impl_.toString = function(this1) {
	return "Int32Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]";
};
snow.api.buffers._Uint8Array = {};
snow.api.buffers._Uint8Array.Uint8Array_Impl_ = function() { };
$hxClasses["snow.api.buffers._Uint8Array.Uint8Array_Impl_"] = snow.api.buffers._Uint8Array.Uint8Array_Impl_;
snow.api.buffers._Uint8Array.Uint8Array_Impl_.__name__ = ["snow","api","buffers","_Uint8Array","Uint8Array_Impl_"];
snow.api.buffers._Uint8Array.Uint8Array_Impl_.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
snow.api.buffers._Uint8Array.Uint8Array_Impl_.__get = function(this1,idx) {
	return this1[idx];
};
snow.api.buffers._Uint8Array.Uint8Array_Impl_.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) return new Uint8Array(bytes.b);
	if(len == null) return new Uint8Array(bytes.b,byteOffset);
	return new Uint8Array(bytes.b,byteOffset,len);
};
snow.api.buffers._Uint8Array.Uint8Array_Impl_.toBytes = function(this1) {
	return new haxe.io.Bytes(this1.byteLength,new Uint8Array(this1.buffer));
};
snow.api.buffers._Uint8Array.Uint8Array_Impl_.toString = function(this1) {
	return "Uint8Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]";
};
snow.core = {};
snow.core.web = {};
snow.core.web.Core = function(_app) {
	this._time_now = 0.0;
	this._lf_timestamp = 0.016;
	this.start_timestamp = 0.0;
	this.app = _app;
	this.start_timestamp = this.timestamp();
};
$hxClasses["snow.core.web.Core"] = snow.core.web.Core;
snow.core.web.Core.__name__ = ["snow","core","web","Core"];
snow.core.web.Core.prototype = {
	init: function(_event_handler) {
		this.app.on_event({ type : 1});
		this.app.on_event({ type : 2});
		if(this.app.snow_config.has_loop) this.request_update();
	}
	,shutdown: function() {
	}
	,timestamp: function() {
		var now;
		if(window.performance != null) now = window.performance.now() / 1000.0; else now = haxe.Timer.stamp();
		return now - this.start_timestamp;
	}
	,request_update: function() {
		var _g = this;
		if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) window.requestAnimationFrame($bind(this,this.snow_core_loop)); else {
			haxe.Log.trace("     i / core / " + ("warning : requestAnimationFrame not found, falling back to render_rate! render_rate:" + this.app.host.render_rate),{ fileName : "Core.hx", lineNumber : 76, className : "snow.core.web.Core", methodName : "request_update"});
			window.setTimeout(function() {
				var _now = _g.timestamp();
				_g._time_now += _now - _g._lf_timestamp;
				_g.snow_core_loop(_g._time_now * 1000.0);
				_g._lf_timestamp = _now;
			},this.app.host.render_rate * 1000.0 | 0);
		}
	}
	,snow_core_loop: function(_t) {
		if(_t == null) _t = 0.016;
		this.update();
		this.app.on_event({ type : 3});
		this.request_update();
		return true;
	}
	,update: function() {
	}
	,__class__: snow.core.web.Core
};
snow.modules = {};
snow.modules.interfaces = {};
snow.modules.interfaces.Assets = function() { };
$hxClasses["snow.modules.interfaces.Assets"] = snow.modules.interfaces.Assets;
snow.modules.interfaces.Assets.__name__ = ["snow","modules","interfaces","Assets"];
snow.modules.interfaces.Assets.prototype = {
	__class__: snow.modules.interfaces.Assets
};
snow.core.web.assets = {};
snow.core.web.assets.Assets = function(_system) {
	this.system = _system;
};
$hxClasses["snow.core.web.assets.Assets"] = snow.core.web.assets.Assets;
snow.core.web.assets.Assets.__name__ = ["snow","core","web","assets","Assets"];
snow.core.web.assets.Assets.__interfaces__ = [snow.modules.interfaces.Assets];
snow.core.web.assets.Assets.prototype = {
	init: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(event) {
	}
	,image_load_info: function(_id,_components) {
		if(_components == null) _components = 4;
		return this.system.app.io.data_flow(_id,snow.system.assets.AssetImage.processor);
	}
	,image_info_from_element: function(_id,_elem) {
		var width_pot = this.nearest_power_of_two(_elem.width);
		var height_pot = this.nearest_power_of_two(_elem.height);
		var image_bytes = this.POT_bytes_from_element(_elem.width,_elem.height,width_pot,height_pot,_elem);
		var info = { id : _id, bpp : 4, width : _elem.width, height : _elem.height, width_actual : width_pot, height_actual : height_pot, bpp_source : 4, pixels : image_bytes};
		image_bytes = null;
		return info;
	}
	,image_info_from_pixels: function(_id,_width,_height,_pixels) {
		var width_pot = this.nearest_power_of_two(_width);
		var height_pot = this.nearest_power_of_two(_height);
		var image_bytes = this.POT_bytes_from_pixels(_width,_height,width_pot,height_pot,_pixels);
		var info = { id : _id, bpp : 4, width : _width, height : _height, width_actual : width_pot, height_actual : height_pot, bpp_source : 4, pixels : image_bytes};
		image_bytes = null;
		return info;
	}
	,image_info_from_bytes: function(_id,_bytes,_components) {
		if(_components == null) _components = 4;
		var _g = this;
		var ext = haxe.io.Path.extension(_id);
		return new snow.api.Promise(function(resolve,reject) {
			var str = "";
			var i = 0;
			var len = _bytes.length;
			while(i < len) str += String.fromCharCode((function($this) {
				var $r;
				var a;
				{
					var idx = i++;
					a = _bytes[idx];
				}
				$r = a & 255;
				return $r;
			}(this)));
			var b64 = window.btoa(str);
			var src = "data:image/" + ext + ";base64," + b64;
			var _img = new Image();
			_img.onload = function(_) {
				var info = _g.image_info_from_element(_id,_img);
				resolve(info);
			};
			_img.onerror = function(e) {
				reject(snow.types.Error.error("failed to load image from bytes, on error: " + e));
			};
			_img.src = src;
		});
	}
	,POT_bytes_from_pixels: function(_width,_height,_width_pot,_height_pot,_source) {
		var tmp_canvas;
		var _this = window.document;
		tmp_canvas = _this.createElement("canvas");
		tmp_canvas.width = _width_pot;
		tmp_canvas.height = _height_pot;
		var tmp_context = tmp_canvas.getContext("2d");
		tmp_context.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
		var image_bytes = null;
		var _pixels = new Uint8ClampedArray(_source.buffer);
		var _imgdata = tmp_context.createImageData(_width,_height);
		_imgdata.data.set(_pixels);
		try {
			tmp_context.putImageData(_imgdata,0,0);
			image_bytes = tmp_context.getImageData(0,0,tmp_canvas.width,tmp_canvas.height);
		} catch( e ) {
			var tips = "- textures served from file:/// throw security errors\n";
			tips += "- textures served over http:// work for cross origin byte requests";
			haxe.Log.trace("   i / assets / " + tips,{ fileName : "Assets.hx", lineNumber : 197, className : "snow.core.web.assets.Assets", methodName : "POT_bytes_from_pixels"});
			throw e;
		}
		tmp_canvas = null;
		tmp_context = null;
		_imgdata = null;
		var view = image_bytes.data;
		var len = null;
		var this1;
		if(view != null) this1 = new Uint8Array(view); else this1 = null;
		return this1;
	}
	,POT_bytes_from_element: function(_width,_height,_width_pot,_height_pot,_source) {
		var tmp_canvas;
		var _this = window.document;
		tmp_canvas = _this.createElement("canvas");
		tmp_canvas.width = _width_pot;
		tmp_canvas.height = _height_pot;
		var tmp_context = tmp_canvas.getContext("2d");
		tmp_context.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
		tmp_context.drawImage(_source,0,0,_width,_height);
		var image_bytes = null;
		try {
			image_bytes = tmp_context.getImageData(0,0,tmp_canvas.width,tmp_canvas.height);
		} catch( e ) {
			var tips = "- textures served from file:/// throw security errors\n";
			tips += "- textures served over http:// work for cross origin byte requests";
			haxe.Log.trace("   i / assets / " + tips,{ fileName : "Assets.hx", lineNumber : 233, className : "snow.core.web.assets.Assets", methodName : "POT_bytes_from_element"});
			throw e;
		}
		tmp_canvas = null;
		tmp_context = null;
		var view = image_bytes.data;
		var len = null;
		var this1;
		if(view != null) this1 = new Uint8Array(view); else this1 = null;
		return this1;
	}
	,nearest_power_of_two: function(_value) {
		_value--;
		_value |= _value >> 1;
		_value |= _value >> 2;
		_value |= _value >> 4;
		_value |= _value >> 8;
		_value |= _value >> 16;
		_value++;
		return _value;
	}
	,__class__: snow.core.web.assets.Assets
};
snow.core.web.input = {};
snow.core.web.input.DOMKeys = function() { };
$hxClasses["snow.core.web.input.DOMKeys"] = snow.core.web.input.DOMKeys;
snow.core.web.input.DOMKeys.__name__ = ["snow","core","web","input","DOMKeys"];
snow.core.web.input.DOMKeys.dom_key_to_keycode = function(_keycode) {
	switch(_keycode) {
	case 16:
		return snow.system.input.Keycodes.lshift;
	case 17:
		return snow.system.input.Keycodes.lctrl;
	case 18:
		return snow.system.input.Keycodes.lalt;
	case 20:
		return snow.system.input.Keycodes.capslock;
	case 33:
		return snow.system.input.Keycodes.pageup;
	case 34:
		return snow.system.input.Keycodes.pagedown;
	case 35:
		return snow.system.input.Keycodes.end;
	case 36:
		return snow.system.input.Keycodes.home;
	case 37:
		return snow.system.input.Keycodes.left;
	case 38:
		return snow.system.input.Keycodes.up;
	case 39:
		return snow.system.input.Keycodes.right;
	case 40:
		return snow.system.input.Keycodes.down;
	case 44:
		return snow.system.input.Keycodes.printscreen;
	case 45:
		return snow.system.input.Keycodes.insert;
	case 46:
		return snow.system.input.Keycodes["delete"];
	case 91:
		return snow.system.input.Keycodes.lmeta;
	case 93:
		return snow.system.input.Keycodes.rmeta;
	case 224:
		return snow.system.input.Keycodes.lmeta;
	case 96:
		return snow.system.input.Keycodes.kp_0;
	case 97:
		return snow.system.input.Keycodes.kp_1;
	case 98:
		return snow.system.input.Keycodes.kp_2;
	case 99:
		return snow.system.input.Keycodes.kp_3;
	case 100:
		return snow.system.input.Keycodes.kp_4;
	case 101:
		return snow.system.input.Keycodes.kp_5;
	case 102:
		return snow.system.input.Keycodes.kp_6;
	case 103:
		return snow.system.input.Keycodes.kp_7;
	case 104:
		return snow.system.input.Keycodes.kp_8;
	case 105:
		return snow.system.input.Keycodes.kp_9;
	case 106:
		return snow.system.input.Keycodes.kp_multiply;
	case 107:
		return snow.system.input.Keycodes.kp_plus;
	case 109:
		return snow.system.input.Keycodes.kp_minus;
	case 110:
		return snow.system.input.Keycodes.kp_decimal;
	case 111:
		return snow.system.input.Keycodes.kp_divide;
	case 144:
		return snow.system.input.Keycodes.numlockclear;
	case 112:
		return snow.system.input.Keycodes.f1;
	case 113:
		return snow.system.input.Keycodes.f2;
	case 114:
		return snow.system.input.Keycodes.f3;
	case 115:
		return snow.system.input.Keycodes.f4;
	case 116:
		return snow.system.input.Keycodes.f5;
	case 117:
		return snow.system.input.Keycodes.f6;
	case 118:
		return snow.system.input.Keycodes.f7;
	case 119:
		return snow.system.input.Keycodes.f8;
	case 120:
		return snow.system.input.Keycodes.f9;
	case 121:
		return snow.system.input.Keycodes.f10;
	case 122:
		return snow.system.input.Keycodes.f11;
	case 123:
		return snow.system.input.Keycodes.f12;
	case 124:
		return snow.system.input.Keycodes.f13;
	case 125:
		return snow.system.input.Keycodes.f14;
	case 126:
		return snow.system.input.Keycodes.f15;
	case 127:
		return snow.system.input.Keycodes.f16;
	case 128:
		return snow.system.input.Keycodes.f17;
	case 129:
		return snow.system.input.Keycodes.f18;
	case 130:
		return snow.system.input.Keycodes.f19;
	case 131:
		return snow.system.input.Keycodes.f20;
	case 132:
		return snow.system.input.Keycodes.f21;
	case 133:
		return snow.system.input.Keycodes.f22;
	case 134:
		return snow.system.input.Keycodes.f23;
	case 135:
		return snow.system.input.Keycodes.f24;
	case 160:
		return snow.system.input.Keycodes.caret;
	case 161:
		return snow.system.input.Keycodes.exclaim;
	case 162:
		return snow.system.input.Keycodes.quotedbl;
	case 163:
		return snow.system.input.Keycodes.hash;
	case 164:
		return snow.system.input.Keycodes.dollar;
	case 165:
		return snow.system.input.Keycodes.percent;
	case 166:
		return snow.system.input.Keycodes.ampersand;
	case 167:
		return snow.system.input.Keycodes.underscore;
	case 168:
		return snow.system.input.Keycodes.leftparen;
	case 169:
		return snow.system.input.Keycodes.rightparen;
	case 170:
		return snow.system.input.Keycodes.asterisk;
	case 171:
		return snow.system.input.Keycodes.plus;
	case 172:
		return snow.system.input.Keycodes.backslash;
	case 173:
		return snow.system.input.Keycodes.minus;
	case 174:
		return snow.system.input.Keycodes.leftbracket;
	case 175:
		return snow.system.input.Keycodes.rightbracket;
	case 176:
		return snow.system.input.Keycodes.backquote;
	case 181:
		return snow.system.input.Keycodes.audiomute;
	case 182:
		return snow.system.input.Keycodes.volumedown;
	case 183:
		return snow.system.input.Keycodes.volumeup;
	case 188:
		return snow.system.input.Keycodes.comma;
	case 190:
		return snow.system.input.Keycodes.period;
	case 191:
		return snow.system.input.Keycodes.slash;
	case 192:
		return snow.system.input.Keycodes.backquote;
	case 219:
		return snow.system.input.Keycodes.leftbracket;
	case 221:
		return snow.system.input.Keycodes.rightbracket;
	case 220:
		return snow.system.input.Keycodes.backslash;
	case 222:
		return snow.system.input.Keycodes.quote;
	}
	return _keycode;
};
snow.modules.interfaces.Input = function() { };
$hxClasses["snow.modules.interfaces.Input"] = snow.modules.interfaces.Input;
snow.modules.interfaces.Input.__name__ = ["snow","modules","interfaces","Input"];
snow.modules.interfaces.Input.prototype = {
	__class__: snow.modules.interfaces.Input
};
snow.system = {};
snow.system.input = {};
snow.system.input.Scancodes = function() { };
$hxClasses["snow.system.input.Scancodes"] = snow.system.input.Scancodes;
snow.system.input.Scancodes.__name__ = ["snow","system","input","Scancodes"];
snow.system.input.Scancodes.$name = function(scancode) {
	var res = null;
	if(scancode >= 0 && scancode < snow.system.input.Scancodes.scancode_names.length) res = snow.system.input.Scancodes.scancode_names[scancode];
	if(res != null) return res; else return "";
};
snow.system.input.Keycodes = function() { };
$hxClasses["snow.system.input.Keycodes"] = snow.system.input.Keycodes;
snow.system.input.Keycodes.__name__ = ["snow","system","input","Keycodes"];
snow.system.input.Keycodes.from_scan = function(scancode) {
	return scancode | snow.system.input.Scancodes.MASK;
};
snow.system.input.Keycodes.to_scan = function(keycode) {
	if((keycode & snow.system.input.Scancodes.MASK) != 0) return keycode & ~snow.system.input.Scancodes.MASK;
	switch(keycode) {
	case snow.system.input.Keycodes.enter:
		return snow.system.input.Scancodes.enter;
	case snow.system.input.Keycodes.escape:
		return snow.system.input.Scancodes.escape;
	case snow.system.input.Keycodes.backspace:
		return snow.system.input.Scancodes.backspace;
	case snow.system.input.Keycodes.tab:
		return snow.system.input.Scancodes.tab;
	case snow.system.input.Keycodes.space:
		return snow.system.input.Scancodes.space;
	case snow.system.input.Keycodes.slash:
		return snow.system.input.Scancodes.slash;
	case snow.system.input.Keycodes.key_0:
		return snow.system.input.Scancodes.key_0;
	case snow.system.input.Keycodes.key_1:
		return snow.system.input.Scancodes.key_1;
	case snow.system.input.Keycodes.key_2:
		return snow.system.input.Scancodes.key_2;
	case snow.system.input.Keycodes.key_3:
		return snow.system.input.Scancodes.key_3;
	case snow.system.input.Keycodes.key_4:
		return snow.system.input.Scancodes.key_4;
	case snow.system.input.Keycodes.key_5:
		return snow.system.input.Scancodes.key_5;
	case snow.system.input.Keycodes.key_6:
		return snow.system.input.Scancodes.key_6;
	case snow.system.input.Keycodes.key_7:
		return snow.system.input.Scancodes.key_7;
	case snow.system.input.Keycodes.key_8:
		return snow.system.input.Scancodes.key_8;
	case snow.system.input.Keycodes.key_9:
		return snow.system.input.Scancodes.key_9;
	case snow.system.input.Keycodes.semicolon:
		return snow.system.input.Scancodes.semicolon;
	case snow.system.input.Keycodes.equals:
		return snow.system.input.Scancodes.equals;
	case snow.system.input.Keycodes.leftbracket:
		return snow.system.input.Scancodes.leftbracket;
	case snow.system.input.Keycodes.backslash:
		return snow.system.input.Scancodes.backslash;
	case snow.system.input.Keycodes.rightbracket:
		return snow.system.input.Scancodes.rightbracket;
	case snow.system.input.Keycodes.backquote:
		return snow.system.input.Scancodes.grave;
	case snow.system.input.Keycodes.key_a:
		return snow.system.input.Scancodes.key_a;
	case snow.system.input.Keycodes.key_b:
		return snow.system.input.Scancodes.key_b;
	case snow.system.input.Keycodes.key_c:
		return snow.system.input.Scancodes.key_c;
	case snow.system.input.Keycodes.key_d:
		return snow.system.input.Scancodes.key_d;
	case snow.system.input.Keycodes.key_e:
		return snow.system.input.Scancodes.key_e;
	case snow.system.input.Keycodes.key_f:
		return snow.system.input.Scancodes.key_f;
	case snow.system.input.Keycodes.key_g:
		return snow.system.input.Scancodes.key_g;
	case snow.system.input.Keycodes.key_h:
		return snow.system.input.Scancodes.key_h;
	case snow.system.input.Keycodes.key_i:
		return snow.system.input.Scancodes.key_i;
	case snow.system.input.Keycodes.key_j:
		return snow.system.input.Scancodes.key_j;
	case snow.system.input.Keycodes.key_k:
		return snow.system.input.Scancodes.key_k;
	case snow.system.input.Keycodes.key_l:
		return snow.system.input.Scancodes.key_l;
	case snow.system.input.Keycodes.key_m:
		return snow.system.input.Scancodes.key_m;
	case snow.system.input.Keycodes.key_n:
		return snow.system.input.Scancodes.key_n;
	case snow.system.input.Keycodes.key_o:
		return snow.system.input.Scancodes.key_o;
	case snow.system.input.Keycodes.key_p:
		return snow.system.input.Scancodes.key_p;
	case snow.system.input.Keycodes.key_q:
		return snow.system.input.Scancodes.key_q;
	case snow.system.input.Keycodes.key_r:
		return snow.system.input.Scancodes.key_r;
	case snow.system.input.Keycodes.key_s:
		return snow.system.input.Scancodes.key_s;
	case snow.system.input.Keycodes.key_t:
		return snow.system.input.Scancodes.key_t;
	case snow.system.input.Keycodes.key_u:
		return snow.system.input.Scancodes.key_u;
	case snow.system.input.Keycodes.key_v:
		return snow.system.input.Scancodes.key_v;
	case snow.system.input.Keycodes.key_w:
		return snow.system.input.Scancodes.key_w;
	case snow.system.input.Keycodes.key_x:
		return snow.system.input.Scancodes.key_x;
	case snow.system.input.Keycodes.key_y:
		return snow.system.input.Scancodes.key_y;
	case snow.system.input.Keycodes.key_z:
		return snow.system.input.Scancodes.key_z;
	}
	return snow.system.input.Scancodes.unknown;
};
snow.system.input.Keycodes.$name = function(keycode) {
	if((keycode & snow.system.input.Scancodes.MASK) != 0) return snow.system.input.Scancodes.$name(keycode & ~snow.system.input.Scancodes.MASK);
	switch(keycode) {
	case snow.system.input.Keycodes.enter:
		return snow.system.input.Scancodes.$name(snow.system.input.Scancodes.enter);
	case snow.system.input.Keycodes.escape:
		return snow.system.input.Scancodes.$name(snow.system.input.Scancodes.escape);
	case snow.system.input.Keycodes.backspace:
		return snow.system.input.Scancodes.$name(snow.system.input.Scancodes.backspace);
	case snow.system.input.Keycodes.tab:
		return snow.system.input.Scancodes.$name(snow.system.input.Scancodes.tab);
	case snow.system.input.Keycodes.space:
		return snow.system.input.Scancodes.$name(snow.system.input.Scancodes.space);
	case snow.system.input.Keycodes["delete"]:
		return snow.system.input.Scancodes.$name(snow.system.input.Scancodes["delete"]);
	default:
		var decoder = new haxe.Utf8();
		decoder.__b += String.fromCharCode(keycode);
		return decoder.__b;
	}
};
snow.core.web.input.Input = function(_system) {
	this.gamepads_supported = false;
	this.system = _system;
};
$hxClasses["snow.core.web.input.Input"] = snow.core.web.input.Input;
snow.core.web.input.Input.__name__ = ["snow","core","web","input","Input"];
snow.core.web.input.Input.__interfaces__ = [snow.modules.interfaces.Input];
snow.core.web.input.Input.prototype = {
	init: function() {
		window.document.addEventListener("keypress",$bind(this,this.on_keypress));
		window.document.addEventListener("keydown",$bind(this,this.on_keydown));
		window.document.addEventListener("keyup",$bind(this,this.on_keyup));
		this.active_gamepads = new haxe.ds.IntMap();
		this.gamepads_supported = this.get_gamepad_list() != null;
		haxe.Log.trace("    i / input / " + ("Gamepads supported: " + Std.string(this.gamepads_supported)),{ fileName : "Input.hx", lineNumber : 42, className : "snow.core.web.input.Input", methodName : "init"});
	}
	,update: function() {
		if(this.gamepads_supported) this.poll_gamepads();
	}
	,destroy: function() {
	}
	,listen: function(window) {
		window.handle.addEventListener("contextmenu",$bind(this,this.on_contextmenu));
		window.handle.addEventListener("mousedown",$bind(this,this.on_mousedown));
		window.handle.addEventListener("mouseup",$bind(this,this.on_mouseup));
		window.handle.addEventListener("mousemove",$bind(this,this.on_mousemove));
		window.handle.addEventListener("mousewheel",$bind(this,this.on_mousewheel));
		window.handle.addEventListener("wheel",$bind(this,this.on_mousewheel));
		window.handle.addEventListener("touchstart",$bind(this,this.on_touchdown));
		window.handle.addEventListener("touchend",$bind(this,this.on_touchup));
		window.handle.addEventListener("touchmove",$bind(this,this.on_touchmove));
	}
	,unlisten: function(window) {
	}
	,on_event: function(_event) {
	}
	,text_input_start: function() {
	}
	,text_input_stop: function() {
	}
	,text_input_rect: function(x,y,w,h) {
	}
	,gamepad_add: function(id) {
	}
	,gamepad_remove: function(id) {
	}
	,poll_gamepads: function() {
		if(!this.gamepads_supported) return;
		var list = this.get_gamepad_list();
		if(list != null) {
			var _g1 = 0;
			var _g = list.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(list[i] != null) this.handle_gamepad(list[i]); else {
					var _gamepad = this.active_gamepads.get(i);
					if(_gamepad != null) this.system.dispatch_gamepad_device_event(_gamepad.index,2,snow.Snow.core.timestamp());
					this.active_gamepads.remove(i);
				}
			}
		}
	}
	,handle_gamepad: function(_gamepad) {
		if(_gamepad == null) return;
		if(!(function($this) {
			var $r;
			var key = _gamepad.index;
			$r = $this.active_gamepads.exists(key);
			return $r;
		}(this))) {
			var _new_gamepad = { id : _gamepad.id, index : _gamepad.index, axes : [], buttons : [], timestamp : snow.Snow.core.timestamp()};
			var axes = _gamepad.axes;
			var _g = 0;
			while(_g < axes.length) {
				var value = axes[_g];
				++_g;
				_new_gamepad.axes.push(value);
			}
			var _button_list = _gamepad.buttons;
			var _g1 = 0;
			while(_g1 < _button_list.length) {
				var _button = _button_list[_g1];
				++_g1;
				_new_gamepad.buttons.push({ pressed : false, value : 0});
			}
			this.active_gamepads.set(_new_gamepad.index,_new_gamepad);
			this.system.dispatch_gamepad_device_event(_new_gamepad.index,1,_new_gamepad.timestamp);
		} else {
			var gamepad;
			var key1 = _gamepad.index;
			gamepad = this.active_gamepads.get(key1);
			if(gamepad.id != _gamepad.id) gamepad.id = _gamepad.id;
			var axes_changed = [];
			var buttons_changed = [];
			var last_axes = gamepad.axes;
			var last_buttons = gamepad.buttons;
			var new_axes = _gamepad.axes;
			var new_buttons = _gamepad.buttons;
			var axis_index = 0;
			var _g2 = 0;
			while(_g2 < new_axes.length) {
				var axis = new_axes[_g2];
				++_g2;
				if(axis != last_axes[axis_index]) {
					axes_changed.push(axis_index);
					gamepad.axes[axis_index] = axis;
				}
				axis_index++;
			}
			var button_index = 0;
			var _g3 = 0;
			while(_g3 < new_buttons.length) {
				var button = new_buttons[_g3];
				++_g3;
				if(button.value != last_buttons[button_index].value) {
					buttons_changed.push(button_index);
					gamepad.buttons[button_index].pressed = button.pressed;
					gamepad.buttons[button_index].value = button.value;
				}
				button_index++;
			}
			var _g4 = 0;
			while(_g4 < axes_changed.length) {
				var index = axes_changed[_g4];
				++_g4;
				this.system.dispatch_gamepad_axis_event(gamepad.index,index,new_axes[index],gamepad.timestamp);
			}
			var _g5 = 0;
			while(_g5 < buttons_changed.length) {
				var index1 = buttons_changed[_g5];
				++_g5;
				if(new_buttons[index1].pressed == true) this.system.dispatch_gamepad_button_down_event(gamepad.index,index1,new_buttons[index1].value,gamepad.timestamp); else this.system.dispatch_gamepad_button_up_event(gamepad.index,index1,new_buttons[index1].value,gamepad.timestamp);
			}
		}
	}
	,fail_gamepads: function() {
		this.gamepads_supported = false;
		haxe.Log.trace("    i / input / " + "Gamepads are not supported in this browser :(",{ fileName : "Input.hx", lineNumber : 262, className : "snow.core.web.input.Input", methodName : "fail_gamepads"});
	}
	,get_gamepad_list: function() {
		var modernizr = window.Modernizr;
		if(modernizr != null) {
			if(modernizr.gamepads == true) {
				if(($_=window.navigator,$bind($_,$_.getGamepads)) != null) return window.navigator.getGamepads();
				if(window.navigator.webkitGetGamepads != null) return window.navigator.webkitGetGamepads();
				this.fail_gamepads();
			} else this.fail_gamepads();
		}
		return null;
	}
	,on_mousedown: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		this.system.dispatch_mouse_down_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_mouse_event.button + 1,_mouse_event.timeStamp,_window.id);
	}
	,on_mouseup: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		this.system.dispatch_mouse_up_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_mouse_event.button + 1,_mouse_event.timeStamp,_window.id);
	}
	,on_mousemove: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		var _movement_x = _mouse_event.movementX;
		var _movement_y = _mouse_event.movementY;
		if(_mouse_event.webkitMovementX != null) {
			_movement_x = _mouse_event.webkitMovementX;
			_movement_y = _mouse_event.webkitMovementY;
		} else if(_mouse_event.mozMovementX != null) {
			_movement_x = _mouse_event.mozMovementX;
			_movement_y = _mouse_event.mozMovementY;
		}
		this.system.dispatch_mouse_move_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_movement_x,_movement_y,_mouse_event.timeStamp,_window.id);
	}
	,on_mousewheel: function(_wheel_event) {
		if(this.system.app.config.web.prevent_default_mouse_wheel) _wheel_event.preventDefault();
		var _window = this.system.app.windowing.window_from_handle(_wheel_event.target);
		var _x = 0;
		var _y = 0;
		if(_wheel_event.deltaY != null) _y = _wheel_event.deltaY; else if(_wheel_event.wheelDeltaY != null) _y = -_wheel_event.wheelDeltaY / 3 | 0;
		if(_wheel_event.deltaX != null) _x = _wheel_event.deltaX; else if(_wheel_event.wheelDeltaX != null) _x = -_wheel_event.wheelDeltaX / 3 | 0;
		this.system.dispatch_mouse_wheel_event(Math.round(_x / 16),Math.round(_y / 16),_wheel_event.timeStamp,_window.id);
	}
	,on_contextmenu: function(_event) {
		if(this.system.app.config.web.no_context_menu) _event.preventDefault();
	}
	,on_keypress: function(_key_event) {
		if(_key_event.which != 0 && HxOverrides.indexOf(snow.core.web.input.Input._keypress_blacklist,_key_event.keyCode,0) == -1) {
			var _text = String.fromCharCode(_key_event.charCode);
			this.system.dispatch_text_event(_text,0,_text.length,2,_key_event.timeStamp,1);
		}
	}
	,on_keydown: function(_key_event) {
		var _keycode = this.convert_keycode(_key_event.keyCode);
		var _scancode = snow.system.input.Keycodes.to_scan(_keycode);
		var _mod_state = this.mod_state_from_event(_key_event);
		if(HxOverrides.indexOf(this.system.app.config.web.prevent_default_keys,_keycode,0) != -1) _key_event.preventDefault();
		this.system.dispatch_key_down_event(_keycode,_scancode,_key_event.repeat,_mod_state,_key_event.timeStamp,1);
	}
	,on_keyup: function(_key_event) {
		var _keycode = this.convert_keycode(_key_event.keyCode);
		var _scancode = snow.system.input.Keycodes.to_scan(_keycode);
		var _mod_state = this.mod_state_from_event(_key_event);
		if(HxOverrides.indexOf(this.system.app.config.web.prevent_default_keys,_keycode,0) != -1) _key_event.preventDefault();
		this.system.dispatch_key_up_event(_keycode,_scancode,_key_event.repeat,_mod_state,_key_event.timeStamp,1);
	}
	,mod_state_from_event: function(_key_event) {
		var _none = !_key_event.altKey && !_key_event.ctrlKey && !_key_event.metaKey && !_key_event.shiftKey;
		return { none : _none, lshift : _key_event.shiftKey, rshift : _key_event.shiftKey, lctrl : _key_event.ctrlKey, rctrl : _key_event.ctrlKey, lalt : _key_event.altKey, ralt : _key_event.altKey, lmeta : _key_event.metaKey, rmeta : _key_event.metaKey, num : false, caps : false, mode : false, ctrl : _key_event.ctrlKey, shift : _key_event.shiftKey, alt : _key_event.altKey, meta : _key_event.metaKey};
	}
	,convert_keycode: function(dom_keycode) {
		if(dom_keycode >= 65 && dom_keycode <= 90) return dom_keycode + 32;
		return snow.core.web.input.DOMKeys.dom_key_to_keycode(dom_keycode);
	}
	,on_touchdown: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_down_event(_x,_y,touch.identifier,snow.Snow.core.timestamp());
		}
	}
	,on_touchup: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_up_event(_x,_y,touch.identifier,snow.Snow.core.timestamp());
		}
	}
	,on_touchmove: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_move_event(_x,_y,0,0,touch.identifier,snow.Snow.core.timestamp());
		}
	}
	,__class__: snow.core.web.input.Input
};
snow.modules.interfaces.IO = function() { };
$hxClasses["snow.modules.interfaces.IO"] = snow.modules.interfaces.IO;
snow.modules.interfaces.IO.__name__ = ["snow","modules","interfaces","IO"];
snow.modules.interfaces.IO.prototype = {
	__class__: snow.modules.interfaces.IO
};
snow.core.web.io = {};
snow.core.web.io.IO = function(_system) {
	this.system = _system;
};
$hxClasses["snow.core.web.io.IO"] = snow.core.web.io.IO;
snow.core.web.io.IO.__name__ = ["snow","core","web","io","IO"];
snow.core.web.io.IO.__interfaces__ = [snow.modules.interfaces.IO];
snow.core.web.io.IO.prototype = {
	url_open: function(_url) {
		if(_url != null && _url.length > 0) window.open(_url,"_blank");
	}
	,data_load: function(_path,_options) {
		return new snow.api.Promise(function(resolve,reject) {
			var _async = true;
			var _binary = true;
			if(_options != null) {
				if(_options.binary != null) _binary = _options.binary;
			}
			var request = new XMLHttpRequest();
			request.open("GET",_path,_async);
			if(_binary) request.overrideMimeType("text/plain; charset=x-user-defined"); else request.overrideMimeType("text/plain; charset=UTF-8");
			if(_async) request.responseType = "arraybuffer";
			request.onload = function(data) {
				if(request.status == 200) resolve((function($this) {
					var $r;
					var elements = request.response;
					var len = null;
					var this1;
					if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
					$r = this1;
					return $r;
				}(this))); else reject(snow.types.Error.error("request status was " + request.status + " / " + request.statusText));
			};
			request.send();
		});
	}
	,data_save: function(_path,_data,_options) {
		return false;
	}
	,string_save_path: function(_slot) {
		if(_slot == null) _slot = 0;
		var _pref_path = "<localstorage>";
		var _slot_path = this.string_slot_id(_slot);
		var _path = haxe.io.Path.join([_pref_path,_slot_path]);
		return haxe.io.Path.normalize(_path);
	}
	,init: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(_event) {
	}
	,string_slot_id: function(_slot) {
		if(_slot == null) _slot = 0;
		var _parts = this.system.app.snow_config.app_package.split(".");
		var _appname = _parts.pop();
		var _org = _parts.join(".");
		return "" + _org + "/" + _appname + "/" + this.system.string_save_prefix + "." + _slot;
	}
	,string_slot_save: function(_slot,_contents) {
		if(_slot == null) _slot = 0;
		var storage = window.localStorage;
		if(storage == null) {
			haxe.Log.trace("       i / io / " + "localStorage isnt supported in this browser?!",{ fileName : "IO.hx", lineNumber : 114, className : "snow.core.web.io.IO", methodName : "string_slot_save"});
			return false;
		}
		var _id = this.string_slot_id(_slot);
		storage.setItem(_id,_contents);
		return true;
	}
	,string_slot_load: function(_slot) {
		if(_slot == null) _slot = 0;
		var storage = window.localStorage;
		if(storage == null) {
			haxe.Log.trace("       i / io / " + "localStorage isnt supported in this browser?!",{ fileName : "IO.hx", lineNumber : 132, className : "snow.core.web.io.IO", methodName : "string_slot_load"});
			return null;
		}
		var _id = this.string_slot_id(_slot);
		return storage.getItem(_id);
	}
	,string_slot_encode: function(_string) {
		return window.btoa(_string);
	}
	,string_slot_decode: function(_string) {
		return window.atob(_string);
	}
	,__class__: snow.core.web.io.IO
};
snow.modules.interfaces.Windowing = function() { };
$hxClasses["snow.modules.interfaces.Windowing"] = snow.modules.interfaces.Windowing;
snow.modules.interfaces.Windowing.__name__ = ["snow","modules","interfaces","Windowing"];
snow.modules.interfaces.Windowing.prototype = {
	__class__: snow.modules.interfaces.Windowing
};
snow.core.web.window = {};
snow.core.web.window.Windowing = function(_system) {
	this._hidden_event_name = "";
	this._hidden_name = "";
	this._cursor_visible = true;
	this._pre_fs_body_margin = "0";
	this._pre_fs_body_overflow = "0";
	this._pre_fs_height = 0;
	this._pre_fs_width = 0;
	this._pre_fs_s_height = "";
	this._pre_fs_s_width = "";
	this._pre_fs_margin = "0";
	this._pre_fs_padding = "0";
	this.seq_window = 1;
	this.system = _system;
	this.fs_windows = [];
	this.gl_contexts = new haxe.ds.IntMap();
};
$hxClasses["snow.core.web.window.Windowing"] = snow.core.web.window.Windowing;
snow.core.web.window.Windowing.__name__ = ["snow","core","web","window","Windowing"];
snow.core.web.window.Windowing.__interfaces__ = [snow.modules.interfaces.Windowing];
snow.core.web.window.Windowing.prototype = {
	init: function() {
		this.listen_for_visibility();
		this.listen_for_resize();
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(event) {
	}
	,_copy_config: function(_config) {
		return { borderless : _config.borderless, fullscreen : _config.fullscreen, fullscreen_desktop : _config.fullscreen_desktop, height : _config.height, no_input : _config.no_input, resizable : _config.resizable, title : _config.title, width : _config.width, x : _config.x, y : _config.y};
	}
	,create: function(render_config,_config,on_created) {
		var _window_id = this.seq_window;
		var _handle;
		var _this = window.document;
		_handle = _this.createElement("canvas");
		var config = this._copy_config(_config);
		_handle.width = config.width;
		_handle.height = config.height;
		_handle.style.display = "block";
		_handle.style.position = "relative";
		_handle.style.background = "#000";
		window.document.body.appendChild(_handle);
		var _gl_context = js.html._CanvasElement.CanvasUtil.getContextWebGL(_handle,{ alpha : false, premultipliedAlpha : false, antialias : render_config.antialiasing > 0});
		if(_gl_context == null) {
			var msg = "WebGL is required to run this!<br/><br/>";
			msg += "visit http://get.webgl.org/ for help <br/>";
			msg += "and contact the developer of the application";
			this.internal_fallback(msg);
			throw snow.types.Error.windowing(msg);
		}
		if(snow.modules.opengl.web.GL.current_context == null) snow.modules.opengl.web.GL.current_context = _gl_context;
		this.gl_contexts.set(_window_id,_gl_context);
		var _window_pos = this.get_real_window_position(_handle);
		config.x = _window_pos.x;
		config.y = _window_pos.y;
		if(config.title != null && config.title != "") window.document.title = config.title;
		on_created(_handle,_window_id,{ config : config, render_config : render_config});
		_handle.setAttribute("id","window" + _window_id);
		this.seq_window++;
	}
	,destroy_window: function(_window) {
		window.document.body.removeChild(_window.handle);
	}
	,close: function(_window) {
		_window.handle.style.display = "none";
	}
	,show: function(_window) {
		_window.handle.style.display = null;
	}
	,internal_resize: function(_window,_w,_h) {
		this.system.app.dispatch_system_event({ type : 5, window : { type : 7, timestamp : snow.Snow.core.timestamp(), window_id : _window.id, event : { x : _w, y : _h}}});
		this.system.app.dispatch_system_event({ type : 5, window : { type : 6, timestamp : snow.Snow.core.timestamp(), window_id : _window.id, event : { x : _w, y : _h}}});
	}
	,update_window: function(_window) {
		var _rect = _window.handle.getBoundingClientRect();
		if(_rect.left != _window.x || _rect.top != _window.y) this.system.app.dispatch_system_event({ type : 5, window : { type : 5, timestamp : snow.Snow.core.timestamp(), window_id : _window.id, event : { x : _rect.left, y : _rect.top}}});
		if(_rect.width != _window.width || _rect.height != _window.height) this.internal_resize(_window,_rect.width,_rect.height);
		_rect = null;
	}
	,render: function(_window) {
		var _window_gl_context = this.gl_contexts.get(_window.id);
		if(snow.modules.opengl.web.GL.current_context != _window_gl_context) snow.modules.opengl.web.GL.current_context = _window_gl_context;
	}
	,swap: function(_window) {
	}
	,simple_message: function(_window,message,title) {
		if(title == null) title = "";
		window.alert(message);
	}
	,set_size: function(_window,w,h) {
		_window.handle.width = w;
		_window.handle.height = h;
		_window.handle.style.width = "" + w + "px";
		_window.handle.style.height = "" + h + "px";
		this.internal_resize(_window,w,h);
	}
	,set_position: function(_window,x,y) {
		_window.handle.style.left = "" + x + "px";
		_window.handle.style.top = "" + y + "px";
	}
	,get_real_window_position: function(handle) {
		var curleft = 0;
		var curtop = 0;
		var _obj = handle;
		var _has_parent = true;
		var _max_count = 0;
		while(_has_parent == true) {
			_max_count++;
			if(_max_count > 100) {
				_has_parent = false;
				break;
			}
			if(_obj.offsetParent != null) {
				curleft += _obj.offsetLeft;
				curtop += _obj.offsetTop;
				_obj = _obj.offsetParent;
			} else _has_parent = false;
		}
		return { x : curleft, y : curtop};
	}
	,set_title: function(_window,title) {
		window.document.title = title;
	}
	,set_max_size: function(_window,w,h) {
		_window.handle.style.maxWidth = "" + w + "px";
		_window.handle.style.maxHeight = "" + h + "px";
	}
	,set_min_size: function(_window,w,h) {
		_window.handle.style.minWidth = "" + w + "px";
		_window.handle.style.minHeight = "" + h + "px";
	}
	,internal_fullscreen: function(_window,fullscreen) {
		var _handle = _window.handle;
		if(fullscreen) {
			if(HxOverrides.indexOf(this.fs_windows,_window,0) == -1) this.fs_windows.push(_window);
		} else HxOverrides.remove(this.fs_windows,_window);
		var true_fullscreen = this.system.app.config.web.true_fullscreen;
		if(fullscreen) {
			if(true_fullscreen) {
				if($bind(_handle,_handle.requestFullscreen) == null) {
					if($bind(_handle,_handle.requestFullScreen) == null) {
						if(_handle.webkitRequestFullscreen == null) {
							if(_handle.mozRequestFullScreen == null) {
							} else _handle.mozRequestFullScreen();
						} else _handle.webkitRequestFullscreen();
					} else _handle.requestFullScreen(null);
				} else _handle.requestFullscreen();
			} else {
				this._pre_fs_padding = _handle.style.padding;
				this._pre_fs_margin = _handle.style.margin;
				this._pre_fs_s_width = _handle.style.width;
				this._pre_fs_s_height = _handle.style.height;
				this._pre_fs_width = _handle.width;
				this._pre_fs_height = _handle.height;
				this._pre_fs_body_margin = window.document.body.style.margin;
				this._pre_fs_body_overflow = window.document.body.style.overflow;
				_handle.style.margin = "0";
				_handle.style.padding = "0";
				_handle.style.width = window.innerWidth + "px";
				_handle.style.height = window.innerHeight + "px";
				_handle.width = window.innerWidth;
				_handle.height = window.innerHeight;
				window.document.body.style.margin = "0";
				window.document.body.style.overflow = "hidden";
			}
		} else if(true_fullscreen) {
		} else {
			_handle.style.padding = this._pre_fs_padding;
			_handle.style.margin = this._pre_fs_margin;
			_handle.style.width = this._pre_fs_s_width;
			_handle.style.height = this._pre_fs_s_height;
			_handle.width = this._pre_fs_width;
			_handle.height = this._pre_fs_height;
			window.document.body.style.margin = this._pre_fs_body_margin;
			window.document.body.style.overflow = this._pre_fs_body_overflow;
		}
	}
	,fullscreen: function(_window,fullscreen) {
		this.internal_fullscreen(_window,fullscreen);
	}
	,bordered: function(_window,bordered) {
	}
	,grab: function(_window,grabbed) {
		if(grabbed) {
			if(($_=_window.handle,$bind($_,$_.requestPointerLock)) == null) {
				if(_window.handle.webkitRequestPointerLock == null) {
					if(_window.handle.mozRequestPointerLock == null) {
					} else _window.handle.mozRequestPointerLock();
				} else _window.handle.webkitRequestPointerLock();
			} else _window.handle.requestPointerLock();
		} else {
		}
	}
	,set_cursor_position: function(_window,x,y) {
	}
	,system_enable_cursor: function(enable) {
		if(this.cursor_style == null) {
			var _this = window.document;
			this.cursor_style = _this.createElement("style");
			this.cursor_style.innerHTML = "* { cursor:none; }";
		}
		if(enable && !this._cursor_visible) {
			this._cursor_visible = true;
			window.document.body.removeChild(this.cursor_style);
		} else if(!enable && this._cursor_visible) {
			this._cursor_visible = false;
			window.document.body.appendChild(this.cursor_style);
		}
	}
	,system_lock_cursor: function(enable) {
		if(this.system.app.window != null) this.grab(this.system.app.window,enable);
	}
	,system_enable_vsync: function(enable) {
		return -1;
	}
	,display_count: function() {
		return 1;
	}
	,display_mode_count: function(display) {
		return 1;
	}
	,display_native_mode: function(display) {
		return { format : 0, refresh_rate : 0, width : window.screen.width, height : window.screen.height};
	}
	,display_current_mode: function(display) {
		return this.display_native_mode(display);
	}
	,display_mode: function(display,mode_index) {
		return this.display_native_mode(display);
	}
	,display_bounds: function(display) {
		return { x : 0, y : 0, width : window.innerWidth, height : window.innerHeight};
	}
	,display_name: function(display) {
		return window.navigator.vendor;
	}
	,listen: function(_window) {
		_window.handle.addEventListener("mouseleave",$bind(this,this.on_internal_leave));
		_window.handle.addEventListener("mouseenter",$bind(this,this.on_internal_enter));
		if(_window.config.fullscreen) {
			this.internal_fullscreen(_window,_window.config.fullscreen);
			_window.config.width = _window.handle.width;
			_window.config.height = _window.handle.height;
		}
	}
	,unlisten: function(_window) {
		_window.handle.removeEventListener("mouseleave",$bind(this,this.on_internal_leave));
		_window.handle.removeEventListener("mouseenter",$bind(this,this.on_internal_enter));
		HxOverrides.remove(this.fs_windows,_window);
	}
	,on_internal_leave: function(_mouse_event) {
		var _window = this.system.window_from_handle(_mouse_event.target);
		this.system.app.dispatch_system_event({ type : 5, window : { type : 12, timestamp : _mouse_event.timeStamp, window_id : _window.id, event : _mouse_event}});
	}
	,on_internal_enter: function(_mouse_event) {
		var _window = this.system.window_from_handle(_mouse_event.target);
		this.system.app.dispatch_system_event({ type : 5, window : { type : 11, timestamp : _mouse_event.timeStamp, window_id : _window.id, event : _mouse_event}});
	}
	,listen_for_resize: function() {
		var _g = this;
		window.onresize = function(e) {
			if(!_g.system.app.config.web.true_fullscreen) {
				var _g1 = 0;
				var _g2 = _g.fs_windows;
				while(_g1 < _g2.length) {
					var $window = _g2[_g1];
					++_g1;
					$window.set_size(window.innerWidth,window.innerHeight);
					_g.internal_resize($window,$window.width,$window.height);
				}
			}
		};
	}
	,listen_for_visibility: function() {
		if(typeof document.hidden !== undefined) {
			this._hidden_name = "hidden";
			this._hidden_event_name = "visibilitychange";
		} else if(typeof document.mozHidden !== undefined ) {
			this._hidden_name = "mozHidden";
			this._hidden_name = "mozvisibilitychange";
		} else if(typeof document.msHidden !== "undefined") {
			this._hidden_name = "msHidden";
			this._hidden_event_name = "msvisibilitychange";
		} else if(typeof document.webkitHidden !== "undefined") {
			this._hidden_name = "webkitHidden";
			this._hidden_event_name = "webkitvisibilitychange";
		}
		if(this._hidden_name != "" && this._hidden_event_name != "") window.document.addEventListener(this._hidden_event_name,$bind(this,this.on_visibility_change));
	}
	,on_visibility_change: function(jsevent) {
		var _event = { type : 5, window : { type : 2, timestamp : snow.Snow.core.timestamp(), window_id : 1, event : jsevent}};
		if(document[this._hidden_name]) {
			_event.window.type = 3;
			this.system.app.dispatch_system_event(_event);
			_event.window.type = 8;
			this.system.app.dispatch_system_event(_event);
			_event.window.type = 14;
			this.system.app.dispatch_system_event(_event);
		} else {
			_event.window.type = 2;
			this.system.app.dispatch_system_event(_event);
			_event.window.type = 10;
			this.system.app.dispatch_system_event(_event);
			_event.window.type = 13;
			this.system.app.dispatch_system_event(_event);
		}
	}
	,internal_fallback: function(message) {
		var text_el;
		var overlay_el;
		var _this = window.document;
		text_el = _this.createElement("div");
		var _this1 = window.document;
		overlay_el = _this1.createElement("div");
		text_el.style.marginLeft = "auto";
		text_el.style.marginRight = "auto";
		text_el.style.color = "#d3d3d3";
		text_el.style.marginTop = "5em";
		text_el.style.fontSize = "1.4em";
		text_el.style.fontFamily = "helvetica,sans-serif";
		text_el.innerHTML = message;
		overlay_el.style.top = "0";
		overlay_el.style.left = "0";
		overlay_el.style.width = "100%";
		overlay_el.style.height = "100%";
		overlay_el.style.display = "block";
		overlay_el.style.minWidth = "100%";
		overlay_el.style.minHeight = "100%";
		overlay_el.style.textAlign = "center";
		overlay_el.style.position = "absolute";
		overlay_el.style.background = "rgba(1,1,1,0.90)";
		overlay_el.appendChild(text_el);
		window.document.body.appendChild(overlay_el);
	}
	,__class__: snow.core.web.window.Windowing
};
snow.modules.interfaces.Audio = function() { };
$hxClasses["snow.modules.interfaces.Audio"] = snow.modules.interfaces.Audio;
snow.modules.interfaces.Audio.__name__ = ["snow","modules","interfaces","Audio"];
snow.modules.interfaces.Audio.prototype = {
	__class__: snow.modules.interfaces.Audio
};
snow.modules.howlerjs = {};
snow.modules.howlerjs.Audio = function(_system) {
	this.system = _system;
	this.suspended_sounds = [];
	this.handles = new haxe.ds.ObjectMap();
};
$hxClasses["snow.modules.howlerjs.Audio"] = snow.modules.howlerjs.Audio;
snow.modules.howlerjs.Audio.__name__ = ["snow","modules","howlerjs","Audio"];
snow.modules.howlerjs.Audio.__interfaces__ = [snow.modules.interfaces.Audio];
snow.modules.howlerjs.Audio.prototype = {
	init: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(event) {
	}
	,suspend: function() {
		var $it0 = this.handles.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			if(sound.get_playing()) {
				sound.toggle();
				this.suspended_sounds.push(sound);
			}
		}
	}
	,resume: function() {
		while(this.suspended_sounds.length > 0) {
			var sound = this.suspended_sounds.pop();
			sound.toggle();
		}
	}
	,info_from_id: function(_id,_format) {
		if(_format == null) {
			var _ext = haxe.io.Path.extension(_id);
			switch(_ext) {
			case "wav":
				_format = 2;
				break;
			case "ogg":
				_format = 1;
				break;
			case "pcm":
				_format = 3;
				break;
			default:
				_format = 0;
			}
		}
		return { format : _format, id : _id, handle : null, data : null};
	}
	,create_sound: function(_id,_name,_streaming,_format) {
		if(_streaming == null) _streaming = false;
		var _g = this;
		return new snow.api.Promise(function(resolve,reject) {
			var _path = _g.system.app.assets.root + _id;
			var info = _g.info_from_id(_path,_format);
			var sound = new snow.modules.howlerjs.sound.Sound(_g.system,_name,_streaming);
			info.handle = new window.Howl({ urls : [_path], onend : function() {
				_g.system.app.audio.module._on_end(info.handle);
			}, onloaderror : function() {
				reject(snow.types.Error.error("failed to create sound " + _name + " from " + _id));
			}, onload : function() {
				info.handle = this;
				sound.set_info(info);
				var key = info.handle;
				_g.handles.set(key,sound);
				resolve(sound);
			}});
		});
	}
	,create_sound_from_bytes: function(_name,_bytes,_format) {
		throw snow.types.Error.error("unimplemented / wip");
	}
	,_on_end: function(handle) {
		var sound;
		var key = handle;
		sound = this.handles.h[key.__id__];
		if(sound != null) sound.emit("end");
	}
	,__class__: snow.modules.howlerjs.Audio
};
snow.system.audio = {};
snow.system.audio.Sound = function(_system,_name,_is_stream) {
	if(_is_stream == null) _is_stream = false;
	this.is_stream = false;
	this.position_bytes = 0;
	this.length_bytes = 0;
	this.duration = 0.0;
	this.position = 0.0;
	this.looping = false;
	this.pan = 0.0;
	this.volume = 1.0;
	this.pitch = 1.0;
	this.loaded = false;
	this.paused = false;
	this.playing = false;
	this.name = "";
	this.name = _name;
	this.system = _system;
	this.is_stream = _is_stream;
};
$hxClasses["snow.system.audio.Sound"] = snow.system.audio.Sound;
snow.system.audio.Sound.__name__ = ["snow","system","audio","Sound"];
snow.system.audio.Sound.prototype = {
	emit: function(_event) {
		this.system.sound_event(this,_event);
	}
	,on: function(_event,_handler) {
		this.system.on(this.name,_event,_handler);
	}
	,off: function(_event,_handler) {
		this.system.off(this.name,_event,_handler);
	}
	,play: function() {
		haxe.Log.trace("    i / sound / " + "Sound:play called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 102, className : "snow.system.audio.Sound", methodName : "play"});
	}
	,loop: function() {
		haxe.Log.trace("    i / sound / " + "Sound:loop called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 104, className : "snow.system.audio.Sound", methodName : "loop"});
	}
	,stop: function() {
		haxe.Log.trace("    i / sound / " + "Sound:stop called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 106, className : "snow.system.audio.Sound", methodName : "stop"});
	}
	,pause: function() {
		haxe.Log.trace("    i / sound / " + "Sound:pause called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 108, className : "snow.system.audio.Sound", methodName : "pause"});
	}
	,destroy: function() {
		haxe.Log.trace("    i / sound / " + "Sound:destroy called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 110, className : "snow.system.audio.Sound", methodName : "destroy"});
	}
	,internal_update: function() {
	}
	,internal_play: function() {
	}
	,internal_loop: function() {
	}
	,internal_stop: function() {
	}
	,internal_pause: function() {
	}
	,toggle: function() {
		this.set_playing(!this.get_playing());
		if(this.get_playing()) {
			if(this.get_looping()) this.loop(); else this.play();
		} else this.pause();
	}
	,get_playing: function() {
		return this.playing;
	}
	,get_paused: function() {
		return this.paused;
	}
	,get_loaded: function() {
		return this.loaded;
	}
	,get_info: function() {
		return this.info;
	}
	,set_info: function(_info) {
		return this.info = _info;
	}
	,get_pan: function() {
		return this.pan;
	}
	,get_pitch: function() {
		return this.pitch;
	}
	,get_volume: function() {
		return this.volume;
	}
	,get_looping: function() {
		return this.looping;
	}
	,get_position: function() {
		return this.position;
	}
	,get_position_bytes: function() {
		return this.position_bytes;
	}
	,get_length_bytes: function() {
		return this.length_bytes;
	}
	,get_duration: function() {
		return 0;
	}
	,set_playing: function(_playing) {
		return this.playing = _playing;
	}
	,set_paused: function(_paused) {
		return this.paused = _paused;
	}
	,set_loaded: function(_loaded) {
		return this.loaded = _loaded;
	}
	,set_pan: function(_pan) {
		return this.pan = _pan;
	}
	,set_pitch: function(_pitch) {
		return this.pitch = _pitch;
	}
	,set_volume: function(_volume) {
		return this.volume = _volume;
	}
	,set_position: function(_position) {
		return this.position = _position;
	}
	,set_looping: function(_looping) {
		return this.looping = _looping;
	}
	,set_position_bytes: function(_position_bytes) {
		return this.position_bytes = _position_bytes;
	}
	,__class__: snow.system.audio.Sound
	,__properties__: {set_position_bytes:"set_position_bytes",get_position_bytes:"get_position_bytes",get_length_bytes:"get_length_bytes",get_duration:"get_duration",set_position:"set_position",get_position:"get_position",set_looping:"set_looping",get_looping:"get_looping",set_pan:"set_pan",get_pan:"get_pan",set_volume:"set_volume",get_volume:"get_volume",set_pitch:"set_pitch",get_pitch:"get_pitch",set_info:"set_info",get_info:"get_info",set_loaded:"set_loaded",get_loaded:"get_loaded",set_paused:"set_paused",get_paused:"get_paused",set_playing:"set_playing",get_playing:"get_playing"}
};
snow.modules.howlerjs.sound = {};
snow.modules.howlerjs.sound.Sound = function(_system,_name,_is_stream) {
	if(_is_stream == null) _is_stream = false;
	snow.system.audio.Sound.call(this,_system,_name,_is_stream);
};
$hxClasses["snow.modules.howlerjs.sound.Sound"] = snow.modules.howlerjs.sound.Sound;
snow.modules.howlerjs.sound.Sound.__name__ = ["snow","modules","howlerjs","sound","Sound"];
snow.modules.howlerjs.sound.Sound.__super__ = snow.system.audio.Sound;
snow.modules.howlerjs.sound.Sound.prototype = $extend(snow.system.audio.Sound.prototype,{
	set_info: function(_info) {
		if(this.get_info() != null) this.destroy();
		this.info = null;
		if(_info == null) {
			haxe.Log.trace("    i / sound / " + "not creating sound, info was null",{ fileName : "Sound.hx", lineNumber : 27, className : "snow.modules.howlerjs.sound.Sound", methodName : "set_info"});
			return this.get_info();
		}
		this.info = _info;
		this.set_loaded(true);
		return this.get_info();
	}
	,set_pan: function(_pan) {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.pos3d(this.get_pan());
		return this.pan = _pan;
	}
	,set_volume: function(_volume) {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.volume(_volume);
		return this.volume = _volume;
	}
	,set_pitch: function(_pitch) {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.rate(_pitch);
		return this.pitch = _pitch;
	}
	,set_position: function(_position) {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.pos(_position);
		return this.position = _position;
	}
	,get_position: function() {
		if(this.get_info() != null && this.get_info().handle != null) return this.get_info().handle.pos();
		return this.position;
	}
	,get_duration: function() {
		if(this.get_info() != null && this.get_info().handle != null) return this.get_info().handle._duration;
		return 0;
	}
	,play: function() {
		if(this.get_info() != null && this.get_info().handle != null) {
			this.set_playing(true);
			this.set_looping(false);
			this.get_info().handle.loop(false);
			this.get_info().handle.play();
			if(this.get_info() != null && this.get_info().handle != null) {
				this.get_info().handle.rate(this.get_pitch());
				this.get_info().handle.volume(this.get_volume());
				this.get_info().handle.pos3d(this.get_pan());
			}
		}
	}
	,loop: function() {
		if(this.get_info() != null && this.get_info().handle != null) {
			this.set_playing(true);
			this.set_looping(true);
			this.get_info().handle.loop(true);
			this.get_info().handle.play();
			if(this.get_info() != null && this.get_info().handle != null) {
				this.get_info().handle.rate(this.get_pitch());
				this.get_info().handle.volume(this.get_volume());
				this.get_info().handle.pos3d(this.get_pan());
			}
		}
	}
	,stop: function() {
		this.set_playing(false);
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.stop();
	}
	,pause: function() {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.pause();
	}
	,destroy: function() {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.unload();
		this.system.kill(this);
	}
	,ensure_parameters: function() {
		if(this.get_info() != null && this.get_info().handle != null) {
			this.get_info().handle.rate(this.get_pitch());
			this.get_info().handle.volume(this.get_volume());
			this.get_info().handle.pos3d(this.get_pan());
		}
	}
	,__class__: snow.modules.howlerjs.sound.Sound
});
snow.modules.opengl = {};
snow.modules.opengl.web = {};
snow.modules.opengl.web.GL = function() { };
$hxClasses["snow.modules.opengl.web.GL"] = snow.modules.opengl.web.GL;
snow.modules.opengl.web.GL.__name__ = ["snow","modules","opengl","web","GL"];
snow.modules.opengl.web.GL.__properties__ = {get_version:"get_version"}
snow.modules.opengl.web.GL.versionString = function() {
	var ver = snow.modules.opengl.web.GL.current_context.getParameter(7938);
	var slver = snow.modules.opengl.web.GL.current_context.getParameter(35724);
	var ren = snow.modules.opengl.web.GL.current_context.getParameter(7937);
	var ven = snow.modules.opengl.web.GL.current_context.getParameter(7936);
	return "/ " + ver + " / " + slver + " / " + ren + " / " + ven + " /";
};
snow.modules.opengl.web.GL.activeTexture = function(texture) {
	snow.modules.opengl.web.GL.current_context.activeTexture(texture);
};
snow.modules.opengl.web.GL.attachShader = function(program,shader) {
	snow.modules.opengl.web.GL.current_context.attachShader(program,shader);
};
snow.modules.opengl.web.GL.bindAttribLocation = function(program,index,name) {
	snow.modules.opengl.web.GL.current_context.bindAttribLocation(program,index,name);
};
snow.modules.opengl.web.GL.bindBuffer = function(target,buffer) {
	snow.modules.opengl.web.GL.current_context.bindBuffer(target,buffer);
};
snow.modules.opengl.web.GL.bindFramebuffer = function(target,framebuffer) {
	snow.modules.opengl.web.GL.current_context.bindFramebuffer(target,framebuffer);
};
snow.modules.opengl.web.GL.bindRenderbuffer = function(target,renderbuffer) {
	snow.modules.opengl.web.GL.current_context.bindRenderbuffer(target,renderbuffer);
};
snow.modules.opengl.web.GL.bindTexture = function(target,texture) {
	snow.modules.opengl.web.GL.current_context.bindTexture(target,texture);
};
snow.modules.opengl.web.GL.blendColor = function(red,green,blue,alpha) {
	snow.modules.opengl.web.GL.current_context.blendColor(red,green,blue,alpha);
};
snow.modules.opengl.web.GL.blendEquation = function(mode) {
	snow.modules.opengl.web.GL.current_context.blendEquation(mode);
};
snow.modules.opengl.web.GL.blendEquationSeparate = function(modeRGB,modeAlpha) {
	snow.modules.opengl.web.GL.current_context.blendEquationSeparate(modeRGB,modeAlpha);
};
snow.modules.opengl.web.GL.blendFunc = function(sfactor,dfactor) {
	snow.modules.opengl.web.GL.current_context.blendFunc(sfactor,dfactor);
};
snow.modules.opengl.web.GL.blendFuncSeparate = function(srcRGB,dstRGB,srcAlpha,dstAlpha) {
	snow.modules.opengl.web.GL.current_context.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
snow.modules.opengl.web.GL.bufferData = function(target,data,usage) {
	snow.modules.opengl.web.GL.current_context.bufferData(target,data,usage);
};
snow.modules.opengl.web.GL.bufferSubData = function(target,offset,data) {
	snow.modules.opengl.web.GL.current_context.bufferSubData(target,offset,data);
};
snow.modules.opengl.web.GL.checkFramebufferStatus = function(target) {
	return snow.modules.opengl.web.GL.current_context.checkFramebufferStatus(target);
};
snow.modules.opengl.web.GL.clear = function(mask) {
	snow.modules.opengl.web.GL.current_context.clear(mask);
};
snow.modules.opengl.web.GL.clearColor = function(red,green,blue,alpha) {
	snow.modules.opengl.web.GL.current_context.clearColor(red,green,blue,alpha);
};
snow.modules.opengl.web.GL.clearDepth = function(depth) {
	snow.modules.opengl.web.GL.current_context.clearDepth(depth);
};
snow.modules.opengl.web.GL.clearStencil = function(s) {
	snow.modules.opengl.web.GL.current_context.clearStencil(s);
};
snow.modules.opengl.web.GL.colorMask = function(red,green,blue,alpha) {
	snow.modules.opengl.web.GL.current_context.colorMask(red,green,blue,alpha);
};
snow.modules.opengl.web.GL.compileShader = function(shader) {
	snow.modules.opengl.web.GL.current_context.compileShader(shader);
};
snow.modules.opengl.web.GL.compressedTexImage2D = function(target,level,internalformat,width,height,border,data) {
	snow.modules.opengl.web.GL.current_context.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
snow.modules.opengl.web.GL.compressedTexSubImage2D = function(target,level,xoffset,yoffset,width,height,format,data) {
	snow.modules.opengl.web.GL.current_context.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
snow.modules.opengl.web.GL.copyTexImage2D = function(target,level,internalformat,x,y,width,height,border) {
	snow.modules.opengl.web.GL.current_context.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
snow.modules.opengl.web.GL.copyTexSubImage2D = function(target,level,xoffset,yoffset,x,y,width,height) {
	snow.modules.opengl.web.GL.current_context.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
snow.modules.opengl.web.GL.createBuffer = function() {
	return snow.modules.opengl.web.GL.current_context.createBuffer();
};
snow.modules.opengl.web.GL.createFramebuffer = function() {
	return snow.modules.opengl.web.GL.current_context.createFramebuffer();
};
snow.modules.opengl.web.GL.createProgram = function() {
	return snow.modules.opengl.web.GL.current_context.createProgram();
};
snow.modules.opengl.web.GL.createRenderbuffer = function() {
	return snow.modules.opengl.web.GL.current_context.createRenderbuffer();
};
snow.modules.opengl.web.GL.createShader = function(type) {
	return snow.modules.opengl.web.GL.current_context.createShader(type);
};
snow.modules.opengl.web.GL.createTexture = function() {
	return snow.modules.opengl.web.GL.current_context.createTexture();
};
snow.modules.opengl.web.GL.cullFace = function(mode) {
	snow.modules.opengl.web.GL.current_context.cullFace(mode);
};
snow.modules.opengl.web.GL.deleteBuffer = function(buffer) {
	snow.modules.opengl.web.GL.current_context.deleteBuffer(buffer);
};
snow.modules.opengl.web.GL.deleteFramebuffer = function(framebuffer) {
	snow.modules.opengl.web.GL.current_context.deleteFramebuffer(framebuffer);
};
snow.modules.opengl.web.GL.deleteProgram = function(program) {
	snow.modules.opengl.web.GL.current_context.deleteProgram(program);
};
snow.modules.opengl.web.GL.deleteRenderbuffer = function(renderbuffer) {
	snow.modules.opengl.web.GL.current_context.deleteRenderbuffer(renderbuffer);
};
snow.modules.opengl.web.GL.deleteShader = function(shader) {
	snow.modules.opengl.web.GL.current_context.deleteShader(shader);
};
snow.modules.opengl.web.GL.deleteTexture = function(texture) {
	snow.modules.opengl.web.GL.current_context.deleteTexture(texture);
};
snow.modules.opengl.web.GL.depthFunc = function(func) {
	snow.modules.opengl.web.GL.current_context.depthFunc(func);
};
snow.modules.opengl.web.GL.depthMask = function(flag) {
	snow.modules.opengl.web.GL.current_context.depthMask(flag);
};
snow.modules.opengl.web.GL.depthRange = function(zNear,zFar) {
	snow.modules.opengl.web.GL.current_context.depthRange(zNear,zFar);
};
snow.modules.opengl.web.GL.detachShader = function(program,shader) {
	snow.modules.opengl.web.GL.current_context.detachShader(program,shader);
};
snow.modules.opengl.web.GL.disable = function(cap) {
	snow.modules.opengl.web.GL.current_context.disable(cap);
};
snow.modules.opengl.web.GL.disableVertexAttribArray = function(index) {
	snow.modules.opengl.web.GL.current_context.disableVertexAttribArray(index);
};
snow.modules.opengl.web.GL.drawArrays = function(mode,first,count) {
	snow.modules.opengl.web.GL.current_context.drawArrays(mode,first,count);
};
snow.modules.opengl.web.GL.drawElements = function(mode,count,type,offset) {
	snow.modules.opengl.web.GL.current_context.drawElements(mode,count,type,offset);
};
snow.modules.opengl.web.GL.enable = function(cap) {
	snow.modules.opengl.web.GL.current_context.enable(cap);
};
snow.modules.opengl.web.GL.enableVertexAttribArray = function(index) {
	snow.modules.opengl.web.GL.current_context.enableVertexAttribArray(index);
};
snow.modules.opengl.web.GL.finish = function() {
	snow.modules.opengl.web.GL.current_context.finish();
};
snow.modules.opengl.web.GL.flush = function() {
	snow.modules.opengl.web.GL.current_context.flush();
};
snow.modules.opengl.web.GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	snow.modules.opengl.web.GL.current_context.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
snow.modules.opengl.web.GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	snow.modules.opengl.web.GL.current_context.framebufferTexture2D(target,attachment,textarget,texture,level);
};
snow.modules.opengl.web.GL.frontFace = function(mode) {
	snow.modules.opengl.web.GL.current_context.frontFace(mode);
};
snow.modules.opengl.web.GL.generateMipmap = function(target) {
	snow.modules.opengl.web.GL.current_context.generateMipmap(target);
};
snow.modules.opengl.web.GL.getActiveAttrib = function(program,index) {
	return snow.modules.opengl.web.GL.current_context.getActiveAttrib(program,index);
};
snow.modules.opengl.web.GL.getActiveUniform = function(program,index) {
	return snow.modules.opengl.web.GL.current_context.getActiveUniform(program,index);
};
snow.modules.opengl.web.GL.getAttachedShaders = function(program) {
	return snow.modules.opengl.web.GL.current_context.getAttachedShaders(program);
};
snow.modules.opengl.web.GL.getAttribLocation = function(program,name) {
	return snow.modules.opengl.web.GL.current_context.getAttribLocation(program,name);
};
snow.modules.opengl.web.GL.getBufferParameter = function(target,pname) {
	return snow.modules.opengl.web.GL.current_context.getBufferParameter(target,pname);
};
snow.modules.opengl.web.GL.getContextAttributes = function() {
	return snow.modules.opengl.web.GL.current_context.getContextAttributes();
};
snow.modules.opengl.web.GL.getError = function() {
	return snow.modules.opengl.web.GL.current_context.getError();
};
snow.modules.opengl.web.GL.getExtension = function(name) {
	return snow.modules.opengl.web.GL.current_context.getExtension(name);
};
snow.modules.opengl.web.GL.getFramebufferAttachmentParameter = function(target,attachment,pname) {
	return snow.modules.opengl.web.GL.current_context.getFramebufferAttachmentParameter(target,attachment,pname);
};
snow.modules.opengl.web.GL.getParameter = function(pname) {
	return snow.modules.opengl.web.GL.current_context.getParameter(pname);
};
snow.modules.opengl.web.GL.getProgramInfoLog = function(program) {
	return snow.modules.opengl.web.GL.current_context.getProgramInfoLog(program);
};
snow.modules.opengl.web.GL.getProgramParameter = function(program,pname) {
	return snow.modules.opengl.web.GL.current_context.getProgramParameter(program,pname);
};
snow.modules.opengl.web.GL.getRenderbufferParameter = function(target,pname) {
	return snow.modules.opengl.web.GL.current_context.getRenderbufferParameter(target,pname);
};
snow.modules.opengl.web.GL.getShaderInfoLog = function(shader) {
	return snow.modules.opengl.web.GL.current_context.getShaderInfoLog(shader);
};
snow.modules.opengl.web.GL.getShaderParameter = function(shader,pname) {
	return snow.modules.opengl.web.GL.current_context.getShaderParameter(shader,pname);
};
snow.modules.opengl.web.GL.getShaderPrecisionFormat = function(shadertype,precisiontype) {
	return snow.modules.opengl.web.GL.current_context.getShaderPrecisionFormat(shadertype,precisiontype);
};
snow.modules.opengl.web.GL.getShaderSource = function(shader) {
	return snow.modules.opengl.web.GL.current_context.getShaderSource(shader);
};
snow.modules.opengl.web.GL.getSupportedExtensions = function() {
	return snow.modules.opengl.web.GL.current_context.getSupportedExtensions();
};
snow.modules.opengl.web.GL.getTexParameter = function(target,pname) {
	return snow.modules.opengl.web.GL.current_context.getTexParameter(target,pname);
};
snow.modules.opengl.web.GL.getUniform = function(program,location) {
	return snow.modules.opengl.web.GL.current_context.getUniform(program,location);
};
snow.modules.opengl.web.GL.getUniformLocation = function(program,name) {
	return snow.modules.opengl.web.GL.current_context.getUniformLocation(program,name);
};
snow.modules.opengl.web.GL.getVertexAttrib = function(index,pname) {
	return snow.modules.opengl.web.GL.current_context.getVertexAttrib(index,pname);
};
snow.modules.opengl.web.GL.getVertexAttribOffset = function(index,pname) {
	return snow.modules.opengl.web.GL.current_context.getVertexAttribOffset(index,pname);
};
snow.modules.opengl.web.GL.hint = function(target,mode) {
	snow.modules.opengl.web.GL.current_context.hint(target,mode);
};
snow.modules.opengl.web.GL.isBuffer = function(buffer) {
	return snow.modules.opengl.web.GL.current_context.isBuffer(buffer);
};
snow.modules.opengl.web.GL.isEnabled = function(cap) {
	return snow.modules.opengl.web.GL.current_context.isEnabled(cap);
};
snow.modules.opengl.web.GL.isFramebuffer = function(framebuffer) {
	return snow.modules.opengl.web.GL.current_context.isFramebuffer(framebuffer);
};
snow.modules.opengl.web.GL.isProgram = function(program) {
	return snow.modules.opengl.web.GL.current_context.isProgram(program);
};
snow.modules.opengl.web.GL.isRenderbuffer = function(renderbuffer) {
	return snow.modules.opengl.web.GL.current_context.isRenderbuffer(renderbuffer);
};
snow.modules.opengl.web.GL.isShader = function(shader) {
	return snow.modules.opengl.web.GL.current_context.isShader(shader);
};
snow.modules.opengl.web.GL.isTexture = function(texture) {
	return snow.modules.opengl.web.GL.current_context.isTexture(texture);
};
snow.modules.opengl.web.GL.lineWidth = function(width) {
	snow.modules.opengl.web.GL.current_context.lineWidth(width);
};
snow.modules.opengl.web.GL.linkProgram = function(program) {
	snow.modules.opengl.web.GL.current_context.linkProgram(program);
};
snow.modules.opengl.web.GL.pixelStorei = function(pname,param) {
	snow.modules.opengl.web.GL.current_context.pixelStorei(pname,param);
};
snow.modules.opengl.web.GL.polygonOffset = function(factor,units) {
	snow.modules.opengl.web.GL.current_context.polygonOffset(factor,units);
};
snow.modules.opengl.web.GL.readPixels = function(x,y,width,height,format,type,data) {
	snow.modules.opengl.web.GL.current_context.readPixels(x,y,width,height,format,type,data);
};
snow.modules.opengl.web.GL.renderbufferStorage = function(target,internalformat,width,height) {
	snow.modules.opengl.web.GL.current_context.renderbufferStorage(target,internalformat,width,height);
};
snow.modules.opengl.web.GL.sampleCoverage = function(value,invert) {
	snow.modules.opengl.web.GL.current_context.sampleCoverage(value,invert);
};
snow.modules.opengl.web.GL.scissor = function(x,y,width,height) {
	snow.modules.opengl.web.GL.current_context.scissor(x,y,width,height);
};
snow.modules.opengl.web.GL.shaderSource = function(shader,source) {
	snow.modules.opengl.web.GL.current_context.shaderSource(shader,source);
};
snow.modules.opengl.web.GL.stencilFunc = function(func,ref,mask) {
	snow.modules.opengl.web.GL.current_context.stencilFunc(func,ref,mask);
};
snow.modules.opengl.web.GL.stencilFuncSeparate = function(face,func,ref,mask) {
	snow.modules.opengl.web.GL.current_context.stencilFuncSeparate(face,func,ref,mask);
};
snow.modules.opengl.web.GL.stencilMask = function(mask) {
	snow.modules.opengl.web.GL.current_context.stencilMask(mask);
};
snow.modules.opengl.web.GL.stencilMaskSeparate = function(face,mask) {
	snow.modules.opengl.web.GL.current_context.stencilMaskSeparate(face,mask);
};
snow.modules.opengl.web.GL.stencilOp = function(fail,zfail,zpass) {
	snow.modules.opengl.web.GL.current_context.stencilOp(fail,zfail,zpass);
};
snow.modules.opengl.web.GL.stencilOpSeparate = function(face,fail,zfail,zpass) {
	snow.modules.opengl.web.GL.current_context.stencilOpSeparate(face,fail,zfail,zpass);
};
snow.modules.opengl.web.GL.texImage2D = function(target,level,internalformat,width,height,border,format,type,data) {
	snow.modules.opengl.web.GL.current_context.texImage2D(target,level,internalformat,width,height,border,format,type,data);
};
snow.modules.opengl.web.GL.texParameterf = function(target,pname,param) {
	snow.modules.opengl.web.GL.current_context.texParameterf(target,pname,param);
};
snow.modules.opengl.web.GL.texParameteri = function(target,pname,param) {
	snow.modules.opengl.web.GL.current_context.texParameteri(target,pname,param);
};
snow.modules.opengl.web.GL.texSubImage2D = function(target,level,xoffset,yoffset,width,height,format,type,data) {
	snow.modules.opengl.web.GL.current_context.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,data);
};
snow.modules.opengl.web.GL.uniform1f = function(location,x) {
	snow.modules.opengl.web.GL.current_context.uniform1f(location,x);
};
snow.modules.opengl.web.GL.uniform1fv = function(location,data) {
	snow.modules.opengl.web.GL.current_context.uniform1fv(location,data);
};
snow.modules.opengl.web.GL.uniform1i = function(location,x) {
	snow.modules.opengl.web.GL.current_context.uniform1i(location,x);
};
snow.modules.opengl.web.GL.uniform1iv = function(location,data) {
	snow.modules.opengl.web.GL.current_context.uniform1iv(location,data);
};
snow.modules.opengl.web.GL.uniform2f = function(location,x,y) {
	snow.modules.opengl.web.GL.current_context.uniform2f(location,x,y);
};
snow.modules.opengl.web.GL.uniform2fv = function(location,data) {
	snow.modules.opengl.web.GL.current_context.uniform2fv(location,data);
};
snow.modules.opengl.web.GL.uniform2i = function(location,x,y) {
	snow.modules.opengl.web.GL.current_context.uniform2i(location,x,y);
};
snow.modules.opengl.web.GL.uniform2iv = function(location,data) {
	snow.modules.opengl.web.GL.current_context.uniform2iv(location,data);
};
snow.modules.opengl.web.GL.uniform3f = function(location,x,y,z) {
	snow.modules.opengl.web.GL.current_context.uniform3f(location,x,y,z);
};
snow.modules.opengl.web.GL.uniform3fv = function(location,data) {
	snow.modules.opengl.web.GL.current_context.uniform3fv(location,data);
};
snow.modules.opengl.web.GL.uniform3i = function(location,x,y,z) {
	snow.modules.opengl.web.GL.current_context.uniform3i(location,x,y,z);
};
snow.modules.opengl.web.GL.uniform3iv = function(location,data) {
	snow.modules.opengl.web.GL.current_context.uniform3iv(location,data);
};
snow.modules.opengl.web.GL.uniform4f = function(location,x,y,z,w) {
	snow.modules.opengl.web.GL.current_context.uniform4f(location,x,y,z,w);
};
snow.modules.opengl.web.GL.uniform4fv = function(location,data) {
	snow.modules.opengl.web.GL.current_context.uniform4fv(location,data);
};
snow.modules.opengl.web.GL.uniform4i = function(location,x,y,z,w) {
	snow.modules.opengl.web.GL.current_context.uniform4i(location,x,y,z,w);
};
snow.modules.opengl.web.GL.uniform4iv = function(location,data) {
	snow.modules.opengl.web.GL.current_context.uniform4iv(location,data);
};
snow.modules.opengl.web.GL.uniformMatrix2fv = function(location,transpose,data) {
	snow.modules.opengl.web.GL.current_context.uniformMatrix2fv(location,transpose,data);
};
snow.modules.opengl.web.GL.uniformMatrix3fv = function(location,transpose,data) {
	snow.modules.opengl.web.GL.current_context.uniformMatrix3fv(location,transpose,data);
};
snow.modules.opengl.web.GL.uniformMatrix4fv = function(location,transpose,data) {
	snow.modules.opengl.web.GL.current_context.uniformMatrix4fv(location,transpose,data);
};
snow.modules.opengl.web.GL.useProgram = function(program) {
	snow.modules.opengl.web.GL.current_context.useProgram(program);
};
snow.modules.opengl.web.GL.validateProgram = function(program) {
	snow.modules.opengl.web.GL.current_context.validateProgram(program);
};
snow.modules.opengl.web.GL.vertexAttrib1f = function(indx,x) {
	snow.modules.opengl.web.GL.current_context.vertexAttrib1f(indx,x);
};
snow.modules.opengl.web.GL.vertexAttrib1fv = function(indx,data) {
	snow.modules.opengl.web.GL.current_context.vertexAttrib1fv(indx,data);
};
snow.modules.opengl.web.GL.vertexAttrib2f = function(indx,x,y) {
	snow.modules.opengl.web.GL.current_context.vertexAttrib2f(indx,x,y);
};
snow.modules.opengl.web.GL.vertexAttrib2fv = function(indx,data) {
	snow.modules.opengl.web.GL.current_context.vertexAttrib2fv(indx,data);
};
snow.modules.opengl.web.GL.vertexAttrib3f = function(indx,x,y,z) {
	snow.modules.opengl.web.GL.current_context.vertexAttrib3f(indx,x,y,z);
};
snow.modules.opengl.web.GL.vertexAttrib3fv = function(indx,data) {
	snow.modules.opengl.web.GL.current_context.vertexAttrib3fv(indx,data);
};
snow.modules.opengl.web.GL.vertexAttrib4f = function(indx,x,y,z,w) {
	snow.modules.opengl.web.GL.current_context.vertexAttrib4f(indx,x,y,z,w);
};
snow.modules.opengl.web.GL.vertexAttrib4fv = function(indx,data) {
	snow.modules.opengl.web.GL.current_context.vertexAttrib4fv(indx,data);
};
snow.modules.opengl.web.GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	snow.modules.opengl.web.GL.current_context.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
snow.modules.opengl.web.GL.viewport = function(x,y,width,height) {
	snow.modules.opengl.web.GL.current_context.viewport(x,y,width,height);
};
snow.modules.opengl.web.GL.get_version = function() {
	return 7938;
};
snow.system.assets = {};
snow.system.assets.Asset = function(_system,_id,_type) {
	if(_type == null) _type = 0;
	this.loaded = false;
	this.system = _system;
	this.type = _type;
	this.id = _id;
};
$hxClasses["snow.system.assets.Asset"] = snow.system.assets.Asset;
snow.system.assets.Asset.__name__ = ["snow","system","assets","Asset"];
snow.system.assets.Asset.prototype = {
	destroy: function() {
	}
	,__class__: snow.system.assets.Asset
};
snow.system.assets.AssetImage = function(_system,_id,_image) {
	snow.system.assets.Asset.call(this,_system,_id,4);
	this.set_image(_image);
};
$hxClasses["snow.system.assets.AssetImage"] = snow.system.assets.AssetImage;
snow.system.assets.AssetImage.__name__ = ["snow","system","assets","AssetImage"];
snow.system.assets.AssetImage.load = function(_system,_id) {
	return new snow.system.assets.AssetImage(_system,_id,null).reload();
};
snow.system.assets.AssetImage.load_from_bytes = function(_system,_id,_bytes) {
	return new snow.system.assets.AssetImage(_system,_id,null).reload_from_bytes(_bytes);
};
snow.system.assets.AssetImage.load_from_pixels = function(_system,_id,_width,_height,_pixels) {
	var info = _system.module.image_info_from_pixels(_id,_width,_height,_pixels);
	return new snow.system.assets.AssetImage(_system,_id,info);
};
snow.system.assets.AssetImage.provider = function(_app,_id) {
	return _app.assets.module.image_load_info(_app.assets.root + _id);
};
snow.system.assets.AssetImage.processor = function(_app,_id,_data) {
	if(_data == null) return snow.api.Promise.reject(snow.types.Error.error("AssetImage processor: data was null"));
	return _app.assets.module.image_info_from_bytes(_id,_data);
};
snow.system.assets.AssetImage.__super__ = snow.system.assets.Asset;
snow.system.assets.AssetImage.prototype = $extend(snow.system.assets.Asset.prototype,{
	reload: function() {
		var _g = this;
		this.loaded = false;
		return new snow.api.Promise(function(resolve,reject) {
			var _load = _g.system.app.io.data_flow(_g.id,null,snow.system.assets.AssetImage.provider);
			_load.then(function(_image) {
				_g.set_image(_image);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_image(null);
	}
	,reload_from_bytes: function(_bytes) {
		var _g = this;
		this.loaded = false;
		return new snow.api.Promise(function(resolve,reject) {
			var _load = _g.system.module.image_info_from_bytes(_g.id,_bytes);
			_load.then(function(_image) {
				_g.set_image(_image);
				resolve(_g);
			}).error(reject);
		});
	}
	,reload_from_pixels: function(_width,_height,_pixels) {
		this.loaded = false;
		this.set_image(this.system.module.image_info_from_pixels(this.id,_width,_height,_pixels));
	}
	,set_image: function(_image) {
		this.loaded = _image != null;
		return this.image = _image;
	}
	,__class__: snow.system.assets.AssetImage
	,__properties__: {set_image:"set_image"}
});
snow.system.assets.AssetBytes = function(_system,_id,_bytes) {
	snow.system.assets.Asset.call(this,_system,_id,1);
	this.set_bytes(_bytes);
};
$hxClasses["snow.system.assets.AssetBytes"] = snow.system.assets.AssetBytes;
snow.system.assets.AssetBytes.__name__ = ["snow","system","assets","AssetBytes"];
snow.system.assets.AssetBytes.load = function(_system,_id) {
	return new snow.system.assets.AssetBytes(_system,_id,null).reload();
};
snow.system.assets.AssetBytes.__super__ = snow.system.assets.Asset;
snow.system.assets.AssetBytes.prototype = $extend(snow.system.assets.Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow.api.Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(_g.id).then(function(_bytes) {
				_g.set_bytes(_bytes);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_bytes(null);
	}
	,set_bytes: function(_bytes) {
		this.loaded = _bytes != null;
		return this.bytes = _bytes;
	}
	,__class__: snow.system.assets.AssetBytes
	,__properties__: {set_bytes:"set_bytes"}
});
snow.system.assets.AssetText = function(_system,_id,_text) {
	snow.system.assets.Asset.call(this,_system,_id,2);
	this.set_text(_text);
};
$hxClasses["snow.system.assets.AssetText"] = snow.system.assets.AssetText;
snow.system.assets.AssetText.__name__ = ["snow","system","assets","AssetText"];
snow.system.assets.AssetText.load = function(_system,_id) {
	return new snow.system.assets.AssetText(_system,_id,null).reload();
};
snow.system.assets.AssetText.processor = function(_app,_id,_data) {
	if(_data == null) return snow.api.Promise.reject(snow.types.Error.error("AssetText processor: data was null"));
	return snow.api.Promise.resolve(snow.api.buffers._Uint8Array.Uint8Array_Impl_.toBytes(_data).toString());
};
snow.system.assets.AssetText.__super__ = snow.system.assets.Asset;
snow.system.assets.AssetText.prototype = $extend(snow.system.assets.Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow.api.Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(_g.id,snow.system.assets.AssetText.processor).then(function(_text) {
				_g.set_text(_text);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_text(null);
	}
	,set_text: function(_text) {
		this.loaded = _text != null;
		return this.text = _text;
	}
	,__class__: snow.system.assets.AssetText
	,__properties__: {set_text:"set_text"}
});
snow.system.assets.AssetJSON = function(_system,_id,_json) {
	snow.system.assets.Asset.call(this,_system,_id,3);
	this.set_json(_json);
};
$hxClasses["snow.system.assets.AssetJSON"] = snow.system.assets.AssetJSON;
snow.system.assets.AssetJSON.__name__ = ["snow","system","assets","AssetJSON"];
snow.system.assets.AssetJSON.load = function(_system,_id) {
	return new snow.system.assets.AssetJSON(_system,_id,null).reload();
};
snow.system.assets.AssetJSON.processor = function(_app,_id,_data) {
	if(_data == null) return snow.api.Promise.reject(snow.types.Error.error("AssetJSON: data was null"));
	return new snow.api.Promise(function(resolve,reject) {
		var _data_json = null;
		try {
			_data_json = JSON.parse(snow.api.buffers._Uint8Array.Uint8Array_Impl_.toBytes(_data).toString());
		} catch( e ) {
			return reject(snow.types.Error.parse(e));
		}
		return resolve(_data_json);
	});
};
snow.system.assets.AssetJSON.__super__ = snow.system.assets.Asset;
snow.system.assets.AssetJSON.prototype = $extend(snow.system.assets.Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow.api.Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(_g.id,snow.system.assets.AssetJSON.processor).then(function(_json) {
				_g.set_json(_json);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_json(null);
	}
	,set_json: function(_json) {
		this.loaded = _json != null;
		return this.json = _json;
	}
	,__class__: snow.system.assets.AssetJSON
	,__properties__: {set_json:"set_json"}
});
snow.system.assets.Assets = function(_app) {
	this.manifest_path = "manifest";
	this.root = "";
	this.app = _app;
	this.list = [];
	this.module = new snow.core.web.assets.Assets(this);
};
$hxClasses["snow.system.assets.Assets"] = snow.system.assets.Assets;
snow.system.assets.Assets.__name__ = ["snow","system","assets","Assets"];
snow.system.assets.Assets.prototype = {
	listed: function(_id) {
		return HxOverrides.indexOf(this.list,_id,0) != -1;
	}
	,path: function(_id) {
		return this.root + _id;
	}
	,bytes: function(_id) {
		return snow.system.assets.AssetBytes.load(this,_id);
	}
	,text: function(_id) {
		return snow.system.assets.AssetText.load(this,_id);
	}
	,json: function(_id) {
		return snow.system.assets.AssetJSON.load(this,_id);
	}
	,image: function(_id) {
		return snow.system.assets.AssetImage.load(this,_id);
	}
	,image_from_bytes: function(_id,_bytes) {
		return snow.system.assets.AssetImage.load_from_bytes(this,_id,_bytes);
	}
	,image_from_pixels: function(_id,_width,_height,_pixels) {
		return snow.system.assets.AssetImage.load_from_pixels(this,_id,_width,_height,_pixels);
	}
	,__class__: snow.system.assets.Assets
};
snow.system.audio.Audio = function(_app) {
	this.active = false;
	this.app = _app;
	this.module = new snow.modules.howlerjs.Audio(this);
	this.module.init();
	this.sound_list = new haxe.ds.StringMap();
	this.stream_list = new haxe.ds.StringMap();
	this.active = true;
};
$hxClasses["snow.system.audio.Audio"] = snow.system.audio.Audio;
snow.system.audio.Audio.__name__ = ["snow","system","audio","Audio"];
snow.system.audio.Audio.prototype = {
	create: function(_id,_name,_streaming) {
		if(_streaming == null) _streaming = false;
		if(_name == null) _name = "";
		var _g = this;
		if(_name == "") _name = this.app.make_uniqueid();
		haxe.Log.trace("    i / audio / " + ("creating sound named " + _name + " (stream: " + (_streaming == null?"null":"" + _streaming) + ")"),{ fileName : "Audio.hx", lineNumber : 53, className : "snow.system.audio.Audio", methodName : "create"});
		return new snow.api.Promise(function(resolve,reject) {
			var _create = _g.module.create_sound(_id,_name,_streaming);
			_create.then(function(_sound) {
				_g.sound_list.set(_name,_sound);
				if(_streaming) _g.stream_list.set(_name,_sound);
				resolve(_sound);
				_sound.emit("load");
			}).error(reject);
		});
	}
	,create_from_bytes: function(_name,_bytes,_format) {
		if(_name == null) _name = "";
		if(_name == "") _name = this.app.make_uniqueid();
		var sound = this.module.create_sound_from_bytes(_name,_bytes,_format);
		this.sound_list.set(_name,sound);
		return sound;
	}
	,uncreate: function(_name) {
		var _sound = this.sound_list.get(_name);
		if(_sound == null) haxe.Log.trace("    i / audio / " + ("can't find sound, unable to uncreate, use create first: " + _name),{ fileName : "Audio.hx", lineNumber : 99, className : "snow.system.audio.Audio", methodName : "uncreate"});
		_sound.destroy();
	}
	,add: function(sound) {
		this.sound_list.set(sound.name,sound);
		if(sound.is_stream) this.stream_list.set(sound.name,sound);
	}
	,on: function(_name,_event,_handler) {
		if(_event == "load") {
			var sound = this.get(_name);
			if(sound != null) {
				if(sound.get_loaded()) {
					_handler(sound);
					return;
				}
			}
		}
		var _event_id = "" + _event + snow.system.audio.Audio.splitter + _name;
		if(this.handlers == null) this.handlers = new haxe.ds.StringMap();
		if(!this.handlers.exists(_event_id)) this.handlers.set(_event_id,[]);
		var _list = this.handlers.get(_event_id);
		if(HxOverrides.indexOf(_list,_handler,0) != -1) throw "Audio on event adding the same handler twice";
		_list.push(_handler);
		this.handlers.set(_event_id,_list);
	}
	,off: function(_name,_event,_handler) {
		if(this.handlers == null) return;
		var _event_id = "" + _event + snow.system.audio.Audio.splitter + _name;
		var _list = this.handlers.get(_event_id);
		if(_list != null) {
			HxOverrides.remove(_list,_handler);
			this.handlers.set(_event_id,_list);
		}
	}
	,get: function(_name) {
		var _sound = this.sound_list.get(_name);
		return _sound;
	}
	,volume: function(_name,_volume) {
		var sound = this.get(_name);
		if(sound != null) {
			if(_volume != null) return sound.set_volume(_volume); else return sound.get_volume();
		}
		return 0;
	}
	,pan: function(_name,_pan) {
		var sound = this.get(_name);
		if(sound != null) {
			if(_pan != null) return sound.set_pan(_pan); else return sound.get_pan();
		}
		return 0;
	}
	,pitch: function(_name,_pitch) {
		var sound = this.get(_name);
		if(sound != null) {
			if(_pitch != null) return sound.set_pitch(_pitch); else return sound.get_pitch();
		}
		return 0;
	}
	,position: function(_name,_position) {
		var sound = this.get(_name);
		if(sound != null) {
			if(_position != null) return sound.set_position(_position); else return sound.get_position();
		}
		return 0;
	}
	,duration: function(_name) {
		var sound = this.get(_name);
		if(sound != null) return sound.get_duration();
		return 0;
	}
	,play: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.play();
	}
	,loop: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.loop();
	}
	,pause: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.pause();
	}
	,stop: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.stop();
	}
	,toggle: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.toggle();
	}
	,kill: function(_sound) {
		if(_sound == null) return;
		this.sound_list.remove(_sound.name);
		this.stream_list.remove(_sound.name);
	}
	,suspend: function() {
		if(!this.active) return;
		haxe.Log.trace("    i / audio / " + "suspending sound context",{ fileName : "Audio.hx", lineNumber : 354, className : "snow.system.audio.Audio", methodName : "suspend"});
		this.active = false;
		var $it0 = this.stream_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.internal_pause();
		}
		this.module.suspend();
	}
	,resume: function() {
		if(this.active) return;
		haxe.Log.trace("    i / audio / " + "resuming sound context",{ fileName : "Audio.hx", lineNumber : 372, className : "snow.system.audio.Audio", methodName : "resume"});
		this.active = true;
		this.module.resume();
		var $it0 = this.stream_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.internal_play();
		}
	}
	,on_event: function(_event) {
		this.module.on_event(_event);
		if(_event.type == 10) this.suspend(); else if(_event.type == 12) this.resume();
	}
	,destroy: function() {
		this.active = false;
		var $it0 = this.sound_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.destroy();
		}
		this.module.destroy();
	}
	,update: function() {
		if(!this.active) return;
		var $it0 = this.sound_list.iterator();
		while( $it0.hasNext() ) {
			var _sound = $it0.next();
			if(_sound.get_playing()) _sound.internal_update();
		}
		this.module.update();
	}
	,sound_event: function(_sound,_event) {
		var _event_id = "" + _event + snow.system.audio.Audio.splitter + _sound.name;
		if(this.handlers == null) return;
		var _list = this.handlers.get(_event_id);
		if(_list != null) {
			var _g = 0;
			while(_g < _list.length) {
				var fn = _list[_g];
				++_g;
				fn(_sound);
			}
		}
	}
	,__class__: snow.system.audio.Audio
};
snow.system.input.Input = function(_app) {
	this.touch_count = 0;
	this.app = _app;
	this.module = new snow.core.web.input.Input(this);
	this.module.init();
	this.key_code_pressed = new haxe.ds.IntMap();
	this.key_code_down = new haxe.ds.IntMap();
	this.key_code_released = new haxe.ds.IntMap();
	this.scan_code_pressed = new haxe.ds.IntMap();
	this.scan_code_down = new haxe.ds.IntMap();
	this.scan_code_released = new haxe.ds.IntMap();
	this.mouse_button_pressed = new haxe.ds.IntMap();
	this.mouse_button_down = new haxe.ds.IntMap();
	this.mouse_button_released = new haxe.ds.IntMap();
	this.gamepad_button_pressed = new haxe.ds.IntMap();
	this.gamepad_button_down = new haxe.ds.IntMap();
	this.gamepad_button_released = new haxe.ds.IntMap();
	this.gamepad_axis_values = new haxe.ds.IntMap();
	this.touches_down = new haxe.ds.IntMap();
};
$hxClasses["snow.system.input.Input"] = snow.system.input.Input;
snow.system.input.Input.__name__ = ["snow","system","input","Input"];
snow.system.input.Input.prototype = {
	keypressed: function(_code) {
		return this.key_code_pressed.exists(_code);
	}
	,keyreleased: function(_code) {
		return this.key_code_released.exists(_code);
	}
	,keydown: function(_code) {
		return this.key_code_down.exists(_code);
	}
	,scanpressed: function(_code) {
		return this.scan_code_pressed.exists(_code);
	}
	,scanreleased: function(_code) {
		return this.scan_code_released.exists(_code);
	}
	,scandown: function(_code) {
		return this.scan_code_down.exists(_code);
	}
	,mousepressed: function(_button) {
		return this.mouse_button_pressed.exists(_button);
	}
	,mousereleased: function(_button) {
		return this.mouse_button_released.exists(_button);
	}
	,mousedown: function(_button) {
		return this.mouse_button_down.exists(_button);
	}
	,gamepadpressed: function(_gamepad,_button) {
		var _gamepad_state = this.gamepad_button_pressed.get(_gamepad);
		if(_gamepad_state != null) return _gamepad_state.exists(_button); else return false;
	}
	,gamepadreleased: function(_gamepad,_button) {
		var _gamepad_state = this.gamepad_button_released.get(_gamepad);
		if(_gamepad_state != null) return _gamepad_state.exists(_button); else return false;
	}
	,gamepaddown: function(_gamepad,_button) {
		var _gamepad_state = this.gamepad_button_down.get(_gamepad);
		if(_gamepad_state != null) return _gamepad_state.exists(_button); else return false;
	}
	,gamepadaxis: function(_gamepad,_axis) {
		var _gamepad_state = this.gamepad_axis_values.get(_gamepad);
		if(_gamepad_state != null) {
			if(_gamepad_state.exists(_axis)) return _gamepad_state.get(_axis);
		}
		return 0;
	}
	,dispatch_key_down_event: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		if(!repeat) {
			this.key_code_pressed.set(keycode,false);
			this.key_code_down.set(keycode,true);
			this.scan_code_pressed.set(scancode,false);
			this.scan_code_down.set(scancode,true);
		}
		this.app.host.onkeydown(keycode,scancode,repeat,mod,timestamp,window_id);
	}
	,dispatch_key_up_event: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		this.key_code_released.set(keycode,false);
		this.key_code_down.remove(keycode);
		this.scan_code_released.set(scancode,false);
		this.scan_code_down.remove(scancode);
		this.app.host.onkeyup(keycode,scancode,repeat,mod,timestamp,window_id);
	}
	,dispatch_text_event: function(text,start,length,type,timestamp,window_id) {
		this.app.host.ontextinput(text,start,length,type,timestamp,window_id);
	}
	,dispatch_mouse_move_event: function(x,y,xrel,yrel,timestamp,window_id) {
		this.app.host.onmousemove(x,y,xrel,yrel,timestamp,window_id);
	}
	,dispatch_mouse_down_event: function(x,y,button,timestamp,window_id) {
		this.mouse_button_pressed.set(button,false);
		this.mouse_button_down.set(button,true);
		this.app.host.onmousedown(x,y,button,timestamp,window_id);
	}
	,dispatch_mouse_up_event: function(x,y,button,timestamp,window_id) {
		this.mouse_button_released.set(button,false);
		this.mouse_button_down.remove(button);
		this.app.host.onmouseup(x,y,button,timestamp,window_id);
	}
	,dispatch_mouse_wheel_event: function(x,y,timestamp,window_id) {
		this.app.host.onmousewheel(x,y,timestamp,window_id);
	}
	,dispatch_touch_down_event: function(x,y,touch_id,timestamp) {
		if(!this.touches_down.exists(touch_id)) {
			this.touch_count++;
			this.touches_down.set(touch_id,true);
		}
		this.app.host.ontouchdown(x,y,touch_id,timestamp);
	}
	,dispatch_touch_up_event: function(x,y,touch_id,timestamp) {
		this.app.host.ontouchup(x,y,touch_id,timestamp);
		if(this.touches_down.remove(touch_id)) this.touch_count--;
	}
	,dispatch_touch_move_event: function(x,y,dx,dy,touch_id,timestamp) {
		this.app.host.ontouchmove(x,y,dx,dy,touch_id,timestamp);
	}
	,dispatch_gamepad_axis_event: function(gamepad,axis,value,timestamp) {
		if(!this.gamepad_axis_values.exists(gamepad)) {
			var value1 = new haxe.ds.IntMap();
			this.gamepad_axis_values.set(gamepad,value1);
		}
		var this1 = this.gamepad_axis_values.get(gamepad);
		this1.set(axis,value);
		this.app.host.ongamepadaxis(gamepad,axis,value,timestamp);
	}
	,dispatch_gamepad_button_down_event: function(gamepad,button,value,timestamp) {
		if(!this.gamepad_button_pressed.exists(gamepad)) {
			var value1 = new haxe.ds.IntMap();
			this.gamepad_button_pressed.set(gamepad,value1);
		}
		if(!this.gamepad_button_down.exists(gamepad)) {
			var value2 = new haxe.ds.IntMap();
			this.gamepad_button_down.set(gamepad,value2);
		}
		var this1 = this.gamepad_button_pressed.get(gamepad);
		this1.set(button,false);
		var this2 = this.gamepad_button_down.get(gamepad);
		this2.set(button,true);
		this.app.host.ongamepaddown(gamepad,button,value,timestamp);
	}
	,dispatch_gamepad_button_up_event: function(gamepad,button,value,timestamp) {
		if(!this.gamepad_button_released.exists(gamepad)) {
			var value1 = new haxe.ds.IntMap();
			this.gamepad_button_released.set(gamepad,value1);
		}
		if(!this.gamepad_button_down.exists(gamepad)) {
			var value2 = new haxe.ds.IntMap();
			this.gamepad_button_down.set(gamepad,value2);
		}
		var this1 = this.gamepad_button_released.get(gamepad);
		this1.set(button,false);
		var this2 = this.gamepad_button_down.get(gamepad);
		this2.remove(button);
		this.app.host.ongamepadup(gamepad,button,value,timestamp);
	}
	,dispatch_gamepad_device_event: function(gamepad,type,timestamp) {
		this.app.host.ongamepaddevice(gamepad,type,timestamp);
	}
	,listen: function(_window) {
		this.module.listen(_window);
	}
	,unlisten: function(_window) {
		this.module.unlisten(_window);
	}
	,on_event: function(_event) {
		this.module.on_event(_event);
	}
	,on_gamepad_added: function(_event) {
		this.module.gamepad_add(_event.which);
	}
	,on_gamepad_removed: function(_event) {
		this.module.gamepad_remove(_event.which);
	}
	,update: function() {
		this.module.update();
		this._update_keystate();
		this._update_gamepadstate();
		this._update_mousestate();
	}
	,destroy: function() {
		this.module.destroy();
	}
	,_update_mousestate: function() {
		var $it0 = this.mouse_button_pressed.keys();
		while( $it0.hasNext() ) {
			var _code = $it0.next();
			if(this.mouse_button_pressed.get(_code)) this.mouse_button_pressed.remove(_code); else this.mouse_button_pressed.set(_code,true);
		}
		var $it1 = this.mouse_button_released.keys();
		while( $it1.hasNext() ) {
			var _code1 = $it1.next();
			if(this.mouse_button_released.get(_code1)) this.mouse_button_released.remove(_code1); else this.mouse_button_released.set(_code1,true);
		}
	}
	,_update_gamepadstate: function() {
		var $it0 = this.gamepad_button_pressed.iterator();
		while( $it0.hasNext() ) {
			var _gamepad_pressed = $it0.next();
			var $it1 = _gamepad_pressed.keys();
			while( $it1.hasNext() ) {
				var _button = $it1.next();
				if(_gamepad_pressed.get(_button)) _gamepad_pressed.remove(_button); else _gamepad_pressed.set(_button,true);
			}
		}
		var $it2 = this.gamepad_button_released.iterator();
		while( $it2.hasNext() ) {
			var _gamepad_released = $it2.next();
			var $it3 = _gamepad_released.keys();
			while( $it3.hasNext() ) {
				var _button1 = $it3.next();
				if(_gamepad_released.get(_button1)) _gamepad_released.remove(_button1); else _gamepad_released.set(_button1,true);
			}
		}
	}
	,_update_keystate: function() {
		var $it0 = this.key_code_pressed.keys();
		while( $it0.hasNext() ) {
			var _code = $it0.next();
			if(this.key_code_pressed.get(_code)) this.key_code_pressed.remove(_code); else this.key_code_pressed.set(_code,true);
		}
		var $it1 = this.key_code_released.keys();
		while( $it1.hasNext() ) {
			var _code1 = $it1.next();
			if(this.key_code_released.get(_code1)) this.key_code_released.remove(_code1); else this.key_code_released.set(_code1,true);
		}
		var $it2 = this.scan_code_pressed.keys();
		while( $it2.hasNext() ) {
			var _code2 = $it2.next();
			if(this.scan_code_pressed.get(_code2)) this.scan_code_pressed.remove(_code2); else this.scan_code_pressed.set(_code2,true);
		}
		var $it3 = this.scan_code_released.keys();
		while( $it3.hasNext() ) {
			var _code3 = $it3.next();
			if(this.scan_code_released.get(_code3)) this.scan_code_released.remove(_code3); else this.scan_code_released.set(_code3,true);
		}
	}
	,__class__: snow.system.input.Input
};
snow.system.io = {};
snow.system.io.IO = function(_app) {
	this.string_save_prefix = "slot";
	this.app = _app;
	this.module = new snow.core.web.io.IO(this);
	this.module.init();
};
$hxClasses["snow.system.io.IO"] = snow.system.io.IO;
snow.system.io.IO.__name__ = ["snow","system","io","IO"];
snow.system.io.IO.prototype = {
	url_open: function(_url) {
		this.module.url_open(_url);
	}
	,data_load: function(_path,_options) {
		return this.module.data_load(_path,_options);
	}
	,data_save: function(_path,_data,_options) {
		return this.module.data_save(_path,_data,_options);
	}
	,data_flow: function(_id,_processor,_provider) {
		var _g = this;
		if(_provider == null) _provider = $bind(this,this.default_provider);
		return new snow.api.Promise(function(resolve,reject) {
			_provider(_g.app,_id).then(function(data) {
				if(_processor != null) _processor(_g.app,_id,data).then(resolve,reject); else resolve(data);
			}).error(reject);
		});
	}
	,string_save_path: function(_slot) {
		if(_slot == null) _slot = 0;
		return this.module.string_save_path(_slot);
	}
	,string_save: function(_key,_value,_slot) {
		if(_slot == null) _slot = 0;
		var _string_map = this.string_slots_sync(_slot);
		var _encoded_key = window.btoa(_key);
		var _encoded_value = window.btoa(_value);
		_string_map.set(_encoded_key,_encoded_value);
		var _contents = haxe.Serializer.run(_string_map);
		_contents = window.btoa(_contents);
		return this.module.string_slot_save(_slot,_contents);
	}
	,string_load: function(_key,_slot) {
		if(_slot == null) _slot = 0;
		var _string_map = this.string_slots_sync(_slot);
		var _encoded_key = window.btoa(_key);
		var _encoded_value = _string_map.get(_encoded_key);
		if(_encoded_value == null) return null;
		return window.atob(_encoded_value);
	}
	,string_slots_sync: function(_slot) {
		if(_slot == null) _slot = 0;
		if(this.string_slots == null) this.string_slots = new haxe.ds.IntMap();
		var _string_map = this.string_slots.get(_slot);
		if(_string_map == null) {
			var _string = this.module.string_slot_load(_slot);
			if(_string == null) _string_map = new haxe.ds.StringMap(); else {
				_string = window.atob(_string);
				_string_map = haxe.Unserializer.run(_string);
			}
			this.string_slots.set(_slot,_string_map);
		}
		return _string_map;
	}
	,default_provider: function(_app,_id) {
		return this.module.data_load(_id,null);
	}
	,on_event: function(_event) {
		this.module.on_event(_event);
	}
	,update: function() {
		this.module.update();
	}
	,destroy: function() {
		this.module.destroy();
	}
	,__class__: snow.system.io.IO
};
snow.system.window = {};
snow.system.window.Window = function(_system,_config) {
	this.internal_resize = false;
	this.internal_position = false;
	this.minimized = false;
	this.closed = true;
	this.auto_render = true;
	this.auto_swap = true;
	this.height = 0;
	this.width = 0;
	this.y = 0;
	this.x = 0;
	this.fullscreen = false;
	this.grab = false;
	this.bordered = true;
	this.title = "snow window";
	this.set_max_size({ x : 0, y : 0});
	this.set_min_size({ x : 0, y : 0});
	this.system = _system;
	this.asked_config = _config;
	this.config = _config;
	if(this.config.x == null) this.config.x = 536805376;
	if(this.config.y == null) this.config.y = 536805376;
	this.system.module.create(this.system.app.config.render,_config,$bind(this,this.on_window_created));
};
$hxClasses["snow.system.window.Window"] = snow.system.window.Window;
snow.system.window.Window.__name__ = ["snow","system","window","Window"];
snow.system.window.Window.prototype = {
	on_window_created: function(_handle,_id,_configs) {
		this.id = _id;
		this.handle = _handle;
		if(this.handle == null) {
			haxe.Log.trace("   i / window / " + "failed to create window",{ fileName : "Window.hx", lineNumber : 92, className : "snow.system.window.Window", methodName : "on_window_created"});
			return;
		}
		this.closed = false;
		this.config = _configs.config;
		this.system.app.config.render = _configs.render_config;
		this.internal_position = true;
		this.set_x(this.config.x);
		this.set_y(this.config.y);
		this.internal_position = false;
		this.internal_resize = true;
		this.set_width(this.config.width);
		this.set_height(this.config.height);
		this.internal_resize = false;
		this.on_event({ type : 1, window_id : _id, timestamp : snow.Snow.core.timestamp(), event : { }});
		null;
	}
	,on_event: function(_event) {
		var _g = _event.type;
		switch(_g) {
		case 5:
			this.internal_position = true;
			this.set_position(_event.event.x,_event.event.y);
			this.internal_position = false;
			break;
		case 6:
			this.internal_resize = true;
			this.set_size(_event.event.x,_event.event.y);
			this.internal_resize = false;
			break;
		case 7:
			this.internal_resize = true;
			this.set_size(_event.event.x,_event.event.y);
			this.internal_resize = false;
			break;
		case 8:
			this.minimized = true;
			break;
		case 10:
			this.minimized = false;
			break;
		default:
		}
		if(this.onevent != null) this.onevent(_event);
	}
	,update: function() {
		if(this.handle != null && !this.closed) this.system.module.update_window(this);
	}
	,render: function() {
		if(this.minimized || this.closed) return;
		if(this.handle == null) return;
		this.system.module.render(this);
		if(this.onrender != null) {
			this.onrender(this);
			if(this.auto_swap) this.swap();
			return;
		}
		snow.modules.opengl.web.GL.clearColor(0,0,0,1.0);
		snow.modules.opengl.web.GL.clear(16384);
		if(this.auto_swap) this.swap();
	}
	,swap: function() {
		if(this.handle == null || this.closed || this.minimized) return;
		this.system.module.swap(this);
	}
	,destroy: function() {
		this.closed = true;
		if(this.handle == null) return;
		this.system.remove(this);
		this.system.module.destroy_window(this);
		this.handle = null;
	}
	,close: function() {
		this.closed = true;
		if(this.handle == null) return;
		this.system.module.close(this);
	}
	,show: function() {
		if(this.handle == null) return;
		this.closed = false;
		this.system.module.show(this);
	}
	,simple_message: function(message,title) {
		if(title == null) title = "";
		if(this.handle == null) return;
		this.system.module.simple_message(this,message,title);
	}
	,get_fullscreen: function() {
		return this.fullscreen;
	}
	,set_fullscreen: function(_enable) {
		if(this.handle != null) this.system.module.fullscreen(this,_enable);
		return this.fullscreen = _enable;
	}
	,get_bordered: function() {
		return this.bordered;
	}
	,get_grab: function() {
		return this.grab;
	}
	,get_max_size: function() {
		return this.max_size;
	}
	,get_min_size: function() {
		return this.min_size;
	}
	,get_title: function() {
		return this.title;
	}
	,set_title: function(_title) {
		if(this.handle != null) this.system.module.set_title(this,_title);
		return this.title = _title;
	}
	,set_x: function(_x) {
		this.x = _x;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
		return this.x;
	}
	,set_y: function(_y) {
		this.y = _y;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
		return this.y;
	}
	,set_width: function(_width) {
		this.width = _width;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,this.width,this.height);
		return this.width;
	}
	,set_height: function(_height) {
		this.height = _height;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,this.width,this.height);
		return this.height;
	}
	,set_cursor_position: function(_x,_y) {
		if(this.handle != null && !this.closed) this.system.module.set_cursor_position(this,_x,_y);
	}
	,set_position: function(_x,_y) {
		var last_internal_position_flag = this.internal_position;
		this.internal_position = true;
		this.set_x(_x);
		this.set_y(_y);
		this.internal_position = last_internal_position_flag;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
	}
	,set_size: function(_width,_height) {
		var last_internal_resize_flag = this.internal_resize;
		this.internal_resize = true;
		this.set_width(_width);
		this.set_height(_height);
		this.internal_resize = last_internal_resize_flag;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,_width,_height);
	}
	,set_max_size: function(_size) {
		if(this.get_max_size() != null && this.handle != null) this.system.module.set_max_size(this,_size.x,_size.y);
		return this.max_size = _size;
	}
	,set_min_size: function(_size) {
		if(this.get_min_size() != null && this.handle != null) this.system.module.set_min_size(this,_size.x,_size.y);
		return this.min_size = _size;
	}
	,set_bordered: function(_bordered) {
		if(this.handle != null) this.system.module.bordered(this,_bordered);
		return this.bordered = _bordered;
	}
	,set_grab: function(_grab) {
		if(this.handle != null) this.system.module.grab(this,_grab);
		return this.grab = _grab;
	}
	,__class__: snow.system.window.Window
	,__properties__: {set_min_size:"set_min_size",get_min_size:"get_min_size",set_max_size:"set_max_size",get_max_size:"get_max_size",set_height:"set_height",set_width:"set_width",set_y:"set_y",set_x:"set_x",set_fullscreen:"set_fullscreen",get_fullscreen:"get_fullscreen",set_grab:"set_grab",get_grab:"get_grab",set_bordered:"set_bordered",get_bordered:"get_bordered",set_title:"set_title",get_title:"get_title"}
};
snow.system.window.Windowing = function(_app) {
	this.window_count = 0;
	this.app = _app;
	this.window_list = new haxe.ds.IntMap();
	this.window_handles = new haxe.ds.ObjectMap();
	this.module = new snow.core.web.window.Windowing(this);
	this.module.init();
};
$hxClasses["snow.system.window.Windowing"] = snow.system.window.Windowing;
snow.system.window.Windowing.__name__ = ["snow","system","window","Windowing"];
snow.system.window.Windowing.prototype = {
	create: function(_config) {
		var _window = new snow.system.window.Window(this,_config);
		this.window_list.set(_window.id,_window);
		this.window_handles.set(_window.handle,_window.id);
		this.window_count++;
		this.module.listen(_window);
		if(_config.no_input == null || _config.no_input == false) this.app.input.listen(_window);
		return _window;
	}
	,remove: function(_window) {
		this.window_list.remove(_window.id);
		this.window_handles.remove(_window.handle);
		this.window_count--;
		this.module.unlisten(_window);
		if(_window.config.no_input == null || _window.config.no_input == false) this.app.input.unlisten(_window);
	}
	,window_from_handle: function(_handle) {
		if(this.window_handles.h.__keys__[_handle.__id__] != null) {
			var _id = this.window_handles.h[_handle.__id__];
			return this.window_list.get(_id);
		}
		return null;
	}
	,window_from_id: function(_id) {
		return this.window_list.get(_id);
	}
	,enable_vsync: function(_enable) {
		return this.module.system_enable_vsync(_enable);
	}
	,enable_cursor: function(_enable) {
		this.module.system_enable_cursor(_enable);
	}
	,enable_cursor_lock: function(_enable) {
		this.module.system_lock_cursor(_enable);
	}
	,display_count: function() {
		return this.module.display_count();
	}
	,display_mode_count: function(display) {
		return this.module.display_mode_count(display);
	}
	,display_native_mode: function(display) {
		return this.module.display_native_mode(display);
	}
	,display_current_mode: function(display) {
		return this.module.display_current_mode(display);
	}
	,display_mode: function(display,mode_index) {
		return this.module.display_mode(display,mode_index);
	}
	,display_bounds: function(display) {
		return this.module.display_bounds(display);
	}
	,display_name: function(display) {
		return this.module.display_name(display);
	}
	,on_event: function(_event) {
		if(_event.type == 5) {
			var _window_event = _event.window;
			var _window = this.window_list.get(_window_event.window_id);
			if(_window != null) _window.on_event(_window_event);
		}
	}
	,update: function() {
		this.module.update();
		var $it0 = this.window_list.iterator();
		while( $it0.hasNext() ) {
			var $window = $it0.next();
			$window.update();
		}
		var $it1 = this.window_list.iterator();
		while( $it1.hasNext() ) {
			var window1 = $it1.next();
			if(window1.auto_render) window1.render();
		}
	}
	,destroy: function() {
		this.module.destroy();
	}
	,__class__: snow.system.window.Windowing
};
snow.types = {};
snow.types.Error = $hxClasses["snow.types.Error"] = { __ename__ : ["snow","types","Error"], __constructs__ : ["error","init","windowing","parse"] };
snow.types.Error.error = function(value) { var $x = ["error",0,value]; $x.__enum__ = snow.types.Error; $x.toString = $estr; return $x; };
snow.types.Error.init = function(value) { var $x = ["init",1,value]; $x.__enum__ = snow.types.Error; $x.toString = $estr; return $x; };
snow.types.Error.windowing = function(value) { var $x = ["windowing",2,value]; $x.__enum__ = snow.types.Error; $x.toString = $estr; return $x; };
snow.types.Error.parse = function(value) { var $x = ["parse",3,value]; $x.__enum__ = snow.types.Error; $x.toString = $estr; return $x; };
snow.types._Types = {};
snow.types._Types.Platform_Impl_ = function() { };
$hxClasses["snow.types._Types.Platform_Impl_"] = snow.types._Types.Platform_Impl_;
snow.types._Types.Platform_Impl_.__name__ = ["snow","types","_Types","Platform_Impl_"];
snow.types._Types.AssetType_Impl_ = function() { };
$hxClasses["snow.types._Types.AssetType_Impl_"] = snow.types._Types.AssetType_Impl_;
snow.types._Types.AssetType_Impl_.__name__ = ["snow","types","_Types","AssetType_Impl_"];
snow.types._Types.AudioFormatType_Impl_ = function() { };
$hxClasses["snow.types._Types.AudioFormatType_Impl_"] = snow.types._Types.AudioFormatType_Impl_;
snow.types._Types.AudioFormatType_Impl_.__name__ = ["snow","types","_Types","AudioFormatType_Impl_"];
snow.types._Types.OpenGLProfile_Impl_ = function() { };
$hxClasses["snow.types._Types.OpenGLProfile_Impl_"] = snow.types._Types.OpenGLProfile_Impl_;
snow.types._Types.OpenGLProfile_Impl_.__name__ = ["snow","types","_Types","OpenGLProfile_Impl_"];
snow.types._Types.TextEventType_Impl_ = function() { };
$hxClasses["snow.types._Types.TextEventType_Impl_"] = snow.types._Types.TextEventType_Impl_;
snow.types._Types.TextEventType_Impl_.__name__ = ["snow","types","_Types","TextEventType_Impl_"];
snow.types._Types.GamepadDeviceEventType_Impl_ = function() { };
$hxClasses["snow.types._Types.GamepadDeviceEventType_Impl_"] = snow.types._Types.GamepadDeviceEventType_Impl_;
snow.types._Types.GamepadDeviceEventType_Impl_.__name__ = ["snow","types","_Types","GamepadDeviceEventType_Impl_"];
snow.types._Types.SystemEventType_Impl_ = function() { };
$hxClasses["snow.types._Types.SystemEventType_Impl_"] = snow.types._Types.SystemEventType_Impl_;
snow.types._Types.SystemEventType_Impl_.__name__ = ["snow","types","_Types","SystemEventType_Impl_"];
snow.types._Types.WindowEventType_Impl_ = function() { };
$hxClasses["snow.types._Types.WindowEventType_Impl_"] = snow.types._Types.WindowEventType_Impl_;
snow.types._Types.WindowEventType_Impl_.__name__ = ["snow","types","_Types","WindowEventType_Impl_"];
snow.types._Types.InputEventType_Impl_ = function() { };
$hxClasses["snow.types._Types.InputEventType_Impl_"] = snow.types._Types.InputEventType_Impl_;
snow.types._Types.InputEventType_Impl_.__name__ = ["snow","types","_Types","InputEventType_Impl_"];
snow.types._Types.FileEventType_Impl_ = function() { };
$hxClasses["snow.types._Types.FileEventType_Impl_"] = snow.types._Types.FileEventType_Impl_;
snow.types._Types.FileEventType_Impl_.__name__ = ["snow","types","_Types","FileEventType_Impl_"];
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
Luxe.version = "dev";
Luxe.build = "+0e191579e8";
_Luxe.Ev_Impl_.unknown = 0;
_Luxe.Ev_Impl_.ready = 1;
_Luxe.Ev_Impl_.init = 2;
_Luxe.Ev_Impl_.reset = 3;
_Luxe.Ev_Impl_.update = 4;
_Luxe.Ev_Impl_.fixedupdate = 5;
_Luxe.Ev_Impl_.destroy = 6;
_Luxe.Ev_Impl_.prerender = 7;
_Luxe.Ev_Impl_.render = 8;
_Luxe.Ev_Impl_.postrender = 9;
_Luxe.Ev_Impl_.keydown = 10;
_Luxe.Ev_Impl_.keyup = 11;
_Luxe.Ev_Impl_.textinput = 12;
_Luxe.Ev_Impl_.inputdown = 13;
_Luxe.Ev_Impl_.inputup = 14;
_Luxe.Ev_Impl_.mousedown = 15;
_Luxe.Ev_Impl_.mouseup = 16;
_Luxe.Ev_Impl_.mousemove = 17;
_Luxe.Ev_Impl_.mousewheel = 18;
_Luxe.Ev_Impl_.touchdown = 19;
_Luxe.Ev_Impl_.touchup = 20;
_Luxe.Ev_Impl_.touchmove = 21;
_Luxe.Ev_Impl_.gamepadaxis = 22;
_Luxe.Ev_Impl_.gamepaddown = 23;
_Luxe.Ev_Impl_.gamepadup = 24;
_Luxe.Ev_Impl_.gamepaddevice = 25;
_Luxe.Ev_Impl_.window = 26;
_Luxe.Ev_Impl_.windowmoved = 27;
_Luxe.Ev_Impl_.windowresized = 28;
_Luxe.Ev_Impl_.windowsized = 29;
_Luxe.Ev_Impl_.windowminimized = 30;
_Luxe.Ev_Impl_.windowrestored = 31;
_Luxe.Ev_Impl_.last = 31;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.crypto.Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe.crypto.Base64.BYTES = haxe.io.Bytes.ofString(haxe.crypto.Base64.CHARS);
haxe.ds.ObjectMap.count = 0;
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
haxe.zip.InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
haxe.zip.InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
haxe.zip.InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
haxe.zip.InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
haxe.zip.InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
luxe.Tag.update = "real dt";
luxe.Tag.renderdt = "render dt";
luxe.Tag.game_update = "game.update";
luxe.Tag.render = "core.render";
luxe.Tag.debug = "core.debug";
luxe.Tag.updates = "core.updates";
luxe.Tag.events = "core.events";
luxe.Tag.audio = "core.audio";
luxe.Tag.input = "core.input";
luxe.Tag.timer = "core.timer";
luxe.Tag.scene = "core.scene";
luxe.Debug.shut_down = false;
luxe._Input.MouseButton_Impl_.none = 0;
luxe._Input.MouseButton_Impl_.left = 1;
luxe._Input.MouseButton_Impl_.middle = 2;
luxe._Input.MouseButton_Impl_.right = 3;
luxe._Input.MouseButton_Impl_.extra1 = 4;
luxe._Input.MouseButton_Impl_.extra2 = 5;
luxe.Log._level = 1;
luxe.Log._log_width = 16;
luxe.Physics.tag_physics = "physics";
luxe.importers.tiled.TiledLayer.base_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
luxe.importers.tiled.TiledLayer.base_lookup = [];
luxe.macros.BuildVersion._save = false;
luxe.resource._Resource.ResourceType_Impl_.unknown = 0;
luxe.resource._Resource.ResourceType_Impl_.text = 1;
luxe.resource._Resource.ResourceType_Impl_.json = 2;
luxe.resource._Resource.ResourceType_Impl_.data = 3;
luxe.resource._Resource.ResourceType_Impl_.texture = 4;
luxe.resource._Resource.ResourceType_Impl_.sound = 5;
luxe.resource._Resource.ResourceType_Impl_.render_texture = 6;
luxe.resource._Resource.ResourceType_Impl_.font = 7;
luxe.resource._Resource.ResourceType_Impl_.shader = 8;
luxe.structural._BalancedBST.NodeColor.red = true;
luxe.structural._BalancedBST.NodeColor.black = false;
luxe.tween.actuators.SimpleActuator.actuators = new Array();
luxe.tween.actuators.SimpleActuator.actuatorsLength = 0;
luxe.tween.actuators.SimpleActuator.addedEvent = false;
luxe.tween.actuators.SimpleActuator.update_timer = 0;
luxe.tween.actuators.SimpleActuator.current_time = 0;
luxe.tween.Actuate.defaultActuator = luxe.tween.actuators.SimpleActuator;
luxe.tween.Actuate.defaultEase = luxe.tween.easing.Quad.get_easeOut();
luxe.tween.Actuate.targetLibraries = new haxe.ds.ObjectMap();
luxe.utils.GeometryUtils.two_pi = 6.283185307179586;
luxe.utils.Maths._PI_OVER_180 = 0.0174532925199432781;
luxe.utils.Maths._180_OVER_PI = 57.2957795130823797;
luxe.utils.unifill.Unicode.minCodePoint = 0;
luxe.utils.unifill.Unicode.maxCodePoint = 1114111;
luxe.utils.unifill.Unicode.minHighSurrogate = 55296;
luxe.utils.unifill.Unicode.maxHighSurrogate = 56319;
luxe.utils.unifill.Unicode.minLowSurrogate = 56320;
luxe.utils.unifill.Unicode.maxLowSurrogate = 57343;
phoenix._Batcher.PrimitiveType_Impl_.unknown = -1;
phoenix._Batcher.PrimitiveType_Impl_.line_strip = 3;
phoenix._Batcher.PrimitiveType_Impl_.line_loop = 2;
phoenix._Batcher.PrimitiveType_Impl_.lines = 1;
phoenix._Batcher.PrimitiveType_Impl_.triangle_strip = 5;
phoenix._Batcher.PrimitiveType_Impl_.triangles = 4;
phoenix._Batcher.PrimitiveType_Impl_.triangle_fan = 6;
phoenix._Batcher.PrimitiveType_Impl_.points = 0;
phoenix._Batcher.BlendMode_Impl_.zero = 0;
phoenix._Batcher.BlendMode_Impl_.one = 1;
phoenix._Batcher.BlendMode_Impl_.src_color = 768;
phoenix._Batcher.BlendMode_Impl_.one_minus_src_color = 769;
phoenix._Batcher.BlendMode_Impl_.src_alpha = 770;
phoenix._Batcher.BlendMode_Impl_.one_minus_src_alpha = 771;
phoenix._Batcher.BlendMode_Impl_.dst_alpha = 772;
phoenix._Batcher.BlendMode_Impl_.one_minus_dst_alpha = 773;
phoenix._Batcher.BlendMode_Impl_.dst_color = 774;
phoenix._Batcher.BlendMode_Impl_.one_minus_dst_color = 775;
phoenix._Batcher.BlendMode_Impl_.src_alpha_saturate = 776;
phoenix._Batcher.BlendEquation_Impl_.add = 32774;
phoenix._Batcher.BlendEquation_Impl_.subtract = 32778;
phoenix._Batcher.BlendEquation_Impl_.reverse_subtract = 32779;
phoenix.Batcher._sequence_key = -1;
phoenix._BitmapFont.TextAlign_Impl_.left = 0;
phoenix._BitmapFont.TextAlign_Impl_.right = 1;
phoenix._BitmapFont.TextAlign_Impl_.center = 2;
phoenix._BitmapFont.TextAlign_Impl_.top = 3;
phoenix._BitmapFont.TextAlign_Impl_.bottom = 4;
phoenix.BitmapFont.generic_names = ["font",""," "];
phoenix._Shader.UniformType_Impl_.unknown = 0;
phoenix._Shader.UniformType_Impl_["int"] = 1;
phoenix._Shader.UniformType_Impl_["float"] = 2;
phoenix._Shader.UniformType_Impl_.vector2 = 3;
phoenix._Shader.UniformType_Impl_.vector3 = 4;
phoenix._Shader.UniformType_Impl_.vector4 = 5;
phoenix._Shader.UniformType_Impl_.color = 6;
phoenix._Shader.UniformType_Impl_.texture = 7;
phoenix._Vector.ComponentOrder_Impl_.XYZ = 0;
phoenix._Vector.ComponentOrder_Impl_.YXZ = 1;
phoenix._Vector.ComponentOrder_Impl_.ZXY = 2;
phoenix._Vector.ComponentOrder_Impl_.ZYX = 3;
phoenix._Vector.ComponentOrder_Impl_.YZX = 4;
phoenix._Vector.ComponentOrder_Impl_.XZY = 5;
phoenix.geometry.Geometry._sequence_key = -1;
phoenix.geometry._TextGeometry.EvTextGeometry_Impl_.unknown = 0;
phoenix.geometry._TextGeometry.EvTextGeometry_Impl_.update_text = 1;
phoenix.geometry.TextGeometry.tab_regex = new EReg("\t","gim");
snow.api.Debug._level = 1;
snow.api.Debug._log_width = 16;
snow.api.Promises.calls = [];
snow.api.Promises.defers = [];
snow.api._Promise.PromiseState_Impl_.pending = 0;
snow.api._Promise.PromiseState_Impl_.fulfilled = 1;
snow.api._Promise.PromiseState_Impl_.rejected = 2;
snow.api.Timer.running_timers = [];
snow.core.web.input.DOMKeys.dom_shift = 16;
snow.core.web.input.DOMKeys.dom_ctrl = 17;
snow.core.web.input.DOMKeys.dom_alt = 18;
snow.core.web.input.DOMKeys.dom_capslock = 20;
snow.core.web.input.DOMKeys.dom_pageup = 33;
snow.core.web.input.DOMKeys.dom_pagedown = 34;
snow.core.web.input.DOMKeys.dom_end = 35;
snow.core.web.input.DOMKeys.dom_home = 36;
snow.core.web.input.DOMKeys.dom_left = 37;
snow.core.web.input.DOMKeys.dom_up = 38;
snow.core.web.input.DOMKeys.dom_right = 39;
snow.core.web.input.DOMKeys.dom_down = 40;
snow.core.web.input.DOMKeys.dom_printscr = 44;
snow.core.web.input.DOMKeys.dom_insert = 45;
snow.core.web.input.DOMKeys.dom_delete = 46;
snow.core.web.input.DOMKeys.dom_lmeta = 91;
snow.core.web.input.DOMKeys.dom_rmeta = 93;
snow.core.web.input.DOMKeys.dom_kp_0 = 96;
snow.core.web.input.DOMKeys.dom_kp_1 = 97;
snow.core.web.input.DOMKeys.dom_kp_2 = 98;
snow.core.web.input.DOMKeys.dom_kp_3 = 99;
snow.core.web.input.DOMKeys.dom_kp_4 = 100;
snow.core.web.input.DOMKeys.dom_kp_5 = 101;
snow.core.web.input.DOMKeys.dom_kp_6 = 102;
snow.core.web.input.DOMKeys.dom_kp_7 = 103;
snow.core.web.input.DOMKeys.dom_kp_8 = 104;
snow.core.web.input.DOMKeys.dom_kp_9 = 105;
snow.core.web.input.DOMKeys.dom_kp_multiply = 106;
snow.core.web.input.DOMKeys.dom_kp_plus = 107;
snow.core.web.input.DOMKeys.dom_kp_minus = 109;
snow.core.web.input.DOMKeys.dom_kp_decimal = 110;
snow.core.web.input.DOMKeys.dom_kp_divide = 111;
snow.core.web.input.DOMKeys.dom_kp_numlock = 144;
snow.core.web.input.DOMKeys.dom_f1 = 112;
snow.core.web.input.DOMKeys.dom_f2 = 113;
snow.core.web.input.DOMKeys.dom_f3 = 114;
snow.core.web.input.DOMKeys.dom_f4 = 115;
snow.core.web.input.DOMKeys.dom_f5 = 116;
snow.core.web.input.DOMKeys.dom_f6 = 117;
snow.core.web.input.DOMKeys.dom_f7 = 118;
snow.core.web.input.DOMKeys.dom_f8 = 119;
snow.core.web.input.DOMKeys.dom_f9 = 120;
snow.core.web.input.DOMKeys.dom_f10 = 121;
snow.core.web.input.DOMKeys.dom_f11 = 122;
snow.core.web.input.DOMKeys.dom_f12 = 123;
snow.core.web.input.DOMKeys.dom_f13 = 124;
snow.core.web.input.DOMKeys.dom_f14 = 125;
snow.core.web.input.DOMKeys.dom_f15 = 126;
snow.core.web.input.DOMKeys.dom_f16 = 127;
snow.core.web.input.DOMKeys.dom_f17 = 128;
snow.core.web.input.DOMKeys.dom_f18 = 129;
snow.core.web.input.DOMKeys.dom_f19 = 130;
snow.core.web.input.DOMKeys.dom_f20 = 131;
snow.core.web.input.DOMKeys.dom_f21 = 132;
snow.core.web.input.DOMKeys.dom_f22 = 133;
snow.core.web.input.DOMKeys.dom_f23 = 134;
snow.core.web.input.DOMKeys.dom_f24 = 135;
snow.core.web.input.DOMKeys.dom_caret = 160;
snow.core.web.input.DOMKeys.dom_exclaim = 161;
snow.core.web.input.DOMKeys.dom_quotedbl = 162;
snow.core.web.input.DOMKeys.dom_hash = 163;
snow.core.web.input.DOMKeys.dom_dollar = 164;
snow.core.web.input.DOMKeys.dom_percent = 165;
snow.core.web.input.DOMKeys.dom_ampersand = 166;
snow.core.web.input.DOMKeys.dom_underscore = 167;
snow.core.web.input.DOMKeys.dom_leftparen = 168;
snow.core.web.input.DOMKeys.dom_rightparen = 169;
snow.core.web.input.DOMKeys.dom_asterisk = 170;
snow.core.web.input.DOMKeys.dom_plus = 171;
snow.core.web.input.DOMKeys.dom_pipe = 172;
snow.core.web.input.DOMKeys.dom_minus = 173;
snow.core.web.input.DOMKeys.dom_leftbrace = 174;
snow.core.web.input.DOMKeys.dom_rightbrace = 175;
snow.core.web.input.DOMKeys.dom_tilde = 176;
snow.core.web.input.DOMKeys.dom_audiomute = 181;
snow.core.web.input.DOMKeys.dom_volumedown = 182;
snow.core.web.input.DOMKeys.dom_volumeup = 183;
snow.core.web.input.DOMKeys.dom_comma = 188;
snow.core.web.input.DOMKeys.dom_period = 190;
snow.core.web.input.DOMKeys.dom_slash = 191;
snow.core.web.input.DOMKeys.dom_backquote = 192;
snow.core.web.input.DOMKeys.dom_leftbracket = 219;
snow.core.web.input.DOMKeys.dom_rightbracket = 221;
snow.core.web.input.DOMKeys.dom_backslash = 220;
snow.core.web.input.DOMKeys.dom_quote = 222;
snow.core.web.input.DOMKeys.dom_meta = 224;
snow.system.input.Scancodes.MASK = 1073741824;
snow.system.input.Scancodes.unknown = 0;
snow.system.input.Scancodes.key_a = 4;
snow.system.input.Scancodes.key_b = 5;
snow.system.input.Scancodes.key_c = 6;
snow.system.input.Scancodes.key_d = 7;
snow.system.input.Scancodes.key_e = 8;
snow.system.input.Scancodes.key_f = 9;
snow.system.input.Scancodes.key_g = 10;
snow.system.input.Scancodes.key_h = 11;
snow.system.input.Scancodes.key_i = 12;
snow.system.input.Scancodes.key_j = 13;
snow.system.input.Scancodes.key_k = 14;
snow.system.input.Scancodes.key_l = 15;
snow.system.input.Scancodes.key_m = 16;
snow.system.input.Scancodes.key_n = 17;
snow.system.input.Scancodes.key_o = 18;
snow.system.input.Scancodes.key_p = 19;
snow.system.input.Scancodes.key_q = 20;
snow.system.input.Scancodes.key_r = 21;
snow.system.input.Scancodes.key_s = 22;
snow.system.input.Scancodes.key_t = 23;
snow.system.input.Scancodes.key_u = 24;
snow.system.input.Scancodes.key_v = 25;
snow.system.input.Scancodes.key_w = 26;
snow.system.input.Scancodes.key_x = 27;
snow.system.input.Scancodes.key_y = 28;
snow.system.input.Scancodes.key_z = 29;
snow.system.input.Scancodes.key_1 = 30;
snow.system.input.Scancodes.key_2 = 31;
snow.system.input.Scancodes.key_3 = 32;
snow.system.input.Scancodes.key_4 = 33;
snow.system.input.Scancodes.key_5 = 34;
snow.system.input.Scancodes.key_6 = 35;
snow.system.input.Scancodes.key_7 = 36;
snow.system.input.Scancodes.key_8 = 37;
snow.system.input.Scancodes.key_9 = 38;
snow.system.input.Scancodes.key_0 = 39;
snow.system.input.Scancodes.enter = 40;
snow.system.input.Scancodes.escape = 41;
snow.system.input.Scancodes.backspace = 42;
snow.system.input.Scancodes.tab = 43;
snow.system.input.Scancodes.space = 44;
snow.system.input.Scancodes.minus = 45;
snow.system.input.Scancodes.equals = 46;
snow.system.input.Scancodes.leftbracket = 47;
snow.system.input.Scancodes.rightbracket = 48;
snow.system.input.Scancodes.backslash = 49;
snow.system.input.Scancodes.nonushash = 50;
snow.system.input.Scancodes.semicolon = 51;
snow.system.input.Scancodes.apostrophe = 52;
snow.system.input.Scancodes.grave = 53;
snow.system.input.Scancodes.comma = 54;
snow.system.input.Scancodes.period = 55;
snow.system.input.Scancodes.slash = 56;
snow.system.input.Scancodes.capslock = 57;
snow.system.input.Scancodes.f1 = 58;
snow.system.input.Scancodes.f2 = 59;
snow.system.input.Scancodes.f3 = 60;
snow.system.input.Scancodes.f4 = 61;
snow.system.input.Scancodes.f5 = 62;
snow.system.input.Scancodes.f6 = 63;
snow.system.input.Scancodes.f7 = 64;
snow.system.input.Scancodes.f8 = 65;
snow.system.input.Scancodes.f9 = 66;
snow.system.input.Scancodes.f10 = 67;
snow.system.input.Scancodes.f11 = 68;
snow.system.input.Scancodes.f12 = 69;
snow.system.input.Scancodes.printscreen = 70;
snow.system.input.Scancodes.scrolllock = 71;
snow.system.input.Scancodes.pause = 72;
snow.system.input.Scancodes.insert = 73;
snow.system.input.Scancodes.home = 74;
snow.system.input.Scancodes.pageup = 75;
snow.system.input.Scancodes["delete"] = 76;
snow.system.input.Scancodes.end = 77;
snow.system.input.Scancodes.pagedown = 78;
snow.system.input.Scancodes.right = 79;
snow.system.input.Scancodes.left = 80;
snow.system.input.Scancodes.down = 81;
snow.system.input.Scancodes.up = 82;
snow.system.input.Scancodes.numlockclear = 83;
snow.system.input.Scancodes.kp_divide = 84;
snow.system.input.Scancodes.kp_multiply = 85;
snow.system.input.Scancodes.kp_minus = 86;
snow.system.input.Scancodes.kp_plus = 87;
snow.system.input.Scancodes.kp_enter = 88;
snow.system.input.Scancodes.kp_1 = 89;
snow.system.input.Scancodes.kp_2 = 90;
snow.system.input.Scancodes.kp_3 = 91;
snow.system.input.Scancodes.kp_4 = 92;
snow.system.input.Scancodes.kp_5 = 93;
snow.system.input.Scancodes.kp_6 = 94;
snow.system.input.Scancodes.kp_7 = 95;
snow.system.input.Scancodes.kp_8 = 96;
snow.system.input.Scancodes.kp_9 = 97;
snow.system.input.Scancodes.kp_0 = 98;
snow.system.input.Scancodes.kp_period = 99;
snow.system.input.Scancodes.nonusbackslash = 100;
snow.system.input.Scancodes.application = 101;
snow.system.input.Scancodes.power = 102;
snow.system.input.Scancodes.kp_equals = 103;
snow.system.input.Scancodes.f13 = 104;
snow.system.input.Scancodes.f14 = 105;
snow.system.input.Scancodes.f15 = 106;
snow.system.input.Scancodes.f16 = 107;
snow.system.input.Scancodes.f17 = 108;
snow.system.input.Scancodes.f18 = 109;
snow.system.input.Scancodes.f19 = 110;
snow.system.input.Scancodes.f20 = 111;
snow.system.input.Scancodes.f21 = 112;
snow.system.input.Scancodes.f22 = 113;
snow.system.input.Scancodes.f23 = 114;
snow.system.input.Scancodes.f24 = 115;
snow.system.input.Scancodes.execute = 116;
snow.system.input.Scancodes.help = 117;
snow.system.input.Scancodes.menu = 118;
snow.system.input.Scancodes.select = 119;
snow.system.input.Scancodes.stop = 120;
snow.system.input.Scancodes.again = 121;
snow.system.input.Scancodes.undo = 122;
snow.system.input.Scancodes.cut = 123;
snow.system.input.Scancodes.copy = 124;
snow.system.input.Scancodes.paste = 125;
snow.system.input.Scancodes.find = 126;
snow.system.input.Scancodes.mute = 127;
snow.system.input.Scancodes.volumeup = 128;
snow.system.input.Scancodes.volumedown = 129;
snow.system.input.Scancodes.kp_comma = 133;
snow.system.input.Scancodes.kp_equalsas400 = 134;
snow.system.input.Scancodes.international1 = 135;
snow.system.input.Scancodes.international2 = 136;
snow.system.input.Scancodes.international3 = 137;
snow.system.input.Scancodes.international4 = 138;
snow.system.input.Scancodes.international5 = 139;
snow.system.input.Scancodes.international6 = 140;
snow.system.input.Scancodes.international7 = 141;
snow.system.input.Scancodes.international8 = 142;
snow.system.input.Scancodes.international9 = 143;
snow.system.input.Scancodes.lang1 = 144;
snow.system.input.Scancodes.lang2 = 145;
snow.system.input.Scancodes.lang3 = 146;
snow.system.input.Scancodes.lang4 = 147;
snow.system.input.Scancodes.lang5 = 148;
snow.system.input.Scancodes.lang6 = 149;
snow.system.input.Scancodes.lang7 = 150;
snow.system.input.Scancodes.lang8 = 151;
snow.system.input.Scancodes.lang9 = 152;
snow.system.input.Scancodes.alterase = 153;
snow.system.input.Scancodes.sysreq = 154;
snow.system.input.Scancodes.cancel = 155;
snow.system.input.Scancodes.clear = 156;
snow.system.input.Scancodes.prior = 157;
snow.system.input.Scancodes.return2 = 158;
snow.system.input.Scancodes.separator = 159;
snow.system.input.Scancodes.out = 160;
snow.system.input.Scancodes.oper = 161;
snow.system.input.Scancodes.clearagain = 162;
snow.system.input.Scancodes.crsel = 163;
snow.system.input.Scancodes.exsel = 164;
snow.system.input.Scancodes.kp_00 = 176;
snow.system.input.Scancodes.kp_000 = 177;
snow.system.input.Scancodes.thousandsseparator = 178;
snow.system.input.Scancodes.decimalseparator = 179;
snow.system.input.Scancodes.currencyunit = 180;
snow.system.input.Scancodes.currencysubunit = 181;
snow.system.input.Scancodes.kp_leftparen = 182;
snow.system.input.Scancodes.kp_rightparen = 183;
snow.system.input.Scancodes.kp_leftbrace = 184;
snow.system.input.Scancodes.kp_rightbrace = 185;
snow.system.input.Scancodes.kp_tab = 186;
snow.system.input.Scancodes.kp_backspace = 187;
snow.system.input.Scancodes.kp_a = 188;
snow.system.input.Scancodes.kp_b = 189;
snow.system.input.Scancodes.kp_c = 190;
snow.system.input.Scancodes.kp_d = 191;
snow.system.input.Scancodes.kp_e = 192;
snow.system.input.Scancodes.kp_f = 193;
snow.system.input.Scancodes.kp_xor = 194;
snow.system.input.Scancodes.kp_power = 195;
snow.system.input.Scancodes.kp_percent = 196;
snow.system.input.Scancodes.kp_less = 197;
snow.system.input.Scancodes.kp_greater = 198;
snow.system.input.Scancodes.kp_ampersand = 199;
snow.system.input.Scancodes.kp_dblampersand = 200;
snow.system.input.Scancodes.kp_verticalbar = 201;
snow.system.input.Scancodes.kp_dblverticalbar = 202;
snow.system.input.Scancodes.kp_colon = 203;
snow.system.input.Scancodes.kp_hash = 204;
snow.system.input.Scancodes.kp_space = 205;
snow.system.input.Scancodes.kp_at = 206;
snow.system.input.Scancodes.kp_exclam = 207;
snow.system.input.Scancodes.kp_memstore = 208;
snow.system.input.Scancodes.kp_memrecall = 209;
snow.system.input.Scancodes.kp_memclear = 210;
snow.system.input.Scancodes.kp_memadd = 211;
snow.system.input.Scancodes.kp_memsubtract = 212;
snow.system.input.Scancodes.kp_memmultiply = 213;
snow.system.input.Scancodes.kp_memdivide = 214;
snow.system.input.Scancodes.kp_plusminus = 215;
snow.system.input.Scancodes.kp_clear = 216;
snow.system.input.Scancodes.kp_clearentry = 217;
snow.system.input.Scancodes.kp_binary = 218;
snow.system.input.Scancodes.kp_octal = 219;
snow.system.input.Scancodes.kp_decimal = 220;
snow.system.input.Scancodes.kp_hexadecimal = 221;
snow.system.input.Scancodes.lctrl = 224;
snow.system.input.Scancodes.lshift = 225;
snow.system.input.Scancodes.lalt = 226;
snow.system.input.Scancodes.lmeta = 227;
snow.system.input.Scancodes.rctrl = 228;
snow.system.input.Scancodes.rshift = 229;
snow.system.input.Scancodes.ralt = 230;
snow.system.input.Scancodes.rmeta = 231;
snow.system.input.Scancodes.mode = 257;
snow.system.input.Scancodes.audionext = 258;
snow.system.input.Scancodes.audioprev = 259;
snow.system.input.Scancodes.audiostop = 260;
snow.system.input.Scancodes.audioplay = 261;
snow.system.input.Scancodes.audiomute = 262;
snow.system.input.Scancodes.mediaselect = 263;
snow.system.input.Scancodes.www = 264;
snow.system.input.Scancodes.mail = 265;
snow.system.input.Scancodes.calculator = 266;
snow.system.input.Scancodes.computer = 267;
snow.system.input.Scancodes.ac_search = 268;
snow.system.input.Scancodes.ac_home = 269;
snow.system.input.Scancodes.ac_back = 270;
snow.system.input.Scancodes.ac_forward = 271;
snow.system.input.Scancodes.ac_stop = 272;
snow.system.input.Scancodes.ac_refresh = 273;
snow.system.input.Scancodes.ac_bookmarks = 274;
snow.system.input.Scancodes.brightnessdown = 275;
snow.system.input.Scancodes.brightnessup = 276;
snow.system.input.Scancodes.displayswitch = 277;
snow.system.input.Scancodes.kbdillumtoggle = 278;
snow.system.input.Scancodes.kbdillumdown = 279;
snow.system.input.Scancodes.kbdillumup = 280;
snow.system.input.Scancodes.eject = 281;
snow.system.input.Scancodes.sleep = 282;
snow.system.input.Scancodes.app1 = 283;
snow.system.input.Scancodes.app2 = 284;
snow.system.input.Scancodes.scancode_names = [null,null,null,null,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","Enter","Escape","Backspace","Tab","Space","-","=","[","]","\\","#",";","'","`",",",".","/","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PrintScreen","ScrollLock","Pause","Insert","Home","PageUp","Delete","End","PageDown","Right","Left","Down","Up","Numlock","Keypad /","Keypad *","Keypad -","Keypad +","Keypad Enter","Keypad 1","Keypad 2","Keypad 3","Keypad 4","Keypad 5","Keypad 6","Keypad 7","Keypad 8","Keypad 9","Keypad 0","Keypad .",null,"Application","Power","Keypad =","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","Execute","Help","Menu","Select","Stop","Again","Undo","Cut","Copy","Paste","Find","Mute","VolumeUp","VolumeDown",null,null,null,"Keypad ,","Keypad = (AS400)",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"AltErase","SysReq","Cancel","Clear","Prior","Enter","Separator","Out","Oper","Clear / Again","CrSel","ExSel",null,null,null,null,null,null,null,null,null,null,null,"Keypad 00","Keypad 000","ThousandsSeparator","DecimalSeparator","CurrencyUnit","CurrencySubUnit","Keypad (","Keypad )","Keypad {","Keypad }","Keypad Tab","Keypad Backspace","Keypad A","Keypad B","Keypad C","Keypad D","Keypad E","Keypad F","Keypad XOR","Keypad ^","Keypad %","Keypad <","Keypad >","Keypad &","Keypad &&","Keypad |","Keypad ||","Keypad :","Keypad #","Keypad Space","Keypad @","Keypad !","Keypad MemStore","Keypad MemRecall","Keypad MemClear","Keypad MemAdd","Keypad MemSubtract","Keypad MemMultiply","Keypad MemDivide","Keypad +/-","Keypad Clear","Keypad ClearEntry","Keypad Binary","Keypad Octal","Keypad Decimal","Keypad Hexadecimal",null,null,"Left Ctrl","Left Shift","Left Alt","Left Meta","Right Ctrl","Right Shift","Right Alt","Right Meta",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"ModeSwitch","AudioNext","AudioPrev","AudioStop","AudioPlay","AudioMute","MediaSelect","WWW","Mail","Calculator","Computer","AC Search","AC Home","AC Back","AC Forward","AC Stop","AC Refresh","AC Bookmarks","BrightnessDown","BrightnessUp","DisplaySwitch","KBDIllumToggle","KBDIllumDown","KBDIllumUp","Eject","Sleep"];
snow.system.input.Keycodes.unknown = 0;
snow.system.input.Keycodes.enter = 13;
snow.system.input.Keycodes.escape = 27;
snow.system.input.Keycodes.backspace = 8;
snow.system.input.Keycodes.tab = 9;
snow.system.input.Keycodes.space = 32;
snow.system.input.Keycodes.exclaim = 33;
snow.system.input.Keycodes.quotedbl = 34;
snow.system.input.Keycodes.hash = 35;
snow.system.input.Keycodes.percent = 37;
snow.system.input.Keycodes.dollar = 36;
snow.system.input.Keycodes.ampersand = 38;
snow.system.input.Keycodes.quote = 39;
snow.system.input.Keycodes.leftparen = 40;
snow.system.input.Keycodes.rightparen = 41;
snow.system.input.Keycodes.asterisk = 42;
snow.system.input.Keycodes.plus = 43;
snow.system.input.Keycodes.comma = 44;
snow.system.input.Keycodes.minus = 45;
snow.system.input.Keycodes.period = 46;
snow.system.input.Keycodes.slash = 47;
snow.system.input.Keycodes.key_0 = 48;
snow.system.input.Keycodes.key_1 = 49;
snow.system.input.Keycodes.key_2 = 50;
snow.system.input.Keycodes.key_3 = 51;
snow.system.input.Keycodes.key_4 = 52;
snow.system.input.Keycodes.key_5 = 53;
snow.system.input.Keycodes.key_6 = 54;
snow.system.input.Keycodes.key_7 = 55;
snow.system.input.Keycodes.key_8 = 56;
snow.system.input.Keycodes.key_9 = 57;
snow.system.input.Keycodes.colon = 58;
snow.system.input.Keycodes.semicolon = 59;
snow.system.input.Keycodes.less = 60;
snow.system.input.Keycodes.equals = 61;
snow.system.input.Keycodes.greater = 62;
snow.system.input.Keycodes.question = 63;
snow.system.input.Keycodes.at = 64;
snow.system.input.Keycodes.leftbracket = 91;
snow.system.input.Keycodes.backslash = 92;
snow.system.input.Keycodes.rightbracket = 93;
snow.system.input.Keycodes.caret = 94;
snow.system.input.Keycodes.underscore = 95;
snow.system.input.Keycodes.backquote = 96;
snow.system.input.Keycodes.key_a = 97;
snow.system.input.Keycodes.key_b = 98;
snow.system.input.Keycodes.key_c = 99;
snow.system.input.Keycodes.key_d = 100;
snow.system.input.Keycodes.key_e = 101;
snow.system.input.Keycodes.key_f = 102;
snow.system.input.Keycodes.key_g = 103;
snow.system.input.Keycodes.key_h = 104;
snow.system.input.Keycodes.key_i = 105;
snow.system.input.Keycodes.key_j = 106;
snow.system.input.Keycodes.key_k = 107;
snow.system.input.Keycodes.key_l = 108;
snow.system.input.Keycodes.key_m = 109;
snow.system.input.Keycodes.key_n = 110;
snow.system.input.Keycodes.key_o = 111;
snow.system.input.Keycodes.key_p = 112;
snow.system.input.Keycodes.key_q = 113;
snow.system.input.Keycodes.key_r = 114;
snow.system.input.Keycodes.key_s = 115;
snow.system.input.Keycodes.key_t = 116;
snow.system.input.Keycodes.key_u = 117;
snow.system.input.Keycodes.key_v = 118;
snow.system.input.Keycodes.key_w = 119;
snow.system.input.Keycodes.key_x = 120;
snow.system.input.Keycodes.key_y = 121;
snow.system.input.Keycodes.key_z = 122;
snow.system.input.Keycodes.capslock = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.capslock);
snow.system.input.Keycodes.f1 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f1);
snow.system.input.Keycodes.f2 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f2);
snow.system.input.Keycodes.f3 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f3);
snow.system.input.Keycodes.f4 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f4);
snow.system.input.Keycodes.f5 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f5);
snow.system.input.Keycodes.f6 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f6);
snow.system.input.Keycodes.f7 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f7);
snow.system.input.Keycodes.f8 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f8);
snow.system.input.Keycodes.f9 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f9);
snow.system.input.Keycodes.f10 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f10);
snow.system.input.Keycodes.f11 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f11);
snow.system.input.Keycodes.f12 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f12);
snow.system.input.Keycodes.printscreen = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.printscreen);
snow.system.input.Keycodes.scrolllock = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.scrolllock);
snow.system.input.Keycodes.pause = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.pause);
snow.system.input.Keycodes.insert = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.insert);
snow.system.input.Keycodes.home = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.home);
snow.system.input.Keycodes.pageup = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.pageup);
snow.system.input.Keycodes["delete"] = 127;
snow.system.input.Keycodes.end = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.end);
snow.system.input.Keycodes.pagedown = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.pagedown);
snow.system.input.Keycodes.right = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.right);
snow.system.input.Keycodes.left = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.left);
snow.system.input.Keycodes.down = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.down);
snow.system.input.Keycodes.up = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.up);
snow.system.input.Keycodes.numlockclear = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.numlockclear);
snow.system.input.Keycodes.kp_divide = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_divide);
snow.system.input.Keycodes.kp_multiply = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_multiply);
snow.system.input.Keycodes.kp_minus = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_minus);
snow.system.input.Keycodes.kp_plus = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_plus);
snow.system.input.Keycodes.kp_enter = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_enter);
snow.system.input.Keycodes.kp_1 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_1);
snow.system.input.Keycodes.kp_2 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_2);
snow.system.input.Keycodes.kp_3 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_3);
snow.system.input.Keycodes.kp_4 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_4);
snow.system.input.Keycodes.kp_5 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_5);
snow.system.input.Keycodes.kp_6 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_6);
snow.system.input.Keycodes.kp_7 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_7);
snow.system.input.Keycodes.kp_8 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_8);
snow.system.input.Keycodes.kp_9 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_9);
snow.system.input.Keycodes.kp_0 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_0);
snow.system.input.Keycodes.kp_period = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_period);
snow.system.input.Keycodes.application = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.application);
snow.system.input.Keycodes.power = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.power);
snow.system.input.Keycodes.kp_equals = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_equals);
snow.system.input.Keycodes.f13 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f13);
snow.system.input.Keycodes.f14 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f14);
snow.system.input.Keycodes.f15 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f15);
snow.system.input.Keycodes.f16 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f16);
snow.system.input.Keycodes.f17 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f17);
snow.system.input.Keycodes.f18 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f18);
snow.system.input.Keycodes.f19 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f19);
snow.system.input.Keycodes.f20 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f20);
snow.system.input.Keycodes.f21 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f21);
snow.system.input.Keycodes.f22 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f22);
snow.system.input.Keycodes.f23 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f23);
snow.system.input.Keycodes.f24 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.f24);
snow.system.input.Keycodes.execute = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.execute);
snow.system.input.Keycodes.help = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.help);
snow.system.input.Keycodes.menu = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.menu);
snow.system.input.Keycodes.select = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.select);
snow.system.input.Keycodes.stop = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.stop);
snow.system.input.Keycodes.again = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.again);
snow.system.input.Keycodes.undo = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.undo);
snow.system.input.Keycodes.cut = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.cut);
snow.system.input.Keycodes.copy = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.copy);
snow.system.input.Keycodes.paste = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.paste);
snow.system.input.Keycodes.find = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.find);
snow.system.input.Keycodes.mute = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.mute);
snow.system.input.Keycodes.volumeup = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.volumeup);
snow.system.input.Keycodes.volumedown = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.volumedown);
snow.system.input.Keycodes.kp_comma = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_comma);
snow.system.input.Keycodes.kp_equalsas400 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_equalsas400);
snow.system.input.Keycodes.alterase = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.alterase);
snow.system.input.Keycodes.sysreq = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.sysreq);
snow.system.input.Keycodes.cancel = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.cancel);
snow.system.input.Keycodes.clear = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.clear);
snow.system.input.Keycodes.prior = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.prior);
snow.system.input.Keycodes.return2 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.return2);
snow.system.input.Keycodes.separator = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.separator);
snow.system.input.Keycodes.out = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.out);
snow.system.input.Keycodes.oper = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.oper);
snow.system.input.Keycodes.clearagain = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.clearagain);
snow.system.input.Keycodes.crsel = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.crsel);
snow.system.input.Keycodes.exsel = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.exsel);
snow.system.input.Keycodes.kp_00 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_00);
snow.system.input.Keycodes.kp_000 = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_000);
snow.system.input.Keycodes.thousandsseparator = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.thousandsseparator);
snow.system.input.Keycodes.decimalseparator = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.decimalseparator);
snow.system.input.Keycodes.currencyunit = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.currencyunit);
snow.system.input.Keycodes.currencysubunit = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.currencysubunit);
snow.system.input.Keycodes.kp_leftparen = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_leftparen);
snow.system.input.Keycodes.kp_rightparen = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_rightparen);
snow.system.input.Keycodes.kp_leftbrace = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_leftbrace);
snow.system.input.Keycodes.kp_rightbrace = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_rightbrace);
snow.system.input.Keycodes.kp_tab = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_tab);
snow.system.input.Keycodes.kp_backspace = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_backspace);
snow.system.input.Keycodes.kp_a = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_a);
snow.system.input.Keycodes.kp_b = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_b);
snow.system.input.Keycodes.kp_c = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_c);
snow.system.input.Keycodes.kp_d = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_d);
snow.system.input.Keycodes.kp_e = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_e);
snow.system.input.Keycodes.kp_f = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_f);
snow.system.input.Keycodes.kp_xor = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_xor);
snow.system.input.Keycodes.kp_power = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_power);
snow.system.input.Keycodes.kp_percent = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_percent);
snow.system.input.Keycodes.kp_less = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_less);
snow.system.input.Keycodes.kp_greater = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_greater);
snow.system.input.Keycodes.kp_ampersand = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_ampersand);
snow.system.input.Keycodes.kp_dblampersand = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_dblampersand);
snow.system.input.Keycodes.kp_verticalbar = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_verticalbar);
snow.system.input.Keycodes.kp_dblverticalbar = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_dblverticalbar);
snow.system.input.Keycodes.kp_colon = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_colon);
snow.system.input.Keycodes.kp_hash = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_hash);
snow.system.input.Keycodes.kp_space = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_space);
snow.system.input.Keycodes.kp_at = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_at);
snow.system.input.Keycodes.kp_exclam = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_exclam);
snow.system.input.Keycodes.kp_memstore = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_memstore);
snow.system.input.Keycodes.kp_memrecall = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_memrecall);
snow.system.input.Keycodes.kp_memclear = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_memclear);
snow.system.input.Keycodes.kp_memadd = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_memadd);
snow.system.input.Keycodes.kp_memsubtract = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_memsubtract);
snow.system.input.Keycodes.kp_memmultiply = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_memmultiply);
snow.system.input.Keycodes.kp_memdivide = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_memdivide);
snow.system.input.Keycodes.kp_plusminus = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_plusminus);
snow.system.input.Keycodes.kp_clear = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_clear);
snow.system.input.Keycodes.kp_clearentry = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_clearentry);
snow.system.input.Keycodes.kp_binary = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_binary);
snow.system.input.Keycodes.kp_octal = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_octal);
snow.system.input.Keycodes.kp_decimal = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_decimal);
snow.system.input.Keycodes.kp_hexadecimal = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kp_hexadecimal);
snow.system.input.Keycodes.lctrl = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.lctrl);
snow.system.input.Keycodes.lshift = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.lshift);
snow.system.input.Keycodes.lalt = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.lalt);
snow.system.input.Keycodes.lmeta = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.lmeta);
snow.system.input.Keycodes.rctrl = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.rctrl);
snow.system.input.Keycodes.rshift = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.rshift);
snow.system.input.Keycodes.ralt = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.ralt);
snow.system.input.Keycodes.rmeta = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.rmeta);
snow.system.input.Keycodes.mode = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.mode);
snow.system.input.Keycodes.audionext = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.audionext);
snow.system.input.Keycodes.audioprev = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.audioprev);
snow.system.input.Keycodes.audiostop = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.audiostop);
snow.system.input.Keycodes.audioplay = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.audioplay);
snow.system.input.Keycodes.audiomute = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.audiomute);
snow.system.input.Keycodes.mediaselect = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.mediaselect);
snow.system.input.Keycodes.www = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.www);
snow.system.input.Keycodes.mail = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.mail);
snow.system.input.Keycodes.calculator = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.calculator);
snow.system.input.Keycodes.computer = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.computer);
snow.system.input.Keycodes.ac_search = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.ac_search);
snow.system.input.Keycodes.ac_home = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.ac_home);
snow.system.input.Keycodes.ac_back = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.ac_back);
snow.system.input.Keycodes.ac_forward = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.ac_forward);
snow.system.input.Keycodes.ac_stop = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.ac_stop);
snow.system.input.Keycodes.ac_refresh = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.ac_refresh);
snow.system.input.Keycodes.ac_bookmarks = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.ac_bookmarks);
snow.system.input.Keycodes.brightnessdown = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.brightnessdown);
snow.system.input.Keycodes.brightnessup = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.brightnessup);
snow.system.input.Keycodes.displayswitch = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.displayswitch);
snow.system.input.Keycodes.kbdillumtoggle = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kbdillumtoggle);
snow.system.input.Keycodes.kbdillumdown = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kbdillumdown);
snow.system.input.Keycodes.kbdillumup = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.kbdillumup);
snow.system.input.Keycodes.eject = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.eject);
snow.system.input.Keycodes.sleep = snow.system.input.Keycodes.from_scan(snow.system.input.Scancodes.sleep);
snow.core.web.input.Input._keypress_blacklist = [snow.system.input.Keycodes.backspace,snow.system.input.Keycodes.enter];
snow.modules.opengl.web.GL.DEPTH_BUFFER_BIT = 256;
snow.modules.opengl.web.GL.STENCIL_BUFFER_BIT = 1024;
snow.modules.opengl.web.GL.COLOR_BUFFER_BIT = 16384;
snow.modules.opengl.web.GL.POINTS = 0;
snow.modules.opengl.web.GL.LINES = 1;
snow.modules.opengl.web.GL.LINE_LOOP = 2;
snow.modules.opengl.web.GL.LINE_STRIP = 3;
snow.modules.opengl.web.GL.TRIANGLES = 4;
snow.modules.opengl.web.GL.TRIANGLE_STRIP = 5;
snow.modules.opengl.web.GL.TRIANGLE_FAN = 6;
snow.modules.opengl.web.GL.ZERO = 0;
snow.modules.opengl.web.GL.ONE = 1;
snow.modules.opengl.web.GL.SRC_COLOR = 768;
snow.modules.opengl.web.GL.ONE_MINUS_SRC_COLOR = 769;
snow.modules.opengl.web.GL.SRC_ALPHA = 770;
snow.modules.opengl.web.GL.ONE_MINUS_SRC_ALPHA = 771;
snow.modules.opengl.web.GL.DST_ALPHA = 772;
snow.modules.opengl.web.GL.ONE_MINUS_DST_ALPHA = 773;
snow.modules.opengl.web.GL.DST_COLOR = 774;
snow.modules.opengl.web.GL.ONE_MINUS_DST_COLOR = 775;
snow.modules.opengl.web.GL.SRC_ALPHA_SATURATE = 776;
snow.modules.opengl.web.GL.FUNC_ADD = 32774;
snow.modules.opengl.web.GL.BLEND_EQUATION = 32777;
snow.modules.opengl.web.GL.BLEND_EQUATION_RGB = 32777;
snow.modules.opengl.web.GL.BLEND_EQUATION_ALPHA = 34877;
snow.modules.opengl.web.GL.FUNC_SUBTRACT = 32778;
snow.modules.opengl.web.GL.FUNC_REVERSE_SUBTRACT = 32779;
snow.modules.opengl.web.GL.BLEND_DST_RGB = 32968;
snow.modules.opengl.web.GL.BLEND_SRC_RGB = 32969;
snow.modules.opengl.web.GL.BLEND_DST_ALPHA = 32970;
snow.modules.opengl.web.GL.BLEND_SRC_ALPHA = 32971;
snow.modules.opengl.web.GL.CONSTANT_COLOR = 32769;
snow.modules.opengl.web.GL.ONE_MINUS_CONSTANT_COLOR = 32770;
snow.modules.opengl.web.GL.CONSTANT_ALPHA = 32771;
snow.modules.opengl.web.GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
snow.modules.opengl.web.GL.BLEND_COLOR = 32773;
snow.modules.opengl.web.GL.ARRAY_BUFFER = 34962;
snow.modules.opengl.web.GL.ELEMENT_ARRAY_BUFFER = 34963;
snow.modules.opengl.web.GL.ARRAY_BUFFER_BINDING = 34964;
snow.modules.opengl.web.GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
snow.modules.opengl.web.GL.STREAM_DRAW = 35040;
snow.modules.opengl.web.GL.STATIC_DRAW = 35044;
snow.modules.opengl.web.GL.DYNAMIC_DRAW = 35048;
snow.modules.opengl.web.GL.BUFFER_SIZE = 34660;
snow.modules.opengl.web.GL.BUFFER_USAGE = 34661;
snow.modules.opengl.web.GL.CURRENT_VERTEX_ATTRIB = 34342;
snow.modules.opengl.web.GL.FRONT = 1028;
snow.modules.opengl.web.GL.BACK = 1029;
snow.modules.opengl.web.GL.FRONT_AND_BACK = 1032;
snow.modules.opengl.web.GL.CULL_FACE = 2884;
snow.modules.opengl.web.GL.BLEND = 3042;
snow.modules.opengl.web.GL.DITHER = 3024;
snow.modules.opengl.web.GL.STENCIL_TEST = 2960;
snow.modules.opengl.web.GL.DEPTH_TEST = 2929;
snow.modules.opengl.web.GL.SCISSOR_TEST = 3089;
snow.modules.opengl.web.GL.POLYGON_OFFSET_FILL = 32823;
snow.modules.opengl.web.GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
snow.modules.opengl.web.GL.SAMPLE_COVERAGE = 32928;
snow.modules.opengl.web.GL.NO_ERROR = 0;
snow.modules.opengl.web.GL.INVALID_ENUM = 1280;
snow.modules.opengl.web.GL.INVALID_VALUE = 1281;
snow.modules.opengl.web.GL.INVALID_OPERATION = 1282;
snow.modules.opengl.web.GL.OUT_OF_MEMORY = 1285;
snow.modules.opengl.web.GL.CW = 2304;
snow.modules.opengl.web.GL.CCW = 2305;
snow.modules.opengl.web.GL.LINE_WIDTH = 2849;
snow.modules.opengl.web.GL.ALIASED_POINT_SIZE_RANGE = 33901;
snow.modules.opengl.web.GL.ALIASED_LINE_WIDTH_RANGE = 33902;
snow.modules.opengl.web.GL.CULL_FACE_MODE = 2885;
snow.modules.opengl.web.GL.FRONT_FACE = 2886;
snow.modules.opengl.web.GL.DEPTH_RANGE = 2928;
snow.modules.opengl.web.GL.DEPTH_WRITEMASK = 2930;
snow.modules.opengl.web.GL.DEPTH_CLEAR_VALUE = 2931;
snow.modules.opengl.web.GL.DEPTH_FUNC = 2932;
snow.modules.opengl.web.GL.STENCIL_CLEAR_VALUE = 2961;
snow.modules.opengl.web.GL.STENCIL_FUNC = 2962;
snow.modules.opengl.web.GL.STENCIL_FAIL = 2964;
snow.modules.opengl.web.GL.STENCIL_PASS_DEPTH_FAIL = 2965;
snow.modules.opengl.web.GL.STENCIL_PASS_DEPTH_PASS = 2966;
snow.modules.opengl.web.GL.STENCIL_REF = 2967;
snow.modules.opengl.web.GL.STENCIL_VALUE_MASK = 2963;
snow.modules.opengl.web.GL.STENCIL_WRITEMASK = 2968;
snow.modules.opengl.web.GL.STENCIL_BACK_FUNC = 34816;
snow.modules.opengl.web.GL.STENCIL_BACK_FAIL = 34817;
snow.modules.opengl.web.GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
snow.modules.opengl.web.GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
snow.modules.opengl.web.GL.STENCIL_BACK_REF = 36003;
snow.modules.opengl.web.GL.STENCIL_BACK_VALUE_MASK = 36004;
snow.modules.opengl.web.GL.STENCIL_BACK_WRITEMASK = 36005;
snow.modules.opengl.web.GL.VIEWPORT = 2978;
snow.modules.opengl.web.GL.SCISSOR_BOX = 3088;
snow.modules.opengl.web.GL.COLOR_CLEAR_VALUE = 3106;
snow.modules.opengl.web.GL.COLOR_WRITEMASK = 3107;
snow.modules.opengl.web.GL.UNPACK_ALIGNMENT = 3317;
snow.modules.opengl.web.GL.PACK_ALIGNMENT = 3333;
snow.modules.opengl.web.GL.MAX_TEXTURE_SIZE = 3379;
snow.modules.opengl.web.GL.MAX_VIEWPORT_DIMS = 3386;
snow.modules.opengl.web.GL.SUBPIXEL_BITS = 3408;
snow.modules.opengl.web.GL.RED_BITS = 3410;
snow.modules.opengl.web.GL.GREEN_BITS = 3411;
snow.modules.opengl.web.GL.BLUE_BITS = 3412;
snow.modules.opengl.web.GL.ALPHA_BITS = 3413;
snow.modules.opengl.web.GL.DEPTH_BITS = 3414;
snow.modules.opengl.web.GL.STENCIL_BITS = 3415;
snow.modules.opengl.web.GL.POLYGON_OFFSET_UNITS = 10752;
snow.modules.opengl.web.GL.POLYGON_OFFSET_FACTOR = 32824;
snow.modules.opengl.web.GL.TEXTURE_BINDING_2D = 32873;
snow.modules.opengl.web.GL.SAMPLE_BUFFERS = 32936;
snow.modules.opengl.web.GL.SAMPLES = 32937;
snow.modules.opengl.web.GL.SAMPLE_COVERAGE_VALUE = 32938;
snow.modules.opengl.web.GL.SAMPLE_COVERAGE_INVERT = 32939;
snow.modules.opengl.web.GL.COMPRESSED_TEXTURE_FORMATS = 34467;
snow.modules.opengl.web.GL.DONT_CARE = 4352;
snow.modules.opengl.web.GL.FASTEST = 4353;
snow.modules.opengl.web.GL.NICEST = 4354;
snow.modules.opengl.web.GL.GENERATE_MIPMAP_HINT = 33170;
snow.modules.opengl.web.GL.BYTE = 5120;
snow.modules.opengl.web.GL.UNSIGNED_BYTE = 5121;
snow.modules.opengl.web.GL.SHORT = 5122;
snow.modules.opengl.web.GL.UNSIGNED_SHORT = 5123;
snow.modules.opengl.web.GL.INT = 5124;
snow.modules.opengl.web.GL.UNSIGNED_INT = 5125;
snow.modules.opengl.web.GL.FLOAT = 5126;
snow.modules.opengl.web.GL.DEPTH_COMPONENT = 6402;
snow.modules.opengl.web.GL.ALPHA = 6406;
snow.modules.opengl.web.GL.RGB = 6407;
snow.modules.opengl.web.GL.RGBA = 6408;
snow.modules.opengl.web.GL.LUMINANCE = 6409;
snow.modules.opengl.web.GL.LUMINANCE_ALPHA = 6410;
snow.modules.opengl.web.GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
snow.modules.opengl.web.GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
snow.modules.opengl.web.GL.UNSIGNED_SHORT_5_6_5 = 33635;
snow.modules.opengl.web.GL.FRAGMENT_SHADER = 35632;
snow.modules.opengl.web.GL.VERTEX_SHADER = 35633;
snow.modules.opengl.web.GL.MAX_VERTEX_ATTRIBS = 34921;
snow.modules.opengl.web.GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
snow.modules.opengl.web.GL.MAX_VARYING_VECTORS = 36348;
snow.modules.opengl.web.GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
snow.modules.opengl.web.GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
snow.modules.opengl.web.GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
snow.modules.opengl.web.GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
snow.modules.opengl.web.GL.SHADER_TYPE = 35663;
snow.modules.opengl.web.GL.DELETE_STATUS = 35712;
snow.modules.opengl.web.GL.LINK_STATUS = 35714;
snow.modules.opengl.web.GL.VALIDATE_STATUS = 35715;
snow.modules.opengl.web.GL.ATTACHED_SHADERS = 35717;
snow.modules.opengl.web.GL.ACTIVE_UNIFORMS = 35718;
snow.modules.opengl.web.GL.ACTIVE_ATTRIBUTES = 35721;
snow.modules.opengl.web.GL.SHADING_LANGUAGE_VERSION = 35724;
snow.modules.opengl.web.GL.CURRENT_PROGRAM = 35725;
snow.modules.opengl.web.GL.NEVER = 512;
snow.modules.opengl.web.GL.LESS = 513;
snow.modules.opengl.web.GL.EQUAL = 514;
snow.modules.opengl.web.GL.LEQUAL = 515;
snow.modules.opengl.web.GL.GREATER = 516;
snow.modules.opengl.web.GL.NOTEQUAL = 517;
snow.modules.opengl.web.GL.GEQUAL = 518;
snow.modules.opengl.web.GL.ALWAYS = 519;
snow.modules.opengl.web.GL.KEEP = 7680;
snow.modules.opengl.web.GL.REPLACE = 7681;
snow.modules.opengl.web.GL.INCR = 7682;
snow.modules.opengl.web.GL.DECR = 7683;
snow.modules.opengl.web.GL.INVERT = 5386;
snow.modules.opengl.web.GL.INCR_WRAP = 34055;
snow.modules.opengl.web.GL.DECR_WRAP = 34056;
snow.modules.opengl.web.GL.VENDOR = 7936;
snow.modules.opengl.web.GL.RENDERER = 7937;
snow.modules.opengl.web.GL.VERSION = 7938;
snow.modules.opengl.web.GL.NEAREST = 9728;
snow.modules.opengl.web.GL.LINEAR = 9729;
snow.modules.opengl.web.GL.NEAREST_MIPMAP_NEAREST = 9984;
snow.modules.opengl.web.GL.LINEAR_MIPMAP_NEAREST = 9985;
snow.modules.opengl.web.GL.NEAREST_MIPMAP_LINEAR = 9986;
snow.modules.opengl.web.GL.LINEAR_MIPMAP_LINEAR = 9987;
snow.modules.opengl.web.GL.TEXTURE_MAG_FILTER = 10240;
snow.modules.opengl.web.GL.TEXTURE_MIN_FILTER = 10241;
snow.modules.opengl.web.GL.TEXTURE_WRAP_S = 10242;
snow.modules.opengl.web.GL.TEXTURE_WRAP_T = 10243;
snow.modules.opengl.web.GL.TEXTURE_2D = 3553;
snow.modules.opengl.web.GL.TEXTURE = 5890;
snow.modules.opengl.web.GL.TEXTURE_CUBE_MAP = 34067;
snow.modules.opengl.web.GL.TEXTURE_BINDING_CUBE_MAP = 34068;
snow.modules.opengl.web.GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
snow.modules.opengl.web.GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
snow.modules.opengl.web.GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
snow.modules.opengl.web.GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
snow.modules.opengl.web.GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
snow.modules.opengl.web.GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
snow.modules.opengl.web.GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
snow.modules.opengl.web.GL.TEXTURE0 = 33984;
snow.modules.opengl.web.GL.TEXTURE1 = 33985;
snow.modules.opengl.web.GL.TEXTURE2 = 33986;
snow.modules.opengl.web.GL.TEXTURE3 = 33987;
snow.modules.opengl.web.GL.TEXTURE4 = 33988;
snow.modules.opengl.web.GL.TEXTURE5 = 33989;
snow.modules.opengl.web.GL.TEXTURE6 = 33990;
snow.modules.opengl.web.GL.TEXTURE7 = 33991;
snow.modules.opengl.web.GL.TEXTURE8 = 33992;
snow.modules.opengl.web.GL.TEXTURE9 = 33993;
snow.modules.opengl.web.GL.TEXTURE10 = 33994;
snow.modules.opengl.web.GL.TEXTURE11 = 33995;
snow.modules.opengl.web.GL.TEXTURE12 = 33996;
snow.modules.opengl.web.GL.TEXTURE13 = 33997;
snow.modules.opengl.web.GL.TEXTURE14 = 33998;
snow.modules.opengl.web.GL.TEXTURE15 = 33999;
snow.modules.opengl.web.GL.TEXTURE16 = 34000;
snow.modules.opengl.web.GL.TEXTURE17 = 34001;
snow.modules.opengl.web.GL.TEXTURE18 = 34002;
snow.modules.opengl.web.GL.TEXTURE19 = 34003;
snow.modules.opengl.web.GL.TEXTURE20 = 34004;
snow.modules.opengl.web.GL.TEXTURE21 = 34005;
snow.modules.opengl.web.GL.TEXTURE22 = 34006;
snow.modules.opengl.web.GL.TEXTURE23 = 34007;
snow.modules.opengl.web.GL.TEXTURE24 = 34008;
snow.modules.opengl.web.GL.TEXTURE25 = 34009;
snow.modules.opengl.web.GL.TEXTURE26 = 34010;
snow.modules.opengl.web.GL.TEXTURE27 = 34011;
snow.modules.opengl.web.GL.TEXTURE28 = 34012;
snow.modules.opengl.web.GL.TEXTURE29 = 34013;
snow.modules.opengl.web.GL.TEXTURE30 = 34014;
snow.modules.opengl.web.GL.TEXTURE31 = 34015;
snow.modules.opengl.web.GL.ACTIVE_TEXTURE = 34016;
snow.modules.opengl.web.GL.REPEAT = 10497;
snow.modules.opengl.web.GL.CLAMP_TO_EDGE = 33071;
snow.modules.opengl.web.GL.MIRRORED_REPEAT = 33648;
snow.modules.opengl.web.GL.FLOAT_VEC2 = 35664;
snow.modules.opengl.web.GL.FLOAT_VEC3 = 35665;
snow.modules.opengl.web.GL.FLOAT_VEC4 = 35666;
snow.modules.opengl.web.GL.INT_VEC2 = 35667;
snow.modules.opengl.web.GL.INT_VEC3 = 35668;
snow.modules.opengl.web.GL.INT_VEC4 = 35669;
snow.modules.opengl.web.GL.BOOL = 35670;
snow.modules.opengl.web.GL.BOOL_VEC2 = 35671;
snow.modules.opengl.web.GL.BOOL_VEC3 = 35672;
snow.modules.opengl.web.GL.BOOL_VEC4 = 35673;
snow.modules.opengl.web.GL.FLOAT_MAT2 = 35674;
snow.modules.opengl.web.GL.FLOAT_MAT3 = 35675;
snow.modules.opengl.web.GL.FLOAT_MAT4 = 35676;
snow.modules.opengl.web.GL.SAMPLER_2D = 35678;
snow.modules.opengl.web.GL.SAMPLER_CUBE = 35680;
snow.modules.opengl.web.GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
snow.modules.opengl.web.GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
snow.modules.opengl.web.GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
snow.modules.opengl.web.GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
snow.modules.opengl.web.GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
snow.modules.opengl.web.GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
snow.modules.opengl.web.GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
snow.modules.opengl.web.GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
snow.modules.opengl.web.GL.POINT_SPRITE = 34913;
snow.modules.opengl.web.GL.COMPILE_STATUS = 35713;
snow.modules.opengl.web.GL.LOW_FLOAT = 36336;
snow.modules.opengl.web.GL.MEDIUM_FLOAT = 36337;
snow.modules.opengl.web.GL.HIGH_FLOAT = 36338;
snow.modules.opengl.web.GL.LOW_INT = 36339;
snow.modules.opengl.web.GL.MEDIUM_INT = 36340;
snow.modules.opengl.web.GL.HIGH_INT = 36341;
snow.modules.opengl.web.GL.FRAMEBUFFER = 36160;
snow.modules.opengl.web.GL.RENDERBUFFER = 36161;
snow.modules.opengl.web.GL.RGBA4 = 32854;
snow.modules.opengl.web.GL.RGB5_A1 = 32855;
snow.modules.opengl.web.GL.RGB565 = 36194;
snow.modules.opengl.web.GL.DEPTH_COMPONENT16 = 33189;
snow.modules.opengl.web.GL.STENCIL_INDEX = 6401;
snow.modules.opengl.web.GL.STENCIL_INDEX8 = 36168;
snow.modules.opengl.web.GL.DEPTH_STENCIL = 34041;
snow.modules.opengl.web.GL.RENDERBUFFER_WIDTH = 36162;
snow.modules.opengl.web.GL.RENDERBUFFER_HEIGHT = 36163;
snow.modules.opengl.web.GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
snow.modules.opengl.web.GL.RENDERBUFFER_RED_SIZE = 36176;
snow.modules.opengl.web.GL.RENDERBUFFER_GREEN_SIZE = 36177;
snow.modules.opengl.web.GL.RENDERBUFFER_BLUE_SIZE = 36178;
snow.modules.opengl.web.GL.RENDERBUFFER_ALPHA_SIZE = 36179;
snow.modules.opengl.web.GL.RENDERBUFFER_DEPTH_SIZE = 36180;
snow.modules.opengl.web.GL.RENDERBUFFER_STENCIL_SIZE = 36181;
snow.modules.opengl.web.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
snow.modules.opengl.web.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
snow.modules.opengl.web.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
snow.modules.opengl.web.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
snow.modules.opengl.web.GL.COLOR_ATTACHMENT0 = 36064;
snow.modules.opengl.web.GL.DEPTH_ATTACHMENT = 36096;
snow.modules.opengl.web.GL.STENCIL_ATTACHMENT = 36128;
snow.modules.opengl.web.GL.DEPTH_STENCIL_ATTACHMENT = 33306;
snow.modules.opengl.web.GL.NONE = 0;
snow.modules.opengl.web.GL.FRAMEBUFFER_COMPLETE = 36053;
snow.modules.opengl.web.GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
snow.modules.opengl.web.GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
snow.modules.opengl.web.GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
snow.modules.opengl.web.GL.FRAMEBUFFER_UNSUPPORTED = 36061;
snow.modules.opengl.web.GL.FRAMEBUFFER_BINDING = 36006;
snow.modules.opengl.web.GL.RENDERBUFFER_BINDING = 36007;
snow.modules.opengl.web.GL.MAX_RENDERBUFFER_SIZE = 34024;
snow.modules.opengl.web.GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
snow.modules.opengl.web.GL.UNPACK_FLIP_Y_WEBGL = 37440;
snow.modules.opengl.web.GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
snow.modules.opengl.web.GL.CONTEXT_LOST_WEBGL = 37442;
snow.modules.opengl.web.GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
snow.modules.opengl.web.GL.BROWSER_DEFAULT_WEBGL = 37444;
snow.system.audio.Audio.splitter = " • ";
snow.types._Types.Platform_Impl_.platform_windows = "windows";
snow.types._Types.Platform_Impl_.platform_mac = "mac";
snow.types._Types.Platform_Impl_.platform_linux = "linux";
snow.types._Types.Platform_Impl_.platform_android = "android";
snow.types._Types.Platform_Impl_.platform_ios = "ios";
snow.types._Types.Platform_Impl_.platform_web = "web";
snow.types._Types.AssetType_Impl_.unknown = 0;
snow.types._Types.AssetType_Impl_.bytes = 1;
snow.types._Types.AssetType_Impl_.text = 2;
snow.types._Types.AssetType_Impl_.json = 3;
snow.types._Types.AssetType_Impl_.image = 4;
snow.types._Types.AssetType_Impl_.audio = 5;
snow.types._Types.AudioFormatType_Impl_.unknown = 0;
snow.types._Types.AudioFormatType_Impl_.ogg = 1;
snow.types._Types.AudioFormatType_Impl_.wav = 2;
snow.types._Types.AudioFormatType_Impl_.pcm = 3;
snow.types._Types.OpenGLProfile_Impl_.compatibility = 0;
snow.types._Types.OpenGLProfile_Impl_.core = 1;
snow.types._Types.TextEventType_Impl_.unknown = 0;
snow.types._Types.TextEventType_Impl_.edit = 1;
snow.types._Types.TextEventType_Impl_.input = 2;
snow.types._Types.GamepadDeviceEventType_Impl_.unknown = 0;
snow.types._Types.GamepadDeviceEventType_Impl_.device_added = 1;
snow.types._Types.GamepadDeviceEventType_Impl_.device_removed = 2;
snow.types._Types.GamepadDeviceEventType_Impl_.device_remapped = 3;
snow.types._Types.SystemEventType_Impl_.unknown = 0;
snow.types._Types.SystemEventType_Impl_.init = 1;
snow.types._Types.SystemEventType_Impl_.ready = 2;
snow.types._Types.SystemEventType_Impl_.update = 3;
snow.types._Types.SystemEventType_Impl_.shutdown = 4;
snow.types._Types.SystemEventType_Impl_.window = 5;
snow.types._Types.SystemEventType_Impl_.input = 6;
snow.types._Types.SystemEventType_Impl_.quit = 7;
snow.types._Types.SystemEventType_Impl_.app_terminating = 8;
snow.types._Types.SystemEventType_Impl_.app_lowmemory = 9;
snow.types._Types.SystemEventType_Impl_.app_willenterbackground = 10;
snow.types._Types.SystemEventType_Impl_.app_didenterbackground = 11;
snow.types._Types.SystemEventType_Impl_.app_willenterforeground = 12;
snow.types._Types.SystemEventType_Impl_.app_didenterforeground = 13;
snow.types._Types.SystemEventType_Impl_.file = 14;
snow.types._Types.WindowEventType_Impl_.unknown = 0;
snow.types._Types.WindowEventType_Impl_.created = 1;
snow.types._Types.WindowEventType_Impl_.shown = 2;
snow.types._Types.WindowEventType_Impl_.hidden = 3;
snow.types._Types.WindowEventType_Impl_.exposed = 4;
snow.types._Types.WindowEventType_Impl_.moved = 5;
snow.types._Types.WindowEventType_Impl_.resized = 6;
snow.types._Types.WindowEventType_Impl_.size_changed = 7;
snow.types._Types.WindowEventType_Impl_.minimized = 8;
snow.types._Types.WindowEventType_Impl_.maximized = 9;
snow.types._Types.WindowEventType_Impl_.restored = 10;
snow.types._Types.WindowEventType_Impl_.enter = 11;
snow.types._Types.WindowEventType_Impl_.leave = 12;
snow.types._Types.WindowEventType_Impl_.focus_gained = 13;
snow.types._Types.WindowEventType_Impl_.focus_lost = 14;
snow.types._Types.WindowEventType_Impl_.close = 15;
snow.types._Types.WindowEventType_Impl_.destroy = 16;
snow.types._Types.InputEventType_Impl_.unknown = 0;
snow.types._Types.InputEventType_Impl_.key = 1;
snow.types._Types.InputEventType_Impl_.mouse = 2;
snow.types._Types.InputEventType_Impl_.touch = 3;
snow.types._Types.InputEventType_Impl_.joystick = 4;
snow.types._Types.InputEventType_Impl_.controller = 5;
snow.types._Types.FileEventType_Impl_.unknown = 0;
snow.types._Types.FileEventType_Impl_.modify = 1;
snow.types._Types.FileEventType_Impl_.remove = 2;
snow.types._Types.FileEventType_Impl_.create = 3;
snow.types._Types.FileEventType_Impl_.drop = 4;
LuxeApp.main();
})();