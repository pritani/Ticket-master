
import React from 'react' 
import axios from 'axios'
import {Link} from 'react-router-dom'

class TicketList extends React.Component{

    constructor(){
        console.log('ticket constructor')
        super()
        this.state={
            tickets:[],
            departments:[],
            employees:[]
        }
    }
    componentDidMount(){
  console.log('ticket componentDidMount')
        axios.all([
        axios.get('http://dct-ticket-master.herokuapp.com/tickets',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        }),
axios.get('http://dct-ticket-master.herokuapp.com/departments',{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
}),
axios.get('http://dct-ticket-master.herokuapp.com/employees',{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
})
])
.then(axios.spread((ticket,dept,emp)=>{
    this.setState({tickets:ticket.data,departments:dept.data,employees:emp.data})
}))
.catch(err=>alert(err))
    }

    handleRemove=(id)=>{
        axios.delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`,{
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
    handleEmp=(emps)=>{
        console.log()
    }
    render(){
        console.log('ticket render')
console.log(this.state.tickets) // first time-[]..2nd time-
        return(
            <div>
                <h1>Listing Tickets-{this.state.tickets.length}</h1>
                <ul>
                    {
                    this.state.tickets.map(ticket=>{
                        return(
                             <li key={ticket._id}>
                                 {ticket.code}--{ticket.priority}--
                        {/* {this.state.customers.length>0 &&
                          this.state.customers.find((c)=>{
                            return c._id===ticket.customer}).name}
                            -- */}
                            {this.state.departments.length>0 &&
                        this.state.departments.find((dept)=>{
                         return dept._id==ticket.department}).name}
                         <span>{
                             ticket.employees.map(employee=>{
                                 return <span key={employee._id}> {this.state.employees.find(emp=>{
                                     return emp._id===employee._id
                                 }).name},</span>
                             })
                    }
                         </span>
                         {' '}

                    {/*this.state.employees.length>0 &&
                    this.state.employees.find((emp)=>{
                        return emp._user==ticket.employees}).name

                    })
                        
                */}
            
                    <Link to={`/tickets/${ticket._id}`}>Show</Link>
                        <button onClick={()=>this.handleRemove(ticket._id)}>remove</button>
                        <Link to ={`/tickets/edit/${ticket._id}`}><button>Edit</button></Link>
                    </li>
                        )
            })
        }
                    
                </ul>
                <Link to="/tickets/new">Add Tickets</Link>
            </div>

        )
    }

}
export default TicketList