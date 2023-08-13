const NumberFormField = ({
  fieldItem,
  defaultValue,
  fieldsFormState,
  handleFieldInputChange,
}) => {
  // console.log(`field form state : ${JSON.stringify(fieldsFormState)}`);
  // console.log(`fieldItem is ${JSON.stringify(fieldItem)}`)
  return (
    <div className="form-group" key={fieldItem.id}>
      <label>{fieldItem.name}</label>
      <input
        type="number"
        className="form-control"
        value={fieldsFormState[fieldItem.id] || defaultValue}
        onChange={(e) => {
          handleFieldInputChange(e, fieldItem.id);
        }}
      />
    </div>
  );
};

export default NumberFormField;
