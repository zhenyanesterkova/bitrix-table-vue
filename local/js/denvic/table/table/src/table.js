import { Vue } from 'ui.vue';

import { TableLoader } from "denvic.table.loader";
import { Filter } from "denvic.table.filters";
import { SwitchSorter } from "denvic.table.sorters";
import { updateData } from "./TestSource";
import { MyTableHead } from "denvic.table.table-head";
import { Paginator } from "denvic.table.paginators";
import { VueTable } from "denvic.table.vue-table";
import Filterable from "./mixins/Filterable";
import Sortable from "./mixins/Sortable";
import Paginable from "./mixins/Paginable";
import InfScrollable from "./mixins/InfScrollable";
import virtualScrollable from "./mixins/virtualScrollable";

Vue.component('bx-table', {
	template: `
		<div>
			<div>
				Использовать бесконечный скролл
				<input
					type="checkbox"
					v-model="infScrollable"
				/>
			</div>
			<div>
				Использовать виртуальный скролл
				<input
					type="checkbox"
					v-model="virtualScrollable"
				/>
			</div>
			<bx-paginators
				v-if="!infScrollable"
				v-bind:pageSize="pageSize"
				v-bind:pageNumber="pageNumber"
				v-bind:totalPages="totalPages"
				@paginate="updatePagination($event)"
			/>
			<bx-vue-table
				v-bind:rows="computedRows"
				v-bind:columns="columns"
				v-bind:columnsHeads="columnsHeads"
				v-bind:getKey="computedGetKey"
				v-bind:defaultHeadClass="{ ['table-head']: true }"
				v-bind:defaultCellClass="{ ['table-cell']: true }"
				v-bind:useVirtualScroll="virtualScrollable"
				v-bind:virtualScrollHeight="20"
				v-bind:virtualScrollCount="25"
				class="table"
			>
				<template v-if="virtualScrollable" v-slot:start-tbody>
					<tr
						v-bind:colspan="rowSize"
						id="virtualScrollTopFiller"
						v-bind:style="{height: virtualScrollTopFillerSize + 'px'}"
					/>
				</template>
				<template v-for="column in columns" v-slot:[\`\${column}-head\`]="{head}">
					<bx-table-head v-bind:head="head" v-bind:key="column">
						<template v-slot:sorter
							><bx-sorters
								v-bind:sort="sorts[column]"
								v-bind:column="column"
								v-bind:index="sortsIndexes[column]"
								@sort="updateSorts($event)"
						/></template>
						<template v-slot:filter
							><bx-filters
								v-bind:is="filtersComponents[column]"
								v-bind:filter="filters[column]"
								v-bind:column="column"
								v-bind:type="filtersTypes[column]"
								@filter="updateFilters($event)"
						/></template>
					</bx-table-head>
				</template>

				
				<template v-slot:email-cell="{row}">
					<a :href="\`mailto:\${row.email}\`">{{ row.email }}</a>
				</template>

				<template v-slot:end-tbody>
					<tr
						v-if="virtualScrollable"
						v-bind:colspan="rowSize"
						id="virtualScrollBottomFiller"
						v-bind:style="\`height:\${virtualScrollBottomFillerSize}px\`"
					/>
					<tr
						v-if="infScrollable"
						v-bind:colspan="rowSize"
						id="infScrollBottomAnchor"
					/>
					<bx-loader v-if="bottomLoader" v-bind:colspan="rowSize" />
				</template>
			</bx-vue-table>

			<bx-paginators
				v-if="!infScrollable"
				v-bind:pageSize="pageSize"
				v-bind:pageNumber="pageNumber"
				v-bind:totalPages="totalPages"
				@paginate="updatePagination($event)"
			/>
		</div>
	`,
	data() {
		return {
			rows: [],

			columns: ["id", "age", "name", "login", "email"],
			columnsHeads: {
				id: "ID",
				age: "Возраст",
				name: "Имя",
				login: "Логин",
				email: "EMail",
			},

			filtersTypes: {
				id: "number",
				age: "number",
				name: "text",
				login: "text",
				email: "text",
			},
			filtersComponents: {
				id: 'bx-filters',
				age: 'bx-filters',
				name: 'bx-filters',
				login: 'bx-filters',
				email: 'bx-filters',
			},

			bottomLoader: false,

			pageSize: 20,
			totalPages: 0,

			infScrollable: false,
			infScrollStartSize: 100,
			infScrollStepSize: 50,
			infScrollTriggerOffset: 1000,

			virtualScrollable: false,
			virtualScrollBufferSize: 10,
			virtualScrollRowHeight: 20,
		};
	},
	computed: {
		rowSize() {
			return this.columns.length;
		},
		sortsIndexes() {
			return this.sortsOrder.reduce((res, column, index) => {
				res[column] = index + 1;
				return res;
			}, {});
		},
		computedRows() {
			return this.virtualScrollable ? this.virtualScrollRows : this.rows;
		},
		computedGetKey() {
			return this.virtualScrollable ? this.virtualScrollGetKey : this.getKey;
		},
		getKey(row) {
			return row.id;
		},
	},
	methods: {
		updateData(infScroll) {
			updateData(this, !infScroll);
		},
	},
	created() {
		this.updateData();
	},
	watch: {
		infScrollable() {
			(this.paginable = !this.infScrollable), this.updateData();
		},
	},
	mixins: [Filterable, Sortable, Paginable, InfScrollable, virtualScrollable],
})