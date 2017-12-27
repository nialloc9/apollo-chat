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