import React from 'react'
class CustomerForm extends React.Component{
constructor(props){
    console.log('form constructor')
    super(props)
    this.state={
        name:props.name?props.name:'',
        email:props.email?props.email:'',
        mobile:props.mobile?props.mobile:''
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
        name:this.state.name,
        email:this.state.email,
        mobile:this.state.mobile
    }
   // console.log(formData)
    this.props.handleSubmit(formData)
}
    render(){
        console.log('form render')
        return(
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">name</label>
            <input type='text' value={this.state.name} name="name" onChange={this.handleChange} id="name"/><br/><br/>
            <label htmlFor="email">email</label>
            <input type='text' value={this.state.email} name="email" onChange={this.handleChange} id="email"/><br/><br/>
            <label htmlFor="mobile">mobile</label>
            <input type='mobile' value={this.state.mobile} name="mobile" onChange={this.handleChange} id="mobile"/><br/><br/>
      <input type="submit"/>
        </form>
        )
    }
}
export default CustomerForm