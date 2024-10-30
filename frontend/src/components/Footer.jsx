

const Footer = () => {
  return (
    <>
    <footer className="section__container footer__container">
      <div className="footer__col">

        <h4>CONTACT INFO </h4>
        <p>
            <span><i className="ri-map-pin-2-line"></i></span>
            123 London Bridge Street , London
        </p>

        <p>
            <span><i className="ri-mail-fill"></i></span>
            supportHA@gmail.com
        </p>

        <p>
            <span><i className="ri-phone-fill"></i></span>
            +(012) 3456 789
        </p>
      </div>

      <div className="footer__col">
      <h4>COMPANY </h4>
      <a href="/">Home</a>
      <a href="/">About Us</a>
      <a href="/">Work With Us</a>
      <a href="/">Our Blogs</a>
      <a href="/">Terms & Conditions</a>



</div>



<div className="footer__col">
      <h4>USEFUL LINKS </h4>
      <a href="/">Help</a>
      <a href="/">Track My Order</a>
      <a href="/">Men</a>
      <a href="/">Women</a>
      <a href="/">Dresses</a>
</div>

<div className="footer__col">
      <h4>INSTAGRAM </h4>
      <div className="instagram__grid">
      <img src="../../src/assets/instagram-1.jpg" alt="" />
      <img src="../../src/assets/instagram-2.jpg" alt="" />
      <img src="../../src/assets/instagram-3.jpg" alt="" />
      <img src="../../src/assets/instagram-4.jpg" alt="" />
      <img src="../../src/assets/instagram-5.jpg" alt="" />
      <img src="../../src/assets/instagram-6.jpg" alt="" />
      </div>
</div>
    </footer >

    <div className="footer__bar">
    Copyright © 2025 Web Design Mastery. All rights reserved.
    </div>
    </>
  )
}

export default Footer
