(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{10:function(e,r,t){"use strict";t.r(r);var n=t(12),a=t(0),s=t.n(a),u=t(39),c=t(25),o=t(13),i=t(16),l=t(14),p=(t(66),s.a.lazy(function(){return t.e(0).then(t.bind(null,15))})),f=s.a.lazy(function(){return t.e(6).then(t.bind(null,80))}),b=s.a.lazy(function(){return t.e(7).then(t.bind(null,83))}),d=s.a.lazy(function(){return t.e(8).then(t.bind(null,84))}),m=s.a.lazy(function(){return t.e(9).then(t.bind(null,85))}),v=s.a.lazy(function(){return Promise.all([t.e(2),t.e(10)]).then(t.bind(null,86))}),g=s.a.lazy(function(){return Promise.all([t.e(2),t.e(11)]).then(t.bind(null,89))});r.default=function(){var e=Object(a.useState)(!1),r=Object(n.a)(e,2),t=r[0],h=r[1],k=Object(a.useState)(!1),x=Object(n.a)(k,2),y=x[0],w=x[1],j=Object(a.useState)({}),O=Object(n.a)(j,2),E=O[0],P=O[1],S=Object(a.useState)(!1),z=Object(n.a)(S,2),I=z[0],C=z[1],F=Object(a.useState)(!0),M=Object(n.a)(F,2),N=M[0],U=M[1];Object(a.useEffect)(function(){var e=Object(i.a)(i.d);if(e&&e.token){var r=e.token;Object(l.j)(r).then(function(e){e.success?(P(e.payload),C(!0),U(!1)):(Object(i.b)(i.d),U(!1))})}else U(!1)},[]);var V=function(){h(!1),w(!1)};return s.a.createElement("div",{className:"App",onClick:function(e){var r=document.querySelector(".dropdown-list.show");r&&r.classList.remove("show")}},N?s.a.createElement(p,null):s.a.createElement(s.a.Fragment,null,s.a.createElement(o.a,{user:E,loggedIn:I,vehicles:[]},s.a.createElement(u.a,null,s.a.createElement(f,{handleUserClick:function(e){switch(V(),e){case"login":h(!0);break;case"register":w(!0);break;default:V()}}}),t&&s.a.createElement(v,{handleCancel:V}),y&&s.a.createElement(g,{handleCancel:V}),s.a.createElement(c.c,null,s.a.createElement(c.a,{exact:!0,path:"/",component:d}),s.a.createElement(c.a,{path:"/favorites",component:m}),s.a.createElement(c.a,{component:b}))))))}},13:function(e,r,t){"use strict";t.d(r,"a",function(){return i});var n=t(12),a=t(0),s=t.n(a),u=Object(a.createContext)(),c=u.Provider,o=u.Consumer,i=function(e){var r=e.children,t=e.user,u=e.loggedIn,o=e.vehicles,i=Object(a.useState)(u),l=Object(n.a)(i,2),p=l[0],f=l[1],b=Object(a.useState)(t),d=Object(n.a)(b,2),m=d[0],v=d[1],g=Object(a.useState)(o),h=Object(n.a)(g,2),k=h[0],x=h[1];return s.a.createElement(c,{value:{userLoggedIn:p,setUserLoggedIn:f,userData:m,setUserData:v,vehicleData:k,setVehicles:x}},r)};r.b=o},14:function(e,r,t){"use strict";t.d(r,"d",function(){return o}),t.d(r,"i",function(){return i}),t.d(r,"h",function(){return l}),t.d(r,"b",function(){return p}),t.d(r,"c",function(){return f}),t.d(r,"e",function(){return b}),t.d(r,"f",function(){return d}),t.d(r,"g",function(){return m}),t.d(r,"j",function(){return v}),t.d(r,"a",function(){return g});var n=t(20),a=t.n(n),s=t(21),u=t(47),c=t.n(u),o=function(){var e=Object(s.a)(a.a.mark(function e(r){var t,n,s,u,o,i,l;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.make,n=r.model,s=r.zip,u=r.radius,o=/(^\d{5}$)|(^\d{5}-\d{4}$)/,""!==t){e.next=4;break}return e.abrupt("return",{success:!1,message:"Please select the make of the vehicle"});case 4:if(""!==n){e.next=6;break}return e.abrupt("return",{success:!1,message:"Please select the model of the vehicle"});case 6:if(""!==s){e.next=8;break}return e.abrupt("return",{success:!1,message:"Please enter your zip code"});case 8:if(o.test(s)){e.next=10;break}return e.abrupt("return",{success:!1,message:"Invalid Zip Code"});case 10:if(""!==u){e.next=12;break}return e.abrupt("return",{success:!1,message:"Please select a radius"});case 12:return e.prev=12,e.next=15,c.a.get("/getVehicles",{params:{make:t,model:n,zip:s,radius:u}});case 15:if(i=e.sent,(l=i.data).success){e.next=19;break}return e.abrupt("return",{success:!1,message:l.message});case 19:return e.abrupt("return",{success:!0,vehicles:l.vehicles});case 22:return e.prev=22,e.t0=e.catch(12),e.abrupt("return",{success:!1,message:"Error calling getVehicles endpoint"});case 25:case"end":return e.stop()}},e,null,[[12,22]])}));return function(r){return e.apply(this,arguments)}}(),i=function(){var e=Object(s.a)(a.a.mark(function e(r){var t,n,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.vehicle,n=r.token,t||n){e.next=3;break}return e.abrupt("return",{success:!1,message:"Vehilce not found"});case 3:return e.prev=3,e.next=6,c.a.post("/setFavorite",{data:{vehicle:t,token:n}});case 6:return s=e.sent,e.abrupt("return",s.data);case 10:return e.prev=10,e.t0=e.catch(3),e.abrupt("return",{success:!1,message:"Error calling setFavorite endpoint"});case 13:case"end":return e.stop()}},e,null,[[3,10]])}));return function(r){return e.apply(this,arguments)}}(),l=function(){var e=Object(s.a)(a.a.mark(function e(r){var t,n,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.vehicle,n=r.token,t||n){e.next=3;break}return e.abrupt("return",{success:!1,message:"Vehilce not found"});case 3:return e.prev=3,e.next=6,c.a.delete("/removeFavorite",{data:{vehicle:t,token:n}});case 6:return s=e.sent,e.abrupt("return",s.data);case 10:return e.prev=10,e.t0=e.catch(3),e.abrupt("return",{success:!1,message:"Error calling removeFavorite endpoint"});case 13:case"end":return e.stop()}},e,null,[[3,10]])}));return function(r){return e.apply(this,arguments)}}(),p=function(){var e=Object(s.a)(a.a.mark(function e(){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.a.get("/getMakes");case 3:return r=e.sent,e.abrupt("return",r.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{success:!1,message:"Error calling getMakes endpoint"});case 10:case"end":return e.stop()}},e,null,[[0,7]])}));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(s.a)(a.a.mark(function e(r){var t;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",{success:!1,message:"Models not found"});case 2:return e.prev=2,e.next=5,c.a.get("/getModels",{params:{make:r}});case 5:return t=e.sent,e.abrupt("return",t.data);case 9:return e.prev=9,e.t0=e.catch(2),e.abrupt("return",{success:!1,message:"Error calling getModels endpoint"});case 12:case"end":return e.stop()}},e,null,[[2,9]])}));return function(r){return e.apply(this,arguments)}}(),b=function(){var e=Object(s.a)(a.a.mark(function e(r){var t,n,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.email,n=r.password,t||n){e.next=3;break}return e.abrupt("return",{success:!1,message:"Please fill in your email and password"});case 3:if(t){e.next=5;break}return e.abrupt("return",{success:!1,message:"Please enter your email"});case 5:if(n){e.next=7;break}return e.abrupt("return",{success:!1,message:"Please enter your password"});case 7:return e.prev=7,e.next=10,c.a.post("/login",{email:t,password:n});case 10:return s=e.sent,e.abrupt("return",s.data);case 14:return e.prev=14,e.t0=e.catch(7),e.abrupt("return",{success:!1,message:"Error calling login endpoint"});case 17:case"end":return e.stop()}},e,null,[[7,14]])}));return function(r){return e.apply(this,arguments)}}(),d=function(){var e=Object(s.a)(a.a.mark(function e(r){var t;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",{success:!1,message:"Error logging out user"});case 2:return e.prev=2,e.next=5,c.a.get("/logout?token="+r);case 5:return t=e.sent,e.abrupt("return",t.data);case 9:return e.prev=9,e.t0=e.catch(2),e.abrupt("return",{success:!1,message:"Error calling logout endpoint"});case 12:case"end":return e.stop()}},e,null,[[2,9]])}));return function(r){return e.apply(this,arguments)}}(),m=function(){var e=Object(s.a)(a.a.mark(function e(r){var t,n,s,u,o,i;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.firstName,n=r.lastName,s=r.email,u=r.password,o=r.password2,s||u||t||n){e.next=3;break}return e.abrupt("return",{success:!1,message:"Please enter your information in the fields below"});case 3:if(s){e.next=5;break}return e.abrupt("return",{success:!1,message:"Please enter your email"});case 5:if(u){e.next=7;break}return e.abrupt("return",{success:!1,message:"Please enter your password"});case 7:if(o&&u===o){e.next=9;break}return e.abrupt("return",{success:!1,message:"Passwords must match"});case 9:if(t){e.next=11;break}return e.abrupt("return",{success:!1,message:"Please enter your first name"});case 11:if(n){e.next=13;break}return e.abrupt("return",{success:!1,message:"Please enter your last name"});case 13:return e.prev=13,e.next=16,c.a.post("/register",r);case 16:return i=e.sent,e.abrupt("return",i.data);case 20:return e.prev=20,e.t0=e.catch(13),e.abrupt("return",{success:!1,message:"Error calling register endpoint"});case 23:case"end":return e.stop()}},e,null,[[13,20]])}));return function(r){return e.apply(this,arguments)}}(),v=function(){var e=Object(s.a)(a.a.mark(function e(r){var t;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",{success:!1,message:"Erro verifying user"});case 2:return e.prev=2,e.next=5,c.a.get("/verify?token="+r);case 5:return t=e.sent,e.abrupt("return",t.data);case 9:return e.prev=9,e.t0=e.catch(2),e.abrupt("return",{success:!1,message:"Error calling verify endpoint"});case 12:case"end":return e.stop()}},e,null,[[2,9]])}));return function(r){return e.apply(this,arguments)}}(),g=function(){var e=Object(s.a)(a.a.mark(function e(r){var t;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",{success:!1,message:"Error deleting user"});case 2:return e.prev=2,e.next=5,c.a.delete("/deleteUser?token="+r);case 5:return t=e.sent,e.abrupt("return",t.data);case 9:return e.prev=9,e.t0=e.catch(2),e.abrupt("return",{success:!1,message:"Error calling deleteUser endpoint"});case 12:case"end":return e.stop()}},e,null,[[2,9]])}));return function(r){return e.apply(this,arguments)}}()},16:function(e,r,t){"use strict";function n(e){if(!e)return null;try{var r=localStorage.getItem(e);return r?JSON.parse(r):null}catch(t){return null}}function a(e,r){e||console.error("setInStorage(key, obj) -> key is missing");try{localStorage.setItem(e,JSON.stringify(r))}catch(t){console.error(t)}}function s(e){e||console.error("removeFromStorage(key) -> key is missing");try{localStorage.removeItem(e)}catch(r){console.error(r)}}t.d(r,"a",function(){return n}),t.d(r,"c",function(){return a}),t.d(r,"b",function(){return s}),t.d(r,"d",function(){return u});var u="fancyMeetingYouHere"},66:function(e,r,t){}}]);
//# sourceMappingURL=5.5339574e.chunk.js.map