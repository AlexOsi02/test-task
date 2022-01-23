import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap";

const SelectorWrapper = ({name, title, placeholder, error, handleChange, handleBlur, value}) => {
  return(
      <Form.Group as={Col} controlId={name}>
          <Form.Label>{title}</Form.Label>
          <Form.Control
              name={name}
              placeholder={placeholder}
              isInvalid={!!error}
              onChange={handleChange}
              onBlur={handleBlur}
              value={value}/>
          {error ? (
              <Form.Control.Feedback type="invalid">
                  {error}
              </Form.Control.Feedback>
          ) : null}
      </Form.Group>
  )
}

export default SelectorWrapper;