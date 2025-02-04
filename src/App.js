import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Menubar from './components/Menubar';
import RestaurantList from './components/RestaurantList';
import RestaurantPage from './components/RestaurantPage'; 
import Login from './components/Login';
import './App.css';

const { Header, Content } = Layout;

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState();
  return (
    <BrowserRouter>
      <Layout className='layout'>
        <Header>
          <Menubar user={user} />
        </Header>
        <Content>
          <Routes>
            <Route path='/restaurants/:restaurantId' element={<RestaurantPage />} />
            <Route path='/random' element={<h1>Random</h1>} />
            <Route path='/add' element={
              !user
                ? <Login setUser={setUser} />
                : <h1>Add Restaurant</h1>
            } />
            <Route path='/' element={<RestaurantList />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
    
  );
}

export default App;
