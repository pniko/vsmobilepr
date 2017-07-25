import { IAccount } from '../models/IAccount';

const STORAGE_KEY: string = "ACCOUNTS";

class AccountManager {

  // TODO: Switch to Oauth or secure storage for token

  async readAccounts(): Promise<IAccount[]> {
    try {
      const value = await store.get(STORAGE_KEY)
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(`AccountManager: Couldn't read accounts: ${error}`);
    }
  }

  async saveAccount(account: IAccount): Promise<void> {
    try {
      await store.push(STORAGE_KEY, account)
    } catch (error) {
      console.log(`TokenManager: Couldn't save token: ${error}`);
    }
  }
}

export default new AccountManager()