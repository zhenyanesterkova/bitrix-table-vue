function checkNumber(num, filter) {
    if (!filter) {
        return true;
    }

    let [left, right] = filter.split(":");

    return (!left || +num >= +left) && (!right || +num <= +right);
}

function checkString(str, filter) {
    if (!filter) {
        return true;
    }

    return str.toLowerCase().includes(filter.toLowerCase());
}

function compareNumber(num1, num2) {
    return num1 - num2;
}

function compareString(str1, str2) {
    if (str1 > str2) {
        return 1;
    } else if (str1 < str2) {
        return -1;
    } else {
        return 0;
    }
}

function compareEmail(email1, email2) {
    const [login1, domain1] = email1.split("@");
    const [login2, domain2] = email2.split("@");

    const firstComparation = compareString(domain1, domain2);
    if (!firstComparation) {
        return compareString(login1, login2);
    }
    return firstComparation;
}

const checkers = {
    id: checkNumber,
    age: checkNumber,
    name: checkString,
    login: checkString,
    email: checkString,
};

const comparators = {
    id: compareNumber,
    age: compareNumber,
    name: compareString,
    login: compareString,
    email: compareEmail,
};

const columns = ["id", "age", "name", "login", "email"];

let data;
let xhr = new XMLHttpRequest();
xhr.open("GET", "data.json");
xhr.responseType = 'json';
xhr.send();
xhr.onload = function () {
    data = xhr.response;
    postMessage("data loaded");
    
}

onmessage = async function (e) {
    const filters = e.data.filters;

    let filtered = data;
    if (filters) {
        filtered = data.filter((item) => {
            for (let column of columns) {
                if (column in filters && !checkers[column](item[column], filters[column])) {
                    return false;
                }
            }
            return true;
        });
    }

    const sorts = e.data.sorts;
    const sortsOrder = e.data.sortsOrder;

    let sorted = filtered;
    if (sortsOrder && sortsOrder.length) {
        sorted.sort((item1, item2) => {
            for (let column of sortsOrder) {
                const comparationRes = comparators[column](item1[column], item2[column]);
                if (comparationRes) {
                    return sorts[column] === "inc" ? comparationRes : comparationRes * -1;
                }
            }
            return 0;
        });
    }

    const length = sorted.length

    const startIndex = e.data.startIndex ?? 0;
    const endIndex = e.data.endIndex;

    let rows = sorted;
    if (endIndex && endIndex > 0) {
        rows = rows.slice(startIndex, endIndex);
    }

    postMessage({ rows, length });
}