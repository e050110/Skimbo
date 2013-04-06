define(["app"],function(e){return e.factory("ServerCommunication",["$http","$rootScope","UnifiedRequestUtils","ImagesUtils","StringUtils",function(e,t,n,r,i){function s(e,n){t.$broadcast(e,n)}return{cmd:function(e){if(e.cmd=="allUnifiedRequests"){var o=new Array;for(var u=0;u<e.body.length;u++){var a=e.body[u],f=a.services;for(var l=0;l<f.length;l++){var c={socialNetwork:a.endpoint,socialNetworkToken:a.hasToken,typeService:f[l].service.split(".")[1],typeServiceChar:"",explainService:"",args:{},service:f[l],hasParser:f[l].hasParser,hasHelper:f[l].hasHelper};c.explainService=n.fillExplainService(c.typeService,c.socialNetwork),c.hasParser==0&&(c.explainService="Coming soon..."),c.typeServiceChar=i.typeServiceCharByService(f[l].service);for(var h=0;h<f[l].args.length;h++)c.args[f[l].args[h]]="";o.push(c)}}s("availableServices",o),s("allUnifiedRequests",e.body)}else if(e.cmd=="msg")e.body.msg.authorAvatar=r.checkExistingImage(e.body.msg.authorAvatar),e.body.msg.original=e.body.msg.message,e.body.msg.from!=="rss"&&e.body.msg.from!=="scoopit"?(e.body.msg.message=i.truncateString(e.body.msg.message),e.body.msg.message=i.urlify(e.body.msg)):e.body.msg.message=e.body.msg.message,s("msg",e.body);else if(e.cmd=="allColumns"){var p=[],d=e.body;for(var u=0;u<d.length;u++){var v=d[u],m={};m.title=v.title,m.unifiedRequests=[],m.index=v.index,m.width=v.width,m.height=v.height;for(var l=0;l<v.unifiedRequests.length;l++){var g=v.unifiedRequests[l],y=n.serverToClientUnifiedRequest(g);y.fromServer=!0,m.unifiedRequests.push(y)}if(t.tempColumns!=undefined&&t.tempColumns[v.title]){var b=t.tempColumns[v.title];for(var l=0;l<b.length;l++)for(var w=0;w<b[l].messages.length;w++)m.messages.push(b[l].messages[w])}p.splice(v.index,0,m)}s("allColumns",p)}else if(e.cmd=="delColumn")s("delColumn",e.body);else if(e.cmd=="addColumn"){var v=e.body,m={};m.title=v.title,m.unifiedRequests=[],m.index=v.index,m.width=v.width,m.height=v.height;for(var l=0;l<v.unifiedRequests.length;l++){var g=v.unifiedRequests[l],y=n.serverToClientUnifiedRequest(g);y.fromServer=!0,m.unifiedRequests.push(y)}s("addColumn",m)}else if(e.cmd=="modColumn"){var v=e.body.column,m={};m.title=v.title,m.unifiedRequests=[],m.index=v.index,m.width=v.width,m.height=v.height;for(var l=0;l<v.unifiedRequests.length;l++){var g=v.unifiedRequests[l],y=n.serverToClientUnifiedRequest(g);y.fromServer=!0,m.unifiedRequests.push(y)}e.body.column=m,s("modColumn",e.body)}else if(e.cmd=="userInfos")e.body.avatar=r.checkExistingImage(e.body.avatar),s("userInfos",e.body);else if(e.cmd=="tokenInvalid")e.body.title="You have been disconnected from",e.body.footer="Click here to be connected again.",e.body.isError=!1,s("tokenInvalid",e.body);else if(e.cmd=="newToken")s("newToken",e.body);else if(e.cmd=="allProviders")s("allProviders",e.body);else if(e.cmd=="error"){var E={};E.title=e.body.msg,E.providerName=e.body.providerName,E.footer="Click here to hide error.",E.isError=!0,s("error",E)}else if(e.cmd=="disconnect"){var S={};S.title="You have been disconnected from",S.footer="Click here to be connected again.",S.isError=!1,s("disconnect",S)}else e.cmd=="allPosters"?s("allPosters",e.body):e.cmd=="paramHelperSearch"?s("paramHelperSearch",e.body):e.cmd=="paramPostHelperSearch"?s("paramPostHelperSearch",e.body):console.log("Command not yet implemented: ",e)}}}]),e})