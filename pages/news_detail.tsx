import React from "react";
import Layout from "@/components/FrontEnd/Layout";
import Link from "next/link";
import Image from "next/image";

export default function news_detail() {
  return (
    <Layout>
      <div className="content_main">
        <div className="banner_content banner_content-blog">
          <div className="itp-one-shape-1"></div>
          <div className="itp-one-shape-2"></div>
          <div className="itp-one-shape-3"></div>
          <div className="container">
            <div className="row">
              <div className="heading_banner">
                <span className="subtitle subtitle-extended">
                  Interesting articles updated daily
                </span>
                <h1>
                  AI Translation
                  <br />
                  (企業インタビュー by Newsclip.be)
                </h1>
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
              <li className="breadcrumb-item">
                <Link href="/news">
                  <a>NEWS</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                AI Translation (企業インタビュー by Newsclip.be)
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 blog-detail_content">
              <h4 className="blog-detail-title text-center mb-3">
                AI Translation (企業インタビュー by Newsclip.be)
              </h4>
              <div className="text-center date_catagory">
                <h6>
                  <small className="text-muted me-3">
                    <i className="fas fa-calendar-alt me-1"></i> 16 March 2021
                  </small>
                  <span className="category-tag d-inline-block">
                    <span className="badge rounded-pill">COMPANY</span>
                  </span>
                </h6>
              </div>
              <div className="blog-description my-4">
                <div className="img-description d-flex justify-content-center mb-4">
                  <Image
                    src="/static/images/test_blog.jpg"
                    width={400}
                    height={300}
                    loading="lazy"
                    alt="..."
                  />
                </div>
                <p>
                  Reference : Newsclip - AI 翻訳 / ISHIDA TAISEISHA (THAILAND)
                  CO.,LTD.　/ 16th March 2021.
                </p>
                <p>Inteviewer：Mr.Masayuki Saito （Newsclip.be）</p>{" "}
                <p>
                  Interviewee : Tarntip Mapibooltunyachat / General Manager,
                  Head of Innovation Center Division, Ishida Taiseisha
                  (Thailand) Co.,Ltd.
                </p>
                <p>---------------</p>{" "}
                <p>
                  ผู้ให้บริการงานแปลกว่า 160 ล้านคำ และบริการ AI Translation
                  ภาษาไทยที่พัฒนาโดยคนไทย
                  ให้บริการงานแปลทั้งในประเทศไทยและเอเชียตะวันออกเฉียงใต้
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
