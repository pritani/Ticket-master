import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class CustomerList extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[]
        }
    }
    componentDidMount(){
        axios.get(`http://dct-ticket-master.herokuapp.com/customers`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
        })
    }

    render(){
        return(
        <div>
<ul>
    {this.state.customers.map(customer=>{
        return(
           < li key={customer._id}>
             <Link to={`/customers/${customer._id`}>
        {customer.name}</Link>
        -{customer.mobile} {customer.email}
        <Link to={`/customers/${customer._id}`}>Show</Link>
        </li>
    )
    })}
</ul>
<Link to="/customers/new">Add Customer</Link>
            </div>
        )
    }



}
export default CustomerList