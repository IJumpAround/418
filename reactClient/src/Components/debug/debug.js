import React from 'react'
import EndpointTest from '../../utils/endpointTest'
import StatusCard from "./statusCard";
import './debug.css'

class DebugPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serverStatus: 'Unknown',
            serverStatusMessage: '',
            dbStatus: 'Unknown',
            dbStatusMessage: ''
        };
        this.test_db = this.test_db.bind(this)
        this.test_server = this.test_server.bind(this)
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

    test_db() {
        this.setState({'dbStatus': spinner()})
        EndpointTest.testDatabaseConnection(this)
    }

    test_server() {
        this.setState({'serverStatus': spinner()})
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