import constants from "./constants"

const Endpoints = constants.endpoints;
const ErrorMessages = constants.errors;
const HostName = constants.host


let API: any = {};
let requestCounter: number = 0;
let USER_AGENT: string;
try {
    // Build user agent string
    //TODO: Replace which actual device information
    USER_AGENT = "user_agent";
} catch (e) {
    USER_AGENT = `${constants.appName}`;
}
const DEBUG_MODE = constants.dev;




/**
 * Convert param object into query string
 * eg.
 *   {foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
 *   foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3
 */
function serialize(obj: any, prefix?: any) {
    const str: any = [];

    Object.keys(obj).forEach(p => {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];

        str.push(
            v !== null && typeof v === "object"
                ? serialize(v, k)
                : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        );
    });

    return str.join("&");
}

/*
 * debug
 */
function debug(str: string, title: any) {
    if (DEBUG_MODE && (title || str)) {
        if (title) {
            console.log(`=== DEBUG: ${title} ===========================`);
        }
        if (str) {
            console.log(str);
            console.log("%c ...", "color: #CCC");
        }
    }
}

/*===================================================================================================== */
/*====================================Fetcher Method()====== ========================================== */
/*===================================================================================================== */
const fetcher = (fetchMethod: string, fetchEndpoint: string, fetchParams?: any, body?: any) => {

    return new Promise(async (resolve, reject) => {
        requestCounter += 1;
        const requestNum = requestCounter;


        //taking longer time
        const timeoutAfter = 7;
        const apiTimedOut = setTimeout(
            () => reject(ErrorMessages.timeout),
            timeoutAfter * 1000
        );
        //passed no path and params
        if (!fetchMethod || !fetchEndpoint) return reject("Missing params (AppAPI.fetcher).");

        //fetch options => headers,method....

        let options: any = {
            method: fetchMethod.toUpperCase(),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "User-Agent": USER_AGENT
            }
        };

        //free paths - exception from auth
        if (fetchEndpoint !== constants.endpoints.get(constants.authFreePath)) {
            // let accessToken = store.getState().auth.tokenValue;
            // if (accessToken) {
            //     req.headers.Authorization = `Bearer ${accessToken}`;
            // }
        }

        console.log(options)

        let urlParams = ""
        if (fetchParams) {
            // Object - eg. /recipes?title=this&cat=2
            if (typeof fetchParams === "object") {
                // Replace matching params in API routes eg. /recipes/{param}/foo
                Object.keys(fetchParams).forEach(param => {
                    if (fetchEndpoint.includes(`${param}`)) {
                        fetchEndpoint = fetchEndpoint.split(`{${param}}`).join(fetchParams[param]);
                        delete fetchParams[param];
                    }
                })
                // Check if there's still an 'id' prop, /{id}?
                if (fetchParams.id !== undefined) {
                    if (typeof fetchParams.id === "string" || typeof fetchParams.id === "number") {
                        urlParams = `/${fetchParams.id}`;
                        delete fetchParams.id;
                    }
                }

                // Add the rest of the params as a query string
                urlParams = `?${serialize(fetchParams)}`;
            }
            else if (typeof fetchParams === "string" || typeof fetchParams === "number") {
                urlParams = `/${fetchParams}`;
                // Something else? Just log an error
            }
            else {
                debug(
                    "You provided params, but it wasn't an object!",
                    HostName + fetchEndpoint + urlParams
                );
            }
        }

        //body
        if (body) {
            options.body = JSON.stringify(body);
            console.log("body:", options.body);
        }

        const fetchUrl = HostName + fetchEndpoint + urlParams;
        debug("", `API Request #${requestNum} to ${fetchUrl}`);

        // Make the request
        return fetch(fetchUrl, options)
            .then(async rawRes => {
                console.log(rawRes);
                clearTimeout(apiTimedOut);
                let jsonRes: any = {};
                try {
                    jsonRes = await rawRes.json();
                } catch (error) {
                    let ErrorMessagesObj = { message: ErrorMessages.invalidJson };
                    throw ErrorMessagesObj;
                }
                // Only continue if the header is successful
                if (rawRes && rawRes.status === 200) {
                    // if (!jsonRes.isSucess) {
                    //     let ErrorMessagesObj = { message: ErrorMessages.noRecords };
                    //     throw ErrorMessagesObj;
                    // }
                    return jsonRes;
                }
                throw jsonRes;
            })
            .then(res => {
                clearTimeout(apiTimedOut);
                debug(res, `API Response #${requestNum} from ${fetchUrl}`);
                if (res.success) { //add res.isSuccess
                    console.log(res);
                    //resonsevalue
                    return resolve(res.data);
                } else {
                    let error = res.error ? res.error.message : "Internal Server Error";
                    return reject(new Error(error));
                }
            }).catch(err => {
                clearTimeout(apiTimedOut);
                debug(err, HostName + fetchEndpoint + urlParams);
                return reject(err);
            });
    });
}


/*===================================================================================================== */
/*====================================Fetcher Method()====== ========================================== */
/*===================================================================================================== */


Endpoints.forEach((endpoint: string, key: string) => {
    let methodObject: any;
    methodObject = {
        [key]: {
            get: (params?: any, payload?: any) => (fetcher("GET", endpoint, params, payload)),
            post: (params?: any, payload?: any) => fetcher("POST", endpoint, params, payload)
        }
    }
    API = { ...methodObject, ...API }
})


export default API