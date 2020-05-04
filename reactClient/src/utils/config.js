import config from 'react-global-configuration'


export default function setupConfig() {
    const envFileExists = (typeof process.env.REACT_APP_DEPLOY !== 'undefined');
    // Use config values
    if (envFileExists) {
        try {
            config.set({
                envFileExists: envFileExists.toString(),
                port: process.env.REACT_APP_AXIOS_PORT.toString(),
                baseUrl: process.env.REACT_APP_AXIOS_BASE_URL.toString(),
                subfolder: process.env.REACT_APP_SUBFOLDER.toString(),
                bingKey: process.env.REACT_APP_BING_KEY.toString()
            })
        }
        catch (ex) {
            console.log('Error during creation of global config, maybe you are missing a field in your .env file? ', ex)
        }
    }
    else { //Use defaults because config does not exist, assume program is running locally.
        config.set({
            envFileExists: envFileExists.toString(),
            port: 5001,
            baseUrl: 'http://localhost',
            subfolder: '/',
            bingKey: null
        })
    }

}
setupConfig();