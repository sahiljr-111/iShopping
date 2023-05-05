import { Link, useParams } from "react-router-dom";
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
const Cart = () => {
  var { id } = useParams();
  const [pdata, setpdata] = useState([])
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(function (response) {
        console.log(response.data);
        setpdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])                                         

  return (
    <>
      <section>
        <div className=" navs px-5 py-4 d-flex justify-content-between align-items-center">
          <h1 className="text-white">Cart</h1>
          <div className="links">
            <Link to="/#" className="text-white">/ Home</Link>
            <Link to={`/product/${id}`} className="text-white mx-2"> / Product</Link>
          </div>
        </div>
        <div className="container">
          <div className="productbuydata">
            <h1 className="text-center text-white">{pdata.title}</h1>
            <div className="productmainimg d-flex justify-content-center">
              <img src={(pdata.images || [])[0]} alt="" width="50%" className="my-2" id="imgpath" style={{ margin: "auto" }} />
            </div>
            <div className="btnbuy d-flex justify-content-center">
              <Link to="" className="btn btn-lg btn-success w-50">Place an order</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Cart;