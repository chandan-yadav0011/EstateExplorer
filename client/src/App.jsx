import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import './layout.scss';
import  HomePage from './routes/home/homePage'
import ListPage from './routes/listPage/ListPage';
import SinglePage from './routes/SinglePage/SinglePage';
import LoginPage from './routes/loginPage/LoginPage';
import Profile from './routes/profilePage/Profile';



function App() {
  return (
    <div className="layout">
      
      <div className='navbar'>
        <Navbar/> 
      </div>

      <Routes>
          <Route  path='/' element={
            <div  className='content'>
              <HomePage/>
            </div>
          }/>  

          <Route  path='/list' element={
            <div  className='content'>
              <ListPage/>
            </div>
          }/>  

          <Route  path='/:id' element={
            <div>
              <SinglePage/>
            </div>
          }/>  

          <Route  path='/loginPage' element={
            <div  className='content'>
              <LoginPage/>

            </div>
          }/>  


          <Route  path='/profile' element={
            <div  className='content'>
              <Profile/>

            </div>
          }/>  

      </Routes>

    </div>

  )
}

export default App