import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'


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
                <table className="table">
    <thead>
        <tr>
            <th>#</th>
            <th>name</th>
            <th>e-Mail</th>
            <th>mobile</th>
            <th>Department</th>
           <th>action</th>
           <th>Remove</th>
        </tr>
    </thead>
    <tbody>
    {
    this.state.employees.map((emp,i)=>{
        return(
            <tr>
<td>{i+1}</td>
<td>{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.mobile}</td>
<td>{emp.department?emp.department.name:'n/a'}</td>
<td> <Link to={`/employees/${emp._id}`}>show</Link></td>
<td>{<button className="btn btn-danger" onClick={()=>{
            this.handleRemove(emp._id)
}}>remove</button>}</td>
            </tr>
        )
})
    }
    </tbody>
</table>
                {/* <ul>
                    {this.state.employees.map(emp=>{
                        return <li key={emp._id}>{emp.name}-{emp.email}
                        -{emp.mobile}-{emp.department.name}-
                        <Link to={`/employees/${emp._id}`}>Show</Link>
                        <button onClick={()=>{
                            this.handleRemove(emp._id)
                        }}>remove</button>
                        </li>
                    })}
               
                </ul> */}
                <Link to='/employees/new'>Add Employee</Link>
            </div>
        )
    }
}
export default EmployeeList