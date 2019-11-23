export default{
    host:"http://widgetizer.jcolemorrison.com/",
    endpoints : new Map([
       ["todos","/todos"],
       ["users","/users"],
       ["auth1","/oauth1"],
    ]),
    errors: {
        // Defaults
        default: "Hmm, an unknown error occured",
        timeout: "Server Timed Out. Check your internet connection",
        invalidJson: "Response returned is not valid JSON",
        authFailed: "Unauthorized Access",
        noRecords:"No Records Found"
      },
      appName:"user_agent",
      authFreePath:"auth",
      dev:""
}