const isValidMail = (/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/);

const isValidName = (/^[a-zA-Z ]*$/)

const isValidPassword = (/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/)

const isValidRequestBody = (value) => {
    return Object.keys(value).length > 0
}
               
module.exports = {isValidMail, isValidName, isValidRequestBody,isValidPassword}