(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-883abc04"],{"1dde":function(t,e,o){var n=o("d039"),s=o("b622"),r=o("2d00"),a=s("species");t.exports=function(t){return r>=51||!n((function(){var e=[],o=e.constructor={};return o[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},8418:function(t,e,o){"use strict";var n=o("c04e"),s=o("9bf2"),r=o("5c6c");t.exports=function(t,e,o){var a=n(e);a in t?s.f(t,a,r(0,o)):t[a]=o}},"99af":function(t,e,o){"use strict";var n=o("23e7"),s=o("d039"),r=o("e8b5"),a=o("861d"),i=o("7b0b"),c=o("50c4"),u=o("8418"),l=o("65f0"),d=o("1dde"),p=o("b622"),f=o("2d00"),m=p("isConcatSpreadable"),h=9007199254740991,v="Maximum allowed index exceeded",g=f>=51||!s((function(){var t=[];return t[m]=!1,t.concat()[0]!==t})),b=d("concat"),w=function(t){if(!a(t))return!1;var e=t[m];return void 0!==e?!!e:r(t)},x=!g||!b;n({target:"Array",proto:!0,forced:x},{concat:function(t){var e,o,n,s,r,a=i(this),d=l(a,0),p=0;for(e=-1,n=arguments.length;e<n;e++)if(r=-1===e?a:arguments[e],w(r)){if(s=c(r.length),p+s>h)throw TypeError(v);for(o=0;o<s;o++,p++)o in r&&u(d,p,r[o])}else{if(p>=h)throw TypeError(v);u(d,p++,r)}return d.length=p,d}})},a55b:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row"},[o("div",{staticClass:"col-5 mx-auto"},[o("h3",{staticClass:"text-center"},[t._v("登入")]),o("form",{on:{submit:function(e){return e.preventDefault(),t.signin(e)}}},[o("div",{staticClass:"form-group"},[o("label",{staticClass:"sr-only",attrs:{for:"inputEmail"}},[t._v("Email address")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{id:"inputEmail",type:"email",placeholder:"Email address",required:"",autofocus:""},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}})]),o("div",{staticClass:"form-group"},[o("label",{staticClass:"sr-only",attrs:{for:"inputPassword"}},[t._v("Password")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{id:"inputPassword",type:"password",placeholder:"Password",required:""},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),o("div",{staticClass:"row justify-content-around"},[o("button",{directives:[{name:"show",rawName:"v-show",value:!t.signingIn,expression:"!signingIn"}],staticClass:"btn btn-outline-primary",on:{click:function(e){return e.preventDefault(),t.signout(e)}}},[t._v(" Sign out ")]),t.signingIn?o("button",{staticClass:"btn btn-primary",attrs:{type:"button",disabled:""}},[o("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}),t._v(" Loading... ")]):o("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Sign In")])])])])])},s=[],r=(o("99af"),o("ac1f"),o("5319"),{data:function(){return{user:{email:"",password:""},token:"",signingIn:!1}},methods:{signin:function(){var t=this;this.signingIn=!0;var e="".concat("https://course-ec-api.hexschool.io/api","/auth/login");this.axios.post(e,this.user).then((function(e){console.log(e);var o=e.data.token,n=e.data.expired;document.cookie="AUTH_TOKEN=".concat(o,"; expires=").concat(new Date(1e3*n),"; path=/"),console.log(t.$route.query.redirect);var s=t.$route.query.redirect;s?t.$router.push({path:t.$route.query.redirect}):t.$router.push({path:"/"})})).catch((function(t){console.log(t)}))},signout:function(){document.cookie="AUTH_TOKEN=; expires=; path=/"},getData:function(){this.token=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),this.axios.defaults.headers.common.Authorization="Bearer ".concat(this.token);var t="".concat("https://course-ec-api.hexschool.io/api","/").concat("354b1b67-8c78-4eab-a8f1-148bbb2f3ec1","/admin/ec/products");this.axios.get(t).then((function(t){console.log(t)})).catch((function(t){console.log(t)}))}}}),a=r,i=o("2877"),c=Object(i["a"])(a,n,s,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-883abc04.c090a351.js.map