import axios from "./axiosInstance";
import {axios as defaultAxios} from 'axios'
/**
 * Add the provided url to the mysql db. Requires that the image has already been uploaded to an S3 bucket
 * and we have the public url
 * @param {string} url the publicly viewable url the image is hosted at
 * @param {any} dorm_id id of this dorm
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


/**
 * Get a signed url from the back end and use it to upload the passed file to the s3 bucket. Appends some random numbers to the file name to avoid filename collisions
 * @param {string | Blob} file - File from the file upload input element
 * @return {string} The public url at which the file is viewable
 */
export async function uploadImage(file) {
    const validFormats = ['jpg','bmp','png']

    // Partially randomize filename
    let file_parts = file.name.split('.')
    let name = file_parts[0]
    let extension = file_parts[0]
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