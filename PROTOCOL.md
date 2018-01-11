## about

API specifications for client communication, initial version can be plain JSON, future versions can be a binary implementation to save on traffic, clients would maintain a list of sites participating (clients can add to that list), no need to sample each and every domain on the internet yet as that'll be too sparse to be of any value

## API

#### /state (POST)

sync_state would be sent once every X time when a site is visited, its purpose is to forward a tally of requests and their median and average time and size, no need to pass specific requests

`Request`
```
{
    version: "0.0.1",   // client version
    return_state: true, // if true return domain performance (/state/:domain)
    domain: "",         // domain (specific urls to be avoided for security)
    performance: {
        requests: 0,            // total requests transferred
        size: 0,                // total size transferred
        size_mean: 0,           // average request size
        size_median: 0,         // median request size,
        latency,                // total latency of all requests
        latency_mean,           // latency mean
        latency_median,         // latency median
        latency_max             // longest latency observed
    }
}
```

#### /state/:domain (GET)

get information about the domain to be summarized for the user in the status bar

`Response`
```
{
    signature: "0.0.1", // server signature of the rest of the request for security reasons
    domain: "",         // domain reporting for
    performance: {
        global: {
            participants: 0,        // how many other people participated
            size: 0,                // global total size transferred
            size_mean: 0,           // global average request size
            size_median: 0,         // global median request size,
            latency,                // global total latency of all requests
            latency_mean,           // global latency mean
            latency_median,         // global latency median
            latency_max             // global longest latency observed
        },
        country: {} // same as global but for the user's country
        region: {} // same as global but for the user's region
        isp: {} // same as global but for the user's isp
        competitors: [{}] // array, same as global but showing competing ISPs in the same region
    }
}
```
