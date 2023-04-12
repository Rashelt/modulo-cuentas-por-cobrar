import React, { memo, useEffect, useState } from "react";
import useStore from "../../helpers/store";

export const FeatureFlag = memo((props) => {
    const { label } = props;
    const { featureFlags, featuresFlagsByUser, usuario } = useStore();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (usuario.rol.nombre === "Administrador") {
            setShow(true);
            return;
        }

        const featureFlag = (featureFlags || []).find(
            (item) => item.name === label
        );
        const isFeatured = (featuresFlagsByUser || []).find(
            (item) => item.featureFlagId === featureFlag?.id
        );
        setShow(!!isFeatured);
    }, []);

    // return <>{show ? props.children : null}</>;
    return <div className={!show && "d-none"}>{props.children}</div>;
});
