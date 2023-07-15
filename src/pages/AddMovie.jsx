import axios, { formToJSON } from "axios";
import React, { useEffect, useRef, useState } from "react";
import FileUploadImage from "../assets/file-upload-img.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


const baseURL = "http://localhost:3000"

const AddMovie = () => {
  const [imageFile, setImageFile] = useState("");
  const fileRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
        showWarning()
        setTimeout(() => {
            navigate('/login')
        }, 3000);
    }
  }, [])

  const handleFileImage = (event, setFieldValue) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
    fileRef.current = event.target.files[0];
    setFieldValue("imageFile", fileRef.current);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      //   console.log(values);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("ticket_price", parseFloat(values.price));
      formData.append("age_rating", values.age_rating);
      formData.append("poster_url", fileRef.current.name);
      formData.append("image_file", fileRef.current);
      console.log(formToJSON(formData));
      const response = await axios.post(
        `${baseURL}/movies`,
        formToJSON(formData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        }
      );

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.log("Error Axios Found : ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const showWarning = () => {
    toast.warn('Please Login or Register first!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    })
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <ToastContainer />
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new movie
        </h2>
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: 0,
            age_rating: "",
            file_upload: "",
            imageFile: "",
          }}
          onSubmit={handleSubmit}>
          {({
            isSubmitting,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Movie Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter The Movie Title"
                    required
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="age_rating"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Age Rating
                  </label>
                  <Field
                    as="select"
                    id="age_rating"
                    name="age_rating"
                    value={values.age_rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value="Default">Select category</option>
                    <option value="G">General Audience</option>
                    <option value="PG">Parental Guidance</option>
                    <option value="PG-13">Parents Strongly Cautioned</option>
                    <option value="R">Restricted</option>
                    <option value="NC-17">No One 17 and Under Admitted</option>
                    <option value="Unrated">Unrated</option>
                  </Field>
                  <ErrorMessage
                    name="age_rating"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </label>
                  <Field
                    type="number"
                    name="price"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={35000}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={8}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                    defaultValue={""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="sm:col-span-2 my-4">
                <label
                  htmlFor="file_upload"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  File Upload Banner Movie
                  <Field
                    type="file"
                    id="file_upload"
                    name="file_upload"
                    rows={8}
                    className="hidden p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                    defaultValue={""}
                    onChange={(event) => handleFileImage(event, setFieldValue)}
                  />
                  <div className="my-2 rounded-xl outline outline-green-200">
                    <img
                      src={imageFile}
                      alt="File Upload"
                      className="mx-auto"
                      width={400}
                    />
                  </div>
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default AddMovie;
