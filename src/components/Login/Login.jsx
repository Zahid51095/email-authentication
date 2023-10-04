import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] = useState("");
    const emailRef = useRef(null);



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
            if(result.user.emailVerified){
                setSuccess("Welcome Abroad");
            }
            alert('Please verify your email address.')
        })
        .catch(error => {
            console.error(error);
            setRegisterError(error.message);
        })

       
    }



    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log('please provide an email', emailRef.current.value);
            return;
        }
        else if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
        {
            console.log('pls write a valid email');
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email');
        })
        .catch(error => {
            console.log(error);
        })
       
    }



  return (

        

  <div>
    <p>New to this website? Please <Link to='/register'>Register</Link></p>
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
                ref={emailRef}
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
                <a onClick={handleForgetPassword } href="#" className="label-text-alt link link-hover">
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

  </div>
  );
};

export default Login;
