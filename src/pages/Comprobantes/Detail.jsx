import React, { useEffect, useRef, useState } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    Button,
    Label,
    Input,
    Container,
    FormFeedback,
    Form,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { AgGrid } from "../../components/AgGrid";
import { useParams } from "react-router-dom";
import { useMount } from "react-use";
import { get } from "../../helpers/axiosClient";

const ComprobanteDetalle = () => {
    const { id } = useParams();
    const ref = useRef();
    const [formData, setFormData] = useState();
    const [gridData, setGridData] = useState([]);

    useMount(async () => {
        if (!id) return;
        const data = await get(`/comprobante-diario/${id}`);
        validation.setFieldValue("nombre", data.nombre);
        validation.setFieldValue("fecha", data.fecha);
        setFormData(data);
        setGridData(data.comprobanteDiarioItem);
    }, [id]);

    // Form validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            nombre: "",
            fecha: "",
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required(
                "Por favor ingresar un nombre al comprobante"
            ),
            fecha: Yup.string().required(
                "Por favor ingresar una fecha al comprobante"
            ),
        }),
        onSubmit: (values) => {
            console.log("values", values);
        },
    });

    const columns = [
        {
            field: "sel",
            checkboxSelection: true,
            headerName: "",
            maxWidth: 45,
        },
        {
            field: "numeroCuenta",
            headerName: "Numero Cuenta",
        },
        {
            field: "descripcion",
            headerName: "Descripcion",
        },
        {
            field: "parcial",
            headerName: "Parcial",
        },
        {
            field: "debito",
            headerName: "Debe",
        },
        {
            field: "haber",
            headerName: "Haber",
            valueGetter: (params) => params.data.debito - params.data.parcial,
        },
    ];

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Comprobantes" breadcrumbItem="Nuevo" />
                <Container fluid={true}>
                    <Row>
                        <Col xl="6">
                            <Card>
                                <CardBody>
                                    <Form
                                        className="needs-validation"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                    >
                                        <Row>
                                            <Col md="4">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom01">
                                                        Nombre
                                                    </Label>
                                                    <Input
                                                        name="nombre"
                                                        placeholder="Nombre"
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .nombre || ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .nombre &&
                                                            validation.errors
                                                                .nombre
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched
                                                        .nombre &&
                                                    validation.errors.nombre ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .nombre
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom02">
                                                        Fecha
                                                    </Label>
                                                    <Flatpickr
                                                        id="validationCustom02"
                                                        className="form-control"
                                                        placeholder="M, dd,yyyy"
                                                        readOnly={true}
                                                        options={{
                                                            // altInput: true,
                                                            altFormat: "F j, Y",
                                                            dateFormat: "d-m-Y",
                                                        }}
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .fecha || ""
                                                        }
                                                        onInvalid={() =>
                                                            validation.touched
                                                                .fecha &&
                                                            validation.errors
                                                                .fecha
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {/* <Input
                                                        name="fecha"
                                                        placeholder="Last name"
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom02"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .fecha || ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .fecha &&
                                                            validation.errors
                                                                .fecha
                                                                ? true
                                                                : false
                                                        }
                                                    /> */}
                                                    {validation.touched.fecha &&
                                                    validation.errors.fecha ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .fecha
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button color="primary" type="submit">
                                            Guardar todo
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container fluid={true}>
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">Detalle</h4>
                                    <AgGrid
                                        ref={ref}
                                        height={500}
                                        data={gridData}
                                        columns={columns}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ComprobanteDetalle;
