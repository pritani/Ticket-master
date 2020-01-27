import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
class TicketShow extends React.Component{
    constructor(){
        super()
        this.state={
            ticket:{}
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/tickets/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const ticket=response.data
            this.setState({ticket})
        })
 

    }
    render(){
        return(
            <div>
                <h1>Ticket Show</h1>
                <p>Code Number-{this.state.ticket.code}<br/> 
                <strong>employee ID's</strong><br/>
                {this.state.ticket.employees?this.state.ticket.employees.map((emp,i)=><span key={emp._id}>
{i+1}.{emp._id}<br/></span>):''}
                customer- {this.state.ticket.customer}<br/>
                department-{this.state.ticket.department}<br/>employees-{this.state.ticket.employees}<br/>
               message-{this.state.ticket.message}<br/>priority-{this.state.ticket.priority}</p>
                <Link to="/tickets">back</Link>
            </div>
        )
    }
}
export default TicketShow