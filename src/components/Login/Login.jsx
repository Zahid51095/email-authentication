import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";

const Login = () => {
    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] = useState("");



    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setRegisterError("");
        setSuccess("");

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            setSuccess("Welcome Abroad");
        })
        .catch(error => {
            console.error(error);
            setRegisterError(error.message);
        })
    }



  return (
        

    <div className="hero min-h-screen bg-base-200">
     
      <div className="hero-content flex-col lg:flex-row-reverse">
      <div>
        {registerError && <p className="text-red-700">{registerError}</p>}
         {success && <p className="text-green-700">{success}</p>}
        </div>
        
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
       
          <div className="card-body">
         
           <form onSubmit={handleLogin}>
           <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
           </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
