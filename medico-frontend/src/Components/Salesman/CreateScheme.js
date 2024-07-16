import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../Services/auth';
import { getSalesmanById } from '../../Services/salesman';

export default function CreateScheme() {
    // const [currSalesman, setCurrSalesman] = useState(null);
    const [products, setProducts] = useState([]);

  const navigate = useNavigate()

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getSalesmanById(email)
      .then((resp) => {
        setProducts(resp?.assignedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
        {console.log(products)}
    </div>
  )
}
