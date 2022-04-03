// let worker;
// if (window.Worker) {
//     worker = new Worker("data-worker.js");
// }

function updateDataWithoutDebounce(data) {
    let startIndex;
    let endIndex;

    if (data.infScrollable) {
        startIndex = data.rows.length;
        endIndex = startIndex ? startIndex + data.infScrollStepSize : data.infScrollStartSize;
        if (endIndex >= data.length) {
            return;
        }
    } else if (data.paginable) {
        startIndex = data.pageSize * (data.pageNumber - 1);
        endIndex = startIndex + data.pageSize;
    }

    BX.ajax({
        url: '/local/ajax/denvic/ajax-vue.php',
        data: {
            sorts: data.sorts,
            filters: data.filters,
            navParams: {
                pageSize: data.pageSize,
                pageNumber: data.pageNumber,
                infScroll: data.infScrollable,
                sizeScroll: endIndex - startIndex,
                startIndex: startIndex,
                endIndex: endIndex
            }
        },
        method: 'POST',
        dataType: 'json',
        timeout: 30,
        async: true,
        processData: true,
        scriptsRunFirst: true,
        emulateOnload: true,
        start: true,
        cache: false,
        onsuccess: function (result) {

            console.log(result);
            if (data.infScrollable) {
                data.rows = data.rows.concat(result.rows);
            } else {
                data.rows = result.rows;
            }

            data.totalPages = result.navPageCount;
            data.length = result.length;
            //data.totalPages = data.pageSize ? Math.ceil(result.length / data.pageSize) : 1;
            data.bottomLoader = false;
            data.lists.typeMeasure = Object.assign({}, result.typeMeasureList);
            data.lists.industry = Object.assign({}, result.industryList);
            data.lists.status = Object.assign({}, result.statusList);
        },
        onfailure: function () {
            console.log('no data');
        }
    });


    //  if (endIndex && endIndex > 0) {
    //      let test;
    //     test = Array.from(data.rows);
    //     console.log(typeof test);
    //     data.rows = data.rows.slice(startIndex, endIndex);
    //  }

    // worker.postMessage(message);
}

let timeout;

export function updateData(data, clear) {

    data.bottomLoader = true;
    if (clear) {
        data.rows = [];
    }

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    updateDataWithoutDebounce(data);
    timeout = setTimeout(() => {

    }, 1000);
}