
 const validateEmail = (email) => {
    const epost=email.toUpperCase();
    const split = epost.split(/[@]+/); //splits string using RegEx on a space OR a comma
    const validEmailTietoEvry = "TIETOEVRY.COM";
    const validEmailEvry = "EVRY.COM"

    if (split[1].trim() === validEmailTietoEvry.trim()
        || split[1].trim() === validEmailEvry.trim() ) {
        return true;
    } return false;
}
export default validateEmail;
