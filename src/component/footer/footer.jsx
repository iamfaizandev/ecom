import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  // const [isLoading, setIsloading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsloading(false);
  //   });
  // });
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Get to Know Us</h4>
          <p>
            This Simple E-Commerce Website Based on Free Api ,User Auth
            AddCart,Delete,Wishlist and User Profile info , all product
            categories. if You Interested to Design this type site or other Need
            website Then Call me <br />
            <a href="tel:+917563092029">Call Me</a>
          </p>
          {/* <ul>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#press">Press Releases</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul> */}
        </div>
        <div className="footer-section">
          <h4>Connect with Us</h4>
          <ul>
            <li>
              <a href="https://mdfaizanahmad-portfolio-fzn.web.app/">
                My Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/+917549692029"
                rel="noopener noreferrer"
                target="_blank"
              >
                Whatsapp
              </a>
            </li>
            <li>
              <a href="https://webdeskkk.web.app/">Ours Works</a>
            </li>
            <li>
              <a href="mailto:md.faizan.ahmad@gmail.com">Email Me</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Grow with Us</h4>
          <ul>
            <li>Business</li>
            <li>Schools</li>
            <li>Personal Portfolios</li>
            <li>Any Dynamic Website</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Let Us Help You</h4>
          <ul>
            <li>
              <Link to="/signup">Your Account</Link>
            </li>
            <li>
              <Link to="/ubOrder">Your Order</Link>
            </li>
            {/* <li>
              <a href="/">Shipping Rates & Policies</a>
            </li>
            <li>
              <a href="/">Returns & Replacements</a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">
          <a href="#home">
            On<span className="text-danger">E</span>.com
          </a>
        </div>
        <p>
          &copy; Design and Developed By{" "}
          <a className="h6" href="https://mdfaizanahmad-portfolio-fzn.web.app/">
            mdfaizanahmad
          </a>{" "}
          .connect for Web Development
        </p>
      </div>
    </footer>
  );
}
