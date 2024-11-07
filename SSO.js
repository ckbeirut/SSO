var SSOSiteName = "";

var returnUrl = "";


var yourAppName = "nur-mrc"; //Put the same name that you used in the forms authentication in web.config
var singoutServer = function () {
    //Place the code here to post back to server for cleanup operations when signing out

}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: SSOSiteName + "/GetUserFullName",
        crossDomain: true,
        data: "{}",
        contentType: "application/json",
        dataType: "jsonp",
        success: function (myName) {
            // Replace the div's content with the page method's return.
            if (myName == null) {
                $("#SSO_SignInSignOut").html("<a href='" + SSOSiteName + "/Login'>Sign In</a>");
                SSOSignout(true);
            }
            else
                $("#SSO_SignInSignOut").html("You are logged in as " + myName + " <a id='SSO_SingoutLink' href='javascript:SSOSignout(false);'>Sign Out</a>");
        },
        error: function () {
            $("#SSO_SignInSignOut").html("<a href='" + SSOSiteName + "/Login'>Sign In</a>");
            SSOSignout(true); //IE is appending a head and body when the return value is null, so we are getting an error
        }
    });
});
function SSOSignout(localOnly) {

    if (localOnly == false) {
        window.location = GetUrl() + "/SSO_Signout?ReturnUrl=" + encodeURIComponent(returnUrl);
    }
    else {
        //This is the Single Sign Out: Only signout if the local authentication cookie is still present. 
        if (document.cookie.indexOf("LoggedInTo" + yourAppName) != -1)
            window.location = GetUrl() + "/SSO_Signout?ReturnUrl=" + encodeURIComponent(returnUrl) + "&LocalOnly=true";
    }
}
function GetUrl() {
    //Get the current url removing everything after the last / . this is equivalent to the ~ on the server
    var newURL = window.location.protocol + "//" + window.location.host;
    var pathArray = window.location.pathname.split('/');
    for (i = 0; i < pathArray.length - 1; i++) {
        if (pathArray[i] != "") {
            newURL += "/";
            newURL += pathArray[i];
        }
    }
    return newURL;
}