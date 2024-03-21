const config = {
    "apps": [
        {
            "name": "build-sound-server",
            "script": "./index.js",
            "merge_logs": true,
            "max_restarts": 10,
            "instances": 4,
            "max_memory_restart": "150M",
            "env": {
                "NODE_ENV": "production"
            },
            "exec_mode": "cluster"
        }
    ]
};

export default config;
