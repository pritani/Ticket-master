import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:''
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        axios.post(`/users/register`,
        formData)
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else {
                this.props.history.push('/account/login')
            }
        })
        .catch((err)=>{
            alert(err)
        })
    }
    render(){
        return(
            <div>
                <h2>Register with us</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">username</label>
                    <input type='text' value={this.state.username} name="username" onChange={this.handleChange} id="username"/><br/><br/>
                    <label htmlFor="name">name</label>
                    <input type='text' value={this.state.name} name="name" onChange={this.handleChange} id="name"/><br/><br/>
                    <label htmlFor="email">email</label>
                    <input type='text' value={this.state.email} name="email" onChange={this.handleChange} id="email"/><br/><br/>
                    <label htmlFor="password">password</label>
                    <input type='password' value={this.state.password} name="password" onChange={this.handleChange} id="password"/><br/><br/>
              <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default Register