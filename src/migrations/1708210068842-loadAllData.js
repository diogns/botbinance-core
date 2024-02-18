/* eslint-disable @typescript-eslint/no-var-requires */
const accountData = require('../seeds/1708210068842-loadAccountData.json');
const pairData = require('../seeds/1708210068842-loadPairData.json');

module.exports = class loadAllData1708210068842 {
  async up(queryRunner) {
    const accountRepo = queryRunner.connection.getRepository('account');
    const accountDataToInsert = accountData.map((account) => {
      return {
        ...account,
      };
    });
    await accountRepo.insert(accountDataToInsert);

    const pairRepo = queryRunner.connection.getRepository('pair');
    const pairDataToInsert = pairData.map((pair) => {
      return {
        ...pair,
      };
    });
    await pairRepo.insert(pairDataToInsert);
  }

  async down() {}
};
