/** @type {import('next').NextConfig} */
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

const nextConfig = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            swcMinify: true,
            env: {
                mongodb_url: 'mongodb+srv://next:145632@cluster0.sicibjv.mongodb.net/?retryWrites=true&w=majority',
                environment: 'development'
            }
        }
    }
    // config for production
    return {
        reactStrictMode: true,
        swcMinify: true,
        env: {
            mongodb_url: 'mongodb+srv://next:145632@cluster0.sicibjv.mongodb.net/?retryWrites=true&w=majority',
            environment: 'production'
        }
    }
}

module.exports = nextConfig
