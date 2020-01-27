import React from 'react'
import axios from'../../config/axios'
import EmployeeForm from './Form'


class EmployeeNew extends React.Component{
    handleSubmit=(formData)=>{
        axios.post('http://dct-ticket-master.herokuapp.com/employees',formData,{
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
              this.props.history.push('/employees')
          }
        })
    }

    render(){
        return(
            <div>
                <h1>Add Employee</h1>
                <EmployeeForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default EmployeeNew