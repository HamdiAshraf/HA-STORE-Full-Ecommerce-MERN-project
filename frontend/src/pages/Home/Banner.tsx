import React from "react"
import { Link } from "react-router-dom"


const Banner = () => {
  return (
    <div className="section__container header__container">
        <div className="header__content z-30">
            <h4>UP TO 20% DISCOUNT ON</h4>
            <h1>GIRLS FASHION</h1>
            <p> Discover the latest trends and express your unique style with our
            Women's Fashion website. Explore a curated collection of clothing,
            accessories, and footwear that caters to every taste and occasion.</p>
            <button className="btn"> <Link to="/shop">EXPLORE NOW</Link> </button>
        </div>
        <div className="header__image">
            <img src="../../../src/assets/header.png" alt="banner image" />
        </div>
    </div>
  )
}

export default Banner
