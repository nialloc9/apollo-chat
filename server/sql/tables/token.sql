USE titan;

DROP TABLE IF EXISTS token;

CREATE TABLE token (
    tokenRef int NOT NULL AUTO_INCREMENT,
    token VARCHAR(300) NOT NULL,
    email VARCHAR(300) NOT NULL,
    deletedFlag int(1) DEFAULT 0,
    expires TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedBy VARCHAR(300) DEFAULT null,
    createdBy VARCHAR(300) DEFAULT null,
    PRIMARY KEY(tokenRef)
);

ALTER TABLE token ADD INDEX (token);
ALTER TABLE token ADD INDEX (email);
ALTER TABLE token ADD INDEX (expires);

INSERT INTO `titan`.`token`
(	`tokenRef`,
    `token`,
    `email`,
    `deletedFlag`,
    `expires`,
    `lastUpdatedAt`,
    `createdAt`,
    `lastUpdatedBy`,
    `createdBy`)
VALUES
(
    1,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImVtYWlsIn0.O4RfFPPdKL0VQCRVezc8DQVb3Kh_LRsTGOFbBxxELkY",
    "nialloc9@gmail.com",
    null,
    DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR),
    null,
    null,
    null,
    null
);