(function(t){function e(e){for(var a,o,u=e[0],i=e[1],s=e[2],l=0,f=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&f.push(c[o][0]),c[o]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);d&&d(e);while(f.length)f.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,o=1;o<n.length;o++){var u=n[o];0!==c[u]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},o={app:0},c={app:0},r=[];function u(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-2d22bcc3":"b0851647","chunk-490a14fe":"f7d48506","chunk-4fbf3e16":"b8a158b7","chunk-3b71fcc1":"43668893","chunk-46d34e51":"00a09fa7","chunk-4fdb54f4":"d0106897","chunk-2d0ab43a":"aa45d8fb","chunk-2d0efc70":"9cf54c67","chunk-5ed11d0f":"7d97cb82","chunk-75bc76cf":"8f1758a3","chunk-7049ec69":"9b8411a0","chunk-912f0a9e":"9d49f631","chunk-c3fd6c2a":"62be50f7"}[t]+".js"}function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n={"chunk-490a14fe":1,"chunk-3b71fcc1":1,"chunk-4fdb54f4":1,"chunk-5ed11d0f":1,"chunk-75bc76cf":1,"chunk-7049ec69":1,"chunk-912f0a9e":1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=new Promise((function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-2d22bcc3":"31d6cfe0","chunk-490a14fe":"fd79da1b","chunk-4fbf3e16":"31d6cfe0","chunk-3b71fcc1":"71f72053","chunk-46d34e51":"31d6cfe0","chunk-4fdb54f4":"239cfe32","chunk-2d0ab43a":"31d6cfe0","chunk-2d0efc70":"31d6cfe0","chunk-5ed11d0f":"ccff8100","chunk-75bc76cf":"04136afe","chunk-7049ec69":"eb2c40eb","chunk-912f0a9e":"42cb0a4a","chunk-c3fd6c2a":"31d6cfe0"}[t]+".css",c=i.p+a,r=document.getElementsByTagName("link"),u=0;u<r.length;u++){var s=r[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===a||l===c))return e()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],l=s.getAttribute("data-href");if(l===a||l===c)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||c,r=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete o[t],d.parentNode.removeChild(d),n(r)},d.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[t]=0})));var a=c[t];if(0!==a)if(a)e.push(a[2]);else{var r=new Promise((function(e,n){a=c[t]=[e,n]}));e.push(a[2]=r);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(t);var f=new Error;s=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=c[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",f.name="ChunkLoadError",f.type=a,f.request=o,n[1](f)}c[t]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var f=0;f<s.length;f++)e(s[f]);var d=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1:function(t,e){},"1dff":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return o})),n.d(e,"c",(function(){return c}));var a={},o={},c={app:{appName:"TTS",appLogoImage:n("5ffc")},layout:{isRTL:!1,skin:"light",routerTransition:"zoom-fade",type:"vertical",contentWidth:"full",menu:{hidden:!1,isCollapsed:!1},navbar:{type:"floating",backgroundColor:""},footer:{type:"static"},customizer:!0,enableScrollToTop:!0}}},4131:function(t,e,n){},4360:function(t,e,n){"use strict";n("99af"),n("d3b7"),n("4de4");var a=n("2b0e"),o=n("2f62"),c=n("1dff"),r={namespaced:!0,state:{windowWidth:0,shallShowOverlay:!1},getters:{currentBreakPoint:function(t){var e=t.windowWidth;return e>=c["a"].xl?"xl":e>=c["a"].lg?"lg":e>=c["a"].md?"md":e>=c["a"].sm?"sm":"xs"}},mutations:{UPDATE_WINDOW_WIDTH:function(t,e){t.windowWidth=e},TOGGLE_OVERLAY:function(t,e){t.shallShowOverlay=void 0!==e?e:!t.shallShowOverlay}},actions:{}},u=(n("ac1f"),n("466d"),{namespaced:!0,state:{layout:{isRTL:c["c"].layout.isRTL,skin:localStorage.getItem("vuexy-skin")||c["c"].layout.skin,routerTransition:c["c"].layout.routerTransition,type:c["c"].layout.type,contentWidth:c["c"].layout.contentWidth,menu:{hidden:c["c"].layout.menu.hidden},navbar:{type:c["c"].layout.navbar.type,backgroundColor:c["c"].layout.navbar.backgroundColor},footer:{type:c["c"].layout.footer.type}}},getters:{},mutations:{TOGGLE_RTL:function(t){t.layout.isRTL=!t.layout.isRTL,document.documentElement.setAttribute("dir",t.layout.isRTL?"rtl":"ltr")},UPDATE_SKIN:function(t,e){t.layout.skin=e,localStorage.setItem("vuexy-skin",e),"dark"===e?document.body.classList.add("dark-layout"):document.body.className.match("dark-layout")&&document.body.classList.remove("dark-layout")},UPDATE_ROUTER_TRANSITION:function(t,e){t.layout.routerTransition=e},UPDATE_LAYOUT_TYPE:function(t,e){t.layout.type=e},UPDATE_CONTENT_WIDTH:function(t,e){t.layout.contentWidth=e},UPDATE_NAV_MENU_HIDDEN:function(t,e){t.layout.menu.hidden=e},UPDATE_NAVBAR_CONFIG:function(t,e){Object.assign(t.layout.navbar,e)},UPDATE_FOOTER_CONFIG:function(t,e){Object.assign(t.layout.footer,e)}},actions:{}}),i={namespaced:!0,state:{isVerticalMenuCollapsed:c["c"].layout.menu.isCollapsed},getters:{},mutations:{UPDATE_VERTICAL_MENU_COLLAPSED:function(t,e){t.isVerticalMenuCollapsed=e}},actions:{}},s=n("a18c");a["default"].use(o["a"]);var l={routers:s["b"],addRouters:[],isAuthenticated:!1,claims:{},token:""},f={SET_ROUTERS:function(t,e){t.addRouters=e,t.routers=s["b"].concat(e)}},d={GenerateRoutes:function(t,e){var n=t.commit;return new Promise((function(t){var a,o=e.roles;a=o.indexOf("admin")>=0?s["a"]:h(s["a"],o),n("SET_ROUTERS",a),t(a)})).catch((function(t){console.log("catch:",t)}))}};function p(t,e){return!e.meta||!e.meta.roles||t.some((function(t){return e.meta.roles.indexOf(t)>=0}))}function h(t,e){var n=t.filter((function(t){return!!p(e,t)&&(t.children&&t.children.length&&(t.children=h(t.children,e)),!0)}));return n}e["a"]=new o["a"].Store({state:l,mutations:f,actions:d,modules:{app:r,appConfig:u,verticalMenu:i},strict:Object({NODE_ENV:"production",BASE_URL:"/"}).DEV})},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a,o,c=n("2b0e"),r=n("51c2"),u=n("dbbe"),i=n("ed09"),s=n("a18c"),l=n("4360"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"h-100",class:[t.skinClasses],attrs:{id:"app"}},[n(t.layout,{tag:"component"},[n("router-view")],1)],1)},d=[],p=(n("d3b7"),n("3ca3"),n("ddb0"),n("498a"),n("a9e3"),n("fb6a"),n("159b"),n("e9c4"),n("1dff")),h=n("04b0"),m=n("b8f2"),b=n("16ce"),y=function(){return Promise.all([n.e("chunk-4fbf3e16"),n.e("chunk-46d34e51"),n.e("chunk-75bc76cf"),n.e("chunk-912f0a9e")]).then(n.bind(null,"03d1"))},g=function(){return Promise.all([n.e("chunk-4fbf3e16"),n.e("chunk-46d34e51"),n.e("chunk-75bc76cf"),n.e("chunk-7049ec69")]).then(n.bind(null,"2607"))},v=function(){return n.e("chunk-2d22bcc3").then(n.bind(null,"f102"))},k={components:{LayoutHorizontal:g,LayoutVertical:y,LayoutFull:v},computed:{layout:function(){return"full"===this.$route.meta.layout?"layout-full":"layout-".concat(this.contentLayoutType)},contentLayoutType:function(){return this.$store.state.appConfig.layout.type}},beforeCreate:function(){for(var t=["primary","secondary","success","info","warning","danger","light","dark"],e=0,n=t.length;e<n;e++)p["b"][t[e]]=Object(b["a"])("--".concat(t[e]),document.documentElement).value.trim();for(var a=["xs","sm","md","lg","xl"],o=0,c=a.length;o<c;o++)p["a"][a[o]]=Number(Object(b["a"])("--breakpoint-".concat(a[o]),document.documentElement).value.slice(0,-2));var r=p["c"].layout.isRTL;document.documentElement.setAttribute("dir",r?"rtl":"ltr")},setup:function(){var t=Object(m["a"])(),e=t.skin,n=t.skinClasses;"dark"===e.value&&document.body.classList.add("dark-layout"),Object(h["provideToast"])({hideProgressBar:!0,closeOnClick:!1,closeButton:!1,icon:!1,timeout:3e3,transition:"Vue-Toastification__fade"}),l["a"].commit("app/UPDATE_WINDOW_WIDTH",window.innerWidth);var a=Object(b["b"])(),o=a.width;return Object(i["watch"])(o,(function(t){l["a"].commit("app/UPDATE_WINDOW_WIDTH",t)})),{skinClasses:n}},created:function(){var t=this;if(sessionStorage.getItem("store")&&(this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store")))),l["a"].state.claims.Role)){l["a"].state.claims.initRoute=!0,l["a"].state.routers=s["b"];var e=l["a"].state.claims.Role;l["a"].dispatch("GenerateRoutes",{roles:e}).then((function(t){try{t.forEach((function(t){s["d"].options.routes.push(t)})),s["d"].addRoutes(t)}catch(e){console.log("catch:",e)}}))}window.addEventListener("beforeunload",(function(){sessionStorage.setItem("store",JSON.stringify(t.$store.state))}))}},T=k,O=n("2877"),E=Object(O["a"])(T,f,d,!1,null,null,null),_=E.exports,C=(n("b0c0"),n("5530")),A=n("0a35"),P={name:"FeatherIcon",functional:!0,props:{icon:{required:!0,type:[String,Object]},size:{type:String,default:"14"},badge:{type:[String,Object,Number],default:null},badgeClasses:{type:[String,Object,Array],default:"badge-primary"}},render:function(t,e){var n=e.props,a=e.data,o=t(A[n.icon],Object(C["a"])({props:{size:n.size}},a));if(!n.badge)return o;var c=t("span",{staticClass:"badge badge-up badge-pill",class:n.badgeClasses},[n.badge]);return t("span",{staticClass:"feather-icon position-relative"},[o,c])}},R=P,N=(n("8bd0"),Object(O["a"])(R,a,o,!1,null,null,null)),j=N.exports;c["default"].component(j.name,j);var L=n("2b88"),w=n.n(L);c["default"].use(w.a);var D=n("6c42");n("cc0f");c["default"].use(D["default"],{hideProgressBar:!0,closeOnClick:!1,closeButton:!1,icon:!1,timeout:3e3,transition:"Vue-Toastification__fade"});var S=n("4328"),I=n.n(S),U=n("3d20"),x=n.n(U);c["default"].prototype.$swal=x.a,c["default"].prototype.$qs=I.a,c["default"].use(r["a"]),c["default"].use(u["a"]),c["default"].use(i["default"]),n("4131"),n("78a7"),c["default"].config.productionTip=!1,new c["default"]({router:s["c"],store:l["a"],render:function(t){return t(_)}}).$mount("#app")},"5ffc":function(t,e,n){t.exports=n.p+"img/logo2.9ec2ac85.png"},"602d4":function(t,e,n){},"78a7":function(t,e,n){},"8bd0":function(t,e,n){"use strict";n("602d4")},a18c:function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"d",(function(){return i})),n.d(e,"a",(function(){return s}));var a=n("5530"),o=(n("d3b7"),n("159b"),n("7db0"),n("2b0e")),c=n("8c4f"),r=n("4360");o["default"].use(c["a"]);var u=[{path:"/login",name:"login",meta:{layout:"full"},component:function(t){return Promise.all([n.e("chunk-4fbf3e16"),n.e("chunk-3b71fcc1")]).then(function(){var e=[n("a55b")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/error-404",name:"error-404",component:function(t){return n.e("chunk-490a14fe").then(function(){var e=[n("d80f")];t.apply(null,e)}.bind(this)).catch(n.oe)},meta:{layout:"full"}}],i=new c["a"]({mode:"history",routes:u}),s=[{path:"/home",name:"home",meta:{pageTitle:"首頁",breadcrumb:[{text:"首頁",active:!0}]},component:function(t){return n.e("chunk-c3fd6c2a").then(function(){var e=[n("bb51")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/user",name:"user",pageTitle:"使用者管理",breadcrumb:[{text:"使用者管理",active:!0}],component:function(t){return Promise.all([n.e("chunk-4fbf3e16"),n.e("chunk-46d34e51"),n.e("chunk-4fdb54f4"),n.e("chunk-2d0ab43a")]).then(function(){var e=[n("1511")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/role",name:"role",meta:{pageTitle:"角色管理",breadcrumb:[{text:"角色管理",active:!0}]},component:function(t){return Promise.all([n.e("chunk-4fbf3e16"),n.e("chunk-46d34e51"),n.e("chunk-4fdb54f4"),n.e("chunk-5ed11d0f")]).then(function(){var e=[n("c338")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/menu",name:"menu",meta:{pageTitle:"選單管理",breadcrumb:[{text:"選單管理",active:!0}]},component:function(t){return Promise.all([n.e("chunk-4fbf3e16"),n.e("chunk-46d34e51"),n.e("chunk-4fdb54f4"),n.e("chunk-2d0efc70")]).then(function(){var e=[n("9a0b")];t.apply(null,e)}.bind(this)).catch(n.oe)}}];i.beforeEach((function(t,e,n){if("/login"===t.path)n();else if(r["a"].state.claims.Role&&!r["a"].state.claims.initRoute){r["a"].state.claims.initRoute=!0;var o=r["a"].state.claims.Role;r["a"].dispatch("GenerateRoutes",{roles:o}).then((function(e){try{e.forEach((function(t){i.options.routes.push(t)})),i.addRoutes(e),n(Object(a["a"])(Object(a["a"])({},t),{},{replace:!0}))}catch(o){console.log("catch:",o)}}))}else n()})),i.afterEach((function(){var t=document.getElementById("loading-bg");t&&(t.style.display="none")}));var l=c["a"].prototype.push;c["a"].prototype.push=function(t,e,n){return e||n?l.call(this,t,e,n):l.call(this,t).catch((function(t){return t}))},e["c"]=i},b8f2:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var a=n("ed09"),o=n("4360");function c(){var t=Object(a["computed"])({get:function(){return o["a"].state.verticalMenu.isVerticalMenuCollapsed},set:function(t){o["a"].commit("verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED",t)}}),e=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.isRTL},set:function(t){o["a"].commit("appConfig/TOGGLE_RTL",t)}}),n=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.skin},set:function(t){o["a"].commit("appConfig/UPDATE_SKIN",t)}}),c=Object(a["computed"])((function(){return"bordered"===n.value?"bordered-layout":"semi-dark"===n.value?"semi-dark-layout":null})),r=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.routerTransition},set:function(t){o["a"].commit("appConfig/UPDATE_ROUTER_TRANSITION",t)}}),u=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.type},set:function(t){o["a"].commit("appConfig/UPDATE_LAYOUT_TYPE",t)}});Object(a["watch"])(u,(function(t){"horizontal"===t&&"semi-dark"===n.value&&(n.value="light")}));var i=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.contentWidth},set:function(t){o["a"].commit("appConfig/UPDATE_CONTENT_WIDTH",t)}}),s=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.menu.hidden},set:function(t){o["a"].commit("appConfig/UPDATE_NAV_MENU_HIDDEN",t)}}),l=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.navbar.backgroundColor},set:function(t){o["a"].commit("appConfig/UPDATE_NAVBAR_CONFIG",{backgroundColor:t})}}),f=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.navbar.type},set:function(t){o["a"].commit("appConfig/UPDATE_NAVBAR_CONFIG",{type:t})}}),d=Object(a["computed"])({get:function(){return o["a"].state.appConfig.layout.footer.type},set:function(t){o["a"].commit("appConfig/UPDATE_FOOTER_CONFIG",{type:t})}});return{isVerticalMenuCollapsed:t,isRTL:e,skin:n,skinClasses:c,routerTransition:r,navbarBackgroundColor:l,navbarType:f,footerType:d,layoutType:u,contentWidth:i,isNavMenuHidden:s}}},cc0f:function(t,e,n){}});
//# sourceMappingURL=app.096b4f0a.js.map