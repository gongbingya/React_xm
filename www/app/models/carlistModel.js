import fp from "lodash/fp";
import { fetchCarServer } from "./utils/carlistUtil.js";
export default {
    "namespace":"carlist",
    "state":{
        "nowfilters":[
        ],
        "cars":[],
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
        changeCars(state,{cars}){
            return fp.set("cars",cars,state)
        },
        changeFilter(state,{k,v}){
            return fp.set("nowfilters",fp.map(item=>item.k == k ? fp.set("v",v,item) : item,state.nowfilters),state)
        },
        addFilter(state,{k,v}){
            var nowfilters = fp.clone(state.nowfilters);
            nowfilters.push({k,v});
            return fp.set("nowfilters",nowfilters,state);
        },
        removeFilerSync(state,{k}){
            return fp.set("nowfilters",fp.filter(item=>item.k != k, state.nowfilters),state);
        },
        // 改变分页
        changePagination(state,{total = state.pagination.total, pagesize= state.pagination.pagesize , page = state.pagination.page }){
            return fp.set("pagination",{total,pagesize,page},state)
        },
        // 改变排序
        changeSorter(state,{sortby = state.sorter.sortby, sortdirection= state.sorter.sortdirection }){

            return fp.set("sorter",{sortby,sortdirection},state)
        }
    },
    "effects":{
        //初始化
        *init(action,{put,call,select}){

            yield call(fetchCarServer,select,put)
        },
        *addOrChangeFiler({k,v},{put,call,select}){
           // 现在先得到 当前的过滤器，nowfilters
           var {nowfilters} = yield select((state)=>state.carlist);

           // 判断是否已经有k为过来的k这项了。
           var isflag = false; //默认就是没有的
            for (var i = 0; i < nowfilters.length; i++) {

                if(nowfilters[i].k == k){
                    isflag = true;
                }
            };
            // 若存在
            if(isflag){
                yield put({"type":"changeFilter",k,v})
            }else{
                // 这项不存在
                yield put({"type":"addFilter",k,v})
            };
            // 页码归1
            yield put({"type":"changePagination",page:1});

            yield call(fetchCarServer,select,put);
        },
        *removeFiler({k},{put,call,select}){
            // 删除brand的时候，车系一并删除
            if( k == "brand"){
                yield put({"type":"removeFilerSync",k:"series"});
            };
             yield put({"type":"removeFilerSync",k})
             // 页码归1
             yield put({"type":"changePagination",page:1});

             yield call(fetchCarServer,select,put);
        },
        *changeSort({sortby,sortdirection},{put,call,select}){
            // 先得到 carlist中的条件
            var { sorter } = yield select((state)=>state.carlist);
            //  判断 当前的排序和之前的排序是否1一样
            if( sorter.sortby != sortby || sorter.sortdirection != sortdirection){
                // 只要排序了,一定要返回第一页
                yield put({"type":"changePagination",page:1});
                // 改变排序
                yield put({"type":"changeSorter",sortby,sortdirection})

            };
            // 拉取新的数据
            yield call(fetchCarServer,select,put);
        },
        *changePage({page,pagesize},{put,call,select}){
            // 先得到 pagination 中的条件
            var { pagination } = yield select((state)=>state.carlist);
            if( pagination.pagesize != pagesize ){
                // 改变pagination
                page = 1;
            };
            if( pagination.page != page || pagination.pagesize != pagesize){
                // 改变pagination
                yield put({"type":"changePagination",page,pagesize});
            };
            // 拉取新的数据
            yield call(fetchCarServer,select,put);
        }
    }

}

