import React from 'react'
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {testServerStatus, testDatabaseConnection}  from '../../utils/endpointTest'


class DebugPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverUp: 'Unknown',
            dbUp: 'Unknown'
        }
        this.serverStatus= this.serverStatus.bind(this)
    }

    render() {
        return (
            <div className='container-fluid'>
                <ButtonToolbar>
                    <div className='row'>

                        <div className='col-3'>
                        </div>
                        <div className='col-3'/>
                        <div className='col-3'>
                            <Button variant="info" onClick={testDatabaseConnection(this)}>Check Server Status</Button>
                        </div>
                        <div className='col-3'>
                            <Button variant="info" onClick={testServerStatus(this)}>Check Server Status</Button>
                        </div>
                    </div>
                </ButtonToolbar>
            </div>
        )
    }

}


export default DebugPage