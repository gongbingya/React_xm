function* fetchServer (select,put){

    var { nowfilters } = yield select((state)=>state.carlist);
    var { pagination } = yield select((state)=>state.carlist);
    var { sorter } = yield select((state)=>state.carlist);

    // 发送fetch请求

    var {results,total} = yield fetch("/carsearch",{
        "method":"POST",
        "headers":{'Content-Type':'application/json'},
        "body":JSON.stringify({
            nowfilters,
            pagination,
            sorter
        })
    }).then(data=>data.json());

    yield put({"type":"changeCars","cars":results});
    yield put({"type":"changePagination",total});
}




export const fetchCarServer = fetchServer;