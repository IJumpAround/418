import React from 'react'
import EndpointTest from '../../utils/endpointTest'
import StatusCard from "./statusCard";
import config from 'react-global-configuration'
import './debug.css'
import axios from '../../utils/axiosInstance'

class DebugPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dbStatus: 'Unknown',
            dbStatusMessage: '',
            serverStatus: 'Unknown',
            serverStatusMessage: '',
            sessionInfo: false,
        };
        this.test_db = this.test_db.bind(this);
        this.test_server = this.test_server.bind(this);
    }

    render() {
        return (
            <div className='debug'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-12">
                            <br/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-sm-6 col-md-4'>
                            <StatusCard
                                status={this.state.serverStatus}
                                statusMessage={this.state.serverStatusMessage}
                                test_function={this.test_server}
                                target_text="Server"
                            />
                        </div>
                        <div className="col- col-sm-6 col-md-4">
                            <StatusCard
                                status={this.state.dbStatus}
                                statusMessage={this.state.dbStatusMessage}
                                test_function={this.test_db}
                                target_text="Database"
                            />
                        </div>
                        <div className="col- col-md-4">
                            <div className={"card text-white bg-primary mb-3 max-width: 16rem;"}>
                                <div className="card-header text-center">Settings</div>
                                <div className="card-body border-top border-bottom border-dark">
                                    <h5 className="card-title text-center">Config Info:</h5>
                                    <p className="card-text text-center">env file present: {config.get('envFileExists')}
                                        <br/>
                                        port: {config.get('port')} <br/>
                                        baseUrl: {config.get('baseUrl')} <br/>
                                        subfolder: {config.get('subfolder')} <br/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4'>
                            <p>{this.state.sessionInfo}</p>
                            <button onClick={this.login_test}>Is User logged in?</button>
                        </div>
                        <div className={'col-4'}>
                            <button onClick={this.redirect_test}>Redirect to home from backend</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4'/>
                        <div className='col-4'/>
                        <div className='col-4'/>
                    </div>
                </div>
            </div>
        )
    }

    login_test = () => {
        axios.get('/user/user_logged_in')
            .then((result) => {
                this.setState({sessionInfo:true})
            })
            .catch((error) => {
                this.setState({sessionInfo:false})
            })
    };

    test_db() {
        this.setState({'dbStatus': spinner()});
        EndpointTest.testDatabaseConnection(this)
    }

    test_server() {
        this.setState({'serverStatus': spinner()});
        EndpointTest.testServerStatus(this);
    }

}


function spinner() {
    return (
        <div className="spinner-border text-white" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default DebugPage