import React from "react";
import { useNavigate } from "react-router-dom";

function withNavigate(Component) {
    // fungsi yang mereturnkan komponen
    function WithNav(props) {
        // komponen fungsi yang menempelkan fitur navigasi
        const navigate = useNavigate();
        return <Component navigate={navigate} {...props} />;
    }
    return WithNav;
}

export default withNavigate;