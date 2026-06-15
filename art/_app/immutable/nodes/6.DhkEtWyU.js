import{A as e,B as t,C as n,E as r,F as i,I as a,K as o,L as s,P as c,Q as l,R as u,V as d,X as f,Z as p,d as m,f as h,g,h as _,j as v,l as y,n as b,o as x,q as S,r as C,s as w,u as ee,v as T,w as E,x as D,y as O,z as k}from"../chunks/BPvxVMyM.js";import"../chunks/xihTtKlq.js";import{At as A,C as j,Dt as M,Et as N,K as P,Ot as F,Tt as I,Y as L,at as te,b as R,c as ne,d as z,gt as B,h as V,ht as H,l as U,m as W,nt as G,ot as K,q,r as re,rt as ie,t as ae,x as oe,xt as se}from"../chunks/AEVXu8Xk.js";import{t as ce}from"../chunks/DFU1FwmC.js";import{t as le}from"../chunks/ESwyDXwy.js";var J=l({prerender:()=>!0}),Y={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},X=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},ue=new G(-1,1,1,-1,0,1),de=new class extends z{constructor(){super(),this.setAttribute(`position`,new R([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new R([0,2,0,0,2,0],2))}},Z=class{constructor(e){this._mesh=new P(de,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ue)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},fe=class extends X{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof B?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=N.clone(e.uniforms),this.material=new B({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Z(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Q=class extends X{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},pe=class extends X{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},me=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new M);this._width=n.width,this._height=n.height,t=new A(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:j}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new fe(Y),this.copyPass.material.blending=0,this.timer=new I}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Q!==void 0&&(r instanceof Q?n=!0:r instanceof pe&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new M);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},he=class extends X{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new V}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},ge={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new V(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},$=class e extends X{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new M(256,256):new M(e.x,e.y),this.clearColor=new V(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new A(i,a,{type:j}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new A(i,a,{type:j});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new A(i,a,{type:j});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=ge;this.highPassUniforms=N.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new B({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new M(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=N.clone(Y.uniforms),this.blendMaterial=new B({uniforms:this.copyUniforms,vertexShader:Y.vertexShader,fragmentShader:Y.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new V,this._oldClearAlpha=1,this._basic=new q,this._fsQuad=new Z(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new M(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new B({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new M(.5,.5)},direction:{value:new M(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new B({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};$.BlurDirectionX=new M(1,0),$.BlurDirectionY=new M(0,1);var _e=D(`<div class="region-row svelte-9heiib"><div class="region-label svelte-9heiib"><span class="color-dot svelte-9heiib"></span> </div> <div class="slider-row svelte-9heiib"><span class="param-name svelte-9heiib">Speed</span> <input type="range" min="0.1" max="3" step="0.01" class="svelte-9heiib"/> <span class="val svelte-9heiib"> </span></div> <div class="slider-row svelte-9heiib"><span class="param-name svelte-9heiib">Offset</span> <input type="range" min="0" max="6.28" step="0.01" class="svelte-9heiib"/> <span class="val svelte-9heiib"> </span></div> <div class="slider-row svelte-9heiib"><span class="param-name svelte-9heiib">Intensity</span> <input type="range" min="0" max="2.5" step="0.01" class="svelte-9heiib"/> <span class="val svelte-9heiib"> </span></div></div>`),ve=D(`<canvas style="width:100vw;height:100vh;display:block;"></canvas> <button class="toggle-btn svelte-9heiib"> </button> <aside><div class="overlay-header svelte-9heiib">REGION ACTIVATION</div> <!></aside>`,1);function ye(n,l){S(l,!0);let D,A,j,N,I=t(!1),R=u({brain_frontal:{freq:.8,phase:0,amp:1},brain_parietal:{freq:1.1,phase:1.2,amp:.8},brain_temporal_left:{freq:.9,phase:2.4,amp:1.2},brain_temporal_right:{freq:.9,phase:3.6,amp:1.2},brain_occipital:{freq:1.3,phase:.5,amp:.9},brain_cerebellum:{freq:.7,phase:1.8,amp:1},brain_amygdala_left:{freq:1.5,phase:.3,amp:1.5},brain_amygdala_right:{freq:1.5,phase:3,amp:1.5}}),z={brain_frontal:{label:`Frontal`,color:`#3380ff`},brain_parietal:{label:`Parietal`,color:`#b233ff`},brain_temporal_left:{label:`Temporal L`,color:`#ff8c00`},brain_temporal_right:{label:`Temporal R`,color:`#ff8c00`},brain_occipital:{label:`Occipital`,color:`#1aff4d`},brain_cerebellum:{label:`Cerebellum`,color:`#ffe600`},brain_amygdala_left:{label:`Amygdala L`,color:`#ff1a1a`},brain_amygdala_right:{label:`Amygdala R`,color:`#ff1a1a`}};C(()=>{let e=new H;e.background=new V(526352),e.fog=new oe(526352,8,20);let t=new ie(45,D.clientWidth/D.clientHeight,.1,100);t.position.set(0,1.6,4.5),j=new ae({canvas:D,antialias:!0}),j.setPixelRatio(devicePixelRatio),j.setSize(D.clientWidth,D.clientHeight),j.toneMapping=2,j.toneMappingExposure=1.2,j.shadowMap.enabled=!0,j.shadowMap.type=2,e.add(new re(16777215,.15));let n=new se(16774624,4,12,Math.PI/7,.4,1.2);n.position.set(0,5,1),n.target.position.set(0,.5,0),n.castShadow=!0,n.shadow.mapSize.width=1024,n.shadow.mapSize.height=1024,n.shadow.camera.near=1,n.shadow.camera.far=14,e.add(n),e.add(n.target);let i=new K(659504,1.5,8);i.position.set(-2,2,-2),e.add(i);let a=new L({color:4006408,roughness:.7,metalness:.05}),o=new P(new U(2.2,.07,1.4),a);o.position.y=0,o.receiveShadow=!0,o.castShadow=!0,e.add(o);for(let[t,n]of[[-.95,.61],[.95,.61],[-.95,-.61],[.95,-.61]]){let r=new P(new U(.07,.86,.07),a);r.position.set(t,-.465,n),r.castShadow=!0,r.receiveShadow=!0,e.add(r)}let s=new L({color:1118484,roughness:.95,metalness:0}),c=new P(new te(30,30),s);c.rotation.x=-Math.PI/2,c.position.y=-.465,c.receiveShadow=!0,e.add(c),N=new me(j),N.addPass(new he(e,t)),N.addPass(new $(new M(D.clientWidth,D.clientHeight),.55,.5,.2));let l=new le(t,D);l.enableDamping=!0,l.target.set(0,.4,0),l.minDistance=1.5,l.maxDistance=12,l.update();let u=new Map;new ce().load(`/brain.glb`,t=>{let n=new ne().setFromObject(t.scene),r=n.getCenter(new F);t.scene.position.x=-r.x,t.scene.position.z=-r.z,t.scene.position.y=-n.min.y+.035,t.scene.traverse(e=>{e instanceof P&&(e.castShadow=!0,e.receiveShadow=!0,e.name in R&&u.set(e.name,e))}),e.add(t.scene)});let d=new W,f=()=>{t.aspect=D.clientWidth/D.clientHeight,t.updateProjectionMatrix(),j.setSize(D.clientWidth,D.clientHeight),N.setSize(D.clientWidth,D.clientHeight)};window.addEventListener(`resize`,f);let p=e=>{(e.key===`p`||e.key===`P`)&&k(I,!r(I))};window.addEventListener(`keydown`,p);let m=()=>{A=requestAnimationFrame(m);let e=d.getElapsedTime();l.update(),u.forEach((t,n)=>{let r=R[n];t.material.emissiveIntensity=r.amp*(Math.sin(e*r.freq+r.phase)*.5+.5)}),N.render()};return m(),()=>{window.removeEventListener(`resize`,f),window.removeEventListener(`keydown`,p),l.dispose()}}),b(()=>{cancelAnimationFrame(A),N?.dispose(),j?.dispose()});var B=ve();h(`9heiib`,t=>{e(()=>{c.title=`Brain — WebGL Demo`})});var G=a(B);x(G,e=>D=e,()=>D);var q=s(G,2),J=i(q);f(q);var Y=s(q,2);let X;_(s(i(Y),2),17,()=>Object.entries(R),g,(e,t)=>{var n=d(()=>p(r(t),2));let a=()=>r(n)[0],o=()=>r(n)[1],c=d(()=>z[a()]);var l=_e(),u=i(l),m=i(u),h=s(m);f(u);var g=s(u,2),_=s(i(g),2);w(_);var b=s(_,2),x=i(b,!0);f(b),f(g);var S=s(g,2),C=s(i(S),2);w(C);var D=s(C,2),k=i(D,!0);f(D),f(S);var A=s(S,2),j=s(i(A),2);w(j);var M=s(j,2),N=i(M,!0);f(M),f(A),f(l),v((e,t,n)=>{ee(m,`background:${r(c).color??``}`),T(h,` ${r(c).label??``}`),y(_,o().freq),T(x,e),y(C,o().phase),T(k,t),y(j,o().amp),T(N,n)},[()=>o().freq.toFixed(2),()=>o().phase.toFixed(2),()=>o().amp.toFixed(2)]),E(`input`,_,e=>o().freq=parseFloat(e.currentTarget.value)),E(`input`,C,e=>o().phase=parseFloat(e.currentTarget.value)),E(`input`,j,e=>o().amp=parseFloat(e.currentTarget.value)),O(e,l)}),f(Y),v(()=>{T(J,`PARAMS ${r(I)?`◂`:`▸`}`),X=m(Y,1,`overlay svelte-9heiib`,null,X,{open:r(I)})}),E(`click`,q,()=>k(I,!r(I))),O(n,B),o()}n([`click`,`input`]);export{ye as component,J as universal};