import React from 'react'
import DepartmentForm from './Form'
import axios from '../../config/axios'
class DepartmentList extends React.Component{
    constructor(){
        super()
        this.state={
            departments:[]
        }
    }
    componentDidMount(){
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
.then(response=>{
    console.log(response.data)
    const departments=response.data
    this.setState({departments})
})
    }

    
    handleSubmit=(formData)=>{
        axios.post('/departments',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            const department=response.data //new dept created-object
            this.setState(prevState=>({
                departments:prevState.departments.concat(department)
            }))
        
        })
    }
    render(){
        return(
            <div>
                <h1>Listing Departments-{this.state.departments.length}</h1>
            <ul>
                {this.state.departments.map(department=>{
                    return <li key={department._id}>{department.name} </li>
                })}
            </ul>
                <DepartmentForm handleSubmit={this.handleSubmit}/>
                </div>
        )
    }
}
export default DepartmentList