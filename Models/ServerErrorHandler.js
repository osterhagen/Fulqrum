/*
 * This will handle errors and convert them to 
 * error messages that will be returned
 * and displayed to the client
 * 
 */

exports.convertErrorToMessage = convertErrorToMessage;
function convertErrorToMessage(error) {
    if(error === "BlankFieldsError") {
        return "Please fill in all required fields.";
    }else if(error === "CompanyExistsError") {
        return "This company has already been registered";
    }


    return "Error has Occured";
}