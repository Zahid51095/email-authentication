import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password, accepted);

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
    else if(!accepted) {
        setRegisterError('Please accept our terms and conditions!')
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User created successfully");

        sendEmailVerification(result.user)
        .then(() =>{
            alert('Please check your email and verify your account')
        })
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
        <p>Already have an account? Please <Link to='/login'>Login</Link></p>
      {registerError && <p className="text-red-700">{registerError}</p>}
      {success && <p className="text-green-700">{success}</p>}
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl mb-4">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full py-2 px-4 "
            type="email"
            name="email"
            placeholder="Email Address"
            id=""
            required
            style={{ border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <br />
         <div className="mb-4 relative">
         <input
            className=" w-full py-2 px-4"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            id=""
            required
            style={{ border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <span className="absolute top-3 right-2" onClick={ () => setShowPassword(!showPassword)}>
            {
                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
            }
          </span>
         </div>
          <br />
          <div className="mb-2">
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2" htmlFor="terms">Accept our <a href="">Terms and Conditions</a></label>
          </div>
          <br />
          <input
            className="btn btn-secondary mb-4 w-full"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
