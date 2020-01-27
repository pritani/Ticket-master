import React from 'react'
import axios from '../../config/axios'
import CustomerForm from './Form'
class CustomerEdit extends React.Component{
    constructor(){
        console.log('edit constructor')
        super()
        this.state={
            customer:{}
        }
    }
    handleSubmit=(formData)=>{
        axios.put(`/customers/${this.props.match.params.id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer=response.data
            this.props.history.push(`/customers/${customer._id}`)
            console.log(customer)
        })
    }
    componentDidMount(){
        console.log('edit ComponentDidmount')

        const id=this.props.match.params.id
        axios.get(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer=response.data
            console.log(customer)
            this.setState({customer})
        })
        .catch(err=>{
            alert(err)
        })
    }
render(){
    console.log('edit render')
    return(
        <div>
            <h2>Edit Customer</h2>
          {
          Object.keys(this.state.customer).length!=0 &&  <CustomerForm 
          name={this.state.customer.name}
           email={this.state.customer.email} 
           mobile={this.state.customer.mobile} 
           handleSubmit={this.handleSubmit}
           />
          }
           
        </div>
    )
}

}
export default CustomerEdit