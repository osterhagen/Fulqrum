exports.convertErrorToMessage = convertErrorToMessage;
function convertErrorToMessage(error) {
    if(error === "BlankFieldsError") {
        return "Please fill in all required fields."
    }
}