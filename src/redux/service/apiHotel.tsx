import axios from '../../config/http-common'

const getCardHotel = async()=>{
    try{
        const result = await axios.get('/hotel/card')
        return result
    }catch(err){
        return err
    }
}

const getFaciAllHotel = async()=>{
    try{
        const result = await axios.get('/facility/faciall')
        return result
    }catch(err){
        return err
    }
}

const getHore = async()=>{
    try{
        const result = await axios.get('/hore/alluser')
        return result
    }catch(err){
        return err
    }
}

// GET VIEW HOTEL ADMIN
const getHotelAdmin = async()=>{
    try{
        const result = await axios.get('/hotel/view')
        return result
    }catch(err){
        return err
    }
}

// INSERT HOTEL
const insertHotel = async(data:any)=>{
    try{
        const result = await axios.post('/hotel/insert', data)
        return result
    }catch(err){
        return(err)
    }
}

// delete hotel
const removeHotel = async(id:any)=>{
    try{
        const result = await axios.delete(`hotel/delete/${id}`)
    }catch(err){
        return(err)
    }
}


const ApiHotel ={
    getCardHotel,
    getFaciAllHotel,
    getHore,
    getHotelAdmin,
    insertHotel,
    removeHotel
}

export default ApiHotel