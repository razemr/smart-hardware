import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { urlRegex } from "../../utils/app-regex";
import { ADD, EDIT } from '../../utils/app-const';

export const AdminDashboard = () => {
    let { getProducts, products, addProduct, deleteProduct, editProduct } = useContext(GlobalContext);
    const [searchText, setSearchText] = useState('')
    const [viewDialog, setViewDialog] = useState(false);
    const [dialogType, setDialogType] = useState(ADD);

    useEffect(() => {
        getProducts({
            q: searchText ? searchText : '',
            _page: 1,
            _limit: 20
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required'),
        defaultImage: Yup.string().matches(urlRegex).required('Invalid url')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            price: 0,
            discount: 0,
            defaultImage: '',
            images: '',
            id: null
        },
        validationSchema,
        onSubmit: (values) => {
            if(dialogType === ADD) {
                addProduct({
                    name: values.name,
                    price: values.price,
                    discount: values.discount,
                    defaultImage: values.defaultImage,
                    images: values.images
                });
            }

            if(dialogType === EDIT) {
                editProduct({
                    name: values.name,
                    price: values.price,
                    discount: values.discount,
                    defaultImage: values.defaultImage,
                    images: values.images
                }, values.id);
            }
            
            closeDialog();
        }
    });

    function closeDialog() {
        formik.resetForm();
        setViewDialog(false);
    }

    function openAddDialog() {
        setDialogType(ADD);
        setViewDialog(true);
    }

    function openEditDialog(product) {
        formik.setValues(product)
        setDialogType(EDIT);
        setViewDialog(true);
    }

    return (
        <>
        <div className="admin-panel">
            <div className="main-actions">
                <input type="text" placeholder="Search" onChange={event => setSearchText(event.target.value)}></input>
                <button onClick={event => openAddDialog()}>Add Product</button>
            </div>
            <table id="admin-table">
                <thead>
                    <tr>
                        <th>
                        Id 
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Price  
                        </th>
                        <th>
                            Discount
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    {products.map(p => 
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>${p.price}</td>
                        <td>-${p.discount}</td>
                        <td>
                            <div className="actions">
                                <button className="edit" onClick={event => openEditDialog(p)}>edit</button>
                                <button className="remove" onClick={event => deleteProduct(p.id)}>remove</button>
                            </div>
                        </td>
                    </tr>)} 
                </tbody>
                
            </table>
        </div>
        
        { viewDialog && 
        
        <div id="add-product">
            <form onSubmit={formik.handleSubmit}>
                <div className="close"><button onClick={event => closeDialog()}>x</button></div>
                { dialogType === ADD && <h3>New Product</h3> }
                { dialogType === EDIT && <h3>Edit Product</h3> }
                <div className="form-control">
                    <label>Name:</label>
                    <input type="text" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
                </div>
                <div className="form-control">
                    <label>Price</label>
                    <input type="number" id="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.errors.price && formik.touched.price ? <div className="error">{formik.errors.price}</div> : null}
                </div>
                <div className="form-control">
                    <label>Discount</label>
                    <input type="number" id="discount" value={formik.values.discount} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                </div>
                <div className="form-control">
                    <label>Default Image Url:</label>
                    <input type="text" id="defaultImage" value={formik.values.defaultImage} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.errors.defaultImage && formik.touched.defaultImage ? <div className="error">{formik.errors.defaultImage}</div> : null}
                </div>
                <div className="form-control">
                    <label>Image Urls:</label>
                    <textarea id="images" value={formik.values.images} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
                </div>
                <div className="footer">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={event => closeDialog()}>Cancel</button>
                </div>
            </form>
        </div>}
        
        </>
    );
}