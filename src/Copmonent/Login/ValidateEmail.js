
 const ValidateEmail = (props) => {
    const split = props.split(/[@]+/); //splits string using RegEx on a space OR a comma
    const validEmailTietoEvry = "tietoevry.com";
    const validEmailEvry = "evry.com"

    if (split[1].trim() === validEmailTietoEvry.trim()
        || split[1].trim() === validEmailEvry.trim() ) {
        return true;
    } return false;
}
export default ValidateEmail;
