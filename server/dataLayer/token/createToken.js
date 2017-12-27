import Promise from "promise";
import Database from "../../database";
import handleError from "../../utils/handleError";
import handleSuccess from "../../utils/handleSuccess";

const query = ({ token, email }) => `
INSERT INTO titan.token
(	tokenRef,
    token,
    email,
    deletedFlag,
    expires,
    lastUpdatedAt,
    createdAt,
    lastUpdatedBy,
    createdBy)
VALUES
(
    ${null},
    "${token}",
    "${email}",
    null,
    DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR),
    null,
    null,
    "${email}",
    "${email}"
);
`;

/**
 * creates a new token row in the database
 * @param token
 * @param email
 * @returns {*|Promise}
 */
const createToken = (token, email) => {

    const data = {
        token,
        email,
        createdBy: email,
        lastUpdatedBy: email
    };

    return new Promise((resolve, reject) => {
        Database.getConnection((error, connection) => {
            if (!error) {
                connection.query(query({
                    token,
                    email
                }), data, (error, results) => {
                    connection.release();
                    if (!error) {
                        resolve(
                            handleSuccess("token row created", {
                                ...data,
                                deletedFlag: 0,
                                tokenRef: results.insertId
                            },
                                "DATA - CREATE_TOKEN"
                            )
                        );
                    } else {
                        reject(
                            handleError(
                                "DATA - CREATE_TOKEN create token query could not be completed",
                                error
                            )
                        );
                    }
                });
            } else {
                reject(
                    handleError(
                        "DATA - CREATE_TOKEN could not connect to database",
                        error
                    )
                );
            }
        });
    });
};

export default createToken;