import './App.css';
import { GlobalProvider } from './context/GlobalState';
import { Header } from './components/Header';
import { ShoppingCart } from './components/ShoppingCart';
import { ProductsDisplay } from './components/ProductsDisplay'


function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <Header/>
        <div className="container">
          <ProductsDisplay/>
          <ShoppingCart/>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
