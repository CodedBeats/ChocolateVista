// dependencies
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

// style
import "./css/breadcrumbs.css";

let Breadcrumbs = () => {
    const location = useLocation();

    const homeCrumb = (
        <div className="crumb" key="home">
            <span className="crumb-text crumb-link home-crumb">
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} /> Home
                </Link>
            </span>
        </div>
    );

    // first letter of path should be capitalized in breadcrumb display
    let capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // split path into individual paths (exclude blank) and create links
    const crumbs = location.pathname
        .split("/")
        .filter((crumb) => crumb !== "")
        .map((crumb, index, array) => {
            let currentLink = "";

            currentLink += `/${crumb}`;

            // Attach "chocolate" before the chocolate ID
            if (!isNaN(parseInt(crumb))) {
                crumb = "";
            }
            // handle multi word chocolates
            else if (crumb.includes("%20")) {
                const newCrumbArr = crumb.split("%20");
                const newCrumb = newCrumbArr.join(" ");
                return (
                    <div className="crumb" key={crumb}>
                        <span className="crumb-arrow">&gt;</span>
                        <span className="crumb-text">
                            {capitalizeFirstLetter(newCrumb)}
                        </span>
                    </div>
                );
            } else {
                // Don't link the final crumb
                if (index === array.length - 1) {
                    return (
                        <div className="crumb" key={crumb}>
                            <span className="crumb-arrow">&gt;</span>
                            <span className="crumb-text">
                                {capitalizeFirstLetter(crumb)}
                            </span>
                        </div>
                    );
                }

                return (
                    <div className="crumb" key={crumb}>
                        <span className="crumb-arrow">&gt;</span>
                        <span className="crumb-text crumb-link">
                            <Link to={currentLink}>
                                {capitalizeFirstLetter(crumb)}
                            </Link>
                        </span>
                    </div>
                );
            }
        });

    return (
        <div className="breadcrumbs">
            {homeCrumb}
            {crumbs}
        </div>
    );
};

export default Breadcrumbs;
