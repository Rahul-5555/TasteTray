import './App.css';
import Home from './Screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './Screens/Login';
// import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Signup from './Screens/Signup.jsx';
import { CartProvider } from './Components/ContextReducer.jsx';
import Cart from './Screens/Cart.jsx'; // Import Cart component

// import MyOrder from './Screens/MyOrder.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            {/* <Route exact path='/myOrder' element={<MyOrder />} /> */}

            {/* Example: Render the Cart component */}
            <Route exact path='/cart' element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
