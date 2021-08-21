import "./App.css";
import "./styles/styles.scss";
import { GlobalProvider } from "./context/GlobalState";
import { Header } from "./components/core/Header";
import { ShoppingCart } from "./components/cart/ShoppingCart";
import { ProductsDisplay } from "./components/product/ProductsDisplay";
import { NavBar } from "./components/core/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AdminDashboard } from "./components/admin/AdminDashboard";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div id="app-container">
          <NavBar />
          <Header />

          <Switch>
            <Route path="/admin">
              <div className="main-container">
                <AdminDashboard />
              </div>
            </Route>

            <Route path="/" exact>
              <div className="main-container">
                <ProductsDisplay />
                <ShoppingCart />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
