import React from 'react'
import axios from '../../config/axios'
import TicketForm from './form'

class TicketNew extends React.Component{
    
    handleSubmit=(formData)=>{
        axios.post('/tickets',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                this.props.history.push(`/tickets`)

            }
          
        })
    }
    render(){
        return(
        <div>
            <h1>Add Tickets</h1>
            <TicketForm handleSubmit={this.handleSubmit}/>
        </div>
        )
    }
        
}
export default TicketNew