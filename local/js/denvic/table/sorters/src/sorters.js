import {Vue} from 'ui.vue'
const nextSort = {
    no: "inc",
    inc: "dec",
    dec: "no",
}
const icons = {
	no: 'bx-unsorted',
	inc: 'bx-increase',
	dec: 'bx-decrease',
  }
BX.Vue.component('bx-unsorted', {
	template: `
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/></svg>
	`
})
BX.Vue.component('bx-decrease', {
	template: `
		<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z"/></svg>
	`
})
BX.Vue.component('bx-increase', {
	template: `
	<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M19,15l-1.41-1.41L13,18.17V2H11v16.17l-4.59-4.59L5,15l7,7L19,15z"/></svg>
	`
})
Vue.component('bx-sorters', {
	props: {
		index: {
		  type: Number,
		  default: null,
		},
		sort: {
            type: String,
            default: 'no', // "no", "inc", "dec"
        },
        column: {
            type: String,
            required: true,
        },
	  },
	computed: {
		icon() {
		  return icons[this.sort];
		},
		showIndex() {
		  return this.sort !== "no" && this.index !== null;
		},
	  },
	methods: {
        switchSort() {
            this.emitSort(nextSort[this.sort]);
        },
		emitSort(sort) {
            this.$emit("sort", { sort, column: this.column });
        }
    },
	template: `
	<div>
		<span class="sort-control" v-on:click="switchSort">
			<component v-bind:is="icon" /><span v-if="showIndex" class="index">{{
				index
			  }}</span>
			
  		</span>
	</div>
	`
})