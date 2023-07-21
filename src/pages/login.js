import Button from "../components/core/button";

const LoginPage = () => {
  return (
    <div className="container">
      <h1>Login</h1>
      <input type="text" placeholder="Enter mobile number" />
      <Button type="submit">SUBMIT</Button>
    </div>
  );
};

export default LoginPage;
