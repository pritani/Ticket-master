import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './Form'
class EmployeeEdit extends React.Component{
    constructor(){
        console.log('edit constructor')
        super()
        this.state={
            employee:{}
        }
    }
    handleSubmit=(formData)=>{
        axios.put(`/employees/${this.props.match.params.id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employee=response.data
            console.log(employee)
            this.props.history.push(`/employees/${employee._id}`)
        })
    }
    componentDidMount(){
        console.log('edit ComponentDidmount')
        const id=this.props.match.params.id
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')}
            })
 .then(response=>{
const employee=response.data
console.log(employee)
this.setState({employee})
     })
            .catch(err=>{
                alert(err)
            })
    
        }
    render(){
        
    console.log('edit render')
        return(
            <div>
                <h2>Edit employee </h2>
                {Object.keys(this.state.employee).length!=0 && <EmployeeForm 
                {...this.state.employee}
                handleSubmit={this.handleSubmit}
                />}

            </div>
        )
    }

}
export default EmployeeEdit