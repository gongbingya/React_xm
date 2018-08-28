function* fetchServer (select,put){

    var { keyword } = yield select((state)=>state.userlist);
    var { pagination:{pagesize,page} } = yield select((state)=>state.userlist);
    var { sorter:{sortby,sortdirection} } = yield select((state)=>state.userlist);

    // 发送fetch请求

    var {results,total} = yield fetch(`/owners?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}&keyword=${keyword}`).then(data=>data.json());

    yield put({"type":"changeUsers","users":results});
    yield put({"type":"changePagination",total});
}




export const fetchUserServer = fetchServer;