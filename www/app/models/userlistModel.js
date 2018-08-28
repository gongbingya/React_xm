import fp from "lodash/fp";
import { fetchUserServer } from "./utils/userlistUtil.js";
export default {
    "namespace":"userlist",
    "state":{
        "users":[],
        "keyword":"",
        "pagination":{
            "total":0,
            "pagesize":10, //每页的条数
            "page":1 // 当前的page页数
        },
        "sorter":{
            "sortby":"id" ,// 按id排序
            "sortdirection":"ascend"// 升序
        }
    },
    "reducers":{
        changeUsers(state,{users}){
            return fp.set("users",users,state)
        },
        // 改变分页
        changePagination(state,{total = state.pagination.total, pagesize= state.pagination.pagesize , page = state.pagination.page }){
            return fp.set("pagination",{total,pagesize,page},state)
        },
        // 改变排序
        changeSorter(state,{sortby = state.sorter.sortby, sortdirection= state.sorter.sortdirection }){

            return fp.set("sorter",{sortby,sortdirection},state)
        },
        // 改变关键字
        changeKeywordsync(state,{keyword}){
            return fp.set("keyword",keyword,state);
        }
    },
    "effects":{
        //初始化
        *init(action,{put,call,select}){

            yield call(fetchUserServer,select,put)
        },
        *changeSort({sortby,sortdirection},{put,call,select}){
            // 先得到 carlist中的条件
            var { sorter } = yield select((state)=>state.userlist);
            //  判断 当前的排序和之前的排序是否1一样
            if( sorter.sortby != sortby || sorter.sortdirection != sortdirection){
                // 只要排序了,一定要返回第一页
                yield put({"type":"changePagination",page:1});
                // 改变排序
                yield put({"type":"changeSorter",sortby,sortdirection})

            };
            // 拉取新的数据
            yield call(fetchUserServer,select,put);
        },
        *changePage({page,pagesize},{put,call,select}){
            // 先得到 pagination 中的条件
            var { pagination } = yield select((state)=>state.userlist);
            if( pagination.pagesize != pagesize ){
                // 改变pagination
                page = 1;
            };
            if( pagination.page != page || pagination.pagesize != pagesize){
                // 改变pagination
                yield put({"type":"changePagination",page,pagesize});
            };
            // 拉取新的数据
            yield call(fetchUserServer,select,put);
        },
        // 改变关键字
        *changeKeyword({keyword},{put,call,select}){
            // 只要排序了,一定要返回第一页
            yield put({"type":"changePagination",page:1});
            // 同步上去
            yield put({"type":"changeKeywordsync",keyword});
            // 拉取新的数据
            yield call(fetchUserServer,select,put);
        }
    }

}

