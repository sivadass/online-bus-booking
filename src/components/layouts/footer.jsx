import Typography from "../core/typography";
const Footer = () => {
  return (
    <footer className="bg-slate-200 py-5 flex justify-center">
      <Typography>
        <span>
          &copy; 2023 <a href="/">OBB - Online Bus Booking</a>.
        </span>
        <span>&nbsp; All rights reserved.</span>
      </Typography>
    </footer>
  );
};

export default Footer;
