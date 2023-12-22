import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getTickets, reset } from "../features/ticket/ticketSlice";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  console.log({ tickets });
  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset());
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets?.tickets?.map((item) => {
          return <TicketItem key={item._id} ticket={item} />;
        })}
      </div>
    </>
  );
};

export default Tickets;
