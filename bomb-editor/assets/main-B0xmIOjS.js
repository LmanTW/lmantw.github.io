(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const d of n)if(d.type==="childList")for(const a of d.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const d={};return n.integrity&&(d.integrity=n.integrity),n.referrerPolicy&&(d.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?d.credentials="include":n.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(n){if(n.ep)return;n.ep=!0;const d=i(n);fetch(n.href,d)}})();const b={file_name:"level.json"};class m{static load(){const e=document.createElement("input");e.type="file",e.accept=".json",e.addEventListener("change",()=>{const i=new FileReader;i.addEventListener("load",()=>{try{const r=JSON.parse(i.result);if(r.rules===void 0||r.map===void 0)confirm("無法加載關卡 (錯誤的格式)");else if(r.file_name=e.files[0].name,r.rules.player_speed!==void 0&&this.set_property("player_speed",r.rules.player_speed),r.rules.player_bombs!==void 0&&this.set_property("player_bombs",r.rules.player_bombs),r.rules.bomb_countdown!==void 0&&this.set_property("bomb_countdown",r.rules.bomb_countdown),r.rules.bomb_explode_range!==void 0&&this.set_property("bomb_explode_range",r.rules.bomb_explode_range),r.map.width!==void 0&&this.set_property("map_width",r.map.width),r.map.height!==void 0&&this.set_property("map_height",r.map.height),s.clear(),r.map.tiles!==void 0)for(const n of r.map.tiles)s.set_tile(n.type,n.x,n.y)}catch{confirm("無法加載關卡 (無法解析 JSON)")}},{once:!0}),i.readAsText(e.files[0])}),e.click()}static save(){const e=URL.createObjectURL(new Blob([JSON.stringify({rules:{player_speed:this.get_property("player_speed"),player_bombs:this.get_property("player_bombs"),bomb_countdown:this.get_property("bomb_countdown"),bomb_explode_range:this.get_property("bomb_explode_range")},map:{width:this.get_property("map_width"),height:this.get_property("map_height"),tiles:s.export_tiles()}},void 0,2)],{type:"application/json"})),i=document.createElement("a");i.href=e,i.download=b.file_name,i.click()}static get_property(e){if(p[e]===void 0)throw new Error(`Unknown property "${e}"!`);return p[e].value}static set_property(e,i){if(p[e]===void 0)throw new Error(`Unknown property "${e}"!`);const r=p[e];r.value=Math.max(r.min,Math.min(r.max,i)),r.input.value=r.value.toString(),(e==="map_width"||e==="map_height")&&s.resize(p.map_width.value,p.map_height.value)}}const p={player_speed:{input:document.getElementById("property-player-speed"),min:1,max:64,default:5,value:5},player_bombs:{input:document.getElementById("property-player-bombs"),min:1,max:64,default:2,value:2},bomb_countdown:{input:document.getElementById("property-bomb-countdown"),min:1,max:1024,default:150,value:150},bomb_explode_range:{input:document.getElementById("property-bomb-explode-range"),min:1,max:1024,default:125,value:125},map_width:{input:document.getElementById("property-map-width"),min:1,max:64,default:9,value:9},map_height:{input:document.getElementById("property-map-height"),min:1,max:64,default:5,value:5}};for(const o of Object.keys(p)){const e=p[o],i=e.input;i.value=e.default.toString(),i.addEventListener("change",()=>{/^\d+$/.test(i.value)?m.set_property(o,parseInt(i.value)):i.value=i.value.toString()}),i.addEventListener("keydown",r=>{r.key==="ArrowUp"?m.set_property(o,e.value+1):r.key==="ArrowDown"&&m.set_property(o,e.value-1)})}const v="/assets/tile_ground-CqO3eniT.png",x="/assets/tile_player-BC0wgStG.png",z="/assets/tile_barrel-CiYyJdmA.png",E="/assets/tile_rock-BbsIlq2a.png",t={width:0,height:0,tiles:[],tile_render_size:0,render_offset_x:0,render_offset_y:0};class s{static get width(){return t.width}static get height(){return t.height}static get tile_render_size(){return t.tile_render_size}static get render_offset_x(){return t.render_offset_x}static get render_offset_y(){return t.render_offset_y}static resize(e,i){const r=this.width,n=this.height,d=structuredClone(t.tiles);t.width=e,t.height=i,t.tiles=new Array(e*i).fill("empty");for(let a=0;a<e;a++)for(let u=0;u<i;u++)a<r&&u<n&&(t.tiles[a+u*e]=d[a+u*r])}static clear(){t.tiles=new Array(t.width*t.height).fill("empty")}static get_tile(e,i){const r=e+i*this.width;if(r<0||r>t.tiles.length)throw new Error(`Tile position ${e}, ${i} is out of bound! (${this.width}, ${this.height})`);return t.tiles[r]}static set_tile(e,i,r){const n=i+r*this.width;if(c[e]===void 0&&e!=="empty")throw new Error(`Tile type "${e}" not found! (${i}, ${r})`);if(n<0||n>t.tiles.length)throw new Error(`Tile position ${i}, ${r} is out of bound! (${this.width}, ${this.height})`);t.tiles[n]=e}static count_tile(e){let i=0;for(const r of t.tiles)r===e&&i++;return i}static export_tiles(){const e=[];for(let i=0;i<t.width;i++)for(let r=0;r<t.height;r++){const n=i+r*this.width;t.tiles[n]!=="empty"&&e.push({type:t.tiles[n],x:i,y:r})}return e}static render(e,i){e.width>e.height?t.tile_render_size=e.width/(t.width+1):t.tile_render_size=e.height/(t.height+1),t.tile_render_size*t.width>e.width?t.tile_render_size=e.width/(t.width+1):t.tile_render_size*t.height>e.height&&(t.tile_render_size=e.height/(t.height+1)),t.render_offset_x=e.width/2-t.width*t.tile_render_size/2,t.render_offset_y=e.height/2-t.height*t.tile_render_size/2;for(let r=0;r<t.width;r++)for(let n=0;n<t.height;n++){i.drawImage(c.ground.image,t.render_offset_x+r*t.tile_render_size,t.render_offset_y+(n+.15)*t.tile_render_size,t.tile_render_size,t.tile_render_size);const d=r+n*this.width;t.tiles[d]!=="empty"&&i.drawImage(c[t.tiles[d]].image,t.render_offset_x+r*t.tile_render_size,t.render_offset_y+n*t.tile_render_size,t.tile_render_size,t.tile_render_size)}for(let r=0;r<t.width;r++)for(let n=0;n<t.height;n++){const d=r+n*this.width;t.tiles[d]==="player"&&(i.fillStyle="rgba(255,0,0,0.15)",i.arc(t.render_offset_x+(r*t.tile_render_size+t.tile_render_size/2),t.render_offset_y+(n*t.tile_render_size+t.tile_render_size/2),t.tile_render_size/64*m.get_property("bomb_explode_range"),0,2*Math.PI),i.fill(),i.beginPath())}}}s.resize(9,5);async function h(o){return new Promise(e=>{const i=new Image;i.addEventListener("load",()=>e(i),{once:!0}),i.src=o})}const c={ground:{image:await h(v),max:0},player:{image:await h(x),max:4},barrel:{image:await h(z),max:1/0},rock:{image:await h(E),max:1/0}},l={mouse_x:0,mouse_y:0,mouse_pressed:!1,current_tile:"empty",mode:"place"};let y=document.getElementById("canvas");y.addEventListener("mousemove",o=>{l.mouse_x=o.offsetX*1.5,l.mouse_y=o.offsetY*1.5,g.update()});y.addEventListener("mousedown",()=>{const o=Math.round((l.mouse_x-s.tile_render_size/2-s.render_offset_x)/s.tile_render_size),e=Math.round((l.mouse_y-s.tile_render_size/2-s.render_offset_y)/s.tile_render_size);l.mouse_pressed=!0,o>=0&&o<s.width&&e>=0&&e<s.height&&(s.get_tile(o,e)===l.current_tile?l.mode="destory":l.mode="place",g.update())});y.addEventListener("mouseup",()=>{l.mouse_pressed=!1,l.mode="place"});class g{static update(){if(l.mouse_pressed){const e=Math.round((l.mouse_x-s.tile_render_size/2-s.render_offset_x)/s.tile_render_size),i=Math.round((l.mouse_y-s.tile_render_size/2-s.render_offset_y)/s.tile_render_size);e>=0&&e<s.width&&i>=0&&i<s.height&&(l.mode==="place"?(c[l.current_tile].max===1/0||s.count_tile(l.current_tile)<c[l.current_tile].max)&&s.set_tile(l.current_tile,e,i):l.mode==="destory"&&s.set_tile("empty",e,i))}}static render(e,i){const r=Math.round((l.mouse_x-s.tile_render_size/2-s.render_offset_x)/s.tile_render_size),n=Math.round((l.mouse_y-s.tile_render_size/2-s.render_offset_y)/s.tile_render_size);r>=0&&r<s.width&&n>=0&&n<s.height&&(i.filter="opacity(0.5)",i.drawImage(c[l.current_tile].image,s.render_offset_x+r*s.tile_render_size,s.render_offset_y+n*s.tile_render_size,s.tile_render_size,s.tile_render_size),i.filter="none")}}const I=document.getElementById("tile_types");for(const o of Object.keys(c))if(c[o].max>0){const e=document.createElement("div");e.classList.add("menu-item");const i=document.createElement("img");i.src=c[o].image.src,i.style.width="2rem",e.append(i),I.append(e),l.current_tile==="empty"&&(l.current_tile=o),e.addEventListener("click",()=>l.current_tile=o)}const _=document.getElementById("canvas"),f=_.getContext("2d");function w(){const o=_.getBoundingClientRect();_.width=o.width*1.5,_.height=o.height*1.5}w();window.addEventListener("resize",w);setInterval(()=>{f.clearRect(0,0,_.width,_.height),s.render(_,f),g.render(_,f)},1e3/30);document.getElementById("menu-load-level").addEventListener("click",()=>m.load());document.getElementById("menu-save-level").addEventListener("click",()=>m.save());document.getElementById("menu-save-as-image").addEventListener("click",()=>{const o=document.createElement("canvas"),e=o.getContext("2d"),i=512/(s.width-1);o.width=512,o.height=s.height*i,s.render(o,e),_.toBlob(r=>{const n=document.createElement("a");n.href=URL.createObjectURL(r),n.download="level.png",n.click()})});