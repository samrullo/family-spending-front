import Select from "react-select";
import { useState } from "react";
const FormFieldV2 = ({
  fieldType,
  fieldLabel,
  fieldValue,
  handleFieldValueChange,
}) => {
  return (
    <div className="form-group">
      <label>{fieldLabel}</label>
      <input
        type={fieldType}
        className="form-control"
        value={fieldValue}
        onChange={handleFieldValueChange}
      />
    </div>
  );
};

export default FormFieldV2;
