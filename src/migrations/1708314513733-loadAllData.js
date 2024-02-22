/* eslint-disable @typescript-eslint/no-var-requires */
const accountData = require('../seeds/1708314513733-loadAccountData.json');
const pairData = require('../seeds/1708314513733-loadPairData.json');

const positionSettingItem = {
  stopLoss: 0.03,
  openPositions: 3,
};
module.exports = class loadAllData1708314513733 {
  async up(queryRunner) {
    const accountRepo = queryRunner.connection.getRepository('account');
    const accountDataToInsert = accountData.map((account) => {
      return {
        ...account,
      };
    });
    const accounts = await accountRepo.insert(accountDataToInsert);
    const accountId = accounts.identifiers[0].id;

    const pairRepo = queryRunner.connection.getRepository('pair');
    const pairDataToInsert = pairData.map((pair) => {
      return {
        ...pair,
      };
    });

    const pairs = await pairRepo.insert(pairDataToInsert);
    const pairId = pairs.identifiers[0].id;

    const positionSettingRepo =
      queryRunner.connection.getRepository('positionSetting');

    await positionSettingRepo.insert({
      flag: `${accountId}_${pairId}`,
      stopLoss: positionSettingItem.stopLoss,
      openPositions: positionSettingItem.openPositions,
      account: { id: accountId },
      pair: { id: pairId },
    });
  }

  async down(queryRunner) {
    await queryRunner.query(`DELETE FROM positionSetting`);
    await queryRunner.query(`DELETE FROM pair`);
    await queryRunner.query(`DELETE FROM account`);
  }
};
