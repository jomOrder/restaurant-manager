import React, { useEffect, useState } from "react";
import API from "../../services/API";
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'; // The default
import Avatar from 'react-avatar';

import { Pane, Heading, Button } from 'evergreen-ui'

const PagePayment = props => {
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
        <div class="container-fluid dashboard-content ">
            <div className="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <Pane
                        elevation={2}
                        width={500}
                        height={500}
                        margin={24}
                        display="flex"
                        justifyContent="center"
                        style={{ margin: "0 auto", border: "1px solid #DDD" }}
                        backgroundColor={"#FFF"}
                        alignItems="center"
                        flexDirection="column"
                    >
                    </Pane>

                </div>
            </div>
        </div>

    )
}

PagePayment.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default PagePayment;
