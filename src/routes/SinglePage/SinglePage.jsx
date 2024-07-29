import React from 'react';
import Slider from '../../components/slider/Slider';
import { singlePostData, userData } from '../../lib/dummyData';
import './SinglePage.scss'
import Map from '../../components/map/Map';

function SinglePage(props) {
    return (
        <div className='singlePage'>
                <div className='details'>
                    <div className='wrapper'>
                        <Slider images={singlePostData.images}/>

                        {/* info section here we have two div s top and bottom and the top div is flex- column and bottom is flex-row */}

                        <div className='info'>
                            <div className='top'> 
                            {/* this contains two div s first one being post information that is about the title and location and the Second one being user Information that is profile pic, name, etc */}
                                <div className='post'>
                                    {/* contains title, address and price */}
                                    <h1>{singlePostData.title}</h1>


                                    <div className='address'>
                                        <img src='/pin.png' alt=''/>        {/* this is icon of location pin*/ }
                                        <span>{singlePostData.address}</span>
                                    </div>


                                    <div className='price'>
                                        $ {singlePostData.price}
                                    </div>

                                </div>

                                <div className='user'>

                                        <img src={userData.img} alt=''/>
                                        <span>{userData.name}</span>


                                </div>

                            </div>

                            <div className='bottom'>
                                {singlePostData.description}
                            </div>
                        </div>
                    </div>


                </div>
                <div className='features'>
                        <div className='wrapper'>
                            <p className='title'>General</p>

                                <div className='listVertical'>
                                    <div className='feature'>
                                        {/*List of general features i.e utility, pet policy, property fee  */}
                                        <img src='/utility.png' alt=""/>
                                        <div className='featureText'>
                                            <span>Utilities</span>
                                            <p>Renter is responsible</p>
                                        </div>
                                    </div>

                                    <div className='feature'>
                                        <img src='/pet.png' alt=""/>
                                        <div className='featureText'>
                                            <span>Pet Policy</span>
                                            <p>Pets allowed</p>
                                        </div>
                                    </div> 

                                    <div className='feature'>
                                        <img src='/fee.png' alt=""/>
                                        <div className='featureText'>
                                            <span>Property Fee</span>
                                            <p>Must have 3x the rent in total household income</p>
                                        </div>
                                    </div>
                                </div>  

                            <p className='title'>Sizes</p>
                                <div className='sizes'>
                                    <div className='size'>
                                        <img src='/size.png'></img>
                                        <span>80 sqft</span>
                                    </div>
                              

                               
                                    <div className='size'>
                                        <img src='/bed.png'></img>
                                        <span>2 beds</span>
                                    </div>
                                    
                                

                                    <div className='size'>
                                        <img src='/bathroom.png'></img>
                                        <span>1 bathroom</span>
                                    </div>
                                    
                                </div>


                                <p className='title'>Nearby Places</p>
                                <div className='listHorizontal'>

                                    <div className='feature'>
                                        <img src='/school.png' alt=""/>
                                        <div className='featureText'>
                                            <span>School</span>
                                            <p>250m away</p>
                                        </div>
                                    </div>

                                    <div className='feature'>
                                        <img src='/pet.png' alt=""/>
                                        <div className='featureText'>
                                            <span>Bus Stop</span>
                                            <p>100m away</p>
                                        </div>
                                    </div>

                                    <div className='feature'>
                                        <img src='/restaurant.png' alt=""/>
                                        <div className='featureText'>
                                            <span>Restaurant</span>
                                            <p>200m away</p>
                                        </div>
                                    </div>


                                </div>

                                
                            <p className='title'>Location</p>
                                <div className='mapContainer'>
                                    <Map items={[singlePostData]}/>
                                </div>
                                
                                <div className='buttons'>
                                    <button>
                                        <img src='/chat.png' alt=''/>
                                        Send a Message
                                    </button>

                                    <button>
                                        <img src='/save.png' alt=''/>
                                        Save the Place
                                    </button>
                                </div>
                        </div>
                </div>
        </div>  
    );
}

export default SinglePage;