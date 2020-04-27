import React from 'react'
import axios from '../../utils/axiosInstance'
import {options as buildingOptions} from "./buildingOptions";

class addDormForm extends React.Component {
    test = false // Disables querying geocode api when true
    constructor(props) {
        super(props);

        try {
            this.state = {
                coords: props.location.dormFormProps.coords,
                formDefaults: {},
                offCampus: false
            }
        } catch (ex) {
            this.state = {
                coords: null,
                formDefaults: {},
                offCampus: false,
            }
            console.log(ex)
        }

    }

    componentWillMount() {
        // Only geocode if we have coordinates
        if (this.state.coords != null) {
            this.bingReverseGeo(this.state.coords, (address) => {
                this.storeAddressFields(address)
            })
        }
    }

    // Use an address to get coordinates from bing's api.
    bingGeo = (address, callback) => {
        fetch(`http://dev.virtualearth.net/REST/v1/Locations/${address}&maxResults=1&key=AtVpew29wF6vGwfKIVd-IfeNta0fA4gmM9Kuz_hoGNIl25-oNfo3jML_zaPTTZfF`)
            .then((response) => {
                response.json()
                    .then((res) => {
                        let coords = res.resourceSets[0].resources[0].point.coordinates
                        coords = {
                            lat: coords[0],
                            long: coords[1]
                        }
                        console.log('raw response geolocate ', res)
                        console.log('coords from geolocate', coords)
                        callback(coords)
                    })
            })
    }

