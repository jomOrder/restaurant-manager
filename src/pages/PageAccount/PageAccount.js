import React, { useEffect, useState } from "react";
import API from "../../services/API";
import TopBarProgress from "react-topbar-progress-indicator";
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import AccountDetails from "../../components/Account/AccountDetails";

TopBarProgress.config({
  barColors: {
    "0": "#be1c1c",
    "1.0": "#be1c1c"
  },
  shadowBlur: 1
});


const PageAccount = () => {
  const [values, setValues] = useState({
    loading: true,
    password: null,
  })

  useEffect(() => {
    setTimeout(() => {
      setValues({ loading: false })
    }, 2000)
  }, []);



  return (
    <div className="dashboard-main-wrapper">
      <Header />
      {values.loading ? <TopBarProgress /> : false}
      <SideNav />
      <div className="dashboard-wrapper">
        <div class="influence-profile">
          <div class="container-fluid dashboard-content ">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="page-header">
                  <h3 class="mb-2">Profile </h3>
                  <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                  <div class="page-breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Dashboard</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Profile</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="user-avatar text-center d-block">
                      <img src="assets/images/avatar-1.jpg" alt="User Avatar" class="rounded-circle user-avatar-xxl" />
                    </div>
                    <div class="text-center">
                      <h2 class="font-24 mb-0">Michael J. Christy</h2>
                      <p>Manager @Store</p>
                    </div>
                  </div>
                  <div class="card-body border-top">
                    <h3 class="font-16">Rating</h3>
                    <h1 class="mb-0">4.8</h1>
                    <div class="rating-star">
                      <i class="fa fa-fw fa-star"></i>
                      <i class="fa fa-fw fa-star"></i>
                      <i class="fa fa-fw fa-star"></i>
                      <i class="fa fa-fw fa-star"></i>
                      <i class="fa fa-fw fa-star"></i>
                      <p class="d-inline-block text-dark">14 Reviews </p>
                    </div>
                  </div>
                  <div class="card-body border-top">
                    <h3 class="font-16">Category</h3>
                    <div>
                      <a href="#" class="badge badge-light mr-1">Food</a><a href="#" class="badge badge-light mr-1">Food & Beverage</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">

                <div class="influence-profile-content pills-regular">
                  <ul class="nav nav-pills mb-3 nav-justified" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="pills-campaign-tab" data-toggle="pill" href="#pills-campaign" role="tab" aria-controls="pills-campaign" aria-selected="true">Settings</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="pills-packages-tab" data-toggle="pill" href="#pills-packages" role="tab" aria-controls="pills-packages" aria-selected="false">Billing</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="pills-review-tab" data-toggle="pill" href="#pills-review" role="tab" aria-controls="pills-review" aria-selected="false">Membership</a>
                    </li>
                  </ul>
                  <div class="tab-content" id="pills-tabContent">
                    <AccountDetails name={"Settings"} />
                    <div class="tab-pane fade" id="pills-packages" role="tabpanel" aria-labelledby="pills-packages-tab">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div class="card">
                            <h5 class="card-header">Billing Information</h5>
                            <div class="card-body">
                              <form>
                                <div class="row">

                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="pills-packages" role="tabpanel" aria-labelledby="pills-packages-tab">
                      <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div class="card">
                            <h5 class="card-header">Plan</h5>
                            <div class="card-body">
                              <form>
                                <div class="row">

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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
export default PageAccount;
