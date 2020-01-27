
import React from 'react' 
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
class TicketList extends React.Component{
    constructor(){
        console.log('ticket constructor')
        super()
        this.state={
            tickets:[],
            customers:[],
            departments:[],
            employees:[]
        }
    }
    componentDidMount(){
        console.log('ticket componentDidMount')
        axios.get(`/tickets`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            const tickets=response.data
            this.setState({tickets})
        })
        //customer axios
axios.get(`/customers`,{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
})
.then(response=>{
    console.log(response.data)
    const customers=response.data
    this.setState({customers})
})
//employee axios
axios.get(`/employees`,{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
})
.then(response=>{
    console.log(response.data)
    const employees=response.data
    this.setState({employees})
})
//department axios
axios.get(`/departments`,{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
})
.then(response=>{ 
    console.log(response.data)
    const departments=response.data
    this.setState({departments})
})



    }
    handleRemove=(id)=>{
        axios.delete(`/tickets/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            this.setState(prevState=>({
                tickets:prevState.tickets.filter(ticket=>ticket._id !==response.data._id)
            }))
        })
    }
    render(){
        console.log('ticket render')
console.log(this.state.tickets) // first time-[]..2nd time-
        return(
            <div>
                <h1>Listing Tickets</h1>
                <ul>
                    {this.state.tickets.map(ticket=>{
                        return <li key={ticket._id}>{ticket.code}--
                        {this.state.customers.length>0 &&
                          this.state.customers.find((c)=>{
                            return c._id===ticket.customer}).name}
                            --
                            {this.state.departments.length>0 &&
                        this.state.departments.find((dept)=>{
                         return dept._id==ticket.department}).name
                    }--
                    {/*this.state.employees.length>0 &&
                    this.state.employees.find((emp)=>{
                        return emp._user==ticket.employees}).name

                    })
                        
                */}
            
                    --
                    {ticket.message}--
                        {ticket.priority}--<Link to={`tickets/${ticket._id}`}>Show</Link>
                        <button onClick={()=>{
                            this.handleRemove(ticket._id)
                        }
                        }>remove</button>
                    </li>
                    })}
                </ul>
                <Link to="/tickets/new">Add Tickets</Link>
            </div>

        )
    }

}
export default TicketList