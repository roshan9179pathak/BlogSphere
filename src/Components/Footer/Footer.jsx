import React from "react";
import {Container} from '../index'
import logo from './blog.png'
import './footer.css'
import {Link} from 'react-router-dom'

export default function Footer() {
  
  return (
  <Container>
    <section className={`h-12 ${`forSection`} sticky bottom-0 z-50`}>
    
      <Link 
      to={`https://github.com`}
      className={`cursor-pointer w-8 ${'icon'}`}
      target="blank"
      >
      
      <img src={logo} alt="Error" 
      className="w-11" />
      </Link>

      <div
      className={`${'mainContainer'}`}
      >
         <Link>Home</Link>
         <Link>GitHub</Link>
         <Link>AllPost</Link>
         <Link>AddPost</Link>
          
          </div>

    </section>
    </Container>
  );
}
