import { Link } from "react-router-dom";


export default function Safari({safari}) {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-4 my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={safari?.images[0]?.image || "/images/noImage.jpeg"} 
                    alt={safari?.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                    <Link to={`/safari/${safari?._id}`}>{safari?.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${safari?.ratings / 5 * 100}%` }}></div>
                        </div>
                        {/* <span id="no_of_reviews">({tour?.numOfReviews} Reviews)</span> */}
                    </div>
                    <p className="card-text">Rs.{safari?.price}</p>
                    <Link to={`/safari/${safari?._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}