
 const ValidateEmail = (props) => {
    const split = props.split(/[@]+/); //splits string using RegEx on a space OR a comma
    const validEmailTietoEvry = "tietoevry.com";
    const validEmailEvry = "evry.com"
    const validEmailGmail = "gmail.com" // todo remove
    if (split[1].trim() === validEmailTietoEvry.trim()
        || split[1].trim() === validEmailEvry.trim() || split[1].trim()===validEmailGmail.trim()) {
        return true;
    } return false;
}
export default ValidateEmail;
