import React, { memo } from "react";
import useStore from "../../helpers/store";

export const AdminWrapper = memo((props) => {
    const { usuario } = useStore();

    return (
        <div className={usuario?.rol?.nombre !== "Administrador" && "d-none"}>
            {props.children}
        </div>
    );
});
