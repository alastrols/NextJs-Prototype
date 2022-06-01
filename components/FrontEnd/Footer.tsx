import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-3 col-md-4 col-xl-4 col-xxl-4 address-footer">
              <div className="heading-footer">
                <h5 className="fw-blod">CONTACT US</h5>
              </div>
              <div className="address-footer_inner">
                <div className="hstack gap-3 footer_inner-i_t align-items-center">
                  <div className="icon-footer">
                    <i className="fa-solid fa-map-marker-alt" />
                  </div>
                  <div className="text-footer">
                    <p>
                      589/160, BANGNA-TRAD ROAD, CENTRAL CITY BANGNA TOWER 1,
                      ROOM OI-30C2B 30TH FLOOR, BANGNA, BANGKOK 10260
                    </p>
                  </div>
                </div>
                <div className="hstack gap-3 footer_inner-i_t align-items-center">
                  <div className="icon-footer">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div className="text-footer">
                    <p>+66 (0) 2-745-6050-4</p>
                    <p>+66 (0) 2-745-6055</p>
                  </div>
                </div>
                <div className="hstack gap-3 footer_inner-i_t align-items-center">
                  <div className="icon-footer">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <div className="text-footer">
                    <a href="mailto:info@itp.co.th">INFO@ITP.CO.TH</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-none d-xl-block d-xxl-nonecol-xl-1 col-xl-1"></div>
            <div className="col-12 col-sm-9 col-md-8 col-xl-7 col-xxl-7 address-footer p-0">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="heading-footer">
                    <h5 className="fw-blod">NAVIGATION</h5>
                  </div>
                  <div className="getlink-footer">
                    <ul>
                      <li>
                        <Link href="/">
                          <a className="getlink">Home</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/company">
                          <a className="getlink">about us</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/lic">
                          <a className="getlink">Service</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog">
                          <a className="getlink">Blog</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog">
                          <a className="getlink">News</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog">
                          <a className="getlink">Contact us</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="heading-footer">
                    <h5 className="fw-blod">Services</h5>
                  </div>
                  <div className="getlink-footer">
                    <ul>
                      <li>
                        <Link href="/lic">
                          <a className="getlink">Localization</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/digital">
                          <a className="getlink">Digital Marketing</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/web_app">
                          <a className="getlink">WEBSITE & APPLICATION</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/graphic">
                          <a className="getlink">GRAPHIC DESIGN</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/event">
                          <a className="getlink">EVENT ORGANIZER</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/sale">
                          <a className="getlink">SALE PROMOTION TOOLS</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/training">
                          <a className="getlink">TRAINING TOOL</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/printing">
                          <a className="getlink">PRINTING PRODUCTION</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/logistics">
                          <a className="getlink" href="#">
                            LOGISTICS MANAGEMENT
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="copyright-box">
            <div className="hstack gap-3">
              <div className="copyright-text">
                <p className="mb-0">
                  © 2022. All rights reserved by ITP ASIA CO.,LTD
                </p>
              </div>
              <div className="sns-link mx-auto justify-content-center">
                <a href="">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="">
                  <i className="fab fa-youtube" />
                </a>
              </div>
              <div className="copyright-link align-items-center">
                <Link href="/terms">
                  <a className="getlink" href="#">
                    Terms And Conditions
                  </a>
                </Link>
                <Link href="/policy">
                  <a className="getlink" href="#">
                    Privacy Policy
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
