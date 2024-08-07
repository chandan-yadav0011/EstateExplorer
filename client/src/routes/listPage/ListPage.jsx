import './ListPage.scss'
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map'
import { useLoaderData } from 'react-router-dom';


function ListPage() {


    const posts = useLoaderData()
    console.log(posts.data)  

    return (
        <div className='listPage'>
            <div className='listContainer'>
                <div className='wrapper'>

                    {/* here we have our data filter section */}
                    <Filter/>
                    {/* there are multiple cards for each filter */}
                  

                    {   
                        posts.data.map((item)=>(
                         
                            <Card key={item.id} item={item}/>
                        ))  
                    }

                </div>
            </div>

            <div className='mapContainer'>
                <Map items={posts.data}/>
            </div>
                    .
        </div>
    );
}

export default ListPage;