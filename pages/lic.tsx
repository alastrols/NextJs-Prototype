import React from "react";
import Layout from "@/components/FrontEnd/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Lic() {
  return (
    <Layout>
      <div className="content_main">
        <div className="banner_content">
          <div className="itp-one-shape-1"></div>
          <div className="itp-one-shape-2"></div>
          <div className="itp-one-shape-3"></div>
          <div className="container">
            <div className="row">
              <div className="heading_banner">
                <span className="subtitle subtitle-extended">Service</span>
                <h1>Localization</h1>
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
              <li className="breadcrumb-item">Localization</li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 tab-service">
              <nav className="d-flex justify-content-center">
                <div className="nav nav-tabs justify-content-center">
                  <Link href="#TRANSLATION">
                    <a className="nav-link">
                      <div className="icon-footer text-center">
                        <i className="fas fa-language" />
                      </div>
                      TRANSLATION
                    </a>
                  </Link>
                  <Link href="#DTP">
                    <a className="nav-link">
                      <div className="icon-footer text-center">
                        <i className="fa fa-spell-check"></i>
                      </div>
                      DTP
                    </a>
                  </Link>
                  <Link href="#Contents">
                    <a className="nav-link">
                      <div className="icon-footer text-center">
                        <i className="fas fa-align-left" />
                      </div>
                      Contents localization
                    </a>
                  </Link>
                </div>
              </nav>
            </div>
            <div className="col-12 tab-service-content">
              <div className="row">
                <div className="col-12 sec-heading" id="TRANSLATION"></div>
                <div className="col-12 col-sm-6 sec-text">
                  <div className="sec-title text-start">
                    <p>Our services</p>
                    <h3>TRANSLATION</h3>
                  </div>
                  <p className="pe-5">
                    We support more than 40 languages translation such as Thai,
                    English, Japanese, Burmese, Vietnamese, Indonesian,
                    Malaysian, Khmer, Laos, European languages, Arabic etc. We
                    can support both translation with CAT tool (TradosStudio)
                    and without CAT tool. With 20 years experience in
                    translation management and strong localization network, we
                    specialize in technical data translation especially
                    automotive and industrial translation and we also provide
                    marketing, legal, tourism and other fileds translation.
                  </p>
                </div>
                <div className="col-12 col-sm-6 sec-img">
                  <Image
                    src="/static/images/lic1.jpg"
                    layout="responsive"
                    width={500}
                    height={300}
                    alt="..."
                  />
                </div>
                <div className="col-12 my-5">
                  <div className="sec-title text-start">
                    <p>Professional Languages Translation</p>
                    <h3>Languages We Cover</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
