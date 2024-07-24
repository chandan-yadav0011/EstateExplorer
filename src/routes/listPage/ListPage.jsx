import React from 'react';
import { listData } from  '../../lib/dummyData';
import './ListPage.scss'
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map'


function ListPage(props) {

    const data= listData;

  


    return (
        <div className='listPage'>
            <div className='listContainer'>
                <div className='wrapper'>

                    {/* here we have our data filter section */}
                    <Filter/>
                    {/* there are multiple cards for each filter */}
                  

                    {   
                        data.map((item)=>(
                         
                            <Card key={item.id} item={item}/>
                        ))  
                    }

                </div>
            </div>

            <div className='mapContainer'>
                <Map items={data}/>
            </div>
                    
        </div>
    );
}

export default ListPage;