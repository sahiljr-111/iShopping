import './App.css';
import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Rating from '@mui/material/Rating';
import { FaBars, FaSearch, FaShoppingCart, FaSortDown, FaUserAlt, FaShoppingBag } from "react-icons/fa";
function Home() {
  const [data, setdata] = useState([])
  const [category, setcategory] = useState([])

  // canvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  {
    useEffect(() => {
      axios.get('https://dummyjson.com/products/')
        .then(function (response) {
          console.log(response.data.products);
          setdata(response.data.products);
        })
        .catch(function (error) {
          console.log(error);
        })

      axios.get('https://dummyjson.com/products/categories')
        .then(function (response) {
          setcategory(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])

  }

  const myfun = (items) => {

    axios.get(`https://dummyjson.com/products/category/${items}`)
      .then(function (response) {
        console.log(response.data.products);
        setdata(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      })
    setShow(handleClose);
  }

  function refresh() {
    window.location.reload();
  }

  var keyhld;
  const inputkey = (key) => {
    keyhld = key
    axios.get(`https://dummyjson.com/products/search?q=${keyhld}`)
      .then(function (response) {
        console.log(response.data.products);
        setdata(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  return (
    <>
      <section className='navs sticky-top'>
        <div className="container ">
          <div className="navigation d-md-flex justify-content-md-between align-items-center">
            <div className="logoimg">
              <div className="imgbar d-flex justify-content-between align-items-center">
                <Button variant="dark" className='mx-1' onClick={handleShow}>
                  <FaBars className='me-2' />Categories
                </Button>
                    <li className='mx-2 '><a href="#" className='btn btn-outline-info d-flex align-items-center'>More <FaSortDown /></a></li>
              </div>
            </div>
            <div className="navbar">
              <div className="navbaritem">
                <div className="social d-md-flex justify-content-center align-items-center">
                  <h1 className=''><a href="#" className='text-white me-4' onClick={refresh}>iStore</a></h1>
                  <input type="text" className='searcharea ps-2 py-2' id="searchbar" placeholder='Search product' onKeyUp={(e) => inputkey(e.target.value)} />
                  <span className='searchbtn btn text-center fs-5 text-white pb-3' ><FaSearch /></span>
                  <ul className='d-flex justify-content-between align-items-center'>
                  </ul>
                </div>
              </div>
            </div>
            <div className="icons d-flex justify-content-center align-items-center">
              <button class="btn btn-outline-info" type="submit">Login <FaUserAlt className='ms-2'/></button>
              <span className='mx-2'><a href="#" className='btn btn-dark text-white fs-5'>Cart <FaShoppingCart className='' /></a></span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="main">
          <div className="row">
            {
              data.map((item) => {
                return (
                  <>
                    <div className="col-lg-4 col-md-6  my-4">
                      <div className="card">
                        <img src={item.thumbnail} alt="" />
                        <div className="card-body my-2">
                          <div className="titles">
                            <h4 className="card-title text-center text-white">{item.title}</h4>
                            <p className="card-text text-muted ">{item.description}</p>
                          </div>
                          <div className="prising my-1">
                            <div className="price">
                              <h5 className='text-success fw-bold'>Price : {item.price}₹</h5>
                            </div>
                            <div className="rate">
                              <Rating name="read-only half-rating-read" value={item.rating} precision={0.5} readOnly />
                            </div>
                            <div className="money">
                              <span className='text-danger'>Discount : {item.discountPercentage}</span>
                            </div>
                          </div>
                        </div>
                        <Link to={`/product/${item.id}`} className=' butn fw-bold btn w-100'><FaShoppingBag /> Shop Now  </Link>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fs-3'>Products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {
              category.map((cata) => {
                return (
                  <>
                    <li className="my-3 mx-3"><Link className="py-3 text-secondary licata" onClick={() => { myfun(cata) }} >{cata}</Link></li>
                  </>
                )
              })
            }
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
}
export default Home;