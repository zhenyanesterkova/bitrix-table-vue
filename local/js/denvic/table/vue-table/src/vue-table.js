import {Vue} from 'ui.vue'

Vue.component('bx-vue-table', {
	props: {
		rows: {
		  type: Array,
		  default: Array,
		},
		columns: {
		  type: Array,
		  default: Array,
		},
		columnsHeads: {
		  type: Object,
		  default: Object,
		},
		getKey: {
		  type: Function,
		  default: (row, index) => index,
		},
		headsClasses: {
		  type: Object,
		  default: Object,
		},
		defaultHeadClass: {
		  type: Object,
		  default: Object,
		},
		headsStyles: {
		  type: Object,
		  default: Object,
		},
		defaultHeadStyle: {
		  type: Object,
		  default: Object,
		},
		cellsClasses: {
		  type: Object,
		  default: Object,
		},
		defaultCellClass: {
		  type: Object,
		  default: Object,
		},
		cellsStyles: {
		  type: Object,
		  default: Object,
		},
		defaultCellStyle: {
		  type: Object,
		  default: Object,
		},
		theadClass: {
		  type: Object,
		  default: Object,
		},
		theadStyle: {
		  type: Object,
		  default: Object,
		},
		tbodyClass: {
		  type: Object,
		  default: Object,
		},
		tbodyStyle: {
		  type: Object,
		  default: Object,
		},
	},
	computed: {
		computedColumnsHeads() {
		  	return this.columns.reduce((res, column) => {
				res[column] = this.columnsHeads[column] || column;
				return res;
		  	}, {});
		},
		computedHeadsClasses() {
		  	return this.columns.reduce((res, column) => {
				res[column] = Object.assign(
				  {},
				  this.defaultHeadClass,
				  this.headsClasses[column]
				);
				return res;
		  	}, {});
		},
		computedHeadsStyles() {
		  	return this.columns.reduce((res, column) => {
				res[column] = Object.assign(
				  {},
				  this.defaultHeadStyle,
				  this.headsStyles[column]
				);
				return res;
		  	}, {});
		},
		computedCellsClasses() {
		  	return this.columns.reduce((res, column) => {
				res[column] = Object.assign(
				  {},
				  this.defaultCellClass,
				  this.cellsClasses[column]
				);
				return res;
		  	}, {});
		},
		computedCellsStyles() {
			return this.columns.reduce((res, column) => {
				res[column] = Object.assign(
				  {},
				  this.defaultCellStyle,
				  this.cellsStyles[column]
				);
				return res;
			}, {});
		},
	},
	template: `
		<table>
			<slot name="start-table"></slot>
				<thead v-bind:class="theadClass" v-bind:style="theadStyle">
					<slot name="start-thead"></slot>
						<tr>
							<th
								v-for="column in columns"
								v-bind:key="column"
								v-bind:class="computedHeadsClasses[column]"
								v-bind:style="computedHeadsStyles[column]"
							>
								<slot name="{{column}}-head" v-bind:head="computedColumnsHeads[column]">
									{{ computedColumnsHeads[column] }}
								</slot>
							</th>
						</tr>
					<slot name="end-thead"></slot>
				</thead>
				<tbody v-bind:class="tbodyClass" v-bind:style="tbodyStyle">
					<slot name="start-tbody"></slot>
						<tr v-for="(row, index) in rows" v-bind:key="getKey(row, index)">
							<td
								v-for="column in columns"
								v-bind:key="column"
								v-bind:class="computedCellsClasses[column]"
								v-bind:styles="computedCellsStyles[column]"
							>
								<slot name="start-{{column}}-cell"></slot>
								<slot name="{{column}}-cell" v-bind:row="row" v-bind:index="index">
									{{ row[column] }}
								</slot>
								<slot name="end-{{column}}-cell"></slot>
							</td>
						</tr>
					<slot name="end-tbody"></slot>
				</tbody>
			<slot name="end-table"></slot>
		</table>
	`
})