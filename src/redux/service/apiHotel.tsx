import axios from '../../config/http-common'

const getCardHotel = async()=>{
    try{
        const result = await axios.get('/hotel/card')
        return result
    }catch(err){
        return err
    }
}

const ApiHotel ={
    getCardHotel
}

export default ApiHotel