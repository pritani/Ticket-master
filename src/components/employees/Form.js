import React from 'react'
import axios from '../../config/axios'

class EmployeeForm extends React.Component{
    constructor(props){
        console.log('form constructor')
        super(props)
        this.state={
            name:props.name?props.name:'', 
            email:props.email?props.email:'',
            mobile:props.mobile?props.mobile:'',
            department:props.department?props.department:'',
            departments:[]
        }
    }
    componentDidMount(){
        axios.get(`/departments`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const departments=response.data
        
            this.setState({departments})
           
        })
        
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        }) 
}

handleSubmit=(e)=>{
e.preventDefault()
const formData={
    name:this.state.name,
    email:this.state.email,
    mobile:this.state.mobile,
    department:this.state.department,
    
}
this.props.handleSubmit(formData)
}
    render(){
        console.log('form render')
        console.log(this.state.departments)
        return(
            <div>
                  <form onSubmit={this.handleSubmit}>
           <div className="form-group">
            <label htmlFor="name">name</label>
            <input type='text' value={this.state.name} name="name" onChange={this.handleChange} id="name"/><br/><br/>
            </div>
            <label htmlFor="email">email</label>
            <input type='text' value={this.state.email} name="email" onChange={this.handleChange} id="email"/><br/><br/>
           
            <label htmlFor="mobile">mobile</label>
            <input type='mobile' value={this.state.mobile} name="mobile" onChange={this.handleChange} id="mobile"/><br/><br/>
           
            <label>department</label>
            <select name="department" value={this.state.department} onChange={this.handleChange} >
            <option value="">select </option>
            {this.state.departments.map((dept)=>{
    return(
    <option key={dept._id} value={dept._id}>{dept.name}</option>
    )
})
} 
      </select><br/>
      <input type="submit"/>
        </form>

            </div>
        )
    }
}
export default EmployeeForm