import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2' 
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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
             //code
            }
          })
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
    // Swal.fire(
    //     'Deleted!',
    //     'Your file has been deleted.',
    //     'success'
    //   )

    render(){
        return(
            <div>
<h1>Listing customers-{this.state.customers.length}</h1>
<table className="table">
    <thead>
        <tr>
            <th>#</th>
            <th>name</th>
            <th>e-Mail</th>
            <th>mobile</th>
           <th>action</th>
           <th>Remove</th>
        </tr>
    </thead>
    <tbody>
    {
    this.state.customers.map((customer,i)=>{
        return(
            <tr>
<td>{i+1}</td>
<td>{customer.name}</td>
<td>{customer.email}</td>
<td>{customer.mobile}</td>
<td> <Link to={`/customers/${customer._id}`}>show</Link></td>
<td>{<button className="btn btn-danger" onClick={()=>{
            this.handleRemove(customer._id)
}}>remove</button>}</td>
            </tr>
        )
})
    }
    </tbody>
</table>
{/* <ul>
    {this.state.customers.map(customer=>{
        return <li key={customer._id}><Link to={`/customers/${customer._id}`}> {customer.name }</Link>-
         - {customer.email} - {customer.mobile} -
        <Link to={`/customers/${customer._id}`}>show</Link>
        <button onClick={()=>{
            this.handleRemove(customer._id)
        }}>remove</button>
        </li>
    })}
</ul> */}
<Link to="customers/new" className="btn btn-primary">Add Customer</Link>
            </div>    
        )
    }
}
export default CustomerList