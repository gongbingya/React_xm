import fp from "lodash/fp";
export default {
    "namespace":"addCar",
    "state":{
        "step":0,
        "form0":{},
        "form1":{},
        "form2":[],
    },
    reducers:{
        changeStep(state,{step}){

            return fp.set("step",step,state)
        },
        changeForm0(state,{form0}){
            return fp.set("form0",form0,state)
        },
        changeForm1(state,{form1}){
            return fp.set("form1",form1,state)
        },
        addForm2(state,{fileinfo}){
            return fp.set("form2",[
                    ...state.form2,
                    fileinfo
                ],state)
        }
    }
}
