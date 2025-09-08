import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, clearSafariUpdated } from "../../slices/safariSlice";
import { getSafari, updateSafari } from "../../actions/safariAction";



export default function UpdateSafari() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);
    const {id:safariId} = useParams();

    const { loading, isSafariUpdated, error, safari } = useSelector(state => state.safariState);
    const vehicleTypes = [
        'Hiking',
        'Jeep',
        'Bus',
        'Boat',
        'Bike'
    ];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState == 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('price', price);
        formdata.append('description', description);
        formdata.append('vehicleType', vehicleType);
        images.forEach(image => {
            formdata.append('images', image)
        })
        formdata.append('imagesCleared', imagesCleared);

        dispatch(updateSafari(safariId ,formdata))
    }

    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }


    useEffect(() => {
        if (isSafariUpdated) {
            toast('Safari Updated Successfully', {
                type: 'success',
                position: "top-center",
                onOpen: () => { dispatch(clearSafariUpdated()) }
            })
            setImages([])
            navigate('/admin/safaris')
            return;
        }
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
       
        dispatch(getSafari(safariId))

    }, [isSafariUpdated, error, dispatch, safariId])

    useEffect(() => {
        if (safari._id) {
            setName(safari.name);
            setPrice(safari.price);
            setDescription(safari.description);
            setVehicleType(safari.vehicleType);
            let images = [];

            safari.images.forEach(image => {
                images.push(image.image)
            })

            setImagesPreview(images);
        }

    }, [safari])


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Updated Safari</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input type="text" id="name_field" onChange={e => setName(e.target.value)} className="form-control" value={name} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input type="text" id="price_field" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control" id="description_field" rows="8" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Vehicle Type</label>
                                <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="form-control" id="category_field">
                                    <option value="">Select</option>
                                    {vehicleTypes.map(vehicleType => (
                                        <option key={vehicleType} value={vehicleType}>{vehicleType}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input type='file' name='product_images' className='custom-file-input' id='customFile' multiple onChange={onImagesChange} />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                            </div>
                            {imagesPreview.length > 0 && <span className="mr-2" onClick={clearImagesHandler} style={{cursor: "pointer"}}><i className="fa fa-trash"></i></span>}
                            {imagesPreview.map(image => (
                                <img className="mt-3 mr-2" key={image} src={image} alt={`Images Preview`} width="55" height="52" />
                            ))}


                            <button id="login_button" type="submit" disabled={loading} className="btn btn-block py-3">
                                UPDATE
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}