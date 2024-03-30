// dependencies
import { Link, useLocation } from "react-router-dom";

// style
import "./css/breadcrumbs.css";

let Breadcrumbs = () => {
    const location = useLocation();

    const homeCrumb = (
        <div className="crumb" key="home">
            <Link to="/">Home</Link>
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
                crumb = ""
                
            } 
            // handle multi word chocolates
            else if (crumb.includes("%20")) {
                const newCrumbArr = crumb.split("%20")
                const newCrumb = newCrumbArr.join(" ");
                return (
                    <div className="crumb" key={crumb}>
                        /{capitalizeFirstLetter(newCrumb)}
                    </div>
                );
            }
            else {
                // Don't link the final crumb
                if (index === array.length - 1) {
                    return (
                        <div className="crumb" key={crumb}>
                            /{capitalizeFirstLetter(crumb)}
                        </div>
                    );
                }
    
                return (
                    <div className="crumb" key={crumb}>
                        /<Link to={currentLink}>{capitalizeFirstLetter(crumb)}</Link>
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
