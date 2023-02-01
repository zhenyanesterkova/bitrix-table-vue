import { Vue } from 'ui.vue'

Vue.component('bx-paginators', {
	props: {
		totalPages: {
			type: Number,
			default: null,
		},
		pageSize: {
			type: Number,
			default: 1,
		},
		pageNumber: {
			type: Number,
			default: 1,
		},
	},
	methods: {
		setPageSize(pageSize) {
			this.$emit("paginate", { pageSize, pageNumber: 1 });
		},
		setPageNumber(pageNumber) {
			this.$emit("paginate", { pageSize: this.pageSize, pageNumber });
		},
	},
	template: `
		<div class="paginator">
    		<div>
    		  Размер страницы:
    		  <input
    		    type="number"
    		    v-bind:value="pageSize"
    		    @input="setPageSize(+$event.target.value)"
    		    min="1"
    		  />
    		</div>
    		<div>
    		  Текущая страница:
    		  <input
    		    type="number"
    		    v-bind:value="pageNumber"
    		    @input="setPageNumber(+$event.target.value)"
    		    min="1"
    		    v-bind:max="totalPages"
    		  />
    		  <span v-if="totalPages !== null">/{{ totalPages }}</span>
    		</div>
  		</div>
	`
})