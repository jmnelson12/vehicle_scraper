(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{49:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var a=n(14),r=n.n(a),c=n(15),s=n(21),u=n(0),l=n.n(u),i=n(29),o=n.n(i),p=function(){var e=Object(c.a)(r.a.mark(function e(t){var n,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.get("/getVehicles");case 3:if(n=e.sent,(a=n.data).success){e.next=7;break}return e.abrupt("return",{success:!1,message:a.message});case 7:return e.abrupt("return",{success:!0,vehicles:a.vehicles});case 10:return e.prev=10,e.t0=e.catch(0),e.abrupt("return",{success:!1,message:"Error calling getVehicles endpoint"});case 13:case"end":return e.stop()}},e,null,[[0,10]])}));return function(t){return e.apply(this,arguments)}}(),h=(n(49),l.a.lazy(function(){return n.e(5).then(n.bind(null,53))})),m=l.a.lazy(function(){return n.e(0).then(n.bind(null,51))}),f=l.a.lazy(function(){return n.e(6).then(n.bind(null,54))});t.default=function(){var e=Object(u.useState)(!0),t=Object(s.a)(e,2),n=t[0],a=t[1],i=Object(u.useState)(""),o=Object(s.a)(i,2),b=o[0],v=o[1],d=Object(u.useState)({}),g=Object(s.a)(d,2),E=g[0],j=g[1];return Object(u.useEffect)(function(){!function(){var e=Object(c.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a(!0),e.next=3,p();case 3:(t=e.sent).success?j(t.vehicles):v(t.message),a(!1);case 6:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()()},E),l.a.createElement(l.a.Fragment,null,n?l.a.createElement(m,null):l.a.createElement("div",{className:"dash"},b.length>0&&l.a.createElement(f,{message:b}),"Le Dashboard - Code can be found at"," ",l.a.createElement("a",{href:"https://github.com/jmnelson12/vehicle_scraper",target:"_blank",rel:"noopener noreferrer"},"https://github.com/jmnelson12/vehicle_scraper"),l.a.createElement("hr",null),l.a.createElement("div",{className:"total-results-wrapper"},l.a.createElement("p",null,"Total Results: ",E.results.length)),l.a.createElement("ul",{className:"vehicle-list"},E.results.map(function(e,t){return l.a.createElement(h,{key:t,vehicle:e})}))))}}}]);
//# sourceMappingURL=4.82d81e5f.chunk.js.map