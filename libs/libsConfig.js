const libsConfig = {};
libsConfig.session = {
    "secret": "VerySecretKEy",
    "key": "sid",
    "cookie": {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
    }
};
libsConfig.oauth = {
   
    'googleAuth' : {
        'clientID': '351948329455-d4mk2er139at2smp2rkp4audns1frkcs.apps.googleusercontent.com',
        'clientSecret': 'XUU-03VJVb2N-EY6nm2qG_zB',
        'callbackURL': 'http://localhost:5000/some'
    }
};

module.exports = libsConfig;