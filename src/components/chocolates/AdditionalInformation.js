// style
import "./css/additional-information.css";


let AdditionalInformation = (props) => {
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
        <div className="price-label additional-info-label">Price</div>
        <div className="price-value">{props.chocolate.price}</div>
        <div className="weight-label additional-info-label">Weight</div>
        <div className="allergen-label additional-info-label">Allergen Information</div>
        <div className="ingredients-label additional-info-label">Ingredients</div>
        <div className="flavour-label additional-info-label">Flavours</div>
        <div className="packaging-label additional-info-label">Packaging</div>
        <div className="expiration-label additional-info-label">Avg time until expiration</div>
        <div className="origin-label additional-info-label">Origin</div>
        <div className="certifications-label additional-info-label">Certifications</div>
        <div className="weight-value additional-info-value">{props.chocolate.weight}</div>
        <div className="allergen-value additional-info-value">{props.chocolate.allergenInformation}</div>
        <div className="ingredients-value additional-info-value"><ul className="additionsal-info-list">{listIngredients}</ul></div>
        <div className="flavour-value additional-info-value"><ul className="additionsal-info-list">{listFlavors}</ul></div>
        <div className="packaging-value additional-info-value"><ul className="additionsal-info-list">{listPackaging}</ul></div>
        <div className="expiration-value additional-info-value">{props.chocolate.expirationTime}</div>
        <div className="origin-value additional-info-value">{props.chocolate.origin}</div>
        <div className="certifications-value additional-info-value">{props.chocolate.certifications}</div>
        </>
    );
}

export default AdditionalInformation