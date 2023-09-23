const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : ['cloudinary.com','res.cloudinary.com']
    } ,  
    publicRuntimeConfig: {
        uploadsPath: path.resolve(__dirname, 'uploads'),
    }
}

module.exports = nextConfig
