import axios from "./axiosInstance";
const defaultAxios = require('axios')

/**
 * Add the provided url to the mysql db. Requires that the image has already been uploaded to an S3 bucket
 * and we have the public url
 * @param {string} url the publicly viewable url the image is hosted at
 * @param {number} dorm_id id of this dorm
 * @param {number} user_id user who added the dorm
 */
export async function addDormImageToDb(url, dorm_id, user_id) {
    let result = await axios.post('/images', {
        entity_id: {
            dorm_id: dorm_id,
            user_id: user_id
        },
        image_type: 'dorm',
        url: url
    })
    if(result.status === 200) {
        console.log('dorm image added to database')
        return true
    }
    else {
        console.log('image not added to db')
        return false
    }
}

export async function addProfileImageToDb(url, user_id) {
    let result = await axios.post('/images', {
        entity_id: user_id,
        url: url,
        image_type: 'profile'
    })

    if(result.status === 200) {
        console.log('Profile image added')
        return true
    }
    else {
        console.log('Profile image was not added')
        return false
    }
}

/**
 * Retrieve image urls that have been uploaded for this dorm.
 * @param {number} dorm_id - dorm whose images we are retrieving
 * @returns {Promise<void>} resolves to a list of urls, or null if an error ocurred.
 */
export async function retrieveDormImage(dorm_id) {
    let result = await axios.get('/images',{
        params: {
            image_type: 'dorm',
            entity_id: dorm_id
        }
    })
    if (result.status === 200)
    {
        return result.data.payload.urls
    }
    else{
        return -1
    }
}

/**
 * Retrieves the given user's profile image
 * @param {number} user_id
 * @param {function} callback
 * @returns {Array<string>} Promise resolves to the url, or null if the retrieval failed
 */
export async function retrieveProfileImage(user_id, callback) {
    let result = await axios.get('/images', {
        params: {
            image_type: 'profile',
            entity_id: user_id,
        }
    })

    if(result.status === 200) {
        return result.data.payload.urls
    }
    else {
        return -1
    }

}


/**
 * Get a signed url from the back end and use it to upload the passed file to the s3 bucket. Appends some random numbers to the file name to avoid filename collisions
 * @param {string | Blob} file - File from the file upload input element
 * @return {string} The public url at which the file is viewable
 */
export async function uploadImage(file) {

    // Partially randomize filename
    let file_parts = file.name.split('.')
    let name = file_parts[0].substring(0,15)
    let extension = file_parts[1]
    let newFilename = name + (Math.floor(Math.random() * (1000000 - 1) ) + 1).toString() + '.' + extension;

    // Get signed url
    let urlResult = await axios.get('/s3Upload',{params: {filename: newFilename}})
    let url = urlResult.data.url
    let view_url = urlResult.data.view_url

    // Generate FormData object from signedURL fields
    let data = new FormData()
    Object.keys(urlResult.data.fields).forEach(key => {
        data.append(key, urlResult.data.fields[key]);
    });
    data.append('file', file, newFilename)

    // Post file to s3 using default axios
    let uploadResult = await defaultAxios.post(url,data)

    console.log('upload post result ', uploadResult)
    return view_url
}