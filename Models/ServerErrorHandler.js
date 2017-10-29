/*
 * This will handle errors and convert them to 
 * error messages that will be returned
 * and displayed to the client
 * 
 */

exports.convertErrorToMessage = convertErrorToMessage;
function convertErrorToMessage(error) {
    if(error === "BlankFieldsError") {
        return "Please fill in all required fields."
    }
}