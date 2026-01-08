import { useParams } from "react-router-dom";
import Footer from "../Home/components/Footer";
import Navbar from "../Home/components/Navbar";
import Searchbar from "../Home/components/Searchbar";
import Item from "./components/Item";

function ItemPage() {

    const { id } = useParams();

    return (
        <>
            <Navbar>
                <div className="w-full pl-5 mb-5">
                    <Searchbar />
                </div>
            </Navbar>

            <Item id={id} />

            <Footer />
        </>
    )
}

export default ItemPage;