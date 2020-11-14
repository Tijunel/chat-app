(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{103:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){"use strict";n.r(t);var r=n(7),a=n(9),s=n(8),o=n(1),c=n(0),i=n.n(c),u=n(46),l=n.n(u),d=n(11),h=n.n(d),f=n(47),p=n.n(f),j=function e(){var t=this;Object(r.a)(this,e),this.getSocket=function(){return t.socket},this.socket=p()("http://csx3.cs.ucalgary.ca:5000/")};j.instance=null,j.createInstance=function(){null===j.instance&&(j.instance=new j)},j.getInstance=function(){if(null!==j.instance)return j.instance;j.instance=new j};n(92),n(93),n(94);var m=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).render=function(){return Object(o.jsx)("div",{id:"top-nav",children:Object(o.jsx)("div",{id:"top-nav-title",children:Object(o.jsx)("b",{children:"Chat App"})})})},e}return n}(i.a.Component),b=n(14),v=n(13),O=n(6),x=n.n(O),g=n(10),w=n(48),y=n(106),S=(n(96),function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.call(this)).componentDidMount=function(){fetch("/api/state/",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(){var t=Object(g.a)(x.a.mark((function t(n){var r;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(200!==n.status){t.next=10;break}return t.next=3,n.json();case 3:n=t.sent,e.generateUI(n),(r=j.getInstance().getSocket()).on("active users",(function(t){e.generateUI(t)})),r.on("user update",(function(t){e.updateUser(t)})),t.next=11;break;case 10:e.setState({showError:!0});case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.setState({showError:!0})}))},e.updateUser=function(t){var n=Object(v.a)(e.state.users);for(var r in n)n[r].userID===t.userID&&(n[r].username=t.username,n[r].colour=t.colour);e.generateUI(n)},e.generateUI=function(t){var n,r=0,a=Object(b.a)(t);try{for(a.s();!(n=a.n()).done;){var s=n.value;if(JSON.parse(h.a.get("userData").split("j:")[1]).userID===s.userID)break;r++}}catch(m){a.e(m)}finally{a.f()}var c=t[0];t[0]=t[r],t[r]=c;var i,u=[],l=[],d=0,f=Object(b.a)(t);try{for(f.s();!(i=f.n()).done;){var p=i.value;if(l.push(Object(o.jsx)(w.a,{children:Object(o.jsx)("div",{style:{color:p.colour,fontSize:"12px"},children:Object(o.jsx)("b",{children:p.username+(JSON.parse(h.a.get("userData").split("j:")[1]).userID===p.userID?" (You)":"")})},d)},d)),2===l.length){var j=Math.floor(d/2);u.push(Object(o.jsx)(y.a,{children:l},j)),l=[]}d++}}catch(m){f.e(m)}finally{f.f()}0!==l.length&&u.push(Object(o.jsx)(y.a,{children:l},1)),e.setState({users:t,UI:u,showError:!1})},e.render=function(){return Object(o.jsxs)("div",{id:"chat-users",children:[Object(o.jsx)("div",{style:{fontSize:"16px"},children:Object(o.jsx)("b",{children:"Active Users"})}),e.state.showError?Object(o.jsx)("div",{style:{fontSize:"12px"},children:"Could not fetch active users. Try refreshing!"}):e.state.UI.length>0?e.state.UI:Object(o.jsx)("div",{style:{fontSize:"12px"},children:"Loading..."})]})},e.state={users:[],UI:[],showError:!1},e}return n}(i.a.Component)),I=(n(97),function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).render=function(){return Object(o.jsxs)("div",{id:"message",children:[Object(o.jsx)("div",{style:{color:a.props.colour,fontSize:"16px"},children:a.props.userID===JSON.parse(h.a.get("userData").split("j:")[1]).userID?Object(o.jsx)("b",{children:a.props.username}):a.props.username}),Object(o.jsx)("div",{style:{fontSize:"16px"},children:a.props.userID===JSON.parse(h.a.get("userData").split("j:")[1]).userID?Object(o.jsx)("b",{children:a.props.message}):a.props.message}),Object(o.jsx)("div",{style:{fontSize:"12px"},children:a.props.timestamp.toString()})]})},a}return n}(i.a.Component)),C=(n(98),function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).componentDidMount=function(){fetch("/api/message/",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(){var e=Object(g.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(200!==t.status){e.next=10;break}return e.next=3,t.json();case 3:t=e.sent,a.generateMessageUI(t),(n=j.getInstance().getSocket()).on("new message",(function(e){a.addMessage(e)})),n.on("user update",(function(e){a.updateMessages(e)})),e.next=11;break;case 10:a.setState({showError:!0});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){a.setState({showError:!0})}))},a.generateMessageUI=function(){var e=Object(g.a)(x.a.mark((function e(t){var n,r,s,c,i;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],r=0,s=Object(b.a)(t),e.prev=3,i=x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.value,e.next=3,fetch("/api/user/"+t.userID,{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(){var e=Object(g.a)(x.a.mark((function e(s){var c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(200!==s.status){e.next=11;break}return e.next=3,s.json();case 3:s=e.sent,t.username=s.username,t.colour=s.colour,c=new Date(t.timestamp),n.push(Object(o.jsx)(I,{message:t.message,timestamp:c.toLocaleString(),username:s.username,userID:t.userID,colour:s.colour},r)),r++,e.next=12;break;case 11:a.setState({showError:!0});case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){a.setState({showError:!0})}));case 3:case"end":return e.stop()}}),e)})),s.s();case 6:if((c=s.n()).done){e.next=10;break}return e.delegateYield(i(),"t0",8);case 8:e.next=6;break;case 10:e.next=15;break;case 12:e.prev=12,e.t1=e.catch(3),s.e(e.t1);case 15:return e.prev=15,s.f(),e.finish(15);case 18:a.setState({messages:t,messageUI:n}),a.scrollToBottom();case 20:case"end":return e.stop()}}),e,null,[[3,12,15,18]])})));return function(t){return e.apply(this,arguments)}}(),a.addMessage=function(e){var t=Object(v.a)(a.state.messages);t.push(e);var n=[a.state.messageUI],r=new Date(e.timestamp);n.push(Object(o.jsx)(I,{message:e.message,timestamp:r.toLocaleString(),username:e.username,userID:e.userID,colour:e.colour},n.length)),a.setState({messages:t,messageUI:n}),a.scrollToBottom()},a.updateMessages=function(e){var t=Object(v.a)(a.state.messages),n=Object(v.a)(a.state.messageUI);for(var r in t)if(t[r].userID===e.userID){t[r].username=e.username,t[r].colour=e.colour;var s=new Date(t[r].timestamp);n[r]=Object(o.jsx)(I,{message:t[r].message,timestamp:s.toLocaleString(),username:e.username,userID:e.userID,colour:e.colour},r)}a.setState({messages:t,messageUI:n})},a.scrollToBottom=function(){null!==a.bottomRef.current&&a.bottomRef.current.scrollIntoView({behaviour:"smooth"})},a.render=function(){return Object(o.jsx)("div",{id:"chat-area",children:Object(o.jsxs)("div",{id:"message-area",children:[a.state.messageUI,Object(o.jsx)("div",{id:"bottom-ref",ref:a.bottomRef})]})})},a.state={messages:[],messageUI:[],showError:!1},a.bottomRef=i.a.createRef(),a}return n}(i.a.Component)),D=n(108),k=n(109),E=(n(99),function(e){return new Promise((function(t){return setTimeout(t,e)}))}),T=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.call(this)).showFailure=Object(g.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({buttonTitle:"Failed...",buttonDisabled:!0}),t.next=3,E(1e3);case 3:e.setState({buttonTitle:"Send",buttonDisabled:!1});case 4:case"end":return t.stop()}}),t)}))),e.showCommandError=function(){var t=Object(g.a)(x.a.mark((function t(n){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.formRef.current.value="",e.setState({placeholder:n}),t.next=4,E(2e3);case 4:e.setState({placeholder:'Type here... Commands: "/name x" or "/color RRGGBB"; Emojis: :) , :( , :o"'});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.sendMessage=function(){var t=Object(g.a)(x.a.mark((function t(n){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.setState({buttonTitle:"Sending..."});case 2:return t.next=4,fetch("/api/message/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:n})}).then(function(){var t=Object(g.a)(x.a.mark((function t(n){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:200===n.status?(e.formRef.current.value="",e.setState({buttonTitle:"Send"})):e.showFailure();case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(){e.showFailure()}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.sendCommand=function(t,n){fetch("/api/user/",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,colour:n})}).then((function(t){200===t.status?e.formRef.current.value="":e.showCommandError("Command failed, please try again...")})).catch((function(t){e.showCommandError("Command failed, please try again...")}))},e.parseCommands=function(t){if("/"===t[0]&&2===t.split(" ").length){var n=t.split(" ")[0];if("/name"===n){var r=t.split(" ")[1];if(r.length<6)return void e.showCommandError("Name must be at least 6 characters...");e.sendCommand(r,JSON.parse(h.a.get("userData").split("j:")[1]).colour)}else if("/color"===n){var a="#"+t.split(" ")[1],s=(new Option).style;if(s.color=a,""===s.color||"#FFFFFF"===a||a.length<7)return void e.showCommandError("Invalid color...");e.sendCommand(JSON.parse(h.a.get("userData").split("j:")[1]).username,a)}else e.sendMessage(t)}else"/"!==t[0]?e.sendMessage(t):e.showCommandError("Command failed, please try again...")},e.handleSubmission=function(){""!==e.formRef.current.value&&e.parseCommands(e.formRef.current.value.trim())},e.checkForEmojis=function(){for(var t=e.formRef.current.value,n=[":)",":(",":o"],r=["\ud83d\ude01","\ud83d\ude41","\ud83d\ude32"],a=0;a<n.length;a++){t.indexOf(n[a])>=0&&(e.formRef.current.value=t.replace(n[a],r[a]))}},e.render=function(){return Object(o.jsxs)("div",{id:"chat-box",children:[Object(o.jsx)(D.a.Group,{children:Object(o.jsx)(D.a.Control,{ref:e.formRef,as:"textarea",placeholder:e.state.placeholder,onChange:e.checkForEmojis})}),Object(o.jsx)(k.a,{onClick:e.handleSubmission,disabled:e.state.buttonDisabled,children:Object(o.jsx)("div",{children:Object(o.jsx)("b",{children:e.state.buttonTitle})})})]})},e.formRef=i.a.createRef(),e.state={buttonTitle:"Send",buttonDisabled:!1,placeholder:'Type here... Commands: "/name x" or "/color RRGGBB"; Emojis: :) , :( , :o"'},e}return n}(i.a.Component),R=n(107),U=(n(103),function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.call(this)).render=function(){return Object(o.jsx)("div",{id:"chat",children:Object(o.jsx)(R.a,{style:{height:"calc(100vh - 54px)"},children:Object(o.jsxs)("div",{id:"chat",style:{display:"grid",gridTemplateRows:"80% 20%"},children:[Object(o.jsxs)("div",{children:[Object(o.jsx)(S,{}),Object(o.jsx)(C,{})]}),Object(o.jsx)("div",{style:{zIndex:"10000"},children:Object(o.jsx)(T,{})})]})})})},e}return n}(i.a.Component)),F=(n(104),function(e){return new Promise((function(t){return setTimeout(t,e)}))}),M=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).retry=Object(g.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.props.retryConnection(),a.setState({buttonTitle:"Retrying..."}),e.next=4,F(1e3);case 4:a.setState({buttonTitle:"Retry"});case 5:case"end":return e.stop()}}),e)}))),a.render=function(){return Object(o.jsxs)("div",{id:"error",children:[Object(o.jsx)("b",{children:"Oops! Something went wrong."}),Object(o.jsx)(k.a,{id:"retry-button",onClick:a.retry,children:Object(o.jsx)("div",{children:Object(o.jsx)("b",{children:a.state.buttonTitle})})})]})},a.state={buttonTitle:"Retry"},a}return n}(i.a.Component),J=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.call(this)).componentDidMount=function(){e.tryConnection()},e.tryConnection=function(){h.a.get("userData")?e.establishConnection():fetch("/api/user/",{method:"POST",headers:{"Content-Type":"application/json"}}).then((function(t){200===t.status?e.establishConnection():e.showError()})).catch((function(t){e.showError()}))},e.establishConnection=function(){j.createInstance(),e.setState({showError:!1,setupDone:!0})},e.showError=function(){e.setState({showError:!0})},e.render=function(){return Object(o.jsx)(i.a.Fragment,{children:Object(o.jsxs)("div",{id:"content",children:[Object(o.jsx)(m,{}),e.state.setupDone?e.state.showError?Object(o.jsx)("div",{id:"chat-space",children:Object(o.jsx)(M,{retryConnection:e.tryConnection})}):Object(o.jsx)("div",{id:"chat-space",children:Object(o.jsx)(U,{})}):Object(o.jsx)("div",{id:"chat-space",children:Object(o.jsx)("div",{id:"error"})})]})})},e.state={showError:!1,setupDone:!1},e}return n}(i.a.Component);l.a.render(Object(o.jsx)(J,{}),document.getElementById("root"))},87:function(e,t){},92:function(e,t,n){},94:function(e,t,n){},96:function(e,t,n){},97:function(e,t,n){},98:function(e,t,n){},99:function(e,t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.8b805f3c.chunk.js.map