import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from "./Sidebar";
import { signOut, decodeToken } from "../../Services/auth";
import { getProductById } from '../../Services/product';

export default function ProductDetails(props) {
    const { changeLogin } = props;
    const navigate = useNavigate();

    const history = useLocation();

    const logout = () => {
        signOut();
        changeLogin(false);
      };

      const onAddProduct = () => {
        navigate("/Product/add");
      };

  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductById(history.state)
    .then((res) => {setProduct(res)})
    .catch((err) => {console.log(err);})
  }, []);
  return (
    <div className="flex h-screen bg-cyan-900 text-white">
        
      {/* <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed?'red':'green'}`},
        }}
      /> */}
      {/* <Sidebar /> Add the Sidebar component */}
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end gap-4">
            <button
              onClick={onAddProduct}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Batch
            </button>
          </div>
          <hr></hr>
        </div>
        <p className=" text-4xl text-white px-8 py-2">
            Product Detail
          </p>
        <div className=" h-[90vh] overflow-y-auto">
        <div className=" p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* <DataGrid
            rows={products}
            columns={columns}
            autoHeight
            disableColumnMenu
            hideFooter
            className="w-full h-full bg-cyan-100"
          /> */}
          <p className=' text-white text-lg'>
            {JSON.stringify(product)}
        </p>
        </div>
        </div>
      </div>
    </div>
  )
}
