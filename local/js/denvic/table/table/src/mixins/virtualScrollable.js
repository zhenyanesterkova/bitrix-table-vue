export default {
    data() {
        return {
            virtualScrollable: true,

            virtualScrollViewportHeight: 0,
            virtualScrollStartPosition: 0,
            virtualScrollCurrentPosition: 0,
        };
    },
    created() {
        this.virtualScrollUpdateViewportHeight();
        this.virtualScrollUpdateCurrentPosition();
        window.addEventListener("resize", this.virtualScrollUpdateViewportHeight);
        window.addEventListener("scroll", this.virtualScrollUpdateCurrentPosition);
        if (this.virtualScrollable) {
            this.virtualScrollTopFiller = document.querySelector("#virtualScrollTopFiller");
            this.virtualScrollBottomFiller = document.querySelector("#virtualScrollBottomFiller");
            this.virtualScrollUpdateStartPosition();
            window.addEventListener("resize", this.virtualScrollUpdateStartPosition);
        }
    },
    unmounted() {
        window.removeEventListener("resize", this.virtualScrollUpdateViewportHeight);
        window.removeEventListener("scroll", this.virtualScrollUpdateCurrentPosition);
        if (this.virtualScrollable) {
            window.removeEventListener("resize", this.virtualScrollUpdateStartPosition);
        }
    },
    computed: {
        virtualScrollListSize() {
            const rowHeight = this.virtualScrollRowHeight;
            return rowHeight * this.rows.length;
        },
        virtualScrollListPosition() {
            const currentPosition = this.virtualScrollCurrentPosition;
            const startPosition = this.virtualScrollStartPosition;
            return currentPosition - startPosition;
        },
        virtualScrollTopFillerCount() {
            const listPosition = this.virtualScrollListPosition;
            const rowHeight = this.virtualScrollRowHeight;
            const bufferSize = this.virtualScrollBufferSize;
            const topFilterCount = Math.floor(listPosition / rowHeight) - bufferSize;
            return topFilterCount > 0 ? topFilterCount : 0;
        },
        virtualScrollViewportCount() {
            const rowHeight = this.virtualScrollRowHeight;
            const bufferSize = this.virtualScrollBufferSize;
            const viewportHeight = this.virtualScrollViewportHeight;
            return Math.ceil(viewportHeight / rowHeight) + 2 * bufferSize;
        },
        virtualScrollBottomFillerCount() {
            const topFillerCount = this.virtualScrollTopFillerCount;
            const viewportCount = this.virtualScrollViewportCount;
            const bottomFilterCount = this.rows.length - topFillerCount - viewportCount;
            return bottomFilterCount > 0 ? bottomFilterCount : 0;
        },
        virtualScrollTopFillerSize() {
            const topFillerCount = this.virtualScrollTopFillerCount;
            const rowHeight = this.virtualScrollRowHeight;
            return topFillerCount * rowHeight;
        },
        virtualScrollBottomFillerSize() {
            const bottomFillerCount = this.virtualScrollBottomFillerCount;
            const rowHeight = this.virtualScrollRowHeight;
            return bottomFillerCount * rowHeight;
        },
        virtualScrollRows() {
            const topFillerCount = this.virtualScrollTopFillerCount;
            const viewportCount = this.virtualScrollViewportCount;
            return this.rows.slice(topFillerCount, topFillerCount + viewportCount);
        },
    },
    methods: {
        virtualScrollUpdateViewportHeight() {
            this.virtualScrollViewportHeight = document.documentElement.clientHeight;
        },
        virtualScrollUpdateStartPosition() {
            this.virtualScrollStartPosition = this.virtualScrollTopFiller.getBoundingClientRect().top + window.pageYOffset;
        },
        virtualScrollUpdateCurrentPosition() {
            this.virtualScrollCurrentPosition = window.pageYOffset;
        },
        virtualScrollGetKey(row, index) {
            const topFillerCount = this.virtualScrollTopFillerCount;
            const viewportCount = this.virtualScrollViewportCount;
            return (index + topFillerCount) % viewportCount;
        }
    },
    watch: {
        virtualScrollable() {
            if (this.virtualScrollable) {
                this.$nextTick(() => {
                    this.virtualScrollTopFiller = document.querySelector("#virtualScrollTopFiller");
                    this.virtualScrollBottomFiller = document.querySelector("#virtualScrollBottomFiller");
                    this.virtualScrollUpdateStartPosition();
                    window.addEventListener("resize", this.virtualScrollUpdateStartPosition);
                });
            } else {
                window.removeEventListener("resize", this.virtualScrollUpdateStartPosition);
            }
        },
    },
}