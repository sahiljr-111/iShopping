import { Link } from "react-router-dom";
// import { useState } from 'react'
// import { useEffect } from 'react'
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
// import { Col, Row, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';
import { removeCart } from "./app/reducer/addCart";
import { incQty, decQty } from "./app/reducer/addCart";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const cartdata = useSelector((state) => state.addcart)
  const dispatch = useDispatch()
  let total = 0;
  let discount = 0;

  cartdata.map((item) => {
    return (
      <>
        {total += item.total}
        {discount += item.discountPercentage * item.qty}
      </>
    )
  })

  function toastalert() {
    // alert("removed")
    toast.error("cart removed", {
      position: "bottom-right",
      autoClose:500
    })
  }

  return (
    <>
      <section>
        <div className=" navs px-5 py-4 d-flex justify-content-between align-items-center">
          <h1 className="text-white">Cart</h1>
          <div className="links">
            <Link to="/#" className="text-white">/ Home</Link>
            {/* <Link to={`/product/${id}`} className="text-white mx-2"> / Product</Link> */}
          </div>
        </div>
        <div className="container">
          <div className="row text-white ">
            <div className="col-lg-8 col-12  cartdetails shadow">
              {cartdata.length > 0 ?
                cartdata.map((item) => {
                  return (
                    <>
                      <hr />
                      <div className="cartitems my-5">
                        <div className="row">
                          <div className="cartimgs text-center d-md-flex align-items-md-center">
                            <div className="d-sm-flex align-items-center justify-content-between col-md-6">
                              <img src={item.thumbnail} width="150px" height="auto" alt="" />
                              <div className="mx-3">
                                <h3>{item.title}</h3>
                                <p className="">Discount : {item.discountPercentage}</p>
                                <p><Badge bg="primary">Rating : {item.rating}</Badge></p>
                              </div>
                              <div className=" ms-2 ">
                                <span className="text-info fs-3 me-3">₹{item.total} </span>
                              </div>
                            </div>
                            <div className="col-4 d-flex align-items-center flex-column mx-auto my-4">
                              <div className="d-flex">
                                <Button variant="secondary" className="rounded-circle text-warning" onClick={() => dispatch(decQty(item))} ><FaMinus /></Button>
                                <input
                                  type="text"
                                  className="mx-2 fs-6 fw-bold text-white text-center border-0 rounded-2"
                                  style={{ width: "50px", height: "40px" }}
                                  value={item.qty}
                                  disabled
                                />
                                <Button variant="secondary" className="rounded-circle text-warning" onClick={() => dispatch(incQty(item))} ><FaPlus /></Button>
                              </div>
                            </div>
                            <div className="col-2 d-flex align-items-center mx-auto my-3">
                              <Button variant="danger" onClick={() => { dispatch(removeCart(item.id)); toastalert(); }} >
                                <FaTrashAlt /> Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
                : <h1 className="text-muted text-center">Cart is empty</h1>}
              <hr />
              <ToastContainer />
            </div>
            <div className="col-lg-4 col-12">
              <div className="shopdetails shadow">
                <p className="text-center fs-5">- Invoice -</p>
                <hr />
                <div className="px-5 text-center d-flex justify-content-between fw-bold">
                  <span>BILL AMOUNT : </span>
                  <span className="text-success">+{total}₹</span>
                </div>
                <div className="px-5 text-center d-flex justify-content-between fw-bold">
                  <span>DISCOUNT : </span>
                  <span className="text-danger">-{parseFloat(discount).toFixed(2)}₹</span>
                </div>
                <hr />
                <div className="px-5 fs-5 fw-bold text-center d-flex justify-content-between">
                  <span>NET AMOUNT : </span>
                  <span>₹ {total - discount}/-</span>
                </div>
                <div className="px-5 mt-5 mb-4">
                  <Button className="w-100 rounded-0" variant="outline-info">BUY NOW</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Cart;