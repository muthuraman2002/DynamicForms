import React from 'react';
// import { use } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
     const navigate=useNavigate()
  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <div>
        <button  onClick={()=>{ navigate("/add/from")}}/>
      </div>
    </div>
  );
};

export default Home;
