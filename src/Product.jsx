import { Link, useParams } from "react-router-dom";
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { FaCartArrowDown } from "react-icons/fa";


const Product = () => {
  var { id } = useParams();
  const [pdata, setpdata] = useState([])
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setpdata(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  const imgclick = (id) => {
    document.getElementById('imgpath').src = `${(pdata.images || [])[id]}`
  }

  
  return (
    <>
      {
        <div>
          <div className="navs navbar px-5 py-4 d-flex justify-content-between align-items-center">
            <h1 className="text-white">Product Detail</h1>
            <div className="links">
              <Link to="/#" className="text-white"> / Go HOME</Link>
              <Link to="/#" className="text-white"></Link>
            </div>
          </div>
          <div className="container text-white">
            <div className="header">
              <h1 className="text-center my-5 fw-bold">{pdata.title}</h1>
            </div>
            <div className="products row">
              <div className="maincontent col-md-1 my-4 ">
                <div className="d-md-block d-flex justify-content-center align-items-center">
                  <img src={(pdata.images || [])[1]} alt="" width="80" className="my-1 tinyimg d-block" onMouseEnter={(e) => { imgclick(1) }} />
                  <img src={(pdata.images || [])[2]} alt="" width="80" className="my-1 tinyimg d-block" onMouseEnter={(e) => { imgclick(2) }} />
                  <img src={(pdata.images || [])[3]} alt="" width="80" className="my-1 tinyimg d-block" onMouseEnter={(e) => { imgclick(3) }} />
                  <img src={(pdata.images || [])[4]} alt="" width="80" className="my-1 tinyimg d-block" onMouseEnter={(e) => { imgclick(4) }} />
                </div>
              </div>
              <div className="productmainimg col-md-4 d-flex justify-content-center align-items-center">
                <img src={(pdata.images || [])[0]} alt="" width="100%" className="my-2 lgimg" id="imgpath" />
              </div>
              <div className="productdata col-md-7">
                <div className="content text-white mx-4">
                  <p>About Phone : <br /><b className="fs-4">{pdata.description}</b></p>
                  <p>Brand : {pdata.brand}</p>
                  <span className="text-success fs-3 fw-bold">Price : ₹{pdata.price} </span><strike className="text-danger">₹789</strike>
                  <p className="">Instock : {pdata.stock}</p>
                  <p className="">Rating : {pdata.rating}</p>
                </div>
                <div className="cart mx-4 my-3">
                  <Link to={`/cart/${pdata.id}`} className="btn butn btn-info">Purchase now</Link>
                  <Link to={`/cart/${pdata.id}`} className="btn butn btn-warning mx-2"> <FaCartArrowDown/> AddToCart</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default Product;