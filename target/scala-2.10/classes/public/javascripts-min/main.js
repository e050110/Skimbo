document.location.hash=="#_=_"&&document.location.replace("/"),define("app",[],function(){var e=window.angular.module("publicApp",["ngSanitize"]);return e.config(["$routeProvider","$locationProvider",function(e,t){e.when("/",{templateUrl:"/assets/app/views/main.html",controller:"ColumnController"}).when("/p/:pageName",{templateUrl:"/assets/app/views/main.html",controller:"ColumnController"}).otherwise({redirectTo:"/"})}]),e}),define("filters/translation",["app"],function(e){return e.filter("i18n",["$rootScope",function(e){return function(t){var n={fr:{ADD_FIRST_COLUMN_SENTENCE:"Créez votre première colonne !",ADD_FIRST_SERVICE_SENTENCE:"Ajoutez-y autant de services que vous souhaitez.",ADD_FIRST_MODIF_SENTENCE_BEFORE_ICON:"Par la suite cliquez sur ",ADD_FIRST_MODIF_SENTENCE_AFTER_ICON:" (en haut à droite de la colonne) pour la modifier.",ADD_FIRST_SIZE_SENTENCE_BEFORE_ICON1:"Vous pouvez également cliquer sur ",ADD_FIRST_SIZE_SENTENCE_AFTER_ICON1:" (à gauche de ",ADD_FIRST_SIZE_SENTENCE_AFTER_ICON2:") pour modifier sa taille.",ADD_NEW_COLUMN:"Ajouter une colonne",ADD_STREAM_FOR_SOCIAL_NETWORK:"Ajouter un flux pour : ",ALL_FIELD_REQUIRED:"Tous les champs sont requis.",ALREADY_IN_YOUR_COLUMN:"Déjà présent dans cette colonne :",AVAILABLE_SERVICES:"Services disponibles :",AVAILABLE_SOCIAL_NETWORKS:"Réseaux sociaux disponibles :",CANCEL:"Annuler",CANT_ADD_SAME_SERVICE:"Vous ne pouvez pas ajouter deux fois le même service.",CHANGE:"Modifier",COLUMN_TITLE:"Titre de la colonne :",COLUMNS:"Colonnes",COMMENT:"Commenter",CONFIGURATION_COLUMN:"Préférences de la colonne",CONTENT_REQUIRED:"Le message est requis.",CREATE:"Créer !",DELETE:"Supprimer",MESSAGES:"Messages",NEW_MGS_UNREAD:"nouveaux messages. Clic pour tout lire.",POSTER_REQUIRED:"Au moins un réseau est requis.",REFRESH_DETAILS:"Rafraîchir/Voir les détails",RESIZE_COLUMN:"Modifier la taille de la colonne.",SHARE:"Partager",STAR:"Marquer ce contenu (retweet, like, thank...)",TITLE_ALREADY_EXISTS:"Ce titre existe déjà.",TITLE_REQUIRED:"Le titre est requis.",TO_ADD_STREAM_IN_COLUMN:"Pour ajouter un flux à cette colonne, sélectionnez un ou plusieurs services ci-dessus.",YOU_ARE_RECEIVING:"Vous recevez",GR_PARSE:"Parser les flux",GR_1_BEFORE_LINK:"Aller sur ",GR_1_LINK:"mes flux dans google reader",GR_1_AFTER_LINK:" et copier le contenu.",GR_2:"Coller le contenu dans le champ ci-dessus.",GR_3:'Cliquer sur "Parser les flux" et gérer les flux pour cette colonne.'},en:{ADD_FIRST_COLUMN_SENTENCE:"Create your first column !",ADD_FIRST_SERVICE_SENTENCE:"Add services as you want.",ADD_FIRST_MODIF_SENTENCE_BEFORE_ICON:"After that, click ",ADD_FIRST_MODIF_SENTENCE_AFTER_ICON:" (top right column) to change it.",ADD_FIRST_SIZE_SENTENCE_BEFORE_ICON1:"You can also click ",ADD_FIRST_SIZE_SENTENCE_AFTER_ICON1:" (left ",ADD_FIRST_SIZE_SENTENCE_AFTER_ICON2:") to change its size.",ADD_NEW_COLUMN:"Add new column",ADD_STREAM_FOR_SOCIAL_NETWORK:"Add a stream for this social network :",ALL_FIELD_REQUIRED:"All fields are required.",ALREADY_IN_YOUR_COLUMN:"Already in your column :",AVAILABLE_SERVICES:"Services available:",AVAILABLE_SOCIAL_NETWORKS:"Social networks available :",CANCEL:"Cancel",CANT_ADD_SAME_SERVICE:"You can't add twice same services.",CHANGE:"Change",COLUMN_TITLE:"Column title :",COMMENT:"Comment",COLUMNS:"Columns",CONFIGURATION_COLUMN:"Column's configuration.",CONTENT_REQUIRED:"The message is required !",CREATE:"Create !",DELETE:"Delete",MESSAGES:"Messages",NEW_MGS_UNREAD:"new messages. Click to read all.",POSTER_REQUIRED:"At least one network is required.",REFRESH_DETAILS:"Refresh/See details",RESIZE_COLUMN:"Resize column",SHARE:"Share",STAR:"Retweet, like, thank...",TITLE_ALREADY_EXISTS:"This title already exists.",TITLE_REQUIRED:"The title is required !",TO_ADD_STREAM_IN_COLUMN:"To add a stream in this column, select one or many services above.",YOU_ARE_RECEIVING:"You are receiving",GR_PARSE:"Parse feeds",GR_1_BEFORE_LINK:"Go on ",GR_1_LINK:"my google reader subscriptions",GR_1_AFTER_LINK:" and copy content.",GR_2:"Past content in text field above.",GR_3:'Click on "Parse feeds" and manage feeds for this column.'}},r=e.currentLanguage||"en";return n[r]!=undefined&&n[r][t]!=undefined?n[r][t]:n.en[t]}}]),e}),define("services/StringUtils",["app"],function(e){return e.factory("StringUtils",function(){var e=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/gi;return{urlify:function(t){var n=t.message;return n.replace(e,function(e){return'<a class="link-into-message '+t.from+'" href="'+e+'" target="_blank">∞</a>'})},truncateString:function(t){return t.length>140&&!e.test(t)?String(t).substring(0,140)+"...":t},serviceHasTypeChar:function(e){return e.typeServiceChar!=""?!0:!1},typeServiceCharByService:function(e){var t=e.split(".")[0],n=e.split(".")[1];return n=="group"?"ഹ":n=="user"?t=="twitter"?"@":"😊":n=="hashtag"?"#":""}}}),e}),define("services/ArrayUtils",["app"],function(e){return e.factory("ArrayUtils",function(){var e=!1,t=[];return{exist:function(e,t,n){return this.indexOf(e,t,n)>-1},indexOf:function(e,t,n){var r=-1;return e!==undefined?n!==undefined?this.indexOfWith(e,t,function(e,t){return e[n]==t[n]}):this.indexOfWith(e,t,function(e,t){return e==t}):r},existWith:function(e,t,n){return this.indexOfWith(e,t,n)>-1},indexOfWith:function(e,t,n){var r=-1;if(e!==undefined&&n!==undefined)for(var i=0;i<e.length;i++)if(n(e[i],t)==1)return i;return r},sortMsg:function(n,r){if(e==0){e=!0;var i=-1,s=!1;r.dateAgo=moment(moment(Number(r.createdAt)),"YYYYMMDD").fromNow();for(var o=0,u=n.length;o<u;++o){n[o].createdAt<r.createdAt&&i==-1&&(i=o);if(n[o].idProvider==r.idProvider||n[o].authorName==r.authorName&&n[o].message==r.message)s=!0,r.stared!==undefined&&(n[o].stared=r.stared),n[o].iStared=r.iStared,n[o].styleRefresh="";n[o].dateAgo=moment(moment(Number(n[o].createdAt)),"YYYYMMDD").fromNow()}i>-1&&s==0?n.splice(i,0,r):s==0&&n.push(r);if(t.length==0)e=!1;else{var a=t.shift();this.sortMsg(a.tab,a.msg)}}else t.push({tab:n,msg:r})}}}),e}),define("services/UnifiedRequestUtils",["app"],function(e){return e.factory("UnifiedRequestUtils",function(){return{serverToClientUnifiedRequest:function(e){var t={};t.service=e.service,t.providerName=e.service.split(".")[0],t.serviceName=e.service.split(".")[1],t.args=[];for(var n in e.args){var r=e.args[n];t.args.push({key:n,value:r})}return t.hasArguments=t.args.length>0,t},serverToUnifiedRequest:function(e){var t={};t.service=e.service,t.providerName=e.service.split(".")[0],t.serviceName=e.service.split(".")[1],t.hasParser=e.hasParser,t.hasHelper=e.hasHelper,t.args=[];for(var n in e.args){var r=e.args[n];t.args.push({key:r,value:""})}return t.hasArguments=t.args.length>0,t},clientToServerUnifiedRequest:function(e){var t={};t.service=e.providerName+"."+e.serviceName,t.args={};for(var n in e.args){var r=e.args[n];t.args[r.key]=r.value}return t},fillExplainService:function(e,t){return e=="group"?"Click here to display a specific Facebook group.":e=="user"?t=="twitter"?"Click here to display tweets of a specific Twitter user.":"Click here to display the wall of a specific Facebook user.":e=="hashtag"?"Click here to display tweets of a specific Twitter hashtag.":"Click here to display your "+t+" "+e+"."}}}),e}),define("services/ImagesUtils",["app"],function(e){return e.factory("ImagesUtils",function(){return{isDefaultImage:function(e){return e=="/assets/img/image-default.png"},checkExistingImage:function(e){if(e==""||e==undefined)return"/assets/img/image-default.png";var t=e;return e.match("^www")=="www"&&(t="http://"+e),"/download?url="+encodeURIComponent(t)}}}),e}),define("services/Visibility",["app"],function(e){return e.factory("Visibility",function(){function i(){document.title="Skimbo",r=0,t=!0}function s(){t=!1,r=0}var e=function(e,t){function s(r){var i=document.body;r=r||window.event,r.type=="focus"||r.type=="focusin"?e():r.type=="blur"||r.type=="focusout"?t():i.className=this[n]?t():e()}var n,r,i={hidden:"visibilitychange",mozHidden:"mozvisibilitychange",webkitHidden:"webkitvisibilitychange",msHidden:"msvisibilitychange",oHidden:"ovisibilitychange"};for(n in i)if(i.hasOwnProperty(n)&&n in document){r=i[n];break}r?document.addEventListener(r,s):window.onfocus=window.onblur=s},t=!0;try{t=document.hasFocus()}catch(n){t=!0}var r=0;return e(i,s),{notifyNewMessage:function(){t||(r+=1,document.title="("+r+") Skimbo")},isPageVisible:function(){return t}}}),e}),define("services/ColumnSize",["app"],function(e){return e.factory("ColumnSize",["$window",function(e){function s(){var n=Math.floor(e.innerWidth/t);n>=6?(r=6,i=4):(r=1,i=1)}function o(t){t.width<1?t.width=2:r>1&&t.width>r&&(t.width=r);if(r<=5)t.csswidth=e.innerWidth-10+"px";else{var n=t.width*100/r;t.csswidth=n-1+"%"}}function u(e){e.height<1?e.height=2:i>1&&e.height>i&&(e.height=i);if(i<=3)e.cssheight="100%";else{var t=e.height*100/i;e.cssheight=t-1+"%"}}var t=100,n=100,r=6,i=4;return{isMobileSize:function(){return r!=6},setSize:function(e){var t=e.length;s();for(var n=0;n<t;n++)o(e[n]),u(e[n])},buildSizeCompo:function(e){var t=e.length,n;for(var s=0;s<t;s++){n=e[s],n.compoSize=[];for(var o=1;o<=i;o++){n.compoSize.push({height:o,tab:[]});for(var u=1;u<=r;u++){var a=n.height>=o&&n.width>=u,f="";a==1&&(f="color:red"),n.compoSize[o-1].tab.push({width:u,selected:a,selectedStyle:f})}}}},resizeColumn:function(e,t,n){e.width=n,e.height=t,o(e),u(e),this.buildSizeCompo([e]);return}}}]),e}),define("services/Network",["app"],function(e){return e.factory("Network",["$http","$timeout","ServerCommunication","$location","$window",function(e,t,n,r,i){function m(){c==undefined&&(c=new WebSocket(u),c.onclose=function(){c=undefined,p++,t(function(){v==1&&p<d?m():(p=0,g())},500),console.log("WS closed : nbError = ",p)},c.onerror=function(){c=undefined,p++,t(function(){v==1&&p<d?m():(p=0,g())},800),console.log("WS error : nbError = ",p)},c.onmessage=function(e){v=!0,p=0;var t;try{t=JSON.parse(e.data)}catch(n){t=e.data}b(t)},t(function(){v==0&&h==undefined&&(console.log("no data after 5sc !"),c=undefined,p=0,g())},5e3))}function g(){console.log("sseMode actif !"),h==undefined&&(h=new EventSource(a),h.addEventListener("message",function(e){p=0;var t;try{t=JSON.parse(e.data)}catch(n){t=e.data}b(t)},!1),h.addEventListener("error",function(e){h.close(),h=undefined,p++,t(function(){p<d?g():n.cmd({cmd:"disconnect"})},800),console.log("sse error : nb = ",p)},!1))}function y(){console.log("longPollingMode actif !");var e=document.createElement("iframe");e.hidden=!0,e.src=l,window.longPolling=function(e){var t;try{t=JSON.parse(e)}catch(n){t=e}b(t)},console.log(angular.element(i)),t(function(){document.body.appendChild(e)},3500)}function b(e){e.cmd=="ping"?w({cmd:"pong"}):n.cmd(e)}function w(t){c!==undefined?c.send(JSON.stringify(t)):e.post("/api/stream/command",JSON.stringify(t))}var s=r.$$protocol==="https",o=r.path().split("/"),u=jsRoutes.controllers.stream.WebSocket.connect().webSocketURL(s);o!==undefined&&o.length==3&&(u=u+"/"+o[2]),console.log("WHOST URL = "+u);var a=jsRoutes.controllers.stream.Sse.connect().absoluteURL(s);console.log("SSEHOST URL = "+a);var f=jsRoutes.controllers.stream.Sse.ping().absoluteURL(s);console.log("SSEPING URL = "+f);var l=jsRoutes.controllers.stream.LongPolling.connect().absoluteURL(s);console.log("LONGPOLLING URL = "+l);var c=undefined,h=undefined,p=0,d=5,v=!1;return console.log("ws supported","WebSocket"in window),console.log("sse supported","EventSource"in window),window.MozWebSocket&&(window.WebSocket=window.MozWebSocket),!window.WebSocket&&!window.EventSource?y():window.WebSocket?m():g(),{send:function(e){w(e)}}}]),e}),define("services/PopupProvider",["app"],function(e){return e.factory("PopupProvider",["Network",function(e){return{openPopup:function(t,n){var r=500,i=500;switch(t.name){case"github":r=960,i=430;break;case"facebook":r=640,i=372;break;case"viadeo":r=570,i=315;break;case"trello":r=572,i=610;break;case"twitter":r=600,i=500}if(window.innerWidth)var s=(window.innerWidth-r)/2,o=(window.innerHeight-i)/2;else var s=(document.body.clientWidth-r)/2,o=(document.body.clientHeight-i)/2;var u=window.open("/auth/"+t.name,"Connection","height="+i+", width="+r+", left="+s+", top="+o);return window.callMeToRefresh=function(){e.send({cmd:"allUnifiedRequests"}),n!==undefined&&n()},u!==undefined&&window.focus&&u.focus(),!1}}}]),e}),define("services/ServerCommunication",["app"],function(e){return e.factory("ServerCommunication",["$http","$rootScope","UnifiedRequestUtils","ImagesUtils","StringUtils",function(e,t,n,r,i){function s(e,n){t.$broadcast(e,n)}return{cmd:function(e){if(e.cmd=="allUnifiedRequests"){var o=new Array;for(var u=0;u<e.body.length;u++){var a=e.body[u],f=a.services;for(var l=0;l<f.length;l++){var c={socialNetwork:a.endpoint,socialNetworkToken:a.hasToken,typeService:f[l].service.split(".")[1],typeServiceChar:"",explainService:"",args:{},service:f[l],hasParser:f[l].hasParser,hasHelper:f[l].hasHelper};c.explainService=n.fillExplainService(c.typeService,c.socialNetwork),c.hasParser==0&&(c.explainService="Coming soon..."),c.typeServiceChar=i.typeServiceCharByService(f[l].service);for(var h=0;h<f[l].args.length;h++)c.args[f[l].args[h]]="";o.push(c)}}s("availableServices",o),s("allUnifiedRequests",e.body)}else if(e.cmd=="msg")e.body.msg.authorAvatar=r.checkExistingImage(e.body.msg.authorAvatar),e.body.msg.original=e.body.msg.message,e.body.msg.from!=="rss"&&e.body.msg.from!=="scoopit"?(e.body.msg.message=i.truncateString(e.body.msg.message),e.body.msg.message=i.urlify(e.body.msg)):e.body.msg.message=e.body.msg.message,s("msg",e.body);else if(e.cmd=="allColumns"){var p=[],d=e.body;for(var u=0;u<d.length;u++){var v=d[u],m={};m.title=v.title,m.unifiedRequests=[],m.index=v.index,m.width=v.width,m.height=v.height;for(var l=0;l<v.unifiedRequests.length;l++){var g=v.unifiedRequests[l],y=n.serverToClientUnifiedRequest(g);y.fromServer=!0,m.unifiedRequests.push(y)}if(t.tempColumns!=undefined&&t.tempColumns[v.title]){var b=t.tempColumns[v.title];for(var l=0;l<b.length;l++)for(var w=0;w<b[l].messages.length;w++)m.messages.push(b[l].messages[w])}p.splice(v.index,0,m)}s("allColumns",p)}else if(e.cmd=="delColumn")s("delColumn",e.body);else if(e.cmd=="addColumn"){var v=e.body,m={};m.title=v.title,m.unifiedRequests=[],m.index=v.index,m.width=v.width,m.height=v.height;for(var l=0;l<v.unifiedRequests.length;l++){var g=v.unifiedRequests[l],y=n.serverToClientUnifiedRequest(g);y.fromServer=!0,m.unifiedRequests.push(y)}s("addColumn",m)}else if(e.cmd=="modColumn"){var v=e.body.column,m={};m.title=v.title,m.unifiedRequests=[],m.index=v.index,m.width=v.width,m.height=v.height;for(var l=0;l<v.unifiedRequests.length;l++){var g=v.unifiedRequests[l],y=n.serverToClientUnifiedRequest(g);y.fromServer=!0,m.unifiedRequests.push(y)}e.body.column=m,s("modColumn",e.body)}else if(e.cmd=="userInfos")e.body.avatar=r.checkExistingImage(e.body.avatar),s("userInfos",e.body);else if(e.cmd=="tokenInvalid")e.body.title="You have been disconnected from",e.body.footer="Click here to be connected again.",e.body.isError=!1,s("tokenInvalid",e.body);else if(e.cmd=="newToken")s("newToken",e.body);else if(e.cmd=="allProviders")s("allProviders",e.body);else if(e.cmd=="error"){var E={};E.title=e.body.msg,E.providerName=e.body.providerName,E.footer="Click here to hide error.",E.isError=!0,s("error",E)}else if(e.cmd=="disconnect"){var S={};S.title="You have been disconnected from",S.footer="Click here to be connected again.",S.isError=!1,s("disconnect",S)}else if(e.cmd=="allPosters")s("allPosters",e.body);else if(e.cmd=="paramHelperSearch")s("paramHelperSearch",e.body);else if(e.cmd=="paramPostHelperSearch")s("paramPostHelperSearch",e.body);else if(e.cmd=="logout"){var S={};S.title="You have been disconnected from",S.footer="Click here to be connected again.",S.isError=!1,S.forceIdentification=!0,s("disconnect",S)}else console.log("Command not yet implemented: ",e)}}}]),e}),define("directives/DragAndDrop",["app"],function(e){return e.directive("drag",[function(){function e(e,t,n){t.addClass(n),e.dataTransfer.setData("id",e.target.id),e.dataTransfer.effectAllowed="move"}function t(e,t,n){t.removeClass(n)}return{restrict:"A",link:function(n,r,i){i.$set("draggable","true"),r.bind("dragstart",function(t){e(t,r,i.dragstyle)}),r.bind("dragend",function(e){t(e,r,i.dragstyle)})}}}]),e.directive("drop",["Network",function(e){function t(e,t,n){e.preventDefault(),t.addClass(n)}function n(e,t,n){t.removeClass(n)}function r(e){e.preventDefault()}function i(t,n,r,i){t.preventDefault(),r.removeClass(i);var s=t.dataTransfer.getData("id");s=s.split("_")[1];var o=angular.element(r).attr("id");o=o.split("_")[1];if(s!=o){var u=n.$parent;u.$apply(function(){var t=u.columns[s];u.columns[s]=u.columns[o],u.columns[s].index=o,u.columns[o]=t,u.columns[o].index=s,u.$eval(u.columns);var n={cmd:"modColumnsOrder",body:{}};n.body.columns=[];for(var r=0;r<u.columns.length;r++)n.body.columns.push(u.columns[r].title);e.send(n)})}}return{restrict:"A",link:function(e,s,o){s.bind("dragenter",function(e){t(e,s,o.dropstyle)}),s.bind("dragleave",function(e){n(e,s,o.dropstyle)}),s.bind("dragover",r),s.bind("drop",function(t){i(t,e,s,o.dropstyle)})}}}]),e}),define("directives/ScrollManager",["app"],function(e){e.directive("scrollmanager",["$timeout","$rootScope",function(e,t){var n=!1;return{restrict:"A",link:function(r,i,s){var o=i[0],u=undefined;if(s.scrollmanager==="onlyTop"){var a=angular.element(o);t.$on("scrollManagerGoTop",function(e,t){angular.equals(t,r[s.scrolldata])&&(a[0].scrollTop=0)})}else{var a=angular.element(o.parentElement.parentElement),f=r[s.scrollmanager];f.isView=!1;var l=r.$watch(s.scrollmanager,function(t,r){f.isView==0&&(n=!1,a[0].scrollTop+=o.clientHeight,u!=undefined&&e.cancel(u),u=e(function(){n=!0,u=undefined},500))}),c=function(e){f.pos=o.offsetTop-a[0].offsetTop,e.target.scrollTop<=f.pos&&n==1&&(f.isView=!0,a.unbind("scroll",c),l(),r.$apply())};a.bind("scroll",c)}}}}])}),define("directives/ShowOnHoverParent",["app"],function(e){e.directive("showonhoverparent",[function(){return{link:function(e,t,n){t[0].hidden=!0,t.parent().bind("mouseenter",function(){t[0].hidden=!1}),t.parent().bind("mouseleave",function(){t[0].hidden=!0})}}}])}),define("directives/OnKeyPress",["app"],function(e){e.directive("onKeyPress",["ArrayUtils","$timeout",function(e,t){function i(t,r){var i=e.indexOfWith(n[t],r,function(e,t){return e.globalKey=="true"||angular.equals(e.element[0],t[0])});return i}function s(e,t){var r=i(e,t);if(r>-1)return n[e][r]}function o(t,r){var i=e.indexOfWith(n[t],r,function(e,t){return e.uniqueKey===t});i>-1&&n[t].splice(i,1)}var n={},r=0;return document.onkeypress=function(e){e=e||window.event;var t=typeof e.which=="number"?e.which:e.keyCode;if(t){var n=s(t,angular.element(e.target));if(n!==undefined){var r=n.element,i=n.ctrlKeyCheck,o=n.scope,u=n.onKeyPressExec;if(i==1&&e.ctrlKey||i!=1)o.$eval(u),e.stopPropagation(),e.preventDefault()}}},{restrict:"A",link:function(e,t,i){n[i.onKeyPress]=n[i.onKeyPress]||[];var s=r;n[i.onKeyPress].push({ctrlKeyCheck:i.ctrlKeyCheck,scope:e,onKeyPressExec:i.onKeyPressExec,element:t,globalKey:i.globalKey,uniqueKey:s}),t.bind("$destroy",function(){o(i.onKeyPress,s)}),++r}}}])}),define("directives/Oracle",["app"],function(e){e.directive("oracle",["Network","$rootScope","$timeout",function(e,t,n){function s(e,n,r,i,s){t.$on(e,function(e,t){n!==undefined&&r!=undefined&&n.service==t.serviceName&&i.$apply(function(){s.possibleValues=t.values})})}function o(t,n,i){if(i!=r){var s={cmd:t,body:{serviceName:n,search:i}};e.send(s)}r=i}var r,i=undefined;return{link:function(e,t,r){var u=e[r.oracle];if(u.hasHelper==1||u.canHavePageId==1){var a=r.oracleType,f=e[r.oracleStore];s(a,u,t,e,f),t.bind("keyup",function(){i!=undefined&&n.cancel(i),i=n(function(){console.log(u,t[0].value),t[0].value!==""?o(a,u.service,t[0].value):f.possibleValues=[]},500)}),t.bind("$destroy",function(){t.unbind("keyup")})}}}}])}),define("controllers/NotificationController",["app"],function(e){return e.controller("NotificationController",["$scope","$rootScope","ArrayUtils","PopupProvider",function(e,t,n,r){e.notifications=[],t.$on("tokenInvalid",function(t,r){e.$apply(function(){n.exist(e.notifications,r,"providerName")||e.notifications.push(r)})}),t.$on("newToken",function(t,r){e.$apply(function(){var t=n.indexOf(e.notifications,r,"providerName");t>-1&&e.notifications.splice(t,1)})}),t.$on("error",function(t,r){e.$apply(function(){var t=n.existWith(e.notifications,r,function(e,t){return e.providerName==t.providerName&&e.title==t.title});t||e.notifications.push(r)})}),t.$on("disconnect",function(t,r){e.$apply(function(){r.providerName="skimbo";var t=n.existWith(e.notifications,r,function(e,t){return e.providerName==t.providerName&&e.title==t.title});t||e.notifications.push(r)})}),e.clickOnNotification=function(t){if(t.isError==0&&t.providerName!="skimbo")r.openPopup({name:t.providerName});else if(t.isError==0&&t.providerName=="skimbo")t.forceIdentification==1?window.location.href="/logout":window.location.href="/";else{var i=n.indexOfWith(e.notifications,t,function(e,t){return e.providerName==t.providerName&&e.msg==t.msg});i>-1&&e.notifications.splice(i,1)}},e.closeNotification=function(t){var r=n.indexOfWith(e.notifications,t,function(e,t){return e.providerName==t.providerName&&e.msg==t.msg});r>-1&&e.notifications.splice(r,1)}}]),e}),define("controllers/MainController",["app"],function(e){return e.controller("MainController",["$scope","$rootScope",function(e,t){e.showUserInformations=!1,t.currentLanguage=navigator.language.substring(0,2),console.log(navigator.language)}]),e}),define("controllers/ModifColumnController",["app"],function(e){return e.controller("ModifColumnController",["$scope","Network","$rootScope","UnifiedRequestUtils","Visibility","PopupProvider","ArrayUtils","$http",function(e,t,n,r,i,s,o,u){function a(t){console.log(t),t.fromServer=!1,e.column.unifiedRequests.push(JSON.parse(JSON.stringify(t))),e.column.title==""&&(e.column.title=t.providerName+" "+t.serviceName)}function f(){e.availableSocialNetworksWidth="90%",e.selectedSocialNetwork!=undefined&&(e.selectedSocialNetwork.selected=!1),e.selectedSocialNetwork=undefined,e.showErrorBlankArg=!1,e.showErrorDoubleParser=!1,e.showErrorTitleRequired=!1,e.showErrorTitleAlreadyExist=!1;if(e.column!==undefined){e.column.title=e.column.oldTitle;for(var t=e.column.unifiedRequests.length-1;t>=0;t--)e.column.unifiedRequests[t].fromServer==0&&e.column.unifiedRequests.splice(t,1)}e.column=undefined}function c(e){for(var t=0;t<e.unifiedRequests.length;t++)for(var n=0;n<e.unifiedRequests[t].args.length;n++){e.unifiedRequests[t].args[n].value=e.unifiedRequests[t].args[n].value.replace(l,"");if(e.unifiedRequests[t].args[n].value=="")return!0}return!1}function h(e){var t=0,n=0;for(var r=0;r<e.unifiedRequests.length;r++){t=0,n=0;for(var i=0;i<e.unifiedRequests.length;i++)if(e.unifiedRequests[r].args.length>0)for(var s=0;s<e.unifiedRequests[r].args.length;s++){for(var o=0;o<e.unifiedRequests[i].args.length;o++)e.unifiedRequests[r].service==e.unifiedRequests[i].service&&e.unifiedRequests[r].args[s].value==e.unifiedRequests[i].args[o].value&&n++;if(n>1)return!0}else e.unifiedRequests[r].service==e.unifiedRequests[i].service&&t++;if(t>1)return!0}return!1}function p(e){return e.title==""}function d(t){var n=0;for(var r=0;r<e.columnsTitle.length;r++)if(e.columnsTitle[r]==t.title){n++;if(t.newColumn==0&&n>1)return!0;if(t.newColumn==1)return!0}return!1}function v(){e.providers.push({endpoint:"greader",hasToken:!0,name:"greader",selected:!1,services:[]})}function m(){console.log("show"),e.googleReaderSelected=!0}e.$destroy=function(){var e=this.$parent;this.$broadcast("$destroy"),e.$$childHead==this&&(e.$$childHead=this.$$nextSibling),e.$$childTail==this&&(e.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$id=null,this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null,this["this"]=this.$root=null,this.$$asyncQueue=null,this.$$listeners=null},e.showModifyColumn=!1,e.availableSocialNetworksWidth="90%",e.column=undefined,e.selectedSocialNetwork=undefined,e.providers=undefined,e.columnsTitle=[],n.$on("allColumns",function(t,n){e.$apply(function(){for(var t=0;t<n.length;t++)e.columnsTitle.push(new String(n[t].title))})}),n.$on("allUnifiedRequests",function(t,n){e.$apply(function(){e.providers=n;for(var t=0;t<n.length;t++){var i=n[t];i.selected=!1,i.name=i.endpoint;for(var s=0;s<i.services.length;s++){var o=i.services[s],u=r.serverToUnifiedRequest(o);i.services[s]=u}e.selectedSocialNetwork!=undefined&&e.selectedSocialNetwork.name==i.name&&(e.selectedSocialNetwork=i,e.selectedSocialNetwork.selected=!0)}v()})}),n.$on("clientModifyColumn",function(t,n){e.show(JSON.parse(JSON.stringify(n)))}),n.$on("addColumn",function(t,n){e.columnsTitle.push(new String(n.title))}),n.$on("modColumn",function(t,n){e.$apply(function(){for(var t=0;t<e.columnsTitle.length;t++)if(e.columnsTitle[t]==n.title){e.columnsTitle.splice(t,1),e.columnsTitle.push(new String(n.column.title));break}})}),e.show=function(n){f(),e.showModifyColumn=!e.showModifyColumn,e.showModifyColumn==1&&(e.providers==undefined&&t.send({cmd:"allUnifiedRequests"}),n!==undefined?(e.column=n,e.column.newColumn=!1,e.column.oldTitle=e.column.title):(e.column={},e.column.newColumn=!0,e.column.title="",e.column.unifiedRequests=[]))},e.selectSocialNetwork=function(t){e.selectedSocialNetwork!=undefined&&(e.selectedSocialNetwork.selected=!1),e.selectedSocialNetwork=t,e.selectedSocialNetwork.selected=!0,e.availableSocialNetworksWidth="",t.name=="greader"?m():e.googleReaderSelected=!1},e.addService=function(n){n.hasParser==1&&(e.selectedSocialNetwork.hasToken==1?a(n):s.openPopup(e.selectedSocialNetwork,function(){a(n),t.send({cmd:"allUnifiedRequests"}),t.send({cmd:"allPosters"})}))},e.selectOracle=function(e,t){e.possibleValues=[],e.value=t.call},e.cancelCreateColumn=function(){f(),e.showModifyColumn=!1},e.deleteService=function(t,n){var r=!1;for(var i=0;!r&&i<e.column.unifiedRequests.length;i++)if(e.column.unifiedRequests[i].service==t.service&&e.column.unifiedRequests[i].args.length>0)for(var s=0;!r&&s<e.column.unifiedRequests[i].args.length;s++){var o=e.column.unifiedRequests[i].args[s];n.key==o.key&&n.value==o.value&&(r=!0,e.column.unifiedRequests.splice(i,1))}else e.column.unifiedRequests[i].service==t.service&&n===undefined&&(r=!0,e.column.unifiedRequests.splice(i,1))},e.validate=function(){var n="",i=[],s=e.column;for(var o=0;o<s.unifiedRequests.length;o++)i.push(r.clientToServerUnifiedRequest(s.unifiedRequests[o]));s.newColumn==0?n={cmd:"modColumn",body:{title:s.oldTitle,column:{title:s.title,unifiedRequests:i,index:s.index,width:s.width,height:s.height}}}:n={cmd:"addColumn",body:{title:s.title,unifiedRequests:i,index:e.columnsTitle.length,width:-1,height:-1}},e.showErrorBlankArg=c(s),e.showErrorDoubleParser=h(s),e.showErrorTitleRequired=p(s),e.showErrorTitleAlreadyExist=d(s),e.showErrorBlankArg==0&&e.showErrorDoubleParser==0&&e.showErrorTitleRequired==0&&e.showErrorTitleAlreadyExist==0&&(e.showModifyColumn=!e.showModifyColumn,t.send(n))},e.deleteColumn=function(){t.send({cmd:"delColumn",body:{title:e.column.oldTitle}}),e.showModifyColumn=!1};var l=/[&\\#,+()$~%'":*?<>{}]/g;e.googleReaderSelected=!1,e.googleReaderFeeds="",e.parseGoogleReader=function(){console.log("parse");var t=JSON.parse(e.googleReaderFeeds).subscriptions;for(var n=0;n<t.length;n++){var r=t[n].id.substring(5,t[n].id.length);a({fromServer:!1,hasArguments:!0,hasParser:!0,providerName:"rss",service:"rss.rss",serviceName:"rss",args:[{key:"url",value:r}]})}}}]),e}),define("controllers/HeaderController",["app"],function(e){return e.controller("HeaderController",["$scope","$rootScope","$http","ArrayUtils","ImagesUtils","Network",function(e,t,n,r,i,s){e.loading=!0,e.loadingMsg="COLUMNS";var o=!0;t.$on("allColumns",function(t,n){n.length>0&&n[0].unifiedRequests.length>0?e.$apply(function(){e.loadingMsg="MESSAGES"}):e.$apply(function(){e.loading=!1})}),t.$on("msg",function(t,n){e.$apply(function(){o==1&&(o=!1,e.loading=!1)})}),t.$on("loading",function(t,n){e.$apply(function(){e.loading=n.loading,e.loading==1&&(e.loadingMsg=n.translationCode)})}),t.$on("userInfos",function(t,n){e.$apply(function(){if(e.userInfos==undefined)e.userInfos=[],e.userInfos.push(n);else{var t=r.indexOf(e.userInfos,n,"socialType");t>-1?e.userInfos[t]=n:i.isDefaultImage(e.userInfos[0].avatar)?e.userInfos.splice(0,0,n):e.userInfos.push(n)}})}),e.deleteProvider=function(t){n.get("/api/providers/del/"+t).success(function(){for(var n=0;n<e.userInfos.length;n++)if(e.userInfos[n].socialType==t){e.userInfos.splice(n,1),s.send({cmd:"allUnifiedRequests"}),s.send({cmd:"allPosters"});break}})}}]),e}),define("controllers/ColumnController",["app"],function(e){return e.controller("ColumnController",["$scope","Network","$rootScope","UnifiedRequestUtils","Visibility","PopupProvider","ArrayUtils","ColumnSize","$window",function(e,t,n,r,i,s,o,u,a){function f(t){if(e.columns!==undefined)for(var r=0;r<e.columns.length;r++)if(e.columns[r].title==t)return e.columns[r];return n.tempColumns==undefined&&(n.tempColumns=[]),n.tempColumns[t]==undefined&&(n.tempColumns[t]={}),n.tempColumns[t]}e.$destroy=function(){var e=this.$parent;this.$broadcast("$destroy"),e.$$childHead==this&&(e.$$childHead=this.$$nextSibling),e.$$childTail==this&&(e.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$id=null,this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null,this["this"]=this.$root=null,this.$$asyncQueue=null,this.$$listeners=null},e.globalContainerSize="100%",e.columns=[],e.userNoColumn=!1,angular.element(a).bind("resize",function(){u.setSize(e.columns),u.isMobileSize()&&e.columns.length>0?e.globalContainerSize=e.columns.length+"10%":e.globalContainerSize="100%",e.$apply()}),n.$on("availableServices",function(t,n){e.$$phase?e.serviceProposes=n:e.$apply(function(){e.serviceProposes=n})}),n.$on("allColumns",function(t,n){e.$apply(function(){u.setSize(n),u.buildSizeCompo(n),e.columns.length==0&&(e.columns=n),e.userNoColumn=e.columns.length===0,u.isMobileSize()&&e.columns.length>0?e.globalContainerSize=e.columns.length+"10%":e.globalContainerSize="100%"})}),n.$on("msg",function(t,n){e.$apply(function(){var e=f(n.column);e.messages==undefined&&(e.messages=[]),o.sortMsg(e.messages,n.msg),i.notifyNewMessage()})}),n.$on("newToken",function(t,n){e.$apply(function(){if(e.serviceProposes!=undefined)for(var t=0;t<e.serviceProposes.length;t++)e.serviceProposes[t].service.service.split(".")[0]==n.providerName&&(e.serviceProposes[t].socialNetworkToken=!0)})}),n.$on("delColumn",function(t,n){var r=o.indexOf(e.columns,n,"title");r>-1&&(e.columns.splice(r,1),e.$apply())}),n.$on("addColumn",function(t,n){e.$apply(function(){u.setSize([n]),u.buildSizeCompo([n]),e.columns.push(n),e.userNoColumn=e.columns.length===0})}),n.$on("modColumn",function(t,n){e.$apply(function(){console.log(n);var e=f(n.title);e.title=n.column.title,e.unifiedRequests=n.column.unifiedRequests})}),e.modifyColumn=function(e){n.$broadcast("clientModifyColumn",e)},e.resizeColumn=function(e,n,r){t.send({cmd:"resizeColumn",body:{columnTitle:e.title,height:n,width:r}}),u.resizeColumn(e,n,r)},e.messagesNoView=function(e){var t=0;if(e!=undefined&&e.messages!=undefined)for(var n=0;n<e.messages.length;n++)e.messages[n].isView==0&&t++;return t},e.markAllAsView=function(e){n.$broadcast("scrollManagerGoTop",e);if(e!=undefined&&e.messages!=undefined)for(var t=0;t<e.messages.length;t++)e.messages[t].isView=!0},e.getDetails=function(e,n){e.styleRefresh="rotate",t.send({cmd:"detailsSkimbo",body:{serviceName:e.service,id:e.idProvider,columnTitle:n.title}})},e.dispatchMsg=function(e){n.$broadcast("dispatchMsg",e)},e.comment=function(e){console.log(e),e.inComment=!e.inComment,e.from==="twitter"&&(e.currentComment="@"+e.authorScreenName)},e.sendComment=function(n,r){n.styleRefresh="rotate",t.send({cmd:"comment",body:{serviceName:n.service,providerId:n.idProvider,message:n.currentComment,columnTitle:r.title}}),n.inComment=!1,e.$apply()},e.star=function(e,n){e.styleRefresh="rotate",t.send({cmd:"star",body:{serviceName:e.service,id:e.idProvider,columnTitle:n.title}})},e.blurText=!1,e.switchBlur=function(){e.$apply(function(){e.blurText=!e.blurText})}}]),e}),define("controllers/PostController",["app"],function(e){e.controller("PostMessageController",["$scope","Network","$rootScope","PopupProvider",function(e,t,n,r){function i(){e.title="",e.message="",e.url="",e.image="",e.showErrorPosterRequired=!1,e.showErrorTitleRequired=!1,e.showErrorContentRequired=!1}e.$destroy=function(){var e=this.$parent;this.$broadcast("$destroy"),e.$$childHead==this&&(e.$$childHead=this.$$nextSibling),e.$$childTail==this&&(e.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$id=null,this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null,this["this"]=this.$root=null,this.$$asyncQueue=null,this.$$listeners=null},e.showPost=!1,e.showHelp=!1,i(),n.$on("allPosters",function(t,n){e.$apply(function(){e.providersWithTitle=[],e.providersWithUrl=[],e.providersWithImage=[],e.providers=n;for(var t=0;t<e.providers.length;t++){var r=e.providers[t];r.name=r.service,r.selected=!1,(r.service=="linkedin"||r.service=="github"||r.service=="scoopit"||r.service=="viadeo"||r.service=="googleplus")&&e.providersWithTitle.push(r),(r.service=="linkedin"||r.service=="facebook"||r.service=="scoopit"||r.service=="viadeo")&&e.providersWithUrl.push(r),(r.service=="linkedin"||r.service=="facebook"||r.service=="scoopit"||r.service=="viadeo"||r.service=="googleplus")&&e.providersWithImage.push(r),r.canHavePageId==1&&(r.arg={},r.arg.possibleValues=[])}console.log(e.providers)})}),n.$on("dispatchMsg",function(t,n){i(),e.show(),e.showPost=!0,e.title="",e.message=n.original,e.url=n.directLink,e.image=""}),e.show=function(){e.showPost=!e.showPost,e.showPost==1&&e.providers==undefined&&t.send({cmd:"allPosters"})},e.selectPoster=function(e){e.hasToken==1?e.selected=!e.selected:r.openPopup({name:e.tokenProvider},function(){e.selected=!e.selected,t.send({cmd:"allUnifiedRequests"}),t.send({cmd:"allPosters"})})},e.post=function(){var n=[];for(var r=0;r<e.providers.length;r++){var s=e.providers[r];s.selected==1&&(console.log(s),name=s.name||s.service,n.push({name:name,toPageId:s.toPageId}))}if(n.length==0)e.showErrorPosterRequired=!0;else if(e.title=="")e.showErrorPosterRequired=!1,e.showErrorTitleRequired=!0;else if(e.message=="")e.showErrorPosterRequired=!1,e.showErrorTitleRequired=!1,e.showErrorContentRequired=!0;else{var o={cmd:"post",body:{providers:n,post:{title:e.title,message:e.message,url:e.url,url_image:e.image}}};console.log(o),t.send(o),e.showPost=!1,i()}},e.selectOracle=function(e,t){e.toPageId=t.call,e.possibleValues=[]}}])}),require(["app","filters/translation","services/StringUtils","services/ArrayUtils","services/UnifiedRequestUtils","services/ImagesUtils","services/Visibility","services/ColumnSize","services/Network","services/PopupProvider","services/ServerCommunication","directives/DragAndDrop","directives/ScrollManager","directives/ShowOnHoverParent","directives/OnKeyPress","directives/Oracle","controllers/NotificationController","controllers/MainController","controllers/ModifColumnController","controllers/HeaderController","controllers/ColumnController","controllers/PostController"],function(e){window.angular.bootstrap(window.document.getElementById("publicApp"),["publicApp"])}),define("main",function(){})