USE titan;

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