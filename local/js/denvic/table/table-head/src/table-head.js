import { Vue } from 'ui.vue';

Vue.component('bx-table-head', {
	props: {
		head: {
			type: String,
			required: true,
		},
	},
	template: `
	  	<div>
	  		<div class="title">
			  <slot name="sorter"></slot>
			  {{head}}
			</div>
	  		<slot name="filter"></slot>
		</div> 
	  `
})