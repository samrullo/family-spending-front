const NumberFormField = ({
  fieldItem,
  fieldsFormState,
  handleFieldInputChange,
}) => {
    //console.log(`field form state : ${JSON.stringify(fieldsFormState)}`)
  return (
    <div className="form-group" key={fieldItem.id}>
      <label>{fieldItem.name}</label>
      <input
        type="number"
        className="form-control"
        value={fieldsFormState[fieldItem.id] || ""}
        onChange={(e) => {
          handleFieldInputChange(e, fieldItem.id);
        }}
      />
    </div>
  );
};

export default NumberFormField;
