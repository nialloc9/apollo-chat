const requiredParam = ({ serviceName, paramName, param }) => {
    if (param === undefined) {
        throw new Error(`__${serviceName.toUpperCase()}_REQUIRED_PARAM_${paramName.toUpperCase()}_MISSING__`);
    }
};

export default requiredParam;