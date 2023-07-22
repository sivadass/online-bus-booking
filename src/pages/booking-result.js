import { useNavigate } from "react-router-dom";
import Button from "../components/core/button";
import Typography from "../components/core/typography";

const BookingResultPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="container m-auto min-h-[calc(100vh-136px)] flex items-center">
      <div className="bg-slate-50 p-10 rounded-lg flex-1 m-auto text-center">
        <img src="/check-mark.svg" className="m-auto" alt="Success" />
        <Typography variant="h1" className="mt-10 mb-2 text-center">
          Booking Confirmed!
        </Typography>
        <Typography className="mb-10 text-center">
          Please check your inbox for digital copy of your ticket(s)!
        </Typography>
        <div className="flex">
          <Button
            className="secondary mx-auto max-w-[300px]"
            onClick={() => handleBackToHome()}
          >
            Go to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingResultPage;
