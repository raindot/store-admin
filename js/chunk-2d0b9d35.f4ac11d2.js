(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9d35"],{3530:function(a,t,n){"use strict";n.r(t);var e=function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("b-overlay",{attrs:{show:a.loading}},[n("div",{staticClass:"container"},[n("b-navbar",{attrs:{toggleable:"lg",variant:"light"}},[n("b-navbar-brand",{attrs:{href:"#"}},[a._v("後台")]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:{name:"products-admin"}}},[a._v("產品列表")]),n("b-nav-item",{attrs:{to:{name:"order-list"}}},[a._v("訂單列表")]),n("b-nav-item",{attrs:{to:{name:"coupon-list"}}},[a._v("優惠券列表")]),n("b-nav-item",{attrs:{to:{name:"file-list"}}},[a._v("圖片列表")])],1)],1)],1),n("router-view")],1)])},o=[],r=(n("ac1f"),n("5319"),{data:function(){return{token:"",loading:!1}},created:function(){var a=this;this.$bus.$on("show-overlay",(function(t){a.loading=t}));var t=document.cookie.replace(/(?:(?:^|.*;\s*)AUTH_TOKEN\s*=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common.Authorization="Bearer ".concat(t)}}),s=r,i=n("2877"),l=Object(i["a"])(s,e,o,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0b9d35.f4ac11d2.js.map