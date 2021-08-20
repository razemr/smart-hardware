import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
import { Header } from "./components/Header";
import { ShoppingCart } from "./components/ShoppingCart";
import { ProductsDisplay } from "./components/ProductsDisplay";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AdminDashboard } from "./components/admin/AdminDashboard";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="app">
          <NavBar />
          <Header />

          <Switch>
            <Route path="/admin">
              <div className="container">
                <AdminDashboard />
              </div>
            </Route>

            <Route path="/" exact>
              <div className="container">
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
