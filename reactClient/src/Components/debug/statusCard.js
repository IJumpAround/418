import React from "react";
import Button from "react-bootstrap/Button";

class StatusCard extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const target = this.props.target_text
        const status = this.props.status
        const message = this.props.statusMessage
        return (
            <div className={this.choose_card(status)}>
                <div className="card-header text-center">{target} Status</div>
                <div className="card-body border-top border-bottom border-dark">
                    <h5 className="card-title text-center">{target} is:  &nbsp;{status}</h5>
                    <p className="card-text text-center">{message}</p>
                </div>
                <Button id="db_button"
                        variant={this.choose_button(status)}
                        onClick={() => this.props.test_function()}
                >Check {target} Status</Button>
            </div>
        );
    }


    choose_card(status) {
        const basecard = "card text-white bg-primary mb-3 max-width: 16rem";
        const successCard = "card text-white bg-success mb-3 max-width: 16rem border-bo";
        const failCard = "card text-white bg-danger mb-3 max-width: 16rem";

        if (status === 'Up') {
            return successCard;
        } else if (status === 'Down')
            return failCard;
        else
            return basecard;
    }

    choose_button(status) {
        const baseButton = "info";
        const errorButton = "warning";
        const successButton = "success"

        if (status === "Up")
            return successButton
        if (status === 'Down')
            return errorButton
        else
            return baseButton
    }
}

export default StatusCard