USE titan;

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