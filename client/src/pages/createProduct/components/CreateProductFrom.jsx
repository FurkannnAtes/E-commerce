import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { client } from "@/utils/client";
import { AiOutlineClose } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateProductFrom = () => {
  const [productPhotos, setProductPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  //Upload image
  const uploadImage = (e) => {
    setIsLoading(true);
    const selectedFile = e.target.files[0];

    const fileTypes = ["image/png", "image/jpg", "image/webm"];
    if (fileTypes.includes(selectedFile.type)) {
      if (productPhotos.length !== 4) {
        client.assets
          .upload("image", selectedFile, {
            contentType: "image/png",
            filename: "someText.png",
          })
          .then((document) => {
            setProductPhotos([...productPhotos, document.url]);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Upload failed:", error.message);
            setIsLoading(false);
          });
      } else {
        errorForm("Max Image limit 4");
        setIsLoading(false);
      }
    } else {
      errorForm("Wrong Type");
      setIsLoading(false);
    }
  };
  //delete Image
  const deletePhoto = (e, i) => {
    const newPhotoList = productPhotos;
    setProductPhotos(newPhotoList.filter((item, index) => index !== i - 1));
  };
  const formik = useFormik({
    initialValues: {
      caption: "",
      price: "",
      topic: "",
      description: "",
      pictures: "",
      brand: "",
      stock: "",
    },
    validationSchema: Yup.object({
      caption: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      price: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      topic: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      description: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      pictures: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      brand: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      stock: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const uniqueId = uid();

      await client.create({
        _key: uniqueId,
        _type: "product",
        caption: values.caption,
        subId: uniqueId,
        price: values.price,
        topic: values.topic,
        description: values.description,
        picture: productPhotos,
        brand: values.brand,
        stock: values.stock,
        sellingBy: {
          _type: "sellingBy",
          _ref: user.userId,
        },
        likes: [],
      });
      formik.resetForm();
      setProductPhotos([]);
      setIsLoading(false);
      navigate(`/myProducts/${user.userId}`);
    },
  });

  const errorForm = (message) => toast.error(message);
  return (
    <div className="flex gap-5 items-center w-full">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        className="flex flex-col gap-2 h-fit border p-2 shadow-md bg-lightGray  w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-3xl font-semibold ">Create Product</div>

        <div className="flex flex-col gap-2">
          <label htmlFor="caption">Caption</label>
          <input
            id="caption"
            name="caption"
            type="caption"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.caption}
            className="h-[40px] outline-none p-2"
          />
          {formik.touched.caption && formik.errors.caption ? (
            <div className="text-red-400">{formik.errors.caption}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="55"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="h-[40px] outline-none p-2"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-400">{formik.errors.price}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            name="topic"
            type="topic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.topic}
            className="h-[40px] outline-none p-2"
          />
          {formik.touched.topic && formik.errors.topic ? (
            <div className="text-red-400">{formik.errors.topic}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="h-[40px] outline-none p-2"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-400">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pictures">Pictures</label>
          <input
            id="pictures"
            name="pictures"
            type="file"
            onChange={(e) => {
              formik.handleChange(e);
              uploadImage(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.pictures}
            className="h-[40px] outline-none p-2"
          />
          {formik.touched.pictures && formik.errors.pictures ? (
            <div className="text-red-400">{formik.errors.pictures}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            name="brand"
            type="brand"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
            className="h-[40px] outline-none p-2"
          />
          {formik.touched.brand && formik.errors.brand ? (
            <div className="text-red-400">{formik.errors.brand}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock}
            className="h-[40px] outline-none p-2"
          />
          {formik.touched.stock && formik.errors.stock ? (
            <div className="text-red-400">{formik.errors.stock}</div>
          ) : null}
        </div>

        <button
          className="bg-[#27C007] text-white font-semibold text-lg h-[40px]  flex items-center justify-center"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <ImSpinner2 className="animate-spin" /> : "Create"}
        </button>
      </form>
      <div className="w-1/2 h-full rounded-md overflow-hidden">
        {productPhotos?.length !== 0 ? (
          <div className="flex items gap-5">
            {productPhotos?.map((picture, i) => (
              <div key={i} className="w-full relative group">
                <img className="w-full h-full" key={i} src={picture} alt="" />
                <div className="text-9xl font-semibold  text-lightGray absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgb(0,0,0,0.2)] opacity-0 group-hover:opacity-100 ">
                  {(i += 1)}
                </div>
                <div>
                  <button
                    onClick={(e) => deletePhoto(e, i)}
                    className="bg-black text-white text-4xl rounded-full absolute top-3 right-3"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <img className="h-full w-full" src="/assets/defaultImg.jpg" alt="" />
        )}
      </div>
    </div>
  );
};

export default CreateProductFrom;