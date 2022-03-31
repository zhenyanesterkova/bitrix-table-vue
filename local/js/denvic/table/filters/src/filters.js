import { Vue } from 'ui.vue'

Vue.component('bx-filters', {
    props: {
        filter: {
            type: String,
            default: "",
        },
        column: {
            type: String,
            required: true,
        },
        sep: {
            type: String,
            default: ":",
        },
        type: {
            type: String,
            required: true,
            default: 'text'
        },
    },
    methods: {
        emitFilter(filter) {
            this.$emit("filter", { filter, column: this.column });
        },
        setLeft(left) {
            this.emitFilter(left || this.right ? `${left}:${this.right}` : "");
        },
        setRight(right) {
            this.emitFilter(this.left || right ? `${this.left}:${right}` : "");
        },
    },
    computed: {
        range() {
            let [left, right] = this.filter.split(this.sep);
            if (left === undefined) {
                left = "";
            }
            if (right === undefined) {
                right = "";
            }
            return [left, right];
        },
        left() {
            return this.range[0];
        },
        right() {
            return this.range[1];
        },
    },
    template: `
    <div>
    	<div>
    	  <div>
    	    От
    	    <input v-bind:type="type" v-bind:value="left" @input="setLeft($event.target.value)" />
    	  </div>
    	  <div>
    	    До
    	    <input
                v-bind:type="type"
    	        v-bind:value="right"
    	        @input="setRight($event.target.value)"
    	    />
    	  </div>
    	</div>
		<div>
            
      		<input
              v-bind:type="type"
              v-bind:value="filter"
      		  @change="emitFilter($event.target.value)"
      		/>
    	</div>
        </div>
  	`,
})