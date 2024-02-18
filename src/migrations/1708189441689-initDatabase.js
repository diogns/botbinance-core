module.exports = class initDatabase1708189441689 {
  name = ' initDatabase1708189441689';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`position\` (\`id\` int NOT NULL AUTO_INCREMENT, \`flag\` varchar(100) NOT NULL, \`type\` int NOT NULL, \`signalId\` int NULL, \`accountId\` int NULL, \`pairId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`signal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`value\` float NOT NULL, \`pairId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`pair\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`value\` float NOT NULL, UNIQUE INDEX \`IDX_de8fc370bdf3ab91a4d17a4ec4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`positionSetting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`flag\` varchar(100) NOT NULL, \`stopLoss\` float NOT NULL, \`openPositions\` int NOT NULL, \`accountId\` int NULL, \`pairId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_41dfcb70af895ddf9a53094515\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` ADD CONSTRAINT \`FK_d1c022237bbec7d70c97d4cdfaf\` FOREIGN KEY (\`signalId\`) REFERENCES \`signal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` ADD CONSTRAINT \`FK_e848b9ce8324419d8219653c551\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` ADD CONSTRAINT \`FK_c2c4e678544816341cf4fc43b0c\` FOREIGN KEY (\`pairId\`) REFERENCES \`pair\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`signal\` ADD CONSTRAINT \`FK_a7431c281e422fa424b562e3fd0\` FOREIGN KEY (\`pairId\`) REFERENCES \`pair\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`positionSetting\` ADD CONSTRAINT \`FK_9e6c0dfb74ebdf083a437707384\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`positionSetting\` ADD CONSTRAINT \`FK_66e6cc05b97fc74b94565bc1035\` FOREIGN KEY (\`pairId\`) REFERENCES \`pair\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`positionSetting\` DROP FOREIGN KEY \`FK_66e6cc05b97fc74b94565bc1035\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`positionSetting\` DROP FOREIGN KEY \`FK_9e6c0dfb74ebdf083a437707384\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`signal\` DROP FOREIGN KEY \`FK_a7431c281e422fa424b562e3fd0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` DROP FOREIGN KEY \`FK_c2c4e678544816341cf4fc43b0c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` DROP FOREIGN KEY \`FK_e848b9ce8324419d8219653c551\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` DROP FOREIGN KEY \`FK_d1c022237bbec7d70c97d4cdfaf\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_41dfcb70af895ddf9a53094515\` ON \`account\``,
    );
    await queryRunner.query(`DROP TABLE \`account\``);
    await queryRunner.query(`DROP TABLE \`positionSetting\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_de8fc370bdf3ab91a4d17a4ec4\` ON \`pair\``,
    );
    await queryRunner.query(`DROP TABLE \`pair\``);
    await queryRunner.query(`DROP TABLE \`signal\``);
    await queryRunner.query(`DROP TABLE \`position\``);
  }
};
