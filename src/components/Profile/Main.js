import React, { useEffect } from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import { GeneralInfoForm } from "./Form";
import "react-datetime/css/react-datetime.css";
import { Link } from "react-router-dom";
import {IoMdArrowRoundBack} from 'react-icons/io'
const Student = () => {
  useEffect(()=>{
 alert("This page is for frontend only..")
  },[])
  return (
    <>
    <div className="bg-white shadow-lg shadow-myBlue py-4 px-5 ">
    <Link to={'/admin-dash'}><IoMdArrowRoundBack size={24} className="cursor-pointer"/></Link>
    </div>
    <div className="container mx-auto px-4">
      
      <Row>
        <Col xs={12} xl={8}>
          <GeneralInfoForm />
        </Col>
      </Row>
    </div>
    </>
  );
};

export default Student;
