import fp from "lodash/fp";
import { fetchCarInfo , fetchCarLikes , fetchCarImages } from "./utils/picshowUtil.js";
export default {
    "namespace":"picshow",
    "state":{
        nowid : 0 ,// 图集的文件夹的id
        nowalbum:"view", // engine \ more \ inner
        nowidx:0 ,// 当前图集 所在的图片的索引值
        carinfo : null,  // 当前图集车的基本信息
        carlikes : [], //  当前图集车的推荐车
        carimages:{} //当前汽车图集
    },
    "reducers":{
        changeCarinfo(state,action){
            return fp.set("carinfo",action.carinfo,state)
        },
        changeCarlikes(state,action){
            return fp.set("carlikes",action.carlikes,state)
        },
        changeCarimages(state,action){
            return fp.set("carimages",action.carimages,state)
        },
        changeNowid(state,action){
            return fp.set("nowid",action.nowid,state)
        },
        changeNowAlbumSync(state,action){
            return fp.set("nowalbum",action.nowalbum,state)
        },
        changenowidxSync(state,action){

            return fp.set("nowidx",action.nowidx,state)
        }
    },
    "effects":{
        //初始化
        *init({nowid},{put,call}){
            // 改变图片的文件夹id
           yield put({"type":"changeNowid",nowid});

        // 若你改变id的时候，图集不是在view的话，或小缩略图不是滴1张的话，请修改到view图集的第1张
            yield put({"type":"changeNowAlbum","nowalbum":"view"});

           const carinfo = yield call(fetchCarInfo,nowid);
           // 改变carinfo
           yield put({"type":"changeCarinfo",carinfo});

           const carlikes = yield call(fetchCarLikes,nowid);
           // 改变carlikes
           yield put({"type":"changeCarlikes",carlikes});

           const carimages = yield call(fetchCarImages,nowid);
           // 改变carimages
           yield put({"type":"changeCarimages",carimages})

        },
        *changeNowAlbum(action,{put,call}){
            yield put({"type":"changenowidxSync","nowidx":0});
            yield put({"type":"changeNowAlbumSync","nowalbum":action.nowalbum});
        },
        *changenowidx({nowidx},{put,call}){
            yield put({"type":"changenowidxSync",nowidx});
        },
        *goPrev(action,{put,call,select}){
            // 获取state中的数据是用select
            const {nowidx,nowalbum,carimages} = yield select((state)=>state.picshow);
            if( nowidx > 0){
                yield put({"type":"changenowidxSync","nowidx":nowidx-1});
            }else{
                if(nowalbum != "view"){
                    // 现在需要按数组的书记顺序执行
                    const arr = ["view","inner","engine","more"];
                    const nowarridx = arr.indexOf(nowalbum);

                    yield put({"type":"changeNowAlbum","nowalbum":arr[nowarridx-1]});
                    // 同时让他从上一个图集的最后一张图显示
                    yield put({"type":"changenowidx","nowidx":carimages[arr[nowarridx -1]].length-1});
                }else{
                    // 若现在是more图集，后面没有图片，此时返回view
                    yield put({"type":"changeNowAlbum","nowalbum":"more"});
                    yield put({"type":"changenowidx","nowidx":carimages["more"].length-1});
                }
            }
        },
        *goNext(action,{put,call,select}){
            // 获取state中的数据是用select
            const {nowidx,nowalbum,carimages} = yield select((state)=>state.picshow);
            if( nowidx < carimages[nowalbum].length -1){
                yield put({"type":"changenowidxSync","nowidx":nowidx+1});
            }else{
                if(nowalbum != "more"){
                    // 现在需要按数组的书记顺序执行
                    const arr = ["view","inner","engine","more"];
                    const nowarridx = arr.indexOf(nowalbum);

                    yield put({"type":"changeNowAlbum","nowalbum":arr[nowarridx+1]});
                }else{
                    // 若现在是more图集，后面没有图片，此时返回view
                    yield put({"type":"changeNowAlbum","nowalbum":"view"});
                }
            }
        },
        *clearCarImages(action,{put,call}){
            // 改变carImages
           yield put({"type":"changeCarimages",carimages:{}});
        }
    }
}