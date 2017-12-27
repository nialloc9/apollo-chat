USE titan;

DROP TABLE IF EXISTS participant;

CREATE TABLE participant (
  participantRef int NOT NULL AUTO_INCREMENT,
  roomRef int(9),
  userRef int(9),
  username VARCHAR(30) NOT NULL,
  deletedFlag int(1) DEFAULT 0,
  lastUpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMPint(20) DEFAULT null,
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