/*! For license information please see component---src-containers-category-category-post-list-tsx-a3ed5a8b720273f3ba5c.js.LICENSE.txt */
"use strict";(self.webpackChunkstories_blog=self.webpackChunkstories_blog||[]).push([[932],{9990:function(e,t,a){a.d(t,{q:function(){return o},I:function(){return i}});var r=a(6540),n=a(4794),l=a(9407);const c=(0,l.A)("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]),s=(0,l.A)("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);var m=a(8179);const o=e=>{let{currentPath:t,...a}=e;return r.createElement("header",{className:"text-left mb-8 px-6 mt-7"},r.createElement("div",{className:"text-sm font-light"},a.kind),r.createElement("h1",{className:"mb-5 text-2xl md:text-5xl md:leading-tight font-thin leading-snug tracking-tighter"},"TAGS"===a.kind&&"#",t),r.createElement("hr",{className:"mt-5"}))},i=e=>{let{frontmatter:t,etcmatter:a,...l}=e;return r.createElement("header",{className:"text-left"},r.createElement("div",{className:"mb-3 text-base"},r.createElement(n.Link,{to:`/category/${a.currentCategory}`,className:"font-semibold no-underline text-primary underline-offset-4 hover:underline"},a.currentCategory)),r.createElement("h1",{className:"mb-5 text-2xl md:text-5xl md:leading-tight font-bold leading-snug tracking-tighter"},t.title),r.createElement("div",{className:"flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400"},r.createElement("div",{className:"flex items-center gap-1"},r.createElement(c,{className:"w-3.5"}),r.createElement("span",null,(0,m.D)(t.datePublished))),r.createElement("div",{className:"flex items-center gap-1"},"/",r.createElement(s,{className:"w-3.5"}),r.createElement("span",null,"읽는데 ",r.createElement("b",null,a.readingMinutes,"분")," 정도 소요 예정"))),r.createElement("hr",{className:"mt-5"}))}},9954:function(e,t,a){a.d(t,{A:function(){return f}});var r=a(6540),n=a(2532),l=a(4794),c=a(5019),s=a.n(c),m=a(8179);const o=r.forwardRef(((e,t)=>{let{className:a,...n}=e;return r.createElement("div",Object.assign({ref:t,className:(0,m.cn)("rounded-lg bg-card text-card-foreground ",a)},n))}));o.displayName="Card";const i=r.forwardRef(((e,t)=>{let{className:a,...n}=e;return r.createElement("div",Object.assign({ref:t,className:(0,m.cn)("flex flex-col space-y-1.5 p-6",a)},n))}));i.displayName="CardHeader";const d=r.forwardRef(((e,t)=>{let{className:a,...n}=e;return r.createElement("h3",Object.assign({ref:t,className:(0,m.cn)("text-2xl font-semibold leading-tight tracking-tight",a)},n))}));d.displayName="CardTitle";const u=r.forwardRef(((e,t)=>{let{className:a,...n}=e;return r.createElement("p",Object.assign({ref:t,className:(0,m.cn)("text-sm text-muted-foreground",a)},n))}));u.displayName="CardDescription";const g=r.forwardRef(((e,t)=>{let{className:a,...n}=e;return r.createElement("div",Object.assign({ref:t,className:(0,m.cn)("p-6 pt-0",a)},n))}));g.displayName="CardContent";const p=r.forwardRef(((e,t)=>{let{className:a,...n}=e;return r.createElement("div",Object.assign({ref:t,className:(0,m.cn)("flex items-center p-6 pt-0",a)},n))}));p.displayName="CardFooter";var f=e=>{let{posts:t,currentCategory:a,currentTag:c}=e;return r.createElement("section",{className:""},t.map((e=>{var t,a;const c=e.frontmatter.title||e.frontmatter.postId;let f=(null===(t=e.frontmatter.taxonomy)||void 0===t?void 0:t.tag)&&(null===(a=e.frontmatter.taxonomy)||void 0===a?void 0:a.tag.map(((e,t)=>e&&!e.includes("[@")&&r.createElement("button",{key:t,onClick:()=>(0,l.navigate)(`/tags/${s()(e)}/`),itemProp:"url",className:"ml-2 text-colorText2 text-sm hover:text-primary"}," ","#",e," "))));f&&f.join("");const h=(0,n.c)(e.frontmatter.thumbnail),y=(0,n.c)(e.fields.firstImageUrl),E=h||y;return r.createElement(o,{key:e.id,className:"mb-3"},r.createElement(l.Link,{to:"/"+e.frontmatter.postId,itemProp:"url"},r.createElement(i,{className:"pb-4"},r.createElement(u,null,r.createElement("small",null,(0,m.D)(e.frontmatter.datePublished))),r.createElement(d,null,c)),r.createElement(g,null,E&&r.createElement(n.G,{image:E,alt:"썸네일",className:"float-left mr-5"}),r.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.desc||e.excerpt},itemProp:"description",className:"w-fit-content"})),r.createElement(p,{className:"block"},f)))})))}},5446:function(e,t,a){a.r(t),a.d(t,{Head:function(){return u}});var r=a(6540),n=a(4788),l=a(9990),c=a(9954),s=a(9312),m=a(3980),o=a(2690),i=a(4512),d=a(7836);function u(e){let{location:t}=e;const{themeMode:a}=(0,i.j)(),l=t.pathname.replace(/^\/category\/|\/$/g,""),c=decodeURIComponent(l);return r.createElement(r.Fragment,null,r.createElement("html",{lang:"ko"}),r.createElement("body",{className:a}),r.createElement(m.A,{title:n.Ji||c+"Category Page",description:n.hx}))}t.default=e=>{var t;let{data:a,location:m}=e;const{open:u,setOpen:g}=(0,i.P)(),p=m.pathname.replace(/^\/category\/|\/$/g,""),f=decodeURIComponent(p),h=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||n.Ji,y=a.allMdx.nodes;return r.createElement(s.A,{title:h},r.createElement("section",{className:"sidebar block lg:hidden"},r.createElement(d._s,{direction:"left",open:u,onOpenChange:g},r.createElement(d.zj,{className:"fixed top-0 left-0 mt-0 w-3/4 rounded-none"},r.createElement(o.A,{currentCategory:p,viewItems:["category","tags"]})))),r.createElement("section",{className:"sidebar hidden lg:block"},r.createElement(o.A,{currentCategory:p,viewItems:["category","tags"]})),r.createElement("section",{className:"w-full lg:min-w-[600px]"},r.createElement(l.q,{kind:"CATEGORY",currentPath:f}),r.createElement(c.A,{posts:y,currentCategory:f})))}}}]);
//# sourceMappingURL=component---src-containers-category-category-post-list-tsx-a3ed5a8b720273f3ba5c.js.map