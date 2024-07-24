import React from 'react';
import './homePage.scss';
import SearchBar from '../../components/searchBar/SearchBar';

function HomePage(props) {
    return (
        <div className='homePage'>
            <div className='textContainer'> 
                <div className='wrapper'>
                    <h1 className='title'>    
                        Find Real Estate & Get Your Dream Place  
                    </h1>

                    <p>
                    Discover your dream home with EstateExplorer, your trusted partner in real estate. 
                    Whether you are buying, selling, or renting, our extensive listings and expert insights 
                    make finding the perfect property simple and enjoyable. 
                    </p>

                    <SearchBar/>
                    <div className='boxes'>
                        <div className='box'>
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>

                        <div className='box'>
                            <h1>200</h1>
                            <h2>Award gains</h2>
                        </div>

                        <div className='box'>
                            <h1>1200+</h1>
                            <h2>Property Ready</h2>
                        </div>

                    </div>
                </div>
             
            </div>

            <div className='imgContainer'>
                <img src='/bg.png'/>
            </div>
        </div>
    );
}

export default HomePage;