import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function Header() {
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    setWidth(window.innerWidth);
  });
  const ref = React.useRef<any>();
  const navEl = ref.current;

  if (width > 992) {
    document
      .querySelectorAll(".navbar .nav-item")
      .forEach(function (everyitem) {
        everyitem.addEventListener("mouseover", (e) => {
          let el_link = navEl.querySelector("a[data-bs-toggle]");

          if (el_link != null) {
            let nextEl = el_link.nextElementSibling;
            el_link.classList.add("show");
            nextEl.classList.add("show");
          }
        });
        everyitem.addEventListener("mouseleave", function (e) {
          let el_link = navEl.querySelector("a[data-bs-toggle]");

          if (el_link != null) {
            let nextEl = el_link.nextElementSibling;
            el_link.classList.remove("show");
            nextEl.classList.remove("show");
          }
        });
      });
  }

  // DOMContentLoaded  end
  return (
    <header className="sticky_header shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-12 order-sm-3 col-md-3 col-xl-2 col-xxl-2 header_hotline">
            <div className="bg_gray d-flex align-items-center">
              <div className="item_icon flex-shrink-0">
                <i className="fa-solid fa-phone" />
              </div>
              <div className="item_content flex-grow-1 ms-3">
                <h6>CONTACT US</h6>
                <p className="mb-0">+66 (0) 2-745-6050-4</p>
                <p className="text-small mb-0">(EN,TH #0, 日本語 #701)</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-md-2 col-xl-2 col-xxl-2">
            <div className="logo text-center align-items-center">
              <Link href="/">
                <a className="justify-content-center d-block mx-auto">
                  <Image
                    src="/static/images/logo.png"
                    width={200}
                    height={68}
                    objectFit="cover"
                    alt="logo"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-7 col-xl-8 justify-content-center menu">
            <nav ref={ref} className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mx-auto mb-lg-0 text-uppercase">
                    <li ref={ref} className="nav-item">
                      <Link href="/">
                        <a className="nav-link active" aria-current="page">
                          Home
                        </a>
                      </Link>
                    </li>
                    <li ref={ref} className="nav-item dropdown">
                      <Link href="#">
                        <a
                          className="nav-link dropdown-toggle"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          About us
                        </a>
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link href="/company">
                            <a className="dropdown-item">Company Profile</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/global">
                            <a className="dropdown-item">Global Network</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li ref={ref} className="nav-item dropdown">
                      <Link href="#">
                        <a
                          className="nav-link dropdown-toggle"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Service
                        </a>
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link href="/lic">
                            <a className="dropdown-item">Localization</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/digital">
                            <a className="dropdown-item">Digital Marketing</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/web_app">
                            <a className="dropdown-item">
                              WEBSITE & APPLICATION
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/graphic">
                            <a className="dropdown-item">GRAPHIC DESIGN</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/event">
                            <a className="dropdown-item">EVENT ORGANIZER</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/sale">
                            <a className="dropdown-item">
                              SALE PROMOTION TOOLS
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/training">
                            <a className="dropdown-item">TRAINING TOOL</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/printing">
                            <a className="dropdown-item">PRINTING PRODUCTION</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/logistics">
                            <a className="dropdown-item" href="#">
                              LOGISTICS MANAGEMENT
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li ref={ref} className="nav-item">
                      <Link href="/news">
                        <a className="nav-link">News</a>
                      </Link>
                    </li>
                    <li ref={ref} className="nav-item">
                      <Link href="/blog">
                        <a className="nav-link">blog</a>
                      </Link>
                    </li>
                    <li ref={ref} className="nav-item">
                      <Link href="/contact">
                        <a className="nav-link">contact us</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
