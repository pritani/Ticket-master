import React from 'react'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Users/Register'
import Login from './components/Users/Login'
import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import CustomerEdit from './components/customers/Edit'
import DepartmentList from './components/departments/List'
import EmployeeList from './components/employees/List'
import EmployeeNew from  './components/employees/New'
import EmployeeShow from './components/employees/Show'
import EmployeeEdit from './components/employees/Edit'
import TicketList from './components/tickets/List'
import TicketNew from './components/tickets/New'
import TicketShow from './components/tickets/Show'
function App(props){
  console.log(props)
  const handleLogout=()=>{
    localStorage.removeItem('authToken')//first remove the token and go to the login 
    window.location.href='/account/login'
  }
  return(
    <BrowserRouter>
    <div>
      <h1>Ticket Master</h1>
      <Link to="/">Home</Link>
      {
        localStorage.getItem('authToken')?
        (
          <div>
            <Link to="/customers">Customer </Link>
            <Link to="/departments">Departments </Link>
            <Link to="/employees"> Employees </Link>
            <Link to="/tickets">Tickets</Link>
        <Link to="#" onClick={handleLogout}>Logout</Link>
      
            </div>
        )
    :
    (
      <div>{/*localStorage does not have token*/}{/* conditional rendering,if the localStorage have the token[login]and show link logout*/}
       <Link to="/account/login">Login</Link>
      <Link to="/account/register">Register</Link>
    
     </div>
     )
}
<Switch>
      <Route path="/" component={Home} exact={true}/>
      <Route path="/account/register" component={Register} />
      <Route path="/account/login" component={Login} />
      <Route path="/customers" component={CustomerList} exact={true}/>
      <Route path="/customers/new" component={CustomerNew}/>
      <Route path="/customers/edit/:id" component={CustomerEdit}/>
      <Route path="/customers/:id" component={CustomerShow}/>
      <Route path="/departments" component={DepartmentList} exact={true}/>
      <Route path="/employees" component={EmployeeList} exact={true}/>
      <Route path="/employees/new" component={EmployeeNew}/>
      <Route path="/employees/edit/:id" component={EmployeeEdit}/>
      <Route path="/employees/:id" component={EmployeeShow}/>
      <Route path="/tickets" component={TicketList} exact={true}/>
      <Route path="/tickets/new" component={TicketNew}/>
      <Route path="/tickets/:id" component={TicketShow}/>
      
      </Switch>
      </div>
      </BrowserRouter>
  )
}
export default App