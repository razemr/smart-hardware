import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ADMIN_PRODUCT_QUERY_LIMIT } from "../../utils/app-const";
import { Filter } from "../shared/Filter";
import { useFormik } from "formik";
import * as Yup from "yup";
import { urlRegex } from "../../utils/app-regex";

export const AdminDashboard = () => {
  const { getProducts, products, deleteProduct, addProduct } =
    useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getProducts({
      q: searchText ? searchText : "",
      _page: searchText ? 1 : page,
      _limit: ADMIN_PRODUCT_QUERY_LIMIT,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    defaultImage: Yup.string()
      .matches(urlRegex, { message: "Invalid URL" })
      .required("Default Image Url is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      discount: "",
      defaultImage: "",
      description: "",
      images: "",
      id: null,
    },
    validationSchema,
    onSubmit: (values) => {
      addProduct({
        name: values.name,
        price: values.price,
        discount: values.discount,
        description: values.description,
        defaultImage: values.defaultImage,
        images: values.images,
      });

      formik.resetForm();
      setAdding(false);
    },
  });

  function saveNewProduct() {
    formik.submitForm();
  }

  function cancelNewProduct() {
    formik.resetForm();
    setAdding(false);
  }

  return (
    <>
      <div id="admin-container">
        <div className="action-bar">
          <Filter
            onPageChange={setPage}
            onSearchChange={setSearchText}
            page={page}
            limit={ADMIN_PRODUCT_QUERY_LIMIT}
          />
          <button
            className="btn-primary"
            onClick={(event) => setAdding(true)}
            style={{visibility: adding ? "hidden" : "visible"}}
          >
            New Product
          </button>
        </div>

        <form>
          <table id="admin-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr style={{visibility: adding ? "visible" : "collapse"}}>
                <td></td>
                <td>
                  <div class="table-control">
                    <input
                      type="text"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                    {formik.errors.name && formik.touched.name ? (
                      <div className="error">{formik.errors.name}</div>
                    ) : null}
                  </div>
                </td>
                <td>
                  <div class="table-control">
                    <input
                      id="description"
                      type="text"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                  </div>
                </td>
                <td>
                  <div className="table-control">
                    <input
                      type="number"
                      min="0"
                      id="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                    {formik.errors.price && formik.touched.price ? (
                      <div className="error">{formik.errors.price}</div>
                    ) : null}
                  </div>
                </td>
                <td>
                  <div className="table-control">
                    <input
                      type="number"
                      min="0"
                      id="discount"
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                  </div>
                </td>
                <td>
                  <div class="table-control">
                    <input
                      type="text"
                      id="defaultImage"
                      value={formik.values.defaultImage}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                    {formik.errors.defaultImage &&
                    formik.touched.defaultImage ? (
                      <div className="error">{formik.errors.defaultImage}</div>
                    ) : null}
                  </div>
                </td>
                <td>
                  <div className="actions">
                    <svg
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                      onClick={saveNewProduct}
                    >
                      <path d="M 24.085938 33.445313 L 14.417969 24.429688 L 15.78125 22.96875 L 23.914063 30.550781 L 44.296875 6.433594 C 43.011719 4.945313 41.117188 4 39 4 L 11 4 C 7.132813 4 4 7.132813 4 11 L 4 39 C 4 42.867188 7.132813 46 11 46 L 39 46 C 42.867188 46 46 42.867188 46 39 L 46 11 C 46 10.007813 45.789063 9.0625 45.414063 8.203125 Z" />
                    </svg>
                    <svg
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                      onClick={cancelNewProduct}
                    >
                      <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z" />
                    </svg>
                  </div>
                </td>
              </tr>

              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>${p.price}</td>
                  <td>-${p.discount}</td>
                  <td>{p.defaultImage}</td>
                  <td>
                    <div className="actions">
                      <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                      >
                        {" "}
                        <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z" />
                      </svg>

                      <svg
                        onClick={(event) => deleteProduct(p.id)}
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                      >
                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};
