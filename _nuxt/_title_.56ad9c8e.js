import{p,a as d,_ as m,b as u}from"./publicMethos.57c6e402.js";import f from"./ContentRenderer.b130f1f8.js";import{h as g,r as v,B as h,U as t,af as a,ad as y,ah as $,o as C}from"./entry.10d87d8f.js";import{_ as b}from"./_plugin-vue_export-helper.c27b6911.js";import"./nuxt-link.2e60e9c1.js";import"./query.35f740aa.js";import"./utils.83e403af.js";import"./preview.4dce322b.js";import"./ContentRendererMarkdown.1d2f4584.js";import"./index.a6ef77ff.js";const A=g({async setup(){let{toggle:e,currentToggle:s,toDetail:i,title:r}=p();const o=d(),n=v();return await o.getAllArticle(),n.value=o.filteredItems(r),{toggle:e,currentToggle:s,toDetail:i,detail:n}}});const B={id:"wrapper"},I={class:"inner"},k={class:"article-content"};function w(e,s,i,r,o,n){const l=m,_=u,c=f;return C(),h("div",null,[t("div",B,[a(l,{onChange:e.toggle},null,8,["onChange"]),t("div",{id:"main",class:y({inactive:e.currentToggle})},[t("div",I,[a(_),t("div",k,[t("h1",null,$(e.detail.title),1),a(c,{value:e.detail},null,8,["value"])])])],2)])])}const S=b(A,[["render",w],["__scopeId","data-v-0be2a54e"]]);export{S as default};
