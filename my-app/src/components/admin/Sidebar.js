import {Link, useNavigate} from 'react-router-dom';
import {NavDropdown} from 'react-bootstrap';

export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to='/admin/dashboard'><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    <li>
                        <NavDropdown title={
                            <i className='fa fa-map'>&nbsp;<span> Tour</span></i>
                        }>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/tours')}}><i className='fa fa-globe'> All Tours</i></NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/tours/create')}}><i className='fa fa-plus'> Create</i></NavDropdown.Item>
                             
                        </NavDropdown>
                    </li>
                    <li>
                        <NavDropdown title={
                            <i className='fa fa-bus'>&nbsp;<span> Safari</span></i>
                        }>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/safaris')}}><i className='fa fa-globe'> All Safaris</i></NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/safaris/create')}}><i className='fa fa-plus'> Create</i></NavDropdown.Item>
                             
                        </NavDropdown>
                    </li>

                    <li>
                        <NavDropdown title={
                            <i className='fa fa-credit-card'>&nbsp;<span> Bookings</span></i>
                        }>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/orders')}}><i className='fa fa-building'> Tour Bookings</i></NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/safariOrders')}}><i className='fa fa-car'> Safari Bookings</i></NavDropdown.Item>
                             
                        </NavDropdown>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <NavDropdown title={
                            <i className='fa fa-pencil'>&nbsp;<span> Reviews</span></i>
                        }>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/reviews')}}><i className='fa fa-comments'> Tour Reviews</i></NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate('/admin/safariReviews')}}><i className='fa fa-comments'> Safari Reviews</i></NavDropdown.Item>
                             
                        </NavDropdown>
                    </li>

                </ul>
            </nav>
        </div>
    )
}