import React from 'react'
import axios from 'axios'
class TicketForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
           code:this.props.code?this.props.code:'',
           customer:this.props.customer?this.props.customer:'',
           customers:[],
           department:this.props.department?this.props.departments:'',
           departments:[],
           employees:[],
           employee:[],
           message:this.props.message?this.props.message:'',
           priority:this.props.priority?this.props.priority:''

        }
    }
    // .then(response=>{
    //     const departments=response.data
    //     console.log(response.data)
    //     this.setState({departments})  })
    // .then(response=>{
    //     const customers=response.data
    //     console.log(response.data)
    //     this.setState({customers})
       
    // })
    componentDidMount(){
        axios.all([
            axios.get(`http://dct-ticket-master.herokuapp.com/customers`,{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            }),
        axios.get('http://dct-ticket-master.herokuapp.com/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
    
    ])

    .then(axios.spread((customer,dept)=>{
        this.setState({customers:customer.data,departments:dept.data})
    }))
    .catch(err=>alert(err))
}
       
    //     axios.get(`/employees`,{
    //         headers:{
    //             'x-auth':localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response=>{
    //         const employees=response.data
    //         console.log(response.data)
    //         this.setState({employees})
           
    //     })
    // }
        handleChange=(e)=>{
            this.setState({
               [e.target.name]:e.target.value
            })
        }
        handleDeptChange=(e)=>{
            const department=e.target.value
            this.setState({department})
            axios.get('http://dct-ticket-master.herokuapp.com/emoloyees?',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                const employees=response.data.filter(emp=>emp.department._id===department)
                this.setState({employees})
            })
        }
        handleMultiSelect=(e)=>{
            const employee=[]
            for(let val of e.target.selectedOptions){
                employee.push({_id:val.value})
            }
            console.log(employee)
            this.setState({employee})
        }
        
        handleSubmit=(e)=>{
            e.preventDefault()
            const formData={
                code:this.state.code,
                customer:this.state.customer,
                department:this.state.department,
                employees:this.state.employee,
                message:this.state.message,
                priority:this.state.priority
            }
            this.props.handleSubmit(formData)
        }
    render(){
        console.log(this.props.priority)
        return(
            <div>
                       <form onSubmit={this.handleSubmit}>
            <label htmlFor="code">code</label>
            <input type='text' value={this.state.code} name="code" onChange={this.handleChange} id="code"/>
            <br/><br/>
            <label htmlFor="customer">Customer</label>
            <select name="customer" id="customer" value={this.state.customer}  onChange={this.handleChange} >
            <option>select </option>
            {this.state.customers.map(cus=>{
    return <option key={cus._id} value={cus._id}>{cus.name}</option>
    
})
} 
 </select>

      <br/><br/>

            <label htmlFor="department">Department</label>
            <select name="department"  id="department" value={this.state.department} onChange={this.handleDeptChange} >
            <option>select </option>
            {
            this.state.departments.map(dept=>{
    return <option key={dept._id} value={dept._id}>{dept.name}</option>

               })
              } 
      </select>
      <br/><br/>


      <label htmlFor="employee">Employee</label>
            <select multiple={true} name="employee" id="employee"  onChange={this.handleMultiSelect} >
            <option>select </option>
            {this.state.employees.map(emp=>{
    return <option key={emp._id} value={emp._id}>{emp.name}</option>
    
})
} 
 </select>
      <br/><br/>
      <label htmlFor="message">Message</label><br/>
      <textarea id="message"value={this.state.message} name="message" onChange={this.handleChange}/><br/>

Priority:<br/>
<input type='radio' name='priority' id="high" value='high'checked={this.state.priority==="high"?
true:false} onChange={this.handleChange}/>
<label htmlFor="high">High</label><br/>

<input type='radio' name='priority' id="medium" value='medium' checked={this.state.priority=="medium"?
true:false} onChange={this.handleChange}/>
<label htmlFor="medium">Medium</label><br/>

<input type='radio' name="priority" id="low" value='low' checked={this.state.priority=="low"?true:false}          
onChange={this.handleChange}/>
<label htmlFor="low">low</label><br/>
  <input type="submit" value="add ticket"/>
           </form>
            </div>
        )
    }
}
export default TicketForm