(this.webpackJsonpfreecell=this.webpackJsonpfreecell||[]).push([[0],{16:function(e,t,n){e.exports=n(28)},21:function(e,t,n){},22:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(10),c=n.n(o),i=(n(21),n(22),n(9)),s=n(8),u=n(6),l=n(3),d=(n(12),n(1)),f=n(14),m=n(5),p=["spades","hearts","clubs","diamonds"];function h(e,t){return!function(e,t){return b(e.suit)===b(t.suit)}(e,t)&&e.rank+1===t.rank}function b(e){switch(e){case"diamonds":case"hearts":return"red";case"spades":case"clubs":return"black";default:throw new Error("Unrecognized suit")}}function v(e){switch(e){case"clubs":return"\u2663";case"diamonds":return"\u2666";case"hearts":return"\u2665";case"spades":return"\u2660";default:throw new Error("Unrecognized suit")}}function y(e){if(e<0)throw new Error("No rank less 0");if(0===e)return"";if(e>13)throw new Error("No rank gt 13");return["A","2","3","4","5","6","7","8","9","10","J","Q","K"][e-1]}var k=n(4);function O(e,t){var n=e.suit,r=Object(k.last)(t[n]);return r?r.rank+1===e.rank:1===e.rank}var j,E,C=function(){function e(t){Object(s.a)(this,e),this.seed=t,this.state=void 0,this.state=t}return Object(u.a)(e,[{key:"rand",value:function(){return this.state=214013*this.state+2531011&2147483647,this.state>>16&32767}}]),e}();function g(e,t){var n=function(e){if(0===e.length)return[];for(var t=[Object(k.last)(e)],n=e.length-2;n>=0;n--){var r=e[n];if(!h(t[0],r))break;t.unshift(r)}return t}(e);if(null===t)return n;var r=n.findIndex((function(e){return h(e,t)}));return-1===r?[]:n.slice(r)}function w(e){for(var t,n,r=["clubs","diamonds","hearts","spades"].map((function(e){return Array(13).fill({}).map((function(t,n){return function(e){var t=e.suit,n=e.rank,r=e.position;if(n<0||13<n)throw new Error("Wrong rank "+n);if(!t.includes(t))throw new Error("Wrong suit "+t);return{suit:t,rank:n,id:y(n)+t[0].toUpperCase(),selected:!1,position:r}}({suit:e,rank:n+1,position:{stack:"columns",x:0,y:0}})}))})),a=k.zip.apply(void 0,Object(m.a)(r)),o=Object(k.flatten)(a),c=[],i=new C(e);o.length;){if(-1!==e){t=i.rand()%o.length;var s=[o[n=o.length-1],o[t]];o[t]=s[0],o[n]=s[1]}var u=o.pop();u.position.x=c.length%8,u.position.y=c.length/8|0,c.push(u)}return c}function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var x,D,F,T,S=(j=function(){function e(t){Object(s.a)(this,e),this.seed=t,this.turns=[],Object(i.a)(this,"allCards",E,this);var n=w(this.seed);this.allCards=n.map((function(e){return Object(d.l)(e)})),this.commitState(),this.selectCard=this.selectCard.bind(this),this.moveToFreePlace=this.moveToFreePlace.bind(this)}return Object(u.a)(e,[{key:"freeplaces",get:function(){var e=this.allCards.filter((function(e){return"freeplace"===e.position.stack}));return[e.find((function(e){return 0===e.position.x}))||null,e.find((function(e){return 1===e.position.x}))||null,e.find((function(e){return 2===e.position.x}))||null,e.find((function(e){return 3===e.position.x}))||null]}},{key:"columns",get:function(){var e=this;return Array(8).fill([]).map((function(t,n){return e.allCards.filter((function(e){return"columns"===e.position.stack&&e.position.x===n})).sort((function(e,t){return e.position.y-t.position.y}))}))}},{key:"foundation",get:function(){var e=this;return p.reduce((function(t,n){return t[n]=e.allCards.filter((function(e){return"foundation"===e.position.stack&&e.suit===n})),t[n].sort((function(e,t){return e.rank-t.rank})),t}),{})}},{key:"selectedCard",get:function(){return this.allCards.find((function(e){return e.selected}))||null}},{key:"selectedColumn",get:function(){return this.selectedCard&&"columns"===this.selectedCard.position.stack?this.columns[this.selectedCard.position.x]:null}},{key:"canPlaceColumns",get:function(){var e=this,t=this.selectedCard;return this.columns.map((function(n,r){if(null==t)return!1;if(0===n.length)return!0;var a=n[n.length-1];return"freeplace"===t.position.stack||"foundation"===t.position.stack?h(t,a):!!g(e.selectedColumn,a).length}))}},{key:"canPlaceFoundation",get:function(){var e=this,t=this.selectedCard;return p.reduce((function(n,r){return n[r]=!1,t&&(n[r]=O(t,e.foundation)&&t.suit===r),n}),{})}}]),Object(u.a)(e,[{key:"finishMove",value:function(){var e,t=this,n=(e=this.columns.map((function(e){return Object(k.last)(e)}))).concat.apply(e,Object(m.a)(this.freeplaces)).filter((function(e){return!!e})).filter((function(e){return function(e,t){if(1===e.rank)return 0===t[e.suit].length;var n=O(e,t),r=[].concat(Object(m.a)(t.clubs),Object(m.a)(t.diamonds),Object(m.a)(t.hearts),Object(m.a)(t.spades));return n&&2===r.filter((function(t){return h(t,e)})).length}(e,t.foundation)}));n.length&&setTimeout((function(){t.commitState(),n.forEach((function(e){return t._moveToFoundation(e)})),t.finishMove()}),300)}},{key:"commitState",value:function(){this.turns.push(this.allCards.map((function(e){return P({},e,{position:P({},e.position)})})))}},{key:"rollback",value:function(){if(this.turns.length){var e=this.turns.pop();this.allCards=e}}},{key:"selectCard",value:function(e){this.selectedCard===e?e.selected=!1:null!=this.selectedCard?(this.selectedCard.selected=!1,e.selected=!0):e.selected=!0}},{key:"moveToFreePlace",value:function(e){this.selectedCard&&null===this.freeplaces[e]&&(this.commitState(),this.selectedCard.position={stack:"freeplace",x:e,y:0},this.selectedCard.selected=!1,this.finishMove())}},{key:"tryToMove",value:function(e){this.selectedCard&&(this.selectedCard.selected=!1),e.selected=!0;var t=this.canPlaceColumns.findIndex((function(e){return!!e})),n=this.freeplaces.findIndex((function(e){return null===e}));-1!==t?this.moveToColumn(t):-1!==n&&"freeplace"!==e.position.stack?this.moveToFreePlace(n):this.canPlaceFoundation[e.suit]&&this.moveToFoundation(e.suit)}},{key:"moveToColumn",value:function(e){var t=this.selectedCard,n=this.selectedColumn;if(t){var r=[],a=Object(k.last)(this.columns[e])||null;r=n?g(n,a):[t],this.commitState(),r.forEach((function(t,n){t.position={stack:"columns",x:e,y:a?a.position.y+1+n:n}})),t.selected=!1,this.finishMove()}}},{key:"_moveToFoundation",value:function(e){O(e,this.foundation)&&(e.position={stack:"foundation",y:this.foundation[e.suit].length,x:0})}},{key:"moveToFoundation",value:function(e){var t=this.selectedCard;t&&t.suit===e&&"foundation"!==t.position.stack&&(this.commitState(),this._moveToFoundation(t),t.selected=!1,this.finishMove())}}]),e}(),E=Object(l.a)(j.prototype,"allCards",[d.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Object(l.a)(j.prototype,"freeplaces",[d.e],Object.getOwnPropertyDescriptor(j.prototype,"freeplaces"),j.prototype),Object(l.a)(j.prototype,"columns",[d.e],Object.getOwnPropertyDescriptor(j.prototype,"columns"),j.prototype),Object(l.a)(j.prototype,"foundation",[d.e],Object.getOwnPropertyDescriptor(j.prototype,"foundation"),j.prototype),Object(l.a)(j.prototype,"selectedCard",[d.e],Object.getOwnPropertyDescriptor(j.prototype,"selectedCard"),j.prototype),Object(l.a)(j.prototype,"selectedColumn",[d.e],Object.getOwnPropertyDescriptor(j.prototype,"selectedColumn"),j.prototype),Object(l.a)(j.prototype,"canPlaceColumns",[d.e],Object.getOwnPropertyDescriptor(j.prototype,"canPlaceColumns"),j.prototype),Object(l.a)(j.prototype,"canPlaceFoundation",[d.e],Object.getOwnPropertyDescriptor(j.prototype,"canPlaceFoundation"),j.prototype),j),M=new(x=function(){function e(){Object(s.a)(this,e),Object(i.a)(this,"board",D,this),Object(i.a)(this,"score",F,this),Object(i.a)(this,"seed",T,this),this.newGame(0)}return Object(u.a)(e,[{key:"newGame",value:function(e){this.seed=0===e||e<-1||e>32e3?32e3*Math.random()|0:e,this.board=new S(this.seed)}}]),e}(),D=Object(l.a)(x.prototype,"board",[d.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),F=Object(l.a)(x.prototype,"score",[d.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),T=Object(l.a)(x.prototype,"seed",[d.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),x);window.GAME=M;n(25);var z=n(2),G=Object(z.c)((function(){var e=Object(r.useRef)(null);return a.a.createElement(a.a.Fragment,null,a.a.createElement("header",{className:"header"},a.a.createElement("form",{className:"left",onSubmit:function(t){t.preventDefault();var n=e&&e.current?e.current.value:"0";M.newGame(Number(n))}},a.a.createElement("button",{type:"submit"},"New game"),a.a.createElement("label",{className:"seed-label"},"Seed #",a.a.createElement("input",{ref:e,className:"seed-input",type:"number",max:"32000",min:"-1"}))),a.a.createElement("div",{className:"right"},a.a.createElement("button",{onClick:function(){return M.board.rollback()}},"Undo"))),a.a.createElement("div",{className:"center"},a.a.createElement("h1",{className:"heading"},"Freecell - Game #",M.seed)))})),A=(n(26),n(15)),I=(n(27),n(7)),L=Object(I.a)((function(e){var t=e.card,n=e.onSelect,o=e.onDoubleClick,c=Object(r.useState)(""),i=Object(A.a)(c,2),s=i[0],u=i[1],l=s?{zIndex:s}:{},d=t.selected?"card-selected":"";return a.a.createElement("div",{style:l,className:"card card-".concat(b(t.suit)," ").concat(d),onClick:function(){return n&&n(t)},onMouseDown:function(e){2===e.button&&(e.preventDefault(),e.stopPropagation(),u("55"),document.body.addEventListener("mouseup",f))},onContextMenu:function(e){return e.preventDefault()},onDoubleClick:o},a.a.createElement("div",{className:"card-header"},a.a.createElement("span",{className:"card-suit"},v(t.suit)),a.a.createElement("span",{className:"card-rank"},y(t.rank))),a.a.createElement("div",{className:"card-center"},a.a.createElement("span",{className:"card-suit"},v(t.suit)),a.a.createElement("span",{className:"card-rank"},y(t.rank))),a.a.createElement("div",{className:"card-footer"},a.a.createElement("span",{className:"card-suit"},v(t.suit)),a.a.createElement("span",{className:"card-rank"},y(t.rank))));function f(e){2===e.button&&(u(""),document.body.removeEventListener("mouseup",f))}})),U=Object(I.a)((function(){var e=M.board;return a.a.createElement("div",{className:"board"},a.a.createElement("div",{className:"free-places"},a.a.createElement(_,{key:0,i:0}),a.a.createElement(_,{key:1,i:1}),a.a.createElement(_,{key:2,i:2}),a.a.createElement(_,{key:3,i:3})),a.a.createElement("div",{className:"foundation-row"},p.map((function(e){return a.a.createElement(J,{suit:e,key:e})}))),a.a.createElement("div",{className:"columns"},e.columns.map((function(e,t){return a.a.createElement(W,{index:t,key:t})}))))})),W=Object(I.a)((function(e){var t=e.index,n=M.board,r=n.columns[t],o=r.slice(0,-1),c=Object(k.last)(r)||null,i=n.canPlaceColumns[t],s=i?"can-place":"";return a.a.createElement("div",{className:"column ".concat(s),onClick:function(){i&&n.moveToColumn(t)}},o.map((function(e){return a.a.createElement(L,{key:e.id,card:e})})),c&&a.a.createElement(L,{key:c.id,card:c,onSelect:function(){return!i&&M.board.selectCard(c)},onDoubleClick:function(){return n.tryToMove(c)}}))})),J=Object(I.a)((function(e){var t=e.suit,n=M.board,r=n.foundation[t],o=Object(k.last)(r),c=!!M.board.canPlaceFoundation[t],i=c?"can-place":"";return a.a.createElement("div",{className:"foundation ".concat(i),onClick:function(){return n.moveToFoundation(t)}},o?a.a.createElement(L,{card:o,onSelect:function(){return!c&&M.board.selectCard(o)},onDoubleClick:function(){return n.tryToMove(o)}}):a.a.createElement("div",{className:"foundation-empty foundation-empty-".concat(b(t))},v(t)))})),_=Object(I.a)((function(e){var t=e.i,n=M.board,r=n.freeplaces[t];if(null!=r)return a.a.createElement("div",{className:"free-place"},a.a.createElement(L,{onDoubleClick:function(){return n.tryToMove(r)},onSelect:n.selectCard,card:r}));var o=M.board.selectedCard?"can-place":"";return a.a.createElement("div",{className:"free-place ".concat(o),onClick:function(){return n.moveToFreePlace(t)}})})),B=function(e){var t=e.game;return Object(r.useEffect)((function(){return document.addEventListener("keydown",n),function(){return document.removeEventListener("keydown",n)}})),Object(r.useEffect)((function(){return Object(d.d)((function(){document.title="Freecell - Game #"+t.seed}))})),a.a.createElement("div",null,a.a.createElement(U,null));function n(e){"z"===e.key&&e.ctrlKey&&t.board.rollback()}},K=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(G,null),a.a.createElement(B,{game:M}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[16,1,2]]]);
//# sourceMappingURL=main.19d2088f.chunk.js.map