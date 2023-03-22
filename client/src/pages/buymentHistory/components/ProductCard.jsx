import "react-toastify/dist/ReactToastify.css";
import { AiFillStar } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";

import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useSelector } from "react-redux";
import { leaveAComment, getSingleProduct } from "@/helpers/Api";
import { uid } from "uid";
import { ImSpinner2 } from "react-icons/im";

const ProductCard = ({ item }) => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderCard, setRenderCard] = useState(1);
  const [temp, setTemp] = useState("");
  const [commentKey, setCommentKey] = useState("");
  const [hasComment, setHasComment] = useState([]);
  const [star, setStar] = useState(0);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getSingleProduct(item.product._id).then((res) =>
      setHasComment(res.comments)
    );
  }, [item.product._id, renderCard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const comment = {
      _key: uid(),
      commentKey: commentKey,
      userName: user.userName,
      caption,
      comment: description,
      star: parseInt(star),
      userId: user.userId,
    };
    setModal(false);
    leaveAComment(temp, comment).then(() => {
      setTemp("");
      setStar(0);
      setCaption("");
      setDescription("");
      setIsLoading(false);
      setRenderCard(renderCard + 1);
    });
  };

  return (
    <div className="flex flex-col  w-full  rounded-lg shadow-lg border overflow-y relative">
      <div className="bg-lightGray flex justify-between gap-2 items-center p-4 ">
        <div className="flex items-center gap-2">
          <div>
            <img
              className="w-10 h-10 rounded-md"
              src="/assets/logo.png"
              alt=""
            />
          </div>
          <div className="font-semibold text-lg">Ofenos</div>
        </div>
        {hasComment?.find((i) => i.commentKey === item._key) ? (
          <div className="flex">
            <ReactStars
              count={5}
              value={hasComment?.find((i) => i.commentKey === item._key).star}
              edit={false}
              size={24}
              color2={"#ffd700"}
              className="select-none"
            />
          </div>
        ) : (
          <button
            onClick={() => {
              setModal(true);
              setTemp(item.product._id);
              setCommentKey(item._key);
            }}
            className="flex group  items-end gap-2 text-lg  font-semibold"
          >
            <div>Evaluate</div>

            <AiFillStar className="text-2xl group-hover:text-yellow-300 " />
          </button>
        )}
      </div>
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          <div className="h-[100px] w-[100px]">
            <img
              className="w-full h-full object-contain"
              src={item.product.picture[0]}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <div>{item.product.caption}</div>
            <div>
              <span className="font-semibold">Amount: </span>
              {item.amount}
            </div>
            <div>
              <span className="font-semibold">Brand: </span>
              {item.product.brand}
            </div>
            <div>
              <span className="font-semibold">Bought on this date: </span>
              {item.date.slice(0, 10)}
            </div>
          </div>
        </div>
        <div className="flex  gap-2 items-center text-3xl mr-5">
          <div>
            {parseInt(item.product.price) * item.amount}
            <span className="text-green-400">$</span>{" "}
          </div>
        </div>
      </div>
      {modal ? (
        <div className="fixed  z-[40] left-0 top-0 backdrop-blur-sm flex items-center justify-center w-screen h-screen select-none">
          <div className="bg-white min-w-[340px] rounded-lg pt-10 pb-5 px-5 border z-50 flex flex-col relative">
            <div className="absolute top-2 right-2">
              {" "}
              <button onClick={() => setModal(false)}>
                <GrFormClose className="text-3xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold">Caption</div>
                <input
                  className="outline-none px-2 rounded-md w-full h-[40px] border"
                  maxLength={20}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold">Description</div>
                <input
                  className="outline-none px-2 rounded-md w-full h-[40px] border"
                  maxLength={300}
                  value={description}
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl font-semibold">Leave a star:</div>
                <div className="flex">
                  <ReactStars
                    count={5}
                    value={star}
                    onChange={(e) => setStar(e)}
                    size={24}
                    color2={"#ffd700"}
                    className="select-none"
                  />
                </div>
              </div>
              <button
                className="w-full rounded-md text-white py-2 font-semibold bg-green-400"
                type="submit"
              >
                Submit Your Comment
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {isLoading ? (
        <div className="fixed z-[999] left-0 top-0 backdrop-blur-sm flex items-center justify-center w-screen h-screen select-none">
          <div className="bg-white rounded-lg p-5 border">
            <div className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin text-5xl text-mainRed" />
            </div>
            <div className="font-semibold text-lg">
              Please wait, the process continues
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCard;
