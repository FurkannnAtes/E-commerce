import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "@/helpers/Api";
import EditForm from "./components/EditForm";
import { useSelector } from "react-redux";
import LoadingModal from "@/components/LoadingModal";

const EditProduct = () => {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    getSingleProduct(params.id).then((res) => {
      setData(res);
      if (user.userId !== res.sellingBy._ref) {
        navigate("/");
      }
      setShowLoading(false);
    });
  }, [navigate, params.id, user.userId]);

  return (
    <div className="wrapper  mx-auto py-5 flex">
      {showLoading ? <LoadingModal /> : <EditForm data={data} />}
    </div>
  );
};

export default EditProduct;
