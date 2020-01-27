import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom' 
class CustomerList extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[]
        }
    }
    componentDidMount(){
        axios.get('/customers',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customers=response.data
            console.log(response.data)
            this.setState({customers})
           
        })
    }
    handleRemove=(id)=>{
        axios.delete(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            this.setState(prevState=>({
customers:prevState.customers.filter(customer=>customer._id !== response.data._id)
            }))
        })
    }

    render(){
        return(
            <div>
<h1>Listing customers-{this.state.customers.length}</h1>
<ul>
    {this.state.customers.map(customer=>{
        return <li key={customer._id}><Link to={`/customers/${customer._id}`}> {customer.name }</Link>-
         - {customer.email} - {customer.mobile} -
        <Link to={`/customers/${customer._id}`}>show</Link>
        <button onClick={()=>{
            this.handleRemove(customer._id)
        }}>remove</button>
        </li>
    })}
</ul>
<Link to="customers/new">Add Customer</Link>
            </div>    
        )
    }
}
export default CustomerList