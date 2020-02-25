import React from 'react'
import Swal from 'sweetalert2'
class DepartmentForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:'' 
        }
    }
        handleChange=(e)=>{
            this.setState({
                [e.target.name]:e.target.value
            })
        }
        handleSubmit=(e)=>{
            e.preventDefault()
            const formData={
                name:this.state.name
            }
            this.props.handleSubmit(formData)
        }

render(){
    return(
        <div>
<h1>Add Department</h1>
            <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                <label>Name</label>
                <input type="text"  value={this.state.name} name="name"
                onChange={this.handleChange} 
                className="form-control"/>
                </div>
                <input type='submit' value='submit' className="btn btn-secondary"/>
            </form>
        </div>
    )
}



}
export default DepartmentForm