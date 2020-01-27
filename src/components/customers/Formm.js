import react from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class CustomerForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            mobile:"",

        }
    }
    handleChange=(e)=>{
        this.state({
            [e.target.name]:e.target.value
        })
    }



        handleSubmit=(e)=>
        {
            e.preventDefault()
            const formData={
                name:this.state.name,
                mobile:this.state.mobile,
                email:this.state.email
            }
this.props.handleSubmit(formData)
    }
    render(){
        return(
            <div>
                 <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">name</label>
                    <input type='text' value={this.state.name} name="name" onChange={this.handleChange} id="name"/><br/><br/>
                    <label htmlFor="email">email</label>
                    <input type='text' value={this.state.email} name="email" onChange={this.handleChange} id="email"/><br/><br/>
                    <label htmlFor="mobile">password</label>
                    <input type='mobile' value={this.state.mobile} name="mobile" onChange={this.handleChange} id="mobile"/><br/><br/>
              <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default CustomerForm