import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../Services/auth';
import { getSalesmanOffersByEmail } from '../../Services/salesman';

export default function SalesmanOffers() {
    const [currSalesman, setCurrSalesman] = useState(null);

    const navigate = useNavigate()
  
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
  
    useEffect(() => {
      getSalesmanOffersByEmail(email)
        .then((resp) => {
          setCurrSalesman(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
  //   console.log(isSalesman());
  
  const onViewProduct = (pid, index) => {
      navigate(`/sales/Product/${index}`, {state:{pid}})
  }
  
  
  
    return (
      <div className="flex-1 ms-14">
        {/* Personal and Area Assignment Information */}
        {/* Same as previously discussed */}
        
        {/* Product Cards */}
          <h2 className="text-3xl font-semibold text-white my-2 mb-3 mx-3 p-1">
            My Assigned Products
          </h2>
          <hr/>
        <div className="p-5">
          <div className="grid grid-cols-4 gap-4">
            {currSalesman?.assignedProducts.map((product, index) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                  {/* {console.log(product)} */}
                <img src={product.photoUrl} alt="Product" className="w-full h-48 object-cover mb-4 rounded"/>
                <hr className=' bg-slate-300 p-[1px]'></hr>
                <h3 className="text-xl text-white font-semibold">{product.drugName}</h3>
                <p className="text-neutral-800">Brand: {product.brandName}</p>
                <p className="text-neutral-800">Manufacturer: {product.manufacturerName}</p>
                <p className="text-neutral-800">MRP: {product.mrp}</p>
                <p className="text-neutral-800">Selling Price: {product.sellingPrice}</p>
                <button onClick={() => onViewProduct(product.id, index)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
