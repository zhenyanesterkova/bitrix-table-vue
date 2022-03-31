import Vue from "vue"

export default {
    data() {
        return {
            filterable: true,
            filters: {},
        };
    },
    methods: {
        updateFilters({ filter, column }) {
            Vue.delete(this.filters, column);
            if (filter) {
                Vue.set(this.filters, column, filter);
            }
        }
    },
    watch: {
        filters() {
            if (this.paginable) {
                this.pageNumber = 1;
            }
            if (this.updateData instanceof Function) {
                this.updateData();
            }
        },
    },
}