import { useEffect, useState, Component } from "react";

class Fields extends Component {
    constructor (props) {
        super(props);
        this.state = {
            fields: props.fields,
            modalType: props.modalType,
            fieldsValues: this.setFieldValues(props.fields)
        };
    }

    setFieldValues = (fields) => {
        const newObj = {};
        for (const field of fields) {
            newObj[field.name] = field.value;
        }
        return newObj;
    }

    componentDidUpdate = () => {
        if (
            this.state.fields !== this.props.fields ||
            this.state.modalType !== this.props.modalType
        ) {
            this.setState({
                fields: this.props.fields,
                modalType: this.props.modalType,
                fieldsValues: this.setFieldValues(this.props.fields)
            });
        }
    }

    submit = (e) => {
        this.props.onSubmit(this.state.fieldsValues);
    }

    handleInput = (e) => {
        const fieldName = e.target.id;
        const fieldValue = e.target.value;
        this.setState({
            fieldsValues: {...this.state.fieldsValues, [fieldName]: fieldValue}
        })
    }

    render () {
        return (
            <div>
                <div className="modal-body">
                    <form>
                    {    
                        this.state.fields.map((field, index) => {
                            return (
                                <div className="mb-3" key={ index }>
                                    <label htmlFor={ field.name } className="col-form-label">{ field.label }</label>
                                    <input type={ field.type } className="form-control" id={ field.name }  value={ this.state.fieldsValues[field.name] || "" } onChange={ this.handleInput }/>
                                </div>
                            )
                        })
                    }
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <button 
                        type="button"
                        className={ `btn btn-${this.state.modalType === "edit" ? "success" : "primary"}` }
                        data-bs-dismiss="modal"
                        onClick={ this.submit }
                    >
                    { this.state.modalType === "edit" ? "Edit" : "Add" }
                    </button>
                </div>
            </div>
        );
    }
}

export default Fields;