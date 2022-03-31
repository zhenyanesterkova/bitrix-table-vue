let worker;
if (window.Worker) {
    worker = new Worker("data-worker.js");
}

function updateDataWithoutDebounce(data) {
    // В реальном проекте здесь будет обращение к API,
    // у меня здесь ображение к тестовому Web Worker'у
    worker.onmessage = function (e) {
        
        data.rows = data.rows.concat(e.data.rows);
        data.totalPages = data.pageSize ? Math.ceil(e.data.length / data.pageSize) : 1;
        data.bottomLoader = false;
    }
    let startIndex;
    let endIndex;

    if (data.infScrollable) {
        startIndex = data.rows.length;
        endIndex = startIndex ? startIndex + data.infScrollStepSize : data.infScrollStartSize;
    } else if (data.paginable) {
        startIndex = data.pageSize * (data.pageNumber - 1);
        endIndex = startIndex + data.pageSize;
    }

    const message = {
        sorts: data.sorts,
        sortsOrder: data.sortsOrder,
        filters: data.filters,
        startIndex,
        endIndex,
    };
   
    worker.postMessage(message);
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

    timeout = setTimeout(() => {
        updateDataWithoutDebounce(data);
    }, 1000);
}