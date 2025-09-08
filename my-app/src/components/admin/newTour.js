

import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewTour } from "../../actions/tourAction";
import { clearError, clearTourCreated } from "../../slices/tourSlice";


export default function NewTour() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [availableSpots, setAvailableSpots] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, isTourCreated ,error} = useSelector(state => state.tourState);
    const categories = [
        'Historical',
        'Adventure',
        'Nature',
        'Cultural',
        'Beach',
        'Mountain',
        'Wildlife',
        'City Tour',
        'Heritage',
        'Religious',
        'Eco-Tourism',
        'Cruise'
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
        formdata.append('category', category);
        formdata.append('availableSpots', availableSpots);
        images.forEach(image => {
            formdata.append('images', image)
        })

        dispatch(createNewTour(formdata))
    }


    useEffect(() => {
        if (isTourCreated) {
            toast('Tour Created Successfully', {
                type: 'success',
                position: "top-center",
                onOpen: () => { dispatch(clearTourCreated()) }
            })
            navigate('/admin/tours')
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

    }, [isTourCreated, error, dispatch])


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">New Tour</h1>

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
                                <label htmlFor="price_field">Maximum Spots</label>
                                <input type="number" id="price_field" min="1" max="100" className="form-control" onChange={e => setAvailableSpots(e.target.value)} value={availableSpots} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                    <option value="">Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
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
                            {imagesPreview.map(image => (
                                <img className="mt-3 mr-2" key={image} src={image} alt={`Images Preview`} width="55" height="52" />
                            ))}


                            <button id="login_button" type="submit" disabled={loading} className="btn btn-block py-3">
                                CREATE
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}