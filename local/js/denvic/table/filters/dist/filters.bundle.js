this.BX=this.BX||{},this.BX.Denvic=this.BX.Denvic||{},this.BX.Denvic.Table=this.BX.Denvic.Table||{},function(t,e){"use strict";BX.Vue.component("bx-filters",{props:{filter:{type:String,default:""},column:{type:String,required:!0},sep:{type:String,default:":"},type:{type:String,required:!0,default:"text"}},methods:{emitFilter:function(t){this.$emit("filter",{filter:t,column:this.column})},setLeft:function(t){this.emitFilter(t||this.right?"".concat(t,":").concat(this.right):"")},setRight:function(t){this.emitFilter(this.left||t?"".concat(this.left,":").concat(t):"")}},computed:{range:function(){var t=this.filter.split(this.sep),e=babelHelpers.slicedToArray(t,2),i=e[0],n=e[1];return void 0===i&&(i=""),void 0===n&&(n=""),[i,n]},left:function(){return this.range[0]},right:function(){return this.range[1]}},template:'\n    \t<div>\n    \t  <div>\n    \t    От\n    \t    <input v-bind:type="type" v-bind:value="left" @input="setLeft($event.target.value)" />\n    \t  </div>\n    \t  <div>\n    \t    До\n    \t    <input\n                v-bind:type="type"\n    \t        v-bind:value="right"\n    \t        @input="setRight($event.target.value)"\n    \t    />\n    \t  </div>\n    \t</div>\n\t\t<div>\n            \n      \t\t<input\n              v-bind:type="type"\n              v-bind:value="filter"\n      \t\t  @change="emitFilter($event.target.value)"\n      \t\t/>\n    \t</div>\n  \t'})}(this.BX.Denvic.Table.Filters=this.BX.Denvic.Table.Filters||{});
//# sourceMappingURL=filters.bundle.js.map