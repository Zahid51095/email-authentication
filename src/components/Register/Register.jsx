import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password must be 6 characters long.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one upper case character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccess("User created successfully");
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      {registerError && <p className="text-red-700">{registerError}</p>}
      {success && <p className="text-green-700">{success}</p>}
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl mb-4">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-3/4 py-2 px-4 "
            type="email"
            name="email"
            placeholder="Email Address"
            id=""
            required
          />
          <br />
          <input
            className="mb-4 w-3/4 py-2 px-4"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            id=""
            required
          />
          <span onClick={ () => setShowPassword(!showPassword)}>
            {
                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
            }
          </span>
          <br />
          <input
            className="btn btn-secondary mb-4 w-3/4"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
