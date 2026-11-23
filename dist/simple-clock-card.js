function e(e,t,o,i){var n,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(s=(a<3?n(s):a>3?n(t,o,s):n(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let a=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new a(o,e,i)},r=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:_,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,m=p.trustedTypes,g=m?m.emptyScript:"",f=p.reactiveElementPolyfillSupport,b=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},$=(e,t)=>!l(e,t),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:n}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const a=i?.call(this);n?.call(this,t),this.requestUpdate(e,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??v}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[..._(e),...h(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(o)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:y).toAttribute(t,o.type);this._$Em=e,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){const o=this.constructor,i=o._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=o.getPropertyOptions(i),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=i;const a=n.fromAttribute(t,e.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,o,i=!1,n){if(void 0!==e){const a=this.constructor;if(!1===i&&(n=this[e]),o??=a.getPropertyOptions(e),!((o.hasChanged??$)(n,t)||o.useDefault&&o.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:n},a){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==n||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,f?.({ReactiveElement:w}),(p.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,A=e=>e,k=S.trustedTypes,z=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,M="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+x,C=`<${E}>`,P=document,T=()=>P.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,H=Array.isArray,F="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,O=/>/g,j=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,U=/"/g,R=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),q=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),Y=new WeakMap,W=P.createTreeWalker(P,129);function G(e,t){if(!H(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(t):t}const K=(e,t)=>{const o=e.length-1,i=[];let n,a=2===t?"<svg>":3===t?"<math>":"",s=N;for(let t=0;t<o;t++){const o=e[t];let r,l,d=-1,c=0;for(;c<o.length&&(s.lastIndex=c,l=s.exec(o),null!==l);)c=s.lastIndex,s===N?"!--"===l[1]?s=L:void 0!==l[1]?s=O:void 0!==l[2]?(R.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=j):void 0!==l[3]&&(s=j):s===j?">"===l[0]?(s=n??N,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,r=l[1],s=void 0===l[3]?j:'"'===l[3]?U:I):s===U||s===I?s=j:s===L||s===O?s=N:(s=j,n=void 0);const _=s===j&&e[t+1].startsWith("/>")?" ":"";a+=s===N?o+C:d>=0?(i.push(r),o.slice(0,d)+M+o.slice(d)+x+_):o+x+(-2===d?t:_)}return[G(e,a+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Z{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let n=0,a=0;const s=e.length-1,r=this.parts,[l,d]=K(e,t);if(this.el=Z.createElement(l,o),W.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=W.nextNode())&&r.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(M)){const t=d[a++],o=i.getAttribute(e).split(x),s=/([.?@])?(.*)/.exec(t);r.push({type:1,index:n,name:s[2],strings:o,ctor:"."===s[1]?te:"?"===s[1]?oe:"@"===s[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(x)&&(r.push({type:6,index:n}),i.removeAttribute(e));if(R.test(i.tagName)){const e=i.textContent.split(x),t=e.length-1;if(t>0){i.textContent=k?k.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],T()),W.nextNode(),r.push({type:2,index:++n});i.append(e[t],T())}}}else if(8===i.nodeType)if(i.data===E)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(x,e+1));)r.push({type:7,index:n}),e+=x.length-1}n++}}static createElement(e,t){const o=P.createElement("template");return o.innerHTML=e,o}}function V(e,t,o=e,i){if(t===q)return t;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const a=D(t)?void 0:t._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(e),n._$AT(e,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(t=V(e,n._$AS(e,t.values),n,i)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=(e?.creationScope??P).importNode(t,!0);W.currentNode=i;let n=W.nextNode(),a=0,s=0,r=o[0];for(;void 0!==r;){if(a===r.index){let t;2===r.type?t=new Q(n,n.nextSibling,this,e):1===r.type?t=new r.ctor(n,r.name,r.strings,this,e):6===r.type&&(t=new ne(n,this,e)),this._$AV.push(t),r=o[++s]}a!==r?.index&&(n=W.nextNode(),a++)}return W.currentNode=P,i}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=V(this,e,t),D(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>H(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=Z.createElement(G(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new X(i,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new Z(e)),t}k(e){H(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const n of e)i===t.length?t.push(o=new Q(this.O(T()),this.O(T()),this,this.options)):o=t[i],o._$AI(n),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,n){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=J}_$AI(e,t=this,o,i){const n=this.strings;let a=!1;if(void 0===n)e=V(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==q,a&&(this._$AH=e);else{const i=e;let s,r;for(e=n[0],s=0;s<n.length-1;s++)r=V(this,i[o+s],t,s),r===q&&(r=this._$AH[s]),a||=!D(r)||r!==this._$AH[s],r===J?e=J:e!==J&&(e+=(r??"")+n[s+1]),this._$AH[s]=r}a&&!i&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class oe extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class ie extends ee{constructor(e,t,o,i,n){super(e,t,o,i,n),this.type=5}_$AI(e,t=this){if((e=V(this,e,t,0)??J)===q)return;const o=this._$AH,i=e===J&&o!==J||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==J&&(o===J||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}}const ae=S.litHtmlPolyfillSupport;ae?.(Z,Q),(S.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;let re=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const i=o?.renderBefore??t;let n=i._$litPart$;if(void 0===n){const e=o?.renderBefore??null;i._$litPart$=n=new Q(t.insertBefore(T(),e),e,void 0,o??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};re._$litElement$=!0,re.finalized=!0,se.litElementHydrateSupport?.({LitElement:re});const le=se.litElementPolyfillSupport;le?.({LitElement:re}),(se.litElementVersions??=[]).push("4.2.2");const de=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ce={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},_e=(e=ce,t,o)=>{const{kind:i,metadata:n}=o;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),a.set(o.name,e),"accessor"===i){const{name:i}=o;return{set(o){const n=t.get.call(this);t.set.call(this,o),this.requestUpdate(i,n,e,!0,o)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];t.call(this,o),this.requestUpdate(i,n,e,!0,o)}}throw Error("Unsupported decorator location: "+i)};function he(e){return(t,o)=>"object"==typeof o?_e(e,t,o):((e,t,o)=>{const i=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),i?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function ue(e){return he({...e,state:!0,attribute:!1})}const pe=1;let me=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const ge="important",fe=" !"+ge,be=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends me{constructor(e){if(super(e),e.type!==pe||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,o)=>{const i=e[o];return null==i?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(e,[t]){const{style:o}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?o.removeProperty(e):o[e]=null);for(const e in t){const i=t[e];if(null!=i){this.ft.add(e);const t="string"==typeof i&&i.endsWith(fe);e.includes("-")||t?o.setProperty(e,t?i.slice(0,-11):i,t?ge:""):o[e]=i}}return q}}),ye=!0,$e=!1,ve=!0,we={type:"custom:simple-clock-card",time_mode:"hm",use_24h:!0,show_ampm:!0,ampm_position:"right",leading_zero:!0,blink_separator:!1,seconds_style:"superscript",timezone:void 0,language:"auto",show_date:!0,date_position:"bottom",date_format_type:"long",short_date_order:"DMY",short_date_separator:"/",short_year_2_digits:!1,long_weekday_format:"long",long_month_format:"long",long_show_year:!0,capitalize_date:!0,show_entities:!0,entities_position:"bottom",entity_1:void 0,entity_2:void 0,entity_3:void 0,card_padding:16,card_min_height:0,clock_font_size:56,seconds_font_size:24,date_font_size:18,entity_font_size:14,content_gap:8,text_align:"center",font_weight:"500",font_family:"inherit",clock_color:void 0,date_color:void 0,entity_color:void 0,entity_icon_color:void 0,background_color:void 0,background_opacity:100,backdrop_blur:0,hide_border:!1,hide_shadow:!1,border_radius:void 0,tap_action:void 0,double_tap_action:void 0,hold_action:void 0},Se={en:{weekdaysLong:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],monthsLong:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},es:{weekdaysLong:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],weekdaysShort:["dom","lun","mar","mié","jue","vie","sáb"],monthsLong:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],monthsShort:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]},it:{weekdaysLong:["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],weekdaysShort:["dom","lun","mar","mer","gio","ven","sab"],monthsLong:["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],monthsShort:["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"]},pt:{weekdaysLong:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],weekdaysShort:["dom","seg","ter","qua","qui","sex","sáb"],monthsLong:["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],monthsShort:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"]},"pt-BR":{weekdaysLong:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],weekdaysShort:["dom","seg","ter","qua","qui","sex","sáb"],monthsLong:["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],monthsShort:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"]},ru:{weekdaysLong:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],weekdaysShort:["вс","пн","вт","ср","чт","пт","сб"],monthsLong:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],monthsShort:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"]},de:{weekdaysLong:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],weekdaysShort:["So","Mo","Di","Mi","Do","Fr","Sa"],monthsLong:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthsShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]},fr:{weekdaysLong:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],weekdaysShort:["dim","lun","mar","mer","jeu","ven","sam"],monthsLong:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],monthsShort:["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."]},"zh-Hans":{weekdaysLong:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],weekdaysShort:["周日","周一","周二","周三","周四","周五","周六"],monthsLong:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],monthsShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}},Ae={en:{card_name:"Simple Clock Card",card_description:"Highly customizable clock, date, and status entities card with full visual editor.",unavailable:"Unavailable",section_clock:"Clock",section_date_language:"Date & Language",section_entities:"Status Entities (3)",section_sizing_typography:"Size & Typography",section_colors_transparency:"Colors & Transparency",section_interactions:"Interactions",time_mode:"Time display",time_mode_h:"Hours only (HH)",time_mode_hm:"Hours & minutes (HH:MM)",time_mode_hms:"Hours, minutes & seconds (HH:MM:SS)",use_24h:"24-hour format",show_ampm:"Show AM/PM",ampm_position:"AM/PM position",ampm_right:"Right (inline)",ampm_superscript:"Superscript",ampm_subscript:"Subscript",ampm_below:"Below clock",leading_zero:"Leading zero on hours",blink_separator:'Blink ":" separator',seconds_style:"Seconds style",seconds_inline:"Same size (inline)",seconds_superscript:"Small (superscript)",seconds_subscript:"Small (subscript)",timezone:"Timezone (optional)",timezone_helper:"Leave empty for system timezone (e.g. America/New_York)",language:"Language",language_auto:"Automatic (Home Assistant)",show_date:"Show date",date_position:"Date position",position_top:"Top (above clock)",position_bottom:"Bottom (below clock)",date_format_type:"Date style",date_format_short:"Short date",date_format_long:"Long date",date_format_both:"Weekday + Short date",short_date_order:"Short date order",order_dmy:"DD/MM/YYYY",order_mdy:"MM/DD/YYYY",order_ymd:"YYYY/MM/DD",short_date_separator:"Date separator",short_year_2_digits:"2-digit year",long_weekday_format:"Weekday",weekday_long:"Full (Monday)",weekday_short:"Short (Mon)",weekday_none:"Hidden",long_month_format:"Month name",month_long:"Full",month_short:"Abbreviated",long_show_year:"Show year",capitalize_date:"Capitalize first letter",show_entities:"Show entities",entities_position:"Entities position",entity_slot:"Entity",entity:"Entity",attribute:"Attribute (optional)",attribute_helper:"Leave empty to display the main state",custom_name:"Custom name (optional)",custom_icon:"Custom icon (optional)",entity_slot_icon_color:"Icon color (optional)",custom_unit:"Custom unit (optional)",show_icon:"Show icon",show_name:"Show name",show_unit:"Show unit",card_padding:"Card padding",card_min_height:"Minimum card height",card_min_height_helper:"0 = automatic height",clock_font_size:"Clock text size",seconds_font_size:"Seconds / AM-PM size",date_font_size:"Date text size",entity_font_size:"Entities text size",content_gap:"Spacing between elements",text_align:"Alignment",align_left:"Left",align_center:"Center",align_right:"Right",font_weight:"Font weight",font_family:"Font style",font_inherit:"Theme default",font_sans:"Sans-serif",font_serif:"Serif",font_mono:"Monospace",font_digital:"Digital / Tabular",font_rounded:"Rounded",clock_color:"Clock text color",date_color:"Date text color",entity_color:"Entities text color",entity_icon_color:"Entities icon color",background_color:"Card background color",background_opacity:"Background opacity",backdrop_blur:"Background blur (glass)",border_radius:"Corner radius",hide_border:"Hide card border",hide_shadow:"Hide card shadow",reset_default:"Reset to default",tap_action:"Tap action",double_tap_action:"Double tap action",hold_action:"Hold action",action_none:"No action",action_more_info:"More info",action_toggle:"Toggle",action_navigate:"Navigate",action_url:"Open URL",action_perform_action:"Perform action",action_assist:"Assist"},es:{card_name:"Simple Clock Card",card_description:"Tarjeta de reloj, fecha y entidades de estado altamente configurable desde la interfaz visual.",unavailable:"No disponible",section_clock:"Reloj",section_date_language:"Fecha e Idioma",section_entities:"Entidades de Estado (3)",section_sizing_typography:"Tamaño y Tipografía",section_colors_transparency:"Colores y Transparencia",section_interactions:"Interacciones",time_mode:"Visualización de la hora",time_mode_h:"Solo horas (HH)",time_mode_hm:"Horas y minutos (HH:MM)",time_mode_hms:"Horas, minutos y segundos (HH:MM:SS)",use_24h:"Formato 24 horas",show_ampm:"Mostrar AM/PM",ampm_position:"Posición de AM/PM",ampm_right:"Derecha (en línea)",ampm_superscript:"Superíndice",ampm_subscript:"Subíndice",ampm_below:"Debajo del reloj",leading_zero:"Cero inicial en horas",blink_separator:'Parpadeo del separador ":"',seconds_style:"Estilo de los segundos",seconds_inline:"Mismo tamaño (en línea)",seconds_superscript:"Pequeños (superíndice)",seconds_subscript:"Pequeños (subíndice)",timezone:"Zona horaria (opcional)",timezone_helper:"Dejar vacío para usar la del sistema (ej. America/Argentina/Buenos_Aires)",language:"Idioma",language_auto:"Automático (Home Assistant)",show_date:"Mostrar fecha",date_position:"Posición de la fecha",position_top:"Arriba (sobre el reloj)",position_bottom:"Abajo (debajo del reloj)",date_format_type:"Tipo de fecha",date_format_short:"Fecha corta",date_format_long:"Fecha larga",date_format_both:"Día de la semana + Fecha corta",short_date_order:"Orden de fecha corta",order_dmy:"DD/MM/AAAA",order_mdy:"MM/DD/AAAA",order_ymd:"AAAA/MM/DD",short_date_separator:"Separador de fecha",short_year_2_digits:"Año de 2 dígitos",long_weekday_format:"Día de la semana",weekday_long:"Completo (lunes)",weekday_short:"Corto (lun)",weekday_none:"Oculto",long_month_format:"Nombre del mes",month_long:"Completo",month_short:"Abreviado",long_show_year:"Mostrar año",capitalize_date:"Mayúscula inicial",show_entities:"Mostrar entidades",entities_position:"Posición de las entidades",entity_slot:"Entidad",entity:"Entidad",attribute:"Atributo (opcional)",attribute_helper:"Dejar vacío para mostrar el estado principal",custom_name:"Nombre personalizado (opcional)",custom_icon:"Icono personalizado (opcional)",entity_slot_icon_color:"Color del icono (opcional)",custom_unit:"Unidad personalizada (opcional)",show_icon:"Mostrar icono",show_name:"Mostrar nombre",show_unit:"Mostrar unidad",card_padding:"Relleno interior de la tarjeta",card_min_height:"Altura mínima de la tarjeta",card_min_height_helper:"0 = altura automática",clock_font_size:"Tamaño del texto del reloj",seconds_font_size:"Tamaño de segundos / AM-PM",date_font_size:"Tamaño del texto de fecha",entity_font_size:"Tamaño de las entidades",content_gap:"Espacio entre elementos",text_align:"Alineación",align_left:"Izquierda",align_center:"Centro",align_right:"Derecha",font_weight:"Grosor de fuente",font_family:"Estilo de tipografía",font_inherit:"Por defecto del tema",font_sans:"Sans-serif",font_serif:"Serif",font_mono:"Monoespaciada",font_digital:"Digital / Tabular",font_rounded:"Redondeada",clock_color:"Color del texto del reloj",date_color:"Color del texto de la fecha",entity_color:"Color del texto de entidades",entity_icon_color:"Color del icono de entidades",background_color:"Color de fondo de la tarjeta",background_opacity:"Opacidad del fondo",backdrop_blur:"Desenfoque de fondo (cristal)",border_radius:"Radio de las esquinas",hide_border:"Ocultar borde de la tarjeta",hide_shadow:"Ocultar sombra de la tarjeta",reset_default:"Restablecer",tap_action:"Acción al pulsar",double_tap_action:"Acción al pulsar dos veces",hold_action:"Acción al mantener pulsado",action_none:"Ninguna acción",action_more_info:"Más información",action_toggle:"Alternar",action_navigate:"Navegar",action_url:"Abrir URL",action_perform_action:"Ejecutar acción",action_assist:"Asistente"},it:{card_name:"Simple Clock Card",card_description:"Scheda orologio, data ed entità di stato altamente personalizzabile tramite editor visivo.",unavailable:"Non disponibile",section_clock:"Orologio",section_date_language:"Data e Lingua",section_entities:"Entità di Stato (3)",section_sizing_typography:"Dimensioni e Tipografia",section_colors_transparency:"Colori e Trasparenza",section_interactions:"Interazioni",time_mode:"Visualizzazione ora",time_mode_h:"Solo ore (HH)",time_mode_hm:"Ore e minuti (HH:MM)",time_mode_hms:"Ore, minuti e secondi (HH:MM:SS)",use_24h:"Formato 24 ore",show_ampm:"Mostra AM/PM",ampm_position:"Posizione AM/PM",ampm_right:"Destra (in linea)",ampm_superscript:"Apice",ampm_subscript:"Pedice",ampm_below:"Sotto l’orologio",leading_zero:"Zero iniziale sulle ore",blink_separator:'Lampeggio separatore ":"',seconds_style:"Stile dei secondi",seconds_inline:"Stessa dimensione (in linea)",seconds_superscript:"Piccoli (apice)",seconds_subscript:"Piccoli (pedice)",timezone:"Fuso orario (opzionale)",timezone_helper:"Lascia vuoto per il fuso orario di sistema (es. Europe/Rome)",language:"Lingua",language_auto:"Automatico (Home Assistant)",show_date:"Mostra data",date_position:"Posizione della data",position_top:"Sopra (sopra l’orologio)",position_bottom:"Sotto (sotto l’orologio)",date_format_type:"Formato data",date_format_short:"Data breve",date_format_long:"Data estesa",date_format_both:"Giorno della settimana + Data breve",short_date_order:"Ordine data breve",order_dmy:"GG/MM/AAAA",order_mdy:"MM/GG/AAAA",order_ymd:"AAAA/MM/GG",short_date_separator:"Separatore data",short_year_2_digits:"Anno a 2 cifre",long_weekday_format:"Giorno della settimana",weekday_long:"Completo (lunedì)",weekday_short:"Breve (lun)",weekday_none:"Nascosto",long_month_format:"Nome del mese",month_long:"Completo",month_short:"Abbreviato",long_show_year:"Mostra anno",capitalize_date:"Iniziale maiuscola",show_entities:"Mostra entità",entities_position:"Posizione delle entità",entity_slot:"Entità",entity:"Entità",attribute:"Attributo (opzionale)",attribute_helper:"Lascia vuoto per mostrare lo stato principale",custom_name:"Nome personalizzato (opzionale)",custom_icon:"Icona personalizzata (opzionale)",entity_slot_icon_color:"Colore icona (opzionale)",custom_unit:"Unità personalizzata (opzionale)",show_icon:"Mostra icona",show_name:"Mostra nome",show_unit:"Mostra unità",card_padding:"Spaziatura interna scheda",card_min_height:"Altezza minima scheda",card_min_height_helper:"0 = altezza automatica",clock_font_size:"Dimensione testo orologio",seconds_font_size:"Dimensione secondi / AM-PM",date_font_size:"Dimensione testo data",entity_font_size:"Dimensione testo entità",content_gap:"Spazio tra gli elementi",text_align:"Allineamento",align_left:"Sinistra",align_center:"Centro",align_right:"Destra",font_weight:"Spessore carattere",font_family:"Stile carattere",font_inherit:"Predefinito del tema",font_sans:"Sans-serif",font_serif:"Serif",font_mono:"Monospazio",font_digital:"Digitale / Tabulare",font_rounded:"Arrotondato",clock_color:"Colore testo orologio",date_color:"Colore testo data",entity_color:"Colore testo entità",entity_icon_color:"Colore icona entità",background_color:"Colore sfondo scheda",background_opacity:"Opacità sfondo",backdrop_blur:"Sfocatura sfondo (vetro)",border_radius:"Raggio angoli",hide_border:"Nascondi bordo scheda",hide_shadow:"Nascondi ombra scheda",reset_default:"Ripristina",tap_action:"Azione al tocco",double_tap_action:"Azione al doppio tocco",hold_action:"Azione alla pressione prolungata",action_none:"Nessuna azione",action_more_info:"Ulteriori informazioni",action_toggle:"Attiva/Disattiva",action_navigate:"Naviga",action_url:"Apri URL",action_perform_action:"Esegui azione",action_assist:"Assist"},pt:{card_name:"Simple Clock Card",card_description:"Cartão de relógio, data e entidades de estado altamente configurável através do editor visual.",unavailable:"Indisponível",section_clock:"Relógio",section_date_language:"Data e Idioma",section_entities:"Entidades de Estado (3)",section_sizing_typography:"Tamanho e Tipografia",section_colors_transparency:"Cores e Transparência",section_interactions:"Interações",time_mode:"Apresentação da hora",time_mode_h:"Apenas horas (HH)",time_mode_hm:"Horas e minutos (HH:MM)",time_mode_hms:"Horas, minutos e segundos (HH:MM:SS)",use_24h:"Formato de 24 horas",show_ampm:"Mostrar AM/PM",ampm_position:"Posição de AM/PM",ampm_right:"Direita (em linha)",ampm_superscript:"Sobrescrito",ampm_subscript:"Subscrito",ampm_below:"Abaixo do relógio",leading_zero:"Zero inicial nas horas",blink_separator:'Piscar separador ":"',seconds_style:"Estilo dos segundos",seconds_inline:"Mesmo tamanho (em linha)",seconds_superscript:"Pequenos (sobrescrito)",seconds_subscript:"Pequenos (subscrito)",timezone:"Fuso horário (opcional)",timezone_helper:"Deixar vazio para usar o do sistema (ex. Europe/Lisbon)",language:"Idioma",language_auto:"Automático (Home Assistant)",show_date:"Mostrar data",date_position:"Posição da data",position_top:"Acima (acima do relógio)",position_bottom:"Abaixo (abaixo do relógio)",date_format_type:"Tipo de data",date_format_short:"Data curta",date_format_long:"Data longa",date_format_both:"Dia da semana + Data curta",short_date_order:"Ordem da data curta",order_dmy:"DD/MM/AAAA",order_mdy:"MM/DD/AAAA",order_ymd:"AAAA/MM/DD",short_date_separator:"Separador de data",short_year_2_digits:"Ano com 2 dígitos",long_weekday_format:"Dia da semana",weekday_long:"Completo (segunda-feira)",weekday_short:"Curto (seg)",weekday_none:"Oculto",long_month_format:"Nome do mês",month_long:"Completo",month_short:"Abreviado",long_show_year:"Mostrar ano",capitalize_date:"Primeira letra maiúscula",show_entities:"Mostrar entidades",entities_position:"Posição das entidades",entity_slot:"Entidade",entity:"Entidade",attribute:"Atributo (opcional)",attribute_helper:"Deixar vazio para mostrar o estado principal",custom_name:"Nome personalizado (opcional)",custom_icon:"Ícone personalizado (opcional)",entity_slot_icon_color:"Cor do ícone (opcional)",custom_unit:"Unidade personalizada (opcional)",show_icon:"Mostrar ícone",show_name:"Mostrar nome",show_unit:"Mostrar unidade",card_padding:"Espaçamento interno do cartão",card_min_height:"Altura mínima do cartão",card_min_height_helper:"0 = altura automática",clock_font_size:"Tamanho do texto do relógio",seconds_font_size:"Tamanho de segundos / AM-PM",date_font_size:"Tamanho do texto da data",entity_font_size:"Tamanho das entidades",content_gap:"Espaço entre elementos",text_align:"Alinhamento",align_left:"Esquerda",align_center:"Centro",align_right:"Direita",font_weight:"Espessura da letra",font_family:"Estilo de letra",font_inherit:"Predefinido do tema",font_sans:"Sans-serif",font_serif:"Serif",font_mono:"Monoespaçada",font_digital:"Digital / Tabular",font_rounded:"Arredondada",clock_color:"Cor do texto do relógio",date_color:"Cor do texto da data",entity_color:"Cor do texto das entidades",entity_icon_color:"Cor do ícone das entidades",background_color:"Cor de fundo do cartão",background_opacity:"Opacidade do fundo",backdrop_blur:"Desfoque do fundo (vidro)",border_radius:"Raio dos cantos",hide_border:"Ocultar contorno do cartão",hide_shadow:"Ocultar sombra do cartão",reset_default:"Repor",tap_action:"Ação ao tocar",double_tap_action:"Ação ao tocar duas vezes",hold_action:"Ação ao manter premido",action_none:"Nenhuma ação",action_more_info:"Mais informações",action_toggle:"Alternar",action_navigate:"Navegar",action_url:"Abrir URL",action_perform_action:"Executar ação",action_assist:"Assistente"},"pt-BR":{card_name:"Simple Clock Card",card_description:"Cartão de relógio, data e entidades de status altamente personalizável pelo editor visual.",unavailable:"Indisponível",section_clock:"Relógio",section_date_language:"Data e Idioma",section_entities:"Entidades de Status (3)",section_sizing_typography:"Tamanho e Tipografia",section_colors_transparency:"Cores e Transparência",section_interactions:"Interações",time_mode:"Exibição da hora",time_mode_h:"Somente horas (HH)",time_mode_hm:"Horas e minutos (HH:MM)",time_mode_hms:"Horas, minutos e segundos (HH:MM:SS)",use_24h:"Formato 24 horas",show_ampm:"Exibir AM/PM",ampm_position:"Posição de AM/PM",ampm_right:"Direita (na linha)",ampm_superscript:"Sobrescrito",ampm_subscript:"Subscrito",ampm_below:"Abaixo do relógio",leading_zero:"Zero à esquerda nas horas",blink_separator:'Piscar separador ":"',seconds_style:"Estilo dos segundos",seconds_inline:"Mesmo tamanho (na linha)",seconds_superscript:"Pequenos (sobrescrito)",seconds_subscript:"Pequenos (subscrito)",timezone:"Fuso horário (opcional)",timezone_helper:"Deixe vazio para usar o do sistema (ex. America/Sao_Paulo)",language:"Idioma",language_auto:"Automático (Home Assistant)",show_date:"Exibir data",date_position:"Posição da data",position_top:"Acima (acima do relógio)",position_bottom:"Abaixo (abaixo do relógio)",date_format_type:"Tipo de data",date_format_short:"Data curta",date_format_long:"Data por extenso",date_format_both:"Dia da semana + Data curta",short_date_order:"Ordem da data curta",order_dmy:"DD/MM/AAAA",order_mdy:"MM/DD/AAAA",order_ymd:"AAAA/MM/DD",short_date_separator:"Separador de data",short_year_2_digits:"Ano com 2 dígitos",long_weekday_format:"Dia da semana",weekday_long:"Completo (segunda-feira)",weekday_short:"Curto (seg)",weekday_none:"Oculto",long_month_format:"Nome do mês",month_long:"Completo",month_short:"Abreviado",long_show_year:"Exibir ano",capitalize_date:"Primeira letra maiúscula",show_entities:"Exibir entidades",entities_position:"Posição das entidades",entity_slot:"Entidade",entity:"Entidade",attribute:"Atributo (opcional)",attribute_helper:"Deixe vazio para exibir o estado principal",custom_name:"Nome personalizado (opcional)",custom_icon:"Ícone personalizado (opcional)",entity_slot_icon_color:"Cor do ícone (opcional)",custom_unit:"Unidade personalizada (opcional)",show_icon:"Exibir ícone",show_name:"Exibir nome",show_unit:"Exibir unidade",card_padding:"Espaçamento interno do cartão",card_min_height:"Altura mínima do cartão",card_min_height_helper:"0 = altura automática",clock_font_size:"Tamanho da fonte do relógio",seconds_font_size:"Tamanho dos segundos / AM-PM",date_font_size:"Tamanho da fonte da data",entity_font_size:"Tamanho das entidades",content_gap:"Espaço entre elementos",text_align:"Alinhamento",align_left:"Esquerda",align_center:"Centro",align_right:"Direita",font_weight:"Peso da fonte",font_family:"Estilo da fonte",font_inherit:"Padrão do tema",font_sans:"Sans-serif",font_serif:"Serif",font_mono:"Monoespaçada",font_digital:"Digital / Tabular",font_rounded:"Arredondada",clock_color:"Cor do texto do relógio",date_color:"Cor do texto da data",entity_color:"Cor do texto das entidades",entity_icon_color:"Cor do ícone das entidades",background_color:"Cor de fundo do cartão",background_opacity:"Opacidade do fundo",backdrop_blur:"Desfoque do fundo (vidro)",border_radius:"Raio das bordas",hide_border:"Ocultar borda do cartão",hide_shadow:"Ocultar sombra do cartão",reset_default:"Redefinir",tap_action:"Ação ao tocar",double_tap_action:"Ação ao tocar duas vezes",hold_action:"Ação ao pressionar e segurar",action_none:"Nenhuma ação",action_more_info:"Mais informações",action_toggle:"Alternar",action_navigate:"Navegar",action_url:"Abrir URL",action_perform_action:"Executar ação",action_assist:"Assistente"},ru:{card_name:"Simple Clock Card",card_description:"Гибкая карточка часов, даты и объектов состояния с полным визуальным редактором.",unavailable:"Недоступно",section_clock:"Часы",section_date_language:"Дата и язык",section_entities:"Объекты состояния (3)",section_sizing_typography:"Размер и шрифт",section_colors_transparency:"Цвета и прозрачность",section_interactions:"Взаимодействия",time_mode:"Отображение времени",time_mode_h:"Только часы (ЧЧ)",time_mode_hm:"Часы и минуты (ЧЧ:ММ)",time_mode_hms:"Часы, минуты и секунды (ЧЧ:ММ:СС)",use_24h:"24-часовой формат",show_ampm:"Показывать AM/PM",ampm_position:"Позиция AM/PM",ampm_right:"Справа (в строку)",ampm_superscript:"Надстрочный",ampm_subscript:"Подстрочный",ampm_below:"Под часами",leading_zero:"Ведущий ноль для часов",blink_separator:'Мигание разделителя ":"',seconds_style:"Стиль секунд",seconds_inline:"Обычный размер (в строку)",seconds_superscript:"Мелкий (надстрочный)",seconds_subscript:"Мелкий (подстрочный)",timezone:"Часовой пояс (необязательно)",timezone_helper:"Оставьте пустым для системного часового пояса (напр. Europe/Moscow)",language:"Язык",language_auto:"Автоматически (Home Assistant)",show_date:"Показывать дату",date_position:"Позиция даты",position_top:"Сверху (над часами)",position_bottom:"Снизу (под часами)",date_format_type:"Формат даты",date_format_short:"Короткая дата",date_format_long:"Длинная дата",date_format_both:"День недели + Короткая дата",short_date_order:"Порядок короткой даты",order_dmy:"ДД/ММ/ГГГГ",order_mdy:"ММ/ДД/ГГГГ",order_ymd:"ГГГГ/ММ/ДД",short_date_separator:"Разделитель даты",short_year_2_digits:"Год из 2 цифр",long_weekday_format:"День недели",weekday_long:"Полный (понедельник)",weekday_short:"Короткий (пн)",weekday_none:"Скрыть",long_month_format:"Название месяца",month_long:"Полное",month_short:"Сокращённое",long_show_year:"Показывать год",capitalize_date:"С заглавной буквы",show_entities:"Показывать объекты",entities_position:"Позиция объектов",entity_slot:"Объект",entity:"Объект",attribute:"Атрибут (необязательно)",attribute_helper:"Оставьте пустым для основного состояния",custom_name:"Своё имя (необязательно)",custom_icon:"Своя иконка (необязательно)",entity_slot_icon_color:"Цвет иконки (необязательно)",custom_unit:"Своя единица измерения (необязательно)",show_icon:"Показывать иконку",show_name:"Показывать имя",show_unit:"Показывать единицу",card_padding:"Внутренний отступ карточки",card_min_height:"Минимальная высота карточки",card_min_height_helper:"0 = автоматическая высота",clock_font_size:"Размер текста часов",seconds_font_size:"Размер секунд / AM-PM",date_font_size:"Размер текста даты",entity_font_size:"Размер текста объектов",content_gap:"Расстояние между элементами",text_align:"Выравнивание",align_left:"Слева",align_center:"По центру",align_right:"Справа",font_weight:"Насыщенность шрифта",font_family:"Стиль шрифта",font_inherit:"Из темы",font_sans:"Без засечек (Sans-serif)",font_serif:"С засечками (Serif)",font_mono:"Моноширинный",font_digital:"Цифровой / Табличный",font_rounded:"Скруглённый",clock_color:"Цвет текста часов",date_color:"Цвет текста даты",entity_color:"Цвет текста объектов",entity_icon_color:"Цвет иконок объектов",background_color:"Цвет фона карточки",background_opacity:"Непрозрачность фона",backdrop_blur:"Размытие фона (стекло)",border_radius:"Скругление углов",hide_border:"Скрыть рамку карточки",hide_shadow:"Скрыть тень карточки",reset_default:"Сбросить",tap_action:"Действие при нажатии",double_tap_action:"Действие при двойном нажатии",hold_action:"Действие при удержании",action_none:"Нет действия",action_more_info:"Подробнее",action_toggle:"Переключить",action_navigate:"Перейти",action_url:"Открыть URL",action_perform_action:"Выполнить действие",action_assist:"Ассистент"},de:{card_name:"Simple Clock Card",card_description:"Umfassend anpassbare Uhr-, Datums- und Statusentitäten-Karte mit visuellem Editor.",unavailable:"Nicht verfügbar",section_clock:"Uhr",section_date_language:"Datum & Sprache",section_entities:"Status-Entitäten (3)",section_sizing_typography:"Größe & Typografie",section_colors_transparency:"Farben & Transparenz",section_interactions:"Interaktionen",time_mode:"Zeitanzeige",time_mode_h:"Nur Stunden (SS)",time_mode_hm:"Stunden & Minuten (SS:MM)",time_mode_hms:"Stunden, Minuten & Sekunden (SS:MM:SS)",use_24h:"24-Stunden-Format",show_ampm:"AM/PM anzeigen",ampm_position:"AM/PM-Position",ampm_right:"Rechts (in einer Zeile)",ampm_superscript:"Hochgestellt",ampm_subscript:"Tiefgestellt",ampm_below:"Unter der Uhr",leading_zero:"Führende Null bei Stunden",blink_separator:'":"-Trennzeichen blinken',seconds_style:"Sekunden-Stil",seconds_inline:"Gleiche Größe (inline)",seconds_superscript:"Klein (hochgestellt)",seconds_subscript:"Klein (tiefgestellt)",timezone:"Zeitzone (optional)",timezone_helper:"Leer lassen für Systemzeitzone (z. B. Europe/Berlin)",language:"Sprache",language_auto:"Automatisch (Home Assistant)",show_date:"Datum anzeigen",date_position:"Position des Datums",position_top:"Oben (über der Uhr)",position_bottom:"Unten (unter der Uhr)",date_format_type:"Datumsformat",date_format_short:"Kurzes Datum",date_format_long:"Langes Datum",date_format_both:"Wochentag + Kurzes Datum",short_date_order:"Reihenfolge kurzes Datum",order_dmy:"TT/MM/JJJJ",order_mdy:"MM/TT/JJJJ",order_ymd:"JJJJ/MM/TT",short_date_separator:"Datumstrennzeichen",short_year_2_digits:"2-stelliges Jahr",long_weekday_format:"Wochentag",weekday_long:"Vollständig (Montag)",weekday_short:"Kurz (Mo)",weekday_none:"Ausgeblendet",long_month_format:"Monatsname",month_long:"Vollständig",month_short:"Abgekürzt",long_show_year:"Jahr anzeigen",capitalize_date:"Erster Buchstabe groß",show_entities:"Entitäten anzeigen",entities_position:"Position der Entitäten",entity_slot:"Entität",entity:"Entität",attribute:"Attribut (optional)",attribute_helper:"Leer lassen, um den Hauptzustand anzuzeigen",custom_name:"Eigener Name (optional)",custom_icon:"Eigenes Symbol (optional)",entity_slot_icon_color:"Symbolfarbe (optional)",custom_unit:"Eigene Einheit (optional)",show_icon:"Symbol anzeigen",show_name:"Name anzeigen",show_unit:"Einheit anzeigen",card_padding:"Innenabstand der Karte",card_min_height:"Mindesthöhe der Karte",card_min_height_helper:"0 = automatische Höhe",clock_font_size:"Schriftgröße Uhrzeit",seconds_font_size:"Größe Sekunden / AM-PM",date_font_size:"Schriftgröße Datum",entity_font_size:"Schriftgröße Entitäten",content_gap:"Abstand zwischen Elementen",text_align:"Ausrichtung",align_left:"Links",align_center:"Zentriert",align_right:"Rechts",font_weight:"Schriftstärke",font_family:"Schriftart",font_inherit:"Theme-Standard",font_sans:"Sans-Serif",font_serif:"Serif",font_mono:"Monospace",font_digital:"Digital / Tabellarisch",font_rounded:"Abgerundet",clock_color:"Textfarbe Uhrzeit",date_color:"Textfarbe Datum",entity_color:"Textfarbe Entitäten",entity_icon_color:"Symbolfarbe Entitäten",background_color:"Hintergrundfarbe der Karte",background_opacity:"Hintergrund-Deckkraft",backdrop_blur:"Hintergrund-Unschärfe (Glas)",border_radius:"Eckenradius",hide_border:"Kartenrahmen ausblenden",hide_shadow:"Kartenschatten ausblenden",reset_default:"Zurücksetzen",tap_action:"Aktion beim Tippen",double_tap_action:"Aktion beim Doppeltippen",hold_action:"Aktion beim Gedrückthalten",action_none:"Keine Aktion",action_more_info:"Weitere Informationen",action_toggle:"Umschalten",action_navigate:"Navigieren",action_url:"URL öffnen",action_perform_action:"Aktion ausführen",action_assist:"Assist"},fr:{card_name:"Simple Clock Card",card_description:"Carte horloge, date et entités d’état hautement personnalisable via l’éditeur visuel.",unavailable:"Indisponible",section_clock:"Horloge",section_date_language:"Date et Langue",section_entities:"Entités d’état (3)",section_sizing_typography:"Taille et Typographie",section_colors_transparency:"Couleurs et Transparence",section_interactions:"Interactions",time_mode:"Affichage de l’heure",time_mode_h:"Heures uniquement (HH)",time_mode_hm:"Heures et minutes (HH:MM)",time_mode_hms:"Heures, minutes et secondes (HH:MM:SS)",use_24h:"Format 24 heures",show_ampm:"Afficher AM/PM",ampm_position:"Position de AM/PM",ampm_right:"Droite (en ligne)",ampm_superscript:"Exposant",ampm_subscript:"Indice",ampm_below:"Sous l’horloge",leading_zero:"Zéro initial sur les heures",blink_separator:'Clignotement du séparateur ":"',seconds_style:"Style des secondes",seconds_inline:"Même taille (en ligne)",seconds_superscript:"Petites (exposant)",seconds_subscript:"Petites (indice)",timezone:"Fuseau horaire (optionnel)",timezone_helper:"Laisser vide pour le fuseau système (ex. Europe/Paris)",language:"Langue",language_auto:"Automatique (Home Assistant)",show_date:"Afficher la date",date_position:"Position de la date",position_top:"Haut (au-dessus de l’horloge)",position_bottom:"Bas (sous l’horloge)",date_format_type:"Format de date",date_format_short:"Date courte",date_format_long:"Date longue",date_format_both:"Jour de la semaine + Date courte",short_date_order:"Ordre de la date courte",order_dmy:"JJ/MM/AAAA",order_mdy:"MM/JJ/AAAA",order_ymd:"AAAA/MM/JJ",short_date_separator:"Séparateur de date",short_year_2_digits:"Année sur 2 chiffres",long_weekday_format:"Jour de la semaine",weekday_long:"Complet (lundi)",weekday_short:"Court (lun)",weekday_none:"Masqué",long_month_format:"Nom du mois",month_long:"Complet",month_short:"Abrégé",long_show_year:"Afficher l’année",capitalize_date:"Majuscule initiale",show_entities:"Afficher les entités",entities_position:"Position des entités",entity_slot:"Entité",entity:"Entité",attribute:"Attribut (optionnel)",attribute_helper:"Laisser vide pour afficher l’état principal",custom_name:"Nom personnalisé (optionnel)",custom_icon:"Icône personnalisée (optionnel)",entity_slot_icon_color:"Couleur de l’icône (optionnel)",custom_unit:"Unité personnalisée (optionnel)",show_icon:"Afficher l’icône",show_name:"Afficher le nom",show_unit:"Afficher l’unité",card_padding:"Marge intérieure de la carte",card_min_height:"Hauteur minimale de la carte",card_min_height_helper:"0 = hauteur automatique",clock_font_size:"Taille du texte de l’horloge",seconds_font_size:"Taille des secondes / AM-PM",date_font_size:"Taille du texte de la date",entity_font_size:"Taille des entités",content_gap:"Espacement entre les éléments",text_align:"Alignement",align_left:"Gauche",align_center:"Centre",align_right:"Droite",font_weight:"Épaisseur de police",font_family:"Style de police",font_inherit:"Thème par défaut",font_sans:"Sans-serif",font_serif:"Serif",font_mono:"Chasse fixe (Monospace)",font_digital:"Numérique / Tabulaire",font_rounded:"Arrondie",clock_color:"Couleur du texte de l’horloge",date_color:"Couleur du texte de la date",entity_color:"Couleur du texte des entités",entity_icon_color:"Couleur de l’icône des entités",background_color:"Couleur d’arrière-plan",background_opacity:"Opacité de l’arrière-plan",backdrop_blur:"Flou d’arrière-plan (verre)",border_radius:"Rayon des coins",hide_border:"Masquer la bordure",hide_shadow:"Masquer l’ombre",reset_default:"Réinitialiser",tap_action:"Action au toucher",double_tap_action:"Action au double toucher",hold_action:"Action à l’appui long",action_none:"Aucune action",action_more_info:"Plus d’informations",action_toggle:"Basculer",action_navigate:"Naviguer",action_url:"Ouvrir l’URL",action_perform_action:"Exécuter une action",action_assist:"Assist"},"zh-Hans":{card_name:"Simple Clock Card",card_description:"高度可定制的时钟、日期与状态实体卡片，支持全可视化编辑器与多语言。",unavailable:"不可用",section_clock:"时钟",section_date_language:"日期与语言",section_entities:"状态实体 (3)",section_sizing_typography:"尺寸与字体",section_colors_transparency:"颜色与透明度",section_interactions:"交互",time_mode:"时间显示模式",time_mode_h:"仅小时 (HH)",time_mode_hm:"小时和分钟 (HH:MM)",time_mode_hms:"小时、分钟和秒 (HH:MM:SS)",use_24h:"24 小时制",show_ampm:"显示 AM/PM",ampm_position:"AM/PM 位置",ampm_right:"右侧（同行）",ampm_superscript:"上标",ampm_subscript:"下标",ampm_below:"时钟下方",leading_zero:"小时补零",blink_separator:'冒号 ":" 闪烁',seconds_style:"秒数样式",seconds_inline:"同字号（同行）",seconds_superscript:"小字号（上标）",seconds_subscript:"小字号（下标）",timezone:"时区（可选）",timezone_helper:"留空则使用系统时区（例如 Asia/Shanghai）",language:"语言",language_auto:"自动（跟随 Home Assistant）",show_date:"显示日期",date_position:"日期位置",position_top:"顶部（时钟上方）",position_bottom:"底部（时钟下方）",date_format_type:"日期类型",date_format_short:"短日期",date_format_long:"长日期",date_format_both:"星期 + 短日期",short_date_order:"短日期顺序",order_dmy:"日/月/年 (DD/MM/YYYY)",order_mdy:"月/日/年 (MM/DD/YYYY)",order_ymd:"年/月/日 (YYYY/MM/DD)",short_date_separator:"日期分隔符",short_year_2_digits:"两位年份",long_weekday_format:"星期显示",weekday_long:"完整（星期一）",weekday_short:"简短（周一）",weekday_none:"隐藏",long_month_format:"月份格式",month_long:"完整",month_short:"简短",long_show_year:"显示年份",capitalize_date:"首字母大写",show_entities:"显示状态实体",entities_position:"实体位置",entity_slot:"实体",entity:"实体",attribute:"属性（可选）",attribute_helper:"留空则显示实体的主状态",custom_name:"自定义名称（可选）",custom_icon:"自定义图标（可选）",entity_slot_icon_color:"图标颜色（可选）",custom_unit:"自定义单位（可选）",show_icon:"显示图标",show_name:"显示名称",show_unit:"显示单位",card_padding:"卡片内边距",card_min_height:"卡片最小高度",card_min_height_helper:"0 = 自动高度",clock_font_size:"时钟文字大小",seconds_font_size:"秒数 / AM-PM 大小",date_font_size:"日期文字大小",entity_font_size:"实体文字大小",content_gap:"元素间距",text_align:"对齐方式",align_left:"左对齐",align_center:"居中",align_right:"右对齐",font_weight:"字体粗细",font_family:"字体样式",font_inherit:"主题默认",font_sans:"无衬线 (Sans-serif)",font_serif:"衬线 (Serif)",font_mono:"等宽 (Monospace)",font_digital:"数字 / 等宽数字",font_rounded:"圆体",clock_color:"时钟文字颜色",date_color:"日期文字颜色",entity_color:"实体文字颜色",entity_icon_color:"实体图标颜色",background_color:"卡片背景颜色",background_opacity:"背景不透明度",backdrop_blur:"背景模糊（毛玻璃）",border_radius:"圆角半径",hide_border:"隐藏卡片边框",hide_shadow:"隐藏卡片阴影",reset_default:"恢复默认",tap_action:"点击操作",double_tap_action:"双击操作",hold_action:"长按操作",action_none:"无操作",action_more_info:"更多信息",action_toggle:"切换",action_navigate:"导航",action_url:"打开网址",action_perform_action:"执行操作",action_assist:"语音助手"}},ke=[{value:"en",nativeLabel:"English (en)"},{value:"es",nativeLabel:"Español (es)"},{value:"it",nativeLabel:"Italiano (it)"},{value:"pt",nativeLabel:"Português (pt)"},{value:"pt-BR",nativeLabel:"Português do Brasil (pt-BR)"},{value:"ru",nativeLabel:"Русский (ru)"},{value:"de",nativeLabel:"Deutsch (de)"},{value:"fr",nativeLabel:"Français (fr)"},{value:"zh-Hans",nativeLabel:"简体中文 (zh-Hans)"}];function ze(e,t){if(e&&"auto"!==e)return Me(e);const o="undefined"!=typeof navigator&&navigator.language?navigator.language:void 0;return Me(t||o||"en")}function Me(e){const t=e.trim().replace(/_/g,"-").toLowerCase();if(!t)return"en";if("pt-br"===t||t.startsWith("pt-br-"))return"pt-BR";if("zh-hans"===t||t.startsWith("zh-hans-")||"zh-cn"===t||"zh-sg"===t||"zh"===t)return"zh-Hans";const o=t.split("-")[0];switch(o){case"en":case"es":case"it":case"pt":case"ru":case"de":case"fr":return o;default:return"en"}}function xe(e,t){return Ae[t]?.[e]??Ae.en[e]??String(e)}const Ee={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};function Ce(e,t){const o=t?.trim()||void 0;if(o)try{const t=new Intl.DateTimeFormat("en-US",{timeZone:o,year:"numeric",month:"numeric",day:"numeric",weekday:"short",hour:"numeric",minute:"numeric",second:"numeric",hourCycle:"h23"}).formatToParts(e),i=e=>{const o=t.find(t=>t.type===e)?.value;return o?Number.parseInt(o,10):0},n=t.find(e=>"weekday"===e.type)?.value??"Sun",a=i("hour");return{year:i("year"),month:i("month"),day:i("day"),weekdayIndex:Ee[n]??e.getDay(),hour24:24===a?0:a,minute:i("minute"),second:i("second")}}catch{}return{year:e.getFullYear(),month:e.getMonth()+1,day:e.getDate(),weekdayIndex:e.getDay(),hour24:e.getHours(),minute:e.getMinutes(),second:e.getSeconds()}}function Pe(e,t){const o=String(e.day).padStart(2,"0"),i=String(e.month).padStart(2,"0"),n=t.short_year_2_digits?String(e.year).slice(-2).padStart(2,"0"):String(e.year),a=t.short_date_separator??we.short_date_separator;switch(t.short_date_order??we.short_date_order){case"MDY":return`${i}${a}${o}${a}${n}`;case"YMD":return`${n}${a}${i}${a}${o}`;default:return`${o}${a}${i}${a}${n}`}}function Te(e,t,o){if("none"===t)return"";const i=Se[o]??Se.en;return"short"===t?i.weekdaysShort[e]:i.weekdaysLong[e]}function De(e){return e?e.charAt(0).toUpperCase()+e.slice(1):e}function He(e,t,o,i){const n=Ce(e,t.timezone||i),a=t.date_format_type??we.date_format_type;if("short"===a)return Pe(n,t);if("both"===a){const e=t.long_weekday_format??we.long_weekday_format,i=Te(n.weekdayIndex,e,o),a=Pe(n,t);if(!i)return a;const s="zh-Hans"===o?`${a} ${i}`:`${i}, ${a}`;return t.capitalize_date??we.capitalize_date?De(s):s}return function(e,t,o){const i=Se[o]??Se.en,n=t.long_weekday_format??we.long_weekday_format,a=t.long_month_format??we.long_month_format,s=t.long_show_year??we.long_show_year,r=t.capitalize_date??we.capitalize_date,l=Te(e.weekdayIndex,n,o),d=Math.max(0,Math.min(11,e.month-1)),c="short"===a?i.monthsShort[d]:i.monthsLong[d],_=e.day,h=e.year;let u="";switch(o){case"es":if("long"===a){const e=s?`${_} de ${c} de ${h}`:`${_} de ${c}`;u=l?`${l}, ${e}`:e}else{const e=s?`${_} ${c} ${h}`:`${_} ${c}`;u=l?`${l}, ${e}`:e}break;case"pt":case"pt-BR":if("long"===a){const e=s?`${_} de ${c} de ${h}`:`${_} de ${c}`;u=l?`${l}, ${e}`:e}else{const e=s?`${_} ${c} ${h}`:`${_} ${c}`;u=l?`${l}, ${e}`:e}break;case"it":{const e=s?`${_} ${c} ${h}`:`${_} ${c}`;u=l?`${l} ${e}`:e;break}case"fr":{const e=1===_?"1er":String(_),t=s?`${e} ${c} ${h}`:`${e} ${c}`;u=l?`${l} ${t}`:t;break}case"de":{const e=s?`${_}. ${c} ${h}`:`${_}. ${c}`;u=l?`${l}, ${e}`:e;break}case"ru":{const e="short"===a?i.monthsShort[d]:i.monthsLong[d],t="long"===a?`${h} г.`:String(h),o=s?`${_} ${e} ${t}`:`${_} ${e}`;u=l?`${l}, ${o}`:o;break}case"zh-Hans":{const t=s?`${h}年${e.month}月${_}日`:`${e.month}月${_}日`;u=l?`${t} ${l}`:t;break}default:{let e="";e="DMY"===(t.short_date_order??we.short_date_order)?s?`${_} ${c} ${h}`:`${_} ${c}`:s?`${c} ${_}, ${h}`:`${c} ${_}`,u=l?`${l}, ${e}`:e;break}}return r?De(u):u}(n,t,o)}function Fe(e){if(null==e)return null;if(Array.isArray(e)){if(e.length>=3){return[Ne(Number(e[0])),Ne(Number(e[1])),Ne(Number(e[2]))]}return null}if("string"==typeof e){const t=e.trim();if(!t)return null;const o=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(o){const e=o[1];return 3===e.length?[parseInt(e[0]+e[0],16),parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16)]:[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}const i=/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(t);if(i)return[Ne(Number(i[1])),Ne(Number(i[2])),Ne(Number(i[3]))]}return null}function Ne(e){return Number.isFinite(e)?Math.max(0,Math.min(255,Math.round(e))):0}function Le(e){if(null==e)return;const t=Fe(e);return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:"string"==typeof e&&e.trim()?e.trim():void 0}function Oe(e,t,o){const i=t?.entity?.trim();if(!i)return null;const n=e?.states?.[i],a=t?.show_icon??!0,s=t?.show_name??!1,r=t?.show_unit??!0,l=xe("unavailable",o);if(!n)return{entityId:i,stateObj:void 0,icon:a?t?.icon?.trim()||"mdi:help-circle-outline":"",name:s?t?.name?.trim()||i:"",value:l,unit:"",available:!1};const d="string"==typeof n.attributes?.friendly_name?n.attributes.friendly_name:i,c=s?t?.name?.trim()||d:"",_=a?t?.icon?.trim()||function(e,t){const o=t?.attributes?.icon;if("string"==typeof o&&o.trim())return o.trim();const i=e.split(".")[0];switch(String(t?.attributes?.device_class??"").toLowerCase()){case"temperature":return"mdi:thermometer";case"humidity":return"mdi:water-percent";case"battery":return"mdi:battery";case"power":return"mdi:flash";case"energy":return"mdi:lightning-bolt";case"pressure":return"mdi:gauge";case"illuminance":return"mdi:brightness-6";case"moisture":return"mdi:water";case"wind_speed":return"mdi:weather-windy"}switch(i){case"weather":return"mdi:weather-partly-cloudy";case"sun":return"mdi:white-balance-sunny";case"person":case"device_tracker":return"mdi:account";case"climate":return"mdi:thermostat";case"light":return"mdi:lightbulb";case"switch":return"mdi:toggle-switch";case"lock":return"mdi:lock";case"alarm_control_panel":return"mdi:shield-home";case"binary_sensor":return"mdi:radiobox-marked";case"calendar":return"mdi:calendar";default:return"mdi:eye"}}(i,n):"",h=t?.attribute?.trim();if(h){const o=n.attributes?.[h];if(null==o)return{entityId:i,stateObj:n,icon:_,name:c,value:l,unit:"",available:!1};let a;a=Array.isArray(o)?o.join(", "):"object"==typeof o?JSON.stringify(o):String(o);let s="";return r&&(void 0!==t?.unit&&""!==t.unit.trim()?s=t.unit.trim():"number"!=typeof o&&Number.isNaN(Number(o))||(s=function(e,t,o){const i=t.attributes??{};switch(e){case"temperature":case"apparent_temperature":case"dew_point":case"current_temperature":return"string"==typeof i.temperature_unit&&i.temperature_unit||o?.config?.unit_system?.temperature||"";case"humidity":case"current_humidity":case"battery":case"battery_level":case"cloud_coverage":return"%";case"wind_speed":case"wind_gust_speed":return"string"==typeof i.wind_speed_unit&&i.wind_speed_unit||o?.config?.unit_system?.wind_speed||"";case"pressure":return"string"==typeof i.pressure_unit&&i.pressure_unit||o?.config?.unit_system?.pressure||"";case"visibility":return"string"==typeof i.visibility_unit&&i.visibility_unit||"";default:return""}}(h,n,e))),{entityId:i,stateObj:n,icon:_,name:c,value:a,unit:s,available:!0}}const u=n.state;if("unavailable"===u||"unknown"===u)return{entityId:i,stateObj:n,icon:_,name:c,value:"unavailable"===u?l:u,unit:"",available:!1};const p=t?.unit?.trim();if(r&&!p&&"function"==typeof e?.formatEntityState)return{entityId:i,stateObj:n,icon:_,name:c,value:e.formatEntityState(n),unit:"",available:!0};const m="string"==typeof n.attributes?.unit_of_measurement?n.attributes.unit_of_measurement:"";return{entityId:i,stateObj:n,icon:_,name:c,value:u,unit:r?p||m:"",available:!0}}function je(e){return Boolean(e&&e.action&&"none"!==e.action)}function Ie(e){return je(e.tap_action)||je(e.double_tap_action)||je(e.hold_action)}class Ue{constructor(){this._states=new Map}_getOrCreateState(e){let t=this._states.get(e);return t||(t={startX:0,startY:0,held:!1,moved:!1,active:!1},this._states.set(e,t)),t}_clearHoldTimer(e){void 0!==e.holdTimer&&(window.clearTimeout(e.holdTimer),e.holdTimer=void 0)}_clearTapTimer(e){void 0!==e.tapTimer&&(window.clearTimeout(e.tapTimer),e.tapTimer=void 0)}handlePointerDown(e,t,o,i){if("mouse"===e.pointerType&&0!==e.button)return;const n=this._getOrCreateState(t);this._clearHoldTimer(n),n.pointerId=e.pointerId,n.startX=e.clientX,n.startY=e.clientY,n.held=!1,n.moved=!1,n.active=!0,n.lastPointerType=e.pointerType,je(o.hold_action)&&(n.holdTimer=window.setTimeout(()=>{n.holdTimer=void 0,n.active&&!n.moved&&(n.held=!0,i("hold"))},500))}handlePointerMove(e,t){const o=this._states.get(t);if(!o||!o.active||o.moved)return;if(void 0!==o.pointerId&&e.pointerId!==o.pointerId)return;Math.hypot(e.clientX-o.startX,e.clientY-o.startY)>10&&(o.moved=!0,this._clearHoldTimer(o))}handlePointerUp(e,t,o,i){const n=this._states.get(t);if(n&&n.active&&(void 0===n.pointerId||e.pointerId===n.pointerId)){if(this._clearHoldTimer(n),n.active=!1,n.held||n.moved)return this._clearTapTimer(n),void(n.moved=!1);je(o.double_tap_action)?void 0!==n.tapTimer?(this._clearTapTimer(n),i("double_tap")):n.tapTimer=window.setTimeout(()=>{n.tapTimer=void 0,je(o.tap_action)&&i("tap")},250):(this._clearTapTimer(n),je(o.tap_action)&&i("tap"))}}handlePointerCancel(e){const t=this._states.get(e);t&&(this._clearHoldTimer(t),this._clearTapTimer(t),t.active=!1,t.held=!1,t.moved=!1)}handleContextMenu(e,t,o){if(!je(o.hold_action))return;const i=this._states.get(t);(i?.held||"touch"===i?.lastPointerType||"pen"===i?.lastPointerType)&&e.preventDefault()}destroy(){for(const e of this._states.values())this._clearHoldTimer(e),this._clearTapTimer(e);this._states.clear()}}let Re=class extends re{constructor(){super(...arguments),this._config={...we},this._helpersLoaded=!1}setConfig(e){this._config={...we,...e}}connectedCallback(){super.connectedCallback(),this._ensureHaComponents()}async _ensureHaComponents(){if(customElements.get("ha-selector")&&customElements.get("ha-expansion-panel"))this._helpersLoaded=!0;else try{const e=window,t=await(e.loadCardHelpers?.());if(t){const e=await t.createCardElement({type:"entities",entities:[]});await(e?.constructor?.getConfigElement?.())}}catch{}finally{this._helpersLoaded=!0,this.requestUpdate()}}get _editorLang(){return ze("auto",this.hass?.locale?.language||this.hass?.language)}_t(e){return xe(e,this._editorLang)}_emitConfig(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_updateField(e,t){const o={...this._config};void 0===t||""===t?delete o[e]:o[e]=t,this._emitConfig(o)}_updateEntitySlot(e,t,o){const i={...this._config[e]??{}},n={...i};if("entity"===t){const e="string"==typeof o?o.trim():"";e?(i.entity!==e&&delete n.attribute,n.entity=e):(delete n.entity,delete n.attribute)}else void 0===o||""===o?delete n[t]:n[t]=o;const a={...this._config};0===Object.keys(n).length?delete a[e]:a[e]=n,this._emitConfig(a)}_renderSelector(e,t,o,i,n){return customElements.get("ha-selector")?B`
        <div class="field-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${t}
            .value=${o}
            .label=${e}
            .helper=${n}
            @value-changed=${e=>{e.stopPropagation(),i(e.detail.value)}}
          ></ha-selector>
        </div>
      `:this._renderFallbackInput(e,t,o,i,n)}_renderFallbackInput(e,t,o,i,n){if("boolean"in t)return B`
        <label class="fallback-switch">
          <span>${e}</span>
          <input
            type="checkbox"
            .checked=${Boolean(o)}
            @change=${e=>i(e.target.checked)}
          />
        </label>
      `;if("select"in t){const n=t.select;return B`
        <label class="fallback-field">
          <span>${e}</span>
          <select
            .value=${String(o??"")}
            @change=${e=>i(e.target.value)}
          >
            ${n.options.map(e=>B`<option value=${e.value} ?selected=${o===e.value}>
                  ${e.label}
                </option>`)}
          </select>
        </label>
      `}if("number"in t){const a=t.number;return B`
        <label class="fallback-field">
          <span>
            ${e}: <strong>${o??a.min??0}${a.unit_of_measurement??""}</strong>
          </span>
          <input
            type="range"
            min=${a.min??0}
            max=${a.max??100}
            step=${a.step??1}
            .value=${String(o??a.min??0)}
            @input=${e=>i(Number(e.target.value))}
          />
          ${n?B`<small class="helper">${n}</small>`:J}
        </label>
      `}if("color_rgb"in t){const t=Fe(o),n=t?`#${t.map(e=>e.toString(16).padStart(2,"0")).join("")}`:"#000000";return B`
        <label class="fallback-field">
          <span>${e}</span>
          <input
            type="color"
            .value=${n}
            @input=${e=>{const t=Fe(e.target.value);i(t??void 0)}}
          />
        </label>
      `}if("ui_action"in t){const n=t.ui_action,a=o?.action??n.default_action??"none",s=[{value:"none",label:this._t("action_none")},{value:"more-info",label:this._t("action_more_info")},{value:"toggle",label:this._t("action_toggle")},{value:"navigate",label:this._t("action_navigate")},{value:"url",label:this._t("action_url")},{value:"perform-action",label:this._t("action_perform_action")},{value:"assist",label:this._t("action_assist")}];return B`
        <label class="fallback-field">
          <span>${e}</span>
          <select
            .value=${a}
            @change=${e=>{const t=e.target.value;i(t===n.default_action?void 0:{action:t})}}
          >
            ${s.map(e=>B`<option value=${e.value} ?selected=${a===e.value}>
                  ${e.label}
                </option>`)}
          </select>
        </label>
      `}return B`
      <label class="fallback-field">
        <span>${e}</span>
        <input
          type="text"
          .value=${String(o??"")}
          @change=${e=>i(e.target.value)}
        />
        ${n?B`<small class="helper">${n}</small>`:J}
      </label>
    `}_renderColorPicker(e,t,o){const i=Fe(t)??void 0,n=void 0!==t&&""!==t;return B`
      <div class="color-row">
        <div class="color-selector">
          ${this._renderSelector(e,{color_rgb:{}},i,e=>{o(e)})}
        </div>
        ${n?B`
              <button
                type="button"
                class="reset-btn"
                title=${this._t("reset_default")}
                @click=${()=>o(void 0)}
              >
                ↺
              </button>
            `:J}
      </div>
    `}_renderColorField(e,t){return this._renderColorPicker(t,this._config[e],t=>this._updateField(e,t))}_renderActionSelector(e,t,o,i){return this._renderSelector(e,{ui_action:{default_action:o}},t,e=>i(e??void 0))}_renderPanel(e,t,o=!1){return customElements.get("ha-expansion-panel")?B`
        <ha-expansion-panel outlined .expanded=${o}>
          <span slot="header" class="panel-header">${e}</span>
          <div class="panel-content">${t}</div>
        </ha-expansion-panel>
      `:B`
      <details class="fallback-panel" ?open=${o}>
        <summary class="panel-header">${e}</summary>
        <div class="panel-content">${t}</div>
      </details>
    `}_renderClockSection(){const e=this._config.time_mode??we.time_mode,t=this._config.use_24h??we.use_24h,o=this._config.show_ampm??we.show_ampm;return this._renderPanel(this._t("section_clock"),B`
        ${this._renderSelector(this._t("time_mode"),{select:{mode:"dropdown",options:[{value:"h",label:this._t("time_mode_h")},{value:"hm",label:this._t("time_mode_hm")},{value:"hms",label:this._t("time_mode_hms")}]}},e,e=>this._updateField("time_mode",e))}

        <div class="two-col">
          ${this._renderSelector(this._t("use_24h"),{boolean:{}},t,e=>this._updateField("use_24h",Boolean(e)))}
          ${this._renderSelector(this._t("leading_zero"),{boolean:{}},this._config.leading_zero??we.leading_zero,e=>this._updateField("leading_zero",Boolean(e)))}
        </div>

        ${t?J:B`
              <div class="two-col">
                ${this._renderSelector(this._t("show_ampm"),{boolean:{}},o,e=>this._updateField("show_ampm",Boolean(e)))}
                ${o?this._renderSelector(this._t("ampm_position"),{select:{mode:"dropdown",options:[{value:"right",label:this._t("ampm_right")},{value:"superscript",label:this._t("ampm_superscript")},{value:"subscript",label:this._t("ampm_subscript")},{value:"below",label:this._t("ampm_below")}]}},this._config.ampm_position??we.ampm_position,e=>this._updateField("ampm_position",e)):J}
              </div>
            `}

        ${"h"!==e?this._renderSelector(this._t("blink_separator"),{boolean:{}},this._config.blink_separator??we.blink_separator,e=>this._updateField("blink_separator",Boolean(e))):J}

        ${"hms"===e?this._renderSelector(this._t("seconds_style"),{select:{mode:"dropdown",options:[{value:"inline",label:this._t("seconds_inline")},{value:"superscript",label:this._t("seconds_superscript")},{value:"subscript",label:this._t("seconds_subscript")}]}},this._config.seconds_style??we.seconds_style,e=>this._updateField("seconds_style",e)):J}

        ${this._renderSelector(this._t("timezone"),{text:{}},this._config.timezone??"",e=>this._updateField("timezone",e||void 0),this._t("timezone_helper"))}
      `,!0)}_renderDateLanguageSection(){const e=this._config.show_date??we.show_date,t=this._config.date_format_type??we.date_format_type,o=[{value:"auto",label:this._t("language_auto")},...ke.map(e=>({value:e.value,label:e.nativeLabel}))];return this._renderPanel(this._t("section_date_language"),B`
        ${this._renderSelector(this._t("language"),{select:{mode:"dropdown",options:o}},this._config.language??we.language,e=>this._updateField("language",e))}

        ${this._renderSelector(this._t("show_date"),{boolean:{}},e,e=>this._updateField("show_date",Boolean(e)))}

        ${e?B`
              <div class="two-col">
                ${this._renderSelector(this._t("date_position"),{select:{mode:"dropdown",options:[{value:"top",label:this._t("position_top")},{value:"bottom",label:this._t("position_bottom")}]}},this._config.date_position??we.date_position,e=>this._updateField("date_position",e))}

                ${this._renderSelector(this._t("date_format_type"),{select:{mode:"dropdown",options:[{value:"short",label:this._t("date_format_short")},{value:"long",label:this._t("date_format_long")},{value:"both",label:this._t("date_format_both")}]}},t,e=>this._updateField("date_format_type",e))}
              </div>

              ${"short"===t||"both"===t?B`
                    <div class="two-col">
                      ${this._renderSelector(this._t("short_date_order"),{select:{mode:"dropdown",options:[{value:"DMY",label:this._t("order_dmy")},{value:"MDY",label:this._t("order_mdy")},{value:"YMD",label:this._t("order_ymd")}]}},this._config.short_date_order??we.short_date_order,e=>this._updateField("short_date_order",e))}

                      ${this._renderSelector(this._t("short_date_separator"),{select:{mode:"dropdown",options:[{value:"/",label:"/"},{value:"-",label:"-"},{value:".",label:"."}]}},this._config.short_date_separator??we.short_date_separator,e=>this._updateField("short_date_separator",e))}
                    </div>

                    ${this._renderSelector(this._t("short_year_2_digits"),{boolean:{}},this._config.short_year_2_digits??we.short_year_2_digits,e=>this._updateField("short_year_2_digits",Boolean(e)))}
                  `:J}

              ${"long"===t||"both"===t?B`
                    <div class="two-col">
                      ${this._renderSelector(this._t("long_weekday_format"),{select:{mode:"dropdown",options:[{value:"long",label:this._t("weekday_long")},{value:"short",label:this._t("weekday_short")},{value:"none",label:this._t("weekday_none")}]}},this._config.long_weekday_format??we.long_weekday_format,e=>this._updateField("long_weekday_format",e))}

                      ${"long"===t?this._renderSelector(this._t("long_month_format"),{select:{mode:"dropdown",options:[{value:"long",label:this._t("month_long")},{value:"short",label:this._t("month_short")}]}},this._config.long_month_format??we.long_month_format,e=>this._updateField("long_month_format",e)):J}
                    </div>
                  `:J}

              ${"long"===t?B`
                    <div class="two-col">
                      ${this._renderSelector(this._t("long_show_year"),{boolean:{}},this._config.long_show_year??we.long_show_year,e=>this._updateField("long_show_year",Boolean(e)))}
                      ${this._renderSelector(this._t("capitalize_date"),{boolean:{}},this._config.capitalize_date??we.capitalize_date,e=>this._updateField("capitalize_date",Boolean(e)))}
                    </div>
                  `:"both"===t?this._renderSelector(this._t("capitalize_date"),{boolean:{}},this._config.capitalize_date??we.capitalize_date,e=>this._updateField("capitalize_date",Boolean(e))):J}
            `:J}
      `)}_renderEntitySlot(e,t){const o=this._config[e]??{},i=o.entity?` (${o.entity})`:"",n=`${this._t("entity_slot")} ${t}${i}`;return this._renderPanel(n,B`
        ${this._renderSelector(this._t("entity"),{entity:{}},o.entity??"",t=>this._updateEntitySlot(e,"entity",t))}

        ${o.entity?B`
              ${this._renderSelector(this._t("attribute"),{attribute:{entity_id:o.entity}},o.attribute??"",t=>this._updateEntitySlot(e,"attribute",t),this._t("attribute_helper"))}

              <div class="two-col">
                ${this._renderSelector(this._t("custom_name"),{text:{}},o.name??"",t=>this._updateEntitySlot(e,"name",t))}
                ${this._renderSelector(this._t("custom_unit"),{text:{}},o.unit??"",t=>this._updateEntitySlot(e,"unit",t))}
              </div>

              ${this._renderSelector(this._t("custom_icon"),{icon:{}},o.icon??"",t=>this._updateEntitySlot(e,"icon",t))}

              ${this._renderColorPicker(this._t("entity_slot_icon_color"),o.icon_color,t=>this._updateEntitySlot(e,"icon_color",t))}

              <div class="three-col">
                ${this._renderSelector(this._t("show_icon"),{boolean:{}},o.show_icon??ye,t=>this._updateEntitySlot(e,"show_icon",Boolean(t)))}
                ${this._renderSelector(this._t("show_name"),{boolean:{}},o.show_name??$e,t=>this._updateEntitySlot(e,"show_name",Boolean(t)))}
                ${this._renderSelector(this._t("show_unit"),{boolean:{}},o.show_unit??ve,t=>this._updateEntitySlot(e,"show_unit",Boolean(t)))}
              </div>

              ${this._renderActionSelector(this._t("tap_action"),o.tap_action,"more-info",t=>this._updateEntitySlot(e,"tap_action",t))}
              ${this._renderActionSelector(this._t("double_tap_action"),o.double_tap_action,"none",t=>this._updateEntitySlot(e,"double_tap_action",t))}
              ${this._renderActionSelector(this._t("hold_action"),o.hold_action,"none",t=>this._updateEntitySlot(e,"hold_action",t))}
            `:J}
      `)}_renderEntitiesSection(){const e=this._config.show_entities??we.show_entities;return this._renderPanel(this._t("section_entities"),B`
        ${this._renderSelector(this._t("show_entities"),{boolean:{}},e,e=>this._updateField("show_entities",Boolean(e)))}

        ${e?B`
              ${this._renderSelector(this._t("entities_position"),{select:{mode:"dropdown",options:[{value:"bottom",label:this._t("position_bottom")},{value:"top",label:this._t("position_top")}]}},this._config.entities_position??we.entities_position,e=>this._updateField("entities_position",e))}

              <div class="nested-panels">
                ${this._renderEntitySlot("entity_1",1)}
                ${this._renderEntitySlot("entity_2",2)}
                ${this._renderEntitySlot("entity_3",3)}
              </div>
            `:J}
      `)}_renderSizingTypographySection(){return this._renderPanel(this._t("section_sizing_typography"),B`
        ${this._renderSelector(this._t("clock_font_size"),{number:{min:16,max:160,step:1,mode:"slider",unit_of_measurement:"px"}},this._config.clock_font_size??we.clock_font_size,e=>this._updateField("clock_font_size",Number(e)))}

        ${this._renderSelector(this._t("seconds_font_size"),{number:{min:10,max:80,step:1,mode:"slider",unit_of_measurement:"px"}},this._config.seconds_font_size??we.seconds_font_size,e=>this._updateField("seconds_font_size",Number(e)))}

        ${this._renderSelector(this._t("date_font_size"),{number:{min:10,max:60,step:1,mode:"slider",unit_of_measurement:"px"}},this._config.date_font_size??we.date_font_size,e=>this._updateField("date_font_size",Number(e)))}

        ${this._renderSelector(this._t("entity_font_size"),{number:{min:10,max:40,step:1,mode:"slider",unit_of_measurement:"px"}},this._config.entity_font_size??we.entity_font_size,e=>this._updateField("entity_font_size",Number(e)))}

        ${this._renderSelector(this._t("card_padding"),{number:{min:0,max:64,step:1,mode:"slider",unit_of_measurement:"px"}},this._config.card_padding??we.card_padding,e=>this._updateField("card_padding",Number(e)))}

        ${this._renderSelector(this._t("card_min_height"),{number:{min:0,max:400,step:4,mode:"slider",unit_of_measurement:"px"}},this._config.card_min_height??we.card_min_height,e=>this._updateField("card_min_height",Number(e)),this._t("card_min_height_helper"))}

        ${this._renderSelector(this._t("content_gap"),{number:{min:0,max:48,step:1,mode:"slider",unit_of_measurement:"px"}},this._config.content_gap??we.content_gap,e=>this._updateField("content_gap",Number(e)))}

        <div class="two-col">
          ${this._renderSelector(this._t("text_align"),{select:{mode:"dropdown",options:[{value:"left",label:this._t("align_left")},{value:"center",label:this._t("align_center")},{value:"right",label:this._t("align_right")}]}},this._config.text_align??we.text_align,e=>this._updateField("text_align",e))}

          ${this._renderSelector(this._t("font_weight"),{select:{mode:"dropdown",options:[{value:"200",label:"200 (Extra Light)"},{value:"300",label:"300 (Light)"},{value:"400",label:"400 (Normal)"},{value:"500",label:"500 (Medium)"},{value:"600",label:"600 (Semi Bold)"},{value:"700",label:"700 (Bold)"},{value:"800",label:"800 (Extra Bold)"}]}},this._config.font_weight??we.font_weight,e=>this._updateField("font_weight",e))}
        </div>

        ${this._renderSelector(this._t("font_family"),{select:{mode:"dropdown",options:[{value:"inherit",label:this._t("font_inherit")},{value:"sans-serif",label:this._t("font_sans")},{value:"serif",label:this._t("font_serif")},{value:"monospace",label:this._t("font_mono")},{value:"digital",label:this._t("font_digital")},{value:"rounded",label:this._t("font_rounded")}]}},this._config.font_family??we.font_family,e=>this._updateField("font_family",e))}
      `)}_renderColorsTransparencySection(){const e=void 0!==this._config.border_radius;return this._renderPanel(this._t("section_colors_transparency"),B`
        ${this._renderColorField("clock_color",this._t("clock_color"))}
        ${this._renderColorField("date_color",this._t("date_color"))}
        ${this._renderColorField("entity_color",this._t("entity_color"))}
        ${this._renderColorField("entity_icon_color",this._t("entity_icon_color"))}
        ${this._renderColorField("background_color",this._t("background_color"))}

        ${this._renderSelector(this._t("background_opacity"),{number:{min:0,max:100,step:1,mode:"slider",unit_of_measurement:"%"}},this._config.background_opacity??we.background_opacity,e=>this._updateField("background_opacity",Number(e)))}

        ${this._renderSelector(this._t("backdrop_blur"),{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:"px"}},this._config.backdrop_blur??we.backdrop_blur,e=>this._updateField("backdrop_blur",Number(e)))}

        <div class="color-row">
          <div class="color-selector">
            ${this._renderSelector(this._t("border_radius"),{number:{min:0,max:48,step:1,mode:"slider",unit_of_measurement:"px"}},this._config.border_radius??12,e=>this._updateField("border_radius",Number(e)))}
          </div>
          ${e?B`
                <button
                  type="button"
                  class="reset-btn"
                  title=${this._t("reset_default")}
                  @click=${()=>this._updateField("border_radius",void 0)}
                >
                  ↺
                </button>
              `:J}
        </div>

        <div class="two-col">
          ${this._renderSelector(this._t("hide_border"),{boolean:{}},this._config.hide_border??we.hide_border,e=>this._updateField("hide_border",Boolean(e)))}
          ${this._renderSelector(this._t("hide_shadow"),{boolean:{}},this._config.hide_shadow??we.hide_shadow,e=>this._updateField("hide_shadow",Boolean(e)))}
        </div>
      `)}_renderInteractionsSection(){return this._renderPanel(this._t("section_interactions"),B`
        ${this._renderActionSelector(this._t("tap_action"),this._config.tap_action,"none",e=>this._updateField("tap_action",e))}
        ${this._renderActionSelector(this._t("double_tap_action"),this._config.double_tap_action,"none",e=>this._updateField("double_tap_action",e))}
        ${this._renderActionSelector(this._t("hold_action"),this._config.hold_action,"none",e=>this._updateField("hold_action",e))}
      `)}render(){return this._config?(this._helpersLoaded,B`
      <div class="editor-root">
        ${this._renderClockSection()}
        ${this._renderDateLanguageSection()}
        ${this._renderEntitiesSection()}
        ${this._renderSizingTypographySection()}
        ${this._renderColorsTransparencySection()}
        ${this._renderInteractionsSection()}
      </div>
    `):B`${J}`}};Re.styles=s`
    .editor-root {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 0;
    }

    ha-expansion-panel {
      display: block;
    }

    .panel-header {
      font-weight: 500;
      font-size: 14px;
      padding: 4px 0;
    }

    .panel-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 4px 8px;
    }

    .nested-panels {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .field-row {
      width: 100%;
    }

    ha-selector {
      width: 100%;
      display: block;
    }

    .two-col {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      align-items: center;
    }

    .three-col {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      align-items: center;
    }

    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-selector {
      flex: 1 1 auto;
      min-width: 0;
    }

    .reset-btn {
      flex: 0 0 auto;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      color: var(--primary-text-color, inherit);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      width: 34px;
      height: 34px;
      cursor: pointer;
      font-size: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .reset-btn:hover {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }

    .fallback-panel {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      padding: 8px 12px;
    }

    .fallback-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
    }

    .fallback-switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      gap: 8px;
    }

    .helper {
      color: var(--secondary-text-color, #666);
      font-size: 11px;
    }

    @media (max-width: 500px) {
      .two-col,
      .three-col {
        grid-template-columns: 1fr;
      }
    }
  `,e([he({attribute:!1})],Re.prototype,"hass",void 0),e([ue()],Re.prototype,"_config",void 0),e([ue()],Re.prototype,"_helpersLoaded",void 0),Re=e([de("simple-clock-card-editor")],Re);let Be=class extends re{constructor(){super(...arguments),this._config={...we},this._now=new Date,this._gestureController=new Ue}static async getConfigElement(){try{const e=window,t=await(e.loadCardHelpers?.());if(t&&!customElements.get("ha-selector")){const e=await t.createCardElement({type:"entities",entities:[]});await(e?.constructor?.getConfigElement?.())}}catch{}return document.createElement("simple-clock-card-editor")}static getStubConfig(){return{type:"custom:simple-clock-card",time_mode:"hm",use_24h:!0,show_date:!0,date_format_type:"long",language:"auto"}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...we,...e}}getCardSize(){const e=this._config.show_date??we.show_date,t=(this._config.show_entities??we.show_entities)&&Boolean(this._config.entity_1?.entity||this._config.entity_2?.entity||this._config.entity_3?.entity);return e&&t?3:2}getGridOptions(){return{columns:6,min_columns:2,rows:2,min_rows:1}}connectedCallback(){super.connectedCallback(),this._scheduleTick()}disconnectedCallback(){super.disconnectedCallback(),void 0!==this._tickTimeout&&(window.clearTimeout(this._tickTimeout),this._tickTimeout=void 0),this._gestureController.destroy()}_scheduleTick(){void 0!==this._tickTimeout&&window.clearTimeout(this._tickTimeout);const e=new Date;this._now=e;const t=1e3-e.getMilliseconds();this._tickTimeout=window.setTimeout(()=>{this._scheduleTick()},t)}_dispatchAction(e,t){je("tap"===t?e.tap_action:"double_tap"===t?e.double_tap_action:e.hold_action)&&this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:e,action:t},bubbles:!0,composed:!0}))}_isEventFromInteractiveEntity(e){const t=e.composedPath?.()??[];for(const e of t)if(e instanceof Element&&e.classList?.contains("entity-chip")&&e.classList?.contains("interactive"))return!0;const o=e.target;return Boolean(o?.closest?.(".entity-chip.interactive"))}_renderClock(){const e=function(e,t,o){const i=Ce(e,t.timezone||o),n=t.time_mode??we.time_mode,a=t.use_24h??we.use_24h,s=t.leading_zero??we.leading_zero,r=t.show_ampm??we.show_ampm,l=i.hour24>=12;let d=i.hour24,c="";return a||(d=i.hour24%12||12,c=l?"PM":"AM"),{hours:s?String(d).padStart(2,"0"):String(d),minutes:String(i.minute).padStart(2,"0"),seconds:String(i.second).padStart(2,"0"),ampm:c,showMinutes:"hm"===n||"hms"===n,showSeconds:"hms"===n,showAmPm:!a&&r}}(this._now,this._config,this.hass?.config?.time_zone),t=this._config.seconds_style??we.seconds_style,o=this._config.ampm_position??we.ampm_position,i=(this._config.blink_separator??we.blink_separator)&&this._now.getSeconds()%2==1,n=this._config.clock_font_size??we.clock_font_size,a=this._config.seconds_font_size??we.seconds_font_size,s=Le(this._config.clock_color),r=this._config.font_weight??we.font_weight,l=be({fontSize:`${n}px`,fontWeight:r,color:s??null}),d=be({fontSize:`${a}px`,fontWeight:r});return B`
      <div class="clock-wrapper" style=${l}>
        <div class="clock-main">
          <span class="clock-hours">${e.hours}</span>
          ${e.showMinutes?B`<span class="clock-separator ${i?"blink-dim":""}">:</span><span class="clock-minutes">${e.minutes}</span>`:J}
          ${e.showSeconds?"inline"===t?B`<span class="clock-separator ${i?"blink-dim":""}">:</span><span class="clock-seconds-inline">${e.seconds}</span>`:B`<span
                  class="clock-seconds-small clock-seconds-${t}"
                  style=${d}
                  >${e.seconds}</span
                >`:J}
          ${e.showAmPm&&"below"!==o?B`<span class="clock-ampm clock-ampm-${o}" style=${d}
                >${e.ampm}</span
              >`:J}
        </div>
        ${e.showAmPm&&"below"===o?B`<div class="clock-ampm-below" style=${d}>${e.ampm}</div>`:J}
      </div>
    `}_renderDate(){if(!(this._config.show_date??we.show_date))return J;const e=this.hass?.locale?.language||this.hass?.language,t=ze(this._config.language,e),o=He(this._now,this._config,t,this.hass?.config?.time_zone),i=be({fontSize:`${this._config.date_font_size??we.date_font_size}px`,color:Le(this._config.date_color)??null});return B`<div class="date-row" style=${i}>${o}</div>`}_renderEntityIcon(e,t){if(!t.icon)return J;const o=(i=e?.icon_color,n=this._config.entity_icon_color,Le(i)??Le(n));var i,n;const a=Math.max(14,Math.round(1.25*(this._config.entity_font_size??we.entity_font_size))),s=be({color:o??null,"--state-icon-color":o??null,"--paper-item-icon-color":o??null,"--mdc-icon-size":`${a}px`});return!e?.icon&&!e?.attribute&&t.stateObj&&customElements.get("ha-state-icon")?B`
        <ha-state-icon
          class="entity-icon"
          style=${s}
          .hass=${this.hass}
          .stateObj=${t.stateObj}
        ></ha-state-icon>
      `:B`
      <ha-icon
        class="entity-icon"
        style=${s}
        .icon=${t.icon}
      ></ha-icon>
    `}_renderEntities(){if(!(this._config.show_entities??we.show_entities))return J;const e=this.hass?.locale?.language||this.hass?.language,t=ze(this._config.language,e),o=[{key:"entity_1",slot:this._config.entity_1},{key:"entity_2",slot:this._config.entity_2},{key:"entity_3",slot:this._config.entity_3}].map(({key:e,slot:o})=>({key:e,slot:o,display:Oe(this.hass,o,t)})).filter(e=>null!==e.display);if(0===o.length)return J;const i=this._config.text_align??we.text_align,n="left"===i?"flex-start":"right"===i?"flex-end":"center",a=this._config.entity_font_size??we.entity_font_size,s=Le(this._config.entity_color),r=be({justifyContent:n,fontSize:`${a}px`,color:s??null});return B`
      <div class="entities-row" style=${r}>
        ${o.map(({key:e,slot:t,display:o})=>{const i=o.unit?`${o.value} ${o.unit}`:o.value,n=function(e,t){return{entity:t,tap_action:e?.tap_action??{action:"more-info"},double_tap_action:e?.double_tap_action??{action:"none"},hold_action:e?.hold_action??{action:"none"}}}(t,o.entityId),a=Ie(n);return B`
            <div
              class="entity-chip ${a?"interactive":""} ${o.available?"":"entity-unavailable"}"
              role=${a?"button":J}
              tabindex=${a?"0":J}
              @pointerdown=${t=>{a&&(t.stopPropagation(),this._gestureController.handlePointerDown(t,e,n,e=>this._dispatchAction(n,e)))}}
              @pointermove=${t=>{a&&(t.stopPropagation(),this._gestureController.handlePointerMove(t,e))}}
              @pointerup=${t=>{a&&(t.stopPropagation(),this._gestureController.handlePointerUp(t,e,n,e=>this._dispatchAction(n,e)))}}
              @pointercancel=${t=>{a&&(t.stopPropagation(),this._gestureController.handlePointerCancel(e))}}
              @contextmenu=${t=>{a&&(t.stopPropagation(),this._gestureController.handleContextMenu(t,e,n))}}
              @keydown=${e=>{a&&("Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),this._dispatchAction(n,"tap")))}}
            >
              ${this._renderEntityIcon(t,o)}
              ${o.name?B`<span class="entity-name">${o.name}:</span>`:J}
              <span class="entity-value">${i}</span>
            </div>
          `})}
      </div>
    `}render(){const e=this._config.card_padding??we.card_padding,t=this._config.card_min_height??we.card_min_height,o=this._config.content_gap??we.content_gap,i=this._config.text_align??we.text_align,n="left"===i?"flex-start":"right"===i?"flex-end":"center",a=function(e,t=100){const o=Math.max(0,Math.min(100,Number(t??100)));if(0===o)return"transparent";const i=Number((o/100).toFixed(2)),n=Fe(e);if(n)return 100===o?`rgb(${n[0]}, ${n[1]}, ${n[2]})`:`rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i})`;if("string"==typeof e&&e.trim()){const t=e.trim();return 100===o?t:`color-mix(in srgb, ${t} ${o}%, transparent)`}return o<100?`color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #ffffff)) ${o}%, transparent)`:void 0}(this._config.background_color,this._config.background_opacity??we.background_opacity),s=this._config.backdrop_blur??we.backdrop_blur,r=this._config.hide_border??we.hide_border,l=this._config.hide_shadow??we.hide_shadow,d=this._config.border_radius,c={padding:`${e}px`,minHeight:t>0?`${t}px`:null,gap:`${o}px`,textAlign:i,alignItems:n,fontFamily:function(e){switch(e){case"sans-serif":return'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';case"serif":return'Georgia, "Times New Roman", Times, serif';case"monospace":return'"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, monospace';case"digital":return'"DIN Alternate", "Roboto Condensed", "Segoe UI", system-ui, sans-serif';case"rounded":return'"SF Pro Rounded", "Nunito", "Quicksand", system-ui, sans-serif';default:return}}(this._config.font_family)??null,background:a??null,backdropFilter:s>0?`blur(${s}px)`:null,WebkitBackdropFilter:s>0?`blur(${s}px)`:null,borderRadius:void 0!==d?`${d}px`:null,"--ha-card-border-radius":void 0!==d?`${d}px`:null,borderWidth:r?"0px":null,borderColor:r?"transparent":null,"--ha-card-border-width":r?"0px":null,boxShadow:l?"none":null,"--ha-card-box-shadow":l?"none":null},_=this._config.date_position??we.date_position,h=this._config.entities_position??we.entities_position,u={tap_action:(p=this._config).tap_action??{action:"none"},double_tap_action:p.double_tap_action??{action:"none"},hold_action:p.hold_action??{action:"none"}};var p;const m=Ie(u);return B`
      <ha-card
        class=${m?"interactive":""}
        style=${be(c)}
        role=${m?"button":J}
        tabindex=${m?"0":J}
        @pointerdown=${e=>{m&&!this._isEventFromInteractiveEntity(e)&&this._gestureController.handlePointerDown(e,"card",u,e=>this._dispatchAction(u,e))}}
        @pointermove=${e=>{m&&this._gestureController.handlePointerMove(e,"card")}}
        @pointerup=${e=>{m&&!this._isEventFromInteractiveEntity(e)&&this._gestureController.handlePointerUp(e,"card",u,e=>this._dispatchAction(u,e))}}
        @pointercancel=${()=>{m&&this._gestureController.handlePointerCancel("card")}}
        @contextmenu=${e=>{m&&!this._isEventFromInteractiveEntity(e)&&this._gestureController.handleContextMenu(e,"card",u)}}
        @keydown=${e=>{m&&!this._isEventFromInteractiveEntity(e)&&("Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._dispatchAction(u,"tap")))}}
      >
        ${"top"===h?this._renderEntities():J}
        ${"top"===_?this._renderDate():J}
        ${this._renderClock()}
        ${"bottom"===_?this._renderDate():J}
        ${"bottom"===h?this._renderEntities():J}
      </ha-card>
    `}};Be.styles=s`
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      transition: background 0.2s ease, box-shadow 0.2s ease;
    }

    ha-card.interactive {
      cursor: pointer;
      user-select: none;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
    }

    .clock-wrapper {
      display: flex;
      flex-direction: column;
      line-height: 1.05;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      user-select: none;
    }

    .clock-main {
      display: inline-flex;
      align-items: baseline;
      justify-content: inherit;
      flex-wrap: nowrap;
    }

    .clock-separator {
      transition: opacity 0.2s ease;
    }

    .clock-separator.blink-dim {
      opacity: 0.22;
    }

    .clock-seconds-small {
      margin-left: 0.14em;
      line-height: 1;
      opacity: 0.88;
    }

    .clock-seconds-superscript {
      align-self: flex-start;
      margin-top: 0.12em;
    }

    .clock-seconds-subscript {
      align-self: flex-end;
      margin-bottom: 0.12em;
    }

    .clock-ampm {
      margin-left: 0.22em;
      letter-spacing: 0.04em;
      opacity: 0.88;
      line-height: 1;
    }

    .clock-ampm-superscript {
      align-self: flex-start;
      margin-top: 0.14em;
    }

    .clock-ampm-subscript {
      align-self: flex-end;
      margin-bottom: 0.14em;
    }

    .clock-ampm-below {
      margin-top: 4px;
      letter-spacing: 0.08em;
      opacity: 0.85;
    }

    .date-row {
      color: var(--secondary-text-color);
      line-height: 1.3;
      user-select: none;
    }

    .entities-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 14px;
      width: 100%;
      color: var(--primary-text-color);
    }

    .entity-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 6px;
      border-radius: 999px;
      transition: background-color 0.15s ease;
      line-height: 1.3;
      user-select: none;
    }

    .entity-chip.interactive {
      cursor: pointer;
    }

    .entity-chip.interactive:hover,
    .entity-chip.interactive:focus-visible {
      background-color: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      outline: none;
    }

    .entity-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--state-icon-color, var(--paper-item-icon-color, inherit));
      flex-shrink: 0;
    }

    .entity-name {
      opacity: 0.78;
    }

    .entity-value {
      font-weight: 500;
    }

    .entity-unavailable .entity-value {
      opacity: 0.6;
      font-style: italic;
    }
  `,e([he({attribute:!1})],Be.prototype,"hass",void 0),e([ue()],Be.prototype,"_config",void 0),e([ue()],Be.prototype,"_now",void 0),Be=e([de("simple-clock-card")],Be);const qe=window;qe.customCards=qe.customCards||[],qe.customCards.some(e=>"simple-clock-card"===e.type)||qe.customCards.push({type:"simple-clock-card",name:"Simple Clock Card",description:"Highly customizable clock, date, and status entities card with full visual editor and multi-language support.",preview:!0});export{Be as SimpleClockCard};
