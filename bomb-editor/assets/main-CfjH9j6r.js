(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const a of d.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(s){if(s.ep)return;s.ep=!0;const d=t(s);fetch(s.href,d)}})();const x={file_name:"level.json"};class p{static load(){const e=document.createElement("input");e.type="file",e.accept=".json",e.addEventListener("change",()=>{const t=new FileReader;t.addEventListener("load",()=>{try{const r=JSON.parse(t.result);r.rules===void 0||r.map===void 0?confirm("無法加載關卡 (錯誤的格式)"):(r.file_name=e.files[0].name,r.rules.player_speed!==void 0&&this.set_property("player_speed",r.rules.player_speed),r.rules.player_bombs!==void 0&&this.set_property("player_bombs",r.rules.player_bombs),r.rules.bomb_countdown!==void 0&&this.set_property("bomb_countdown",r.rules.bomb_countdown),r.rules.bomb_explode_range!==void 0&&this.set_property("bomb_explode_range",r.rules.bomb_explode_range),r.map.width!==void 0&&this.set_property("map_width",r.map.width),r.map.height!==void 0&&this.set_property("map_height",r.map.height),o.clear(),r.map.tiles!==void 0&&o.load_tiles(r.map.tiles))}catch{confirm("無法加載關卡 (無法解析 JSON)")}},{once:!0}),t.readAsText(e.files[0])}),e.click()}static save(){const e=URL.createObjectURL(new Blob([JSON.stringify({rules:{player_speed:this.get_property("player_speed"),player_bombs:this.get_property("player_bombs"),bomb_countdown:this.get_property("bomb_countdown"),bomb_explode_range:this.get_property("bomb_explode_range")},map:{width:this.get_property("map_width"),height:this.get_property("map_height"),tiles:o.save_tiles()}},void 0,2)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=x.file_name,t.click()}static reset_all_properties(){for(const e of Object.keys(c))this.set_property(e,c[e].default)}static get_property(e){if(c[e]===void 0)throw new Error(`Unknown property "${e}"!`);return c[e].value}static get_all_properties(){return Object.keys(c)}static set_property(e,t){if(c[e]===void 0)throw new Error(`Unknown property "${e}"!`);const r=c[e];r.value=Math.max(r.min,Math.min(r.max,t)),r.input.value=r.value.toString(),(e==="map_width"||e==="map_height")&&o.resize(c.map_width.value,c.map_height.value),u.updated()}}const c={player_speed:{input:document.getElementById("property-player-speed"),min:1,max:64,default:5,value:5},player_bombs:{input:document.getElementById("property-player-bombs"),min:1,max:64,default:2,value:2},bomb_countdown:{input:document.getElementById("property-bomb-countdown"),min:1,max:1024,default:150,value:150},bomb_explode_range:{input:document.getElementById("property-bomb-explode-range"),min:1,max:1024,default:125,value:125},map_width:{input:document.getElementById("property-map-width"),min:1,max:64,default:9,value:9},map_height:{input:document.getElementById("property-map-height"),min:1,max:64,default:5,value:5}};for(const n of Object.keys(c)){const e=c[n],t=e.input;t.value=e.default.toString(),t.addEventListener("change",()=>{/^\d+$/.test(t.value)?p.set_property(n,parseInt(t.value)):t.value=t.value.toString()}),t.addEventListener("keydown",r=>{r.key==="ArrowUp"?p.set_property(n,e.value+1):r.key==="ArrowDown"&&p.set_property(n,e.value-1)})}let w=!1;class u{static load(){const e=JSON.parse(window.localStorage.getItem("properties"));if(window.localStorage.getItem("properties")!==null)for(const t of Object.keys(e))p.set_property(t,e[t]);window.localStorage.getItem("tiles")!==null&&o.load_tiles(JSON.parse(window.localStorage.getItem("tiles")))}static save(){const e={};for(const t of p.get_all_properties())e[t]=p.get_property(t);window.localStorage.setItem("properties",JSON.stringify(e)),window.localStorage.setItem("tiles",JSON.stringify(o.save_tiles()))}static updated(){w=!0}}setInterval(()=>{w&&(w=!1,u.save())},1e3);const E="/bomb-editor/assets/tile_ground-CqO3eniT.png",z="/bomb-editor/assets/tile_player-BC0wgStG.png",I="/bomb-editor/assets/tile_barrel-CiYyJdmA.png",L="/bomb-editor/assets/tile_rock-BbsIlq2a.png",i={width:0,height:0,tiles:[],tile_render_size:0,render_offset_x:0,render_offset_y:0};class o{static get width(){return i.width}static get height(){return i.height}static get tile_render_size(){return i.tile_render_size}static get render_offset_x(){return i.render_offset_x}static get render_offset_y(){return i.render_offset_y}static resize(e,t){const r=this.width,s=this.height,d=structuredClone(i.tiles);i.width=e,i.height=t,i.tiles=new Array(e*t).fill("empty");for(let a=0;a<e;a++)for(let f=0;f<t;f++)a<r&&f<s&&(i.tiles[a+f*e]=d[a+f*r]);u.updated()}static clear(){i.tiles=new Array(i.width*i.height).fill("empty"),u.updated()}static get_tile(e,t){const r=e+t*this.width;if(r<0||r>i.tiles.length)throw new Error(`Tile position ${e}, ${t} is out of bound! (${this.width}, ${this.height})`);return i.tiles[r]}static set_tile(e,t,r){const s=t+r*this.width;if(_[e]===void 0&&e!=="empty")throw new Error(`Tile type "${e}" not found! (${t}, ${r})`);if(s<0||s>i.tiles.length)throw new Error(`Tile position ${t}, ${r} is out of bound! (${this.width}, ${this.height})`);i.tiles[s]=e,u.updated()}static count_tile(e){let t=0;for(const r of i.tiles)r===e&&t++;return t}static load_tiles(e){for(const t of e)o.set_tile(t.type,t.x,t.y)}static save_tiles(){const e=[];for(let t=0;t<i.width;t++)for(let r=0;r<i.height;r++){const s=t+r*this.width;i.tiles[s]!=="empty"&&e.push({type:i.tiles[s],x:t,y:r})}return e}static render(e,t){e.width>e.height?i.tile_render_size=e.width/(i.width+1):i.tile_render_size=e.height/(i.height+1),i.tile_render_size*i.width>e.width?i.tile_render_size=e.width/(i.width+1):i.tile_render_size*i.height>e.height&&(i.tile_render_size=e.height/(i.height+1)),i.render_offset_x=e.width/2-i.width*i.tile_render_size/2,i.render_offset_y=e.height/2-i.height*i.tile_render_size/2;for(let r=0;r<i.width;r++)for(let s=0;s<i.height;s++){t.drawImage(_.ground.image,i.render_offset_x+r*i.tile_render_size,i.render_offset_y+(s+.15)*i.tile_render_size,i.tile_render_size,i.tile_render_size);const d=r+s*this.width;i.tiles[d]!=="empty"&&t.drawImage(_[i.tiles[d]].image,i.render_offset_x+r*i.tile_render_size,i.render_offset_y+s*i.tile_render_size,i.tile_render_size,i.tile_render_size)}for(let r=0;r<i.width;r++)for(let s=0;s<i.height;s++){const d=r+s*this.width;i.tiles[d]==="player"&&(t.fillStyle="rgba(255,0,0,0.15)",t.arc(i.render_offset_x+(r*i.tile_render_size+i.tile_render_size/2),i.render_offset_y+(s*i.tile_render_size+i.tile_render_size/2),i.tile_render_size/64*p.get_property("bomb_explode_range"),0,2*Math.PI),t.fill(),t.beginPath())}}}o.resize(9,5);async function h(n){return new Promise(e=>{const t=new Image;t.addEventListener("load",()=>e(t),{once:!0}),t.src=n})}const _={ground:{image:await h(E),max:0},player:{image:await h(z),max:4},barrel:{image:await h(I),max:1/0},rock:{image:await h(L),max:1/0}},l={mouse_x:0,mouse_y:0,mouse_pressed:!1,current_tile:"empty",mode:"place"};let g=document.getElementById("canvas");g.addEventListener("mousemove",n=>{l.mouse_x=n.offsetX*1.5,l.mouse_y=n.offsetY*1.5,b.update()});g.addEventListener("mousedown",()=>{const n=Math.round((l.mouse_x-o.tile_render_size/2-o.render_offset_x)/o.tile_render_size),e=Math.round((l.mouse_y-o.tile_render_size/2-o.render_offset_y)/o.tile_render_size);l.mouse_pressed=!0,n>=0&&n<o.width&&e>=0&&e<o.height&&(o.get_tile(n,e)===l.current_tile?l.mode="destory":l.mode="place",b.update())});g.addEventListener("mouseup",()=>{l.mouse_pressed=!1,l.mode="place"});g.addEventListener("mouseleave",()=>{l.mouse_pressed=!1,l.mode="place"});class b{static update(){if(l.mouse_pressed){const e=Math.round((l.mouse_x-o.tile_render_size/2-o.render_offset_x)/o.tile_render_size),t=Math.round((l.mouse_y-o.tile_render_size/2-o.render_offset_y)/o.tile_render_size);e>=0&&e<o.width&&t>=0&&t<o.height&&(l.mode==="place"?(_[l.current_tile].max===1/0||o.count_tile(l.current_tile)<_[l.current_tile].max)&&o.set_tile(l.current_tile,e,t):l.mode==="destory"&&o.set_tile("empty",e,t))}}static render(e,t){const r=Math.round((l.mouse_x-o.tile_render_size/2-o.render_offset_x)/o.tile_render_size),s=Math.round((l.mouse_y-o.tile_render_size/2-o.render_offset_y)/o.tile_render_size);r>=0&&r<o.width&&s>=0&&s<o.height&&(t.filter="opacity(0.5)",t.drawImage(_[l.current_tile].image,o.render_offset_x+r*o.tile_render_size,o.render_offset_y+s*o.tile_render_size,o.tile_render_size,o.tile_render_size),t.filter="none")}}const O=document.getElementById("tile_types");for(const n of Object.keys(_))if(_[n].max>0){const e=document.createElement("div");e.classList.add("button"),e.classList.add("menu-item");const t=document.createElement("img");t.src=_[n].image.src,t.style.width="2rem",e.append(t),O.append(e),l.current_tile==="empty"&&(l.current_tile=n),e.addEventListener("click",()=>l.current_tile=n)}lucide.createIcons();const m=document.getElementById("canvas"),y=m.getContext("2d");function v(){const n=m.getBoundingClientRect();m.width=n.width*1.5,m.height=n.height*1.5}v();window.addEventListener("resize",v);setInterval(()=>{y.clearRect(0,0,m.width,m.height),o.render(m,y),b.render(m,y)},1e3/30);u.load();document.getElementById("button-load-level").addEventListener("click",()=>p.load());document.getElementById("button-save-level").addEventListener("click",()=>p.save());document.getElementById("button-save-as-image").addEventListener("click",()=>{const n=document.createElement("canvas"),e=n.getContext("2d"),t=512/(o.width-1);n.width=512,n.height=o.height*t,o.render(n,e),m.toBlob(r=>{const s=document.createElement("a");s.href=URL.createObjectURL(r),s.download="level.png",s.click()})});document.getElementById("button-reset-map").addEventListener("click",()=>{confirm("確認要重置地圖嗎？")&&o.clear()});document.getElementById("button-reset-properties").addEventListener("click",()=>{confirm("確認要重置關卡參數嗎？")&&p.reset_all_properties()});document.getElementById("button-export-tileset").addEventListener("click",()=>{const n=document.createElement("canvas"),e=n.getContext("2d"),t=[_.player.image,_.barrel.image,_.rock.image];n.width=64*5,n.height=Math.ceil(t.length/5)*64;let r=0,s=0;for(const d of t)e.drawImage(d,r*64,s*64,64,64),r++,r>=5&&(r=0,s++);console.log(!0),n.toBlob(d=>{const a=document.createElement("a");a.href=URL.createObjectURL(d),a.download="tileset.png",a.click()})});
