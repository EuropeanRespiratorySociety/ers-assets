const server = require('cloudcms-server/server');
const dotenv = require('dotenv');

dotenv.load();

// after
server.after((app, callback) => {
    callback();
});

process.env.PORT = 4040;
process.env.NODE_ENV = 'production';
process.env.CLOUDCMS_APPSERVER_MODE = 'production';
process.env.CLOUDCMS_CACHE_TYPE = 'memory';


// report
server.report(callback => {

    console.log('');
    console.log(`Cloud CMS Presentation Server started! (v${process.env.CLOUDCMS_APPSERVER_PACKAGE_VERSION})`)
    console.log('');

    const cpuCount = require('os').cpus().length;

    // provide some debug info
    console.log('');
    console.log(`Node Version: ${process.version}`);
    console.log(`Server Mode: ${process.env.CLOUDCMS_APPSERVER_MODE}`);
    console.log(`Server Base Path: ${process.env.CLOUDCMS_APPSERVER_BASE_PATH}`);
    console.log(`Gitana Scheme: ${process.env.GITANA_PROXY_SCHEME}`);
    console.log(`Gitana Host: ${process.env.GITANA_PROXY_HOST}`);
    console.log(`Gitana Port: ${process.env.GITANA_PROXY_PORT}`);
    console.log(`CPU Count: ${cpuCount}`);
    console.log(`Virtual Hosting domain: ${process.env.CLOUDCMS_DOMAIN}`);
    console.log(`Store Configuration: ${process.env.CLOUDCMS_STORE_CONFIGURATION}`);
    console.log(`Broadcast Provider: ${process.env.CLOUDCMS_BROADCAST_TYPE}`);
    console.log(`Cache Provider: ${process.env.CLOUDCMS_CACHE_TYPE}`);
    console.log(`Temp Directory: ${process.env.CLOUDCMS_TEMPDIR_PATH}`);
    console.log(`LaunchPad Mode: ${process.env.CLOUDCMS_LAUNCHPAD_SETUP}`);
    console.log(`AWS Key: ${process.env.SQS_ACCESS_KEY}`);
    console.log(`AWS Secret: ${process.env.SQS_SECRET_KEY}`);
    console.log(`Node environment: ${process.env.NODE_ENV}`);

    console.log('');
    console.log(`Web Server: http://localhost:${process.env.PORT}`);
    console.log('');

    process.env.CLOUDCMS_VIRTUAL_HOST
        ? console.log(`Mode: Single Virtual Host (${process.env.CLOUDCMS_VIRTUAL_HOST})`)
        : process.env.CLOUDCMS_VIRTUAL_HOST_DOMAIN
        ? console.log(`Mode: Multiple Virtual Hosts (*. ${process.env.CLOUDCMS_VIRTUAL_HOST_DOMAIN})`)
        : console.log(`Mode: Standalone`)

    console.log(`Node process running on port: ${process.env.PORT}`);
    console.log('');

    callback();
});

// start the server
const config = {
    setup: 'single',
    name: 'ERS Assets Server',
    virtualHost: {
        enabled: false
    },
    cache: {
        enabled: true
    },
    notifications: {
        enabled: true,
        type: 'sqs',
        configuration: {
            queueUrl: 'https://sqs.us-west-2.amazonaws.com/159797139354/CloudCMS-cache',
            accessKey: process.env.SQS_ACCESS_KEY,
            secretKey: process.env.SQS_SECRET_KEY,
            region: 'us-west-2'
        }  
    },
    perf: {
        enabled: true,
        paths: [
            {
            regex: '/static/.*',
            cache: {
                seconds: 100800
                }
            },
            {
            regex: '/preview/.*',
            cache: {
                'seconds': 100800
                }
            }
        ]
    }    

};

server.start(config);
