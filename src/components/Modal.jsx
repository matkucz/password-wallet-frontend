import { Component } from "react";
import Fields from "./Fields";

class Modal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modalName: this.props.name,
            title: this.props.title,
            fields: this.props.fields,
            modalType: "edit"
        }
    }

    componentDidUpdate = () => {
        if (
            this.state.modalName !== this.props.name
            || this.state.title !== this.props.title
            || this.state.fields !== this.props.fields
            || this.state.modalType !== this.props.modalType
        ) {
                this.setState({
                    modalName: this.props.name,
                    title: this.props.title,
                    fields: this.props.fields,
                    modalType: this.props.modalType
                });
            }
    }


    render () {
        return (
            <div className="modal fade" id={ this.state.modalName } tabIndex="-1" aria-labelledby={ this.state.modalName + "Label" } aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={ this.state.modalName + "Label" }>{ this.state.title }</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <Fields
                            fields={ this.state.fields }
                            modalType={ this.state.modalType }
                            onSubmit={ this.props.onSubmit }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;