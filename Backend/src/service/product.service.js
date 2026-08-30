const ImageKit = require('@imagekit/nodejs')

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT
})

const uploadFile = async (file) => {

    const result = await imagekit.files.upload({
        file: file.toString('base64'),
        fileName: `image-${Date.now()}.jpg`
    })
    return result
}

module.exports = uploadFile;