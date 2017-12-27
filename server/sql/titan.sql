USE titan;

DROP TABLE IF EXISTS user;

CREATE TABLE user (
  userRef int NOT NULL AUTO_INCREMENT,
  email VARCHAR(300) NOT NULL,
  password VARCHAR(100),
  avatar VARCHAR(100) DEFAULT NULL,
  suspended int(1) DEFAULT 0,
  deletedFlag int(1) DEFAULT 0,
  lastUpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastUpdatedBy int(9) DEFAULT null,
  createdBy int(9) DEFAULT null,
  PRIMARY KEY(userRef)
);

INSERT INTO `titan`.`user`
(`userRef`,
 `email`,
 `password`,
 `avatar`,
 `suspended`,
 `deletedFlag`,
 `lastUpdatedAt`,
 `createdAt`,
 `lastUpdatedBy`,
 `createdBy`)
VALUES
  (
    1,
    "nialloc9@gmail.com",
    "$2a$06$HILflpnq6ToGWsKo/.FizuPcscl4u/gsozQHC8g/.rH.tpK3VnKmW",
    "dinhochiz-clip-1295718_640.png",
    0,
    0,
    null,
    null,
    null,
    null
  );

DROP TABLE IF EXISTS room;

CREATE TABLE room (
  roomRef int NOT NULL AUTO_INCREMENT,
  roomName VARCHAR(40) NOT NULL,
  roomPin int(6) NOT NULL,
  expire VARCHAR(30) NOT NULL,
  deletedFlag int(1) DEFAULT 0,
  lastUpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastUpdatedBy int(9) DEFAULT null,
  createdBy int(9) DEFAULT null,
  PRIMARY KEY(roomRef)
);

ALTER TABLE room ADD INDEX (roomPin);

INSERT INTO `titan`.`room`
(`roomRef`,
 `roomName`,
 `roomPin`,
 `expire`,
 `deletedFlag`,
 `lastUpdatedAt`,
 `createdAt`,
 `lastUpdatedBy`,
 `createdBy`)
VALUES
  (
    1,
    "My room",
    123456,
    1503680324,
    0,
    null,
    null,
    1,
    1
  );

DROP TABLE IF EXISTS message;

CREATE TABLE message (
  messageRef int NOT NULL AUTO_INCREMENT,
  message VARCHAR(400) DEFAULT null,
  roomRef int(9),
  deletedFlag int(1) DEFAULT 0,
  lastUpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastUpdatedBy int(9) DEFAULT null,
  createdBy int(9) DEFAULT null,
  PRIMARY KEY(messageRef)
);

ALTER TABLE message ADD INDEX (roomRef);

INSERT INTO `titan`.`message`
(`roomRef`,
 `message`,
 `deletedFlag`,
 `lastUpdatedAt`,
 `createdAt`,
 `lastUpdatedBy`,
 `createdBy`)
VALUES
  (
    1,
    "test",
    0,
    null,
    null,
    1,
    1
  );

DROP TABLE IF EXISTS participant;

CREATE TABLE participant (
  participantRef int NOT NULL AUTO_INCREMENT,
  roomRef int(9),
  userRef int(9),
  username VARCHAR(30) NOT NULL,
  deletedFlag int(1) DEFAULT 0,
  lastUpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastUpdatedBy int(9) DEFAULT null,
  createdBy int(9) DEFAULT null,
  PRIMARY KEY(participantRef)
);

ALTER TABLE participant ADD INDEX (userRef);
ALTER TABLE participant ADD INDEX (roomRef);

INSERT INTO `titan`.`participant`
(`roomRef`,
 `userRef`,
 `username`,
 `deletedFlag`,
 `lastUpdatedAt`,
 `createdAt`,
 `lastUpdatedBy`,
 `createdBy`)
VALUES
  (
    1,
    1,
    "niall",
    0,
    null,
    null,
    1,
    1
  );

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