export const fetchCarInfo =  function*( nowid , put) {

    const {result} =  yield fetch(`/carinfo/${nowid}`).then(data=>data.json())

     return result;

}

export const fetchCarLikes = async ( nowid ) =>{

    const {results} =  await fetch(`/carlike/${nowid}`).then(data=>data.json())

    return results;
}

export const fetchCarImages = async ( nowid ) =>{

    const {images} =  await fetch(`/carimages/${nowid}`).then(data=>data.json())

    return images;
}