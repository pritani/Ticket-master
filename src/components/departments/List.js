import React from 'react'
import DepartmentForm from './Form'
import axios from '../../config/axios'
import Swal from 'sweetalert2'
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
            if(response.data.hasOwnProperty('errors')){
Swal.fire('Opps!!','There was an error submitting form','error')
            }
            else{
           // console.log(response.data)
            const department=response.data //new dept created-object
            this.setState(prevState=>({
                departments:prevState.departments.concat(department)
            }))
            Swal.fire('Good Jobs!!','successfully added department','success')
            }
        })
    }
    handleRemove=(id)=>{
        axios.delete(`/departments/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            this.setState(prevState=>({
departments:prevState.departments.filter(dept=>dept._id !== response.data._id)
            }))
        })
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-8">
                <h1>Listing Departments-{this.state.departments.length}</h1>
                
            <ul className="list-group">
                {this.state.departments.map(department=>{
                    return <li className="list-group-item" key={department._id}>
                        <span className="text-uppercase">{department.name}</span>
                    <button className="btn btn-danger btn-sm float-right"
                   onClick={()=>{
            this.handleRemove(department._id)}}
           >Remove</button>
                    </li>
                })}
            </ul>
            </div>
            <div className="col-md-4">
                <DepartmentForm handleSubmit={this.handleSubmit}/>
                </div>
      </div>
        )
    }
}
export default DepartmentList