import "./App.css";

import { AuthContextProviderComponent } from "./context/AuthContext";

import { Header } from "./layout/Header/Header";
import { Auth } from "./layout/Auth/Auth";
import { SpartanRoutes } from "./Routes/Routes";
import { Footer } from "./layout/Footer/Footer";

function App() {
  return (
    <div className="App">
      <AuthContextProviderComponent>
        <Header />
        <Auth />
        <SpartanRoutes />
      </AuthContextProviderComponent>
      <Footer />
    </div>
  );
}

export default App;
