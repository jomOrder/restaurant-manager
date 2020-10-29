import React, { useEffect, useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import PropTypes from 'prop-types';

TopBarProgress.config({
  barColors: {
    "0": "#be1c1c",
    "1.0": "#be1c1c"
  },
  shadowBlur: 1
});

const PagePaymentHistory = (props) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({
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
      <SideNav paymentHistory={true} />
      <div className="dashboard-wrapper">
        <div class="col-12 d-flex justify-content-center">
          <div>
            <img className="logo-img" style={{ width: 280, marginTop: 220 }} src="../assets/images/no_data_found.svg" alt="no_data_found" />
            <p style={{marginLeft: 20}}>No Payment Available</p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

PagePaymentHistory.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

export default PagePaymentHistory;
