import React from "react";
import {Container} from '../index'
import logo from './blog.png'
import './footer.css'
import {Link} from 'react-router-dom'

export default function Footer() {
  
  return (
  <Container>
    <section className={`h-12 ${`forSection`} sticky bottom-0 z-50`}>
    
      
      
      <img src={logo} alt="Error" 
      className="w-10" />
     

      <div
      className={`${'mainContainer'}`}
      >
         <Link to='' >Home</Link>
         <Link to='https://github.com/roshan9179pathak/BlogSphere'>GitHub</Link>
         <Link to= '/all-posts' >AllPost</Link>
         <Link to='/add-post'>AddPost</Link>
          
          </div>

    </section>
    </Container>
  );
}
