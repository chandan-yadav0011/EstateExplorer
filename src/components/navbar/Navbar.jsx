
import './Navbar.scss'
import { useState } from 'react';

function Navbar(props) {

    const[open,setOpen] = useState(false);

    return (
        <nav>
             <div className='left'>
                <a href='/' className='logo'>
                    <img src='./logo.png'/>
                    <span>REAL ESTATE</span>
                </a>
                <a href='/'>Home</a>
                <a href='/'>About</a>
                <a href='/'>Contact</a>
                <a href='/'>Agents</a>
             </div>

             <div className='right'>
                <a href='/'>Sign in</a>
                <a href='/' className='register'>Sign up</a>
                <div className='menuIcon'>
                    <img 
                     src='/menu.png' 
                     onClick={()=>{setOpen(!open)}}
                     />
                </div>

                {/* note for this menu we are not going to write display none and appear for small screen but actually we are going to change position it is going to be absolute and at begining it is going to be outside our screen and when the icon button is pressed we will change the position of this menu list to appear on the screen */}
                <div className={open? "menu active":"menu"}>   
                    <a href='/'>Home</a>
                    <a href='/'>About</a>
                    <a href='/'>Contact</a>
                    <a href='/'>Agents</a>
                    <a href='/'>Sign in</a>
                    <a href='/'>Sign up</a>
                
                </div>
             </div>
             

        </nav>
    );
}

export default Navbar;