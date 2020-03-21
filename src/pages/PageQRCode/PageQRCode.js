import React, { useState, useEffect, useCallback, useRef } from 'react';
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import Modal from 'react-awesome-modal';
import GenerateQRCode from '../../components/GenerateQRCode/GenerateQRCode';
import Select from 'react-select';
import Avatar from 'react-avatar';
import { components } from 'react-select';


const options = [
    { value: 'Anwar Maju - Kelana Jaya', label: 'Anwar Maju - Kelana Jaya', avatar: "" },
    { value: 'Anwar Maju - Suwnay Payramid', label: 'Anwar Maju - Suwnay Payramid', avatar: "32" },
    { value: 'Anwar Maju - Chearas', label: 'Anwar Maju - Chearas', avatar: "34" },
];

TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});

const PageQRCode = props => {

    const childRef = useRef();


    const [values, setValues] = useState({
        loading: true,
        visible: false,
        validation: false,
        selectedOption: null,
    });
    const [showQRCode, setQRCode] = useState(false);

    const BranchOption = props => {
        const { data } = props;
        return (
            <components.Option {...props}>
                <Avatar round size={30} name={data.label} src={data.avatar} />
                <label style={{ padding: "5px" }}>
                    {data.label}
                </label>
            </components.Option>
        );
    };

    const handleChange = selectedOption => {
        setValues({ selectedOption })
        console.log(`Option selected:`, selectedOption);
    };

    const openModal = () => {
        setValues({ visible: true });
    }

    const closeModal = useCallback(() => {
        setValues({ visible: false })
    });

    const onSubmit = useCallback((data) => {
        console.log(data);
        childRef.current.hanldeShowQRCode()
    });
    useEffect(() => {
        setTimeout(() => {
            setValues(values.loading = false)
        }, 2000)
    }, []);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav qr={true} />
            <div class="dashboard-wrapper">
                <Modal visible={values.visible} width="400" height={"400"} effect="fadeInUp" onClickAway={() => closeModal()}>
                    <GenerateQRCode ref={childRef} onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <div class="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">QRCode</h2>
                                <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">QRCode</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Generate</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <div class="section-block">
                                        <h3 class="section-title">My Active QRCode</h3>
                                    </div>
                                </div>
                                <div className="col-md-6" style={{ textAlign: "right" }}>
                                    <div class="section-block">
                                        <button className="btn btn btn-primary" onClick={openModal}><i className="fas fa-qrcode"></i> Generate QRCode</button>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <h5 class="card-header">QRCode</h5>
                                <div class="card-body">
                                    <Select
                                        isSearchable
                                        placeholder={"Choose Your Branch"}
                                        value={values.selectedOption}
                                        onChange={handleChange}
                                        components={{ Option: BranchOption }}
                                        options={options}
                                    />
                                    <p style={{ marginTop: "20px" }} className="text-center">No QRCode Avaliable</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default PageQRCode;

