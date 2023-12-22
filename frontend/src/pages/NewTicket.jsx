import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createTicket, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url={"/"} />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={user?.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="EMAIL">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={user?.email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Mackbook pro">Makbook pro</option>
              <option value="iMack">iMack</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
        </form>
        <div className="form-group">
          <label htmlFor="description">Description of the issue</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-block" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default NewTicket;
