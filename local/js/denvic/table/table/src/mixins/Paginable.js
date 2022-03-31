export default {
    data() {
        return {
            paginable: true,
            pageSize: 0,
            pageNumber: 1,
        }
    },
    methods: {
        updatePagination({ pageSize, pageNumber }) {
            this.pageSize = pageSize;
            this.pageNumber = pageNumber;
        },
    },
    watch: {
        pageSize() {
            if (this.updateData instanceof Function) {
                this.updateData();
            }
        },
        pageNumber() {
            if (this.updateData instanceof Function) {
                this.updateData();
            }
        },
    },
}