import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
class EmployeeShow extends React.Component{
    constructor(){
        super()
        this.state={
            employee:{}
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employee=response.data
            console.log(employee)
            this.setState({employee})
        })
    }
    render(){
        return(
            <div>
                <h1>Employee Show</h1>
                <p>{this.state.employee.name}-{this.state.employee.mobile}
        -{this.state.employee.email}-{this.state.employee.department?this.state.employee.department.name:'n/a'}</p>
           <Link to={`/employees/edit/${this.props.match.params.id}`}>edit</Link>
            <Link to="/employees">back</Link>
            </div>

        )
    }
}
export default EmployeeShow