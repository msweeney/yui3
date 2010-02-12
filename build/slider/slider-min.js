YUI.add("slider",function(D){var B="value";function A(){A.superclass.constructor.apply(this,arguments);}D.Slider=D.extend(A,D.Widget,{initializer:function(){},renderUI:function(){var E=this.get("contentBox");this.rail=this._renderRail();this._uiSetRailSize();this.thumb=this._renderThumb();this.rail.appendChild(this.thumb);E.appendChild(this.rail);E.addClass(this.getClassName(this.axis));},_renderRail:function(){var F=this.getClassName("rail","cap",this._minEdge),E=this.getClassName("rail","cap",this._maxEdge);return D.Node.create(D.substitute(this.RAIL_TEMPLATE,{railClass:this.getClassName("rail"),railMinCapClass:F,railMaxCapClass:E}));},_uiSetRailSize:function(){this.rail.setStyle(this._dim,this._dim);},_renderThumb:function(){var E=this.get("thumbUrl");return D.Node.create(D.substitute(this.THUMB_TEMPLATE,{thumbClass:this.getClassName("thumb"),thumbShadowClass:this.getClassName("thumb","shadow"),thumbImageClass:this.getClassName("thumb","image"),thumbShadowUrl:E,thumbImageUrl:E}));},bindUI:function(){this._bindThumbDD();this._bindValuePlugin();this.after("disabledChange",this._afterDisabledChange);this.after(this._dim+"Change",this._afterLengthChange);},_bindThumbDD:function(){var E={constrain:this.rail};E["stick"+this.axis.toUpperCase()]=true;this._dd=new D.DD.Drag({node:this.thumb,bubble:false,on:{"drag:start":D.bind(this._onDragStart,this)},after:{"drag:drag":D.bind(this._afterDrag,this),"drag:end":D.bind(this._afterDragEnd,this)}});this._dd.plug(D.Plugin.DDConstrained,E);},_bindValuePlugin:function(){var F=this.get("valuePlugin"),E={min:this.min,max:this.max,after:{minChange:D.rbind(this._afterPluginMinChange,this),maxChange:D.rbind(this._afterPluginMaxChange,this),valueChange:D.rbind(this._afterPluginValueChange,this)}};if(this.value!==null){E.value=this.value;}this._dd.plug(F,E);this.after({minChange:this._afterMinChange,maxChange:this._afterMaxChange,valueChange:this._afterValueChange});},_onDragStart:function(E){this.fire("slideStart",{ddEvent:E,value:this.value});},_afterDrag:function(E){this.fire("thumbMove",{ddEvent:E,value:this.value});},_afterDragEnd:function(E){this.fire("slideEnd",{ddEvent:E,value:this.value});},_afterPluginMinChange:function(E){this.set("min",E.newVal,{fromPlugin:true});},_afterMinChange:function(E){if(!E.fromPlugin&&this._dd){this._dd._val.set("min",E.newVal);}},_afterPluginMaxChange:function(E){this.set("max",E.newVal,{fromPlugin:true});},_afterMaxChange:function(E){if(!E.fromPlugin&&this._dd){this._dd._val.set("max",E.newVal);}},_afterPluginValueChange:function(E){this.set(B,E.newVal,{fromPlugin:true});},_afterValueChange:function(E){if(!E.fromPlugin&&this._dd){this._dd._val.set(B,E.newVal);}},_afterDisabledChange:function(E){this._dd.set("lock",true);},_afterLengthChange:function(E){this._uiSetRailSize();},syncUI:function(){this._dd[this.get("valuePlugin").NS].syncDragNode();},getValue:function(){return this.get(B);},setValue:function(E){this.set(B,E);},_validateNewAxis:function(E){return D.Lang.isString(E)&&"xXyY".indexOf(E.charAt(0))>-1;},_setAxisFn:function(F){this.axis=F.charAt(0).toLowerCase();var E=(this.axis==="y");this._dim=(E)?"height":"width";this._minEdge=(E)?"top":"left";this._maxEdge=(E)?"bottom":"right";return this.axis;},_initThumbUrlFn:function(){return D.config.base+"slider/assets/skins/sam/thumb-"+this.axis+".png";},_getMin:function(){return(this._dd)?this._dd._val.get("min"):this.min;},_setMin:function(E,F){this.min=E;return E;},_getMax:function(){return(this._dd)?this._dd._val.get("max"):this.max;},_setMax:function(E,F){this.max=E;return E;},_getValue:function(){return(this._dd)?this._dd._val.get(B):this.value;},_setValue:function(E,F){this.value=E;return E;},BOUNDING_TEMPLATE:"<span></span>",CONTENT_TEMPLATE:"<span></span>",RAIL_TEMPLATE:'<span class="{railClass}">'+'<span class="{railMinCapClass}"></span>'+'<span class="{railMaxCapClass}"></span>'+"</span>",THUMB_TEMPLATE:'<span class="{thumbClass}" tabindex="-1">'+'<img src="{thumbShadowUrl}" '+'alt="Slider thumb shadow" '+'class="{thumbShadowClass}">'+'<img src="{thumbImageUrl}" '+'alt="Slider thumb" '+'class="{thumbImageClass}">'+"</span>",min:0,max:100,value:null},{NAME:"slider",ATTRS:{axis:{value:"x",writeOnce:true,validator:"_validateNewAxis",setter:"_setAxisFn",lazyAdd:false},min:{getter:"_getMinFn",setter:"_setMinFn",lazyAdd:false},max:{getter:"_getMaxFn",setter:"_setMaxFn",lazyAdd:false},value:{getter:"_getValueFn",setter:"_setValueFn",lazyAdd:false},valuePlugin:{value:D.Plugin.DDValue,validator:D.Lang.isFunction},thumbUrl:{valueFn:"_initThumbUrlFn",validator:D.Lang.isString}}});function C(){this._initClickableRail();}D.mix(C,{ATTRS:{clickableRail:{value:true,validator:D.Lang.isBoolean}},prototype:{_initClickableRail:function(){this.publish("railMouseDown",{defaultFn:this._defRailMouseDownFn});this.after("render",this._bindClickableRail);this.on("destroy",this._unbindClickableRail);},_bindClickableRail:function(){this.rail.on(this._evtGuid+"mousedown",this._onRailMouseDown);},_unbindClickableRail:function(){if(this.get("rendered")){var E=this.get("contentBox"),F=E.one("."+this.getClassName("rail"));F.detach(this.evtGuid+"*");}},_onRailMouseDown:function(E){if(this.get("clickableRail")&&!this.get("disabled")){this.fire("railMouseDown",{ev:E});}},_defRailMouseDownFn:function(G){G=G.ev;var E=this._resolveThumb(G),F;if(E){if(!E.startXY){E._setStartPosition(E.getXY());}F=this._getThumbDestination(G,E);E._alignNode(F);E._handleMouseDownEvent(G);}},_resolveThumb:function(F){var G=this._dd.get("primaryButtonOnly"),E=!G||F.button<=1;return(E)?this._dd:null;},_getThumbDestination:function(I,F){var H=F.get("dragNode"),G=H.get("offsetWidth"),E=H.get("offsetHeight");return[(I.pageX-Math.round((G/2))),(I.pageY-Math.round((E/2)))];}}});D.Slider=D.Base.build(D.Slider,[C]);},"@VERSION@",{requires:["widget","substitute","dd-value"]});