import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getTickets, reset } from "../features/ticket/ticketSlice";

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
    dispatch(getTickets);
  }, [dispatch, isSuccess]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div>
      <h1>Tickets</h1>
    </div>
  );
};

export default Tickets;
