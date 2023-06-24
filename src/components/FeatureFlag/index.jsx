import React, { memo, useEffect, useState } from "react";
import useStore from "../../helpers/store";

export const FeatureFlag = (props) => {
    const { label } = props;
    const { featureFlags, featuresFlagsByUser, usuario } = useStore();
    const [show, setShow] = useState("d-none");

    useEffect(() => {
        if (usuario.rol.nombre === "Administrador") {
            setShow("d-block");
            return;
        }

        const featureFlag = (featureFlags || []).find(
            (item) => item.name === label
        );
        const isFeatured = (featuresFlagsByUser || []).find(
            (item) => item.featureFlagId === featureFlag?.id
        );
        setShow(isFeatured ? "d-block" : "d-none");
    }, []);

    return <div className={show}>{props.children}</div>;
}
