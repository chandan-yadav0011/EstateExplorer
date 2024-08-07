import './LoginPage.scss'
import { Link } from "react-router-dom";
import apiRequest from '../../lib/apiRequest';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Login() {

    const[error,setError] = useState("");
    const[isLoading,setIsLoading] = useState(false);

    const {updateUser} = useContext(AuthContext);

    const navigate = useNavigate();


    const handleSubmit =  async(e)=>{
       setError("");
        setIsLoading(true);
        e.preventDefault();

        const formData= new FormData(e.target);
        
      
        const username= formData.get('username');
        const password= formData.get('password');

        //API CALL FOR LOGIN
        try{
            const res = await apiRequest.post("/auth/login",{
            
                username,
                password
            })
            console.log(res);
           
         updateUser((res.data));
          navigate('/');  
          
        }
        catch(err)
        { 
            console.log(err);
            setError(err.message);
        }
        finally{
            setIsLoading(false);
        }
        
    }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" type="password" required placeholder="Password" />
          <button disabled={isLoading}>Login</button>

          {error && 
              <span>{error}</span>
          }

          <Link to="/register">{"Don't"} you have an account?</Link>

        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;