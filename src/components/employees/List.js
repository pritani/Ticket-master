import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'



class EmployeeList extends React.Component{
    constructor(){
        super()
        this.state={
            employees:[]
        }
    }
    componentDidMount(){
        axios.get('/employees',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employees=response.data
            console.log(response.data)
    this.setState({employees})
   
        })
    }
    handleRemove=(id)=>{
        axios.delete(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            this.setState(prevState=>({
                employees:prevState.employees.filter(emp=>emp._id != response.data._id)
            }))
        })
    }

    render(){
        return(
            <div>
                <h1>Listing Employees-{this.state.employees.length}</h1>
                <ul>
                    {this.state.employees.map(emp=>{
                        return <li key={emp._id}>{emp.name}-{emp.email}
                        -{emp.mobile}-{emp.department.name}-
                        <Link to={`/employees/${emp._id}`}>Show</Link>
                        <button onClick={()=>{
                            this.handleRemove(emp._id)
                        }}>remove</button>
                        </li>
                    })}
               
                </ul>
                <Link to='/employees/new'>Add Employee</Link>
            </div>
        )
    }
}
export default EmployeeList