    // Use bing api to get an address from a latitude/longitude
    bingReverseGeo = (latlng, callback) => {
        console.log('reversegeo latlng input', latlng)
        // Use test data to populate form if testing is enabled
        if(this.test) {
            callback({
                addressLine: 'test address',
                adminDistrict: 'test state',
                adminDistrict2: 'test city',
                postalCode: '00000'
            })
            return
        }

        // Otherwise, query Bing's api
        fetch(`http://dev.virtualearth.net/REST/v1/Locations/${latlng.lat},${latlng.lng}?o=json&key=AtVpew29wF6vGwfKIVd-IfeNta0fA4gmM9Kuz_hoGNIl25-oNfo3jML_zaPTTZfF`)
            .then((response) => {
                response.json()
                    .then((res) => {
                        console.log('reversegeo', res)
                        let addr = res.resourceSets[0].resources[0].address
                        callback(addr)
                    })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    // set state from resulting reverse geocoded address.
    storeAddressFields(address) {
        console.log('address', address)
        let city = address.adminDistrict2

        if (city != null) {
            city = city.split(' ')[0]
        }
        this.setState({
            formDefaults: {
                address_1: address.addressLine || '',
                state: address.adminDistrict || '',
                city: city || '',
                zip: address.postalCode || ''
            }
        })


    }

    // Compare geocoded address with values in the form. If they are different, then the user has modified the address
    // portion of the form
    formAddressUnchanged(address) {
        let defaults = this.state.formDefaults
        for(let prop in address) {
            let val = address[prop]
            console.log('comparing ', val, 'and ', defaults[prop])
            if(defaults[prop] !== val) {
                return false
            }
        }
        return true
    }

    // Enable or disable room type and building selections if "off campus" is chosen.
    quadOnChange = (event) => {
        let value = event.target.value

        if(value === "Off Campus") {
            this.setState({offCampus: true})
        }
        else {
            if(this.state.offCampus === true) {
                this.setState({offCampus: false})
            }
        }
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log(event.target)

        // TODO use regular geocode if address is not passed in.
        // Disable address field if passed in from props.
        // Alternatively, get coords from geocode if user changes address from what is passed.
        if(this.state.coords == null){
            alert("Error, coordinates are missing from state. Maybe you didn't reach this page via the search page?")
            return
        }
        let address, city, state, zip
        address = event.target.address.value
        city = event.target.city.value
        state = event.target.state.value
        zip = event.target.zip_code.value

        // Check if the address was changed from our geocoded result
        let addressUnchanged = this.formAddressUnchanged({
            address_1: address,
            city: city,
            state: state,
            zip: zip
        })

        // Either set up to get new coordinates, or just don't allow changing
        if(!addressUnchanged) {
            alert('address form has been changed from the initial default values')
            return
        }

        // Construct location portion of payload
        let payload = {
            address: address + ", " + city + ", " + state + ", " + zip,
            room_num: event.target.room_num.value,
            building: this.state.offCampus ? 'NA' : event.target.building.value,
            quad: event.target.quad.value,
            floor: event.target.floor.value,
            latitude: this.state.coords.lat,
            longitude: this.state.coords.lng,
            features: {}
        }


        // Features & Room
        payload.features.room_type = this.state.offCampus ? "NA" : event.target.room_type.value
        payload.features.bathroom = event.target.bathroom.value
        payload.features.ac = event.target.ac.value
        payload.features.gym = event.target.gym.value
        payload.features.laundry = event.target.laundry.value
        payload.features.internet = event.target.internet.value
        payload.features.kitchen = event.target.kitchen.value

        console.log(JSON.stringify(payload))
        this.postToApi(payload)
    }

    // add dorm to mysql database via flask backend
    async postToApi(payload) {
        let result = await axios.post('/dorms', payload)
        let message
        if(result.status === 200){
            //success
            console.log(`Success! navigating to single dorm page ${result.data}`)
            window.location.pathname = `/singleDorm/${result.data.payload.dorm_id}`
        }
        else{
            alert(`Error adding dorm: ${result.data.payload.message}`)
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Add Your Dorm</h3>
                        <form className="card-text" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Quad:</label>
                                        <select required name="quad" className="custom-select mb-2"
                                        onChange={this.quadOnChange}>
                                            <option value="" selected disabled hidden>Choose a quad</option>
                                            <option value="Colonial">Colonial</option>
                                            <option value="Dutch">Dutch</option>
                                            <option value="Indian">Indian</option>
                                            <option value="State">State</option>
                                            <option value="Off Campus">Off Campus</option>
                                            ></select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 mb-2">
                                        <label>Building:</label>
                                        <select required className="custom-select" name="building" id="building_select"
                                        disabled={this.state.offCampus}>
                                            <option value="" selected disabled hidden>Choose a Building</option>
                                            <option value="NA">N/A</option>
                                            {buildingOptions.map((x) => <option key={x} value={x}>{x}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-sm-2">
                                        <label>Floor #:</label>
                                        <input required type="number" className="form-control" name="floor"/>
                                    </div>
                                    <div className="col-sm-2">
                                        <label>Room #:</label>
                                        <input required type="number" className="form-control" name="room_num"

                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-7">
                                        <label>Address:</label>
                                        <input required type="text" className="form-control mb-2" name="address"
                                               defaultValue={this.state.formDefaults.address_1}/>
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Zip:</label>
                                        <input required type="number" className="form-control" name="zip_code"
                                               defaultValue={this.state.formDefaults.zip}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label>State:</label>
                                        <input required type="text" className="form-control mb-2" name="state"
                                               defaultValue={this.state.formDefaults.state}/>
                                    </div>
                                    <div className="col-sm-3">
                                        <label>City:</label>
                                        <input required type="text" className="form-control" name="city"
                                               defaultValue={this.state.formDefaults.city}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Room Type:</label>
                                        <select required name="room_type" className="custom-select mb-2"
                                        disabled={this.state.offCampus}>
                                            <option value="" selected disabled hidden>Select Type</option>
                                            <option value="Single">Single</option>
                                            <option value="Double">Double</option>
                                            <option value="Triple">Triple</option>
                                            <option value="Quad">Quad</option>
                                            ></select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-5">
                                        <label className="">Dorm Image:</label>
                                        <input type="file" className="mb-2 mt-2" id="dorm_image" name="dorm_image"
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-4">
                                        <label>Bathroom:</label>
                                        <div className='form-check'>
                                            <input type="radio"
                                                   className="form-check-input"
                                                   required
                                                   name="bathroom"
                                                   id="bath_dorm"
                                                   value='In Dorm'
                                            />
                                            <label className="form-check-label" htmlFor='bath_floor'>In Dorm</label>
                                        </div>
                                        <div className='form-check'>
                                            <input type="radio"
                                                   className="form-check-input"
                                                   required
                                                   name="bathroom"
                                                   id="bath_floor"
                                                   value='On Floor'
                                            />
                                            <label className="form-check-label">On Floor</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Air Conditioning:</label>
                                        <div className="form-check">
                                            <input type="radio"
                                                   className='form-check-input'
                                                   required
                                                   name="ac"
                                                   id="ac_yes"
                                                   value={true}
                                            />
                                            <label className="form-check-label">Yes</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio"
                                                   className='form-check-input'
                                                   required
                                                   name="ac"
                                                   id="ac_no"
                                                   value={false}

                                            />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-4">
                                        <label>Fitness Area:</label>

                                        <div className='form-check'>
                                            <input type="radio"
                                                   className="form-check-input"
                                                   required
                                                   name="gym"
                                                   id="gym_yes"
                                                   value={true}
                                            />
                                            <label className="form-check-label">Yes</label>
                                        </div>

                                        <div className='form-check'>
                                            <input type="radio"
                                                   className='form-check-input'
                                                   required
                                                   name="gym"
                                                   id="gym_no"
                                                   value={false}
                                            />No
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Laundry:</label>
                                        <div className='form-check'>
                                            <input type="radio"
                                                   className='form-check-input'
                                                   required
                                                   name="laundry"
                                                   id="laundry_dorm"
                                                   value='In Dorm'
                                            />
                                            <label className="form-check-label">In Dorm</label>
                                        </div>
                                        <div className='form-check'>
                                            <input type="radio"
                                                   className='form-check-input'
                                                   required
                                                   name="laundry"
                                                   id="laundry_floor"
                                                   value='On Floor'
                                            />
                                            <label className="form-check-label">On Floor</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Internet:</label>
                                            <div className='form-check'>
                                                <input type="radio"
                                                       className='form-check-input'
                                                       required
                                                       name="internet"
                                                       id="wifi"
                                                       value='Wifi'
                                                /> <label className="form-check-label">Wifi</label>
                                            </div>

                                            <div className='form-check'>
                                                <input type="radio"
                                                       className='form-check-input'
                                                       required
                                                       name="internet"
                                                       id="ethernet"
                                                       value='Ethernet'
                                                /> <label className="form-check-label">Ethernet</label>
                                            </div>
                                            <div className='form-check'>
                                                <input type="radio"
                                                       className='form-check-input'
                                                       required
                                                       name="internet"
                                                       id="internet_both"
                                                       value='Both'
                                                /><label className="form-check-label">Both</label>
                                            </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Dining:</label>
                                            <div className='form-check'>
                                                <input type="radio"
                                                       className='form-check-input'
                                                       required
                                                       name="kitchen"
                                                       id="dining_hall"
                                                       value='Dining Hall'
                                                /><label className="form-check-label">Dining Hall</label>
                                            </div>
                                            <div className='form-check'>
                                                <input type="radio"
                                                       className='form-check-input'
                                                       required
                                                       name="kitchen"
                                                       id="dorm_kitchen"
                                                       value='In Dorm Kitchen'
                                                /><label className="form-check-label">In Dorm Kitchen</label>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="align-items-center">
                                <button className="btn btn-dark">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default addDormForm