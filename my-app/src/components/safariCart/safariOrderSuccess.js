import { Link } from "react-router-dom";

export default function SafariOrderSuccess() {
    return (
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200"
                    height="200" />

                <h2>Your Safari Booking has been confirmed.</h2>

                <Link to={'/safariBookings'}>Go to Bookings</Link>
            </div>

        </div>
    )
}