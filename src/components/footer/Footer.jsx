import React from "react";
import scss from "./Footer.module.scss";
import icon from "../../image/icon-send.svg";
import qr from "../../image/Qr Code.svg";
import google from "../../image/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.svg";
import apple from "../../image/download-appstore.svg";

const Footer = () => {
  return (
    <div className={scss.footer}>
      <div className="container">
        <div className={scss.footer1}>
          <div className={scss.exc}>
            <div className={scss.info}>
              <h3>Exclusive</h3>
              <h4>Subscribe</h4>
              <h5>Get 10% off your first order</h5>
              <div className={scss.inp}>
                <input type="text" placeholder="Enter your email" />
                <img src={icon} alt="" />
              </div>
            </div>
            <div className={scss.info}>
              <h4>Support</h4>
              <h5>
                111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
              </h5>
              <h5>exclusive@gmail.com</h5>
              <h5>+88015-88888-9999</h5>
            </div>
            <div className={scss.info}>
              <h4>Account</h4>
              <h5>My Account</h5>
              <h5>Login / Register</h5>
              <h5>Cart</h5>
              <h5>Wishlist</h5>
            </div>
            <div className={scss.info}>
              <h4>Quick Link</h4>
              <h5>Privacy Policy</h5>
              <h5>Terms Of Use</h5>
              <h5>FAQ</h5>
              <h5>Contact</h5>
            </div>
            <div className={scss.info}>
              <h4>Download App</h4>
              <h6>Save $3 with App New User Only</h6>
              <div className={scss.qr}>
                <img src={qr} alt="" />

                <div className={scss.store}>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={google} alt="Google Play" />
                  </a>

                  <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={apple} alt="App Store" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={scss.copyright}>
            © Copyright Rimel 2025. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
