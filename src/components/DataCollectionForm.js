import {useState} from "react";
import SelectorWrapper from "./SelectorWrapper";
import InputWrapper from "./InputWrapper";
import {Formik} from "formik";
import Form from 'react-bootstrap/Form';
import {Button, Col, Row} from "react-bootstrap";
import {data, postData} from "../services/services";
import {ValidationSchema} from "../validation/ValidationSchema";

const DataCollectionForm = () => {
        const [selectedDistrict, setSelectedDistrict] = useState();
        const availableRegions = data.districts.find(item => item.name === selectedDistrict);
        return (
            <div>
                <Formik
                    initialValues={{
                        lastName: '',
                        firstName: '',
                        secondName: '',
                        email: '',
                        phoneNumber: '',
                        district: 'Выбрать...',
                        region: 'Выбрать...'
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        postData(JSON.stringify(values));
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }}
                >
                    {({
                          values,
                          errors,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-4">
                                <InputWrapper
                                    name={"lastName"}
                                    title={"Фамилия"}
                                    placeholder={"Введите фамилию"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.lastName}
                                    error={errors.lastName}/>
                                <InputWrapper
                                    name={"firstName"}
                                    title={"Имя"}
                                    placeholder={"Введите имя"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.firstName}
                                    error={errors.firstName}/>
                                <InputWrapper
                                    name={"secondName"}
                                    title={"Отчество"}
                                    placeholder={"Введите отчество"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.secondName}
                                    error={errors.secondName}/>
                            </Row>
                            <Row className="mb-4 col-6">
                                <InputWrapper
                                    name={"email"}
                                    title={"Email"}
                                    placeholder={"example@example.com"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.email}
                                    error={errors.email}/>
                            </Row>
                            <Row className="mb-3">
                                <InputWrapper
                                    name={"phoneNumber"}
                                    title={"Номер телефона"}
                                    placeholder={"+7(999)-999-99-99"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.phoneNumber}
                                    error={errors.phoneNumber}/>

                                <Form.Group as={Col}
                                            controlId="formGridDistrict"
                                            onChange={(e) => setSelectedDistrict(e.target.value)}>
                                    <SelectorWrapper
                                        name="district"
                                        title={"Округ"}
                                        error={errors.district}
                                        isInvalid={!!errors.district}
                                        options={data.districts.map(item => item.name)}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridRegion">
                                    <SelectorWrapper
                                        name="region"
                                        title={"Регион"}
                                        error={errors.region}
                                        disabled={!availableRegions?.regions}
                                        isInvalid={!!errors.region}
                                        options={availableRegions?.regions ? availableRegions?.regions : data.districts[0].regions}/>
                                </Form.Group>
                            </Row>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Отправить форму
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
;

export default DataCollectionForm;