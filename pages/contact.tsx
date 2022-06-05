import React from "react";
import Layout from "@/components/FrontEnd/Layout";
import Link from "next/link";
import Image from "next/image";

export default function contact() {
  return (
    <Layout>
      <div className="content_main">
        <div className="banner_content banner_content-contact">
          <div className="itp-one-shape-1"></div>
          <div className="itp-one-shape-2"></div>
          <div className="itp-one-shape-3"></div>
          <div className="container">
            <div className="row">
              <div className="heading_banner">
                <span className="subtitle subtitle-extended">
                  Get To Know Us
                </span>
                <h1>CONTACT US</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="breadcumb-wrapper">
          <div className="container">
            <ul className="breadcumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item">contact us</li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 contact-heading">
              <div className="sec-title text-center">
                <p>Get in Touch </p>
                <h1>You can connect with us when need help!</h1>
              </div>
            </div>
            <div className="col-12 contact-form">
              <div className="contact-form_inner">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4 contact-address">
                    <div className="contact-address_box">
                      <div className="contact-background-overlay"></div>
                      <div className="contact-box">
                        <div className="hstack gap-3 footer_inner-i_t align-items-center">
                          <div className="icon-footer">
                            <i className="fa-solid fa-map-marker-alt" />
                          </div>
                          <div className="text-footer">
                            <p>
                              589/160, BANGNA-TRAD ROAD, CENTRAL CITY BANGNA
                              TOWER 1, ROOM OI-30C2B 30TH FLOOR, BANGNA, BANGKOK
                              10260
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
                        <div className="contact-text_inner text-center">
                          <h5>Monday - Friday</h5>
                          <p>
                            <i className="fas fa-clock me-2" /> 08:30 - 17:30
                          </p>
                          <p className="mb-0">
                            <a href="">
                              <i className="fab fa-facebook-f" />
                            </a>
                            <a href="">
                              <i className="fab fa-youtube" />
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-8 contact-form_box">
                    <div className="form_box-inner shadow">
                      <div className="row">
                        <div className="col-12">
                          <h4>Send Message</h4>
                        </div>
                        <form id="form" method="post" action="#">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-sm-6 col-12 input_inner">
                                <label></label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Full Name"
                                  id="fullname"
                                  name="fullname"
                                />
                              </div>
                              <div className="col-sm-6 col-12 input_inner">
                                <label></label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Company Name"
                                  id="company_name"
                                  name="company_name"
                                />
                              </div>
                              <div className="col-sm-6 col-12 input_inner">
                                <label></label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="email"
                                  placeholder="Email"
                                  name="email"
                                />
                              </div>
                              <div className="col-sm-6 col-12 input_inner">
                                <label></label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phone_number"
                                  placeholder="Phone Number"
                                  name="phone_number"
                                />
                              </div>
                              <div className="col-sm-12 col-12 select_inner">
                                <label></label>
                                <select
                                  className="form-control form-select"
                                  id="list"
                                  name="list"
                                >
                                  <option value="">
                                    Please select the service you are interested
                                    in.
                                  </option>
                                  <option>Localization</option>
                                  <option>Digital Marketing &amp; IT</option>
                                  <option>Graphic Design</option>
                                  <option>Event Organizer</option>
                                  <option>Sale Promotion Tools</option>
                                  <option>Training Tool</option>
                                  <option>Printing Production</option>
                                  <option>Logistics Management</option>
                                  <option>Other</option>
                                </select>
                              </div>
                              <div className="col-sm-12 col-12 input_inner">
                                <label></label>
                                <textarea
                                  className="form-control"
                                  rows={3}
                                  placeholder="Your Message"
                                  name="message"
                                  id="message"
                                ></textarea>
                              </div>
                              <div className="col-sm-12 col-xs-12 mx-auto text-center">
                                <button
                                  type="submit"
                                  id="confirm"
                                  className="text-center btn-link"
                                  name="confirm"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0 m-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.8213390981878!2d100.6318053148295!3d13.66862529040128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d5ff098c5c339%3A0xab290c8767e933fa!2sITP%20ASIA%20CO.%2CLTD.%20(%20IT%20%2F%20AI%20%2F%20Marketing%20%2F%20Translation%20%2F%20Printing%20%2F%20Event%20)!5e0!3m2!1sth!2sth!4v1626253758339!5m2!1sth!2sth"
                width="100%"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
