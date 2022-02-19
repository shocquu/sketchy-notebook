(this["webpackJsonpsketchy-react"]=this["webpackJsonpsketchy-react"]||[]).push([[0],{15:function(t,e,n){},16:function(t,e,n){},17:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var a=n(2),c=n(3),i=n.n(c),r=n(9),s=n.n(r),o=(n(15),n(0)),l=n(6),u=n(1),h=i.a.createContext(),f=function(t){var e=t.children,n=Object(c.useState)("rectangle"),i=Object(u.a)(n,2),r=i[0],s=i[1];return Object(a.jsx)(h.Provider,{value:[r,s],children:e})},g=n(8);function d(){var t=Object(c.useContext)(h),e=Object(u.a)(t,2),n=e[0],i=(e[1],Object(c.useState)(null)),r=Object(u.a)(i,2),s=r[0],f=r[1],d=Object(c.useState)(null),x=Object(u.a)(d,2),b=x[0],y=x[1],v=Object(c.useState)([]),p=Object(u.a)(v,2),j=p[0],O=p[1],m=Object(c.useRef)(null),M=Object(c.useRef)(null),w=g.a.generator();Object(c.useLayoutEffect)((function(){var t=m.current;t.width=2*window.innerWidth,t.height=2*window.innerHeight,t.style.width="".concat(window.innerWidth,"px"),t.style.height="".concat(window.innerHeight,"px"),M.current=g.a.canvas(t);var e=t.getContext("2d");e.scale(2,2),e.clearRect(0,0,t.width,t.height),j.forEach((function(t){var e=t.element;return M.current.draw(e)}))}),[j]);var L=function(t,e,n){var a,c=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=n.x1,r=n.y1,s=n.x2,o=n.y2,l={fill:"red"};switch(e){case"line":a=w.line(i,r,s,o,l);break;case"rectangle":a=c?w.rectangle(i,r,s-i,s-i,l):w.rectangle(i,r,s-i,o-r,l);break;case"ellipse":a=c?w.ellipse((i+s)/2,(r+o)/2,s-i,s-i,l):w.ellipse((i+s)/2,(r+o)/2,s-i,o-r,l);break;case"triangle":a=c?w.path("M ".concat(i,",").concat(o," L ").concat(s,",").concat(o," L ").concat((s-i)/2+i,",").concat((i-s)*Math.sqrt(3)/2+o," L ").concat(i,",").concat(o," Z"),l):w.path("M ".concat(i,",").concat(o," L ").concat(s,",").concat(o," L ").concat((s-i)/2+i,",").concat((o-r)/2+r," L ").concat(i,",").concat(o," Z"),l);break;case"arrow":var u=.4,h=i-s,f=r-o,g=(h*Math.cos(u)+f*Math.sin(u))/10+s,d=(-h*Math.sin(u)+f*Math.cos(u))/10+o,x=(h*Math.cos(u)-f*Math.sin(u))/10+s,b=(h*Math.sin(u)+f*Math.cos(u))/10+o;a=w.path("M ".concat(i,",").concat(r," L ").concat(s,",").concat(o," L ").concat(g,",").concat(d," M ").concat(s,",").concat(o," L ").concat(x,",").concat(b," Z"));break;case"outline":var y=6;a=w.rectangle(i-y,r-y,s-i+2*y,o-r+2*y,{roughness:.5,stroke:"grey",strokeWidth:2,strokeLineDash:[5,10]});break;default:a=w.line(i,r,s,o,l)}return{id:t,type:e,x1:i,y1:r,x2:s,y2:o,element:a}},k=function(t,e,a){var c=L(t,e,a),i=Object(o.a)(j);if(i[t]=c,b&&"selection"===n){var r=a.x1,s=a.y1,l=L(j.length-2,"outline",a),u=L(j.length-1,"outline",{x1:r-2,y1:s-2,x2:r+2,y2:s+2});i[j.length-2]=l,i[j.length-1]=u}O(i)},C=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},S=function(t,e){return j.map((function(n){return Object(l.a)(Object(l.a)({},n),{},{position:Y(t,e,n)})})).find((function(t){return null!==t.position}))},R=function(t){var e=t.type,n=t.x1,a=t.y1,c=t.x2,i=t.y2,r=Math.min(n,c),s=Math.max(n,c),o=Math.min(a,i),l=Math.max(a,i);switch(e){case"rectangle":case"ellipse":return{x1:r,y1:o,x2:s,y2:l};case"triangle":return{x1:n,y1:a,x2:c,y2:i};case"line":return n<c||n===c&&a<i?{x1:n,y1:a,x2:c,y2:i}:{x1:c,y1:i,x2:n,y2:a};case"arrow":default:return{x1:n,y1:a,x2:c,y2:i}}},Y=function(t,e,n){var a=n.type,c=n.x1,i=n.y1,r=n.x2,s=n.y2;if("rectangle"===a||"ellipse"===a||"triangle"===a){if(Math.abs(t-6)>c&&Math.abs(t+6)<r&&Math.abs(e-6)>i&&Math.abs(e+6)<s)return n.element.options.fill?"inside":"empty";var o=F(t,e,c,i,6,"topLeft"),l=F(t,e,r,i,6,"topRight"),u=F(t,e,c,s,6,"bottomLeft"),h=F(t,e,r,s,6,"bottomRight"),f=Math.abs(t-c)<6||Math.abs(t-r)<6||Math.abs(e-i)<6||Math.abs(e-s)<6?"edge":null;return o||l||u||h||f}var g={x:c,y:i},d={x:r,y:s},x={x:t,y:e},b=C(g,d)-(C(g,x)+C(d,x)),y=F(t,e,c,i,6,"start"),v=F(t,e,r,s,6,"end"),p=Math.abs(b)<6?"inside":null;return y||v||p},F=function(t,e,n,a,c,i){return Math.abs(t-n)<c&&Math.abs(e-a)<c?i:null},X=function(t){var e=t.x1,n=t.y1,a=t.x2,c=t.y2,i=L(j.length,"outline",{x1:e,y1:n,x2:a,y2:c});O((function(t){return[].concat(Object(o.a)(t),[i])}));var r=L(j.length+1,"outline",{x1:e-4,y1:n-4,x2:e-2,y2:n-2});O((function(t){return[].concat(Object(o.a)(t),[r])}))},D=function(){var t=j.find((function(t){return"outline"===t.type}));t&&(!function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=Object(o.a)(j);n.splice(t,e),O(n)}(t.id,2),y(null),f(null))},E=function(t){switch(t){case"inside":return"move"}};return Object(a.jsx)("canvas",{ref:m,onMouseDown:function(t){var e=t.clientX,a=t.clientY;if("selection"===n){var c=S(e,a);if(c){var i=c.x1,r=c.y1,s=c.x2,u=c.y2;if(b&&b.id===c.id){var h=s-i,g=u-r;y(Object(l.a)(Object(l.a)({},c),{},{offsetX:e-i,offsetY:a-r,width:h,height:g})),O((function(t){return t})),f("moving")}else D(),"empty"===c.position||b||(y(c),X(c),t.target.style.cursor=c?E(c.position):"default")}else y(null),D()}else{b&&D();var d=j.length,x=L(d,n,{x1:e,y1:a,x2:e,y2:a});O((function(t){return[].concat(Object(o.a)(t),[x])})),f("drawing")}},onMouseUp:function(){if("drawing"===s||"resizing"===s){var t=j.length-1,e=R(j[t]),a=e.x1,c=e.y1,i=e.x2,r=e.y2;k(t,n,{x1:a,y1:c,x2:i,y2:r})}f("none")},onMouseMove:function(t){var e=t.clientX,a=t.clientY;if("selection"===n&&b){var c=S(e,a);t.target.style.cursor=c?E(c.position):"default"}if("drawing"===s){var i=j.length-1,r=j[i],o=r.x1,l=r.y1;k(i,n,{x1:o,y1:l,x2:e,y2:a})}else if("moving"===s){var u=b.id,h=b.offsetX,f=b.offsetY,g=b.width,d=b.height,x=e-h,y=a-f;k(u,b.type,{x1:x,y1:y,x2:x+g,y2:y+d})}},children:"Your browser doesn't support canvas"})}n(16);var x=n.p+"static/media/select.70df1ec0.svg",b=n.p+"static/media/select-active.f1899dc7.svg",y=n.p+"static/media/rectangle.f5d954ea.svg",v=n.p+"static/media/rectangle-active.72c4a5ef.svg",p=n.p+"static/media/ellipse.3530a60b.svg",j=n.p+"static/media/ellipse-active.957d413c.svg",O=n.p+"static/media/triangle.ecc9a150.svg",m=n.p+"static/media/triangle-active.f995cf0d.svg",M=n.p+"static/media/line.0ee8f270.svg",w=n.p+"static/media/line-active.53b5389c.svg",L=n.p+"static/media/arrow.b24a6f66.svg",k=n.p+"static/media/arrow-active.d3871a3f.svg";function C(){return Object(a.jsxs)("div",{className:"tool-box",children:[Object(a.jsx)("h2",{children:"TOOLS"}),Object(a.jsx)(S,{type:"selection",images:[x,b]},"1"),Object(a.jsx)(S,{type:"rectangle",images:[y,v]},"2"),Object(a.jsx)(S,{type:"ellipse",images:[p,j]},"3"),Object(a.jsx)(S,{type:"triangle",images:[O,m]},"4"),Object(a.jsx)(S,{type:"line",images:[M,w]},"5"),Object(a.jsx)(S,{type:"arrow",images:[L,k]},"6")]})}function S(t){var e=Object(c.useContext)(h),n=Object(u.a)(e,2),i=n[0],r=n[1],s=t.type,o=t.images,l=Object(u.a)(o,2),f=l[0],g=l[1];return Object(a.jsxs)("label",{className:"tool",children:[Object(a.jsx)("input",{type:"radio",value:s,checked:i===s,onChange:function(){r(s)}}),Object(a.jsx)("img",{src:i===s?g:f,alt:s}),Object(a.jsx)("span",{children:s.charAt(0).toUpperCase()+s.slice(1)})]})}n(17);function R(){return Object(a.jsxs)(f,{children:[Object(a.jsx)(C,{}),Object(a.jsx)(d,{})]})}var Y=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,i=e.getLCP,r=e.getTTFB;n(t),a(t),c(t),i(t),r(t)}))};s.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(R,{})}),document.getElementById("root")),Y()}},[[18,1,2]]]);
//# sourceMappingURL=main.3523a2cc.chunk.js.map