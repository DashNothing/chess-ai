(this.webpackJsonpchess=this.webpackJsonpchess||[]).push([[0],{31:function(t,e,r){},36:function(t,e,r){"use strict";r.r(e);var a,o,n=r(1),i=r.n(n),l=r(26),c=r.n(l),u=(r(31),r(3)),s=r(4),d=r(0),f=r(6),v=r(12),b=r.n(v),h=r(19);!function(t){t[t.King=0]="King",t[t.Queen=1]="Queen",t[t.Rook=2]="Rook",t[t.Bishop=3]="Bishop",t[t.Knight=4]="Knight",t[t.Pawn=5]="Pawn"}(a||(a={})),function(t){t[t.White=0]="White",t[t.Black=1]="Black"}(o||(o={}));for(var p=r(9),g=r(13),S=r(5),k=r(10),y=[8,-8,-1,1,7,-7,9,-9],m=[15,17,-17,-15,10,-6,6,-10],O=[[]],j=[],q=[[]],w=[[]],x=[],P=[],M=[[]],B=[[]],W=function(t){var e=Math.floor(t/8),r=t-8*e,a=7-e,o=e,n=r,i=7-r;O[t]=[],O[t][0]=a,O[t][1]=o,O[t][2]=n,O[t][3]=i,O[t][4]=Math.min(a,n),O[t][5]=Math.min(o,i),O[t][6]=Math.min(a,i),O[t][7]=Math.min(o,n);for(var l=[],c=0;c<4;c++)for(var u=y[c],s=0;s<O[t][c];s++){var d=t+u*(s+1);l.push(d)}j[t]=l;for(var f=[],v=4;v<8;v++)for(var b=y[v],h=0;h<O[t][v];h++){var p=t+b*(h+1);f.push(p)}q[t]=f;for(var g=[],S=0;S<8;S++)for(var k=y[S],W=0;W<O[t][S];W++){var K=t+k*(W+1);g.push(K)}w[t]=g;var R=[];y.forEach((function(a){var o=t+a;if(o>=0&&o<64){var n=Math.floor(o/8),i=o-8*n;1===Math.max(Math.abs(r-i),Math.abs(e-n))&&R.push(o)}})),x[t]=R;var L=[];m.forEach((function(a){var o=t+a;if(o>=0&&o<64){var n=Math.floor(o/8),i=o-8*n;2===Math.max(Math.abs(r-i),Math.abs(e-n))&&L.push(o)}})),P[t]=L;var C=[],E=[];r>0&&(e<7&&C.push(t+7),e>0&&E.push(t-9)),r<7&&(e<7&&C.push(t+9),e>0&&E.push(t-7)),M[t]=C,B[t]=E},K=0;K<64;K++)W(K);var R,L,C,E,I,Q,_,D,T=[0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-30,-30,10,10,5,0,0,0,0,0,0,0,0],N=[].concat(T).reverse(),Y=[-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,0,0,0,-20,-40,-30,0,10,15,15,10,0,-30,-30,5,15,20,20,15,5,-30,-30,0,15,20,20,15,0,-30,-30,5,10,15,15,10,5,-30,-40,-20,0,5,5,0,-20,-40,-50,-30,-30,-30,-30,-30,-30,-50],z=[].concat(Y).reverse(),A=[-20,-10,-10,-10,-10,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,10,10,5,0,-10,-10,5,5,10,10,5,5,-10,-10,0,10,10,10,10,0,-10,-10,10,10,10,10,10,10,-10,-10,5,0,0,0,0,5,-10,-20,-10,-10,-10,-10,-10,-10,-20],F=[].concat(A).reverse(),J=[0,0,0,0,0,0,0,0,5,10,10,10,10,10,10,5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,0,0,0,5,5,0,0,0],U=[].concat(J).reverse(),G=[-20,-10,-10,-5,-5,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,5,5,5,0,-10,-5,0,5,5,5,5,0,-5,0,0,5,5,5,5,0,-5,-10,5,5,5,5,5,0,-10,-10,0,5,0,0,0,0,-10,-20,-10,-10,-5,-5,-10,-10,-20],V=[].concat(G).reverse(),H=[-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-20,-30,-30,-40,-40,-30,-30,-20,-10,-20,-20,-20,-20,-20,-20,-10,20,20,0,0,0,0,20,20,20,30,10,0,0,10,30,20],X=[].concat(H).reverse(),Z=[-50,-40,-30,-20,-20,-30,-40,-50,-30,-20,-10,0,0,-10,-20,-30,-30,-10,20,30,30,20,-10,-30,-30,-10,30,40,40,30,-10,-30,-30,-10,30,40,40,30,-10,-30,-30,-10,20,30,30,20,-10,-30,-30,-30,0,0,0,0,-30,-30,-50,-30,-30,-30,-30,-30,-30,-50],$=[].concat(Z).reverse(),tt=function(t){var e=[],r=t.boardState.map((function(t,e){return[t,e]}));r=r.filter((function(e){var r=Object(s.a)(e,2),a=r[0];r[1];return(null===a||void 0===a?void 0:a.color)===t.currentPlayer}));var n=[8,-8,-1,1,7,-7,9,-9];return r.forEach((function(r){var i=Object(s.a)(r,2),l=i[0],c=i[1];switch(null===l||void 0===l?void 0:l.type){case a.Rook:for(var u=0;u<4;u++)for(var d=n[u],f=0;f<O[c][u];f++){var v,b,h=c+d*(f+1);if((null===(v=t.boardState[h])||void 0===v?void 0:v.color)===(null===l||void 0===l?void 0:l.color))break;if(e.push({fromSquare:c,toSquare:h}),null!=t.boardState[h]&&(null===(b=t.boardState[h])||void 0===b?void 0:b.color)!==(null===l||void 0===l?void 0:l.color))break}break;case a.Bishop:for(var p=4;p<8;p++)for(var g=n[p],y=0;y<O[c][p];y++){var m,j,q=c+g*(y+1);if((null===(m=t.boardState[q])||void 0===m?void 0:m.color)===(null===l||void 0===l?void 0:l.color))break;if(e.push({fromSquare:c,toSquare:q}),null!=t.boardState[q]&&(null===(j=t.boardState[q])||void 0===j?void 0:j.color)!==(null===l||void 0===l?void 0:l.color))break}break;case a.Queen:for(var w=0;w<8;w++)for(var W=n[w],K=0;K<O[c][w];K++){var R,L,C=c+W*(K+1);if((null===(R=t.boardState[C])||void 0===R?void 0:R.color)===t.currentPlayer)break;if(e.push({fromSquare:c,toSquare:C}),null!=t.boardState[C]&&(null===(L=t.boardState[C])||void 0===L?void 0:L.color)!==t.currentPlayer)break}break;case a.Knight:P[c].forEach((function(r){var a;(null===(a=t.boardState[r])||void 0===a?void 0:a.color)!==t.currentPlayer&&e.push({fromSquare:c,toSquare:r})}));break;case a.King:var E,I=Object(k.a)(x[c]),Q=rt(t),_=Object(S.a)(Q);try{for(_.s();!(E=_.n()).done;){var D,T=E.value,N=Object(S.a)(I);try{for(N.s();!(D=N.n()).done;){var Y=D.value;Y===T&&I.splice(I.indexOf(Y),1)}}catch(G){N.e(G)}finally{N.f()}}}catch(G){_.e(G)}finally{_.f()}I.forEach((function(r){var a;(null===(a=t.boardState[r])||void 0===a?void 0:a.color)!==(null===l||void 0===l?void 0:l.color)&&e.push({fromSquare:c,toSquare:r})}));var z=t.currentPlayer===o.White?t.castlingRights.whiteShort:t.castlingRights.blackShort,A=t.currentPlayer===o.White?t.castlingRights.whiteLong:t.castlingRights.blackLong;z&&(null!=t.boardState[c+1]||null!=t.boardState[c+2]||Q.includes(c+1)||Q.includes(c+2)||e.push({fromSquare:c,toSquare:c+2})),A&&(null!=t.boardState[c-1]||null!=t.boardState[c-2]||Q.includes(c-1)||Q.includes(c-2)||e.push({fromSquare:c,toSquare:c-2}));break;case a.Pawn:var F=l.color===o.White?c+8:c-8;F>=0&&F<64&&null==t.boardState[F]&&e.push({fromSquare:c,toSquare:F});var J=l.color===o.White?c+16:c-16,U=l.color===o.White?1:6;Math.floor(c/8)===U&&null==t.boardState[F]&&null==t.boardState[J]&&e.push({fromSquare:c,toSquare:J});(l.color===o.White?M[c]:B[c]).forEach((function(r){var a;(null===(a=t.boardState[r])||void 0===a?void 0:a.color)!==t.currentPlayer&&null!=t.boardState[r]&&e.push({fromSquare:c,toSquare:r})}))}})),e},et=function(t){var e=tt(t),r=[],o=ot(t);if(o.length>0)if(1==o.length){var n,i,l=e.filter((function(e){var r;return(null===(r=t.boardState[e.fromSquare])||void 0===r?void 0:r.type)===a.King})),c=e.filter((function(e){return e.toSquare===t.boardState.indexOf(o[0])}));if(ut(o[0].type)){var u,s=nt(o[0],t),d=e.filter((function(t){return s.includes(t.toSquare)}));(u=r).push.apply(u,Object(k.a)(d))}(n=r).push.apply(n,Object(k.a)(l)),(i=r).push.apply(i,Object(k.a)(c))}else r=e.filter((function(e){var r;return(null===(r=t.boardState[e.fromSquare])||void 0===r?void 0:r.type)===a.King}));else{r=e;var f,v=t.boardState.filter((function(e){return e&&e.color!==t.currentPlayer&&ut(e.type)})).map((function(e){return{attackerSquare:t.boardState.indexOf(e),ray:nt(e,t)}})),b=Object(S.a)(v);try{var h=function(){var e=f.value,a=0,o=void 0;(e.ray.forEach((function(e){var r;(null===(r=t.boardState[e])||void 0===r?void 0:r.color)===t.currentPlayer&&1==++a&&(o=e)})),2==a)&&r.filter((function(t){return t.fromSquare==o})).filter((function(t){return!e.ray.includes(t.toSquare)&&t.toSquare!==e.attackerSquare})).forEach((function(t){r.splice(r.indexOf(t),1)}))};for(b.s();!(f=b.n()).done;)h()}catch(p){b.e(p)}finally{b.f()}}return r},rt=function(t){var e=[],r=t.currentPlayer===o.White?o.Black:o.White;return t.boardState.filter((function(t){return null!=t&&(null===t||void 0===t?void 0:t.color)===r})).map((function(t){return t})).forEach((function(r){e.push.apply(e,Object(k.a)(at(t,r,t.boardState.indexOf(r))))})),e},at=function(t,e,r){var n=[],i=[8,-8,-1,1,7,-7,9,-9];switch(null===e||void 0===e?void 0:e.type){case a.Rook:for(var l=0;l<4;l++)for(var c=i[l],u=0;u<O[r][l];u++){var s,d,f,v=r+c*(u+1);if(n.push(v),(null===(s=t.boardState[v])||void 0===s?void 0:s.color)===(null===e||void 0===e?void 0:e.color))break;if(null!=t.boardState[v]&&(null===(d=t.boardState[v])||void 0===d?void 0:d.color)!==(null===e||void 0===e?void 0:e.color)&&(null===(f=t.boardState[v])||void 0===f?void 0:f.type)!==a.King)break}break;case a.Bishop:for(var b=4;b<8;b++)for(var h=i[b],p=0;p<O[r][b];p++){var g,S,y,m=r+h*(p+1);if(n.push(m),(null===(g=t.boardState[m])||void 0===g?void 0:g.color)===(null===e||void 0===e?void 0:e.color))break;if(null!=t.boardState[m]&&(null===(S=t.boardState[m])||void 0===S?void 0:S.color)!==(null===e||void 0===e?void 0:e.color)&&(null===(y=t.boardState[m])||void 0===y?void 0:y.type)!==a.King)break}break;case a.Queen:for(var j=0;j<8;j++)for(var q=i[j],w=0;w<O[r][j];w++){var W,K,R,L=r+q*(w+1);if(n.push(L),(null===(W=t.boardState[L])||void 0===W?void 0:W.color)===(null===e||void 0===e?void 0:e.color))break;if(null!=t.boardState[L]&&(null===(K=t.boardState[L])||void 0===K?void 0:K.color)!==(null===e||void 0===e?void 0:e.color)&&(null===(R=t.boardState[L])||void 0===R?void 0:R.type)!==a.King)break}break;case a.Knight:P[r].forEach((function(t){n.push(t)}));break;case a.Pawn:(e.color===o.White?M[r]:B[r]).forEach((function(t){n.push(t)}));break;case a.King:Object(k.a)(x[r]).forEach((function(t){n.push(t)}))}return n},ot=function(t){var e,r=[],n=t.boardState.indexOf(t.boardState.find((function(e){return(null===e||void 0===e?void 0:e.type)==a.King&&(null===e||void 0===e?void 0:e.color)==t.currentPlayer}))),i=t.currentPlayer===o.White?o.Black:o.White,l=t.boardState.filter((function(t){return null!=t&&(null===t||void 0===t?void 0:t.color)===i})).map((function(t){return t})),c=Object(S.a)(l);try{for(c.s();!(e=c.n()).done;){var u,s=e.value,d=at(t,s,t.boardState.indexOf(s)),f=Object(S.a)(d);try{for(f.s();!(u=f.n()).done;){u.value===n&&r.push(s)}}catch(v){f.e(v)}finally{f.f()}}}catch(v){c.e(v)}finally{c.f()}return r},nt=function(t,e){for(var r=[],o=e.boardState.indexOf(t),n=[8,-8,-1,1,7,-7,9,-9],i=t.type===a.Bishop?4:0,l=t.type===a.Rook?4:8,c=i;c<l;c++){for(var u=n[c],s=!1,d=[],f=0;f<O[o][c];f++){var v,b,h,p=o+u*(f+1);if((null===(v=e.boardState[p])||void 0===v?void 0:v.color)===(null===t||void 0===t?void 0:t.color))break;if(d.push(p),null!=e.boardState[p]&&(null===(b=e.boardState[p])||void 0===b?void 0:b.color)!==(null===t||void 0===t?void 0:t.color)&&(null===(h=e.boardState[p])||void 0===h?void 0:h.type)===a.King){s=!0;break}}if(s){r=[].concat(d);break}}return r},it=function(t,e){var r,n,i,l,c=Object(k.a)(t.boardState),u=Object(g.a)({},t.castlingRights),s=t.currentPlayer,d=null,f=t.halfMoveClock,v=t.fullMoves,b=c[e.fromSquare];c[e.fromSquare]=null,c[e.toSquare]=b;var h,p=!1;if(null!=t.boardState[e.toSquare]&&(p=!0),(null===(r=t.boardState[e.fromSquare])||void 0===r?void 0:r.type)===a.King){var S=lt(e);if(S){var y=c[S.fromSquare];c[S.fromSquare]=null,c[S.toSquare]=y}t.currentPlayer===o.White?(u.whiteShort=!1,u.whiteLong=!1):(u.blackShort=!1,u.blackLong=!1)}((null===(n=t.boardState[e.fromSquare])||void 0===n?void 0:n.type)===a.Rook&&(t.currentPlayer===o.White?0===e.fromSquare?u.whiteLong=!1:7===e.fromSquare&&(u.whiteShort=!1):56===e.fromSquare?u.blackLong=!1:63===e.fromSquare&&(u.blackShort=!1)),(null===(i=t.boardState[e.toSquare])||void 0===i?void 0:i.type)===a.Rook)&&((null===(h=t.boardState[e.toSquare])||void 0===h?void 0:h.color)===o.White?0===e.toSquare?u.whiteLong=!1:7===e.toSquare&&(u.whiteShort=!1):56===e.toSquare?u.blackLong=!1:63===e.toSquare&&(u.blackShort=!1));if(ct(e,t.boardState)?t.currentPlayer==o.Black&&(c=st(Object(g.a)(Object(g.a)({},t),{},{boardState:c}),e.toSquare,a.Queen).boardState,s=o.White,v++):t.currentPlayer===o.White?s=o.Black:(s=o.White,v++),(null===(l=t.boardState[e.fromSquare])||void 0===l?void 0:l.type)===a.Pawn){var m;if(2===Math.abs(Math.floor(e.fromSquare/8)-Math.floor(e.toSquare/8)))d=e.toSquare+8*((null===(m=t.boardState[e.fromSquare])||void 0===m?void 0:m.color)===o.White?-1:1);p=!0}return!1===p?f++:f=0,{boardState:c,castlingRights:u,currentPlayer:s,enPassantSquare:d,halfMoveClock:f,fullMoves:v}},lt=function(t){return t.toSquare===t.fromSquare+2?{fromSquare:t.toSquare+1,toSquare:t.toSquare-1}:t.toSquare===t.fromSquare-2?{fromSquare:t.toSquare-2,toSquare:t.toSquare+1}:void 0},ct=function(t,e){var r;if((null===(r=e[t.fromSquare])||void 0===r?void 0:r.type)==a.Pawn){var n,i;if((null===(n=e[t.fromSquare])||void 0===n?void 0:n.color)==o.White&&7==Math.floor(t.toSquare/8))return!0;if((null===(i=e[t.fromSquare])||void 0===i?void 0:i.color)==o.Black&&0==Math.floor(t.toSquare/8))return!0}return!1},ut=function(t){return t===a.Bishop||t===a.Rook||t===a.Queen},st=function(t,e,r){var a=Object(k.a)(t.boardState),n=t.currentPlayer,i=t.fullMoves;return null!=a[e]&&(a[e]={color:a[e].color,type:r}),t.currentPlayer===o.White?n=o.Black:(n=o.White,i++),Object(g.a)(Object(g.a)({},t),{},{boardState:a,currentPlayer:n,fullMoves:i})},dt=function(t){var e,r,n,i=[],l={whiteShort:!1,whiteLong:!1,blackShort:!1,blackLong:!1},c=null,u=function(t){switch(t.toLowerCase()){case"p":return a.Pawn;case"r":return a.Rook;case"n":return a.Knight;case"b":return a.Bishop;case"q":return a.Queen;case"k":default:return a.King}},s=t.split(" "),d=s[0],f=0,v=7,b=Object(S.a)(d);try{for(b.s();!(n=b.n()).done;){var h=n.value;if("/"===h)f=0,v--;else if(isNaN(parseInt(h))){var p={type:u(h),color:h===h.toUpperCase()?o.White:o.Black};i[f+8*v]=p,f++}else{for(var g=0;g<parseInt(h);g++)i[f+g+8*v]=null;f+=parseInt(h)}}}catch(w){b.e(w)}finally{b.f()}e="w"===s[1]?o.White:o.Black;var k=s[2];k.includes("K")&&(l.whiteShort=!0),k.includes("Q")&&(l.whiteLong=!0),k.includes("k")&&(l.blackShort=!0),k.includes("q")&&(l.blackLong=!0);var y=s[3];if("-"!==y){var m=y[0],O=y[1];c=m.charCodeAt(0)-65+8*parseInt(O)}var j=s[4];r=parseInt(j);var q=s[5];return{boardState:i,castlingRights:l,currentPlayer:e,enPassantSquare:c,halfMoveClock:r,fullMoves:parseInt(q)}},ft=function(t,e){var r,n,i,l=(r={},Object(p.a)(r,a.Pawn,100),Object(p.a)(r,a.Bishop,330),Object(p.a)(r,a.Knight,320),Object(p.a)(r,a.Rook,500),Object(p.a)(r,a.Queen,900),Object(p.a)(r,a.King,2e4),r),c=0,u=0,s=!1,d=!1,f={type:a.Queen,color:o.White};t.includes(f)?0==t.filter((function(t){return(null===t||void 0===t?void 0:t.color)==o.White&&((null===t||void 0===t?void 0:t.type)==a.Bishop||(null===t||void 0===t?void 0:t.type)==a.Knight||(null===t||void 0===t?void 0:t.type)==a.Rook)})).length&&(d=!0):d=!0;if(d){var v={type:a.Queen,color:o.Black};if(t.includes(v))0==t.filter((function(t){return(null===t||void 0===t?void 0:t.color)==o.Black&&((null===t||void 0===t?void 0:t.type)==a.Bishop||(null===t||void 0===t?void 0:t.type)==a.Knight||(null===t||void 0===t?void 0:t.type)==a.Rook)})).length&&(s=!0);else s=!0}return s&&(n=t.findIndex((function(t){return(null===t||void 0===t?void 0:t.color)===o.White&&t.type===a.King})),i=t.findIndex((function(t){return(null===t||void 0===t?void 0:t.color)===o.Black&&t.type===a.King}))),t.forEach((function(t,r){if(t){var d=[],f=null;if(t.color===o.White)switch(s&&(f=i),t.type){case a.Pawn:d=N;break;case a.Bishop:d=F;break;case a.Knight:d=z;break;case a.Rook:d=U;break;case a.Queen:d=V;break;case a.King:d=s?$:X}else switch(s&&(f=n),t.type){case a.Pawn:d=T;break;case a.Bishop:d=A;break;case a.Knight:d=Y;break;case a.Rook:d=J;break;case a.Queen:d=G;break;case a.King:d=s?Z:H}var v=l[t.type],b=d[r];s&&60*vt(f,r),(null===t||void 0===t?void 0:t.color)===e?c+=v+b:u+=v+b}})),c-u},vt=function(t,e){return[8,-8,-1,1,7,-7,9,-9].includes(e-t)?2:[16,-16,17,-17,18,-18,10,-10,2,-2,6,-6,14,-14,15,-15].includes(e-t)?1:0},bt=f.a.div(R||(R=Object(u.a)(["\n\twidth: 500px;\n\theight: 500px;\n\tbackground-color: green;\n\tdisplay: grid;\n\tgrid-template-columns: repeat(8, 1fr);\n\tgrid-template-rows: repeat(8, 1fr);\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n"]))),ht=f.a.div(L||(L=Object(u.a)(["\n\tposition: relative;\n\tdisplay: grid;\n\tplace-items: center;\n\tgrid-row: ",";\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: ",';\n\tcolor: black;\n\n\t::after {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\twidth: 85%;\n\t\theight: 85%;\n\t\tborder: 2px solid #5ca099;\n\t\topacity: ',';\n\t\tpointer-events: none;\n\t\tz-index: 2;\n\t}\n\n\t::before {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tbackground-color: #a8c8a6;\n\t\topacity: ',";\n\t\tpointer-events: none;\n\t\tz-index: 0;\n\t}\n\n\tdiv {\n\t\twidth: 80%;\n\t\theight: 80%;\n\t\tbackground-image: ",";\n\t\tbackground-size: cover;\n\t\tz-index: 1;\n\t}\n"])),(function(t){return t.row}),(function(t){return t.isLight?"#f6edcd":"#f0cf8e"}),(function(t){return t.isMarkedLegal?1:0}),(function(t){return t.isMarkedLastMove?.9:0}),(function(t){return'url("'.concat("/chess-ai","/images/").concat(t.image,'.svg")')})),pt=function(t){if(null==t)return"";switch(t.type){case a.King:return t.color===o.Black?"king_b":"king_w";case a.Queen:return t.color===o.Black?"queen_b":"queen_w";case a.Rook:return t.color===o.Black?"rook_b":"rook_w";case a.Bishop:return t.color===o.Black?"bishop_b":"bishop_w";case a.Knight:return t.color===o.Black?"knight_b":"knight_w";case a.Pawn:return t.color===o.Black?"pawn_b":"pawn_w";default:return""}},gt=function(t){var e=t.gameState,r=t.lastMove,a=t.onMakeMove,o=Object(n.useState)([]),i=Object(s.a)(o,2),l=i[0],c=i[1],u=e.boardState.map((function(t,a){return Object(d.a)(ht,{key:a,isLight:!(Math.floor(a/8)%2!==0?a%2!==0:a%2===0),row:8-Math.floor(a/8),image:pt(t),onDragOver:function(t){return f(t)},onDrop:function(t){return g(t,a)},isMarkedLegal:l.includes(a),isMarkedLastMove:(null===r||void 0===r?void 0:r.fromSquare)===a||(null===r||void 0===r?void 0:r.toSquare)===a},Object(d.a)("span",{style:{position:"absolute",top:"0px",left:"0px"}}),t?t.color===e.currentPlayer?Object(d.a)("div",{draggable:!0,onDragStart:function(e){return v(e,a,pt(t))},onDragEnd:function(t){return p(t)}}):Object(d.a)("div",null):null)})),f=function(t){t.preventDefault()},v=function(){var t=Object(h.a)(b.a.mark((function t(r,a,o){var n,i;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.currentTarget.style.opacity="0",r.dataTransfer.setData("tilePosition",a.toString()),(n=new Image).src="".concat("/chess-ai","/images/").concat(o,".svg"),r.dataTransfer.setDragImage(n,45,45),i=et(e),c(i.filter((function(t){var e=t.fromSquare;t.toSquare;return e===a})).map((function(t){t.fromSquare;return t.toSquare})));case 7:case"end":return t.stop()}}),t)})));return function(e,r,a){return t.apply(this,arguments)}}(),p=function(t){t.currentTarget.style.opacity="1",c([])},g=function(t,e){if(l.includes(e)){var r={fromSquare:parseInt(t.dataTransfer.getData("tilePosition")),toSquare:e};a(r),c([])}};return Object(d.a)(bt,null,u)},St=f.a.aside(C||(C=Object(u.a)(["\n\tpadding: 10px;\n\tbackground-color: rgba(0, 0, 0, 0.2);\n\n\tdiv {\n\t\tmargin: 10px 0;\n\t}\n"]))),kt=function(t){var e=t.gameState;return Object(d.a)(St,null,Object(d.a)("p",null,"Current player:"," ",e.currentPlayer===o.White?"white":"black"),Object(d.a)("div",null,Object(d.a)("h3",null,"Castling rights"),Object(d.a)("h4",null,"White"),Object(d.a)("p",null,"White king side: ",e.castlingRights.whiteShort.toString()),Object(d.a)("p",null,"White queen side: ",e.castlingRights.whiteLong.toString()),Object(d.a)("h4",null,"Black"),Object(d.a)("p",null,"Black king side: ",e.castlingRights.blackShort.toString()),Object(d.a)("p",null,"Black queen side: ",e.castlingRights.blackLong.toString())),Object(d.a)("div",null,Object(d.a)("p",null,"En passant square: ",function(t){for(var e=t.boardState,r=t.currentPlayer,n=t.castlingRights,i=t.enPassantSquare,l=t.halfMoveClock,c=t.fullMoves,u="",s=function(t){var e="";if(null==t)return e;switch(t.type){case a.Pawn:e="p";break;case a.Rook:e="r";break;case a.Knight:e="n";break;case a.Bishop:e="b";break;case a.Queen:e="q";break;case a.King:e="k"}return t.color===o.White&&(e=e.toUpperCase()),e},d=7;d>=0;d--){for(var f=0,v=0;v<8;v++)null==e[v+8*d]?f++:(f>0&&(u+=f.toString()),u+=s(e[v+8*d]),f=0);f>0&&(u+=f.toString()),0!==d&&(u+="/")}return u+=" ",u+=r===o.White?"w":"b",u+=" ",u+=n.whiteShort?"K":"",u+=n.whiteLong?"Q":"",u+=n.blackShort?"k":""," "===(u+=n.blackLong?"q":"")[u.length-1]&&(u+="-"),u+=" ",u+=null==i?"-":String.fromCharCode(i-8*Math.floor(i/8)+65)+(Math.floor(i/8)+1),u+=" ",u+=l+" "+c}(e).split(" ")[3])),Object(d.a)("div",null,Object(d.a)("p",null,"50 move rule counter: ",e.halfMoveClock)),Object(d.a)("div",null,Object(d.a)("p",null,"Full moves: ",e.fullMoves)),Object(d.a)("p",null,"Evaluation score:"," ",ft(e.boardState,o.White)))},yt=Object(d.b)(E||(E=Object(u.a)(["\n\t0% {\n\t\ttransform: translateY(200px);\n\t\topacity: 0;\n\t}\n\t100% {\n\t\ttransform: translateY(0px);\n\t\topacity: 1;\n\t}\n"]))),mt=f.a.div(I||(I=Object(u.a)(["\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n\tdisplay: flex;\n\tflex-direction: row;\n\tcolumn-gap: 10px;\n\n\tbutton {\n\t\tpadding: 10px;\n\t\tbackground-color: #fff;\n\t\tborder-radius: 100%;\n\t\tbox-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);\n\t\topacity: 0;\n\t\tanimation: "," 0.4s;\n\t\tanimation-fill-mode: forwards;\n\n\t\timg {\n\t\t\tdisplay: block;\n\t\t\twidth: 35px;\n\t\t\theight: 35px;\n\t\t\tobject-fit: contain;\n\t\t}\n\t}\n"])),yt),Ot=function(t){t.x,t.y;var e=t.isShowing,r=t.onSelect;return Object(d.a)("div",null,1==e&&Object(d.a)(mt,null,Object(d.a)("button",{style:{animationDelay:"0s"},onClick:function(t){return r(a.Queen)}},Object(d.a)("img",{src:"".concat("/chess-ai","/images/queen_w.svg")})),Object(d.a)("button",{style:{animationDelay:"0.1s"},onClick:function(t){return r(a.Rook)}},Object(d.a)("img",{src:"".concat("/chess-ai","/images/rook_w.svg")})),Object(d.a)("button",{style:{animationDelay:"0.2s"},onClick:function(t){return r(a.Bishop)}},Object(d.a)("img",{src:"".concat("/chess-ai","/images/bishop_w.svg")})),Object(d.a)("button",{style:{animationDelay:"0.3s"},onClick:function(t){return r(a.Knight)}},Object(d.a)("img",{src:"".concat("/chess-ai","/images/knight_w.svg")}))))},jt=Object(d.b)(Q||(Q=Object(u.a)(["\n\t0% {\n\t\ttransform: translateY(200px);\n\t\topacity: 0;\n\t}\n\t100% {\n\t\ttransform: translateY(0px);\n\t\topacity: 1;\n\t}\n"]))),qt=f.a.div(_||(_=Object(u.a)(["\n\tcolumn-gap: 10px;\n\tbackground-color: #fff;\n\tcolor: #000;\n\tpadding: 20px 60px;\n\ttext-align: center;\n\tborder-radius: 6px;\n\tbox-shadow: 0px 4px 32px rgba(0, 0, 0, 0.2);\n\topacity: 0;\n\tanimation: "," 0.4s;\n\tanimation-fill-mode: forwards;\n\n\th3 {\n\t\tmargin-bottom: 10px;\n\t}\n\n\tp {\n\t\tmargin-bottom: 15px;\n\t}\n\n\tbutton {\n\t\tpadding: 15px 25px;\n\t\tbackground-color: #7ee654;\n\t\tfont-weight: bold;\n\t\tborder-radius: 6px;\n\t\tbox-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);\n\t}\n"])),jt),wt=function(t){t.x,t.y;var e=t.isShowing,r=t.winner,a=t.onRestart;return Object(d.a)("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}},1==e&&Object(d.a)(qt,null,Object(d.a)("h3",null,null!==r?"Checkmate":"Stalemate"),Object(d.a)("p",null,null!==r&&"Winner is ".concat(r===o.White?"white":"black")),Object(d.a)("button",{style:{animationDelay:"0.3s"},onClick:function(t){a()}},"Play again")))},xt="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";var Pt=f.a.main(D||(D=Object(u.a)(["\n\tdisplay: grid;\n\tgrid-template-columns: 1fr 3fr 1fr;\n\tpadding: 40px;\n"]))),Mt=function(){var t=Object(n.useState)(dt(xt)),e=Object(s.a)(t,2),r=e[0],a=e[1],i=Object(n.useState)(null),l=Object(s.a)(i,2),c=l[0],u=l[1],f=Object(n.useState)(!1),v=Object(s.a)(f,2),b=v[0],h=v[1],p=Object(n.useState)(!1),g=Object(s.a)(p,2),k=g[0],y=g[1],m=Object(n.useState)(null),O=Object(s.a)(m,2),j=O[0],q=O[1],w=Object(n.useState)(null),x=Object(s.a)(w,2),P=x[0],M=x[1];Object(n.useEffect)((function(){console.log("Checking chackmate for: "+r.currentPlayer);var t=et(r);0===t.length&&(console.log("Generated moves for "+r.currentPlayer),console.log(t.length),ot(r).length>0&&q(r.currentPlayer==o.White?o.Black:o.White),y(!0));if(r.currentPlayer===o.Black){var e=function(t){var e,r=0,a=function t(e,a,o,n){if(r++,0==n)return ft(e.boardState,e.currentPlayer);var i,l=et(e),c=Object(S.a)(l);try{for(c.s();!(i=c.n()).done;){var u=i.value,s=-1*t(it(e,u),-1*o,-1*a,n-1);if(s>=o)return o;s>a&&(a=s)}}catch(d){c.e(d)}finally{c.f()}return a},o=[],n=Number.POSITIVE_INFINITY,i=et(t);e=Date.now();var l,c=Object(S.a)(i);try{for(c.s();!(l=c.n()).done;){var u=l.value,s=a(it(t,u),-5e4,5e4,3);console.log("Move: "+u+" has scored "+s),s<=n&&(n=s,o.push({move:u,score:s}))}}catch(f){c.e(f)}finally{c.f()}console.log("Best move score for AI is: "+n),o=o.filter((function(t){return t.move,t.score-n<=15}));var d=Date.now()-e;if(console.log("Checking "+r+" moves"),console.log("That took "+d+"ms"),0!=o.length)return console.log("Best moves: "+o.length),console.log("Random best move index: "+Math.floor(Math.random()*o.length)),o[Math.floor(Math.random()*o.length)].move}(r);if(console.log("AI move: "+e),!e)return void y(!0);B(e)}}),[r]);var B=function(t){var e=it(r,t);r.currentPlayer==e.currentPlayer&&(M(t.toSquare),h(!0)),a(e),u(t)};return Object(d.a)(Pt,null,Object(d.a)(kt,{gameState:r}),Object(d.a)(gt,{gameState:r,lastMove:c,onMakeMove:B}),Object(d.a)(Ot,{x:0,y:0,isShowing:b,onSelect:function(t){if(null!=P){var e=st(r,P,t);a(e),h(!1)}}}),Object(d.a)(wt,{x:0,y:0,isShowing:k,winner:j,onRestart:function(){a(dt(xt)),u(null),h(!1),y(!1),M(null),q(null)}}))},Bt=r(24);c.a.render(Object(Bt.jsx)(i.a.StrictMode,{children:Object(Bt.jsx)(Mt,{})}),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.2fccc22a.chunk.js.map