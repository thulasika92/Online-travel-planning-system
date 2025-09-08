import {Fragment, useEffect} from 'react';
import MetaData from '../layouts/MetaData';
import {MDBDataTable} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/safariOrderAction';
import { Link } from 'react-router-dom';

export default function UserSafariOrders(){
    const {userOrder = {}} = useSelector(state => state.safariOrderState)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(userOrdersAction)
    },[dispatch])


    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }); // Outputs: 30-Mar-2025
    };

    const setOrders = (userOrder)=> {

        const sortedOrders = [...userOrder].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const data ={
            columns:[
                {
                    label: "Booking ID",
                    field: 'id',
                    sort: "asc"
                },{
                    label: "Booked date",
                    field: 'bookedDate',
                    sort: "desc"
                },{
                    label: "Number Of Safaris",
                    field: 'numOfSafaris',
                    sort: "asc"
                },{
                    label: "Total Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: 'Payment Status',
                    field: 'paymentStatus',
                    sort: 'asc'
                },{
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },{
                    label: "Actions",
                    field: 'actions',
                    sort: "asc"
                }
            ],
            rows: []
        }

        userOrder.forEach(booking => {
            data.rows.push({
                id: booking._id,
                bookedDate: formatDate(booking.createdAt),
                numOfSafaris: booking.safaris.length,
                amount: `Rs.${booking.totalAmount}`,
                paymentStatus: booking.paymentStatus === 'Verified' ?
                (<p style={{ color: 'green' }}>{booking.paymentStatus}</p>) :
                (<p style={{ color: 'red' }}>{booking.paymentStatus}</p>),
                status: booking.status && booking.status.includes('Confirmed') ? 
                (<p style={{color:'green'}}>{booking.status}</p>):
                (<p style={{color:'red'}}>{booking.status}</p>),
                actions: <Link to={`/safariBooking/${booking._id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link>
            })
        })

        return data
    }



    return(
        <Fragment> 
            <MetaData title='My Bookings' />
            <h1 className='mt-5'>My Safari Bookings</h1>
            <MDBDataTable
                className='px-3'
                bordered
                striped
                hover
                data={setOrders(userOrder)}
            />
        </Fragment>
    )
}