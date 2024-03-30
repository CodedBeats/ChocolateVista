
const AdditionalInformation = (props) => {
    // extract array type values
    const ingredientsArr = props.chocolate.ingredients.split(",");
    const flavorsArr = props.chocolate.flavors.split(",");
    const packagingArr = props.chocolate.packaging.split(",");

    // lists from arrs
    const listIngredients = ingredientsArr.map((item, index) => (
        <li key={index}>{item}</li>
    ));
    const listFlavors = flavorsArr.map((item, index) => (
        <li key={index}>{item}</li>
    ));
    const listPackaging = packagingArr.map((item, index) => (
        <li key={index}>{item}</li>
    ));

    return (
        <>
        <div>Price: {props.chocolate.price}</div>
        <div>Weight: {props.chocolate.weight}</div>
        <div>Allergen Information: {props.chocolate.allergenInformation}</div>
        <div>Ingredients: <ul>{listIngredients}</ul></div>
        <div>Flavors: <ul>{listFlavors}</ul></div>
        <div>Packaging: <ul>{listPackaging}</ul></div>
        <div>Avg time until expiration: {props.chocolate.expirationTime}</div>
        <div>Origin: {props.chocolate.origin}</div>
        <div>Certifications: {props.chocolate.certifications}</div>
        </>
    );
}

export default AdditionalInformation