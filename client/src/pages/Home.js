
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { HomeProvider } from "../Context/HomeContext";
import { useParams } from "react-router-dom";
function Home({pages}) {
  const {id} = useParams()
  return (
    <div className="grid grid-cols-5 2xl:grid-cols-8">
      <HomeProvider>
        <Navbar />
        <Content id = {id} pages = {pages}/>
        <Footer />
      </HomeProvider>
    </div>
    
  );
}

export default Home;
