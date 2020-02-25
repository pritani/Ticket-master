import React from 'react'
import {Link} from 'react-router-dom'
function Navigation(props){
return(
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Ticket Master</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <div class="navbar-nav">
        <Link to="/" class="nav-item nav-link">Home</Link>
        <Link to="/customers" class="nav-item nav-link">Customers</Link>
        <Link to="/departments" class="nav-item nav-link">Departments</Link>
        <Link to="/employees" class="nav-item nav-link">employees</Link>
        <Link to="/tickets" class="nav-item nav-link">Tickets</Link>
        </div>
  </div>
</nav>
)
}
export default Navigation