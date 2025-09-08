import { Link } from "react-router-dom";


export default function Tour({ tour, col }) {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={tour?.images[0]?.image || "/images/noImage.jpeg"} 
                    alt={tour?.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                    <Link to={`/tour/${tour?._id}`}>{tour?.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${tour?.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({tour?.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text">Rs.{tour?.price}</p>
                    <Link to={`/tour/${tour?._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}