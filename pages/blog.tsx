import React from "react";
import Layout from "@/components/FrontEnd/Layout";
import Link from "next/link";
import Image from "next/image";

export default function blog() {
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
                  {/* Interesting articles updated daily */}
                  Featured Blog
                </span>
                <h1>BLOG</h1>
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
              <li className="breadcrumb-item">Blog</li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 blog-box_showup">
              <div className="input-show shadow-sm hstack gap-3 justify-content-center align-items-center">
                <h5 className="m-0">Showing </h5>
                <select
                  className="form-select w-25"
                  aria-label="Default select example"
                >
                  <option selected>All Year</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select
                  className="form-select w-25"
                  aria-label="Default select example"
                >
                  <option selected>All Category</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4 card-blog mb-3">
                <div className="col">
                  <div className="card h-100 blog-one">
                    <Link href="/blog_detail">
                      <a>
                        <div className="blog-img">
                          <Image
                            src="/static/images/test_blog.jpg"
                            layout="responsive"
                            width={400}
                            height={300}
                            alt="..."
                          />
                        </div>

                        <div className="card-body">
                          <p className="card-text mb-2">
                            <small className="text-muted">
                              <i className="fas fa-calendar-alt me-1"></i> 16
                              March 2021
                            </small>
                            <span className="category-tag d-inline-block float-end">
                              <span className="badge rounded-pill">
                                TAHILAND
                              </span>
                            </span>
                          </p>
                          <h5 className="card-title">
                            AI Translation
                            <br />
                            (企業インタビュー by Newsclip.be)
                          </h5>
                          <p className="card-text mb-1"></p>
                          <button className="btn-link w-100">
                            Read More <i className="fas fa-angle-right"></i>
                          </button>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 blog-one">
                    <Link href="/blog_detail">
                      <a>
                        <div className="blog-img">
                          <Image
                            src="/static/images/test_blog.jpg"
                            layout="responsive"
                            width={400}
                            height={300}
                            alt="..."
                          />
                        </div>

                        <div className="card-body">
                          <p className="card-text mb-2">
                            <small className="text-muted">
                              <i className="fas fa-calendar-alt me-1"></i> 16
                              March 2021
                            </small>
                            <span className="category-tag d-inline-block float-end">
                              <span className="badge rounded-pill">
                                TAHILAND
                              </span>
                            </span>
                          </p>
                          <h5 className="card-title">
                            AI Translation
                            <br />
                            (企業インタビュー by Newsclip.be)
                          </h5>
                          <p className="card-text mb-1"></p>
                          <button className="btn-link w-100">
                            Read More <i className="fas fa-angle-right"></i>
                          </button>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 blog-one">
                    <Link href="/blog_detail">
                      <a>
                        <div className="blog-img">
                          <Image
                            src="/static/images/test_blog.jpg"
                            layout="responsive"
                            width={400}
                            height={300}
                            alt="..."
                          />
                        </div>

                        <div className="card-body">
                          <p className="card-text mb-2">
                            <small className="text-muted">
                              <i className="fas fa-calendar-alt me-1"></i> 16
                              March 2021
                            </small>
                            <span className="category-tag d-inline-block float-end">
                              <span className="badge rounded-pill">
                                TAHILAND
                              </span>
                            </span>
                          </p>
                          <h5 className="card-title">
                            AI Translation
                            <br />
                            (企業インタビュー by Newsclip.be)
                          </h5>
                          <p className="card-text mb-1"></p>
                          <button className="btn-link w-100">
                            Read More <i className="fas fa-angle-right"></i>
                          </button>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100 blog-one">
                    <Link href="/blog_detail">
                      <a>
                        <div className="blog-img">
                          <Image
                            src="/static/images/test_blog.jpg"
                            layout="responsive"
                            width={400}
                            height={300}
                            alt="..."
                          />
                        </div>

                        <div className="card-body">
                          <p className="card-text mb-2">
                            <small className="text-muted">
                              <i className="fas fa-calendar-alt me-1"></i> 16
                              March 2021
                            </small>
                            <span className="category-tag d-inline-block float-end">
                              <span className="badge rounded-pill">
                                TAHILAND
                              </span>
                            </span>
                          </p>
                          <h5 className="card-title">
                            AI Translation
                            <br />
                            (企業インタビュー by Newsclip.be)
                          </h5>
                          <p className="card-text mb-1"></p>
                          <button className="btn-link w-100">
                            Read More <i className="fas fa-angle-right"></i>
                          </button>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-5">
              <nav aria-label="page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
