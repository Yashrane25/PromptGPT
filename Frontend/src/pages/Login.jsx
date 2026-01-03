import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext.jsx"; //add .jsx
import "./Style.css";

const Login = () => {
  // const { login } = useContext(MyContext);
  const { login} = useContext(MyContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // alert("Logged in successfully!");
      navigate("/chat");
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
