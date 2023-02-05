import axios from '../../config/http-common'

const getCardHotel = async()=>{
    try{
        const result = await axios.get('/hotel/card')
        return result
    }catch(err){
        return err
    }
}

const getCardId = async (id:any)=>{
    try{
        const result = await axios.get(`/hotel/card/${id}`)
        return result
    }catch(err){
        return err
    }
}

const ApiHotel ={
    getCardHotel,
    getCardId
}

export default ApiHotel