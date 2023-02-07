
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { HomeProvider } from "../Context/HomeContext";
function Home() {
  
  return (
    <div className="grid grid-cols-5 2xl:grid-cols-8">
      <HomeProvider>
        <Navbar />
        <Content />
        <Footer />
      </HomeProvider>
    </div>
    
  );
}

export default Home;
