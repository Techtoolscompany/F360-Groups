const h="modulepreload",E=function(i){return"/"+i},a={},y=function(u,s,v){let c=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),t=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));c=Promise.allSettled(s.map(r=>{if(r=E(r),r in a)return;a[r]=!0;const o=r.endsWith(".css"),d=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${d}`))return;const n=document.createElement("link");if(n.rel=o?"stylesheet":h,o||(n.as="script"),n.crossOrigin="",n.href=r,t&&n.setAttribute("nonce",t),document.head.appendChild(n),o)return new Promise((f,m)=>{n.addEventListener("load",f),n.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${r}`)))})}))}function l(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return c.then(e=>{for(const t of e||[])t.status==="rejected"&&l(t.reason);return u().catch(l)})};export{y as _};
//# sourceMappingURL=supabase-D7HrI6pR.js.map
