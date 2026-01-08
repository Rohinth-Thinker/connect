import Footer from "./components/Footer";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";

function Home() {

    return (
        <div className="home-container mb-30">
            <Navbar>
                <div className="w-full pl-5 mb-5">
                    <Searchbar />
                </div>
            </Navbar>

            <ItemCard />

            <Footer />
        </div>
    )
}

export default Home;