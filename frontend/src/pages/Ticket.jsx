import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../features/ticket/ticketSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const Ticket = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, message, ticket, isError } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(params.ticketId));
  }, [dispatch, isError, message, params.ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    <h1>Something Went Wrong</h1>;
  }

  const onTicketClose = () => {
    dispatch(closeTicket(params.ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket?.ticket?._id}
          <span className={`status status-${ticket?.ticket?.status}`}>
            {ticket?.ticket?.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date().toLocaleString("en-US")}</h3>
        <h3>Product: {ticket?.ticket?.product} </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket?.ticket?.description}</p>
        </div>
      </header>
      {ticket?.ticket?.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
